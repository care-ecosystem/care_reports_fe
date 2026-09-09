// Metabase API Types

export interface MetabaseDashboard {
  id: number;
  name: string;
  description: string | null;
  ordered_cards?: MetabaseCard[]; // Direct API uses this
  dashcards?: MetabaseCard[]; // Proxy API uses this
  parameters: MetabaseParameter[];
}

export interface MetabaseCard {
  id: number;
  card_id: number;
  card: {
    id: number;
    name: string;
    display: string; // "table", "pivot", "bar", "line", etc.
    visualization_settings: Record<string, any>;
  };
  col: number;
  row: number;
  size_x: number;
  size_y: number;
}

export interface MetabaseParameter {
  id: string;
  name: string;
  type: string;
  slug: string;
  default?: any;
}

// Column definition from API
export interface MetabaseColumn {
  name: string;
  display_name: string;
  base_type: string;
  semantic_type?: string;
}

// Direct API response format
export interface MetabaseCardData {
  columns?: string[]; // Direct API uses simple string array
  cols?: MetabaseColumn[]; // Proxy API uses detailed column objects
  rows: any[][];
  insights?: any[];
  row_count?: number;
  status?: string;
  json_query?: Record<string, any>;
}

// Proxy API wraps response in data object
export interface ProxyCardDataResponse {
  data: MetabaseCardData;
  status: string;
  row_count: number;
}

export interface CardDataPreview {
  totalRows: number;
  totalColumns: number;
  columns: string[];
  sampleRows: any[][];
}

export interface ReportGenerationRequest {
  dashboardId: string;
  cardId: number;
  templateConfig: import("./reports").ReportTemplateConfig;
}
