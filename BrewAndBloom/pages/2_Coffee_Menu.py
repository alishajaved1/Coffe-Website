"""Coffee Menu page"""
import streamlit as st
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from coffee_data import COFFEE_PRODUCTS
from components.product_card import render_product_card

st.set_page_config(page_title="Coffee Menu — Brew & Bloom", page_icon="☕", layout="wide")

css_path = os.path.join(os.path.dirname(__file__), "..", "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("""
<div style="text-align: center; margin-bottom: 2rem;">
    <span class="hero-badge">Handcrafted Daily</span>
    <h1 style="font-size: 2.8rem;">The Coffee Menu</h1>
</div>
""", unsafe_allow_html=True)

cat = st.selectbox("Category:", ["All", "Espresso & Classics", "Specialty Lattes", "Cold Brews", "Whole Beans & Roasts"])
filtered = COFFEE_PRODUCTS if cat == "All" else [p for p in COFFEE_PRODUCTS if p["category"] == cat]

cols = st.columns(3)
for idx, p in enumerate(filtered):
    with cols[idx % 3]:
        render_product_card(p)
