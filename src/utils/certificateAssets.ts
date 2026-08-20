/// <reference types="vite/client" />

/**
 * Certificate Asset Auto-Detection Engine
 * 
 * Auto-detects all certificate images placed inside `/public/certificate/` or `/public/certificates/`.
 * Supports dynamic filenames (e.g. Cer1.png, cert-1.webp, meta_cert.png, etc.)
 * Strips `/public` prefix for browser serving and supplies intelligent fallbacks.
 */

// Glob all images from /public/certificate/ and /public/certificates/
const certificateFilesRoot = import.meta.glob<{ default: string } | string>(
  '/public/certificate/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true }
);

const certificateFilesPlural = import.meta.glob<{ default: string } | string>(
  '/public/certificates/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true }
);

// Collect all found public paths (e.g. '/certificate/Cer1.png', '/certificates/Cer1.png')
const allFoundKeys = [
  ...Object.keys(certificateFilesRoot),
  ...Object.keys(certificateFilesPlural)
];

// Natural sort so Cer1.png, Cer2.png ... Cer6.png or 1.png, 2.png line up in exact numerical order
const sortedDetectedPaths = allFoundKeys
  .map(key => key.replace(/^\/public/, ''))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

/**
 * Returns detected public paths from /public/certificate/ and /public/certificates/
 */
export function getDetectedCertificatePaths(): string[] {
  return sortedDetectedPaths;
}

/**
 * Resolves the certificate image path for a given 0-indexed certificate (0 to 5)
 * If an image was auto-detected at that index, returns it.
 * Otherwise returns the standard canonical candidate path.
 */
export function resolveCertificateImage(index: number): string {
  if (sortedDetectedPaths[index]) {
    return sortedDetectedPaths[index];
  }
  // Standard fallback candidate
  return `/certificates/Cer${index + 1}.png`;
}

/**
 * Returns a prioritized list of candidate URLs for an image so `<img />` or the viewer
 * can try alternatives seamlessly.
 */
export function getCertificateCandidateUrls(index: number): string[] {
  const num = index + 1;
  const list: string[] = [];

  if (sortedDetectedPaths[index]) {
    list.push(sortedDetectedPaths[index]);
  }

  list.push(
    `/certificate/Cer${num}.png`,
    `/certificates/Cer${num}.png`,
    `/certificate/Cer${num}.jpg`,
    `/certificates/Cer${num}.jpg`,
    `/certificate/Cer${num}.webp`,
    `/certificates/Cer${num}.webp`,
    `/certificate/certificate${num}.png`,
    `/certificates/certificate${num}.png`,
    `/certificate/${num}.png`,
    `/certificates/${num}.png`
  );

  // Return unique
  return Array.from(new Set(list));
}
