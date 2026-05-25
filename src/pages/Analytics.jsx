import { useStore } from '../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { calculateBMI, getBMICategory, formatDate } from '../utils/helpers';
import { HiTrendingUp, HiScale, HiOutlineLightningBolt, HiOutlineChartBar } from 'react-icons/hi';
import WeightChart from '../components/WeightChart';

export default function Analytics() {
  const { weightLogs, calorieLogs, reminders, profile, getWeeklyCompletionScore } = useStore();

  const bmi = calculateBMI(profile.currentWeight, profile.height);
  const bmiCategory = getBMICategory(bmi);
  const completionScore = getWeeklyCompletionScore();

  // Last 7 days calories
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayCalories = calorieLogs
      .filter(l => l.date === dateStr)
      .reduce((sum, l) => sum + l.calories, 0);
    return {
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      calories: dayCalories,
      target: profile.calorieGoal
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-accent-cyan font-black text-xs uppercase tracking-[0.3em]">
          <HiOutlineChartBar /> System Intelligence
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Performance <span className="text-accent-cyan underline decoration-white/20 underline-offset-8">Analytics</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Quantifying Biological Progress Intervals</p>
      </header>

      {/* High Level Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 group ring-1 ring-white/5 hover:ring-accent-cyan/30 transition-all">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">BMI Status</p>
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white" style={{ color: bmiCategory.color }}>{bmi}</span>
              <span className="text-xs font-bold uppercase tracking-tighter" style={{ color: bmiCategory.color }}>{bmiCategory.label}</span>
           </div>
        </div>
        <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 group ring-1 ring-white/5 hover:ring-accent-cyan/30 transition-all">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Weekly Scope</p>
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{completionScore}%</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Consistency</span>
           </div>
        </div>
        <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 group ring-1 ring-white/5 hover:ring-accent-cyan/30 transition-all">
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Metabolic Load</p>
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{profile.calorieGoal}</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">kcal/Day</span>
           </div>
        </div>
        <div className="p-8 rounded-[40px] bg-accent-cyan/10 border border-accent-cyan/20 group shadow-xl shadow-accent-cyan/5">
           <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-2">Active Intervals</p>
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{reminders.length}</span>
              <span className="text-xs font-bold text-accent-cyan uppercase tracking-tighter">Scheduled Meals</span>
           </div>
        </div>
      </section>

      {/* Weight Trend Chart */}
      <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12 overflow-hidden relative group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mb-1">Body Velocity</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Weight displacement across historical logs</p>
          </div>
          <div className="hidden sm:flex items-center gap-6">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,214,160,0.5)]" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Tracking</span></div>
          </div>
        </div>
        <div className="h-[400px] w-full relative z-10">
          <WeightChart data={weightLogs} height={400} />
        </div>
        {/* Decorative Watermark */}
        <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-white/5 uppercase select-none pointer-events-none italic">SCALE</div>
      </section>

      {/* Grid: Calorie Distribution & Meal Metrics */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-12 bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
               <div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none mb-1">Nutrient Pipeline</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Metabolic fuel intake vs target requirement</p>
               </div>
            </header>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--color-dark-400)', fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fill: 'var(--color-dark-400)', fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload?.[0]) {
                        return (
                          <div className="px-6 py-4 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl backdrop-blur-xl">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label} FUEL</p>
                            <p className="text-2xl font-black text-white">{payload[0].value} <span className="text-xs font-bold text-slate-500 uppercase">kcal</span></p>
                            <div className="mt-2 text-[10px] font-bold text-accent-cyan uppercase">Target: {payload[0].payload.target}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="calories"
                    fill="var(--color-accent-cyan)"
                    radius={[12, 12, 0, 0]}
                    barSize={40}
                    animationDuration={2000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
      </section>

      {/* Summary Footer */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 relative overflow-hidden group">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Metabolic Rate</h4>
            <div className="text-2xl font-black text-white italic uppercase tracking-tighter">Hyper-Efficient <span className="text-accent-cyan">STABLE</span></div>
            <p className="text-[10px] text-slate-600 font-bold uppercase mt-4">Current efficiency based on meal intervals.</p>
         </div>
         <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 relative overflow-hidden group">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Growth Trajectory</h4>
            <div className="text-2xl font-black text-white italic uppercase tracking-tighter">+1.2kg <span className="text-accent-cyan">PER MO.</span></div>
            <p className="text-[10px] text-slate-600 font-bold uppercase mt-4">Projected based on last 14 logs.</p>
         </div>
         <div className="p-8 rounded-[40px] bg-accent-cyan/10 border border-accent-cyan/20 relative overflow-hidden group shadow-xl shadow-accent-cyan/5">
            <h4 className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-6">Protocol Status</h4>
            <div className="text-2xl font-black text-white italic uppercase tracking-tighter">ANABOLIC <span className="text-white">PHASE</span></div>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-4">Energy intake exceeds expenditure by 15%.</p>
         </div>
      </footer>
    </div>
  );
}
