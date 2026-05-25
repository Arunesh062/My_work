import { useStore } from '../store/useStore';
import { formatTime } from '../utils/helpers';
import { HiCheck, HiOutlineClock, HiFire, HiTrash, HiPencilAlt } from 'react-icons/hi';

export default function ReminderCard({ reminder, onEdit }) {
  const { toggleReminder, toggleReminderEnabled, deleteReminder } = useStore();

  return (
    <div
      className={`group relative p-4 md:p-6 rounded-3xl border transition-all duration-300 ${
        reminder.completed
          ? 'bg-accent-cyan/5 border-accent-cyan/20 opacity-70 scale-[0.98]'
          : 'bg-dark-800 border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-accent-cyan/5'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
        {/* Toggle & Completion */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => toggleReminder(reminder.id)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer ${
              reminder.completed
                ? 'bg-accent-cyan border-accent-cyan text-dark-900 shadow-lg shadow-accent-cyan/30'
                : 'bg-dark-900 border-white/10 text-transparent hover:border-accent-cyan/50'
            }`}
          >
            <HiCheck size={reminder.completed ? 24 : 0} className="transition-all duration-300" />
          </button>

          <span className="text-3xl md:text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-500">
            {reminder.emoji || '🍽️'}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className={`text-lg md:text-xl font-black tracking-tight truncate ${
              reminder.completed ? 'text-slate-500 line-through' : 'text-white'
            }`}>
              {reminder.title}
            </h4>
            {!reminder.completed && (
              <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase border border-accent-cyan/20">
                Active
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <HiOutlineClock className="text-accent-cyan" size={16} />
              {formatTime(reminder.time)}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <HiFire className="text-orange-500" size={16} />
              {reminder.calories} <span className="text-[10px]">kcal</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between sm:justify-end gap-3 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
          {/* Status Toggle Switch */}
          <button
            onClick={() => toggleReminderEnabled(reminder.id)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer border-none overflow-hidden ${
              reminder.enabled ? 'bg-accent-cyan/20' : 'bg-dark-900'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 shadow-md ${
                reminder.enabled ? 'bg-accent-cyan left-7' : 'bg-slate-600 left-1'
              }`}
            />
          </button>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(reminder)}
                className="p-2.5 rounded-xl bg-dark-900 border border-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
              >
                <HiPencilAlt size={18} />
              </button>
            )}
            <button
              onClick={() => deleteReminder(reminder.id)}
              className="p-2.5 rounded-xl bg-dark-900 border border-white/5 text-slate-400 hover:text-accent-red hover:border-accent-red/30 transition-all cursor-pointer"
            >
              <HiTrash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
