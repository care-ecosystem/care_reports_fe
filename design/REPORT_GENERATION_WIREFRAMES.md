# Report Generation - Wireframes

Visual UI mockups for the Report Generation feature.

**Related:** `REPORT_GENERATION_DESIGN.md`, `WIREFRAMES.md`

---

## Page 1: Generate Report Page

### Desktop View

```
┌────────────────────────────────────────────────────────────────────────┐
│  CARE > Generate Report                                         [Help] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Generate Report                                                       │
│  ━━━━━━━━━━━━━━                                                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                                                                    │ │
│  │  Step 1: Select Dashboard                                         │ │
│  │  ─────────────────────────                                        │ │
│  │                                                                    │ │
│  │  Dashboard *                                                       │ │
│  │  ┌────────────────────────────────────────────────────────┐      │ │
│  │  │ Patient Demographics Dashboard                      ▼  │      │ │
│  │  └────────────────────────────────────────────────────────┘      │ │
│  │                                                                    │ │
│  │  ℹ️ This dashboard shows patient distribution by age, gender      │ │
│  │     and location across all facilities.                           │ │
│  │                                                                    │ │
│  │  ────────────────────────────────────────────────────────────    │ │
│  │                                                                    │ │
│  │  Step 2: Select Data Source                                       │ │
│  │  ────────────────────────────                                     │ │
│  │                                                                    │ │
│  │  Report Table/Chart *                                             │ │
│  │  ┌────────────────────────────────────────────────────────┐      │ │
│  │  │ Patient Age Distribution Table                      ▼  │      │ │
│  │  └────────────────────────────────────────────────────────┘      │ │
│  │                                                                    │ │
│  │  [📊 Table] Type: table                                           │ │
│  │                                                                    │ │
│  │  ────────────────────────────────────────────────────────────    │ │
│  │                                                                    │ │
│  │  Data Preview                                                     │ │
│  │  ────────────                                                     │ │
│  │                                                                    │ │
│  │  ┌────────────────────────────────────────────────────────┐      │ │
│  │  │  📊 Patient Age Distribution Table                     │      │ │
│  │  │                                                          │      │ │
│  │  │  📈 150 rows  |  3 columns                              │      │ │
│  │  │                                                          │      │ │
│  │  │  Columns: Age Group, Count, Percentage                  │      │ │
│  │  │                                                          │      │ │
│  │  │  Sample Data (first 5 rows):                            │      │ │
│  │  │  ┌────────────┬────────┬────────────┐                   │      │ │
│  │  │  │ Age Group  │ Count  │ Percentage │                   │      │ │
│  │  │  ├────────────┼────────┼────────────┤                   │      │ │
│  │  │  │ 0-10       │ 245    │ 12.5%      │                   │      │ │
│  │  │  │ 11-20      │ 389    │ 19.8%      │                   │      │ │
│  │  │  │ 21-30      │ 512    │ 26.1%      │                   │      │ │
│  │  │  │ 31-40      │ 423    │ 21.5%      │                   │      │ │
│  │  │  │ 41-50      │ 298    │ 15.2%      │                   │      │ │
│  │  │  └────────────┴────────┴────────────┘                   │      │ │
│  │  │                                                          │      │ │
│  │  │  ... and 145 more rows                                  │      │ │
│  │  └────────────────────────────────────────────────────────┘      │ │
│  │                                                                    │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│                                              [Preview Report]          │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Mobile View

```
┌─────────────────────────────────┐
│ ☰  Generate Report       [Help] │
├─────────────────────────────────┤
│                                 │
│ Generate Report                 │
│ ━━━━━━━━━━━━━━                 │
│                                 │
│ Step 1: Select Dashboard        │
│ ─────────────────────────       │
│                                 │
│ Dashboard *                     │
│ ┌─────────────────────────┐    │
│ │ Patient Demographics ▼  │    │
│ └─────────────────────────┘    │
│                                 │
│ ℹ️ This dashboard shows         │
│    patient distribution...      │
│                                 │
│ ─────────────────────────       │
│                                 │
│ Step 2: Select Data Source      │
│ ─────────────────────────       │
│                                 │
│ Report Table/Chart *            │
│ ┌─────────────────────────┐    │
│ │ Patient Age Dist... ▼   │    │
│ └─────────────────────────┘    │
│                                 │
│ [📊 Table]                      │
│                                 │
│ ─────────────────────────       │
│                                 │
│ Data Preview                    │
│ ─────────────                   │
│                                 │
│ ┌─────────────────────────┐    │
│ │ 📊 Patient Age Dist...   │    │
│ │                          │    │
│ │ 📈 150 rows | 3 cols     │    │
│ │                          │    │
│ │ Columns:                 │    │
│ │ Age Group, Count, %      │    │
│ │                          │    │
│ │ Sample (first 5):        │    │
│ │ ┌──────────────────┐    │    │
│ │ │ Age   │ Cnt │ %  │    │    │
│ │ ├──────────────────┤    │    │
│ │ │ 0-10  │ 245│12.5│    │    │
│ │ │ 11-20 │ 389│19.8│    │    │
│ │ │ 21-30 │ 512│26.1│    │    │
│ │ │ 31-40 │ 423│21.5│    │    │
│ │ │ 41-50 │ 298│15.2│    │    │
│ │ └──────────────────┘    │    │
│ │                          │    │
│ │ ... 145 more             │    │
│ └─────────────────────────┘    │
│                                 │
│   [Preview Report]              │
│                                 │
└─────────────────────────────────┘
```

---

## Page 2: Report Preview Page

### Desktop View

```
┌────────────────────────────────────────────────────────────────────────┐
│  CARE > Generate Report > Preview        [Download PDF]  [Print]  [✕] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Report Preview                                                        │
│  ━━━━━━━━━━━━━━                                                       │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │ ╔══════════════════════════════════════════════════════════════╗ │ │
│  │ ║                     HEADER SECTION                           ║ │ │
│  │ ║                                                               ║ │ │
│  │ ║  ┌──────────┐                                ┌──────────┐    ║ │ │
│  │ ║  │ Hospital │  Government of Kerala         │   GOV    │    ║ │ │
│  │ ║  │   LOGO   │  District Hospital Dashboard  │  Emblem  │    ║ │ │
│  │ ║  └──────────┘                                └──────────┘    ║ │ │
│  │ ║                                                               ║ │ │
│  │ ╚══════════════════════════════════════════════════════════════╝ │ │
│  │                                                                    │ │
│  │ ┌────────────────────────────────────────────────────────────┐   │ │
│  │ │ This dashboard provides real-time insights into patient    │   │ │
│  │ │ care metrics, bed occupancy, and facility performance      │   │ │
│  │ │ indicators across all government hospitals in Kerala.      │   │ │
│  │ │                                                             │   │ │
│  │ │ Generated on: September 9, 2026 at 2:30 PM IST             │   │ │
│  │ └────────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  │ Dashboard: Patient Demographics Dashboard                         │ │
│  │ Report: Patient Age Distribution Table                            │ │
│  │                                                                    │ │
│  │ ┌────────────────────────────────────────────────────────────┐   │ │
│  │ │                 Patient Age Distribution                    │   │ │
│  │ │                                                              │   │ │
│  │ │ ┌──────────────┬────────────┬──────────────┬───────────┐  │   │ │
│  │ │ │ Age Group    │ Count      │ Percentage   │ Trend     │  │   │ │
│  │ │ ├──────────────┼────────────┼──────────────┼───────────┤  │   │ │
│  │ │ │ 0-10 years   │ 245        │ 12.5%        │ ↑ +3%     │  │   │ │
│  │ │ │ 11-20 years  │ 389        │ 19.8%        │ ↑ +5%     │  │   │ │
│  │ │ │ 21-30 years  │ 512        │ 26.1%        │ ─ 0%      │  │   │ │
│  │ │ │ 31-40 years  │ 423        │ 21.5%        │ ↓ -2%     │  │   │ │
│  │ │ │ 41-50 years  │ 298        │ 15.2%        │ ↓ -1%     │  │   │ │
│  │ │ │ 51-60 years  │ 75         │ 3.8%         │ ↑ +1%     │  │   │ │
│  │ │ │ 61+ years    │ 20         │ 1.0%         │ ─ 0%      │  │   │ │
│  │ │ └──────────────┴────────────┴──────────────┴───────────┘  │   │ │
│  │ │                                                              │   │ │
│  │ │ Total Records: 1,962                                        │   │ │
│  │ │ Data as of: September 9, 2026                               │   │ │
│  │ └────────────────────────────────────────────────────────────┘   │ │
│  │                                                                    │ │
│  │ ╔══════════════════════════════════════════════════════════════╗ │ │
│  │ ║                     FOOTER SECTION                           ║ │ │
│  │ ║                                                               ║ │ │
│  │ ║  © 2026 District Hospital, Kerala Health Department          ║ │ │
│  │ ║  Email: admin@hospital.kerala.gov.in | Phone: 0484-2345678   ║ │ │
│  │ ║                                                               ║ │ │
│  │ ║  ⚠️ This data is confidential and for authorized use only    ║ │ │
│  │ ║                                                               ║ │ │
│  │ ╚══════════════════════════════════════════════════════════════╝ │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│  [← Back to Selection]               [Regenerate Report]              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

