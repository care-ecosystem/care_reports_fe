# Report Generation Feature - Design Document

## Overview

This document extends the core design with a **Report Generation** feature that allows users to select Metabase dashboards, choose specific table visualizations, and generate branded PDF reports with the configured template.

**Related Documents:**
- Main Design: `DESIGN.md`
- Architecture: `ARCHITECTURE.md`
- Wireframes: `WIREFRAMES.md`

---

## User Flow

```
1. User navigates to "Generate Report" page
          ↓
2. Selects a Dashboard from dropdown (populated from configured links)
          ↓
3. System fetches dashboard metadata from Metabase API
          ↓
4. Displays available table/chart visualizations in dropdown
          ↓
5. User selects a table visualization
          ↓
6. User clicks "Preview Report"
          ↓
7. System fetches table data from Metabase as JSON
          ↓
8. Navigates to Report Preview page
          ↓
9. Shows configured template (header, logos, footer) + table data
          ↓
10. User can:
    - Download as PDF (using jsPDF)
    - Print directly
    - Go back to edit selection
```

---

## Page Structure

### 1. Generate Report Page

**Route:** `/reports/generate`

**Layout:**
```
┌────────────────────────────────────────────────────┐
│ Generate Report                                     │
├────────────────────────────────────────────────────┤
│                                                     │
│  Step 1: Select Dashboard                          │
│  ┌──────────────────────────────────────────┐     │
│  │ Select Dashboard               ▼         │     │
│  │ [Patient Demographics Dashboard]         │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│  Step 2: Select Data Source                        │
│  ┌──────────────────────────────────────────┐     │
│  │ Select Table/Chart             ▼         │     │
│  │ [Patient Age Distribution Table]         │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│  Preview:                                          │
│  ┌──────────────────────────────────────────┐     │
│  │ Dashboard: Patient Demographics           │     │
│  │ Chart: Patient Age Distribution Table     │     │
│  │ Rows: 150                                 │     │
│  │ Columns: Age Group, Count, Percentage     │     │
│  └──────────────────────────────────────────┘     │
│                                                     │
│               [Preview Report]                      │
│                                                     │
└────────────────────────────────────────────────────┘
```

### 2. Report Preview Page

**Route:** `/reports/preview/:dashboardId/:cardId`

**Layout:**
```
┌────────────────────────────────────────────────────┐
│ Report Preview                 [Download] [Print]  │
├────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │ ╔══════════════════════════════════════════╗ │ │
│  │ ║  [LOGO]  Hospital Name           [GOV]   ║ │ │
│  │ ╚══════════════════════════════════════════╝ │ │
│  │                                               │ │
│  │  Patient Demographics Report                 │ │
│  │  Generated on: September 9, 2026             │ │
│  │                                               │ │
│  │  ┌────────────────────────────────────────┐ │ │
│  │  │ Age Group  │ Count │ Percentage        │ │ │
│  │  ├────────────────────────────────────────┤ │ │
│  │  │ 0-10       │ 245   │ 12.5%             │ │ │
│  │  │ 11-20      │ 389   │ 19.8%             │ │ │
│  │  │ 21-30      │ 512   │ 26.1%             │ │ │
│  │  │ 31-40      │ 423   │ 21.5%             │ │ │
│  │  │ 41-50      │ 298   │ 15.2%             │ │ │
│  │  │ 51+        │ 95    │ 4.8%              │ │ │
│  │  └────────────────────────────────────────┘ │ │
│  │                                               │ │
│  │  Total Records: 1,962                        │ │
│  │                                               │ │
│  │ ╔══════════════════════════════════════════╗ │ │
│  │ ║  © 2026 Hospital | Contact: xxx          ║ │ │
│  │ ╚══════════════════════════════════════════╝ │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│         [← Back to Selection] [Regenerate]         │
│                                                     │
└────────────────────────────────────────────────────┘
```

---

## Data Flow

### Flow 1: Dashboard Selection & Card Fetching

```typescript
User selects dashboard
      ↓
getDashboardCards(dashboardId)
      ↓
Fetch from Metabase API:
GET https://metabase.../api/public/dashboard/:uuid
      ↓
Parse response.ordered_cards
      ↓
Filter cards where visualization === "table" or "pivot"
      ↓
Display in dropdown:
[
  { id: 123, name: "Patient Age Distribution", type: "table" },
  { id: 456, name: "Admission Summary", type: "table" }
]
      ↓
User selects a card
      ↓
Store selection in state
```

