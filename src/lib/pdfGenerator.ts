import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ReportTemplateConfig } from "@/types/reports";
import type { MetabaseCardData } from "@/types/metabase";

interface GeneratePDFOptions {
  templateConfig: ReportTemplateConfig;
  cardData: MetabaseCardData;
  cardName: string;
  dashboardName: string;
}

/**
 * Generate PDF report with template branding and table data
 * @param options PDF generation options
 */
export const generateReportPDF = async ({
  templateConfig,
  cardData,
  cardName,
  dashboardName,
}: GeneratePDFOptions): Promise<void> => {
  // Use landscape orientation for tables with many columns
  const numColumns = cardData.columns.length;
  const orientation = numColumns > 6 ? "landscape" : "portrait";

  const doc = new jsPDF({
    orientation: orientation,
    unit: "mm",
    format: "a4",
  });

  let yPosition = 20;

  // ----- HEADER SECTION -----

  // Add primary logo (if exists)
  if (templateConfig.header.primaryLogo?.dataUrl) {
    try {
      const logoWidth = 30;
      const logoHeight = 10;

      if (templateConfig.header.primaryLogo.position === "left") {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          "PNG",
          10,
          yPosition,
          logoWidth,
          logoHeight,
        );
      } else if (templateConfig.header.primaryLogo.position === "center") {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          "PNG",
          (doc.internal.pageSize.width - logoWidth) / 2,
          yPosition,
          logoWidth,
          logoHeight,
        );
      } else if (templateConfig.header.primaryLogo.position === "right") {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          "PNG",
          doc.internal.pageSize.width - logoWidth - 10,
          yPosition,
          logoWidth,
          logoHeight,
        );
      }

      yPosition += 15;
    } catch (error) {
      console.error("Failed to add primary logo:", error);
    }
  }

  // Add secondary logo (if exists)
  if (templateConfig.header.secondaryLogo?.dataUrl) {
    try {
      const logoWidth = 25;
      const logoHeight = 10;

      doc.addImage(
        templateConfig.header.secondaryLogo.dataUrl,
        "PNG",
        doc.internal.pageSize.width - logoWidth - 10,
        10,
        logoWidth,
        logoHeight,
      );
    } catch (error) {
      console.error("Failed to add secondary logo:", error);
    }
  }

  // Header text
  if (templateConfig.header.text) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(templateConfig.header.text, 10, yPosition);
    yPosition += 10;
  }

  // ----- DESCRIPTION SECTION -----

  if (templateConfig.description.text) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const splitDescription = doc.splitTextToSize(
      templateConfig.description.text,
      doc.internal.pageSize.width - 20,
    );
    doc.text(splitDescription, 10, yPosition);
    yPosition += splitDescription.length * 5 + 5;
  }

  // Dashboard and card name
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Dashboard: ${dashboardName}`, 10, yPosition);
  yPosition += 7;
  doc.text(`Report: ${cardName}`, 10, yPosition);
  yPosition += 10;

  // Generation timestamp
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    `Generated on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    10,
    yPosition,
  );
  yPosition += 10;

  // ----- TABLE SECTION -----

  // Calculate optimal column widths based on content
  const pageWidth = doc.internal.pageSize.width;
  const availableWidth = pageWidth - 20; // Account for margins

  // For tables with many columns, use smaller font and tighter spacing
  const fontSize = numColumns > 10 ? 6 : numColumns > 8 ? 7 : 8;
  const cellPadding = numColumns > 10 ? 1.5 : numColumns > 8 ? 2 : 3;

  // Calculate column widths intelligently based on header text length
  const calculateColumnWidths = () => {
    const columnWidths: { [key: number]: number } = {};
    const baseWidth = availableWidth / numColumns;

    cardData.columns.forEach((header, index) => {
      // Estimate width needed based on header length
      const headerLength = header.length;

      // Short columns (like IDs, numbers) get less space
      if (headerLength <= 5) {
        columnWidths[index] = Math.max(baseWidth * 0.6, 15);
      }
      // Medium columns
      else if (headerLength <= 15) {
        columnWidths[index] = baseWidth * 0.8;
      }
      // Long columns get more space
      else {
        columnWidths[index] = baseWidth * 1.2;
      }
    });

    return columnWidths;
  };

  // Use jsPDF-AutoTable for table rendering
  autoTable(doc, {
    startY: yPosition,
    head: [cardData.columns],
    body: cardData.rows,
    theme: "grid",
    headStyles: {
      fillColor: [243, 244, 246], // Care theme: gray-100 (#f3f4f6)
      textColor: [55, 65, 81], // Care theme: gray-700 (#374151)
      fontStyle: "normal",
      halign: "left",
      fontSize: fontSize,
      minCellHeight: 8,
    },
    styles: {
      fontSize: fontSize,
      cellPadding: cellPadding,
      textColor: [17, 24, 39], // gray-900 for body text
      overflow: "linebreak",
      cellWidth: "auto",
      halign: "left",
      valign: "middle",
      minCellHeight: 6,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251], // Care theme: gray-50 (#f9fafb)
    },
    columnStyles: calculateColumnWidths(),
    tableWidth: "auto",
    margin: { top: 10, left: 10, right: 10 },
    // Allow table to span multiple pages if needed
    horizontalPageBreak: true,
    horizontalPageBreakRepeat: 0,
    showHead: "everyPage",
  });

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || yPosition + 50;

  // ----- FOOTER SECTION -----

  // Add footer at bottom of page
  const pageHeight = doc.internal.pageSize.height;
  let footerY = Math.max(finalY + 20, pageHeight - 30);

  if (templateConfig.footer.text) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(templateConfig.footer.text, 10, footerY);
    footerY += 5;
  }

  if (templateConfig.footer.contact) {
    doc.setFontSize(7);
    doc.text(templateConfig.footer.contact, 10, footerY);
    footerY += 4;
  }

  if (templateConfig.footer.disclaimer) {
    doc.setFontSize(7);
    doc.setFont("helvetica", "italic");
    const splitDisclaimer = doc.splitTextToSize(
      templateConfig.footer.disclaimer,
      doc.internal.pageSize.width - 20,
    );
    doc.text(splitDisclaimer, 10, footerY);
  }

  // ----- SAVE PDF -----

  const fileName = `${dashboardName.replace(/\s+/g, "_")}_${cardName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
