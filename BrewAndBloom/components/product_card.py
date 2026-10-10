"""
Product Card Component for Streamlit
"""

import streamlit as st

def render_product_card(product: dict):
    is_fav = product["id"] in st.session_state.get("favorites", [])
    
    with st.container():
        st.markdown(f"""
        <div class="coffee-card">
            <img src="{product['image']}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.75rem; margin-bottom: 0.75rem;" />
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <span style="font-size: 0.7rem; font-weight: 700; color: #7B8F77; text-transform: uppercase;">{product['category']}</span>
                <span style="font-size: 0.75rem; color: #C68B59;">★ {product['rating']} ({product.get('reviewsCount', 100)})</span>
            </div>
            <h4 style="font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 700; color: #2C1810; margin: 0.25rem 0;">{product['name']}</h4>
            <p style="font-size: 0.8rem; color: #6B5A50; line-height: 1.4; height: 42px; overflow: hidden; margin-bottom: 0.5rem;">{product['description']}</p>
            <div style="display: flex; gap: 0.3rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                {' '.join([f'<span style="background-color: #F5EFEB; color: #4A2C1B; font-size: 0.65rem; padding: 0.15rem 0.4rem; border-radius: 0.3rem;">{n}</span>' for n in product.get('tastingNotes', [])[:2]])}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span class="price-tag">${product['price']:.2f}</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

        c1, c2, c3 = st.columns([2, 1, 1])
        with c1:
            if st.button("Add to Cart", key=f"add_{product['id']}", use_container_width=True):
                cart = st.session_state.get("cart", [])
                existing = next((item for item in cart if item["product"]["id"] == product["id"]), None)
                if existing:
                    existing["quantity"] += 1
                else:
                    cart.append({"product": product, "quantity": 1, "grind": "Standard", "size": "Regular"})
                st.session_state["cart"] = cart
                st.toast(f"Added {product['name']} to cart!")
                st.rerun()
        with c2:
            fav_icon = "❤️" if is_fav else "🤍"
            if st.button(fav_icon, key=f"fav_{product['id']}", use_container_width=True, help="Toggle Favorite"):
                favs = st.session_state.get("favorites", [])
                if is_fav:
                    favs.remove(product["id"])
                    st.toast(f"Removed from favorites")
                else:
                    favs.append(product["id"])
                    st.toast(f"Saved {product['name']} to favorites!")
                st.session_state["favorites"] = favs
                st.rerun()
        with c3:
            if st.button("Details", key=f"detail_{product['id']}", use_container_width=True):
                st.session_state["selected_product"] = product["id"]
                st.session_state["page"] = "details"
                st.rerun()
