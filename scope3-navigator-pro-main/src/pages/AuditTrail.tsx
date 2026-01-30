import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileCheck,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  FileText,
  Calculator,
  Database,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const auditTrailData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    action: "Emission Calculation",
    entity: "Global Steel Corp",
    category: "Purchased Goods",
    details: "Calculated Scope 3.1 emissions using spend-based method",
    emissionFactor: "0.52 kgCO₂e/USD",
    source: "DEFRA 2023",
    result: "3,450 tCO₂e",
    user: "System",
    status: "verified",
  },
  {
    id: 2,
    timestamp: "2024-01-15 12:18:42",
    action: "Data Import",
    entity: "Q4 Transportation Data",
    category: "Logistics",
    details: "Imported 342 shipment records from CSV",
    emissionFactor: "N/A",
    source: "User Upload",
    result: "342 records",
    user: "Sarah M.",
    status: "processed",
  },
  {
    id: 3,
    timestamp: "2024-01-14 16:45:23",
    action: "Emission Calculation",
    entity: "TransLogix Shipping",
    category: "Transportation",
    details: "Calculated freight emissions using distance-based method",
    emissionFactor: "0.089 kgCO₂e/tkm",
    source: "GLEC Framework",
    result: "2,890 tCO₂e",
    user: "System",
    status: "verified",
  },
  {
    id: 4,
    timestamp: "2024-01-14 11:22:08",
    action: "Factor Update",
    entity: "Emission Factors Database",
    category: "System",
    details: "Updated to DEFRA 2024 emission factors for UK grid",
    emissionFactor: "Multiple",
    source: "DEFRA 2024",
    result: "156 factors updated",
    user: "Alex C.",
    status: "verified",
  },
  {
    id: 5,
    timestamp: "2024-01-13 09:15:33",
    action: "Data Validation",
    entity: "Pacific Polymers",
    category: "Raw Materials",
    details: "Cross-referenced supplier data with invoice records",
    emissionFactor: "N/A",
    source: "Invoice Verification",
    result: "98% match rate",
    user: "System",
    status: "verified",
  },
  {
    id: 6,
    timestamp: "2024-01-12 15:48:19",
    action: "Scenario Analysis",
    entity: "Supplier Switch Model",
    category: "Analytics",
    details: "Modeled impact of switching top 3 suppliers",
    emissionFactor: "Various",
    source: "What-If Analysis",
    result: "-2,850 tCO₂e potential",
    user: "Sarah M.",
    status: "draft",
  },
];

const statusStyles = {
  verified: {
    bg: "bg-carbon-low/10",
    text: "text-carbon-low",
    icon: CheckCircle2,
  },
  processed: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: Clock,
  },
  draft: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    icon: FileText,
  },
};

const actionIcons = {
  "Emission Calculation": Calculator,
  "Data Import": Database,
  "Factor Update": FileText,
  "Data Validation": CheckCircle2,
  "Scenario Analysis": FileCheck,
};

const AuditTrail = () => {
  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Audit Trail</h1>
          <p className="mt-1 text-muted-foreground">
            Complete transparency on data sources, calculations, and methodologies
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Records", value: "2,847", icon: Database },
          { label: "Verified Calculations", value: "1,456", icon: CheckCircle2 },
          { label: "Data Sources", value: "12", icon: FileText },
          { label: "Last Audit", value: "2 days ago", icon: Clock },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Methodology Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-muted/30 border border-border mb-6"
      >
        <h3 className="font-semibold text-foreground mb-4">
          Calculation Methodology Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Purchased Goods & Services
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Spend-based method using DEFRA emission factors matched to procurement
              categories. Activity data sourced from ERP system.
            </p>
            <a
              href="#"
              className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline"
            >
              View Methodology <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Upstream Transportation
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Distance-based method using GLEC Framework emission factors. Route
              data from logistics providers combined with fuel consumption records.
            </p>
            <a
              href="#"
              className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline"
            >
              View Methodology <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Fuel & Energy Activities
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Average-data method using IEA emission factors for upstream fuel
              production and grid-specific factors for transmission losses.
            </p>
            <a
              href="#"
              className="text-xs text-primary font-medium inline-flex items-center gap-1 hover:underline"
            >
              View Methodology <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Audit Log Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Timestamp</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
              <TableHead className="font-semibold">Entity</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
              <TableHead className="font-semibold">Emission Factor</TableHead>
              <TableHead className="font-semibold">Source</TableHead>
              <TableHead className="font-semibold">Result</TableHead>
              <TableHead className="font-semibold text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditTrailData.map((entry, index) => {
              const ActionIcon =
                actionIcons[entry.action as keyof typeof actionIcons] || FileText;
              const statusStyle =
                statusStyles[entry.status as keyof typeof statusStyles];

              return (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="data-row cursor-pointer"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {entry.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ActionIcon className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">
                        {entry.action}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{entry.entity}</p>
                      <p className="text-xs text-muted-foreground">
                        {entry.category}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">
                      {entry.details}
                    </p>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {entry.emissionFactor}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {entry.source}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {entry.result}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                          statusStyle.bg,
                          statusStyle.text
                        )}
                      >
                        <statusStyle.icon className="w-3 h-3" />
                        {entry.status}
                      </span>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-6 rounded-xl bg-card border border-border"
      >
        <h3 className="font-semibold text-foreground mb-4">
          Compliance Report Export
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Generate audit-ready documentation for regulatory submissions and third-party verification.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <FileCheck className="w-4 h-4 mr-2" />
            GHG Protocol Report
          </Button>
          <Button variant="outline">
            <FileCheck className="w-4 h-4 mr-2" />
            CDP Disclosure
          </Button>
          <Button variant="outline">
            <FileCheck className="w-4 h-4 mr-2" />
            SBTi Progress Report
          </Button>
          <Button variant="outline">
            <FileCheck className="w-4 h-4 mr-2" />
            TCFD Report
          </Button>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default AuditTrail;
