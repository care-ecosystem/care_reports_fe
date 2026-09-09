# Setup Instructions

## Installation Complete! 🎉

All the code for your Care Reports Plugin has been implemented. Follow these steps to get it running.

---

## 1. Fix NPM Permissions (One-time)

If you encounter permission errors, run:

```bash
sudo chown -R $(whoami):$(id -gn) ~/.npm
```

---

## 2. Install Dependencies

```bash
# Install all required dependencies
npm install --legacy-peer-deps react-dropzone dompurify jspdf jspdf-autotable

# Or install type definitions if needed
npm install --save-dev @types/dompurify
```

---

## 3. Start Development Server

```bash
npm run dev
```

Your plugin will be available at: `http://localhost:5177/assets/remoteEntry.js`

---

## 4. Register with care_fe

In your `care_fe` environment config, add the plugin URL:

```bash
# For local development
http://localhost:5177/assets/remoteEntry.js

# For production (GitHub Pages)
https://your-username.github.io/care_reports_fe/assets/remoteEntry.js
```

---

## 5. Test the Plugin

### Configuration Page (Admin)
1. Navigate to: `/admin/reports/configuration`
2. Configure template:
   - Upload logos (primary & secondary)
   - Set header text, description, footer
   - Save configuration
3. Add dashboard links:
   - Click "Add Dashboard"
   - Enter Metabase public URL
   - Save

### Generate Reports (User)
1. Navigate to: `/reports/generate`
2. Select a dashboard from dropdown
3. Select a table visualization
4. Preview data
5. Click "Preview Report"
6. Download PDF or print

---

## What's Been Implemented

### ✅ TypeScript Types
- `src/types/reports.ts` - Template and dashboard types
- `src/types/metabase.ts` - Metabase API types

### ✅ Utilities & Services
- `src/lib/storage.ts` - localStorage CRUD operations
- `src/lib/imageUtils.ts` - Image upload & Base64 conversion
- `src/lib/urlUtils.ts` - URL validation
- `src/lib/metabaseApi.ts` - Metabase public API integration
- `src/lib/pdfGenerator.ts` - PDF generation with jsPDF
- `src/lib/printService.ts` - Browser print functionality

### ✅ Pages
- `src/pages/ConfigurationPage.tsx` - Admin configuration (template + dashboards)
- `src/pages/GenerateReportPage.tsx` - Report generation wizard
- `src/pages/ReportPreviewPage.tsx` - Preview & download

### ✅ Routes & Navigation
- Updated `src/routes.tsx`
- Updated `src/manifest.tsx` with navigation items
- Added print CSS (`src/styles/print.css`)

### ✅ Translations
- 65+ translation keys in `public/locale/en.json`

---

## Features

### 1. Template Configuration
- Dual logo support (primary + secondary)
- Logo positioning (left/center/right)
- Header, description, footer sections
- Contact information and disclaimers
- localStorage persistence

### 2. Dashboard Links Management
- Add/edit/delete Metabase dashboard URLs
- Categories and descriptions
- Active/inactive status
- Search and filter

### 3. Report Generation
- Select dashboard and table visualization
- Preview data (first 5 rows)
- Generate branded PDF with jsPDF
- Print directly from browser
- Metabase JSON API integration

---

## File Structure

```
care_reports_fe/
├── design/                    ← Design documentation
├── src/
│   ├── types/
│   │   ├── reports.ts         ← Template & dashboard types
│   │   └── metabase.ts        ← Metabase API types
│   ├── lib/
│   │   ├── storage.ts         ← localStorage utilities
│   │   ├── imageUtils.ts      ← Image processing
│   │   ├── urlUtils.ts        ← URL validation
│   │   ├── metabaseApi.ts     ← Metabase integration
│   │   ├── pdfGenerator.ts    ← PDF generation
│   │   └── printService.ts    ← Print functionality
│   ├── pages/
│   │   ├── ConfigurationPage.tsx    ← Admin config
│   │   ├── GenerateReportPage.tsx   ← Report wizard
│   │   └── ReportPreviewPage.tsx    ← Preview & download
│   ├── styles/
│   │   └── print.css          ← Print-specific styles
│   ├── routes.tsx             ← Route definitions
│   ├── manifest.tsx           ← Plugin manifest
│   └── index.tsx              ← Entry point
├── public/locale/en.json      ← Translations
└── package.json
```

---

## Next Steps

1. **Run the setup commands above** ☝️
2. **Test locally** with `npm run dev`
3. **Configure template** in admin page
4. **Add Metabase dashboards**
5. **Generate your first report!**

---

## Troubleshooting

### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### CORS Issues with Metabase
If you get CORS errors when fetching from Metabase:
- Ensure the dashboard URL is a **public** Metabase URL
- Check Metabase CORS settings
- Consider using a backend proxy in production

### localStorage Quota Exceeded
- Limit logo sizes to < 2MB
- Use image compression
- Consider migrating to backend API (Phase 2)

---

## Documentation

- **Design Specs:** `design/README.md`
- **Implementation Guide:** `design/IMPLEMENTATION_CHECKLIST.md`
- **Architecture:** `design/ARCHITECTURE.md`
- **Report Generation:** `design/REPORT_GENERATION_DESIGN.md`

---

**Questions?** Check the design documentation or ask for help!

🚀 **Happy reporting!**
