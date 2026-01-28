
import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Handshake, Landmark, ChevronRight, CheckCircle2, Wallet, Menu, X } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onApply: () => void;
}

// Global hook or shared state would be better, but we'll use a local mock "navigation" by props if needed.
// For this app, App.tsx handles the view switching. We'll simulate navigation by calling parent setters if we were in a router.
// Since we are in a single component, we'll assume the parent App.tsx listens for these.
// I will update LandingPage to accept these props.

const LandingPage: React.FC<LandingPageProps & { onNav: (view: any) => void }> = ({ onLogin, onApply, onNav }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-700 rounded flex items-center justify-center shadow-lg shadow-indigo-100">
              <Landmark className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900">SULEJA LGA</h1>
              <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Employee Cooperative</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNav('about')} className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors">About Us</button>
            <button onClick={() => onNav('benefits')} className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors">Benefits</button>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-8 ml-2">
              <button onClick={onLogin} className="text-sm font-bold text-slate-900 hover:text-indigo-700 transition-colors">Sign In</button>
              <button onClick={onApply} className="px-6 py-2.5 bg-indigo-700 text-white font-bold rounded-xl text-sm hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100">Apply Online</button>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-4">
            <button onClick={() => { onNav('about'); setIsMenuOpen(false); }} className="text-lg font-bold text-slate-900 text-left">About Us</button>
            <button onClick={() => { onNav('benefits'); setIsMenuOpen(false); }} className="text-lg font-bold text-slate-900 text-left">Benefits</button>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-4">
              <button onClick={onLogin} className="w-full py-4 text-center font-bold text-slate-900 border border-slate-200 rounded-xl">Sign In</button>
              <button onClick={onApply} className="w-full py-4 bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100">Apply for Membership</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero and Sections (same content as before, just ensuring navigation works) */}
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -skew-x-12 translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Official Cooperative Platform</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">Securing Your Financial <span className="text-indigo-700">Future</span> Together.</h1>
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">Empowering Suleja Local Government employees through sustainable savings, low-interest credit facilities, and professional financial management.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={onApply} className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl text-lg shadow-xl shadow-indigo-100">Join the Society Now</button>
              <button onClick={() => onNav('benefits')} className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl text-lg shadow-sm">Explore Benefits</button>
            </div>
          </div>
          <div className="relative">
             <div className="bg-indigo-600 rounded-[3rem] overflow-hidden shadow-2xl relative aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1573164060897-42571820373a?q=80&w=1469&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                   <div className="bg-white/95 backdrop-blur p-8 rounded-3xl shadow-2xl text-center border border-white">
                      <ShieldCheck size={48} className="text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900">Guaranteed Security</h3>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">Your contributions are protected by government audits and robust safeguards.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
