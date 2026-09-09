import { Suspense } from "react";
import { Settings, FileText } from "lucide-react";

import ConfigurationPage from "./pages/ConfigurationPage";
import GenerateReportPage from "./pages/GenerateReportPage";
import ReportPreviewPage from "./pages/ReportPreviewPage";
import { ROUTES, NAVIGATION } from "./constants/routes";
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
    [ROUTES.ADMIN.CONFIGURATION]: () => (
      <PageWrapper>
        <ConfigurationPage />
      </PageWrapper>
    ),

    // Report generation pages
    [ROUTES.REPORTS.GENERATE]: () => (
      <PageWrapper>
        <GenerateReportPage />
      </PageWrapper>
    ),

    [ROUTES.REPORTS.PREVIEW]: () => (
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
      url: NAVIGATION.MAIN[0].url,
      name: NAVIGATION.MAIN[0].defaultName,
      icon: <FileText className="size-4" />,
    },
  ],

  // Links shown in the admin sidebar
  adminNavItems: [
    {
      url: NAVIGATION.ADMIN[0].url,
      name: NAVIGATION.ADMIN[0].defaultName,
      icon: <Settings className="size-4" />,
    },
  ],

  extends: [],
};

export default manifest;
