import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg mb-6">
            <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-medium text-white mb-1">Account</h3>
                <p className="text-sm text-slate-400">Manage your local profile</p>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-200">Username</p>
                        <p className="text-sm text-slate-500">Stored locally in your browser</p>
                    </div>
                    <span className="text-slate-300 px-3 py-1 bg-slate-700 rounded">
                        {JSON.parse(localStorage.getItem('multiChoiceUser') || '{}').username || 'Guest'}
                    </span>
                </div>
            </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-slate-700">
                <h3 className="text-lg font-medium text-white mb-1">Application Data</h3>
                <p className="text-sm text-slate-400">Manage locally stored data</p>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-200">Clear Finance Data</p>
                        <p className="text-sm text-slate-500">Remove all transactions</p>
                    </div>
                    <button 
                        onClick={() => { localStorage.removeItem('multiChoice_transactions'); window.location.reload(); }}
                        className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                    >
                        Clear Data
                    </button>
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-200">Clear Notes</p>
                        <p className="text-sm text-slate-500">Remove all saved notes</p>
                    </div>
                    <button 
                         onClick={() => { localStorage.removeItem('multiChoice_notes'); window.location.reload(); }}
                        className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                    >
                        Clear Data
                    </button>
                </div>
            </div>
        </div>
        
        <div className="mt-8 text-center text-slate-500 text-sm">
            <p>MultiChoice Platform v1.0.0</p>
            <p>Powered by Gemini 3 Pro</p>
        </div>
    </div>
  );
};

export default Settings;