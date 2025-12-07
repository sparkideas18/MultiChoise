import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const EmiCalculator: React.FC = () => {
  const [amount, setAmount] = useState(100000); // Principal
  const [rate, setRate] = useState(10); // Annual Interest Rate
  const [tenure, setTenure] = useState(12); // Months

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    
    const calcEmi = amount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalPayable = calcEmi * n;
    const interestPayable = totalPayable - amount;

    setEmi(calcEmi);
    setTotalAmount(totalPayable);
    setTotalInterest(interestPayable);
  }, [amount, rate, tenure]);

  const data = [
    { name: 'Principal Amount', value: amount },
    { name: 'Total Interest', value: totalInterest },
  ];

  const COLORS = ['#10b981', '#f59e0b'];

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col pt-6">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Controls */}
        <div className="p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-slate-700 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="material-icons mr-2 text-emerald-400">account_balance</span>
                    EMI Calculator
                </h2>
            </div>

            {/* Amount Slider */}
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Loan Amount</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-emerald-300 font-mono">${amount.toLocaleString()}</span>
                </div>
                <input 
                    type="range" min="1000" max="1000000" step="1000"
                    value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
            </div>

            {/* Interest Rate Slider */}
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Interest Rate (p.a)</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-emerald-300 font-mono">{rate}%</span>
                </div>
                <input 
                    type="range" min="1" max="30" step="0.1"
                    value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
            </div>

            {/* Tenure Slider */}
            <div>
                <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Loan Tenure</label>
                    <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-emerald-300 font-mono">{tenure} Months</span>
                </div>
                <input 
                    type="range" min="6" max="360" step="6"
                    value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
            </div>
            
            <div className="pt-4">
                 <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 text-center">
                    <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Monthly EMI</p>
                    <p className="text-3xl font-bold text-emerald-400">${Math.round(emi).toLocaleString()}</p>
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
                     <span className="text-slate-400">Total Interest</span>
                     <span className="text-white font-medium">${Math.round(totalInterest).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                     <span className="text-slate-400">Total Payable</span>
                     <span className="text-white font-bold">${Math.round(totalAmount).toLocaleString()}</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;