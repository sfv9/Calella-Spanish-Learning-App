import { BarChart3, Star, Swords } from "lucide-react";
import { LessonTerm, ChildProfile } from "../types";
import { getNeedsPracticeWords, getSuggestedWorld, getThisWeekMinutes, getTopMasteredWords } from "../lib/game";

interface ParentDashboardProps {
  childrenProfiles: ChildProfile[];
  allTerms: LessonTerm[];
}

export function ParentDashboard({ childrenProfiles }: ParentDashboardProps) {
  return (
    <div className="glass-panel p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-display text-3xl text-ink">Parent Dashboard</p>
          <p className="text-sm text-ink/70">See weekly minutes, accuracy, review words, and a suggested next module.</p>
        </div>
        <span className="capsule bg-ink text-white">
          <BarChart3 className="h-4 w-4" />
          Family overview
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {childrenProfiles.map((child) => {
          const masteredWords = getTopMasteredWords(child);
          const reviewWords = getNeedsPracticeWords(child);
          const suggestedWorld = getSuggestedWorld(child);
          return (
            <div key={child.id} className="rounded-[28px] bg-white/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-3xl text-ink">{child.name}</p>
                  <p className="text-sm text-ink/65">
                    {getThisWeekMinutes(child)} minutes this week, {child.totalPoints} lifetime points
                  </p>
                </div>
                <span className="rounded-full bg-coral/15 px-4 py-2 text-sm font-bold text-coral">
                  {child.accuracyPercentage}% accuracy
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[22px] bg-shell p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink/60">
                    <Star className="h-4 w-4 text-mango" />
                    Top mastered words
                  </div>
                  <p className="text-sm text-ink">
                    {masteredWords.length > 0
                      ? masteredWords.map((term) => term.spanish).join(", ")
                      : "No mastered words yet."}
                  </p>
                </div>

                <div className="rounded-[22px] bg-shell p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink/60">
                    <Swords className="h-4 w-4 text-coral" />
                    Needs more practice
                  </div>
                  <p className="text-sm text-ink">
                    {reviewWords.length > 0
                      ? reviewWords.map((term) => term.spanish).join(", ")
                      : "No urgent review words."}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <div className="rounded-[20px] bg-white p-4">
                  <p className="text-sm text-ink/60">Streak</p>
                  <p className="font-display text-3xl text-coral">{child.streakCount}</p>
                </div>
                <div className="rounded-[20px] bg-white p-4">
                  <p className="text-sm text-ink/60">Questions</p>
                  <p className="font-display text-3xl text-ink">{child.totalQuestions}</p>
                </div>
                <div className="rounded-[20px] bg-white p-4">
                  <p className="text-sm text-ink/60">Correct</p>
                  <p className="font-display text-3xl text-leaf">{child.totalCorrect}</p>
                </div>
                <div className="rounded-[20px] bg-white p-4">
                  <p className="text-sm text-ink/60">Next world</p>
                  <p className="font-display text-xl text-ink">{suggestedWorld.shortTitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