### Flow 2: Data Fetching & Report Generation

```typescript
User clicks "Preview Report"
      ↓
fetchCardData(dashboardId, cardId)
      ↓
Fetch from Metabase API:
GET https://metabase.../api/public/card/:uuid/query/json
      ↓
Receive JSON data:
{
  columns: ["Age Group", "Count", "Percentage"],
  rows: [
    ["0-10", 245, "12.5%"],
    ["11-20", 389, "19.8%"],
    ...
  ]
}
      ↓
Navigate to /reports/preview/:dashboardId/:cardId
      ↓
ReportPreviewPage loads:
  1. Get template config (localStorage)
  2. Get card data (from state or re-fetch)
  3. Render report with template + data
      ↓
User clicks "Download"
      ↓
generatePDF(templateConfig, cardData)
      ↓
Use jsPDF:
  1. Add header with logos
  2. Add description
  3. Add table using jsPDF-AutoTable
  4. Add footer
  5. Save as PDF
```

---

## Component Architecture

### New Pages

#### 1. `GenerateReportPage.tsx`
**Route:** `/reports/generate`

**State:**
```typescript
interface GenerateReportPageState {
  // Step 1: Dashboard selection
  selectedDashboard: DashboardLink | null;
  dashboards: DashboardLink[];

  // Step 2: Card selection
  availableCards: MetabaseCard[];
  selectedCard: MetabaseCard | null;
  isLoadingCards: boolean;

  // Data preview
  cardDataPreview: CardDataPreview | null;

  // Error handling
  error: string | null;
}
```

**Features:**
- Dashboard dropdown (from configured links)
- Automatic card fetching when dashboard selected
- Card/table dropdown (filtered for table visualizations)
- Data preview section
- Navigation to preview page

#### 2. `ReportPreviewPage.tsx`
**Route:** `/reports/preview/:dashboardId/:cardId`

**State:**
```typescript
interface ReportPreviewPageState {
  // Template configuration
  templateConfig: ReportTemplateConfig;

  // Card data
  cardData: MetabaseCardData;
  cardMeta: MetabaseCard;

  // Loading states
  isLoading: boolean;
  isGeneratingPDF: boolean;

  // Error
  error: string | null;
}
```

**Features:**
- Render template header with logos
- Render description section
- Render table data
- Render footer
- Download as PDF button
- Print button
- Back navigation

### New Components

#### 3. `DashboardSelector.tsx`
**Props:**
```typescript
{
  dashboards: DashboardLink[];
  selectedDashboard: DashboardLink | null;
  onSelect: (dashboard: DashboardLink) => void;
  disabled?: boolean;
}
```

**Features:**
- Dropdown with dashboard names
- Shows only active dashboards
- Displays dashboard description on hover

#### 4. `CardSelector.tsx`
**Props:**
```typescript
{
  cards: MetabaseCard[];
  selectedCard: MetabaseCard | null;
  onSelect: (card: MetabaseCard) => void;
  isLoading: boolean;
  disabled?: boolean;
}
```

**Features:**
- Dropdown with card/table names
- Shows card type (table, pivot)
- Loading state while fetching

#### 5. `DataPreview.tsx`
**Props:**
```typescript
{
  card: MetabaseCard;
  preview: CardDataPreview;
}
```

**Features:**
- Display metadata (row count, column names)
- Show first 5 rows as preview
- Indicate total rows

#### 6. `ReportTable.tsx`
**Props:**
```typescript
{
  columns: string[];
  rows: any[][];
  maxRows?: number;
}
```

**Features:**
- Responsive table layout
- Pagination (for large datasets)
- Sorting (optional)
- Styled for print/PDF

#### 7. `ReportDocument.tsx`
**Props:**
```typescript
{
  templateConfig: ReportTemplateConfig;
  cardData: MetabaseCardData;
  cardMeta: MetabaseCard;
}
```

**Features:**
- Combines template + data
- Print-friendly CSS
- PDF-ready layout
- Header, table, footer sections

---

## TypeScript Types

### Metabase Types

