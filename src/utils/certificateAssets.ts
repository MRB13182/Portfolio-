/// <reference types="vite/client" />

/**
 * Certificate Asset Auto-Detection Engine
 * 
 * Maps and auto-detects all certificate images placed inside `/public/certificate/` or `/public/certificates/`.
 * Exact mapping:
 * - Cer1.png -> Google AI Professional Certificate
 * - Cer2.png -> Google UX Design Professional Certificate
 * - Cer3.png -> IBM Cybersecurity Fundamentals Certificate
 * - Cer4.png -> Meta Digital Marketing Associate Certificate
 * - Cer5.png -> HubSpot SEO Certification
 * - Cer6.png -> Semrush SEO Crash Course with Brian Dean
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

// Map of canonical file keys (Cer1.png -> '/certificate/Cer1.png')
const detectedMap: Record<string, string> = {};

// Register found files from root /public/certificate/ first
Object.keys(certificateFilesRoot).forEach(key => {
  const filename = key.split('/').pop() || '';
  const publicPath = key.replace(/^\/public/, '');
  detectedMap[filename.toLowerCase()] = publicPath;
  const baseName = filename.split('.')[0].toLowerCase();
  detectedMap[baseName] = publicPath;
});

// Also register from /public/certificates/ if not already present
Object.keys(certificateFilesPlural).forEach(key => {
  const filename = key.split('/').pop() || '';
  const publicPath = key.replace(/^\/public/, '');
  const lowerFile = filename.toLowerCase();
  const baseName = filename.split('.')[0].toLowerCase();
  if (!detectedMap[lowerFile]) {
    detectedMap[lowerFile] = publicPath;
  }
  if (!detectedMap[baseName]) {
    detectedMap[baseName] = publicPath;
  }
});

/**
 * Resolves certificate image by exact filename or index
 * e.g. resolveCertificateFile('Cer1.png') -> '/certificate/Cer1.png'
 */
export function resolveCertificateFile(filename: string): string {
  const lower = filename.toLowerCase();
  const base = filename.split('.')[0].toLowerCase();
  
  if (detectedMap[lower]) return detectedMap[lower];
  if (detectedMap[base]) return detectedMap[base];
  
  // Default canonical path inside /public/certificate/
  return `/certificate/${filename}`;
}

/**
 * Resolves the certificate image path for a given 0-indexed certificate (0 to 5)
 * Index 0 -> Cer1.png
 * Index 1 -> Cer2.png
 * Index 2 -> Cer3.png
 * Index 3 -> Cer4.png
 * Index 4 -> Cer5.png
 * Index 5 -> Cer6.png
 */
export function resolveCertificateImage(index: number): string {
  const filename = `Cer${index + 1}.png`;
  return resolveCertificateFile(filename);
}

/**
 * Returns a prioritized list of candidate URLs for an image so `<img />` or viewer
 * can try alternatives seamlessly.
 */
export function getCertificateCandidateUrls(index: number): string[] {
  const num = index + 1;
  const list: string[] = [];

  const primary = resolveCertificateImage(index);
  list.push(primary);

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

  // Return unique list
  return Array.from(new Set(list));
}

