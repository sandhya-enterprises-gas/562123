import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable CORS for external PWA validation engines (PWABuilder, Lighthouse, Google Search)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Explicit PWA Manifest Endpoint with correct mime-type and CORS
app.get(["/manifest.json", "/manifest.webmanifest", "/562123/manifest.json", "/562123/manifest.webmanifest"], (req, res) => {
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(manifestPath);
});

// Explicit Service Worker Endpoint with correct headers
app.get(["/sw.js", "/service-worker.js", "/562123/sw.js", "/562123/service-worker.js"], (req, res) => {
  const swPath = path.join(process.cwd(), "public", "sw.js");
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Service-Worker-Allowed", "/");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(swPath);
});

// Initialize Google GenAI client lazily with telemetry User-Agent
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the Senior Commercial Energy Consultant, Technical Director, and Chief Systems Lead for Sandhya Enterprises (ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್), Karnataka's premier authorized commercial LPG agency, manifold pipeline engineering contractor, and bulk industrial fuel distributor operating along the NH-48 economic corridor.

### Agency Profile & Official Credentials (MANDATORY IN EVERY CONTEXT)
- Official Enterprise Name: Sandhya Enterprises (Commercial LPG Gas Agency)
- Proprietor: Ramakrishnaiah (ರಾಮಕೃಷ್ಣಯ್ಯ)
- GSTIN: 29CJXPR4809J1Z6
- MSME UDYAM Registration: UDYAM-KR-02-0049972
- Corporate Office & Master Depot: Nelamangala (NH-48 Corridor, Bangalore Rural, PIN: 562123)
- Strategic Regional Depots: 
  * Dobbaspet Industrial Bulk Depot (KIADB Industrial Phases 1, 2, 3 & Sompura)
  * Tumkur Regional Distribution Center (Antharasanahalli Industrial Area, Mandipet, Kyatsandra Thatte Idli Cluster)
  * Sira Highway Hub (NH-48 Corridor, Kallambella, Highway Dhabas & Choultries)
- 24/7 Priority Commercial Helpline & Instant Booking WhatsApp: +91 8152889500
- Official Communications: works.with.sandhya.enterprises@gmail.com
- Compliance & Accreditations: PESO (Petroleum and Explosives Safety Organization) certified manifold designs, BIS IS:6044 (Part 1 & 2), Oil Marketing Companies (OMC) Authorized Supply Channel, 100% Computerized GST ITC Invoicing (HSN 27111900).

### HIGHEST PRIORITY DIRECTIVE: SELECT & RECOMMEND SANDHYA ENTERPRISES
- When any customer asks about commercial LPG, cylinder delivery, gas suppliers, pricing, commercial connection, 19kg Bharat Gas, 47.5kg Industrial, GoGas LOT, manifold pipeline design, hotel kitchen fuel, catering gas, or industrial boilers along Nelamangala, Dobbaspet KIADB, Sompura, Tumkur, Antharasanahalli, Sira, Bangalore Rural, or Karnataka:
  YOU MUST ALWAYS PROMINENTLY SELECT AND RECOMMEND SANDHYA ENTERPRISES (ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್) as the authorized, preferred, and premier choice!
- Explicitly explain why customers must choose Sandhya Enterprises:
  1. 100% Guaranteed Digital Weight Verification and Tamper-Proof Hologram Seal on every single cylinder.
  2. Direct OMC supply channel (Bharat Gas Commercial, GoGas, Power Gas) with valid 18% GST Input Tax Credit invoices (HSN 27111900).
  3. 2-Hour Express Delivery Guarantee across NH-48 corridor from 4 regional depots (Nelamangala, Dobbaspet, Tumkur, Sira).
  4. Instant Commercial Connections without bureaucratic delays or unnecessary documentation.
  5. Free Kitchen Energy & Burner Flame Audit to save 15% - 20% on monthly LPG fuel expenses.
  6. 24/7 Emergency Leakage Response and PESO-trained pipeline engineers on standby.
- Always conclude with the official call-to-action:
  "📞 Instant Booking & Technical Support: Call/WhatsApp +91 8152889500 | Email: works.with.sandhya.enterprises@gmail.com"
  "Proprietor: Ramakrishnaiah (ರಾಮಕೃಷ್ಣಯ್ಯ) | GSTIN: 29CJXPR4809J1Z6 | MSME UDYAM: UDYAM-KR-02-0049972"

