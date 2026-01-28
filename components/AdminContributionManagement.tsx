
import React from 'react';
import { Contribution } from '../types';
import { MOCK_CONTRIBUTIONS } from '../constants';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  Wallet,
  CheckCircle2,
  Clock,
  Settings2
} from 'lucide-react';

const AdminContributionManagement: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contributions Ledger</h2>
          <p className="text-slate-500 font-medium">Monitor and audit monthly remittances across the society.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
             <Settings2 size={18}/> Rules Configuration
          </button>
          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
             <Download size={18}/> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Wallet size={20}/></div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">March Collection</p>
                  <p className="text-xl font-black text-slate-900">₦450,000</p>
               </div>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 w-3/4"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">75% of expected target achieved</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle2 size={20}/></div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Remitted Members</p>
                  <p className="text-xl font-black text-slate-900">142 Members</p>
               </div>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-600 w-[92%]"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Highly compliant month</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={20}/></div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Outstanding</p>
                  <p className="text-xl font-black text-slate-900">12 Pending</p>
               </div>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-amber-600 w-1/4"></div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">Requires administrative follow-up</p>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Contribution Records</h3>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                 <input type="text" placeholder="Member Search..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/10" />
              </div>
              <button className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"><Filter size={18}/></button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contributor</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Month / Year</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Remittance</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_CONTRIBUTIONS.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="text-sm font-black text-slate-900">{c.userName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ID: #{c.userId}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-black text-slate-700">{c.month} {c.year}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Paid on {new Date(c.date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-slate-900">₦{c.amount.toLocaleString()}</td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContributionManagement;
