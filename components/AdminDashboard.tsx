
import React from 'react';
import { User, Activity } from '../types';
import { MOCK_ACTIVITIES, MOCK_ALL_USERS, MOCK_LOANS, MOCK_CONTRIBUTIONS } from '../constants';
import { 
  Users, 
  CreditCard, 
  HandCoins, 
  Wallet, 
  Clock, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  History,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  const stats = [
    { label: 'Registered Members', value: 1240, icon: Users, color: 'bg-indigo-600', trend: 12 },
    { label: 'Monthly Contributions', value: 450000, icon: CreditCard, color: 'bg-emerald-600', trend: 5.4 },
    { label: 'Loans Disbursed', value: 8500000, icon: HandCoins, color: 'bg-blue-600', trend: 8.1 },
    { label: 'Outstanding Balance', value: 3200000, icon: Wallet, color: 'bg-amber-600', trend: -2.3 },
    { label: 'Pending Loans', value: 5, icon: ClipboardCheck, color: 'bg-rose-500', trend: 0 },
    { label: 'Pending Withdrawals', value: 3, icon: AlertCircle, color: 'bg-orange-500', trend: 0 },
  ];

  const cashflowData = [
    { name: 'Jan', contributions: 380000, repayment: 250000 },
    { name: 'Feb', contributions: 420000, repayment: 280000 },
    { name: 'Mar', contributions: 450000, repayment: 310000 },
    { name: 'Apr', contributions: 430000, repayment: 290000 },
  ];

  const trendData = [
    { name: 'Oct', amount: 320000 },
    { name: 'Nov', amount: 350000 },
    { name: 'Dec', amount: 380000 },
    { name: 'Jan', amount: 410000 },
    { name: 'Feb', amount: 440000 },
    { name: 'Mar', amount: 450000 },
  ];

  const loanDistribution = [
    { name: 'Approved', value: 12, color: '#10b981' },
    { name: 'Pending', value: 5, color: '#f59e0b' },
    { name: 'Active', value: 25, color: '#4f46e5' },
    { name: 'Completed', value: 18, color: '#64748b' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 font-medium">Suleja LGA Employee Multipurpose Cooperative Admin Portal.</p>
        </div>
        <div className="flex flex-wrap gap-2">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
             <History size={16}/> View Logs
           </button>
           <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all">
             <Zap size={16}/> Quick Action
           </button>
        </div>
      </div>

      {/* Stats Grid - Updated to 6 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-indigo-100 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-indigo-50 group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              {stat.trend !== 0 && (
                <div className={`flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full ${stat.trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.trend > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {Math.abs(stat.trend)}%
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-lg font-black text-slate-900">
                {stat.label.includes('Balance') || stat.label.includes('Contributions') || stat.label.includes('Disbursed') ? `₦${stat.value.toLocaleString()}` : stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Charts Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart 1: Contribution Trends (Line Chart) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Monthly Contribution Trend</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} tickFormatter={(v) => `₦${v/1000}k`} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800}} />
                  <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={4} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Disbursement vs Repayment (Bar Chart) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Disbursement vs Repayment</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} tickFormatter={(v) => `₦${v/1000}k`} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800}} />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase'}} />
                  <Bar dataKey="contributions" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Contributions" />
                  <Bar dataKey="repayment" fill="#10b981" radius={[4, 4, 0, 0]} name="Repayments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Chart 3: Loan Status Distribution (Pie Chart) */}
          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Loan Status Distribution</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {loanDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {loanDistribution.map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{backgroundColor: entry.color}}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{entry.name}</span>
                  <span className="text-xs font-black ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
             <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Action Required</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-rose-600"><AlertCircle size={16}/></div>
                      <span className="text-[10px] font-black text-rose-900 uppercase">12 Missed Contributions</span>
                   </div>
                   <button className="text-[9px] font-black uppercase text-rose-600 hover:underline">Resolve</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-indigo-600"><ClipboardCheck size={16}/></div>
                      <span className="text-[10px] font-black text-indigo-900 uppercase">5 Pending Loan Reviews</span>
                   </div>
                   <button className="text-[9px] font-black uppercase text-indigo-600 hover:underline">Review</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
