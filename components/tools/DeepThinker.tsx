import React, { useState, useRef, useEffect } from 'react';
import { generateThinkingResponse } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import ReactMarkdown from 'react-markdown';

const DeepThinker: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateThinkingResponse(userMessage.text);
      
      const botMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        isThinking: false
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'model',
        text: "I encountered an error while thinking deeply about your request. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-lg shadow-lg shadow-purple-900/50">
            <span className="material-icons text-white">psychology</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Deep Reasoner</h2>
            <p className="text-xs text-purple-300">Powered by Gemini 3 Pro (Thinking Budget: 32k)</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
           Complex Problem Solver
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-6">
             <span className="material-icons text-7xl text-slate-700/50">psychology_alt</span>
             <div className="text-center max-w-md space-y-2">
               <h3 className="text-xl font-semibold text-slate-300">What challenging task can I help with?</h3>
               <p className="text-sm">
                 I use extended thinking time to solve complex math, coding, and reasoning problems.
               </p>
             </div>
             
             <div className="grid grid-cols-1 gap-3 w-full max-w-xl">
                <button 
                  onClick={() => setInput("Design a comprehensive architecture for a distributed, fault-tolerant social media platform handling 500M daily active users, detailing database choices, caching strategies, and load balancing.")} 
                  className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-left transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="material-icons text-indigo-400 mt-1">dns</span>
                    <div>
                      <span className="font-semibold text-slate-200 block mb-1 group-hover:text-indigo-300">System Design</span>
                      <span className="text-sm text-slate-400 group-hover:text-slate-300">Architect a scalable social media platform for 500M users.</span>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setInput("Write a Python script to simulate the chaotic motion of a double pendulum using the Lagrangian mechanics approach. Include comments explaining the physics equations.")} 
                  className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-left transition-all duration-200"
                >
                   <div className="flex items-start gap-3">
                    <span className="material-icons text-emerald-400 mt-1">functions</span>
                    <div>
                      <span className="font-semibold text-slate-200 block mb-1 group-hover:text-emerald-300">Physics Simulation</span>
                      <span className="text-sm text-slate-400 group-hover:text-slate-300">Simulate a double pendulum using Python and Lagrangian mechanics.</span>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setInput("Analyze the geopolitical and economic implications of a hypothetical sudden transition to 100% renewable energy globally by 2030.")} 
                  className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-left transition-all duration-200"
                >
                   <div className="flex items-start gap-3">
                    <span className="material-icons text-amber-400 mt-1">public</span>
                    <div>
                      <span className="font-semibold text-slate-200 block mb-1 group-hover:text-amber-300">Global Strategy</span>
                      <span className="text-sm text-slate-400 group-hover:text-slate-300">Analyze implications of a rapid global renewable energy transition.</span>
                    </div>
                  </div>
                </button>
             </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' ? (
                 <div className="prose prose-invert prose-sm max-w-none">
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                 </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-4 flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-sm text-purple-300 font-medium animate-pulse">Thinking deeply...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a complex question..."
            className="w-full bg-slate-900 text-white placeholder-slate-500 rounded-xl py-3 pl-4 pr-12 border border-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-icons text-lg">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeepThinker;