import { LESSON_CONTENT } from "../data/lessonContent";
import { ADVANCED_LESSON_CONTENT } from "../data/advancedLessonContent";
import { CHRISTY_LESSON_CONTENT } from "../data/christyLessonContent";
import { ALL_SHANNON_CONTENT } from "../data/shannonAllContent";
import { BADGES, LEVELS, WORLDS } from "../data/worlds";
import { ChildProfile, LessonTerm, WorldId } from "../types";

export const DAILY_GOAL_SECONDS = 15 * 60;                    // Adults: 15 min
export const DAILY_GOAL_SECONDS_KIDS = 5 * 60;               // Kids: 5 min (more achievable!)

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const getLevel = (points: number) =>
  [...LEVELS].reverse().find((level) => points >= level.minimumPoints) ?? LEVELS[0];

export const getWorldById = (worldId: WorldId) =>
  WORLDS.find((world) => world.id === worldId) ?? WORLDS[0];

export const formatSeconds = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
};

export const todayKey = () => new Date().toISOString().slice(0, 10);

export const yesterdayKey = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

export const calculateAccuracy = (correct: number, attempted: number) =>
  attempted === 0 ? 0 : Math.round((correct / attempted) * 100);

export const getUnlockedWorldIds = (points: number, profileType?: "child" | "adult", accuracy?: number) => {
  // Adults get ALL worlds — they're not children earning progression badges.
  // The points system is designed for kids. Adults can access any vocabulary category.
  if (profileType === "adult") {
    return WORLDS.map((world) => world.id);
  }
  // Kids use points-based progression
  return WORLDS.filter((world) => points >= world.unlockPoints).map((world) => world.id);
};

export const getTodayMinutes = (profile: ChildProfile) =>
  profile.sessionHistory
    .filter((session) => session.date === todayKey())
    .reduce((sum, session) => sum + session.minutesPlayed, 0);

export const getThisWeekMinutes = (profile: ChildProfile) => {
  const now = new Date();
  return profile.sessionHistory.reduce((sum, session) => {
    const sessionDate = new Date(`${session.date}T00:00:00`);
    const diff = now.getTime() - sessionDate.getTime();
    const diffDays = diff / (1000 * 60 * 60 * 24);
    return diffDays <= 6 ? sum + session.minutesPlayed : sum;
  }, 0);
};

export const getAvailableTermsForWorld = (
  profile: ChildProfile,
  worldId: WorldId
) => {
  // SHANNON (85%+ accuracy): Use advanced Spain-focused curriculum with news, jokes, tongue twisters
  if (profile.profileType === "adult" && profile.accuracyPercentage >= 80 && profile.name === "Shannon") {
    const shannonTerms = ALL_SHANNON_CONTENT.filter((term) => term.category === worldId);
    if (shannonTerms.length > 0) return shannonTerms;
  }

  // CHRISTY (intermediate level): Use intermediate curriculum designed for her level
  if (profile.profileType === "adult" && profile.name === "Christy") {
    const christyTerms = CHRISTY_LESSON_CONTENT.filter((term) => term.category === worldId);
    if (christyTerms.length > 0) return christyTerms;
  }

  // KIDS: Use standard lesson content
  const worldTerms = LESSON_CONTENT.filter((term) => term.category === worldId);

  // Regular adults (fallback) get all standard words
  if (profile.profileType === "adult") return worldTerms;

  // Kids get progressive unlock based on mastery
  const masteredCount = worldTerms.filter(
    (term) => profile.questionStats[term.id]?.mastered
  ).length;
  const unlockCount = clamp(6 + Math.floor(masteredCount / 2), 6, worldTerms.length);

  return [...worldTerms]
    .sort((left, right) => {
      const leftStats = profile.questionStats[left.id];
      const rightStats = profile.questionStats[right.id];
      const leftWeight =
        (leftStats?.mastered ? 100 : 0) +
        (leftStats?.attempts ?? 0) * 4 +
        left.difficulty * 3;
      const rightWeight =
        (rightStats?.mastered ? 100 : 0) +
        (rightStats?.attempts ?? 0) * 4 +
        right.difficulty * 3;
      return leftWeight - rightWeight;
    })
    .slice(0, unlockCount);
};

export const getWeightedPracticeSet = (
  profile: ChildProfile,
  terms: LessonTerm[],
  total: number
) => {
  const weightedPool = terms.flatMap((term) => {
    const stats = profile.questionStats[term.id];
    const accuracy = stats ? stats.correct / Math.max(stats.attempts, 1) : 0;
    const weight = stats?.mastered
      ? 1
      : stats == null
        ? 5
        : accuracy < 0.5
          ? 4
          : accuracy < 0.8
            ? 3
            : 2;
    return Array.from({ length: weight }, () => term);
  });

  const chosenIds = new Set<string>();
  const chosen: LessonTerm[] = [];

  const cap = Math.min(total, terms.length);
  while (chosen.length < cap && weightedPool.length > 0) {
    const term = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    if (!chosenIds.has(term.id)) {
      chosenIds.add(term.id);
      chosen.push(term);
    }
  }

  return chosen.length > 0 ? chosen : terms.slice(0, total);
};

