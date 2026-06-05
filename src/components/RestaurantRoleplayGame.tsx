import { ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { useSpeech } from "../hooks/useSpeech";
import { AnswerPayload, LessonTerm } from "../types";
import { getDistractors, getRestaurantPrompt } from "../lib/game";
import { StarBurst } from "./StarBurst";

interface RestaurantRoleplayGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

export function RestaurantRoleplayGame({ terms, onAnswer }: RestaurantRoleplayGameProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const { speak } = useSpeech();

  const buildQuestion = (idx: number, t: LessonTerm[]) => {
    const target = t[idx % t.length];
    const scenario = getRestaurantPrompt(target);
    const options = [target, ...getDistractors(target, t)]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    return { target, scenario, options };
  };

  const [question, setQuestion] = useState(() => buildQuestion(0, terms));

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setQuestion(buildQuestion(0, terms));
  }, [terms]);

  useEffect(() => {
    setQuestion(buildQuestion(index, terms));
  }, [index]);  // eslint-disable-line react-hooks/exhaustive-deps

  const { target, scenario, options } = question;

  useEffect(() => {
    const timer = window.setTimeout(
      () => speak(scenario.prompt, "en-US", 0.88),
      300
    );
    return () => window.clearTimeout(timer);
  }, [index, scenario.prompt]);

  const handleChoose = (optionId: string) => {
    if (selected) return;

    const correct = optionId === target.id;
    setSelected(optionId);
    if (correct) setCelebKey(Date.now());
    onAnswer({ wordId: target.id, correct });

    window.setTimeout(() => {
      setSelected(null);
      setIndex((value) => value + 1);
    }, 900);
  };

  return (
    <div className="glass-panel p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-coral/15 p-3 text-coral">
          <ChefHat className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-3xl text-ink">Waiter Adventure</p>
          <p className="text-sm text-ink/70">Use kind restaurant Spanish to place your order.</p>
        </div>
      </div>

      <div className="rounded-[28px] bg-gradient-to-br from-white to-coral/15 p-6">
        <p className="text-sm uppercase tracking-[0.18em] text-ink/45">Scenario</p>
        <p className="mt-2 text-2xl font-bold text-ink">{scenario.prompt}</p>
      </div>

      <div className="relative mt-5 grid gap-3 md:grid-cols-2">
        {celebKey !== null && (
          <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
        )}
        {options.map((option) => {
          const isCorrect = selected ? option.id === target.id : false;
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleChoose(option.id)}
              className={`rounded-[24px] px-5 py-4 text-left text-lg font-semibold ${
                isCorrect
                  ? "bg-leaf text-white"
                  : isSelected
                    ? "bg-coral text-white"
                    : "bg-white text-ink"
              }`}
            >
              {option.spanish}
            </button>
          );
        })}
      </div>
    </div>
  );
}
