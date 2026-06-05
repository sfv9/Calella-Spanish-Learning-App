import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useGameSounds } from "../hooks/useGameSounds";
import { useSpeech } from "../hooks/useSpeech";
import { AnswerPayload, LessonTerm } from "../types";
import { StarBurst } from "./StarBurst";

interface DialogueGameProps {
  terms: LessonTerm[];
  onAnswer: (payload: AnswerPayload) => void;
}

interface DialogueTurn {
  speaker: "friend" | "player";
  friendLine?: string;        // English — TTS will speak this
  playerOptions?: LessonTerm[]; // the player picks one of these in Spanish
  correctTermId?: string;
}

interface Dialogue {
  title: string;
  setting: string;
  avatar: string;
  turns: DialogueTurn[];
}

const buildDialogues = (terms: LessonTerm[]): Dialogue[] => {
  const dialogues: Dialogue[] = [];

  const greetingTerms = terms.filter((t) => t.category === "greetings");
  const playgroundTerms = terms.filter((t) => t.category === "playground");
  const restaurantTerms = terms.filter((t) => t.category === "restaurant");
  const feelingTerms = terms.filter((t) => t.category === "feelings");
  const schoolTerms = terms.filter((t) => t.category === "school");
  const politeTerms = terms.filter((t) => t.category === "polite");
  const familyTerms = terms.filter((t) => t.category === "family");

  // pick N random items from pool, always including the first item
  const pick = (pool: LessonTerm[], count = 4): LessonTerm[] =>
    [...pool].sort(() => Math.random() - 0.5).slice(0, count);

  // Playground dialogue
  if (playgroundTerms.length >= 2 && greetingTerms.length >= 1) {
    const hola = greetingTerms.find((t) => t.id === "hola") ?? greetingTerms[0];
    const jugar = playgroundTerms.find((t) => t.id === "quieres-jugar") ?? playgroundTerms[0];
    const vamos = playgroundTerms.find((t) => t.id === "vamos") ?? playgroundTerms[1];

    dialogues.push({
      title: "New Friend at Recess",
      setting: "A new kid walks up to you at the playground.",
      avatar: "👦",
      turns: [
        {
          speaker: "friend",
          friendLine: "Hi there! I'm new here.",
        },
        {
          speaker: "player",
          playerOptions: pick([hola, ...greetingTerms.filter((t) => t.id !== hola.id)]),
          correctTermId: hola.id,
        },
        {
          speaker: "friend",
          friendLine: "Do you want to play with me?",
        },
        {
          speaker: "player",
          playerOptions: pick([jugar, ...playgroundTerms.filter((t) => t.id !== jugar.id)]),
          correctTermId: jugar.id,
        },
        {
          speaker: "friend",
          friendLine: "Okay! Let's go to the swings!",
        },
        {
          speaker: "player",
          playerOptions: pick([vamos, ...playgroundTerms.filter((t) => t.id !== vamos.id)]),
          correctTermId: vamos.id,
        },
      ],
    });
  }

  // Restaurant dialogue
  if (restaurantTerms.length >= 2) {
    const quiero = restaurantTerms.find((t) => t.id === "quiero") ?? restaurantTerms[0];
    const agua = restaurantTerms.find((t) => t.id === "agua-por-favor") ?? restaurantTerms[1];
    const gracias = restaurantTerms.find((t) => t.id === "gracias") ?? restaurantTerms[2];

    dialogues.push({
      title: "At the Taco Restaurant",
      setting: "A friendly waiter comes to take your order.",
      avatar: "👨‍🍳",
      turns: [
        {
          speaker: "friend",
          friendLine: "Hello! Welcome! What would you like to eat?",
        },
        {
          speaker: "player",
          playerOptions: pick([quiero, ...restaurantTerms.filter((t) => t.id !== quiero.id)]),
          correctTermId: quiero.id,
        },
        {
          speaker: "friend",
          friendLine: "Great choice! And something to drink?",
        },
        {
          speaker: "player",
          playerOptions: pick([agua, ...restaurantTerms.filter((t) => t.id !== agua.id)]),
          correctTermId: agua.id,
        },
        {
          speaker: "friend",
          friendLine: "Here is your food. Enjoy your meal!",
        },
        {
          speaker: "player",
          playerOptions: pick([gracias, ...restaurantTerms.filter((t) => t.id !== gracias.id)]),
          correctTermId: gracias.id,
        },
      ],
    });
  }

  // Feelings dialogue
  if (feelingTerms.length >= 2 && greetingTerms.length >= 1) {
    const comoEstas = greetingTerms.find((t) => t.id === "como-estas") ?? greetingTerms[0];
    const estoyBien = greetingTerms.find((t) => t.id === "estoy-bien") ?? greetingTerms[1];
    const feelingTerm = feelingTerms[Math.floor(Math.random() * feelingTerms.length)];

    dialogues.push({
      title: "How Are You?",
      setting: "You run into a friend on the way to school.",
      avatar: "👧",
      turns: [
        {
          speaker: "friend",
          friendLine: "Hey! Good morning! How are you?",
        },
        {
          speaker: "player",
          playerOptions: pick([estoyBien, ...greetingTerms.filter((t) => t.id !== estoyBien.id)]),
          correctTermId: estoyBien.id,
        },
        {
          speaker: "friend",
          friendLine: `That's great! I'm feeling ${feelingTerm.english} today.`,
        },
        {
          speaker: "player",
          playerOptions: pick([comoEstas, ...greetingTerms.filter((t) => t.id !== comoEstas.id)]),
          correctTermId: comoEstas.id,
        },
        {
          speaker: "friend",
          friendLine: "Thanks for asking! You're such a good friend.",
        },
        {
          speaker: "player",
          playerOptions: pick([feelingTerm, ...feelingTerms.filter((t) => t.id !== feelingTerm.id)]),
          correctTermId: feelingTerm.id,
        },
      ],
    });
  }

  // School classroom dialogue
  if (schoolTerms.length >= 2 && politeTerms.length >= 1) {
    const libro = schoolTerms.find((t) => t.id === "libro") ?? schoolTerms[0];
    const lapiz = schoolTerms.find((t) => t.id === "lapiz") ?? schoolTerms[1];
    const porFavor = politeTerms.find((t) => t.id === "por-favor") ?? politeTerms[0];

    dialogues.push({
      title: "In the Classroom",
      setting: "Your teacher starts the lesson and needs your help.",
      avatar: "👩‍🏫",
      turns: [
        { speaker: "friend", friendLine: "Good morning class! Please take out your book." },
        {
          speaker: "player",
          playerOptions: pick([libro, ...schoolTerms.filter((t) => t.id !== libro.id)]),
          correctTermId: libro.id,
        },
        { speaker: "friend", friendLine: "Great! Can someone lend me a pencil, please?" },
        {
          speaker: "player",
          playerOptions: pick([lapiz, ...schoolTerms.filter((t) => t.id !== lapiz.id)]),
          correctTermId: lapiz.id,
        },
        { speaker: "friend", friendLine: "Thank you so much! Remember to always be polite." },
        {
          speaker: "player",
          playerOptions: pick([porFavor, ...politeTerms.filter((t) => t.id !== porFavor.id)]),
          correctTermId: porFavor.id,
        },
      ],
    });
  }

  // Polite phrases dialogue — neighborhood scene
  if (politeTerms.length >= 3 && greetingTerms.length >= 1) {
    const perdon = politeTerms.find((t) => t.id === "perdon") ?? politeTerms[0];
    const gracias = restaurantTerms.find((t) => t.id === "gracias") ?? politeTerms[1];
    const deNada = restaurantTerms.find((t) => t.id === "de-nada") ?? politeTerms[2];

    if (gracias && deNada) {
      dialogues.push({
        title: "Being Kind in the Neighborhood",
        setting: "You accidentally bump into someone at the store.",
        avatar: "🧑",
        turns: [
          { speaker: "friend", friendLine: "Oh! You bumped into me!" },
          {
            speaker: "player",
            playerOptions: pick([perdon, ...politeTerms.filter((t) => t.id !== perdon.id)]),
            correctTermId: perdon.id,
          },
          { speaker: "friend", friendLine: "No worries! Here, I picked up your bag for you." },
          {
            speaker: "player",
            playerOptions: pick([gracias, ...restaurantTerms.filter((t) => t.id !== gracias.id)]),
            correctTermId: gracias.id,
          },
          { speaker: "friend", friendLine: "You're welcome! Have a great day!" },
          {
            speaker: "player",
            playerOptions: pick([deNada, ...restaurantTerms.filter((t) => t.id !== deNada.id)]),
            correctTermId: deNada.id,
          },
        ],
      });
    }
  }

  // Family morning dialogue
  if (familyTerms.length >= 1 && greetingTerms.length >= 2) {
    const buenos = greetingTerms.find((t) => t.id === "buenos-dias") ?? greetingTerms[0];
    const estoyBien = greetingTerms.find((t) => t.id === "estoy-bien") ?? greetingTerms[1];
    const mama = familyTerms.find((t) => t.id === "mama") ?? familyTerms[0];

    dialogues.push({
      title: "Good Morning at Home",
      setting: "You wake up and come downstairs for breakfast.",
      avatar: "👩",
      turns: [
        { speaker: "friend", friendLine: "Good morning, sweetie! Did you sleep well?" },
        {
          speaker: "player",
          playerOptions: pick([buenos, ...greetingTerms.filter((t) => t.id !== buenos.id)]),
          correctTermId: buenos.id,
        },
        { speaker: "friend", friendLine: "How are you feeling today?" },
        {
          speaker: "player",
          playerOptions: pick([estoyBien, ...greetingTerms.filter((t) => t.id !== estoyBien.id)]),
          correctTermId: estoyBien.id,
        },
        { speaker: "friend", friendLine: "That's wonderful! Who am I? Say it in Spanish!" },
        {
          speaker: "player",
          playerOptions: pick([mama, ...familyTerms.filter((t) => t.id !== mama.id)]),
          correctTermId: mama.id,
        },
      ],
    });
  }

  return dialogues.length > 0 ? dialogues : [];
};

