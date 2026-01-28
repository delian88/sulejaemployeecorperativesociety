
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LoanManagement from './components/LoanManagement';
import LandingPage from './components/LandingPage';
import MembershipForm from './components/MembershipForm';
import MembershipReview from './components/MembershipReview';
import PaymentModule from './components/PaymentModule';
import ProfileModule from './components/ProfileModule';
import { User, UserRole } from './types';
import { MOCK_CURRENT_USER, MOCK_ADMIN_USER } from './constants';
import { LogIn, ShieldCheck, Mail, Lock, Landmark, ChevronLeft } from 'lucide-react';

type ViewMode = 'landing' | 'apply' | 'login' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [user, setUser] = useState<User>(MOCK_CURRENT_USER);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('coop_auth');
    if (savedAuth === 'true') {
      setView('app');
      const savedRole = localStorage.getItem('coop_role') as UserRole;
      if (savedRole === UserRole.SUPER_ADMIN) setUser(MOCK_ADMIN_USER);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setTimeout(() => {
      setView('app');
      localStorage.setItem('coop_auth', 'true');
      setIsLoginLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setView('landing');
    localStorage.removeItem('coop_auth');
  };

  const handleRoleSwitch = (role: UserRole) => {
    const newUser = (role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN) ? MOCK_ADMIN_USER : MOCK_CURRENT_USER;
    setUser({ ...newUser, role });
    localStorage.setItem('coop_role', role);
  };

  if (view === 'landing') {
    return <LandingPage onLogin={() => setView('login')} onApply={() => setView('apply')} />;
  }

  if (view === 'apply') {
    return <MembershipForm onBack={() => setView('landing')} onSubmit={() => {}} />;
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <button 
          onClick={() => setView('landing')}
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={20} /> Back to Website
        </button>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 mb-6">
               <Landmark size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Access Portal</h1>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Suleja LGA Cooperative CMS</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Member Email / ID</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" required placeholder="member@sulejalga.gov.ng"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    defaultValue="i.danjuma@sulejalga.gov.ng"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Password</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" required placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all font-medium"
                    defaultValue="password123"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoginLoading}
                className="w-full py-4 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-400 text-white font-black rounded-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                {isLoginLoading ? "Verifying..." : "Secure Login"} <LogIn size={20} />
              </button>
            </form>
          </div>
          <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             Official Enterprise Solution • Premegage Tech
          </p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'loans': return <LoanManagement user={user} />;
      case 'membership_review': return <MembershipReview />;
      case 'contributions': return <PaymentModule />;
      case 'profile': return <ProfileModule user={user} />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck size={40} className="text-slate-300" />
           </div>
           <h3 className="text-xl font-black text-slate-700">Official Module Entry</h3>
           <p className="max-w-xs text-center text-sm mt-3 font-medium leading-relaxed">
             This secure module for <span className="text-indigo-600 font-bold capitalize">{activeTab.replace('_', ' ')}</span> is being initialized with your account permissions.
           </p>
           <button 
             onClick={() => setActiveTab('dashboard')}
             className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all"
           >
             Return to Central Dashboard
           </button>
        </div>
      );
    }
  };

  return (
    <Layout user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} onRoleSwitch={handleRoleSwitch}>
      {renderTabContent()}
    </Layout>
  );
};

export default App;
