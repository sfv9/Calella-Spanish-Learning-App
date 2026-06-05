import { Clock3, Sparkles } from "lucide-react";
import { formatSeconds } from "../lib/game";

interface DailyTimerProps {
  progressSeconds: number;
  goalSeconds: number;
  isRunning: boolean;
  goalReached: boolean;
}

export function DailyTimer({
  progressSeconds,
  goalSeconds,
  isRunning,
  goalReached
}: DailyTimerProps) {
  const progress = Math.min(100, Math.round((progressSeconds / goalSeconds) * 100));
  const remaining = Math.max(goalSeconds - progressSeconds, 0);

  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="font-display text-2xl text-ink">Daily Adventure Timer</p>
          <p className="text-sm text-ink/70">
            {goalReached
              ? "Daily goal complete. Keep exploring if you want more points."
              : "Reach 15 minutes to unlock the daily celebration badge."}
          </p>
        </div>
        <span className={`capsule ${goalReached ? "bg-leaf/20 text-leaf" : "bg-sky-100 text-sky-700"}`}>
          {goalReached ? <Sparkles className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
          {isRunning ? "Playing now" : "Ready"}
        </span>
      </div>

      <div className="mb-2 flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-ink/45">Progress</p>
          <p className="font-display text-4xl text-ink">
            {formatSeconds(progressSeconds)} <span className="text-xl text-ink/45">/ {formatSeconds(goalSeconds)}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-ink/60">Countdown</p>
          <p className="text-xl font-bold text-coral">{formatSeconds(remaining)}</p>
        </div>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-sky-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-coral via-mango to-leaf"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
