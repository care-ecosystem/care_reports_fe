import { useState, useEffect } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { navigate, useQueryParams } from "raviger";
import { getTemplateConfig, getDefaultTemplateConfig } from "@/lib/storage";
import { getCardData } from "@/lib/metabaseApi";
import { generateReportPDF } from "@/lib/pdfGenerator";
import { printReport } from "@/lib/printService";
import type { ReportTemplateConfig } from "@/types/reports";
import type { MetabaseCardData } from "@/types/metabase";

export default function ReportPreviewPage() {
  const [queryParams] = useQueryParams();
  const dashboardUrl = queryParams.dashboardUrl as string;
  const cardId = parseInt(queryParams.cardId as string);
  const cardName = queryParams.cardName as string;
  const dashboardName = queryParams.dashboardName as string;

  const [templateConfig, setTemplateConfig] = useState<ReportTemplateConfig>(
    getDefaultTemplateConfig()
  );
  const [cardData, setCardData] = useState<MetabaseCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    // Load template config
    const config = getTemplateConfig();
    if (config) {
      setTemplateConfig(config);
    } else {
      setError("Template configuration not found. Please configure the template first.");
      setIsLoading(false);
      return;
    }

    // Load card data
    if (!dashboardUrl || !cardId) {
      setError("Missing dashboard or card information");
      setIsLoading(false);
      return;
    }

    if (!config.metabase) {
      setError("Metabase configuration not found. Please configure the system first.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getCardData(
      config.metabase,
      dashboardUrl,
      cardId
    )
      .then((data) => {
        setCardData(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load card data:", err);
        setError("Failed to load report data. Please try again.");
        toast.error("Failed to load report data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dashboardUrl, cardId]);

  const handleDownloadPDF = async () => {
    if (!cardData) return;

    setIsGenerating(true);
    try {
      await generateReportPDF({
        templateConfig,
        cardData,
        cardName: cardName || "Report",
        dashboardName: dashboardName || "Dashboard",
      });
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    printReport();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-500 mb-2">⏳ Loading report data...</div>
          <div className="text-sm text-gray-400">Fetching data from Metabase...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-xl mb-2">❌ {error}</div>
          <button
            onClick={() => navigate("/reports/generate")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Selection
          </button>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Actions */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center no-print">
        <button
          onClick={() => navigate("/reports/generate")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="size-5" />
          Back to Selection
        </button>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
          >
            <Printer className="size-4" />
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="size-4" />
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm report-preview" id="report-content">
          {/* Header Section */}
          <div className="border-b-2 border-gray-800 p-6 report-header">
            <div className="flex items-start justify-between mb-4">
              {/* Primary Logo */}
              {templateConfig.header.primaryLogo.dataUrl && (
                <img
                  src={templateConfig.header.primaryLogo.dataUrl}
                  alt={templateConfig.header.primaryLogo.alt}
                  className={`h-12 object-contain ${
                    templateConfig.header.primaryLogo.position === "center"
                      ? "mx-auto"
                      : templateConfig.header.primaryLogo.position === "right"
                      ? "ml-auto"
                      : ""
                  }`}
                />
              )}

              {/* Secondary Logo */}
              {templateConfig.header.secondaryLogo?.dataUrl && (
                <img
                  src={templateConfig.header.secondaryLogo.dataUrl}
                  alt={templateConfig.header.secondaryLogo.alt}
                  className="h-12 object-contain ml-auto"
                />
              )}
            </div>

            {templateConfig.header.text && (
              <h1 className="text-2xl font-bold text-gray-900">
                {templateConfig.header.text}
              </h1>
            )}
          </div>

          {/* Description Section */}
          {templateConfig.description.text && (
            <div className="p-6 bg-gray-50 border-b">
              <p className="text-gray-700 whitespace-pre-wrap">
                {templateConfig.description.text}
              </p>
              {templateConfig.description.subtitle && (
                <p className="text-sm text-gray-600 mt-2">
                  {templateConfig.description.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Report Info */}
          <div className="p-6 space-y-2 border-b">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Dashboard</p>
                <p className="font-semibold">{dashboardName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Report</p>
                <p className="font-semibold">{cardName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Generated on</p>
              <p className="font-medium">
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{cardName}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse report-table">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    {cardData.columns.map((col, idx) => (
                      <th
                        key={idx}
                        className="border border-gray-300 px-4 py-2 text-left font-semibold"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cardData.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {cell !== null && cell !== undefined ? String(cell) : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>Total Records:</strong> {cardData.rows.length}
              </p>
              <p>
                <strong>Data as of:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="border-t-2 border-gray-800 p-6 bg-gray-50 report-footer">
            {templateConfig.footer.text && (
              <p className="text-sm text-gray-700 mb-2">
                {templateConfig.footer.text}
              </p>
            )}
            {templateConfig.footer.contact && (
              <p className="text-xs text-gray-600 mb-2">
                {templateConfig.footer.contact}
              </p>
            )}
            {templateConfig.footer.disclaimer && (
              <p className="text-xs text-gray-500 italic">
                ⚠️ {templateConfig.footer.disclaimer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
