"""Our Story page"""
import streamlit as st
import os

st.set_page_config(page_title="Our Story — Brew & Bloom", page_icon="☕", layout="wide")

css_path = os.path.join(os.path.dirname(__file__), "..", "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("""
<div style="text-align: center; max-width: 700px; margin: 1rem auto 3rem auto;">
    <span class="hero-badge">Our Heritage & Craft</span>
    <h1 style="font-size: 3rem;">Rooted in Soil, Inspired by the Bloom</h1>
    <p style="font-size: 1.05rem; color: #5A463C; line-height: 1.6;">
        Brew & Bloom was founded on a simple promise: where every cup tells a story. We partner directly with sustainable micro-lot farmers in Ethiopia, Colombia, and Guatemala.
    </p>
</div>
""", unsafe_allow_html=True)

c1, c2 = st.columns(2)
with c1:
    img = os.path.join(os.path.dirname(__file__), "..", "assets", "images", "coffee_brewing_craft.jpg")
    if os.path.exists(img):
        st.image(img, caption="Artisan V60 Pour-Over Extraction", use_container_width=True)
with c2:
    st.markdown("""
    <h3>The Four Pillars</h3>
    <p>1. <strong>Direct Farm Trade:</strong> Paying 40% above fair trade minimums.</p>
    <p>2. <strong>Small Batch Roasting:</strong> Roasted in 12kg drums for sweetness and clarity.</p>
    <p>3. <strong>The 45s Bloom:</strong> Savoring the aromatic release of trapped fruit florals.</p>
    <p>4. <strong>Served With Intention:</strong> Pre-warmed ceramics and silky microfoam.</p>
    """, unsafe_allow_html=True)
