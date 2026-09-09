/**
 * Trigger browser print dialog for current page
 * Uses a print-specific approach to ensure content renders correctly
 */
export const printReport = (): void => {
  const reportContent = document.getElementById("report-content");

  if (!reportContent) {
    console.error("Report content not found");
    alert("Unable to print: Report content not found");
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank", "width=800,height=600");

  if (!printWindow) {
    console.error("Failed to open print window");
    alert("Unable to open print window. Please check your popup blocker.");
    return;
  }

  // Clone the content
  const contentClone = reportContent.cloneNode(true) as HTMLElement;

  // Build the print HTML with all necessary styles
  const printHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Report - Print Preview</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            width: 100%;
            height: auto;
            background: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #000;
          }

          body {
            padding: 20px;
          }

          /* Report structure */
          .report-preview {
            max-width: none;
            width: 100%;
          }

          /* Header */
          .report-header {
            border-bottom: 2px solid #1f2937;
            padding-bottom: 16px;
            margin-bottom: 16px;
            page-break-inside: avoid;
          }

          .report-header img {
            max-height: 48px;
            object-fit: contain;
          }

          .report-header h1 {
            font-size: 24px;
            font-weight: bold;
            margin-top: 16px;
            color: #1f2937;
          }

          /* Description */
          .bg-gray-50 {
            background-color: #f9fafb;
            padding: 16px;
            margin-bottom: 16px;
          }

          /* Info sections */
          .space-y-2 > div {
            margin-bottom: 8px;
          }

          .text-sm {
            font-size: 12px;
          }

          .text-gray-600 {
            color: #4b5563;
          }

          .font-semibold {
            font-weight: 600;
          }

          .font-medium {
            font-weight: 500;
          }

          .font-bold {
            font-weight: 700;
          }

          /* Tables */
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            page-break-inside: auto;
          }

          thead {
            display: table-header-group;
          }

          th, td {
            border: 1px solid #d1d5db;
            padding: 8px 12px;
            text-align: left;
          }

          th {
            background-color: #2563eb !important;
            color: white !important;
            font-weight: 600;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          tbody tr:nth-child(even) {
            background-color: #f9fafb !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }

          /* Footer */
          .report-footer {
            border-top: 2px solid #1f2937;
            padding-top: 16px;
            margin-top: 24px;
            background-color: #f9fafb;
            padding: 16px;
            page-break-inside: avoid;
          }

          /* Grid layouts */
          .grid {
            display: grid;
          }

          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .gap-4 {
            gap: 16px;
          }

          /* Borders */
          .border-b {
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 16px;
            margin-bottom: 16px;
          }

          /* Flexbox */
          .flex {
            display: flex;
          }

          .items-start {
            align-items: flex-start;
          }

          .items-center {
            align-items: center;
          }

          .justify-between {
            justify-content: space-between;
          }

          .mb-2 {
            margin-bottom: 8px;
          }

          .mb-4 {
            margin-bottom: 16px;
          }

          .mt-2 {
            margin-top: 8px;
          }

          .mt-4 {
            margin-top: 16px;
          }

          .ml-auto {
            margin-left: auto;
          }

          .mx-auto {
            margin-left: auto;
            margin-right: auto;
          }

          .p-6 {
            padding: 24px;
          }

          .text-xl {
            font-size: 20px;
          }

          .text-2xl {
            font-size: 24px;
          }

          .text-xs {
            font-size: 11px;
          }

          .italic {
            font-style: italic;
          }

          .text-gray-500 {
            color: #6b7280;
          }

          .text-gray-700 {
            color: #374151;
          }

          .text-gray-900 {
            color: #111827;
          }

          .whitespace-pre-wrap {
            white-space: pre-wrap;
          }

          .overflow-x-auto {
            overflow-x: visible;
          }

          @media print {
            body {
              padding: 0;
            }

            @page {
              margin: 1cm;
            }
          }
        </style>
      </head>
      <body>
        ${contentClone.innerHTML}
      </body>
    </html>
  `;

  // Write the content to the new window
  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();

  // Wait for images and content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();

      // Close the window after printing (with a delay)
      setTimeout(() => {
        printWindow.close();
      }, 100);
    }, 250);
  };
};
