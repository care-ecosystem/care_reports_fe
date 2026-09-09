# Care Reports Plugin - UI Wireframes

## Page Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                  CARE Main App                      │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────┐
            │   Admin Navigation     │
            │   "Report Config"      │
            └────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│          /admin/reports/configuration                  │
│                                                        │
│  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Template Config  │  │ Dashboard Links  │          │
│  │      Tab         │  │      Tab         │          │
│  └──────────────────┘  └──────────────────┘          │
└────────────────────────────────────────────────────────┘
           │                           │
           ▼                           ▼
  ┌──────────────────┐       ┌──────────────────┐
  │  Template Form   │       │  Dashboard Table │
  │  + Logo Upload   │       │  + Add/Edit/Del  │
  │  + Preview Button│       │  + Search/Filter │
  └──────────────────┘       └──────────────────┘
           │                           │
           ▼                           ▼
  ┌──────────────────┐       ┌──────────────────┐
  │ Preview Modal    │       │ Dashboard Modal  │
  │ (Template +      │       │ (Add/Edit Form)  │
  │  Metabase        │       │                  │
  │  Dashboard)      │       │                  │
  └──────────────────┘       └──────────────────┘
```

---

## Wireframe 1: Configuration Page - Template Tab

```
┌────────────────────────────────────────────────────────────────────────┐
│  CARE Admin > Report Configuration                       [Save Config] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────┬─────────────────────┐                      │
│  │ Template Config ● │   Dashboard Links   │                      │
│  └──────────────────────┴─────────────────────┘                      │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                                                                │   │
│  │  HEADER CONFIGURATION                                          │   │
│  │  ────────────────────                                          │   │
│  │                                                                │   │
│  │  Header Text                                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ Government of Kerala - District Hospital Dashboard   │     │   │
│  │  │                                                       │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  Logo Configuration                                            │   │
│  │  ┌─────────────────────────┐  ┌────────────────────────┐     │   │
│  │  │  Primary Logo           │  │  Secondary Logo        │     │   │
│  │  │  ┌───────────────────┐  │  │  ┌──────────────────┐  │     │   │
│  │  │  │  ┌─────────────┐  │  │  │  │  ┌────────────┐  │  │     │   │
│  │  │  │  │   [LOGO]    │  │  │  │  │  │  [GOV LOGO]│  │  │     │   │
│  │  │  │  └─────────────┘  │  │  │  │  └────────────┘  │  │     │   │
│  │  │  └───────────────────┘  │  │  └──────────────────┘  │     │   │
│  │  │  [Upload] [Remove]      │  │  [Upload] [Remove]     │     │   │
│  │  │                         │  │                        │     │   │
│  │  │  Max: 2MB, PNG/JPG/SVG  │  │  (Optional)            │     │   │
│  │  └─────────────────────────┘  └────────────────────────┘     │   │
│  │                                                                │   │
│  │  Logo Position                                                 │   │
│  │  ○ Left   ● Center   ○ Right                                  │   │
│  │                                                                │   │
│  │  ────────────────────────────────────────────────────────────  │   │
│  │                                                                │   │
│  │  DESCRIPTION                                                   │   │
│  │  ────────────                                                  │   │
│  │                                                                │   │
│  │  Report Description                                            │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ This dashboard provides real-time insights into      │     │   │
│  │  │ patient care metrics, bed occupancy, and facility    │     │   │
│  │  │ performance indicators.                              │     │   │
│  │  │                                                       │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  Subtitle (Optional)                                           │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ Generated on: {date}                                 │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  ────────────────────────────────────────────────────────────  │   │
│  │                                                                │   │
│  │  FOOTER CONFIGURATION                                          │   │
│  │  ────────────────────                                          │   │
│  │                                                                │   │
│  │  Footer Text                                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ © 2026 District Hospital, Kerala Health Department   │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  Contact Information (Optional)                                │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ Email: admin@hospital.kerala.gov.in | Ph: 0484-xxx   │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  Disclaimer (Optional)                                         │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ This data is confidential and for authorized use only│     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  │  ────────────────────────────────────────────────────────────  │   │
│  │                                                                │   │
│  │  PREVIEW SETTINGS                                              │   │
│  │  ────────────                                                  │   │
│  │                                                                │   │
│  │  Default Dashboard URL for Preview                             │   │
│  │  ┌──────────────────────────────────────────────────────┐     │   │
│  │  │ https://metabase.care.gov.in/public/dashboard/...    │     │   │
│  │  └──────────────────────────────────────────────────────┘     │   │
│  │                                                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  [Reset to Defaults]              [Preview Template] [Save Config]    │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Wireframe 2: Configuration Page - Dashboard Links Tab

