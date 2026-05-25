import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store/useStore';
import {
  HiHome, HiClock, HiScale, HiFire, HiCog,
  HiBeaker, HiChartBar, HiTrendingUp, HiX, HiLogout
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const navItems = [
  { path: '/', label: 'Dashboard', icon: HiHome },
  { path: '/reminders', label: 'Reminders', icon: HiClock },
  { path: '/weight', label: 'Weight', icon: HiScale },
  { path: '/calories', label: 'Calories', icon: HiFire },
  { path: '/water', label: 'Water', icon: HiBeaker },
  { path: '/streaks', label: 'Streaks', icon: HiChartBar },
  { path: '/analytics', label: 'Analytics', icon: HiTrendingUp },
  { path: '/settings', label: 'Settings', icon: HiCog },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { streak } = useStore();

  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Session Terminated.');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed.');
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-dark-800 border-r border-white/5 transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-extrabold text-white shadow-lg shadow-accent-cyan/20"
              style={{ background: 'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-blue))' }}>
              M
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase italic">My Work</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-none bg-transparent cursor-pointer"
          >
            <HiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-120px)]">
          <p className="px-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Neural Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 no-underline group ${
                  isActive
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 shadow-lg shadow-accent-cyan/5'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-accent-cyan' : 'text-slate-500 group-hover:text-slate-300'} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-accent-red hover:bg-accent-red/5 transition-all duration-200 mt-8 border border-transparent bg-transparent cursor-pointer"
          >
            <HiLogout size={20} className="text-slate-500 group-hover:text-accent-red" />
            <span>Terminate Hub</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-dark-800/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-cyan to-accent-blue text-dark-900 font-black shadow-lg shadow-accent-cyan/10">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-white truncate">{currentUser?.name || 'Warrior'}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase truncate">{currentUser?.email}</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
