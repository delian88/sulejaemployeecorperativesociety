
import React, { useState } from 'react';
import { LoanApplication, LoanStatus } from '../types';
import { MOCK_LOANS } from '../constants';
import { useToast } from './Toast';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Filter, 
  MoreVertical,
  Search,
  UserCheck,
  UserX,
  Eye,
  ArrowRight,
  HandCoins
} from 'lucide-react';

const AdminLoanManagement: React.FC = () => {
  const { showToast } = useToast();
  const [loans, setLoans] = useState<LoanApplication[]>(MOCK_LOANS);

  const handleLoanAction = (id: string, action: 'approve' | 'reject') => {
    showToast(`Processing ${action}...`, "loading");
    setTimeout(() => {
      setLoans(prev => prev.map(l => l.id === id ? { ...l, status: action === 'approve' ? LoanStatus.APPROVED : LoanStatus.REJECTED } : l));
      showToast(`Loan application #${id.toUpperCase()} ${action}d`, action === 'approve' ? 'success' : 'info');
    }, 1000);
  };

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
      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Credit Control</h2>
          <p className="text-slate-500 font-medium">Review applications, approve disbursements, and monitor credit health.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
              <Filter size={18}/> Bulk Operations
           </button>
           <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2">
              <UserCheck size={18}/> Pending Approvals
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Summary Cards */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
               <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Queue Summary</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold p-3 bg-amber-50 text-amber-800 rounded-2xl">
                     <span className="flex items-center gap-2"><Clock size={16}/> Pending Review</span>
                     <span>5</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold p-3 bg-indigo-50 text-indigo-800 rounded-2xl">
                     <span className="flex items-center gap-2"><FileText size={16}/> Awaiting Disbursement</span>
                     <span>2</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold p-3 bg-emerald-50 text-emerald-800 rounded-2xl">
                     <span className="flex items-center gap-2"><CheckCircle size={16}/> Approved Today</span>
                     <span>8</span>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-[2rem] text-white overflow-hidden relative group">
               <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform">
                  <HandCoins size={120}/>
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Policy Check</p>
               <p className="text-sm leading-relaxed font-medium">Loans are capped at 200% of member's total contributions by default.</p>
               <button className="mt-6 flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-300 transition-colors">
                  Adjust Rules <ArrowRight size={14}/>
               </button>
            </div>
         </div>

         {/* Loan Applications List */}
         <div className="lg:col-span-3">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     <input type="text" placeholder="Filter applications by ID or Member Name..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5" />
                  </div>
                  <div className="flex items-center gap-3">
                     <button className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase text-slate-500 rounded-xl hover:bg-slate-100 transition-all">All History</button>
                     <button className="px-4 py-2 bg-indigo-50 text-[10px] font-black uppercase text-indigo-600 rounded-xl">Active Only</button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Applicant</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financials</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Progress</th>
                       <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {loans.map((loan) => (
                       <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors group">
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                               <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0"><FileText size={18}/></div>
                               <div>
                                  <p className="text-sm font-black text-slate-900 leading-tight">{loan.userName}</p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">#{loan.id.toUpperCase()} • {loan.purpose}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <p className="text-xs font-black text-slate-900">₦{loan.amount.toLocaleString()}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">₦{loan.repaymentAmount.toLocaleString()} / mo</p>
                         </td>
                         <td className="px-8 py-5">
                            <div className="flex flex-col gap-2">
                               <LoanStatusBadge status={loan.status} />
                               <div className="flex gap-1">
                                  <div className={`h-1 flex-1 rounded-full ${loan.approvals.reviewer ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                                  <div className={`h-1 flex-1 rounded-full ${loan.approvals.committee ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                                  <div className={`h-1 flex-1 rounded-full ${loan.approvals.final ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-1">
                               {loan.status === LoanStatus.PENDING && (
                                 <>
                                   <button 
                                     onClick={() => handleLoanAction(loan.id, 'approve')}
                                     className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                                     title="Review & Approve"
                                   >
                                     <UserCheck size={18}/>
                                   </button>
                                   <button 
                                     onClick={() => handleLoanAction(loan.id, 'reject')}
                                     className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all" 
                                     title="Reject Application"
                                   >
                                     <UserX size={18}/>
                                   </button>
                                 </>
                               )}
                               <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Eye size={18}/></button>
                               <button className="p-2 text-slate-300 hover:text-slate-900 rounded-lg transition-all"><MoreVertical size={18}/></button>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminLoanManagement;
