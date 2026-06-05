import { Gem, Trophy, Zap } from "lucide-react";

interface PointsDisplayProps {
  lifetimePoints: number;
  sessionPoints: number;
  levelName: string;
  accuracy: number;
}

export function PointsDisplay({
  lifetimePoints,
  sessionPoints,
  levelName,
  accuracy
}: PointsDisplayProps) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl text-ink">Points and Power-Ups</p>
          <p className="text-sm text-ink/70">Every attempt earns points, and correct answers add a bonus.</p>
        </div>
        <span className="capsule bg-coral/15 text-coral">
          <Trophy className="h-4 w-4" />
          {levelName}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-[22px] bg-white/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-ink/60">
            <Gem className="h-4 w-4 text-coral" />
            Session
          </div>
          <p className="font-display text-4xl text-coral">+{sessionPoints}</p>
        </div>
        <div className="rounded-[22px] bg-white/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-ink/60">
            <Zap className="h-4 w-4 text-mango" />
            Lifetime
          </div>
          <p className="font-display text-4xl text-ink">{lifetimePoints}</p>
        </div>
        <div className="rounded-[22px] bg-white/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-ink/60">
            <Trophy className="h-4 w-4 text-leaf" />
            Accuracy
          </div>
          <p className="font-display text-4xl text-leaf">{accuracy}%</p>
        </div>
      </div>
    </div>
  );
}
