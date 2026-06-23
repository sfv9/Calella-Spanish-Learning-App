/**
 * Calella Restaurant Learning Content — Christy (intermediate) & Shannon (advanced)
 *
 * Real-world scenarios from the 10 restaurants, with vocabulary and conversational challenges
 * tied to actual menus, locations, and dining situations.
 */

import { LessonTerm } from "../types";

// ============================================================================
// CHRISTY'S INTERMEDIATE CONTENT
// ============================================================================
// Focus: Polite requests, ordering, understanding menus, asking questions

export const CHRISTY_RESTAURANT_BASICS: LessonTerm[] = [
  {
    id: "christy-rest-1",
    spanish: "Quisiera una mesa para dos, por favor",
    english: "I'd like a table for two, please",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "kee-SYEH-rah OO-nah MEH-sah PAH-rah DOS, por fah-VOR",
    example: "At LA RIERA, asking for a table upon arrival",
    level: "intermediate"
  },
  {
    id: "christy-rest-2",
    spanish: "¿Tienen mesa en la terraza?",
    english: "Do you have a table on the terrace?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "tee-EH-nen MEH-sah en lah teh-RAH-thah",
    example: "At NUI or CLUB NÁUTICO, requesting beachfront seating",
    level: "intermediate"
  },
  {
    id: "christy-rest-3",
    spanish: "¿Cuál es la especialidad de la casa?",
    english: "What is the house specialty?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "KWAHL es lah es-peh-see-ah-LEEH-dahd deh lah KAH-sah",
    example: "Asking about LA RODA's rotisserie chicken or LA GAVINA's paella",
    level: "intermediate"
  },
  {
    id: "christy-rest-4",
    spanish: "¿Qué recomienda?",
    english: "What do you recommend?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "keh reh-ko-mee-EHN-dah",
    example: "At any restaurant, asking the waiter for suggestions",
    level: "intermediate"
  },
  {
    id: "christy-rest-5",
    spanish: "¿Tiene opciones vegetarianas?",
    english: "Do you have vegetarian options?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "tee-EH-neh op-see-OH-nes beh-heh-tah-ree-AH-nas",
    example: "At family restaurants or beach clubs",
    level: "intermediate"
  },
  {
    id: "christy-rest-6",
    spanish: "Soy alérgico/a a...",
    english: "I'm allergic to...",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "soy ah-LEHR-hee-ko/ah ah",
    example: "Informing servers of allergies at LA PEIXETERIA (fish) or any restaurant",
    level: "intermediate"
  },
  {
    id: "christy-rest-7",
    spanish: "¿Cuál es el menú del día?",
    english: "What is the menu of the day?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "KWAHL es el meh-NOO del DEE-ah",
    example: "At Restaurant Padel Calella, asking about lunch specials",
    level: "intermediate"
  },
  {
    id: "christy-rest-8",
    spanish: "Quisiera probar la paella de mariscos",
    english: "I'd like to try the seafood paella",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "kee-SYEH-rah pro-BAHR lah pah-EH-yah deh mah-REES-kos",
    example: "At LA GAVINA or LA RIERA, ordering paella",
    level: "intermediate"
  },
  {
    id: "christy-rest-9",
    spanish: "¿Cómo se prepara este plato?",
    english: "How is this dish prepared?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "KOH-mo seh preh-PAH-rah ES-teh PLAH-to",
    example: "Understanding cooking methods at LA LLAR DE FOC (BBQ) or LA FUSTA (traditional)",
    level: "intermediate"
  },
  {
    id: "christy-rest-10",
    spanish: "Quiero el pollo a la brasa",
    english: "I want the grilled chicken",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "kee-EH-ro el POH-yoh ah lah BRAH-sah",
    example: "At LA RODA or LA LLAR DE FOC, ordering roasted chicken",
    level: "intermediate"
  }
];

