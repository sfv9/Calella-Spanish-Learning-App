import { useState } from "react";
import { X } from "lucide-react";

/**
 * AvatarPicker — full-screen modal letting a player choose their emoji.
 *
 * Categories cover what kids actually want: heroes, animals, sports,
 * fantasy, etc. The selected emoji bubbles back up via `onSelect`, which
 * the parent uses to update `profile.avatarEmoji`.
 */

interface AvatarPickerProps {
  currentEmoji: string;
  profileName: string;
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

interface Category {
  label: string;
  emojis: string[];
}

const CATEGORIES: Category[] = [
  {
    label: "🦸 Heroes & Magic",
    emojis: ["🦸", "🦸‍♂️", "🦸‍♀️", "🥷", "🧙", "🧙‍♂️", "🧙‍♀️", "🧚", "🧚‍♂️", "🧚‍♀️", "🧜‍♀️", "🧜‍♂️", "🧞", "🤖", "👻", "👽", "🎃", "🤡", "🦹", "⚔️"],
  },
  {
    label: "🦈 Ocean & Sea",
    emojis: ["🦈", "🐬", "🐳", "🐋", "🐠", "🐟", "🐙", "🦀", "🦞", "🐚", "🐢", "🐊", "🐸", "🦦", "🐧", "🌊"],
  },
  {
    label: "🦁 Wild Animals",
    emojis: ["🦁", "🐯", "🐅", "🐆", "🦊", "🐺", "🐻", "🐼", "🐨", "🦘", "🦓", "🦒", "🐘", "🦏", "🐪", "🦔", "🦝"],
  },
  {
    label: "🐶 Pets & Cute",
    emojis: ["🐶", "🐱", "🐰", "🐭", "🐹", "🐻‍❄️", "🐮", "🐷", "🐵", "🦄", "🐔", "🦆", "🦢", "🐝", "🦋", "🐞"],
  },
  {
    label: "🐉 Dragons & Fantasy",
    emojis: ["🐉", "🐲", "🦖", "🦕", "🐊", "🦎", "🪼", "🌈", "⭐", "🌟", "✨", "🪐", "🌙", "☄️"],
  },
  {
    label: "⚽ Sports & Games",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏓", "🥋", "🏆", "🎯", "🎮", "🕹️", "🎲", "🏎️", "🛹", "⛷️", "🏂", "🤸", "🤾", "🏊"],
  },
  {
    label: "🎨 Cool Stuff",
    emojis: ["🎨", "🎭", "🎵", "🎸", "🎹", "🥁", "🎺", "🚀", "✈️", "🛸", "⚡", "🔥", "💎", "💫", "🌋", "🦴"],
  },
  {
    label: "😎 Faces",
    emojis: ["😀", "😎", "🥸", "🤩", "🥳", "🤠", "🥷", "🤖", "🧑‍🚀", "🧑‍🎤", "🧑‍🍳", "🧑‍🎨", "🧑‍🏫", "🧑‍🚒"],
  },
];

export function AvatarPicker({ currentEmoji, profileName, onSelect, onClose }: AvatarPickerProps) {
  const [selected, setSelected] = useState(currentEmoji);

  const handlePick = (emoji: string) => {
    setSelected(emoji);
    // Apply immediately so kids see instant feedback
    onSelect(emoji);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-t-[24px] sm:rounded-[24px] bg-white shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/25 px-3 py-1.5 flex items-center gap-2">
              <span className="text-3xl leading-none">{selected}</span>
              <div>
                <p className="text-[10px] font-black uppercase text-white/70 tracking-widest">Picking for</p>
                <p className="font-display text-lg font-black text-white leading-none">{profileName}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close avatar picker"
            className="rounded-full bg-white/20 hover:bg-white/30 p-2 transition"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Scrollable categories */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <p className="font-display text-base font-black text-ink mb-2 sticky top-0 bg-white pb-1">
                {cat.label}
              </p>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {cat.emojis.map((emoji) => {
                  const isSelected = emoji === selected;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handlePick(emoji)}
                      className={`aspect-square rounded-[12px] flex items-center justify-center text-3xl sm:text-4xl transition active:scale-90 ${
                        isSelected
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-purple-300 scale-110 shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 hover:scale-105"
                      }`}
                    >
                      <span className={isSelected ? "drop-shadow-md" : ""}>{emoji}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[16px] bg-gradient-to-r from-green-400 to-emerald-500 py-3 font-display text-lg font-black text-white shadow active:scale-95 transition"
          >
            ✓ Done
          </button>
        </div>
      </div>
    </div>
  );
}
