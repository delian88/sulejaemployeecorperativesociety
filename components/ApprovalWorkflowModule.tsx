
import React from 'react';
import { ClipboardList, ShieldCheck, Clock, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_LOANS } from '../constants';

const ApprovalWorkflowModule: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Approval Workflows</h2>
          <p className="text-slate-500 font-medium">Monitor multi-level authorization stages for active requests.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
           <span className="text-[10px] font-black uppercase text-slate-400">Current Level:</span>
           <span className="text-[10px] font-black uppercase text-indigo-700">{user.role.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Workflow Status</h3>
            <div className="space-y-8 relative">
               <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
               {[
                 { label: 'Initial Review', status: 'Completed', color: 'text-emerald-400' },
                 { label: 'Finance Committee', status: 'In Progress', color: 'text-amber-400' },
                 { label: 'Board Authorization', status: 'Pending', color: 'text-slate-500' },
               ].map((step, i) => (
                 <div key={i} className="relative flex items-center gap-6">
                    <div className={`h-6 w-6 rounded-full border-4 border-[#0f172a] z-10 ${step.status === 'Completed' ? 'bg-emerald-500' : step.status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-800'}`}></div>
                    <div>
                       <p className="text-xs font-black">{step.label}</p>
                       <p className={`text-[9px] font-black uppercase tracking-widest ${step.color}`}>{step.status}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Pending Authorization Queue</h3>
            </div>
            <div className="p-8 space-y-4">
              {MOCK_LOANS.filter(l => l.status === 'PENDING').map(loan => (
                <div key={loan.id} className="p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-indigo-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><ClipboardList size={22}/></div>
                      <div>
                         <p className="text-sm font-black text-slate-900">{loan.userName}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase">Loan Request: ₦{loan.amount.toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="text-right">
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Review Status</p>
                         <p className="text-[10px] font-black text-amber-600">Awaiting Committee</p>
                      </div>
                      <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all">Authorize</button>
                   </div>
                </div>
              ))}
              {MOCK_LOANS.filter(l => l.status === 'PENDING').length === 0 && (
                <div className="py-12 text-center text-slate-300">
                  <CheckCircle2 size={48} className="mx-auto mb-4 opacity-10" />
                  <p className="text-sm font-bold">All approvals up to date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWorkflowModule;
