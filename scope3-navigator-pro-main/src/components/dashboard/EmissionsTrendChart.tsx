import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", scope1: 245, scope2: 156, scope3: 1890 },
  { month: "Feb", scope1: 238, scope2: 162, scope3: 1945 },
  { month: "Mar", scope1: 251, scope2: 148, scope3: 1820 },
  { month: "Apr", scope1: 229, scope2: 142, scope3: 1756 },
  { month: "May", scope1: 218, scope2: 138, scope3: 1698 },
  { month: "Jun", scope1: 212, scope2: 135, scope3: 1645 },
  { month: "Jul", scope1: 205, scope2: 128, scope3: 1589 },
  { month: "Aug", scope1: 198, scope2: 125, scope3: 1534 },
  { month: "Sep", scope1: 192, scope2: 120, scope3: 1478 },
  { month: "Oct", scope1: 186, scope2: 118, scope3: 1425 },
  { month: "Nov", scope1: 180, scope2: 115, scope3: 1380 },
  { month: "Dec", scope1: 175, scope2: 112, scope3: 1342 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-card-lg p-3">
        <p className="font-medium text-sm text-foreground mb-2">{label} 2024</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground capitalize">
                {entry.name.replace("scope", "Scope ")}
              </span>
            </div>
            <span className="font-medium text-foreground">
              {entry.value.toLocaleString()} tCO₂e
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function EmissionsTrendChart() {
  const colors = useMemo(
    () => ({
      scope1: "hsl(158, 64%, 35%)",
      scope2: "hsl(168, 76%, 42%)",
      scope3: "hsl(43, 96%, 56%)",
    }),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="chart-container"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Emissions Trend
          </h3>
          <p className="text-sm text-muted-foreground">
            Monthly carbon emissions by scope (tCO₂e)
          </p>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(colors).map(([scope, color]) => (
            <div key={scope} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-medium text-muted-foreground capitalize">
                {scope.replace("scope", "Scope ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={mockData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            {Object.entries(colors).map(([scope, color]) => (
              <linearGradient
                key={scope}
                id={`gradient-${scope}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="scope3"
            stroke={colors.scope3}
            strokeWidth={2}
            fill={`url(#gradient-scope3)`}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="scope2"
            stroke={colors.scope2}
            strokeWidth={2}
            fill={`url(#gradient-scope2)`}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="scope1"
            stroke={colors.scope1}
            strokeWidth={2}
            fill={`url(#gradient-scope1)`}
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
