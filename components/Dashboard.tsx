import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tool, ToolCategory } from '../types';

const tools: Tool[] = [
  {
    id: 'deep-thinker',
    name: 'Deep Reasoner',
    description: 'Advanced AI assistant powered by Gemini 3 Pro with deep thinking capabilities for complex problem solving.',
    category: ToolCategory.PRODUCTIVITY,
    icon: 'psychology_alt',
    path: '/tool/deep-thinker',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'finance-tracker',
    name: 'Finance Tracker',
    description: 'Track your income and expenses with visual analytics and categorization.',
    category: ToolCategory.FINANCE,
    icon: 'account_balance_wallet',
    path: '/tool/finance',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'notepad',
    name: 'Smart Notes',
    description: 'Create, edit, and organize notes. Auto-saves locally for privacy.',
    category: ToolCategory.UTILITY,
    icon: 'edit_note',
    path: '/tool/notepad',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write, preview, and refine markdown with AI assistance.',
    category: ToolCategory.PRODUCTIVITY,
    icon: 'code',
    path: '/tool/markdown-editor',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'converter',
    name: 'Unit Converter',
    description: 'Convert between common units of measurement instantly.',
    category: ToolCategory.UTILITY,
    icon: 'sync_alt',
    path: '/tool/converter',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your age based on your birth date.',
    category: ToolCategory.UTILITY,
    icon: 'cake',
    path: '/tool/age-calculator',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI).',
    category: ToolCategory.UTILITY,
    icon: 'monitor_weight',
    path: '/tool/bmi-calculator',
    color: 'from-emerald-500 to-green-600'
  },
   {
    id: 'timer-stopwatch',
    name: 'Timer & Stopwatch',
    description: 'A versatile timer and stopwatch for all your needs.',
    category: ToolCategory.UTILITY,
    icon: 'hourglass_bottom',
    path: '/tool/timer',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate your Equated Monthly Installment (EMI) for loans.',
    category: ToolCategory.FINANCE,
    icon: 'calculate',
    path: '/tool/emi-calculator',
    color: 'from-emerald-600 to-green-700'
  },
  {
    id: 'sip-calculator',
    name: 'SIP Calculator',
    description: 'Calculate the future value of your SIP investments.',
    category: ToolCategory.FINANCE,
    icon: 'savings',
    path: '/tool/sip-calculator',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create a QR code for any text or URL.',
    category: ToolCategory.UTILITY,
    icon: 'qr_code_scanner',
    path: '/tool/qr-generator',
    color: 'from-blue-500 to-sky-600'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure, and random passwords.',
    category: ToolCategory.UTILITY,
    icon: 'password',
    path: '/tool/password-generator',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    description: 'Count characters, words, sentences, and paragraphs in real-time.',
    category: ToolCategory.PRODUCTIVITY,
    icon: 'numbers',
    path: '/tool/character-counter',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text.',
    category: ToolCategory.PRODUCTIVITY,
    icon: 'segment',
    path: '/tool/word-counter',
    color: 'from-pink-500 to-fuchsia-600'
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode text to Base64 or decode from Base64.',
    category: ToolCategory.UTILITY,
    icon: 'code',
    path: '/tool/base64',
    color: 'from-slate-500 to-slate-600'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick a color and get its HEX, RGB, and HSL values.',
    category: ToolCategory.UTILITY,
    icon: 'colorize',
    path: '/tool/color-picker',
    color: 'from-fuchsia-500 to-purple-600'
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert written text into audible speech.',
    category: ToolCategory.UTILITY,
    icon: 'volume_up',
    path: '/tool/tts',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert your spoken words into written text.',
    category: ToolCategory.UTILITY,
    icon: 'mic',
    path: '/tool/stt',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, and validate your JSON data.',
    category: ToolCategory.UTILITY,
    icon: 'data_array',
    path: '/tool/json-formatter',
    color: 'from-yellow-500 to-amber-600'
  },
];

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Group tools by category
  const categories = Object.values(ToolCategory);
  
  const filterOptions = ['All', ...categories];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8">
      <div className="space-y-4 animate-slide-up">
        <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400">Access your daily tools and utilities in one place.</p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
            {filterOptions.map(option => (
                <button
                    key={option}
                    onClick={() => setSelectedCategory(option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selectedCategory === option 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    {option}
                </button>
            ))}
        </div>
      </div>

      {selectedCategory === 'All' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up delay-100">
            {/* Welcome Widget */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-800 border border-indigo-500/30 relative overflow-hidden shadow-xl transition hover:border-indigo-500/50">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-indigo-100 max-w-lg mb-6">
                    Ready to tackle complex problems? Try the new Deep Reasoner tool for advanced analysis and planning.
                    </p>
                    <Link to="/tool/deep-thinker" className="inline-flex items-center px-4 py-2 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-lg active:scale-95">
                    <span className="material-icons mr-2">psychology</span>
                    Launch Deep Reasoner
                    </Link>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                    <span className="material-icons text-9xl animate-pulse">rocket_launch</span>
                </div>
            </div>

            {/* Quick Stats Widget (Mock) */}
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-slate-300">Quick Stats</h3>
                <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Notes Saved</span>
                    <span className="text-xl font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-400">Monthly Expenses</span>
                    <span className="text-xl font-bold text-red-400">$1,240</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-2/3 animate-[width_1s_ease-out]"></div>
                </div>
                <p className="text-xs text-slate-500">65% of monthly budget used</p>
                </div>
            </div>
        </div>
      )}

      <div className="animate-slide-up delay-200">
        {categories.map((category, catIndex) => {
            // If specific category selected, only show that one
            if (selectedCategory !== 'All' && selectedCategory !== category) return null;

            const categoryTools = tools.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;

            return (
            <div key={category} className="space-y-4 mb-8">
                <h2 className="text-xl font-semibold text-slate-300 border-l-4 border-indigo-500 pl-3">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTools.map((tool, index) => (
                    <Link 
                    key={tool.id} 
                    to={tool.path}
                    className="group relative bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                    style={{ animationDelay: `${(catIndex * 100) + (index * 50)}ms` }}
                    >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="material-icons text-white text-2xl">{tool.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors">{tool.name}</h3>
                    <p className="text-slate-400 text-sm flex-1">{tool.description}</p>
                    <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center text-indigo-400 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Open Tool <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
};

export default Dashboard;