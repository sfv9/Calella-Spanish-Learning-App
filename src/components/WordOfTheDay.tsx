import { useState } from "react";
import { useSpeech } from "../hooks/useSpeech";

/**
 * Word of the Day - a daily teaser card shown on the Play screen
 * Shows a new Spanish word/phrase each day, tied to the date
 * Makes users want to open the app daily ("what's today's word?")
 */

interface WordOfTheDayEntry {
  spanish: string;
  english: string;
  pronunciation: string;
  context: string; // Calella-specific usage example
  emoji: string;
  category: string;
}

// 31 words — one per day of month, all Calella/Catalonia themed
const DAILY_WORDS: WordOfTheDayEntry[] = [
  { spanish: "El chiringuito", english: "Beach bar/kiosk", pronunciation: "ehl chee-reen-GEE-toh", context: "¿Vamos al chiringuito después del baño? (Shall we go to the beach bar after swimming?)", emoji: "🏖️", category: "Calella Life" },
  { spanish: "Pasear por el paseo", english: "Stroll along the promenade", pronunciation: "pah-seh-AHR por ehl pah-SEH-oh", context: "Me encanta pasear por el paseo al atardecer. (I love strolling along the promenade at sunset.)", emoji: "🌅", category: "Calella Life" },
  { spanish: "La bocina", english: "The boat horn", pronunciation: "lah boh-THEE-nah", context: "¡Escucha la bocina del barco pescador! (Listen to the fishing boat's horn!)", emoji: "🚢", category: "Calella Harbor" },
  { spanish: "El mercat", english: "The market (Catalan)", pronunciation: "ehl mehr-KAHT", context: "Al mercat de Calella venden frutas muy frescas. (At Calella's market they sell very fresh fruit.)", emoji: "🛒", category: "Catalan Words" },
  { spanish: "Molta gràcia", english: "Thank you very much (Catalan)", pronunciation: "MOHL-tah GRAH-see-ah", context: "Learn to thank locals in Catalan — they'll love it!", emoji: "🙏", category: "Catalan Words" },
  { spanish: "El sopar", english: "Dinner (Catalan)", pronunciation: "ehl soh-PAHR", context: "¿A qué hora es el sopar? Aquí cenamos tarde. (What time is dinner? Here we eat late.)", emoji: "🍽️", category: "Catalan Words" },
  { spanish: "Fer la migdiada", english: "To take a siesta (Catalan expression)", pronunciation: "fehr lah meeg-dee-AH-dah", context: "En verano, muchos locales fer la migdiada después de comer. (In summer, many locals take a siesta after lunch.)", emoji: "😴", category: "Catalan Life" },
  { spanish: "Boira", english: "Fog/mist (Catalan)", pronunciation: "BOY-rah", context: "Hay boira esta mañana — el mar parece misterioso. (There's fog this morning — the sea looks mysterious.)", emoji: "🌫️", category: "Weather Calella" },
  { spanish: "La fresca", english: "Evening cool air", pronunciation: "lah FREHS-kah", context: "Salimos a tomar la fresca después de cenar. (We go out to enjoy the cool evening air after dinner.)", emoji: "🌙", category: "Calella Life" },
  { spanish: "A la fresca", english: "Out in the cool evening air", pronunciation: "ah lah FREHS-kah", context: "Los vecinos se sientan a la fresca en verano. (Neighbors sit outside in the cool air in summer.)", emoji: "🌃", category: "Calella Life" },
  { spanish: "Els pescadors", english: "The fishermen (Catalan)", pronunciation: "ehlz pehs-kah-DORS", context: "Els pescadors surten al amanecer. (The fishermen set out at dawn.)", emoji: "🎣", category: "Calella Harbor" },
  { spanish: "La llotja", english: "The fish market/auction (Catalan)", pronunciation: "lah LYOH-jah", context: "A la llotja venden el peix fresc cada día. (At the fish market they sell fresh fish every day.)", emoji: "🐟", category: "Calella Harbor" },
  { spanish: "El tramuntana", english: "The north wind", pronunciation: "ehl trah-moon-TAH-nah", context: "Avui fa tramuntana — el mar está agitado. (Today there's a north wind — the sea is rough.)", emoji: "💨", category: "Weather Calella" },
  { spanish: "Casc antic", english: "Old town (Catalan)", pronunciation: "kahsk AHN-teek", context: "Explorem el casc antic de Calella! (Let's explore the old town of Calella!)", emoji: "🏛️", category: "Catalan Words" },
  { spanish: "La platja", english: "The beach (Catalan)", pronunciation: "lah PLAH-jah", context: "Anem a la platja? (Shall we go to the beach?)", emoji: "🏝️", category: "Catalan Words" },
  { spanish: "Un entrepà", english: "A sandwich (Catalan)", pronunciation: "oon ehn-treh-PAH", context: "De berenar, un entrepà de pernil i formatge. (For a snack, a ham and cheese sandwich.)", emoji: "🥪", category: "Catalan Food" },
  { spanish: "Agua de coco", english: "Coconut water", pronunciation: "AH-gwah deh KOH-koh", context: "En la playa de Calella venden agua de coco muy fría. (On Calella beach they sell very cold coconut water.)", emoji: "🥥", category: "Beach Life" },
  { spanish: "El vermut", english: "Vermouth (aperitif)", pronunciation: "ehl behr-MOOT", context: "El domingo, vermut y tapas antes de comer. (On Sunday, vermouth and tapas before lunch.)", emoji: "🍸", category: "Spanish Culture" },
  { spanish: "Fer el vermut", english: "To do the Sunday vermut ritual", pronunciation: "fehr ehl behr-MOOT", context: "¿Nos juntamos a fer el vermut el domingo? (Shall we meet for Sunday vermouth?)", emoji: "🕐", category: "Catalan Culture" },
  { spanish: "Cagarrons!", english: "Dang it! / Blast! (mild Catalan expletive)", pronunciation: "kah-gah-RONS", context: "Dropped something? Say 'Cagarrons!' — locals will smile.", emoji: "😤", category: "Catalan Expressions" },
  { spanish: "Ostres!", english: "Wow! / Gosh! (Catalan exclamation)", pronunciation: "OHS-trehs", context: "Ostres! Quin peix tan bonic! (Wow! What a beautiful fish!)", emoji: "😮", category: "Catalan Expressions" },
  { spanish: "Ai, mare!", english: "Oh dear! / Oh my! (Catalan)", pronunciation: "AHY, MAH-reh", context: "Ai, mare! Quina calor fa avui! (Oh dear! It's so hot today!)", emoji: "😅", category: "Catalan Expressions" },
  { spanish: "El col·le", english: "The school (Catalan slang)", pronunciation: "ehl KOH-leh", context: "Els nens van al col·le de Calella. (The kids go to the school in Calella.)", emoji: "🏫", category: "Daily Life" },
  { spanish: "Anar a peu", english: "To go on foot / walk (Catalan)", pronunciation: "ah-NAHR ah peh-OO", context: "Anem a peu a la platja — és molt a prop! (Let's walk to the beach — it's very close!)", emoji: "🚶", category: "Getting Around" },
  { spanish: "El carrer Major", english: "The main street (Catalan)", pronunciation: "ehl kah-REH mah-JOR", context: "La farmàcia está al carrer Major de Calella. (The pharmacy is on Calella's main street.)", emoji: "🗺️", category: "Calella Navigation" },
  { spanish: "A tocar de...", english: "Right next to... / A stone's throw from...", pronunciation: "ah toh-KAHR deh", context: "Vivim a tocar de la platja! (We live right next to the beach!)", emoji: "📍", category: "Catalan Expressions" },
  { spanish: "Fem una birra", english: "Let's grab a beer (Catalan)", pronunciation: "fehm oo-nah BEE-rah", context: "Después del partido, fem una birra al bar del port. (After the game, let's grab a beer at the harbor bar.)", emoji: "🍺", category: "Social Life" },
  { spanish: "La revetlla", english: "Eve festival / night before celebration", pronunciation: "lah reh-VEH-lyah", context: "La revetlla de Sant Joan — bonfire night on the beach!", emoji: "🔥", category: "Catalan Festivals" },
  { spanish: "El gegant", english: "The giant (festival puppet)", pronunciation: "ehl jeh-GANT", context: "Els gegants ballen durant la Festa Major de Calella! (The giants dance during Calella's main festival!)", emoji: "🎭", category: "Calella Festivals" },
  { spanish: "Correfoc", english: "Fire run festival (Catalan)", pronunciation: "koh-reh-FOHK", context: "El correfoc — running with fire sparks is a Catalan tradition!", emoji: "🎆", category: "Catalan Festivals" },
  { spanish: "Bona nit, Calella", english: "Goodnight, Calella", pronunciation: "BOH-nah neet, kah-LEHL-ah", context: "Perfect phrase to end a beautiful evening by the Mediterranean.", emoji: "🌙", category: "Calella Life" },
];