export const CHRISTY_RESTAURANT_DISHES: LessonTerm[] = [
  // Seafood-focused (LA PEIXETERIA, LA GAVINA, CLUB NÁUTICO)
  {
    id: "christy-dish-1",
    spanish: "gambas al ajillo",
    english: "shrimp in garlic sauce",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "GAHM-bahs ahl ah-HEE-yoh",
    example: "Classic appetizer at coastal restaurants",
    level: "intermediate"
  },
  {
    id: "christy-dish-2",
    spanish: "langostinos",
    english: "scampi / large shrimp",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "lahn-gos-TEE-nos",
    example: "Premium option at LA PEIXETERIA or LA GAVINA",
    level: "intermediate"
  },
  {
    id: "christy-dish-3",
    spanish: "paella de mariscos",
    english: "seafood paella",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "pah-EH-yah deh mah-REES-kos",
    example: "Signature dish at LA GAVINA (best in Calella)",
    level: "intermediate"
  },
  {
    id: "christy-dish-4",
    spanish: "pulpo a la gallega",
    english: "octopus Galician style",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "POOL-po ah lah gah-YEH-gah",
    example: "Traditional preparation at LA FUSTA or LA PEIXETERIA",
    level: "intermediate"
  },
  {
    id: "christy-dish-5",
    spanish: "mero",
    english: "grouper (fish)",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "MEH-ro",
    example: "Fresh fish option at LA PEIXETERIA",
    level: "intermediate"
  },
  {
    id: "christy-dish-6",
    spanish: "lubina",
    english: "sea bass",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "loo-BEE-nah",
    example: "Elegant fish option at NUI or LA GAVINA",
    level: "intermediate"
  },
  // Meat options
  {
    id: "christy-dish-7",
    spanish: "pollo a la brasa",
    english: "grilled chicken",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "POH-yoh ah lah BRAH-sah",
    example: "Specialty at LA RODA and LA LLAR DE FOC",
    level: "intermediate"
  },
  {
    id: "christy-dish-8",
    spanish: "medio pollo",
    english: "half chicken",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "MEH-dee-oh POH-yoh",
    example: "Portion size at LA RODA",
    level: "intermediate"
  },
  {
    id: "christy-dish-9",
    spanish: "carne a la brasa",
    english: "grilled meat",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "KAR-neh ah lah BRAH-sah",
    example: "Main option at LA LLAR DE FOC",
    level: "intermediate"
  },
  // Catalan specialties
  {
    id: "christy-dish-10",
    spanish: "pà amb tomàquet",
    english: "bread with tomato",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "pah AHM to-MAH-ket",
    example: "Traditional Catalan starter at LA FUSTA",
    level: "intermediate"
  },
  {
    id: "christy-dish-11",
    spanish: "escalivada",
    english: "roasted vegetables",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "es-kah-lee-BAH-dah",
    example: "Vegetable side at LA FUSTA or traditional restaurants",
    level: "intermediate"
  },
  {
    id: "christy-dish-12",
    spanish: "fideuà",
    english: "short noodles paella-style",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "fee-deh-AH",
    example: "Catalan alternative to paella at CLUB NÁUTICO or LA GAVINA",
    level: "intermediate"
  }
];

export const CHRISTY_RESTAURANT_ORDERING: LessonTerm[] = [
  {
    id: "christy-order-1",
    spanish: "¿Cuál es el precio?",
    english: "What is the price?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "KWAHL es el PREH-see-oh",
    example: "Asking about cost before ordering",
    level: "intermediate"
  },
  {
    id: "christy-order-2",
    spanish: "Sin cebolla, por favor",
    english: "Without onion, please",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "seen seh-BOH-yah, por fah-VOR",
    example: "Requesting modifications at any restaurant",
    level: "intermediate"
  },
  {
    id: "christy-order-3",
    spanish: "Poco picante",
    english: "Not too spicy",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "POH-ko pee-KAHN-teh",
    example: "Adjusting spice level",
    level: "intermediate"
  },
  {
    id: "christy-order-4",
    spanish: "Bien hecho / poco hecho",
    english: "Well done / rare",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "bee-EHN EH-cho / POH-ko EH-cho",
    example: "Specifying meat doneness at LA LLAR DE FOC",
    level: "intermediate"
  },
  {
    id: "christy-order-5",
    spanish: "¿Traen pan antes?",
    english: "Do you bring bread first?",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "TRAH-en pan AHN-tes",
    example: "Understanding service flow at Spanish restaurants",
    level: "intermediate"
  },
  {
    id: "christy-order-6",
    spanish: "La cuenta, por favor",
    english: "The check, please",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "lah KWEN-tah, por fah-VOR",
    example: "Requesting the bill",
    level: "intermediate"
  }
];

// ============================================================================
// SHANNON'S ADVANCED CONTENT
// ============================================================================
// Focus: Menu complexity, chef communication, regional sophistication, cultural nuance

