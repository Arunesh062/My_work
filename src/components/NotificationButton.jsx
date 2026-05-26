import { useNotifications } from '../context/NotificationContext';
import { showNotification } from '../utils/notifications';
import { HiBell, HiBellAlert } from 'react-icons/hi';

export default function NotificationButton() {
  const { permission, enabled, requestPermission, toggleNotifications } = useNotifications();

  const handleTest = () => {
    showNotification("My Work", "Notification system is working 🔥");
  };

  return (
    <div className="bg-dark-800 border border-white/5 rounded-[30px] p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Alerts</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-1">Status: {permission === 'granted' ? (enabled ? 'Operational' : 'Paused') : 'Unauthorized'}</p>
        </div>
        <div className={`p-3 rounded-2xl ${enabled ? 'bg-accent-cyan/10 text-accent-cyan' : 'bg-dark-950 text-slate-700'}`}>
          {enabled ? <HiBellAlert size={20} /> : <HiBell size={20} />}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {permission !== 'granted' ? (
          <button
            onClick={requestPermission}
            className="w-full py-3 bg-accent-cyan text-dark-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all cursor-pointer"
          >
            Authorize System
          </button>
        ) : (
          <button
            onClick={toggleNotifications}
            className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${enabled ? 'bg-dark-950 text-slate-400 border border-white/5' : 'bg-accent-cyan text-dark-900'}`}
          >
            {enabled ? 'Disable Sync' : 'Enable Sync'}
          </button>
        )}
        
        <button
          onClick={handleTest}
          disabled={!enabled || permission !== 'granted'}
          className="w-full py-3 bg-dark-950 text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Test Signal
        </button>
      </div>
    </div>
  );
}
