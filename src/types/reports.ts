// Report Template & Dashboard Link Types

export type LogoPosition = "left" | "center" | "right";
export type DashboardStatus = "active" | "inactive";

export interface Logo {
  dataUrl: string; // Base64 data URL
  alt: string;
  position: LogoPosition;
}

export interface ReportTemplateConfig {
  version: string;
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
  url: string;
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
