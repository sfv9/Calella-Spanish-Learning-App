/**
 * Calella Restaurants — Real-world dining venues for contextual learning
 *
 * Each restaurant represents a different culinary style and challenge level,
 * with specific vocabulary, ordering scenarios, and cultural context.
 * Sources: Ben & Maura's personal recommendations.
 */

export interface CafellaRestaurant {
  id: string;
  name: string;
  type: "upscale" | "family" | "seafood" | "casual" | "traditional" | "bbq" | "rotisserie" | "pizza" | "beach-club";
  location: "beach" | "town-center" | "local-residential";
  specialties: string[];
  difficulty: "intermediate" | "advanced";
  priceRange: "€" | "€€" | "€€€";
  description: string;
  keyDishes: string[];
  orderingChallenge: string;
}

export const CALELLA_RESTAURANTS: CafellaRestaurant[] = [
  {
    id: "nui",
    name: "NUI",
    type: "upscale",
    location: "beach",
    specialties: ["contemporary", "seafood", "ambiance"],
    difficulty: "advanced",
    priceRange: "€€€",
    description: "Right on the beach with upscale dining and refined menu",
    keyDishes: ["fresh fish", "contemporary preparations", "seasonal vegetables"],
    orderingChallenge: "Understanding complex menu descriptions and making sophisticated requests about cooking methods and substitutions"
  },
  {
    id: "la-riera",
    name: "LA RIERA",
    type: "family",
    location: "town-center",
    specialties: ["family-style", "generous portions", "quality"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Large, welcoming family restaurant with excellent value for quality food",
    keyDishes: ["paella", "arroz", "carne", "pescado"],
    orderingChallenge: "Ordering for groups, discussing portion sizes, and navigating a extensive menu with many regional options"
  },
  {
    id: "la-peixeteria",
    name: "LA PEIXETERIA",
    type: "seafood",
    location: "town-center",
    specialties: ["fresh seafood", "fish", "shellfish"],
    difficulty: "advanced",
    priceRange: "€€€",
    description: "Reputed as the best seafood restaurant in the Calella area",
    keyDishes: ["gambas", "langostinos", "mero", "lubina", "dorada", "pulpo"],
    orderingChallenge: "Learning specific fish and shellfish names, understanding daily specials, and describing preparation preferences to an expert fishmonger"
  },
  {
    id: "padel-calella",
    name: "Restaurant Padel Calella",
    type: "casual",
    location: "beach",
    specialties: ["lunch", "sports adjacent", "beach casual"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Great casual lunch spot right on the beach, popular with locals",
    keyDishes: ["menú del día", "sandwiches", "light fare", "fresh salads"],
    orderingChallenge: "Quick lunch ordering, understanding daily menu offerings, and requesting recommendations for light meals"
  },
  {
    id: "la-torre",
    name: "LA TORRE",
    type: "pizza",
    location: "town-center",
    specialties: ["pizza", "Italian", "wood-fired"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Recognized as serving the best pizza in Calella",
    keyDishes: ["margherita", "quattro formaggi", "carbonara", "pepperoni"],
    orderingChallenge: "Discussing pizza toppings, understanding Italian names for dishes, and customizing orders with local preferences"
  },
  {
    id: "la-llar-de-foc",
    name: "LA LLAR DE FOC",
    type: "bbq",
    location: "local-residential",
    specialties: ["open BBQ", "traditional", "family-owned", "local"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Across the street from Ben & Maura's house—local family friends who cook everything on an open BBQ fire. Intimate and authentic.",
    keyDishes: ["carne a la brasa", "pollo a la brasa", "verduras", "pan tostado"],
    orderingChallenge: "Understanding grilled preparations, discussing meat preferences and doneness levels, and experiencing true local hospitality"
  },
  {
    id: "la-roda",
    name: "LA RODA",
    type: "rotisserie",
    location: "town-center",
    specialties: ["rotisserie chicken", "eclectic", "unique"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Amazing rotisserie place with an eclectic atmosphere—must try! Known for perfectly cooked rotating chickens.",
    keyDishes: ["pollo a la brasa", "medio pollo", "cuarto de pollo", "guarniciones"],
    orderingChallenge: "Ordering rotisserie chicken in portions, understanding sides, and appreciating the simplicity and perfection of the execution"
  },
  {
    id: "la-fusta",
    name: "LA FUSTA",
    type: "traditional",
    location: "town-center",
    specialties: ["traditional", "local cuisine", "classic"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Very traditional restaurant serving classic Catalan and Spanish cuisine with great food",
    keyDishes: ["escalivada", "pà amb tomàquet", "butifarra", "fideuà", "crema"],
    orderingChallenge: "Navigating traditional regional specialties, understanding catalan dish names, and appreciating preparation methods"
  },
  {
    id: "club-nautico",
    name: "CLUB NÁUTICO",
    type: "beach-club",
    location: "beach",
    specialties: ["beach club", "maritime setting", "fresh", "seafood"],
    difficulty: "intermediate",
    priceRange: "€€",
    description: "Beachfront club offering beautiful views and fresh seafood with maritime ambiance",
    keyDishes: ["espaguetis negros", "fideuà", "bacalao", "gambas al ajillo"],
    orderingChallenge: "Ordering in a club setting, understanding beachfront specialties, and navigating the social experience of a beach restaurant"
  },
  {
    id: "la-gavina",
    name: "LA GAVINA",
    type: "seafood",
    location: "beach",
    specialties: ["paella", "seafood", "beach dining"],
    difficulty: "advanced",
    priceRange: "€€€",
    description: "On the beach with views—renowned for having the best paella in Calella. A destination in itself.",
    keyDishes: ["paella de mariscos", "paella negra", "paella de verduras", "langostinos"],
    orderingChallenge: "Discussing paella preferences (size, ingredients, cooking style), ordering for groups, and understanding the cultural significance of paella"
  }
];

export function getRestaurantById(id: string): CafellaRestaurant | undefined {
  return CALELLA_RESTAURANTS.find(r => r.id === id);
}

export function getRestaurantsByDifficulty(difficulty: "intermediate" | "advanced"): CafellaRestaurant[] {
  return CALELLA_RESTAURANTS.filter(r => r.difficulty === difficulty);
}

export function getRestaurantsByType(type: string): CafellaRestaurant[] {
  return CALELLA_RESTAURANTS.filter(r => r.type === type);
}
