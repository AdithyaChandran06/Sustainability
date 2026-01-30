import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Treemap,
} from "recharts";
import { Download, Filter, TrendingDown, AlertTriangle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const emissionsBySupplier = [
  { name: "Global Steel", value: 3450 },
  { name: "TransLogix", value: 2890 },
  { name: "Pacific Poly", value: 2340 },
  { name: "EcoPackage", value: 1890 },
  { name: "Northern Elec", value: 1650 },
  { name: "Coastal Freight", value: 1420 },
  { name: "Nordic Metals", value: 980 },
  { name: "Midwest Chem", value: 890 },
];

const emissionsByMaterial = [
  { name: "Steel", emissions: 4500, suppliers: 3 },
  { name: "Plastics", emissions: 3200, suppliers: 5 },
  { name: "Aluminum", emissions: 2800, suppliers: 2 },
  { name: "Electronics", emissions: 2400, suppliers: 4 },
  { name: "Packaging", emissions: 1900, suppliers: 6 },
  { name: "Chemicals", emissions: 1500, suppliers: 3 },
];

const emissionsByRegion = [
  { name: "Asia Pacific", value: 45 },
  { name: "Europe", value: 28 },
  { name: "North America", value: 18 },
  { name: "Other", value: 9 },
];

const monthlyTrend = [
  { month: "Jul", actual: 2680, target: 2750 },
  { month: "Aug", actual: 2590, target: 2700 },
  { month: "Sep", actual: 2520, target: 2650 },
  { month: "Oct", actual: 2480, target: 2600 },
  { month: "Nov", actual: 2410, target: 2550 },
  { month: "Dec", actual: 2350, target: 2500 },
];

const COLORS = [
  "hsl(158, 64%, 35%)",
  "hsl(168, 76%, 42%)",
  "hsl(43, 96%, 56%)",
  "hsl(25, 95%, 53%)",
  "hsl(0, 72%, 51%)",
  "hsl(199, 89%, 48%)",
];

const Analytics = () => {
  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Emissions Analysis
          </h1>
          <p className="mt-1 text-muted-foreground">
            Deep dive into emission sources and reduction opportunities
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </motion.div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl bg-carbon-low/5 border border-carbon-low/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingDown className="w-5 h-5 text-carbon-low" />
            <span className="font-semibold text-foreground">Top Insight</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Switching <span className="font-medium text-foreground">Global Steel Corp</span> to a low-carbon supplier could reduce emissions by{" "}
            <span className="font-bold text-carbon-low">12.3%</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-xl bg-carbon-medium/5 border border-carbon-medium/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-carbon-medium" />
            <span className="font-semibold text-foreground">Risk Alert</span>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Asia Pacific</span> region accounts for 45% of emissions but only 32% of spend. Consider regional diversification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Target Progress</span>
          </div>
          <p className="text-sm text-muted-foreground">
            On track to achieve <span className="font-bold text-primary">6.2% reduction</span> this quarter, exceeding the 5% target.
          </p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Suppliers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="chart-container"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Emissions by Supplier
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Top emission sources in your supply chain
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={emissionsBySupplier}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill="hsl(158, 64%, 35%)"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* By Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Regional Distribution
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Emission footprint by geographic region
          </p>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={emissionsByRegion}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {emissionsByRegion.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/2 space-y-3">
              {emissionsByRegion.map((region, index) => (
                <div key={region.name} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="flex-1 text-sm text-foreground">
                    {region.name}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {region.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* By Material */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="chart-container"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Emissions by Material Type
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Carbon intensity across material categories
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={emissionsByMaterial}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="emissions"
                fill="hsl(168, 76%, 42%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trend vs Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="chart-container"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Actual vs Target
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Monthly emissions compared to reduction targets
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyTrend}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
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
                domain={[2200, 2800]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="hsl(168, 76%, 42%)"
                strokeWidth={2}
                dot={{ fill: "hsl(168, 76%, 42%)", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Hotspot Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="chart-container"
      >
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Emission Hotspot Matrix
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Identify high-impact areas across suppliers and categories
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Supplier / Category
                </th>
                {["Raw Materials", "Logistics", "Packaging", "Components", "Services"].map(
                  (cat) => (
                    <th
                      key={cat}
                      className="text-center py-3 px-4 font-medium text-muted-foreground"
                    >
                      {cat}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Global Steel", values: [95, 15, 5, 0, 2] },
                { name: "TransLogix", values: [0, 92, 0, 0, 5] },
                { name: "Pacific Poly", values: [88, 8, 12, 0, 0] },
                { name: "EcoPackage", values: [10, 5, 78, 0, 3] },
                { name: "Northern Elec", values: [0, 12, 5, 85, 8] },
              ].map((supplier) => (
                <tr key={supplier.name} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">
                    {supplier.name}
                  </td>
                  {supplier.values.map((value, index) => (
                    <td key={index} className="text-center py-3 px-4">
                      <div
                        className="mx-auto w-12 h-8 rounded flex items-center justify-center text-xs font-medium"
                        style={{
                          backgroundColor:
                            value > 70
                              ? "hsl(0, 72%, 51%, 0.2)"
                              : value > 40
                              ? "hsl(43, 96%, 56%, 0.2)"
                              : value > 10
                              ? "hsl(152, 69%, 40%, 0.15)"
                              : "hsl(var(--muted))",
                          color:
                            value > 70
                              ? "hsl(0, 72%, 41%)"
                              : value > 40
                              ? "hsl(43, 96%, 40%)"
                              : value > 10
                              ? "hsl(152, 69%, 30%)"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {value > 0 ? value : "-"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Intensity:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-xs text-muted-foreground">None</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(152, 69%, 40%, 0.15)" }} />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(43, 96%, 56%, 0.2)" }} />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(0, 72%, 51%, 0.2)" }} />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Analytics;
