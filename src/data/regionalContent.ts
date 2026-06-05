/**
 * Regional Content Database
 *
 * Unlockable educational content about Catalonia, nearby cities, and practical guides
 * Content is discovered and unlocked as players progress through daily scenarios
 */

export interface ContentSection {
  heading: string;
  content: string;
}

export interface RegionalContent {
  id: string;
  title: string;
  category: "history" | "travel" | "survival" | "culture";
  sections: ContentSection[];
  unlockedAfterScenario?: number; // Day number when this unlocks
  profitableFor?: ("child" | "adult")[];
}

export const REGIONAL_CONTENT: RegionalContent[] = [
  // ===== CALELLA LOCAL CONTENT =====
  {
    id: "calella-history",
    title: "Calella: Gateway to Costa Maresme",
    category: "history",
    sections: [
      {
        heading: "Mediaeval Beginnings",
        content:
          "Calella originated as a small fishing village in the Medieval period, strategically located on the Costa Maresme coast. The town developed around a port where fishermen brought in daily catches of Mediterranean fish."
      },
      {
        heading: "Industrial Era & Tourism Boom",
        content:
          "In the 1960s, Calella transformed from a quiet fishing community into a thriving beach resort. Hotels sprang up along the coast, attracting tourists from across Europe. Today it balances tourism with its fishing heritage."
      },
      {
        heading: "Geography & Climate",
        content:
          "Calella sits 40 km north of Barcelona on the Costa Maresme, blessed with a Mediterranean climate. Summers are hot and dry (25-28°C), winters mild (8-12°C). The town nestles between mountains and sea, creating a scenic backdrop."
      },
      {
        heading: "Culture & Traditions",
        content:
          "Catalan is co-official with Spanish in the region. Locals value family, tradition, and celebration. The annual Festa Major (August festival) is a major event with parades, music, fireworks, and special foods."
      },
      {
        heading: "Local Landmarks",
        content:
          "Visit Calella's beautiful beaches, the lighthouse (far end of promenade), local churches, and the seafront paseo. The harbor area showcases fishing boats and seafood restaurants where you can watch the sunset."
      }
    ],
    unlockedAfterScenario: 1,
    profitableFor: ["child", "adult"]
  },
  {
    id: "calella-neighborhoods",
    title: "Neighborhoods & Where to Live in Calella",
    category: "travel",
    sections: [
      {
        heading: "Platja Nord (North Beach)",
        content:
          "The main tourist area with beach access, hotels, and restaurants. Lively, convenient, but crowded in summer. Good for families wanting beach proximity. Rents: €600-900/month for 1-bed apartment."
      },
      {
        heading: "Platja Sud (South Beach)",
        content:
          "Quieter southern section with smaller beach and more residential feel. Fewer tourists, closer to hiking trails. Good for those seeking calm. Rents: €500-750/month."
      },
      {
        heading: "Old Town Center",
        content:
          "Historic medieval core with narrow streets, local shops, and authentic charm. Far from beach but rich in history and local culture. Apartments are often smaller but characterful. Rents: €550-800/month."
      },
      {
        heading: "Outskirts & Surrounding Villages",
        content:
          "Towns like Vilassar de Mar, Ariany, or Dosrius are 5-10 km away. More affordable, quieter, more family-oriented. Great if you want Spanish village life without touristy vibes. Rents: €400-600/month."
      },
      {
        heading: "Rental Tips",
        content:
          "Use Idealista.com, Fotocasa.es, or local real estate agencies. Most rentals require references, proof of income, and a deposit (usually 2 months). Utilities run €80-150/month. Negotiate directly with owners for better rates."
      }
    ],
    unlockedAfterScenario: 2,
    profitableFor: ["adult"]
  },
  {
    id: "calella-food-guide",
    title: "Eating Like a Local: Calella Market & Food",
    category: "survival",
    sections: [
      {
        heading: "The Local Market (Mercat)",
        content:
          "Calella's market operates several times per week in the town center. Fresh fish from the harbor, seasonal vegetables, local cheeses, and cured meats. Vendors expect you to haggle a bit. Arrive early for best selection."
      },
      {
        heading: "Key Catalan Dishes",
        content:
          "PA AMB TOMÀQUET: Bread rubbed with tomato and olive oil (simple, delicious). ESCALIVADA: Roasted vegetables with olive oil. SUQUET DE PEIX: Rich fish stew with seafood. BOTIFARRA: Catalan sausage. CALCOTS: Roasted spring onions (seasonal, special)."
      },
      {
        heading: "Seafood Specialties",
        content:
          "The Mediterranean provides abundant fish: BACALAO (cod), DORADA (sea bream), SARDINAS (sardines), CAMARONES (shrimp), PULPO (octopus). Most restaurants serve grilled fish with olive oil, garlic, and lemon."
      },
      {
        heading: "Restaurant Customs",
        content:
          "Lunch (14:00-16:00) is the main meal. Menu del día (set lunch) is €10-15 and includes first course, main, dessert, and drink. Dinner (21:00-23:00) is lighter. Tips are appreciated but not mandatory (round up 5-10%)."
      },
      {
        heading: "Budget Eating",
        content:
          "Menú del día at local restaurants: €10-15. Market produce: 30-50% cheaper than supermarkets. Bakery bread: €0.80-2 per loaf. Coffee & pastry breakfast: €3-5. Street food (empanadas, croquetas): €2-4."
      }
    ],
    unlockedAfterScenario: 3,
    profitableFor: ["child", "adult"]
  },
  {
    id: "calella-beaches",
    title: "Beaches & Beach Culture in Calella",
    category: "travel",
    sections: [
      {
        heading: "Main Beach (Platja de Calella)",
        content:
          "Wide sandy beach with calm waters (protected by harbor). Lifeguards in summer. Popular with families. Sunbeds & umbrellas available for rent (€7-10/day). Good for swimming, paddling, building sandcastles."
      },
      {
        heading: "Beach Etiquette",
        content:
          "Remove shoes before entering. Topless sunbathing is common for women. Swimwear only on beach (change at lifeguard stations). Keep valuables secure (use locker or buddy system). Respect quiet hours (especially in residential areas)."
      },
      {
        heading: "Water Sports & Activities",
        content:
          "Paddleboards, kayaks, and jet skis available for rent. Swimming is safe in summer. Beware of strong currents in spring/fall. Scuba diving and snorkeling are popular. Local schools offer lessons."
      },
      {
        heading: "Beach Amenities",
        content:
          "Bathrooms with showers (€0.50-1). Bars & cafés along the beach. Ice cream vendors. Rental shops. Lifeguard stations (summer only). Parking available but fills quickly in July/August."
      },
      {
        heading: "Best Times to Visit",
        content:
          "May-June and September are ideal: warm (22-25°C), fewer tourists, water swimmable. July-August: hot (28°C+), very crowded, more expensive. Winter: quiet but cold (water 13°C), fewer amenities open."
      }
    ],
    unlockedAfterScenario: 4,
    profitableFor: ["child", "adult"]
  },
  {
    id: "catalan-cuisine",
    title: "Catalan Culinary Traditions",
    category: "culture",
    sections: [
      {
        heading: "The Catalan Philosophy of Food",
        content:
          "Catalan cuisine emphasizes fresh, local ingredients and simple preparation. It blends Mediterranean traditions (olive oil, garlic, seafood) with mountain ingredients (mushrooms, game). Meals are social events meant to be savored slowly."
      },
      {
        heading: "Regional Dishes You Must Try",
        content:
          "ESQUEIXADA: Shredded salted cod. XATÓ: Escarole salad with anchovy sauce. FIDEUÀ: Like paella but made with noodles instead of rice. ARRÒS A BANDA: Rice cooked in fish broth. CALCOTS (winter): Grilled spring onions with romesco sauce."
      },
      {
        heading: "Sauces & Condiments",
        content:
          "ROMESCO: Red pepper, tomato, and almond sauce (essential!). ALLIOLI: Garlic and olive oil emulsion. SALSA VERDE: Parsley and olive oil. These accompany grilled meats, seafood, and vegetables."
      },
      {
        heading: "Catalan Wines & Drinks",
        content:
          "PENEDÈS wines from inland are excellent reds and whites. CAVA (sparkling wine) comes from the Penedès region. HORCHATA: Sweet drink from tiger nuts (summer specialty). VERMOUTH: Pre-dinner aperitif culture."
      },
      {
        heading: "Dining Hours & Customs",
        content:
          "Breakfast (7-9am): Coffee & pastry. Lunch (1-3pm): Main meal, 2-3 courses. Merienda (5pm): Snack or light meal. Dinner (9-11pm): Lighter meal. Take time to enjoy—rushing is considered rude!"
      }
    ],
    unlockedAfterScenario: 5,
    profitableFor: ["adult"]
  },

  // ===== NEARBY CITIES =====
  {
    id: "barcelona-guide",
    title: "Day Trip: Barcelona (45 minutes by train)",
    category: "travel",
    sections: [
      {
        heading: "Getting There",
        content:
          "Train: Rodalies R2 line from Calella to Barcelona Sants or Plaça de Catalunya. Journey time 45-60 min. Cost: €3-5 depending on zones. Departs every 15-30 min. Buy tickets at station or via TMB app."
      },
      {
        heading: "Must-See Attractions",
        content:
          "SAGRADA FAMILIA: Gaudí's unfinished basilica (book online ahead). PARK GÜELL: Colorful mosaic park with city views. GOTHIC QUARTER: Medieval streets, cathedral, history. LA RAMBLA: Famous tree-lined avenue (watch for pickpockets). MONTJUÏC: Viewpoint, museums, gardens."
      },
      {
        heading: "Museums & Culture",
        content:
          "Museu Picasso, Fundació Joan Miró, MNAC (art museum). Book tickets online to skip lines. Many offer discounts to EU residents and students. Most open 10am-7pm, closed Mondays."
      },
      {
        heading: "Food & Dining",
        content:
          "Try pintxos (Spanish tapas) in the Gothic Quarter. Market hall LA BOQUERIA is famous but touristy—go early. Vermouth culture is huge (aperitif with olives/anchovies). Menu del día lunch specials: €10-15."
      },
      {
        heading: "Practical Tips",
        content:
          "Watch belongings on metro and in crowds (pickpockets). Street performers might demand payment for photos. Sunday: museums open 10am-3pm only. March-October: extremely crowded. English widely spoken in tourist areas."
      }
    ],
    unlockedAfterScenario: 6,
    profitableFor: ["child", "adult"]
  },
  {
    id: "barcelona-culture",
    title: "Barcelona's Art, Architecture & History",
    category: "culture",
    sections: [
      {
        heading: "Modernist Movement (1890s-1910s)",
        content:
          "Barcelona was epicenter of Catalan Modernism. Architects like Gaudí, Domènech i Montaner, and Puig i Cadafalch created whimsical, nature-inspired buildings. This style defines Barcelona's identity."
      },
      {
        heading: "Gaudí: Genius & Vision",
        content:
          "Antoni Gaudí (1852-1926) created unique organic architecture inspired by nature. His works blend functionality with artistry. Sagrada Familia combines religious symbolism with mathematical harmony. Casa Batlló and Casa Milà are residential masterpieces."
      },
      {
        heading: "Gothic Quarter & Medieval History",
        content:
          "Barcelona's old town dates to Roman times (Barcino). The 13th-century Gothic Quarter grew around the Cathedral. Narrow winding streets, hidden plazas, historic palaces tell stories of kingdoms, wars, and trade."
      },
      {
        heading: "Civil War & Modern Era",
        content:
          "Spanish Civil War (1936-1939) devastated Catalonia. Franco's dictatorship suppressed Catalan language and culture (1939-1975). After democracy returned, Barcelona re-emerged as a vibrant cultural capital. 1992 Olympics modernized the city."
      },
      {
        heading: "Contemporary Scene",
        content:
          "Barcelona is a global city: design, technology, music, art thrive here. It's a 24-hour culture—nightlife, museums, food scene are world-class. But it's also struggling with overtourism and rising costs."
      }
    ],
    unlockedAfterScenario: 7,
    profitableFor: ["adult"]
  },
  {
    id: "barcelona-shopping",
    title: "Shopping in Barcelona: Where to Find Everything",
    category: "survival",
    sections: [
      {
        heading: "Main Shopping Districts",
        content:
          "PASSEIG DE GRÀCIA: High-end fashion (Zara, H&M, luxury brands). CARRER PORTAFERRISSA: Gothic Quarter boutiques & vintage. EL CORTE INGLÉS: Department store with everything. MAREMAGNUM: Waterfront mall with international brands."
      },
      {
        heading: "Markets & Local Shopping",
        content:
          "LA BOQUERIA: Famous food market (crowded, pricey). MERCAT DE SANT JOSEP: Fresh produce & local foods. STREET MARKETS: Plaça Reial (art & books), Port Vell (souvenirs). Antique shops in Gothic Quarter."
      },
      {
        heading: "Catalan & Spanish Brands Worth Buying",
        content:
          "Desigual (colorful fashion), Camper (quality shoes), Loewe (leather), Mango (affordable fashion). Local artisans in Gothic Quarter sell ceramics, jewelry, textiles. Quality is high, but prices can be steep."
      },
      {
        heading: "Souvenirs & Local Goods",
        content:
          "Cava (sparkling wine), Vermouth, Local sweets (turró/nougat), Ceramics, Textiles with Catalan designs, Modernist art posters, Books about Gaudí & architecture."
      },
      {
        heading: "Shopping Tips & Hours",
        content:
          "Shops open 10am-2pm, 4pm-8pm (siesta 2-4pm). Sunday: Most shops closed. Negotiate in small boutiques. VAT refund available for non-EU residents on purchases >€90 (ask for 'tax refund form'). Credit cards widely accepted."
      }
    ],
    unlockedAfterScenario: 8,
    profitableFor: ["adult"]
  },
  {
    id: "girona-guide",
    title: "Medieval Gem: Girona (50 minutes from Calella)",
    category: "travel",
    sections: [
      {
        heading: "Reaching Girona",
        content:
          "Train from Calella: 45-60 minutes on regional lines. Price: €5-7. Girona is on the Barcelona-France rail corridor. Buses available but slower. The medieval town is compact and walkable from station."
      },
      {
        heading: "Must-See Medieval Sites",
        content:
          "CATHEDRAL: Massive Gothic structure with widest nave in Christendom. JEWISH QUARTER: Ancient synagogues and museums. ARAB BATHS: 12th-century hammam, beautifully preserved. CITY WALLS: Walk the 1.5 km circuit for views. RIVER WALK: Paseo along Onyar River with colorful buildings."
      },
      {
        heading: "Food & Dining",
        content:
          "Girona punches above its weight gastronomically. El Celler de Can Roca (3-Michelin stars!) is world-famous but book months ahead. More accessible: try local restaurants for 'escalivada' and fresh fish. Vermouth bars everywhere."
      },
      {
        heading: "Local Culture & History",
        content:
          "Girona was crucial medieval city on routes to France. It suffered wars, plagues, sieges. After Spanish Civil War, it was rebuilt. Today it's bohemian and artistic: galleries, street art, young university crowd."
      },
      {
        heading: "Day-Trip Itinerary",
        content:
          "8:15am arrive, explore Cathedral & Jewish Quarter (1 hr), walk city walls (1.5 hrs), lunch at traditional restaurant (1.5 hrs), browse galleries & shops (1 hr), 6pm return train. Overnight options if you want to linger."
      }
    ],
    unlockedAfterScenario: 9,
    profitableFor: ["adult"]
  },
  {
    id: "montserrat-history",
    title: "Montserrat: Monastery, Mountains & Miracles",
    category: "culture",
    sections: [
      {
        heading: "The Sacred Mountain",
        content:
          "Montserrat ('jagged mountain') rises 700m above the plain, 50 km northwest of Barcelona. Its dramatic rock formations have inspired pilgrims for centuries. The monastery was founded in the 9th century by Benedictine monks seeking spiritual isolation."
      },
      {
        heading: "The Monastery & Black Madonna",
        content:
          "The Benedictine monastery sits nestled in the rocks. Its treasure: La Moreneta (Black Madonna), a 12th-century wooden statue venerated as miraculous. Pilgrims come to touch the Madonna's hand and ask for blessings."
      },
      {
        heading: "Spirituality & Architecture",
        content:
          "The basilica blends Romanesque and modern (rebuilt after Spanish Civil War). Beautiful silence & stone. Monks still live here, maintaining traditions of prayer, work, and scholarship. The Gregorian choir sings daily (12:30pm)."
      },
      {
        heading: "Hiking & Nature",
        content:
          "Dozens of trails crisscross the mountains. Easy walks (30 min) to difficult hikes (3+ hours). Path to Ermita (hermitage chapel): moderate, 1.5 hours round-trip, stunning views. Cable car option for those with limited mobility."
      },
      {
        heading: "Visiting Montserrat",
        content:
          "Train from Calella: 45 min to Montserrat-Aeri station, then cable car to monastery. Or bus+funicular. Visitor center, gift shop, restaurant. Admission free, donations appreciated. Best visited early morning (fewer tourists), pack water & sunscreen."
      }
    ],
    unlockedAfterScenario: 10,
    profitableFor: ["child", "adult"]
  },
  {
    id: "costa-brava-beaches",
    title: "Costa Brava Beaches: Tossa de Mar & Beyond",
    category: "travel",
    sections: [
      {
        heading: "Tossa de Mar Overview",
        content:
          "Tossa is 30 km north of Calella on the wild coast. More dramatic cliffs and smaller, rockier beaches than Calella. Medieval castle ruins overlook the harbor. It's a perfect day-trip destination with unique character."
      },
      {
        heading: "Beaches Around Tossa",
        content:
          "TOSSA PLATJA: Main beach, family-friendly, sandy. MAR MENUDA: Smaller cove, rockier, more sheltered. BRAVA BEACH: South of town, dramatic cliffs, Atlantic-like waves. FUERTE BEACH: Small, scenic, perfect for snorkeling."
      },
      {
        heading: "Snorkeling & Diving",
        content:
          "Costa Brava is Mediterranean diving capital. Crystal-clear water, colorful fish, underwater caves, old shipwrecks. Several dive schools offer certification courses. Snorkeling possible from shore with good visibility (5-8 meters)."
      },
      {
        heading: "Coastal Walks & Hiking",
        content:
          "Camí de Ronda: Coastal path connecting beaches. Total 23 km from Tossa north to Llafranc (network continues). Sections vary from easy to strenuous. Spectacular views, hidden coves, perfect half-day or full-day walks."
      },
      {
        heading: "Tossa Practicalities",
        content:
          "Bus from Calella: 30-45 min, €2-3. Car: 25 min via C-32. Parking: challenging in summer, €3-5/hr. Restaurants, bars, ice cream shops aplenty. Tourist info center at harbor. Quieter than Calella but still touristic in summer."
      }
    ],
    unlockedAfterScenario: 11,
    profitableFor: ["child", "adult"]
  },
  {
    id: "costa-brava-history",
    title: "Costa Brava History: Pirates, Castles & Kingdoms",
    category: "history",
    sections: [
      {
        heading: "Medieval Coast: Fortified Towns",
        content:
          "Tossa de Mar was a fortified trading post in the 12th century. Castle ruins (11th-13th centuries) protected merchants and fishermen. Medieval townspeople lived in stone houses huddled within defensive walls."
      },
      {
        heading: "Pirates & Invasions",
        content:
          "Barbary pirates from North Africa raided coastal towns for centuries (1500s-1700s). They sought treasure, slaves, and ransom. Towns built towers and strengthened walls. Tossa's castle was designed specifically against sea raids."
      },
      {
        heading: "Civil War & Modern Era",
        content:
          "Spanish Civil War devastated the coast (1936-39). Towns were shelled and rebuilt. Franco era saw tourism development (1960s+), transforming fishing villages into beach resorts. This brought wealth but also cultural dilution."
      },
      {
        heading: "The Name 'Costa Brava'",
        content:
          "'Brava' means 'wild' or 'fierce'—the rugged rocky coastline (unlike sandy Costa Dorada to south). The name marketing campaign began 1950s-60s. It became Spain's first major beach destination brand."
      },
      {
        heading: "Environmental Challenges",
        content:
          "1960s-2000s: Excessive construction, overfishing, pollution. Today: Protected marine areas (Montgrí-Medes), conservation efforts, sustainable tourism initiatives. Locals balance economic needs with environmental preservation."
      }
    ],
    unlockedAfterScenario: 12,
    profitableFor: ["adult"]
  },
  {
    id: "tarragona-guide",
    title: "Roman Tarragona: Ancient Glory (1 hour south)",
    category: "travel",
    sections: [
      {
        heading: "The Roman Connection",
        content:
          "Tarragona (ancient Tarraco) was founded by Romans 218 BC. It served as capital of Hispania Tarraconensis (largest Roman province in Iberia). Archaeological sites show Roman temples, amphitheaters, walls, and mosaics throughout the city."
      },
      {
        heading: "Key Roman Sites",
        content:
          "NATIONAL ARCHAEOLOGICAL MUSEUM: World-class collection of mosaics, sculptures, coins. AMPHITHEATER: Overlooks sea, still intact. ROMAN WALLS: Walk sections of 2000-year-old defensive walls. PRAETORIUM TOWER: Ancient fortress, great views."
      },
      {
        heading: "Medieval & Modern Tarragona",
        content:
          "After Roman decline, Tarragona became important religious center (Gothic cathedral, monasteries). It fell into decline under Franco but has revived as cultural city. Today balances archaeology with modern port city life."
      },
      {
        heading: "Food: Seafood Speciality",
        content:
          "Tarragona = seafood capital. Eat 'suquet de peix' (fish stew), grilled fish, 'romesco' sauce (originated here). Paella rice dishes are excellent. Waterfront restaurants with sea views. Menu del día: €12-18."
      },
      {
        heading: "Visiting Tarragona",
        content:
          "Train from Calella: 50-70 min. Price: €6-9. City is compact, walkable. Climb cathedral tower for views. Spend 4-5 hours minimum. Can combine with nearby Sitges beach town (15 min train) for full day."
      }
    ],
    unlockedAfterScenario: 13,
    profitableFor: ["adult"]
  },

  // ===== PRACTICAL LIFE CONTENT =====
  {
    id: "spain-banking-system",
    title: "Spanish Banking System: How to Open an Account",
    category: "survival",
    sections: [
      {
        heading: "Required Documents",
        content:
          "Passport or ID. Proof of address (rental contract, utility bill, or letter from employer). Proof of income (job contract, income statement). For non-EU: NIE (Spanish tax ID) required. Some banks want references."
      },
      {
        heading: "Types of Accounts",
        content:
          "CUENTA CORRIENTE: Current/checking account for daily use. CUENTA DE AHORROS: Savings account. Most packages bundle debit card, online banking, mobile app. Fees vary: €0-15/month."
      },
      {
        heading: "Major Banks & Online Options",
        content:
          "BBVA, CaixaBank, Santander: Biggest, many branches. ING: Popular, online-friendly. Revolut, Wise: Digital banks, low fees. CECA or local Caixa: Cooperative banks, friendly service. Compare fees online before committing."
      },
      {
        heading: "Costs & Fees",
        content:
          "Monthly account fee: €0-15. Debit card: Usually free with account. International transfers: €5-20 (plus exchange rates). ATM withdrawals: Free at own bank, small fee elsewhere. Overdraft fees: €30-40."
      },
      {
        heading: "Special: Non-EU Residents",
        content:
          "Non-EU citizens typically need NIE (tax ID) first. Process: Apply at Regional Police Station (Comisaría). Takes 1-2 weeks. Requires passport, employment contract, rental agreement. Some immigration lawyers can expedite for €200-400."
      }
    ],
    unlockedAfterScenario: 16,
    profitableFor: ["adult"]
  },
  {
    id: "spain-healthcare",
    title: "Healthcare in Spain: Medical Appointments & Services",
    category: "survival",
    sections: [
      {
        heading: "Public vs. Private Healthcare",
        content:
          "SPANISH PUBLIC SYSTEM (SNS): Free/low-cost for residents. Register at local health center (centro de salud). Waits can be long (weeks). PRIVATE INSURANCE: Fast access, modern clinics, €100-300/month. International companies offer expat plans."
      },
      {
        heading: "Registering with a Doctor",
        content:
          "Visit your local 'centro de salud' with ID/NIE and proof of residence. They'll assign you a family doctor (médico de cabecera). Call or visit to book appointments. Most doctors speak English, but bringing translator helpful."
      },
      {
        heading: "Making an Appointment",
        content:
          "Call your health center directly or use SNS app (MiSalud) to book online. Emergency appointments available same day. Tell receptionist symptoms (have key words: 'dolor' (pain), 'fiebre' (fever), 'vómitos' (vomiting), 'alergia' (allergy))."
      },
      {
        heading: "Prescriptions & Pharmacies",
        content:
          "Doctor writes prescription (receta médica). Take to pharmacy (farmacia—green cross sign). Pharmacists can advise on common ailments. Many medications cheaper than US. Health insurance usually covers 50-80% of drug costs."
      },
      {
        heading: "Emergency Services",
        content:
          "Emergencies: Dial 112 (ambulance, police, fire). Nearest hospital emergency room (urgencias) for non-ambulance issues. Have insurance card ready. Non-EU citizens may be charged unless reciprocal healthcare agreement with your country."
      }
    ],
    unlockedAfterScenario: 17,
    profitableFor: ["adult"]
  },
  {
    id: "spanish-fashion",
    title: "Spanish Fashion & Shopping Culture",
    category: "culture",
    sections: [
      {
        heading: "Spanish Fashion Aesthetic",
        content:
          "Spanish style is sophisticated yet relaxed: well-fitted basics, quality fabrics, classic colors with occasional boldness. Less overtly trendy than some European countries. Investment pieces valued over fast fashion (though that's changing)."
      },
      {
        heading: "Famous Spanish Brands",
        content:
          "Desigual (colorful, creative), Mango (sophisticated casual), Bimba y Lola (contemporary), Custo Barcelona (artistic prints), Palomo Spain (avant-garde). Zara (fast fashion giant, Spanish-owned) dominates retail."
      },
      {
        heading: "Local Artisans & Vintage",
        content:
          "Gothic Quarter Barcelona: Vintage boutiques, handmade jewelry, indie designers. Market stalls in coastal towns: Local textiles, leather goods, art. Support small makers for unique, ethical purchases."
      },
      {
        heading: "Seasonal Shopping",
        content:
          "SUMMER (June-July): Light fabrics, sandals, sun protection. WINTER (Dec-Jan): Warm layers, coats, boots. SALES: January/February (rebajas), July/August (big discounts). Designer outlets near Barcelona and elsewhere."
      },
      {
        heading: "Fashion Culture",
        content:
          "Spanish people dress more formally for public outings than Americans. Jeans with nice top/jacket more common than athletic wear in town. Beach/casual dress acceptable at coast. Swimming attire on streets looks odd (change at beach)."
      }
    ],
    unlockedAfterScenario: 18,
    profitableFor: ["adult"]
  },

  // ===== CULTURAL CONTENT =====
  {
    id: "catalonia-history",
    title: "Catalonia's Complex & Contested History",
    category: "history",
    sections: [
      {
        heading: "Medieval Kingdom & Golden Age",
        content:
          "Catalonia was powerful medieval kingdom (12th-15th centuries) with strong ties to Aragon. Mediterranean trade empire: merchants, sailors, artists. But union with Castile (1479) began decline of Catalan power and autonomy."
      },
      {
        heading: "Spanish Succession War & Repression",
        content:
          "War of Spanish Succession (1701-1714): Catalonia backed losing side. Defeat meant loss of self-government. Felipe V abolished Catalan rights: laws, language, institutions suppressed. This shaped 300 years of resentment."
      },
      {
        heading: "Modernist Renaissance (1890s-1930s)",
        content:
          "19th-century industrial boom sparked cultural revival. Catalan language, art, architecture flourished (Gaudí, Miró, etc.). Political movements for autonomy and independence gained strength. Hope for self-determination emerged."
      },
      {
        heading: "Spanish Civil War Devastation (1936-39)",
        content:
          "Catalonia backed Republic against Franco's fascism. Loss was catastrophic. Franco's dictatorship (1939-1975) brutally suppressed Catalan language, culture, nationalism. Franco's regime still controversial and recent."
      },
      {
        heading: "Modern Independence Movement (2017-Present)",
        content:
          "After democracy returned (1975), Catalonia gained limited autonomy. But tensions over independence grew. Oct 1, 2017: Illegal independence referendum; Spanish police violence. Political crisis ongoing. Some locals still fiercely pro-independence, others pro-Spain."
      }
    ],
    unlockedAfterScenario: 26,
    profitableFor: ["adult"]
  },
  {
    id: "catalan-festivals",
    title: "Catalan Festivals: Celebrations & Traditions",
    category: "culture",
    sections: [
      {
        heading: "Festa Major (August Festival)",
        content:
          "Annual celebration in each town (Calella's is mid-August). Parades, live music, dancing, fireworks, special foods. 'Giants' (giant cardboard figures) parade. Family activities, street food, cultural performances. Streets decorated elaborately. Lasts 5-7 days."
      },
      {
        heading: "Carnival (February/March)",
        content:
          "Pre-Lent celebration. Elaborate costumes, parades, street parties. Less well-known than Spanish Carnival but growing. Music, dancing, humor, tradition. Different celebrations in different towns (Barcelona vs. small villages)."
      },
      {
        heading: "Semana Santa (Easter)",
        content:
          "Holy Week processions, religious ceremonies. Less theatrical than Spain's interior but still significant. Church services, traditional foods, solemn processions. Family gatherings around Easter meals."
      },
      {
        heading: "Sant Joan (June 23-24)",
        content:
          "Summer solstice celebration. Bonfires on beaches, jumping over flames (tradition = good luck). Singing, eating coca de recapte (savory pastry), drinking cava. Pagan roots mixed with Christianity. Young people's favorite."
      },
      {
        heading: "Other Notable Days",
        content:
          "Diada (Sept 11): Catalan independence day, political marches. Christmas (Dec): Markets, Nativity scenes, special foods. Reis (Jan 6): King's Day, parades with candy tossing, special cake (roscón). Town patronage days: Local saints celebrated with concerts, food fairs."
      }
    ],
    unlockedAfterScenario: 27,
    profitableFor: ["child", "adult"]
  },
  {
    id: "catalan-language",
    title: "Catalan Language: History, Status & Learning",
    category: "culture",
    sections: [
      {
        heading: "Catalan vs. Spanish",
        content:
          "Catalan is official co-language with Spanish in Catalonia. It's Romance language (like Spanish), but distinct: different pronunciation, grammar, vocabulary. Native speakers: ~7 million (Catalonia + Valencia + Balearic Islands + France)."
      },
      {
        heading: "Political & Cultural Significance",
        content:
          "Catalan identity tied to language. Franco banned it from public use (1939-75), creating fierce determination to preserve it. Today: Spoken in homes, schools, media. Some older locals prefer Spanish; younger ones increasingly use Catalan. Code-switching common."
      },
      {
        heading: "Language Revival & Education",
        content:
          "Post-Franco: Catalan integrated into schools (immersion). Signs, media, government now bilingual. TV3 broadcasts in Catalan. Books, newspapers, music in Catalan widely available. It's not marginalized—it's thriving."
      },
      {
        heading: "Learning Catalan",
        content:
          "Polyglots speak Spanish + Catalan + English. Many English speakers find Catalan similar to Spanish but with twists. Learning resources: Duolingo (limited), books, YouTube, local classes. Most locals appreciate foreigners trying; English + Spanish works fine."
      },
      {
        heading: "Common Catalan Phrases",
        content:
          "'Hola' (hello), 'Merci' (thanks), 'Si us plau' (please), 'Adéu' (goodbye), 'Com estàs?' (how are you), 'No parla català' (I don't speak Catalan), 'Parla anglès?' (do you speak English?). Key words: 'plaça' (square), 'carrer' (street), 'playa/platja' (beach)."
      }
    ],
    unlockedAfterScenario: 28,
    profitableFor: ["adult"]
  },
  {
    id: "catalan-architecture",
    title: "Catalan Modernism: Gaudí & Architectural Genius",
    category: "culture",
    sections: [
      {
        heading: "The Modernist Movement",
        content:
          "Catalan Modernism (1890-1920) was architectural revolution. Rejection of classical rules. Organic forms inspired by nature, elaborate decoration, innovative materials. It was Spain's answer to Art Nouveau but with Catalan flavor."
      },
      {
        heading: "Antoni Gaudí: Master Architect",
        content:
          "Gaudí (1852-1926) was genius. His works blend function with art. He used nature as inspiration: trees, flowers, shells. Parabolic arches, mosaic tiles, wrought iron. Each building is unique; none are straight lines. Living relationship with his buildings: still evolving, surprising."
      },
      {
        heading: "Iconic Gaudí Buildings",
        content:
          "SAGRADA FAMILIA: Unfinished basilica, under construction 140+ years (ongoing). CASA BATLLÓ: Residential building, wavy facade, mosaic dragon. CASA MILÀ (La Pedrera): Apartment block, undulating stone waves. PARK GÜELL: Public garden, colorful mosaic terraces, whimsical. All in Barcelona, UNESCO sites."
      },
      {
        heading: "Other Modernist Masters",
        content:
          "Lluís Domènech i Montaner: Palau de la Música Catalana (concert hall, ornate). Josep Puig i Cadafalch: Casa Amatller (geometric elegance). These architects created Barcelona's unique visual identity."
      },
      {
        heading: "Visiting Modernist Barcelona",
        content:
          "Walking tour of Passeig de Gràcia: 1.5 km boulevard lined with modernist buildings. Modernist architecture museums. Book Sagrada Familia tickets online to skip 2-hour lines (timed entry recommended). Walking tours available in English."
      }
    ],
    unlockedAfterScenario: 29,
    profitableFor: ["adult"]
  },
  {
    id: "catalan-gastronomy",
    title: "Catalan Gastronomy: Food as Culture & Art",
    category: "culture",
    sections: [
      {
        heading: "Philosophy of Catalan Cooking",
        content:
          "Food is central to Catalan identity. Emphasis on fresh, local ingredients, seasonal cooking, slow preparation, family meals. 'Mar i muntanya' (sea and mountain) blends seafood with inland produce. Every dish has history and tradition."
      },
      {
        heading: "Iconic Catalan Dishes",
        content:
          "ESCALIVADA: Grilled vegetables with olive oil (vegetarian staple). ESQUEIXADA: Shredded salted cod, tomato, olive oil (summer dish). FIDEUÀ: Like paella but with short pasta instead of rice. CREMA CATALANA: Catalan custard dessert (like crème brûlée). CALÇOTS: Spring onions grilled and dipped in romesco sauce (winter/spring special)."
      },
      {
        heading: "Molecular Gastronomy Legacy",
        content:
          "El Celler de Can Roca (Girona): World-famous 3-Michelin restaurant pioneering 'molecular cuisine.' It put Catalan region on culinary map. Inspired by traditional flavors but reimagined with science. Revolutionized Spanish fine dining."
      },
      {
        heading: "Regional Wines & Cava",
        content:
          "Penedès wine region produces excellent reds & whites. CAVA: Sparkling wine (like Champagne). Made in Penedès, cheaper, excellent quality. Vermouth: Popular aperitif (served with tonic, olives, anchovy). Local producers gaining international acclaim."
      },
      {
        heading: "Food Markets & Traditions",
        content:
          "Weekly markets: Fresh produce, cheese, meat, fish. Sunday 'vermut' (vermouth) culture: Pre-lunch aperitif with friends. 'Menu del día': Set lunch (best value for eating well). Dinner culture is light (supper 9-11pm). Long Sunday lunches with family still sacred tradition."
      }
    ],
    unlockedAfterScenario: 30,
    profitableFor: ["adult"]
  }
];

/**
 * Get content by ID
 */
export const getContentById = (id: string): RegionalContent | undefined => {
  return REGIONAL_CONTENT.find((c) => c.id === id);
};

/**
 * Get all content for a specific category
 */
export const getContentByCategory = (
  category: "history" | "travel" | "survival" | "culture"
): RegionalContent[] => {
  return REGIONAL_CONTENT.filter((c) => c.category === category);
};

/**
 * Get content unlocked by a specific scenario day
 */
export const getUnlockedContentForDay = (day: number): RegionalContent[] => {
  return REGIONAL_CONTENT.filter(
    (c) => !c.unlockedAfterScenario || c.unlockedAfterScenario <= day
  );
};

/**
 * Get content suitable for a profile type
 */
export const getContentForProfile = (
  profile: "child" | "adult"
): RegionalContent[] => {
  return REGIONAL_CONTENT.filter(
    (c) => !c.profitableFor || c.profitableFor.includes(profile)
  );
};
