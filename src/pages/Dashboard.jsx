import { useAuth } from '../context/AuthContext';
import { useStore } from '../store/useStore';
import ProgressCard from '../components/ProgressCard';
import SimpleWeightChart from '../components/SimpleWeightChart';
import { HiPlus, HiFire, HiScale, HiBeaker, HiOutlineLightningBolt } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const {
    weightLogs, calorieLogs, waterIntake, reminders
  } = useStore();

  // Use Firestore data if available, fallback to defaults
  const profile = {
    currentWeight: currentUser?.currentWeight || 60,
    targetWeight: currentUser?.targetWeight || 75,
    calorieGoal: currentUser?.calorieGoal || 3000,
    waterGoal: currentUser?.waterGoal || 8,
  };

  const today = new Date().toISOString().split('T')[0];
  const consumed = calorieLogs
    .filter(l => l.date === today)
    .reduce((sum, l) => sum + l.calories, 0);

  const completedMeals = reminders.filter(r => r.completed).length;
  const totalMeals = reminders.length;

  const stats = [
    {
      title: 'Fuel Intake',
      value: consumed,
      target: profile.calorieGoal,
      unit: 'kcal',
      icon: HiFire,
      color: 'accent-cyan',
      path: '/calories'
    },
    {
      title: 'Current Mass',
      value: weightLogs[weightLogs.length - 1]?.weight || profile.currentWeight,
      target: profile.targetWeight,
      unit: 'kg',
      icon: HiScale,
      color: 'accent-blue',
      path: '/weight'
    },
    {
      title: 'Fluid Balance',
      value: waterIntake,
      target: profile.waterGoal,
      unit: 'cups',
      icon: HiBeaker,
      color: 'indigo-500',
      path: '/water'
    },
    {
      title: 'Daily Feeding',
      value: completedMeals,
      target: totalMeals || 6,
      unit: 'meals',
      icon: HiOutlineLightningBolt,
      color: 'accent-orange',
      path: '/reminders'
    },
  ];

  return (
    <div className="space-y-10 pb-16 animate-fade-in-up">
      {/* Hero Section */}
      <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 blur-[120px] pointer-events-none transition-all group-hover:bg-accent-cyan/10" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="inline-block px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-[10px] font-black uppercase tracking-[0.2em]">
                  Performance Status: Active
               </div>
               <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                 {profile.targetWeight - (weightLogs[weightLogs.length - 1]?.weight || profile.currentWeight) > 0
                   ? `Only ${Math.abs(profile.targetWeight - (weightLogs[weightLogs.length - 1]?.weight || profile.currentWeight)).toFixed(1)}kg to reach your zenith.`
                   : 'Goal Achievement Protocol Unlocked.'}
               </h1>
               <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Consistently hitting nutritional targets for maximum hypertrophy.</p>
               <div className="flex gap-4">
                  <Link to="/calories" className="px-8 py-4 bg-accent-cyan text-dark-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all no-underline shadow-xl shadow-accent-cyan/20">Log Nutrients</Link>
                  <Link to="/weight" className="px-8 py-4 bg-dark-900 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all no-underline">Scale Check</Link>
               </div>
            </div>
            <div className="p-8 bg-dark-900/50 rounded-3xl border border-white/10 backdrop-blur-xl">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Weight Velocity</h3>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                     <span className="text-[10px] text-white font-black uppercase">Live Updates</span>
                  </div>
               </div>
               <SimpleWeightChart />
            </div>
         </div>
      </section>

      {/* Grid: Performance Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <ProgressCard key={stat.title} {...stat} delay={i * 0.1} />
        ))}
      </section>

      {/* Quick Access Area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-6">
            <header className="flex items-center justify-between px-2">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Neural Schedule</h3>
               <Link to="/reminders" className="text-[10px] font-black text-accent-cyan hover:underline uppercase tracking-widest no-underline">View Full Pipeline</Link>
            </header>
            <div className="space-y-4">
               {reminders.slice(0, 3).map((r) => (
                 <div key={r.id} className="p-6 rounded-[30px] bg-dark-800 border border-white/5 flex items-center justify-between group hover:border-white/15 transition-all">
                    <div className="flex items-center gap-4">
                       <span className="text-3xl">{r.emoji || '🍽️'}</span>
                       <div>
                          <p className="text-sm font-black text-white uppercase tracking-tight">{r.title}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{r.time} • {r.calories} kcal</p>
                       </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${r.completed ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20' : 'bg-dark-950 text-slate-600 border border-white/5'}`}>
                       {r.completed ? 'Synchronized' : 'Pending'}
                    </div>
                 </div>
               ))}
               {reminders.length === 0 && (
                 <div className="py-12 text-center bg-dark-800/50 rounded-[40px] border border-dashed border-white/10">
                    <p className="text-slate-600 font-bold text-xs uppercase tracking-widest">No protocols scheduled for today.</p>
                 </div>
               )}
            </div>
         </div>

         <div className="lg:col-span-4 bg-dark-800 border border-white/5 rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-8 -right-8 text-white opacity-5 pointer-events-none"><HiFire size={160} /></div>
            <div className="space-y-4 relative z-10">
               <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight">Hydration Insight</h3>
               <p className="text-sm text-slate-500 font-medium">Drinking 500ml of fluids during feeding protocols increases cellular nutrient absorption by 12%.</p>
            </div>
            <div className="pt-10 relative z-10">
               <div className="p-6 rounded-3xl bg-dark-900 border border-white/5">
                  <p className="text-[10px] font-black text-accent-cyan uppercase tracking-widest mb-1">Status Proclamation</p>
                  <p className="text-xs font-bold text-white italic">"The scale doesn't lie, but it also doesn't reward the lazy."</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
