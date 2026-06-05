import { ChildProfile, StoredAppState } from "../types";

export const APP_STORAGE_KEY = "spanish-adventure-map-state";

export const createProfile = (
  id: string,
  name: string,
  profileType: "child" | "adult" = "child",
  overrides?: Partial<ChildProfile>
): ChildProfile => ({
  id,
  name,
  profileType,
  totalMinutesPracticed: 0,
  totalPoints: 0,
  streakCount: 0,
  currentLevel: 1,
  accuracyPercentage: 0,
  wordsMastered: [],
  questionStats: {},
  totalQuestions: 0,
  totalCorrect: 0,
  badges: [],
  dailyGoalCompletions: 0,
  sessionHistory: [],
  ...overrides,
});

export const createInitialState = (): StoredAppState => ({
  activeProfileId: "child-1",
  resetVersion: 1, // matches App.tsx RESET_VERSION; new installs start "post-reset"
  children: [
    createProfile("child-1", "Ila",     "child", { avatarEmoji: "🦈" }),
    createProfile("child-2", "Ian",     "child", { avatarEmoji: "🦸" }),
    // Adults start at 0 points but with their canonical accuracy seed so
    // Christy gets intermediate content and Shannon gets advanced Calella
    // content from the first question they answer.
    createProfile("adult-1", "Christy", "adult", { accuracyPercentage: 65 }),
    createProfile("adult-2", "Shannon", "adult", { accuracyPercentage: 85 }),
  ]
});
