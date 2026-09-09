import { useState, useEffect } from "react";
import { Settings, FileText, Upload, X, Plus, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  getTemplateConfig,
  saveTemplateConfig,
  getDefaultTemplateConfig,
  getDashboards,
  addDashboard,
  updateDashboard,
  deleteDashboard,
} from "@/lib/storage";
import { convertImageToBase64, validateImageFile } from "@/lib/imageUtils";
import { isValidMetabaseUrl } from "@/lib/urlUtils";
import type { ReportTemplateConfig, DashboardLink, LogoPosition, MetabaseConfig } from "@/types/reports";

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState<"template" | "dashboards">("template");

  // Template state
  const [config, setConfig] = useState<ReportTemplateConfig>(getDefaultTemplateConfig());
  const [isLoading, setIsLoading] = useState(true);

  // Dashboard state
  const [dashboards, setDashboards] = useState<DashboardLink[]>([]);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<DashboardLink | null>(null);

  // Load data on mount
  useEffect(() => {
    const savedConfig = getTemplateConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    } else {
      // Initialize with default if no saved config
      setConfig(getDefaultTemplateConfig());
    }
    setDashboards(getDashboards());
    setIsLoading(false);
  }, []);

  // Save template configuration
  const handleSaveTemplate = () => {
    try {
      saveTemplateConfig(config);
      toast.success("Configuration saved successfully!");
    } catch (error) {
      toast.error("Failed to save configuration");
      console.error(error);
    }
  };

  // Reset template to defaults
  const handleResetTemplate = () => {
    if (confirm("Are you sure you want to reset to default configuration?")) {
      setConfig(getDefaultTemplateConfig());
      toast.success("Reset to defaults");
    }
  };

  // Handle logo upload
  const handleLogoUpload = async (
    file: File,
    type: "primary" | "secondary",
  ) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    try {
      const dataUrl = await convertImageToBase64(file);
      if (type === "primary") {
        setConfig({
          ...config,
          header: {
            ...config.header,
            primaryLogo: {
              ...config.header.primaryLogo,
              dataUrl,
              alt: file.name,
            },
          },
        });
      } else {
        setConfig({
          ...config,
          header: {
            ...config.header,
            secondaryLogo: {
              dataUrl,
              alt: file.name,
              position: "right",
            },
          },
        });
      }
      toast.success("Logo uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload logo");
      console.error(error);
    }
  };

  // Handle logo removal
  const handleRemoveLogo = (type: "primary" | "secondary") => {
    if (type === "primary") {
      setConfig({
        ...config,
        header: {
          ...config.header,
          primaryLogo: { dataUrl: "", alt: "", position: "left" },
        },
      });
    } else {
      setConfig({
        ...config,
        header: {
          ...config.header,
          secondaryLogo: undefined,
        },
      });
    }
    toast.success("Logo removed");
  };

  // Save dashboard
  const handleSaveDashboard = (dashboard: Omit<DashboardLink, "id" | "createdAt" | "updatedAt">) => {
    try {
      if (editingDashboard) {
        updateDashboard(editingDashboard.id, dashboard);
        toast.success("Dashboard updated successfully");
      } else {
        addDashboard(dashboard);
        toast.success("Dashboard added successfully");
      }
      setDashboards(getDashboards());
      setShowDashboardModal(false);
      setEditingDashboard(null);
    } catch (error) {
      toast.error("Failed to save dashboard");
      console.error(error);
    }
  };

  // Delete dashboard
  const handleDeleteDashboard = (id: string) => {
    if (confirm("Are you sure you want to delete this dashboard?")) {
      deleteDashboard(id);
      setDashboards(getDashboards());
      toast.success("Dashboard deleted");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="size-6" />
          Report Configuration
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("template")}
            className={`pb-3 px-1 border-b-2 font-medium ${
              activeTab === "template"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Template Configuration
          </button>
          <button
            onClick={() => setActiveTab("dashboards")}
            className={`pb-3 px-1 border-b-2 font-medium ${
              activeTab === "dashboards"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Dashboard Links
          </button>
        </div>
      </div>

      {/* Template Configuration Tab */}
      {activeTab === "template" && (
        <div className="space-y-6">
          {/* Metabase Settings Section */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Metabase Settings</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Connection Mode</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="metabase-mode"
                    value="direct"
                    checked={config.metabase?.mode === "direct"}
                    onChange={(e) => setConfig({
                      ...config,
                      metabase: { ...config.metabase, mode: "direct" }
                    })}
                    className="text-blue-600"
                  />
                  <span>Direct (Public URL)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="metabase-mode"
                    value="proxy"
                    checked={config.metabase?.mode === "proxy"}
                    onChange={(e) => setConfig({
                      ...config,
                      metabase: { ...config.metabase, mode: "proxy" }
                    })}
                    className="text-blue-600"
                  />
                  <span>Proxy</span>
                </label>
              </div>
            </div>

            {config.metabase?.mode === "proxy" && (
              <div>
                <label className="block text-sm font-medium mb-2">Proxy URL</label>
                <input
                  type="url"
                  value={config.metabase?.proxyUrl || ""}
                  onChange={(e) => setConfig({
                    ...config,
                    metabase: { ...config.metabase, proxyUrl: e.target.value }
                  })}
                  className="w-full border rounded p-2"
                  placeholder="https://metabase-proxy.care-ecosystem.workers.dev/"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the proxy server URL that handles Metabase API requests
                </p>
              </div>
            )}
          </div>

          {/* Header Section */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Header Configuration</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Header Text</label>
              <textarea
                value={config.header.text}
                onChange={(e) => setConfig({
                  ...config,
                  header: { ...config.header, text: e.target.value }
                })}
                className="w-full border rounded p-2"
                rows={2}
                placeholder="Government of Kerala - District Hospital Dashboard"
              />
            </div>

            {/* Logo Upload */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Primary Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Primary Logo</label>
                {config.header.primaryLogo.dataUrl ? (
                  <div className="space-y-2">
                    <img
                      src={config.header.primaryLogo.dataUrl}
                      alt={config.header.primaryLogo.alt}
                      className="h-16 object-contain border rounded p-2"
                    />
                    <button
                      onClick={() => handleRemoveLogo("primary")}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                    <Upload className="size-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Logo</span>
                    <span className="text-xs text-gray-400">PNG, JPG, SVG (max 2MB)</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0], "primary")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Secondary Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Secondary Logo (Optional)</label>
                {config.header.secondaryLogo?.dataUrl ? (
                  <div className="space-y-2">
                    <img
                      src={config.header.secondaryLogo.dataUrl}
                      alt={config.header.secondaryLogo.alt}
                      className="h-16 object-contain border rounded p-2"
                    />
                    <button
                      onClick={() => handleRemoveLogo("secondary")}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove Logo
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                    <Upload className="size-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload Logo</span>
                    <span className="text-xs text-gray-400">PNG, JPG, SVG (max 2MB)</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml"
                      onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0], "secondary")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Logo Position */}
            <div>
              <label className="block text-sm font-medium mb-2">Logo Position</label>
              <div className="flex gap-4">
                {(["left", "center", "right"] as LogoPosition[]).map((pos) => (
                  <label key={pos} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={config.header.primaryLogo.position === pos}
                      onChange={() => setConfig({
                        ...config,
                        header: {
                          ...config.header,
                          primaryLogo: { ...config.header.primaryLogo, position: pos }
                        }
                      })}
                    />
                    <span className="capitalize">{pos}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Description</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Report Description</label>
              <textarea
                value={config.description.text}
                onChange={(e) => setConfig({
                  ...config,
                  description: { ...config.description, text: e.target.value }
                })}
                className="w-full border rounded p-2"
                rows={3}
                placeholder="This dashboard provides real-time insights..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subtitle (Optional)</label>
              <input
                type="text"
                value={config.description.subtitle || ""}
                onChange={(e) => setConfig({
                  ...config,
                  description: { ...config.description, subtitle: e.target.value }
                })}
                className="w-full border rounded p-2"
                placeholder="Generated on: {date}"
              />
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Footer Configuration</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Footer Text</label>
              <textarea
                value={config.footer.text}
                onChange={(e) => setConfig({
                  ...config,
                  footer: { ...config.footer, text: e.target.value }
                })}
                className="w-full border rounded p-2"
                rows={2}
                placeholder="© 2026 District Hospital, Kerala Health Department"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Information (Optional)</label>
              <input
                type="text"
                value={config.footer.contact || ""}
                onChange={(e) => setConfig({
                  ...config,
                  footer: { ...config.footer, contact: e.target.value }
                })}
                className="w-full border rounded p-2"
                placeholder="Email: admin@hospital.gov.in | Phone: 0484-xxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Disclaimer (Optional)</label>
              <textarea
                value={config.footer.disclaimer || ""}
                onChange={(e) => setConfig({
                  ...config,
                  footer: { ...config.footer, disclaimer: e.target.value }
                })}
                className="w-full border rounded p-2"
                rows={2}
                placeholder="This data is confidential and for authorized use only"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={handleResetTemplate}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
            >
              Reset to Defaults
            </button>
            <button
              onClick={handleSaveTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Links Tab */}
      {activeTab === "dashboards" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Dashboard Links</h2>
            <button
              onClick={() => {
                setEditingDashboard(null);
                setShowDashboardModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Plus className="size-4" />
              Add Dashboard
            </button>
          </div>

          {dashboards.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="size-12 mx-auto mb-4 text-gray-400" />
              <p>No dashboards configured yet.</p>
              <p className="text-sm">Add your first Metabase dashboard link to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboards.map((dashboard) => (
                <div key={dashboard.id} className="bg-white rounded-lg border p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{dashboard.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          dashboard.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {dashboard.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{dashboard.url}</p>
                      {dashboard.description && (
                        <p className="text-sm text-gray-500">{dashboard.description}</p>
                      )}
                      {dashboard.category && (
                        <span className="text-xs text-gray-500">Category: {dashboard.category}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingDashboard(dashboard);
                          setShowDashboardModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDashboard(dashboard.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dashboard Modal */}
      {showDashboardModal && (
        <DashboardModal
          dashboard={editingDashboard}
          metabaseConfig={config.metabase || { mode: "direct", proxyUrl: undefined }}
          onSave={handleSaveDashboard}
          onClose={() => {
            setShowDashboardModal(false);
            setEditingDashboard(null);
          }}
        />
      )}
    </div>
  );
}

// Dashboard Modal Component
function DashboardModal({
  dashboard,
  metabaseConfig,
  onSave,
  onClose,
}: {
  dashboard: DashboardLink | null;
  metabaseConfig: MetabaseConfig;
  onSave: (dashboard: Omit<DashboardLink, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: dashboard?.name || "",
    url: dashboard?.url || "",
    dashboardId: dashboard?.dashboardId,
    description: dashboard?.description || "",
    category: dashboard?.category || "",
    tags: dashboard?.tags || [],
    status: (dashboard?.status || "active") as "active" | "inactive",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Dashboard name is required");
      return;
    }

    if (metabaseConfig.mode === "direct") {
      if (!formData.url) {
        toast.error("Dashboard URL is required");
        return;
      }
      if (!isValidMetabaseUrl(formData.url)) {
        toast.error("Invalid Metabase URL. Must be a public dashboard URL.");
        return;
      }
    } else {
      // Proxy mode
      if (formData.dashboardId === undefined || formData.dashboardId === null) {
        toast.error("Dashboard ID is required");
        return;
      }
      // For proxy mode, url stores the proxy URL
      formData.url = metabaseConfig.proxyUrl || "";
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {dashboard ? "Edit Dashboard" : "Add Dashboard"}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="size-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dashboard Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="Patient Demographics Dashboard"
                required
              />
            </div>

            {metabaseConfig.mode === "direct" ? (
              <div>
                <label className="block text-sm font-medium mb-1">Metabase Public URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full border rounded p-2"
                  placeholder="https://metabase.../public/dashboard/..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Must be a public Metabase dashboard URL</p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">Dashboard ID *</label>
                <input
                  type="number"
                  value={formData.dashboardId ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    dashboardId: e.target.value ? parseInt(e.target.value, 10) : undefined
                  })}
                  className="w-full border rounded p-2"
                  placeholder="7"
                  min="1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the numeric dashboard ID (e.g., 7)
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded p-2"
                rows={3}
                placeholder="Shows patient distribution by age, gender..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="Clinical Reports"
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.status === "active"}
                  onChange={(e) => setFormData({
                    ...formData,
                    status: e.target.checked ? "active" : "inactive"
                  })}
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {dashboard ? "Update" : "Add"} Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
