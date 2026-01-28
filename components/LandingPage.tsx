
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Handshake, 
  Landmark, 
  ChevronRight, 
  CheckCircle2, 
  Wallet, 
  Menu, 
  X, 
  Users, 
  ArrowRight,
  Heart,
  BarChart3,
  Award
} from 'lucide-react';
import { useToast } from './Toast';

interface LandingPageProps {
  onLogin: () => void;
  onApply: () => void;
  onNav: (view: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onApply, onNav }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showToast } = useToast();

  const handleNav = (view: string, label: string) => {
    onNav(view);
    setIsMenuOpen(false);
    showToast(`Opening ${label}...`, "info");
  };

  const pillars = [
    { icon: ShieldCheck, title: "Verified Security", desc: "Monitored by Local Government Audit and protected by the society's constitution." },
    { icon: TrendingUp, title: "Asset Growth", desc: "We ensure consistent growth of member contributions through ethical credit facilities." },
    { icon: Handshake, title: "Member Welfare", desc: "Prioritizing the financial well-being of every Suleja LGA staff member since inception." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNav('landing', 'Home')}>
            <div className="h-10 w-10 bg-indigo-700 rounded flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:rotate-6 transition-transform">
              <Landmark className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-none text-slate-900">SULEJA LGA</h1>
              <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider">Employee Cooperative</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNav('about', 'About Us')} className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-all hover:-translate-y-0.5">About Us</button>
            <button onClick={() => handleNav('benefits', 'Benefits')} className="text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-all hover:-translate-y-0.5">Benefits</button>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-8 ml-2">
              <button onClick={onLogin} className="text-sm font-bold text-slate-900 hover:text-indigo-700 transition-colors">Sign In</button>
              <button onClick={onApply} className="px-6 py-2.5 bg-indigo-700 text-white font-bold rounded-xl text-sm hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95">Apply Online</button>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <button onClick={() => handleNav('about', 'About Us')} className="text-lg font-bold text-slate-900 text-left">About Us</button>
            <button onClick={() => handleNav('benefits', 'Benefits')} className="text-lg font-bold text-slate-900 text-left">Benefits</button>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-4">
              <button onClick={onLogin} className="w-full py-4 text-center font-bold text-slate-900 border border-slate-200 rounded-xl">Sign In</button>
              <button onClick={onApply} className="w-full py-4 bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100">Apply for Membership</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-32 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 -skew-x-12 translate-x-1/4 -z-10 animate-pulse duration-[5000ms]"></div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left opacity-0 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 stagger-1">Official Cooperative Platform</span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight stagger-2">Securing Your Financial <span className="text-indigo-700">Future</span> Together.</h1>
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 stagger-3">Empowering Suleja Local Government employees through sustainable savings, low-interest credit facilities, and professional financial management.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start stagger-4">
              <button onClick={onApply} className="px-8 py-4 bg-indigo-700 text-white font-bold rounded-2xl text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-800 transition-all hover:scale-105 active:scale-95">Join the Society Now <ChevronRight size={20}/></button>
              <button onClick={() => handleNav('benefits', 'Benefits')} className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl text-lg shadow-sm hover:bg-slate-50 transition-all hover:border-indigo-200 active:scale-95">Explore Benefits</button>
            </div>
          </div>
          <div className="relative opacity-0 animate-fade-in-up stagger-3">
             <div className="bg-indigo-600 rounded-[3rem] overflow-hidden shadow-2xl relative aspect-[4/3] group">
                <img src="https://images.unsplash.com/photo-1573164060897-42571820373a?q=80&w=1469&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-110" alt="Workforce" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                   <div className="bg-white/95 backdrop-blur p-8 rounded-3xl shadow-2xl text-center border border-white transform transition-transform duration-500 group-hover:-translate-y-2">
                      <Award size={48} className="text-indigo-600 mx-auto mb-4 animate-bounce" />
                      <h3 className="text-xl font-bold text-slate-900">Excellence in Service</h3>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">Voted the most transparent cooperative society in Niger State for three consecutive years.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Core Pillars */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <div key={i} className={`group opacity-0 animate-fade-in-up stagger-${i+1}`}>
                <div className="w-16 h-16 bg-slate-50 text-indigo-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-700 group-hover:text-white group-hover:rotate-12 transition-all duration-300">
                  <pillar.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{pillar.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-black mb-6">Our Impact in Suleja</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Providing a safety net and growth engine for the local government workforce.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Active Members', value: '1,240', icon: Users },
              { label: 'Total Assets Managed', value: '₦500M+', icon: Wallet },
              { label: 'Loans Disbursed', value: '₦350M+', icon: Handshake },
              { label: 'Financial Excellence', value: '10+ Yrs', icon: BarChart3 },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <stat.icon className="mx-auto mb-4 text-indigo-400" size={32} />
                <h4 className="text-4xl font-black mb-1">{stat.value}</h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
               <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">Modern Solutions for <span className="text-indigo-700">Professional</span> Cooperatives.</h2>
               <div className="space-y-6">
                 {[
                   { icon: CheckCircle2, title: "Automated Payroll Remittance", desc: "No more queues. Your contributions are automatically deducted and tracked in real-time." },
                   { icon: CheckCircle2, title: "Digital Loan Applications", desc: "Apply for credit from your phone and track approval status through our multi-level workflow." },
                   { icon: CheckCircle2, title: "AI-Powered Financial Insights", desc: "Get personalized savings and investment advice powered by our Gemini-integrated advisor." }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:translate-x-2">
                      <feat.icon className="text-indigo-600 shrink-0" size={24}/>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{feat.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-indigo-700 aspect-square rounded-[2rem] p-8 flex flex-col justify-end text-white hover:scale-105 transition-all duration-500 shadow-xl">
                  <Heart size={32} className="mb-4 text-indigo-300" />
                  <p className="font-black text-lg">Social Support</p>
                </div>
                <div className="bg-slate-900 aspect-[3/4] rounded-[2rem] p-8 flex flex-col justify-end text-white hover:scale-105 transition-all duration-500 shadow-xl">
                  <TrendingUp size={32} className="mb-4 text-emerald-400" />
                  <p className="font-black text-lg leading-tight">Investment Dividends</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-100 aspect-[3/4] rounded-[2rem] p-8 flex flex-col justify-end text-slate-900 hover:scale-105 transition-all duration-500 shadow-xl border border-slate-200">
                  <Users size={32} className="mb-4 text-indigo-700" />
                  <p className="font-black text-lg leading-tight">1,200+ Colleagues</p>
                </div>
                <div className="bg-white border border-slate-200 aspect-square rounded-[2rem] p-8 flex flex-col justify-end text-slate-900 hover:scale-105 transition-all duration-500 shadow-xl">
                  <CheckCircle2 size={32} className="mb-4 text-indigo-700" />
                  <p className="font-black text-lg leading-tight">Digital First</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-indigo-700 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl group">
           <div className="absolute top-0 left-0 w-full h-full bg-slate-900/10 -z-0"></div>
           <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-black mb-8 leading-tight">Ready to Take Control of Your Financial Future?</h2>
              <p className="text-indigo-100 mb-12 text-lg lg:text-xl max-w-2xl mx-auto font-medium">Join the thousands of Suleja LGA staff members who are building sustainable wealth through our community-led platform.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={onApply} className="px-10 py-5 bg-white text-indigo-700 font-black rounded-2xl hover:bg-indigo-50 transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95">Start Enrollment <ArrowRight size={20}/></button>
                 <button onClick={onLogin} className="px-10 py-5 bg-indigo-800/50 text-white font-black border border-indigo-400/30 rounded-2xl hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 active:scale-95">Member Login <Landmark size={20}/></button>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <Landmark size={24} />
              <div className="text-left leading-none">
                 <p className="text-sm font-bold">SULEJA LGA</p>
                 <p className="text-[10px] uppercase font-black tracking-widest">Cooperative Society</p>
              </div>
           </div>
           <p className="text-xs text-slate-400 font-medium">© 2024 Suleja Local Government Area. All Rights Reserved. Designed for Enterprise Financial Compliance.</p>
           <div className="flex gap-6">
              <button onClick={() => handleNav('about', 'Privacy Policy')} className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-700 tracking-widest transition-colors">Privacy</button>
              <button onClick={() => handleNav('about', 'Terms of Service')} className="text-[10px] font-black uppercase text-slate-400 hover:text-indigo-700 tracking-widest transition-colors">Terms</button>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
