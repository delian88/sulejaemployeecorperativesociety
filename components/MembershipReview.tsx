
import React, { useState } from 'react';
import { MembershipApplication, ApplicationStatus } from '../types';
import { MOCK_MEMBERSHIP_APPS } from '../constants';
import { CheckCircle, XCircle, Clock, Search, MoreVertical, Filter, UserCheck, UserX } from 'lucide-react';

const MembershipReview: React.FC = () => {
  const [applications, setApplications] = useState<MembershipApplication[]>(MOCK_MEMBERSHIP_APPS);

  const handleAction = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Membership Review</h2>
          <p className="text-slate-500">Approve or reject pending enrollment applications from LGA employees.</p>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Filter by name or ID..." className="ml-2 text-sm focus:outline-none w-48" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Applicant Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Department & ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider">Applied Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{app.fullName}</p>
                    <p className="text-xs text-slate-500">{app.email}</p>
                    <p className="text-xs text-slate-400">{app.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{app.department}</p>
                    <p className="text-xs text-slate-400">{app.employeeId}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(app.dateApplied).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      app.status === ApplicationStatus.PENDING ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      app.status === ApplicationStatus.APPROVED ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {app.status === ApplicationStatus.PENDING && (
                        <>
                          <button 
                            onClick={() => handleAction(app.id, ApplicationStatus.APPROVED)}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                            title="Approve"
                          >
                            <UserCheck size={18} />
                          </button>
                          <button 
                            onClick={() => handleAction(app.id, ApplicationStatus.REJECTED)}
                            className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                            title="Reject"
                          >
                            <UserX size={18} />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600">
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

export default MembershipReview;
