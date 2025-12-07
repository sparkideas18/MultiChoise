import React, { useState, useEffect, useRef } from 'react';

// Declare types for Web Speech API
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const SpeechToText: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setIsSupported(false);
        setError('Speech Recognition is not supported in this browser. Please use Chrome or Edge.');
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        // Append new final results to existing text
        if (finalTranscript) {
            setText(prev => prev + (prev ? ' ' : '') + finalTranscript);
        }
    };

    recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
            setError('Microphone access denied. Please allow permission.');
            setIsListening(false);
        } else {
            setError('Error occurred during recognition: ' + event.error);
        }
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
    } else {
        setError('');
        recognitionRef.current.start();
        setIsListening(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
    setError('');
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-red-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-red-400">mic</span>
            Speech to Text
          </h2>
          <p className="text-slate-400 text-sm mt-1">Convert your spoken words into written text.</p>
        </div>

        <div className="p-8 space-y-6">
            {!isSupported && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
                    {error}
                </div>
            )}

            <div className="relative">
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Click the microphone and start speaking..."
                    className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg p-4 text-white focus:border-red-500 focus:outline-none resize-none text-lg leading-relaxed"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                     <button 
                        onClick={handleCopy}
                        className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700 border border-slate-700 transition"
                        title="Copy to clipboard"
                        disabled={!text}
                    >
                        <span className="material-icons text-sm">content_copy</span>
                    </button>
                    <button 
                        onClick={handleClear}
                        className="p-2 bg-slate-800 text-slate-300 hover:text-red-400 rounded-lg hover:bg-slate-700 border border-slate-700 transition"
                        title="Clear text"
                        disabled={!text}
                    >
                        <span className="material-icons text-sm">delete</span>
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                 <button
                    onClick={toggleListening}
                    disabled={!isSupported}
                    className={`
                        w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300
                        ${isListening 
                            ? 'bg-red-500 text-white animate-pulse shadow-red-500/50 scale-110' 
                            : 'bg-slate-700 text-slate-300 hover:bg-red-500 hover:text-white hover:scale-105'
                        }
                        ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    <span className="material-icons text-4xl">{isListening ? 'mic_off' : 'mic'}</span>
                </button>
            </div>
            
            <p className={`text-center text-sm font-medium ${isListening ? 'text-red-400' : 'text-slate-500'}`}>
                {isListening ? 'Listening... Speak now' : 'Click microphone to start recording'}
            </p>

            {error && !isSupported && (
                 <p className="text-center text-red-400 text-sm">{error}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;