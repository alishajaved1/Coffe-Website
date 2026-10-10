"""Contact & Café Locations page"""
import streamlit as st

st.set_page_config(page_title="Contact Us — Brew & Bloom", page_icon="📍", layout="wide")

st.markdown("""
<div style="text-align: center; margin-bottom: 2rem;">
    <span class="hero-badge">Pacific Grove, California</span>
    <h1 style="font-size: 2.8rem;">Connect with Our Roasters</h1>
</div>
""", unsafe_allow_html=True)

c1, c2 = st.columns(2)
with c1:
    st.subheader("Visit Our Roastery")
    st.markdown("""
    **Brew & Bloom Flagship Roastery**<br/>
    482 Bloom Avenue, Heritage District<br/>
    Pacific Grove, CA 93950<br/>
    📞 (831) 555-BREW (2739)<br/>
    ✉️ concierge@brewandbloom.coffee<br/><br/>
    **Hours of Operation:**<br/>
    • Monday – Friday: 6:30 AM – 7:00 PM<br/>
    • Saturday – Sunday: 7:30 AM – 8:00 PM
    """, unsafe_allow_html=True)

with c2:
    st.subheader("Send Us a Note")
    with st.form("contact_us_form"):
        name = st.text_input("Name")
        email = st.text_input("Email")
        msg = st.text_area("Your Message")
        if st.form_submit_button("Send Message"):
            st.success("Thank you! Our head roaster will be in touch shortly.")
