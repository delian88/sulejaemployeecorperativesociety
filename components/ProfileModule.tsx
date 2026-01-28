
import React from 'react';
import { User } from '../types';
import { UserCircle, Mail, Phone, Building2, IdCard, Shield, Camera, Edit2 } from 'lucide-react';

const ProfileModule: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="relative group">
          <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-lg object-cover" alt="Profile" />
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={14} />
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs hover:bg-slate-200 transition-colors">
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>
          <p className="text-slate-500 font-medium">{user.employeeId}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-md">
              {user.membershipStatus} MEMBER
            </span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-md">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Employment Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Building2 className="text-slate-400" size={20} />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Department</p>
                <p className="text-sm font-bold text-slate-700">{user.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <IdCard className="text-slate-400" size={20} />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">LGA Employee ID</p>
                <p className="text-sm font-bold text-slate-700">{user.employeeId}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security & Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <Mail className="text-slate-400" size={20} />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Email Address</p>
                <p className="text-sm font-bold text-slate-700">{user.email}</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4 text-left">
                <Shield className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm font-bold text-slate-700">Change Password</p>
                  <p className="text-[10px] text-slate-400 font-bold">Update security credentials</p>
                </div>
              </div>
              <Edit2 size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModule;
