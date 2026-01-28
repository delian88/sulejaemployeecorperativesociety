
import React, { useState } from 'react';
import { CreditCard, Wallet, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const PaymentModule: React.FC = () => {
  const [amount, setAmount] = useState('10000');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
          <p className="text-slate-500 max-w-xs mx-auto">Your monthly contribution of ₦{parseInt(amount).toLocaleString()} has been processed and added to your total savings.</p>
        </div>
        <button onClick={() => setSuccess(false)} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl">Done</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Monthly Contribution</h2>
        <p className="text-slate-500">Securely remit your monthly savings to your cooperative account.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <form onSubmit={handlePay} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contribution Amount (₦)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all font-bold text-lg"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="p-4 border-2 border-indigo-600 bg-indigo-50 rounded-xl flex flex-col items-center gap-2">
                  <CreditCard className="text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-700">Bank Card</span>
                </button>
                <button type="button" className="p-4 border-2 border-slate-100 hover:border-indigo-100 rounded-xl flex flex-col items-center gap-2 grayscale">
                  <Wallet className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-500">Wallet</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-black rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Processing..." : `Pay ₦${parseInt(amount).toLocaleString()}`}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Savings Insight</h4>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400">Total Contribution</p>
                <p className="text-2xl font-black">₦1,250,000</p>
              </div>
              <div className="text-emerald-400 flex items-center gap-1 text-sm font-bold">
                <Calendar size={14} /> Next due in 8 days
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
            <AlertTriangle className="text-amber-600 shrink-0" size={20} />
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              Note: Contributions are locked for a minimum of 6 months before eligible for withdrawal. Late payments may affect your loan eligibility rating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModule;
