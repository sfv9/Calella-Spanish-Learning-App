import { useEffect, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { AnswerPayload, LessonTerm } from "../types";
import { getDistractors } from "../lib/game";
import { Confetti } from "./Confetti";
import { SpeakButton } from "./SpeakButton";
import { StarBurst } from "./StarBurst";

interface MultipleChoiceGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

const OPTIONS_META = [
  { letter: "A", from: "from-blue-400",   to: "to-blue-500",   border: "border-blue-300",   shadow: "shadow-blue-200"   },
  { letter: "B", from: "from-orange-400", to: "to-orange-500", border: "border-orange-300", shadow: "shadow-orange-200" },
  { letter: "C", from: "from-purple-400", to: "to-purple-500", border: "border-purple-300", shadow: "shadow-purple-200" },
  { letter: "D", from: "from-green-400",  to: "to-green-500",  border: "border-green-300",  shadow: "shadow-green-200"  },
];

const CORRECT_MSGS = ["🎉 Yes!", "⭐ Correct!", "🔥 Nice!", "✨ Perfect!"];
const WRONG_MSGS   = ["😅 Almost!", "💪 Try again!", "🤔 Not quite!"];

export function MultipleChoiceGame({ terms, onAnswer }: MultipleChoiceGameProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const { playCorrect, playWrong, playStreak } = useGameSounds();

  // Lock the question + options into state so they never change mid-question,
  // regardless of how many times the parent re-renders.
  const buildQuestion = (idx: number, t: LessonTerm[]) => {
    const target = t[idx % t.length];
    return { target, options: [target, ...getDistractors(target, t)].sort(() => Math.random() - 0.5).slice(0, 4) };
  };

  const [question, setQuestion] = useState(() => buildQuestion(0, terms));
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // New world selected — reset everything and rebuild first question
    setQuestionIndex(0);
    setSelected(null);
    setStreak(0);
    setMsg(null);
    setQuestion(buildQuestion(0, terms));
  }, [terms]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Advance to next question
    setQuestion(buildQuestion(questionIndex, terms));
  }, [questionIndex]);  // eslint-disable-line react-hooks/exhaustive-deps

  const { target: target2, options: currentOptions } = question;

  const handleChoose = (optionId: string) => {
    if (selected) return;
    const correct = optionId === target2.id;
    setSelected(optionId);
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    if (correct) {
      setCelebKey(Date.now());
      if (nextStreak > 0 && nextStreak % 3 === 0) { playStreak(); setShowConfetti(true); }
      else playCorrect();
      setMsg(nextStreak >= 3 ? `🔥 ${nextStreak} in a row!` : CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]);
    } else {
      playWrong();
      setMsg(WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)]);
    }
    onAnswer({ wordId: target2.id, correct });
    window.setTimeout(() => {
      setSelected(null);
      setMsg(null);
      setQuestionIndex((v) => v + 1);
    }, 1000);
  };

  return (
    <>
    <Confetti active={showConfetti} onDone={() => setShowConfetti(false)} />
    <div className="overflow-hidden rounded-[28px] border-2 border-white/60 bg-white shadow-float">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-coral to-mango px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <p className="font-display text-xl font-black text-white">Quiz Time</p>
          {target2.level === "advanced-spain" && (
            <span className="rounded-full bg-white/40 px-2 py-0.5 text-xs font-black text-white">
              🎯 ADVANCED
            </span>
          )}
          {target2.level === "intermediate" && (
            <span className="rounded-full bg-white/40 px-2 py-0.5 text-xs font-black text-white">
              📚 INTERMEDIATE
            </span>
          )}
        </div>
        {streak >= 3 && (
          <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-black text-white">
            🔥 {streak} streak!
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Question card */}
        <div className={`rounded-[20px] border p-5 text-center ${
          target2.level === "advanced-spain"
            ? "bg-gradient-to-br from-violet-50 to-purple-50 border-purple-100"
            : target2.level === "intermediate"
            ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100"
            : "bg-gradient-to-br from-amber-50 to-orange-50 border-orange-100"
        }`}>
          <p className="text-sm font-black uppercase tracking-widest text-ink/40">
            {target2.spanish.length > 60
              ? "¿Cuál es la traducción correcta?"
              : "¿Qué significa?"}
          </p>
          <p className={`mt-2 font-display font-black text-ink leading-tight ${
            target2.spanish.length > 120 ? "text-xs text-left" :
            target2.spanish.length > 80 ? "text-sm" :
            target2.spanish.length > 40 ? "text-2xl" : "text-5xl"
          }`}>
            {target2.spanish}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-sm text-ink/45">{target2.pronunciation}</span>
            <SpeakButton text={target2.spanish} size="sm" />
          </div>
        </div>

        {/* Feedback message */}
        {msg && (
          <div className={`mt-3 rounded-full px-4 py-2 text-center font-black text-lg animate-pop-in ${
            selected === target2.id || currentOptions.find(o => o.id === selected)?.id === target2.id
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}>
            {msg}
          </div>
        )}

        {/* Option buttons — 1-col for very long content, 2-col for short */}
        <div className={`relative mt-4 gap-3 ${
          target2.english.length > 100 ? "flex flex-col" : "grid grid-cols-2"
        }`}>
          {celebKey !== null && (
            <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
          )}
          {currentOptions.map((option, i) => {
            const meta = OPTIONS_META[i % 4];
            const isCorrect = selected ? option.id === target2.id : false;
            const isSelected = selected === option.id;
            const isWrong = isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleChoose(option.id)}
                disabled={!!selected}
                className={`kid-btn border-2 text-left transition-all ${
                  isCorrect
                    ? "border-green-300 bg-gradient-to-b from-green-400 to-green-500 text-white shadow-lg shadow-green-200 animate-bounce-in"
                    : isWrong
                      ? "border-red-200 bg-red-50 text-red-600 animate-shake"
                      : selected
                        ? "border-gray-100 bg-gray-50 text-gray-400"
                        : `border-2 ${meta.border} bg-gradient-to-b ${meta.from} ${meta.to} text-white shadow-lg ${meta.shadow}`
                }`}
              >
                <span className={`mb-1 block text-xs font-black uppercase tracking-widest ${
                  isCorrect || (!isWrong && !selected) ? "text-white/70" : ""
                }`}>
                  {meta.letter}
                </span>
                <span className="block text-lg font-black leading-tight">{option.english}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
