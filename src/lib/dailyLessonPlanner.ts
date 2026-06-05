import { ChildProfile, LessonTerm, WorldId } from "../types";
import { todayKey } from "./game";

/**
 * Daily Lesson Planner
 *
 * Replaces getWeightedPracticeSet() with intelligent lesson planning:
 * - Spaced repetition (don't repeat within 2 days if "understood")
 * - Prioritize: Struggled → New → Recent → Mastering
 * - Group by world for thematic coherence
 * - Avoid repeats within same session
 */

export interface LessonPlanOptions {
  targetWordCount?: number; // Default: 10-30 based on session time
  worldId?: WorldId; // If specified, filter to one world
  sessionMinutesRemaining?: number; // Estimate based on daily goal progress
}

export interface DailyLesson {
  words: LessonTerm[];
  theme: WorldId;
  estimatedMinutes: number;
  recommendedGameType: "flashcard" | "multipleChoice" | "conversation" | "matching" | "restaurant";
}

/**
 * Calculate when a word was last practiced
 */
const getLastPracticeDate = (profile: ChildProfile, wordId: string): string | null => {
  const stats = profile.questionStats[wordId];
  // For now, return null (we'll add lastSeenAt tracking in future phases)
  return null;
};

/**
 * Calculate days without practice
 */
const getDaysWithoutPractice = (lastPracticeDate: string | null): number => {
  if (!lastPracticeDate) return 999; // Never practiced
  const last = new Date(lastPracticeDate);
  const now = new Date();
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if a word should be skipped based on "understood" status
 * If user marked as understood and it's been < 2 days, skip it
 */
const shouldSkipUnderstood = (
  profile: ChildProfile,
  wordId: string,
  lastPracticeDate: string | null
): boolean => {
  // Future: Check if word has understoodAt timestamp
  // For now, always include (understoodAt not in current schema yet)
  return false;
};

/**
 * Calculate learning priority weight for a word
 * Higher = more urgent to practice
 */
const calculatePriority = (
  profile: ChildProfile,
  term: LessonTerm,
  daysWithoutPractice: number
): number => {
  const stats = profile.questionStats[term.id];

  if (!stats) {
    // NEW WORD: Priority 100
    return 100;
  }

  const accuracy = stats.correct / Math.max(stats.attempts, 1);

  if (stats.mastered) {
    // MASTERED: Priority 1 (lowest)
    return 1;
  }

  if (accuracy < 0.5) {
    // STRUGGLING (0-50%): Priority 90
    return 90;
  }

  if (accuracy < 0.8) {
    // LEARNING (50-80%): Priority 70 + bonus for days without practice
    return 70 + Math.min(daysWithoutPractice * 2, 20);
  }

  // MASTERING (80-100%): Priority 30 + bonus for days without practice
  return 30 + Math.min(daysWithoutPractice * 1, 10);
};

/**
 * Get today's practiced words (to avoid repeats within same day)
 */
const getTodaysPracticedWords = (profile: ChildProfile): Set<string> => {
  const today = todayKey();
  const todaysSessions = profile.sessionHistory.filter((s) => s.date === today);

  // For now, return empty set (sessionHistory doesn't track word IDs yet)
  // This will be implemented in Phase 2B when session structure is extended
  return new Set();
};

/**
 * Core function: Create intelligent daily lesson for a profile
 */
export const planDailyLesson = (
  profile: ChildProfile,
  availableTerms: LessonTerm[],
  options: LessonPlanOptions = {}
): DailyLesson => {
  const {
    targetWordCount = calculateTargetWordCount(options.sessionMinutesRemaining ?? 15),
    worldId = null,
    sessionMinutesRemaining = 15
  } = options;

  // Filter to requested world
  let candidateTerms = worldId
    ? availableTerms.filter((t) => t.category === worldId)
    : availableTerms;

  // Filter out already-mastered words (unless we need to fill quota)
  const nonMasteredTerms = candidateTerms.filter(
    (t) => !profile.questionStats[t.id]?.mastered
  );

  const masterTerms = candidateTerms.filter(
    (t) => profile.questionStats[t.id]?.mastered
  );

  // Start with non-mastered terms
  candidateTerms = nonMasteredTerms.length > 0 ? nonMasteredTerms : masterTerms;

  const todaysPracticed = getTodaysPracticedWords(profile);

  // Score each word by priority, avoiding repeats in today's session
  const scoredTerms = candidateTerms
    .filter((t) => !todaysPracticed.has(t.id))
    .map((term) => {
      const lastPractice = getLastPracticeDate(profile, term.id);
      const daysWithout = getDaysWithoutPractice(lastPractice);

      // Skip if understood and recent
      if (shouldSkipUnderstood(profile, term.id, lastPractice)) {
        return { term, priority: -1 }; // Will be filtered out
      }

      const priority = calculatePriority(profile, term, daysWithout);
      return { term, priority };
    })
    .filter((s) => s.priority > 0)
    .sort((a, b) => b.priority - a.priority); // Highest priority first

  // Select top N words
  const selectedWords = scoredTerms.slice(0, targetWordCount).map((s) => s.term);

  // If we don't have enough, add mastered words for variety
  if (selectedWords.length < targetWordCount && masterTerms.length > 0) {
    const additionalMastered = masterTerms
      .filter((t) => !selectedWords.find((w) => w.id === t.id))
      .filter((t) => !todaysPracticed.has(t.id))
      .slice(0, targetWordCount - selectedWords.length);
    selectedWords.push(...additionalMastered);
  }

  // Shuffle for variety within priority levels
  const finalWords = shufflePreservingPriority(selectedWords);

  // Detect dominant theme
  const themeCounts = new Map<WorldId, number>();
  finalWords.forEach((w) => {
    const current = themeCounts.get(w.category) ?? 0;
    themeCounts.set(w.category, current + 1);
  });

  const dominantTheme = Array.from(themeCounts.entries()).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] ?? ("greetings" as WorldId);

  // Pick game type based on theme
  const gameType = selectGameTypeForTheme(dominantTheme);

  return {
    words: finalWords,
    theme: dominantTheme,
    estimatedMinutes: Math.ceil(finalWords.length * 0.7), // ~45 sec per word
    recommendedGameType: gameType
  };
};

