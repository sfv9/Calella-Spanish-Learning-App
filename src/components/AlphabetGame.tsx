import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SPANISH_ALPHABET } from "../data/alphabet";
import { useSpeech } from "../hooks/useSpeech";

/**
 * AlphabetGame — Kid-friendly letter explorer
 *
 * - Big letter on screen
 * - Auto-speaks the letter NAME in Spanish on every change
 * - Tap the letter to hear it again
 * - Swipe left/right or arrow buttons to navigate
 * - Keyboard ← → arrow keys also work
 * - No "correct/wrong" — pure exploration, no pressure
 */

// Vivid color palette — each letter gets its own gradient so they feel like cards
const COLORS = [
  "from-pink-400 to-rose-500",
  "from-sky-400 to-blue-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-green-500",
  "from-purple-400 to-violet-500",
  "from-red-400 to-pink-500",
  "from-cyan-400 to-teal-500",
  "from-yellow-400 to-amber-500",
  "from-indigo-400 to-purple-500",
  "from-lime-400 to-emerald-500",
];

export function AlphabetGame() {
  const [index, setIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0); // px offset during swipe
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const touchStartX = useRef<number | null>(null);
  const { speak } = useSpeech();

  const letter = SPANISH_ALPHABET[index];
  const total = SPANISH_ALPHABET.length;
  const colorGradient = COLORS[index % COLORS.length];

  // Speak the letter name whenever index changes
  useEffect(() => {
    // Small delay so it doesn't overlap with the click sound / transition
    const t = window.setTimeout(() => {
      speak(letter.spokenName, "es-ES", 0.75);
    }, 150);
    return () => window.clearTimeout(t);
  }, [index, letter.spokenName, speak]);

  const goNext = useCallback(() => {
    setDirection("next");
    setIndex((i) => (i + 1) % total);
    setSwipeOffset(0);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setIndex((i) => (i - 1 + total) % total);
    setSwipeOffset(0);
  }, [total]);

  // Keyboard arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDirection(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    // Soft resistance so it doesn't drag too far
    setSwipeOffset(dx * 0.7);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const threshold = 60;
    if (swipeOffset < -threshold) {
      goNext();
    } else if (swipeOffset > threshold) {
      goPrev();
    } else {
      // Snap back
      setSwipeOffset(0);
    }
    touchStartX.current = null;
  };

  // Speak letter on tap
  const handleLetterTap = () => {
    speak(letter.spokenName, "es-ES", 0.75);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-white/60 bg-white shadow-float select-none">
      {/* Header */}
      <div className={`flex items-center justify-between bg-gradient-to-r ${colorGradient} px-5 py-3`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔤</span>
          <p className="font-display text-xl font-black text-white">El Alfabeto</p>
        </div>
        <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-bold text-white">
          {index + 1} / {total}
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {/* Letter Card with swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative touch-pan-y"
          style={{
            transform: `translateX(${swipeOffset}px)`,
            transition: swipeOffset === 0 ? "transform 0.25s ease-out" : "none",
          }}
        >
          <button
            type="button"
            onClick={handleLetterTap}
            className={`w-full rounded-[24px] bg-gradient-to-br ${colorGradient} p-6 sm:p-10 text-center shadow-lg transition active:scale-[0.98]`}
            style={{
              animation: direction
                ? `${direction === "next" ? "slide-in-right" : "slide-in-left"} 0.3s ease-out`
                : undefined,
            }}
          >
            {/* The BIG letter pair */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span className="font-display text-[140px] sm:text-[200px] font-black text-white leading-none drop-shadow-lg">
                {letter.letter}
              </span>
              <span className="font-display text-[100px] sm:text-[150px] font-black text-white/85 leading-none drop-shadow-lg">
                {letter.lower}
              </span>
            </div>

            {/* Pronunciation hint */}
            <div className="mt-4 inline-block rounded-full bg-white/25 px-5 py-2">
              <p className="text-sm font-black uppercase tracking-widest text-white/80">
                sounds like
              </p>
              <p className="font-display text-3xl sm:text-4xl font-black text-white mt-1">
                "{letter.name}"
              </p>
            </div>

            {/* Tap hint */}
            <p className="mt-3 text-xs font-bold text-white/70">
              👆 Tap to hear it again
            </p>
          </button>
        </div>

        {/* Example word — outside the swipe area */}
        <div className="mt-4 rounded-[20px] bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-4 sm:p-5 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-amber-700">
            {letter.letter} is for...
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-5xl sm:text-6xl">{letter.exampleEmoji}</span>
            <div className="text-left">
              <p className="font-display text-2xl sm:text-3xl font-black text-ink leading-none">
                {letter.exampleWord}
              </p>
              <p className="text-sm sm:text-base font-bold text-ink/60 mt-1">
                {letter.exampleEnglish}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => speak(letter.exampleWord, "es-ES", 0.8)}
            className="mt-3 rounded-full bg-amber-200 hover:bg-amber-300 px-4 py-1.5 text-xs font-black text-amber-800 transition"
          >
            🔊 Hear the word
          </button>
        </div>

        {/* Navigation arrows */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous letter"
            className="flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 px-4 sm:px-5 py-3 font-black text-ink transition active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Tiny dot indicator */}
          <div className="flex-1 flex justify-center gap-1 overflow-x-auto px-2">
            {SPANISH_ALPHABET.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to letter ${SPANISH_ALPHABET[i].letter}`}
                onClick={() => setIndex(i)}
                className={`flex-shrink-0 h-1.5 rounded-full transition-all ${
                  i === index
                    ? `w-6 bg-gradient-to-r ${colorGradient}`
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next letter"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 px-4 sm:px-5 py-3 font-black text-white transition active:scale-95"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Swipe hint */}
        <p className="mt-3 text-center text-xs text-ink/40 font-semibold">
          👈 Swipe or use arrows 👉
        </p>
      </div>
    </div>
  );
}
