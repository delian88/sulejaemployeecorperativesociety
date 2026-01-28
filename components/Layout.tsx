
import React, { useState, useEffect } from 'react';
import { UserRole, User } from '../types';
import { SIDEBAR_ITEMS, COLORS } from '../constants';
import { Bell, Search, Menu, X, User as UserIcon, ChevronDown, LogOut, Settings } from 'lucide-react';

interface LayoutProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
  onLogout: () => void;
  onRoleSwitch: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ user, activeTab, setActiveTab, children, onLogout, onRoleSwitch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => item.roles.includes(user.role));

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        } fixed lg:relative h-full transition-all duration-300 ease-in-out bg-[#0f172a] text-slate-300 flex flex-col z-[70] shadow-2xl lg:shadow-none`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-600 rounded flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            {(isSidebarOpen || (isMobile && isSidebarOpen)) && (
              <div className="overflow-hidden whitespace-nowrap transition-opacity">
                <h1 className="text-white font-bold text-sm tracking-tight">SULEJA LGA</h1>
                <p className="text-[10px] text-slate-400">Cooperative Society</p>
              </div>
            )}
          </div>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {filteredSidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center px-4 py-3 gap-4 transition-colors relative group ${
                activeTab === item.id 
                ? 'bg-indigo-600/10 text-white border-r-4 border-indigo-600' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-indigo-500' : 'text-slate-400'} />
              {(isSidebarOpen || (isMobile && isSidebarOpen)) && <span className="text-sm font-medium">{item.label}</span>}
              {!isSidebarOpen && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-lg">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-4 px-2 py-2 text-slate-400 hover:text-red-400 transition-colors ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {(isSidebarOpen || (isMobile && isSidebarOpen)) && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40">
          <div className="flex items-center gap-3 lg:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X size={20} className="lg:hidden" /> : <Menu size={20} />}
              {isSidebarOpen && <Menu size={20} className="hidden lg:block" />}
            </button>
            <div className="hidden sm:flex items-center bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 group focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none text-sm px-2 w-32 md:w-64"
              />
            </div>
            <h2 className="lg:hidden text-indigo-700 font-bold text-xs uppercase tracking-tighter sm:hidden">SLGA COOP</h2>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* Quick Role Switch for Demo */}
            <div className="hidden xl:block">
              <select 
                value={user.role} 
                onChange={(e) => onRoleSwitch(e.target.value as UserRole)}
                className="bg-slate-100 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-slate-200 text-slate-600 focus:outline-none"
              >
                <option value={UserRole.MEMBER}>Member</option>
                <option value={UserRole.ADMIN}>Admin</option>
                <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
              </select>
            </div>

            <button className="p-2 relative hover:bg-slate-100 rounded-full transition-colors" aria-label="Notifications">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 lg:gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <img 
                  src={user.avatar || 'https://via.placeholder.com/40'} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-800 leading-none truncate max-w-[120px]">{user.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">{user.role.replace('_', ' ')}</p>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-medium text-slate-800 truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                      <UserIcon size={16} /> Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                      <Settings size={16} /> Settings
                    </button>
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button 
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </div>

        {/* Global Footer */}
        <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-4 lg:px-6 text-[9px] md:text-[10px] text-slate-400 shrink-0 uppercase tracking-widest font-semibold">
           <div className="truncate pr-4">© 2024 Suleja LGA Employee Coop</div>
           <div className="shrink-0">v1.0.5 - Enterprise</div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
