# Care Reports Plugin - Design Document

## Overview

A CARE frontend plugin that enables administrators to configure and customize Metabase dashboard reports with branded templates. Users can configure report headers, logos, descriptions, footers, and manage a list of public Metabase dashboards.

**Plugin Name:** `care_reports_fe`
**Version:** 0.1.0
**Author:** Jagankumar E (eGov Foundation)

---

## Problem Statement

Healthcare administrators need to:
- Brand Metabase dashboard reports with facility-specific headers, logos, and footers
- Configure report templates without modifying Metabase directly
- Manage multiple public dashboard links in one place
- Preview report templates before finalizing

**Current Gap:** No CARE-native way to customize Metabase dashboard presentation with healthcare facility branding.

---

## User Stories

### Admin User
1. **As an admin**, I want to configure a report template with my facility's header, logo, and footer, so that exported reports are properly branded.
2. **As an admin**, I want to add/edit/delete public Metabase dashboard URLs, so I can manage which reports are available.
3. **As an admin**, I want to preview how my report template looks, so I can verify branding before users see it.
4. **As an admin**, I want my configurations to persist, so I don't have to reconfigure every time.

### End User (Future)
5. **As a user**, I want to view Metabase dashboards with facility branding embedded within CARE, so the experience is seamless.

---

## Features

### Phase 1 (Current Scope - localStorage)

#### 1. Report Template Configuration
**Location:** Admin page at `/admin/reports/configuration`

**Configuration Fields:**
- **Header**
  - Header Text (Rich text / Plain text)
  - Primary Logo (Image upload → Base64 for localStorage)
  - Secondary Logo (Optional - for partner/government logos)
  - Logo positioning (Left, Center, Right)

- **Description**
  - Report description (Rich text)
  - Subtitle/tagline

- **Footer**
  - Footer text (Rich text)
  - Contact information
  - Disclaimer text

- **Preview Settings**
  - Preview URL (Any Metabase public dashboard for live preview)

**Actions:**
- Save configuration (localStorage)
- Reset to defaults
- Preview template

#### 2. Dashboard Links Management
**Location:** Same admin page (tabbed interface)

**Dashboard Link Fields:**
- Dashboard Name/Title
- Metabase Public URL
- Description (optional)
- Category/Tags (optional)
- Status (Active/Inactive)
- Created Date
- Last Modified

**Actions:**
- Add new dashboard link
- Edit existing link
- Delete link
- Toggle active/inactive
- Copy link
- Open in new tab (preview)

#### 3. Preview Component
**Location:** Modal or inline preview section

**Features:**
- Live preview of configured template
- Renders actual Metabase iframe with template overlay
- Shows header, footer, logos in position
- Mobile/desktop preview toggle

---

## Data Model

### localStorage Schema

#### 1. Report Template Configuration
**Key:** `care_reports_template_config`

```typescript
interface ReportTemplateConfig {
  version: string; // Schema version for migrations
  header: {
    text: string;
    primaryLogo: {
      dataUrl: string; // Base64 image data
      alt: string;
      position: 'left' | 'center' | 'right';
    };
    secondaryLogo?: {
      dataUrl: string;
      alt: string;
      position: 'left' | 'center' | 'right';
    };
  };
  description: {
    text: string;
    subtitle?: string;
  };
  footer: {
    text: string;
    contact?: string;
    disclaimer?: string;
  };
  preview: {
    defaultDashboardUrl?: string;
  };
  updatedAt: string; // ISO timestamp
  updatedBy?: string; // User ID (future)
}
```

#### 2. Dashboard Links
**Key:** `care_reports_dashboards`

```typescript
interface DashboardLink {
  id: string; // UUID
  name: string;
  url: string; // Metabase public URL
  description?: string;
  category?: string;
  tags?: string[];
  status: 'active' | 'inactive';
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

interface DashboardLinksStore {
  version: string;
  dashboards: DashboardLink[];
}
```

---

## UI/UX Design

### Admin Configuration Page

