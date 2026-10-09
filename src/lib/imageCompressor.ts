/**
 * Utility to downscale, compress, and convert any uploaded image to WebP format.
 * Ensures ultra-fast page load times and optimal dimensions for the jersey store.
 */

export interface CompressionResult {
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  savingsPercent: number;
  width: number;
  height: number;
  format: string;
}

export async function compressAndConvertToWebP(
  file: File,
  maxWidth = 1080,
  maxHeight = 1350,
  quality = 0.82
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const originalSizeKB = Math.round(file.size / 1024);

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.onerror = () => reject(new Error('Failed to load image element'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas 2D context not available'));
        }

        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress to WebP
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        let webpDataUrl = canvas.toDataURL('image/webp', quality);
        let format = 'image/webp';

        // Graceful fallback to JPEG if browser doesn't export webp
        if (!webpDataUrl.startsWith('data:image/webp')) {
          webpDataUrl = canvas.toDataURL('image/jpeg', quality);
          format = 'image/jpeg';
        }

        // Approximate size of base64
        const stringLength = webpDataUrl.length - 'data:image/webp;base64,'.length;
        const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383;
        const compressedSizeKB = Math.max(1, Math.round(sizeInBytes / 1024));

        const savingsPercent = Math.max(
          0,
          Math.round(((originalSizeKB - compressedSizeKB) / (originalSizeKB || 1)) * 100)
        );

        resolve({
          dataUrl: webpDataUrl,
          originalSizeKB,
          compressedSizeKB,
          savingsPercent,
          width,
          height,
          format,
        });
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
