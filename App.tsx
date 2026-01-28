
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LoanManagement from './components/LoanManagement';
import LandingPage from './components/LandingPage';
import MembershipForm from './components/MembershipForm';
import MembershipReview from './components/MembershipReview';
import PaymentModule from './components/PaymentModule';
import ProfileModule from './components/ProfileModule';
import WithdrawalModule from './components/WithdrawalModule';
import AboutPage from './components/AboutPage';
import BenefitsPage from './components/BenefitsPage';
import { User, UserRole } from './types';
import { db } from './mockDb';
import { LogIn, Mail, Lock, Landmark, ChevronLeft, AlertCircle } from 'lucide-react';

type ViewMode = 'landing' | 'apply' | 'login' | 'app' | 'about' | 'benefits';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Form States
  const [email, setEmail] = useState('admin@sulejalga.gov.ng'); // Default for demo
  const [password, setPassword] = useState('Admin@2024'); // Default for demo

  useEffect(() => {
    const savedAuth = localStorage.getItem('coop_session_email');
    if (savedAuth) {
      const foundUser = db.getUserByEmail(savedAuth);
      if (foundUser) {
        setUser(foundUser);
        setView('app');
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError(null);

    setTimeout(() => {
      const foundUser = db.getUserByEmail(email);
      
      // Simulation of password check
      if (foundUser && (password === 'Admin@2024' || password === 'Member@2024')) {
        setUser(foundUser);
        setView('app');
        localStorage.setItem('coop_session_email', foundUser.email);
      } else {
        setLoginError("Invalid email or security password. Please try again.");
      }
      setIsLoginLoading(false);
    }, 1200);
  };

  const handleLogout = () => {
    setView('landing');
    setUser(null);
    localStorage.removeItem('coop_session_email');
  };

  const handleRoleSwitch = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  if (view === 'about') return <AboutPage onBack={() => setView('landing')} />;
  if (view === 'benefits') return <BenefitsPage onBack={() => setView('landing')} />;
  if (view === 'apply') return <MembershipForm onBack={() => setView('landing')} onSubmit={() => {}} />;
  if (view === 'landing') return <LandingPage onLogin={() => setView('login')} onApply={() => setView('apply')} />;

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-700/5 -skew-y-6 -translate-y-1/2"></div>
        <button onClick={() => setView('landing')} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 z-20">
          <ChevronLeft size={20} /> Back to Website
        </button>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-700 rounded-2xl shadow-xl shadow-indigo-100 mb-6 transform hover:rotate-6 transition-transform">
               <Landmark size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Employee Portal</h1>
            <p className="text-slate-400 mt-2 font-bold uppercase text-[10px] tracking-widest">Suleja LGA Cooperative CMS</p>
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
                    type="email" required placeholder="admin@sulejalga.gov.ng"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Security Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" required placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoginLoading}
                className="w-full py-4 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-300 text-white font-black rounded-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                {isLoginLoading ? "Verifying Credentials..." : "Secure Login"} <LogIn size={20} />
              </button>
            </form>
            
            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
              <p className="text-[10px] text-amber-700 font-bold uppercase mb-1">Demo Credentials</p>
              <p className="text-[9px] text-amber-600">Admin: admin@sulejalga.gov.ng / Admin@2024</p>
              <p className="text-[9px] text-amber-600">Member: member@sulejalga.gov.ng / Member@2024</p>
            </div>
          </div>
          <p className="text-center mt-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
             Official Enterprise Solution • Premegage Tech
          </p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (!user) return null;
    switch(activeTab) {
      case 'dashboard': return <Dashboard user={user} />;
      case 'loans': return <LoanManagement user={user} />;
      case 'membership_review': return <MembershipReview />;
      case 'contributions': return <PaymentModule />;
      case 'withdrawals': return <WithdrawalModule user={user} />;
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
