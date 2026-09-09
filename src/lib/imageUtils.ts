/**
 * Convert image file to Base64 data URL
 * @param file Image file to convert
 * @returns Promise resolving to Base64 data URL
 */
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file type and size
 * @param file File to validate
 * @returns Validation result with error message if invalid
 */
export const validateImageFile = (
  file: File,
): { valid: boolean; error?: string } => {
  const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Only PNG, JPG, and SVG files are allowed",
    };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 2MB" };
  }

  return { valid: true };
};

/**
 * Compress image to reduce file size (optional enhancement)
 * @param file Original image file
 * @param maxWidth Maximum width in pixels
 * @param maxHeight Maximum height in pixels
 * @returns Promise resolving to compressed image data URL
 */
export const compressImage = (
  file: File,
  maxWidth = 200,
  maxHeight = 60,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        // Calculate new dimensions maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to Base64 with compression
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};
