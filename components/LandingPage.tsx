
import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Handshake, Landmark, ChevronRight, CheckCircle2, Wallet, Menu, X } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onApply: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onApply }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
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
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors">About Us</a>
            <a href="#benefits" className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors">Benefits</a>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-8 ml-2">
              <button 
                onClick={onLogin}
                className="text-sm font-bold text-slate-900 hover:text-indigo-700 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onApply}
                className="px-6 py-2.5 bg-indigo-700 text-white font-bold rounded-xl text-sm hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100"
              >
                Apply Online
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">About Us</a>
            <a href="#benefits" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-slate-900">Benefits</a>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-4">
              <button 
                onClick={onLogin}
                className="w-full py-4 text-center font-bold text-slate-900 border border-slate-200 rounded-xl"
              >
                Sign In
              </button>
              <button 
                onClick={onApply}
                className="w-full py-4 bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -skew-x-12 translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Official Cooperative Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Securing Your Financial <span className="text-indigo-700">Future</span> Together.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Empowering Suleja Local Government employees through sustainable savings, low-interest credit facilities, and professional financial management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button 
                onClick={onApply}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl text-lg hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-100 active:scale-95"
              >
                Start Your Membership <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white object-cover" />)}
                 </div>
                 <p className="text-xs font-medium text-slate-500"><span className="text-slate-900 font-bold">1,200+</span> Active Members</p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0 px-4 sm:px-0">
            <div className="bg-indigo-600 rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/3] max-w-2xl mx-auto transform hover:rotate-1 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1573164060897-42571820373a?q=80&w=1469&auto=format&fit=crop" 
                alt="Financial Management" 
                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                 <div className="bg-white/95 backdrop-blur p-6 sm:p-8 rounded-3xl shadow-2xl max-w-xs text-center border border-white">
                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Guaranteed Security</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">Your contributions are protected by government-standard audits and robust financial safeguards.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 lg:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">Why Join Our Society?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">Designed exclusively for the professional growth and financial welfare of Suleja Local Government staff.</p>
        </div>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {[
            { 
              title: "Affordable Loans", 
              desc: "Access credit for housing, education, and business at the region's lowest flat interest rates.", 
              icon: Handshake,
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            },
            { 
              title: "Dividend Payouts", 
              desc: "Earn regular surplus shares based on your annual savings and participation activity.", 
              icon: TrendingUp,
              color: "text-indigo-600",
              bg: "bg-indigo-50"
            },
            { 
              title: "Automated Savings", 
              desc: "Direct-source payroll deductions ensure your wealth grows consistently without effort.", 
              icon: Wallet,
              color: "text-sky-600",
              bg: "bg-sky-50"
            }
          ].map((benefit, i) => (
            <div key={i} className="p-8 lg:p-12 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-200 hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform">
                <benefit.icon size={100} />
              </div>
              <div className={`w-16 h-16 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <benefit.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 bg-slate-900 relative overflow-hidden rounded-t-[3rem] lg:rounded-t-[5rem]">
        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">Ready to Secure Your Future?</h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join thousands of colleagues building a solid financial foundation for their families today.</p>
          <button 
            onClick={onApply}
            className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black rounded-2xl text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95"
          >
            Apply for Membership Online
          </button>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 lg:py-20 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center grayscale opacity-70">
                <Landmark size={28} />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Suleja LGA Cooperative</p>
                <p className="text-[10px] text-slate-400 font-bold">Multipurpose CMS</p>
              </div>
            </div>
            <div className="text-sm text-slate-500 font-bold text-center">
              © 2024 Suleja LGA Employee Multipurpose Cooperative Society. All Rights Reserved.
            </div>
            <div className="flex flex-col items-center lg:items-end gap-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Technology Provider</p>
              <a href="https://premegagetech.com" target="_blank" rel="noopener noreferrer" className="text-sm font-black text-indigo-600 hover:text-indigo-800 transition-colors tracking-tight">
                Premegage Tech Solution
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
