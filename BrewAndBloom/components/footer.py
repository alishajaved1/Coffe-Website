"""
Footer Component for Brew & Bloom Streamlit Application
"""

import streamlit as st

def render_footer():
    st.markdown("""
    <div style="background-color: #21120B; color: #EADBCE; padding: 3rem 2rem; border-radius: 1.5rem; margin-top: 4rem; border-top: 4px solid #C68B59;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
            <div>
                <h3 style="font-family: 'Fraunces', serif; color: #FDFBF7; font-size: 1.4rem; margin-bottom: 0.5rem;">Brew & Bloom</h3>
                <p style="color: #C68B59; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">Artisan Roastery & Botanica</p>
                <p style="color: #D5C2B4; font-size: 0.85rem; line-height: 1.6; margin-top: 0.75rem;">
                    Where every cup tells a story. Sourced from organic micro-lots, roasted in 12kg small batches with reverence for the harvest.
                </p>
            </div>
            <div>
                <h4 style="color: #FDFBF7; font-size: 1rem; margin-bottom: 0.75rem;">Roastery Hours</h4>
                <p style="color: #D5C2B4; font-size: 0.85rem; line-height: 1.6;">
                    <strong>Mon – Fri:</strong> 6:30 AM – 7:00 PM<br/>
                    <strong>Sat – Sun:</strong> 7:30 AM – 8:00 PM<br/>
                    <em>482 Bloom Avenue, Pacific Grove, CA</em>
                </p>
            </div>
            <div>
                <h4 style="color: #FDFBF7; font-size: 1rem; margin-bottom: 0.75rem;">Connect</h4>
                <p style="color: #D5C2B4; font-size: 0.85rem; line-height: 1.6;">
                    📞 (831) 555-BREW<br/>
                    ✉️ concierge@brewandbloom.coffee<br/>
                    Instagram: @brewandbloom
                </p>
            </div>
            <div>
                <h4 style="color: #FDFBF7; font-size: 1rem; margin-bottom: 0.75rem;">Demo Session</h4>
                <p style="color: #D5C2B4; font-size: 0.85rem; line-height: 1.6;">
                    This Streamlit website uses local session state. No permanent database is required.
                </p>
            </div>
        </div>
        <div style="border-top: 1px solid rgba(198, 139, 89, 0.2); margin-top: 2rem; padding-top: 1.5rem; text-align: center; color: #9E8C80; font-size: 0.75rem;">
            © 2026 Brew & Bloom Specialty Coffee Roasters. Handcrafted with passion.
        </div>
    </div>
    """, unsafe_allow_html=True)
