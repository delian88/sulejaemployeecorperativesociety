
import React from 'react';
import { LoanApplication, LoanStatus, User, UserRole } from '../types';
import { MOCK_LOANS } from '../constants';
import { 
  FileText, 
  Calendar, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Filter,
  DollarSign
} from 'lucide-react';

const LoanStatusBadge = ({ status }: { status: LoanStatus }) => {
  const styles = {
    [LoanStatus.PENDING]: 'bg-amber-50 text-amber-700 border-amber-200',
    [LoanStatus.REVIEWING]: 'bg-blue-50 text-blue-700 border-blue-200',
    [LoanStatus.APPROVED]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    [LoanStatus.REJECTED]: 'bg-rose-50 text-rose-700 border-rose-200',
    [LoanStatus.DISBURSED]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    [LoanStatus.COMPLETED]: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

const LoanManagement: React.FC<{ user: User }> = ({ user }) => {
  const userLoans = user.role === UserRole.MEMBER 
    ? MOCK_LOANS.filter(l => l.userId === user.id)
    : MOCK_LOANS;

  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Loan Portfolio</h2>
          <p className="text-slate-500 font-medium">Manage credit applications and repayment schedules.</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-sm font-black text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95">
          <Plus size={18} /> New Application
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Filter Sidebar - Hidden on small, visible on lg */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-2 mb-6 font-black text-slate-400 text-[11px] uppercase tracking-widest">
                <Filter size={16} className="text-indigo-500" /> <span>Quick Filters</span>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-300 block mb-3 tracking-widest">By Status</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Pending', 'Active', 'Settled'].map(opt => (
                      <button key={opt} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors ${opt === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-50">
                  <label className="text-[10px] font-black uppercase text-slate-300 block mb-3 tracking-widest">Date Applied</label>
                  <select className="w-full text-xs font-bold border border-slate-100 rounded-xl p-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500/10 outline-none">
                    <option>Last 30 Days</option>
                    <option>Year to Date</option>
                    <option>Lifetime History</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[2rem] p-6 shadow-sm">
              <h4 className="font-black text-indigo-900 flex items-center gap-2 text-xs uppercase tracking-widest">
                <AlertCircle size={16} /> Loan Terms
              </h4>
              <ul className="mt-4 space-y-4 text-[10px] text-indigo-700 font-bold uppercase tracking-wider">
                <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Max loan: 200% of balance</li>
                <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> Tenure: Up to 24 Months</li>
                <li className="flex gap-3 items-center"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div> 4.5% Flat Interest P.A.</li>
              </ul>
            </div>
         </div>

         {/* Loan Content Area */}
         <div className="lg:col-span-3">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Application Details</th>
                       <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Principal & Installment</th>
                       <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Current Status</th>
                       <th className="px-6 py-5 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {userLoans.map((loan) => (
                       <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="px-6 py-5">
                           <div className="flex items-center gap-4">
                             <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                               <FileText size={22} />
                             </div>
                             <div>
                               <p className="text-sm font-black text-slate-900 leading-tight">#{loan.id.toUpperCase()}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{loan.purpose}</p>
                               <p className="text-[9px] text-indigo-400 font-black mt-0.5">{new Date(loan.dateApplied).toLocaleDateString()}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-6 py-5">
                           <p className="text-sm font-black text-slate-900">₦{loan.amount.toLocaleString()}</p>
                           <p className="text-[10px] text-slate-500 font-bold">₦{loan.repaymentAmount.toLocaleString()} × {loan.tenure}M</p>
                         </td>
                         <td className="px-6 py-5">
                           <LoanStatusBadge status={loan.status} />
                         </td>
                         <td className="px-6 py-5 text-right">
                            <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                               <MoreVertical size={20} />
                            </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden space-y-4">
              {userLoans.map((loan) => (
                <div key={loan.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900">#{loan.id.toUpperCase()}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(loan.dateApplied).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <LoanStatusBadge status={loan.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Principal</p>
                      <p className="text-sm font-black text-slate-800">₦{loan.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Installment</p>
                      <p className="text-sm font-black text-slate-800">₦{loan.repaymentAmount.toLocaleString()}/mo</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase text-indigo-600">
                    <span>{loan.tenure} Months Tenure</span>
                    <button className="flex items-center gap-1">Details <ChevronRight size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
            
            {userLoans.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 bg-white rounded-[2rem] border border-dashed border-slate-200">
                <Clock size={48} className="mb-4 opacity-10" />
                <p className="text-sm font-bold">No active loan applications found.</p>
                <button className="mt-4 text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Apply Now</button>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default LoanManagement;
