# Care Reports Plugin - Implementation Checklist

**Plugin:** `care_reports_fe`
**Version:** 0.1.0
**Status:** Design Complete ✅ | Implementation: Not Started

---

## Phase 1: Setup & Types

### 1. TypeScript Types (30 mins)
- [ ] Create `src/types/reports.ts`
  - [ ] `LogoPosition` type
  - [ ] `DashboardStatus` type
  - [ ] `Logo` interface
  - [ ] `ReportTemplateConfig` interface
  - [ ] `DashboardLink` interface
  - [ ] `DashboardLinksStore` interface

**Estimated time:** 30 minutes
**Files:** `src/types/reports.ts`

---

## Phase 2: Utilities & Services (2 hours)

### 2. localStorage Utilities (1 hour)
- [ ] Create `src/lib/storage.ts`
  - [ ] `getTemplateConfig()` - Read config from localStorage
  - [ ] `saveTemplateConfig()` - Save config to localStorage
  - [ ] `getDefaultTemplateConfig()` - Return default config
  - [ ] `getDashboards()` - Get all dashboards
  - [ ] `saveDashboards()` - Save dashboards array
  - [ ] `addDashboard()` - Add new dashboard
  - [ ] `updateDashboard()` - Update dashboard
  - [ ] `deleteDashboard()` - Delete dashboard
  - [ ] Add JSDoc comments for all functions

**Estimated time:** 1 hour
**Files:** `src/lib/storage.ts`

### 3. Image Utilities (30 mins)
- [ ] Create `src/lib/imageUtils.ts`
  - [ ] `convertImageToBase64()` - Convert File to Base64
  - [ ] `validateImageFile()` - Validate type and size
  - [ ] `compressImage()` (optional) - Reduce file size
  - [ ] Add error handling

**Estimated time:** 30 minutes
**Files:** `src/lib/imageUtils.ts`

### 4. URL Validation Utility (30 mins)
- [ ] Create `src/lib/urlUtils.ts`
  - [ ] `isValidMetabaseUrl()` - Validate Metabase public URLs
  - [ ] `sanitizeUrl()` - Sanitize user input

**Estimated time:** 30 minutes
**Files:** `src/lib/urlUtils.ts`

---

## Phase 3: Core Components (6 hours)

### 5. LogoUploader Component (1.5 hours)
- [ ] Create `src/components/reports/LogoUploader.tsx`
  - [ ] Drag-and-drop zone (react-dropzone)
  - [ ] File input fallback
  - [ ] Image preview
  - [ ] Upload/Remove buttons
  - [ ] File size/type validation
  - [ ] Loading state
  - [ ] Error state display
  - [ ] Logo position radio buttons

**Estimated time:** 1.5 hours
**Files:** `src/components/reports/LogoUploader.tsx`

### 6. TemplateConfigForm Component (2 hours)
- [ ] Create `src/components/reports/TemplateConfigForm.tsx`
  - [ ] Header text input (textarea or rich text)
  - [ ] Primary logo uploader
  - [ ] Secondary logo uploader (optional)
  - [ ] Logo position selector
  - [ ] Description textarea
  - [ ] Subtitle input (optional)
  - [ ] Footer text textarea
  - [ ] Contact information input
  - [ ] Disclaimer textarea
  - [ ] Preview URL input
  - [ ] Form validation
  - [ ] Action buttons (Save, Reset, Preview)

**Estimated time:** 2 hours
**Files:** `src/components/reports/TemplateConfigForm.tsx`

### 7. DashboardLinksTable Component (1.5 hours)
- [ ] Create `src/components/reports/DashboardLinksTable.tsx`
  - [ ] Table/Card view toggle (desktop/mobile)
  - [ ] Search input
  - [ ] Category filter dropdown
  - [ ] Dashboard cards/rows
  - [ ] Status badges (Active/Inactive)
  - [ ] Action buttons (Edit, Delete, Preview, Copy URL)
  - [ ] Empty state
  - [ ] Loading state

**Estimated time:** 1.5 hours
**Files:** `src/components/reports/DashboardLinksTable.tsx`