```
┌────────────────────────────────────────────────────────────────────────┐
│  CARE Admin > Report Configuration                                     │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌────────────────────┬───────────────────────┐                      │
│  │  Template Config   │   Dashboard Links ● │                      │
│  └────────────────────┴───────────────────────┘                      │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                                                                │   │
│  │  Dashboard Links                            [+ Add Dashboard]  │   │
│  │                                                                │   │
│  │  ┌────────────────────────────────────────────────────────┐   │   │
│  │  │ 🔍 Search dashboards...           Category: [All ▼]   │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                │   │
│  │  ┌────────────────────────────────────────────────────────┐   │   │
│  │  │                                                          │   │   │
│  │  │  📊 Patient Demographics Dashboard              ✓ Active │   │   │
│  │  │  https://metabase.../public/dashboard/abcd-1234         │   │   │
│  │  │                                                          │   │   │
│  │  │  Category: Clinical Reports  │  Tags: #demographics     │   │   │
│  │  │  Created: Jan 5, 2026        │  Updated: 2 days ago     │   │   │
│  │  │                                                          │   │   │
│  │  │  [✏️ Edit] [🗑️ Delete] [👁️ Preview] [📋 Copy URL]      │   │   │
│  │  │                                                          │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                │   │
│  │  ┌────────────────────────────────────────────────────────┐   │   │
│  │  │                                                          │   │   │
│  │  │  📈 Bed Occupancy Report                       ✗ Inactive │   │   │
│  │  │  https://metabase.../public/dashboard/efgh-5678         │   │   │
│  │  │                                                          │   │   │
│  │  │  Category: Admin Reports     │  Tags: #beds #occupancy  │   │   │
│  │  │  Created: Dec 20, 2025       │  Updated: 1 week ago     │   │   │
│  │  │                                                          │   │   │
│  │  │  [✏️ Edit] [🗑️ Delete] [👁️ Preview] [📋 Copy URL]      │   │   │
│  │  │                                                          │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                │   │
│  │  ┌────────────────────────────────────────────────────────┐   │   │
│  │  │                                                          │   │   │
│  │  │  💊 Pharmacy Stock Dashboard                    ✓ Active │   │   │
│  │  │  https://metabase.../public/dashboard/ijkl-9012         │   │   │
│  │  │                                                          │   │   │
│  │  │  Category: Pharmacy          │  Tags: #inventory        │   │   │
│  │  │  Created: Jan 10, 2026       │  Updated: Yesterday      │   │   │
│  │  │                                                          │   │   │
│  │  │  [✏️ Edit] [🗑️ Delete] [👁️ Preview] [📋 Copy URL]      │   │   │
│  │  │                                                          │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                │   │
│  │  Showing 3 of 3 dashboards                                    │   │
│  │                                                                │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Wireframe 3: Add/Edit Dashboard Modal

```
┌────────────────────────────────────────────────────────┐
│  Add Dashboard Link                            [✕]    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Dashboard Name *                                      │
│  ┌──────────────────────────────────────────────┐     │
│  │ Patient Demographics Dashboard               │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  Metabase Public URL *                                 │
│  ┌──────────────────────────────────────────────┐     │
│  │ https://metabase.care.gov.in/public/...      │     │
│  └──────────────────────────────────────────────┘     │
│  ℹ️ Only public Metabase dashboard URLs are allowed   │
│                                                        │
│  Description (Optional)                                │
│  ┌──────────────────────────────────────────────┐     │
│  │ Shows patient distribution by age, gender,   │     │
│  │ and location across all facilities.          │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  Category                                              │
│  ┌──────────────────────────────────────────────┐     │
│  │ Clinical Reports                          ▼  │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  Tags (Optional)                                       │
│  ┌──────────────────────────────────────────────┐     │
│  │ demographics, patients, analytics        [+] │     │
│  └──────────────────────────────────────────────┘     │
│  [demographics] [patients] [analytics]                │
│                                                        │
│  Status                                                │
│  ☑ Active                                              │
│                                                        │
│  ────────────────────────────────────────────────     │
│                                                        │
│            [Cancel]         [Save Dashboard]           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## Wireframe 4: Template Preview Modal (Desktop View)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Template Preview                                          [✕ Close]     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  View: [● Desktop] [○ Mobile]        Dashboard: [Select ▼]              │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ ╔══════════════════════════════════════════════════════════════╗   │ │
│  │ ║                        HEADER SECTION                        ║   │ │
│  │ ║ ┌────────┐                                                   ║   │ │
│  │ ║ │ [LOGO] │  Government of Kerala - District Hospital         ║   │ │
│  │ ║ │        │                 Dashboard                         ║   │ │
│  │ ║ └────────┘                                    ┌────────────┐ ║   │ │
│  │ ║                                               │ [GOV LOGO] │ ║   │ │
│  │ ║                                               └────────────┘ ║   │ │
│  │ ╚══════════════════════════════════════════════════════════════╝   │ │
│  │                                                                    │ │
│  │ ┌────────────────────────────────────────────────────────────┐   │ │
│  │ │                    DESCRIPTION SECTION                      │   │ │
│  │ │                                                              │   │ │
│  │ │ This dashboard provides real-time insights into patient     │   │ │
│  │ │ care metrics, bed occupancy, and facility performance       │   │ │
│  │ │ indicators.                                                  │   │ │
│  │ │                                                              │   │ │
│  │ │ Generated on: September 9, 2026                             │   │ │
│  │ └────────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  │ ┌────────────────────────────────────────────────────────────┐   │ │
│  │ │                 METABASE DASHBOARD IFRAME                   │   │ │
│  │ │                                                              │   │ │
│  │ │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │   │ │
│  │ │  │   Chart 1   │  │   Chart 2   │  │   Chart 3   │        │   │ │
│  │ │  │   📊        │  │   📈        │  │   📉        │        │   │ │
│  │ │  │   1,234     │  │   5,678     │  │   90%       │        │   │ │
│  │ │  └─────────────┘  └─────────────┘  └─────────────┘        │   │ │
│  │ │                                                              │   │ │
│  │ │  ┌──────────────────────────────────────────────────┐      │   │ │
│  │ │  │              Patient Demographics                 │      │   │ │
│  │ │  │         [Bar Chart Visualization]                │      │   │ │
│  │ │  │                                                   │      │   │ │
│  │ │  └──────────────────────────────────────────────────┘      │   │ │
│  │ │                                                              │   │ │
│  │ └────────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  │ ╔══════════════════════════════════════════════════════════════╗ │ │
│  │ ║                       FOOTER SECTION                         ║ │ │
│  │ ║                                                               ║ │ │
│  │ ║ © 2026 District Hospital, Kerala Health Department           ║ │ │
│  │ ║ Email: admin@hospital.kerala.gov.in | Phone: 0484-xxxxxxx    ║ │ │
│  │ ║                                                               ║ │ │
│  │ ║ ⚠️ This data is confidential and for authorized use only     ║ │ │
│  │ ╚══════════════════════════════════════════════════════════════╝ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│                              [Close Preview]                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Wireframe 5: Template Preview Modal (Mobile View)

