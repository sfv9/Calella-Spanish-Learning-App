import { ChildProfile } from "../types";

interface FamilyRaceStripProps {
  allProfiles: ChildProfile[];
  currentProfileId: string;
}

const PROFILE_EMOJIS: Record<string, string> = {
  "child-1": "🌟",
  "child-2": "🦁",
  "adult-1": "👩",
  "adult-2": "🎯",
};

const CHASE_TAUNTS = [
  "{pts} pts to pass {name}! 🏃",
  "Beat {name} in {pts} pts! 🔥",
  "{pts} pts gap — close it! ⚡",
  "Only {pts} pts away! 💪",
];
const LEADING_MSGS = [
  "{name} is {pts} pts back! 🏆",
  "Hold on! {name} is chasing! 🔥",
  "{pts} pts ahead — keep it! ⭐",
  "{name} wants your spot! 😤",
];
const WINNING_BY_A_LOT = [
  "¡Campeón! 👑 {pts} pts ahead",
  "Dominating! {pts} pts clear 🚀",
  "Way out front! 🏅",
];
const KIDS_TIED = [
  "You and {name} are TIED! 🤝 First to answer wins!",
  "Even with {name}! One answer to take the lead! ⚡",
  "TIED! Quick — beat {name} to it! 🏁",
];
const KIDS_FIRST_POINTS = [
  "Be the first kid to score today! 🏆",
  "Answer one question — take the lead! ⚡",
  "First mover wins! Start playing! 🎯",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function FamilyRaceStrip({ allProfiles, currentProfileId }: FamilyRaceStripProps) {
  const me = allProfiles.find(p => p.id === currentProfileId);
  if (!me) return null;

  const isKid = me.profileType === "child";
  const kids = allProfiles.filter(p => p.profileType === "child");
  const adults = allProfiles.filter(p => p.profileType === "adult");

  // ── Kids: compete only within kids pool ──────────────────────────────
  if (isKid && kids.length > 1) {
    const sortedKids = [...kids].sort((a, b) => b.totalPoints - a.totalPoints);
    const myKidIdx = sortedKids.findIndex(p => p.id === currentProfileId);
    const kidRank = myKidIdx + 1;
    const kidAbove = sortedKids[myKidIdx - 1];
    const kidBelow = sortedKids[myKidIdx + 1];
    const ptsToNextKid = kidAbove ? kidAbove.totalPoints - me.totalPoints : 0;
    const ptsAheadKid = kidBelow ? me.totalPoints - kidBelow.totalPoints : 0;

    // Also show gap to best adult for extra motivation
    const topAdult = adults.sort((a, b) => b.totalPoints - a.totalPoints)[0];
    const ptsToAdult = topAdult ? topAdult.totalPoints - me.totalPoints : 0;

    let msg = "";
    let bgClass = "from-sky-400 to-cyan-500";

    if (me.totalPoints === 0 && kidAbove && kidAbove.totalPoints === 0) {
      // Both kids at 0 — first mover advantage
      msg = pickRandom(KIDS_FIRST_POINTS);
      bgClass = "from-sky-500 to-indigo-500";
    } else if (me.totalPoints === 0 && kidAbove) {
      msg = `${kidAbove.name} is leading! Answer 1 question to catch up! 🏁`;
      bgClass = "from-orange-400 to-red-400";
    } else if (kidRank === 1) {
      if (kidBelow && ptsAheadKid < 50) {
        msg = pickRandom(LEADING_MSGS).replace("{name}", kidBelow.name).replace("{pts}", String(ptsAheadKid));
      } else {
        msg = `👑 Kids leader! ${ptsToAdult > 0 ? `${ptsToAdult} pts to pass ${topAdult?.name ?? "the adults"}!` : "Leading everyone!"}`;
        bgClass = "from-amber-400 to-orange-500";
      }
    } else if (me.totalPoints > 0 && kidAbove && kidAbove.totalPoints === me.totalPoints) {
      msg = pickRandom(KIDS_TIED).replace("{name}", kidAbove.name);
      bgClass = "from-purple-500 to-indigo-500";
    } else {
      msg = pickRandom(CHASE_TAUNTS).replace("{pts}", String(ptsToNextKid)).replace("{name}", kidAbove!.name);
      bgClass = "from-orange-400 to-red-400";
    }

    return (
      <div className={`rounded-[18px] bg-gradient-to-r ${bgClass} px-4 py-3 flex items-center justify-between gap-3 shadow-md`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Kids race track only */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[9px] font-black text-white/70 uppercase tracking-wider">Kids</span>
            {sortedKids.map((p, i) => {
              const isMe = p.id === currentProfileId;
              return (
                <div key={p.id} className={`flex flex-col items-center ${isMe ? "scale-125" : "opacity-70"}`}>
                  <span className="text-lg">{PROFILE_EMOJIS[p.id] ?? "👤"}</span>
                  {isMe && <span className="text-[8px] font-black text-white/90 leading-none">#{kidRank}</span>}
                </div>
              );
            })}
          </div>
          <p className="text-sm font-black text-white leading-tight">{msg}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs font-bold text-white/80">Your pts</p>
          <p className="font-display text-xl font-black text-white leading-none">{me.totalPoints}</p>
        </div>
      </div>
    );
  }

  // ── Adults: full family ranking ───────────────────────────────────────
  const sorted = [...allProfiles].sort((a, b) => b.totalPoints - a.totalPoints);
  const myIdx = sorted.findIndex(p => p.id === currentProfileId);
  const rank = myIdx + 1;
  const above = sorted[myIdx - 1];
  const below = sorted[myIdx + 1];
  const ptsToNext = above ? above.totalPoints - me.totalPoints : 0;
  const ptsAhead = below ? me.totalPoints - below.totalPoints : 0;

  let message = "";
  let bgClass = "";

  if (rank === 1) {
    if (below && ptsAhead < 200) {
      message = pickRandom(LEADING_MSGS).replace("{name}", below.name).replace("{pts}", String(ptsAhead));
      bgClass = "from-green-400 to-emerald-500";
    } else {
      message = pickRandom(WINNING_BY_A_LOT).replace("{pts}", String(ptsAhead || me.totalPoints));
      bgClass = "from-amber-400 to-yellow-500";
    }
  } else {
    message = pickRandom(CHASE_TAUNTS).replace("{pts}", String(ptsToNext)).replace("{name}", above!.name);
    bgClass = "from-orange-400 to-red-400";
  }

  return (
    <div className={`rounded-[18px] bg-gradient-to-r ${bgClass} px-4 py-3 flex items-center justify-between gap-3 shadow-md`}>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-shrink-0">
          {sorted.map((p, i) => {
            const isMe = p.id === currentProfileId;
            return (
              <div key={p.id} className={`flex flex-col items-center ${isMe ? "scale-125 z-10" : "opacity-70"}`}>
                <span className={`text-lg leading-none ${isMe ? "drop-shadow-lg" : ""}`}>{PROFILE_EMOJIS[p.id] ?? "👤"}</span>
                {isMe && <span className="text-[8px] font-black text-white/90 leading-none mt-0.5">#{rank}</span>}
              </div>
            );
          })}
        </div>
        <p className="text-sm font-black text-white leading-tight">{message}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-xs font-bold text-white/80">Your points</p>
        <p className="font-display text-xl font-black text-white leading-none">{me.totalPoints}</p>
      </div>
    </div>
  );
}
