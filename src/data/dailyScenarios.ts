/**
 * Daily Scenario System
 *
 * Provides 30 daily context scenarios (one per day, cycling)
 * Each scenario focuses on a specific theme and world, with progression across Catalonia travel
 *
 * Design:
 * - Days 1-5: Local (Calella foundation)
 * - Days 6-15: Nearby cities (Barcelona, Girona, Tarragona, Montserrat, etc.)
 * - Days 16-25: Practical life (banking, healthcare, shopping, housing)
 * - Days 26-30: Cultural depth (history, festivals, language, regional context)
 */

export interface DailyScenario {
  day: number;
  title: string;
  scenario: string;
  worldFocus: string; // Primary world/category
  themes: string[]; // Secondary themes/worlds
  unlocksSection: string; // Content unlock key (e.g., "calella-history")
  difficulty: "beginner" | "intermediate" | "advanced";
  targetProfiles?: ("child" | "adult")[];
}

export const DAILY_SCENARIOS: DailyScenario[] = [
  // ===== WEEK 1: LOCAL FOUNDATION (CALELLA) =====
  {
    day: 1,
    title: "¡Bienvenido a Calella!",
    scenario:
      "You just arrived in Calella! You check into your accommodation and meet the host. It's time to introduce yourself and learn the basics about your new home.",
    worldFocus: "greetings",
    themes: ["greetings", "polite", "family"],
    unlocksSection: "calella-history",
    difficulty: "beginner",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 2,
    title: "Buscando un piso",
    scenario:
      "You're apartment hunting in Calella with your family. You visit a property and need to ask important questions about the place, utilities, and amenities.",
    worldFocus: "housing",
    themes: ["housing", "polite", "feelings"],
    unlocksSection: "calella-neighborhoods",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 3,
    title: "Primer día en el mercado",
    scenario:
      "It's your first time at the local market in Calella. You want to buy fresh produce and fish, but you need to ask prices and where things are located.",
    worldFocus: "restaurant",
    themes: ["restaurant", "shopping", "polite"],
    unlocksSection: "calella-food-guide",
    difficulty: "beginner",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 4,
    title: "Primeros amigos en la playa",
    scenario:
      "You're at the Calella beach and meet some local kids/families. You want to introduce yourself, ask about fun activities, and maybe join in some games.",
    worldFocus: "playground",
    themes: ["playground", "greetings", "feelings"],
    unlocksSection: "calella-beaches",
    difficulty: "beginner",
    targetProfiles: ["child"]
  },
  {
    day: 5,
    title: "Cena especial en el restaurante local",
    scenario:
      "Your family decides to celebrate your arrival with dinner at a local Catalan restaurant. You navigate the menu, ask for recommendations, and enjoy traditional dishes.",
    worldFocus: "restaurant",
    themes: ["restaurant", "feelings", "polite"],
    unlocksSection: "catalan-cuisine",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },

  // ===== WEEK 2: NEARBY CITIES =====
  {
    day: 6,
    title: "Excursión a Barcelona",
    scenario:
      "You're taking the train to Barcelona for the day! You buy a ticket, meet other travelers, and plan how to get around the city. Practice asking directions and making small talk.",
    worldFocus: "polite",
    themes: ["polite", "greetings", "feelings"],
    unlocksSection: "barcelona-guide",
    difficulty: "intermediate",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 7,
    title: "En el Museu Picasso",
    scenario:
      "You're in Barcelona's Picasso Museum. You ask about exhibits, take a guided tour, and discuss the art with other visitors in Spanish.",
    worldFocus: "polite",
    themes: ["polite", "feelings", "greetings"],
    unlocksSection: "barcelona-culture",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 8,
    title: "Compras en Las Ramblas",
    scenario:
      "You're shopping on Las Ramblas in Barcelona. You browse different shops, negotiate prices with vendors, and decide what souvenirs to bring home.",
    worldFocus: "shopping",
    themes: ["shopping", "polite", "feelings"],
    unlocksSection: "barcelona-shopping",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 9,
    title: "Viaje a Girona",
    scenario:
      "You visit the medieval city of Girona (50 min from Calella). You explore the old town, ask locals for the best spots, and enjoy tapas at a traditional bar.",
    worldFocus: "restaurant",
    themes: ["restaurant", "polite", "feelings"],
    unlocksSection: "girona-guide",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 10,
    title: "Aventura en Montserrat",
    scenario:
      "Day trip to Montserrat! You hike among the dramatic rock formations, visit the monastery, buy local crafts, and chat with monks and pilgrims.",
    worldFocus: "feelings",
    themes: ["feelings", "polite", "playground"],
    unlocksSection: "montserrat-history",
    difficulty: "beginner",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 11,
    title: "Playa en Tossa de Mar",
    scenario:
      "You visit the beautiful beaches of Tossa de Mar. You rent beach equipment, play water sports, and socialize with tourists from different countries.",
    worldFocus: "playground",
    themes: ["playground", "feelings", "greetings"],
    unlocksSection: "costa-brava-beaches",
    difficulty: "beginner",
    targetProfiles: ["child"]
  },
  {
    day: 12,
    title: "Castillo medieval en Tossa",
    scenario:
      "You explore the medieval castle ruins in Tossa de Mar. A tour guide explains the history, and you ask questions about the structure and legends.",
    worldFocus: "polite",
    themes: ["polite", "feelings", "greetings"],
    unlocksSection: "costa-brava-history",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 13,
    title: "Día en Tarragona",
    scenario:
      "You visit the Roman city of Tarragona (1 hour south). You explore ancient ruins, visit a museum, and eat seafood paella at a beachfront restaurant.",
    worldFocus: "restaurant",
    themes: ["restaurant", "polite", "feelings"],
    unlocksSection: "tarragona-guide",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 14,
    title: "Senderismo en el Parque de Montnegre",
    scenario:
      "You go hiking in the Montnegre-Corredor Natural Park. You chat with other hikers, identify local plants and animals, and discuss the beautiful landscape.",
    worldFocus: "feelings",
    themes: ["feelings", "playground", "greetings"],
    unlocksSection: "nature-reserves",
    difficulty: "beginner",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 15,
    title: "Blanes: pueblo costero",
    scenario:
      "You visit the charming coastal town of Blanes. You browse the fish market, talk to fishermen about their catch, and enjoy fresh seafood.",
    worldFocus: "restaurant",
    themes: ["restaurant", "shopping", "polite"],
    unlocksSection: "blanes-guide",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },

  // ===== WEEK 3: PRACTICAL LIFE =====
  {
    day: 16,
    title: "En el banco español",
    scenario:
      "You're opening a bank account in Spain. You speak with a banker, ask about requirements, fees, and services. It's an important administrative step!",
    worldFocus: "banking",
    themes: ["banking", "polite", "feelings"],
    unlocksSection: "spain-banking-system",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 17,
    title: "Cita con el médico",
    scenario:
      "You have a doctor's appointment. You describe your symptoms, listen to the doctor's diagnosis, and get a prescription for medicine.",
    worldFocus: "healthcare",
    themes: ["healthcare", "polite", "feelings"],
    unlocksSection: "spain-healthcare",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 18,
    title: "Compras de ropa en la tienda",
    scenario:
      "You're shopping for clothes in a local store. You try things on, ask about sizes and prices, and negotiate a discount if possible.",
    worldFocus: "shopping",
    themes: ["shopping", "polite", "feelings"],
    unlocksSection: "spanish-fashion",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 19,
    title: "En la farmacia",
    scenario:
      "You pick up your prescription at a Spanish pharmacy. You ask about side effects, interactions with other medicines, and proper dosage.",
    worldFocus: "healthcare",
    themes: ["healthcare", "polite", "feelings"],
    unlocksSection: "spain-medicines",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 20,
    title: "Supermercado semanal",
    scenario:
      "Weekly grocery shopping at the supermarket. You navigate the aisles, read labels, ask staff where items are, and pay at the checkout.",
    worldFocus: "shopping",
    themes: ["shopping", "polite", "restaurant"],
    unlocksSection: "spanish-food-labels",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 21,
    title: "Tramites de vivienda",
    scenario:
      "You're handling paperwork for your new home: registering with the town hall, setting up utilities, and paying bills. Lots of bureaucracy!",
    worldFocus: "housing",
    themes: ["housing", "polite", "banking"],
    unlocksSection: "spanish-bureaucracy",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  },
  {
    day: 22,
    title: "En la peluquería",
    scenario:
      "You visit a Spanish hairdresser. You describe what you want, discuss hair care, and small-talk while getting your hair done.",
    worldFocus: "polite",
    themes: ["polite", "greetings", "feelings"],
    unlocksSection: "local-services",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 23,
    title: "Reparación en el hogar",
    scenario:
      "Something breaks in your house! You call a repair person, describe the problem, negotiate a price, and discuss what needs to be fixed.",
    worldFocus: "housing",
    themes: ["housing", "polite", "feelings"],
    unlocksSection: "home-repair-guide",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  },
  {
    day: 24,
    title: "Clase de español para adultos",
    scenario:
      "You attend a local Spanish conversation class. You introduce yourself, participate in discussions, and make new friends who also speak Spanish.",
    worldFocus: "greetings",
    themes: ["greetings", "polite", "feelings"],
    unlocksSection: "learning-community",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },
  {
    day: 25,
    title: "Cena con amigos españoles",
    scenario:
      "You're invited to dinner at a Spanish friend's home. You bring a gift, compliment the food, and have meaningful conversations about life, family, and culture.",
    worldFocus: "restaurant",
    themes: ["restaurant", "polite", "feelings"],
    unlocksSection: "spanish-social-customs",
    difficulty: "intermediate",
    targetProfiles: ["adult"]
  },

  // ===== WEEK 4: CULTURAL DEPTH =====
  {
    day: 26,
    title: "Historia de Cataluña",
    scenario:
      "You visit a Catalan history museum or read about the region's rich history. You discuss the medieval kingdoms, the Civil War, and modern independence movements.",
    worldFocus: "polite",
    themes: ["polite", "feelings", "greetings"],
    unlocksSection: "catalonia-history",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  },
  {
    day: 27,
    title: "La Festa Major de Calella",
    scenario:
      "It's Festa Major (August festival) in Calella! You participate in parades, eat traditional foods, dance, and celebrate with the community.",
    worldFocus: "feelings",
    themes: ["feelings", "restaurant", "playground"],
    unlocksSection: "catalan-festivals",
    difficulty: "beginner",
    targetProfiles: ["child", "adult"]
  },
  {
    day: 28,
    title: "Idioma: Catalán vs. Español",
    scenario:
      "You learn about Catalan language and culture. You hear locals code-switch between Catalan and Spanish, and practice understanding basic Catalan phrases.",
    worldFocus: "polite",
    themes: ["polite", "greetings", "feelings"],
    unlocksSection: "catalan-language",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  },
  {
    day: 29,
    title: "Arquitectura moderna en Cataluña",
    scenario:
      "You explore modernist architecture in Barcelona and the region. You visit buildings by Gaudí and other architects, discussing the artistic style and history.",
    worldFocus: "polite",
    themes: ["polite", "feelings", "greetings"],
    unlocksSection: "catalan-architecture",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  },
  {
    day: 30,
    title: "Gastronomía tradicional catalana",
    scenario:
      "You take a culinary tour of Catalan cuisine. You learn about traditional dishes like escalivada, pa amb tomàquet, and suquet de peix. You cook or eat them while discussing flavors and traditions.",
    worldFocus: "restaurant",
    themes: ["restaurant", "feelings", "polite"],
    unlocksSection: "catalan-gastronomy",
    difficulty: "advanced",
    targetProfiles: ["adult"]
  }
];

/**
 * Get today's scenario
 * Cycles through 30 scenarios, repeating after day 30
 */
export const getTodayScenario = (dayNumber?: number): DailyScenario => {
  const today = dayNumber ?? new Date().getDate();
  const scenarioIndex = (today - 1) % DAILY_SCENARIOS.length;
  return DAILY_SCENARIOS[scenarioIndex];
};

/**
 * Get scenario for a specific day
 */
export const getScenarioForDay = (day: number): DailyScenario | undefined => {
  return DAILY_SCENARIOS.find((s) => s.day === ((day - 1) % 30) + 1);
};

/**
 * Get all scenarios for a specific profile
 */
export const getScenariosForProfile = (
  profile: "child" | "adult"
): DailyScenario[] => {
  return DAILY_SCENARIOS.filter(
    (s) => !s.targetProfiles || s.targetProfiles.includes(profile)
  );
};
