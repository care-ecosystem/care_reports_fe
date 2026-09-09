/**
 * Validate if URL is a valid Metabase public dashboard URL
 * @param url URL to validate
 * @returns true if valid Metabase public URL
 */
export const isValidMetabaseUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    // Only allow HTTPS
    if (parsed.protocol !== "https:") return false;

    // Check for /public/dashboard/ or /public/question/ path
    if (
      !parsed.pathname.includes("/public/dashboard/") &&
      !parsed.pathname.includes("/public/question/")
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize URL to prevent XSS
 * @param url URL to sanitize
 * @returns Sanitized URL
 */
export const sanitizeUrl = (url: string): string => {
  // Remove any potential javascript: or data: URIs
  const dangerousProtocols = ["javascript:", "data:", "vbscript:"];
  const lowerUrl = url.toLowerCase().trim();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return "";
    }
  }

  return url.trim();
};

/**
 * Extract domain from URL
 * @param url URL to extract domain from
 * @returns Domain or null if invalid
 */
export const extractDomain = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
};