### 8. DashboardLinkModal Component (1 hour)
- [ ] Create `src/components/reports/DashboardLinkModal.tsx`
  - [ ] Modal wrapper
  - [ ] Dashboard name input
  - [ ] URL input with validation
  - [ ] Description textarea
  - [ ] Category dropdown/input
  - [ ] Tags input (array)
  - [ ] Status checkbox
  - [ ] Form validation
  - [ ] Save/Cancel buttons

**Estimated time:** 1 hour
**Files:** `src/components/reports/DashboardLinkModal.tsx`

---

## Phase 4: Preview Component (2 hours)

### 9. TemplatePreview Component (2 hours)
- [ ] Create `src/components/reports/TemplatePreview.tsx`
  - [ ] Modal wrapper (full screen or large modal)
  - [ ] Desktop/Mobile view toggle
  - [ ] Header section rendering
    - [ ] Primary logo display
    - [ ] Secondary logo display
    - [ ] Header text display
    - [ ] Logo positioning
  - [ ] Description section rendering
  - [ ] Metabase iframe embedding
    - [ ] Dashboard URL selector dropdown
    - [ ] iframe with proper CORS handling
    - [ ] Loading state for iframe
  - [ ] Footer section rendering
    - [ ] Footer text
    - [ ] Contact info
    - [ ] Disclaimer
  - [ ] Responsive CSS for mobile preview
  - [ ] Close button

**Estimated time:** 2 hours
**Files:** `src/components/reports/TemplatePreview.tsx`

---

## Phase 5: Main Page (2 hours)

### 10. ConfigurationPage Component (2 hours)
- [ ] Create `src/pages/ConfigurationPage.tsx`
  - [ ] Tabbed interface (Template Config | Dashboard Links)
  - [ ] Tab state management
  - [ ] Template tab:
    - [ ] Render `TemplateConfigForm`
    - [ ] Handle template config state
    - [ ] Handle save action → localStorage
    - [ ] Handle reset action → default config
    - [ ] Handle preview action → open modal
    - [ ] Success/error toast notifications
  - [ ] Dashboard Links tab:
    - [ ] Render `DashboardLinksTable`
    - [ ] Handle dashboard CRUD operations
    - [ ] Handle add/edit modals
    - [ ] Handle delete confirmations
    - [ ] Success/error toast notifications
  - [ ] Page layout with header
  - [ ] Loading states on mount (read localStorage)

**Estimated time:** 2 hours
**Files:** `src/pages/ConfigurationPage.tsx`

---

## Phase 6: Routing & Navigation (30 mins)

### 11. Update Routes (15 mins)
- [ ] Update `src/routes.tsx`
  - [ ] Add `/admin/reports/configuration` route
  - [ ] Import `ConfigurationPage`

### 12. Update Manifest (15 mins)
- [ ] Update `src/manifest.tsx`
  - [ ] Add route mapping
  - [ ] Update admin navigation items
    - [ ] Icon: `Settings` or `FileText`
    - [ ] Name: "Report Configuration"
    - [ ] URL: `/admin/reports/configuration`

**Estimated time:** 30 minutes
**Files:** `src/routes.tsx`, `src/manifest.tsx`

---

## Phase 7: Translations (30 mins)

### 13. Update Translation Keys (30 mins)
- [ ] Update `public/locale/en.json`
  - [ ] Add all translation keys from DESIGN.md
  - [ ] Total: ~40 keys

**Estimated time:** 30 minutes
**Files:** `public/locale/en.json`

---

## Phase 8: Styling & Polish (2 hours)

### 14. Component Styling (1.5 hours)
- [ ] Style `LogoUploader` with Tailwind
  - [ ] Drag-and-drop zone styles
  - [ ] Hover states
  - [ ] Error states
- [ ] Style `TemplateConfigForm` with Tailwind
  - [ ] Form layout
  - [ ] Input fields
  - [ ] Buttons
- [ ] Style `DashboardLinksTable` with Tailwind
  - [ ] Table/Card layout
  - [ ] Responsive design
  - [ ] Action buttons
- [ ] Style `TemplatePreview` with Tailwind
  - [ ] Modal layout
  - [ ] Header/Footer boxes
  - [ ] Responsive preview

**Estimated time:** 1.5 hours