**Route:** `/admin/reports/configuration`

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Reports Configuration                        [Save] │
├─────────────────────────────────────────────────────┤
│                                                     │
│ [Template Configuration] [Dashboard Links]         │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Template Configuration Tab                   │   │
│ │                                               │   │
│ │ Header Configuration                          │   │
│ │ ┌────────────────────────────────────────┐   │   │
│ │ │ Header Text                             │   │
│ │ │ [Rich text editor]                      │   │
│ │ └────────────────────────────────────────┘   │   │
│ │                                               │   │
│ │ ┌─────────────┐  ┌─────────────┐            │   │
│ │ │ Primary Logo │  │ Secondary   │            │   │
│ │ │ [Upload]     │  │ Logo        │            │   │
│ │ │ [Preview]    │  │ [Upload]    │            │   │
│ │ └─────────────┘  └─────────────┘            │   │
│ │                                               │   │
│ │ Logo Position: ○ Left ● Center ○ Right       │   │
│ │                                               │   │
│ │ Description                                   │   │
│ │ ┌────────────────────────────────────────┐   │   │
│ │ │ [Rich text editor]                      │   │
│ │ └────────────────────────────────────────┘   │   │
│ │                                               │   │
│ │ Footer Configuration                          │   │
│ │ ┌────────────────────────────────────────┐   │   │
│ │ │ Footer Text                             │   │
│ │ │ [Rich text editor]                      │   │
│ │ └────────────────────────────────────────┘   │   │
│ │                                               │   │
│ │ [Reset to Defaults] [Preview] [Save Config]  │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Dashboard Links Tab

```
┌─────────────────────────────────────────────────────┐
│ [Template Configuration] [Dashboard Links]          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Dashboard Links                      [+ Add Link]   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Search: [___________] Filter: [All ▼]       │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Patient Demographics Dashboard         ✓    │   │
│ │ https://metabase.../public/...               │   │
│ │ Category: Clinical | Updated: 2 days ago     │   │
│ │ [Edit] [Delete] [Preview] [Copy URL]        │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Facility Bed Occupancy                  ✗    │   │
│ │ https://metabase.../public/...               │   │
│ │ Category: Admin | Updated: 1 week ago        │   │
│ │ [Edit] [Delete] [Preview] [Copy URL]        │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Preview Modal

```
┌──────────────────────────────────────────────────────┐
│ Template Preview                          [✕ Close] │
├──────────────────────────────────────────────────────┤
│                                                      │
│ [Desktop View] [Mobile View]                        │
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ ┌──────────────────────────────────────────┐   │ │
│ │ │ [Logo] Facility Name Header              │   │ │
│ │ └──────────────────────────────────────────┘   │ │
│ │                                                 │ │
│ │ Report Description goes here...                │ │
│ │                                                 │ │
│ │ ┌──────────────────────────────────────────┐   │ │
│ │ │ [Metabase Dashboard Preview/Iframe]      │   │ │
│ │ │                                           │   │ │
│ │ │   [Chart/Graph visualization]            │   │ │
│ │ │                                           │   │ │
│ │ └──────────────────────────────────────────┘   │ │
│ │                                                 │ │
│ │ ┌──────────────────────────────────────────┐   │ │
│ │ │ Footer text and disclaimers              │   │ │
│ │ │ Contact: admin@hospital.org              │   │ │
│ │ └──────────────────────────────────────────┘   │ │
│ └────────────────────────────────────────────────┘ │
│                                                      │
│                   [Use Dashboard URL: ▼]            │
└──────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Pages

#### 1. `ConfigurationPage.tsx`
**Route:** `/admin/reports/configuration`

**Features:**
- Tabbed interface (Template Config | Dashboard Links)
- Manages both template and dashboard link configurations
- Handles localStorage read/write

**State:**
```typescript
{
  activeTab: 'template' | 'dashboards',
  templateConfig: ReportTemplateConfig,
  dashboards: DashboardLink[],
  isPreviewOpen: boolean,
  isSaving: boolean,
}
```

### Components

#### 2. `TemplateConfigForm.tsx`
**Props:**
```typescript
{
  config: ReportTemplateConfig,
  onChange: (config: ReportTemplateConfig) => void,
  onSave: () => void,
  onReset: () => void,
  onPreview: () => void,
}
```

