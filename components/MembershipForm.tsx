
import React, { useState } from 'react';
import { User, ShieldCheck, Mail, Phone, Building2, IdCard, ChevronLeft, Send, CheckCircle2, Wallet } from 'lucide-react';
import { useToast } from './Toast';

interface MembershipFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ onBack, onSubmit }) => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    monthlyContribution: '10000'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Application transmitted to server...", "loading");
    setTimeout(() => {
      showToast("Enrollment successful. Awaiting verification.", "success");
      onSubmit(formData);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Application Received!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Thank you, {formData.fullName}. Your membership application for Suleja LGA Cooperative has been successfully submitted and is now under review. 
            You will receive an email confirmation shortly.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-indigo-700 p-8 text-white">
            <h2 className="text-3xl font-black mb-2">Membership Enrollment</h2>
            <p className="text-indigo-100 text-sm">Join the Suleja LGA Employee Multipurpose Cooperative Society.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Official Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" required placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Official Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" required placeholder="john@sulejalga.gov.ng"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel" required placeholder="+234..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Employee ID</label>
                <div className="relative">
                  <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" required placeholder="SLGA/EMP/..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <select 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium appearance-none"
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Health">Health & Social Works</option>
                    <option value="Admin">General Admin</option>
                    <option value="Works">Works & Transport</option>
                    <option value="Finance">Finance & Supplies</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Monthly Savings Goal (₦)</label>
                <div className="relative">
                  <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="number" min="5000" step="1000" required placeholder="10000"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    defaultValue="10000"
                    onChange={(e) => setFormData({...formData, monthlyContribution: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
              <ShieldCheck className="text-amber-600 shrink-0" size={24} />
              <p className="text-xs text-amber-800 leading-relaxed font-medium">
                By submitting this application, you authorize Suleja LGA to deduct the specified monthly contribution from your salary. You also agree to abide by the Cooperative’s constitution and policies.
              </p>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-700 text-white font-black rounded-2xl text-lg hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
