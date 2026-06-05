import { LessonTerm } from "../types";

/**
 * Shannon's Advanced Spanish Curriculum
 *
 * For advanced learners (85%+ accuracy) preparing to live in Catalonia
 * Features:
 * - News snippets & current events
 * - Long-form paragraphs with comprehension questions
 * - Local Calella context (neighborhoods, landmarks, culture)
 * - Tongue twisters & wordplay
 * - Spanish humor & jokes
 * - Difficulty 4-5 (advanced-advanced)
 * - Real-world conversation scenarios
 */

export const SHANNON_ADVANCED_CONTENT: LessonTerm[] = [
  // ===== ADVANCED GREETINGS (for any world fallback) =====
  {
    id: "shannon-greet-1",
    spanish: "¿Qué hay de nuevo? No mucho, todo tranquilo por aquí en Calella.",
    english: "What's new? Not much, all quiet around here in Calella.",
    category: "greetings",
    difficulty: 4,
    pronunciation: "keh AY deh NWEH-voh? noh MOO-choh, TOH-doh trahn-KEE-loh por ah-KEE",
    example: "Al encontrarme con el pescador del puerto cada mañana, siempre decimos: ¿Qué hay de nuevo?",
    level: "advanced-spain"
  },
  {
    id: "shannon-greet-2",
    spanish: "Trabalenguas: 'El perro de San Roque no tiene rabo, porque Ramón Ramírez se lo ha cortado.' Prueba decirlo 3 veces rápido.",
    english: "Tongue twister: 'Saint Roque's dog has no tail, because Ramón Ramírez cut it off.' Try saying it 3 times fast.",
    category: "greetings",
    difficulty: 5,
    pronunciation: "ehl PEH-rroh deh sahn ROH-keh noh tee-EH-neh RAH-boh...",
    example: "¿Puedes dominar este trabalenguas antes de llegar a Calella? ¡Impresiona a los locales!",
    level: "advanced-spain"
  },
  {
    id: "shannon-greet-3",
    spanish: "Chiste: Un americano llega a Barcelona y le pregunta al taxista: '¿Habla usted inglés?' El taxista responde: 'Un poco.' El americano dice: '¿Cuánto es un poco?' Y el taxista contesta: '20 euros.'",
    english: "Joke: An American arrives in Barcelona and asks the taxi driver: 'Do you speak English?' The driver: 'A little.' American: 'How much is a little?' Driver: '20 euros.'",
    category: "greetings",
    difficulty: 4,
    pronunciation: "oon ah-meh-ree-KAH-noh YEH-gah ah Bar-theh-LOH-nah...",
    example: "¿Entendiste el chiste? ¿Por qué es gracioso? ¿Qué dice sobre la cultura española?",
    level: "advanced-spain"
  },
  {
    id: "shannon-greet-4",
    spanish: "Noticia local: El ayuntamiento de Calella anuncia nuevas restricciones de aparcamiento en el paseo marítimo durante julio y agosto. Los residentes recibirán tarjetas de aparcamiento especiales. Los turistas deberán usar el parking municipal situado a 500 metros de la playa.",
    english: "Local news: Calella's town hall announces new parking restrictions on the seafront promenade during July and August. Residents will receive special parking cards. Tourists must use the municipal parking lot 500 meters from the beach.",
    category: "greetings",
    difficulty: 5,
    pronunciation: "ehl ah-yoon-tah-mee-EHN-toh deh kah-LEHL-ah ah-NOON-thee-ah...",
    example: "¿Cuáles son las nuevas normas de aparcamiento? ¿Qué diferencia hay entre residentes y turistas?",
    level: "advanced-spain"
  },
  {
    id: "shannon-greet-5",
    spanish: "Expresión catalana útil: 'Ara mateix' significa 'ahora mismo' o 'en este preciso momento'. Los catalanes dicen esto constantemente. Si le preguntas a alguien cuándo llegará, te responderán 'ara mateix' — aunque en realidad tarden veinte minutos más.",
    english: "Useful Catalan expression: 'Ara mateix' means 'right now' or 'at this very moment.' Catalans say this constantly. If you ask someone when they'll arrive, they'll say 'ara mateix' — even if they'll actually take twenty more minutes.",
    category: "greetings",
    difficulty: 4,
    pronunciation: "ah-rah mah-TEHKS — significa 'ahora mismo'",
    example: "¿Cómo usarías 'ara mateix' en una conversación en Calella? ¿Qué precaución debes tener?",
    level: "advanced-spain"
  },

  // ===== FEELINGS (advanced) =====
  {
    id: "shannon-feel-1",
    spanish: "Trabalenguas de sentimientos: 'Si Sansón no sazona su salsa con sal, le sale sosa; le sale sosa su salsa a Sansón si no la sazona con sal.' Pronuncia bien las 's' fuertes del castellano.",
    english: "Feelings tongue twister: 'If Samson doesn't season his sauce with salt, it comes out bland; Samson's sauce comes out bland if he doesn't season it with salt.' Practice the strong Castilian 's' sounds.",
    category: "feelings",
    difficulty: 5,
    pronunciation: "see SAHN-sohn noh sah-OH-nah soo SAHL-sah kohn sahl...",
    example: "¿Cuántas 's' hay en este trabalenguas? ¿Por qué es difícil para anglófonos?",
    level: "advanced-spain"
  },
  {
    id: "shannon-feel-2",
    spanish: "Me siento como en casa en Calella. El ritmo de vida mediterráneo me ha conquistado: las comidas largas, las tardes tranquilas, el paseo nocturno por el puerto. Hay una paz aquí que no encontré en ningún otro lugar.",
    english: "I feel at home in Calella. The Mediterranean rhythm of life has won me over: the long meals, the quiet afternoons, the evening stroll around the harbor. There's a peace here I didn't find anywhere else.",
    category: "feelings",
    difficulty: 4,
    pronunciation: "meh see-EHN-toh KOH-moh ehn KAH-sah ehn kah-LEHL-ah...",
    example: "¿Qué aspectos de la vida en Calella te generarían esa sensación de paz? ¿Qué extrañarías de tu país?",
    level: "advanced-spain"
  },

  // ===== POLITE / SOCIAL =====
  {
    id: "shannon-polite-1",
    spanish: "Formalidad en España: Usa 'usted' con personas mayores, médicos, funcionarios y en contextos formales. Con amigos y gente de tu edad, usa 'tú'. En Cataluña, si alguien te habla en catalán, responder en español es perfectamente aceptable — ellos lo entenderán sin problema.",
    english: "Formality in Spain: Use 'usted' with elderly people, doctors, officials and in formal contexts. With friends and peers, use 'tú'. In Catalonia, if someone speaks to you in Catalan, responding in Spanish is perfectly acceptable — they will understand without problem.",
    category: "polite",
    difficulty: 4,
    pronunciation: "for-mah-lee-DAHD ehn ehs-PAH-nyah: OO-sah 'oos-TEHD'...",
    example: "¿Cuándo usarías 'usted' vs 'tú' en Calella? Da dos ejemplos de cada situación.",
    level: "advanced-spain"
  },
  {
    id: "shannon-polite-2",
    spanish: "Trabalenguas: 'Compadre, cómpreme un coco. Compadre, no compro coco porque el que poco coco come, poco coco compra. Como yo poco coco como, poco coco compro.' ¡Un clásico!",
    english: "Tongue twister: 'Buddy, buy me a coconut. Buddy, I don't buy coconuts because whoever eats little coconut, buys little coconut. Since I eat little coconut, I buy little coconut.' A classic!",
    category: "polite",
    difficulty: 5,
    pronunciation: "kohm-PAH-dreh, KOHM-preh-meh oon KOH-koh...",
    example: "¿Cuántas veces aparece la palabra 'coco'? ¿Puedes decir este trabalenguas en 10 segundos?",
    level: "advanced-spain"
  },

  // ===== RESTAURANT (advanced) =====
  {
    id: "shannon-rest-1",
    spanish: "Noticia gastronómica: El restaurante 'El Port de Calella' ha sido incluido en la Guía Michelin 2024 con una estrella, convirtiéndose en el primer restaurante de Calella en recibir este honor. El chef, oriundo de Girona, usa exclusivamente ingredientes de la Costa Maresme y cocina de temporada.",
    english: "Food news: The restaurant 'El Port de Calella' has been included in the 2024 Michelin Guide with one star, becoming the first restaurant in Calella to receive this honor. The chef, originally from Girona, uses exclusively Costa Maresme ingredients and seasonal cooking.",
    category: "restaurant",
    difficulty: 5,
    pronunciation: "ehl rehs-tow-RAHN-teh 'ehl port deh kah-LEHL-ah' ah SEE-doh...",
    example: "¿Qué hace especial a este restaurante? ¿Por qué es importante usar ingredientes locales?",
    level: "advanced-spain"
  },
  {
    id: "shannon-rest-2",
    spanish: "Para pedir como un local: Nunca digas 'Oye' para llamar al camarero — es maleducado. En su lugar, haz contacto visual o levanta la mano discretamente. También puedes decir 'Perdone' con tono amable. En restaurantes familiares de Calella, el camarero suele acercarse cuando terminas tu plato.",
    english: "Ordering like a local: Never say 'Hey' to call the waiter — it's rude. Instead, make eye contact or raise your hand discreetly. You can also say 'Excuse me' with a friendly tone. In family restaurants in Calella, the waiter usually comes over when you finish your plate.",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "PAH-rah peh-DEER KOH-moh oon loh-KAHL...",
    example: "¿Cómo llamarías al camarero de forma respetuosa en un restaurante de Calella?",
    level: "advanced-spain"
  },

  // ===== FAMILY (advanced) =====
  {
    id: "shannon-family-1",
    spanish: "Vocabulario familiar catalán: En Calella, las familias mezclan español y catalán en casa. 'Iaia' (yaya) = abuela. 'Iaio' (yaio) = abuelo. 'Nano' = niño pequeño. 'Nena' = niña. Si una abuela te llama 'nano' o 'nena', es afectuoso, no condescendiente.",
    english: "Catalan family vocabulary: In Calella, families mix Spanish and Catalan at home. 'Iaia' = grandma. 'Iaio' = grandpa. 'Nano' = little boy. 'Nena' = girl/sweetie. If a grandmother calls you 'nano' or 'nena,' it's affectionate, not condescending.",
    category: "family",
    difficulty: 4,
    pronunciation: "voh-kah-boo-LAH-ree-oh fah-mee-lee-AHR kah-tah-LAHN...",
    example: "Si una señora mayor en la calle te llama 'nano', ¿cómo deberías responder?",
    level: "advanced-spain"
  },

  // ===== SCHOOL / LEARNING (maps to 'school' category) =====
  {
    id: "shannon-school-1",
    spanish: "Reflexión sobre el aprendizaje: Los estudios demuestran que la inmersión total es la forma más rápida de aprender un idioma. Habla español en casa durante una hora al día antes del viaje. Escucha Radio Nacional de España o podcast catalanes. Ve series en Netflix en español con subtítulos en español — no en inglés.",
    english: "Learning reflection: Studies show total immersion is the fastest way to learn a language. Speak Spanish at home for one hour a day before the trip. Listen to Radio Nacional de España or Catalan podcasts. Watch Netflix shows in Spanish with Spanish subtitles — not English.",
    category: "school",
    difficulty: 4,
    pronunciation: "reh-flehk-see-OHN SOH-breh ehl ah-prehn-dee-SAH-heh...",
    example: "¿Cuáles son las tres estrategias recomendadas para aprender español antes del viaje?",
    level: "advanced-spain"
  },

  // ===== COLORS / NUMBERS (advanced numbers in context) =====
  {
    id: "shannon-numbers-1",
    spanish: "Precios reales en Calella (2024): Alquiler piso 2 hab: 950€/mes. Café con leche: 1,80€. Menú del día: 12€. Bocadillo en bar: 3,50€. Entrada al parking: 2€/hora. Billetes tren a Barcelona: 4,60€. ¿Cómo se compara con tu ciudad?",
    english: "Real prices in Calella (2024): 2-bedroom apartment rental: €950/month. Café con leche: €1.80. Set lunch menu: €12. Sandwich at a bar: €3.50. Parking: €2/hour. Train ticket to Barcelona: €4.60. How does this compare to your city?",
    category: "colorsNumbers",
    difficulty: 4,
    pronunciation: "PREH-see-ohs REH-ah-lehs ehn kah-LEHL-ah...",
    example: "¿Cuánto costaría vivir un mes en Calella? Calcula: alquiler + comida + transporte.",
    level: "advanced-spain"
  },

  // ===== ANIMALS / LOCAL NATURE =====
  {
    id: "shannon-animals-1",
    spanish: "Fauna marina del Mediterráneo: En las aguas de Calella puedes encontrar: Pulpo común (Octopus vulgaris), Dorada (Sparus aurata), Lubina (Dicentrarchus labrax), Salpa, Caballito de mar (Hippocampus guttulatus). Los pescadores locales dicen que la mejor época para la pesca es de septiembre a noviembre.",
    english: "Mediterranean marine fauna: In the waters of Calella you can find: Common octopus, Sea bream, European sea bass, Salpa, Spiny seahorse. Local fishermen say the best season for fishing is September to November.",
    category: "animalsToys",
    difficulty: 4,
    pronunciation: "fah-OO-nah mah-REE-nah dehl meh-dee-teh-RRRAH-neh-oh...",
    example: "¿Qué animal marino de Calella te interesa más? ¿Por qué septiembre-noviembre es la mejor época?",
    level: "advanced-spain"
  },

  // ===== HOUSING (advanced) =====

  // ===== LOCAL CALELLA DEEP DIVES =====
  {
    id: "shannon-calella-1",
    spanish:
      "El puerto de Calella es uno de los más antiguos de la Costa Maresme. Construcción: siglo XIII. Hoy en día, 150 barcos pesqueros todavía operan desde aquí, principalmente persiguiendo bacalao, pez espada, y sardinas del Mediterráneo. Los pescadores comienzan antes del amanecer y regresan al mediodía con su captura fresca.",
    english:
      "Calella's port is one of the oldest on the Costa Maresme. Construction: 13th century. Today, 150 fishing boats still operate from here, mainly pursuing cod, scabbardfish, and sardines from the Mediterranean. Fishermen begin before dawn and return at noon with their fresh catch.",
    category: "housing",
    difficulty: 5,
    pronunciation:
      "ehl PWEHR-toh deh kah-LEHL-ah ehs oo-noh deh lohs mahs ahn-TEE-gwos...",
    example:
      "¿Cuál es la historia del puerto de Calella? ¿Cuántos barcos pesqueros operan hoy?",
    level: "advanced-spain"
  },
  {
    id: "shannon-calella-2",
    spanish:
      "Calella celebra la Festa Major cada agosto. Durante nueve días, las calles se transforman en una fiesta: gigantones (figuras de cartón de 4 metros), correfoc (procesiones de fuego), conciertos, bailes tradicionales, y comidas comunitarias. La cocina típica incluye escalivada, croquetas caseras, y horchata de chufas. Miles de visitantes locales vienen de Barcelona solo para participar.",
    english:
      "Calella celebrates the Festa Major every August. For nine days, the streets transform into a festival: gegants (4-meter cardboard figures), correfoc (fire processions), concerts, traditional dances, and community meals. Typical cuisine includes escalivada, homemade croquettes, and tiger nut horchata. Thousands of local visitors come from Barcelona just to participate.",
    category: "culture",
    difficulty: 4,
    pronunciation:
      "kah-LEHL-ah theh-leh-BRAH lah FEHS-tah mah-HOR kah-dah ah-GOS-toh...",
    example:
      "¿Qué tradiciones tiene la Festa Major? ¿Qué comidas son típicas durante la celebración?",
    level: "advanced-spain"
  },
  {
    id: "shannon-calella-3",
    spanish:
      "La iglesia parroquial de Calella, dedicada a la Virgen de Gràcia, fue construida en 1683 después que los piratas berberiscos destruyeron la anterior. La nueva iglesia tiene un campanario de 45 metros visible desde el mar. En la década de 1960, los pescadores donaron dinero para restaurarla cuando el turismo comenzó.",
    english:
      "Calella's parish church, dedicated to the Virgin of Grace, was built in 1683 after Barbary pirates destroyed the previous one. The new church has a 45-meter bell tower visible from the sea. In the 1960s, fishermen donated money to restore it when tourism began.",
    category: "culture",
    difficulty: 5,
    pronunciation:
      "lah ee-GLEH-see-ah pah-rroh-kee-AHL deh kah-LEHL-ah...",
    example:
      "¿Por qué fue necesario reconstruir la iglesia de Calella? ¿Quién ayudó con la restauración en los años 60?",
    level: "advanced-spain"
  },

  // ===== NEARBY TOWNS & LOCAL GEOGRAPHY =====
  {
    id: "shannon-geo-1",
    spanish:
      "Desde Calella, puedes llegar a Barcelona en 45 minutos por tren Rodalies R2. Girona está al norte, también accesible en una hora. Tarragona, con ruinas romanas fascinantes, está a 90 minutos al sur. Montserrat, el monasterio benedictino en las montañas, es un destino espiritual perfecto para una excursión de medio día.",
    english:
      "From Calella, you can reach Barcelona in 45 minutes by Rodalies R2 train. Girona is to the north, also accessible in an hour. Tarragona, with fascinating Roman ruins, is 90 minutes to the south. Montserrat, the Benedictine monastery in the mountains, is a perfect spiritual day-trip destination.",
    category: "housing",
    difficulty: 4,
    pronunciation:
      "dehs-deh kah-LEHL-ah, PWEH-dehs yeh-GAHR ah Bar-theh-LOH-nah...",
    example:
      "¿Cuál es el tiempo de viaje desde Calella a Barcelona? ¿Qué transporte público recomendarías?",
    level: "advanced-spain"
  },

  // ===== TONGUE TWISTERS (TRABALENGUAS) =====
  {
    id: "shannon-tonguetwister-1",
    spanish:
      "Trabalenguas: 'Tres tristes tigres tragaban trigo en un trigal.' Pronunciación desafiante con múltiples 'tr'. Intenta decirlo tres veces rápido sin equivocarte.",
    english:
      "Tongue twister: 'Three sad tigers swallowed wheat in a wheat field.' Challenging pronunciation with multiple 'tr' sounds. Try saying it three times fast without making a mistake.",
    category: "polite",
    difficulty: 4,
    pronunciation: "trehs TREE-stehs TEE-grehs trah-gah-bahn TREE-goh...",
    example:
      "¿Puedes pronunciar bien este trabalenguas? ¿Cuál es el desafío en decirlo rápido?",
    level: "advanced-spain"
  },
  {
    id: "shannon-tonguetwister-2",
    spanish:
      "Trabalenguas: 'Paco Peco, chico rico, insistía en su pico. Su padre le pidió que parara de picar. Paco Peco paraba, pero picaba sin parar.' Juega con palabras similares (pico, picar, Paco).",
    english:
      "Tongue twister: 'Paco Peco, a rich boy, insisted on his beak. His father asked him to stop pecking. Paco Peco would stop, but he would peck without stopping.' Plays with similar words (beak, peck, Paco).",
    category: "polite",
    difficulty: 5,
    pronunciation: "PAH-koh PEH-koh, CHEE-koh REE-koh, een-sees-TEE-ah...",
    example:
      "Este trabalenguas tiene muchas palabras que suenen parecidas. ¿Puedes identificarlas?",
    level: "advanced-spain"
  },

  // ===== NEWS & CURRENT EVENTS =====
  {
    id: "shannon-news-1",
    spanish:
      "Noticia reciente: El puerto pesquero de Calella ha implementado nuevas regulaciones para la pesca sostenible en 2024. Solo se permite pescar ciertos peces durante temporadas específicas para proteger las especies en peligro de extinción. Los pescadores locales dicen que estas restricciones los ayudan a preservar su futuro laboral mientras protegen el ecosistema marino del Mediterráneo.",
    english:
      "Recent news: Calella's fishing port has implemented new sustainable fishing regulations in 2024. Only certain fish are allowed to be caught during specific seasons to protect endangered species. Local fishermen say these restrictions help them preserve their future livelihood while protecting the Mediterranean's marine ecosystem.",
    category: "banking",
    difficulty: 5,
    pronunciation:
      "noh-TEE-see-ah reh-see-EHN-teh: ehl PWEHR-toh pehs-KEH-roh deh kah-LEHL-ah...",
    example:
      "¿Cuáles son las nuevas regulaciones de pesca? ¿Por qué son importantes para los pescadores locales?",
    level: "advanced-spain"
  },
  {
    id: "shannon-news-2",
    spanish:
      "Turismo en Cataluña: El gobierno regional reporta que 2.8 millones de turistas visitaron la Costa Brava en 2023, un aumento del 15% respecto a 2022. Sin embargo, residentes locales preocupados expresan que el turismo masivo está transformando pueblos pequeños como Calella, subiendo precios de vivienda y desplazando a familias locales tradicionales.",
    english:
      "Tourism in Catalonia: The regional government reports that 2.8 million tourists visited Costa Brava in 2023, a 15% increase from 2022. However, concerned local residents express that mass tourism is transforming small towns like Calella, driving up housing prices and displacing traditional local families.",
    category: "housing",
    difficulty: 5,
    pronunciation:
      "too-RREES-moh ehn kah-tah-LOO-nyah: ehl goh-bee-EHR-noh reh-hee-oh-NAHL...",
    example:
      "¿Cuántos turistas visitaron la Costa Brava? ¿Cuáles son las preocupaciones de los residentes locales?",
    level: "advanced-spain"
  },

  // ===== JOKES & HUMOR =====
  {
    id: "shannon-joke-1",
    spanish:
      "Chiste: Un turista llega a Calella y pregunta a un pescador: '¿Cuánto cuesta una habitación en Calella?' El pescador responde: 'Depende. ¿De dónde eres?' El turista dice: 'De Nueva York.' El pescador: 'Entonces, tres veces más barato que tu casa.' El turista se ríe porque ¡es verdad!",
    english:
      "Joke: A tourist arrives in Calella and asks a fisherman, 'How much does a room cost in Calella?' The fisherman responds, 'Depends. Where are you from?' The tourist says, 'New York.' The fisherman: 'Then, three times cheaper than your house.' The tourist laughs because it's true!",
    category: "restaurant",
    difficulty: 4,
    pronunciation:
      "CHEES-teh: oon too-REES-tah YEH-gah ah kah-LEHL-ah ee prehn-tah...",
    example:
      "¿Por qué es divertido este chiste? ¿Qué contraste ilustra?",
    level: "advanced-spain"
  },
  {
    id: "shannon-joke-2",
    spanish:
      "Chiste de pescador: Dos pescadores de Calella están en el bar tomando cerveza. Uno dice: 'Este año fue malo. Solo capturamos 100 toneladas de pez espada.' El otro responde: 'Sí, es horrible. El año pasado fueron 200 toneladas.' El primero dice: '¡Y eso es lo malo! Ahora mi esposa piensa que nuestro negocio es fácil.' ¡Los pescadores saben que trabajar en el mar nunca es fácil!",
    english:
      "Fisherman's joke: Two fishermen from Calella are at the bar drinking beer. One says, 'This year was bad. We only caught 100 tons of scabbardfish.' The other responds, 'Yes, it's horrible. Last year it was 200 tons.' The first says, 'And that's the problem! Now my wife thinks our business is easy.' Fishermen know that working at sea is never easy!",
    category: "restaurant",
    difficulty: 5,
    pronunciation:
      "CHEES-teh deh pehs-kah-DOR: dohs pehs-kah-DOR-ehs deh kah-LEHL-ah...",
    example:
      "¿Cuál es la ironía del chiste? ¿Qué quiere decir el primer pescador con 'eso es lo malo'?",
    level: "advanced-spain"
  },

  // ===== CULTURAL NUANCES & LANGUAGE =====
  {
    id: "shannon-language-1",
    spanish:
      "En Cataluña, los catales (o catalanes) tienen un proverbio: 'Cada minut compte'—cada minuto cuenta. Esto refleja la mentalidad de eficiencia y aprovechar el tiempo. También dicen 'no pots mirar-te el pam' (no puedes mirarte el ombligo mientras comes pan)—significando que debes mantenerte enfocado en lo que es importante. Las metáforas catalanas son profundas.",
    english:
      "In Catalonia, Catalans have a proverb: 'Every minute counts.' This reflects a mentality of efficiency and making the most of time. They also say 'you can't look at your belly button while eating bread'—meaning you must stay focused on what's important. Catalan metaphors are profound.",
    category: "culture",
    difficulty: 5,
    pronunciation:
      "ehn kah-tah-LOO-nyah, lohs kah-tah-LEHS tee-EH-nehn oon proh-VEHRbee-oh...",
    example:
      "¿Qué significan estos proverbios catalanes? ¿Cómo reflejan la cultura local?",
    level: "advanced-spain"
  },
  {
    id: "shannon-language-2",
    spanish:
      "Diferencia entre 'tú' (informal español) y 'vos' (argentino). En España se usa 'tú.' Pero en Cataluña, muchos dicen 'tu' en catalán (similar a tú español). Los catalanes también usan 'vosaltres' (vosotros) en plural informal. Si hables con pescadores locales, usarán mucho 'tu'—es su forma natural. No sonaría raro si usas 'tú' formal—sonaría como si hablaras con respeto. Adapta tu lenguaje al contexto.",
    english:
      "Difference between 'tú' (informal Spanish) and 'vos' (Argentine). In Spain, 'tú' is used. But in Catalonia, many say 'tu' in Catalan (similar to Spanish tú). Catalans also use 'vosaltres' (vosotros) as informal plural. If you speak with local fishermen, they'll use 'tu' a lot—it's their natural form. It wouldn't sound weird if you use formal 'tú'—it would sound like you're speaking with respect. Adapt your language to context.",
    category: "polite",
    difficulty: 5,
    pronunciation:
      "dee-feh-REHN-see-ah EHN-treh 'tú' ee 'vos'...",
    example:
      "¿Cuál es la forma correcta de dirigirse a un pescador local en Calella?",
    level: "advanced-spain"
  },

  // ===== REAL-WORLD SCENARIOS =====
  {
    id: "shannon-scenario-1",
    spanish:
      "Escenario: Estás en el restaurante 'Casa Xica' en Calella. El camarero te pregunta: '¿Cuál es tu plato favorito de nuestra costa?' Tú entiendes que te pregunta por tu preferencia de pescados locales. Respondes: 'Me encanta el suquet de peix cuando está bien hecho, con un poco de picante y mucho azafrán. Es auténtico de aquí.' El camarero sonríe porque reconoce que entiendes la cocina local verdadera.",
    english:
      "Scenario: You're at the restaurant 'Casa Xica' in Calella. The waiter asks you, 'What's your favorite dish from our coast?' You understand he's asking about your preference for local fish. You respond: 'I love fish stew when it's well made, with a little spice and lots of saffron. It's authentic from here.' The waiter smiles because he recognizes you understand genuine local cuisine.",
    category: "restaurant",
    difficulty: 5,
    pronunciation:
      "ehs-theh-NAH-ree-oh: ehs-TAHS ehn ehl rehs-tow-RAHN-teh 'KAH-sah SHEE-kah'...",
    example:
      "¿Cómo demuestras que entiendes la comida local de Calella? ¿Qué palabras usarías?",
    level: "advanced-spain"
  },
  {
    id: "shannon-scenario-2",
    spanish:
      "Escenario: Un vecino local en Calella te invita a una cena familiar. Antes de comer, dices: 'Espero aprender hoy cómo cocinábais la comida cuando no había turismo.' El abuelo (88 años) comienza a contar historias de cómo su abuela hacía recetas sin electricidad. La abuela (86 años) continúa: 'Usábamos sal del mar y el fuego de leña. Ahora es fácil con los electrodomésticos.' Todos ríen, comen bien, y tú realmente conectas con las tradiciones locales de Calella.",
    english:
      "Scenario: A local neighbor in Calella invites you to a family dinner. Before eating, you say, 'I hope to learn today how you used to cook when there was no tourism.' The grandfather (88 years old) starts telling stories about how his grandmother made recipes without electricity. The grandmother (86 years old) continues: 'We used salt from the sea and firewood. Now it's easy with appliances.' Everyone laughs, eats well, and you really connect with Calella's local traditions.",
    category: "family",
    difficulty: 5,
    pronunciation:
      "ehs-theh-NAH-ree-oh: oon beh-THEE-noh loh-KAHL ehn kah-LEHL-ah...",
    example:
      "¿Cómo conectarías con las historias de los abuelos locales? ¿Qué preguntas harías?",
    level: "advanced-spain"
  },

  // ===== POLITICAL & SOCIAL CONTEXT =====
  {
    id: "shannon-context-1",
    spanish:
      "Contexto: En 2017, hubo un referéndum de independencia en Cataluña. La opinión estaba dividida. En Calella, algunos pescadores dicen: 'Somos catalanes primero, españoles segundo.' Otros dicen: 'Necesitamos un Estado fuerte para proteger nuestras aguas.' Como visitante/residente, es delicado hablar de política. Mejor preguntar: '¿Cuáles son los desafíos que enfrenta Calella hoy?'—es más neutral y respetuoso.",
    english:
      "Context: In 2017, there was an independence referendum in Catalonia. Opinion was divided. In Calella, some fishermen say, 'We are Catalan first, Spanish second.' Others say, 'We need a strong state to protect our waters.' As a visitor/resident, it's delicate to talk politics. Better to ask: 'What are the challenges Calella faces today?'—it's more neutral and respectful.",
    category: "banking",
    difficulty: 5,
    pronunciation:
      "kohn-TEHKS-toh: ehn dohs-meel dee-ee-ee-see-EHTS...",
    example:
      "¿Cómo abordarías conversaciones sobre temas políticos sensibles de forma respetuosa?",
    level: "advanced-spain"
  },

  // ===== ADVANCED GRAMMAR & EXPRESSIONS =====
  {
    id: "shannon-grammar-1",
    spanish:
      "Expresión: 'Si hubiera sabido que Calella era tan hermosa, habría llegado hace diez años.' Esta es una estructura condicional perfecto: 'Si + pluscuamperfecto del subjuntivo + condicional perfecto.' Significa algo que no sucedió, pero desearías que hubiera sucedido. Los españoles usan esto frecuentemente para expresar arrepentimiento o deseo de cambiar el pasado.",
    english:
      "Expression: 'If I had known Calella was so beautiful, I would have arrived ten years ago.' This is a perfect conditional structure: 'If + past perfect subjunctive + perfect conditional.' It means something that didn't happen, but you wish it had. Spanish people use this frequently to express regret or wish to change the past.",
    category: "polite",
    difficulty: 5,
    pronunciation:
      "ehks-preh-see-OHN: 'Shee oo-bee-EH-rah sah-BEE-doh keh kah-LEHL-ah...",
    example:
      "¿Cómo construyes una frase condicional en tiempo perfecto?",
    level: "advanced-spain"
  },
  {
    id: "shannon-grammar-2",
    spanish:
      "Subjuntivo en contexto: 'Aunque sea caro, quiero vivir en Calella. Aunque sea pequeño el pueblo, tiene todo lo que necesito. Aunque sea difícil aprender catalán y español juntos, lo voy a intentar.' La estructura 'aunque + presente subjuntivo' se usa para conceder un punto pero seguir con tu opinión principal. Es muy común en conversaciones españolas.",
    english:
      "Subjunctive in context: 'Even though it may be expensive, I want to live in Calella. Even though the town may be small, it has everything I need. Even though it may be difficult to learn Catalan and Spanish together, I'm going to try.' The structure 'aunque + present subjunctive' is used to concede a point but maintain your main opinion. It's very common in Spanish conversations.",
    category: "polite",
    difficulty: 5,
    pronunciation:
      "soo-boon-TEE-voh ehn kohn-TEHKS-toh: 'ow-nkeh SEH-ah KAH-roh'...",
    example:
      "¿Cuándo usas el subjuntivo con 'aunque'? ¿Cuál es la diferencia de significado?",
    level: "advanced-spain"
  }
];