**Features:**
- Header text input (rich text editor or textarea)
- Logo upload with preview (converts to Base64)
- Description editor
- Footer editor
- Action buttons

#### 3. `LogoUploader.tsx`
**Props:**
```typescript
{
  label: string,
  value?: { dataUrl: string, alt: string },
  onChange: (logo: { dataUrl: string, alt: string }) => void,
  maxSize?: number, // Default 2MB
  position?: 'left' | 'center' | 'right',
  onPositionChange?: (pos: string) => void,
}
```

**Features:**
- Drag-and-drop or click to upload
- Image preview
- Convert to Base64 data URL
- Validate file size and type (PNG, JPG, SVG)
- Remove logo button

#### 4. `DashboardLinksTable.tsx`
**Props:**
```typescript
{
  dashboards: DashboardLink[],
  onAdd: () => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
  onToggleStatus: (id: string) => void,
}
```

**Features:**
- Table/card view of dashboards
- Search and filter
- Actions: Edit, Delete, Preview, Copy URL
- Status toggle (active/inactive)

#### 5. `DashboardLinkModal.tsx`
**Props:**
```typescript
{
  isOpen: boolean,
  dashboard?: DashboardLink, // undefined for create, object for edit
  onSave: (dashboard: DashboardLink) => void,
  onClose: () => void,
}
```

**Features:**
- Form for dashboard link details
- URL validation
- Category/tags input

#### 6. `TemplatePreview.tsx`
**Props:**
```typescript
{
  isOpen: boolean,
  config: ReportTemplateConfig,
  dashboardUrl?: string,
  onClose: () => void,
}
```

**Features:**
- Renders template with header/footer overlay
- Embeds Metabase dashboard iframe
- Desktop/mobile view toggle
- Dashboard URL selector

---

## Routes

### Plugin Routes
```typescript
routes: {
  "/admin/reports/configuration": () => (
    <PageWrapper>
      <ConfigurationPage />
    </PageWrapper>
  ),
}
```

### Navigation
```typescript
adminNavItems: [
  {
    url: "/admin/reports/configuration",
    name: "Report Configuration",
    icon: <Settings className="size-4" />,
  },
]
```

---

## localStorage Utilities

### `lib/storage.ts`

```typescript
import { ReportTemplateConfig, DashboardLinksStore } from '@/types/reports';

const TEMPLATE_KEY = 'care_reports_template_config';
const DASHBOARDS_KEY = 'care_reports_dashboards';

// Template Configuration
export const getTemplateConfig = (): ReportTemplateConfig | null => {
  const data = localStorage.getItem(TEMPLATE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveTemplateConfig = (config: ReportTemplateConfig): void => {
  config.updatedAt = new Date().toISOString();
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(config));
};

export const getDefaultTemplateConfig = (): ReportTemplateConfig => {
  return {
    version: '1.0',
    header: {
      text: '',
      primaryLogo: { dataUrl: '', alt: '', position: 'left' },
    },
    description: { text: '' },
    footer: { text: '' },
    preview: {},
    updatedAt: new Date().toISOString(),
  };
};

// Dashboard Links
export const getDashboards = (): DashboardLink[] => {
  const data = localStorage.getItem(DASHBOARDS_KEY);
  if (!data) return [];
  const store: DashboardLinksStore = JSON.parse(data);
  return store.dashboards || [];
};

export const saveDashboards = (dashboards: DashboardLink[]): void => {
  const store: DashboardLinksStore = {
    version: '1.0',
    dashboards,
  };
  localStorage.setItem(DASHBOARDS_KEY, JSON.stringify(store));
};

export const addDashboard = (dashboard: Omit<DashboardLink, 'id' | 'createdAt' | 'updatedAt'>): DashboardLink => {
  const dashboards = getDashboards();
  const newDashboard: DashboardLink = {
    ...dashboard,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dashboards.push(newDashboard);
  saveDashboards(dashboards);
  return newDashboard;
};

export const updateDashboard = (id: string, updates: Partial<DashboardLink>): void => {
  const dashboards = getDashboards();
  const index = dashboards.findIndex(d => d.id === id);
  if (index !== -1) {
    dashboards[index] = {
      ...dashboards[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    saveDashboards(dashboards);
  }
};

export const deleteDashboard = (id: string): void => {
  const dashboards = getDashboards().filter(d => d.id !== id);
  saveDashboards(dashboards);
};
```