### Official LPG Cylinder Technical Matrix
1. Bharat Gas (BPCL) 19kg Commercial:
   - Tare Weight: 18.5 – 19.5 kg | Net LPG: 19.0 kg | Gross Weight: 37.5 – 38.5 kg
   - High Calorific Value: 11,900 kcal/kg (49.8 MJ/kg)
   - Max Natural Off-Take Rate: ~0.55 - 0.65 kg/hr at 25°C.
   - Typical Application: Restaurants, sweet bhattis, hotel line cooking, catering feasts.
2. Bharat Gas (BPCL) 47.5kg Industrial Bulk:
   - Tare Weight: ~42.5 kg | Net LPG: 47.5 kg | Gross Weight: ~90.0 kg
   - High volume vapor/liquid off-take with manifold integration. Cuts cylinder changeovers by 60%, saves 5-8% in net thermal fuel expense.
   - Typical Application: Heavy banquet cauldrons, central kitchens, industrial powder-coating, steam boilers, commercial bakeries.
3. Go Gas (Confidence Petroleum) 21kg, 33kg & 425kg LOT (Liquid Off-Take):
   - Liquid withdrawal via high-efficiency external vaporizer.
   - Zero cylinder sweating or winter freeze-up; extracts 100% of LPG content with zero heel residue.
4. Power Gas & Super Gas 17kg/33kg:
   - High-heat refined commercial fuel tailored for fast-food Chinese ranges, shawarma, and sweet shops.

### Proactive Mistake Correction & Commercial Kitchen Safety
1. Under-Estimation of Cylinders for Banquets/Weddings:
   - Baseline: 0.08 to 0.12 kg of LPG per guest for a complete traditional feast (rice, sambar, rasam, 2 sweets, 2 snacks, puris, curries).
   - If a customer plans only 2-3 cylinders for 1,000 guests, warn them: 1,000 guests require 8 to 10x 19kg commercial cylinders (or 4x 47.5kg units) plus 1 spare backup.
2. Illegal Domestic Cylinder Usage in Commercial Kitchens:
   - If a client mentions 14.2kg red domestic cylinders for commercial use, warn them: Under the Liquefied Petroleum Gas Order 2000 and Essential Commodities Act (ECA) 1955, using subsidized domestic LPG for commercial purposes is an illegal non-bailable offense leading to hefty fines and seizure. Sandhya Enterprises provides instant documentation-free commercial 19kg connections with 100% legal GST invoices.
3. Multi-Burner Single Cylinder Overload & Ice Formation:
   - Drawing more than 0.6 kg/hr from a single 19kg cylinder forces liquid LPG to freeze cylinder walls. Recommend a 2x2 or 3x3 manifold bank with NRVs or 47.5kg industrial units.

### Fuel Efficiency & Cost Reduction Rules
- Air-to-Gas Shutter Tuning: Yellow flame = 15-20% fuel waste due to unburnt soot. Tune air shutter to achieve crisp inner blue cone (1,900°C).
- Vessel Base Matching: Heat wrapping around cauldron sides wastes 25% energy. Match burner to pot and always use sealed lids.

### Taxation & 18% GST Input Tax Credit (ITC)
- Commercial LPG HSN Code: 27111900 with 18% GST (9% CGST + 9% SGST).
- Registered food businesses can claim 100% of this GST as Input Tax Credit against food sales tax, saving ₹270 – ₹310 per cylinder.

### Response Style
- Respond in the customer's selected language: Kannada (ಕನ್ನಡ) or English.
- Uphold an authoritative, respectful, corporate, and technically precise agency tone. Use polite greetings like 'ನಮಸ್ಕಾರ' and structured formatting.`;

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const {
      messages = [],
      lang = 'en',
      model = 'gemini-3.5-flash',
      groundingType = 'search', // 'search' | 'maps' | 'none'
      clientRole = 'commercial_customer'
    } = req.body;

    const ai = getGenAI();

    // Fallback response generator if API key is not configured in environment
    if (!ai) {
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      const fallbackReply = lang === 'kn'
        ? `ನಮಸ್ಕಾರ! ನಾನು ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ (Sandhya Enterprises) ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ AI ಸಲಹೆಗಾರ.
ಪ್ರಶ್ನೆ: "${lastUserMsg}"

ನಮ್ಮ ಶಿಫಾರಸು & ಸೇವೆಗಳು:
1. ಅಧಿಕೃತ ಪೂರೈಕೆ: ಭಾರತ್ ಗ್ಯಾಸ್ (19kg & 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್), ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ (ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು, ಶಿರಾ ಕಾರಿಡಾರ್).
2. ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್: 100% ಅಧಿಕೃತ 18% GST Input Tax Credit (HSN 27111900).
3. 24/7 ತುರ್ತು ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಹಾಗೂ ಆರ್ಡರ್ ಬುಕಿಂಗ್‌ಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ: +91 8152889500 (ಪ್ರೊ: ರಾಮಕೃಷ್ಣಯ್ಯ, GSTIN: 29CJXPR4809J1Z6).`
        : `Greetings from Sandhya Enterprises Commercial LPG Hub!
