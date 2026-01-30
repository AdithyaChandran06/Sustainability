import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EmissionsTrendChart } from "@/components/dashboard/EmissionsTrendChart";
import { CategoryBreakdownChart } from "@/components/dashboard/CategoryBreakdownChart";
import { TopSuppliersTable } from "@/components/dashboard/TopSuppliersTable";
import { NetZeroProgress } from "@/components/dashboard/NetZeroProgress";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { motion } from "framer-motion";
import {
  Cloud,
  Factory,
  Truck,
  Leaf,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Carbon Intelligence Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Real-time Scope 3 supply chain emissions overview • Last updated: 2 hours ago
          </p>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Scope 3 Emissions"
          value="29,690"
          unit="tCO₂e"
          change={-12.4}
          changeLabel="vs last year"
          icon={<Cloud className="w-5 h-5" />}
          variant="primary"
          delay={0}
        />
        <MetricCard
          title="Active Suppliers"
          value={156}
          change={8}
          changeLabel="new this quarter"
          icon={<Factory className="w-5 h-5" />}
          delay={1}
        />
        <MetricCard
          title="Transportation Routes"
          value={342}
          change={-5.2}
          changeLabel="emissions intensity"
          icon={<Truck className="w-5 h-5" />}
          variant="success"
          delay={2}
        />
        <MetricCard
          title="Data Coverage"
          value="87%"
          change={12}
          changeLabel="improved coverage"
          icon={<FileCheck className="w-5 h-5" />}
          delay={3}
        />
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mb-8 p-4 rounded-xl bg-carbon-medium/10 border border-carbon-medium/20 flex items-center gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-carbon-medium/20 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-carbon-medium" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">
            3 suppliers missing Q4 emission data
          </p>
          <p className="text-sm text-muted-foreground">
            Global Steel Corp, Pacific Polymers, and Nordic Metals have incomplete data submissions.
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors shrink-0">
          Review Data Gaps
        </button>
      </motion.div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <EmissionsTrendChart />
        </div>
        <div>
          <CategoryBreakdownChart />
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TopSuppliersTable />
        </div>
        <div>
          <NetZeroProgress />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="chart-container"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Actions
            </h3>
            <p className="text-sm text-muted-foreground">
              Common tasks and workflows
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Cloud,
                label: "Upload Data",
                description: "CSV, Excel, or PDF",
                href: "/upload",
              },
              {
                icon: Factory,
                label: "Add Supplier",
                description: "New supplier profile",
                href: "/suppliers",
              },
              {
                icon: Leaf,
                label: "Run Scenario",
                description: "What-if analysis",
                href: "/scenarios",
              },
              {
                icon: FileCheck,
                label: "Export Report",
                description: "Audit-ready PDF",
                href: "/audit",
              },
            ].map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.8 + index * 0.1 }}
                className="p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-medium text-foreground">{action.label}</p>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
