import { ChildProfile, StoredAppState } from "../types";
import { todayKey } from "./game";

/**
 * Leaderboard & Competition System
 *
 * Tracks:
 * - Daily winners (highest points earned today)
 * - Weekly rankings (total points, accuracy)
 * - Streak competition (consecutive practice days)
 * - Mastery race (words mastered toward level goal)
 */

export interface DailyWinnerEntry {
  date: string;
  winnerId: string;
  pointsEarned: number;
  gameType: string;
}

export interface WeeklyStanding {
  profileId: string;
  profileName: string;
  totalPoints: number;
  accuracy: number;
  rank: number;
  trend?: "up" | "down" | "steady";
}

export interface StreakCompetition {
  profileId: string;
  profileName: string;
  currentStreak: number;
  longestStreak: number;
  rank: number;
}

export interface MasteryRace {
  profileId: string;
  profileName: string;
  wordsMastered: number;
  progressToNextLevel: number; // 0-100 percent
  rank: number;
}

export interface CompetitionStats {
  dailyWinners: DailyWinnerEntry[];
  weeklyLeaderboard: WeeklyStanding[];
  streakCompetition: StreakCompetition[];
  masteryRace: MasteryRace[];
}

/**
 * Lookup how many points a profile has earned TODAY.
 * Reads `profile.dailyPoints[today]` (which is updated on every answer
 * in App.tsx), falling back to summing sessionHistory for legacy state
 * that pre-dates the dailyPoints ledger.
 */
export const getTodayPointsFor = (profile: ChildProfile): number => {
  const today = todayKey();
  const fromLedger = profile.dailyPoints?.[today];
  if (typeof fromLedger === "number") return fromLedger;
  // Legacy fallback: sum any completed sessions for today
  return profile.sessionHistory
    .filter((s) => s.date === today)
    .reduce((sum, s) => sum + (s.pointsEarned ?? 0), 0);
};

/**
 * Calculate daily winner (highest points earned today)
 */
export const calculateDailyWinner = (
  profiles: ChildProfile[]
): DailyWinnerEntry | null => {
  const today = todayKey();

  const dailyPoints = profiles.map((profile) => ({
    profile,
    pointsToday: getTodayPointsFor(profile),
  }));

  const winner = dailyPoints.reduce((best, current) =>
    current.pointsToday > best.pointsToday ? current : best
  );

  // No one has played today yet — return null so no champion banner shows
  if (winner.pointsToday === 0) return null;

  return {
    date: today,
    winnerId: winner.profile.id,
    pointsEarned: winner.pointsToday,
    gameType: "mixed",
  };
};

/**
 * Family Rankings — all-time totals. The UI calls this "Family Rankings"
 * with subtitle "All-time points · Who's the champion?", so we use
 * profile.totalPoints directly. (Previously this mixed weekly + lifetime,
 * which made the numbers inconsistent depending on play history.)
 */
export const calculateWeeklyLeaderboard = (
  profiles: ChildProfile[]
): WeeklyStanding[] => {
  const standings = profiles
    .map((profile) => ({
      profileId: profile.id,
      profileName: profile.name,
      totalPoints: profile.totalPoints,
      accuracy: profile.accuracyPercentage,
    }))
    .sort((a, b) => {
      // Sort by points first, then accuracy
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      return b.accuracy - a.accuracy;
    })
    .map((standing, index) => ({
      ...standing,
      rank: index + 1
    }));

  // Calculate trends (if we have historical data)
  // For now, trends are neutral
  return standings.map((s) => ({ ...s, trend: "steady" as const }));
};

/**
 * Calculate streak competition
 */
export const calculateStreakCompetition = (
  profiles: ChildProfile[]
): StreakCompetition[] => {
  const competition = profiles
    .map((profile) => {
      // Calculate current streak
      const today = new Date();
      let currentStreak = profile.streakCount ?? 0;

      // Check if streak is still active (practiced today or yesterday)
      if (currentStreak > 0) {
        const lastSession = profile.sessionHistory[profile.sessionHistory.length - 1];
        if (lastSession) {
          const lastDate = new Date(`${lastSession.date}T00:00:00`);
          const daysSinceLastSession = Math.floor(
            (today.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000)
          );
          if (daysSinceLastSession > 1) {
            currentStreak = 0; // Streak broken
          }
        }
      }

      // Find longest streak ever (enhanced sessionHistory would track this)
      // For now, assume longestStreak = currentStreak (could be improved)
      const longestStreak = Math.max(currentStreak, profile.streakCount ?? 0);

      return {
        profileId: profile.id,
        profileName: profile.name,
        currentStreak,
        longestStreak
      };
    })
    .sort((a, b) => b.currentStreak - a.currentStreak)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

  return competition;
};

/**
 * Calculate mastery race (progress toward mastering level)
 * Goal: Master all words in current level
 */