/**
 * Calculate target word count based on session time remaining
 */
const calculateTargetWordCount = (minutesRemaining: number): number => {
  // ~45 seconds per word = ~1.3 words per minute
  const estimate = Math.ceil(minutesRemaining * 1.3);
  // Clamp between 10-30
  return Math.max(10, Math.min(30, estimate));
};

/**
 * Shuffle while keeping top priority words near the front
 */
const shufflePreservingPriority = (words: LessonTerm[]): LessonTerm[] => {
  // Divide into priority tiers
  const topTier = words.slice(0, Math.ceil(words.length * 0.3)); // Top 30%
  const midTier = words.slice(
    Math.ceil(words.length * 0.3),
    Math.ceil(words.length * 0.7)
  ); // Middle 40%
  const lowTier = words.slice(Math.ceil(words.length * 0.7)); // Bottom 30%

  // Shuffle each tier
  const shuffled = [
    ...shuffle(topTier),
    ...shuffle(midTier),
    ...shuffle(lowTier)
  ];

  return shuffled;
};

/**
 * Fisher-Yates shuffle
 */
const shuffle = <T,>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Select best game type for a theme
 */
const selectGameTypeForTheme = (
  theme: WorldId
): "flashcard" | "multipleChoice" | "conversation" | "matching" | "restaurant" => {
  switch (theme) {
    case "greetings":
      return "conversation";
    case "playground":
      return "matching";
    case "restaurant":
      return "restaurant";
    case "feelings":
      return "flashcard";
    case "colorsNumbers":
      return "multipleChoice";
    case "animalsToys":
      return "matching";
    case "school":
      return "flashcard";
    case "family":
      return "flashcard";
    case "polite":
      return "conversation";
    case "housing":
      return "multipleChoice";
    case "banking":
      return "multipleChoice";
    case "healthcare":
      return "multipleChoice";
    case "dining":
      return "multipleChoice";
    case "shopping":
      return "flashcard";
    case "admin":
      return "multipleChoice";
    case "culture":
      return "flashcard";
    default:
      return "flashcard";
  }
};

/**
 * Get lesson statistics for a profile
 */
export const getLessonStats = (profile: ChildProfile, availableTerms: LessonTerm[]) => {
  const totalTerms = availableTerms.length;
  const masteredTerms = availableTerms.filter(
    (t) => profile.questionStats[t.id]?.mastered
  ).length;
  const attemptedTerms = Object.keys(profile.questionStats).length;
  const newTerms = totalTerms - attemptedTerms;

  const struggles = Object.entries(profile.questionStats)
    .filter(([_, stats]) => {
      const acc = stats.correct / Math.max(stats.attempts, 1);
      return acc < 0.5;
    })
    .map(([id]) => id);

  const almostMastered = Object.entries(profile.questionStats)
    .filter(([_, stats]) => {
      const acc = stats.correct / Math.max(stats.attempts, 1);
      return acc >= 0.8 && acc < 1;
    })
    .map(([id]) => id);

  return {
    totalTerms,
    masteredTerms,
    attemptedTerms,
    newTerms,
    struggleCount: struggles.length,
    almostMasteredCount: almostMastered.length,
    struggleWords: struggles,
    almostMasteredWords: almostMastered,
    masteryPercentage: Math.round((masteredTerms / totalTerms) * 100)
  };
};

/**
 * Get recommended "focus area" for a profile
 * Returns the world/category that needs the most work
 */
export const getFocusArea = (
  profile: ChildProfile,
  availableTerms: LessonTerm[]
): { worldId: WorldId; reason: string } => {
  const byCategory = new Map<WorldId, { total: number; mastered: number }>();

  availableTerms.forEach((term) => {
    const current = byCategory.get(term.category) ?? { total: 0, mastered: 0 };
    const isMastered = profile.questionStats[term.id]?.mastered ?? false;
    byCategory.set(term.category, {
      total: current.total + 1,
      mastered: current.mastered + (isMastered ? 1 : 0)
    });
  });

  // Find world with lowest mastery percentage
  const sorted = Array.from(byCategory.entries())
    .map(([worldId, stats]) => ({
      worldId,
      masteryPercent: (stats.mastered / stats.total) * 100
    }))
    .sort((a, b) => a.masteryPercent - b.masteryPercent);

  const focusWorld = sorted[0];

  let reason = "Not started yet";
  if (focusWorld.masteryPercent === 0) {
    reason = "No words mastered yet in this category";
  } else if (focusWorld.masteryPercent < 50) {
    reason = "This category needs the most work";
  }

  return {
    worldId: focusWorld.worldId,
    reason
  };
};
