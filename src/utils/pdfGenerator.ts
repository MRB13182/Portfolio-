import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export interface PdfExportOptions {
  filename: string;
  elementId: string;
  theme: 'light' | 'dark';
  orientation?: 'portrait' | 'landscape';
  onProgress?: (stage: string) => void;
}

/**
 * High-definition A4 PDF generator using html-to-image & jsPDF.
 * Uses native browser SVG rasterization to seamlessly support modern CSS (including oklch, gradients, and custom fonts)
 * with zero parser errors and crisp 2.5x retina resolution.
 */
export async function generateA4Pdf({
  filename,
  elementId,
  theme,
  orientation = 'portrait',
  onProgress
}: PdfExportOptions): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Target container #${elementId} not found in DOM.`);
  }

  onProgress?.('Preparing high-resolution render...');

  // Ensure fonts are ready
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue safely
    }
  }

  onProgress?.('Rasterizing high-DPI A4 layout...');

  const width = orientation === 'portrait' ? 794 : 1123;
  const height = orientation === 'portrait' ? 1123 : 794;

  // Generate crisp high-DPI data URL using native SVG foreignObject rasterization
  // Note: skipFonts prevents browser cross-origin SecurityError on document.styleSheets
  const dataUrl = await toPng(element, {
    quality: 0.98,
    pixelRatio: 2.5,
    backgroundColor: '#FFFFFF',
    width: width,
    height: height,
    cacheBust: true,
    skipFonts: true,
    fontEmbedCSS: '',
    filter: (node) => {
      // Ensure all nodes inside are rendered
      return true;
    }
  });

  onProgress?.('Compiling A4 PDF Document...');

  const pdfWidth = orientation === 'portrait' ? 210 : 297;
  const pdfHeight = orientation === 'portrait' ? 297 : 210;

  const pdf = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  
  onProgress?.('Finalizing download...');
  pdf.save(filename);
}

/**
 * Printable popup helper for instant browser print/save-as-PDF
 */
export function triggerDirectPrint(elementId: string) {
  const target = document.getElementById(elementId);
  if (!target) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>MD. Moshiur Rahman - Official Document</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @page { size: A4 portrait; margin: 0; }
          body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        </style>
      </head>
      <body>
        <div>${target.outerHTML}</div>
        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
