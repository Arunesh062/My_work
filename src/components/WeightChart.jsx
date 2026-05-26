import { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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

// Error boundary to catch Recharts rendering crashes
class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex items-center justify-center p-8 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Chart temporarily unavailable</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function WeightChartInner({ data, height = 300 }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-white/5 rounded-3xl" style={{ height }}>
        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-2">No Bio-Metric Data Detected</p>
        <p className="text-xs text-slate-500 font-bold max-w-[200px]">Perform a scale check to initialize performance tracking.</p>
      </div>
    );
  }

  const chartData = data.map(d => ({
    ...d,
    formattedDate: formatDate(d.date || new Date().toISOString()),
  }));

  return (
    <div className="w-full overflow-hidden" style={{ height }}>
      <AreaChart width={480} height={height} data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
        <XAxis
          dataKey="formattedDate"
          tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
          axisLine={false}
          tickLine={false}
          domain={['auto', 'auto']}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="#22d3ee"
          strokeWidth={3}
          fill="url(#weightGrad)"
          dot={{ r: 4, fill: '#22d3ee', strokeWidth: 3, stroke: '#0f172a' }}
          activeDot={{ r: 6, fill: '#22d3ee', strokeWidth: 3, stroke: 'white' }}
          animationDuration={1500}
        />
      </AreaChart>
    </div>
  );
}

export default function WeightChart(props) {
  return (
    <ChartErrorBoundary>
      <WeightChartInner {...props} />
    </ChartErrorBoundary>
  );
}
