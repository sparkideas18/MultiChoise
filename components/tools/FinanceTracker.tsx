import React, { useState, useEffect } from 'react';
import { Transaction } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { categorizeTransaction } from '../../services/geminiService';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

const PREDEFINED_CATEGORIES = [
    'Auto', 
    'Food', 
    'Transport', 
    'Housing', 
    'Utilities', 
    'Entertainment', 
    'Health', 
    'Shopping', 
    'Salary', 
    'Investment', 
    'Other'
];

const FinanceTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Form Inputs
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [categoryInput, setCategoryInput] = useState('Auto');
  const [isAutoCategorizing, setIsAutoCategorizing] = useState(false);

  // View Controls
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('multiChoice_transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
        // Sample data
        setTransactions([
            { id: '1', type: 'expense', amount: 450, category: 'Housing', date: new Date().toISOString(), description: 'Monthly Rent Share' },
            { id: '2', type: 'expense', amount: 80, category: 'Food', date: new Date().toISOString(), description: 'Grocery run' },
            { id: '3', type: 'income', amount: 2500, category: 'Salary', date: new Date().toISOString(), description: 'Paycheck' },
        ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('multiChoice_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // --- Filtering Logic ---
  const filteredTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      const isYearMatch = tDate.getFullYear() === currentDate.getFullYear();
      
      if (viewMode === 'monthly') {
          return isYearMatch && tDate.getMonth() === currentDate.getMonth();
      }
      return isYearMatch;
  });

  const navigateDate = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentDate);
      if (viewMode === 'monthly') {
          newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
      } else {
          newDate.setFullYear(currentDate.getFullYear() + (direction === 'next' ? 1 : -1));
      }
      setCurrentDate(newDate);
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    let finalCategory = categoryInput;
    
    if (categoryInput === 'Auto') {
        setIsAutoCategorizing(true);
        // AI Auto-categorization
        try {
            finalCategory = await categorizeTransaction(description);
        } catch (err) {
            console.error("Categorization failed", err);
            finalCategory = 'Uncategorized';
        }
        setIsAutoCategorizing(false);
    }
    
    const newTx: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category: finalCategory,
      date: new Date().toISOString(),
      description
    };

    setTransactions(prev => [newTx, ...prev]);
    setDescription('');
    setAmount('');
    setCategoryInput('Auto');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // --- Chart Data Preparation ---
  const expenseData = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const formatDateLabel = () => {
      if (viewMode === 'monthly') {
          return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return currentDate.getFullYear().toString();
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* View Controls & Header */}
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button 
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                  Monthly
              </button>
              <button 
                  onClick={() => setViewMode('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${viewMode === 'yearly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                  Yearly
              </button>
          </div>

          <div className="flex items-center space-x-4">
              <button onClick={() => navigateDate('prev')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition">
                  <span className="material-icons text-sm">arrow_back_ios_new</span>
              </button>
              <span className="text-xl font-bold text-white min-w-[150px] text-center">{formatDateLabel()}</span>
              <button onClick={() => navigateDate('next')} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-slate-300 transition">
                  <span className="material-icons text-sm">arrow_forward_ios</span>
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-1">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                <span className="material-icons mr-2 text-emerald-400">add_circle</span>
                Add Transaction
            </h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
                <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition ${type === 'expense' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Expense
                </button>
                <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Income
                </button>
                </div>
                
                <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Starbucks Coffee"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                />
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                    <select
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none appearance-none"
                    >
                        {PREDEFINED_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat} {cat === 'Auto' ? '(AI Detection)' : ''}</option>
                        ))}
                    </select>
                </div>

                <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Amount ($)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                />
                </div>

                <button
                type="submit"
                disabled={isAutoCategorizing}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center"
                >
                {isAutoCategorizing ? (
                    <span className="material-icons animate-spin text-sm">refresh</span>
                ) : (
                    categoryInput === 'Auto' ? 'Add & Auto-Categorize' : 'Add Transaction'
                )}
                </button>
            </form>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
                <h3 className="text-slate-400 font-medium mb-2">{viewMode === 'monthly' ? 'Monthly' : 'Yearly'} Balance</h3>
                <p className={`text-4xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-400'}`}>
                    ${balance.toFixed(2)}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                        <p className="text-xs text-emerald-400 mb-1">Income</p>
                        <p className="text-lg font-semibold text-emerald-300">+${totalIncome.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <p className="text-xs text-red-400 mb-1">Expense</p>
                        <p className="text-lg font-semibold text-red-300">-${totalExpense.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Analytics Section */}
        <div className="lg:col-span-2 space-y-6 flex flex-col min-h-0">
            {/* Charts */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex-1 min-h-[300px]">
            <h2 className="text-lg font-bold text-white mb-6">Spending Breakdown ({viewMode})</h2>
            {expenseData.length > 0 ? (
                <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                        data={expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        >
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }} 
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => {
                            const percent = ((value / totalExpense) * 100).toFixed(1);
                            return [`$${value.toFixed(2)} (${percent}%)`, 'Amount'];
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                    No expense data for this period
                </div>
            )}
            </div>

            {/* Recent Transactions List */}
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl flex-1 overflow-hidden flex flex-col min-h-[300px]">
            <h2 className="text-lg font-bold text-white mb-4">Transactions ({filteredTransactions.length})</h2>
            <div className="overflow-y-auto pr-2 space-y-3 custom-scrollbar flex-1">
                {filteredTransactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700/50 group hover:border-indigo-500/30 transition">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                <span className="material-icons text-base">
                                    {t.type === 'income' ? 'arrow_downward' : 'arrow_upward'}
                                </span>
                            </div>
                            <div>
                                <p className="font-medium text-white">{t.description}</p>
                                <p className="text-xs text-slate-500">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                            </span>
                            <button onClick={() => deleteTransaction(t.id)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                                <span className="material-icons text-sm">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
                {filteredTransactions.length === 0 && (
                    <p className="text-center text-slate-500 py-4">No transactions found for this period.</p>
                )}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;