import { useStore } from '../store/useStore';
import { HiLightningBolt, HiOutlineGlobe, HiOutlineCalendar, HiCheckCircle, HiFire } from 'react-icons/hi';

export default function Streaks() {
  const {
    streak, bestStreak, reminders, getWeeklyCompletionScore,
    getUnlockedBadges, badges,
  } = useStore();

  const completionScore = getWeeklyCompletionScore();
  const unlockedBadges = getUnlockedBadges();

  const milestones = [
    { name: 'Consistency', goal: 3, icon: '⚡', id: 'streak_3' },
    { name: 'Discipline', goal: 7, icon: '🛡️', id: 'streak_7' },
    { name: 'Warrior', goal: 14, icon: '⚔️', id: 'streak_14' },
    { name: 'Grandmaster', goal: 30, icon: '👑', id: 'streak_30' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
              <HiFire /> Momentum Engine
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
             Consistency <span className="text-orange-500">Streaks</span>
           </h1>
           <p className="text-slate-500 font-bold text-sm tracking-wide">The psychological barrier between amateur and elite status.</p>
        </div>

        <div className="flex gap-4">
           <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 relative overflow-hidden group min-w-[180px]">
              <div className="absolute top-0 right-0 p-6 text-orange-500 opacity-10 group-hover:scale-110 transition-transform"><HiLightningBolt size={60} /></div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 relative z-10">Current Run</p>
              <div className="flex items-baseline gap-2 relative z-10">
                 <span className="text-5xl font-black text-white">{streak}</span>
                 <span className="text-xs font-bold text-orange-500 uppercase">Days</span>
              </div>
           </div>
           <div className="p-8 rounded-[40px] bg-accent-cyan/10 border border-accent-cyan/20 relative overflow-hidden group min-w-[180px]">
              <div className="absolute top-0 right-0 p-6 text-accent-cyan opacity-10 group-hover:scale-110 transition-transform"><HiCheckCircle size={60} /></div>
              <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-2 relative z-10">All-Time Peak</p>
              <div className="flex items-baseline gap-2 relative z-10">
                 <span className="text-5xl font-black text-white">{bestStreak}</span>
                 <span className="text-xs font-bold text-accent-cyan uppercase">Days</span>
              </div>
           </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Heatmap */}
        <div className="lg:col-span-8 bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
             <div>
                <h3 className="text-2xl font-black text-white tracking-tight uppercase">Weekly Flow</h3>
                <p className="text-xs text-slate-500 font-medium">Monitoring meal compliance across the 7-day cycle</p>
             </div>
             <div className="px-5 py-2.5 rounded-2xl bg-dark-900 border border-white/5 text-accent-cyan text-xs font-bold">
                Efficiency: {completionScore}%
             </div>
          </header>

          <div className="grid grid-cols-7 gap-3 md:gap-6">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const isToday = i === (new Date().getDay() + 6) % 7;
              return (
                <div key={day} className="flex flex-col items-center gap-4">
                  <div className={`w-full aspect-square rounded-2xl md:rounded-3xl border-2 transition-all duration-500 relative flex items-center justify-center text-xl md:text-2xl group ${
                    isToday ? 'border-accent-cyan bg-accent-cyan/10 shadow-[0_0_20px_rgba(6,214,160,0.2)]' : 'border-white/5 bg-dark-900 hover:border-white/20'
                  }`}>
                    {completionScore > (i * 10) ? '🔥' : '❄️'}
                    {isToday && <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-cyan rounded-full border-2 border-dark-800" />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${isToday ? 'text-accent-cyan' : 'text-slate-600'}`}>{day}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-dark-900/50 border border-white/5 flex flex-col sm:flex-row items-center gap-6">
             <div className="text-4xl">🔱</div>
             <div>
                <h4 className="text-white font-bold tracking-tight text-lg italic uppercase">Metabolic Dominance</h4>
                <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-lg">Consistent feeding intervals maintain constant muscle protein synthesis. Skipping a single meal slows the engine. Your current efficiency is {completionScore}%.</p>
             </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-[40px] bg-dark-800 border border-white/5 h-full">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-10">Honors & Medals</h3>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map((milestone) => {
                const isUnlocked = unlockedBadges.some(b => b.id === milestone.id);
                return (
                  <div
                    key={milestone.id}
                    className={`p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center text-center gap-3 relative group overflow-hidden ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-dark-800 to-dark-700 border-accent-cyan shadow-xl shadow-accent-cyan/5'
                        : 'bg-dark-900/50 border-white/5 opacity-40 grayscale'
                    }`}
                  >
                    {isUnlocked && (
                       <div className="absolute inset-0 bg-accent-cyan/5 translate-x-full group-hover:translate-x-0 transition-transform duration-1000 skew-x-12" />
                    )}
                    <span className="text-4xl md:text-5xl drop-shadow-xl transition-transform group-hover:scale-125 duration-500">{milestone.icon}</span>
                    <div className="relative z-10">
                       <p className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>{milestone.name}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase">{milestone.goal} Days</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-center relative group cursor-help">
               <HiOutlineGlobe className="absolute top-2 right-2 text-indigo-400 opacity-20 group-hover:opacity-100 transition-opacity" />
               <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Status Proclamation</p>
               <p className="text-xs font-bold text-white italic">"The harder you work, the luckier you get."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
