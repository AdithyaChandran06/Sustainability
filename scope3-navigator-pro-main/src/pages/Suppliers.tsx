import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Download,
  Plus,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const suppliersData = [
  {
    id: 1,
    name: "Global Steel Corp",
    category: "Raw Materials",
    location: "Shanghai, China",
    emissions: 3450,
    change: 12,
    risk: "high",
    dataQuality: 92,
    lastUpdated: "2024-01-15",
    tier: 1,
  },
  {
    id: 2,
    name: "TransLogix Shipping",
    category: "Logistics",
    location: "Rotterdam, Netherlands",
    emissions: 2890,
    change: -8,
    risk: "medium",
    dataQuality: 85,
    lastUpdated: "2024-01-14",
    tier: 1,
  },
  {
    id: 3,
    name: "Pacific Polymers",
    category: "Raw Materials",
    location: "Osaka, Japan",
    emissions: 2340,
    change: 5,
    risk: "medium",
    dataQuality: 78,
    lastUpdated: "2024-01-12",
    tier: 2,
  },
  {
    id: 4,
    name: "EcoPackage Solutions",
    category: "Packaging",
    location: "Berlin, Germany",
    emissions: 1890,
    change: -15,
    risk: "low",
    dataQuality: 95,
    lastUpdated: "2024-01-15",
    tier: 1,
  },
  {
    id: 5,
    name: "Northern Electronics",
    category: "Components",
    location: "Seoul, South Korea",
    emissions: 1650,
    change: 3,
    risk: "low",
    dataQuality: 88,
    lastUpdated: "2024-01-13",
    tier: 2,
  },
  {
    id: 6,
    name: "Coastal Freight Ltd",
    category: "Logistics",
    location: "Singapore",
    emissions: 1420,
    change: -12,
    risk: "low",
    dataQuality: 91,
    lastUpdated: "2024-01-14",
    tier: 1,
  },
  {
    id: 7,
    name: "Nordic Metals AS",
    category: "Raw Materials",
    location: "Oslo, Norway",
    emissions: 980,
    change: -22,
    risk: "low",
    dataQuality: 97,
    lastUpdated: "2024-01-15",
    tier: 2,
  },
  {
    id: 8,
    name: "Midwest Chemicals",
    category: "Raw Materials",
    location: "Chicago, USA",
    emissions: 890,
    change: 8,
    risk: "medium",
    dataQuality: 72,
    lastUpdated: "2024-01-10",
    tier: 3,
  },
];

const riskStyles = {
  low: {
    badge: "bg-carbon-low/10 text-carbon-low border-carbon-low/20",
    dot: "bg-carbon-low",
  },
  medium: {
    badge: "bg-carbon-medium/10 text-carbon-medium border-carbon-medium/20",
    dot: "bg-carbon-medium",
  },
  high: {
    badge: "bg-carbon-critical/10 text-carbon-critical border-carbon-critical/20",
    dot: "bg-carbon-critical",
  },
};

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredSuppliers = suppliersData.filter((supplier) => {
    const matchesSearch = supplier.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || supplier.category === categoryFilter;
    const matchesRisk = riskFilter === "all" || supplier.risk === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const totalEmissions = filteredSuppliers.reduce(
    (sum, s) => sum + s.emissions,
    0
  );

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Supplier Management
          </h1>
          <p className="mt-1 text-muted-foreground">
            Monitor and manage supplier emission profiles
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Suppliers",
            value: suppliersData.length,
            icon: Building2,
          },
          {
            label: "Total Emissions",
            value: `${(totalEmissions / 1000).toFixed(1)}k tCO₂e`,
            icon: TrendingUp,
          },
          {
            label: "High Risk",
            value: suppliersData.filter((s) => s.risk === "high").length,
            icon: AlertTriangle,
            variant: "warning",
          },
          {
            label: "Avg Data Quality",
            value: `${Math.round(suppliersData.reduce((sum, s) => sum + s.dataQuality, 0) / suppliersData.length)}%`,
            icon: CheckCircle2,
            variant: "success",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  stat.variant === "warning"
                    ? "bg-carbon-medium/10"
                    : stat.variant === "success"
                    ? "bg-carbon-low/10"
                    : "bg-primary/10"
                )}
              >
                <stat.icon
                  className={cn(
                    "w-5 h-5",
                    stat.variant === "warning"
                      ? "text-carbon-medium"
                      : stat.variant === "success"
                      ? "text-carbon-low"
                      : "text-primary"
                  )}
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Raw Materials">Raw Materials</SelectItem>
            <SelectItem value="Logistics">Logistics</SelectItem>
            <SelectItem value="Components">Components</SelectItem>
            <SelectItem value="Packaging">Packaging</SelectItem>
          </SelectContent>
        </Select>
        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="font-semibold">Supplier</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold text-right">
                Emissions (tCO₂e)
              </TableHead>
              <TableHead className="font-semibold text-center">Trend</TableHead>
              <TableHead className="font-semibold text-center">Risk</TableHead>
              <TableHead className="font-semibold text-center">
                Data Quality
              </TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier, index) => (
              <motion.tr
                key={supplier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="data-row cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {supplier.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tier {supplier.tier}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {supplier.category}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {supplier.location}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {supplier.emissions.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div
                    className={cn(
                      "flex items-center justify-center gap-1 text-sm font-medium",
                      supplier.change > 0
                        ? "text-carbon-critical"
                        : "text-carbon-low"
                    )}
                  >
                    {supplier.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {supplier.change > 0 ? "+" : ""}
                    {supplier.change}%
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border capitalize",
                        riskStyles[supplier.risk as keyof typeof riskStyles]
                          .badge
                      )}
                    >
                      {supplier.risk}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          supplier.dataQuality >= 90
                            ? "bg-carbon-low"
                            : supplier.dataQuality >= 75
                            ? "bg-carbon-medium"
                            : "bg-carbon-high"
                        )}
                        style={{ width: `${supplier.dataQuality}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {supplier.dataQuality}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(supplier.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </AppLayout>
  );
};

export default Suppliers;
