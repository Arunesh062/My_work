import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from '../utils/helpers';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.[0]) {
    return (
      <div className="px-4 py-3 rounded-2xl text-sm shadow-2xl border border-white/10 bg-dark-900/95 backdrop-blur-md">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-white">{payload[0].value} <span className="text-xs font-medium text-slate-400">kg</span></p>
      </div>
    );
  }
  return null;
};

export default function WeightChart({ data, height = 300 }) {
  const chartData = data.map(d => ({
    ...d,
    formattedDate: formatDate(d.date),
  }));

  return (
    <div className="w-full h-full min-h-[inherit]" style={{ width: '100%', height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
          <XAxis
            dataKey="formattedDate"
            tick={{ fill: 'var(--color-dark-300)', fontSize: 10, fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fill: 'var(--color-dark-300)', fontSize: 10, fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="var(--color-accent-cyan)"
            strokeWidth={3}
            fill="url(#weightGrad)"
            dot={{ r: 4, fill: 'var(--color-accent-cyan)', strokeWidth: 3, stroke: 'var(--color-dark-800)' }}
            activeDot={{ r: 6, fill: 'var(--color-accent-cyan)', strokeWidth: 3, stroke: 'white' }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