```typescript
// Metabase Dashboard Response
interface MetabaseDashboard {
  id: number;
  name: string;
  description: string | null;
  ordered_cards: MetabaseCard[];
  parameters: MetabaseParameter[];
}

// Metabase Card (Visualization)
interface MetabaseCard {
  id: number;
  card_id: number;
  card: {
    id: number;
    name: string;
    display: string; // "table", "pivot", "bar", "line", etc.
    visualization_settings: Record<string, any>;
  };
  col: number;
  row: number;
  size_x: number;
  size_y: number;
}

// Metabase Card Data (Query Result)
interface MetabaseCardData {
  columns: string[];
  rows: any[][];
  insights?: any[];
  row_count?: number;
  status?: string;
  json_query?: Record<string, any>;
}

// Card Data Preview (for UI display)
interface CardDataPreview {
  totalRows: number;
  totalColumns: number;
  columns: string[];
  sampleRows: any[][];
}

// Report Generation Request
interface ReportGenerationRequest {
  dashboardId: string;
  cardId: number;
  templateConfig: ReportTemplateConfig;
}
```

---

## Metabase API Integration

### API Service: `src/lib/metabaseApi.ts`

```typescript
import { MetabaseDashboard, MetabaseCardData, MetabaseCard } from '@/types/metabase';

// Extract UUID from public Metabase URL
const extractDashboardUUID = (url: string): string | null => {
  // URL format: https://metabase.../public/dashboard/abcd-1234-efgh-5678
  const match = url.match(/\/public\/dashboard\/([a-f0-9-]+)/);
  return match ? match[1] : null;
};

const extractCardUUID = (url: string): string | null => {
  // URL format: https://metabase.../public/question/abcd-1234
  const match = url.match(/\/public\/question\/([a-f0-9-]+)/);
  return match ? match[1] : null;
};

// Get dashboard metadata and cards
export const getDashboardCards = async (
  dashboardUrl: string
): Promise<MetabaseCard[]> => {
  const uuid = extractDashboardUUID(dashboardUrl);
  if (!uuid) throw new Error('Invalid dashboard URL');

  const baseUrl = new URL(dashboardUrl).origin;
  const response = await fetch(`${baseUrl}/api/public/dashboard/${uuid}`);

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  const dashboard: MetabaseDashboard = await response.json();

  // Filter for table/pivot visualizations only
  return dashboard.ordered_cards.filter(
    (card) => ['table', 'pivot'].includes(card.card.display)
  );
};

// Get card data (table rows)
export const getCardData = async (
  dashboardUrl: string,
  cardId: number
): Promise<MetabaseCardData> => {
  const uuid = extractDashboardUUID(dashboardUrl);
  if (!uuid) throw new Error('Invalid dashboard URL');

  const baseUrl = new URL(dashboardUrl).origin;

  // Fetch using public card query endpoint
  const response = await fetch(
    `${baseUrl}/api/public/card/${uuid}/query/json?parameters=[]`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch card data');
  }

  const data: MetabaseCardData = await response.json();
  return data;
};

// Get preview data (first 5 rows)
export const getCardDataPreview = async (
  dashboardUrl: string,
  cardId: number
): Promise<CardDataPreview> => {
  const fullData = await getCardData(dashboardUrl, cardId);

  return {
    totalRows: fullData.rows.length,
    totalColumns: fullData.columns.length,
    columns: fullData.columns,
    sampleRows: fullData.rows.slice(0, 5),
  };
};
```

---

## PDF Generation

### PDF Service: `src/lib/pdfGenerator.ts`

