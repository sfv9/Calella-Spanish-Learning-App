import { Compass, MapPinned, Target } from "lucide-react";
import { ChildProfile, LessonTerm } from "../types";

interface ProgressDashboardProps {
  child: ChildProfile;
  todayMinutes: number;
  nextWorldLabel: string;
  wordsToReview: LessonTerm[];
}

export function ProgressDashboard({
  child,
  todayMinutes,
  nextWorldLabel,
  wordsToReview
}: ProgressDashboardProps) {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="font-display text-2xl text-ink">Explorer Dashboard</p>
          <p className="text-sm text-ink/70">A quick look at streaks, mastery, and what to practice next.</p>
        </div>
        <span className="capsule bg-lagoon/30 text-teal-700">
          <Compass className="h-4 w-4" />
          {todayMinutes} min today
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-sm text-ink/60">Current streak</p>
          <p className="font-display text-4xl text-coral">{child.streakCount}</p>
          <p className="text-sm text-ink/60">days in a row</p>
        </div>

        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-sm text-ink/60">Words mastered</p>
          <p className="font-display text-4xl text-leaf">{child.wordsMastered.length}</p>
          <p className="text-sm text-ink/60">five correct answers each</p>
        </div>

        <div className="rounded-[24px] bg-white/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-ink/60">
            <MapPinned className="h-4 w-4 text-sky-700" />
            Suggested next world
          </div>
          <p className="font-display text-2xl text-ink">{nextWorldLabel}</p>
        </div>

        <div className="rounded-[24px] bg-white/70 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm text-ink/60">
            <Target className="h-4 w-4 text-mango" />
            Words to review
          </div>
          <p className="text-sm font-semibold text-ink">
            {wordsToReview.length > 0
              ? wordsToReview.map((term) => term.spanish).join(", ")
              : "Great job. No urgent review words right now."}
          </p>
        </div>
      </div>
    </div>
  );
}
