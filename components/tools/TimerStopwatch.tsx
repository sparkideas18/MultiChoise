import React, { useState, useEffect, useRef } from 'react';

const TimerStopwatch: React.FC = () => {
  const [mode, setMode] = useState<'timer' | 'stopwatch'>('timer');

  // Stopwatch State
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Timer State
  const [timerDuration, setTimerDuration] = useState(0); // in seconds
  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Refs for intervals
  const swIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // --- Stopwatch Logic ---
  useEffect(() => {
    if (swRunning) {
      const startTime = Date.now() - swTime;
      swIntervalRef.current = window.setInterval(() => {
        setSwTime(Date.now() - startTime);
      }, 10);
    } else {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    }
    return () => {
      if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    };
  }, [swRunning]);

  const handleSwReset = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps(prev => [swTime, ...prev]);
  };

  const formatTime = (ms: number) => {
    const min = Math.floor((ms / 60000) % 60);
    const sec = Math.floor((ms / 1000) % 60);
    const centi = Math.floor((ms / 10) % 100);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  // --- Timer Logic ---
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerRemaining]);

  const startTimer = () => {
    if (timerRemaining === 0) {
        const totalSec = (hours * 3600) + (minutes * 60) + seconds;
        if (totalSec > 0) {
            setTimerDuration(totalSec);
            setTimerRemaining(totalSec);
            setTimerRunning(true);
            setIsFinished(false);
        }
    } else {
        setTimerRunning(true);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(0);
    setIsFinished(false);
  };

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        {/* Header Tabs */}
        <div className="flex border-b border-slate-700">
             <button 
                onClick={() => setMode('timer')}
                className={`flex-1 py-4 text-center font-bold transition ${mode === 'timer' ? 'text-indigo-400 bg-slate-800 border-b-2 border-indigo-400' : 'text-slate-400 bg-slate-900 hover:text-white'}`}
             >
                 Timer
             </button>
             <button 
                onClick={() => setMode('stopwatch')}
                className={`flex-1 py-4 text-center font-bold transition ${mode === 'stopwatch' ? 'text-indigo-400 bg-slate-800 border-b-2 border-indigo-400' : 'text-slate-400 bg-slate-900 hover:text-white'}`}
             >
                 Stopwatch
             </button>
        </div>

        <div className="p-8">
            {mode === 'stopwatch' ? (
                // Stopwatch UI
                <div className="flex flex-col items-center">
                    <div className="font-mono text-6xl text-white mb-8 tabular-nums tracking-widest">
                        {formatTime(swTime)}
                    </div>
                    
                    <div className="flex gap-4 mb-8 w-full">
                        <button 
                            onClick={() => setSwRunning(!swRunning)}
                            className={`flex-1 py-3 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95 ${swRunning ? 'bg-red-500 hover:bg-red-400 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-white'}`}
                        >
                            {swRunning ? 'Stop' : 'Start'}
                        </button>
                        <button 
                            onClick={handleLap}
                            disabled={!swRunning}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-lg transition"
                        >
                            Lap
                        </button>
                         <button 
                            onClick={handleSwReset}
                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold text-lg transition"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="w-full max-h-48 overflow-y-auto custom-scrollbar bg-slate-900 rounded-xl border border-slate-700">
                        {laps.map((lap, index) => (
                            <div key={index} className="flex justify-between p-3 border-b border-slate-700/50 last:border-0 text-sm">
                                <span className="text-slate-400">Lap {laps.length - index}</span>
                                <span className="font-mono text-white">{formatTime(lap)}</span>
                            </div>
                        ))}
                        {laps.length === 0 && (
                            <div className="p-4 text-center text-slate-500 text-sm">No laps recorded</div>
                        )}
                    </div>
                </div>
            ) : (
                // Timer UI
                <div className="flex flex-col items-center">
                     {timerRemaining > 0 || isFinished ? (
                         <div className={`font-mono text-6xl mb-8 tabular-nums tracking-widest ${isFinished ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                             {formatTimer(timerRemaining)}
                         </div>
                     ) : (
                         <div className="flex gap-2 mb-8 items-end">
                             <div className="flex flex-col items-center">
                                 <label className="text-xs text-slate-500 mb-1">Hours</label>
                                 <input type="number" min="0" max="23" value={hours} onChange={e => setHours(parseInt(e.target.value) || 0)} className="w-16 p-3 bg-slate-900 border border-slate-600 rounded-lg text-center text-xl text-white focus:border-indigo-500 focus:outline-none" />
                             </div>
                             <span className="text-2xl text-slate-500 mb-3">:</span>
                             <div className="flex flex-col items-center">
                                 <label className="text-xs text-slate-500 mb-1">Mins</label>
                                 <input type="number" min="0" max="59" value={minutes} onChange={e => setMinutes(parseInt(e.target.value) || 0)} className="w-16 p-3 bg-slate-900 border border-slate-600 rounded-lg text-center text-xl text-white focus:border-indigo-500 focus:outline-none" />
                             </div>
                             <span className="text-2xl text-slate-500 mb-3">:</span>
                             <div className="flex flex-col items-center">
                                 <label className="text-xs text-slate-500 mb-1">Secs</label>
                                 <input type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(parseInt(e.target.value) || 0)} className="w-16 p-3 bg-slate-900 border border-slate-600 rounded-lg text-center text-xl text-white focus:border-indigo-500 focus:outline-none" />
                             </div>
                         </div>
                     )}

                     <div className="flex gap-4 w-full">
                         {timerRemaining > 0 || isFinished ? (
                             <>
                                <button 
                                    onClick={() => setTimerRunning(!timerRunning)}
                                    disabled={isFinished}
                                    className={`flex-1 py-3 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95 ${timerRunning ? 'bg-amber-500 hover:bg-amber-400 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-white disabled:bg-slate-700 disabled:opacity-50'}`}
                                >
                                    {timerRunning ? 'Pause' : 'Resume'}
                                </button>
                                <button 
                                    onClick={resetTimer}
                                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold text-lg transition"
                                >
                                    Reset
                                </button>
                             </>
                         ) : (
                            <button 
                                onClick={startTimer}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition transform active:scale-95"
                            >
                                Start Timer
                            </button>
                         )}
                     </div>

                     {isFinished && (
                         <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400 animate-bounce">
                             <span className="material-icons mr-2">notifications_active</span>
                             Timer Finished!
                         </div>
                     )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TimerStopwatch;