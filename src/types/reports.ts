// Report Template & Dashboard Link Types

export type LogoPosition = "left" | "center" | "right";
export type DashboardStatus = "active" | "inactive";
export type MetabaseMode = "direct" | "proxy";

export interface Logo {
  dataUrl: string; // Base64 data URL
  alt: string;
  position: LogoPosition;
}

export interface MetabaseConfig {
  mode: MetabaseMode;
  proxyUrl?: string; // Only for proxy mode
}

export interface ReportTemplateConfig {
  version: string;
  metabase: MetabaseConfig;
  header: {
    text: string;
    primaryLogo: Logo;
    secondaryLogo?: Logo;
  };
  description: {
    text: string;
    subtitle?: string;
  };
  footer: {
    text: string;
    contact?: string;
    disclaimer?: string;
  };
  preview: {
    defaultDashboardUrl?: string;
  };
  updatedAt: string;
  updatedBy?: string;
}

export interface DashboardLink {
  id: string;
  name: string;
  url: string; // Direct public URL (for direct mode) or proxy URL (for proxy mode)
  dashboardId?: number; // Numeric dashboard ID for proxy mode
  dateFieldName?: string; // Template-tag name for date filtering (e.g., "abdm_transaction.created_date")
  description?: string;
  category?: string;
  tags?: string[];
  status: DashboardStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLinksStore {
  version: string;
  dashboards: DashboardLink[];
}
