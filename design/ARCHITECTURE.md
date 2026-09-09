# Care Reports Plugin - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CARE Main Application                     │
│                     (React + Module Federation)                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ Loads Plugin
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    care_reports_fe Plugin                        │
│                  (Micro-frontend via Vite)                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      Plugin Manifest                      │  │
│  │  - Routes: /admin/reports/configuration                  │  │
│  │  - Admin Nav Items                                        │  │
│  │  - i18n Translations                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   UI Components Layer                     │  │
│  │                                                            │  │
│  │  Pages:                    Components:                    │  │
│  │  ├─ ConfigurationPage      ├─ TemplateConfigForm         │  │
│  │                            ├─ LogoUploader               │  │
│  │                            ├─ DashboardLinksTable        │  │
│  │                            ├─ DashboardLinkModal         │  │
│  │                            └─ TemplatePreview            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                │                                 │
│                                ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Business Logic Layer                    │  │
│  │                                                            │  │
│  │  Storage Utils:            Validation Utils:              │  │
│  │  ├─ getTemplateConfig()    ├─ validateImageFile()        │  │
│  │  ├─ saveTemplateConfig()   ├─ isValidMetabaseUrl()       │  │
│  │  ├─ getDashboards()        └─ sanitizeUrl()              │  │
│  │  ├─ addDashboard()                                        │  │
│  │  └─ deleteDashboard()      Image Utils:                  │  │
│  │                            └─ convertImageToBase64()      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                │                                 │
│                                ▼                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Data Persistence Layer                   │  │
│  │                                                            │  │
│  │  localStorage:                                             │  │
│  │  ├─ care_reports_template_config                          │  │
│  │  │  └─ ReportTemplateConfig (JSON)                        │  │
│  │  │                                                         │  │
│  │  └─ care_reports_dashboards                               │  │
│  │     └─ DashboardLinksStore (JSON)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  External Services    │
                    │  - Metabase Dashboards│
                    │    (Public iframes)   │
                    └───────────────────────┘
```

---

## Data Flow Diagrams

### 1. Template Configuration Save Flow

```
User fills form
      │
      ▼
TemplateConfigForm
      │
      ├─ User uploads logo image (File)
      │         │
      │         ▼
      │  convertImageToBase64()
      │         │
      │         ▼
      │  Returns Base64 string
      │
      ├─ User fills text fields
      │
      ▼
User clicks "Save Config"
      │
      ▼
ConfigurationPage.handleSave()
      │
      ├─ Validate form data
      │
      ▼
saveTemplateConfig(config)
      │
      ├─ Add timestamp (updatedAt)
      │
      ▼
localStorage.setItem('care_reports_template_config', JSON.stringify(config))
      │
      ▼
Success toast notification
```

### 2. Dashboard Link Add Flow

```
User clicks "Add Dashboard"
      │
      ▼
DashboardLinkModal opens
      │
      ▼
User fills form
      │
      ├─ Dashboard name
      ├─ Metabase URL
      ├─ Description
      ├─ Category
      └─ Tags
      │
      ▼
User clicks "Save Dashboard"
      │
      ▼
DashboardLinkModal.handleSave()
      │
      ├─ Validate URL (isValidMetabaseUrl)
      ├─ Validate required fields
      │
      ▼
addDashboard(dashboardData)
      │
      ├─ Generate UUID
      ├─ Add timestamps (createdAt, updatedAt)
      │
      ▼
getDashboards()
      │
      ▼
[...existingDashboards, newDashboard]
      │
      ▼
saveDashboards(updatedArray)
      │
      ▼
localStorage.setItem('care_reports_dashboards', JSON.stringify(store))
      │
      ▼
Modal closes + Success toast
      │
      ▼
DashboardLinksTable re-renders
```

### 3. Template Preview Flow

```
User clicks "Preview Template"
      │
      ▼
ConfigurationPage.handlePreview()
      │
      ├─ Get current template config (from state)
      │
      ▼
TemplatePreview modal opens
      │
      ├─ Render Header section
      │   ├─ Display logos (from Base64)
      │   └─ Display header text
      │
      ├─ Render Description section
      │
      ├─ Render Metabase iframe
      │   ├─ Use config.preview.defaultDashboardUrl
      │   └─ Or allow user to select from dashboards list
      │
      └─ Render Footer section
      │
      ▼
