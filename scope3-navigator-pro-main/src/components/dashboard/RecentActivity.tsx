import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Clock, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "upload",
    title: "Q4 Transportation Data Uploaded",
    description: "Logistics emissions data from 3 carriers processed",
    time: "2 hours ago",
    user: "Sarah M.",
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: 2,
    type: "validation",
    title: "Supplier Data Validated",
    description: "Global Steel Corp emissions verified against invoices",
    time: "4 hours ago",
    user: "System",
    icon: CheckCircle2,
    iconBg: "bg-carbon-low/10",
    iconColor: "text-carbon-low",
  },
  {
    id: 3,
    type: "alert",
    title: "Data Quality Alert",
    description: "Missing emission factors for 2 new suppliers",
    time: "6 hours ago",
    user: "System",
    icon: AlertTriangle,
    iconBg: "bg-carbon-medium/10",
    iconColor: "text-carbon-medium",
  },
  {
    id: 4,
    type: "processing",
    title: "Invoice Processing Complete",
    description: "125 purchase invoices analyzed and categorized",
    time: "Yesterday",
    user: "Alex C.",
    icon: Clock,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

export function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="chart-container"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground">
            Latest data updates and validations
          </p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            className="flex gap-3"
          >
            <div
              className={`w-9 h-9 rounded-lg ${activity.iconBg} flex items-center justify-center shrink-0`}
            >
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {activity.user}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