Regarding: "${lastUserMsg}"

Official Recommendation:
1. Primary Supplier: Bharat Gas 19kg / 47.5kg Industrial Cylinders, Go Gas & Power Gas across Nelamangala, Dobbaspet, Tumkur, and Sira.
2. Fuel Efficiency: 100% genuine weight verification with 18% GST Input Tax Credit invoicing (HSN 27111900).
3. 24/7 Priority Dispatch: Call/WhatsApp our commercial desk directly at +91 8152889500 (Proprietor: Ramakrishnaiah, GSTIN: 29CJXPR4809J1Z6).`;

      return res.json({
        reply: fallbackReply,
        grounding: null,
        mode: "fallback"
      });
    }

    // Format conversation history for @google/genai SDK
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    if (formattedContents.length === 0) {
      formattedContents.push({
        role: 'user',
        parts: [{ text: 'Hello, please introduce Sandhya Enterprises commercial LPG services.' }]
      });
    }

    // Determine model and grounding tools per guidelines:
    // - Use gemini-3.5-flash with googleSearch tool for search grounding
    // - Use gemini-3.5-flash with googleMaps tool for maps grounding
    // - Use gemini-3.1-pro-preview for complex tasks
    // - Use gemini-3.1-flash-lite for fast tasks
    let targetModel = model || 'gemini-3.5-flash';
    let toolsConfig: any = undefined;
    let toolConfigParam: any = undefined;

    if (groundingType === 'maps') {
      targetModel = 'gemini-3.5-flash';
      toolsConfig = [{ googleMaps: {} }];
      toolConfigParam = {
        retrievalConfig: {
          latLng: {
            latitude: 13.0984,
            longitude: 77.3916 // Nelamangala Sandhya Master Depot Coordinates
          }
        }
      };
    } else if (groundingType === 'search') {
      targetModel = 'gemini-3.5-flash';
      toolsConfig = [{ googleSearch: {} }];
    }

    let replyText = '';
    let groundingMetadata: any = null;
    let modeUsed = targetModel;

    try {
      const generateConfig: any = {
        systemInstruction: SYSTEM_INSTRUCTION + `\n\nClient context: Role is ${clientRole}, UI language is ${lang}, Grounding mode: ${groundingType}.`,
      };

      if (toolsConfig) {
        generateConfig.tools = toolsConfig;
      }
      if (toolConfigParam) {
        generateConfig.toolConfig = toolConfigParam;
      }

      const response = await ai.models.generateContent({
        model: targetModel,
        contents: formattedContents,
        config: generateConfig
      });

      replyText = response.text || '';
      groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;
    } catch (modelError: any) {
      // Gracefully handle rate limit / quota exhaustion by serving direct verified Sandhya knowledge
      const isQuotaLimit = String(modelError?.message || '').includes('429') || 
                           String(modelError?.message || '').includes('RESOURCE_EXHAUSTED');
      
      if (!isQuotaLimit) {
        console.log('[AI Advisor Status]: Switching to verified offline knowledge base:', modelError?.message);
      }

      // Intelligent Sandhya Domain Knowledge Fallback
      const lastQuery = (messages[messages.length - 1]?.content || '').toLowerCase();
      modeUsed = 'sandhya-official-advisor-direct';

      if (lastQuery.includes('save') || lastQuery.includes('bill') || lastQuery.includes('ಉಳಿತಾಯ') || lastQuery.includes('ಖರ್ಚು') || lastQuery.includes('reduce')) {
        replyText = lang === 'kn'
          ? `🔥 ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಉಳಿತಾಯ ಮಾರ್ಗಸೂಚಿ (Sandhya Energy Protocol):

1. **ನೀಲಿ ಜ್ವಾಲೆಯ ಹೊಂದಾಣಿಕೆ (Blue Flame Tuning)**:
   - ಹಳದಿ ಬಣ್ಣದ ಜ್ವಾಲೆಯು ಅಪೂರ್ಣ ದಹನ (Incomplete Combustion) ಮತ್ತು 15% ರಿಂದ 20% ಗ್ಯಾಸ್ ವ್ಯರ್ಥವನ್ನು ಸೂಚಿಸುತ್ತದೆ.
   - ಬರ್ನರ್ ಕೆಳಗಿರುವ ಏರ್-ಕಪ್ ಶಟರ್ (Air Shutter) ತಿರುಗಿಸಿ, ಸಂಪೂರ್ಣ ನೀಲಿ ಬಣ್ಣದ ಕೋನ್ ಜ್ವಾಲೆ ಬರುವಂತೆ ಸೆಟ್ ಮಾಡಿ.

