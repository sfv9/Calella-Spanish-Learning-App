import {
  startTransition,
  useDeferredValue,
  useEffect,
  useState
} from "react";
import { Crown, Flag, Map, Rocket } from "lucide-react";
import { AdventureMap } from "./components/AdventureMap";
import { ConversationGame } from "./components/ConversationGame";
import { DailyTimer } from "./components/DailyTimer";
import { FlashcardGame } from "./components/FlashcardGame";
import { LeaderboardView } from "./components/LeaderboardView";
import { ListeningGame } from "./components/ListeningGame";
import { MatchingGame } from "./components/MatchingGame";
import { MultipleChoiceGame } from "./components/MultipleChoiceGame";
import { ParentDashboard } from "./components/ParentDashboard";
import { PointsDisplay } from "./components/PointsDisplay";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { DialogueGame } from "./components/DialogueGame";
import { AlphabetGame } from "./components/AlphabetGame";
import { AvatarPicker } from "./components/AvatarPicker";
import { RestaurantRoleplayGame } from "./components/RestaurantRoleplayGame";
import { SpeakingGame } from "./components/SpeakingGame";
import { Confetti } from "./components/Confetti";
import { FamilyRaceStrip } from "./components/FamilyRaceStrip";
import { UnlockableContentView } from "./components/UnlockableContentView";
import { SpainCountdown } from "./components/SpainCountdown";
import { WordOfTheDay } from "./components/WordOfTheDay";
import { LESSON_CONTENT } from "./data/lessonContent";
import { CHRISTY_LESSON_CONTENT } from "./data/christyLessonContent";
import { ALL_SHANNON_CONTENT } from "./data/shannonAllContent";
import { BADGES, WORLDS } from "./data/worlds";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  DAILY_GOAL_SECONDS,
  DAILY_GOAL_SECONDS_KIDS,
  calculateAccuracy,
  formatSeconds,
  getAvailableTermsForWorld,
  getBadgeById,
  getLevel,
  getNeedsPracticeWords,
  getNewBadges,
  getSuggestedWorld,
  getTodayMinutes,
  getUnlockedWorldIds,
  getWeightedPracticeSet,
  todayKey,
  yesterdayKey
} from "./lib/game";
import { APP_STORAGE_KEY, createInitialState, createProfile } from "./lib/storage";
import {
  AnswerPayload,
  ChildProfile,
  GameMode,
  LessonTerm,
  SessionState,
  WorldId
} from "./types";

type AppView = "game" | "leaderboard" | "explore";

const BADGE_EMOJI: Record<string, string> = {
  "first-word": "⭐",
  "playground-ready": "🏃",
  "restaurant-ready": "🌮",
  "15-minute-hero": "🏆",
  "5-day-streak": "🔥"
};

// Canonical profiles — used for migration. `avatar` is the DEFAULT emoji
// for new/migrating profiles; users can override anytime via the picker.
const CANONICAL_PROFILES = [
  { id: "child-1",  name: "Ila",     type: "child" as const, avatar: "🦈",   points: 0,    accuracy: 0,  level: 1 },
  { id: "child-2",  name: "Ian",     type: "child" as const, avatar: "🦸",   points: 0,    accuracy: 0,  level: 1 },
  { id: "adult-1",  name: "Christy", type: "adult" as const, avatar: "👩",   points: 800,  accuracy: 65, level: 4 },
  { id: "adult-2",  name: "Shannon", type: "adult" as const, avatar: "🎯",   points: 2000, accuracy: 85, level: 7 },
];

// Visual styling (gradient/ring) stays tied to position. Only the EMOJI
// is per-profile via `profile.avatarEmoji`.
const CHILD_CONFIG = [
  { gradient: "from-sky-400 to-cyan-400",      ring: "ring-sky-200"    },
  { gradient: "from-orange-400 to-amber-400",  ring: "ring-orange-200" },
  { gradient: "from-rose-400 to-pink-500",     ring: "ring-rose-200"   },
  { gradient: "from-violet-400 to-purple-500", ring: "ring-violet-200" },
];

// Pulls the emoji to display for a profile, with fallback chain:
// 1. user's chosen avatarEmoji
// 2. canonical default for this id
// 3. hard fallback
const FALLBACK_EMOJIS: Record<string, string> = {
  "child-1": "🦈",
  "child-2": "🦸",
  "adult-1": "👩",
  "adult-2": "🎯",
};
const getProfileEmoji = (p: { id: string; avatarEmoji?: string }) =>
  p.avatarEmoji ?? FALLBACK_EMOJIS[p.id] ?? "👤";