User toggles Desktop/Mobile view
      │
      ▼
Preview adjusts CSS layout
```

---

## Component Hierarchy

```
ConfigurationPage
│
├─ Tabs (Template Config | Dashboard Links)
│
├─ Template Config Tab
│   │
│   └─ TemplateConfigForm
│       │
│       ├─ Header Section
│       │   ├─ Textarea (Header Text)
│       │   ├─ LogoUploader (Primary Logo)
│       │   │   ├─ react-dropzone
│       │   │   ├─ Image Preview
│       │   │   └─ Upload/Remove buttons
│       │   │
│       │   ├─ LogoUploader (Secondary Logo)
│       │   └─ Radio Group (Logo Position)
│       │
│       ├─ Description Section
│       │   ├─ Textarea (Description)
│       │   └─ Input (Subtitle)
│       │
│       ├─ Footer Section
│       │   ├─ Textarea (Footer Text)
│       │   ├─ Input (Contact)
│       │   └─ Textarea (Disclaimer)
│       │
│       └─ Actions
│           ├─ Button (Reset)
│           ├─ Button (Preview)
│           └─ Button (Save)
│
├─ Dashboard Links Tab
│   │
│   └─ DashboardLinksTable
│       │
│       ├─ Toolbar
│       │   ├─ Search Input
│       │   ├─ Category Filter
│       │   └─ Add Button
│       │
│       ├─ Dashboard Cards (mobile) / Table (desktop)
│       │   └─ DashboardCard (for each dashboard)
│       │       ├─ Name, URL, Description
│       │       ├─ Status Badge
│       │       ├─ Metadata (Category, Tags, Dates)
│       │       └─ Actions
│       │           ├─ Edit Button
│       │           ├─ Delete Button
│       │           ├─ Preview Button
│       │           └─ Copy URL Button
│       │
│       └─ Empty State (if no dashboards)
│
├─ DashboardLinkModal (Add/Edit)
│   │
│   └─ Form
│       ├─ Input (Name)
│       ├─ Input (URL)
│       ├─ Textarea (Description)
│       ├─ Select (Category)
│       ├─ Tags Input
│       ├─ Checkbox (Status)
│       └─ Actions
│           ├─ Button (Cancel)
│           └─ Button (Save)
│
└─ TemplatePreview Modal
    │
    ├─ Toolbar
    │   ├─ Toggle (Desktop/Mobile)
    │   └─ Select (Dashboard URL)
    │
    └─ Preview Container
        ├─ Header Section
        │   ├─ Logo Images (Base64)
        │   └─ Header Text
        │
        ├─ Description Section
        │
        ├─ Metabase iframe
        │   └─ Loading spinner
        │
        └─ Footer Section
            ├─ Footer Text
            ├─ Contact Info
            └─ Disclaimer
```

---

## State Management

### ConfigurationPage State

```typescript
interface ConfigurationPageState {
  // Tab state
  activeTab: 'template' | 'dashboards';

  // Template configuration
  templateConfig: ReportTemplateConfig;
  isTemplateModified: boolean;

  // Dashboard links
  dashboards: DashboardLink[];
  searchQuery: string;
  categoryFilter: string | null;

  // Modals
  isPreviewOpen: boolean;
  isDashboardModalOpen: boolean;
  editingDashboard: DashboardLink | null;

  // Loading states
  isLoading: boolean;
  isSaving: boolean;

  // Error state
  error: string | null;
}
```

### TemplateConfigForm State

```typescript
interface TemplateConfigFormState {
  // Form fields mirror ReportTemplateConfig
  headerText: string;
  primaryLogo: Logo | null;
  secondaryLogo: Logo | null;
  logoPosition: LogoPosition;
  description: string;
  subtitle: string;
  footerText: string;
  contact: string;
  disclaimer: string;
  previewUrl: string;

  // Validation errors
  errors: Record<string, string>;

  // Upload states
  isUploadingPrimaryLogo: boolean;
  isUploadingSecondaryLogo: boolean;
}
```

### LogoUploader State

```typescript
interface LogoUploaderState {
  // Current logo
  logo: Logo | null;

  // Upload state
  isUploading: boolean;
  uploadProgress: number;

