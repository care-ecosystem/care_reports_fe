// Route constants for Care Reports Plugin

export const ROUTES = {
  // Admin routes
  ADMIN: {
    CONFIGURATION: "/admin/reports/configuration",
  },

  // User routes
  REPORTS: {
    GENERATE: "reports/generate",
    PREVIEW: "/reports/preview",
  },
} as const;

// Navigation items configuration
export const NAVIGATION = {
  // Main sidebar navigation (all authenticated users)
  MAIN: [
    {
      key: "generate_report",
      url: ROUTES.REPORTS.GENERATE,
      translationKey: "reports_generate",
      defaultName: "Generate Report",
    },
  ],

  // Admin sidebar navigation
  ADMIN: [
    {
      key: "configure_templates",
      url: ROUTES.ADMIN.CONFIGURATION,
      translationKey: "reports_configuration",
      defaultName: "Report Configuration",
    },
  ],
} as const;

// Helper to get route paths
export const getRoutePath = {
  adminConfiguration: () => ROUTES.ADMIN.CONFIGURATION,
  generateReport: () => ROUTES.REPORTS.GENERATE,
  previewReport: (dashboardId?: string, cardId?: string) => {
    const params = new URLSearchParams();
    if (dashboardId) params.set("dashboardId", dashboardId);
    if (cardId) params.set("cardId", cardId);
    const query = params.toString();
    return query ? `${ROUTES.REPORTS.PREVIEW}?${query}` : ROUTES.REPORTS.PREVIEW;
  },
} as const;