```
┌─────────────────────────────────────┐
│  Template Preview        [✕ Close] │
├─────────────────────────────────────┤
│                                     │
│  [○ Desktop] [● Mobile]             │
│                                     │
│  Dashboard: [Select ▼]             │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ ╔═══════════════════════════╗ │ │
│  │ ║        HEADER             ║ │ │
│  │ ║  ┌─────┐                  ║ │ │
│  │ ║  │LOGO │ Govt of Kerala   ║ │ │
│  │ ║  └─────┘ District Hospital║ │ │
│  │ ║          Dashboard        ║ │ │
│  │ ╚═══════════════════════════╝ │ │
│  │                               │ │
│  │ ┌───────────────────────────┐ │ │
│  │ │   DESCRIPTION             │ │ │
│  │ │                           │ │ │
│  │ │ Real-time patient care    │ │ │
│  │ │ metrics and facility      │ │ │
│  │ │ performance indicators.   │ │ │
│  │ │                           │ │ │
│  │ │ Generated: Sep 9, 2026    │ │ │
│  │ └───────────────────────────┘ │ │
│  │                               │ │
│  │ ┌───────────────────────────┐ │ │
│  │ │  METABASE DASHBOARD       │ │ │
│  │ │                           │ │ │
│  │ │  ┌─────────┐              │ │ │
│  │ │  │ Chart 1 │              │ │ │
│  │ │  │  📊     │              │ │ │
│  │ │  │  1,234  │              │ │ │
│  │ │  └─────────┘              │ │ │
│  │ │                           │ │ │
│  │ │  ┌─────────┐              │ │ │
│  │ │  │ Chart 2 │              │ │ │
│  │ │  │  📈     │              │ │ │
│  │ │  └─────────┘              │ │ │
│  │ │                           │ │ │
│  │ └───────────────────────────┘ │ │
│  │                               │ │
│  │ ╔═══════════════════════════╗ │ │
│  │ ║       FOOTER              ║ │ │
│  │ ║                           ║ │ │
│  │ ║ © 2026 District Hospital  ║ │ │
│  │ ║ Kerala Health Dept        ║ │ │
│  │ ║                           ║ │ │
│  │ ║ Contact:                  ║ │ │
│  │ ║ admin@hospital.gov.in     ║ │ │
│  │ ║                           ║ │ │
│  │ ║ ⚠️ Confidential data      ║ │ │
│  │ ╚═══════════════════════════╝ │ │
│  └───────────────────────────────┘ │
│                                     │
│         [Close Preview]             │
│                                     │
└─────────────────────────────────────┘
```