export const SHANNON_RESTAURANT_ADVANCED: LessonTerm[] = [
  {
    id: "shannon-rest-1",
    spanish: "Nos gustaría una mesa alejada del ruido, con vistas al mar si es posible",
    english: "We'd like a table away from noise, with sea views if possible",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "nos goos-tah-REE-ah OO-nah MEH-sah ah-leh-HAH-dah del ROO-ee-do, con BEES-tahs ahl mahr see es poh-SEE-bleh",
    example: "Sophisticated seating request at NUI or LA GAVINA",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-2",
    spanish: "¿Podría el chef preparar algo especial no en el menú?",
    english: "Could the chef prepare something special not on the menu?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "poh-DREE-ah el chef preh-pah-RAHR AHL-go es-peh-see-AHL no en el meh-NOO",
    example: "Requesting chef's tasting menu at NUI or LA PEIXETERIA",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-3",
    spanish: "¿Cuál es la diferencia entre el mero y la dorada?",
    english: "What's the difference between grouper and gilt-head bream?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "KWAHL es lah dee-feh-REN-see-ah EN-treh el MEH-ro ee lah doh-RAH-dah",
    example: "Expert-level fish comparison at LA PEIXETERIA",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-4",
    spanish: "¿De qué forma prefiere que le prepare el pescado: a la sal, al horno, o a la brasa?",
    english: "How would you prefer the fish prepared: salt-baked, oven-roasted, or grilled?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "deh keh FOR-mah preh-FEE-reh keh leh preh-PAH-reh el pes-KAH-do: ah lah sahl, ahl OR-no, o ah lah BRAH-sah",
    example: "Discussing preparation techniques at a fine seafood restaurant",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-5",
    spanish: "¿Qué maridaje de vino recomendaría para este plato?",
    english: "What wine pairing would you recommend for this dish?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "keh mah-ree-DAH-heh deh VEE-no reh-ko-men-dah-REE-ah PAH-rah ES-teh PLAH-to",
    example: "Wine pairing discussion at upscale restaurants",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-6",
    spanish: "Me encantaría probar el menú degustación",
    english: "I'd love to try the tasting menu",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "meh en-kan-tah-REE-ah pro-BAHR el meh-NOO deh-goos-tah-see-OHN",
    example: "Requesting chef's tasting menu experience",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-7",
    spanish: "¿Cuáles son los productos de temporada que destacan en esta estación?",
    english: "What seasonal products are you highlighting this season?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "KWAH-les son los pro-DOOK-tos deh tem-poh-RAH-dah keh des-tah-KAHN en ES-tah es-tah-see-OHN",
    example: "Discussing seasonal availability at farm-to-table establishments",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-8",
    spanish: "¿Me podría hablar un poco sobre la técnica de cocción de esta paella?",
    english: "Could you tell me a bit about the cooking technique for this paella?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "meh poh-DREE-ah ah-BLAHR oon POH-ko SOH-breh lah TEK-nee-kah deh kok-see-OHN deh ES-tah pah-EH-yah",
    example: "Expert conversation at LA GAVINA about their signature dish",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-9",
    spanish: "Tenemos alergias específicas—¿podrían preparar algo sin...",
    english: "We have specific allergies—could you prepare something without...",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "teh-NEH-mos ah-LEHR-hee-ahs es-peh-SEE-fee-kahs—poh-DREE-ahn preh-pah-RAHR AHL-go seen",
    example: "Communicating complex dietary requirements",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-10",
    spanish: "¿Cuál es la historia detrás de este restaurante?",
    english: "What is the story behind this restaurant?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "KWAHL es lah ees-TOR-ee-ah deh-TRAHS deh ES-teh res-tow-RAHN-teh",
    example: "Asking about restaurant heritage at LA LLAR DE FOC or LA FUSTA",
    level: "advanced-spain"
  }
];