---

## Image Upload & Base64 Handling

### `lib/imageUtils.ts`

```typescript
export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only PNG, JPG, and SVG files are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 2MB' };
  }

  return { valid: true };
};
```

---

## TypeScript Types

### `types/reports.ts`

```typescript
export type LogoPosition = 'left' | 'center' | 'right';
export type DashboardStatus = 'active' | 'inactive';

export interface Logo {
  dataUrl: string; // Base64 data URL
  alt: string;
  position: LogoPosition;
}

export interface ReportTemplateConfig {
  version: string;
  header: {
    text: string;
    primaryLogo: Logo;
    secondaryLogo?: Logo;
  };
  description: {
    text: string;
    subtitle?: string;
  };
  footer: {
    text: string;
    contact?: string;
    disclaimer?: string;
  };
  preview: {
    defaultDashboardUrl?: string;
  };
  updatedAt: string;
  updatedBy?: string;
}

export interface DashboardLink {
  id: string;
  name: string;
  url: string;
  description?: string;
  category?: string;
  tags?: string[];
  status: DashboardStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardLinksStore {
  version: string;
  dashboards: DashboardLink[];
}
```

---

## Translation Keys

### `public/locale/en.json` (additions)

```json
{
  "reports_configuration": "Report Configuration",
  "reports_template_config": "Template Configuration",
  "reports_dashboard_links": "Dashboard Links",
  "reports_header": "Header",
  "reports_header_text": "Header Text",
  "reports_primary_logo": "Primary Logo",
  "reports_secondary_logo": "Secondary Logo",
  "reports_logo_position": "Logo Position",
  "reports_position_left": "Left",
  "reports_position_center": "Center",
  "reports_position_right": "Right",
  "reports_description": "Description",
  "reports_subtitle": "Subtitle",
  "reports_footer": "Footer",
  "reports_footer_text": "Footer Text",
  "reports_contact": "Contact Information",
  "reports_disclaimer": "Disclaimer",
  "reports_preview": "Preview",
  "reports_save": "Save Configuration",
  "reports_reset": "Reset to Defaults",
  "reports_upload_logo": "Upload Logo",
  "reports_remove_logo": "Remove Logo",
  "reports_add_dashboard": "Add Dashboard",
  "reports_edit_dashboard": "Edit Dashboard",
  "reports_delete_dashboard": "Delete Dashboard",
  "reports_dashboard_name": "Dashboard Name",
  "reports_dashboard_url": "Dashboard URL",
  "reports_dashboard_category": "Category",
  "reports_dashboard_tags": "Tags",
  "reports_dashboard_status": "Status",
  "reports_active": "Active",
  "reports_inactive": "Inactive",
  "reports_copy_url": "Copy URL",
  "reports_open_preview": "Open Preview",
  "reports_saved_success": "Configuration saved successfully",
  "reports_save_error": "Failed to save configuration",
  "reports_invalid_url": "Invalid Metabase URL",
  "reports_confirm_delete": "Are you sure you want to delete this dashboard?",
  "reports_desktop_view": "Desktop View",
  "reports_mobile_view": "Mobile View"
}
```

---

## Migration Path (Phase 2 - Backend Integration)

When migrating from localStorage to backend API:

### Backend API Endpoints
```
GET    /api/care_reports/template-config/
POST   /api/care_reports/template-config/
PATCH  /api/care_reports/template-config/:id/

GET    /api/care_reports/dashboards/
POST   /api/care_reports/dashboards/
PATCH  /api/care_reports/dashboards/:id/
DELETE /api/care_reports/dashboards/:id/
```

### Strategy
1. Create abstraction layer: `lib/storage.ts` → `lib/configService.ts`
2. Switch between localStorage and API based on environment flag
3. Migrate logo storage to file uploads (S3/MinIO) instead of Base64
4. Add user permissions and facility-level scoping

---

## Security Considerations

