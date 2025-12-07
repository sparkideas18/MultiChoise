import React, { useState } from 'react';

const Base64Converter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        // Use TextEncoder to handle Unicode characters correctly
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        // Use TextDecoder to handle Unicode characters correctly
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (e) {
      setError('Invalid input for decoding. Please ensure the string is a valid Base64 string.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-600/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-slate-400">enhanced_encryption</span>
            Base64 Converter
          </h2>
          <p className="text-slate-400 text-sm mt-1">Encode text to Base64 or decode from Base64.</p>
        </div>

        <div className="p-8 space-y-6">
           <div className="flex bg-slate-900 rounded-lg p-1 mb-6 border border-slate-700">
                <button 
                    onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
                    className={`flex-1 py-2 rounded-md font-medium transition ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Encode
                </button>
                <button 
                    onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                    className={`flex-1 py-2 rounded-md font-medium transition ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Decode
                </button>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Input</label>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? "Type text to encode..." : "Paste Base64 string to decode..."}
                    className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none font-mono text-sm"
                />
            </div>

            <div className="flex gap-3">
                <button 
                    onClick={handleConvert}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition"
                >
                    {mode === 'encode' ? 'Encode Text' : 'Decode Base64'}
                </button>
                <button 
                    onClick={handleSwap}
                    className="px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
                    title="Swap Input/Output"
                >
                    <span className="material-icons">swap_vert</span>
                </button>
                 <button 
                    onClick={handleClear}
                    className="px-4 bg-slate-700 hover:bg-red-500/20 hover:text-red-400 text-slate-300 rounded-lg transition"
                    title="Clear"
                >
                    <span className="material-icons">delete</span>
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-center">
                    <span className="material-icons text-sm mr-2">error</span> {error}
                </div>
            )}

            <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-300">Output</label>
                <textarea 
                    readOnly
                    value={output}
                    placeholder="Result will appear here..."
                    className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-300 focus:outline-none font-mono text-sm"
                />
                {output && (
                    <button 
                        onClick={handleCopy}
                        className="absolute top-8 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded hover:bg-slate-700 transition"
                        title="Copy to clipboard"
                    >
                        <span className="material-icons text-sm">content_copy</span>
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;