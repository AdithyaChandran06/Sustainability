import { motion } from "framer-motion";
import { Target, TrendingDown, Calendar, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const targets = [
  {
    name: "2025 Interim Target",
    target: -25,
    current: -18,
    deadline: "Dec 2025",
    status: "on-track",
  },
  {
    name: "2030 SBTi Target",
    target: -46,
    current: -18,
    deadline: "Dec 2030",
    status: "on-track",
  },
  {
    name: "Net Zero 2050",
    target: -90,
    current: -18,
    deadline: "Dec 2050",
    status: "on-track",
  },
];

export function NetZeroProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="chart-container"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Decarbonization Targets
          </h3>
          <p className="text-sm text-muted-foreground">
            Progress toward science-based targets
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {targets.map((target, index) => {
          const progress = Math.abs(target.current / target.target) * 100;

          return (
            <motion.div
              key={target.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {target.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-carbon-low/10 text-carbon-low">
                    On Track
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {target.deadline}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
                <div className="text-right shrink-0 w-24">
                  <span className="text-lg font-bold text-foreground">
                    {target.current}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / {target.target}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <TrendingDown className="w-3 h-3 text-carbon-low" />
                <span>
                  {Math.round((Math.abs(target.target) - Math.abs(target.current)) / (2050 - 2024) * 10) / 10}% reduction needed per year
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Acceleration Recommended
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Current trajectory shows 2.1% annual reduction. Consider reviewing
              high-impact scenarios to identify acceleration opportunities.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
