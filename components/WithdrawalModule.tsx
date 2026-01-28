
import React, { useState } from 'react';
import { User } from '../types';
import { Wallet, ArrowDownRight, Info, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

const WithdrawalModule: React.FC<{ user: User }> = ({ user }) => {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Typical Coop Rule: Must leave at least 20% or a fixed minimum
  const availableBalance = user.totalContributions * 0.8; 

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(amount) > availableBalance) {
      alert("Amount exceeds available withdrawal limit.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Request Submitted</h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Your withdrawal request of ₦{parseFloat(amount).toLocaleString()} has been sent to the Finance Committee for review. This typically takes 3-5 working days.
          </p>
        </div>
        <button 
          onClick={() => setSuccess(false)} 
          className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl transition-transform active:scale-95"
        >
          Return to Summary
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Withdrawal Request</h2>
        <p className="text-slate-500">Request a portion of your personal contributions from your cooperative account.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Balance Breakdown Card */}
          <div className="bg-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Total Contributions</p>
                <h3 className="text-4xl font-black">₦{user.totalContributions.toLocaleString()}</h3>
              </div>
              <div className="h-16 w-px bg-white/20 hidden md:block"></div>
              <div>
                <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                  Available for Withdrawal <Info size={12} />
                </p>
                <h3 className="text-4xl font-black">₦{availableBalance.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Withdrawal Amount (₦)</label>
                <div className="relative">
                  <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input 
                    type="number" 
                    max={availableBalance}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-bold text-xl"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium ml-1">
                  Minimum Retention: ₦{(user.totalContributions * 0.2).toLocaleString()} (20%)
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason for Withdrawal</label>
                <textarea 
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide a brief explanation for this request..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium text-sm"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || !amount}
                className="w-full py-5 bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-200 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 text-lg"
              >
                {loading ? "Submitting..." : `Request ₦${parseFloat(amount || '0').toLocaleString()}`} <ArrowDownRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 space-y-4">
            <div className="flex items-center gap-3 text-amber-700">
              <AlertCircle size={20} />
              <h4 className="font-black text-xs uppercase tracking-widest">Withdrawal Policy</h4>
            </div>
            <ul className="space-y-3 text-xs text-amber-800 font-medium">
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                Members must maintain a minimum retention of 20% of their total contributions.
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                Withdrawals are subject to verification of outstanding loan obligations.
              </li>
              <li className="flex gap-2">
                <span className="shrink-0">•</span>
                Approvals are finalized by the Board of Trustees every Wednesday.
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Request History</h4>
             <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                   <Calendar size={20} className="text-slate-300" />
                </div>
                <p className="text-xs text-slate-400 font-medium italic">No recent withdrawal requests found.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModule;
