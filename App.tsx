
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import LoanManagement from './components/LoanManagement';
import AdminLoanManagement from './components/AdminLoanManagement';
import LandingPage from './components/LandingPage';
import MembershipForm from './components/MembershipForm';
import MembershipReview from './components/MembershipReview';
import PaymentModule from './components/PaymentModule';
import AdminContributionManagement from './components/AdminContributionManagement';
import ProfileModule from './components/ProfileModule';
import WithdrawalModule from './components/WithdrawalModule';
import AdminWithdrawalManagement from './components/AdminWithdrawalManagement';
import MemberManagement from './components/MemberManagement';
import ReportsModule from './components/ReportsModule';
import SystemSettingsModule from './components/SystemSettingsModule';
import AboutPage from './components/AboutPage';
import BenefitsPage from './components/BenefitsPage';
import AuditLogsModule from './components/AuditLogsModule';
import FinancialsModule from './components/FinancialsModule';
import NotificationManager from './components/NotificationManager';
import ApprovalWorkflowModule from './components/ApprovalWorkflowModule';
import { User, UserRole } from './types';
import { api } from './services/api';
import { LogIn, Mail, Lock, Landmark, ChevronLeft, AlertCircle, Loader2 } from 'lucide-react';

type ViewMode = 'landing' | 'apply' | 'login' | 'app' | 'about' | 'benefits';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const savedEmail = localStorage.getItem('coop_session_email');
      const token = localStorage.getItem('coop_auth_token');
      
      if (savedEmail && token) {
        // In production, we'd verify the token with api.getProfile()
        const members = await api.getMembers();
        const foundUser = members.find(u => u.email === savedEmail);
        if (foundUser) {
          setUser(foundUser);
          setView('app');
        }
      }
      setIsInitializing(false);
    };
    checkSession();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    try {
      // Calling our abstracted API service
      const response = await api.login({ email, password });
      setUser(response.user);
      localStorage.setItem('coop_session_email', response.user.email);
      setView('app');
    } catch (err: any) {
      setLoginError(err.message || "Connection failed. Access denied.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setView('landing');
    setUser(null);
    localStorage.removeItem('coop_session_email');
    api.clearToken();
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0f172a]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-indigo-500 mx-auto" size={48} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Verifying Security Protocols...</p>
        </div>
      </div>
    );
  }

  if (view === 'about') return <AboutPage onBack={() => setView('landing')} />;
  if (view === 'benefits') return <BenefitsPage onBack={() => setView('landing')} />;
  if (view === 'apply') return <MembershipForm onBack={() => setView('landing')} onSubmit={() => {}} />;
  if (view === 'landing') return <LandingPage onLogin={() => setView('login')} onApply={() => setView('apply')} onNav={setView} />;

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-slate-900">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-700/5 -skew-y-6 -translate-y-1/2"></div>
        <button onClick={() => setView('landing')} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 z-20 transition-colors">
          <ChevronLeft size={20} /> Back to Website
        </button>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 mb-6 transform hover:rotate-6 transition-transform">
               <Landmark size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Portal Entry</h1>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest leading-none">Suleja LGA Cooperative Management System</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {loginError && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-shake">
                  <AlertCircle size={18} /> {loginError}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="email" required placeholder="name@sulejalga.gov.ng"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security PIN / Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" required placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoginLoading}
                className="w-full py-4 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-300 text-white font-black rounded-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 text-base active:scale-95"
              >
                {isLoginLoading ? <Loader2 className="animate-spin" size={20} /> : "Validate & Access"} 
                {!isLoginLoading && <LogIn size={20} />}
              </button>
            </form>
            
            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <p className="text-[10px] text-amber-600 font-bold uppercase mb-1">Production Access Required</p>
              <div className="flex flex-col gap-1">
                <p className="text-[9px] text-slate-500 font-medium italic">Use the specific Admin@2024 or Member@2024 PINs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (!user) return null;
    const isAdmin = user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;

    switch(activeTab) {
      case 'dashboard': return isAdmin ? <AdminDashboard user={user} /> : <Dashboard user={user} />;
      case 'members': return <MemberManagement />;
      case 'contributions': return isAdmin ? <AdminContributionManagement /> : <PaymentModule />;
      case 'loans': return isAdmin ? <AdminLoanManagement /> : <LoanManagement user={user} />;
      case 'withdrawals': return isAdmin ? <AdminWithdrawalManagement /> : <WithdrawalModule user={user} />;
      case 'approvals': return <ApprovalWorkflowModule user={user} />;
      case 'financials': return <FinancialsModule />;
      case 'reports': return <ReportsModule />;
      case 'notifications': return <NotificationManager />;
      case 'audit': return <AuditLogsModule />;
      case 'settings': return <SystemSettingsModule />;
      case 'profile': return <ProfileModule user={user} />;
      default: return null;
    }
  };

  return (
    <Layout 
      user={user!} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout} 
      onRoleSwitch={handleRoleSwitch}
    >
      {renderTabContent()}
    </Layout>
  );
};

export default App;
