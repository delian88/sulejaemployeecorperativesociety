
import React from 'react';
import { Landmark, TrendingUp, Handshake, Heart, ChevronLeft, CheckCircle2 } from 'lucide-react';

const BenefitsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const benefits = [
    {
      icon: Handshake,
      title: "Low-Interest Credit Facilities",
      desc: "Access loans at a flat 4.5% interest rate, significantly lower than commercial bank rates. We offer Educational, Medical, and Asset Acquisition loans."
    },
    {
      icon: TrendingUp,
      title: "Annual Surplus Dividends",
      desc: "Every member is a shareholder. At the end of each financial year, profits generated from loan interests are distributed back to members as dividends."
    },
    {
      icon: Heart,
      title: "Social Welfare Support",
      desc: "We provide interest-free emergency grants for members facing extreme hardship, ensuring no colleague is left behind during difficult times."
    },
    {
      icon: Landmark,
      title: "Hassle-Free Savings",
      desc: "Automated payroll deductions mean you save before you spend. Your wealth grows consistently without you needing to visit a bank."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 w-full bg-white border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-700 transition-colors">
            <ChevronLeft size={20} /> Back to Home
          </button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Member Benefits & Privileges</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Why Suleja LGA employees trust us with their financial future.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-200 transition-all group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <b.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{b.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-6">{b.desc}</p>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <CheckCircle2 size={18} /> Exclusive to Active Members
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience These Benefits?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg">Join 1,200 of your colleagues and start building your financial legacy today.</p>
          <button onClick={onBack} className="px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all">
            Join the Cooperative Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage;