```typescript
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportTemplateConfig } from '@/types/reports';
import { MetabaseCardData } from '@/types/metabase';

interface GeneratePDFOptions {
  templateConfig: ReportTemplateConfig;
  cardData: MetabaseCardData;
  cardName: string;
  dashboardName: string;
}

export const generateReportPDF = async ({
  templateConfig,
  cardData,
  cardName,
  dashboardName,
}: GeneratePDFOptions): Promise<void> => {
  const doc = new jsPDF();
  let yPosition = 20;

  // ----- HEADER SECTION -----

  // Add primary logo (if exists)
  if (templateConfig.header.primaryLogo?.dataUrl) {
    try {
      const logoWidth = 30;
      const logoHeight = 10;

      if (templateConfig.header.primaryLogo.position === 'left') {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          'PNG',
          10,
          yPosition,
          logoWidth,
          logoHeight
        );
      } else if (templateConfig.header.primaryLogo.position === 'center') {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          'PNG',
          (doc.internal.pageSize.width - logoWidth) / 2,
          yPosition,
          logoWidth,
          logoHeight
        );
      } else if (templateConfig.header.primaryLogo.position === 'right') {
        doc.addImage(
          templateConfig.header.primaryLogo.dataUrl,
          'PNG',
          doc.internal.pageSize.width - logoWidth - 10,
          yPosition,
          logoWidth,
          logoHeight
        );
      }

      yPosition += 15;
    } catch (error) {
      console.error('Failed to add primary logo:', error);
    }
  }

  // Add secondary logo (if exists)
  if (templateConfig.header.secondaryLogo?.dataUrl) {
    try {
      const logoWidth = 25;
      const logoHeight = 10;

      doc.addImage(
        templateConfig.header.secondaryLogo.dataUrl,
        'PNG',
        doc.internal.pageSize.width - logoWidth - 10,
        10,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.error('Failed to add secondary logo:', error);
    }
  }

  // Header text
  if (templateConfig.header.text) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(templateConfig.header.text, 10, yPosition);
    yPosition += 10;
  }

  // ----- DESCRIPTION SECTION -----

  if (templateConfig.description.text) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const splitDescription = doc.splitTextToSize(
      templateConfig.description.text,
      doc.internal.pageSize.width - 20
    );
    doc.text(splitDescription, 10, yPosition);
    yPosition += splitDescription.length * 5 + 5;
  }

  // Dashboard and card name
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Dashboard: ${dashboardName}`, 10, yPosition);
  yPosition += 7;
  doc.text(`Report: ${cardName}`, 10, yPosition);
  yPosition += 10;

  // Generation timestamp
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `Generated on: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    10,
    yPosition
  );
  yPosition += 10;

  // ----- TABLE SECTION -----

  // Use jsPDF-AutoTable for table rendering
  autoTable(doc, {
    startY: yPosition,
    head: [cardData.columns],
    body: cardData.rows,
    theme: 'grid',
    headStyles: {
      fillColor: [66, 139, 202], // Bootstrap primary blue
      textColor: 255,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 10, left: 10, right: 10 },
  });

  // Get final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || yPosition + 50;

  // ----- FOOTER SECTION -----

  // Add footer at bottom of page
  const pageHeight = doc.internal.pageSize.height;
  let footerY = Math.max(finalY + 20, pageHeight - 30);

  if (templateConfig.footer.text) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
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
    doc.setFont('helvetica', 'italic');
    const splitDisclaimer = doc.splitTextToSize(
      templateConfig.footer.disclaimer,
      doc.internal.pageSize.width - 20
    );
    doc.text(splitDisclaimer, 10, footerY);
  }

  // ----- SAVE PDF -----

  const fileName = `${dashboardName.replace(/\s+/g, '_')}_${cardName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
```

---

## Print Functionality

### Print Service: `src/lib/printService.ts`

```typescript
export const printReport = (): void => {
  // Apply print-specific styles
  document.body.classList.add('printing');

  // Trigger browser print dialog
  window.print();

  // Remove print class after printing
  setTimeout(() => {
    document.body.classList.remove('printing');
  }, 1000);
};
```

### Print CSS: `src/styles/print.css`

```css
@media print {
  /* Hide navigation, buttons, etc. */
  nav,
  button,
  .no-print {
    display: none !important;
  }

  /* Show only report content */
  .report-preview {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
  }

  /* Optimize for print */
  body {
    background: white;
  }

  /* Page breaks */
  .report-header,
  .report-footer {
    page-break-inside: avoid;
  }

  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  /* Ensure logos print correctly */
  img {
    max-width: 100%;
    page-break-inside: avoid;
  }
}
```

---

## Routes Update

### Add to `src/routes.tsx`

```typescript
const routes = {
  // Existing routes...
  "/admin/reports/configuration": () => <ConfigurationPage />,

  // NEW: Report generation routes
  "/reports/generate": () => (
    <PageWrapper>
      <GenerateReportPage />
    </PageWrapper>
  ),

  "/reports/preview/:dashboardId/:cardId": ({
    dashboardId,
    cardId,
  }: {
    dashboardId: string;
    cardId: string;
  }) => (
    <PageWrapper>
      <ReportPreviewPage dashboardId={dashboardId} cardId={cardId} />
    </PageWrapper>
  ),
};
```

### Update Navigation

```typescript
// Add to manifest.tsx
navItems: [
  {
    url: "/reports/generate",
    name: "Generate Report",
    icon: <FileText className="size-4" />,
  },
],

adminNavItems: [
  {
    url: "/admin/reports/configuration",
    name: "Report Configuration",
    icon: <Settings className="size-4" />,
  },
],
```

---

## Dependencies

### New Dependencies to Install

```bash
# PDF generation
npm install jspdf jspdf-autotable

# TypeScript types
npm install --save-dev @types/jspdf
```

### Package.json Addition

```json
{
  "dependencies": {
    "jspdf": "^2.5.2",
    "jspdf-autotable": "^3.8.3"
  },
  "devDependencies": {
    "@types/jspdf": "^2.0.0"
  }
}
```

---

## Error Handling

### Metabase API Errors

```typescript
try {
  const cards = await getDashboardCards(dashboardUrl);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      toast.error('Unable to connect to Metabase. Please check the dashboard URL.');
    } else if (error.message.includes('Invalid')) {
      toast.error('Invalid Metabase dashboard URL.');
    } else {
      toast.error('Failed to load dashboard data. Please try again.');
    }
  }
}
```

### PDF Generation Errors

```typescript
try {
  await generateReportPDF({...});
  toast.success('PDF downloaded successfully!');
} catch (error) {
  console.error('PDF generation error:', error);
  toast.error('Failed to generate PDF. Please try again.');
}
```

---

## Translation Keys

### Add to `public/locale/en.json`

```json
{
  "reports_generate": "Generate Report",
  "reports_generate_title": "Generate Report",
  "reports_select_dashboard": "Select Dashboard",
  "reports_select_card": "Select Data Source",
  "reports_preview_report": "Preview Report",
  "reports_download_pdf": "Download PDF",
  "reports_print": "Print",
  "reports_back_to_selection": "Back to Selection",
  "reports_regenerate": "Regenerate",
  "reports_dashboard_label": "Dashboard",
  "reports_card_label": "Report",
  "reports_generated_on": "Generated on",
  "reports_total_records": "Total Records",
  "reports_loading_cards": "Loading available reports...",
  "reports_loading_data": "Loading data...",
  "reports_generating_pdf": "Generating PDF...",
  "reports_no_dashboards": "No dashboards configured. Please add dashboards in Configuration.",
  "reports_no_cards": "No table visualizations found in this dashboard.",
  "reports_select_dashboard_first": "Please select a dashboard first.",
  "reports_preview_title": "Report Preview",
  "reports_data_preview": "Data Preview",
  "reports_rows_count": "Rows",
  "reports_columns_count": "Columns",
  "reports_error_fetch_cards": "Failed to load dashboard reports",
  "reports_error_fetch_data": "Failed to load report data",
  "reports_error_generate_pdf": "Failed to generate PDF",
  "reports_success_pdf": "PDF downloaded successfully!"
}
```

---

## Implementation Checklist

### Phase 1: Metabase Integration (3 hours)

- [ ] Create `src/types/metabase.ts` with TypeScript types
- [ ] Create `src/lib/metabaseApi.ts`
  - [ ] `extractDashboardUUID()`
  - [ ] `getDashboardCards()`
  - [ ] `getCardData()`
  - [ ] `getCardDataPreview()`
- [ ] Test Metabase API calls with real dashboard URLs
- [ ] Handle CORS issues (if any)

### Phase 2: PDF Generation (2 hours)

- [ ] Install jsPDF and jspdf-autotable
- [ ] Create `src/lib/pdfGenerator.ts`
  - [ ] `generateReportPDF()` function
  - [ ] Header rendering with logos
  - [ ] Description section
  - [ ] Table rendering with AutoTable
  - [ ] Footer rendering
- [ ] Test PDF generation with sample data
- [ ] Create `src/lib/printService.ts`
- [ ] Create `src/styles/print.css`

### Phase 3: Components (4 hours)

- [ ] Create `src/components/reports/DashboardSelector.tsx`
- [ ] Create `src/components/reports/CardSelector.tsx`
- [ ] Create `src/components/reports/DataPreview.tsx`
- [ ] Create `src/components/reports/ReportTable.tsx`
- [ ] Create `src/components/reports/ReportDocument.tsx`
- [ ] Style all components with Tailwind CSS

### Phase 4: Pages (3 hours)

- [ ] Create `src/pages/GenerateReportPage.tsx`
  - [ ] Dashboard selection logic
  - [ ] Card fetching on dashboard select
  - [ ] Card selection logic
  - [ ] Data preview
  - [ ] Navigation to preview
- [ ] Create `src/pages/ReportPreviewPage.tsx`
  - [ ] Fetch data on mount
  - [ ] Render template + data
  - [ ] Download PDF button
  - [ ] Print button
  - [ ] Back navigation

### Phase 5: Routes & Navigation (30 mins)

- [ ] Update `src/routes.tsx` with new routes
- [ ] Update `src/manifest.tsx` with navigation items
- [ ] Test navigation flow

### Phase 6: Translation & Polish (1 hour)

- [ ] Add translation keys to `public/locale/en.json`
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add toast notifications
- [ ] Responsive design testing

### Phase 7: Testing (2 hours)

- [ ] Test with real Metabase dashboards
- [ ] Test PDF generation
- [ ] Test print functionality
- [ ] Test error scenarios (invalid URL, network errors)
- [ ] Cross-browser testing

**Total Estimated Time:** ~16 hours

---

## Security Considerations

### CORS Handling

Metabase public dashboards may have CORS restrictions. Solutions:

1. **Backend Proxy** (Recommended for production)
   ```python
   # Django view to proxy Metabase requests
   @api_view(['GET'])
   def metabase_proxy(request, path):
       metabase_url = f"https://metabase.../api/{path}"
       response = requests.get(metabase_url)
       return JsonResponse(response.json())
   ```

2. **CORS Browser Extension** (Development only)

3. **Metabase CORS Configuration** (If you control Metabase instance)

### Data Validation

```typescript
// Validate Metabase response
const validateCardData = (data: any): MetabaseCardData => {
  if (!data.columns || !Array.isArray(data.columns)) {
    throw new Error('Invalid data format: missing columns');
  }
  if (!data.rows || !Array.isArray(data.rows)) {
    throw new Error('Invalid data format: missing rows');
  }
  return data as MetabaseCardData;
};
```

---

## Performance Optimizations

### 1. Caching Dashboard Metadata

```typescript
// Cache dashboard cards for 5 minutes
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const dashboardCache = new Map<string, { data: MetabaseCard[]; timestamp: number }>();

