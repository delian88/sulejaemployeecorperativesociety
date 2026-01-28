
import React from 'react';
import { Bell, Send, Mail, MessageSquare, Plus, Search, Megaphone } from 'lucide-react';

const NotificationManager: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Notification Center</h2>
          <p className="text-slate-500 font-medium">Broadcast announcements and manage automatic system alerts.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
          <Plus size={18} /> New Broadcast
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Scheduled Broadcasts</h3>
            </div>
            <div className="p-8 space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-indigo-100 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-indigo-600 text-white rounded-lg"><Megaphone size={16}/></div>
                         <h4 className="text-sm font-black text-slate-900">{i === 1 ? 'Annual General Meeting Alert' : 'New Loan Interest Adjustment'}</h4>
                      </div>
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-100">Scheduled</span>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium mb-4">Members are invited to the 2024 AGM scheduled for May 15th at the Suleja LGA Secretariat Hall. Attendance is mandatory for all active members.</p>
                   <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Mail size={12}/> Email</span>
                      <span className="flex items-center gap-1.5"><MessageSquare size={12}/> SMS</span>
                      <span className="ml-auto">May 10, 2024 • 09:00 AM</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Quick Template</h3>
            <div className="space-y-4">
               <button className="w-full p-4 bg-white/10 rounded-2xl text-left hover:bg-white/20 transition-all group">
                  <p className="text-xs font-black mb-1">Repayment Reminder</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-white transition-colors">3 days before due date</p>
               </button>
               <button className="w-full p-4 bg-white/10 rounded-2xl text-left hover:bg-white/20 transition-all group">
                  <p className="text-xs font-black mb-1">Missed Contribution</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-white transition-colors">Immediate alert</p>
               </button>
               <button className="w-full p-4 bg-white/10 rounded-2xl text-left hover:bg-white/20 transition-all group">
                  <p className="text-xs font-black mb-1">Loan Approval Alert</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-white transition-colors">On successful review</p>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManager;
