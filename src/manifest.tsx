import { Suspense } from "react";
import { Settings, FileText } from "lucide-react";

import ConfigurationPage from "./pages/ConfigurationPage";
import GenerateReportPage from "./pages/GenerateReportPage";
import ReportPreviewPage from "./pages/ReportPreviewPage";
import en from "../public/locale/en.json";

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8 text-gray-500 text-sm">
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const manifest = {
  plugin: "care_reports",

  // i18n translations merged into care_fe's i18n at runtime
  i18n: { en },

  // URL routes handled by this plugin
  routes: {
    // Admin configuration page
    "/admin/reports/configuration": () => (
      <PageWrapper>
        <ConfigurationPage />
      </PageWrapper>
    ),

    // Report generation pages
    "/reports/generate": () => (
      <PageWrapper>
        <GenerateReportPage />
      </PageWrapper>
    ),

    "/reports/preview": () => (
      <PageWrapper>
        <ReportPreviewPage />
      </PageWrapper>
    ),
  },

  // Components care_fe can inject into its own UI
  components: {},

  // Encounter detail page tabs
  encounterTabs: {},

  // Links shown in the main sidebar (all authenticated users)
  navItems: [
    {
      url: "/reports/generate",
      name: "Generate Report",
      icon: <FileText className="size-4" />,
    },
  ],

  // Links shown in the admin sidebar
  adminNavItems: [
    {
      url: "/admin/reports/configuration",
      name: "Report Configuration",
      icon: <Settings className="size-4" />,
    },
  ],

  extends: [],
};

export default manifest;