const getCachedDashboardCards = async (dashboardUrl: string) => {
  const cached = dashboardCache.get(dashboardUrl);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const cards = await getDashboardCards(dashboardUrl);
  dashboardCache.set(dashboardUrl, { data: cards, timestamp: Date.now() });
  return cards;
};
```

### 2. Lazy Loading jsPDF

```typescript
// Only load jsPDF when needed
const loadJsPDF = async () => {
  const jsPDF = (await import('jspdf')).default;
  const autoTable = (await import('jspdf-autotable')).default;
  return { jsPDF, autoTable };
};
```

### 3. Pagination for Large Tables

```typescript
// Split large datasets into pages
const MAX_ROWS_PER_PAGE = 100;

const paginateData = (rows: any[][]): any[][][] => {
  const pages = [];
  for (let i = 0; i < rows.length; i += MAX_ROWS_PER_PAGE) {
    pages.push(rows.slice(i, i + MAX_ROWS_PER_PAGE));
  }
  return pages;
};
```

---

## Future Enhancements

1. **Chart Support**: Support bar/line charts (convert to images using html2canvas)
2. **Custom Filters**: Allow users to apply Metabase filters before generating report
3. **Scheduled Reports**: Schedule automatic report generation and email delivery
4. **Multi-table Reports**: Combine multiple tables in one PDF
5. **Excel Export**: Export data as XLSX in addition to PDF
6. **Report Templates**: Multiple PDF layouts (landscape, portrait, A4, letter)
7. **Watermarks**: Add "DRAFT" or "CONFIDENTIAL" watermarks
8. **Digital Signatures**: Sign PDFs with digital certificates

---

## Testing Checklist

- [ ] Test with Metabase dashboard containing multiple tables
- [ ] Test with empty dashboard (no table visualizations)
- [ ] Test with large datasets (1000+ rows)
- [ ] Test PDF generation with all template configurations
- [ ] Test print functionality (all browsers)
- [ ] Test with missing/broken logos in template
- [ ] Test with invalid Metabase URLs
- [ ] Test with network errors (offline)
- [ ] Test responsive design on mobile/tablet
- [ ] Test PDF download on different browsers

---

**Version:** 1.0
**Created:** 2026-09-09
**Related to:** DESIGN.md, ARCHITECTURE.md, WIREFRAMES.md
