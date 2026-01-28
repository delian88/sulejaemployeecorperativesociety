
import React from 'react';
import { User } from '../types';
import { 
  Wallet, 
  Search, 
  ArrowDownRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  MoreVertical,
  ShieldAlert
} from 'lucide-react';

const AdminWithdrawalManagement: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Withdrawal Requests</h2>
          <p className="text-slate-500 font-medium">Manage and process fund withdrawal applications from member savings.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
              All History
           </button>
           <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
              <ShieldAlert size={18}/> Urgent Queue
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Find request by member name or ID..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5" />
           </div>
           <select className="text-[10px] font-black uppercase tracking-widest px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-500 outline-none">
              <option>Status: Pending Approval</option>
              <option>Status: Paid</option>
              <option>Status: All</option>
           </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Member Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Withdrawal Amount</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Eligibility Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Wallet size={18}/></div>
                        <div>
                           <p className="text-sm font-black text-slate-900">Ahmed Bello</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Applied 3 hours ago</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <p className="text-sm font-black text-slate-900">₦120,000</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">From ₦2,100,000 Total</p>
                  </td>
                  <td className="px-8 py-5">
                     <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                        <CheckCircle2 size={12}/> Eligible
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <div className="flex items-center justify-end gap-2">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all">Approve</button>
                        <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><XCircle size={18}/></button>
                        <button className="p-2 text-slate-300 hover:text-slate-900 rounded-xl transition-all"><MoreVertical size={18}/></button>
                     </div>
                  </td>
               </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-20 text-center space-y-4">
           <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200"><Clock size={40}/></div>
           <div>
              <p className="text-sm font-black text-slate-400">End of Queue</p>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No more pending withdrawal requests</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawalManagement;
