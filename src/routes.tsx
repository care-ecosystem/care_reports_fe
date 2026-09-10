// Routes for Care Reports Plugin

import ConfigurationPage from "./pages/ConfigurationPage";
import GenerateReportPage from "./pages/GenerateReportPage";
import ReportPreviewPage from "./pages/ReportPreviewPage";

const routes = {
  // Admin configuration page
  "/admin/reports/configuration": () => <ConfigurationPage />,

  // Report generation pages
  "/reports/generate": () => <GenerateReportPage />,
  "/reports/preview": () => <ReportPreviewPage />,
};

export default routes;
