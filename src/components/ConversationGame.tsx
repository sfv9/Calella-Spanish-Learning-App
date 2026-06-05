import { useEffect, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { useSpeech } from "../hooks/useSpeech";
import { getConversationPrompt, getDistractors } from "../lib/game";
import { AnswerPayload, LessonTerm } from "../types";
import { SpeakButton } from "./SpeakButton";
import { StarBurst } from "./StarBurst";

interface ConversationGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

const FRIEND_AVATARS = ["🧒", "👦🏽", "👧", "🧒🏾", "👦", "👧🏻", "🧒🏽", "👦🏾"];
const REACTIONS_CORRECT = [
  "¡Sí! That's right! 🎉",
  "You speak Spanish! ⭐",
  "¡Perfecto! 🌟",
  "Wow, you're good! 🔥",
];
const REACTIONS_WRONG = [
  "Hmm, not quite… try another!",
  "Almost! Keep going! 💪",
];

const OPTION_COLORS = [
  "bg-gradient-to-b from-blue-400   to-blue-500   border-blue-300   shadow-blue-200",
  "bg-gradient-to-b from-purple-400 to-purple-500 border-purple-300 shadow-purple-200",
  "bg-gradient-to-b from-green-400  to-green-500  border-green-300  shadow-green-200",
  "bg-gradient-to-b from-orange-400 to-orange-500 border-orange-300 shadow-orange-200",
];

export function ConversationGame({ terms, onAnswer }: ConversationGameProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [avatar] = useState(
    () => FRIEND_AVATARS[Math.floor(Math.random() * FRIEND_AVATARS.length)]
  );
  const { speak } = useSpeech();
  const { playCorrect, playWrong, playStreak } = useGameSounds();

  const buildQuestion = (idx: number, t: LessonTerm[]) => {
    const target = t[idx % t.length];
    const scenario = getConversationPrompt(target);
    const options = [target, ...getDistractors(target, t)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    return { target, scenario, options };
  };

  const [question, setQuestion] = useState(() => buildQuestion(0, terms));

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setReaction(null);
    setQuestion(buildQuestion(0, terms));
  }, [terms]);

  useEffect(() => {
    setQuestion(buildQuestion(index, terms));
  }, [index]);  // eslint-disable-line react-hooks/exhaustive-deps

  const { target, scenario, options } = question;

  useEffect(() => {
    const t = window.setTimeout(() => speak(scenario.prompt, "en-US", 0.88), 300);
    return () => window.clearTimeout(t);
  }, [index, scenario.prompt]);

  const handleChoose = (optionId: string) => {
    if (selected) return;
    const correct = optionId === target.id;
    setSelected(optionId);
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    const msg = correct
      ? REACTIONS_CORRECT[Math.floor(Math.random() * REACTIONS_CORRECT.length)]
      : REACTIONS_WRONG[Math.floor(Math.random() * REACTIONS_WRONG.length)];
    setReaction(msg);
    if (correct) {
      setCelebKey(Date.now());
      if (nextStreak > 0 && nextStreak % 3 === 0) playStreak();
      else playCorrect();
      setTimeout(() => speak(msg, "en-US", 0.9), 200);
    } else {
      playWrong();
    }
    onAnswer({ wordId: target.id, correct });
    window.setTimeout(() => {
      setSelected(null);
      setReaction(null);
      setIndex((v) => v + 1);
    }, 1400);
  };

  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-white/60 bg-white shadow-float">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-400 to-emerald-500 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <p className="font-display text-xl font-black text-white">Playground Chat</p>
          {target.level === "advanced-spain" && (
            <span className="rounded-full bg-white/40 px-2 py-0.5 text-xs font-black text-white">
              🎯 ADVANCED SPAIN
            </span>
          )}
        </div>
        {streak >= 3 && (
          <span className="rounded-full bg-white/25 px-3 py-1 text-sm font-black text-white">
            🔥 {streak} in a row!
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Chat area */}
        <div className="rounded-[20px] bg-gradient-to-br from-sky-50 to-green-50 p-4">
          {/* Friend message */}
          <div className="flex items-end gap-3">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-3xl shadow-md">
              {avatar}
            </div>
            <div className="relative max-w-[80%] rounded-[18px] rounded-bl-none bg-white px-4 py-3 shadow-md">
              <p className="font-bold text-ink leading-snug">{scenario.prompt}</p>
              <div className="mt-1.5">
                <SpeakButton text={scenario.prompt} lang="en-US" size="sm" />
              </div>
            </div>
          </div>

          {/* Friend reaction */}
          {reaction && (
            <div className="mt-3 flex items-end gap-3 animate-pop-in">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-3xl shadow-md">
                {avatar}
              </div>
              <div className={`max-w-[80%] rounded-[18px] rounded-bl-none px-4 py-3 shadow-md ${
                selected === target.id ? "bg-green-100 text-green-800" : "bg-orange-50 text-orange-800"
              }`}>
                <p className="font-black">{reaction}</p>
              </div>
            </div>
          )}

          {/* Player prompt */}
          <div className="mt-4 flex justify-end">
            <div className="rounded-[14px] bg-white/70 px-4 py-2 text-right">
              <p className="text-xs font-black uppercase tracking-widest text-ink/40">
                Your reply in Spanish ↓
              </p>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        <div className="relative mt-4 grid grid-cols-2 gap-3">
          {celebKey !== null && (
            <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
          )}
          {options.map((option, i) => {
            const isCorrect = selected ? option.id === target.id : false;
            const isSelected = selected === option.id;
            const isWrong = isSelected && !isCorrect;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleChoose(option.id)}
                disabled={!!selected}
                className={`kid-btn border-2 text-center transition-all ${
                  isCorrect
                    ? "border-green-300 bg-gradient-to-b from-green-400 to-green-500 text-white shadow-lg animate-bounce-in"
                    : isWrong
                      ? "border-red-200 bg-red-50 text-red-500 animate-shake"
                      : selected
                        ? "border-gray-100 bg-gray-50 text-gray-300"
                        : `${OPTION_COLORS[i % 4]} border-2 text-white shadow-lg hover:scale-[1.03]`
                }`}
              >
                <span className="block font-display text-xl font-black">{option.spanish}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
