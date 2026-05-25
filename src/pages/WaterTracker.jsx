import { useStore } from '../store/useStore';
import { HiPlus, HiMinus, HiRefresh, HiCheckCircle } from 'react-icons/hi';

export default function WaterTracker() {
  const { waterIntake, addWater, removeWater, resetWater, profile } = useStore();
  const goal = profile.waterGoal;
  const percentage = Math.min((waterIntake / goal) * 100, 100);

  const tips = [
    "Drink a glass of water immediately after waking up to kickstart metabolism.",
    "Try to drink 500ml of water 30 minutes before a heavy meal.",
    "Hydration is key for muscle fullness and performance.",
    "Carry a reusable bottle to track your intake more consistently.",
    "Cold water can slightly increase calorie burn during digestion."
  ];

  const glassCount = Math.ceil(goal);
  const filledGlasses = Math.floor(waterIntake);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <header className="text-center space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-2 leading-none">
          Cellular Fluid Status
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Biological <span className="text-accent-blue underline decoration-accent-cyan underline-offset-8">Hydration</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest max-w-lg mx-auto">Maintain optimal blood volume for maximum nutritional transport.</p>
      </header>

      {/* Main Hydration Visual */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center relative group">
          {/* Animated Water Bubble */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[60px] bg-dark-800 border-4 border-white/5 flex items-end justify-center overflow-hidden shadow-2xl shadow-accent-blue/10">
            <div
              className="w-full bg-gradient-to-t from-accent-blue to-accent-cyan transition-all duration-1000 ease-in-out relative"
              style={{ height: `${percentage}%` }}
            >
              <div className="absolute top-0 left-0 w-full h-8 -translate-y-4 animate-wave bg-white/20 skew-y-3" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference text-white">
               <span className="text-7xl font-black leading-none">{Math.round(percentage)}%</span>
               <span className="text-xs font-bold uppercase tracking-widest opacity-70">Goal Reached</span>
            </div>
          </div>
          {/* Decorative floating bubbles */}
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent-blue/20 blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent-cyan/20 blur-xl animate-pulse" />
        </div>

        <div className="space-y-10">
           <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Volume Controller</h3>
              <div className="flex items-center gap-6">
                 <button
                    onClick={() => removeWater()}
                    className="w-20 h-20 rounded-3xl bg-dark-800 border border-white/5 text-white hover:border-accent-red/30 transition-all active:scale-90 cursor-pointer flex items-center justify-center shadow-lg"
                 >
                    <HiMinus size={32} />
                 </button>
                 <div className="flex-1 text-center py-4 bg-dark-800 border border-white/5 rounded-3xl relative overflow-hidden">
                    <div className="relative z-10">
                       <p className="text-5xl font-black text-white leading-none">{waterIntake}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{goal} Cups Required</p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-1 bg-accent-blue transition-all duration-700" style={{ width: `${percentage}%` }} />
                 </div>
                 <button
                    onClick={() => addWater()}
                    className="w-20 h-20 rounded-3xl bg-accent-blue text-dark-900 hover:scale-105 transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-xl shadow-accent-blue/30"
                 >
                    <HiPlus size={32} />
                 </button>
              </div>
           </div>

           <div className="bg-dark-800 border border-white/5 rounded-[40px] p-8 space-y-6">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Hydration Insight</h4>
              <p className="text-sm font-medium text-slate-300 leading-relaxed italic">"{tips[Math.floor(Date.now() / 86400000) % tips.length]}"</p>
              <div className="flex gap-2">
                 <button onClick={resetWater} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest bg-transparent border-none cursor-pointer transition-colors">
                    <HiRefresh /> Reset Meter
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Glass Grid Visualization */}
      <section className="bg-dark-800 border border-white/5 rounded-[40px] p-10 md:p-14">
        <header className="flex items-center justify-between mb-12">
           <h3 className="text-xl font-extrabold text-white">Daily Unit Log</h3>
           <div className="flex items-center gap-2 text-accent-cyan font-bold text-xs">
              <HiCheckCircle /> {waterIntake >= goal ? "Consistently Hydrated" : "In Progress"}
           </div>
        </header>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6">
          {Array.from({ length: Math.max(glassCount, 10) }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 group">
              <div
                className={`w-full aspect-[2/3] rounded-xl border-2 transition-all duration-500 relative overflow-hidden ${
                  i < filledGlasses
                    ? 'bg-accent-blue/20 border-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-dark-900 border-white/5 group-hover:border-white/20'
                }`}
              >
                {i < filledGlasses && (
                  <div className="absolute bottom-0 left-0 w-full bg-accent-blue animate-pulse" style={{ height: '100%' }} />
                )}
                {i === filledGlasses && waterIntake % 1 > 0 && (
                   <div className="absolute bottom-0 left-0 w-full bg-accent-blue/60" style={{ height: `${(waterIntake % 1) * 100}%` }} />
                )}
              </div>
              <span className={`text-[9px] font-black uppercase ${i < filledGlasses ? 'text-accent-blue' : 'text-slate-700'}`}>Unit {i + 1}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
