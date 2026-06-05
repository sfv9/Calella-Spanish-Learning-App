export type WorldId =
  | "greetings"
  | "playground"
  | "restaurant"
  | "feelings"
  | "colorsNumbers"
  | "animalsToys"
  | "school"
  | "family"
  | "polite"
  | "housing"
  | "banking"
  | "healthcare"
  | "dining"
  | "shopping"
  | "admin"
  | "culture";

export type GameMode =
  | "flashcards"
  | "multipleChoice"
  | "listening"
  | "matching"
  | "conversation"
  | "restaurant"
  | "speaking"
  | "dialogue"
  | "alphabet";

export interface LessonTerm {
  id: string;
  spanish: string;
  english: string;
  category: WorldId;
  difficulty: 1 | 2 | 3 | 4 | 5;
  pronunciation: string;
  example: string;
  level?: "kids" | "intermediate" | "advanced-spain";
}

export interface WorldDefinition {
  id: WorldId;
  title: string;
  shortTitle: string;
  description: string;
  unlockPoints: number;
  iconKey: string;
  colorClass: string;
  accentClass: string;
  mapPosition: {
    top: string;
    left: string;
  };
}

export interface LevelDefinition {
  id: number;
  title: string;
  minimumPoints: number;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
}

export interface WordProgress {
  attempts: number;
  correct: number;
  mastered: boolean;
  lastSeenAt?: string;
}

export interface SessionSummary {
  id: string;
  date: string;
  minutesPlayed: number;
  pointsEarned: number;
  accuracy: number;
  correctAnswers: number;
  attemptedQuestions: number;
  category: WorldId;
  mode: "guided" | GameMode;
  practicedWordIds: string[];
  badgesEarned: string[];
}

export interface ChildProfile {
  id: string;
  name: string;
  profileType?: "child" | "adult";
  /**
   * Avatar emoji shown in profile pills, race strip, leaderboard, etc.
   * Optional: if unset, the app falls back to a position-based default.
   * Users can tap their own pill to open the avatar picker.
   */
  avatarEmoji?: string;
  totalMinutesPracticed: number;
  totalPoints: number;
  streakCount: number;
  currentLevel: number;
  accuracyPercentage: number;
  wordsMastered: string[];
  questionStats: Record<string, WordProgress>;
  totalQuestions: number;
  totalCorrect: number;
  lastPlayedDate?: string;
  badges: string[];
  dailyGoalCompletions: number;
  sessionHistory: SessionSummary[];
}

export interface StoredAppState {
  children: ChildProfile[];
  activeProfileId: string;
}

export interface AnswerPayload {
  wordId: string;
  correct: boolean;
}

export interface SessionState {
  id: string;
  worldId: WorldId;
  mode: "guided" | GameMode;
  elapsedSeconds: number;
  sessionPoints: number;
  correctAnswers: number;
  attemptedQuestions: number;
  practicedWordIds: string[];
  badgesEarned: string[];
  dailyGoalReached: boolean;
  completed: boolean;
}
