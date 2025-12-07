import React, { useState, useEffect } from 'react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      generated += charPool[randomIndex];
    }
    setPassword(generated);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColor = () => {
      let strength = 0;
      if(length > 8) strength++;
      if(length > 12) strength++;
      if(includeUppercase) strength++;
      if(includeNumbers) strength++;
      if(includeSymbols) strength++;

      if (strength <= 2) return 'bg-red-500';
      if (strength <= 4) return 'bg-yellow-500';
      return 'bg-emerald-500';
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-red-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-red-400">lock</span>
            Password Generator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Create strong, secure, and random passwords.</p>
        </div>

        <div className="p-8 space-y-8">
            {/* Display Area */}
            <div className="relative">
                <div className="bg-slate-900 border border-slate-600 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-xl font-mono text-white tracking-wider break-all mr-2">{password}</span>
                    <button 
                        onClick={copyToClipboard}
                        className={`p-2 rounded-lg transition ${copied ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        <span className="material-icons">{copied ? 'check' : 'content_copy'}</span>
                    </button>
                </div>
                 <div className={`h-1 mt-2 rounded-full transition-all duration-300 ${strengthColor()}`} style={{ width: `${Math.min((length / 20) * 100, 100)}%` }}></div>
            </div>

            {/* Controls */}
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-slate-300">Password Length</label>
                        <span className="text-white font-bold">{length}</span>
                    </div>
                    <input 
                        type="range" min="6" max="32"
                        value={length} onChange={(e) => setLength(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="peer sr-only" />
                            <div className="w-5 h-5 bg-slate-700 border border-slate-500 rounded peer-checked:bg-red-500 peer-checked:border-red-500 transition"></div>
                            <span className="material-icons text-white text-sm absolute inset-0 opacity-0 peer-checked:opacity-100 flex items-center justify-center pointer-events-none">check</span>
                        </div>
                        <span className="text-slate-300 group-hover:text-white transition">Uppercase (A-Z)</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="peer sr-only" />
                            <div className="w-5 h-5 bg-slate-700 border border-slate-500 rounded peer-checked:bg-red-500 peer-checked:border-red-500 transition"></div>
                            <span className="material-icons text-white text-sm absolute inset-0 opacity-0 peer-checked:opacity-100 flex items-center justify-center pointer-events-none">check</span>
                        </div>
                        <span className="text-slate-300 group-hover:text-white transition">Numbers (0-9)</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="peer sr-only" />
                            <div className="w-5 h-5 bg-slate-700 border border-slate-500 rounded peer-checked:bg-red-500 peer-checked:border-red-500 transition"></div>
                            <span className="material-icons text-white text-sm absolute inset-0 opacity-0 peer-checked:opacity-100 flex items-center justify-center pointer-events-none">check</span>
                        </div>
                        <span className="text-slate-300 group-hover:text-white transition">Symbols (!@#)</span>
                    </label>
                </div>
            </div>
            
             <button
                onClick={generatePassword}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition flex items-center justify-center"
            >
                <span className="material-icons mr-2">refresh</span>
                Regenerate
            </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;