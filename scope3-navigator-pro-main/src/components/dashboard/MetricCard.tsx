import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
  delay?: number;
}

const variantStyles = {
  default: "border-border/50",
  primary: "border-primary/20 bg-primary/5",
  success: "border-carbon-low/20 bg-carbon-low/5",
  warning: "border-carbon-medium/20 bg-carbon-medium/5",
  danger: "border-carbon-critical/20 bg-carbon-critical/5",
};

const iconContainerStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-carbon-low/10 text-carbon-low",
  warning: "bg-carbon-medium/10 text-carbon-medium",
  danger: "bg-carbon-critical/10 text-carbon-critical",
};

export function MetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  variant = "default",
  className,
  delay = 0,
}: MetricCardProps) {
  const isPositiveChange = change !== undefined && change > 0;
  const isNegativeChange = change !== undefined && change < 0;
  const isNeutralChange = change === 0;

  // For carbon metrics, negative change is good (reduction)
  const changeColor = isNegativeChange
    ? "text-carbon-low"
    : isPositiveChange
    ? "text-carbon-critical"
    : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className={cn("metric-card", variantStyles[variant], className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {unit && (
              <span className="text-sm font-medium text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
              iconContainerStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
          <div className={cn("flex items-center gap-1", changeColor)}>
            {isNegativeChange && <TrendingDown className="w-4 h-4" />}
            {isPositiveChange && <TrendingUp className="w-4 h-4" />}
            {isNeutralChange && <Minus className="w-4 h-4" />}
            <span className="text-sm font-semibold">
              {isPositiveChange && "+"}
              {change}%
            </span>
          </div>
          {changeLabel && (
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
