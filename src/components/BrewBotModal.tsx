import React, { useState, useRef, useEffect } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { CoffeeSteam, CoffeeBeanIcon } from './Illustrations';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Coffee,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: string;
}

const SUGGESTED_QUESTIONS = [
  'Which coffee should I try first?',
  'What is the difference between a latte and a cappuccino?',
  'Recommend a coffee for my morning.',
  'Which coffee is best for someone who likes sweet drinks?',
  'Tell me about Brew & Bloom.',
  'Help me choose coffee beans.'
];

export const BrewBotModal: React.FC = () => {
  const { isBrewBotOpen, setIsBrewBotOpen, brewBotInitialPrompt, setBrewBotInitialPrompt, setCurrentPage } = useCoffee();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Warm greetings! ☕ I'm **BrewBot**, your Brew & Bloom Master Coffee Companion. Whether you're curious about flavor profiles, seeking your next morning brew, or curious about our bean origins, ask me anything!",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isBrewBotOpen) {
      scrollToBottom();
    }
  }, [messages, isBrewBotOpen]);

  // Handle triggered initial prompt from pages
  useEffect(() => {
    if (brewBotInitialPrompt && isBrewBotOpen) {
      handleSendMessage(brewBotInitialPrompt);
      setBrewBotInitialPrompt(null);
    }
  }, [brewBotInitialPrompt, isBrewBotOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      if (!response.ok) {
        throw new Error('Chat service encountered an error.');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: data.reply || "I'm right here enjoying the roast aroma. How can I help you savor your next cup?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Graceful local sommelier reply
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: "☕ Our roasting masters recommend starting with our **Artisan Cappuccino** ($4.75) with velvet microfoam, or the **Signature House Blend** ($18.50) with notes of caramelized hazelnut and dark chocolate. How else may I guide your palate today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-companion'
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "Conversation refreshed! ☕ Ask me anything about Brew & Bloom's artisan roasts, brewing ratios, or menu recommendations.",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isBrewBotOpen && (
        <button
          onClick={() => setIsBrewBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-linear-to-r from-[#2C1810] to-[#4A2C1B] text-[#FDFBF7] shadow-2xl hover:scale-108 transition-all duration-300 border-2 border-[#C68B59]/60 flex items-center gap-3 group cursor-pointer"
          aria-label="Open BrewBot Coffee Companion"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-[#C68B59] group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="font-serif font-semibold text-sm pr-1">BrewBot AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isBrewBotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[600px] max-h-[85vh] bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-linear-to-r from-[#2C1810] to-[#3E2114] text-[#FDFBF7] p-4 flex items-center justify-between border-b border-[#4A2C1B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C68B59] text-[#2C1810] flex items-center justify-center font-bold relative">
                <Coffee className="w-5 h-5 stroke-[2]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#2C1810]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-base text-white">BrewBot</h3>
                  <span className="text-[10px] bg-[#4A2C1B] text-[#C68B59] font-mono px-1.5 py-0.5 rounded">
                    AI Barista
                  </span>
                </div>
                <p className="text-[11px] text-[#D5C2B4]">Your Personal Coffee Sommelier</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-2 text-[#D5C2B4] hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsBrewBotOpen(false)}
                title="Close chat"
                className="p-2 text-[#D5C2B4] hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subtitle notification */}
          <div className="bg-[#FAF7F2] px-4 py-2 border-b border-[#EADBCE] text-[11px] text-[#7B8F77] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CoffeeBeanIcon size={12} className="text-[#C68B59]" />
              Powered by Google Gemini & Brew & Bloom Roasting Science
            </span>
            <button
              onClick={() => {
                setIsBrewBotOpen(false);
                setCurrentPage('menu');
              }}
              className="text-[#C68B59] font-medium hover:underline flex items-center gap-0.5"
            >
              Menu <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]/40">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center shrink-0 mt-1">
                      <Coffee className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isBot
                        ? 'bg-[#FDFBF7] text-[#2C1810] border border-[#EADBCE] shadow-xs'
                        : 'bg-[#2C1810] text-[#FDFBF7] rounded-br-xs shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                          {paragraph.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </p>
                      ))}
                    </div>
                    <span
                      className={`block text-[9px] mt-1.5 ${
                        isBot ? 'text-[#998A80]' : 'text-neutral-400 text-right'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center shrink-0 mt-1">
                  <Coffee className="w-3.5 h-3.5" />
                </div>
                <div className="bg-[#FDFBF7] border border-[#EADBCE] p-3 rounded-2xl rounded-bl-xs flex items-center gap-2 text-xs text-[#7B6E66]">
                  <CoffeeSteam className="h-4" />
                  <span>BrewBot is crafting recommendations...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          <div className="p-2.5 bg-[#F5EFEB]/60 border-t border-[#EADBCE] overflow-x-auto no-scrollbar flex gap-1.5">
            {SUGGESTED_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#2C1810] text-[#4A2C1B] hover:text-white border border-[#EADBCE] text-[11px] font-medium transition cursor-pointer shrink-0"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-3 bg-[#FDFBF7] border-t border-[#EADBCE]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about roasts, notes, brewing or drinks..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] disabled:opacity-40 text-white transition cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
