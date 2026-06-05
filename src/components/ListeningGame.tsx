import { Mic, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { useSpeech } from "../hooks/useSpeech";
import { AnswerPayload, LessonTerm } from "../types";
import { getDistractors } from "../lib/game";
import { StarBurst } from "./StarBurst";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[¿¡?.!,/]/g, " ").toLowerCase().trim().replace(/\s+/g, " ");
const isMatch = (heard: string, expected: string) => {
  const h = normalize(heard);
  const e = normalize(expected);
  if (h === e) return true;
  const eWords = e.split(" ").filter(Boolean);
  return eWords.length > 0 && eWords.filter((w) => h.split(" ").includes(w)).length / eWords.length >= 0.6;
};

interface ListeningGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

const BAR_DELAYS = [0, 0.12, 0.24, 0.36, 0.48, 0.36, 0.24, 0.12];
const BAR_HEIGHTS = [14, 22, 30, 38, 30, 38, 22, 14];

export function ListeningGame({ terms, onAnswer }: ListeningGameProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [repeatPhase, setRepeatPhase] = useState<"idle" | "listening" | "done">("idle");
  const [repeatResult, setRepeatResult] = useState<boolean | null>(null);
  const recRef = useRef<any>(null);
  const { speak, speaking } = useSpeech();
  const { playCorrect, playWrong } = useGameSounds();

  const SpeechRecognitionCtor =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  const target = terms[index % terms.length];
  const options = [target, ...getDistractors(target, terms)]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const startRepeat = useCallback(() => {
    if (!SpeechRecognitionCtor) return;
    speechSynthesis.cancel();
    const rec = new SpeechRecognitionCtor();
    rec.lang = "es-ES";
    rec.interimResults = false;
    rec.maxAlternatives = 4;
    recRef.current = rec;
    setRepeatPhase("listening");
    let handled = false;
    rec.onresult = (event: any) => {
      handled = true;
      const alts: string[] = Array.from({ length: event.results[0].length }, (_: unknown, i: number) => event.results[0][i].transcript);
      const ok = alts.some((a) => isMatch(a, target.spanish));
      setRepeatResult(ok);
      setRepeatPhase("done");
      if (ok) playCorrect(); else playWrong();
    };
    rec.onerror = rec.onend = () => { if (!handled) { handled = true; setRepeatPhase("done"); setRepeatResult(false); } };
    rec.start();
  }, [SpeechRecognitionCtor, target.spanish, playCorrect, playWrong]);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setFeedback(null);
    setRepeatPhase("idle");
    setRepeatResult(null);
  }, [terms]);

  useEffect(() => {
    const timer = window.setTimeout(() => speak(target.spanish, "es-ES", 0.78), 400);
    return () => window.clearTimeout(timer);
  }, [index, target.spanish]);

  const playAudio = () => speak(target.spanish, "es-ES", 0.78);

  const handleChoose = (optionId: string) => {
    if (selected) return;

    const correct = optionId === target.id;
    setSelected(optionId);
    if (correct) { setCelebKey(Date.now()); playCorrect(); }
    else { playWrong(); }
    setFeedback(correct ? "You listened carefully! Great job!" : "Almost! Tap the speaker and try again.");
    onAnswer({ wordId: target.id, correct });

    window.setTimeout(() => {
      setIndex((value) => value + 1);
      setSelected(null);
      setFeedback(null);
      setRepeatPhase("idle");
      setRepeatResult(null);
    }, 900);
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-3xl text-ink">Echo Cave</p>
          <p className="text-sm text-ink/70">Listen to the word, then choose the matching English meaning.</p>
        </div>
      </div>

      {/* Audio visualizer button */}
      <div className="mt-5 flex flex-col items-center gap-4 rounded-[28px] bg-gradient-to-br from-sky-50 to-indigo-50 py-8">
        <button
          type="button"
          onClick={playAudio}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-300/40 transition hover:scale-105 active:scale-95"
          aria-label="Play audio"
        >
          <Volume2 className="h-9 w-9 text-white" />
        </button>

        {/* Wave bars — animated when speaking, static otherwise */}
        <div className="flex items-end gap-1" style={{ height: 40 }}>
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`w-2 rounded-full bg-sky-400 ${speaking ? "wave-bar" : ""}`}
              style={{
                height: speaking ? h : Math.round(h * 0.3),
                animationDelay: speaking ? `${BAR_DELAYS[i]}s` : undefined,
                transition: "height 0.3s",
              }}
            />
          ))}
        </div>

        <p className="text-sm font-bold text-sky-600">
          {speaking ? "Listen carefully…" : "Tap to hear the Spanish word"}
        </p>
      </div>

      {/* Repeat After Me */}
      {SpeechRecognitionCtor && !selected && (
        <div className="mt-3 flex items-center gap-3 rounded-[20px] bg-purple-50 px-4 py-3">
          <p className="flex-1 text-sm font-bold text-purple-700">
            Now try saying it in Spanish!
          </p>
          {repeatPhase === "idle" && (
            <button type="button" onClick={startRepeat}
              className="inline-flex items-center gap-1.5 rounded-full bg-purple-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-purple-600">
              <Mic className="h-3.5 w-3.5" /> Say it
            </button>
          )}
          {repeatPhase === "listening" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-300 px-4 py-2 text-sm font-bold text-white">
              <Mic className="h-3.5 w-3.5 animate-pulse" /> Listening…
            </span>
          )}
          {repeatPhase === "done" && (
            <span className={`rounded-full px-4 py-2 text-sm font-black ${repeatResult ? "bg-leaf/20 text-[#2d8b51]" : "bg-coral/20 text-coral"}`}>
              {repeatResult ? "¡Perfecto! 🎉" : "Nice try! 💪"}
            </span>
          )}
        </div>
      )}

      <div className="relative mt-3 grid gap-3 md:grid-cols-2">
        {celebKey !== null && (
          <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
        )}
        {options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = selected ? option.id === target.id : false;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleChoose(option.id)}
              className={`rounded-[24px] px-5 py-4 text-left text-lg font-semibold transition ${
                isCorrect
                  ? "bg-leaf text-white"
                  : isSelected
                    ? "bg-coral text-white"
                    : "bg-white text-ink hover:bg-sky-50"
              }`}
            >
              {option.english}
            </button>
          );
        })}
      </div>

      {feedback ? <p className="mt-4 text-sm font-semibold text-ink/75">{feedback}</p> : null}
    </div>
  );
}
