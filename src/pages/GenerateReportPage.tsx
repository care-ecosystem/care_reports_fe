import { useState, useEffect } from "react";
import { FileText, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { navigate } from "raviger";
import { getDashboards, getTemplateConfig, getDefaultTemplateConfig } from "@/lib/storage";
import { getDashboardCards, getCardDataPreview } from "@/lib/metabaseApi";
import { getRoutePath } from "@/constants/routes";
import type { DashboardLink, ReportTemplateConfig } from "@/types/reports";
import type { MetabaseCard, CardDataPreview } from "@/types/metabase";

interface Props {
  facilityId: string;
}

export default function GenerateReportPage({ facilityId }: Props) {
  const [config, setConfig] = useState<ReportTemplateConfig>(getDefaultTemplateConfig());
  const [dashboards, setDashboards] = useState<DashboardLink[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardLink | null>(null);
  const [availableCards, setAvailableCards] = useState<MetabaseCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MetabaseCard | null>(null);
  const [cardPreview, setCardPreview] = useState<CardDataPreview | null>(null);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Load config and dashboards on mount
  useEffect(() => {
    const savedConfig = getTemplateConfig();
    if (savedConfig) {
      setConfig(savedConfig);
    } else {
      // Initialize with default if no saved config
      setConfig(getDefaultTemplateConfig());
    }
    const allDashboards = getDashboards();
    const activeDashboards = allDashboards.filter(d => d.status === "active");
    setDashboards(activeDashboards);
  }, []);

  // Load cards when dashboard is selected
  useEffect(() => {
    if (!selectedDashboard) {
      setAvailableCards([]);
      setSelectedCard(null);
      setCardPreview(null);
      return;
    }

    if (!config.metabase) {
      toast.error("Metabase configuration not found. Please configure the system first.");
      return;
    }

    setIsLoadingCards(true);
    getDashboardCards(
      config.metabase,
      selectedDashboard.url,
      selectedDashboard.dashboardId
    )
      .then((cards) => {
        setAvailableCards(cards);
        if (cards.length === 0) {
          toast.error("No table visualizations found in this dashboard");
        }
      })
      .catch((error) => {
        console.error("Failed to load dashboard cards:", error);
        toast.error("Failed to load dashboard. Please check the configuration.");
        setAvailableCards([]);
      })
      .finally(() => {
        setIsLoadingCards(false);
      });
  }, [selectedDashboard, config.metabase]);

  // Load preview when card AND dates are selected
  useEffect(() => {
    if (!selectedCard || !selectedDashboard) {
      setCardPreview(null);
      return;
    }

    // Wait for dates to be selected before loading preview
    if (!dateFrom || !dateTo) {
      setCardPreview(null);
      return;
    }

    if (!config.metabase) {
      toast.error("Metabase configuration not found. Please configure the system first.");
      return;
    }

    setIsLoadingPreview(true);
    getCardDataPreview(
      config.metabase,
      selectedDashboard.url,
      selectedCard.card_id,
      dateFrom,
      dateTo,
      selectedDashboard.dateFieldName
    )
      .then((preview) => {
        setCardPreview(preview);
      })
      .catch((error) => {
        console.error("Failed to load preview:", error);
        toast.error("Failed to load data preview");
        setCardPreview(null);
      })
      .finally(() => {
        setIsLoadingPreview(false);
      });
  }, [selectedCard, selectedDashboard, dateFrom, dateTo, config.metabase]);

  const handlePreviewReport = () => {
    if (!selectedDashboard || !selectedCard) {
      toast.error("Please select both dashboard and report");
      return;
    }

    if (!dateFrom || !dateTo) {
      toast.error("Please select date range (From and To dates)");
      return;
    }

    // Validate date range
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    if (fromDate > toDate) {
      toast.error("'From' date must be before 'To' date");
      return;
    }

    // Navigate to preview page with dashboard, card IDs, and date range
    const params = new URLSearchParams({
      dashboardUrl: selectedDashboard.url,
      cardId: selectedCard.card_id.toString(),
      cardName: selectedCard.card.name,
      dashboardName: selectedDashboard.name,
      dateFrom,
      dateTo,
    });

    // Add date field name if available
    if (selectedDashboard.dateFieldName) {
      params.set("dateFieldName", selectedDashboard.dateFieldName);
    }

    navigate(`/facility/${facilityId}/reports/preview?${params.toString()}`);
  };

  if (dashboards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <FileText className="size-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">No Dashboards Configured</h2>
          <p className="text-gray-600 mb-4">
            You haven't configured any dashboard links yet.
          </p>
          <p className="text-gray-600 mb-6">
            Please add dashboards in the configuration page before generating reports.
          </p>
          <button
            onClick={() => navigate(getRoutePath.adminConfiguration(facilityId))}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 bg-primary-700 text-white shadow-sm hover:bg-primary-700/90 rounded-md text-sm font-semibold transition-colors"
          >
            Go to Configuration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="size-6" />
          Generate Report
        </h1>
        <p className="text-gray-600 mt-1">
          Select a dashboard and table to generate a branded PDF report
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Select Dashboard */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Step 1: Select Dashboard</h2>

          <div>
            <label className="block text-sm font-medium mb-2">Dashboard *</label>
            <select
              value={selectedDashboard?.id || ""}
              onChange={(e) => {
                const dashboard = dashboards.find((d) => d.id === e.target.value);
                setSelectedDashboard(dashboard || null);
                setSelectedCard(null);
              }}
              className="w-full border rounded p-2"
            >
              <option value="">Select a dashboard...</option>
              {dashboards.map((dashboard) => (
                <option key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </option>
              ))}
            </select>

            {selectedDashboard?.description && (
              <p className="mt-2 text-sm text-gray-600 flex items-start gap-2">
                <span className="text-blue-500">ℹ️</span>
                {selectedDashboard.description}
              </p>
            )}
          </div>
        </div>

        {/* Step 2: Select Data Source */}
        {selectedDashboard && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Step 2: Select Data Source</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Report Table/Chart *</label>

              {isLoadingCards ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-500">Loading available reports...</div>
                </div>
              ) : availableCards.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800">
                  ⚠️ No table visualizations found in this dashboard.
                  Please select a different dashboard or add table visualizations to your Metabase dashboard.
                </div>
              ) : (
                <select
                  value={selectedCard?.id || ""}
                  onChange={(e) => {
                    const card = availableCards.find((c) => c.id === parseInt(e.target.value));
                    setSelectedCard(card || null);
                  }}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select a table/chart...</option>
                  {availableCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.card.name} ({card.card.display})
                    </option>
                  ))}
                </select>
              )}

              {selectedCard && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      📊 {selectedCard.card.display}
                    </span>
                    <span className="text-gray-600">Type: {selectedCard.card.display}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✅ Selected! Now choose a date range to preview the data.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Date Filter */}
        {selectedCard && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Step 3: Select Date Range *</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From Date *</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  max={dateTo || undefined}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">To Date *</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  min={dateFrom || undefined}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>

            {dateFrom && dateTo && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                <span className="text-blue-800">
                  📅 Report will include data from <strong>{new Date(dateFrom).toLocaleDateString()}</strong> to <strong>{new Date(dateTo).toLocaleDateString()}</strong>
                </span>
              </div>
            )}
          </div>
        )}

        {/* Data Preview */}
        {dateFrom && dateTo && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Data Preview</h2>

            {isLoadingPreview ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-gray-500">Loading filtered data preview...</div>
              </div>
            ) : cardPreview ? (
              <div className="space-y-4">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-gray-600">📈 </span>
                    <span className="font-semibold">{cardPreview.totalRows} rows</span>
                  </div>
                  <div>
                    <span className="text-gray-600">|</span>
                  </div>
                  <div>
                    <span className="font-semibold">{cardPreview.totalColumns} columns</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Columns:</p>
                  <div className="flex flex-wrap gap-2">
                    {cardPreview.columns.map((col, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Sample Data (first 5 rows):</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                      <thead>
                        <tr className="bg-gray-50">
                          {cardPreview.columns.map((col, idx) => (
                            <th key={idx} className="border px-3 py-2 text-left font-semibold">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cardPreview.sampleRows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="border px-3 py-2">
                                {cell !== null && cell !== undefined ? String(cell) : "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {cardPreview.totalRows > 5 && (
                    <p className="text-sm text-gray-500 mt-2">
                      ... and {cardPreview.totalRows - 5} more rows
                    </p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Preview Button */}
        {selectedDashboard && selectedCard && cardPreview && (
          <div className="flex justify-end">
            <button
              onClick={handlePreviewReport}
              disabled={!dateFrom || !dateTo}
              className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 bg-primary-700 text-white shadow-sm hover:bg-primary-700/90 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Preview Report
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