export const calculateMasteryRace = (
  profiles: ChildProfile[],
  worldsByProfile: Map<string, { total: number; mastered: number }>
): MasteryRace[] => {
  const race = profiles
    .map((profile) => {
      const worldData = worldsByProfile.get(profile.id);
      const wordsMastered = worldData?.mastered ?? profile.wordsMastered.length;
      const totalInLevel = worldData?.total ?? 50; // Default estimate

      const progressPercent = Math.round((wordsMastered / totalInLevel) * 100);

      return {
        profileId: profile.id,
        profileName: profile.name,
        wordsMastered,
        progressToNextLevel: Math.min(100, progressPercent)
      };
    })
    .sort((a, b) => b.progressToNextLevel - a.progressToNextLevel)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

  return race;
};

/**
 * Main function: Calculate all competition stats
 */
export const calculateCompetitionStats = (
  state: StoredAppState,
  worldsByProfile?: Map<string, { total: number; mastered: number }>
): CompetitionStats => {
  const profiles = state.children;

  const dailyWinner = calculateDailyWinner(profiles);
  const weeklyLeaderboard = calculateWeeklyLeaderboard(profiles);
  const streakCompetition = calculateStreakCompetition(profiles);
  const masteryRace = calculateMasteryRace(
    profiles,
    worldsByProfile ?? new Map()
  );

  return {
    dailyWinners: dailyWinner ? [dailyWinner] : [],
    weeklyLeaderboard,
    streakCompetition,
    masteryRace
  };
};

/**
 * Check if a profile has earned a badge
 */
export interface CompetitionBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
}

export const getCompetitionBadges = (
  profile: ChildProfile,
  competitionStats: CompetitionStats
): CompetitionBadge[] => {
  const badges: CompetitionBadge[] = [];

  // Daily Champion: Top points today
  const isDailyChampion = competitionStats.dailyWinners.some(
    (w) => w.winnerId === profile.id
  );
  badges.push({
    id: "daily-champion",
    name: "Daily Champion 🏆",
    description: "Highest points earned today",
    earned: isDailyChampion
  });

  // Streak King: 3+ day streak
  const streakEntry = competitionStats.streakCompetition.find(
    (s) => s.profileId === profile.id
  );
  badges.push({
    id: "streak-king",
    name: "Streak King 🔥",
    description: "3+ consecutive days of practice",
    earned: (streakEntry?.currentStreak ?? 0) >= 3
  });

  // Consistency: 1 week (7 days) streak
  badges.push({
    id: "consistent",
    name: "Consistent ⭐",
    description: "7-day practice streak",
    earned: (streakEntry?.currentStreak ?? 0) >= 7
  });

  // Language Master: 50% mastery of level
  const masteryEntry = competitionStats.masteryRace.find(
    (m) => m.profileId === profile.id
  );
  badges.push({
    id: "half-master",
    name: "Half Master 📚",
    description: "50% mastery of current level",
    earned: (masteryEntry?.progressToNextLevel ?? 0) >= 50
  });

  // Full Master: 100% mastery
  badges.push({
    id: "full-master",
    name: "Full Master 🎓",
    description: "100% mastery of current level",
    earned: (masteryEntry?.progressToNextLevel ?? 0) >= 100
  });

  // Top Accuracy: 90%+ accuracy
  badges.push({
    id: "accuracy-expert",
    name: "Accuracy Expert 🎯",
    description: "90%+ accuracy on attempts",
    earned: profile.accuracyPercentage >= 90
  });

  // Friendly Competitor: Encourage others
  // (Could track if user cheered other players, or just give to non-solo accounts)
  badges.push({
    id: "friendly",
    name: "Friendly Competitor 🤝",
    description: "Practicing with the family",
    earned: true // Always earned in family learning context
  });

  return badges;
};

/**
 * Get comparison stats for a profile vs others
 */
export interface ProfileComparison {
  profile: {
    id: string;
    name: string;
    points: number;
    accuracy: number;
    streak: number;
    mastery: number;
  };
  comparison: {
    pointsVsAverage: number; // points compared to avg
    streakRank: number;
    masteryRank: number;
    overallRank: number;
  };
}

export const getProfileComparison = (
  profileId: string,
  competitionStats: CompetitionStats,
  allProfiles: ChildProfile[]
): ProfileComparison | null => {
  const profile = allProfiles.find((p) => p.id === profileId);
  if (!profile) return null;

  const weekly = competitionStats.weeklyLeaderboard.find(
    (w) => w.profileId === profileId
  );
  const streak = competitionStats.streakCompetition.find(
    (s) => s.profileId === profileId
  );
  const mastery = competitionStats.masteryRace.find(
    (m) => m.profileId === profileId
  );

  const avgPoints =
    competitionStats.weeklyLeaderboard.reduce((sum, w) => sum + w.totalPoints, 0) /
    Math.max(1, competitionStats.weeklyLeaderboard.length);

  return {
    profile: {
      id: profile.id,
      name: profile.name,
      points: weekly?.totalPoints ?? 0,
      accuracy: weekly?.accuracy ?? 0,
      streak: streak?.currentStreak ?? 0,
      mastery: mastery?.progressToNextLevel ?? 0
    },
    comparison: {
      pointsVsAverage: (weekly?.totalPoints ?? 0) - avgPoints,
      streakRank: streak?.rank ?? competitionStats.streakCompetition.length,
      masteryRank: mastery?.rank ?? competitionStats.masteryRace.length,
      overallRank: weekly?.rank ?? competitionStats.weeklyLeaderboard.length
    }
  };
};
