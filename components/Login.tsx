import React, { useState } from 'react';
import Logo from './Logo';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-700/50 relative overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

        <div className="text-center mb-10 mt-2 flex flex-col items-center">
            <div className="mb-6 transform hover:scale-105 transition duration-500">
               <Logo size="xl" showText={false} />
            </div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
                MultiChoice
            </h1>
            <p className="text-slate-400 text-sm tracking-wide">
                Your All-in-One Digital Workspace
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wider ml-1">Username</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-slate-500 group-focus-within:text-indigo-400 transition">person</span>
                </div>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-3.5 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition"
                required
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                Local Storage • Privacy Focused
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;