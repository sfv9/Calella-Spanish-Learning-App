import { useEffect, useMemo, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { AnswerPayload, LessonTerm } from "../types";
import { StarBurst } from "./StarBurst";

interface MatchingGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

const PAIR_COLORS = [
  "bg-blue-400   border-blue-300   text-white",
  "bg-purple-400 border-purple-300 text-white",
  "bg-orange-400 border-orange-300 text-white",
  "bg-green-400  border-green-300  text-white",
];

export function MatchingGame({ terms, onAnswer }: MatchingGameProps) {
  const [round, setRound] = useState(0);
  const [selectedSpanish, setSelectedSpanish] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [roundComplete, setRoundComplete] = useState(false);
  const { playCorrect, playWrong } = useGameSounds();

  const buildRound = (r: number, t: LessonTerm[]) => {
    const startIdx = r % Math.max(t.length - 2, 1);
    const rt = t.slice(startIdx, startIdx + 3);
    return { roundTerms: rt, englishOptions: [...rt].sort(() => Math.random() - 0.5) };
  };

  const [{ roundTerms, englishOptions }, setRoundData] = useState(() => buildRound(0, terms));

  useEffect(() => {
    setRound(0);
    setSelectedSpanish(null);
    setMatchedIds([]);
    setWrongPair(null);
    setRoundComplete(false);
    setRoundData(buildRound(0, terms));
  }, [terms]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRoundData(buildRound(round, terms));
  }, [round]);  // eslint-disable-line react-hooks/exhaustive-deps

  const handleMatch = (englishId: string) => {
    if (!selectedSpanish || matchedIds.includes(englishId)) return;

    const correct = selectedSpanish === englishId;
    onAnswer({ wordId: selectedSpanish, correct });

    if (correct) {
      playCorrect();
      const nextMatched = [...matchedIds, englishId];
      setMatchedIds(nextMatched);
      setCelebKey(Date.now());
      setSelectedSpanish(null);

      if (nextMatched.length === roundTerms.length) {
        setRoundComplete(true);
        window.setTimeout(() => {
          setRound((v) => v + 1);
          setMatchedIds([]);
          setRoundComplete(false);
        }, 1200);
      }
    } else {
      playWrong();
      setWrongPair(englishId);
      window.setTimeout(() => {
        setWrongPair(null);
        setSelectedSpanish(null);
      }, 600);
    }
  };

  const matchedColor = (id: string) => {
    const idx = matchedIds.indexOf(id);
    return idx >= 0 ? PAIR_COLORS[idx % PAIR_COLORS.length] : null;
  };

  return (
    <div className="overflow-hidden rounded-[28px] border-2 border-white/60 bg-white shadow-float">
      {/* Header */}
      {(() => {
        const level = roundTerms[0]?.level;
        const isAdvanced = level === "advanced-spain";
        const isIntermediate = level === "intermediate";
        return (
          <div className={`flex items-center justify-between px-5 py-3 bg-gradient-to-r ${
            isAdvanced ? "from-violet-600 to-purple-600" :
            isIntermediate ? "from-amber-500 to-orange-500" :
            "from-purple-500 to-indigo-500"
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              <p className="font-display text-xl font-black text-white">Match 'Em Up!</p>
              {isAdvanced && (
                <span className="rounded-full bg-white/30 px-2 py-0.5 text-xs font-black text-white">🎯 ADVANCED</span>
              )}
              {isIntermediate && (
                <span className="rounded-full bg-white/30 px-2 py-0.5 text-xs font-black text-white">📚 INTERMEDIATE</span>
              )}
            </div>
            <div className="flex gap-1.5">
              {roundTerms.map((_, i) => (
                <span key={i} className={`h-3 w-3 rounded-full border border-white/40 transition-all ${
                  i < matchedIds.length ? "bg-white scale-110" : "bg-white/30"
                }`} />
              ))}
            </div>
          </div>
        );
      })()}

      <div className="p-5">
        {roundComplete && (
          <div className="mb-4 rounded-[18px] bg-green-50 border-2 border-green-200 py-4 text-center animate-bounce-in">
            <p className="font-display text-3xl font-black text-green-600">🎉 Round done!</p>
          </div>
        )}

        <p className="mb-3 text-center text-sm font-bold text-ink/50">
          Tap a Spanish word, then tap its English match
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Spanish column */}
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-widest text-ink/40">🇪🇸 Spanish</p>
            {roundTerms.map((term) => {
              const color = matchedColor(term.id);
              const isSelected = selectedSpanish === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => !matchedIds.includes(term.id) && setSelectedSpanish(term.id)}
                  disabled={matchedIds.includes(term.id)}
                  className={`relative w-full rounded-[18px] border-2 px-4 py-4 text-center font-display text-xl font-black transition
                    hover:scale-[1.03] active:scale-[0.97] ${
                    color
                      ? `${color} shadow-md animate-bounce-in`
                      : isSelected
                        ? "border-indigo-400 bg-indigo-50 text-indigo-700 shadow-md scale-[1.03]"
                        : "border-gray-100 bg-white text-ink hover:border-indigo-200 hover:bg-indigo-50"
                  }`}
                >
                  {term.spanish}
                </button>
              );
            })}
          </div>

          {/* English column */}
          <div className="relative space-y-3">
            {celebKey !== null && (
              <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
            )}
            <p className="text-center text-xs font-black uppercase tracking-widest text-ink/40">🇺🇸 English</p>
            {englishOptions.map((term) => {
              const color = matchedColor(term.id);
              const isWrong = wrongPair === term.id;
              return (
                <button
                  key={term.id}
                  type="button"
                  onClick={() => handleMatch(term.id)}
                  disabled={matchedIds.includes(term.id) || !selectedSpanish}
                  className={`w-full rounded-[18px] border-2 px-4 py-4 text-center font-bold text-lg transition
                    hover:scale-[1.03] active:scale-[0.97] ${
                    color
                      ? `${color} shadow-md animate-bounce-in`
                      : isWrong
                        ? "border-red-200 bg-red-50 text-red-600 animate-shake"
                        : selectedSpanish
                          ? "border-coral/40 bg-coral/5 text-ink hover:border-coral hover:bg-coral/10 cursor-pointer"
                          : "border-gray-100 bg-white text-ink/50 cursor-not-allowed"
                  }`}
                >
                  {term.english}
                </button>
              );
            })}
          </div>
        </div>

        {selectedSpanish && (
          <p className="mt-3 text-center text-sm font-bold text-indigo-600 animate-pop-in">
            Now tap the English meaning →
          </p>
        )}
      </div>
    </div>
  );
}
