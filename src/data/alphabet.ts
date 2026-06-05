/**
 * Spanish alphabet (RAE 27-letter modern alphabet)
 * Each letter has:
 * - letter: the uppercase form (for display)
 * - name: how Spaniards pronounce the letter's NAME (e.g. "A" = "ah", "G" = "heh")
 * - exampleEmoji: a fun emoji that starts with this letter
 * - exampleWord: a Spanish word starting with this letter (kid-friendly)
 * - exampleEnglish: simple English translation of the example word
 */

export interface SpanishLetter {
  letter: string;       // "A"
  lower: string;        // "a"
  name: string;         // pronunciation hint, like "ah"
  spokenName: string;   // text passed to TTS — for letter name (e.g. "a" in Spanish)
  exampleEmoji: string; // emoji for the word
  exampleWord: string;  // e.g. "Avión"
  exampleEnglish: string; // e.g. "Airplane"
}

export const SPANISH_ALPHABET: SpanishLetter[] = [
  { letter: "A", lower: "a", name: "ah",    spokenName: "a",  exampleEmoji: "✈️",  exampleWord: "Avión",     exampleEnglish: "Airplane"   },
  { letter: "B", lower: "b", name: "beh",   spokenName: "be", exampleEmoji: "⚽",  exampleWord: "Balón",     exampleEnglish: "Ball"       },
  { letter: "C", lower: "c", name: "seh",   spokenName: "ce", exampleEmoji: "🏠",  exampleWord: "Casa",      exampleEnglish: "House"      },
  { letter: "D", lower: "d", name: "deh",   spokenName: "de", exampleEmoji: "🐬",  exampleWord: "Delfín",    exampleEnglish: "Dolphin"    },
  { letter: "E", lower: "e", name: "eh",    spokenName: "e",  exampleEmoji: "🐘",  exampleWord: "Elefante",  exampleEnglish: "Elephant"   },
  { letter: "F", lower: "f", name: "EH-feh",spokenName: "efe",exampleEmoji: "🌸",  exampleWord: "Flor",      exampleEnglish: "Flower"     },
  { letter: "G", lower: "g", name: "heh",   spokenName: "ge", exampleEmoji: "🐱",  exampleWord: "Gato",      exampleEnglish: "Cat"        },
  { letter: "H", lower: "h", name: "AH-cheh",spokenName: "hache",exampleEmoji: "🤝",exampleWord: "Hola",     exampleEnglish: "Hello"      },
  { letter: "I", lower: "i", name: "ee",    spokenName: "i",  exampleEmoji: "🏝️",  exampleWord: "Isla",      exampleEnglish: "Island"     },
  { letter: "J", lower: "j", name: "HOH-tah",spokenName: "jota",exampleEmoji: "🦒",exampleWord: "Jirafa",    exampleEnglish: "Giraffe"    },
  { letter: "K", lower: "k", name: "kah",   spokenName: "ka", exampleEmoji: "🥝",  exampleWord: "Kiwi",      exampleEnglish: "Kiwi"       },
  { letter: "L", lower: "l", name: "EH-leh",spokenName: "ele",exampleEmoji: "🦁",  exampleWord: "León",      exampleEnglish: "Lion"       },
  { letter: "M", lower: "m", name: "EH-meh",spokenName: "eme",exampleEmoji: "🌊",  exampleWord: "Mar",       exampleEnglish: "Sea"        },
  { letter: "N", lower: "n", name: "EH-neh",spokenName: "ene",exampleEmoji: "❄️",  exampleWord: "Nieve",     exampleEnglish: "Snow"       },
  { letter: "Ñ", lower: "ñ", name: "EHN-yeh",spokenName: "eñe",exampleEmoji: "🦊",exampleWord: "Ñu",        exampleEnglish: "Wildebeest" },
  { letter: "O", lower: "o", name: "oh",    spokenName: "o",  exampleEmoji: "🐻",  exampleWord: "Oso",       exampleEnglish: "Bear"       },
  { letter: "P", lower: "p", name: "peh",   spokenName: "pe", exampleEmoji: "🐧",  exampleWord: "Pingüino",  exampleEnglish: "Penguin"    },
  { letter: "Q", lower: "q", name: "koo",   spokenName: "cu", exampleEmoji: "🧀",  exampleWord: "Queso",     exampleEnglish: "Cheese"     },
  { letter: "R", lower: "r", name: "EH-rreh",spokenName: "erre",exampleEmoji: "🌹",exampleWord: "Rosa",      exampleEnglish: "Rose"       },
  { letter: "S", lower: "s", name: "EH-seh",spokenName: "ese",exampleEmoji: "☀️",  exampleWord: "Sol",       exampleEnglish: "Sun"        },
  { letter: "T", lower: "t", name: "teh",   spokenName: "te", exampleEmoji: "🐢",  exampleWord: "Tortuga",   exampleEnglish: "Turtle"     },
  { letter: "U", lower: "u", name: "oo",    spokenName: "u",  exampleEmoji: "🍇",  exampleWord: "Uva",       exampleEnglish: "Grape"      },
  { letter: "V", lower: "v", name: "OO-beh",spokenName: "uve",exampleEmoji: "🐄",  exampleWord: "Vaca",      exampleEnglish: "Cow"        },
  { letter: "W", lower: "w", name: "OO-beh DOH-bleh", spokenName: "uve doble", exampleEmoji: "🥝", exampleWord: "Wifi", exampleEnglish: "Wifi" },
  { letter: "X", lower: "x", name: "EH-kees",spokenName: "equis",exampleEmoji: "🎷",exampleWord: "Xilófono",exampleEnglish: "Xylophone"  },
  { letter: "Y", lower: "y", name: "yeh",   spokenName: "ye", exampleEmoji: "⛵",  exampleWord: "Yate",      exampleEnglish: "Yacht"      },
  { letter: "Z", lower: "z", name: "THEH-tah",spokenName: "zeta",exampleEmoji: "🦊",exampleWord: "Zorro",   exampleEnglish: "Fox"        },
];