  // Drag state
  isDragging: boolean;

  // Error
  error: string | null;
}
```

---

## localStorage Schema Details

### Key: `care_reports_template_config`

**Structure:**
```json
{
  "version": "1.0",
  "header": {
    "text": "Government of Kerala - District Hospital Dashboard",
    "primaryLogo": {
      "dataUrl": "data:image/png;base64,iVBORw0KG...",
      "alt": "Hospital Logo",
      "position": "left"
    },
    "secondaryLogo": {
      "dataUrl": "data:image/png;base64,iVBORw0KG...",
      "alt": "Government Emblem",
      "position": "right"
    }
  },
  "description": {
    "text": "This dashboard provides real-time insights...",
    "subtitle": "Generated on: {date}"
  },
  "footer": {
    "text": "© 2026 District Hospital, Kerala Health Department",
    "contact": "Email: admin@hospital.kerala.gov.in | Ph: 0484-xxx",
    "disclaimer": "This data is confidential and for authorized use only"
  },
  "preview": {
    "defaultDashboardUrl": "https://metabase.../public/dashboard/..."
  },
  "updatedAt": "2026-09-09T10:30:00.000Z",
  "updatedBy": null
}
```

**Size Estimate:** ~5-15 KB (depending on logo sizes)

---

### Key: `care_reports_dashboards`

**Structure:**
```json
{
  "version": "1.0",
  "dashboards": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Patient Demographics Dashboard",
      "url": "https://metabase.care.gov.in/public/dashboard/abcd-1234",
      "description": "Shows patient distribution by age, gender, and location",
      "category": "Clinical Reports",
      "tags": ["demographics", "patients", "analytics"],
      "status": "active",
      "createdAt": "2026-01-05T08:00:00.000Z",
      "updatedAt": "2026-09-07T14:22:00.000Z"
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "Bed Occupancy Report",
      "url": "https://metabase.care.gov.in/public/dashboard/efgh-5678",
      "description": "Real-time bed occupancy across all wards",
      "category": "Admin Reports",
      "tags": ["beds", "occupancy", "capacity"],
      "status": "inactive",
      "createdAt": "2025-12-20T10:15:00.000Z",
      "updatedAt": "2026-09-02T09:10:00.000Z"
    }
  ]
}
```

**Size Estimate:** ~1-5 KB (for 10-20 dashboards)

---

## API Integration (Phase 2 - Future)

### Backend Endpoints (Django REST Framework)

```
Base URL: /api/care_reports/

Template Configuration:
  GET    /template-config/              # Get current config
  POST   /template-config/              # Create new config
  PATCH  /template-config/{id}/         # Update config
  DELETE /template-config/{id}/         # Delete config

Logo Upload:
  POST   /template-config/upload-logo/  # Upload logo file
  DELETE /template-config/logo/{id}/    # Delete logo file

Dashboard Links:
  GET    /dashboards/                   # List all dashboards
  POST   /dashboards/                   # Create dashboard
  GET    /dashboards/{id}/              # Get dashboard
  PATCH  /dashboards/{id}/              # Update dashboard
  DELETE /dashboards/{id}/              # Delete dashboard

Bulk Operations:
  POST   /dashboards/bulk-import/       # Bulk import from CSV
  GET    /dashboards/export/            # Export as JSON/CSV
```

### Database Schema (Phase 2)

```sql
-- Template Configuration Table
CREATE TABLE care_reports_template_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID REFERENCES care_facility(id),
    header_text TEXT,
    primary_logo VARCHAR(500),  -- URL to S3/MinIO
    primary_logo_alt VARCHAR(200),
    primary_logo_position VARCHAR(20),
    secondary_logo VARCHAR(500),
    secondary_logo_alt VARCHAR(200),
    secondary_logo_position VARCHAR(20),
    description TEXT,
    subtitle VARCHAR(500),
    footer_text TEXT,
    contact_info VARCHAR(500),
    disclaimer TEXT,
    preview_dashboard_url TEXT,
    created_by UUID REFERENCES care_user(id),
    updated_by UUID REFERENCES care_user(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Dashboard Links Table
CREATE TABLE care_reports_dashboard_link (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id UUID REFERENCES care_facility(id),
    name VARCHAR(200) NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    category VARCHAR(100),
    tags TEXT[],  -- PostgreSQL array
    status VARCHAR(20) DEFAULT 'active',
    created_by UUID REFERENCES care_user(id),
    updated_by UUID REFERENCES care_user(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_template_config_facility ON care_reports_template_config(facility_id);
CREATE INDEX idx_dashboard_link_facility ON care_reports_dashboard_link(facility_id);
CREATE INDEX idx_dashboard_link_status ON care_reports_dashboard_link(status);
CREATE INDEX idx_dashboard_link_category ON care_reports_dashboard_link(category);
```

---

## Security Architecture

### Phase 1 (localStorage)

#### XSS Protection
```typescript
// Use DOMPurify for sanitization
import DOMPurify from 'dompurify';

const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br'],
    ALLOWED_ATTR: []
  });
};

