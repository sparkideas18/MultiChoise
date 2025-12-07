import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [nextBirthday, setNextBirthday] = useState<{ months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // Calculate next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = Math.abs(nextBday.getTime() - today.getTime());
    const diffDaysTotal = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    // Rough estimate for months/days breakdown for next birthday
    const nbMonths = Math.floor(diffDaysTotal / 30.44);
    const nbDays = Math.floor(diffDaysTotal % 30.44);

    setNextBirthday({ months: nbMonths, days: nbDays });
  };

  return (
    <div className="flex justify-center h-full items-start pt-10">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-orange-500/10 to-transparent">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="material-icons mr-3 text-orange-400">cake</span>
            Age Calculator
          </h2>
          <p className="text-slate-400 text-sm mt-1">Calculate your exact age and next birthday.</p>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
            <div className="flex gap-4">
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none"
              />
              <button
                onClick={calculateAge}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 rounded-lg font-medium transition"
              >
                Calculate
              </button>
            </div>
          </div>

          {age && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-white mb-1">{age.years}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Years</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-white mb-1">{age.months}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Months</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                  <span className="block text-3xl font-bold text-white mb-1">{age.days}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Days</span>
                </div>
              </div>

              {nextBirthday && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-orange-400 mr-3">celebration</span>
                    <div>
                      <p className="text-white font-medium">Next Birthday</p>
                      <p className="text-xs text-orange-200">
                        in {nextBirthday.months} months and {nextBirthday.days} days
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;