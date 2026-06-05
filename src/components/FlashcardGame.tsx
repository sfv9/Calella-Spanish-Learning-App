import { useEffect, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { useSpeech } from "../hooks/useSpeech";
import { AnswerPayload, LessonTerm, WordProgress } from "../types";
import { Confetti } from "./Confetti";
import { SpeakButton } from "./SpeakButton";
import { StarBurst } from "./StarBurst";

interface FlashcardGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
  questionStats?: Record<string, WordProgress>;
}

const ENCOURAGEMENT = ["¡Perfecto! 🎉", "Keep going! 🔥", "You got it! ⭐", "¡Excelente! 💪", "¡Muy bien! 🌟", "Nailed it! 🎯"];

export function FlashcardGame({ terms, onAnswer, questionStats }: FlashcardGameProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [resultState, setResultState] = useState<"none" | "correct" | "wrong">("none");
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [floatMsg, setFloatMsg] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { speak } = useSpeech();
  const { playCorrect, playWrong } = useGameSounds();

  const currentTerm = terms[index % terms.length];
  const stats = questionStats?.[currentTerm.id];
  const correctCount = Math.min(stats?.correct ?? 0, 5);
  const mastered = stats?.mastered ?? false;

  const isAdvanced = currentTerm.level === "advanced-spain";
  const isIntermediate = currentTerm.level === "intermediate";

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
    setResultState("none");
    setStreak(0);
  }, [terms]);

  useEffect(() => {
    speak(currentTerm.spanish, "es-ES", 0.8);
  }, [index, currentTerm.spanish]);

  const handleResult = (correct: boolean) => {
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setResultState(correct ? "correct" : "wrong");

    if (correct) {
      setCelebKey(Date.now());
      playCorrect();
      const msg = ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)];
      setFloatMsg(newStreak >= 3 ? `🔥 ${newStreak} in a row!` : msg);
      setTimeout(() => setFloatMsg(null), 1200);

      // Confetti on milestone streaks or after 5 correct
      if (newStreak === 3 || newStreak === 5 || newStreak % 10 === 0) {
        setShowConfetti(true);
      }
    } else {
      playWrong();
    }
    onAnswer({ wordId: currentTerm.id, correct });
    setTimeout(() => {
      setIndex((v) => v + 1);
      setRevealed(false);
      setResultState("none");
    }, 700);
  };

  const levelBadge = isAdvanced
    ? <span className="rounded-full bg-violet-500 px-2 py-0.5 text-xs font-black text-white">🎯 ADVANCED</span>
    : isIntermediate
    ? <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs font-black text-white">📚 INTERMEDIATE</span>
    : null;

  return (
    <>
      <Confetti active={showConfetti} onDone={() => setShowConfetti(false)} />

      <div className="overflow-hidden rounded-[28px] border-2 border-white/60 bg-white shadow-float">
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-3 ${
          isAdvanced
            ? "bg-gradient-to-r from-violet-500 to-purple-600"
            : isIntermediate
            ? "bg-gradient-to-r from-amber-400 to-orange-500"
            : "bg-gradient-to-r from-sky-400 to-indigo-500"
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🃏</span>
            <p className="font-display text-xl font-black text-white">Flashcards</p>
            {levelBadge}
          </div>
          <div className="flex items-center gap-2">
            {streak >= 2 && (
              <span className="rounded-full bg-white/30 px-3 py-1 text-sm font-black text-white animate-bounce">
                🔥 {streak}
              </span>
            )}
            <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-bold text-white">
              #{index + 1}
            </span>
          </div>
        </div>

        <div className="p-5">
          {/* Card face */}
          <div className={`relative rounded-[22px] border-2 p-7 text-center transition-all duration-200 ${
            resultState === "correct"
              ? "border-green-300 bg-green-50 animate-bounce-in"
              : resultState === "wrong"
              ? "border-red-200 bg-red-50 animate-shake"
              : isAdvanced
              ? "border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50"
              : "border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50"
          }`}>

            {/* Floating encouragement */}
            {floatMsg && (
              <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-green-400 px-4 py-1.5 text-sm font-black text-white shadow-lg z-10"
                style={{ animation: "float-up 1.2s ease-out forwards" }}>
                {floatMsg}
              </span>
            )}

            {/* Mastery pips */}
            <div className="absolute right-4 top-4 flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i < correctCount ? "bg-green-400 shadow-sm" : "bg-gray-200"
                }`} />
              ))}
            </div>
            {mastered && (
              <span className="absolute left-4 top-3 rounded-full bg-green-100 px-2 py-0.5 text-xs font-black text-green-600">
                ✓ Mastered
              </span>
            )}

            <p className="mb-2 text-xs font-black uppercase tracking-widest text-ink/35">
              {isAdvanced ? "Advanced Spanish" : isIntermediate ? "Intermediate Spanish" : "Say it in Spanish"}
            </p>

            {/* Spanish text — scale based on word count and char length */}
            <p className={`font-display font-black leading-tight text-ink ${
              currentTerm.spanish.length > 80 ? "text-sm" :
              currentTerm.spanish.length > 50 ? "text-base" :
              currentTerm.spanish.length > 30 ? "text-2xl" :
              currentTerm.spanish.length > 15 ? "text-4xl" : "text-6xl"
            }`}>
              {currentTerm.spanish}
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-ink/45">{currentTerm.pronunciation}</span>
              <SpeakButton text={currentTerm.spanish} size="sm" />
            </div>

            {revealed ? (
              <div className="mt-5 rounded-[18px] bg-white/90 p-4 shadow-sm animate-pop-in">
                <p className="text-xs font-black uppercase tracking-widest text-ink/35">Means</p>
                <p className="mt-1 font-display text-2xl font-black text-ink">{currentTerm.english}</p>
                <p className="mt-2 text-sm italic text-ink/55">"{currentTerm.example}"</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { setRevealed(true); speak(currentTerm.spanish, "es-ES", 0.75); }}
                className="mt-5 rounded-full bg-white px-7 py-3 font-bold text-ink shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition"
              >
                Flip card 🔄
              </button>
            )}
          </div>

          {/* Answer buttons */}
          {revealed && (
            <div className="relative mt-4 grid grid-cols-2 gap-3">
              {celebKey !== null && (
                <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
              )}
              <button
                type="button"
                onClick={() => handleResult(false)}
                className="kid-btn border-2 border-gray-100 bg-white text-ink shadow-sm hover:border-gray-200 transition"
              >
                <span className="block text-4xl">😅</span>
                <span className="mt-1 block text-base">Need practice</span>
              </button>
              <button
                type="button"
                onClick={() => handleResult(true)}
                className="kid-btn border-2 border-green-300 bg-gradient-to-b from-green-400 to-green-500 text-white shadow-lg shadow-green-200 transition hover:scale-105"
              >
                <span className="block text-4xl">⭐</span>
                <span className="mt-1 block text-base font-black">Got it!</span>
              </button>
            </div>
          )}

          {/* Streak motivator */}
          {streak >= 5 && (
            <div className="mt-4 rounded-[16px] bg-gradient-to-r from-amber-400 to-orange-500 p-3 text-center text-white font-black shadow-lg">
              🔥 {streak} correct in a row! You're on fire!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