// Apply to all user text inputs
templateConfig.header.text = sanitizeInput(rawInput);
```

#### File Upload Validation
```typescript
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml'];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const validateImageFile = (file: File) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }
  return true;
};
```

#### URL Validation
```typescript
const isValidMetabaseUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    // Only allow HTTPS
    if (parsed.protocol !== 'https:') return false;
    // Check for /public/dashboard/ path
    if (!parsed.pathname.includes('/public/dashboard/')) return false;
    return true;
  } catch {
    return false;
  }
};
```

### Phase 2 (Backend API)

#### Authentication & Authorization
```python
# Django Permissions
class TemplateConfigPermission(BasePermission):
    def has_permission(self, request, view):
        # Only admin users can manage template config
        return request.user.is_authenticated and request.user.is_admin

# Apply to views
class TemplateConfigViewSet(ModelViewSet):
    permission_classes = [TemplateConfigPermission]
```

#### File Upload Security
```python
# Django file upload validation
from django.core.exceptions import ValidationError

def validate_image(file):
    # Check file size
    if file.size > 2 * 1024 * 1024:
        raise ValidationError('File size exceeds 2MB')

    # Check MIME type
    if file.content_type not in ['image/png', 'image/jpeg', 'image/svg+xml']:
        raise ValidationError('Invalid file type')

    # Scan for malware (using ClamAV)
    # ...
```

---

## Performance Considerations

### localStorage Optimization

1. **Lazy Loading**
   ```typescript
   // Only load config when needed
   const [config, setConfig] = useState<ReportTemplateConfig | null>(null);

   useEffect(() => {
     if (activeTab === 'template') {
       setConfig(getTemplateConfig());
     }
   }, [activeTab]);
   ```

2. **Debounced Saves**
   ```typescript
   import { debounce } from 'lodash';

   const debouncedSave = debounce((config: ReportTemplateConfig) => {
     saveTemplateConfig(config);
   }, 1000);
   ```

3. **Image Compression**
   ```typescript
   // Compress images before Base64 conversion
   const compressImage = async (file: File): Promise<File> => {
     // Use canvas to resize and compress
     // Target: max 200x60px for logos
   };
   ```

### React Performance

1. **Code Splitting**
   ```typescript
   const TemplatePreview = lazy(() => import('./components/TemplatePreview'));
   const DashboardLinkModal = lazy(() => import('./components/DashboardLinkModal'));
   ```

2. **Memoization**
   ```typescript
   const filteredDashboards = useMemo(() => {
     return dashboards.filter(d =>
       d.name.toLowerCase().includes(searchQuery.toLowerCase())
     );
   }, [dashboards, searchQuery]);
   ```

---

## Browser Compatibility

### localStorage Support
- Chrome 4+ ✅
- Firefox 3.5+ ✅
- Safari 4+ ✅
- Edge 12+ ✅
- IE 8+ ✅

### Module Federation Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Fallback for localStorage Disabled
```typescript
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Show warning banner if localStorage unavailable
if (!isLocalStorageAvailable()) {
  toast.error('localStorage is disabled. Configuration will not persist.');
}
```

---

## Migration Strategy

### From localStorage to Backend API

1. **Create Migration Script**
   ```typescript
   const migrateToBackend = async () => {
     // Read from localStorage
     const localConfig = getTemplateConfig();
     const localDashboards = getDashboards();

     // Upload to backend
     await api.templateConfig.create(localConfig);
     await Promise.all(
       localDashboards.map(d => api.dashboards.create(d))
     );

     // Clear localStorage (optional)
     localStorage.removeItem('care_reports_template_config');
     localStorage.removeItem('care_reports_dashboards');
   };
   ```

2. **Feature Flag**
   ```typescript
   const USE_BACKEND_API = import.meta.env.VITE_USE_BACKEND_API === 'true';

   const storageService = USE_BACKEND_API
     ? new BackendStorageService()
     : new LocalStorageService();
   ```

3. **Gradual Rollout**
   - Phase 1: localStorage only (current)
   - Phase 2: Dual-write (localStorage + API)
   - Phase 3: Read from API, fallback to localStorage
   - Phase 4: API only, remove localStorage code

---

## Error Handling Strategy

### Error Types

1. **Validation Errors**
   - Display inline form errors
   - Prevent form submission

2. **Storage Errors**
   - localStorage quota exceeded
   - localStorage disabled
   - Toast notification + fallback to memory

3. **Upload Errors**
   - File too large
   - Invalid file type
   - Toast notification + clear file input

4. **Network Errors** (Phase 2)
   - API timeout
   - 500 server error
   - Toast notification + retry button

### Error Boundary

```typescript
class ReportsErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Reports plugin error:', error, errorInfo);
    // Log to monitoring service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## Monitoring & Analytics (Future)

