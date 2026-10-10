import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini if key is provided
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (geminiApiKey && geminiApiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey: geminiApiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// System prompt for BrewBot coffee companion
const SYSTEM_PROMPT = `You are BrewBot, the charismatic, warm, and highly knowledgeable Head Barista & Coffee Sommelier at "Brew & Bloom", a luxury specialty coffee roastery and café.
Our brand essence:
- "Where Every Cup Tells a Story"
- Palette & vibe: Warm caramel, espresso brown, ivory cream, sage green, tranquil artisan elegance.
- Menu highlights:
  * Espresso Intenso ($3.80) - 9-bar pulled double shot with hazelnut crema and dark chocolate notes.
  * Artisan Cappuccino ($4.75) - 1:1:1 balanced ratio with silky microfoam and cocoa dust.
  * Caffè Latte ($4.95) - Steamed whole milk to 62°C over double espresso with rosetta latte art.
  * Caramel Macchiato ($5.60) - Steamed vanilla milk marked with espresso & house-made amber sea-salt caramel.
  * Artisan Dark Mocha ($5.40) - 70% Valrhona ganache melted into hot espresso.
  * Classic Americano ($3.95) - Crisp single-origin Ethiopian espresso over hot alpine water.
  * 18h Reserve Cold Brew ($4.85) - Steeped cold for 18 hours, notes of blackberry and dark cacao, zero bitterness.
  * Bourbon Vanilla Latte ($5.25) - Madagascar vanilla bean caviar syrup and silky microfoam.
  * Pistachio Rose Bloom Latte ($5.85) - Sicilian pistachio paste, rosewater essence, oat milk.
  * Signature House Blend ($18.50 / 12 oz) - Medium roast, notes of milk chocolate, candied orange, brown sugar honey.
  * Yirgacheffe Geisha Reserve ($22.00 / 8.8 oz) - Rare heirloom light roast, jasmine florals, bergamot citrus, white peach.
  * Copper Gooseneck Kettle ($48.00) - Barista precision pour-over kettle.

Guidelines:
- Give delightful, evocative, clear coffee advice, brewing parameters (water temp 93°C, grind sizes, brew ratios like 1:15 or 1:16), drink recommendations based on preferences, or answers about Brew & Bloom's artisan philosophy.
- Speak in a friendly, sophisticated, yet accessible tone. Use charming coffee metaphors.
- Keep responses concise (2-4 paragraphs or formatted bullet points). Format cleanly with markdown bolding and bullet points.`;

// Intelligent Coffee Sommelier fallback engine
function generateLocalBaristaResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('first') || p.includes('start') || p.includes('try first')) {
    return `☕ **Welcome to Brew & Bloom!** For your very first cup, I enthusiastically recommend our **Artisan Cappuccino** ($4.75) or our **Signature House Blend** ($18.50). 

Our Cappuccino features a velvet microfoam crown and notes of roasted hazelnut and warm milk chocolate—the quintessential representation of our roasting craft. If you prefer a chilled, refreshing start, our **18h Reserve Cold Brew** will blow you away with its smooth cacao and blackberry finish!`;
  }
  if (p.includes('difference') || (p.includes('latte') && p.includes('cappuccino'))) {
    return `✨ **The Classic Debate: Latte vs. Cappuccino**

• **Artisan Cappuccino ($4.75):** Poured in a classic third ratio (1:1:1)—one-third rich espresso, one-third velvety steamed milk, and one-third dense microfoam cap dusted with cocoa. It offers a punchier, coffee-forward taste and luxurious texture.
• **Caffè Latte ($4.95):** More generous on silky steamed milk (around 1:3 or 1:4 ratio) with just a light 5mm layer of silky microfoam on top. It is smoother, creamier, and milder on the palate.

*Barista Tip:* Choose a cappuccino for morning clarity and foam texture; pick a latte for afternoon comforting creaminess!`;
  }
  if (p.includes('morning') || p.includes('wake up') || p.includes('energy') || p.includes('strong')) {
    return `🌅 **Morning Awakening Recommendation:**

For an instant burst of clean clarity, reach for our **Espresso Intenso** ($3.80) or **Classic Americano** ($3.95). 

Both are extracted with high aromatic yield, delivering notes of dark cocoa and toasted hazelnut that awaken the senses without overwhelming acidity. If you enjoy dairy with your morning caffeine, our **Artisan Cappuccino** offers the golden standard!`;
  }
  if (p.includes('sweet') || p.includes('dessert') || p.includes('sugar') || p.includes('caramel') || p.includes('chocolate')) {
    return `🍯 **For Sweet Tooth Connoisseurs:**

You are going to adore:
1. **Caramel Macchiato ($5.60):** Steamed vanilla-infused milk interrupted by bold espresso and drizzled with house-made salted amber caramel.
2. **Bourbon Vanilla Latte ($5.25):** Crafted with genuine Madagascar Bourbon vanilla bean caviar—not synthetic syrups.
3. **Pistachio Rose Bloom Latte ($5.85):** A Mediterranean dream with roasted Sicilian pistachio cream and aromatic organic rose petals!`;
  }
  if (p.includes('bean') || p.includes('roast') || p.includes('pour over') || p.includes('v60') || p.includes('chemex')) {
    return `🌱 **Choosing Your Whole Bean Coffee:**

• **For Milk Drinks & Daily Comfort:** Choose our **Signature House Blend** ($18.50/12oz). Medium roast, low acidity, with notes of milk chocolate and candied orange. Extremely forgiving for drip, French Press, or home espresso machines.
• **For Pour-Over & Floral Aromas:** Treat yourself to our **Yirgacheffe Geisha Reserve** ($22.00/8.8oz). Grown at 2,150m in Ethiopia, this light roast bursts with jasmine, bergamot, and sweet white peach. Best brewed at 93°C with a 1:16 ratio on a V60!`;
  }
  if (p.includes('story') || p.includes('about') || p.includes('who are you') || p.includes('origin')) {
    return `🌿 **The Brew & Bloom Philosophy:**

Brew & Bloom was founded on a simple promise: *Where every cup tells a story.* 

We partner directly with sustainable micro-lot farmers in Ethiopia, Colombia, and Guatemala, paying 40% above fair trade baselines. We roast in 12kg small batches on vintage cast-iron roasters to honor the bean's natural bloom, and serve every beverage in pre-warmed handcrafted ceramics.`;
  }

  return `☕ **BrewBot here at your service!** 

Whether you're exploring espresso roasts, perfecting your morning pour-over grind, or looking for the ideal pastry pairing, I am here to help. 

Feel free to ask me:
- *Which coffee should I try first?*
- *What's the difference between a latte and a cappuccino?*
- *Which beans are best for a pour-over dripper?*
- *Tell me about Brew & Bloom's roasting process.*`;
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  // If Gemini API is available and initialized, call Gemini
  if (aiClient) {
    try {
      // Build conversation history
      const formattedContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          if (item.sender === 'user') {
            formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
          } else if (item.sender === 'bot') {
            formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
          }
        }
      }

      formattedContents.push({ role: 'user', parts: [{ text: message }] });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const reply = response.text || generateLocalBaristaResponse(message);
      res.json({
        reply,
        source: 'gemini-3.8-flash',
        model: 'gemini-3.8-flash'
      });
      return;
    } catch (apiErr: any) {
      console.warn('Gemini API call encountered error, falling back to local barista engine:', apiErr?.message || apiErr);
      // Fallback seamlessly to high quality local coffee engine
      const localReply = generateLocalBaristaResponse(message);
      res.json({
        reply: localReply,
        source: 'brewbot-local-knowledge',
        notice: 'Served via BrewBot Coffee Engine (Gemini API standby mode)'
      });
      return;
    }
  }

  // Default intelligent local barista engine
  const reply = generateLocalBaristaResponse(message);
  res.json({
    reply,
    source: 'brewbot-local-knowledge',
    notice: 'BrewBot Barista Engine active'
  });
});

// ZIP file download endpoint
app.get('/api/download-zip', (req, res) => {
  const possiblePaths = [
    path.join(__dirname, 'public', 'BrewAndBloom_Website.zip'),
    path.join(__dirname, 'BrewAndBloom_Website.zip'),
    path.join(process.cwd(), 'BrewAndBloom_Website.zip'),
    path.join(process.cwd(), 'public', 'BrewAndBloom_Website.zip')
  ];

  let foundPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      foundPath = p;
      break;
    }
  }

  if (foundPath) {
    res.download(foundPath, 'BrewAndBloom_Website.zip', (err) => {
      if (err) {
        console.error('Error sending zip file:', err);
      }
    });
  } else {
    res.status(404).json({
      error: 'ZIP file is currently being packaged. Please try again in a few moments.'
    });
  }
});

// Serve frontend: Vite in development or static in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use('/public', express.static(path.join(__dirname, 'public')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`☕ Brew & Bloom server running on http://0.0.0.0:${port}`);
  });
}

startServer();
