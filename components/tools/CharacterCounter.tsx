import React, { useState } from 'react';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(x => x.trim().length > 0).length,
    paragraphs: text.split(/\n+/).filter(x => x.trim().length > 0).length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-4xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-violet-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-violet-400">abc</span>
            Character Counter
          </h2>
          <p className="text-slate-400 text-sm mt-1">Real-time text statistics and analysis.</p>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-5 gap-4 border-b border-slate-700 bg-slate-900/50">
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
              <span className="block text-2xl font-bold text-white">{stats.characters}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Characters</span>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
              <span className="block text-2xl font-bold text-slate-300">{stats.charactersNoSpaces}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">No Spaces</span>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
              <span className="block text-2xl font-bold text-violet-400">{stats.words}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Words</span>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
              <span className="block text-2xl font-bold text-blue-400">{stats.sentences}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Sentences</span>
           </div>
           <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center shadow-sm">
              <span className="block text-2xl font-bold text-emerald-400">{stats.paragraphs}</span>
              <span className="text-xs text-slate-500 uppercase tracking-wide">Paragraphs</span>
           </div>
        </div>

        <div className="p-6 flex-1 flex flex-col min-h-[400px]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full flex-1 bg-slate-900 border border-slate-600 rounded-lg p-4 text-white focus:border-violet-500 focus:outline-none resize-none font-mono text-sm leading-relaxed transition-colors"
            placeholder="Type or paste your text here to begin analyzing..."
          />
          <div className="flex justify-between mt-4">
             <button 
               onClick={() => setText('')}
               className="text-slate-400 hover:text-red-400 text-sm flex items-center transition px-3 py-2 rounded hover:bg-red-500/10"
             >
               <span className="material-icons text-base mr-2">delete</span> Clear Text
             </button>
             <button 
               onClick={() => navigator.clipboard.writeText(text)}
               className="text-slate-400 hover:text-white text-sm flex items-center transition px-3 py-2 rounded hover:bg-slate-700"
               disabled={!text}
             >
               <span className="material-icons text-base mr-2">content_copy</span> Copy to Clipboard
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCounter;