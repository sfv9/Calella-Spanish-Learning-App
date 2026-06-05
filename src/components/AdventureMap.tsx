import { X } from "lucide-react";
import { useState } from "react";
import { ChildProfile, LessonTerm, WorldDefinition, WorldId } from "../types";

interface AdventureMapProps {
  worlds: WorldDefinition[];
  activeWorldId: WorldId;
  unlockedWorldIds: WorldId[];
  child: ChildProfile;
  allTerms: LessonTerm[];
  onSelectWorld: (worldId: WorldId) => void;
  onStartAdventure: () => void;
}

const WORLD_EMOJI: Record<string, string> = {
  greetings:    "👋",
  playground:   "⚽",
  restaurant:   "🌮",
  feelings:     "💝",
  colorsNumbers:"🎨",
  animalsToys:  "🐾",
  school:       "📚",
  family:       "🏠",
  polite:       "✨",
};

export function AdventureMap({
  worlds,
  activeWorldId,
  unlockedWorldIds,
  child,
  allTerms,
  onSelectWorld,
  onStartAdventure,
}: AdventureMapProps) {
  const [showModal, setShowModal] = useState(false);

  const activeWorld    = worlds.find((w) => w.id === activeWorldId) ?? worlds[0];
  const unlockedWorlds = worlds.filter((w) => unlockedWorldIds.includes(w.id));
  const lockedWorlds   = worlds.filter((w) => !unlockedWorldIds.includes(w.id));
  const teasers        = lockedWorlds.slice(0, 3);

  const activeTerms  = allTerms.filter((t) => t.category === activeWorldId);
  const mastered     = activeTerms.filter((t) => child.wordsMastered.includes(t.id)).length;
  const progressPct  = activeTerms.length > 0 ? Math.round((mastered / activeTerms.length) * 100) : 0;

  return (
    <>
      <div className="glass-panel p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-2xl font-black text-ink">🗺️ Your Adventure</p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-ink/60 transition hover:bg-white hover:text-ink"
          >
            All {worlds.length} levels →
          </button>
        </div>

        {/* Active world card */}
        <div className={`overflow-hidden rounded-[22px] bg-gradient-to-br ${activeWorld.colorClass} p-[3px] shadow-lg`}>
          <div className="rounded-[20px] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-5xl leading-none">{WORLD_EMOJI[activeWorld.id] ?? "🌟"}</span>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-ink/40">Playing now</p>
                  <p className="font-display text-2xl font-black leading-tight text-ink">
                    {activeWorld.title}
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                ✓ Open
              </span>
            </div>

            <p className="mt-3 text-sm text-ink/60 leading-relaxed">{activeWorld.description}</p>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs font-bold text-ink/45">
                <span>Words mastered</span>
                <span>{mastered} / {activeTerms.length}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${activeWorld.colorClass} transition-all duration-500`}
                  style={{ width: `${Math.max(progressPct, progressPct > 0 ? 8 : 0)}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onStartAdventure}
              className={`mt-4 w-full rounded-[18px] bg-gradient-to-r ${activeWorld.colorClass} py-4 font-display text-xl font-black text-white shadow-md transition hover:scale-[1.02] active:scale-[0.98]`}
            >
              🚀 Start This Level!
            </button>
          </div>
        </div>

        {/* Unlocked level switcher — only shows when >1 unlocked */}
        {unlockedWorlds.length > 1 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-ink/35">
              Switch level
            </p>
            <div className="flex flex-wrap gap-2">
              {unlockedWorlds.map((world) => (
                <button
                  key={world.id}
                  type="button"
                  onClick={() => onSelectWorld(world.id)}
                  className={`flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-sm font-bold transition hover:scale-105 active:scale-95 ${
                    world.id === activeWorldId
                      ? `bg-gradient-to-r ${world.colorClass} border-transparent text-white shadow-md`
                      : "border-white/60 bg-white/80 text-ink"
                  }`}
                >
                  <span>{WORLD_EMOJI[world.id]}</span>
                  <span>{world.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Locked teasers */}
        {teasers.length > 0 && (
          <div className="mt-4 space-y-2">
            {teasers.map((world) => {
              const ptsNeeded = Math.max(world.unlockPoints - child.totalPoints, 0);
              return (
                <div
                  key={world.id}
                  className="flex items-center gap-3 rounded-[14px] border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <span className="text-2xl opacity-40 grayscale">{WORLD_EMOJI[world.id] ?? "🔒"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-ink/50">{world.title}</p>
                    <p className="text-xs text-ink/35">{ptsNeeded} more points to unlock</p>
                  </div>
                  <span className="text-lg opacity-50">🔒</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── All levels modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-t-[28px] bg-white p-6 shadow-2xl sm:rounded-[28px] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-3xl font-black text-ink">All Levels</p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-ink transition hover:bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {worlds.map((world) => {
                const unlocked  = unlockedWorldIds.includes(world.id);
                const active    = world.id === activeWorldId;
                const ptsNeeded = Math.max(world.unlockPoints - child.totalPoints, 0);
                const wTerms    = allTerms.filter((t) => t.category === world.id);
                const wMastered = wTerms.filter((t) => child.wordsMastered.includes(t.id)).length;
                const allDone   = wTerms.length > 0 && wMastered === wTerms.length;

                return (
                  <button
                    key={world.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked) { onSelectWorld(world.id); setShowModal(false); }
                    }}
                    className={`flex w-full items-center gap-4 rounded-[18px] border-2 p-4 text-left transition ${
                      active
                        ? `bg-gradient-to-r ${world.colorClass} border-transparent text-white shadow-lg`
                        : unlocked
                          ? "border-gray-100 bg-white hover:scale-[1.01] hover:shadow-md"
                          : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-55"
                    }`}
                  >
                    <span className={`text-3xl leading-none ${!unlocked ? "grayscale" : ""}`}>
                      {WORLD_EMOJI[world.id] ?? "🌟"}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-display text-xl font-black leading-tight ${active ? "text-white" : "text-ink"}`}>
                          {world.title}
                        </p>
                        {active && (
                          <span className="rounded-full bg-white/30 px-2 py-0.5 text-xs font-black text-white">
                            Current
                          </span>
                        )}
                      </div>
                      {unlocked ? (
                        <p className={`text-sm ${active ? "text-white/75" : "text-ink/50"}`}>
                          {wMastered} / {wTerms.length} words mastered
                        </p>
                      ) : (
                        <p className="text-sm text-ink/40">🔒 {ptsNeeded} pts to unlock</p>
                      )}
                    </div>

                    <span className="flex-shrink-0 text-xl">
                      {!unlocked ? "🔒" : allDone ? "⭐" : active ? "▶" : "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
