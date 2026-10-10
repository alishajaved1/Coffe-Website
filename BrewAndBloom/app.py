"""
Brew & Bloom — Specialty Coffee & Roastery
Main Streamlit Application Entry Point
"""

import streamlit as st
import os

# Configure Streamlit page settings
st.set_page_config(
    page_title="Brew & Bloom — Specialty Coffee & Roastery",
    page_icon="☕",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Load custom CSS
css_path = os.path.join(os.path.dirname(__file__), "styles", "main.css")
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

# Initialize Session State
if "page" not in st.session_state:
    st.session_state["page"] = "home"

if "cart" not in st.session_state:
    from coffee_data import COFFEE_PRODUCTS
    st.session_state["cart"] = [
        {"product": COFFEE_PRODUCTS[1], "quantity": 1, "grind": "Standard", "size": "Regular (12oz)"},
        {"product": COFFEE_PRODUCTS[8], "quantity": 1, "grind": "Whole Bean", "size": "Bag (340g)"}
    ]

if "favorites" not in st.session_state:
    st.session_state["favorites"] = ["cappuccino", "signature-house-blend"]

if "user" not in st.session_state:
    st.session_state["user"] = {
        "name": "Clara Delacroix",
        "email": "clara.delacroix@example.com",
        "memberTier": "Gold Bloom Connoisseur",
        "points": 380,
        "joinedDate": "September 2026",
        "recentOrders": [
            {
                "id": "BB-89421",
                "date": "Yesterday at 9:15 AM",
                "items": "2x 18h Reserve Cold Brew, 1x Artisan Cappuccino",
                "total": 14.45,
                "status": "Delivered"
            }
        ]
    }

if "selected_product" not in st.session_state:
    st.session_state["selected_product"] = "cappuccino"

# Import components
from components.navbar import render_navbar
from components.footer import render_footer
from components.chatbot import render_chatbot
from coffee_data import COFFEE_PRODUCTS

# Render Top Navigation
render_navbar()

# Page Routing
page = st.session_state.get("page", "home")

if page == "home":
    # Hero Section
    h_col1, h_col2 = st.columns([7, 5])
    with h_col1:
        st.markdown('<div class="hero-badge">🌿 Small Batch Artisan Roastery & Botanica</div>', unsafe_allow_html=True)
        st.markdown("""
        <h1 style="font-size: 3.5rem; line-height: 1.1; margin-bottom: 1rem;">
            Where Every Cup <br/><span style="color: #C68B59; font-style: italic;">Tells a Story</span>
        </h1>
        <p style="font-size: 1.15rem; color: #5A463C; line-height: 1.6; max-width: 540px; margin-bottom: 1.5rem;">
            Sustainably sourced single-origins from high-elevation family farms, roasted in small 12kg drums to coax forth notes of jasmine, velvety cacao, and sweet caramel.
        </p>
        """, unsafe_allow_html=True)

        btn_c1, btn_c2 = st.columns([1, 1.2])
        with btn_c1:
            if st.button("Explore Our Menu →", key="hero_menu_btn", use_container_width=True):
                st.session_state["page"] = "menu"
                st.rerun()
        with btn_c2:
            if st.button("Order Whole Beans", key="hero_shop_btn", use_container_width=True):
                st.session_state["page"] = "shop"
                st.rerun()

        st.markdown("""
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #EADBCE;">
            <div>
                <strong style="font-family: 'Fraunces', serif; font-size: 1.6rem; color: #2C1810; display: block;">100%</strong>
                <span style="font-size: 0.75rem; color: #7B8F77; text-transform: uppercase;">Grade-1 Arabica</span>
            </div>
            <div>
                <strong style="font-family: 'Fraunces', serif; font-size: 1.6rem; color: #2C1810; display: block;">18 Hours</strong>
                <span style="font-size: 0.75rem; color: #7B8F77; text-transform: uppercase;">Slow Cold Steep</span>
            </div>
            <div>
                <strong style="font-family: 'Fraunces', serif; font-size: 1.6rem; color: #2C1810; display: block;">+40%</strong>
                <span style="font-size: 0.75rem; color: #7B8F77; text-transform: uppercase;">Above Fair Trade</span>
            </div>
        </div>
        """, unsafe_allow_html=True)

    with h_col2:
        hero_img_path = os.path.join(os.path.dirname(__file__), "assets", "images", "coffee_lady_hero.jpg")
        if os.path.exists(hero_img_path):
            st.image(hero_img_path, caption="Editorial Artisan Portrait — Savoring Brew & Bloom", use_container_width=True)
        else:
            st.image("https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80", use_container_width=True)

    st.markdown("<br/>", unsafe_allow_html=True)
    st.divider()

    # Bestsellers Section
    st.markdown("""
    <div style="margin: 2rem 0 1rem 0;">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #7B8F77;">Customer Favorites</span>
        <h2 style="font-size: 2.2rem; margin-top: 0.2rem;">Our Signature Bestsellers</h2>
    </div>
    """, unsafe_allow_html=True)

    from components.product_card import render_product_card
    bestsellers = [p for p in COFFEE_PRODUCTS if p.get("isBestseller")][:4]
    b_cols = st.columns(4)
    for idx, prod in enumerate(bestsellers):
        with b_cols[idx]:
            render_product_card(prod)

    # Bean to Cup Process
    st.markdown("<br/>", unsafe_allow_html=True)
    st.markdown("""
    <div style="background-color: #F5EFEB; padding: 2.5rem; border-radius: 1.5rem; border: 1px solid #EADBCE; margin: 2rem 0;">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 2rem auto;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #7B8F77;">Bean to Cup Journey</span>
            <h2 style="font-size: 2rem; margin-top: 0.25rem;">The Four Pillars of Our Craft</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #EADBCE;">
                <span style="font-family: 'Fraunces', serif; font-size: 2rem; color: #C68B59; font-weight: 800;">01</span>
                <h4 style="font-size: 1.1rem; margin: 0.5rem 0;">Direct Farm Trade</h4>
                <p style="font-size: 0.8rem; color: #6B5A50; line-height: 1.5;">Direct partner relationships with high-elevation micro-lots in Ethiopia and Colombia.</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #EADBCE;">
                <span style="font-family: 'Fraunces', serif; font-size: 2rem; color: #C68B59; font-weight: 800;">02</span>
                <h4 style="font-size: 1.1rem; margin: 0.5rem 0;">Small Batch Roasting</h4>
                <p style="font-size: 0.8rem; color: #6B5A50; line-height: 1.5;">Gently roasted in 12kg cast-iron drums to highlight natural fruit acidity and caramel.</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #EADBCE;">
                <span style="font-family: 'Fraunces', serif; font-size: 2rem; color: #C68B59; font-weight: 800;">03</span>
                <h4 style="font-size: 1.1rem; margin: 0.5rem 0;">The 45s Bloom</h4>
                <p style="font-size: 0.8rem; color: #6B5A50; line-height: 1.5;">Fresh grounds meet 93°C spring water, gently degassing aromatics of jasmine and cacao.</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 1rem; border: 1px solid #EADBCE;">
                <span style="font-family: 'Fraunces', serif; font-size: 2rem; color: #C68B59; font-weight: 800;">04</span>
                <h4 style="font-size: 1.1rem; margin: 0.5rem 0;">Served with Intention</h4>
                <p style="font-size: 0.8rem; color: #6B5A50; line-height: 1.5;">Poured into pre-warmed handcrafted ceramics with silky microfoam rosettas.</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

elif page == "story":
    st.markdown("""
    <div style="text-align: center; max-width: 700px; margin: 1rem auto 3rem auto;">
        <span class="hero-badge">Our Heritage & Craft</span>
        <h1 style="font-size: 3rem;">Rooted in Soil, Inspired by the Bloom</h1>
        <p style="font-size: 1.05rem; color: #5A463C; line-height: 1.6;">
            Brew & Bloom started with a vintage drum roaster in a sunlit botanical conservatory. We believe coffee is delicate agriculture that brings people together.
        </p>
    </div>
    """, unsafe_allow_html=True)

    sc1, sc2 = st.columns(2)
    with sc1:
        craft_img = os.path.join(os.path.dirname(__file__), "assets", "images", "coffee_brewing_craft.jpg")
        if os.path.exists(craft_img):
            st.image(craft_img, caption="Artisan V60 Pour-Over Extraction", use_container_width=True)
        else:
            st.image("https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80", use_container_width=True)

    with sc2:
        st.markdown("""
        <h3 style="font-size: 1.8rem; margin-top: 0;">The Miracle of the 'Bloom'</h3>
        <p style="font-size: 0.95rem; color: #5A463C; line-height: 1.7;">
            When hot water first contacts freshly ground beans, carbon dioxide escapes in lively, aromatic bubbles. That moment is called <strong>the bloom</strong>.
        </p>
        <p style="font-size: 0.95rem; color: #5A463C; line-height: 1.7;">
            To our baristas, the bloom signifies morning renewal, honest farm stewardship, and pauses of quiet contemplation in a busy world.
        </p>
        <div style="background-color: #FDFBF7; padding: 1.25rem; border-radius: 1rem; border: 1px solid #EADBCE; margin-top: 1.5rem;">
            <h4 style="margin: 0 0 0.5rem 0;">Our Sourcing Commitments</h4>
            <ul style="font-size: 0.85rem; color: #6B5A50; line-height: 1.6; margin-bottom: 0;">
                <li>High altitude grown strictly between 1,400m - 2,200m</li>
                <li>Direct price premiums paid 40% above fair-trade minimums</li>
                <li>100% commercially compostable packaging</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)

elif page == "menu":
    st.markdown("""
    <div style="text-align: center; margin-bottom: 2rem;">
        <span class="hero-badge">Handcrafted Daily</span>
        <h1 style="font-size: 2.8rem;">The Coffee Menu</h1>
    </div>
    """, unsafe_allow_html=True)

    cat_filter = st.selectbox("Filter Category:", ["All", "Espresso & Classics", "Specialty Lattes", "Cold Brews", "Whole Beans & Roasts"])
    from components.product_card import render_product_card

    filtered = COFFEE_PRODUCTS if cat_filter == "All" else [p for p in COFFEE_PRODUCTS if p["category"] == cat_filter]
    cols = st.columns(3)
    for idx, p in enumerate(filtered):
        with cols[idx % 3]:
            render_product_card(p)

elif page == "shop":
    st.markdown("""
    <div style="text-align: center; margin-bottom: 2rem;">
        <span class="hero-badge">Roasted Weekly</span>
        <h1 style="font-size: 2.8rem;">The Roastery Whole Bean Shop</h1>
        <p style="color: #6B5A50;">12oz Bags • Fresh Roasted to Order • Free Shipping over $35</p>
    </div>
    """, unsafe_allow_html=True)

    from components.product_card import render_product_card
    beans = [p for p in COFFEE_PRODUCTS if p["category"] == "Whole Beans & Roasts" or p.get("isBestseller")]
    cols = st.columns(3)
    for idx, p in enumerate(beans):
        with cols[idx % 3]:
            render_product_card(p)

elif page == "details":
    pid = st.session_state.get("selected_product", "espresso")
    prod = next((p for p in COFFEE_PRODUCTS if p["id"] == pid), COFFEE_PRODUCTS[0])
    
    if st.button("← Back to Menu"):
        st.session_state["page"] = "menu"
        st.rerun()

    dc1, dc2 = st.columns(2)
    with dc1:
        st.image(prod["image"], use_container_width=True)
    with dc2:
        st.markdown(f"""
        <span style="font-size: 0.75rem; font-weight: 700; color: #7B8F77; text-transform: uppercase;">{prod['category']}</span>
        <h1 style="margin: 0.25rem 0 0.5rem 0;">{prod['name']}</h1>
        <p style="color: #7B8F77; font-weight: 600;">{prod['subtitle']}</p>
        <span class="price-tag">${prod['price']:.2f}</span>
        <p style="margin: 1rem 0; line-height: 1.6; color: #5A463C;">{prod['detailedDescription']}</p>
        """, unsafe_allow_html=True)

        grind_opt = st.selectbox("Grind Preference:", ["Whole Bean", "Espresso Grind", "Pour Over (V60)", "French Press"])
        qty = st.number_input("Quantity:", min_value=1, max_value=10, value=1)
        
        if st.button("Add to Order", key="detail_add", use_container_width=True):
            cart = st.session_state.get("cart", [])
            cart.append({"product": prod, "quantity": qty, "grind": grind_opt, "size": "Standard"})
            st.session_state["cart"] = cart
            st.toast(f"Added {qty}x {prod['name']} to your cart!")
            st.session_state["page"] = "cart"
            st.rerun()

elif page == "favorites":
    st.markdown("""
    <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Your Coffee Wishlist</h1>
    """, unsafe_allow_html=True)
    from components.product_card import render_product_card
    fav_ids = st.session_state.get("favorites", [])
    fav_prods = [p for p in COFFEE_PRODUCTS if p["id"] in fav_ids]

    if fav_prods:
        f_cols = st.columns(3)
        for idx, p in enumerate(fav_prods):
            with f_cols[idx % 3]:
                render_product_card(p)
    else:
        st.info("No favorites saved yet. Browse our menu to add items with the heart button.")

elif page == "cart":
    st.markdown("<h1 style='font-size: 2.5rem;'>Shopping Bag</h1>", unsafe_allow_html=True)
    cart = st.session_state.get("cart", [])
    if not cart:
        st.info("Your shopping cart is currently empty.")
    else:
        for idx, item in enumerate(cart):
            p = item["product"]
            c1, c2, c3, c4 = st.columns([1, 4, 2, 1])
            with c1:
                st.image(p["image"], width=70)
            with c2:
                st.markdown(f"**{p['name']}** ({item.get('grind', 'Standard')})")
                st.caption(f"${p['price']:.2f} each")
            with c3:
                new_qty = st.number_input("Qty", min_value=1, max_value=20, value=item["quantity"], key=f"q_{idx}")
                item["quantity"] = new_qty
            with c4:
                if st.button("Remove", key=f"del_{idx}"):
                    cart.pop(idx)
                    st.session_state["cart"] = cart
                    st.rerun()

        subtotal = sum(i["product"]["price"] * i["quantity"] for i in cart)
        st.divider()
        st.markdown(f"### Subtotal: ${subtotal:.2f}")
        st.caption("Estimated Sales Tax (8.25%) + Complimentary Shipping over $35")

        if st.button("Place Demo Order", key="cart_checkout", use_container_width=True):
            user = st.session_state.get("user")
            new_order = {
                "id": f"BB-{int(st.session_state.get('order_count', 90000)) + 1}",
                "date": "Just now",
                "items": f"{len(cart)} artisan items",
                "total": subtotal * 1.0825,
                "status": "Brewing & Packing"
            }
            if user:
                user["recentOrders"].insert(0, new_order)
            st.session_state["cart"] = []
            st.toast("Demo Order placed successfully! Check your Dashboard.")
            st.session_state["page"] = "dashboard"
            st.rerun()

elif page == "signin":
    st.markdown("<h1 style='font-size: 2.5rem; text-align: center;'>Sign In</h1>", unsafe_allow_html=True)
    with st.form("signin_form"):
        email = st.text_input("Email", "clara.delacroix@example.com")
        pwd = st.text_input("Password", type="password", value="Roaster2026!")
        submitted = st.form_submit_button("Sign In to Demo Dashboard")
        if submitted:
            st.session_state["user"] = {
                "name": "Clara Delacroix",
                "email": email,
                "memberTier": "Gold Bloom Connoisseur",
                "points": 380,
                "joinedDate": "October 2026",
                "recentOrders": []
            }
            st.toast("Signed in successfully!")
            st.session_state["page"] = "dashboard"
            st.rerun()

elif page == "signup":
    st.markdown("<h1 style='font-size: 2.5rem; text-align: center;'>Join The Roastery Club</h1>", unsafe_allow_html=True)
    with st.form("signup_form"):
        s_name = st.text_input("Full Name")
        s_email = st.text_input("Email")
        s_pwd = st.text_input("Password", type="password")
        s_terms = st.checkbox("I agree to the Brew & Bloom Terms of Service")
        s_submit = st.form_submit_button("Create Demo Account (+100 Pts)")
        if s_submit and s_name and s_email and s_terms:
            st.session_state["user"] = {
                "name": s_name,
                "email": s_email,
                "memberTier": "Bloom Welcome Member",
                "points": 100,
                "joinedDate": "October 2026",
                "recentOrders": []
            }
            st.toast("Welcome to Brew & Bloom!")
            st.session_state["page"] = "dashboard"
            st.rerun()

elif page == "dashboard":
    user = st.session_state.get("user")
    if not user:
        st.warning("Please sign in first.")
    else:
        st.markdown(f"""
        <div style="background-color: #2C1810; color: white; padding: 2rem; border-radius: 1.25rem; margin-bottom: 2rem;">
            <h2>Welcome, {user['name']}</h2>
            <p style="color: #C68B59;">{user['memberTier']} • {user['points']} Bloom Loyalty Points</p>
        </div>
        """, unsafe_allow_html=True)

        st.subheader("Simulated Order History")
        for ord_item in user.get("recentOrders", []):
            st.markdown(f"**Order {ord_item['id']}** — {ord_item['date']} | Total: ${ord_item['total']:.2f} ({ord_item['status']})")
            st.caption(ord_item["items"])
            st.divider()

        if st.button("Sign Out"):
            st.session_state["user"] = None
            st.session_state["page"] = "home"
            st.rerun()

elif page == "contact":
    st.markdown("""
    <div style="text-align: center; margin-bottom: 2rem;">
        <span class="hero-badge">Roastery Visits & Cuppings</span>
        <h1 style="font-size: 2.8rem;">Connect with Our Roasters</h1>
    </div>
    """, unsafe_allow_html=True)
    cc1, cc2 = st.columns(2)
    with cc1:
        st.subheader("Send Us a Message")
        with st.form("contact_form"):
            c_name = st.text_input("Your Name")
            c_email = st.text_input("Your Email")
            c_msg = st.text_area("Message")
            if st.form_submit_button("Send to Brew & Bloom"):
                st.success("Thank you! Our concierge will reply within 24 hours.")
    with cc2:
        st.subheader("Pacific Grove Roastery")
        st.markdown("""
        📍 **Address:** 482 Bloom Avenue, Pacific Grove, CA 93950<br/>
        ⏰ **Hours:** Mon–Fri: 6:30 AM–7:00 PM | Sat–Sun: 7:30 AM–8:00 PM<br/>
        📞 **Phone:** (831) 555-BREW<br/>
        ✨ **Saturday Public Cupping:** 10:00 AM weekly
        """, unsafe_allow_html=True)

# Render Embedded BrewBot Assistant on all pages
st.markdown("<br/>", unsafe_allow_html=True)
render_chatbot()

# Render Footer
render_footer()
