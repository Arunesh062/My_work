import { useState } from 'react';
import { useStore } from '../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HiPlus, HiFire, HiOutlineLightningBolt, HiTrash } from 'react-icons/hi';

export default function CaloriesTracker() {
  const { calorieLogs, addCalorieLog, deleteCalorieLog, profile, reminders } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ foodName: '', calories: '' });

  const today = new Date().toISOString().split('T')[0];
  const todayLogs = calorieLogs.filter(l => l.date === today);
  const consumed = todayLogs.reduce((sum, l) => sum + l.calories, 0);

  // Map reminders to calorie logs if they are not already there
  // Actually, let's just use the consumed from logs for the main UI
  const remaining = Math.max(profile.calorieGoal - consumed, 0);
  const percentage = Math.min((consumed / profile.calorieGoal) * 100, 100);

  const chartData = [
    { name: 'Consumed', value: consumed, color: 'var(--color-accent-cyan)' },
    { name: 'Remaining', value: remaining, color: 'var(--color-dark-800)' },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.foodName || !form.calories) return;
    addCalorieLog(form.foodName, form.calories);
    setForm({ foodName: '', calories: '' });
    setShowAdd(false);
  };

  const quickAdds = [
    { name: 'Mass Gainer Shake', calories: 850, icon: '🥤' },
    { name: 'Peanut Butter Toast', calories: 450, icon: '🍞' },
    { name: 'Greek Yogurt & Nuts', calories: 350, icon: '🥣' },
    { name: 'Protein Bar', calories: 250, icon: '🍫' },
    { name: 'Full Meal (High Carb)', calories: 1200, icon: '🥘' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Energy <span className="text-accent-cyan">Metabolism</span></h1>
           <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Engine fuel tracking for hypertrophy</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-3 px-6 py-4 bg-accent-cyan text-dark-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-accent-cyan/20 hover:-translate-y-1 transition-all cursor-pointer border-none"
        >
          {showAdd ? 'View History' : 'Manual Entry'} <HiPlus size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Consumption Card */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Visual Progress */}
            <div className="bg-dark-800 border border-white/5 rounded-[40px] p-8 flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-cyan to-accent-blue opacity-20" />
               <div className="relative w-48 h-48 md:w-56 md:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="75%"
                        outerRadius="90%"
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        animationDuration={1500}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl md:text-5xl font-black text-white">{Math.round(percentage)}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Metabolized</span>
                  </div>
               </div>
            </div>

            {/* Numeric Stats */}
            <div className="grid grid-cols-1 gap-4">
               <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 flex flex-col justify-between group">
                  <div className="flex items-center justify-between mb-4">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Daily Target</p>
                     <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center group-hover:scale-110 transition-transform"><HiOutlineLightningBolt className="text-orange-400" /></div>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white">{profile.calorieGoal}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Total Calories Needed</p>
                  </div>
               </div>
               <div className="p-8 rounded-[40px] bg-accent-cyan/10 border border-accent-cyan/20 flex flex-col justify-between group">
                  <div className="flex items-center justify-between mb-4">
                     <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest">Remaining Fuel</p>
                     <div className="w-8 h-8 rounded-lg bg-dark-900 border border-accent-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">🔥</div>
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white">{remaining}</p>
                    <p className="text-xs font-bold text-accent-cyan uppercase tracking-tight">Net Deficit Remaining</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Quick Adds Section - Desktop Grid */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] ml-2">Hypertrophy Fuel Source</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickAdds.map((item) => (
                <button
                  key={item.name}
                  onClick={() => addCalorieLog(item.name, item.calories)}
                  className="p-5 rounded-3xl bg-dark-800 border border-white/5 flex items-center gap-4 hover:border-accent-cyan/30 hover:bg-dark-750 transition-all group cursor-pointer text-left overflow-hidden"
                >
                  <div className="text-3xl transform group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-white truncate">{item.name}</p>
                    <p className="text-xs font-bold text-accent-cyan">{item.calories} kcal</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Manual Form Toggle */}
          {showAdd && (
            <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 animate-fade-in-up">
              <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tight">Log Custom Nutrients</h3>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Food/Meal Name</label>
                    <input
                      type="text"
                      required
                      value={form.foodName}
                      onChange={(e) => setForm({ ...form, foodName: e.target.value })}
                      className="w-full bg-dark-900 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-700"
                      placeholder="Whole Roasted Chicken..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Calorie Amount</label>
                    <input
                      type="number"
                      required
                      value={form.calories}
                      onChange={(e) => setForm({ ...form, calories: e.target.value })}
                      className="w-full bg-dark-900 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                      placeholder="1200"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-accent-cyan text-dark-900 font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">Log Intake Protocol</button>
              </form>
            </section>
          )}
        </div>

        {/* Energy History Log */}
        <div className="lg:col-span-4 p-8 rounded-[40px] bg-dark-800 border border-white/5 max-h-[700px] flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 text-accent-cyan opacity-5"><HiFire size={120} /></div>
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 relative z-10">Energy Log</h3>
           <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar relative z-10">
              {todayLogs.length > 0 ? (
                [...todayLogs].reverse().map((log) => (
                  <div key={log.id} className="p-4 rounded-3xl bg-dark-900 border border-white/5 group hover:border-white/10 transition-colors flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-black text-white truncate max-w-[150px]">{log.foodName}</p>
                      <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-tighter">{log.calories} kcal</p>
                    </div>
                    <button
                      onClick={() => deleteCalorieLog(log.id)}
                      className="w-8 h-8 rounded-xl bg-dark-800 text-slate-600 hover:text-accent-red transition-all flex items-center justify-center border-none cursor-pointer"
                    >
                      <HiTrash size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="text-4xl opacity-10">⚖️</div>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">No fuel detected today</p>
                </div>
              )}
           </div>

           <div className="mt-8 pt-6 border-t border-white/5 relative z-10 text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Metabolized</p>
              <p className="text-3xl font-black text-white mt-1">{consumed} <span className="text-xs font-bold text-slate-500 uppercase">kcal</span></p>
           </div>
        </div>
      </div>
    </div>
  );
}
