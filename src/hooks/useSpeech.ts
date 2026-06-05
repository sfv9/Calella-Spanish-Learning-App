import { useCallback, useEffect, useRef, useState } from "react";

// Voices ranked by how natural they sound — first match wins.
// Apple neural voices (Mónica, Paulina) and Google voices beat the generic OS fallback.
const PREFERRED_VOICE_NAMES = [
  "Mónica",   // Apple neural es-ES — best option, download in macOS Accessibility settings
  "Monica",
  "Jorge",    // Apple es-ES
  "Google español",
  "Google Español",
  "Esperanza",
  "Francisca",
  "Diego",
  "Carlos",
  "Paulina",  // es-MX fallback
  "Juan",
  "Luciana",
];

// Castilian es-ES first
const PREFERRED_LANGS = ["es-ES", "es", "es-MX", "es-US", "es-419", "es-AR"];

let cachedVoice: SpeechSynthesisVoice | null = null;

const pickSpanishVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  const voices = speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // 1. Named preferred voices
  for (const name of PREFERRED_VOICE_NAMES) {
    const v = voices.find((v) => v.name.includes(name));
    if (v) { cachedVoice = v; return v; }
  }

  // 2. Best locale match
  for (const lang of PREFERRED_LANGS) {
    const v = voices.find((v) => v.lang === lang || v.lang.startsWith(lang));
    if (v) { cachedVoice = v; return v; }
  }

  // 3. Any Spanish voice
  const v = voices.find((v) => v.lang.startsWith("es"));
  cachedVoice = v ?? null;
  return cachedVoice;
};

export function useSpeech() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Voices load asynchronously — invalidate cache when they arrive
  useEffect(() => {
    if (!supported) return;
    const refresh = () => { cachedVoice = null; };
    speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", refresh);
      speechSynthesis.cancel();
    };
  }, [supported]);

  const speak = useCallback(
    (text: string, lang = "es-ES", rate = 0.88) => {
      if (!supported) return;
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.05; // very slight lift sounds warmer

      // Only apply Spanish voice selection for Spanish lines
      if (lang.startsWith("es")) {
        const voice = pickSpanishVoice();
        if (voice) utterance.voice = voice;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend   = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    },
    [supported]
  );

  const cancel = useCallback(() => {
    if (supported) { speechSynthesis.cancel(); setSpeaking(false); }
  }, [supported]);

  return { speak, cancel, supported, speaking };
}
