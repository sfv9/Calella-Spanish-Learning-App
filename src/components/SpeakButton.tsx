import { Volume2 } from "lucide-react";
import { useSpeech } from "../hooks/useSpeech";

interface SpeakButtonProps {
  text: string;
  lang?: string;
  size?: "sm" | "md";
}

export function SpeakButton({ text, lang = "es-ES", size = "md" }: SpeakButtonProps) {
  const { speak, supported } = useSpeech();
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text, lang);
      }}
      className={`inline-flex items-center justify-center rounded-full bg-sky-100 text-sky-700 transition hover:bg-sky-200 active:scale-95 ${
        size === "sm" ? "p-1.5" : "gap-1.5 px-3 py-2 text-sm font-bold"
      }`}
      title="Hear pronunciation"
      aria-label="Hear pronunciation"
    >
      <Volume2 className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {size === "md" && <span>Hear it</span>}
    </button>
  );
}
