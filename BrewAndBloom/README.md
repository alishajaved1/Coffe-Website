# ☕ Brew & Bloom — Specialty Coffee & Roastery Website

> **"Where Every Cup Tells a Story"**  
> A premium, full-featured specialty coffee brand website and AI companion built with **Python**, **Streamlit**, and **Google Gemini AI**.

---

## 🌟 Overview & Highlights

- **Desktop Browser Native:** Engineered for Google Chrome, Microsoft Edge, Firefox, and all modern Windows/Mac/Linux browsers.
- **Brand Aesthetic:** Warm caramel, rich espresso brown, ivory cream, and muted sage green design system.
- **Coffee Lady Hero Art:** High-resolution editorial artwork featuring the coffee roasting ritual and savoring moments.
- **12 Interactive Pages & Views:**
  1. Home (Hero, Bestsellers, Bean-to-Cup Process, Reviews, Newsletter)
  2. Our Story & Heritage (Direct micro-lot trade, the 45s bloom philosophy)
  3. Coffee Menu (Espresso, Specialty Lattes, Cold Brews, Whole Beans)
  4. The Roastery Shop (Whole bean bags, pour-over gear, filters)
  5. Product Details (Tasting notes, terroir altitude, grind selector)
  6. Favorites Wishlist (Saved items with heart toggle)
  7. Shopping Cart (Quantity updater, item removal, free shipping tracker)
  8. Demo Checkout (Simulated order confirmation with Order ID generation)
  9. Sign In (Demo authentication with remember-me and password reset)
  10. Sign Up (Password strength validator, terms acceptance, welcome points)
  11. User Dashboard (Loyalty balance, member tier, simulated order history)
  12. BrewBot AI Assistant (Google Gemini 3.8 Flash coffee sommelier)
- **Zero Database Required:** Runs instantly using temporary browser session state. No external database credentials or setups needed!

---

## 💻 Windows Setup & Installation Guide

Follow these simple step-by-step instructions on Windows 10 or Windows 11.

### 1. Extract the ZIP File
1. Locate `BrewAndBloom_Website.zip` in your Downloads folder.
2. Right-click the file and select **Extract All...** (or use 7-Zip / WinRAR).
3. Extract it to your preferred directory, for example: `C:\Projects\BrewAndBloom`.

### 2. Open in Visual Studio Code
1. Open **VS Code**.
2. Click **File** → **Open Folder...**
3. Select the extracted `BrewAndBloom` folder.
4. Open the integrated terminal in VS Code:  
   Press `Ctrl + ~` (tilde) or select **Terminal** → **New Terminal**.

### 3. Create a Python Virtual Environment
Run the following command in PowerShell or Command Prompt:

```cmd
python -m venv .venv
```

*(Note: If you have multiple Python versions installed, you can use `py -3 -m venv .venv`)*

### 4. Activate the Virtual Environment
On Windows Command Prompt:
```cmd
.venv\Scripts\activate.bat
```

Or on Windows PowerShell:
```powershell
.venv\Scripts\Activate.ps1
```

*(If PowerShell displays an execution policy error, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` and then run the command again).*

### 5. Install Dependencies
Run:

```cmd
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

This installs:
- `streamlit`
- `google-genai`
- `python-dotenv`
- `Pillow`

### 6. (Optional) Configure Google Gemini API Key
BrewBot has a **built-in Coffee Sommelier engine** that works immediately without any API key.

If you want **live Gemini 3.8 Flash responses**, configure your key using either of these two methods:

#### Method A: `.env` file
1. Copy `.env.example` to `.env`:
   ```cmd
   copy .env.example .env
   ```
2. Open `.env` and paste your key:
   ```env
   GEMINI_API_KEY="AIzaSyYourActualGeminiApiKeyHere"
   ```

#### Method B: `.streamlit/secrets.toml`
1. Copy `.streamlit/secrets.toml.example` to `.streamlit/secrets.toml`.
2. Add your key:
   ```toml
   GEMINI_API_KEY = "AIzaSyYourActualGeminiApiKeyHere"
   ```

### 7. Launch the Website!
Run:

```cmd
streamlit run app.py
```

Your default browser (Google Chrome / Microsoft Edge) will automatically open:
```
http://localhost:8501
```

Enjoy exploring Brew & Bloom!

---

## 🛠️ Troubleshooting Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `'streamlit' is not recognized` | Virtual environment is not activated | Run `.venv\Scripts\activate` before running streamlit |
| `Script execution disabled error` in PowerShell | Windows execution policy restriction | Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| `Port 8501 already in use` | Another instance is already running | Run on a different port: `streamlit run app.py --server.port 8502` |
| Image assets not displaying | Missing files or running from wrong folder | Ensure your current terminal directory is the `BrewAndBloom` folder containing `assets/` |

---

## 🚀 How to Upload to GitHub

1. Initialize git in the project root:
   ```cmd
   git init
   git add .
   git commit -m "Initial commit: Brew & Bloom Specialty Coffee Website"
   ```
2. Create a new repository on [GitHub](https://github.com).
3. Connect your remote repository:
   ```cmd
   git remote add origin https://github.com/YOUR_USERNAME/BrewAndBloom.git
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ How to Deploy on Streamlit Community Cloud (Free)

1. Push your code to GitHub (see above).
2. Go to [share.streamlit.io](https://share.streamlit.io/) and sign in with GitHub.
3. Click **New app**.
4. Select your `BrewAndBloom` repository, Branch: `main`, Main file path: `app.py`.
5. Under **Advanced Settings**, add your `GEMINI_API_KEY` under Secrets.
6. Click **Deploy!** Your site will be live worldwide with a public URL in 2 minutes.

---

## 📁 Project Architecture

```
BrewAndBloom/
├── app.py                      # Main router & Streamlit layout
├── ai.py                       # Gemini 3.8 Flash & Sommelier AI module
├── coffee_data.py              # Coffee menu, origins, tasting notes
├── requirements.txt            # Dependency specifications
├── README.md                   # This instruction guide
├── .env.example                # Environment variables template
├── .gitignore                  # Git exclusions
├── .streamlit/
│   ├── config.toml             # Custom theme colors & fonts
│   └── secrets.toml.example    # Cloud secrets template
├── assets/
│   ├── images/
│   │   ├── coffee_lady_hero.jpg    # Editorial coffee lady artwork
│   │   └── coffee_brewing_craft.jpg # Artisan V60 pour-over photo
│   ├── illustrations/
│   └── icons/
├── components/
│   ├── navbar.py               # Top brand navigation
│   ├── footer.py               # Roastery footer & contacts
│   ├── product_card.py         # Card with pricing & quick add
│   └── chatbot.py              # BrewBot AI interface
└── styles/
    └── main.css                # Premium Fraunces typography & styling
```

---

## ☕ License & Acknowledgments

- **Brand:** Brew & Bloom Specialty Coffee Roastery
- **Created with:** Python 3, Streamlit, Google GenAI SDK
- All orders, user accounts, and checkout transactions are safe demonstration flows.
