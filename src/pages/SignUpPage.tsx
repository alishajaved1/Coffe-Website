import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { CoffeeBeanIcon } from '../components/Illustrations';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Check,
  AlertCircle,
  Coffee
} from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { signUp, setCurrentPage } = useCoffee();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ['Too Short', 'Fair', 'Good', 'Strong', 'Master'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-emerald-600'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreedTerms) {
      setErrorMessage('Please accept the Brew & Bloom Terms and Privacy Policy.');
      return;
    }

    signUp(name.trim(), email.trim());
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADBCE] shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center mx-auto shadow-md">
            <Coffee className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
            Join the Roastery Club
          </h1>
          <p className="text-xs text-[#7B6E66]">
            Create a demo account to track orders and earn Bloom Points
          </p>
        </div>

        {/* Notice */}
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EADBCE] flex items-start gap-2.5 text-[11px] text-[#7B8F77]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#C68B59] mt-0.5" />
          <span>
            <strong>Demo Session Auth:</strong> Passwords are used for validation only and never transmitted or stored insecurely.
          </span>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#998A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Elena Rostova"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#998A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="elena@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#998A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#998A80] hover:text-[#2C1810] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-[#7B6E66]">
                  <span>Strength: {strengthLabels[strength]}</span>
                </div>
                <div className="w-full h-1.5 bg-[#EADBCE] rounded-full overflow-hidden flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full flex-1 rounded-full ${
                        i < strength ? strengthColors[strength] : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#998A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 rounded border-[#EADBCE] text-[#C68B59] focus:ring-[#C68B59] cursor-pointer"
            />
            <label htmlFor="terms" className="text-[11px] text-[#6B5A50] leading-snug cursor-pointer">
              I agree to the Brew & Bloom Terms of Service and acknowledge the coffee privacy guidelines.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer active:scale-98"
          >
            Create My Account (+100 Pts)
          </button>
        </form>

        {/* Link to sign in */}
        <div className="text-center pt-2 text-xs text-[#7B6E66]">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentPage('signin')}
            className="text-[#C68B59] font-bold hover:underline cursor-pointer"
          >
            Sign In here
          </button>
        </div>

      </div>
    </div>
  );
};
