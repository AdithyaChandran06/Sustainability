import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const categoryData = [
  { name: "Purchased Goods", value: 42, emissions: 12450 },
  { name: "Transportation", value: 28, emissions: 8320 },
  { name: "Fuel & Energy", value: 15, emissions: 4460 },
  { name: "Business Travel", value: 8, emissions: 2380 },
  { name: "Waste", value: 4, emissions: 1190 },
  { name: "Other", value: 3, emissions: 890 },
];

const COLORS = [
  "hsl(158, 64%, 35%)",
  "hsl(168, 76%, 42%)",
  "hsl(43, 96%, 56%)",
  "hsl(25, 95%, 53%)",
  "hsl(0, 72%, 51%)",
  "hsl(199, 89%, 48%)",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: { name: string; value: number; emissions: number };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg shadow-card-lg p-3">
        <p className="font-medium text-sm text-foreground">{data.name}</p>
        <p className="text-lg font-bold text-foreground">
          {data.emissions.toLocaleString()} tCO₂e
        </p>
        <p className="text-xs text-muted-foreground">{data.value}% of total</p>
      </div>
    );
  }
  return null;
};

export function CategoryBreakdownChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="chart-container h-full"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Scope 3 Categories
        </h3>
        <p className="text-sm text-muted-foreground">
          Emission breakdown by category
        </p>
      </div>

      <div className="flex items-center">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-1/2 space-y-2">
          {categoryData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground truncate">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-foreground ml-2">
                    {item.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted mt-1 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
