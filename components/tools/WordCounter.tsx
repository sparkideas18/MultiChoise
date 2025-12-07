import React, { useState } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      sentences: text.split(/[.!?]+/).filter(Boolean).length,
      paragraphs: text.split(/\n+/).filter(Boolean).length,
      readingTime: Math.ceil((text.trim().split(/\s+/).length) / 200) // Approx 200 wpm
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
       <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex items-center justify-between">
           <div>
               <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="material-icons mr-3 text-pink-400">notes</span>
                Word Counter
               </h2>
               <p className="text-slate-400 text-sm">Analyze your text statistics instantly.</p>
           </div>
           <button 
                onClick={() => setText('')}
                className="text-slate-400 hover:text-red-400 transition flex items-center text-sm font-medium"
           >
               <span className="material-icons mr-1 text-base">delete</span> Clear
           </button>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
           {[
               { label: 'Words', value: stats.words, color: 'text-pink-400' },
               { label: 'Characters', value: stats.characters, color: 'text-blue-400' },
               { label: 'No Spaces', value: stats.charactersNoSpaces, color: 'text-indigo-400' },
               { label: 'Sentences', value: stats.sentences, color: 'text-emerald-400' },
               { label: 'Paragraphs', value: stats.paragraphs, color: 'text-orange-400' },
               { label: 'Reading Time', value: `${stats.readingTime} min`, color: 'text-purple-400' },
           ].map((stat, idx) => (
               <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                   <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                   <span className="text-xs text-slate-500 uppercase tracking-wider mt-1 text-center">{stat.label}</span>
               </div>
           ))}
       </div>

       <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
            <div className="bg-slate-800/50 p-2 border-b border-slate-700 flex justify-end">
                <button 
                    onClick={() => navigator.clipboard.writeText(text)}
                    className="text-xs text-slate-400 hover:text-white flex items-center px-3 py-1 rounded hover:bg-slate-700 transition"
                >
                    <span className="material-icons text-sm mr-1">content_copy</span> Copy Text
                </button>
            </div>
           <textarea
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Type or paste your text here..."
               className="w-full h-full bg-slate-900/50 p-6 text-slate-300 resize-none focus:outline-none font-mono text-sm leading-relaxed"
           />
       </div>
    </div>
  );
};

export default WordCounter;