### Mobile View (Scrollable)

```
┌─────────────────────────────────┐
│ ☰  Report Preview        [≡]   │
├─────────────────────────────────┤
│                                 │
│ ╔═══════════════════════════╗   │
│ ║       HEADER              ║   │
│ ║  ┌────┐                   ║   │
│ ║  │LOGO│ Govt of Kerala    ║   │
│ ║  └────┘ District Hospital ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│ ┌───────────────────────────┐   │
│ │ Real-time insights into   │   │
│ │ patient care metrics...   │   │
│ │                           │   │
│ │ Generated: Sep 9, 2026    │   │
│ └───────────────────────────┘   │
│                                 │
│ Dashboard:                      │
│ Patient Demographics            │
│                                 │
│ Report:                         │
│ Patient Age Distribution        │
│                                 │
│ ┌───────────────────────────┐   │
│ │ Patient Age Distribution  │   │
│ │                           │   │
│ │ ┌───────────────────────┐ │   │
│ │ │Age Grp│Cnt │ %  │Trnd│ │   │
│ │ ├───────────────────────┤ │   │
│ │ │0-10   │245 │12.5│↑+3 │ │   │
│ │ │11-20  │389 │19.8│↑+5 │ │   │
│ │ │21-30  │512 │26.1│─ 0 │ │   │
│ │ │31-40  │423 │21.5│↓-2 │ │   │
│ │ │41-50  │298 │15.2│↓-1 │ │   │
│ │ │51-60  │ 75 │3.8 │↑+1 │ │   │
│ │ │61+    │ 20 │1.0 │─ 0 │ │   │
│ │ └───────────────────────┘ │   │
│ │                           │   │
│ │ Total: 1,962              │   │
│ │ As of: Sep 9, 2026        │   │
│ └───────────────────────────┘   │
│                                 │
│ ╔═══════════════════════════╗   │
│ ║       FOOTER              ║   │
│ ║                           ║   │
│ ║ © 2026 District Hospital  ║   │
│ ║ Kerala Health Dept        ║   │
│ ║                           ║   │
│ ║ Contact:                  ║   │
│ ║ admin@hospital.gov.in     ║   │
│ ║ 0484-2345678              ║   │
│ ║                           ║   │
│ ║ ⚠️ Confidential data      ║   │
│ ╚═══════════════════════════╝   │
│                                 │
│ [← Back]    [Download] [Print] │
│                                 │
└─────────────────────────────────┘
```

