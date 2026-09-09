# Care Reports Plugin - Design Documentation

**Plugin:** `care_reports_fe`
**Version:** 0.1.0
**Status:** Design Complete ✅ | Implementation: Not Started

---

## 📋 Quick Navigation

### Core Features Documentation

1. **[DESIGN.md](./DESIGN.md)** - Main Design Document
   Complete specifications for template configuration and dashboard links management.
   - Problem statement & user stories
   - Data models & TypeScript types
   - Component architecture
   - localStorage schema
   - Security & validation
   - Migration path to backend API

2. **[WIREFRAMES.md](./WIREFRAMES.md)** - UI Wireframes
   Visual mockups for all pages and components.
   - 8 detailed ASCII wireframes
   - Component interaction states
   - Responsive layouts (desktop/tablet/mobile)
   - Color palette & typography
   - Accessibility guidelines

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical Architecture
   System architecture and technical specifications.
   - System overview diagrams
   - Data flow diagrams
   - Component hierarchy
   - State management
   - Security architecture
   - Performance optimizations

### Report Generation Feature

4. **[REPORT_GENERATION_DESIGN.md](./REPORT_GENERATION_DESIGN.md)** - Report Generation Specs
   Complete design for Metabase integration and PDF report generation.
   - User flow & data flow diagrams
   - Metabase API integration
   - PDF generation with jsPDF
   - Component specifications
   - Error handling & CORS

5. **[REPORT_GENERATION_WIREFRAMES.md](./REPORT_GENERATION_WIREFRAMES.md)** - Report UI Wireframes
   Visual mockups for report generation pages.
   - Generate Report page (2-step form)
   - Report Preview page
   - Loading & error states
   - PDF output preview

### Implementation Guide

6. **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Step-by-Step Checklist
   Detailed implementation roadmap with time estimates.
   - **Phase 1-12:** Core plugin (~22 hours)
   - **Phase 13:** Report generation (~16 hours)
   - **Total:** ~38 hours
   - Progress tracking & milestones

---

## 🎯 Feature Overview

### Core Plugin Features

#### 1. Template Configuration
Configure branded report templates with:
- Header text and logos (primary + secondary)
- Logo positioning (left/center/right)
- Description and subtitle
- Footer with contact info and disclaimer
- Preview capability
- **Storage:** localStorage (Phase 1), Backend API (Phase 2)

#### 2. Dashboard Links Management
Manage Metabase public dashboard URLs:
- Add/edit/delete dashboard links
- Categorize and tag dashboards
- Toggle active/inactive status
- Search and filter
- **Storage:** localStorage (Phase 1), Backend API (Phase 2)

### Report Generation Feature

#### 3. Generate Reports from Metabase
- Select configured dashboard
- Choose table visualization
- Preview data (first 5 rows)
- Generate PDF with template branding
- Print directly from browser
- **Integration:** Metabase public API + jsPDF

---

## 📊 Implementation Estimates

| Feature | Estimated Time |
|---------|----------------|
| **Core Plugin** | ~22 hours |
| ├─ Template Configuration | ~12 hours |
| ├─ Dashboard Links | ~5 hours |
| └─ Testing & Deployment | ~5 hours |
| **Report Generation** | ~16 hours |
| ├─ Metabase Integration | ~3 hours |
| ├─ PDF Generation | ~2 hours |
| ├─ UI Components | ~7 hours |
| └─ Testing | ~4 hours |
| **TOTAL** | **~38 hours** |

---

## 🗂️ File Structure