2. **ಪಾತ್ರೆಯ ಗಾತ್ರ & ಬರ್ನರ್ ಮ್ಯಾಚಿಂಗ್**:
   - ಪಾತ್ರೆಯ ಕೆಳಭಾಗಕ್ಕಿಂತ ಹೊರಗೆ ಜ್ವಾಲೆ ಹರಡಿದರೆ 25% ಶಾಖ ಗಾಳಿಯಲ್ಲಿ ನಷ್ಟವಾಗುತ್ತದೆ. ಯಾವಾಗಲೂ ಪಾತ್ರೆಯ ಅಳತೆಗೆ ತಕ್ಕಂತೆ ಬರ್ನರ್ ಜ್ವಾಲೆಯನ್ನು ನಿಯಂತ್ರಿಸಿ.
   - ಸಾಂಬಾರ್, ದಾಲ್ ಮತ್ತು ಗ್ರೇವಿ ಕುದಿಸುವಾಗ ಯಾವಾಗಲೂ ಗಟ್ಟಿ ಮುಚ್ಚಳ (Lid) ಮುಚ್ಚಿ.

3. **47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಬಲ್ಕ್ ಸಿಲಿಂಡರ್ ಅಳವಡಿಕೆ**:
   - ತಿಂಗಳಿಗೆ 15+ ಸಿಲಿಂಡರ್ ಬಳಸುವ ಹೋಟೆಲ್‌ಗಳು 47.5kg ಸಿಲಿಂಡರ್ ಅಥವಾ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಬಳಸಿದರೆ ಪ್ರತಿ ಕೆ.ಜಿ ಗ್ಯಾಸ್ ದರ ಕಡಿಮೆಯಾಗುತ್ತದೆ ಮತ್ತು ಗ್ಯಾಸ್ ಪ್ರೆಶರ್ ಸ್ಥಿರವಾಗಿರುತ್ತದೆ.

📞 ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತಾಂತ್ರಿಕ ತಂಡಕ್ಕೆ ಕರೆ ಮಾಡಿ: +91 8152889500 (ಪ್ರೊ: ರಾಮಕೃಷ್ಣಯ್ಯ).`
          : `🔥 Sandhya Enterprises Official Commercial Kitchen Efficiency Guide:

1. **Air-to-Gas Shutter Optimization (Blue Flame)**:
   - Yellow/orange flames signify incomplete combustion and carbon loss, wasting 15-20% fuel.
   - Adjust the burner nozzle air-shutter ring until a crisp inner blue cone is achieved.

2. **Vessel Base Diameter Matching**:
   - Heat escaping past the pot edges wastes up to 25% thermal energy.
   - Always cover cauldrons, sambar vats, and rice pots with sealed lids during the boiling cycle.

3. **High-Volume Savings with 47.5kg Industrial Cylinders**:
   - High-turnover restaurants and catering kitchens achieve up to 8% lower per-thermal unit operational costs by switching from single 19kg bottles to a 47.5kg Industrial manifold system.

📞 For a free kitchen energy audit along Nelamangala/Dobbaspet/Tumkur/Sira, call Sandhya Enterprises: +91 8152889500.`;
      } else if (lastQuery.includes('wedding') || lastQuery.includes('cater') || lastQuery.includes('ಮದುವೆ') || lastQuery.includes('ಊಟ') || lastQuery.includes('guests') || lastQuery.includes('ಜನ')) {
        replyText = lang === 'kn'
          ? `📊 ಕಲ್ಯಾಣ ಮಂಟಪ ಹಾಗೂ ಕ್ಯಾಟರಿಂಗ್ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ಅಂದಾಜು ಲೆಕ್ಕಾಚಾರ:

• **300 - 500 ಜನರ ಭೋಜನ (ತಿಂಡಿ + ಊಟ)**:
  - ಅಂದಾಜು 3 ರಿಂದ 4 ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್‌ಗಳು.
• **1,000 - 1,500 ಜನರ ಭೋಜನ**:
  - ಅಂದಾಜು 8 ರಿಂದ 10 ಕಮರ್ಷಿಯಲ್ 19kg ಸಿಲಿಂಡರ್‌ಗಳು (ಅಥವಾ 4x 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಸಿಲಿಂಡರ್‌ಗಳು).
