"""Wishlist / Favorites page"""
import streamlit as st
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from coffee_data import COFFEE_PRODUCTS
from components.product_card import render_product_card

st.set_page_config(page_title="Favorites — Brew & Bloom", page_icon="❤️", layout="wide")

css_path = os.path.join(os.path.dirname(__file__), "..", "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("<h1 style='font-size: 2.5rem;'>Your Saved Favorites</h1>", unsafe_allow_html=True)
fav_ids = st.session_state.get("favorites", [])
favs = [p for p in COFFEE_PRODUCTS if p["id"] in fav_ids]

if favs:
    cols = st.columns(3)
    for idx, p in enumerate(favs):
        with cols[idx % 3]:
            render_product_card(p)
else:
    st.info("You haven't added any favorites yet.")