const CORRECT_REACTIONS = [
  "¡Perfecto! That's exactly right!",
  "Yes! You got it!",
  "Great Spanish!",
  "¡Muy bien!",
];
const WRONG_REACTIONS = [
  "Hmm, not quite. Try again!",
  "Almost — pick another one!",
];

export function DialogueGame({ terms, onAnswer }: DialogueGameProps) {
  const [dialogues] = useState(() => buildDialogues(terms));
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [reaction, setReaction] = useState<string | null>(null);
  const [celebKey, setCelebKey] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  const { speak } = useSpeech();
  const { playCorrect, playWrong, playStreak } = useGameSounds();

  const dialogue = dialogues[dialogueIndex % Math.max(dialogues.length, 1)];

  if (!dialogue) {
    return (
      <div className="glass-panel p-6">
        <p className="font-display text-2xl text-ink">
          Not enough words unlocked for a full dialogue yet. Keep practicing!
        </p>
      </div>
    );
  }

  const playerTurns = dialogue.turns.filter((t) => t.speaker === "player");
  const currentTurn = dialogue.turns[turnIndex];
  const isComplete = turnIndex >= dialogue.turns.length;

  // Speak friend lines via TTS whenever the turn changes
  useEffect(() => {
    if (!currentTurn || currentTurn.speaker !== "friend") return;
    const timer = window.setTimeout(
      () => speak(currentTurn.friendLine ?? "", "en-US", 0.9),
      350
    );
    return () => window.clearTimeout(timer);
  }, [turnIndex, dialogueIndex]);

  const handleChoose = (option: LessonTerm) => {
    if (selected || !currentTurn?.correctTermId) return;

    const correct = option.id === currentTurn.correctTermId;
    setSelected(option.id);
    setTotalAnswered((n) => n + 1);
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);

    if (correct) {
      setScore((n) => n + 1);
      setCelebKey(Date.now());
      if (nextStreak > 0 && nextStreak % 3 === 0) playStreak();
      else playCorrect();
      setReaction(CORRECT_REACTIONS[Math.floor(Math.random() * CORRECT_REACTIONS.length)]);
    } else {
      playWrong();
      setReaction(WRONG_REACTIONS[Math.floor(Math.random() * WRONG_REACTIONS.length)]);
    }

    onAnswer({ wordId: option.id, correct });

    window.setTimeout(() => {
      setSelected(null);
      setReaction(null);
      if (correct) {
        setTurnIndex((i) => i + 2); // skip friend's next line to player's next prompt
      }
    }, 1100);
  };

  const nextDialogue = () => {
    setDialogueIndex((i) => i + 1);
    setTurnIndex(0);
    setSelected(null);
    setReaction(null);
    setScore(0);
    setTotalAnswered(0);
  };

  // Advance through friend-only turns automatically
  useEffect(() => {
    if (!currentTurn || currentTurn.speaker !== "friend" || isComplete) return;
    const timer = window.setTimeout(() => setTurnIndex((i) => i + 1), 2500);
    return () => window.clearTimeout(timer);
  }, [turnIndex, isComplete]);

  const history = dialogue.turns.slice(0, turnIndex);

  return (
    <div className="glass-panel p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display text-3xl text-ink">Dialogue Mode</p>
            <p className="text-sm text-ink/70">{dialogue.setting}</p>
          </div>
        </div>
        {streak >= 3 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-coral to-mango px-4 py-1.5 text-sm font-black text-white shadow-md">
            🔥 {streak} in a row!
          </span>
        )}
      </div>

      {/* Chat history */}
      <div className="space-y-3 rounded-[24px] bg-gradient-to-b from-sky-50/60 to-white/60 p-4">
        {history.map((turn, i) => (
          <div key={i} className={`flex items-start gap-3 ${turn.speaker === "player" ? "flex-row-reverse" : ""}`}>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
              {turn.speaker === "friend" ? dialogue.avatar : "🧒"}
            </div>
            <div
              className={`max-w-[75%] rounded-[16px] px-4 py-3 text-sm font-semibold ${
                turn.speaker === "friend"
                  ? "rounded-tl-none bg-white shadow-sm text-ink"
                  : "rounded-tr-none bg-gradient-to-r from-coral to-mango text-white"
              }`}
            >
              {turn.speaker === "friend" ? turn.friendLine : (
                turn.playerOptions?.find((o) => o.id === turn.correctTermId)?.spanish ?? "…"
              )}
            </div>
          </div>
        ))}

        {/* Active friend turn — animated dots */}
        {currentTurn?.speaker === "friend" && !isComplete && (
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
              {dialogue.avatar}
            </div>
            <div className="rounded-[16px] rounded-tl-none bg-white px-5 py-3 shadow-sm">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="inline-block h-2 w-2 rounded-full bg-ink/30 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        {/* Completion */}
        {isComplete && (
          <div className="rounded-[18px] bg-[#ebfff2] p-5 text-center">
            <p className="font-display text-2xl text-[#2d8b51]">
              Conversation complete! 🎉
            </p>
            <p className="mt-1 text-sm text-[#2d8b51]/80">
              You got {score} out of {totalAnswered} right.
            </p>
            <button
              type="button"
              onClick={nextDialogue}
              className="mt-4 rounded-full bg-gradient-to-r from-leaf to-lagoon px-6 py-3 font-bold text-white shadow-md"
            >
              Next conversation →
            </button>
          </div>
        )}
      </div>

      {/* Player choice */}
      {currentTurn?.speaker === "player" && !isComplete && (
        <div className="relative mt-4">
          {celebKey !== null && (
            <StarBurst key={celebKey} onDone={() => setCelebKey(null)} />
          )}
          <p className="mb-3 text-right text-xs font-black uppercase tracking-[0.18em] text-ink/40">
            Your reply in Spanish →
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {(currentTurn.playerOptions ?? []).slice(0, 4).map((option) => {
              const isCorrect = selected ? option.id === currentTurn.correctTermId : false;
              const isSelected = selected === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleChoose(option)}
                  className={`rounded-[22px] px-5 py-4 text-left text-lg font-semibold transition ${
                    isCorrect
                      ? "bg-leaf text-white"
                      : isSelected
                        ? "bg-coral text-white"
                        : "bg-white text-ink hover:bg-mango/10"
                  }`}
                >
                  {option.spanish}
                </button>
              );
            })}
          </div>
          {reaction && (
            <p className="mt-3 text-sm font-semibold text-ink/70">{reaction}</p>
          )}
        </div>
      )}

      {/* Progress dots */}
      {!isComplete && playerTurns.length > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {playerTurns.map((_, i) => {
            const playerTurnIndices = dialogue.turns
              .map((t, idx) => ({ t, idx }))
              .filter(({ t }) => t.speaker === "player")
              .map(({ idx }) => idx);
            const answered = playerTurnIndices[i] < turnIndex;
            return (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition ${answered ? "bg-leaf" : "bg-ink/20"}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