export const SHANNON_DISH_SOPHISTICATION: LessonTerm[] = [
  {
    id: "shannon-dish-1",
    spanish: "Espaguetis negros con alioli de ajo negro",
    english: "Black pasta with black garlic aioli",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "es-pah-GEH-tees NEH-gros con ah-lee-OH-lee deh AH-ho NEH-gro",
    example: "Contemporary preparation at CLUB NÁUTICO",
    level: "advanced-spain"
  },
  {
    id: "shannon-dish-2",
    spanish: "Paella de bogavante con azafrán de la Mancha",
    english: "Lobster paella with La Mancha saffron",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "pah-EH-yah deh boh-gah-VAHN-teh con ath-ah-FRAHN deh lah MAHN-chah",
    example: "Premium paella at LA GAVINA",
    level: "advanced-spain"
  },
  {
    id: "shannon-dish-3",
    spanish: "Rodaballo salvaje a la sal con emulsión de limón",
    english: "Wild turbot in salt crust with lemon emulsion",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "roh-dah-BAH-yoh sahl-VAH-heh ah lah sahl con eh-mul-see-OHN deh lee-MOHN",
    example: "Fine dining preparation at NUI",
    level: "advanced-spain"
  },
  {
    id: "shannon-dish-4",
    spanish: "Crema Catalana con brasa de caramelo",
    english: "Catalan cream with caramel flame",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "KREH-mah kah-tah-LAH-nah con BRAH-sah deh kah-rah-MEH-lo",
    example: "Signature Catalan dessert",
    level: "advanced-spain"
  },
  {
    id: "shannon-dish-5",
    spanish: "Suquet de peix estilo Costa Maresme",
    english: "Fish stew Costa Maresme style",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "soo-KET deh PAY ees-TEE-lo KOS-tah mah-RESS-meh",
    example: "Regional specialty at LA FUSTA or LA PEIXETERIA",
    level: "advanced-spain"
  }
];

export const SHANNON_CULTURAL_DINING: LessonTerm[] = [
  {
    id: "shannon-culture-1",
    spanish: "En Cataluña, la comida principal es al mediodía y la cena es más ligera",
    english: "In Catalonia, the main meal is at midday and dinner is lighter",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "en kah-tah-LOO-nyah, lah ko-MEE-dah preen-see-PAHL es ahl meh-dee-oh-DEE-ah ee lah SEH-nah es mahs lee-HEH-rah",
    example: "Understanding local dining culture",
    level: "advanced-spain"
  },
  {
    id: "shannon-culture-2",
    spanish: "La paella es un plato de comunidad—siempre se comparte",
    english: "Paella is a communal dish—it's always shared",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "lah pah-EH-yah es oon PLAH-to deh ko-moo-nee-DAHD—see-EHM-preh seh KOHM-par-teh",
    example: "Cultural understanding of dining in Spain",
    level: "advanced-spain"
  },
  {
    id: "shannon-culture-3",
    spanish: "El \"menú del día\" es la manera tradicional de comer bien por poco dinero",
    english: "The \"menu of the day\" is the traditional way to eat well for little money",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "el meh-NOO del DEE-ah es lah mah-NEH-rah trah-dee-see-o-NAHL deh ko-MEHR bee-EHN por POH-ko DEE-neh-ro",
    example: "Understanding local economic dining culture",
    level: "advanced-spain"
  },
  {
    id: "shannon-culture-4",
    spanish: "Los españoles raramente cenan antes de las nueve de la noche",
    english: "Spaniards rarely dine before nine o'clock at night",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "los es-pah-nyOH-les rah-rah-MEN-teh SEH-nan AHN-tes deh lahs noo-EH-beh deh lah NOH-cheh",
    example: "Understanding Spanish dinner timing and culture",
    level: "advanced-spain"
  },
  {
    id: "shannon-culture-5",
    spanish: "La gastronomía costera de Calella refleja siglos de tradición marinera",
    english: "Calella's coastal gastronomy reflects centuries of maritime tradition",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "lah gas-troh-no-MEE-ah kos-TEH-rah deh kah-LEH-yah reh-FLEH-hah SEE-glos deh trah-dee-see-OHN mah-ree-NEH-rah",
    example: "Historical context of Calella's fishing heritage",
    level: "advanced-spain"
  }
];

// Combine all Christy content
export const CHRISTY_ALL_RESTAURANT_CONTENT: LessonTerm[] = [
  ...CHRISTY_RESTAURANT_BASICS,
  ...CHRISTY_RESTAURANT_DISHES,
  ...CHRISTY_RESTAURANT_ORDERING,
];

// Combine all Shannon content
export const SHANNON_ALL_RESTAURANT_CONTENT: LessonTerm[] = [
  ...SHANNON_RESTAURANT_ADVANCED,
  ...SHANNON_DISH_SOPHISTICATION,
  ...SHANNON_CULTURAL_DINING,
];
