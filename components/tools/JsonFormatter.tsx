import React, { useState } from 'react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const formatJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError('');
      showNotification('Formatted successfully');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError('');
      showNotification('Minified successfully');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const validateJson = () => {
    if (!input.trim()) return;
    try {
      JSON.parse(input);
      setError('');
      showNotification('Valid JSON');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const showNotification = (msg: string) => {
      setNotification(msg);
      setTimeout(() => setNotification(''), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    showNotification('Copied to clipboard');
  };

  const handleClear = () => {
      setInput('');
      setError('');
      setNotification('');
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-yellow-500/10 to-transparent flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
                <span className="material-icons mr-2 text-yellow-400">data_object</span>
                JSON Formatter & Validator
            </h2>
          </div>
          <div className="flex space-x-2">
               <button 
                  onClick={formatJson}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
               >
                  Format
               </button>
               <button 
                  onClick={minifyJson}
                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition"
               >
                  Minify
               </button>
               <button 
                  onClick={validateJson}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition"
               >
                  Validate
               </button>
          </div>
        </div>

        <div className="flex-1 p-0 flex flex-col relative">
            <div className="bg-slate-900 border-b border-slate-700 px-4 py-2 flex justify-between items-center">
                 <span className="text-xs text-slate-500">Input / Output</span>
                 <div className="flex space-x-2">
                    <button onClick={handleCopy} className="text-slate-400 hover:text-white transition" title="Copy">
                        <span className="material-icons text-sm">content_copy</span>
                    </button>
                    <button onClick={handleClear} className="text-slate-400 hover:text-red-400 transition" title="Clear">
                        <span className="material-icons text-sm">delete</span>
                    </button>
                 </div>
            </div>
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="flex-1 w-full bg-slate-900 p-4 text-slate-300 focus:outline-none font-mono text-sm leading-relaxed resize-none"
                spellCheck="false"
            />
            
            {/* Status Bar */}
            <div className={`p-3 border-t border-slate-700 flex justify-between items-center ${error ? 'bg-red-500/10' : 'bg-slate-800'}`}>
                {error ? (
                    <div className="flex items-center text-red-400 text-sm truncate">
                        <span className="material-icons text-sm mr-2">error_outline</span>
                        {error}
                    </div>
                ) : notification ? (
                     <div className="flex items-center text-emerald-400 text-sm animate-fade-in">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        {notification}
                    </div>
                ) : (
                    <div className="text-slate-500 text-xs">Ready</div>
                )}
                <div className="text-slate-500 text-xs">
                    {input.length} chars
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;