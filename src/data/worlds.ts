import { BadgeDefinition, LevelDefinition, WorldDefinition } from "../types";

export const LEVELS: LevelDefinition[] = [
  { id: 1, title: "Hola Helper", minimumPoints: 0 },
  { id: 2, title: "Playground Pal", minimumPoints: 160 },
  { id: 3, title: "Taco Talker", minimumPoints: 380 },
  { id: 4, title: "Super Amigo", minimumPoints: 720 },
  { id: 5, title: "Spanish Explorer", minimumPoints: 1100 }
];

export const BADGES: BadgeDefinition[] = [
  {
    id: "first-word",
    title: "First Word",
    description: "Answer your very first Spanish word correctly."
  },
  {
    id: "playground-ready",
    title: "Playground Ready",
    description: "Master 5 playground phrases."
  },
  {
    id: "restaurant-ready",
    title: "Restaurant Ready",
    description: "Master 5 restaurant phrases."
  },
  {
    id: "15-minute-hero",
    title: "15-Minute Hero",
    description: "Finish a full daily adventure session."
  },
  {
    id: "5-day-streak",
    title: "5-Day Streak",
    description: "Practice five days in a row."
  }
];

export const WORLDS: WorldDefinition[] = [
  {
    id: "greetings",
    title: "Greetings Harbor",
    shortTitle: "Greetings",
    description: "Learn hello, names, and easy first words.",
    unlockPoints: 0,
    iconKey: "sun",
    colorClass: "from-mango to-coral",
    accentClass: "bg-mango/20 text-coral",
    mapPosition: { top: "10%", left: "28%" }
  },
  {
    id: "playground",
    title: "Playground Peak",
    shortTitle: "Playground",
    description: "Talk with new friends while you run and play.",
    unlockPoints: 120,
    iconKey: "mountain",
    colorClass: "from-leaf to-lagoon",
    accentClass: "bg-leaf/15 text-leaf",
    mapPosition: { top: "36%", left: "46%" }
  },
  {
    id: "restaurant",
    title: "Restaurant Reef",
    shortTitle: "Restaurant",
    description: "Order tacos, drinks, and say thank you politely.",
    unlockPoints: 240,
    iconKey: "utensils",
    colorClass: "from-coral to-mango",
    accentClass: "bg-coral/15 text-coral",
    mapPosition: { top: "70%", left: "66%" }
  },
  {
    id: "feelings",
    title: "Feelings Forest",
    shortTitle: "Feelings",
    description: "Say how you feel and what your body needs.",
    unlockPoints: 360,
    iconKey: "heart",
    colorClass: "from-emerald-300 to-leaf",
    accentClass: "bg-green-100 text-green-700",
    mapPosition: { top: "68%", left: "18%" }
  },
  {
    id: "colorsNumbers",
    title: "Color Cove",
    shortTitle: "Colors and Numbers",
    description: "Spot colors and count your way across the sea.",
    unlockPoints: 480,
    iconKey: "palette",
    colorClass: "from-sky-300 to-purple-300",
    accentClass: "bg-sky-100 text-sky-700",
    mapPosition: { top: "34%", left: "9%" }
  },
  {
    id: "animalsToys",
    title: "Animal Island",
    shortTitle: "Animals and Toys",
    description: "Meet favorite animals and playful toy words.",
    unlockPoints: 620,
    iconKey: "paw",
    colorClass: "from-orange-300 to-rose-300",
    accentClass: "bg-orange-100 text-orange-700",
    mapPosition: { top: "14%", left: "70%" }
  },
  {
    id: "school",
    title: "School Station",
    shortTitle: "School Words",
    description: "Use classroom words for books, pencils, and more.",
    unlockPoints: 780,
    iconKey: "book",
    colorClass: "from-indigo-300 to-sky-300",
    accentClass: "bg-indigo-100 text-indigo-700",
    mapPosition: { top: "80%", left: "39%" }
  },
  {
    id: "family",
    title: "Family Falls",
    shortTitle: "Family Words",
    description: "Talk about the people you love at home.",
    unlockPoints: 940,
    iconKey: "users",
    colorClass: "from-pink-300 to-fuchsia-300",
    accentClass: "bg-pink-100 text-pink-700",
    mapPosition: { top: "34%", left: "74%" }
  },
  {
    id: "polite",
    title: "Polite Phrase Port",
    shortTitle: "Polite Phrases",
    description: "Practice kind, brave, and respectful words.",
    unlockPoints: 1100,
    iconKey: "sparkles",
    colorClass: "from-yellow-200 to-amber-400",
    accentClass: "bg-yellow-100 text-yellow-700",
    mapPosition: { top: "58%", left: "82%" }
  },

  // ===== ADVANCED WORLDS FOR SPAIN (Shannon) =====
  {
    id: "housing",
    title: "Housing Hub",
    shortTitle: "Housing",
    description: "Find and rent apartments in Spain.",
    unlockPoints: 1300,
    iconKey: "home",
    colorClass: "from-red-400 to-rose-400",
    accentClass: "bg-red-100 text-red-700",
    mapPosition: { top: "20%", left: "85%" }
  },
  {
    id: "banking",
    title: "Banking Boulevard",
    shortTitle: "Banking",
    description: "Handle accounts, transfers, and credit in Spain.",
    unlockPoints: 1400,
    iconKey: "creditCard",
    colorClass: "from-emerald-400 to-green-500",
    accentClass: "bg-emerald-100 text-emerald-700",
    mapPosition: { top: "40%", left: "90%" }
  },
  {
    id: "healthcare",
    title: "Healthcare Haven",
    shortTitle: "Healthcare",
    description: "Navigate doctors, prescriptions, and medical care.",
    unlockPoints: 1500,
    iconKey: "heart",
    colorClass: "from-rose-400 to-pink-500",
    accentClass: "bg-rose-100 text-rose-700",
    mapPosition: { top: "60%", left: "85%" }
  },
  {
    id: "dining",
    title: "Dining District",
    shortTitle: "Advanced Dining",
    description: "Order like a local with regional specialties.",
    unlockPoints: 1600,
    iconKey: "utensils",
    colorClass: "from-orange-400 to-amber-500",
    accentClass: "bg-orange-100 text-orange-700",
    mapPosition: { top: "75%", left: "88%" }
  },
  {
    id: "shopping",
    title: "Shopping Sector",
    shortTitle: "Shopping",
    description: "Negotiate prices and navigate Spanish stores.",
    unlockPoints: 1700,
    iconKey: "shoppingBag",
    colorClass: "from-cyan-400 to-blue-500",
    accentClass: "bg-cyan-100 text-cyan-700",
    mapPosition: { top: "50%", left: "78%" }
  },
  {
    id: "admin",
    title: "Administrative Avenue",
    shortTitle: "Bureaucracy",
    description: "Handle paperwork, permits, and local offices.",
    unlockPoints: 1800,
    iconKey: "fileText",
    colorClass: "from-gray-400 to-slate-500",
    accentClass: "bg-gray-100 text-gray-700",
    mapPosition: { top: "30%", left: "75%" }
  },
  {
    id: "culture",
    title: "Cultural Corner",
    shortTitle: "Culture & Social",
    description: "Engage with locals, festivals, and Spanish life.",
    unlockPoints: 1900,
    iconKey: "sparkles",
    colorClass: "from-violet-400 to-purple-500",
    accentClass: "bg-violet-100 text-violet-700",
    mapPosition: { top: "70%", left: "75%" }
  }
];
