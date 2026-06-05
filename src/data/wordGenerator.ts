import { LessonTerm } from "../types";

/**
 * Generates word variations from a base term to expand vocabulary
 * Variations include: tenses, gender/number, morphological families
 */

interface GeneratedVariation extends LessonTerm {
  generatedFrom?: string; // ID of the original word
  variationType?: "tense" | "gender" | "number" | "related";
}

// Mapping of base terms to their variations
const VARIATION_RULES: Record<string, GeneratedVariation[]> = {
  // TENSE VARIATIONS (present -> past/future)
  "hola": [
    {
      id: "hola-ayer",
      spanish: "Hola, ayer",
      english: "Hello, yesterday",
      category: "greetings",
      difficulty: 2,
      pronunciation: "OH-lah, ah-YEHR",
      example: "Hola, ayer fue un buen día.",
      generatedFrom: "hola",
      variationType: "related",
      level: "intermediate"
    },
    {
      id: "hola-mañana",
      spanish: "Hola, mañana",
      english: "Hello, tomorrow",
      category: "greetings",
      difficulty: 2,
      pronunciation: "OH-lah, mah-NYAH-nah",
      example: "Hola, mañana nos vemos.",
      generatedFrom: "hola",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // VERB TENSES (hablar example pattern)
  "quiero": [
    {
      id: "queria",
      spanish: "Quería...",
      english: "I wanted...",
      category: "restaurant",
      difficulty: 3,
      pronunciation: "kee-eh-REE-ah",
      example: "Quería la sopa ayer.",
      generatedFrom: "quiero",
      variationType: "tense",
      level: "intermediate"
    },
    {
      id: "querria",
      spanish: "Querría...",
      english: "I would want...",
      category: "restaurant",
      difficulty: 4,
      pronunciation: "keh-REE-ah",
      example: "Querría una mesa cerca de la ventana.",
      generatedFrom: "quiero",
      variationType: "tense",
      level: "intermediate"
    },
    {
      id: "querre",
      spanish: "Querré...",
      english: "I will want...",
      category: "restaurant",
      difficulty: 3,
      pronunciation: "keh-REH",
      example: "Querré probar los postres.",
      generatedFrom: "quiero",
      variationType: "tense",
      level: "intermediate"
    }
  ],

  // GENDER VARIATIONS (masculine/feminine)
  "hermano": [
    {
      id: "hermana-alt",
      spanish: "Hermana",
      english: "Sister",
      category: "family",
      difficulty: 1,
      pronunciation: "ehr-MAH-nah",
      example: "Mi hermana juega fútbol.",
      generatedFrom: "hermano",
      variationType: "gender",
      level: "intermediate"
    }
  ],

  // NUMBER VARIATIONS (singular/plural)
  "amigo": [
    {
      id: "amigos",
      spanish: "Amigos / amigas",
      english: "Friends",
      category: "playground",
      difficulty: 2,
      pronunciation: "ah-MEE-gohs / ah-MEE-gahs",
      example: "Mis amigos son divertidos.",
      generatedFrom: "amigo",
      variationType: "number",
      level: "intermediate"
    }
  ],

  "pelota": [
    {
      id: "pelotas",
      spanish: "Pelotas",
      english: "Balls",
      category: "playground",
      difficulty: 2,
      pronunciation: "peh-LOH-tahs",
      example: "Las pelotas están en la canasta.",
      generatedFrom: "pelota",
      variationType: "number",
      level: "intermediate"
    }
  ],

  // FOOD & DINING EXPANSIONS
  "tacos": [
    {
      id: "taco-singular",
      spanish: "Taco",
      english: "Taco",
      category: "restaurant",
      difficulty: 1,
      pronunciation: "TAH-koh",
      example: "Un taco de carne asada.",
      generatedFrom: "tacos",
      variationType: "number",
      level: "intermediate"
    },
    {
      id: "tacos-al-pastor",
      spanish: "Tacos al pastor",
      english: "Tacos al pastor",
      category: "restaurant",
      difficulty: 3,
      pronunciation: "TAH-kohs ahl pahs-TOR",
      example: "Quiero tacos al pastor con piña.",
      generatedFrom: "tacos",
      variationType: "related",
      level: "intermediate"
    }
  ],

  "pollo": [
    {
      id: "pollo-asado",
      spanish: "Pollo asado",
      english: "Roasted chicken",
      category: "restaurant",
      difficulty: 3,
      pronunciation: "POY-yoh ah-SAH-doh",
      example: "El pollo asado es delicioso.",
      generatedFrom: "pollo",
      variationType: "related",
      level: "intermediate"
    },
    {
      id: "pechugas",
      spanish: "Pechugas de pollo",
      english: "Chicken breasts",
      category: "restaurant",
      difficulty: 3,
      pronunciation: "peh-CHOO-gahs deh POY-yoh",
      example: "Las pechugas de pollo son tiernas.",
      generatedFrom: "pollo",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // FEELINGS EXPANSION
  "feliz": [
    {
      id: "felicidad",
      spanish: "Felicidad",
      english: "Happiness",
      category: "feelings",
      difficulty: 3,
      pronunciation: "feh-lee-see-DAHD",
      example: "Estoy lleno de felicidad.",
      generatedFrom: "feliz",
      variationType: "related",
      level: "intermediate"
    },
    {
      id: "muy-feliz",
      spanish: "Muy feliz",
      english: "Very happy",
      category: "feelings",
      difficulty: 2,
      pronunciation: "moo-ee feh-LEES",
      example: "Estoy muy feliz hoy.",
      generatedFrom: "feliz",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // COLORS WITH GENDER VARIATIONS
  "rojo": [
    {
      id: "roja",
      spanish: "Roja",
      english: "Red (feminine)",
      category: "colorsNumbers",
      difficulty: 2,
      pronunciation: "ROH-hah",
      example: "La manzana roja es grande.",
      generatedFrom: "rojo",
      variationType: "gender",
      level: "intermediate"
    }
  ],

  "azul": [
    {
      id: "azules",
      spanish: "Azules",
      english: "Blue (plural)",
      category: "colorsNumbers",
      difficulty: 2,
      pronunciation: "ah-SOO-lehs",
      example: "Los ojos azules son lindos.",
      generatedFrom: "azul",
      variationType: "number",
      level: "intermediate"
    }
  ],

  // SCHOOL EXPANSIONS
  "escuela": [
    {
      id: "escuelas",
      spanish: "Escuelas",
      english: "Schools",
      category: "school",
      difficulty: 2,
      pronunciation: "ehs-KWEH-lahs",
      example: "Hay muchas escuelas en la ciudad.",
      generatedFrom: "escuela",
      variationType: "number",
      level: "intermediate"
    }
  ],

  "libro": [
    {
      id: "libros",
      spanish: "Libros",
      english: "Books",
      category: "school",
      difficulty: 2,
      pronunciation: "LEE-brohs",
      example: "Tengo tres libros en mi mochila.",
      generatedFrom: "libro",
      variationType: "number",
      level: "intermediate"
    },
    {
      id: "libro-nuevo",
      spanish: "Libro nuevo",
      english: "New book",
      category: "school",
      difficulty: 2,
      pronunciation: "LEE-broh NWEH-voh",
      example: "Tengo un libro nuevo de aventuras.",
      generatedFrom: "libro",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // ANIMALS EXPANSION
  "perro": [
    {
      id: "perros",
      spanish: "Perros",
      english: "Dogs",
      category: "animalsToys",
      difficulty: 2,
      pronunciation: "PEH-rrohs",
      example: "Los perros corren en el parque.",
      generatedFrom: "perro",
      variationType: "number",
      level: "intermediate"
    },
    {
      id: "perro-grande",
      spanish: "Perro grande",
      english: "Big dog",
      category: "animalsToys",
      difficulty: 2,
      pronunciation: "PEH-rroh GRAHN-deh",
      example: "El perro grande come mucho.",
      generatedFrom: "perro",
      variationType: "related",
      level: "intermediate"
    }
  ],

  "gato": [
    {
      id: "gatos",
      spanish: "Gatos",
      english: "Cats",
      category: "animalsToys",
      difficulty: 2,
      pronunciation: "GAH-tohs",
      example: "Los gatos duermen en el sofá.",
      generatedFrom: "gato",
      variationType: "number",
      level: "intermediate"
    }
  ],

  // HOUSE/FAMILY CONTEXT
  "casa": [
    {
      id: "casas",
      spanish: "Casas",
      english: "Houses",
      category: "family",
      difficulty: 2,
      pronunciation: "KAH-sahs",
      example: "Las casas en la calle son viejas.",
      generatedFrom: "casa",
      variationType: "number",
      level: "intermediate"
    },
    {
      id: "mi-casa",
      spanish: "Mi casa es su casa",
      english: "My home is your home",
      category: "family",
      difficulty: 3,
      pronunciation: "mee KAH-sah ehs soo KAH-sah",
      example: "Mi casa es su casa, siempre eres bienvenido.",
      generatedFrom: "casa",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // POLITE VARIATIONS
  "gracias": [
    {
      id: "muchas-gracias",
      spanish: "Muchas gracias",
      english: "Thank you very much",
      category: "restaurant",
      difficulty: 2,
      pronunciation: "MOO-chahs GRAH-see-ahs",
      example: "Muchas gracias por tu ayuda.",
      generatedFrom: "gracias",
      variationType: "related",
      level: "intermediate"
    }
  ],

  // TIME-BASED
  "buenas-noches": [
    {
      id: "buena-noche",
      spanish: "Buena noche",
      english: "Good night",
      category: "greetings",
      difficulty: 2,
      pronunciation: "BWEH-nah NOH-cheh",
      example: "Buena noche, hasta mañana.",
      generatedFrom: "buenas-noches",
      variationType: "number",
      level: "intermediate"
    }
  ]
};

/**
 * Generate word variations for a given term
 */
export const generateVariationsForTerm = (
  baseTerm: LessonTerm
): GeneratedVariation[] => {
  return VARIATION_RULES[baseTerm.id] ?? [];
};

/**
 * Generate all variations from a set of base terms
 */
export const generateAllVariations = (
  baseTerms: LessonTerm[]
): GeneratedVariation[] => {
  const allVariations: GeneratedVariation[] = [];

  baseTerms.forEach((term) => {
    const variations = generateVariationsForTerm(term);
    allVariations.push(...variations);
  });

  return allVariations;
};

/**
 * Get unique vocabulary by eliminating duplicates and ensuring variety
 */
export const deduplicateVocabulary = (
  terms: Array<LessonTerm | GeneratedVariation>
): Array<LessonTerm | GeneratedVariation> => {
  const seen = new Set<string>();
  return terms.filter((term) => {
    if (seen.has(term.id)) return false;
    seen.add(term.id);
    return true;
  });
};

/**
 * Count how many unique words exist per category
 */
export const countByCategory = (
  terms: Array<LessonTerm | GeneratedVariation>
): Record<string, number> => {
  const counts: Record<string, number> = {};
  terms.forEach((term) => {
    counts[term.category] = (counts[term.category] ?? 0) + 1;
  });
  return counts;
};

/**
 * Get statistics about vocabulary expansion
 */
export const getExpansionStats = (
  baseTerms: LessonTerm[],
  generatedTerms: GeneratedVariation[]
) => {
  const baseCounts = countByCategory(baseTerms);
  const generatedCounts = countByCategory(generatedTerms);
  const combined = [...baseTerms, ...generatedTerms];
  const combinedCounts = countByCategory(combined);

  return {
    baseTotal: baseTerms.length,
    generatedTotal: generatedTerms.length,
    combinedTotal: deduplicateVocabulary(combined).length,
    baseByCategory: baseCounts,
    generatedByCategory: generatedCounts,
    combinedByCategory: combinedCounts
  };
};
