import React, { useState, useEffect } from 'react';

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Try to find a default English voice
        const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
        setSelectedVoice(defaultVoice.name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
        window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!text) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-cyan-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-cyan-400">record_voice_over</span>
            Text to Speech
          </h2>
          <p className="text-slate-400 text-sm mt-1">Convert written text into audible speech using your browser's engine.</p>
        </div>

        <div className="p-8 space-y-6">
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here to speak..."
                className="w-full h-32 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none resize-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                     <div>
                        <label className="text-sm font-medium text-slate-300 block mb-2">Voice</label>
                        <select 
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-slate-300 focus:outline-none text-sm"
                        >
                            {voices.map(v => (
                                <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                            ))}
                        </select>
                     </div>
                </div>

                <div className="space-y-4">
                     <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-medium text-slate-400">Rate (Speed)</label>
                            <span className="text-xs text-slate-400">{rate}x</span>
                        </div>
                        <input 
                            type="range" min="0.5" max="2" step="0.1"
                            value={rate} onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                     </div>
                     <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-medium text-slate-400">Pitch</label>
                            <span className="text-xs text-slate-400">{pitch}</span>
                        </div>
                        <input 
                            type="range" min="0.5" max="2" step="0.1"
                            value={pitch} onChange={(e) => setPitch(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                     </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-700">
                {!isSpeaking && !isPaused ? (
                    <button 
                        onClick={handleSpeak}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center shadow-lg shadow-cyan-500/20"
                    >
                        <span className="material-icons mr-2">play_arrow</span> Play
                    </button>
                ) : (
                   isPaused ? (
                        <button 
                            onClick={handleSpeak}
                            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center shadow-lg shadow-cyan-500/20"
                        >
                            <span className="material-icons mr-2">play_arrow</span> Resume
                        </button>
                   ) : (
                        <button 
                            onClick={handlePause}
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-lg font-bold transition flex items-center justify-center shadow-lg shadow-amber-500/20"
                        >
                            <span className="material-icons mr-2">pause</span> Pause
                        </button>
                   )
                )}
                
                <button 
                    onClick={handleStop}
                    className="px-6 bg-slate-700 hover:bg-red-500/80 text-white rounded-lg transition"
                >
                    <span className="material-icons">stop</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;