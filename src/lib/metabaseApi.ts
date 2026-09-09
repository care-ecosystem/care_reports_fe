import type {
  MetabaseDashboard,
  MetabaseCard,
  MetabaseCardData,
  CardDataPreview,
} from "@/types/metabase";
import type { MetabaseConfig } from "@/types/reports";

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
 * Fetch dashboard metadata and cards from Metabase (Direct Mode)
 * @param dashboardUrl Metabase public dashboard URL
 * @returns Array of table/pivot cards
 */
const getDashboardCardsDirect = async (
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

  // Get cards from either ordered_cards (direct) or dashcards (proxy)
  const cards = dashboard.ordered_cards || dashboard.dashcards || [];

  // Debug: Log all cards and their display types
  console.log("Dashboard cards:", cards.map(card => ({
    id: card.id,
    card_id: card.card_id,
    name: card.card?.name,
    display: card.card?.display,
    hasCard: !!card.card,
  })));

  // Filter for table/pivot visualizations only
  const tableCards = cards.filter((card) => {
    const display = card.card?.display;
    return display && ["table", "pivot"].includes(display);
  });

  console.log("Filtered table cards:", tableCards.length);

  return tableCards;
};

/**
 * Fetch dashboard metadata and cards from Metabase (Proxy Mode)
 * @param proxyUrl Proxy server URL
 * @param dashboardId Numeric dashboard ID
 * @returns Array of table/pivot cards
 */
const getDashboardCardsProxy = async (
  proxyUrl: string,
  dashboardId: number,
): Promise<MetabaseCard[]> => {
  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "get_dashboard",
      dashboardId,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dashboard data: ${response.status} ${response.statusText}`,
    );
  }

  const dashboard: MetabaseDashboard = await response.json();

  // Get cards from either ordered_cards (direct) or dashcards (proxy)
  const cards = dashboard.ordered_cards || dashboard.dashcards || [];

  // Debug: Log all cards and their display types
  console.log("Dashboard cards:", cards.map(card => ({
    id: card.id,
    card_id: card.card_id,
    name: card.card?.name,
    display: card.card?.display,
    hasCard: !!card.card,
  })));

  // Filter for table/pivot visualizations only
  const tableCards = cards.filter((card) => {
    const display = card.card?.display;
    return display && ["table", "pivot"].includes(display);
  });

  console.log("Filtered table cards:", tableCards.length);

  return tableCards;
};

/**
 * Fetch dashboard metadata and cards from Metabase
 * @param config Metabase configuration (mode and proxy URL)
 * @param dashboardUrl Dashboard URL (direct mode) or not used (proxy mode)
 * @param dashboardId Numeric dashboard ID (proxy mode only)
 * @returns Array of table/pivot cards
 */
export const getDashboardCards = async (
  config: MetabaseConfig,
  dashboardUrl: string,
  dashboardId?: number,
): Promise<MetabaseCard[]> => {
  if (config.mode === "proxy") {
    if (!config.proxyUrl) {
      throw new Error("Proxy URL is required for proxy mode");
    }
    if (dashboardId === undefined) {
      throw new Error("Dashboard ID is required for proxy mode");
    }
    return getDashboardCardsProxy(config.proxyUrl, dashboardId);
  } else {
    return getDashboardCardsDirect(dashboardUrl);
  }
};

/**
 * Fetch card data (table rows) from Metabase (Direct Mode)
 * @param dashboardUrl Metabase dashboard URL (contains base URL)
 * @param cardId Card ID
 * @returns Card data with columns and rows
 */
const getCardDataDirect = async (
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
 * Fetch card data (table rows) from Metabase (Proxy Mode)
 * @param proxyUrl Proxy server URL
 * @param cardId Card ID
 * @returns Card data with columns and rows
 */
const getCardDataProxy = async (
  proxyUrl: string,
  cardId: number,
): Promise<MetabaseCardData> => {
  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "query_card",
      cardId,
      parameters: [],
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch card data: ${response.status} ${response.statusText}`,
    );
  }

  const result = await response.json();

  // Proxy API wraps response in data object
  const data = result.data || result;

  // Convert cols to columns format if needed
  if (data.cols && !data.columns) {
    data.columns = data.cols.map((col: any) => col.display_name || col.name);
  }

  return data as MetabaseCardData;
};

/**
 * Fetch card data (table rows) from Metabase
 * @param config Metabase configuration
 * @param dashboardUrl Dashboard URL (direct mode)
 * @param cardId Card ID
 * @returns Card data with columns and rows
 */
export const getCardData = async (
  config: MetabaseConfig,
  dashboardUrl: string,
  cardId: number,
): Promise<MetabaseCardData> => {
  let data: MetabaseCardData;

  if (config.mode === "proxy") {
    if (!config.proxyUrl) {
      throw new Error("Proxy URL is required for proxy mode");
    }
    data = await getCardDataProxy(config.proxyUrl, cardId);
  } else {
    data = await getCardDataDirect(dashboardUrl, cardId);
  }

  // Normalize the data format
  return normalizeCardData(data);
};

/**
 * Get preview data (first 5 rows) from card
 * @param config Metabase configuration
 * @param dashboardUrl Dashboard URL (direct mode)
 * @param cardId Card ID
 * @returns Preview data
 */
export const getCardDataPreview = async (
  config: MetabaseConfig,
  dashboardUrl: string,
  cardId: number,
): Promise<CardDataPreview> => {
  const fullData = await getCardData(config, dashboardUrl, cardId);

  return {
    totalRows: fullData.rows.length,
    totalColumns: fullData.columns.length,
    columns: fullData.columns,
    sampleRows: fullData.rows.slice(0, 5),
  };
};

/**
 * Normalize card data to ensure consistent format
 * @param data Raw data from API
 * @returns Normalized card data
 */
const normalizeCardData = (data: any): MetabaseCardData => {
  // Handle proxy API format (wrapped in data object)
  const actualData = data.data || data;

  // Convert cols to columns if needed
  let columns: string[];
  if (actualData.columns) {
    columns = actualData.columns;
  } else if (actualData.cols) {
    columns = actualData.cols.map((col: any) => col.display_name || col.name);
  } else {
    throw new Error("Invalid data format: missing columns");
  }

  if (!actualData.rows || !Array.isArray(actualData.rows)) {
    throw new Error("Invalid data format: missing rows");
  }

  return {
    columns,
    rows: actualData.rows,
  };
};

/**
 * Validate Metabase card data structure
 * @param data Data to validate
 * @returns Validated card data
 */
export const validateCardData = (data: any): MetabaseCardData => {
  return normalizeCardData(data);
};
