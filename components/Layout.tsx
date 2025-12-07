import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { ToolCategory } from '../types';
import Logo from './Logo';

interface LayoutProps {
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'grid_view' },
    { name: 'Deep Thinker', path: '/tool/deep-thinker', icon: 'psychology', category: ToolCategory.PRODUCTIVITY },
    { name: 'Finance Tracker', path: '/tool/finance', icon: 'payments', category: ToolCategory.FINANCE },
    { name: 'Notepad', path: '/tool/notepad', icon: 'edit_note', category: ToolCategory.UTILITY },
    { name: 'Markdown Editor', path: '/tool/markdown-editor', icon: 'code', category: ToolCategory.PRODUCTIVITY },
    { name: 'Unit Converter', path: '/tool/converter', icon: 'transform', category: ToolCategory.UTILITY },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-700">
          {isSidebarOpen ? (
            <Logo size="sm" />
          ) : (
            <div className="w-full flex justify-center">
               <Logo size="sm" showText={false} />
            </div>
          )}
          {isSidebarOpen && (
            <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
                <span className="material-icons text-lg">chevron_left</span>
            </button>
          )}
        </div>

        {!isSidebarOpen && (
             <div className="py-4 flex justify-center border-b border-slate-700">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition"
                >
                    <span className="material-icons">menu</span>
                </button>
             </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${isActive ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-transparent'}
                    ${!isSidebarOpen ? 'justify-center' : ''}
                  `}
                  title={!isSidebarOpen ? item.name : ''}
                >
                  <span className={`material-icons text-xl ${!isSidebarOpen ? 'text-2xl' : ''}`}>{item.icon}</span>
                  {isSidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={onLogout}
            className={`flex items-center w-full p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition ${!isSidebarOpen ? 'justify-center' : ''}`}
            title="Logout"
          >
            <span className="material-icons">logout</span>
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
         {/* Load Google Material Icons */}
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        
        {/* Header - Mobile Only */}
        <header className="h-16 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex items-center px-4 justify-between lg:hidden z-10">
          <div className="flex items-center gap-3">
             <Logo size="sm" showText={false} />
             <h2 className="text-lg font-semibold text-white">
                {navItems.find(i => i.path === location.pathname)?.name || 'MultiChoice'}
             </h2>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 text-slate-400 bg-slate-700/50 rounded-lg">
            <span className="material-icons">menu</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-900 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;