const MODE_CONFIG: Record<GameMode, { emoji: string; label: string; gradient: string }> = {
  flashcards:     { emoji: "🃏", label: "Flashcards",  gradient: "from-sky-400 to-sky-500"       },
  multipleChoice: { emoji: "🎯", label: "Quiz",        gradient: "from-orange-400 to-red-400"    },
  listening:      { emoji: "👂", label: "Listen",      gradient: "from-blue-400 to-indigo-400"   },
  matching:       { emoji: "🔗", label: "Match",       gradient: "from-purple-400 to-violet-500" },
  conversation:   { emoji: "💬", label: "Chat",        gradient: "from-green-400 to-emerald-500" },
  restaurant:     { emoji: "🍽️", label: "Restaurant",  gradient: "from-orange-400 to-red-400"    },
  speaking:       { emoji: "🎙️", label: "Say It!",    gradient: "from-pink-400 to-rose-500"     },
  dialogue:       { emoji: "🎭", label: "Dialogue",    gradient: "from-indigo-400 to-violet-500" },
  alphabet:       { emoji: "🔤", label: "Alphabet",    gradient: "from-pink-400 to-purple-500"   },
};

const GUIDED_SEGMENTS: Array<{ label: string; maxSeconds: number }> = [
  { label: "flashcards",     maxSeconds: 120 },
  { label: "multipleChoice", maxSeconds: 420 },
  { label: "matching",       maxSeconds: 660 },
  { label: "roleplay",       maxSeconds: 900 }
];

