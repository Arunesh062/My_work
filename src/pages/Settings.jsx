import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { HiUser, HiBell, HiColorSwatch, HiLogout, HiTrash, HiCheckCircle } from 'react-icons/hi';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

export default function Settings() {
  const { currentUser, logout } = useAuth();
  const { settings, updateSettings } = useStore();
  const navigate = useNavigate();

  const [pForm, setPForm] = useState({
    name: currentUser?.name || '',
    height: currentUser?.height || 175,
    calorieGoal: currentUser?.calorieGoal || 3000,
    waterGoal: currentUser?.waterGoal || 8,
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, pForm);
      toast.success('Neural Parameters Re-Calibrated.', {
        style: { background: '#0a0e1a', color: '#fff', border: '1px solid rgba(255,255,255,0.05)' },
        icon: '⚙️'
      });
    } catch (err) {
      toast.error('Sync failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 animate-fade-in-up">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-[0.3em]">
          <HiColorSwatch size={16} /> Configuration Node
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          System <span className="text-accent-cyan underline decoration-white/20 underline-offset-8">Settings</span>
        </h1>
        <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Tuning biological and notification variables</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 text-white opacity-5 -translate-y-4"><HiUser size={120} /></div>
          <div className="flex items-center gap-4 mb-10 relative z-10">
             <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan"><HiUser size={24} /></div>
             <div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Biological Identity</h3>
                <p className="text-xs text-slate-500 font-medium">Calibrating your baseline metrics in the cloud</p>
             </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Warrior Handle</label>
                <input
                  type="text"
                  value={pForm.name}
                  onChange={(e) => setPForm({ ...pForm, name: e.target.value })}
                  className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Stature (cm)</label>
                <input
                  type="number"
                  value={pForm.height}
                  onChange={(e) => setPForm({ ...pForm, height: parseInt(e.target.value) })}
                  className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Daily Calorie Reservoir</label>
                <input
                  type="number"
                  value={pForm.calorieGoal}
                  onChange={(e) => setPForm({ ...pForm, calorieGoal: parseInt(e.target.value) })}
                  className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hydration Index (Cups)</label>
                <input
                  type="number"
                  value={pForm.waterGoal}
                  onChange={(e) => setPForm({ ...pForm, waterGoal: parseInt(e.target.value) })}
                  className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-accent-cyan text-dark-900 font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-accent-cyan/20 hover:-translate-y-1 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'SYNCING UPLINK...' : 'Update Firestore Profile'}
            </button>
          </form>
        </section>

        {/* System Flags */}
        <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12">
          <div className="flex items-center gap-4 mb-10">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400"><HiBell size={24} /></div>
             <div>
                <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">Alert Intelligence</h3>
                <p className="text-xs text-slate-500 font-medium">Hardware-level notification behavior</p>
             </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-3xl bg-dark-900 border border-white/5 group transition-all hover:border-white/10">
              <div>
                <p className="text-sm font-black text-white tracking-tight uppercase">Background Pings</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">External notification system status</p>
              </div>
              <button
                onClick={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 border-none cursor-pointer overflow-hidden ${
                  settings.notificationsEnabled ? 'bg-accent-cyan/20' : 'bg-dark-800'
                }`}
              >
                <div className={`absolute top-1.5 w-5 h-5 rounded-full transition-all duration-300 shadow-md ${
                  settings.notificationsEnabled ? 'bg-accent-cyan left-8' : 'bg-slate-600 left-1.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-6 rounded-3xl bg-dark-900 border border-white/5 group transition-all hover:border-white/10">
               <div>
                <p className="text-sm font-black text-white tracking-tight uppercase">Acoustic Feedback</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Play neural chime on trigger</p>
              </div>
              <button
                onClick={() => updateSettings({ notificationSound: !settings.notificationSound })}
                className={`relative w-14 h-8 rounded-full transition-all duration-300 border-none cursor-pointer overflow-hidden ${
                  settings.notificationSound ? 'bg-accent-cyan/20' : 'bg-dark-800'
                }`}
              >
                <div className={`absolute top-1.5 w-5 h-5 rounded-full transition-all duration-300 shadow-md ${
                  settings.notificationSound ? 'bg-accent-cyan left-8' : 'bg-slate-600 left-1.5'
                }`} />
              </button>
            </div>
          </div>
        </section>

        {/* Termination Zone */}
        <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex-1 space-y-2">
              <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Access Termination</h3>
              <p className="text-xs text-slate-500 font-medium">Securing the current node and terminating all active sessions.</p>
           </div>
           <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={handleLogout}
                className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-accent-red/10 border border-accent-red/20 text-accent-red rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-accent-red/20 transition-all shadow-lg active:scale-95 border-none cursor-pointer"
              >
                <HiLogout /> Terminate Hub Session
              </button>
           </div>
        </section>
      </div>

      <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest opacity-50">
        System Revision: v5.0.0-PRO-AUTH • Firebase Enabled
      </p>
    </div>
  );
}
