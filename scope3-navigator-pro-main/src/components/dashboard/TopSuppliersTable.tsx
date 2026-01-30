import { motion } from "framer-motion";
import { Building2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const suppliers = [
  {
    id: 1,
    name: "Global Steel Corp",
    category: "Raw Materials",
    emissions: 3450,
    change: 12,
    risk: "high",
    dataQuality: 92,
  },
  {
    id: 2,
    name: "TransLogix Shipping",
    category: "Logistics",
    emissions: 2890,
    change: -8,
    risk: "medium",
    dataQuality: 85,
  },
  {
    id: 3,
    name: "Pacific Polymers",
    category: "Raw Materials",
    emissions: 2340,
    change: 5,
    risk: "medium",
    dataQuality: 78,
  },
  {
    id: 4,
    name: "EcoPackage Solutions",
    category: "Packaging",
    emissions: 1890,
    change: -15,
    risk: "low",
    dataQuality: 95,
  },
  {
    id: 5,
    name: "Northern Electronics",
    category: "Components",
    emissions: 1650,
    change: 3,
    risk: "low",
    dataQuality: 88,
  },
];

const riskStyles = {
  low: {
    badge: "bg-carbon-low/10 text-carbon-low border-carbon-low/20",
    indicator: "bg-carbon-low",
  },
  medium: {
    badge: "bg-carbon-medium/10 text-carbon-medium border-carbon-medium/20",
    indicator: "bg-carbon-medium",
  },
  high: {
    badge: "bg-carbon-critical/10 text-carbon-critical border-carbon-critical/20",
    indicator: "bg-carbon-critical",
  },
};

export function TopSuppliersTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="chart-container"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Emission Sources
          </h3>
          <p className="text-sm text-muted-foreground">
            Suppliers ranked by carbon intensity
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg border border-border/50 hover:border-primary/20 hover:bg-muted/30 transition-all group cursor-pointer"
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-muted-foreground">
                {index + 1}
              </span>
            </div>

            {/* Supplier Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-foreground truncate">
                  {supplier.name}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {supplier.category}
              </span>
            </div>

            {/* Emissions */}
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {supplier.emissions.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  tCO₂e
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium justify-end",
                  supplier.change > 0 ? "text-carbon-critical" : "text-carbon-low"
                )}
              >
                {supplier.change > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {supplier.change > 0 ? "+" : ""}
                {supplier.change}%
              </div>
            </div>

            {/* Risk Badge */}
            <div
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border",
                riskStyles[supplier.risk as keyof typeof riskStyles].badge
              )}
            >
              {supplier.risk}
            </div>

            {/* Data Quality */}
            <div className="w-20 hidden md:block">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Quality</span>
                <span className="font-medium text-foreground">
                  {supplier.dataQuality}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    supplier.dataQuality >= 90
                      ? "bg-carbon-low"
                      : supplier.dataQuality >= 75
                      ? "bg-carbon-medium"
                      : "bg-carbon-high"
                  )}
                  style={{ width: `${supplier.dataQuality}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
