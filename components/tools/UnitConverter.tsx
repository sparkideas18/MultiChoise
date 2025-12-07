import React, { useState } from 'react';

const conversionRates: Record<string, number> = {
  // Length (base meters)
  'm': 1,
  'km': 1000,
  'cm': 0.01,
  'mm': 0.001,
  'ft': 0.3048,
  'in': 0.0254,
  'mi': 1609.34,
  // Weight (base grams)
  'g': 1,
  'kg': 1000,
  'mg': 0.001,
  'lb': 453.592,
  'oz': 28.3495,
};

const categories = {
    length: ['m', 'km', 'cm', 'mm', 'ft', 'in', 'mi'],
    weight: ['g', 'kg', 'mg', 'lb', 'oz']
};

const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<'length' | 'weight'>('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>(categories['length'][0]);
  const [toUnit, setToUnit] = useState<string>(categories['length'][1]);

  const handleCategoryChange = (cat: 'length' | 'weight') => {
      setCategory(cat);
      setFromUnit(categories[cat][0]);
      setToUnit(categories[cat][1]);
  };

  const convert = (): string => {
      const val = parseFloat(amount);
      if (isNaN(val)) return '---';
      
      const baseValue = val * conversionRates[fromUnit];
      const result = baseValue / conversionRates[toUnit];
      
      return result.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return (
    <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="material-icons mr-2 text-indigo-400">transform</span>
                Unit Converter
            </h2>

            <div className="flex bg-slate-900 rounded-lg p-1 mb-6">
                <button 
                    onClick={() => handleCategoryChange('length')}
                    className={`flex-1 py-2 rounded-md font-medium transition ${category === 'length' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Length
                </button>
                <button 
                    onClick={() => handleCategoryChange('weight')}
                    className={`flex-1 py-2 rounded-md font-medium transition ${category === 'weight' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    Weight
                </button>
            </div>

            <div className="grid grid-cols-5 gap-4 items-end mb-6">
                <div className="col-span-2 space-y-2">
                    <label className="text-xs text-slate-400">From</label>
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                    />
                    <select 
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-slate-300 focus:outline-none"
                    >
                        {categories[category].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                
                <div className="col-span-1 flex justify-center pb-8 text-slate-500">
                    <span className="material-icons">arrow_forward</span>
                </div>

                <div className="col-span-2 space-y-2">
                    <label className="text-xs text-slate-400">To</label>
                    <div className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-indigo-400 font-bold text-lg overflow-hidden text-ellipsis">
                        {convert()}
                    </div>
                    <select 
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-slate-300 focus:outline-none"
                    >
                        {categories[category].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>

            <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20 text-center">
                <p className="text-indigo-200 text-sm">
                    {amount} {fromUnit} = <span className="font-bold text-white">{convert()}</span> {toUnit}
                </p>
            </div>
        </div>
    </div>
  );
};

export default UnitConverter;