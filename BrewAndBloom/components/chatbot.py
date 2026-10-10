"""
BrewBot Chatbot Component for Streamlit
"""

import streamlit as st
from ai import query_brewbot, get_gemini_api_key

def render_chatbot():
    st.markdown("""
    <div style="background-color: #FDFBF7; border: 1px solid #EADBCE; border-radius: 1rem; padding: 1.5rem; margin-top: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="background-color: #2C1810; color: #C68B59; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">☕</div>
            <div>
                <h3 style="font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 700; color: #2C1810; margin: 0;">BrewBot — Your Coffee Companion</h3>
                <span style="font-size: 0.75rem; color: #7B8F77;">AI Barista & Sensory Sommelier</span>
            </div>
        </div>
    """, unsafe_allow_html=True)

    has_key = get_gemini_api_key() is not None
    if has_key:
        st.caption("✨ Connected to Google Gemini 3.8 Flash")
    else:
        st.caption("☕ Running with Brew & Bloom Built-in Barista Sommelier (Gemini API key optional)")

    # Message History
    if "chat_history" not in st.session_state:
        st.session_state["chat_history"] = [
            {"role": "assistant", "content": "Warm greetings! ☕ I'm **BrewBot**, your Brew & Bloom Master Coffee Companion. Whether you're curious about flavor profiles, seeking your next morning brew, or curious about our bean origins, ask me anything!"}
        ]

    for msg in st.session_state["chat_history"]:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    # Suggested prompts
    st.markdown("<p style='font-size: 0.75rem; font-weight: 600; color: #7B6E66; margin-top: 0.75rem;'>Suggested questions:</p>", unsafe_allow_html=True)
    suggested = [
        "Which coffee should I try first?",
        "What is the difference between a latte and a cappuccino?",
        "Recommend a coffee for my morning.",
        "Which coffee is best for someone who likes sweet drinks?",
        "Help me choose coffee beans."
    ]
    cols = st.columns(len(suggested))
    selected_prompt = None
    for idx, prompt in enumerate(suggested):
        with cols[idx]:
            if st.button(prompt[:20] + "...", key=f"sug_{idx}", help=prompt):
                selected_prompt = prompt

    # Chat input
    user_input = st.chat_input("Ask BrewBot about our roasts, brewing, or notes...") or selected_prompt
    if user_input:
        st.session_state["chat_history"].append({"role": "user", "content": user_input})
        with st.chat_message("user"):
            st.markdown(user_input)

        with st.chat_message("assistant"):
            with st.spinner("BrewBot is preparing your recommendation..."):
                reply, source = query_brewbot(user_input, st.session_state["chat_history"])
                st.markdown(reply)
                st.session_state["chat_history"].append({"role": "assistant", "content": reply})

    st.markdown("</div>", unsafe_allow_html=True)
