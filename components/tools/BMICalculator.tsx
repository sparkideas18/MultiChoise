import React, { useState, useEffect } from 'react';

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    let h = 0; // height in meters
    let w = 0; // weight in kg

    if (unit === 'metric') {
      if (!heightCm || !weight) return;
      h = parseFloat(heightCm) / 100;
      w = parseFloat(weight);
    } else {
      if (!heightFt || !heightIn || !weight) return;
      const totalInches = (parseInt(heightFt) * 12) + parseInt(heightIn);
      h = totalInches * 0.0254;
      w = parseFloat(weight) * 0.453592;
    }

    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const getCategoryColor = () => {
    if (category === 'Underweight') return 'text-blue-400';
    if (category === 'Normal weight') return 'text-emerald-400';
    if (category === 'Overweight') return 'text-orange-400';
    return 'text-red-400';
  };

  const reset = () => {
    setBmi(null);
    setCategory('');
    setHeightCm('');
    setHeightFt('');
    setHeightIn('');
    setWeight('');
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-emerald-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-emerald-400">health_and_safety</span>
            BMI Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Calculate your Body Mass Index.</p>
        </div>

        <div className="p-8 space-y-6">
          {/* Unit Toggle */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => { setUnit('metric'); reset(); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${unit === 'metric' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => { setUnit('imperial'); reset(); }}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${unit === 'imperial' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Imperial (ft/lbs)
            </button>
          </div>

          <div className="space-y-4">
            {/* Height Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Height</label>
              {unit === 'metric' ? (
                <div className="relative">
                   <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="175"
                  />
                  <span className="absolute right-4 top-3.5 text-slate-500 text-sm">cm</span>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="5"
                    />
                     <span className="absolute right-4 top-3.5 text-slate-500 text-sm">ft</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                      placeholder="10"
                    />
                     <span className="absolute right-4 top-3.5 text-slate-500 text-sm">in</span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">Weight</label>
               <div className="relative">
                 <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                  placeholder={unit === 'metric' ? "70" : "150"}
                />
                <span className="absolute right-4 top-3.5 text-slate-500 text-sm">{unit === 'metric' ? 'kg' : 'lbs'}</span>
               </div>
            </div>

            <button
              onClick={calculateBMI}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
            >
              Calculate BMI
            </button>
          </div>

          {/* Results */}
          {bmi !== null && (
            <div className="mt-6 p-6 bg-slate-900 rounded-xl border border-slate-700 text-center animate-fade-in">
               <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Your BMI Score</p>
               <p className={`text-5xl font-bold mb-4 ${getCategoryColor()}`}>{bmi}</p>
               <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-600">
                  <span className={`font-medium ${getCategoryColor()}`}>{category}</span>
               </div>
               
               {/* Visual Scale */}
               <div className="mt-6 h-3 rounded-full bg-slate-700 relative overflow-hidden flex">
                  <div className="h-full bg-blue-400 w-[25%]" title="Underweight"></div>
                  <div className="h-full bg-emerald-400 w-[30%]" title="Normal"></div>
                  <div className="h-full bg-orange-400 w-[20%]" title="Overweight"></div>
                  <div className="h-full bg-red-400 w-[25%]" title="Obese"></div>
                  {/* Indicator */}
                  <div 
                    className="absolute w-1 h-5 bg-white -top-1 shadow border border-slate-500"
                    style={{ 
                        left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` 
                    }}
                  ></div>
               </div>
               <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                   <span>0</span>
                   <span>18.5</span>
                   <span>25</span>
                   <span>30</span>
                   <span>40+</span>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;