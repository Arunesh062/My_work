import { useState } from 'react';
import { useStore } from '../store/useStore';
import SimpleWeightChart from '../components/SimpleWeightChart';
import { formatDate } from '../utils/helpers';
import { HiPlusSm, HiScale, HiTrendingUp, HiFlag } from 'react-icons/hi';

export default function WeightTracker() {
  const { weightLogs, addWeightLog, profile } = useStore();
  const [weight, setWeight] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!weight || isNaN(weight)) return;
    addWeightLog(weight);
    setWeight('');
  };

  const sortedLogs = [...weightLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestWeight = sortedLogs[0]?.weight || profile.currentWeight;
  const startWeight = weightLogs[0]?.weight || profile.currentWeight;
  const totalGain = (latestWeight - startWeight).toFixed(1);
  const remaining = (profile.targetWeight - latestWeight).toFixed(1);

  const last7 = [...weightLogs].slice(-7);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Body <span className="text-accent-cyan">Scale</span></h1>
          <p className="text-slate-500 font-medium text-sm">Track your path to {profile.targetWeight}kg</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,214,160,0.5)]" />
             <span className="text-xs font-black text-accent-cyan uppercase">Live Progress</span>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-dark-800 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 text-slate-700 pointer-events-none group-hover:scale-110 transition-transform"><HiScale size={32} /></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Current Weight</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-white">{latestWeight}</span>
            <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-dark-800 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 text-slate-700 pointer-events-none group-hover:scale-110 transition-transform"><HiFlag size={32} /></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Target Goal</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-white">{profile.targetWeight}</span>
            <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-dark-800 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 text-slate-700 pointer-events-none group-hover:scale-110 transition-transform"><HiTrendingUp size={32} /></div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Gained</p>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-4xl font-black ${parseFloat(totalGain) >= 0 ? 'text-accent-cyan' : 'text-accent-red'}`}>
              {parseFloat(totalGain) >= 0 ? '+' : ''}{totalGain}
            </span>
            <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-accent-cyan/10 border border-accent-cyan/20 group">
          <p className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest mb-2">Remaining</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-white">{remaining}</span>
            <span className="text-sm font-bold text-slate-500 text-accent-cyan">kg</span>
          </div>
          <div className="mt-4 h-1.5 w-full bg-dark-900 rounded-full overflow-hidden">
             <div className="h-full bg-accent-cyan" style={{ width: `${Math.min(Math.max(((latestWeight - startWeight) / (profile.targetWeight - startWeight)) * 100, 2), 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Chart Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-6 md:p-10 rounded-3xl bg-dark-800 border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <h3 className="text-xl font-extrabold text-white">Progress Analytics</h3>
              <form onSubmit={handleAdd} className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-48">
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-dark-900 border border-white/5 rounded-2xl py-3 pl-4 pr-12 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                    placeholder="Today's kg..."
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600 uppercase">KG</span>
                </div>
                <button type="submit" className="p-3 bg-accent-cyan text-dark-900 rounded-2xl hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-accent-cyan/20">
                  <HiPlusSm size={24} />
                </button>
              </form>
            </div>

            <div className="h-[350px] w-full">
              <SimpleWeightChart />
            </div>
          </div>

          {/* Goal Visualization */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-dark-800 to-accent-cyan/5 border border-white/5 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-10 text-9xl text-accent-cyan opacity-5 pointer-events-none">🎯</div>
             <h3 className="text-2xl font-black text-white mb-2 italic uppercase">The Ultimate Goal</h3>
             <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">You're currently {remaining}kg away from your target of {profile.targetWeight}kg. Keep eating big and training hard.</p>

             <div className="flex items-center justify-between px-4 max-w-2xl mx-auto mb-4">
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-center text-white font-black mb-2">{startWeight}</div>
                   <span className="text-[10px] font-bold text-slate-600 uppercase">START</span>
                </div>
                <div className="flex-1 px-4 relative pt-6 flex flex-col items-center">
                   <div className="absolute top-0 px-3 py-1 rounded-full bg-accent-cyan text-dark-900 text-[10px] font-black uppercase shadow-lg shadow-accent-cyan/20" style={{ left: `calc(${Math.min(Math.max(((latestWeight - startWeight) / (profile.targetWeight - startWeight)) * 100, 0), 100)}% - 20px)` }}>{latestWeight}</div>
                   <div className="w-full h-3 rounded-full bg-dark-900 border border-white/5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(Math.max(((latestWeight - startWeight) / (profile.targetWeight - startWeight)) * 100, 0), 100)}%` }} />
                   </div>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-12 h-12 rounded-2xl bg-accent-cyan border border-white/10 flex items-center justify-center text-dark-900 font-black mb-2">{profile.targetWeight}</div>
                   <span className="text-[10px] font-bold text-slate-600 uppercase">GOAL</span>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar History */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-dark-800 border border-white/5 max-h-[700px] flex flex-col">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 px-2">History Log</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {sortedLogs.map((log, i) => {
              const prev = sortedLogs[i + 1];
              const diff = prev ? (log.weight - prev.weight).toFixed(1) : null;
              return (
                <div key={log.id} className="p-4 rounded-2xl bg-dark-900/50 border border-white/5 flex items-center justify-between group transition-all hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center text-lg shadow-inner">⚖️</div>
                    <div>
                      <p className="text-sm font-black text-white">{log.weight} <span className="text-[10px] text-slate-500 font-bold uppercase">KG</span></p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{formatDate(log.date)}</p>
                    </div>
                  </div>
                  {diff !== null && (
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${
                      parseFloat(diff) >= 0
                        ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                        : 'bg-accent-red/10 text-accent-red border border-accent-red/20'
                    }`}>
                      {parseFloat(diff) >= 0 ? '↑' : '↓'} {Math.abs(diff)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
