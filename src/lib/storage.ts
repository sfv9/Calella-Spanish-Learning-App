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
  children: [
    createProfile("child-1", "Ila",     "child"),
    createProfile("child-2", "Ian",     "child"),
    createProfile("adult-1", "Christy", "adult", {
      currentLevel: 4,
      totalPoints: 800, // Unlocks most worlds except advanced ones
      accuracyPercentage: 65,
    }),
    createProfile("adult-2", "Shannon", "adult", {
      currentLevel: 7,
      totalPoints: 2000, // Unlocks all worlds
      accuracyPercentage: 85,
    }),
  ]
});
