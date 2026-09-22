import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { type VitalPoint } from "../../types/health";

type VitalsAreaChartProps = {
  data: VitalPoint[];
};

export function VitalsAreaChart({ data }: VitalsAreaChartProps) {
  return (
    <div className="surface rounded-2xl p-4">
      <h3 className="text-lg font-semibold">Vital Rhythm</h3>
      <p className="mt-1 text-sm text-[var(--text-1)]">Heart-rate trend with sleep depth and stress load.</p>
      <div className="mt-4 h-[260px]">
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ left: -20, right: 8 }}>
            <defs>
              <linearGradient id="heart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#63d7e8" stopOpacity={0.44} />
                <stop offset="100%" stopColor="#63d7e8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="stress" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ff7f96" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ff7f96" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(160,178,222,0.15)" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#93a4c7", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#93a4c7", fontSize: 12 }} />
            <Tooltip
              labelStyle={{ color: "#c9d7f4", fontSize: 12 }}
              contentStyle={{
                background: "rgba(11,20,40,0.96)",
                border: "1px solid rgba(165,185,231,0.35)",
                borderRadius: "12px",
              }}
            />
            <Area type="monotone" dataKey="heartRate" stroke="#63d7e8" fill="url(#heart)" strokeWidth={2} />
            <Area type="monotone" dataKey="stress" stroke="#ff7f96" fill="url(#stress)" strokeWidth={1.5} />
            <Line type="monotone" dataKey="sleepHours" stroke="#8c7dff" strokeWidth={1.6} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-[var(--text-2)]">Lines: heart-rate, stress, sleep-hours (synthetic demo).</p>
    </div>
  );
}