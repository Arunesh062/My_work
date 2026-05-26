import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiLightningBolt, HiMail, HiLockClosed } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleLogin, currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Access Granted. Welcome back.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("[UI] Google Login Button Clicked");
    try {
      await googleLogin();
      toast.success('Neural Link Established.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google Link failed.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Visual Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/5 blur-[100px] rounded-full" />

      <div className="w-full max-w-sm space-y-10 relative z-10">
        <header className="text-center space-y-3 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-dark-900 border border-accent-cyan/20 shadow-xl shadow-accent-cyan/10 mb-2">
            <HiLightningBolt size={32} className="text-accent-cyan" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">My <span className="text-accent-cyan">Work</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Authentication Protocol</p>
        </header>

        <section className="bg-dark-900/50 backdrop-blur-xl border border-white/5 rounded-[40px] p-8 md:p-10 shadow-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="warrior@mywork.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Phrase (Password)</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark-950 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-800"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-accent-cyan text-dark-900 font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-xl shadow-accent-cyan/20 disabled:opacity-50"
            >
              {loading ? 'AUTHORIZING...' : 'Login to System'}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Global Link</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 bg-dark-950 border border-white/5 rounded-2xl flex items-center justify-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer"
          >
            <FcGoogle size={20} /> Login with Google Account
          </button>
        </section>

        <footer className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest">
            New Recruit? <Link to="/signup" className="text-accent-cyan hover:underline ml-1">Register Protocol</Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
