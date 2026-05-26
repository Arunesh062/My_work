import { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Fallback static data if no real data is provided
const FALLBACK_DATA = [
  { day: "Mon", weight: 55 },
  { day: "Tue", weight: 55.2 },
  { day: "Wed", weight: 55.5 },
  { day: "Thu", weight: 55.8 },
  { day: "Fri", weight: 56.1 },
  { day: "Sat", weight: 56.3 },
  { day: "Sun", weight: 56.5 },
];

// Error Boundary: prevents a chart crash from taking down the entire Dashboard
class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("[WeightChart] Render crash caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[350px] bg-zinc-900 rounded-2xl p-4 flex flex-col items-center justify-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Chart temporarily unavailable</p>
          <p className="text-slate-600 text-[10px] mt-2">Refresh the page to retry.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom tooltip for dark theme
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0 && payload[0] != null) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-lg font-black text-white">{payload[0].value} <span className="text-xs text-slate-400">kg</span></p>
      </div>
    );
  }
  return null;
};

function WeightChartInner({ data }) {
  // Use real data if provided and valid, otherwise use fallback
  let chartData = FALLBACK_DATA;

  if (Array.isArray(data) && data.length > 0) {
    chartData = data.map((d) => ({
      day: d.day || d.date || "—",
      weight: typeof d.weight === "number" ? d.weight : 0,
    }));
  }

  return (
    <div className="w-full h-[350px] bg-zinc-900 rounded-2xl p-4">
      <h2 className="text-white text-xl font-bold mb-4">Weight Progress</h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />

          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            domain={["auto", "auto"]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="#00FFC6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#00FFC6", strokeWidth: 2, stroke: "#18181b" }}
            activeDot={{ r: 6, fill: "#00FFC6", strokeWidth: 2, stroke: "#fff" }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Default export wraps in Error Boundary for production safety
export default function WeightChart(props) {
  return (
    <ChartErrorBoundary>
      <WeightChartInner {...props} />
    </ChartErrorBoundary>
  );
}