export const getDistractors = (target: LessonTerm, allTerms: LessonTerm[]) => {
  const pool = allTerms.filter((term) => term.id !== target.id);
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
};

export const getTopMasteredWords = (profile: ChildProfile) =>
  profile.wordsMastered
    .map((id) => LESSON_CONTENT.find((term) => term.id === id))
    .filter(Boolean)
    .slice(0, 5) as LessonTerm[];

export const getNeedsPracticeWords = (profile: ChildProfile) =>
  Object.entries(profile.questionStats)
    .map(([wordId, stats]) => ({
      wordId,
      accuracy: stats.correct / Math.max(stats.attempts, 1)
    }))
    .filter((entry) => entry.accuracy < 0.7)
    .sort((left, right) => left.accuracy - right.accuracy)
    .slice(0, 5)
    .map((entry) => LESSON_CONTENT.find((term) => term.id === entry.wordId))
    .filter(Boolean) as LessonTerm[];

export const getSuggestedWorld = (profile: ChildProfile) => {
  const unlockedIds = getUnlockedWorldIds(profile.totalPoints);
  const ranked = unlockedIds
    .map((worldId) => {
      const terms = LESSON_CONTENT.filter((term) => term.category === worldId);
      const stats = terms.map((term) => profile.questionStats[term.id]);
      const averageAccuracy =
        stats.length === 0
          ? 0
          : stats.reduce((sum, stat) => {
              if (!stat) {
                return sum;
              }
              return sum + stat.correct / Math.max(stat.attempts, 1);
            }, 0) / stats.length;
      return { worldId, averageAccuracy };
    })
    .sort((left, right) => left.averageAccuracy - right.averageAccuracy);

  return getWorldById(ranked[0]?.worldId ?? "greetings");
};

const CONVERSATION_SCENARIO_MAP: Record<string, string> = {
  "hola": "You walk into a new classroom and a friendly student looks up and smiles at you. What's the first thing you say?",
  "adios": "After a fun afternoon at the park, your new friend's mom calls them home. What do you say as they wave goodbye?",
  "me-llamo": "A kid at the playground runs up and asks '¿Cómo te llamas?' — What do you say to introduce yourself?",
  "como-te-llamas": "You spot a cool kid building an amazing sand castle. You want to know their name. What do you ask?",
  "mucho-gusto": "You just learned your new neighbor's name is Sofia. You want to say it's really nice to meet her. What do you say?",
  "como-estas": "You see your friend walking into school on Monday morning. You want to ask how they're doing. What do you say?",
  "estoy-bien": "Your Spanish teacher asks '¿Cómo estás?' and everyone looks at you expectantly. How do you answer?",
  "buenos-dias": "You arrive at school and the principal greets every student at the door. What do you say back?",
  "hasta-luego": "Your friend from Spanish class is leaving the park and says 'Bye!' How do you say 'see you later' in Spanish?",
  "quieres-jugar": "You see a new kid sitting alone on the bench during recess. You want to invite them to play. What do you say?",
  "vamos": "You're playing a relay race and your teammate just crossed the finish line — it's your turn to run! What do you shout?",
  "mi-turno": "You've been patiently waiting for the swings for five whole minutes. Finally it's your turn! What do you announce?",
  "tu-turno": "You've finished your turn on the slide and your friend is waiting right behind you. How do you let them know?",
  "corre": "You're playing tag and your friend is about to get tagged! What do you shout to help them escape?",
  "salta": "You're playing a jumping game and it's your friend's moment to leap. What do you call out?",
  "pelota": "Your Spanish-speaking friend doesn't know what a ball is called. You pick it up and teach them. What do you say?",
  "amigo": "You're writing 'Dear Friend' at the top of a birthday card. What's the Spanish word you use?",
  "columpio": "You want to tell your friend you're heading to the swings. What do you say?",
  "quiero": "The waiter at the taco restaurant walks over and waits for your order. How do you politely start by saying what you want?",
  "agua-por-favor": "After a long hot walk, you sit down at a restaurant and you're super thirsty. What do you ask the waiter for?",
  "tacos": "The waiter asks '¿Qué quieres comer?' and your favorite food is on the menu. What do you order?",
  "quesadilla": "Your little sibling loves cheesy tortillas. What do you order for them when the waiter comes over?",
  "arroz": "The waiter asks if you'd like a side dish, and you'd love some rice. What do you say?",
  "pollo": "You're at a Mexican restaurant and want chicken with your meal. How do you ask for it?",
  "gracias": "The waiter brings a steaming plate of food and sets it in front of you with a big smile. What do you say?",
  "de-nada": "You held the door open for someone and they said 'Gracias!' How do you respond?",
  "la-cuenta": "Your family has finished a delicious meal and it's time to pay and head home. What do you ask the waiter for?",
  "feliz": "Your best friend asks how you feel about going to the water park tomorrow. How do you answer in Spanish?",
  "triste": "Your goldfish just died and your friend gently asks '¿Cómo te sientes?' What do you tell them?",
  "cansado": "After two hours of swimming, your parent asks how you're feeling. What do you say?",
  "hambre": "It's almost noon and you haven't eaten since 7 a.m. Your stomach is growling. What do you say?",
  "sed": "After sprinting across the soccer field at practice, you desperately need water. What do you tell your coach?",
  "emocionado": "Tomorrow is your birthday party and your friend asks how you're feeling! What do you say?",
  "asustado": "There's a huge thunderstorm and the thunder is really loud. Your friend asks if you're scared. How do you answer?",
  "rojo": "You're buying a new backpack and the store worker asks which color you want. You want the red one. What do you say?",
  "azul": "Your art teacher asks '¿Qué color es el cielo?' How do you answer?",
  "verde": "You're describing your new pet turtle to your Spanish-speaking neighbor. What color do you say it is?",
  "amarillo": "Your little cousin is coloring the sun and asks what color to use. What do you say?",
  "perro": "Your friend got a new puppy! They ask you to say what kind of pet it is in Spanish. What do you say?",
  "gato": "Your neighbor's cat is sitting in the window and you want to point it out to your friend. What word do you use?",
  "pajaro": "A bright blue bird lands on your windowsill and you exclaim to your friend what it is. What do you say?",
  "por-favor": "You want a second cookie from the plate and look up at your host politely. What do you add to your request?",
  "perdon": "You accidentally bump into someone in the hallway. What do you immediately say?",
  "puedo": "You want to borrow a pencil from your classmate. How do you politely ask if you may?",
  "me-ayudas": "You're trying to open a really heavy door and your hands are full. How do you ask someone for help?",
};

