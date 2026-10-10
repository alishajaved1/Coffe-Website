import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { CoffeeBeanIcon, CoffeeSteam } from '../components/Illustrations';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useCoffee();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast('Missing Fields', 'Please complete all required fields.', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Message Dispatched', 'Thank you! Our head barista will get back to you within 24 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#2C1810] text-xs font-semibold">
          <CoffeeBeanIcon size={14} className="text-[#7B8F77]" />
          <span>Warm Hospitality & Roastery Visits</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2C1810]">
          Connect with Our Roasters
        </h1>
        <p className="text-sm text-[#5A463C] leading-relaxed">
          Questions about single-origin batch drops, wholesale bean partnerships, or cupping reservations? We are here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#FDFBF7] p-8 sm:p-10 rounded-3xl border border-[#EADBCE] shadow-lg space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2C1810]">
            Send Us a Message
          </h2>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-[#EADBCE] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#7B8F77] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">Message Received!</h3>
              <p className="text-xs text-[#7B6E66] max-w-sm mx-auto">
                Thank you for reaching out to Brew & Bloom. We have received your inquiry and will reply to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-5 py-2 rounded-xl bg-[#2C1810] text-white text-xs font-semibold hover:bg-[#C68B59] transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Amara Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="amara@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59] cursor-pointer"
                >
                  <option>General Inquiry</option>
                  <option>Coffee Cupping Workshop Reservation</option>
                  <option>Wholesale & Café Beans</option>
                  <option>Order & Delivery Support</option>
                  <option>Private Event Hire</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what's on your mind or request a table for our weekend coffee tasting session..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Brew & Bloom</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Roastery Info & Hours */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#FAF7F2] p-7 rounded-3xl border border-[#EADBCE] space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#2C1810]">
              Flagship Roastery & Café
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#5A463C]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C68B59] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C1810] block">Pacific Grove Roastery:</strong>
                  <span>482 Bloom Avenue, Heritage District, Pacific Grove, CA 93950</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C68B59] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C1810] block">Hours of Operation:</strong>
                  <span>Monday – Friday: 6:30 AM – 7:00 PM</span><br />
                  <span>Saturday – Sunday: 7:30 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C68B59] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C1810] block">Direct Telephone:</strong>
                  <span>+1 (831) 555-BREW (2739)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C68B59] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#2C1810] block">Concierge Email:</strong>
                  <span>concierge@brewandbloom.coffee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekend Cupping Banner */}
          <div className="bg-linear-to-tr from-[#2C1810] to-[#4A2C1B] p-6 rounded-3xl text-white space-y-3 border border-[#C68B59]/40">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C68B59]">
              <Calendar className="w-4 h-4" />
              <span>Saturday Public Cupping (10:00 AM)</span>
            </div>
            <h4 className="font-serif text-lg font-bold">
              Taste 5 Single-Origins with Our Master Roasters
            </h4>
            <p className="text-xs text-[#D5C2B4] leading-relaxed">
              Experience sensory cupping protocols, identify tasting notes of peach and jasmine, and take home a complimentary 250g bag.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