### 15. Responsive Design (30 mins)
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Adjust breakpoints if needed

**Estimated time:** 30 minutes

---

## Phase 9: Error Handling & Validation (1.5 hours)

### 16. Form Validation (1 hour)
- [ ] Template config form
  - [ ] Required field validation (header text)
  - [ ] URL validation (preview URL)
  - [ ] Image validation (size, type)
- [ ] Dashboard link form
  - [ ] Required fields (name, URL)
  - [ ] Metabase URL format validation
  - [ ] Duplicate URL detection

### 17. Error Handling (30 mins)
- [ ] localStorage quota exceeded handling
- [ ] Image upload error handling
- [ ] Toast notifications for all errors
- [ ] Graceful fallbacks

**Estimated time:** 1.5 hours

---

## Phase 10: Testing (3 hours)

### 18. Manual Testing (2 hours)
- [ ] Template Configuration
  - [ ] Upload primary logo (PNG, JPG, SVG)
  - [ ] Upload secondary logo
  - [ ] Change logo position
  - [ ] Fill all text fields
  - [ ] Save configuration
  - [ ] Verify localStorage persistence
  - [ ] Preview template
  - [ ] Reset to defaults
- [ ] Dashboard Links
  - [ ] Add new dashboard link
  - [ ] Edit existing dashboard
  - [ ] Delete dashboard (with confirmation)
  - [ ] Toggle active/inactive status
  - [ ] Search dashboards
  - [ ] Filter by category
  - [ ] Copy URL to clipboard
  - [ ] Preview dashboard in modal
- [ ] Edge Cases
  - [ ] Upload image > 2MB (should fail)
  - [ ] Upload invalid file type (should fail)
  - [ ] Enter invalid Metabase URL (should fail)
  - [ ] Test with localStorage disabled
  - [ ] Test localStorage quota exceeded

### 19. Cross-browser Testing (30 mins)
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 20. Responsive Testing (30 mins)
- [ ] Mobile (iPhone, Android)
- [ ] Tablet (iPad)
- [ ] Desktop (various screen sizes)

**Estimated time:** 3 hours

---

## Phase 11: Documentation (1 hour)

### 21. Update README.md (30 mins)
- [ ] Add plugin description
- [ ] Add features list
- [ ] Add configuration instructions
- [ ] Add screenshots (optional)

### 22. Code Documentation (30 mins)
- [ ] Add JSDoc comments to all public functions
- [ ] Add component prop documentation
- [ ] Add inline comments for complex logic

**Estimated time:** 1 hour

---

## Phase 12: Deployment (30 mins)

### 23. Build & Deploy (30 mins)
- [ ] Run `npm run build`
- [ ] Fix any build errors
- [ ] Test production build locally (`npm run preview`)
- [ ] Deploy to GitHub Pages or Cloudflare Workers
- [ ] Verify deployed URL works

**Estimated time:** 30 minutes

---

## Phase 13: Report Generation Feature (16 hours)

**See:** `REPORT_GENERATION_DESIGN.md` for detailed specifications

### 24. Metabase Integration (3 hours)
- [ ] Create `src/types/metabase.ts`
  - [ ] `MetabaseDashboard` interface
  - [ ] `MetabaseCard` interface
  - [ ] `MetabaseCardData` interface
  - [ ] `CardDataPreview` interface
- [ ] Create `src/lib/metabaseApi.ts`
  - [ ] `extractDashboardUUID()` - Extract UUID from URL
  - [ ] `getDashboardCards()` - Fetch dashboard metadata
  - [ ] `getCardData()` - Fetch table data as JSON
  - [ ] `getCardDataPreview()` - Get preview (first 5 rows)
  - [ ] Error handling for API calls
- [ ] Test with real Metabase public dashboard URLs

**Estimated time:** 3 hours
**Files:** `src/types/metabase.ts`, `src/lib/metabaseApi.ts`

### 25. PDF Generation Service (2 hours)
- [ ] Install dependencies: `npm install jspdf jspdf-autotable`
- [ ] Create `src/lib/pdfGenerator.ts`
  - [ ] `generateReportPDF()` - Main PDF generation function
  - [ ] Header rendering with logos (Base64)
  - [ ] Description section
  - [ ] Table rendering using jsPDF-AutoTable
  - [ ] Footer section
  - [ ] File naming and download