---

## Wireframe 6: Logo Upload Component (Detailed)

```
┌────────────────────────────────────────────┐
│  Primary Logo                              │
├────────────────────────────────────────────┤
│                                            │
│  ┌────────────────────────────────────┐   │
│  │                                     │   │
│  │  ┌───────────────────────────────┐ │   │
│  │  │                                │ │   │
│  │  │       ┌────────────┐           │ │   │
│  │  │       │            │           │ │   │
│  │  │       │   [LOGO]   │           │ │   │
│  │  │       │   IMAGE    │           │ │   │
│  │  │       │   HERE     │           │ │   │
│  │  │       │            │           │ │   │
│  │  │       └────────────┘           │ │   │
│  │  │                                │ │   │
│  │  │    📤 Drag & drop image here   │ │   │
│  │  │       or click to browse       │ │   │
│  │  │                                │ │   │
│  │  └───────────────────────────────┘ │   │
│  │                                     │   │
│  └────────────────────────────────────┘   │
│                                            │
│  [Upload Logo]  [Remove Logo]              │
│                                            │
│  ℹ️ Max size: 2MB                          │
│  ℹ️ Formats: PNG, JPG, SVG                 │
│  ℹ️ Recommended: 200x60px                  │
│                                            │
└────────────────────────────────────────────┘

State 1: Empty (No Logo Uploaded)
┌────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐   │
│  │                                     │   │
│  │         📤 Upload Image             │   │
│  │    Drag & drop or click to browse  │   │
│  │                                     │   │
│  │     PNG, JPG, SVG (max 2MB)        │   │
│  │                                     │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘

State 2: With Logo Uploaded
┌────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐   │
│  │  ┌─────────────────────────────┐   │   │
│  │  │  [Hospital Logo Image]      │   │   │
│  │  │  200x60px                   │   │   │
│  │  └─────────────────────────────┘   │   │
│  │                                     │   │
│  │  hospital-logo.png (45 KB)          │   │
│  │  [Change Logo] [Remove Logo]        │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘

State 3: Uploading
┌────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐   │
│  │                                     │   │
│  │         ⏳ Uploading...             │   │
│  │    ████████████░░░░░ 75%           │   │
│  │                                     │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘

State 4: Error
┌────────────────────────────────────────────┐
│  ┌────────────────────────────────────┐   │
│  │                                     │   │
│  │         ❌ Upload Failed            │   │
│  │    File size exceeds 2MB limit     │   │
│  │                                     │   │
│  │         [Try Again]                 │   │
│  │                                     │   │
│  └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

---

## Wireframe 7: Delete Confirmation Dialog

```
┌─────────────────────────────────────────────┐
│  Delete Dashboard Link?          [✕]       │
├─────────────────────────────────────────────┤
│                                             │
│  ⚠️  Are you sure you want to delete this  │
│      dashboard link?                        │
│                                             │
│  Dashboard: Patient Demographics Dashboard │
│  URL: https://metabase.../public/...       │
│                                             │
│  This action cannot be undone.              │
│                                             │
│                                             │
│         [Cancel]        [Delete]            │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Wireframe 8: Success/Error Toast Notifications

