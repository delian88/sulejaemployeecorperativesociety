
import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filteredSidebarItems = SIDEBAR_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 ease-in-out bg-[#0f172a] text-slate-300 flex flex-col z-50`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="h-10 w-10 bg-indigo-600 rounded flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-white font-bold text-sm tracking-tight">SULEJA LGA</h1>
              <p className="text-[10px] text-slate-400">Cooperative Society</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {filteredSidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 gap-4 transition-colors relative group ${
                activeTab === item.id 
                ? 'bg-indigo-600/10 text-white border-r-4 border-indigo-600' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-indigo-500' : 'text-slate-400'} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-2 py-2 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 group focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions, members..." 
                className="bg-transparent border-none focus:outline-none text-sm px-2 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Role Switch for Demo */}
            <div className="hidden lg:block">
              <select 
                value={user.role} 
                onChange={(e) => onRoleSwitch(e.target.value as UserRole)}
                className="bg-slate-100 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-slate-200 text-slate-600 focus:outline-none"
              >
                <option value={UserRole.MEMBER}>Member View</option>
                <option value={UserRole.ADMIN}>Admin View</option>
                <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
              </select>
            </div>

            <button className="p-2 relative hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <img 
                  src={user.avatar || 'https://via.placeholder.com/40'} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full border border-slate-200"
                />
                <div className="hidden md:block text-left mr-2">
                  <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
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
                    {/* Fix: Added missing Settings icon import from lucide-react */}
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                      <Settings size={16} /> Account Settings
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
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-6 text-[10px] text-slate-400 shrink-0 uppercase tracking-widest font-semibold">
           <div>© 2024 Suleja LGA Employee Multipurpose Cooperative Society</div>
           <div>System Version 1.0.4 - Enterprise Edition</div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
