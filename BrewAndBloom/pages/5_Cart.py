"""Shopping Cart page"""
import streamlit as st

st.set_page_config(page_title="Shopping Cart — Brew & Bloom", page_icon="🛍️", layout="wide")

st.markdown("<h1 style='font-size: 2.5rem;'>Your Shopping Cart</h1>", unsafe_allow_html=True)

cart = st.session_state.get("cart", [])
if not cart:
    st.info("Your cart is empty.")
else:
    total = sum(i["product"]["price"] * i["quantity"] for i in cart)
    for idx, item in enumerate(cart):
        p = item["product"]
        c1, c2, c3 = st.columns([1, 4, 1])
        with c1:
            st.image(p["image"], width=80)
        with c2:
            st.markdown(f"**{p['name']}**")
            st.caption(f"Quantity: {item['quantity']} × ${p['price']:.2f}")
        with c3:
            st.markdown(f"**${(p['price'] * item['quantity']):.2f}**")
    st.divider()
    st.markdown(f"### Subtotal: ${total:.2f}")
    if st.button("Complete Demo Checkout"):
        st.session_state["cart"] = []
        st.success("Demo order placed successfully!")