interface WordOfTheDayProps {
  onPractice?: (spanish: string, english: string) => void;
}

export function WordOfTheDay({ onPractice }: WordOfTheDayProps = {}) {
  // Start collapsed — it's a teaser. Tap to learn more.
  const [expanded, setExpanded] = useState(false);

  const { speak } = useSpeech();

  const dayOfMonth = new Date().getDate();
  const word = DAILY_WORDS[(dayOfMonth - 1) % DAILY_WORDS.length];

  return (
    <div
      className="rounded-[18px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg cursor-pointer select-none"
      onClick={() => setExpanded(v => !v)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{word.emoji}</span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
              🗓️ Word of the Day · {word.category}
            </p>
            <p className="font-display text-2xl font-black text-white leading-none mt-0.5">
              {word.spanish}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-2">
          <p className="text-xs font-semibold text-white/80">{word.english}</p>
          <p className="text-[10px] text-white/50 mt-0.5">{expanded ? "tap to close ↑" : "tap for more ↓"}</p>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 rounded-[12px] bg-white/15 p-3 animate-pop-in">
          <p className="text-xs font-bold text-white/70 mb-1">Pronunciation</p>
          <p className="text-sm text-white font-semibold">{word.pronunciation}</p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white/70 mb-1">In context</p>
              <p className="text-sm text-white/90 italic">"{word.context}"</p>
            </div>
          </div>

          <div className="mt-3 flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); speak(word.spanish, "es-ES", 0.8); }}
              className="rounded-full bg-white/20 hover:bg-white/30 px-4 py-1.5 text-xs font-black text-white transition"
            >
              🔊 Hear it
            </button>
            {onPractice && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onPractice(word.spanish, word.english); }}
                className="rounded-full bg-white/30 hover:bg-white/50 px-4 py-1.5 text-xs font-black text-white transition border border-white/40"
              >
                ✏️ Practice this word
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
