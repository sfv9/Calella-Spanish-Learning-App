import { useMemo } from "react";
import {
  calculateCompetitionStats,
  CompetitionStats,
  getCompetitionBadges
} from "../lib/leaderboard";
import { StoredAppState, ChildProfile } from "../types";

interface LeaderboardViewProps {
  appState: StoredAppState;
  activeProfileId?: string;
  liveSessionPoints?: number;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayPoints(profile: ChildProfile): number {
  const today = todayKey();
  return profile.sessionHistory
    .filter(s => s.date === today)
    .reduce((sum, s) => sum + (s.pointsEarned ?? 0), 0);
}

export function LeaderboardView({ appState, activeProfileId, liveSessionPoints = 0 }: LeaderboardViewProps) {
  const stats = useMemo(() => {
    return calculateCompetitionStats(appState);
  }, [appState]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-slate-50 to-white rounded-lg shadow-lg border-2 border-slate-200">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="font-display text-4xl font-black text-ink mb-2">
          🏆 Family Leaderboard
        </h2>
        <p className="text-sm text-ink/60">
          See who's crushing it in Spanish learning!
        </p>
      </div>

      {/* DAILY CHAMPION — only if someone played today */}
      {stats.dailyWinners.length > 0 ? (
        <DailyChampionCard appState={appState} dailyWinner={stats.dailyWinners[0]} />
      ) : (
        <div className="rounded-[16px] border-2 border-dashed border-amber-300 bg-amber-50 p-5 text-center">
          <p className="text-3xl mb-2">🏆</p>
          <p className="font-display text-xl font-black text-amber-700">No champion yet today!</p>
          <p className="text-sm text-amber-600 mt-1">
            Play now to become today's champion and earn the crown 👑
          </p>
        </div>
      )}

      {/* TODAY'S RACE — live daily points */}
      <TodaysRaceSection
        profiles={appState.children}
        activeProfileId={activeProfileId}
        liveSessionPoints={liveSessionPoints}
      />

      {/* WEEKLY RANKINGS */}
      <WeeklyRankingsSection standings={stats.weeklyLeaderboard} profiles={appState.children} />

      {/* STREAK COMPETITION */}
      <StreakCompetitionSection streaks={stats.streakCompetition} />

      {/* MASTERY RACE */}
      <MasteryRaceSection mastery={stats.masteryRace} />

      {/* BADGES */}
      <BadgesSection appState={appState} stats={stats} />
    </div>
  );
}

// ===== DAILY CHAMPION CARD =====

interface DailyChampionCardProps {
  appState: StoredAppState;
  dailyWinner: { date: string; winnerId: string; pointsEarned: number; gameType: string };
}

function DailyChampionCard({ appState, dailyWinner }: DailyChampionCardProps) {
  const winner = appState.children.find((c) => c.id === dailyWinner.winnerId);
  if (!winner) return null;

  const emoji = winner.avatarEmoji ?? PROFILE_EMOJIS[winner.id] ?? "👤";

  return (
    <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-[20px] p-6 text-white shadow-lg border-2 border-yellow-300">
      <div className="text-center">
        <p className="text-sm font-black uppercase tracking-widest opacity-90">
          TODAY'S CHAMPION
        </p>
        <div className="text-6xl mt-2">{emoji}</div>
        <h3 className="font-display text-3xl font-black mt-3 text-white drop-shadow-sm">
          {winner.name}
        </h3>
        <p className="text-xl font-bold mt-2">
          {dailyWinner.pointsEarned} points today! 🎉
        </p>
        <p className="text-xs opacity-75 mt-1">Keep it up tomorrow!</p>
      </div>
    </div>
  );
}

// ===== WEEKLY RANKINGS SECTION =====

const RANK_STYLES = [
  { bg: "from-amber-400 to-yellow-500",   border: "border-amber-300", medal: "🥇", label: "CHAMPION"  },
  { bg: "from-slate-400 to-slate-500",    border: "border-slate-300", medal: "🥈", label: "RUNNER-UP" },
  { bg: "from-orange-400 to-amber-500",   border: "border-orange-300",medal: "🥉", label: "3RD PLACE"  },
  { bg: "from-blue-400 to-indigo-500",    border: "border-blue-300",  medal: "4️⃣", label: "4TH"       },
];

// Fallback emojis (overridden by user-picked profile.avatarEmoji).
const PROFILE_EMOJIS: Record<string, string> = {
  "child-1": "🦈",
  "child-2": "🦸",
  "adult-1": "👩",
  "adult-2": "🎯",
};

function WeeklyRankingsSection({ standings, profiles }: { standings: any[]; profiles: ChildProfile[] }) {
  const maxPts = Math.max(...standings.map((s: any) => s.totalPoints), 1);
  const profileById = new Map(profiles.map(p => [p.id, p]));

  return (
    <div className="bg-white rounded-[16px] border-2 border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-3">
        <h3 className="font-display text-xl font-black text-white flex items-center gap-2">
          📊 Family Rankings
        </h3>
        <p className="text-xs text-white/70">All-time points · Who's the champion?</p>
      </div>

      <div className="p-4 space-y-3">
        {standings.map((standing: any, index: number) => {
          const style = RANK_STYLES[index] ?? RANK_STYLES[3];
          const pct = Math.round((standing.totalPoints / maxPts) * 100);
          const profile = profileById.get(standing.profileId);
          const emoji = profile?.avatarEmoji ?? PROFILE_EMOJIS[standing.profileId] ?? "👤";
          const ptsToNext = index > 0
            ? standings[index - 1].totalPoints - standing.totalPoints
            : null;

          return (
            <div key={standing.profileId}
              className={`rounded-[14px] border-2 ${style.border} overflow-hidden`}>
              {/* Top row */}
              <div className={`bg-gradient-to-r ${style.bg} px-4 py-2 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{style.medal}</span>
                  <span className="text-xl">{emoji}</span>
                  <span className="font-display text-lg font-black text-white">{standing.profileName}</span>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">{style.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-black text-white">{standing.totalPoints}</span>
                  <span className="text-xs text-white/70 ml-1">pts</span>
                </div>
              </div>

              {/* Bottom row: progress + details */}
              <div className="bg-white px-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${style.bg} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-ink/50 font-bold">{standing.accuracy}% acc</span>
                </div>
                {ptsToNext !== null && ptsToNext > 0 && (
                  <p className="text-xs text-ink/50">
                    {ptsToNext} pts to pass <strong>{standings[index-1].profileName}</strong>
                  </p>
                )}
                {ptsToNext === null && (
                  <p className="text-xs text-amber-600 font-bold">👑 Leading the family!</p>
                )}
                {ptsToNext !== null && ptsToNext === 0 && (
                  <p className="text-xs text-green-600 font-bold">🎉 Tied for the lead!</p>
                )}
                {standing.totalPoints === 0 && (
                  <p className="text-xs text-blue-600 font-bold animate-pulse">
                    ▶ Open Play tab to earn your first points! Every question = 15 pts
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== STREAK COMPETITION SECTION =====

function StreakCompetitionSection({ streaks }: { streaks: any[] }) {
  const topStreakHolder = streaks[0];

  return (
    <div className="bg-white rounded-[16px] border-2 border-red-200 p-5">
      <h3 className="font-display text-xl font-black text-red-600 mb-4 flex items-center gap-2">
        🔥 Streak Competition
      </h3>

      {/* CURRENT STREAKS */}
      <div className="space-y-3 mb-4">
        {streaks.map((streak) => (
          <div key={streak.profileId} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
            <div>
              <p className="font-bold text-ink">{streak.profileName}</p>
              <p className="text-xs text-ink/60">
                Longest ever: {streak.longestStreak} days
              </p>
            </div>
            <div className="text-right">
              <div className="font-display text-3xl font-black text-red-500">
                {streak.currentStreak}
              </div>
              <p className="text-xs text-ink/60">days in a row 🔥</p>
            </div>
          </div>
        ))}
      </div>

      {/* STREAK KING STATUS */}
      {topStreakHolder && topStreakHolder.currentStreak >= 3 && (
        <div className="bg-gradient-to-r from-red-300 to-orange-300 rounded-lg p-4 text-white text-center font-bold">
          👑 {topStreakHolder.profileName} is the Streak King!
        </div>
      )}
    </div>
  );
}

// ===== MASTERY RACE SECTION =====

function MasteryRaceSection({ mastery }: { mastery: any[] }) {
  return (
    <div className="bg-white rounded-[16px] border-2 border-purple-200 p-5">
      <h3 className="font-display text-xl font-black text-purple-600 mb-4 flex items-center gap-2">
        📚 Mastery Race
      </h3>
      <div className="space-y-4">
        {mastery.map((entry) => (
          <div key={entry.profileId} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-black text-purple-600">
                  #{entry.rank}
                </span>
                <div>
                  <p className="font-bold text-ink">{entry.profileName}</p>
                  <p className="text-xs text-ink/60">
                    {entry.wordsMastered} words mastered
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-black text-purple-600">
                  {entry.progressToNextLevel}%
                </p>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden border border-purple-300">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                style={{ width: `${entry.progressToNextLevel}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== BADGES SECTION =====

function BadgesSection({ appState, stats }: { appState: StoredAppState; stats: CompetitionStats }) {
  return (
    <div className="bg-white rounded-[16px] border-2 border-amber-200 p-5">
      <h3 className="font-display text-xl font-black text-amber-600 mb-4 flex items-center gap-2">
        🎖️ Achievements
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {appState.children.map((profile) => {
          const badges = getCompetitionBadges(profile, stats);
          const earnedBadges = badges.filter((b) => b.earned);

          return (
            <div key={profile.id} className="p-4 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
              <p className="font-bold text-ink mb-3">{profile.name}'s Badges</p>

              {earnedBadges.length === 0 ? (
                <p className="text-sm text-ink/50">
                  No badges yet. Keep practicing!
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-gradient-to-b from-yellow-300 to-amber-400 px-3 py-2 rounded-full text-xs font-bold text-white shadow-md text-center"
                      title={badge.description}
                    >
                      {badge.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== TODAY'S RACE =====
const PROFILE_EMOJIS_LB: Record<string, string> = {
  "child-1": "🦈", "child-2": "🦸", "adult-1": "👩", "adult-2": "🎯",
};

function TodaysRaceSection({ profiles, activeProfileId, liveSessionPoints = 0 }: {
  profiles: ChildProfile[];
  activeProfileId?: string;
  liveSessionPoints?: number;
}) {
  const sorted = [...profiles]
    .map(p => {
      const completed = getTodayPoints(p);
      // Add live in-session points for the currently active profile
      const live = p.id === activeProfileId ? liveSessionPoints : 0;
      return { profile: p, todayPts: completed + live, isLive: live > 0 };
    })
    .sort((a, b) => b.todayPts - a.todayPts);

  const anyPlayedToday = sorted.some(e => e.todayPts > 0);
  const maxPts = Math.max(...sorted.map(e => e.todayPts), 1);

  return (
    <div className="bg-white rounded-[16px] border-2 border-green-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-black text-white">⚡ Today's Race</h3>
          <p className="text-xs text-white/70">Points earned today · Live standings</p>
        </div>
        {sorted.some(e => e.isLive) && (
          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full font-black animate-pulse">🔴 LIVE</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        {sorted.map(({ profile, todayPts, isLive }, i) => {
          const pct = Math.round((todayPts / maxPts) * 100);
          const emoji = profile.avatarEmoji ?? PROFILE_EMOJIS_LB[profile.id] ?? "👤";
          const isLeading = i === 0 && todayPts > 0;
          return (
            <div key={profile.id} className={`rounded-[12px] border p-3 ${
              isLeading ? "border-green-300 bg-green-50" : "border-gray-100 bg-gray-50"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{emoji}</span>
                  <span className="font-bold text-ink">{profile.name}</span>
                  {isLeading && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-black">LEADING</span>}
                  {isLive && !isLeading && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">▶ PLAYING</span>}
                </div>
                <div className="text-right">
                  {todayPts > 0 ? (
                    <div>
                      <span className="font-display text-xl font-black text-green-600">+{todayPts}</span>
                      {isLive && <span className="text-[10px] text-blue-500 font-black block">in session</span>}
                    </div>
                  ) : (
                    <span className="text-sm text-ink/40 font-bold">Not played</span>
                  )}
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isLeading ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : isLive ? "bg-gradient-to-r from-blue-400 to-blue-500"
                    : "bg-gray-300"
                  }`}
                  style={{ width: `${anyPlayedToday ? pct : 0}%` }}
                />
              </div>
            </div>
          );
        })}
        {!anyPlayedToday && (
          <p className="text-center text-sm text-ink/50 py-2">
            🏁 First to play earns the crown today!
          </p>
        )}
      </div>
    </div>
  );
}
