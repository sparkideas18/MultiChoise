import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SipCalculator: React.FC = () => {
  const [monthlyInvest, setMonthlyInvest] = useState(5000);
  const [rate, setRate] = useState(12); // Expected return rate
  const [years, setYears] = useState(10);

  const [investedAmount, setInvestedAmount] = useState(0);
  const [estReturns, setEstReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const totalInvested = monthlyInvest * months;
    
    // M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const futureValue = monthlyInvest * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const estimatedReturns = futureValue - totalInvested;

    setInvestedAmount(totalInvested);
    setTotalValue(futureValue);
    setEstReturns(estimatedReturns);
  }, [monthlyInvest, rate, years]);

  const data = [
    { name: 'Invested Amount', value: investedAmount },
    { name: 'Est. Returns', value: estReturns },
  ];

  const COLORS = ['#6366f1', '#10b981'];

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col pt-6">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Controls */}
        <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-slate-700 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="material-icons mr-2 text-indigo-400">trending_up</span>
                    SIP Calculator
                </h2>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Monthly Investment</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-indigo-300 font-mono">${monthlyInvest.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="500" max="100000" step="500"
                    value={monthlyInvest} onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Expected Return Rate (p.a)</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-indigo-300 font-mono">{rate}%</span>
                </div>
                <input 
                    type="range" min="1" max="30" step="0.5"
                    value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Time Period</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-indigo-300 font-mono">{years} Years</span>
                </div>
                <input 
                    type="range" min="1" max="40" step="1"
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>
            
             <div className="pt-4">
                 <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Total Value</p>
                    <p className="text-3xl font-bold text-white">${Math.round(totalValue).toLocaleString()}</p>
                 </div>
            </div>
        </div>

        {/* Results/Chart */}
        <div className="p-8 md:w-1/2 flex flex-col items-center justify-center bg-slate-800/50">
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                            formatter={(value: number) => `$${Math.round(value).toLocaleString()}`}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            <div className="w-full mt-6 space-y-3">
                 <div className="flex justify-between text-sm border-b border-slate-700 pb-2">
                     <span className="text-slate-400">Invested Amount</span>
                     <span className="text-white font-medium">${Math.round(investedAmount).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Est. Returns</span>
                     <span className="text-emerald-400 font-medium">+${Math.round(estReturns).toLocaleString()}</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;