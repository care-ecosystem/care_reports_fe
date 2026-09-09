import type {
  ReportTemplateConfig,
  DashboardLink,
  DashboardLinksStore,
} from "@/types/reports";

const TEMPLATE_KEY = "care_reports_template_config";
const DASHBOARDS_KEY = "care_reports_dashboards";

// ===== Template Configuration =====

/**
 * Get template configuration from localStorage
 * @returns Template config or null if not found
 */
export const getTemplateConfig = (): ReportTemplateConfig | null => {
  try {
    const data = localStorage.getItem(TEMPLATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to read template config:", error);
    return null;
  }
};

/**
 * Save template configuration to localStorage
 * @param config Template configuration to save
 */
export const saveTemplateConfig = (config: ReportTemplateConfig): void => {
  try {
    config.updatedAt = new Date().toISOString();
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save template config:", error);
    throw new Error("Failed to save configuration. Storage may be full.");
  }
};

/**
 * Get default template configuration
 * @returns Default template config
 */
export const getDefaultTemplateConfig = (): ReportTemplateConfig => {
  return {
    version: "1.0",
    header: {
      text: "",
      primaryLogo: { dataUrl: "", alt: "", position: "left" },
    },
    description: { text: "" },
    footer: { text: "" },
    preview: {},
    updatedAt: new Date().toISOString(),
  };
};

// ===== Dashboard Links =====

/**
 * Get all dashboard links from localStorage
 * @returns Array of dashboard links
 */
export const getDashboards = (): DashboardLink[] => {
  try {
    const data = localStorage.getItem(DASHBOARDS_KEY);
    if (!data) return [];
    const store: DashboardLinksStore = JSON.parse(data);
    return store.dashboards || [];
  } catch (error) {
    console.error("Failed to read dashboards:", error);
    return [];
  }
};

/**
 * Save dashboards array to localStorage
 * @param dashboards Array of dashboard links to save
 */
export const saveDashboards = (dashboards: DashboardLink[]): void => {
  try {
    const store: DashboardLinksStore = {
      version: "1.0",
      dashboards,
    };
    localStorage.setItem(DASHBOARDS_KEY, JSON.stringify(store));
  } catch (error) {
    console.error("Failed to save dashboards:", error);
    throw new Error("Failed to save dashboards. Storage may be full.");
  }
};

/**
 * Add a new dashboard link
 * @param dashboard Dashboard data (without id, createdAt, updatedAt)
 * @returns The created dashboard with generated fields
 */
export const addDashboard = (
  dashboard: Omit<DashboardLink, "id" | "createdAt" | "updatedAt">,
): DashboardLink => {
  const dashboards = getDashboards();
  const newDashboard: DashboardLink = {
    ...dashboard,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dashboards.push(newDashboard);
  saveDashboards(dashboards);
  return newDashboard;
};

/**
 * Update an existing dashboard link
 * @param id Dashboard ID
 * @param updates Partial dashboard data to update
 */
export const updateDashboard = (
  id: string,
  updates: Partial<DashboardLink>,
): void => {
  const dashboards = getDashboards();
  const index = dashboards.findIndex((d) => d.id === id);
  if (index !== -1) {
    dashboards[index] = {
      ...dashboards[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveDashboards(dashboards);
  } else {
    throw new Error(`Dashboard with id ${id} not found`);
  }
};

/**
 * Delete a dashboard link
 * @param id Dashboard ID to delete
 */
export const deleteDashboard = (id: string): void => {
  const dashboards = getDashboards().filter((d) => d.id !== id);
  saveDashboards(dashboards);
};

/**
 * Check if localStorage is available
 * @returns true if localStorage is available
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};