- [ ] Create `src/lib/printService.ts`
  - [ ] `printReport()` - Trigger browser print dialog
- [ ] Create `src/styles/print.css`
  - [ ] Print-specific styles
  - [ ] Page break handling
  - [ ] Hide UI elements (buttons, nav)

**Estimated time:** 2 hours
**Files:** `src/lib/pdfGenerator.ts`, `src/lib/printService.ts`, `src/styles/print.css`

### 26. Report Generation Components (4 hours)
- [ ] Create `src/components/reports/DashboardSelector.tsx`
  - [ ] Dropdown for dashboard selection
  - [ ] Display only active dashboards
  - [ ] Show description on hover
- [ ] Create `src/components/reports/CardSelector.tsx`
  - [ ] Dropdown for table/card selection
  - [ ] Show card type badges
  - [ ] Loading state
  - [ ] Disabled state
- [ ] Create `src/components/reports/DataPreview.tsx`
  - [ ] Display row/column counts
  - [ ] Show first 5 rows preview
  - [ ] Column names display
- [ ] Create `src/components/reports/ReportTable.tsx`
  - [ ] Responsive table layout
  - [ ] Print-friendly styling
  - [ ] Handle large datasets
- [ ] Create `src/components/reports/ReportDocument.tsx`
  - [ ] Combine template + table data
  - [ ] Header with logos
  - [ ] Footer section
  - [ ] Print-ready layout

**Estimated time:** 4 hours
**Files:** `src/components/reports/DashboardSelector.tsx`, `CardSelector.tsx`, `DataPreview.tsx`, `ReportTable.tsx`, `ReportDocument.tsx`

### 27. Report Generation Pages (3 hours)
- [ ] Create `src/pages/GenerateReportPage.tsx`
  - [ ] Dashboard selection step
  - [ ] Fetch cards when dashboard selected
  - [ ] Card selection step
  - [ ] Data preview section
  - [ ] Navigate to preview page
  - [ ] Loading states
  - [ ] Error handling
- [ ] Create `src/pages/ReportPreviewPage.tsx`
  - [ ] Fetch template config from localStorage
  - [ ] Fetch card data from Metabase
  - [ ] Render ReportDocument component
  - [ ] Download PDF button
  - [ ] Print button
  - [ ] Back navigation
  - [ ] Loading state
  - [ ] Error handling

**Estimated time:** 3 hours
**Files:** `src/pages/GenerateReportPage.tsx`, `src/pages/ReportPreviewPage.tsx`

### 28. Routes & Navigation (30 mins)
- [ ] Update `src/routes.tsx`
  - [ ] Add `/reports/generate` route
  - [ ] Add `/reports/preview/:dashboardId/:cardId` route
- [ ] Update `src/manifest.tsx`
  - [ ] Add "Generate Report" to navItems
  - [ ] Icon: `FileText`

**Estimated time:** 30 minutes
**Files:** `src/routes.tsx`, `src/manifest.tsx`

### 29. Translation Keys (30 mins)
- [ ] Update `public/locale/en.json`
  - [ ] Add ~25 new translation keys
  - [ ] See `REPORT_GENERATION_DESIGN.md` for complete list

**Estimated time:** 30 minutes
**Files:** `public/locale/en.json`

### 30. Styling & Responsive Design (1.5 hours)
- [ ] Style GenerateReportPage with Tailwind
  - [ ] Two-step form layout
  - [ ] Preview section styling
- [ ] Style ReportPreviewPage with Tailwind
  - [ ] Report document layout
  - [ ] Action buttons
  - [ ] Responsive design
- [ ] Print CSS optimization
  - [ ] Test print layout
  - [ ] Test page breaks
- [ ] Test on mobile/tablet

**Estimated time:** 1.5 hours

### 31. Testing Report Generation (2 hours)
- [ ] Test with real Metabase dashboards
  - [ ] Public dashboard URLs
  - [ ] Multiple table visualizations
  - [ ] Large datasets (1000+ rows)
