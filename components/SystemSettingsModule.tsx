
import React, { useState } from 'react';
import { useToast } from './Toast';
import { 
  Settings, 
  ShieldCheck, 
  CreditCard, 
  HandCoins, 
  Wallet, 
  Mail, 
  Save, 
  Database, 
  Lock,
  Bell,
  RefreshCw
} from 'lucide-react';

const SystemSettingsModule: React.FC = () => {
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    showToast("Committing changes to database...", "loading");
    setTimeout(() => {
      setSaving(false);
      showToast("System policies updated successfully", "success");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Configuration</h2>
        <p className="text-slate-500 font-medium">Fine-tune global parameters, interest rates, and security protocols.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Policy Settings */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-3">
               <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><HandCoins size={18}/></div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Cooperative Lending Policy</h3>
            </div>
            <div className="p-8 space-y-8">
               <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Global Interest Rate (%)</label>
                     <div className="relative">
                        <input type="number" defaultValue="4.5" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">FLAT P.A.</span>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Max Loan Tenure (Months)</label>
                     <input type="number" defaultValue="24" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Min Monthly Contribution (₦)</label>
                     <input type="number" defaultValue="5000" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Withdrawal Retention (%)</label>
                     <input type="number" defaultValue="20" className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all" />
                  </div>
               </div>
               <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                     <Save size={18}/> {saving ? "Saving..." : "Save Policy Changes"}
                  </button>
               </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center gap-3">
               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ShieldCheck size={18}/></div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Security & Authentication</h3>
            </div>
            <div className="p-8 space-y-6">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                     <p className="text-sm font-black text-slate-900">Multi-Factor Authentication</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Require 2FA for all administrative logins</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 flex justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full"></div></div>
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                     <p className="text-sm font-black text-slate-900">Automatic Session Timeout</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Logs out inactive users after 15 minutes</p>
                  </div>
                  <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 flex justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full"></div></div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Data & Backups</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-xl"><Database size={20}/></div>
                    <div>
                       <p className="text-xs font-black">Daily Automations</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">Last backup: 2h ago</p>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <RefreshCw size={14}/> Run Manual Backup
                 </button>
                 <button className="w-full py-4 border border-white/20 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">
                    Download Latest Data (.SQL)
                 </button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Communications</h3>
              <div className="space-y-4">
                 <button className="w-full p-4 flex items-center justify-between border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                       <Mail size={18} className="text-slate-400 group-hover:text-indigo-600"/>
                       <span className="text-xs font-black text-slate-700">Email SMTP Setup</span>
                    </div>
                    <Lock size={14} className="text-slate-300"/>
                 </button>
                 <button className="w-full p-4 flex items-center justify-between border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                       <Bell size={18} className="text-slate-400 group-hover:text-indigo-600"/>
                       <span className="text-xs font-black text-slate-700">Push Templates</span>
                    </div>
                    <Lock size={14} className="text-slate-300"/>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsModule;
