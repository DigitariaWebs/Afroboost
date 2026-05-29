"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { formatCompact, formatCurrency } from "@/lib/utils";

const AXIS = { stroke: "#6B7E73", fontSize: 11 };
const GRID = "rgba(255,255,255,0.06)";

const tooltipStyle = {
  background: "#0E1A14",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  fontSize: 12,
  color: "#E8EFEA",
};

/* Income vs Cost (area) with profit line */
export function IncomeCostChart({
  data,
}: {
  data: { month: string; income: number; cost: number; profit: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2DBE76" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2DBE76" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5544B" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#E5544B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={AXIS} />
        <YAxis tickLine={false} axisLine={false} tick={AXIS} tickFormatter={(v) => formatCompact(v as number)} width={44} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n) => [formatCurrency(v), n]} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#9DB0A5" }} />
        <Area type="monotone" dataKey="income" name="Income" stroke="#2DBE76" strokeWidth={2} fill="url(#gIncome)" />
        <Area type="monotone" dataKey="cost" name="Cost" stroke="#E5544B" strokeWidth={2} fill="url(#gCost)" />
        <Line type="monotone" dataKey="profit" name="Profit" stroke="#E5B040" strokeWidth={2.5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

/* AI spend + other cost breakdown (stacked bar) */
export function CostBreakdownChart({
  data,
}: {
  data: { month: string; aiCost: number; infraCost: number; otherCost: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={AXIS} />
        <YAxis tickLine={false} axisLine={false} tick={AXIS} tickFormatter={(v) => formatCompact(v as number)} width={44} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v: number, n) => [formatCurrency(v), n]} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#9DB0A5" }} />
        <Bar dataKey="aiCost" name="AI spend" stackId="c" fill="#7A3A6A" radius={[0, 0, 0, 0]} />
        <Bar dataKey="infraCost" name="Infra" stackId="c" fill="#176B42" />
        <Bar dataKey="otherCost" name="Other" stackId="c" fill="#3a4a40" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* Growth — new vs churned tenants */
export function GrowthChart({
  data,
}: {
  data: { month: string; newTenants: number; churnedTenants: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={AXIS} />
        <YAxis tickLine={false} axisLine={false} tick={AXIS} width={28} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#9DB0A5" }} />
        <Bar dataKey="newTenants" name="New" fill="#2DBE76" radius={[4, 4, 0, 0]} />
        <Bar dataKey="churnedTenants" name="Churned" fill="#E5544B" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = ["#1F8A55", "#E5B040", "#5B2A4F"];

export function PlanPie({ data }: { data: { label: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={80}
          paddingAngle={3}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#9DB0A5" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MiniArea({ data, color = "#2DBE76" }: { data: { v: number }[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`mini-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#mini-${color})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