### Phase 1 (localStorage)
1. **XSS Protection:** Sanitize all user input (header, footer, descriptions)
2. **File Upload:** Validate image file types and sizes
3. **URL Validation:** Validate Metabase URLs to prevent malicious links
4. **localStorage Limits:** Monitor size (typically 5-10MB limit per domain)

### Phase 2 (Backend)
1. **Authentication:** Admin-only access via CARE RBAC
2. **File Upload:** Server-side validation, virus scanning
3. **CSRF Protection:** Use CARE's existing CSRF middleware
4. **Rate Limiting:** Prevent abuse of upload/save endpoints

---

## Testing Strategy

### Unit Tests
- localStorage utilities (`lib/storage.ts`)
- Image conversion utilities (`lib/imageUtils.ts`)
- Component rendering (React Testing Library)

### Integration Tests
- Full configuration flow (upload logo → save → preview)
- Dashboard CRUD operations
- localStorage persistence

### Manual Testing Checklist
- [ ] Upload logos (PNG, JPG, SVG) - verify Base64 conversion
- [ ] Save template configuration - verify localStorage persistence
- [ ] Add/Edit/Delete dashboard links - verify list updates
- [ ] Preview template with actual Metabase iframe
- [ ] Reset configuration to defaults
- [ ] Test with localStorage disabled (graceful fallback)
- [ ] Test localStorage size limits (large images)

---

## Dependencies

### New Dependencies (to be added)
```json
{
  "react-quill": "^2.0.0",        // Rich text editor (or alternative)
  "dompurify": "^3.0.0",          // XSS sanitization
  "react-dropzone": "^14.2.3"     // Drag-and-drop file upload
}
```

### Alternatives Considered
- **Rich Text Editor:** TinyMCE, Tiptap, Quill (chose Quill for simplicity)
- **File Upload:** react-dropzone, react-file-upload (chose react-dropzone)

---

## Open Questions

1. **Logo Size Limits:** What's the recommended logo dimensions? (Suggest: 200x60px)
2. **Rich Text vs Plain Text:** Do we need full rich text editing or simple textarea?
3. **Metabase Integration:** Do we need to verify Metabase URLs or just store them?
4. **Multi-tenancy:** Should configurations be facility-specific or global?
5. **Export Format:** Future requirement to export dashboard as PDF with template?

---

## Future Enhancements (Out of Scope)

1. **Dashboard Embedding:** Render Metabase dashboards within CARE (not just links)
2. **PDF Export:** Export configured reports as branded PDFs
3. **Template Presets:** Multiple template themes (e.g., Government, Private Hospital)
4. **Role-based Dashboards:** Show different dashboards based on user role
5. **Analytics:** Track which dashboards are most viewed
6. **Scheduling:** Schedule report generation and email delivery
7. **Multi-language:** Translate template text into regional languages

---

## Implementation Checklist

### Phase 1: Core Features
- [ ] Create TypeScript types (`types/reports.ts`)
- [ ] Implement localStorage utilities (`lib/storage.ts`)
- [ ] Implement image utilities (`lib/imageUtils.ts`)
- [ ] Create `LogoUploader` component
- [ ] Create `TemplateConfigForm` component
- [ ] Create `DashboardLinksTable` component
- [ ] Create `DashboardLinkModal` component
- [ ] Create `TemplatePreview` component
- [ ] Create `ConfigurationPage` with tabs
- [ ] Add translation keys
- [ ] Update routes and navigation
- [ ] Add unit tests
- [ ] Manual testing

### Phase 2: Polish
- [ ] Add loading states and error handling
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Add confirmation dialogs for destructive actions
- [ ] Add toast notifications for success/error
- [ ] Performance optimization (debounce saves, lazy loading)

### Phase 3: Backend Integration (Future)
- [ ] Design backend API schema
- [ ] Implement backend endpoints
- [ ] Migrate from localStorage to API
- [ ] Implement file upload service
- [ ] Add user permissions
- [ ] Add facility-level scoping

---

## Approval & Sign-off

**Reviewed By:**
**Date:**
**Status:** Draft

---

**Document Version:** 1.0
**Last Updated:** 2026-09-09
**Next Review:** After Phase 1 implementation
