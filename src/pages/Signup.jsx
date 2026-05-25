import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiUserAdd, HiMail, HiLockClosed, HiScale, HiFlag } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    currentWeight: '', targetWeight: '', height: '175'
  });
  const [loading, setLoading] = useState(false);
  const { signup, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error('Access phrases do not match.');
    }

    setLoading(true);
    try {
      await signup(form.email, form.password, {
        name: form.name,
        currentWeight: parseFloat(form.currentWeight),
        targetWeight: parseFloat(form.targetWeight),
        height: parseInt(form.height)
      });
      toast.success('Registration Protocol Complete.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'System registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await googleLogin();
      toast.success('G-Neural Link Synchronized.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google Auth failed.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-xl space-y-10 relative z-10">
        <header className="text-center space-y-3 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-dark-900 border border-accent-cyan/20 shadow-xl shadow-accent-cyan/10 mb-2">
            <HiUserAdd size={32} className="text-accent-cyan" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic text-glow-cyan">Recruit <span className="text-accent-cyan">Protocol</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Neural Enlistment Hub</p>
        </header>

        <section className="bg-dark-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-12 shadow-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSignup} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Warrior Handle</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="Arunesh"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Universal ID (Email)</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="warrior@mywork.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Phrase</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rep Protocol (Confirm)</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid grid-cols-2 gap-6 md:col-span-2 pt-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Initial Scale (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={form.currentWeight}
                      onChange={(e) => setForm({ ...form, currentWeight: e.target.value })}
                      className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                      placeholder="60.0"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Zenith (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={form.targetWeight}
                      onChange={(e) => setForm({ ...form, targetWeight: e.target.value })}
                      className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                      placeholder="75.0"
                    />
                 </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-accent-cyan text-dark-900 font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl shadow-accent-cyan/20 disabled:opacity-50"
            >
              {loading ? 'MODULATING...' : 'Initialize Enlistment'}
            </button>
          </form>

          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full py-4 bg-dark-950 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
          >
            <FcGoogle size={20} /> Register with Google Link
          </button>
        </section>

        <footer className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">
            Existing Veteran? <Link to="/login" className="text-accent-cyan hover:underline ml-1">Verify Node</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