- [ ] Test PDF generation
  - [ ] With all template configurations
  - [ ] With/without logos
  - [ ] Different table sizes
- [ ] Test print functionality
  - [ ] All major browsers
  - [ ] Page breaks correct
- [ ] Test error scenarios
  - [ ] Invalid Metabase URL
  - [ ] Network errors
  - [ ] Empty dashboards
  - [ ] No table visualizations
- [ ] Cross-browser testing
  - [ ] Chrome, Firefox, Safari, Edge

**Estimated time:** 2 hours

---

## Optional Enhancements (Future)

### Report Generation Enhancements
- [ ] Chart support (convert charts to images using html2canvas)
- [ ] Custom Metabase filters before generation
- [ ] Scheduled reports (email delivery)
- [ ] Multi-table reports (combine multiple tables)
- [ ] Excel export (XLSX format)
- [ ] Multiple PDF templates (landscape/portrait)
- [ ] PDF watermarks (DRAFT, CONFIDENTIAL)
- [ ] Digital signatures

### Template Configuration Enhancements
- [ ] Rich text editor for header/footer (TinyMCE, Quill)
- [ ] Image cropper for logos
- [ ] Template presets (Government, Private Hospital, etc.)
- [ ] Import/Export configuration as JSON
- [ ] Bulk dashboard import from CSV
- [ ] Dashboard analytics (view counts)
- [ ] Multi-language support for templates
- [ ] Dark mode for preview

---

## Dependencies to Install

```bash
# Core dependencies (already in package.json)
npm install react-hook-form zod @hookform/resolvers

# Template configuration dependencies
npm install react-dropzone dompurify
npm install --save-dev @types/dompurify

# Report generation dependencies (Phase 13)
npm install jspdf jspdf-autotable
npm install --save-dev @types/jspdf

# Optional (if using rich text editor)
npm install react-quill
```

---

## Time Estimates Summary

### Core Plugin (Template Configuration + Dashboard Links)
| Phase | Task | Estimated Time |
|-------|------|----------------|
| 1 | TypeScript Types | 30 mins |
| 2 | Utilities & Services | 2 hours |
| 3 | Core Components | 6 hours |
| 4 | Preview Component | 2 hours |
| 5 | Main Page | 2 hours |
| 6 | Routing & Navigation | 30 mins |
| 7 | Translations | 30 mins |
| 8 | Styling & Polish | 2 hours |
| 9 | Error Handling | 1.5 hours |
| 10 | Testing | 3 hours |
| 11 | Documentation | 1 hour |
| 12 | Deployment | 30 mins |
| **Subtotal** | | **~22 hours** |

### Report Generation Feature (Phase 13)
| Task | Estimated Time |
|------|----------------|
| 24. Metabase Integration | 3 hours |
| 25. PDF Generation Service | 2 hours |
| 26. Report Generation Components | 4 hours |
| 27. Report Generation Pages | 3 hours |
| 28. Routes & Navigation | 30 mins |
| 29. Translation Keys | 30 mins |
| 30. Styling & Responsive | 1.5 hours |
| 31. Testing Report Generation | 2 hours |
| **Subtotal** | **~16 hours** |

### **GRAND TOTAL: ~38 hours**

---

## Progress Tracking

**Started:** _____
**Completed:** _____
**Status:** Not Started

### Milestones
- [ ] Phase 1-2 Complete (Types & Utilities)
- [ ] Phase 3-4 Complete (Components)
- [ ] Phase 5-7 Complete (Pages & Routes)
- [ ] Phase 8-9 Complete (Polish & Validation)
- [ ] Phase 10-12 Complete (Testing & Deployment)
- [ ] **Core Plugin Ready for Production**
- [ ] Phase 13 Complete (Report Generation Feature)
- [ ] **Full Plugin Ready for Production**

---

## Notes

Use this checklist to track your implementation progress. Check off items as you complete them. Feel free to adjust time estimates based on your experience.

**Tips:**
- Start with Phase 1-2 to build the foundation
- Test each component individually before integration
- Use Storybook (optional) for component development
- Commit frequently to Git
- Ask for code review before Phase 10 (Testing)

---

**Version:** 1.0
**Created:** 2026-09-09
**Last Updated:** 2026-09-09