const RESTAURANT_SCENARIO_MAP: Record<string, string> = {
  "quiero": "The waiter comes to your table and says 'Buenas tardes! ¿Qué quieres?' — How do you start your order?",
  "agua-por-favor": "It's a hot day and the waiter asks if you'd like something to drink. You really want water. What do you say?",
  "tacos": "The waiter lists the specials and you want your favorite — tacos! How do you order them?",
  "quesadilla": "Your little sibling is too shy to order. You speak up for them — they want a quesadilla. What do you say?",
  "arroz": "The waiter asks '¿Con arroz o sin arroz?' — you definitely want rice! How do you confirm?",
  "pollo": "You're looking at the menu and the grilled chicken looks amazing. How do you order it?",
  "gracias": "The waiter brings your meal out and sets everything down perfectly. What's the first thing you say?",
  "de-nada": "You thanked the waiter for refilling your water, and they're waiting for your response to their 'De nada.' Wait — you say it first! How?",
  "la-cuenta": "You've finished eating and need to pay. The waiter walks by — what do you say to ask for the check?",
};

export const getConversationPrompt = (term: LessonTerm) => ({
  prompt:
    CONVERSATION_SCENARIO_MAP[term.id] ??
    `A new friend says "${term.english}" to you. What's the best thing to say back in Spanish?`,
  expectedAnswer: term.spanish,
});

export const getRestaurantPrompt = (term: LessonTerm) => ({
  prompt:
    RESTAURANT_SCENARIO_MAP[term.id] ??
    `The waiter smiles and waits for your order. Which Spanish phrase fits best here?`,
  expectedAnswer: term.spanish,
});

export const getNewBadges = (profile: ChildProfile) => {
  const newBadges: string[] = [];
  const playgroundMastered = LESSON_CONTENT.filter(
    (term) => term.category === "playground" && profile.wordsMastered.includes(term.id)
  ).length;
  const restaurantMastered = LESSON_CONTENT.filter(
    (term) => term.category === "restaurant" && profile.wordsMastered.includes(term.id)
  ).length;

  if (profile.totalCorrect >= 1 && !profile.badges.includes("first-word")) {
    newBadges.push("first-word");
  }

  if (playgroundMastered >= 5 && !profile.badges.includes("playground-ready")) {
    newBadges.push("playground-ready");
  }

  if (restaurantMastered >= 5 && !profile.badges.includes("restaurant-ready")) {
    newBadges.push("restaurant-ready");
  }

  if (profile.streakCount >= 5 && !profile.badges.includes("5-day-streak")) {
    newBadges.push("5-day-streak");
  }

  return newBadges.filter((badgeId) => BADGES.some((badge) => badge.id === badgeId));
};

export const getBadgeById = (badgeId: string) =>
  BADGES.find((badge) => badge.id === badgeId);
