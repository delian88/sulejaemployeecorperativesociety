
import React from 'react';
import { ShieldCheck, TrendingUp, Handshake, Landmark, ChevronRight, CheckCircle2, Wallet } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
  onApply: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onApply }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-700 rounded flex items-center justify-center">
              <Landmark className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900">SULEJA LGA</h1>
              <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Employee Cooperative</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">About Us</a>
            <a href="#benefits" className="text-sm font-medium text-slate-600 hover:text-indigo-700 transition-colors">Benefits</a>
            <button 
              onClick={onLogin}
              className="px-6 py-2.5 bg-slate-100 text-slate-900 font-bold rounded-lg text-sm hover:bg-slate-200 transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={onApply}
              className="px-6 py-2.5 bg-indigo-700 text-white font-bold rounded-lg text-sm hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-200"
            >
              Apply Online
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -skew-x-12 translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Official Cooperative Platform
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
              Securing Your Financial <span className="text-indigo-700">Future</span> Together.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Empowering Suleja Local Government employees through sustainable savings, low-interest credit facilities, and professional financial management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onApply}
                className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-xl text-lg hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-200"
              >
                Start Your Membership <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-xl">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" />)}
                 </div>
                 <p className="text-xs font-medium text-slate-500"><span className="text-slate-900 font-bold">1,200+</span> Active Members</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1573164060897-42571820373a?q=80&w=1469&auto=format&fit=crop" 
                alt="Nigerian Finance" 
                className="w-full h-full object-cover opacity-80 mix-blend-multiply"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/95 backdrop-blur p-8 rounded-2xl shadow-2xl max-w-xs text-center border border-white">
                    <ShieldCheck size={48} className="text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">Guaranteed Security</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">Your contributions are backed by the State's strongest financial audits and insurance.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Why Join Our Multipurpose Society?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Designed exclusively for the welfare and prosperity of Suleja Local Government staff.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Affordable Loans", 
              desc: "Access credit for housing, education, and business at the lowest interest rates in the region.", 
              icon: Handshake,
              color: "text-emerald-600",
              bg: "bg-emerald-50"
            },
            { 
              title: "Dividend Payouts", 
              desc: "Enjoy annual surplus sharing based on your contribution and activity within the society.", 
              icon: TrendingUp,
              color: "text-indigo-600",
              bg: "bg-indigo-50"
            },
            { 
              title: "Automated Savings", 
              desc: "Hassle-free monthly deductions from source ensuring consistent growth of your wealth.", 
              icon: Wallet,
              color: "text-sky-600",
              bg: "bg-sky-50"
            }
          ].map((benefit, i) => (
            <div key={i} className="p-10 bg-white border border-slate-100 rounded-3xl hover:border-indigo-200 hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <benefit.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-slate-400 mb-10">Join thousands of your colleagues who are already building a safer tomorrow.</p>
          <button 
            onClick={onApply}
            className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl text-xl hover:bg-slate-100 transition-all"
          >
            Apply for Membership Now
          </button>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-70">
            <Landmark size={24} />
            <span className="text-sm font-bold">SULEJA LGA COOP</span>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            © 2024 Suleja LGA Employee Multipurpose Cooperative Society
          </div>
          <div className="text-sm font-bold text-slate-400 tracking-tight">
            Powered by <a href="https://premegagetech.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Premegage Tech Solution</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