```
care_reports_fe/
├── design/                          ← You are here
│   ├── README.md                    ← This file
│   ├── DESIGN.md                    ← Main design doc
│   ├── WIREFRAMES.md                ← UI mockups
│   ├── ARCHITECTURE.md              ← Technical specs
│   ├── REPORT_GENERATION_DESIGN.md  ← Report feature design
│   ├── REPORT_GENERATION_WIREFRAMES.md ← Report UI mockups
│   └── IMPLEMENTATION_CHECKLIST.md  ← Implementation guide
│
├── src/
│   ├── types/
│   │   ├── reports.ts               ← Template & dashboard types
│   │   └── metabase.ts              ← Metabase API types
│   │
│   ├── lib/
│   │   ├── storage.ts               ← localStorage utilities
│   │   ├── imageUtils.ts            ← Image upload & Base64
│   │   ├── urlUtils.ts              ← URL validation
│   │   ├── metabaseApi.ts           ← Metabase integration
│   │   ├── pdfGenerator.ts          ← PDF generation (jsPDF)
│   │   └── printService.ts          ← Print functionality
│   │
│   ├── components/reports/
│   │   ├── LogoUploader.tsx
│   │   ├── TemplateConfigForm.tsx
│   │   ├── DashboardLinksTable.tsx
│   │   ├── DashboardLinkModal.tsx
│   │   ├── TemplatePreview.tsx
│   │   ├── DashboardSelector.tsx    ← Report generation
│   │   ├── CardSelector.tsx         ← Report generation
│   │   ├── DataPreview.tsx          ← Report generation
│   │   ├── ReportTable.tsx          ← Report generation
│   │   └── ReportDocument.tsx       ← Report generation
│   │
│   ├── pages/
│   │   ├── ConfigurationPage.tsx    ← Admin config page
│   │   ├── GenerateReportPage.tsx   ← Report generation
│   │   └── ReportPreviewPage.tsx    ← Report preview & download
│   │
│   ├── styles/
│   │   └── print.css                ← Print-specific styles
│   │
│   ├── routes.tsx                   ← Route definitions
│   └── manifest.tsx                 ← Plugin manifest
│
└── public/locale/en.json            ← i18n translations
```

---

## 🚀 Getting Started

### For Designers / Product Managers
1. Start with **[DESIGN.md](./DESIGN.md)** - Understand features and user flows
2. Review **[WIREFRAMES.md](./WIREFRAMES.md)** - Visual design mockups
3. Check **[REPORT_GENERATION_DESIGN.md](./REPORT_GENERATION_DESIGN.md)** - Report feature specs

### For Developers
1. Read **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical overview
2. Follow **[IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)** - Step-by-step guide
3. Reference **[DESIGN.md](./DESIGN.md)** - Detailed specs as you build

### For Reviewers
1. Check **[DESIGN.md](./DESIGN.md)** - Feature completeness
2. Review **[WIREFRAMES.md](./WIREFRAMES.md)** - UX/UI consistency
3. Validate **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical soundness

---

## 📦 Dependencies

### Core Dependencies
```bash
npm install react-hook-form zod @hookform/resolvers
npm install react-dropzone dompurify
```

### Report Generation
```bash
npm install jspdf jspdf-autotable
```

### Dev Dependencies
```bash
npm install --save-dev @types/dompurify @types/jspdf
```

---

## 🔐 Security Highlights

- **XSS Protection:** DOMPurify for sanitizing user input
- **File Upload:** Type and size validation (2MB max)
- **URL Validation:** Strict Metabase public URL format checking
- **localStorage:** Size monitoring and quota handling
- **CORS:** Metabase proxy strategy for production

---

## 🎨 Design Principles

1. **User-Centric:** Simple 2-step workflows
2. **Progressive Disclosure:** Show complexity only when needed
3. **Responsive:** Mobile-first, works on all devices
4. **Accessible:** WCAG AA compliant
5. **Print-Ready:** Optimized for PDF and print
6. **Error-Tolerant:** Graceful fallbacks and clear error messages

---

## 📝 Changelog

### Version 0.1.0 (2026-09-09)
- Initial design documentation
- Core plugin features (Template Config + Dashboard Links)
- Report generation feature (Metabase integration + PDF)
- Complete wireframes and architecture
- Implementation checklist (38-hour estimate)

---

## 🤝 Contributing to Design

### Suggesting Changes
1. Review existing design documents
2. Create a design proposal (markdown)
3. Discuss trade-offs and alternatives
4. Update relevant documents

### Design Review Checklist
- [ ] User stories documented
- [ ] Wireframes created
- [ ] Data models defined
- [ ] Error states covered
- [ ] Accessibility considered
- [ ] Security implications reviewed
- [ ] Implementation effort estimated

---

## 🔗 Related Resources

- **Main Repo:** `care_reports_fe`
- **Backend Plugin:** `care_plugin_template` (for Phase 2)
- **CARE Frontend:** `care_fe` (parent application)
- **Metabase Docs:** https://www.metabase.com/docs/latest/
- **jsPDF Docs:** https://github.com/parallax/jsPDF

---

## 📞 Questions?

For design questions or clarifications:
1. Review existing design documents first
2. Check implementation checklist for context
3. Consult architecture diagrams
4. Ask specific questions with references to design docs

---

**Last Updated:** 2026-09-09
**Document Version:** 1.0
**Status:** Ready for Implementation
