// Metabase API Types

export interface MetabaseDashboard {
  id: number;
  name: string;
  description: string | null;
  ordered_cards: MetabaseCard[];
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

export interface MetabaseCardData {
  columns: string[];
  rows: any[][];
  insights?: any[];
  row_count?: number;
  status?: string;
  json_query?: Record<string, any>;
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
