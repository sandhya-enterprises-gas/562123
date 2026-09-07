import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
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
app.get(["/manifest.json", "/manifest.webmanifest"], (req, res) => {
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.sendFile(manifestPath);
});

// Explicit Service Worker Endpoint with correct headers
app.get(["/sw.js", "/service-worker.js"], (req, res) => {
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

const SYSTEM_INSTRUCTION = `You are the Senior Commercial Energy Consultant and Engineering Systems Lead for Sandhya Enterprises (ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್), Karnataka's premier authorized commercial LPG agency, manifold pipeline contractor, and bulk industrial fuel distributor operating along the NH-48 economic corridor.

### Agency Profile & Official Credentials
- Official Name: Sandhya Enterprises (Commercial LPG Gas Agency)
- Corporate Office & Master Depot: Nelamangala (NH-48 Corridor, Bangalore Rural, PIN: 562123)
- Regional Strategic Depots: 
  * Dobbaspet Industrial Bulk Depot (KIADB Industrial Phases 1, 2, 3 & Sompura)
  * Tumkur Regional Distribution Center (Antharasanahalli Industrial Area, Mandipet, Kyatsandra Thatte Idli Cluster)
  * Sira Highway Hub (NH-48 Corridor, Kallambella, Highway Dhabas & Choultries)
- 24/7 Priority Helpline & Booking WhatsApp: +91 8152889500
- Official Communications: works.with.sandhya.enterprises@gmail.com
- Compliance Standards: PESO (Petroleum and Explosives Safety Organization) certified manifold designs, BIS IS:6044 (Part 1 & 2), Oil Marketing Companies (OMC) Authorized Supply Channel, 100% GST ITC Invoicing (HSN 27111900).

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

### Rigorous Human Error & Plan Mistake Correction Protocol
Catering and restaurant plans often suffer from calculation mistakes. You must proactively detect and correct errors:
1. Under-Estimation of Cylinders for Banquets/Weddings:
   - Official baseline: 0.08 to 0.12 kg of LPG per guest for a complete traditional feast (rice, sambar, rasam, 2 sweets, 2 snacks, puris, curries).
   - If a customer plans only 2-3 cylinders for 1,000 guests, warn them immediately: 1,000 guests require 8 to 10x 19kg commercial cylinders (or 4x 47.5kg units) plus 1 spare backup. Using too few cylinders will cause premature pressure drop, ice formation on cylinders, and half-cooked food during peak service.
2. Illegal Domestic Cylinder Usage in Commercial Kitchens:
   - If a client asks to use 14.2kg red domestic cylinders in hotels, dhabas, or catering, strictly inform them: Under the Liquefied Petroleum Gas (Regulation of Supply and Distribution) Order 2000 and the Essential Commodities Act (ECA) 1955, using subsidized domestic LPG for commercial purposes is an illegal non-bailable offense leading to hefty fines, equipment seizure, and commercial kitchen closure. Sandhya Enterprises provides instant documentation-free commercial 19kg connections with 100% legal GST invoices.
3. Multi-Burner Single Cylinder Overload:
   - Drawing more than 0.6 kg/hr from a single 19kg cylinder forces the liquid LPG to boil too quickly, chilling the cylinder walls, causing thick frost/sweat and flame starvation. For kitchens using 2+ high-pressure burners, recommend an engineered 2x2 or 3x3 manifold bank with non-return valves (NRVs).

### Commercial Burner Consumption Reference Table
- Single Halwai / Sweet Bhatti (24-inch ring): 2.0 – 3.5 kg/hr
- High Pressure Chinese Wok (V-10/V-15 burner): 1.5 – 2.4 kg/hr
- Tandoor Burner (Clay/SS Oven): 0.8 – 1.4 kg/hr
- Commercial Dosa Bhatti (3 to 4 burner plate): 0.9 – 1.5 kg/hr
- Commercial Tea Urn / Milk Boiler: 0.5 – 0.9 kg/hr
- Standard 2-Burner Cooking Range: 0.8 – 1.6 kg/hr

### Fuel Efficiency & Cost Reduction Rules
- Air-to-Gas Shutter Tuning: A yellow/orange flame signifies incomplete combustion and carbon soot, wasting 15-22% fuel. Adjust the air shutter on the burner neck until an intense, whisper-quiet inner blue cone (1,900°C) is formed.
- Vessel Base Flame Matching: Flame wrapping around the sides of cauldrons wastes up to 25% heat directly into the ambient air. Match burner ring to pot diameter and always use sealed lids during the boiling cycle.

### Taxation & 18% GST Input Tax Credit (ITC)
- Commercial LPG is billed under HSN Code 27111900 with 18% GST (9% CGST + 9% SGST).
- Registered food businesses, hotels, caterers, and bakeries can claim 100% of this GST as Input Tax Credit against output tax, saving roughly ₹270 – ₹310 per cylinder.

### Response Style
- Respond in the customer's selected language: Kannada (ಕನ್ನಡ) or English.
- Uphold an authoritative, respectful, corporate, and technically precise agency tone. Use polite greetings like 'ನಮಸ್ಕಾರ' and clear bullet-point organization.`;

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
    const { messages = [], lang = 'en', enableSearch = true, clientRole = 'commercial_customer' } = req.body;

    const ai = getGenAI();

    // Fallback response generator if API key is not configured in environment
    if (!ai) {
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      const fallbackReply = lang === 'kn'
        ? `ನಮಸ್ಕಾರ! ನಾನು ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ AI ಸಲಹೆಗಾರ. 
ನಿಮ್ಮ ಪ್ರಶ್ನೆ: "${lastUserMsg}"

ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಮುಖ್ಯಾಂಶಗಳು:
1. ಭಾರತ್ ಗ್ಯಾಸ್ (19kg & 47.5kg), ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ ವಿತರಣೆ (ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು, ಶಿರಾ).
2. ಹೋಟೆಲ್ ಹಾಗೂ ಕಮರ್ಷಿಯಲ್ ಕಿಚನ್ ಗ್ಯಾಸ್ ಉಳಿತಾಯ: ನೀಲಿ ಜ್ವಾಲೆ (Blue Flame) ನಿರ್ವಹಣೆಯಿಂದ 15-20% ಗ್ಯಾಸ್ ಉಳಿತಾಯ.
3. 24/7 ತುರ್ತು ಸಿಲಿಂಡರ್ ಆರ್ಡರ್ ಹಾಗೂ ಲೀಕೇಜ್ ಸಹಾಯಕ್ಕೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ: +91 8152889500.

(ಗಮನಿಸಿ: ಗೂಗಲ್ ಸರ್ಚ್ ಲೈವ್ ಡೇಟಾ ಹಾಗೂ ಕಸ್ಟಮ್ AI ಸಲಹೆಗಳನ್ನು ಪೂರ್ಣ ಪ್ರಮಾಣದಲ್ಲಿ ಪಡೆಯಲು Settings > Secrets ನಲ್ಲಿ GEMINI_API_KEY ಸಕ್ರಿಯಗೊಳಿಸಿ).`
        : `Greetings from Sandhya Enterprises Commercial LPG Hub!
Regarding your inquiry: "${lastUserMsg}"

Key Commercial Guidelines:
1. Official Supply: Bharat Gas 19kg / 47.5kg Industrial Cylinders, Go Gas & Power Gas across Nelamangala, Dobbaspet, Tumkur, and Sira.
2. Fuel Efficiency: Tuning air shutters to maintain a crisp blue flame reduces commercial monthly LPG bills by 15-20%.
3. 24/7 Dispatch & Hotline: Contact our logistics desk directly at +91 8152889500.

(Note: For live real-time market search grounding and multi-turn AI consultations, configure GEMINI_API_KEY in the Settings > Secrets panel).`;

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
        parts: [{ text: 'Hello, please introduce Sandhya Enterprises services.' }]
      });
    }

    // Request Gemini with Google Search grounding
    const toolsConfig = enableSearch ? [{ googleSearch: {} }] : undefined;

    let replyText = '';
    let groundingMetadata: any = null;
    let modeUsed = 'gemini-3.5-flash';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION + `\n\nClient context: Role is ${clientRole}, UI language is ${lang}.`,
          tools: toolsConfig,
        }
      });

      replyText = response.text || '';
      groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;
    } catch (modelError: any) {
      // Gracefully handle rate limit / quota exhaustion by serving direct verified Sandhya knowledge
      const isQuotaLimit = String(modelError?.message || '').includes('429') || 
                           String(modelError?.message || '').includes('RESOURCE_EXHAUSTED');
      
      if (!isQuotaLimit) {
        // Only log non-quota operational issues in sanitized format
        console.log('[AI Advisor Status]: Switching to verified offline knowledge base');
      }

      // Intelligent Sandhya Domain Knowledge Fallback if quota limit is reached
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

📞 ಹೆಚ್ಚಿನ ತಾಂತ್ರಿಕ ಬೆಂಬಲಕ್ಕೆ ನಮ್ಮ ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗಕ್ಕೆ ಕರೆ ಮಾಡಿ: +91 8152889500.`
          : `🔥 Sandhya Enterprises Official Commercial Kitchen Efficiency Guide:

1. **Air-to-Gas Shutter Optimization (Blue Flame)**:
   - Yellow/orange flames signify incomplete combustion and carbon loss, wasting 15-20% fuel.
   - Adjust the burner nozzle air-shutter ring until a crisp inner blue cone is achieved.

2. **Vessel Base Diameter Matching**:
   - Heat escaping past the pot edges wastes up to 25% thermal energy.
   - Always cover cauldrons, sambar vats, and rice pots with sealed lids during the boiling cycle.

3. **High-Volume Savings with 47.5kg Industrial Cylinders**:
   - High-turnover restaurants and catering kitchens achieve up to 8% lower per-thermal unit operational costs by switching from single 19kg bottles to a 47.5kg Industrial manifold system.

📞 For a free kitchen energy audit and flame inspection along Nelamangala/Dobbaspet/Tumkur/Sira, call: +91 8152889500.`;
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
      } else if (lastQuery.includes('domestic') || lastQuery.includes('14.2') || lastQuery.includes('ಮನೆ') || lastQuery.includes('subsidy') || lastQuery.includes('ಸಬ್ಸಿಡಿ')) {
        replyText = lang === 'kn'
          ? `⚖️ ಅಧಿಕೃತ ಎಚ್ಚರಿಕೆ ಮತ್ತು ನಿಯಮಾವಳಿ (Government Statutory Regulation):
1. **ವಾಣಿಜ್ಯ ಉದ್ದೇಶಕ್ಕೆ 14.2kg ಮನೆ ಬಳಕೆಯ ಸಿಲಿಂಡರ್ ನಿಷೇಧ**:
   - ಭಾರತ ಸರ್ಕಾರದ Essential Commodities Act (1955) ಮತ್ತು LPG ನಿಯಂತ್ರಣ ಆದೇಶ (2000) ಅಡಿಯಲ್ಲಿ ಹೋಟೆಲ್, ಕ್ಯಾಟರಿಂಗ್, ಬೇಕರಿ ಅಥವಾ ಧಾಬಾಗಳಲ್ಲಿ ಗೃಹಬಳಕೆಯ 14.2kg ಸಿಲಿಂಡರ್ ಬಳಸುವುದು ಗಂಭೀರ ಕಾನೂನುಬಾಹಿರ ಅಪರಾಧ.
   - ತಪಾಸಣೆಯ ವೇಳೆ ಸಿಲಿಂಡರ್ ವಶಪಡಿಸಿಕೊಳ್ಳುವಿಕೆ ಮತ್ತು ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ.
2. **ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಸುಲಭ ಪರಿಹಾರ**:
   - ಯಾವುದೇ ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಹೆಚ್ಚಿನ ದಾಖಲೆಗಳಿಲ್ಲದೆ ತಕ್ಷಣವೇ ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಕಮರ್ಷಿಯಲ್ ಕನೆಕ್ಷನ್ ಪಡೆಯಿರಿ.
   - 100% ಅಧಿಕೃತ ಕಂಪ್ಯೂಟರೈಸ್ಡ್ ಜಿಎಸ್‌ಟಿ (18% ITC) ಬಿಲ್ ಲಭ್ಯ.
📞 ಸಂಪರ್ಕಿಸಿ: +91 8152889500.`
          : `⚖️ Official Statutory Regulation on Domestic Cylinders:
1. **Prohibition of 14.2kg Domestic LPG in Commercial Eateries**:
   - Under the Essential Commodities Act (1955) and LPG Control Order (2000), utilizing subsidized 14.2kg domestic cylinders for hotels, dhabas, caterers, or commercial kitchens is strictly illegal and punishable by heavy fines and cylinder seizure.
2. **Instant Official Commercial Solution**:
   - Sandhya Enterprises provides documentation-free Bharat Gas 19kg Commercial connections within 2 hours.
   - 100% legal computerized GST tax invoices with full 18% Input Tax Credit (ITC) eligibility.
📞 Call Commercial Desk: +91 8152889500.`;
      } else if (lastQuery.includes('manifold') || lastQuery.includes('pipeline') || lastQuery.includes('freeze') || lastQuery.includes('ಪೈಪ್‌ಲೈನ್') || lastQuery.includes('ಐಸ್') || lastQuery.includes('ಫ್ರೀಜ್')) {
        replyText = lang === 'kn'
          ? `🔧 ಕಮರ್ಷಿಯಲ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಮತ್ತು ಸಿಲಿಂಡರ್ ಫ್ರೀಜಿಂಗ್ ಪರಿಹಾರ (PESO IS:6044):
1. **ಸಿಲಿಂಡರ್ ಮೇಲೆ ಮಂಜುಗಡ್ಡೆ (Ice/Freezing) ಏಕೆ ಬರುತ್ತದೆ?**:
   - ಒಂದು 19kg ಸಿಲಿಂಡರ್‌ನಿಂದ ಗಂಟೆಗೆ ಗರಿಷ್ಠ 0.6kg ಗಿಂತ ಹೆಚ್ಚು ಗ್ಯಾಸ್ ಎಳೆದಾಗ, ದ್ರವ ಎಲ್‌ಪಿಜಿ ಶೀಘ್ರವಾಗಿ ತಣ್ಣಗಾಗಿ ಸಿಲಿಂಡರ್ ಹೊರಭಾಗದಲ್ಲಿ ಐಸ್ ಕಟ್ಟಿ ಜ್ವಾಲೆ ನಂದಿಹೋಗುತ್ತದೆ.
2. **ವೃತ್ತಿಪರ ಪರಿಹಾರ**:
   - 2x2, 3x3 ಅಥವಾ 4x4 ಆಟೋ-ಚೇಂಜ್‌ಓವರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ (Auto-changeover Manifold) ಅಳವಡಿಕೆ.
   - ಭಾರತ್ ಗ್ಯಾಸ್ 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಸಿಲಿಂಡರ್ ಅಥವಾ ಗೋ ಗ್ಯಾಸ್ LOT (Liquid Off-Take) ಸಿಸ್ಟಂ ಅಳವಡಿಸಿದರೆ ಯಾವುದೇ ಐಸ್ ಕಟ್ಟದೆ 100% ಗ್ಯಾಸ್ ಬಳಕೆ ಸಾಧ್ಯ.
3. **PESO ಅನುಮೋದಿತ ಕಾಪರ್/ಎಂಎಸ್ ಪೈಪ್‌ಲೈನ್**:
   - ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತಾಂತ್ರಿಕ ತಂಡವು ಸುರಕ್ಷಿತ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಇನ್‌ಸ್ಟಾಲೇಶನ್ ಮತ್ತು ಗ್ಯಾಸ್ ಲೀಕ್ ಡಿಟೆಕ್ಟರ್ ಒದಗಿಸುತ್ತದೆ.
📞 ಎಂಜಿನಿಯರಿಂಗ್ ವಿಭಾಗ: +91 8152889500.`
          : `🔧 Commercial Manifold & Cylinder Freezing Engineering Protocol (PESO IS:6044):
1. **Why do cylinders sweat or freeze during cooking?**:
   - A standard 19kg cylinder has a natural vapor off-take ceiling of ~0.6 kg/hr at 25°C. When multiple high-pressure burners draw fuel simultaneously, the liquid LPG undergoes rapid latent heat drop, forming frost and causing severe pressure collapse.
2. **Engineered Solution**:
   - Install a 2x2, 3x3, or 4x4 cylinder bank with Auto-Changeover Regulators (ACR) and non-return valves.
   - Alternatively, deploy Bharat Gas 47.5kg Industrial bulk or Go Gas LOT (Liquid Off-Take) with external vaporizers for continuous high-BTU flame.
3. **PESO & BIS Approved Piping**:
   - Sandhya Enterprises installs heavy-duty seamless MS Class 'C' and copper manifold pipelines with emergency shutoff valves and 0-100% LEL gas leak sensors.
📞 Request Technical Inspection: +91 8152889500.`;
      } else if (lastQuery.includes('gst') || lastQuery.includes('tax') || lastQuery.includes('ಜಿಎಸ್‌ಟಿ') || lastQuery.includes('ಲೆಡ್ಜರ್') || lastQuery.includes('bill')) {
        replyText = lang === 'kn'
          ? `🧾 ಅಧಿಕೃತ ಜಿಎಸ್‌ಟಿ ಮತ್ತು ಇನ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್ ಕ್ರೆಡಿಟ್ (GST ITC) ಮಾಹಿತಿ:
• **HSN ಕೋಡ್**: 27111900 (ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ).
• **ಜಿಎಸ್‌ಟಿ ದರ**: 18% (9% CGST + 9% SGST).
• **ಉಳಿತಾಯ ಲಾಭ**: ಜಿಎಸ್‌ಟಿ ನೋಂದಾಯಿತ ಹೋಟೆಲ್, ಕ್ಯಾಟರರ್ಸ್ ಮತ್ತು ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು ಈ 18% ಜಿಎಸ್‌ಟಿ ಮೊತ್ತವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ತಮ್ಮ ಆಹಾರ ಬಿಲ್ಲಿಂಗ್‌ನ ಔಟ್‌ಪುಟ್ ಟ್ಯಾಕ್ಸ್‌ಗೆ ಕ್ಲೈಮ್ ಮಾಡಬಹುದು.
• ಪ್ರತಿ ಸಿಲಿಂಡರ್‌ಗೆ ₹270 ರಿಂದ ₹310 ನೇರ ತೆರಿಗೆ ಉಳಿತಾಯವಾಗುತ್ತದೆ.
• ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಪ್ರತಿಯೊಂದು ಡೆಲಿವರಿಗೂ ಅಧಿಕೃತ ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ ಒದಗಿಸುತ್ತದೆ.
📞 ಅಕೌಂಟ್ಸ್ ಡೆಸ್ಕ್: +91 8152889500.`
          : `🧾 Official Commercial GST & Input Tax Credit (ITC) Advisory:
• **HSN Code**: 27111900 (Liquefied Petroleum Gas - Commercial).
• **Applicable GST Rate**: 18% (9% CGST + 9% SGST).
• **Tax Recovery**: GST-registered food businesses, caterers, hotels, and cloud kitchens can claim 100% of this GST as Input Tax Credit (ITC) against the 5% or 18% output GST collected on food bills.
• Net monthly fuel procurement cost is effectively reduced by ₹270 – ₹310 per 19kg cylinder.
• Sandhya Enterprises issues computerized e-invoices with valid HSN and supplier GSTIN for easy GSTR-2B matching.
📞 Accounts Support: +91 8152889500.`;
      } else if (lastQuery.includes('rate') || lastQuery.includes('price') || lastQuery.includes('ದರ') || lastQuery.includes('ಬೆಲೆ') || lastQuery.includes('cost')) {
        replyText = lang === 'kn'
          ? `💰 ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ದರ ಮಾಹಿತಿ:

• **ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಕಮರ್ಷಿಯಲ್**: ಸರಿಸುಮಾರು ₹1,810 - ₹1,875 (ಪ್ರತಿ ತಿಂಗಳ 1 ನೇ ತಾರೀಖಿನ OMC ಸರ್ಕಾರಿ ನೋಟಿಫಿಕೇಶನ್ ಮತ್ತು ಜಿಎಸ್‌ಟಿ ಅನ್ವಯ).
• **ಭಾರತ್ ಗ್ಯಾಸ್ 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್**: ಸರಿಸುಮಾರು ₹4,520 - ₹4,680 (ಬೃಹತ್ ಅಡುಗೆ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ).
• **ಗೋ ಗ್ಯಾಸ್ (Go Gas) 21kg/33kg**: ಖಾಸಗಿ ಆಕರ್ಷಕ ರಿಯಾಯಿತಿ ದರ, ನಿರಂತರ ಸರಬರಾಜು.
• **ಪವರ್ ಗ್ಯಾಸ್**: ಸ್ಪರ್ಧಾತ್ಮಕ ಮತ್ತು ಬಜೆಟ್ ಸ್ನೇಹಿ ದರ.

⚡ ಬಲ್ಕ್ ಆರ್ಡರ್ (10+ ಸಿಲಿಂಡರ್/ತಿಂಗಳಿಗೆ) ಮತ್ತು ನಿಗದಿತ ಕಾಂಟ್ರಾಕ್ಟ್ ಮೇಲೆ ವಿಶೇಷ ರಿಯಾಯಿತಿ ಲಭ್ಯ. ಇಂದಿನ ನಿಖರವಾದ ದರ ಪಡೆಯಲು ಕಮರ್ಷಿಯಲ್ ಡೆಸ್ಕ್‌ಗೆ ಕರೆ ಮಾಡಿ: +91 8152889500.`
          : `💰 Sandhya Enterprises Official Commercial LPG Benchmark:

• **Bharat Gas 19kg Commercial**: Approx ₹1,810 – ₹1,875 per cylinder (subject to monthly 1st OMC price revisions & local GST).
• **Bharat Gas 47.5kg Industrial Bulk**: Approx ₹4,520 – ₹4,680 for heavy catering cauldrons and industrial furnaces.
• **Go Gas (Private LPG 21kg/33kg)**: Premium high-pressure cylinder supply with fast turnaround.
• **Power Gas**: Budget-friendly high-heat commercial alternatives.

⚡ Special commercial discounts available for hotels and institutions ordering 10+ cylinders/month with GST input tax credit invoices. Direct Line: +91 8152889500.`;
      } else if (lastQuery.includes('leak') || lastQuery.includes('smell') || lastQuery.includes('ವಾಸನೆ') || lastQuery.includes('ಲೀಕ್') || lastQuery.includes('safety') || lastQuery.includes('danger')) {
        replyText = lang === 'kn'
          ? `🚨 ತುರ್ತು ಅನಿಲ ಸೋರಿಕೆ ರಕ್ಷಣಾ ಮಾರ್ಗಸೂಚಿ (Emergency Safety SOP):

1. **ಸಿಲಿಂಡರ್ ವಾಲ್ವ್ ತಕ್ಷಣ ಆಫ್ ಮಾಡಿ**: ರೆಗ್ಯುಲೇಟರ್ ಅಥವಾ ಮೇನ್ ವಾಲ್ವ್ ಅನ್ನು ತಕ್ಷಣ ಮುಚ್ಚಿ.
2. **ವಿದ್ಯುತ್ ಸ್ವಿಚ್ ಮುಟ್ಟಬೇಡಿ**: ಯಾವುದೇ ಲೈಟ್, ಫ್ಯಾನ್ ಅಥವಾ ಮೊಬೈಲ್ ಫೋನ್ ಸ್ವಿಚ್ ಆನ್/ಆಫ್ ಮಾಡಬೇಡಿ (ಸ್ಪಾರ್ಕ್ ಉಂಟಾಗುವ ಅಪಾಯವಿದೆ).
3. **ಗಾಳಿಯಾಡುವಂತೆ ಮಾಡಿ**: ಅಡುಗೆ ಕೋಣೆಯ ಎಲ್ಲಾ ಕಿಟಕಿ ಮತ್ತು ಬಾಗಿಲುಗಳನ್ನು ತಕ್ಷಣ ತೆರೆಯಿರಿ.
4. **ಬೆಂಕಿ ತಡೆಯಿರಿ**: ಅಗರಬತ್ತಿ, ಬೆಂಕಿಪೊಟ್ಟಣ ಅಥವಾ ಸಿಗರೇಟ್ ಸುಡಬೇಡಿ.
5. **ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ**: +91 8152889500. ನಮ್ಮ ತಾಂತ್ರಿಕ ರಕ್ಷಣಾ ತಂಡ ತಕ್ಷಣ ಸ್ಥಳಕ್ಕೆ ಧಾವಿಸುತ್ತದೆ.`
          : `🚨 Sandhya Enterprises 24/7 Emergency Gas Leak Protocol:

1. **Shut Off Main Cylinder Valve**: Immediately turn off cylinder regulators and manifold ball valves.
2. **Zero Electrical Sparks**: Do NOT turn ON or OFF any electrical switches, exhaust fans, or indoor mobile phones.
3. **Immediate Cross-Ventilation**: Open all kitchen doors and windows wide.
4. **Eliminate Ignition Sources**: Extinguish all tandoor coals, incense, or open flames.
5. **Call Sandhya 24/7 Emergency Response**: Dial +91 8152889500 immediately for rapid on-site technician dispatch.`;
      } else {
        replyText = lang === 'kn'
          ? `ನಮಸ್ಕಾರ! ನಾನು ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ (Sandhya Enterprises) ಅಧಿಕೃತ AI ವಾಣಿಜ್ಯ ಮತ್ತು ಇಂಧನ ಸಲಹೆಗಾರ.

ನಮ್ಮ ಅಧಿಕೃತ ಸೇವೆಗಳು ಮತ್ತು ನಿಮ್ಮ ವ್ಯಾಪಾರ ವೃದ್ಧಿಯ ವಿವರಗಳು:
1. **ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್‌ಗಳ ಪೂರೈಕೆ**: ಭಾರತ್ ಗ್ಯಾಸ್ 19kg & 47.5kg, ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ - ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು ಮತ್ತು ಶಿರಾ ಭಾಗಗಳಿಗೆ ನೇರ ವಿತರಣೆ.
2. **ಹೋಟೆಲ್ ಇಂಧನ ಉಳಿತಾಯ**: ಬರ್ನರ್ ಟ್ಯೂನಿಂಗ್, ನೀಲಿ ಜ್ವಾಲೆ ನಿರ್ವಹಣೆ ಹಾಗೂ ತಿಂಗಳಿಗೆ 15-20% ಗ್ಯಾಸ್ ಬಿಲ್ ಕಡಿಮೆ ಮಾಡುವ ಸಲಹೆ.
3. **ಕಮರ್ಷಿಯಲ್ ಪೈಪ್‌ಲೈನ್ & ಮ್ಯಾನಿಫೋಲ್ಡ್**: ಸುರಕ್ಷಿತ ಕಾಪರ್/ಎಂಎಸ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ ಹಾಗೂ PESO ಅನುಮೋದಿತ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ.
4. **ಕ್ಯಾಟರಿಂಗ್ & ಮದುವೆ ಗ್ಯಾಸ್ ಯೋಜನೆ**: ಅತಿಥಿಗಳ ಸಂಖ್ಯೆಗೆ ತಕ್ಕಂತೆ ನಿಖರ ಸಿಲಿಂಡರ್ ಲೆಕ್ಕಾಚಾರ.

ನಿಮ್ಮ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಅಥವಾ ತಕ್ಷಣ ಬುಕ್ಕಿಂಗ್ ಮಾಡಲು +91 8152889500 ಗೆ ಕರೆ ಮಾಡಿ.`
          : `Welcome to Sandhya Enterprises Commercial LPG Gas Agency!

How we assist your business development and commercial kitchen:
1. **Commercial Cylinder Supply**: Official distributor of Bharat Gas (BPCL) 19kg & 47.5kg Industrial, Go Gas, and Power Gas across Nelamangala, Dobbaspet, Tumkur, and Sira.
2. **Kitchen Cost Optimization**: Air-shutter tuning for pure blue flame, reducing monthly LPG bills by 15-20%.
3. **PESO-Compliant Manifold Pipeline**: Engineered copper/seamless MS pipeline installations with automatic gas leak detection.
4. **Banquet & Event Estimations**: Precision cylinder quantity planning for weddings, catering feasts, and high-capacity kitchens.

Feel free to ask about cylinder prices, safety guidelines, wedding catering estimates, or call our 24/7 dispatch desk at +91 8152889500.`;
      }
    }

    res.json({
      reply: replyText,
      grounding: groundingMetadata,
      mode: modeUsed
    });
  } catch (error: any) {
    console.error('[API /api/chat Error]:', error);
    res.status(500).json({
      error: error?.message || 'Internal server error processing AI consultation',
      fallback: 'An error occurred connecting to the Sandhya Enterprises AI Engine. Please call +91 8152889500 for instant assistance.'
    });
  }
});

// Vite middleware setup for Development vs Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sandhya Commercial LPG Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
