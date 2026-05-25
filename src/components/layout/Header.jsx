import { HiMenuAlt2, HiBell, HiSearch } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import { getGreeting } from '../../utils/helpers';

export default function Header({ onMenuClick }) {
  const { currentUser } = useAuth();
  const { streak } = useStore();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-30 h-20 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer"
        >
          <HiMenuAlt2 size={24} />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">
            {getGreeting()}, <span className="text-accent-cyan">{currentUser?.name?.split(' ')[0] || 'Champion'}</span>
          </h2>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{formattedDate}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-dark-800 border border-white/5 rounded-xl px-3 py-2 w-48 lg:w-64">
          <HiSearch className="text-slate-600" size={18} />
          <input
            type="text"
            placeholder="Search diagnostics..."
            className="bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-700 w-full"
          />
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-black text-xs uppercase tracking-tighter">
          🔥 {streak} STREAK
        </div>

        <button className="relative p-2.5 rounded-xl bg-dark-800 border border-white/5 text-slate-400 hover:text-white transition-all hover:border-white/10 cursor-pointer">
          <HiBell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full border-2 border-dark-800" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue p-[1px] shadow-lg shadow-accent-cyan/10 hidden xs:block">
          <div className="w-full h-full rounded-[11px] bg-dark-900 flex items-center justify-center text-accent-cyan font-black">
            {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
