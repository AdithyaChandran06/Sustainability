import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FlaskConical,
  RefreshCw,
  Download,
  ArrowRight,
  Zap,
  TrendingDown,
  Truck,
  Package,
  Factory,
} from "lucide-react";
import { cn } from "@/lib/utils";

const baselineData = {
  totalEmissions: 29690,
  categories: [
    { name: "Purchased Goods", baseline: 12450, current: 12450 },
    { name: "Transportation", baseline: 8320, current: 8320 },
    { name: "Fuel & Energy", baseline: 4460, current: 4460 },
    { name: "Business Travel", baseline: 2380, current: 2380 },
    { name: "Waste", baseline: 1190, current: 1190 },
    { name: "Other", baseline: 890, current: 890 },
  ],
};

const scenarioOptions = [
  {
    id: "supplier-switch",
    name: "Switch High-Carbon Suppliers",
    description: "Replace top 3 high-emission suppliers with low-carbon alternatives",
    icon: Factory,
    reduction: 2850,
    cost: "Medium",
    timeline: "6-12 months",
  },
  {
    id: "transport-optimize",
    name: "Optimize Transport Routes",
    description: "Consolidate shipments and optimize logistics routes",
    icon: Truck,
    reduction: 1450,
    cost: "Low",
    timeline: "3-6 months",
  },
  {
    id: "modal-shift",
    name: "Modal Shift to Rail",
    description: "Shift 30% of road freight to rail transport",
    icon: Package,
    reduction: 1120,
    cost: "Medium",
    timeline: "12-18 months",
  },
  {
    id: "renewable-energy",
    name: "Supplier Renewable Energy",
    description: "Require key suppliers to use 100% renewable energy",
    icon: Zap,
    reduction: 1890,
    cost: "High",
    timeline: "18-24 months",
  },
];

const Scenarios = () => {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [supplierReductionPct, setSupplierReductionPct] = useState([50]);
  const [transportReductionPct, setTransportReductionPct] = useState([30]);

  const calculateScenarioImpact = () => {
    let totalReduction = 0;

    if (selectedScenarios.includes("supplier-switch")) {
      totalReduction += 2850 * (supplierReductionPct[0] / 100);
    }
    if (selectedScenarios.includes("transport-optimize")) {
      totalReduction += 1450;
    }
    if (selectedScenarios.includes("modal-shift")) {
      totalReduction += 1120 * (transportReductionPct[0] / 100);
    }
    if (selectedScenarios.includes("renewable-energy")) {
      totalReduction += 1890;
    }

    return Math.round(totalReduction);
  };

  const scenarioEmissions = baselineData.totalEmissions - calculateScenarioImpact();
  const reductionPercentage = ((calculateScenarioImpact() / baselineData.totalEmissions) * 100).toFixed(1);

  const chartData = baselineData.categories.map((cat) => {
    let scenarioValue = cat.baseline;
    
    if (selectedScenarios.includes("supplier-switch") && cat.name === "Purchased Goods") {
      scenarioValue -= 2850 * (supplierReductionPct[0] / 100);
    }
    if (selectedScenarios.includes("transport-optimize") && cat.name === "Transportation") {
      scenarioValue -= 1450;
    }
    if (selectedScenarios.includes("modal-shift") && cat.name === "Transportation") {
      scenarioValue -= 1120 * (transportReductionPct[0] / 100);
    }
    if (selectedScenarios.includes("renewable-energy") && cat.name === "Fuel & Energy") {
      scenarioValue -= 1890;
    }

    return {
      ...cat,
      scenario: Math.max(0, Math.round(scenarioValue)),
    };
  });

  const toggleScenario = (id: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            What-If Scenario Analysis
          </h1>
          <p className="mt-1 text-muted-foreground">
            Model emission reduction strategies and their impact
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Button variant="outline" onClick={() => setSelectedScenarios([])}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="chart-container"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Reduction Scenarios
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select strategies to model
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {scenarioOptions.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => toggleScenario(scenario.id)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    selectedScenarios.includes(scenario.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        selectedScenarios.includes(scenario.id)
                          ? "bg-primary/20"
                          : "bg-muted"
                      )}
                    >
                      <scenario.icon
                        className={cn(
                          "w-5 h-5",
                          selectedScenarios.includes(scenario.id)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground">
                          {scenario.name}
                        </h4>
                        <Switch
                          checked={selectedScenarios.includes(scenario.id)}
                          onCheckedChange={() => toggleScenario(scenario.id)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {scenario.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-carbon-low font-medium">
                          -{scenario.reduction.toLocaleString()} tCO₂e
                        </span>
                        <span className="text-muted-foreground">
                          Cost: {scenario.cost}
                        </span>
                        <span className="text-muted-foreground">
                          {scenario.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Adjustments */}
          {selectedScenarios.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="chart-container"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Scenario Adjustments
              </h3>

              {selectedScenarios.includes("supplier-switch") && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">Supplier Switch Coverage</Label>
                    <span className="text-sm font-medium text-foreground">
                      {supplierReductionPct[0]}%
                    </span>
                  </div>
                  <Slider
                    value={supplierReductionPct}
                    onValueChange={setSupplierReductionPct}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Percentage of high-carbon suppliers to replace
                  </p>
                </div>
              )}

              {selectedScenarios.includes("modal-shift") && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm">Modal Shift Percentage</Label>
                    <span className="text-sm font-medium text-foreground">
                      {transportReductionPct[0]}%
                    </span>
                  </div>
                  <Slider
                    value={transportReductionPct}
                    onValueChange={setTransportReductionPct}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Freight volume shifted from road to rail
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Impact Summary */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-muted/30 border border-border"
            >
              <p className="text-sm text-muted-foreground mb-1">Baseline</p>
              <p className="text-2xl font-bold text-foreground">
                {baselineData.totalEmissions.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">tCO₂e/year</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-primary/5 border border-primary/20"
            >
              <p className="text-sm text-muted-foreground mb-1">With Scenarios</p>
              <p className="text-2xl font-bold text-foreground">
                {scenarioEmissions.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">tCO₂e/year</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl bg-carbon-low/10 border border-carbon-low/20"
            >
              <p className="text-sm text-muted-foreground mb-1">Reduction</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-carbon-low" />
                <p className="text-2xl font-bold text-carbon-low">
                  {reductionPercentage}%
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {calculateScenarioImpact().toLocaleString()} tCO₂e saved
              </p>
            </motion.div>
          </div>

          {/* Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="chart-container"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Impact by Category
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Baseline vs scenario emissions comparison
            </p>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
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
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
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
                <Legend />
                <Bar
                  dataKey="baseline"
                  name="Baseline"
                  fill="hsl(var(--muted-foreground))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="scenario"
                  name="With Scenarios"
                  fill="hsl(168, 76%, 42%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recommendations */}
          {selectedScenarios.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-xl bg-primary/5 border border-primary/20"
            >
              <h3 className="font-semibold text-foreground mb-3">
                Implementation Roadmap
              </h3>
              <div className="space-y-3">
                {selectedScenarios.map((id, index) => {
                  const scenario = scenarioOptions.find((s) => s.id === id);
                  if (!scenario) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{scenario.name}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {scenario.timeline}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Button className="mt-4 w-full">
                Generate Detailed Action Plan
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Scenarios;
