import type {
  MetabaseDashboard,
  MetabaseCard,
  MetabaseCardData,
  CardDataPreview,
} from "@/types/metabase";

/**
 * Extract dashboard UUID from Metabase public URL
 * @param url Metabase public dashboard URL
 * @returns UUID or null if invalid
 */
export const extractDashboardUUID = (url: string): string | null => {
  // URL format: https://metabase.../public/dashboard/abcd-1234-efgh-5678
  const match = url.match(/\/public\/dashboard\/([a-f0-9-]+)/);
  return match ? match[1] : null;
};

/**
 * Extract card UUID from Metabase public URL
 * @param url Metabase public question/card URL
 * @returns UUID or null if invalid
 */
export const extractCardUUID = (url: string): string | null => {
  // URL format: https://metabase.../public/question/abcd-1234
  const match = url.match(/\/public\/question\/([a-f0-9-]+)/);
  return match ? match[1] : null;
};

/**
 * Fetch dashboard metadata and cards from Metabase
 * @param dashboardUrl Metabase public dashboard URL
 * @returns Array of table/pivot cards
 */
export const getDashboardCards = async (
  dashboardUrl: string,
): Promise<MetabaseCard[]> => {
  const uuid = extractDashboardUUID(dashboardUrl);
  if (!uuid) throw new Error("Invalid dashboard URL");

  const baseUrl = new URL(dashboardUrl).origin;
  const response = await fetch(`${baseUrl}/api/public/dashboard/${uuid}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dashboard data: ${response.status} ${response.statusText}`,
    );
  }

  const dashboard: MetabaseDashboard = await response.json();

  // Filter for table/pivot visualizations only
  return dashboard.ordered_cards.filter((card) =>
    ["table", "pivot"].includes(card.card.display),
  );
};

/**
 * Fetch card data (table rows) from Metabase
 * @param dashboardUrl Metabase dashboard URL (contains base URL)
 * @param cardId Card ID
 * @returns Card data with columns and rows
 */
export const getCardData = async (
  dashboardUrl: string,
  cardId: number,
): Promise<MetabaseCardData> => {
  const uuid = extractDashboardUUID(dashboardUrl);
  if (!uuid) throw new Error("Invalid dashboard URL");

  const baseUrl = new URL(dashboardUrl).origin;

  // Note: This might need adjustment based on actual Metabase API
  // Some Metabase instances use /api/public/card/:uuid/query
  const response = await fetch(
    `${baseUrl}/api/public/card/${uuid}/query/json?parameters=[]`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch card data: ${response.status} ${response.statusText}`,
    );
  }

  const data: MetabaseCardData = await response.json();
  return data;
};

/**
 * Get preview data (first 5 rows) from card
 * @param dashboardUrl Metabase dashboard URL
 * @param cardId Card ID
 * @returns Preview data
 */
export const getCardDataPreview = async (
  dashboardUrl: string,
  cardId: number,
): Promise<CardDataPreview> => {
  const fullData = await getCardData(dashboardUrl, cardId);

  return {
    totalRows: fullData.rows.length,
    totalColumns: fullData.columns.length,
    columns: fullData.columns,
    sampleRows: fullData.rows.slice(0, 5),
  };
};

/**
 * Validate Metabase card data structure
 * @param data Data to validate
 * @returns Validated card data
 */
export const validateCardData = (data: any): MetabaseCardData => {
  if (!data.columns || !Array.isArray(data.columns)) {
    throw new Error("Invalid data format: missing columns");
  }
  if (!data.rows || !Array.isArray(data.rows)) {
    throw new Error("Invalid data format: missing rows");
  }
  return data as MetabaseCardData;
};