### Metrics to Track

1. **Usage Metrics**
   - Number of template configurations created
   - Number of dashboard links added
   - Most viewed dashboards
   - Template preview count

2. **Performance Metrics**
   - Page load time
   - Logo upload time
   - Preview render time
   - localStorage write/read time

3. **Error Metrics**
   - Validation error frequency
   - Upload failure rate
   - localStorage quota exceeded count

### Implementation

```typescript
// Google Analytics / Posthog
analytics.track('template_config_saved', {
  facility_id: facilityId,
  has_primary_logo: !!config.header.primaryLogo,
  has_secondary_logo: !!config.header.secondaryLogo,
});

analytics.track('dashboard_link_added', {
  category: dashboard.category,
  has_tags: dashboard.tags.length > 0,
});
```

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

```typescript
// storage.test.ts
describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve template config', () => {
    const config = getDefaultTemplateConfig();
    saveTemplateConfig(config);
    const retrieved = getTemplateConfig();
    expect(retrieved).toEqual(config);
  });
});

// LogoUploader.test.tsx
describe('LogoUploader', () => {
  it('should accept valid image files', async () => {
    const file = new File([''], 'logo.png', { type: 'image/png' });
    // Test drag-and-drop
    // Test file validation
    // Test Base64 conversion
  });
});
```

### Integration Tests

```typescript
// ConfigurationPage.test.tsx
describe('ConfigurationPage', () => {
  it('should save template config to localStorage', async () => {
    render(<ConfigurationPage />);

    // Fill form
    fireEvent.change(screen.getByLabelText('Header Text'), {
      target: { value: 'Test Hospital' }
    });

    // Upload logo (mock)
    // ...

    // Click save
    fireEvent.click(screen.getByText('Save Config'));

    // Verify localStorage
    expect(localStorage.getItem('care_reports_template_config')).toBeTruthy();
  });
});
```

---

## Deployment Architecture

### Development
```
Local Development → Vite Dev Server (localhost:5177)
                                        │
                                        ▼
                          care_fe (localhost:5173)
                          loads plugin via remoteEntry.js
```

### Production (GitHub Pages)
```
Source Code (main branch)
         │
         ▼
GitHub Actions Build
         │
         ├─ npm run build
         ├─ Generate dist/
         │
         ▼
Deploy to GitHub Pages
         │
         ▼
https://username.github.io/care_reports_fe/assets/remoteEntry.js
         │
         ▼
care_fe Production
loads plugin from CDN
```

### Production (Cloudflare Workers)
```
Source Code
         │
         ▼
Cloudflare Wrangler Deploy
         │
         ▼
https://reports.care-ecosystem.workers.dev/assets/remoteEntry.js
         │
         ▼
care_fe Production
```

---

**Version:** 1.0
**Last Updated:** 2026-09-09
**Status:** Design Complete
