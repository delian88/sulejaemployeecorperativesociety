
import React from 'react';
import { Clock, Search, ShieldCheck, User, Filter, Download } from 'lucide-react';
import { MOCK_ACTIVITIES } from '../constants';

const AuditLogsModule: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Audit Logs</h2>
        <p className="text-slate-500 font-medium">Read-only record of all administrative actions and security-sensitive events.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search logs by user, action, or ID..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5" />
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2.5 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2"><Filter size={14}/> Filter Date</button>
             <button className="px-4 py-2.5 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-700 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"><Download size={14}/> Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Timestamp</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User / Actor</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Action Performed</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Security Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_ACTIVITIES.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-slate-300" />
                      <span className="text-xs font-bold text-slate-600">{log.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-black text-[10px]">AD</div>
                      <p className="text-xs font-black text-slate-800">{log.user || 'System'}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-xs font-medium text-slate-600">{log.description}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">Normal</span>
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

export default AuditLogsModule;
