export default function ProgressCard({ title, value, max, unit, icon: Icon, color, subtitle }) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  const colorStyles = {
    cyan: {
      gradient: 'from-accent-cyan to-accent-blue',
      bg: 'bg-accent-cyan/5',
      border: 'border-accent-cyan/10',
      text: 'text-accent-cyan',
      shadow: 'shadow-accent-cyan/5'
    },
    blue: {
      gradient: 'from-accent-blue to-accent-purple',
      bg: 'bg-accent-blue/5',
      border: 'border-accent-blue/10',
      text: 'text-accent-blue',
      shadow: 'shadow-accent-blue/5'
    },
    purple: {
      gradient: 'from-accent-purple to-accent-pink',
      bg: 'bg-accent-purple/5',
      border: 'border-accent-purple/10',
      text: 'text-accent-purple',
      shadow: 'shadow-accent-purple/5'
    },
    pink: {
      gradient: 'from-accent-pink to-accent-orange',
      bg: 'bg-accent-pink/5',
      border: 'border-accent-pink/10',
      text: 'text-accent-pink',
      shadow: 'shadow-accent-pink/5'
    },
    orange: {
      gradient: 'from-accent-orange to-accent-yellow',
      bg: 'bg-accent-orange/5',
      border: 'border-accent-orange/10',
      text: 'text-accent-orange',
      shadow: 'shadow-accent-orange/5'
    },
  };

  const s = colorStyles[color] || colorStyles.cyan;

  return (
    <div className={`group flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${s.bg} ${s.border} ${s.shadow} hover:border-white/10`}>
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-dark-900 border ${s.border} text-2xl transition-transform duration-300 group-hover:scale-110`}>
            {typeof Icon === 'function' ? <Icon /> : Icon}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</p>
        </div>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-3xl font-extrabold text-white tracking-tight">{value}</span>
          {max > 0 ? (
            <span className="text-sm font-medium text-slate-500">/ {max} {unit}</span>
          ) : (
            <span className="text-sm font-medium text-slate-500">{unit}</span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs font-medium text-slate-400 mb-4">{subtitle}</p>
        )}
      </div>

      {max > 0 && (
        <div className="mt-auto">
          <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden p-[1px] border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${s.gradient}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-[10px] font-bold ${s.text}`}>{Math.round(percentage)}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Target Reached</span>
          </div>
        </div>
      )}
    </div>
  );
}
