import { Mic, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { useSpeech } from "../hooks/useSpeech";
import { AnswerPayload, LessonTerm } from "../types";
import { StarBurst } from "./StarBurst";

interface SpeakingGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

type Phase = "prompt" | "listening" | "result";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿¡?.!,/]/g, " ")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

const isMatch = (heard: string, expected: string): boolean => {
  const h = normalize(heard);
  const e = normalize(expected);
  if (h === e) return true;
  const eWords = e.split(" ").filter(Boolean);
  const hWords = h.split(" ").filter(Boolean);
  const matched = eWords.filter((w) => hWords.includes(w));
  return eWords.length > 0 && matched.length / eWords.length >= 0.7;
};

const REACTIONS_CORRECT = [
  "¡Perfecto! You said it!",
  "¡Muy bien! That was great!",
  "Sí, sí, sí! You got it!",
  "Amazing! Keep it up!",
];

const REACTIONS_WRONG = [
  "Nice try! Listen and try again.",
  "Almost! Hear it again and keep going.",
  "Good effort! Spanish is tricky.",
  "Keep practicing — you're getting it!",
];

export function SpeakingGame({ terms, onAnswer }: SpeakingGameProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");
  const [heard, setHeard] = useState<string>("");
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [reaction, setReaction] = useState("");
  const recRef = useRef<any>(null);
  const { speak } = useSpeech();
  const { playCorrect, playWrong } = useGameSounds();

  const SpeechRecognitionCtor =
    typeof window !== "undefined"
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;
  const recognitionSupported = Boolean(SpeechRecognitionCtor);

  const target = terms[index % terms.length];

  useEffect(() => {
    setPhase("prompt");
    setHeard("");
    setCorrect(null);
    setReaction("");
  }, [terms]);

  const speakSpanish = useCallback(() => {
    speak(target.spanish, "es-ES", 0.75);
  }, [speak, target.spanish]);

  const startListening = useCallback(() => {
    if (!SpeechRecognitionCtor) return;

    speechSynthesis.cancel();
    const rec = new SpeechRecognitionCtor();
    rec.lang = "es-ES";
    rec.interimResults = false;
    rec.maxAlternatives = 5;
    recRef.current = rec;

    setPhase("listening");
    setHeard("");

    let handled = false;

    rec.onresult = (event: any) => {
      handled = true;
      const alternatives: string[] = Array.from(
        { length: event.results[0].length },
        (_: unknown, i: number) => event.results[0][i].transcript
      );
      const match = alternatives.find((alt) => isMatch(alt, target.spanish));
      const isCorrect = Boolean(match);
      const displayHeard = alternatives[0] ?? "";

      setHeard(displayHeard);
      setCorrect(isCorrect);
      setReaction(
        isCorrect
          ? REACTIONS_CORRECT[Math.floor(Math.random() * REACTIONS_CORRECT.length)]
          : REACTIONS_WRONG[Math.floor(Math.random() * REACTIONS_WRONG.length)]
      );
      if (isCorrect) { setCelebKey(Date.now()); playCorrect(); }
      else { playWrong(); }
      setPhase("result");
      onAnswer({ wordId: target.id, correct: isCorrect });

      if (isCorrect) {
        setTimeout(() => speak(target.spanish, "es-ES", 0.82), 350);
        // Auto-advance after a short celebration
        setTimeout(() => {
          setIndex((v) => v + 1);
          setPhase("prompt");
          setHeard("");
          setCorrect(null);
          setReaction("");
        }, 2200);
      }
    };

    rec.onerror = () => {
      if (handled) return;
      handled = true;
      setPhase("result");
      setHeard("");
      setCorrect(false);
      setReaction("Hmm, I couldn't hear you. Try again!");
      onAnswer({ wordId: target.id, correct: false });
    };

    rec.onend = () => {
      if (!handled) {
        handled = true;
        setPhase("result");
        setHeard("");
        setCorrect(false);
        setReaction("I didn't catch that. Tap the mic and try again!");
        onAnswer({ wordId: target.id, correct: false });
      }
    };

    rec.start();
  }, [SpeechRecognitionCtor, target, onAnswer, speak]);

  const next = () => {
    recRef.current?.abort();
    setIndex((v) => v + 1);
    setPhase("prompt");
    setHeard("");
    setCorrect(null);
    setReaction("");
  };

  return (
    <div className="glass-panel p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-purple-100 p-3 text-purple-600">
          <Mic className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-3xl text-ink">Say It!</p>
          <p className="text-sm text-ink/70">
            Look at the English word, then say it out loud in Spanish.
          </p>
        </div>
      </div>

      {!recognitionSupported && (
        <div className="rounded-[22px] bg-amber-50 p-5 text-amber-800">
          <p className="font-bold">Speaking mode needs Chrome or Edge.</p>
          <p className="mt-1 text-sm">
            Open this app in Chrome and this mode will let you practice speaking Spanish out loud.
          </p>
        </div>
      )}

      {recognitionSupported && (
        <>
          <div className="relative rounded-[28px] bg-gradient-to-br from-purple-50 to-indigo-50 p-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ink/40">
              How do you say this in Spanish?
            </p>
            <p className="mt-3 font-display text-5xl text-ink">{target.english}</p>
            <p className="mt-2 text-sm font-semibold text-ink/50">{target.example}</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={speakSpanish}
                className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700 hover:bg-sky-200"
              >
                <Volume2 className="h-4 w-4" />
                Hear the Spanish first
              </button>
              <span className="text-xs text-ink/35">hint: {target.pronunciation}</span>
            </div>
          </div>

          {phase === "prompt" && (
            <button
              type="button"
              onClick={startListening}
              className="mt-5 w-full rounded-[28px] bg-gradient-to-r from-purple-500 to-indigo-500 py-6 font-display text-2xl font-black text-white shadow-lg shadow-purple-300/40 transition hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mic className="mr-3 inline h-7 w-7" />
              Tap &amp; Speak
            </button>
          )}

          {phase === "listening" && (
            <div className="mt-5 flex flex-col items-center gap-4 rounded-[28px] bg-purple-50 py-10">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-500 shadow-lg shadow-purple-300/50">
                <Mic className="h-10 w-10 text-white" />
                <span className="absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-40" />
              </div>
              <p className="font-display text-2xl font-black text-purple-700">Listening…</p>
              <p className="text-sm text-purple-500">Say the Spanish word clearly!</p>
            </div>
          )}

          {phase === "result" && (
            <div className="relative mt-5 space-y-3">
              {celebKey !== null && (
                <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
              )}

              <div
                className={`rounded-[24px] p-5 ${
                  correct ? "bg-[#ebfff2]" : "bg-[#fff3f0]"
                }`}
              >
                <p
                  className={`font-display text-2xl font-black ${
                    correct ? "text-[#2d8b51]" : "text-coral"
                  }`}
                >
                  {reaction}
                </p>
                {heard ? (
                  <p className="mt-2 text-sm text-ink/60">
                    I heard: <span className="font-bold text-ink">"{heard}"</span>
                  </p>
                ) : null}
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-sm text-ink/60">
                    Answer:{" "}
                    <span className="font-black text-ink">{target.spanish}</span>
                  </p>
                  <button
                    type="button"
                    onClick={speakSpanish}
                    className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700"
                  >
                    <Volume2 className="h-3 w-3" />
                    Hear it
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={startListening}
                  className="flex-1 rounded-[22px] bg-white px-5 py-4 font-bold text-ink shadow-sm"
                >
                  <Mic className="mr-2 inline h-4 w-4" />
                  Try again
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex-[2] rounded-[22px] bg-gradient-to-r from-coral to-mango py-4 font-bold text-white shadow-md"
                >
                  Next word →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