---

## Loading States

### Generate Report Page - Loading Cards

```
┌────────────────────────────────────────────────────────┐
│  Step 2: Select Data Source                            │
│  ────────────────────────────                          │
│                                                        │
│  Report Table/Chart *                                  │
│  ┌────────────────────────────────────────────────┐   │
│  │ ⏳ Loading available reports...              │   │
│  │                                                │   │
│  │ [Spinner animation]                            │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Report Preview Page - Loading Data

```
┌────────────────────────────────────────────────────────┐
│  Report Preview                                        │
│  ━━━━━━━━━━━━━━                                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │                                                    │ │
│  │              ⏳ Loading report data...            │ │
│  │                                                    │ │
│  │              [Spinner animation]                   │ │
│  │                                                    │ │
│  │          Fetching data from Metabase...            │ │
│  │                                                    │ │
│  │                                                    │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Generating PDF

```
┌────────────────────────────────────────────────────────┐
│  Report Preview                  [Generating...] [✕]  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │          📄 Generating PDF Report...              │ │
│  │                                                    │ │
│  │          [Progress Bar]                            │ │
│  │          ████████████░░░░░░ 75%                   │ │
│  │                                                    │ │
│  │          Adding header and logos...                │ │
│  │                                                    │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## Error States

### No Dashboards Configured

```
┌────────────────────────────────────────────────────────┐
│  Generate Report                                       │
│  ━━━━━━━━━━━━━━                                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │              ℹ️ No Dashboards Configured          │ │
│  │                                                    │ │
│  │   You haven't configured any dashboard links yet. │ │
│  │   Please add dashboards in the configuration      │ │
│  │   page before generating reports.                 │ │
│  │                                                    │ │
│  │         [Go to Configuration Page]                 │ │
│  │                                                    │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### No Table Visualizations Found

