// Route constants for Care Reports Plugin

export const ROUTES = {
  // Admin routes
  ADMIN: {
    CONFIGURATION: "/facility/:facilityId/reports/configuration",
  },

  // User routes
  REPORTS: {
    GENERATE: "/facility/:facilityId/reports/generate",
    PREVIEW: "/facility/:facilityId/reports/preview",
  },
} as const;

// Navigation items configuration
export const NAVIGATION = {
  // Main sidebar navigation (all authenticated users)
  MAIN: [
    {
      key: "generate_report",
      url: "reports/generate",
      translationKey: "reports_generate",
      defaultName: "Generate Report",
    },
     {
      key: "configure_templates",
      url: "reports/configuration",
      translationKey: "reports_configuration",
      defaultName: "Report Configuration",
    },
  ],

  // Admin sidebar navigation
  ADMIN: [
    // {
    //   key: "configure_templates",
    //   url: "/facility/:facilityId/reports/configuration",
    //   translationKey: "reports_configuration",
    //   defaultName: "Report Configuration",
    // },
  ],
} as const;

// Helper to get route paths
export const getRoutePath = {
  adminConfiguration: (facilityId: string) =>
    `/facility/${facilityId}/reports/configuration`,

  generateReport: (facilityId: string) =>
    `/facility/${facilityId}/reports/generate`,

  previewReport: (facilityId: string, dashboardUrl?: string, cardId?: string, cardName?: string, dashboardName?: string) => {
    const params = new URLSearchParams();
    if (dashboardUrl) params.set("dashboardUrl", dashboardUrl);
    if (cardId) params.set("cardId", cardId);
    if (cardName) params.set("cardName", cardName);
    if (dashboardName) params.set("dashboardName", dashboardName);
    const query = params.toString();
    const basePath = `/facility/${facilityId}/reports/preview`;
    return query ? `${basePath}?${query}` : basePath;
  },
} as const;
