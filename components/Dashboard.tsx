
import React, { useEffect, useState } from 'react';
import { User, UserRole, Activity, Announcement } from '../types';
import { COLORS, MOCK_ACTIVITIES, MOCK_ANNOUNCEMENTS } from '../constants';
import { getFinancialInsights } from '../geminiService';
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
  Calendar
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

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-lg ${color} text-white`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">₦{value.toLocaleString()}</h3>
      <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
    </div>
  </div>
);

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [insight, setInsight] = useState<string>("Analyzing your data...");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const announcements = MOCK_ANNOUNCEMENTS;

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await getFinancialInsights(user);
      setInsight(text);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome, {user.name}</h2>
          <p className="text-slate-500">Here's an overview of your cooperative standing as of {new Date().toLocaleDateString('en-NG')}.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={16} /> Statement
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-lg">
            Apply for Loan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats Column */}
        <div className="lg:col-span-2 space-y-6">
           {/* Financial Insights Card */}
          <div className="bg-gradient-to-r from-indigo-700 to-slate-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 bg-indigo-400/30 rounded-full flex items-center justify-center">
                  <Sparkles size={14} className="text-indigo-200" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-200">AI Financial Advisor Insights</h4>
              </div>
              <p className="text-lg font-medium leading-relaxed max-w-2xl">
                {loadingInsight ? "Generating smart insights..." : insight}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-indigo-300 font-medium">
                 <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Verified Status</span>
                 <span className="flex items-center gap-1"><TrendingUp size={12}/> Investment Strategy Ready</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard title="Total Contributions" value={user.totalContributions} subtitle="Lifetime savings accrued" icon={Wallet} color="bg-indigo-600" trend={4.2} />
            <StatCard title="Outstanding Loans" value={user.activeLoanBalance} subtitle="Current debt balance" icon={HandCoins} color="bg-slate-800" trend={-1.5} />
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Contribution Trend</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} tickFormatter={(val) => `₦${val/1000}k`} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} formatter={(value: any) => [`₦${value.toLocaleString()}`, 'Amount']} />
                  <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Panel: Notice Board & Activity */}
        <div className="space-y-6">
           {/* Notice Board */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-indigo-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <Megaphone size={18} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Notice Board</h3>
              </div>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-widest">Admin Updates</span>
            </div>
            <div className="p-6 divide-y divide-slate-100">
              {announcements.map((ann) => (
                <div key={ann.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    {ann.priority === 'URGENT' && <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>}
                    <h4 className={`text-sm font-bold ${ann.priority === 'URGENT' ? 'text-red-600' : 'text-slate-800'}`}>{ann.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{ann.content}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    <Calendar size={10} /> {new Date(ann.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
              <Clock size={16} className="text-slate-400" /> Recent Activity
            </h3>
            <div className="space-y-4">
              {MOCK_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    activity.type === 'CONTRIBUTION' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'
                  }`}>
                    {activity.type === 'CONTRIBUTION' ? <Wallet size={18} /> : <HandCoins size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 leading-none">{activity.description}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
