
import React, { useEffect, useState } from 'react';
import { User, Activity, Announcement } from '../types';
import { COLORS, MOCK_ACTIVITIES, MOCK_ANNOUNCEMENTS } from '../constants';
import { getFinancialInsights } from '../geminiService';
import { api } from '../services/api';
import { 
  TrendingUp, 
  Wallet, 
  HandCoins, 
  Clock, 
  AlertCircle,
  Sparkles,
  Download,
  CheckCircle2,
  Megaphone,
  Calendar,
  Loader2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: 'Oct', amount: 45000 },
  { name: 'Nov', amount: 52000 },
  { name: 'Dec', amount: 48000 },
  { name: 'Jan', amount: 50000 },
  { name: 'Feb', amount: 50000 },
  { name: 'Mar', amount: 50000 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, delayClass }: any) => (
  <div className={`bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-100 hover:shadow-xl transition-all duration-300 group opacity-0 animate-fade-in-up ${delayClass}`}>
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      {trend && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-[0.1em]">{title}</p>
      <h3 className="text-xl lg:text-2xl font-black text-slate-900 mt-1">₦{value.toLocaleString()}</h3>
      <p className="text-[10px] text-slate-400 mt-2 font-medium">{subtitle}</p>
    </div>
  </div>
);

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [insight, setInsight] = useState<string>("Analyzing your data...");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const announcements = MOCK_ANNOUNCEMENTS;

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsDataLoading(true);
      setLoadingInsight(true);
      try {
        const [insightsText] = await Promise.all([
          getFinancialInsights(user),
        ]);
        setInsight(insightsText);
      } catch (err) {
        setInsight("Unable to load latest insights. Please check connection.");
      } finally {
        setLoadingInsight(false);
        setIsDataLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  if (isDataLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 opacity-0 animate-fade-in-up">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Welcome, {user.name.split(' ')[0]}</h2>
          <p className="text-slate-500 font-medium text-sm lg:text-base">Cooperative overview as of {new Date().toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Download size={18} /> Statement
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            Apply for Loan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Stats Column */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
           {/* Financial Insights Card */}
          <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 rounded-[2rem] p-6 lg:p-10 text-white shadow-2xl relative overflow-hidden group opacity-0 animate-scale-in stagger-1">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
               <Sparkles size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-indigo-400/30 rounded-full flex items-center justify-center">
                  {loadingInsight ? <Loader2 size={16} className="text-indigo-200 animate-spin" /> : <Sparkles size={16} className="text-indigo-200" />}
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">AI Financial Insights</h4>
              </div>
              <p className="text-lg lg:text-2xl font-bold leading-relaxed max-w-2xl text-indigo-50 italic">
                "{loadingInsight ? "Our AI advisor is scanning your portfolio..." : insight}"
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-[10px] text-indigo-300 font-black uppercase tracking-widest">
                 <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full"><CheckCircle2 size={14}/> Verified Account</span>
                 <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full"><TrendingUp size={14}/> 98% Growth Score</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <StatCard title="Total Contributions" value={user.totalContributions} subtitle="Lifetime accrued savings" icon={Wallet} color="bg-indigo-600" trend={4.2} delayClass="stagger-2" />
            <StatCard title="Outstanding Loans" value={user.activeLoanBalance} subtitle="Pending debt balance" icon={HandCoins} color="bg-slate-800" trend={-1.5} delayClass="stagger-3" />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 lg:p-8 opacity-0 animate-fade-in-up stagger-4">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase tracking-widest text-[11px] text-slate-400">Contribution Trend (6M)</h3>
              <div className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-lg">SYNCED WITH DB</div>
            </div>
            <div className="h-64 lg:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#94a3b8'}} tickFormatter={(val) => `₦${val/1000}k`} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800}} 
                    formatter={(value: any) => [`₦${value.toLocaleString()}`, 'Amount']} 
                  />
                  <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" animationDuration={2000} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Panel: Notice Board & Activity */}
        <div className="space-y-6 lg:space-y-8">
           {/* Notice Board */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden opacity-0 animate-slide-in-left stagger-2">
            <div className="bg-[#0f172a] px-6 lg:px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-indigo-600 rounded-lg animate-pulse">
                  <Megaphone size={16} />
                </div>
                <h3 className="font-black text-xs uppercase tracking-[0.15em]">Notice Board</h3>
              </div>
            </div>
            <div className="p-6 lg:p-8 space-y-8">
              {announcements.map((ann, idx) => (
                <div key={ann.id} className={`relative pl-6 border-l-2 border-slate-100 group transition-all duration-300 hover:translate-x-1 stagger-${idx+1}`}>
                  <div className={`absolute -left-[5px] top-0 h-2 w-2 rounded-full ${ann.priority === 'URGENT' ? 'bg-red-500 animate-ping' : 'bg-indigo-400'}`}></div>
                  <div className="flex flex-col gap-2">
                    <h4 className={`text-sm font-black tracking-tight leading-tight group-hover:text-indigo-600 transition-colors ${ann.priority === 'URGENT' ? 'text-red-600' : 'text-slate-800'}`}>{ann.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{ann.content}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest pt-1">
                      <Calendar size={12} /> {new Date(ann.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 lg:p-8 opacity-0 animate-slide-in-left stagger-4">
            <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] flex items-center gap-2">
              <Clock size={16} className="text-indigo-500" /> Recent History
            </h3>
            <div className="space-y-6">
              {MOCK_ACTIVITIES.map((activity, idx) => (
                <div key={activity.id} className={`flex gap-4 group transition-all duration-300 hover:translate-x-2 stagger-${idx+1}`}>
                  <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    activity.type === 'CONTRIBUTION' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'
                  }`}>
                    {activity.type === 'CONTRIBUTION' ? <Wallet size={18} /> : <HandCoins size={18} />}
                  </div>
                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-indigo-600 transition-colors">{activity.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activity.timestamp}</span>
                      <span className="text-xs font-black text-slate-900">₦{activity.amount?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95">
              View Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