function App() {
  const [appState, setAppState] = useLocalStorage(APP_STORAGE_KEY, createInitialState());
  const [activeView, setActiveView] = useState<AppView>("game");

  // ─── Migration: ensure exactly the 4 canonical profiles, correct names ─────
  // This runs once on mount. It MUST NEVER discard accumulated progress
  // (points, mastered words, badges, session history) — only fill in
  // missing canonical metadata (name, type) and create profiles that
  // don't exist yet.
  useEffect(() => {
    setAppState((s) => {
      const existingById: Record<string, ChildProfile> = {};
      s.children.forEach((c) => {
        if (c?.id) existingById[c.id] = c;
      });

      const fixed = CANONICAL_PROFILES.map((canonical) => {
        const existing = existingById[canonical.id];
        if (existing) {
          // Existing profile — preserve EVERYTHING from it, only correct
          // identity fields if they've drifted. Progress fields
          // (totalPoints, wordsMastered, etc.) are NEVER reset.
          //
          // For NEW fields like avatarEmoji that didn't exist before,
          // fill in the canonical default only if the field is missing.
          return {
            ...existing,
            name: existing.name || canonical.name,
            profileType: existing.profileType ?? canonical.type,
            avatarEmoji: existing.avatarEmoji ?? canonical.avatar,
          };
        }
        // Brand-new profile (no existing data)
        return createProfile(canonical.id, canonical.name, canonical.type, {
          currentLevel: canonical.level,
          totalPoints: canonical.points,
          accuracyPercentage: canonical.accuracy,
          avatarEmoji: canonical.avatar,
        });
      });

      // Cheap deep-ish equality: if every fixed profile is the SAME OBJECT
      // reference as its corresponding existing one, nothing changed and
      // we can short-circuit. Otherwise we replace the children array.
      const same =
        fixed.length === s.children.length &&
        fixed.every((f, i) => f === s.children[i]);
      if (same) return s;

      const activeStillExists = fixed.some((f) => f.id === s.activeProfileId);
      return {
        ...s,
        children: fixed,
        activeProfileId: activeStillExists ? s.activeProfileId : fixed[0].id,
      };
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [selectedWorldId, setSelectedWorldId] = useState<WorldId>("greetings");
  const [freePlayMode, setFreePlayMode] = useState<GameMode | null>(null);
  const [activeSession, setActiveSession] = useState<SessionState | null>(null);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [practicePool, setPracticePool] = useState<LessonTerm[]>([]);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);

  const deferredWorldId = useDeferredValue(selectedWorldId);
  const currentChild =
    appState.children.find((child) => child.id === appState.activeProfileId) ??
    appState.children[0];

  const unlockedWorldIds = getUnlockedWorldIds(
    currentChild.totalPoints,
    currentChild.profileType,
    currentChild.accuracyPercentage
  ) as WorldId[];

  useEffect(() => {
    if (!unlockedWorldIds.includes(selectedWorldId)) {
      setSelectedWorldId("greetings");
    }
  }, [selectedWorldId, unlockedWorldIds]);

  // Guided session timer
  useEffect(() => {
    if (activeSession?.mode !== "guided" || activeSession.dailyGoalReached) return;
    const timer = window.setInterval(() => {
      setActiveSession((s) => {
        if (!s || s.mode !== "guided" || s.dailyGoalReached) return s;
        const next = Math.min(s.elapsedSeconds + 1, dailyGoalSeconds);
        return { ...s, elapsedSeconds: next, dailyGoalReached: next >= dailyGoalSeconds };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeSession?.mode, activeSession?.dailyGoalReached]);

  const selectedTerms = getAvailableTermsForWorld(currentChild, deferredWorldId);

  // Kids get a shorter daily goal (5 min) so they can actually complete sessions
  const dailyGoalSeconds = currentChild.profileType === "child" ? DAILY_GOAL_SECONDS_KIDS : DAILY_GOAL_SECONDS;

  // Profile-aware term pool for adventure map word counts
  const profileAllTerms =
    currentChild.name === "Shannon"  ? ALL_SHANNON_CONTENT :
    currentChild.name === "Christy"  ? CHRISTY_LESSON_CONTENT :
    LESSON_CONTENT;

  const todayMinutes = getTodayMinutes(currentChild);
  const todayProgressSeconds =
    todayMinutes * 60 +
    (activeSession?.mode === "guided" && !activeSession.completed
      ? activeSession.elapsedSeconds
      : 0);
  const activeLevel = getLevel(currentChild.totalPoints);
  const suggestedWorld = getSuggestedWorld(currentChild);
  const reviewWords = getNeedsPracticeWords(currentChild);
  const selectedWorld = WORLDS.find((w) => w.id === deferredWorldId) ?? WORLDS[0];
  const topProgressPercent = Math.min(100, Math.round((todayProgressSeconds / dailyGoalSeconds) * 100));

  useEffect(() => {
    if (!activeSession && !freePlayMode) {
      setPracticePool(getWeightedPracticeSet(currentChild, selectedTerms, 8));
    }
  }, [
    activeSession,
    currentChild.id,
    currentChild.totalPoints,
    currentChild.wordsMastered.length,
    deferredWorldId,
    freePlayMode,
  ]);

  const updateProfile = (updater: (profile: ChildProfile) => ChildProfile) => {
    setAppState((s) => ({
      ...s,
      children: s.children.map((c) =>
        c.id === s.activeProfileId ? updater(c) : c
      ),
    }));
  };

  // Update the active profile's avatar emoji (called from the picker).
  const handleSetActiveAvatar = (emoji: string) => {
    setAppState((s) => ({
      ...s,
      children: s.children.map((c) =>
        c.id === s.activeProfileId ? { ...c, avatarEmoji: emoji } : c
      ),
    }));
  };

  const handleRenameProfile = (profileId: string, nextName: string) => {
    setAppState((s) => ({
      ...s,
      children: s.children.map((c) =>
        c.id === profileId ? { ...c, name: nextName } : c
      ),
    }));
  };

  const applyAnswerResult = (payload: AnswerPayload) => {
    let pointsEarned = 0;
    let newlyEarnedBadges: string[] = [];

    updateProfile((profile) => {
      const cur = profile.questionStats[payload.wordId] ?? { attempts: 0, correct: 0, mastered: false };
      const attempts = cur.attempts + 1;
      const correct = cur.correct + (payload.correct ? 1 : 0);
      const mastered = cur.mastered || correct >= 5;
      const earned = 5 + (payload.correct ? 10 : 0);
      const totalPoints = profile.totalPoints + earned;
      const nextWordsMastered =
        mastered && !profile.wordsMastered.includes(payload.wordId)
          ? [...profile.wordsMastered, payload.wordId]
          : profile.wordsMastered;

      // ── Daily points ledger ────────────────────────────────────────
      // Track points per day so "Today's Race" sees casual flashcard
      // play, not just completed 15-min sessions. Prune to last 30 days.
      const today = todayKey();
      const dailyPointsPrev = profile.dailyPoints ?? {};
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      const cutoffKey = cutoff.toISOString().slice(0, 10);
      const dailyPoints: Record<string, number> = {};
      for (const [date, pts] of Object.entries(dailyPointsPrev)) {
        if (date >= cutoffKey) dailyPoints[date] = pts;
      }
      dailyPoints[today] = (dailyPoints[today] ?? 0) + earned;

      const base: ChildProfile = {
        ...profile,
        totalPoints,
        totalQuestions: profile.totalQuestions + 1,
        totalCorrect: profile.totalCorrect + (payload.correct ? 1 : 0),
        accuracyPercentage: calculateAccuracy(
          profile.totalCorrect + (payload.correct ? 1 : 0),
          profile.totalQuestions + 1
        ),
        questionStats: {
          ...profile.questionStats,
          [payload.wordId]: { attempts, correct, mastered, lastSeenAt: new Date().toISOString() },
        },
        wordsMastered: nextWordsMastered,
        currentLevel: getLevel(totalPoints).id,
        dailyPoints,
      };

      newlyEarnedBadges = getNewBadges(base);
      pointsEarned = earned;
      return { ...base, badges: [...new Set([...base.badges, ...newlyEarnedBadges])] };
    });

    setActiveSession((s) =>
      s
        ? {
            ...s,
            sessionPoints: s.sessionPoints + pointsEarned,
            attemptedQuestions: s.attemptedQuestions + 1,
            correctAnswers: s.correctAnswers + (payload.correct ? 1 : 0),
            practicedWordIds: [...new Set([...s.practicedWordIds, payload.wordId])],
            badgesEarned: [...new Set([...s.badgesEarned, ...newlyEarnedBadges])],
          }
        : s
    );
  };

  const getGuidedMode = (): GameMode => {
    if (!activeSession) return "flashcards";
    if (activeSession.elapsedSeconds < GUIDED_SEGMENTS[0].maxSeconds) return "flashcards";
    if (activeSession.elapsedSeconds < GUIDED_SEGMENTS[1].maxSeconds) return "multipleChoice";
    if (activeSession.elapsedSeconds < GUIDED_SEGMENTS[2].maxSeconds) return "matching";
    return activeSession.worldId === "restaurant" ? "restaurant" : "conversation";
  };

  const startGuidedSession = () => {
    setPracticePool(getWeightedPracticeSet(currentChild, selectedTerms, 8));
    setFreePlayMode(null);
    setActiveSession({
      id: crypto.randomUUID(),
      worldId: deferredWorldId,
      mode: "guided",
      elapsedSeconds: 0,
      sessionPoints: 0,
      correctAnswers: 0,
      attemptedQuestions: 0,
      practicedWordIds: [],
      badgesEarned: [],
      dailyGoalReached: false,
      completed: false,
    });
  };

  const finishGuidedSession = (continueExploring: boolean) => {
    if (!activeSession) return;
    let finalMode: GameMode | null = null;
    const sessionAccuracy = calculateAccuracy(activeSession.correctAnswers, activeSession.attemptedQuestions);

    updateProfile((profile) => {
      const today = todayKey();
      const nextStreak =
        profile.lastPlayedDate === today
          ? Math.max(profile.streakCount, 1)
          : profile.lastPlayedDate === yesterdayKey()
          ? profile.streakCount + 1
          : 1;

      const streakBonus = nextStreak === 5 && profile.streakCount < 5 ? 100 : 0;
      const accuracyBonus = sessionAccuracy >= 90 ? 50 : 0;
      const bonusPoints = 25 + accuracyBonus + streakBonus;
      const badgeIds = [...activeSession.badgesEarned];
      if (!profile.badges.includes("15-minute-hero")) badgeIds.push("15-minute-hero");
      if (nextStreak >= 5 && !profile.badges.includes("5-day-streak")) badgeIds.push("5-day-streak");

      if (continueExploring) {
        finalMode = activeSession.worldId === "restaurant" ? "restaurant" : "conversation";
      }

      // Credit the session-completion bonus to today's ledger too
      const dailyPoints = { ...(profile.dailyPoints ?? {}) };
      dailyPoints[today] = (dailyPoints[today] ?? 0) + bonusPoints;

      return {
        ...profile,
        totalMinutesPracticed: profile.totalMinutesPracticed + 15,
        totalPoints: profile.totalPoints + bonusPoints,
        currentLevel: getLevel(profile.totalPoints + bonusPoints).id,
        streakCount: nextStreak,
        lastPlayedDate: today,
        dailyPoints,
        badges: [...new Set([...profile.badges, ...badgeIds])],
        dailyGoalCompletions: profile.dailyGoalCompletions + 1,
        sessionHistory: [
          {
            id: activeSession.id,
            date: today,
            minutesPlayed: 15,
            pointsEarned: activeSession.sessionPoints + bonusPoints,
            accuracy: sessionAccuracy,
            correctAnswers: activeSession.correctAnswers,
            attemptedQuestions: activeSession.attemptedQuestions,
            category: activeSession.worldId,
            mode: "guided" as const,
            practicedWordIds: activeSession.practicedWordIds,
            badgesEarned: badgeIds,
          },
          ...profile.sessionHistory,
        ].slice(0, 40),
      };
    });

    setActiveSession(null);
    setFreePlayMode(finalMode);
  };

  const renderCurrentGame = () => {
    const gameTerms = practicePool.length > 0 ? practicePool : selectedTerms;

    if (activeSession?.mode === "guided" && !activeSession.dailyGoalReached) {
      const mode = getGuidedMode();
      // Stable key: remounts only when session ID or game mode changes.
      // Tab switches DO NOT change these values, so cards persist correctly.
      const gk = `guided-${activeSession.id}-${mode}`;
      if (mode === "flashcards")     return <FlashcardGame key={gk} terms={gameTerms} onAnswer={applyAnswerResult} questionStats={currentChild.questionStats} />;
      if (mode === "multipleChoice") return <MultipleChoiceGame key={gk} terms={gameTerms} onAnswer={applyAnswerResult} />;
      if (mode === "matching")       return <MatchingGame key={gk} terms={gameTerms} onAnswer={applyAnswerResult} />;
      if (mode === "restaurant")     return <RestaurantRoleplayGame key={gk} terms={gameTerms} onAnswer={applyAnswerResult} />;
      return <ConversationGame key={gk} terms={gameTerms} onAnswer={applyAnswerResult} />;
    }

    if (activeSession?.mode === "guided" && activeSession.dailyGoalReached) {
      const finalAccuracy = calculateAccuracy(activeSession.correctAnswers, activeSession.attemptedQuestions);
      const ptsEarned = activeSession.sessionPoints;
      // Rank before and after (approximate)
      const sorted = [...appState.children].sort((a, b) => b.totalPoints - a.totalPoints);
      const myRank = sorted.findIndex(c => c.id === appState.activeProfileId) + 1;
      const nextAbove = sorted[myRank - 2]; // person just above current rank
      const ptsToNext = nextAbove ? nextAbove.totalPoints - currentChild.totalPoints : 0;

      return (
        <>
          <Confetti active={true} onDone={() => {}} />
          <div className="rounded-[28px] overflow-hidden shadow-xl border-2 border-green-300">
            {/* Celebration header */}
            <div className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 p-6 text-center">
              <p className="font-display text-5xl font-black text-white mb-1">¡Perfecto! 🎉</p>
              <p className="text-white/90 font-bold">Daily goal complete — {formatSeconds(dailyGoalSeconds)} of Spanish!</p>
            </div>

            <div className="bg-white p-6">
              {/* Stats grid */}
              <div className="grid gap-3 grid-cols-4 mb-5">
                {[
                  { label: "Pts Earned", value: `+${ptsEarned}`, color: "text-amber-500" },
                  { label: "Questions",  value: activeSession.attemptedQuestions, color: "text-blue-600" },
                  { label: "Correct",    value: activeSession.correctAnswers, color: "text-green-600" },
                  { label: "Accuracy",   value: `${finalAccuracy}%`, color: "text-purple-600" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-[18px] bg-gray-50 p-3 text-center border border-gray-100">
                    <p className="text-[10px] text-ink/50 font-black uppercase tracking-wide">{label}</p>
                    <p className={`font-display text-2xl font-black ${color}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Rank info */}
              <div className="rounded-[18px] bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 p-4 mb-5">
                <p className="font-bold text-indigo-800 text-sm">
                  📊 You're <strong>#{myRank}</strong> in the family
                  {ptsToNext > 0 && nextAbove
                    ? ` — ${ptsToNext} pts to pass ${nextAbove.name}!`
                    : myRank === 1
                    ? " — 👑 You're leading the family!"
                    : ""}
                </p>
                {/* Mini rank bars */}
                <div className="mt-3 flex gap-1 items-end h-8">
                  {sorted.map((p, i) => {
                    const maxPts = Math.max(...sorted.map(x => x.totalPoints), 1);
                    const height = Math.max(10, Math.round((p.totalPoints / maxPts) * 100));
                    const isMe = p.id === appState.activeProfileId;
                    const cfg = CHILD_CONFIG[i % CHILD_CONFIG.length];
                    return (
                      <div key={p.id} className="flex-1 flex flex-col items-center gap-0.5">
                        <div
                          className={`w-full rounded-t-sm bg-gradient-to-b ${cfg.gradient} ${isMe ? "ring-2 ring-white ring-offset-1" : "opacity-60"}`}
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[9px] font-bold text-ink/50">{p.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => finishGuidedSession(false)}
                  className="flex-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 py-4 font-black text-white shadow-lg text-lg hover:scale-[1.02] transition">
                  ✓ Finish & Save
                </button>
                <button onClick={() => finishGuidedSession(true)}
                  className="rounded-full bg-white border-2 border-gray-200 px-5 py-4 font-bold text-ink text-base hover:bg-gray-50">
                  Keep Playing →
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

    // key={freePlayMode + deferredWorldId} forces remount on mode/world change, preventing stale card state
    const gameKey = `${freePlayMode}-${deferredWorldId}-${currentChild.id}`;
    if (freePlayMode === "flashcards")     return <FlashcardGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} questionStats={currentChild.questionStats} />;
    if (freePlayMode === "multipleChoice") return <MultipleChoiceGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "listening")      return <ListeningGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "matching")       return <MatchingGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "restaurant")     return <RestaurantRoleplayGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "conversation")   return <ConversationGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "speaking")       return <SpeakingGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "dialogue")       return <DialogueGame key={gameKey} terms={gameTerms} onAnswer={applyAnswerResult} />;
    if (freePlayMode === "alphabet")       return <AlphabetGame key={gameKey} />;

    return (
      <div className="rounded-[28px] bg-white p-6 shadow-lg border border-gray-100">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-3xl font-black text-ink">{selectedWorld.title}</p>
            <p className="text-sm text-ink/70">{selectedWorld.description}</p>
          </div>
        </div>

        {/* Level indicator for adults */}
        {currentChild.profileType === "adult" && (
          <div className={`mb-4 rounded-[16px] px-4 py-3 flex items-center gap-3 ${
            currentChild.name === "Shannon"
              ? "bg-violet-50 border-2 border-violet-200"
              : "bg-amber-50 border-2 border-amber-200"
          }`}>
            <span className="text-2xl">{currentChild.name === "Shannon" ? "🎯" : "👩"}</span>
            <div>
              <p className={`text-xs font-black uppercase tracking-wider ${currentChild.name === "Shannon" ? "text-violet-600" : "text-amber-700"}`}>
                {currentChild.name === "Shannon" ? "Advanced Spain Curriculum" : "Intermediate Curriculum"}
              </p>
              <p className="text-sm text-ink/70">
                {currentChild.name === "Shannon"
                  ? "News, jokes, tongue twisters & hyper-local Calella content"
                  : "Real adult Spanish — housing, banking, healthcare & more"}
              </p>
            </div>
          </div>
        )}

        <div className="rounded-[24px] bg-gray-50 p-5 border border-gray-100">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="font-display text-2xl font-black text-ink">Today's Session</p>
              <p className="text-sm text-ink/70">
                Flashcards → Quiz → Match → Chat — {currentChild.profileType === "child" ? "5" : "15"} min total
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700 flex items-center gap-1">
              <Flag className="h-3 w-3" />
              {selectedTerms.length} words
            </span>
          </div>

          {currentChild.profileType === "child" ? (
            // Kids: 5-min session — just flashcards + quiz
            <div className="grid gap-2 grid-cols-2 mb-5">
              {[
                { emoji: "🃏", label: "Flashcards", time: "2 min", color: "from-sky-400 to-blue-500" },
                { emoji: "🎯", label: "Quiz",        time: "3 min", color: "from-orange-400 to-red-400" },
              ].map(({ emoji, label, time, color }) => (
                <div key={label} className={`rounded-[16px] bg-gradient-to-br ${color} p-4 text-center text-white shadow-sm`}>
                  <p className="text-3xl">{emoji}</p>
                  <p className="mt-1 text-xs font-black text-white/80 uppercase tracking-wide">{label}</p>
                  <p className="text-lg font-black">{time}</p>
                </div>
              ))}
            </div>
          ) : (
            // Adults: full 15-min session
            <div className="grid gap-2 grid-cols-4 mb-5">
              {[
                { emoji: "🃏", label: "Flashcards", time: "2 min" },
                { emoji: "🎯", label: "Quiz",        time: "5 min" },
                { emoji: "🔗", label: "Match",       time: "4 min" },
                { emoji: "💬", label: "Chat",        time: "4 min" },
              ].map(({ emoji, label, time }) => (
                <div key={label} className="rounded-[16px] bg-white p-3 text-center border border-gray-100 shadow-sm">
                  <p className="text-2xl">{emoji}</p>
                  <p className="mt-1 text-xs font-black text-ink/60 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-bold text-ink">{time}</p>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={startGuidedSession}
            className="w-full rounded-[24px] bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 py-5 font-display text-2xl font-black text-white shadow-xl transition hover:-translate-y-0.5 active:translate-y-0"
          >
            <Rocket className="mr-3 inline h-6 w-6" />
            Start Today's Adventure!
          </button>
        </div>
      </div>
    );
  };

  // Kids get the Alphabet button first (no adult vocab needed); adults skip it.
  const isKid = currentChild.profileType === "child";
  const baseModes: GameMode[] =
    deferredWorldId === "restaurant"
      ? ["flashcards", "multipleChoice", "listening", "matching", "restaurant", "speaking", "dialogue"]
      : ["flashcards", "multipleChoice", "listening", "matching", "conversation", "speaking", "dialogue"];
  const quickPlayModes: GameMode[] = isKid ? ["alphabet", ...baseModes] : baseModes;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#58d6ef] via-[#24b8da] to-[#1088ac]">
      {/* ── TOP BAR: Compact single-row header ──────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-[1400px] px-3 py-2 flex items-center gap-2 overflow-x-auto">

          {/* Profile Pills — compact single row, scrollable on mobile.
              Tap an inactive pill: switch to that profile.
              Tap your OWN (active) pill: open the avatar picker. */}
          <div className="flex gap-1.5 overflow-x-auto flex-shrink-0 scrollbar-hide">
            {appState.children.map((child, index) => {
              const active = child.id === appState.activeProfileId;
              const cfg = CHILD_CONFIG[index % CHILD_CONFIG.length];
              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => {
                    if (active) {
                      setAvatarPickerOpen(true);
                    } else {
                      startTransition(() => {
                        setAppState((s) => ({ ...s, activeProfileId: child.id }));
                        setActiveSession(null);
                        setFreePlayMode(null);
                      });
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-[14px] border-2 px-2.5 py-1.5 transition hover:scale-[1.02] active:scale-[0.98] flex-shrink-0 ${
                    active
                      ? "border-orange-300 bg-orange-50 shadow-md"
                      : "border-gray-200 bg-white"
                  }`}
                  aria-label={active ? `Tap to change ${child.name}'s avatar` : `Switch to ${child.name}`}
                  title={active ? "Tap to change avatar" : child.name}
                >
                  <div className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${cfg.gradient}`}>
                    <span className="text-lg leading-none">{getProfileEmoji(child)}</span>
                    {active && (
                      <span className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white text-[8px] leading-none px-0.5 shadow">
                        ✏️
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-black leading-none ${active ? "text-orange-700" : "text-ink"}`}>{child.name}</p>
                    <p className="text-[10px] font-bold text-amber-500 leading-none mt-0.5">⭐{child.totalPoints}</p>
                  </div>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 flex-shrink-0 hidden sm:block" />

          {/* Live Stats — compact row */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 ml-auto">
            {/* Streak */}
            <div className="flex items-center gap-1">
              <span className="text-base">🔥</span>
              <span className="font-display text-base font-black text-orange-500">{currentChild.streakCount}</span>
              <span className="text-[10px] text-ink/40 font-bold">streak</span>
            </div>
            {/* Daily progress bar + bonus label */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      topProgressPercent >= 100
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                        : "bg-gradient-to-r from-green-400 to-blue-500"
                    }`}
                    style={{ width: `${topProgressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-green-600 whitespace-nowrap">{formatSeconds(todayProgressSeconds)}/{formatSeconds(dailyGoalSeconds)}</span>
              </div>
              {topProgressPercent < 100 ? (
                <span className="text-[9px] font-black text-amber-600 whitespace-nowrap">
                  🎯 Complete for +50 bonus pts!
                </span>
              ) : (
                <span className="text-[9px] font-black text-green-600 whitespace-nowrap">
                  ✅ Daily goal done! +50 earned
                </span>
              )}
            </div>
            {/* Points */}
            <div className="flex items-center gap-1">
              <span className="text-base">⭐</span>
              <span className="font-display text-base font-black text-amber-500">{currentChild.totalPoints}</span>
            </div>
            {/* Level badge */}
            <div className="rounded-[8px] bg-gradient-to-b from-violet-500 to-purple-600 px-2 py-0.5 text-white">
              <p className="font-display text-sm font-black leading-none">Lv.{activeLevel.id}</p>
            </div>
            {/* Spain countdown — compact chip in header */}
            {(() => {
              const spainDate = new Date("2026-07-09T00:00:00");
              const days = Math.max(0, Math.ceil((spainDate.getTime() - new Date().getTime()) / 86400000));
              const color = days <= 14 ? "bg-red-500" : days <= 30 ? "bg-orange-500" : days <= 60 ? "bg-amber-500" : "bg-blue-600";
              return (
                <div className={`hidden lg:flex items-center gap-1 ${color} rounded-[8px] px-2 py-0.5 text-white`}>
                  <span className="text-xs">🇪🇸</span>
                  <span className="font-display text-sm font-black leading-none">{days}d</span>
                </div>
              );
            })()}
          </div>
        </div>
      </header>

      {/* ── TAB NAVIGATION (below header) ─────────────────────────────── */}
      <div className="sticky top-[52px] z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="mx-auto max-w-[1400px] px-2 flex">
          {(["game", "leaderboard", "explore"] as AppView[]).map((view) => {
            const labels: Record<AppView, string> = {
              game:        "🎮 Play",
              leaderboard: "🏆 Rankings",
              explore:     "🗺️ España",
            };
            return (
              <button
                key={view}
                onClick={() => {
                  // When leaving Play, reset freePlay so returning starts fresh
                  if (activeView === "game" && view !== "game") {
                    setFreePlayMode(null);
                  }
                  setActiveView(view);
                }}
                className={`flex-1 py-2.5 font-bold text-sm whitespace-nowrap transition border-b-2 ${
                  activeView === view
                    ? "border-orange-400 text-orange-600 bg-orange-50/50"
                    : "border-transparent text-ink/60 hover:text-ink hover:bg-white/30"
                }`}
              >
                {labels[view]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RACE STRIP + WORD OF THE DAY — just below tabs ── */}
      {activeView === "game" && (
        <div className="mx-auto max-w-[1400px] px-4 pt-3 pb-1 flex flex-col gap-2">
          <FamilyRaceStrip
            allProfiles={appState.children}
            currentProfileId={appState.activeProfileId}
          />
          {/* Spain countdown strip on mobile only (hidden on lg+ where header chip shows) */}
          <div className="lg:hidden">
            <SpainCountdown compact={true} />
          </div>
          <WordOfTheDay
            onPractice={(spanish, english) => {
              // Build a mini 1-card flashcard from today's word + similar terms
              const todayWord = { id: `wotd-${Date.now()}`, spanish, english, category: "greetings" as const, difficulty: 3 as const, pronunciation: "", example: spanish, level: "advanced-spain" as const };
              const extras = selectedTerms.slice(0, 7);
              setPracticePool([todayWord, ...extras]);
              setActiveSession(null);
              setFreePlayMode("flashcards");
            }}
          />
        </div>
      )}

      {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
      <main className="mx-auto max-w-[1400px] px-4 pt-3 pb-10">

        {/* ── GAME VIEW ────────────────────────── */}
        {activeView === "game" && (
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            {/* Left column: Game + quick play */}
            <div className="flex flex-1 flex-col gap-6">
              <section className="-mt-2">{renderCurrentGame()}</section>

              {/* Quick Play Modes */}
              <section className="rounded-[24px] bg-white/90 p-5 shadow border border-white/60">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl font-black text-ink">🎮 Quick Play</p>
                    <p className="text-sm text-ink/60">Pick any game mode to keep practicing!</p>
                  </div>
                  <div className="flex gap-2">
                    {freePlayMode && (
                      <button
                        type="button"
                        onClick={() => { setFreePlayMode(null); setActiveSession(null); }}
                        className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-200 transition"
                      >
                        ✕ Stop
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowParentDashboard((v) => !v)}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 transition"
                    >
                      {showParentDashboard ? "👨‍👩‍👧 Hide" : "👨‍👩‍👧 Parents"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-7">
                  {quickPlayModes.map((mode) => {
                    const cfg = MODE_CONFIG[mode];
                    const active = freePlayMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() =>
                          startTransition(() => {
                            setPracticePool(getWeightedPracticeSet(currentChild, selectedTerms, 8));
                            setActiveSession(null);
                            setFreePlayMode(mode);
                          })
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-[16px] border-2 p-3 text-center transition hover:scale-105 active:scale-95 ${
                          active
                            ? `bg-gradient-to-b ${cfg.gradient} border-white/40 shadow-lg text-white`
                            : "border-gray-200 bg-white text-ink hover:border-gray-300 shadow-sm"
                        }`}
                      >
                        <span className="text-2xl leading-none">{cfg.emoji}</span>
                        <span className={`text-xs font-black ${active ? "text-white" : "text-ink/70"}`}>
                          {cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Parent Dashboard */}
              {showParentDashboard && (
                <ParentDashboard childrenProfiles={appState.children} allTerms={LESSON_CONTENT} />
              )}
            </div>

            {/* Right column: Map + Stats */}
            <div className="flex flex-col gap-6 xl:w-[420px] xl:flex-shrink-0">
              <AdventureMap
                worlds={WORLDS}
                activeWorldId={deferredWorldId}
                unlockedWorldIds={unlockedWorldIds}
                child={currentChild}
                allTerms={profileAllTerms}
                onStartAdventure={startGuidedSession}
                onSelectWorld={(worldId) =>
                  startTransition(() => {
                    setSelectedWorldId(worldId);
                    setActiveSession(null);
                  })
                }
              />

              <div className="grid gap-4">
                <DailyTimer
                  progressSeconds={todayProgressSeconds}
                  goalSeconds={dailyGoalSeconds}
                  isRunning={activeSession?.mode === "guided" && !activeSession.dailyGoalReached}
                  goalReached={todayProgressSeconds >= dailyGoalSeconds || !!activeSession?.dailyGoalReached}
                />
                <PointsDisplay
                  lifetimePoints={currentChild.totalPoints}
                  sessionPoints={activeSession?.sessionPoints ?? 0}
                  levelName={activeLevel.title}
                  accuracy={currentChild.accuracyPercentage}
                />
                <ProgressDashboard
                  child={currentChild}
                  todayMinutes={todayMinutes}
                  nextWorldLabel={suggestedWorld.title}
                  wordsToReview={reviewWords}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── LEADERBOARD VIEW ─────────────────── */}
        {activeView === "leaderboard" && (
          <div className="max-w-2xl mx-auto">
            <LeaderboardView
              appState={appState}
              activeProfileId={appState.activeProfileId}
              liveSessionPoints={activeSession?.sessionPoints ?? 0}
            />
          </div>
        )}

        {/* ── EXPLORE VIEW ─────────────────────── */}
        {activeView === "explore" && (
          <UnlockableContentView
            currentDayNumber={Math.max(
              1,
              currentChild.sessionHistory.length + 1,
              // Use pts as proxy: every 150 pts ≈ 1 completed session (10 questions × 15 pts)
              Math.floor(currentChild.totalPoints / 150) + 1
            )}
            profileName={currentChild.name}
          />
        )}
      </main>

      {/* ── AVATAR PICKER (overlay) ───────────────────────────────────── */}
      {avatarPickerOpen && (
        <AvatarPicker
          currentEmoji={getProfileEmoji(currentChild)}
          profileName={currentChild.name}
          onSelect={handleSetActiveAvatar}
          onClose={() => setAvatarPickerOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
