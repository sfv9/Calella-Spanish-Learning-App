import { Compass, PencilLine, Shield, Star } from "lucide-react";
import { ChildProfile } from "../types";

interface ProfileSelectorProps {
  childrenProfiles: ChildProfile[];
  activeProfileId: string;
  onSelect: (profileId: string) => void;
  onRename: (profileId: string, nextName: string) => void;
}

export function ProfileSelector({
  childrenProfiles,
  activeProfileId,
  onSelect,
  onRename
}: ProfileSelectorProps) {
  return (
    <div className="glass-panel p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl text-ink md:text-3xl">Choose Your Explorer</p>
          <p className="text-sm text-ink/70">Two kids, two save files, and a full set of Spanish levels to choose from.</p>
        </div>
        <span className="capsule bg-[#fff0bc]/90 text-[#244060]">
          <Star className="h-4 w-4" />
          Profiles
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {childrenProfiles.map((child, index) => {
          const isActive = child.id === activeProfileId;
          const avatarTone = index === 0 ? "bg-[#dff6ff] text-[#0c7eaa]" : "bg-[#fff0d8] text-[#b66a19]";
          return (
            <button
              key={child.id}
              type="button"
              onClick={() => onSelect(child.id)}
              className={`rounded-[30px] border px-5 py-5 text-left ${
                isActive
                  ? "border-[#ffb48b] bg-gradient-to-br from-[#fff6f0] to-[#fff4cf] shadow-island"
                  : "border-white/70 bg-white/80"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${avatarTone} shadow-lg ring-4 ring-white/80`}>
                    {index === 0 ? <Compass className="h-8 w-8" /> : <Shield className="h-8 w-8" />}
                  </div>
                  <div>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-ink/60">
                      {isActive ? "On Deck" : "Tap to play"}
                    </span>
                  </div>
                </div>
                <PencilLine className="mt-2 h-5 w-5 text-ink/45" />
              </div>

              <div className="space-y-3">
                <input
                  value={child.name}
                  onChange={(event) => onRename(child.id, event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  placeholder="Explorer name"
                  className="w-full bg-transparent font-display text-4xl leading-none text-ink outline-none"
                />

                <div className="grid grid-cols-3 gap-2 text-sm text-ink/70">
                  <div>
                    <p className="font-display text-3xl text-ink">{child.totalPoints}</p>
                    <p>Points</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-ink">{child.streakCount}</p>
                    <p>Streak</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-ink">{child.wordsMastered.length}</p>
                    <p>Mastered</p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