```
Success Toast (Top Right)
┌──────────────────────────────────┐
│ ✅ Configuration saved!          │
│    Your template has been saved. │
└──────────────────────────────────┘

Error Toast (Top Right)
┌──────────────────────────────────┐
│ ❌ Failed to save                │
│    Please try again.             │
└──────────────────────────────────┘

Info Toast
┌──────────────────────────────────┐
│ ℹ️ URL copied to clipboard       │
└──────────────────────────────────┘
```

---

## Component Interaction States

### Logo Upload States
1. **Empty**: Dashed border, upload icon, help text
2. **Hover (Empty)**: Highlighted border, cursor pointer
3. **Dragging**: Blue highlighted border, "Drop here" text
4. **Uploading**: Progress bar, spinner
5. **Success**: Preview image, file name, action buttons
6. **Error**: Error icon, error message, retry button

### Dashboard Card States
1. **Default**: Normal card with all info
2. **Hover**: Slight elevation, cursor pointer
3. **Active**: Green checkmark badge
4. **Inactive**: Gray overlay, "Inactive" badge
5. **Selected** (for bulk actions): Blue border, checkbox

### Button States
1. **Primary Button** (Save): Blue, white text
2. **Secondary Button** (Cancel): Gray, dark text
3. **Danger Button** (Delete): Red, white text
4. **Disabled**: Gray, low opacity, no cursor
5. **Loading**: Spinner icon, "Saving..." text

---

## Responsive Breakpoints

### Desktop (>1024px)
- Two-column layout for logo upload
- Full table view for dashboards
- Preview modal: 90% viewport width

### Tablet (768px - 1024px)
- Single column layout for logo upload
- Table view with horizontal scroll
- Preview modal: 95% viewport width

### Mobile (<768px)
- Single column layout for everything
- Card view for dashboards (no table)
- Preview modal: Full screen
- Sticky header with Save button

---

## Color Palette

```
Primary:     #0066CC (Blue)
Success:     #10B981 (Green)
Warning:     #F59E0B (Orange)
Error:       #EF4444 (Red)
Gray-50:     #F9FAFB
Gray-100:    #F3F4F6
Gray-200:    #E5E7EB
Gray-500:    #6B7280
Gray-900:    #111827
```

---

## Typography

```
Heading 1:   24px, Bold
Heading 2:   20px, Semibold
Heading 3:   16px, Semibold
Body:        14px, Regular
Caption:     12px, Regular
Label:       14px, Medium
```

---

## Spacing Scale

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
```

---

## Accessibility Considerations

1. **Keyboard Navigation**
   - All interactive elements focusable
   - Tab order: logical flow (top to bottom, left to right)
   - Escape key closes modals
   - Enter key submits forms

2. **Screen Readers**
   - Proper ARIA labels for all form inputs
   - `aria-live` regions for toast notifications
   - `aria-describedby` for form validation errors

3. **Color Contrast**
   - All text meets WCAG AA standard (4.5:1 ratio)
   - Focus indicators visible (blue outline, 2px)

4. **Form Validation**
   - Real-time validation feedback
   - Error messages associated with fields
   - Required fields marked with asterisk (*)

---

## Animation Guidelines

1. **Modal Open/Close**: Fade in + slide up (200ms)
2. **Toast Notifications**: Slide in from right (150ms)
3. **Card Hover**: Elevation change (100ms)
4. **Loading States**: Spinner rotation (continuous)
5. **Tab Switching**: Instant (no animation)

---

## Print Layout (Future)

When printing configured report:
```
┌────────────────────────────────┐
│ [Header with logos]            │
├────────────────────────────────┤
│ [Description]                  │
├────────────────────────────────┤
│                                │
│ [Dashboard/Report Content]     │
│ (Metabase export or screenshot)│
│                                │
├────────────────────────────────┤
│ [Footer]                       │
└────────────────────────────────┘

Print CSS:
- Hide navigation, buttons
- Show full header/footer
- Page break before/after sections
```

---

**Version:** 1.0
**Last Updated:** 2026-09-09
**Status:** Draft
