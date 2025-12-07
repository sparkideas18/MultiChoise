import React, { useState, useEffect } from 'react';

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#6366f1'); // Default Indigo-500
  const [rgb, setRgb] = useState('rgb(99, 102, 241)');
  const [hsl, setHsl] = useState('hsl(239, 84%, 67%)');

  useEffect(() => {
    updateColorValues(color);
  }, [color]);

  const updateColorValues = (hex: string) => {
    // Convert HEX to RGB
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    setRgb(`rgb(${r}, ${g}, ${b})`);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    setHsl(`hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-xl bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-purple-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-purple-400">palette</span>
            Color Picker
          </h2>
          <p className="text-slate-400 text-sm mt-1">Pick a color and get its HEX, RGB, and HSL values.</p>
        </div>

        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* Visual Picker */}
                <div className="flex flex-col items-center gap-4">
                    <div 
                        className="w-40 h-40 rounded-full shadow-2xl border-4 border-slate-600 overflow-hidden relative group"
                        style={{ backgroundColor: color }}
                    >
                         <input 
                            type="color" 
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] cursor-pointer opacity-0"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition">
                            <span className="material-icons text-white opacity-0 group-hover:opacity-100 drop-shadow-md">edit</span>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">Click circle to change</p>
                </div>

                {/* Values */}
                <div className="flex-1 w-full space-y-4">
                    {[
                        { label: 'HEX', value: color },
                        { label: 'RGB', value: rgb },
                        { label: 'HSL', value: hsl }
                    ].map((item) => (
                        <div key={item.label} className="group relative">
                            <label className="block text-xs font-medium text-slate-500 mb-1 ml-1">{item.label}</label>
                            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                <div className="w-10 h-10 border-r border-slate-700" style={{ backgroundColor: color }}></div>
                                <input 
                                    readOnly 
                                    value={item.value} 
                                    className="flex-1 bg-transparent p-2 text-slate-300 font-mono text-sm focus:outline-none"
                                />
                                <button 
                                    onClick={() => copyToClipboard(item.value)}
                                    className="p-2 text-slate-500 hover:text-white hover:bg-slate-700 transition"
                                    title="Copy"
                                >
                                    <span className="material-icons text-sm">content_copy</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Palette Suggestion */}
            <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Palette</h3>
                <div className="flex justify-between gap-2">
                    {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#64748b'].map((c) => (
                        <button 
                            key={c}
                            onClick={() => setColor(c)}
                            className="w-8 h-8 rounded-full border border-slate-600 hover:scale-110 transition shadow-lg"
                            style={{ backgroundColor: c }}
                            title={c}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;