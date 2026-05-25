import { useState } from 'react';
import { useStore } from '../store/useStore';
import ReminderCard from '../components/ReminderCard';
import NotificationButton from '../components/NotificationButton';
import { HiPlus, HiOutlineSparkles, HiCheckCircle } from 'react-icons/hi';

export default function Reminders() {
  const { reminders, addReminder, updateReminder, resetDailyReminders } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [form, setForm] = useState({ title: '', time: '', calories: '', emoji: '🍽️' });

  const emojiOptions = ['🍽️', '🥤', '🍳', '🥜', '🍛', '🍌', '🥘', '🥛', '🍎', '🥗', '🍗', '🥩'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.time) return;

    if (editMode) {
      updateReminder(editMode, {
        title: form.title,
        time: form.time,
        calories: parseInt(form.calories) || 0,
        emoji: form.emoji,
      });
      setEditMode(null);
    } else {
      addReminder({
        title: form.title,
        time: form.time,
        calories: parseInt(form.calories) || 0,
        completed: false,
        enabled: true,
        emoji: form.emoji,
      });
    }
    setForm({ title: '', time: '', calories: '', emoji: '🍽️' });
    setShowForm(false);
  };

  const handleEdit = (reminder) => {
    setForm({
      title: reminder.title,
      time: reminder.time,
      calories: reminder.calories.toString(),
      emoji: reminder.emoji || '🍽️',
    });
    setEditMode(reminder.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completed = reminders.filter(r => r.completed).length;
  const total = reminders.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Fuel <span className="text-accent-cyan">Scheduler</span></h1>
             <HiOutlineSparkles className="text-accent-cyan animate-pulse hidden sm:block" size={24} />
          </div>
          <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">Managing {total} Nutritional Transitions Today</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NotificationButton />
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditMode(null);
              } else {
                setShowForm(true);
                setEditMode(null);
                setForm({ title: '', time: '', calories: '', emoji: '🍽️' });
              }
            }}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 border-none cursor-pointer ${
              showForm ? 'bg-dark-800 text-slate-400 hover:text-white' : 'bg-accent-cyan text-dark-900 shadow-xl shadow-accent-cyan/20 scale-105 active:scale-95'
            }`}
          >
            {showForm ? 'Close Form' : 'Add New Meal'}
            {showForm ? null : <HiPlus size={18} />}
          </button>
        </div>
      </header>

      {/* Hero Progress Section */}
      <section className="bg-dark-800 border border-white/5 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 blur-[100px] pointer-events-none" />
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
               <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                     <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
                     <circle
                        cx="50" cy="50" r="45" fill="none"
                        stroke="var(--color-accent-cyan)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 2.82} 282`}
                        className="transition-all duration-1000 ease-in-out drop-shadow-[0_0_8px_rgba(6,214,160,0.4)]"
                     />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-4xl font-black text-white">{Math.round(progress)}%</span>
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Complete</span>
                  </div>
               </div>
            </div>
            <div className="md:col-span-8 space-y-6">
               <div>
                  <h3 className="text-2xl font-black text-white tracking-tight leading-tight">Great discipline, <span className="text-accent-cyan">{completed} meals down</span> today.</h3>
                  <p className="text-slate-500 font-medium mt-2">Consistent feeding intervals are the secret to rapid muscle protein synthesis. Keep hitting those targets.</p>
               </div>
               <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-xl bg-dark-900/50 border border-white/5">
                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Scheduled</p>
                     <p className="text-lg font-black text-white">{total} Meals</p>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-dark-900/50 border border-white/5">
                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Upcoming Today</p>
                     <p className="text-lg font-black text-accent-cyan">{total - completed} Left</p>
                  </div>
                  <button
                    onClick={resetDailyReminders}
                    className="ml-auto flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest bg-transparent border-none cursor-pointer transition-colors"
                  >
                    Reset Day <HiCheckCircle size={16} />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Form & List */}
      <div className="grid grid-cols-1 gap-12">
        {showForm && (
          <section className="bg-dark-800 border border-white/5 rounded-3xl p-8 animate-fade-in-up">
            <header className="flex justify-between items-center mb-10">
               <div>
                  <h3 className="text-xl font-extrabold text-white">{editMode ? 'Edit Fuel Interval' : 'Add New Fuel Interval'}</h3>
                  <p className="text-xs text-slate-500 font-medium">Define your next meal window and nutrition</p>
               </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Meal Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all placeholder:text-slate-700"
                    placeholder="e.g., Heavy Lean Lunch"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Notification Time</label>
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Calorie Value</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={form.calories}
                      onChange={(e) => setForm({ ...form, calories: e.target.value })}
                      className="w-full bg-dark-900 border-2 border-white/5 rounded-2xl p-4 text-sm text-white focus:border-accent-cyan outline-none transition-all"
                      placeholder="850"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-600 uppercase">kcal</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-4">Select Representing Icon</label>
                <div className="flex flex-wrap gap-3">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setForm({ ...form, emoji })}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 border-2 cursor-pointer ${
                        form.emoji === emoji
                          ? 'bg-accent-cyan/10 border-accent-cyan shadow-lg shadow-accent-cyan/10 scale-110'
                          : 'bg-dark-900 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 py-5 bg-accent-cyan text-dark-900 font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-accent-cyan/20 hover:-translate-y-1 transition-all">
                  {editMode ? 'Update Nutritional Interval' : 'Lock In Schedule'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditMode(null); }}
                  className="px-8 py-5 bg-dark-900 text-slate-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:text-white transition-colors border-none cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="space-y-6">
          <header className="flex items-center gap-4 px-2">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Chronological Sequence</h3>
             <div className="flex-1 h-px bg-white/5" />
          </header>

          <div className="grid grid-cols-1 gap-6">
            {reminders
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((reminder) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onEdit={handleEdit}
                />
              ))}
          </div>

          {reminders.length === 0 && (
            <div className="py-20 text-center space-y-4 bg-dark-800/30 rounded-[40px] border border-dashed border-white/5">
              <div className="text-6xl opacity-20">🧊</div>
              <div>
                <p className="text-xl font-extrabold text-white italic">Zero Fuel intervals detected.</p>
                <p className="text-slate-500 font-medium">To build mass, you must schedule your intake.</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="text-xs font-bold text-accent-cyan hover:underline uppercase tracking-widest bg-transparent border-none cursor-pointer"
              >
                + Initialize First Schedule
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
