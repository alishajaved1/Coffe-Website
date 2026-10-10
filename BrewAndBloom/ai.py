"""
Brew & Bloom - AI Integration Module (BrewBot Coffee Companion)
Integrates Google Gemini API using official Google GenAI Python SDK
with built-in fallback to the Brew & Bloom Coffee Sommelier engine.
"""

import os
import streamlit as st

SYSTEM_PROMPT = """You are BrewBot, the charismatic, warm, and highly knowledgeable Head Barista & Coffee Sommelier at "Brew & Bloom", a luxury specialty coffee roastery and café.
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
- Keep responses concise (2-4 paragraphs or formatted bullet points). Format cleanly with markdown bolding and bullet points."""


def get_gemini_api_key():
    """Retrieve Gemini API key from environment or Streamlit secrets."""
    # 1. Check Streamlit secrets
    try:
        if "GEMINI_API_KEY" in st.secrets and st.secrets["GEMINI_API_KEY"]:
            val = st.secrets["GEMINI_API_KEY"]
            if val != "YOUR_GEMINI_API_KEY_HERE":
                return val
    except Exception:
        pass

    # 2. Check OS environment variable
    env_key = os.environ.get("GEMINI_API_KEY")
    if env_key and env_key != "YOUR_GEMINI_API_KEY_HERE" and env_key != "MY_GEMINI_API_KEY":
        return env_key

    return None


def local_sommelier_reply(user_query: str) -> str:
    """Intelligent fallback coffee knowledge engine when API key is unconfigured."""
    q = user_query.lower()
    if "first" in q or "start" in q or "try first" in q:
        return (
            "☕ **Welcome to Brew & Bloom!** For your very first cup, I enthusiastically recommend our "
            "**Artisan Cappuccino** ($4.75) or our **Signature House Blend** ($18.50).\n\n"
            "Our Cappuccino features a velvet microfoam crown and notes of roasted hazelnut and warm milk chocolate—"
            "the quintessential representation of our roasting craft. If you prefer a chilled, refreshing start, "
            "our **18h Reserve Cold Brew** ($4.85) will blow you away with its smooth cacao and blackberry finish!"
        )
    if "difference" in q or ("latte" in q and "cappuccino" in q):
        return (
            "✨ **The Classic Debate: Latte vs. Cappuccino**\n\n"
            "• **Artisan Cappuccino ($4.75):** Poured in a classic third ratio (1:1:1)—one-third rich espresso, "
            "one-third velvety steamed milk, and one-third dense microfoam cap dusted with cocoa. It offers a punchier, "
            "coffee-forward taste and luxurious texture.\n\n"
            "• **Caffè Latte ($4.95):** More generous on silky steamed milk (around 1:3 or 1:4 ratio) with just a light "
            "5mm layer of silky microfoam on top. It is smoother, creamier, and milder on the palate.\n\n"
            "*Barista Tip:* Choose a cappuccino for morning clarity and foam texture; pick a latte for afternoon comforting creaminess!"
        )
    if "morning" in q or "wake" in q or "energy" in q or "strong" in q:
        return (
            "🌅 **Morning Awakening Recommendation:**\n\n"
            "For an instant burst of clean clarity, reach for our **Espresso Intenso** ($3.80) or **Classic Americano** ($3.95).\n\n"
            "Both are extracted with high aromatic yield, delivering notes of dark cocoa and toasted hazelnut that awaken "
            "the senses without overwhelming acidity. If you enjoy dairy with your morning caffeine, our **Artisan Cappuccino** "
            "offers the golden standard!"
        )
    if "sweet" in q or "dessert" in q or "sugar" in q or "caramel" in q or "chocolate" in q:
        return (
            "🍯 **For Sweet Tooth Connoisseurs:**\n\n"
            "1. **Caramel Macchiato ($5.60):** Steamed vanilla-infused milk interrupted by bold espresso and drizzled with house-made salted amber caramel.\n"
            "2. **Bourbon Vanilla Latte ($5.25):** Crafted with genuine Madagascar Bourbon vanilla bean caviar—not synthetic syrups.\n"
            "3. **Pistachio Rose Bloom Latte ($5.85):** A Mediterranean dream with roasted Sicilian pistachio cream and aromatic organic rose petals!"
        )
    if "bean" in q or "roast" in q or "pour over" in q or "v60" in q or "chemex" in q:
        return (
            "🌱 **Choosing Your Whole Bean Coffee:**\n\n"
            "• **For Milk Drinks & Daily Comfort:** Choose our **Signature House Blend** ($18.50/12oz). Medium roast, low acidity, with notes of milk chocolate and candied orange. Extremely forgiving for drip, French Press, or home espresso machines.\n\n"
            "• **For Pour-Over & Floral Aromas:** Treat yourself to our **Yirgacheffe Geisha Reserve** ($22.00/8.8oz). Grown at 2,150m in Ethiopia, this light roast bursts with jasmine, bergamot, and sweet white peach. Best brewed at 93°C with a 1:16 ratio on a V60!"
        )
    if "story" in q or "about" in q or "who are you" in q or "origin" in q:
        return (
            "🌿 **The Brew & Bloom Philosophy:**\n\n"
            "Brew & Bloom was founded on a simple promise: *Where every cup tells a story.*\n\n"
            "We partner directly with sustainable micro-lot farmers in Ethiopia, Colombia, and Guatemala, paying 40% above fair trade baselines. "
            "We roast in 12kg small batches on vintage cast-iron roasters to honor the bean's natural bloom, and serve every beverage in pre-warmed handcrafted ceramics."
        )

    return (
        "☕ **BrewBot here at your service!**\n\n"
        "Whether you're exploring espresso roasts, perfecting your morning pour-over grind, or looking for the ideal pastry pairing, I am here to help.\n\n"
        "Feel free to ask me:\n"
        "- *Which coffee should I try first?*\n"
        "- *What's the difference between a latte and a cappuccino?*\n"
        "- *Which beans are best for a pour-over dripper?*\n"
        "- *Tell me about Brew & Bloom's roasting process.*"
    )


def query_brewbot(user_message: str, chat_history: list = None) -> tuple[str, str]:
    """
    Sends message to Gemini API if key is available, else uses local coffee sommelier.
    Returns: (response_text, source_mode)
    """
    api_key = get_gemini_api_key()

    if not api_key:
        return local_sommelier_reply(user_message), "local-sommelier"

    try:
        from google import genai

        client = genai.Client(api_key=api_key)
        
        # Build contents
        contents = []
        if chat_history:
            for item in chat_history[-6:]:
                role = "user" if item.get("role") == "user" else "model"
                contents.append({"role": role, "parts": [{"text": item.get("content", "")}]})
        
        contents.append({"role": "user", "parts": [{"text": user_message}]})

        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=contents,
            config={
                "system_instruction": SYSTEM_PROMPT,
                "temperature": 0.7,
            }
        )
        return response.text or local_sommelier_reply(user_message), "gemini-3.8-flash"
    except Exception as err:
        # Fall back cleanly
        print(f"Gemini API exception: {err}")
        return local_sommelier_reply(user_message), "local-sommelier"