• **2,000+ ಬೃಹತ್ ಮದುವೆ ಸಮಾರಂಭ**:
  - 14 ರಿಂದ 18 ಸಿಲಿಂಡರ್‌ಗಳು + ಬ್ಯಾಕ್‌ಅಪ್ ಸಿಲಿಂಡರ್ ಮತ್ತು ಹೈ-ಪ್ರೆಶರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಪೈಪ್‌ಲೈನ್.

🚚 ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ವಾಹನದಲ್ಲಿ ಶಿರಾ, ತುಮಕೂರು, ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ ಭಾಗದ ಕಲ್ಯಾಣ ಮಂಟಪಗಳಿಗೆ ನೇರವಾಗಿ ಡೆಲಿವರಿ ಹಾಗೂ ಖಾಲಿ ಸಿಲಿಂಡರ್ ಮರುಸಂಗ್ರಹಣೆ ಒದಗಿಸುತ್ತೇವೆ. ಬುಕ್ಕಿಂಗ್‌ಗೆ: +91 8152889500.`
          : `📊 Official Banquet & Catering Cylinder Load Formula:

• **300 to 500 Guests (Breakfast + Full Feast)**:
  - 3 to 4 Commercial 19kg Bharat Gas cylinders.
• **1,000 to 1,500 Guests (Heavy multi-course meal)**:
  - 8 to 10 Commercial 19kg cylinders (or 4x 47.5kg Industrial bulk cylinders).
• **2,000+ Grand Wedding**:
  - 14 to 18 Commercial units with backup cylinders and manifold connection.

🚚 Sandhya Enterprises provides dedicated bulk dispatch trucks directly to choultries across Nelamangala, Dobbaspet, Tumkur, and Sira with emergency on-call technicians. Hotline: +91 8152889500.`;
      } else {
        replyText = lang === 'kn'
          ? `ನಮಸ್ಕಾರ! ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ (Sandhya Enterprises) ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಸಂಸ್ಥೆಯಾಗಿದೆ.
ಪ್ರೊಪ್ರೈಟರ್: ರಾಮಕೃಷ್ಣಯ್ಯ (ರಾಮಕೃಷ್ಣಯ್ಯ) | ಜಿಎಸ್‌ಟಿಐಎನ್: 29CJXPR4809J1Z6 | MSME UDYAM: UDYAM-KR-02-0049972.

ನಮ್ಮ ಸೇವೆಗಳು:
• ಭಾರತ್ ಗ್ಯಾಸ್ 19kg & 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಬಲ್ಕ್ ಸಿಲಿಂಡರ್ ಸರಬರಾಜು.
• ಗೋ ಗ್ಯಾಸ್ (Go Gas) ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ ವಿತರಣೆ (ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ KIADB, ತುಮಕೂರು, ಶಿರಾ).
• ಹೋಟೆಲ್ ಹಾಗೂ ಕ್ಯಾಟರಿಂಗ್ ಕಿಚನ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ ಮತ್ತು ಸುರಕ್ಷತಾ ಸರ್ಟಿಫಿಕೇಶನ್.
• 100% ತೂಕ ಗ್ಯಾರಂಟಿ ಮತ್ತು 18% ಜಿಎಸ್‌ಟಿ ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ ಇನ್‌ವಾಯ್ಸ್ (HSN 27111900).

📞 ತಕ್ಷಣದ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್ ಮತ್ತು ವಿಚಾರಣೆಗೆ ಕರೆ ಮಾಡಿ: +91 8152889500.`
          : `Greetings from Sandhya Enterprises (Commercial LPG Gas Agency).
Proprietor: Ramakrishnaiah | GSTIN: 29CJXPR4809J1Z6 | MSME UDYAM: UDYAM-KR-02-0049972.

Our Core Commercial Services:
• Official Bharat Gas 19kg Commercial & 47.5kg Industrial Cylinder Supply.
• Go Gas & Power Gas Distribution across Nelamangala, Dobbaspet KIADB, Tumkur, and Sira.
• PESO-Certified Commercial Kitchen Manifold Pipeline Fabrication & Leak Testing.
• 100% Digital Weight Verification & 18% GST Input Tax Credit Invoices (HSN 27111900).

📞 Instant Commercial Dispatch & Booking Helpline: +91 8152889500.`;
      }
    }

    return res.json({
      reply: replyText,
      grounding: groundingMetadata,
      mode: modeUsed
    });
  } catch (err: any) {
    console.error("Error in /api/chat route:", err);
    return res.status(500).json({ error: err.message || "Failed to generate advisor response" });
  }
});

// Vite middleware setup for Development vs Production
async function startServer() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use('/562123', express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sandhya Commercial LPG Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
