"""
Navbar Component for Brew & Bloom Streamlit Application
"""

import streamlit as st

def render_navbar():
    cart_count = sum(item["quantity"] for item in st.session_state.get("cart", []))
    fav_count = len(st.session_state.get("favorites", []))
    user = st.session_state.get("user")

    st.markdown("""
    <div style="background-color: #2C1810; color: #EADBCE; padding: 0.5rem 1rem; border-radius: 0.5rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
        <div>☕ <strong>Brew & Bloom</strong> — Where Every Cup Tells a Story | Complimentary shipping on whole-bean orders over $35 with code <code>BLOOM10</code></div>
        <div style="color: #C68B59;">Specialty Micro-Lot Roastery</div>
    </div>
    """, unsafe_allow_html=True)

    col1, col2, col3 = st.columns([3, 6, 3])
    with col1:
        st.markdown("""
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="background-color: #2C1810; color: #C68B59; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">☕</div>
            <div>
                <span style="font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 700; color: #2C1810; display: block; line-height: 1.1;">Brew & Bloom</span>
                <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: #7B8F77; font-weight: 600;">Specialty Coffee Roastery</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        nav_cols = st.columns(6)
        pages = [
            ("Home", "home"),
            ("Our Story", "story"),
            ("Menu", "menu"),
            ("Shop", "shop"),
            ("Favorites", "favorites"),
            ("Contact", "contact")
        ]
        for idx, (label, route) in enumerate(pages):
            with nav_cols[idx]:
                if st.button(label, key=f"nav_{route}", use_container_width=True):
                    st.session_state["page"] = route
                    st.rerun()

    with col3:
        b_cols = st.columns([1, 1, 1.2])
        with b_cols[0]:
            fav_label = f"❤️ ({fav_count})" if fav_count else "❤️"
            if st.button(fav_label, key="btn_favs", help="Wishlist"):
                st.session_state["page"] = "favorites"
                st.rerun()
        with b_cols[1]:
            cart_label = f"🛍️ ({cart_count})" if cart_count else "🛍️"
            if st.button(cart_label, key="btn_cart", help="Shopping Cart"):
                st.session_state["page"] = "cart"
                st.rerun()
        with b_cols[2]:
            if user:
                if st.button(f"👤 {user['name'].split()[0]}", key="btn_dash"):
                    st.session_state["page"] = "dashboard"
                    st.rerun()
            else:
                if st.button("Sign In", key="btn_signin"):
                    st.session_state["page"] = "signin"
                    st.rerun()
    st.divider()
