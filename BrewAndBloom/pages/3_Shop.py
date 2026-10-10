"""Roastery Shop page"""
import streamlit as st
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from coffee_data import COFFEE_PRODUCTS
from components.product_card import render_product_card

st.set_page_config(page_title="Shop Roasts — Brew & Bloom", page_icon="☕", layout="wide")

css_path = os.path.join(os.path.dirname(__file__), "..", "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("""
<div style="text-align: center; margin-bottom: 2rem;">
    <span class="hero-badge">Roasted Weekly in 12kg Drums</span>
    <h1 style="font-size: 2.8rem;">The Roastery Whole Bean Shop</h1>
    <p style="color: #6B5A50;">Fresh Whole Beans • Free Shipping over $35</p>
</div>
""", unsafe_allow_html=True)

beans = [p for p in COFFEE_PRODUCTS if p["category"] == "Whole Beans & Roasts"]
cols = st.columns(2)
for idx, p in enumerate(beans):
    with cols[idx % 2]:
        render_product_card(p)
