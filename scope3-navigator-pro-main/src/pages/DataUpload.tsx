import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload as UploadIcon,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertTriangle,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "success" | "error";
  progress: number;
  records?: number;
  errors?: number;
}

interface ManualEntry {
  id: string;
  supplierName: string;
  category: string;
  material: string;
  quantity: string;
  unit: string;
  transportMode: string;
  origin: string;
  destination: string;
}

const DataUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([
    {
      id: "1",
      supplierName: "",
      category: "",
      material: "",
      quantity: "",
      unit: "kg",
      transportMode: "",
      origin: "",
      destination: "",
    },
  ]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (selectedFiles: File[]) => {
    const newFiles: UploadedFile[] = selectedFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading" as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "processing" } : f
          )
        );
        
        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? {
                    ...f,
                    status: Math.random() > 0.2 ? "success" : "error",
                    records: Math.floor(Math.random() * 500) + 50,
                    errors: Math.floor(Math.random() * 10),
                  }
                : f
            )
          );
        }, 1500);
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const addManualEntry = () => {
    setManualEntries((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        supplierName: "",
        category: "",
        material: "",
        quantity: "",
        unit: "kg",
        transportMode: "",
        origin: "",
        destination: "",
      },
    ]);
  };

  const removeManualEntry = (id: string) => {
    if (manualEntries.length > 1) {
      setManualEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const updateManualEntry = (id: string, field: keyof ManualEntry, value: string) => {
    setManualEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type.includes("spreadsheet") || type.includes("excel") || type.includes("csv")) {
      return <FileSpreadsheet className="w-5 h-5 text-carbon-low" />;
    }
    return <FileText className="w-5 h-5 text-primary" />;
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <p className="mt-1 text-muted-foreground">
            Upload emission data files or enter data manually
          </p>
        </motion.div>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="upload" className="data-[state=active]:bg-card">
            File Upload
          </TabsTrigger>
          <TabsTrigger value="manual" className="data-[state=active]:bg-card">
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* Drop Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "relative rounded-xl border-2 border-dashed p-12 transition-all",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <UploadIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Supports CSV, Excel (.xlsx, .xls), and PDF files. We'll automatically
                extract and map emission data from purchase orders, invoices, and
                supplier reports.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <span className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  CSV
                </span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  Excel
                </span>
                <span className="px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                  PDF
                </span>
              </div>
            </div>
          </motion.div>

          {/* Uploaded Files */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-medium text-foreground">
                  Uploaded Files ({files.length})
                </h3>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
                  >
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      {file.status === "uploading" && (
                        <div className="mt-2">
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${file.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Uploading... {Math.round(file.progress)}%
                          </p>
                        </div>
                      )}
                      {file.status === "processing" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Processing and extracting data...
                        </p>
                      )}
                      {file.status === "success" && (
                        <p className="text-xs text-carbon-low mt-1">
                          ✓ {file.records} records extracted
                          {file.errors ? `, ${file.errors} warnings` : ""}
                        </p>
                      )}
                      {file.status === "error" && (
                        <p className="text-xs text-carbon-critical mt-1">
                          Failed to process file. Please check format.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "success" && (
                        <CheckCircle2 className="w-5 h-5 text-carbon-low" />
                      )}
                      {file.status === "error" && (
                        <AlertTriangle className="w-5 h-5 text-carbon-critical" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Template Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl bg-muted/30 border border-border"
          >
            <h3 className="font-semibold text-foreground mb-2">
              Need a template?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Download our standardized templates to ensure your data is correctly
              formatted for automatic processing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Procurement Data Template
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Logistics Data Template
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Supplier Profile Template
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="chart-container"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Manual Data Entry
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter procurement and logistics data directly
                </p>
              </div>
              <Button onClick={addManualEntry} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>

            <div className="space-y-4">
              {manualEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg border border-border bg-muted/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      Entry #{index + 1}
                    </span>
                    {manualEntries.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeManualEntry(entry.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`supplier-${entry.id}`}>Supplier Name</Label>
                      <Input
                        id={`supplier-${entry.id}`}
                        placeholder="e.g., Global Steel Corp"
                        value={entry.supplierName}
                        onChange={(e) =>
                          updateManualEntry(entry.id, "supplierName", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`category-${entry.id}`}>Category</Label>
                      <Select
                        value={entry.category}
                        onValueChange={(value) =>
                          updateManualEntry(entry.id, "category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="raw-materials">Raw Materials</SelectItem>
                          <SelectItem value="components">Components</SelectItem>
                          <SelectItem value="packaging">Packaging</SelectItem>
                          <SelectItem value="logistics">Logistics</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`material-${entry.id}`}>Material</Label>
                      <Input
                        id={`material-${entry.id}`}
                        placeholder="e.g., Steel Coils"
                        value={entry.material}
                        onChange={(e) =>
                          updateManualEntry(entry.id, "material", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${entry.id}`}>Quantity</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`quantity-${entry.id}`}
                          type="number"
                          placeholder="0"
                          value={entry.quantity}
                          onChange={(e) =>
                            updateManualEntry(entry.id, "quantity", e.target.value)
                          }
                          className="flex-1"
                        />
                        <Select
                          value={entry.unit}
                          onValueChange={(value) =>
                            updateManualEntry(entry.id, "unit", value)
                          }
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">kg</SelectItem>
                            <SelectItem value="t">t</SelectItem>
                            <SelectItem value="pcs">pcs</SelectItem>
                            <SelectItem value="m3">m³</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`transport-${entry.id}`}>Transport Mode</Label>
                      <Select
                        value={entry.transportMode}
                        onValueChange={(value) =>
                          updateManualEntry(entry.id, "transportMode", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="road">Road</SelectItem>
                          <SelectItem value="rail">Rail</SelectItem>
                          <SelectItem value="sea">Sea</SelectItem>
                          <SelectItem value="air">Air</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`origin-${entry.id}`}>Origin</Label>
                      <Input
                        id={`origin-${entry.id}`}
                        placeholder="e.g., Shanghai, CN"
                        value={entry.origin}
                        onChange={(e) =>
                          updateManualEntry(entry.id, "origin", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`destination-${entry.id}`}>Destination</Label>
                      <Input
                        id={`destination-${entry.id}`}
                        placeholder="e.g., Rotterdam, NL"
                        value={entry.destination}
                        onChange={(e) =>
                          updateManualEntry(entry.id, "destination", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <Button variant="outline">Save as Draft</Button>
              <Button>Calculate Emissions</Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default DataUpload;
