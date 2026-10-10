import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  AlertCircle,
  Coffee,
  CheckCircle2,
  X
} from 'lucide-react';

export const SignInPage: React.FC = () => {
  const { signIn, setCurrentPage, addToast } = useCoffee();

  const [email, setEmail] = useState('clara.delacroix@example.com');
  const [password, setPassword] = useState('RoastMaster2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    signIn(email);
  };

  const handleDemoQuickLogin = (demoEmail: string, demoName: string) => {
    signIn(demoEmail, demoName);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      addToast('Invalid Email', 'Please provide a valid email.', 'warning');
      return;
    }
    addToast('Reset Link Sent', `A demo password reset link was sent to ${forgotEmail}.`);
    setForgotPasswordOpen(false);
    setForgotEmail('');
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
            Welcome Back
          </h1>
          <p className="text-xs text-[#7B6E66]">
            Sign in to access your order history, favorites, and loyalty rewards
          </p>
        </div>

        {/* Demo Quick login pills */}
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADBCE] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B8F77] block text-center">
            ⚡ Quick Demo Accounts
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('clara.delacroix@example.com', 'Clara Delacroix')}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-[#F0E8DF] border border-[#EADBCE] rounded-lg text-xs font-semibold text-[#2C1810] transition text-center cursor-pointer"
            >
              Clara (Gold Member)
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('marcus.chen@example.com', 'Marcus Chen')}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-[#F0E8DF] border border-[#EADBCE] rounded-lg text-xs font-semibold text-[#2C1810] transition text-center cursor-pointer"
            >
              Marcus (Regular)
            </button>
          </div>
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
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#998A80] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="clara@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#4A2C1B]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-[11px] text-[#C68B59] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
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
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-[#6B5A50] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#EADBCE] text-[#C68B59] focus:ring-[#C68B59]"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer active:scale-98"
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Link to sign up */}
        <div className="text-center pt-2 text-xs text-[#7B6E66]">
          Don't have an account yet?{' '}
          <button
            onClick={() => setCurrentPage('signup')}
            className="text-[#C68B59] font-bold hover:underline cursor-pointer"
          >
            Sign Up here
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#EADBCE] max-w-sm w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-base text-[#2C1810]">Reset Password</h3>
              <button onClick={() => setForgotPasswordOpen(false)} className="text-[#998A80] hover:text-[#2C1810]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#7B6E66]">
              Enter your account email to simulate sending a password reset instructions link.
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#2C1810] text-white text-xs font-bold rounded-xl hover:bg-[#C68B59] transition cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
