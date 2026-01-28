
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { MOCK_ALL_USERS } from '../constants';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Download,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<User[]>(MOCK_ALL_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Members Directory</h2>
          <p className="text-slate-500 font-medium">Manage all cooperative participants and system users.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Export List
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            <UserPlus size={18} /> Add Member
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, employee ID, or email..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="flex-1 md:flex-none py-3 px-4 bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest border-none outline-none text-slate-500">
            <option>All Departments</option>
            <option>Health</option>
            <option>Education</option>
            <option>Works</option>
          </select>
          <select className="flex-1 md:flex-none py-3 px-4 bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest border-none outline-none text-slate-500">
            <option>Status: Active</option>
            <option>Status: Inactive</option>
            <option>Status: Suspended</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Employee Information</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financial Summary</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Membership Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={member.avatar} className="h-12 w-12 rounded-2xl object-cover border-2 border-white shadow-sm" />
                      <div>
                        <p className="text-sm font-black text-slate-900">{member.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md uppercase tracking-tighter">{member.employeeId}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase flex items-center gap-1"><Building2 size={10}/> {member.department}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-900">₦{member.totalContributions.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Savings</p>
                    </div>
                    {member.activeLoanBalance > 0 && (
                      <p className="text-[9px] font-bold text-rose-500 uppercase mt-1">Debt: ₦{member.activeLoanBalance.toLocaleString()}</p>
                    )}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      member.membershipStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                      member.membershipStatus === 'SUSPENDED' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {member.membershipStatus === 'ACTIVE' ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                      {member.membershipStatus}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="View Profile">
                          <Mail size={18} />
                       </button>
                       <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                          <MoreVertical size={18} />
                       </button>
                    </div>
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

export default MemberManagement;
