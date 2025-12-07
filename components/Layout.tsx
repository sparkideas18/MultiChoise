import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { ToolCategory } from '../types';

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
    { name: 'Unit Converter', path: '/tool/converter', icon: 'transform', category: ToolCategory.UTILITY },
    { name: 'Settings', path: '/settings', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          {isSidebarOpen && <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">MultiChoice</h1>}
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <span className="material-icons text-xl">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-3 rounded-lg transition-colors
                    ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}
                  `}
                >
                  <span className="material-icons text-xl">{item.icon}</span>
                  {isSidebarOpen && <span className="ml-3 font-medium whitespace-nowrap">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={onLogout}
            className="flex items-center w-full p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
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
        
        {/* Header - Mobile Only mostly, but good for title */}
        <header className="h-16 bg-slate-800/50 backdrop-blur-md border-b border-slate-700 flex items-center px-6 justify-between lg:hidden">
          <h2 className="text-lg font-semibold">
            {navItems.find(i => i.path === location.pathname)?.name || 'MultiChoice'}
          </h2>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-400">
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