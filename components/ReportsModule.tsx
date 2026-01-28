
import React from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  ArrowRight,
  PieChart,
  LineChart
} from 'lucide-react';

const ReportsModule: React.FC = () => {
  const reportTypes = [
    { title: "Monthly Contribution Summary", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50", desc: "Consolidated list of all remittances for the current fiscal month." },
    { title: "Loan Disbursement Report", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50", desc: "Detailed breakdown of all loans issued, outstanding and completed." },
    { title: "Member Financial Statements", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", desc: "Generate individual or group ledger statements for any given period." },
    { title: "Withdrawal & Payout Log", icon: PieChart, color: "text-amber-600", bg: "bg-amber-50", desc: "Audit trail of all funds released from the cooperative treasury." },
    { title: "System Audit Logs", icon: LineChart, color: "text-slate-600", bg: "bg-slate-50", desc: "Complete record of administrative actions and security-sensitive changes." }
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Reporting Center</h2>
          <p className="text-slate-500 font-medium">Generate data-driven insights and government-standard financial reports.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2">
              <Calendar size={18}/> Fiscal Year 2024
           </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-100 transition-all group cursor-pointer">
            <div className={`w-14 h-14 ${report.bg} ${report.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <report.icon size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight">{report.title}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{report.desc}</p>
            <button className="w-full py-3 bg-slate-50 text-slate-900 font-black rounded-xl text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
               Download Report <Download size={14}/>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-indigo-700 rounded-[3rem] p-10 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <BarChart3 size={160}/>
         </div>
         <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-black mb-4">Custom Data Extraction</h3>
            <p className="text-indigo-100 leading-relaxed font-medium mb-8">Need a specific data slice? Our custom report builder allows you to select fields, apply filters, and export in CSV or JSON formats for external auditing.</p>
            <button className="px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all flex items-center gap-2">
               Open Report Builder <ArrowRight size={18}/>
            </button>
         </div>
      </div>
    </div>
  );
};

export default ReportsModule;
