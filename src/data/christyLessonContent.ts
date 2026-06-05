import { LessonTerm } from "../types";

/**
 * Christy's Intermediate Curriculum
 *
 * This curriculum is designed for intermediate Spanish learners (Christy's level)
 * Features:
 * - More complex sentence structures than kids' curriculum
 * - Focus on adult practical situations (work, travel, daily life)
 * - Mixed tenses and mood variations
 * - Formal vs informal speech patterns
 * - Real-world context specific to living in Spain
 *
 * Difficulty: 3-5 (intermediate to advanced-intermediate)
 * Level: "intermediate"
 */

export const CHRISTY_LESSON_CONTENT: LessonTerm[] = [
  // ===== GREETINGS (INTERMEDIATE) =====
  {
    id: "christy-greet-1",
    spanish: "¿Cómo te va?",
    english: "How are things going for you?",
    category: "greetings",
    difficulty: 3,
    pronunciation: "KOH-moh teh vah",
    example: "¿Cómo te va con el trabajo nuevo?",
    level: "intermediate"
  },
  {
    id: "christy-greet-2",
    spanish: "¿Qué tal el fin de semana?",
    english: "How was your weekend?",
    category: "greetings",
    difficulty: 3,
    pronunciation: "keh tahl ehl feen deh seh-MAH-nah",
    example: "¿Qué tal el fin de semana? Espero que te divertiste.",
    level: "intermediate"
  },
  {
    id: "christy-greet-3",
    spanish: "Encantada de conocerte",
    english: "Delighted to meet you",
    category: "greetings",
    difficulty: 3,
    pronunciation: "ehn-kahn-TAH-dah deh koh-noh-SEHR-teh",
    example: "Encantada de conocerte, Sofía. He oído mucho sobre ti.",
    level: "intermediate"
  },
  {
    id: "christy-greet-4",
    spanish: "Es un placer hablar contigo",
    english: "It's a pleasure to talk with you",
    category: "greetings",
    difficulty: 3,
    pronunciation: "ehs oon PLAH-sehr ah-BLAHR kohn-TEE-goh",
    example: "Es un placer hablar contigo. Tienes perspectivas interesantes.",
    level: "intermediate"
  },
  {
    id: "christy-greet-5",
    spanish: "Hasta pronto",
    english: "See you soon",
    category: "greetings",
    difficulty: 2,
    pronunciation: "AHS-tah PROHN-toh",
    example: "Ha sido un gusto. Hasta pronto, espero.",
    level: "intermediate"
  },

  // ===== HOUSING / ACCOMMODATION =====
  {
    id: "christy-housing-1",
    spanish: "Busco un piso en alquiler",
    english: "I'm looking for an apartment to rent",
    category: "housing",
    difficulty: 3,
    pronunciation: "BUS-koh oon PEE-soh ehn ahl-kee-LEHR",
    example: "Busco un piso en alquiler en el centro de la ciudad.",
    level: "intermediate"
  },
  {
    id: "christy-housing-2",
    spanish: "¿Cuál es el precio del alquiler?",
    english: "What is the rental price?",
    category: "housing",
    difficulty: 3,
    pronunciation: "kwahl ehs ehl PREH-see-oh dehl ahl-kee-LEHR",
    example: "¿Cuál es el precio del alquiler por mes?",
    level: "intermediate"
  },
  {
    id: "christy-housing-3",
    spanish: "¿Están incluidos los gastos?",
    english: "Are utilities included?",
    category: "housing",
    difficulty: 3,
    pronunciation: "ehs-TAHN een-kloo-EE-dohs lohs GAHS-tohs",
    example: "¿Están incluidos los gastos de agua y electricidad?",
    level: "intermediate"
  },
  {
    id: "christy-housing-4",
    spanish: "Quisiera ver el piso",
    english: "I would like to see the apartment",
    category: "housing",
    difficulty: 3,
    pronunciation: "kee-see-EH-rah vehr ehl PEE-soh",
    example: "Quisiera ver el piso el próximo fin de semana si es posible.",
    level: "intermediate"
  },
  {
    id: "christy-housing-5",
    spanish: "Tiene vistas al mar",
    english: "It has views of the sea",
    category: "housing",
    difficulty: 3,
    pronunciation: "tee-EH-neh VEES-tahs ahl mahr",
    example: "La habitación tiene vistas al mar desde el balcón.",
    level: "intermediate"
  },
  {
    id: "christy-housing-6",
    spanish: "¿Hay ascensor en el edificio?",
    english: "Is there an elevator in the building?",
    category: "housing",
    difficulty: 3,
    pronunciation: "AHY ahs-sehn-SOR ehn ehl eh-dee-FEE-see-oh",
    example: "¿Hay ascensor en el edificio? Tengo dificultad con las escaleras.",
    level: "intermediate"
  },
  {
    id: "christy-housing-7",
    spanish: "Busco una habitación doble",
    english: "I'm looking for a double room",
    category: "housing",
    difficulty: 3,
    pronunciation: "BUS-koh oo-nah ah-bee-tah-see-OHN DOH-bleh",
    example: "Busco una habitación doble para mi marido y para mí.",
    level: "intermediate"
  },
  {
    id: "christy-housing-8",
    spanish: "¿Cuándo puedo mudarme?",
    english: "When can I move in?",
    category: "housing",
    difficulty: 3,
    pronunciation: "KWAHN-doh PWEH-doh moo-DAHR-meh",
    example: "¿Cuándo puedo mudarme? Necesitamos empezar pronto.",
    level: "intermediate"
  },
  {
    id: "christy-housing-9",
    spanish: "La casa tiene un jardín bonito",
    english: "The house has a nice garden",
    category: "housing",
    difficulty: 3,
    pronunciation: "lah KAH-sah tee-EH-neh oon hahr-DEEN boh-NEE-toh",
    example: "La casa tiene un jardín bonito con flores de colores.",
    level: "intermediate"
  },
  {
    id: "christy-housing-10",
    spanish: "¿Se permiten mascotas?",
    english: "Are pets allowed?",
    category: "housing",
    difficulty: 3,
    pronunciation: "seh pehr-MEE-tehn mahs-KOH-tahs",
    example: "Tenemos un perro. ¿Se permiten mascotas en el piso?",
    level: "intermediate"
  },

  // ===== RESTAURANT / DINING (ADVANCED) =====
  {
    id: "christy-dining-1",
    spanish: "Quisiera una mesa para dos, por favor",
    english: "I would like a table for two, please",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "kee-see-EH-rah oo-nah MEH-sah PAH-rah dohs por fah-BOR",
    example: "Quisiera una mesa para dos en la terraza si es posible.",
    level: "intermediate"
  },
  {
    id: "christy-dining-2",
    spanish: "¿Cuál es el plato del día?",
    english: "What is today's special?",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "kwahl ehs ehl PLAH-toh dehl DEE-ah",
    example: "¿Cuál es el plato del día? ¿Qué me recomiendas?",
    level: "intermediate"
  },
  {
    id: "christy-dining-3",
    spanish: "¿Tienen algo vegetariano?",
    english: "Do you have anything vegetarian?",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "tee-EH-nehn AHL-goh veh-heh-tah-ree-AH-noh",
    example: "¿Tienen algo vegetariano? Prefiero no comer carne.",
    level: "intermediate"
  },
  {
    id: "christy-dining-4",
    spanish: "Soy alérgica a los frutos secos",
    english: "I'm allergic to tree nuts",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "soy ah-LEHR-hee-kah ah lohs FROO-tohs SEH-kohs",
    example: "Soy alérgica a los frutos secos. ¿Contiene mi comida algún fruto seco?",
    level: "intermediate"
  },
  {
    id: "christy-dining-5",
    spanish: "¿Qué vino recomendáis?",
    english: "What wine do you recommend?",
    category: "restaurant",
    difficulty: 4,
    pronunciation: "keh VEE-noh reh-koh-mehn-DÁYS",
    example: "¿Qué vino recomendáis para acompañar el pescado?",
    level: "intermediate"
  },
  {
    id: "christy-dining-6",
    spanish: "La comida está deliciosa",
    english: "The food is delicious",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "lah koh-MEE-dah ehs-TAH deh-lee-see-OH-sah",
    example: "La comida está deliciosa. Mis felicitaciones al chef.",
    level: "intermediate"
  },
  {
    id: "christy-dining-7",
    spanish: "¿Hacéis envío a domicilio?",
    english: "Do you do delivery?",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "ah-THEH-ehs ehn-VEE-oh ah doh-mee-see-lee-OH",
    example: "Nos gustaría comer en casa esta noche. ¿Hacéis envío a domicilio?",
    level: "intermediate"
  },
  {
    id: "christy-dining-8",
    spanish: "La cuenta, por favor",
    english: "The check, please",
    category: "restaurant",
    difficulty: 2,
    pronunciation: "lah KWEHN-tah por fah-BOR",
    example: "Hemos disfrutado mucho. La cuenta, por favor.",
    level: "intermediate"
  },
  {
    id: "christy-dining-9",
    spanish: "¿Aceptáis tarjeta de crédito?",
    english: "Do you accept credit card?",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "ah-thep-TÁYS tahr-HEH-tah deh KREH-dee-toh",
    example: "Perfecto. ¿Aceptáis tarjeta de crédito?",
    level: "intermediate"
  },
  {
    id: "christy-dining-10",
    spanish: "Esto no es lo que pedí",
    english: "This is not what I ordered",
    category: "restaurant",
    difficulty: 3,
    pronunciation: "EHS-toh noh ehs loh keh peh-DEE",
    example: "Disculpe, pero esto no es lo que pedí. Yo pedí la sopa.",
    level: "intermediate"
  },

  // ===== BANKING / MONEY =====
  {
    id: "christy-banking-1",
    spanish: "Necesito abrir una cuenta bancaria",
    english: "I need to open a bank account",
    category: "banking",
    difficulty: 3,
    pronunciation: "neh-theh-SEE-toh ah-BREER oo-nah KWEHN-tah bahn-KAH-ree-ah",
    example: "Acabo de mudarme a España. Necesito abrir una cuenta bancaria.",
    level: "intermediate"
  },
  {
    id: "christy-banking-2",
    spanish: "¿Cuáles son los requisitos?",
    english: "What are the requirements?",
    category: "banking",
    difficulty: 3,
    pronunciation: "KWAH-lehs sohn lohs reh-kee-SEE-tohs",
    example: "¿Cuáles son los requisitos para abrir una cuenta?",
    level: "intermediate"
  },
  {
    id: "christy-banking-3",
    spanish: "¿Cuál es la comisión mensual?",
    english: "What is the monthly fee?",
    category: "banking",
    difficulty: 3,
    pronunciation: "kwahl ehs lah koh-mee-see-OHN mehn-soo-AHL",
    example: "¿Cuál es la comisión mensual por mantener la cuenta?",
    level: "intermediate"
  },
  {
    id: "christy-banking-4",
    spanish: "Quiero transferir dinero a mi país",
    english: "I want to transfer money to my country",
    category: "banking",
    difficulty: 3,
    pronunciation: "kee-EH-roh trans-feh-REER dee-NEH-roh ah mee pah-EES",
    example: "Quiero transferir dinero a mi cuenta en Estados Unidos.",
    level: "intermediate"
  },
  {
    id: "christy-banking-5",
    spanish: "¿Necesito solicitar un NIE?",
    english: "Do I need to request an NIE?",
    category: "banking",
    difficulty: 4,
    pronunciation: "neh-theh-SEE-toh soh-lee-thee-TAHR oon NEE-eh",
    example: "¿Necesito solicitar un NIE para abrir una cuenta bancaria?",
    level: "intermediate"
  },
  {
    id: "christy-banking-6",
    spanish: "Necesito cambiar dinero",
    english: "I need to exchange money",
    category: "banking",
    difficulty: 3,
    pronunciation: "neh-theh-SEE-toh kahm-bee-AHR dee-NEH-roh",
    example: "Tengo dólares americanos. Necesito cambiar dinero a euros.",
    level: "intermediate"
  },
  {
    id: "christy-banking-7",
    spanish: "¿Cuál es el tipo de cambio?",
    english: "What is the exchange rate?",
    category: "banking",
    difficulty: 3,
    pronunciation: "kwahl ehs ehl TEE-poh deh KAHM-bee-oh",
    example: "¿Cuál es el tipo de cambio del dólar americano al euro?",
    level: "intermediate"
  },
  {
    id: "christy-banking-8",
    spanish: "Mi tarjeta no funciona",
    english: "My card doesn't work",
    category: "banking",
    difficulty: 3,
    pronunciation: "mee tahr-HEH-tah noh foon-see-OH-nah",
    example: "Intento usar mi tarjeta en el cajero y no funciona.",
    level: "intermediate"
  },
  {
    id: "christy-banking-9",
    spanish: "¿Hay un cajero automático cerca?",
    english: "Is there an ATM nearby?",
    category: "banking",
    difficulty: 3,
    pronunciation: "AHY oon kah-heh-ROH ow-toh-MAH-tee-koh THEHR-kah",
    example: "Necesito efectivo. ¿Hay un cajero automático cerca de aquí?",
    level: "intermediate"
  },
  {
    id: "christy-banking-10",
    spanish: "Quisiera solicitar un crédito",
    english: "I would like to request a loan",
    category: "banking",
    difficulty: 4,
    pronunciation: "kee-see-EH-rah soh-lee-thee-TAHR oon KREH-dee-toh",
    example: "Quisiera solicitar un crédito para comprar una casa.",
    level: "intermediate"
  },

  // ===== HEALTHCARE =====
  {
    id: "christy-health-1",
    spanish: "Tengo una cita con el médico",
    english: "I have a doctor's appointment",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "TEHN-goh oo-nah THEE-tah kohn ehl MEH-dee-koh",
    example: "Tengo una cita con el médico mañana a las tres.",
    level: "intermediate"
  },
  {
    id: "christy-health-2",
    spanish: "¿Dónde está el hospital más cercano?",
    english: "Where is the nearest hospital?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "DOHN-deh ehs-TAH ehl ohs-pee-TAHL mahs THEHR-kah-noh",
    example: "Es una emergencia. ¿Dónde está el hospital más cercano?",
    level: "intermediate"
  },
  {
    id: "christy-health-3",
    spanish: "Tengo dolor de cabeza",
    english: "I have a headache",
    category: "healthcare",
    difficulty: 2,
    pronunciation: "TEHN-goh doh-LOR deh kah-BEH-sah",
    example: "No me siento bien. Tengo dolor de cabeza y fiebre.",
    level: "intermediate"
  },
  {
    id: "christy-health-4",
    spanish: "¿Cuáles son sus síntomas?",
    english: "What are your symptoms?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "KWAH-lehs sohn soos SEEN-toh-mahs",
    example: "El médico me pregunta: '¿Cuáles son sus síntomas?'",
    level: "intermediate"
  },
  {
    id: "christy-health-5",
    spanish: "Soy alérgica a la penicilina",
    english: "I'm allergic to penicillin",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "soy ah-LEHR-hee-kah ah lah peh-nee-thee-LEE-nah",
    example: "Es importante que el doctor sepa: Soy alérgica a la penicilina.",
    level: "intermediate"
  },
  {
    id: "christy-health-6",
    spanish: "¿Necesito una receta?",
    english: "Do I need a prescription?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "neh-theh-SEE-toh oo-nah reh-THEH-tah",
    example: "¿Necesito una receta para comprar la medicina?",
    level: "intermediate"
  },
  {
    id: "christy-health-7",
    spanish: "¿Dónde está la farmacia?",
    english: "Where is the pharmacy?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "DOHN-deh ehs-TAH lah far-MAH-see-ah",
    example: "Necesito llenar mi receta. ¿Dónde está la farmacia?",
    level: "intermediate"
  },
  {
    id: "christy-health-8",
    spanish: "He estado enfermo por una semana",
    english: "I've been sick for a week",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "eh ehs-TAH-doh ehn-FEHR-moh por oo-nah seh-MAH-nah",
    example: "He estado enfermo por una semana y estoy preocupado.",
    level: "intermediate"
  },
  {
    id: "christy-health-9",
    spanish: "¿Cuánto tiempo tardará en mejorar?",
    english: "How long will it take to get better?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "KWAHN-toh tee-EHM-poh tar-dah-RAH ehn meh-hoh-RAHR",
    example: "¿Cuánto tiempo tardará en mejorar?",
    level: "intermediate"
  },
  {
    id: "christy-health-10",
    spanish: "¿Tengo que hacer una cita para mañana?",
    english: "Do I need to make an appointment for tomorrow?",
    category: "healthcare",
    difficulty: 3,
    pronunciation: "TEHN-goh keh ah-THEHR oo-nah THEE-tah PAH-rah mah-NYAH-nah",
    example: "¿Tengo que hacer una cita para mañana o puedo llamar por teléfono?",
    level: "intermediate"
  },

  // ===== SHOPPING / COMMERCE =====
  {
    id: "christy-shopping-1",
    spanish: "¿Dónde es la mejor tienda de ropa?",
    english: "Where is the best clothing store?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "DOHN-deh ehs lah meh-HOR tee-EHN-dah deh ROH-pah",
    example: "Busco ropa nueva. ¿Dónde es la mejor tienda de ropa?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-2",
    spanish: "¿Cuánto cuesta este artículo?",
    english: "How much does this item cost?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "KWAHN-toh KWEH-stah EHS-teh ahr-TEE-koo-loh",
    example: "Este vestido es bonito. ¿Cuánto cuesta este artículo?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-3",
    spanish: "¿Hay una talla más grande?",
    english: "Is there a bigger size?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "AHY oo-nah TAH-yah mahs GRAHN-deh",
    example: "Este vestido es muy pequeño. ¿Hay una talla más grande?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-4",
    spanish: "¿Puedo probármelo?",
    english: "Can I try it on?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "PWEH-doh proh-BAHR-meh-loh",
    example: "Me encanta este vestido. ¿Puedo probármelo?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-5",
    spanish: "¿Hacéis descuento si compro dos?",
    english: "Do you give a discount if I buy two?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "ah-THEH-ehs dehs-KWEHN-toh see KOHM-proh dohs",
    example: "Estos suéteres me encantan. ¿Hacéis descuento si compro dos?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-6",
    spanish: "¿Dónde puedo devolver esto?",
    english: "Where can I return this?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "DOHN-deh PWEH-doh deh-vohl-VEHR EHS-toh",
    example: "Cambié de idea sobre esta compra. ¿Dónde puedo devolver esto?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-7",
    spanish: "¿Cuál es la política de devoluciones?",
    english: "What is the return policy?",
    category: "shopping",
    difficulty: 4,
    pronunciation: "kwahl ehs lah poh-LEE-tee-kah deh deh-voh-loo-see-OH-nehs",
    example: "Quiero saber: ¿Cuál es la política de devoluciones?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-8",
    spanish: "¿Dónde puedo hacer las compras de comida?",
    english: "Where can I go grocery shopping?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "DOHN-deh PWEH-doh ah-THEHR lahs KOHM-prahs deh koh-MEE-dah",
    example: "Soy nueva en la ciudad. ¿Dónde puedo hacer las compras de comida?",
    level: "intermediate"
  },
  {
    id: "christy-shopping-9",
    spanish: "Este producto es de buena calidad",
    english: "This product is good quality",
    category: "shopping",
    difficulty: 3,
    pronunciation: "EHS-teh proh-DOCK-toh ehs deh BWEH-nah kah-lee-DAHD",
    example: "Este producto es de buena calidad y el precio es razonable.",
    level: "intermediate"
  },
  {
    id: "christy-shopping-10",
    spanish: "¿Tienen esta marca?",
    english: "Do you have this brand?",
    category: "shopping",
    difficulty: 3,
    pronunciation: "tee-EH-nehn EHS-tah MAHR-kah",
    example: "Busco esta marca que es muy buena. ¿Tienen esta marca?",
    level: "intermediate"
  },

  // ===== FEELINGS / EMOTIONS (ADVANCED) =====
  {
    id: "christy-feelings-1",
    spanish: "Estoy un poco abrumada",
    english: "I'm a bit overwhelmed",
    category: "feelings",
    difficulty: 3,
    pronunciation: "ehs-TOY oon POH-koh ah-broo-MAH-dah",
    example: "Hay mucho que hacer. Estoy un poco abrumada.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-2",
    spanish: "Siento nostalgia por mi país",
    english: "I feel homesick for my country",
    category: "feelings",
    difficulty: 3,
    pronunciation: "see-EHN-toh noh-STAHL-hee-ah por mee pah-EES",
    example: "Siento nostalgia por mi país y mi familia.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-3",
    spanish: "Me siento mejor ahora",
    english: "I feel better now",
    category: "feelings",
    difficulty: 3,
    pronunciation: "meh see-EHN-toh meh-HOR ah-OH-rah",
    example: "Después de descansar, me siento mejor ahora.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-4",
    spanish: "Estoy orgullosa de mis hijos",
    english: "I'm proud of my children",
    category: "feelings",
    difficulty: 3,
    pronunciation: "ehs-TOY or-goo-YOH-sah deh mees EE-hohs",
    example: "Mis hijos hablan español perfectamente. Estoy orgullosa.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-5",
    spanish: "Tengo confianza en ti",
    english: "I trust you",
    category: "feelings",
    difficulty: 3,
    pronunciation: "TEHN-goh kohn-fee-AHN-sah ehn tee",
    example: "Has sido muy honesto conmigo. Tengo confianza en ti.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-6",
    spanish: "Me preocupa la situación",
    english: "I'm worried about the situation",
    category: "feelings",
    difficulty: 3,
    pronunciation: "meh preh-oh-KOO-pah lah see-too-ah-see-OHN",
    example: "Todavía no tenemos casa. Me preocupa la situación.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-7",
    spanish: "Estoy agradecida por tu ayuda",
    english: "I'm grateful for your help",
    category: "feelings",
    difficulty: 3,
    pronunciation: "ehs-TOY ah-grah-deh-THEE-dah por too ah-YOO-dah",
    example: "Sin ti, no habría podido hacerlo. Estoy agradecida.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-8",
    spanish: "Me irrita cuando la gente es ruda",
    english: "It irritates me when people are rude",
    category: "feelings",
    difficulty: 3,
    pronunciation: "meh ee-RREE-tah KWAHN-doh lah HEHN-teh ehs ROO-dah",
    example: "Me irrita cuando la gente es ruda sin razón.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-9",
    spanish: "Estoy fascinada por la cultura aquí",
    english: "I'm fascinated by the culture here",
    category: "feelings",
    difficulty: 3,
    pronunciation: "ehs-TOY fahs-thee-NAH-dah por lah KOOL-too-rah ah-KEE",
    example: "He aprendido mucho. Estoy fascinada por la cultura aquí.",
    level: "intermediate"
  },
  {
    id: "christy-feelings-10",
    spanish: "Espero que todo resulte bien",
    english: "I hope everything turns out well",
    category: "feelings",
    difficulty: 3,
    pronunciation: "ehs-PEH-roh keh TOH-doh reh-sool-TEH bee-EHN",
    example: "La mudanza es complicada, pero espero que todo resulte bien.",
    level: "intermediate"
  }
];