```
┌────────────────────────────────────────────────────────┐
│  Step 2: Select Data Source                            │
│  ────────────────────────────                          │
│                                                        │
│  ┌────────────────────────────────────────────────┐   │
│  │                                                │   │
│  │        ⚠️ No table visualizations found        │   │
│  │                                                │   │
│  │   This dashboard doesn't contain any table or │   │
│  │   pivot charts. Please select a different     │   │
│  │   dashboard or add table visualizations to    │   │
│  │   your Metabase dashboard.                    │   │
│  │                                                │   │
│  │   [Select Different Dashboard]                 │   │
│  │                                                │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Failed to Load Dashboard Data

```
┌────────────────────────────────────────────────────────┐
│  Generate Report                                       │
│  ━━━━━━━━━━━━━━                                       │
│                                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │                                                    │ │
│  │            ❌ Failed to Load Dashboard            │ │
│  │                                                    │ │
│  │   Unable to connect to Metabase. Please check:   │ │
│  │                                                    │ │
│  │   • Dashboard URL is correct and public          │ │
│  │   • Metabase server is accessible                │ │
│  │   • Your internet connection is active           │ │
│  │                                                    │ │
│  │   Error: Network request failed                   │ │
│  │                                                    │ │
│  │         [Try Again]  [Change Dashboard]           │ │
│  │                                                    │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

## PDF Output Preview

### Generated PDF (Conceptual)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    PDF Document Preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────┐
│ ┌────────┐                            ┌────────┐    │
│ │Hospital│  Government of Kerala      │  GOV   │    │
│ │  Logo  │  District Hospital         │ Emblem │    │
│ └────────┘  Dashboard                 └────────┘    │
│                                                      │
│ ─────────────────────────────────────────────────   │
│                                                      │
│ This dashboard provides real-time insights into     │
│ patient care metrics, bed occupancy, and facility   │
│ performance indicators across all government        │
│ hospitals in Kerala.                                │
│                                                      │
│ Generated on: September 9, 2026 at 2:30 PM IST      │
│                                                      │
│ ─────────────────────────────────────────────────   │
│                                                      │
│ Dashboard: Patient Demographics Dashboard           │
│ Report: Patient Age Distribution Table              │
│                                                      │
│ ┌──────────────────────────────────────────────┐   │
│ │        Patient Age Distribution               │   │
│ │                                                │   │
│ │ ┌────────┬────────┬──────────┬──────────┐    │   │
│ │ │ Age    │ Count  │ Percent  │ Trend    │    │   │
│ │ ├────────┼────────┼──────────┼──────────┤    │   │
│ │ │ 0-10   │ 245    │ 12.5%    │ ↑ +3%    │    │   │
│ │ │ 11-20  │ 389    │ 19.8%    │ ↑ +5%    │    │   │
│ │ │ 21-30  │ 512    │ 26.1%    │ ─ 0%     │    │   │
│ │ │ 31-40  │ 423    │ 21.5%    │ ↓ -2%    │    │   │
│ │ │ 41-50  │ 298    │ 15.2%    │ ↓ -1%    │    │   │
│ │ │ 51-60  │ 75     │ 3.8%     │ ↑ +1%    │    │   │
│ │ │ 61+    │ 20     │ 1.0%     │ ─ 0%     │    │   │
│ │ └────────┴────────┴──────────┴──────────┘    │   │
│ │                                                │   │
│ │ Total Records: 1,962                          │   │
│ │ Data as of: September 9, 2026                 │   │
│ └──────────────────────────────────────────────┘   │
│                                                      │
│ ─────────────────────────────────────────────────   │
│                                                      │
│ © 2026 District Hospital, Kerala Health Department │
│ Email: admin@hospital.kerala.gov.in                │
│ Phone: 0484-2345678                                │
│                                                      │
│ ⚠️ This data is confidential and for authorized    │
│    use only.                                        │
│                                                      │
└──────────────────────────────────────────────────────┘

                        Page 1 of 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Action Menu (Report Preview)

### Download Options (Future Enhancement)

```
┌────────────────────────────────────┐
│ Download Report                 ✕ │
├────────────────────────────────────┤
│                                    │
│ Format:                            │
│ ○ PDF (Recommended)                │
│ ○ Excel (XLSX)                     │
│ ○ CSV                              │
│                                    │
│ Options:                           │
│ ☑ Include header                   │
│ ☑ Include footer                   │
│ ☐ Landscape orientation            │
│                                    │
│ [Cancel]           [Download]      │
│                                    │
└────────────────────────────────────┘
```

---

## Success Notifications

### PDF Generated Successfully

```
┌──────────────────────────────────────┐
│ ✅ PDF Downloaded Successfully!      │
│    Report saved to Downloads folder  │
└──────────────────────────────────────┘
```

### Report Regenerated

```
┌──────────────────────────────────────┐
│ ✅ Report Regenerated!                │
│    Data refreshed from Metabase      │
└──────────────────────────────────────┘
```

---

## Responsive Breakpoints

- **Desktop** (>1024px): Full two-column layout, large preview
- **Tablet** (768px-1024px): Single column, medium preview
- **Mobile** (<768px): Single column, compact cards, scrollable table

---

**Version:** 1.0
**Created:** 2026-09-09
**Related:** REPORT_GENERATION_DESIGN.md, WIREFRAMES.md
