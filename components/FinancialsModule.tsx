
import React from 'react';
import { ArrowRightLeft, Landmark, TrendingUp, HandCoins, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const FinancialsModule: React.FC = () => {
  const accountSummary = [
    { label: 'Society Net Assets', value: 254000000, color: 'text-indigo-600', icon: Landmark },
    { label: 'Total Interests Earned', value: 12450000, color: 'text-emerald-600', icon: TrendingUp },
    { label: 'Member Savings Liability', value: 215000000, color: 'text-slate-600', icon: HandCoins },
  ];

  const transactionData = [
    { name: 'Week 1', inflow: 1200000, outflow: 800000 },
    { name: 'Week 2', inflow: 1500000, outflow: 400000 },
    { name: 'Week 3', inflow: 900000, outflow: 1200000 },
    { name: 'Week 4', inflow: 1800000, outflow: 600000 },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Treasury</h2>
        <p className="text-slate-500 font-medium">Monitor cooperative liquidity, interest earnings, and fund flows.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {accountSummary.map((acc, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className={`p-4 rounded-2xl bg-slate-50 ${acc.color} w-fit mb-6`}>
              <acc.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{acc.label}</p>
            <h3 className="text-2xl font-black text-slate-900">₦{acc.value.toLocaleString()}</h3>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase">
              <ArrowUpRight size={12}/> 4.2% Growth
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Weekly Treasury Inflow / Outflow</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="inflow" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Inflow" />
                <Bar dataKey="outflow" fill="#ef4444" radius={[4, 4, 0, 0]} name="Outflow" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Recent Large Transactions</h3>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${i % 2 === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {i % 2 === 0 ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{i % 2 === 0 ? 'Bulk Contribution Remittance' : 'Loan Disbursement - #LN042'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">24 Oct, 2024 • Admin Aliyu</p>
                  </div>
                </div>
                <p className={`text-sm font-black ${i % 2 === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {i % 2 === 0 ? '+' : '-'}₦{((i+1)*50000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialsModule;
