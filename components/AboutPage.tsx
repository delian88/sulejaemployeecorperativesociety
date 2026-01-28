
import React from 'react';
import { Landmark, Target, ShieldCheck, Users, ChevronLeft } from 'lucide-react';

const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-700 transition-colors">
            <ChevronLeft size={20} /> Back to Home
          </button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 mb-8">About Suleja LGA Cooperative</h1>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-8">
          <p className="text-xl leading-relaxed">
            The Suleja Local Government Area Employee Multipurpose Cooperative Society was established with a singular vision: 
            <strong> to foster financial independence and collective prosperity among the dedicated public servants of Suleja.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <Target className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
              <p>To provide professional, transparent, and efficient financial services that empower our members through ethical credit facilities and robust savings schemes.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <ShieldCheck className="text-indigo-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Values</h3>
              <p>Integrity, Accountability, and Mutual Growth are the pillars of our society. We ensure every Naira contributed is safeguarded and put to work for the community.</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 mt-16 mb-6">Our History</h2>
          <p>
            Founded over a decade ago, we began as a small group of civil servants looking to provide an alternative to the high-interest commercial banks. 
            Today, we have grown into the largest employee-led financial institution in Niger State, serving over 1,200 active members with a portfolio 
            worth hundreds of millions of Naira.
          </p>

          <div className="bg-indigo-700 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center gap-8 my-16">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">10+ Years</h3>
              <p className="text-indigo-100">Of Service Excellence</p>
            </div>
            <div className="h-12 w-px bg-white/20 hidden md:block"></div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">1,200+</h3>
              <p className="text-indigo-100">Active Members</p>
            </div>
            <div className="h-12 w-px bg-white/20 hidden md:block"></div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2">₦500M+</h3>
              <p className="text-indigo-100">Total Assets Managed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
