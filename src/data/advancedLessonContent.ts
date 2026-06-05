import { LessonTerm } from "../types";

/**
 * Advanced Spanish curriculum for Shannon — real-world Spain conversations
 * Focus: Castilian es-ES, practical scenarios for independent living
 */

export const ADVANCED_LESSON_CONTENT: LessonTerm[] = [
  // ===== HOUSING (Vivienda) =====
  { id: "adv-housing-1", spanish: "Busco un piso en alquiler", english: "I'm looking for an apartment to rent", pronunciation: "BUS-ko oon PEE-so en al-KE-eel", category: "housing", difficulty: 4,
    level: "advanced-spain", example: "Busco un piso en alquiler en el centro." },
  { id: "adv-housing-2", spanish: "¿Cuál es el precio mensual?", english: "What is the monthly rent?", pronunciation: "KWAL es el PRE-see-oh men-SOO-ahl", category: "housing", difficulty: 3,
    level: "advanced-spain", example: "¿Cuál es el precio mensual del piso?" },
  { id: "adv-housing-3", spanish: "¿Está incluida la factura de la luz?", english: "Is the electricity bill included?", pronunciation: "es-TA in-kloo-EE-dah lah fak-TOO-rah deh lah loos", category: "housing", difficulty: 4,
    level: "advanced-spain", example: "¿Está incluida la factura de la luz en el alquiler?" },
  { id: "adv-housing-4", spanish: "Necesito un contrato de alquiler", english: "I need a rental contract", pronunciation: "neh-seh-SEE-toh oon kon-TRAH-toh deh al-KE-eel", category: "housing", difficulty: 3,
    level: "advanced-spain", example: "Necesito un contrato de alquiler antes de mudarme." },
  { id: "adv-housing-5", spanish: "¿Hay depósito de seguridad?", english: "Is there a security deposit?", pronunciation: "AH-ee deh-PO-see-toh deh seh-goo-ree-DAHD", category: "housing", difficulty: 4,
    level: "advanced-spain", example: "¿Hay depósito de seguridad que debo pagar?" },

  // ===== BANKING (Banca) =====
  { id: "adv-banking-1", spanish: "Quiero abrir una cuenta corriente", english: "I want to open a checking account", pronunciation: "kee-EH-roh ah-BREER OO-nah KWEN-tah ko-ree-EN-teh", category: "banking", difficulty: 4,
    level: "advanced-spain", example: "Quiero abrir una cuenta corriente en este banco." },
  { id: "adv-banking-2", spanish: "¿Cuál es el saldo de mi cuenta?", english: "What is my account balance?", pronunciation: "KWAL es el SAHL-doh deh mee KWEN-tah", category: "banking", difficulty: 3,
    level: "advanced-spain", example: "¿Cuál es el saldo de mi cuenta corriente?" },
  { id: "adv-banking-3", spanish: "Necesito hacer una transferencia", english: "I need to make a transfer", pronunciation: "neh-seh-SEE-toh ah-SER OO-nah trans-feh-REN-see-ah", category: "banking", difficulty: 4,
    level: "advanced-spain", example: "Necesito hacer una transferencia a mi familia." },
  { id: "adv-banking-4", spanish: "¿Cuál es el código de la sucursal?", english: "What is the branch code?", pronunciation: "KWAL es el KO-dee-goh deh lah soo-koor-SAHL", category: "banking", difficulty: 4,
    level: "advanced-spain", example: "¿Cuál es el código de la sucursal de Madrid?" },
  { id: "adv-banking-5", spanish: "Quiero solicitar una tarjeta de crédito", english: "I want to apply for a credit card", pronunciation: "kee-EH-roh so-lee-see-TAHR OO-nah tar-HEH-tah deh KREH-dee-toh", category: "banking", difficulty: 4,
    level: "advanced-spain", example: "Quiero solicitar una tarjeta de crédito para compras." },

  // ===== HEALTHCARE (Sanidad) =====
  { id: "adv-health-1", spanish: "Necesito registrarme con un médico de cabecera", english: "I need to register with a primary care doctor", pronunciation: "neh-seh-SEE-toh reh-hees-TRAHR-meh kon oon MEH-dee-koh deh kah-beh-SEH-rah", category: "healthcare", difficulty: 4,
    level: "advanced-spain", example: "Necesito registrarme con un médico de cabecera." },
  { id: "adv-health-2", spanish: "¿Cuáles son mis derechos de sanidad?", english: "What are my healthcare rights?", pronunciation: "KWAH-les sohn mees deh-REH-chos deh sah-nee-DAHD", category: "healthcare", difficulty: 4,
    level: "advanced-spain", example: "¿Cuáles son mis derechos de sanidad como residente?" },
  { id: "adv-health-3", spanish: "Tengo dolor de cabeza persistente", english: "I have persistent headaches", pronunciation: "TEN-goh doh-LOR deh kah-BEH-sah pehr-sees-TEN-teh", category: "healthcare", difficulty: 3,
    level: "advanced-spain", example: "Tengo dolor de cabeza persistente desde hace una semana." },
  { id: "adv-health-4", spanish: "¿Necesito una receta para este medicamento?", english: "Do I need a prescription for this medicine?", pronunciation: "neh-seh-SEE-toh OO-nah reh-SEH-tah PAH-rah ES-teh meh-dee-kah-MEN-toh", category: "healthcare", difficulty: 4,
    level: "advanced-spain", example: "¿Necesito una receta para este medicamento?" },
  { id: "adv-health-5", spanish: "¿Cuál es la farmacia más cercana?", english: "What is the nearest pharmacy?", pronunciation: "KWAL es lah far-MAH-see-ah mahs sehr-KAH-nah", category: "healthcare", difficulty: 3,
    level: "advanced-spain", example: "¿Cuál es la farmacia más cercana de aquí?" },

  // ===== DINING (Restaurantes) =====
  { id: "adv-dining-1", spanish: "¿Cuáles son los platos típicos de la región?", english: "What are the regional specialties?", pronunciation: "KWAH-les sohn lohs PLAH-tohs TEE-pee-kohs deh lah reh-hee-OHN", category: "dining", difficulty: 4,
    level: "advanced-spain", example: "¿Cuáles son los platos típicos de esta región?" },
  { id: "adv-dining-2", spanish: "Quisiera una mesa para cuatro personas", english: "I'd like a table for four", pronunciation: "kee-see-EH-rah OO-nah MEH-sah PAH-rah KWAH-troh pehr-SOH-nahs", category: "dining", difficulty: 3,
    level: "advanced-spain", example: "Quisiera una mesa para cuatro personas." },
  { id: "adv-dining-3", spanish: "¿Tiene opciones sin gluten?", english: "Do you have gluten-free options?", pronunciation: "tee-EH-neh op-see-OH-nes seen GLOO-ten", category: "dining", difficulty: 4,
    level: "advanced-spain", example: "¿Tiene opciones sin gluten para mi esposa?" },
  { id: "adv-dining-4", spanish: "La comida está fría", english: "The food is cold", pronunciation: "lah ko-MEE-dah es-TAH FREE-ah", category: "dining", difficulty: 2,
    level: "advanced-spain", example: "La comida está fría, ¿puedo cambiarla?" },
  { id: "adv-dining-5", spanish: "¿Puedo pagar con tarjeta?", english: "Can I pay with a card?", pronunciation: "PWEH-doh PAH-gahr kon tar-HEH-tah", category: "dining", difficulty: 2,
    level: "advanced-spain", example: "¿Puedo pagar con tarjeta de crédito?" },

  // ===== SHOPPING (Compras) =====
  { id: "adv-shopping-1", spanish: "¿Cuál es el precio por kilo?", english: "What is the price per kilogram?", pronunciation: "KWAL es el PRE-see-oh por KEE-loh", category: "shopping", difficulty: 3,
    level: "advanced-spain", example: "¿Cuál es el precio por kilo de manzanas?" },
  { id: "adv-shopping-2", spanish: "¿Aceptan tarjetas de débito?", english: "Do you accept debit cards?", pronunciation: "ah-SEP-tahn tar-HEH-tahs deh DEH-bee-toh", category: "shopping", difficulty: 3,
    level: "advanced-spain", example: "¿Aceptan tarjetas de débito en esta tienda?" },
  { id: "adv-shopping-3", spanish: "¿Hay descuento por cantidad?", english: "Is there a discount for bulk?", pronunciation: "AH-ee des-KWEN-toh por kahn-tee-DAHD", category: "shopping", difficulty: 4,
    level: "advanced-spain", example: "¿Hay descuento por cantidad si compro diez botellas?" },
  { id: "adv-shopping-4", spanish: "¿Cuándo llega el siguiente envío?", english: "When is the next delivery?", pronunciation: "KWAHN-doh YEH-gah el see-GWEN-teh en-VEE-oh", category: "shopping", difficulty: 4,
    level: "advanced-spain", example: "¿Cuándo llega el siguiente envío de mi pedido?" },
  { id: "adv-shopping-5", spanish: "Quisiera cambiar este artículo", english: "I'd like to exchange this item", pronunciation: "kee-see-EH-rah kahm-bee-AHR ES-teh ahr-TEE-koo-loh", category: "shopping", difficulty: 3,
    level: "advanced-spain", example: "Quisiera cambiar este artículo por otro tamaño." },

  // ===== UTILITIES & BUREAUCRACY (Trámites) =====
  { id: "adv-admin-1", spanish: "Necesito renovar mi permiso de residencia", english: "I need to renew my residence permit", pronunciation: "neh-seh-SEE-toh reh-noh-VAHR mee per-MEE-soh deh reh-see-DEN-see-ah", category: "admin", difficulty: 4,
    level: "advanced-spain", example: "Necesito renovar mi permiso de residencia antes de que expire." },
  { id: "adv-admin-2", spanish: "¿Cuáles son los impuestos sobre la propiedad?", english: "What are the property taxes?", pronunciation: "KWAH-les sohn lohs eem-PWES-tohs SOH-breh lah proh-pee-eh-DAHD", category: "admin", difficulty: 4,
    level: "advanced-spain", example: "¿Cuáles son los impuestos sobre la propiedad en Madrid?" },
  { id: "adv-admin-3", spanish: "Necesito una cita con la policía local", english: "I need an appointment with the local police", pronunciation: "neh-seh-SEE-toh OO-nah SEE-tah kon lah poh-lee-SEE-ah loh-KAHL", category: "admin", difficulty: 4,
    level: "advanced-spain", example: "Necesito una cita con la policía local." },
  { id: "adv-admin-4", spanish: "¿Cómo solicito un número de identidad?", english: "How do I apply for an ID number?", pronunciation: "KO-moh soh-lee-SEE-toh oon NOO-meh-roh deh ee-den-tee-DAHD", category: "admin", difficulty: 4,
    level: "advanced-spain", example: "¿Cómo solicito un número de identidad como residente?" },
  { id: "adv-admin-5", spanish: "Tengo un problema con la factura de agua", english: "I have an issue with my water bill", pronunciation: "TEN-goh oon proh-BLEH-mah kon lah fak-TOO-rah deh AH-wah", category: "admin", difficulty: 4,
    level: "advanced-spain", example: "Tengo un problema con la factura de agua." },

  // ===== SOCIAL & CULTURE (Cultura) =====
  { id: "adv-culture-1", spanish: "¿Cuáles son las costumbres locales?", english: "What are the local customs?", pronunciation: "KWAH-les sohn lahs kos-TOOM-brehs loh-KAH-les", category: "culture", difficulty: 4,
    level: "advanced-spain", example: "¿Cuáles son las costumbres locales de esta región?" },
  { id: "adv-culture-2", spanish: "¿Hay festivales en esta región?", english: "Are there festivals in this region?", pronunciation: "AH-ee fes-tee-VAH-les en ES-tah reh-hee-OHN", category: "culture", difficulty: 3,
    level: "advanced-spain", example: "¿Hay festivales en esta región este año?" },
  { id: "adv-culture-3", spanish: "¿Cuál es la mejor manera de conocer gente local?", english: "What's the best way to meet locals?", pronunciation: "KWAL es lah meh-HOR mah-NEH-rah deh koh-noh-SER HEN-teh loh-KAHL", category: "culture", difficulty: 4,
    level: "advanced-spain", example: "¿Cuál es la mejor manera de conocer gente local?" },
  { id: "adv-culture-4", spanish: "¿Hablan otro idioma aquí?", english: "Do they speak another language here?", pronunciation: "AH-blahn OH-troh ee-dee-OH-mah ah-KEE", category: "culture", difficulty: 3,
    level: "advanced-spain", example: "¿Hablan catalán aquí en Barcelona?" },
  { id: "adv-culture-5", spanish: "¿Cuáles son los mejores bares de vinos?", english: "What are the best wine bars?", pronunciation: "KWAH-les sohn lohs meh-HOH-res BAH-res deh VEE-nos", category: "culture", difficulty: 3,
    level: "advanced-spain", example: "¿Cuáles son los mejores bares de vinos de la ciudad?" },
];
