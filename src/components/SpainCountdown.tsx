/**
 * Spain Countdown — shows days until the Calella trip
 * Displayed on the Play tab to make every session feel purposeful
 * Set SPAIN_DATE to your actual travel date
 */

// ⚠️  Update this to your actual Spain departure date
const SPAIN_DATE = new Date("2026-07-09T00:00:00");

function getDaysToSpain(): number {
  const now = new Date();
  const diff = SPAIN_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function getUrgencyColor(days: number): string {
  if (days <= 14) return "from-red-500 to-orange-500";
  if (days <= 30) return "from-orange-400 to-amber-500";
  if (days <= 60) return "from-amber-400 to-yellow-500";
  return "from-blue-500 to-indigo-600";
}

function getUrgencyMessage(days: number): string {
  if (days === 0) return "¡HOY es el día! You're in Spain! 🥳";
  if (days === 1) return "¡Mañana! Tomorrow you fly to Spain! 🛫";
  if (days <= 7) return `Only ${days} days — pack your Spanish! 🧳`;
  if (days <= 14) return `${days} days — sprint to fluency! 💪`;
  if (days <= 30) return `${days} days to be ready for Calella! 🏖️`;
  if (days <= 60) return `${days} days — every session counts! 📚`;
  return `${days} days to prepare for Spain 🇪🇸`;
}

function getSessionsNeeded(days: number): string {
  // Estimate: 15 min/day session teaches ~10 new words
  const wordsLeft = Math.max(0, 250 - days * 3); // rough estimate
  if (days === 0) return "¡Ya estás listo!";
  const sessionsLeft = days; // one per day ideally
  return `${sessionsLeft} daily sessions left`;
}

interface SpainCountdownProps {
  compact?: boolean;
}

export function SpainCountdown({ compact = false }: SpainCountdownProps) {
  const days = getDaysToSpain();
  const color = getUrgencyColor(days);
  const message = getUrgencyMessage(days);

  if (compact) {
    return (
      <div className={`rounded-[14px] bg-gradient-to-r ${color} px-4 py-2 flex items-center justify-between shadow`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🇪🇸</span>
          <p className="text-white font-black text-sm">{message}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-display text-2xl font-black text-white leading-none">{days}</p>
          <p className="text-[10px] text-white/80 font-bold">days</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[20px] bg-gradient-to-r ${color} px-5 py-4 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">
            ✈️ Calella Countdown
          </p>
          <p className="font-black text-white text-sm leading-tight">{message}</p>
          <p className="text-[11px] text-white/70 mt-1">{getSessionsNeeded(days)}</p>
        </div>
        <div className="text-center flex-shrink-0 ml-4">
          <p className="font-display text-5xl font-black text-white leading-none">{days}</p>
          <p className="text-xs text-white/80 font-bold uppercase tracking-wider">days</p>
        </div>
      </div>

      {/* Progress bar toward Spain */}
      <div className="mt-3">
        <div className="flex justify-between text-[9px] text-white/60 font-bold mb-1">
          <span>Today</span>
          <span>🏖️ Calella</span>
        </div>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full transition-all"
            style={{ width: `${Math.max(2, Math.min(100, ((365 - days) / 365) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
