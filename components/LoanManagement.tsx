
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
  Filter
} from 'lucide-react';

const LoanStatusBadge = ({ status }: { status: LoanStatus }) => {
  const styles = {
    [LoanStatus.PENDING]: 'bg-amber-100 text-amber-700 border-amber-200',
    [LoanStatus.REVIEWING]: 'bg-blue-100 text-blue-700 border-blue-200',
    [LoanStatus.APPROVED]: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    [LoanStatus.REJECTED]: 'bg-rose-100 text-rose-700 border-rose-200',
    [LoanStatus.DISBURSED]: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    [LoanStatus.COMPLETED]: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  );
};

const LoanManagement: React.FC<{ user: User }> = ({ user }) => {
  const userLoans = user.role === UserRole.MEMBER 
    ? MOCK_LOANS.filter(l => l.userId === user.id)
    : MOCK_LOANS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Loan Portfolio</h2>
          <p className="text-slate-500">Track and manage your credit applications and repayment schedules.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg">
          <Plus size={18} /> New Application
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Filter Sidebar */}
         <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4 font-bold text-slate-700">
                <Filter size={18} /> <span>Filters</span>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Status</label>
                  <div className="space-y-2">
                    {['All', 'Pending', 'Approved', 'Repaying'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Date Range</label>
                  <select className="w-full text-sm border border-slate-200 rounded p-2 bg-slate-50">
                    <option>Last 30 Days</option>
                    <option>Last 6 Months</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                <AlertCircle size={16} /> Credit Guidelines
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-indigo-700 font-medium">
                <li className="flex gap-2">• Max loan: 2x contribution balance</li>
                <li className="flex gap-2">• Max tenure: 24 months</li>
                <li className="flex gap-2">• Interest rate: 4.5% flat P.A.</li>
                <li className="flex gap-2">• Processing: 7-10 working days</li>
              </ul>
            </div>
         </div>

         {/* Loan Table */}
         <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50 border-b border-slate-200">
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Loan ID & Purpose</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Amount</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Status</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Tenure</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Applied Date</th>
                       <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {userLoans.map((loan) => (
                       <tr key={loan.id} className="hover:bg-slate-50 transition-colors group">
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                             <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                               <FileText size={20} />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-slate-900 leading-tight">#{loan.id.toUpperCase()}</p>
                               <p className="text-xs text-slate-500">{loan.purpose}</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-6 py-4">
                           <p className="text-sm font-bold text-slate-900">₦{loan.amount.toLocaleString()}</p>
                           <p className="text-[10px] text-slate-400">₦{loan.repaymentAmount.toLocaleString()}/mo</p>
                         </td>
                         <td className="px-6 py-4">
                           <LoanStatusBadge status={loan.status} />
                         </td>
                         <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                           {loan.tenure} Months
                         </td>
                         <td className="px-6 py-4 text-sm text-slate-500">
                           {new Date(loan.dateApplied).toLocaleDateString()}
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all">
                               <MoreVertical size={18} />
                            </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               
               {userLoans.length === 0 && (
                 <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                   <Clock size={48} className="mb-4 opacity-20" />
                   <p className="text-sm">No active loan applications found.</p>
                 </div>
               )}

               <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Showing {userLoans.length} entries</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-200 rounded disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 border border-slate-200 rounded bg-white text-indigo-600 font-bold">1</button>
                    <button className="px-3 py-1 border border-slate-200 rounded bg-white">Next</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default LoanManagement;
