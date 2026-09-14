import { workspaceDemo, type WbsMilestone } from "@/data/workspace-demo";

export type ProjectWbsSnapshot = {
  source: string;
  basis: string;
  estimationPolicy: string;
  totalCriticalHours: number;
  forecastCompletedHours: number;
  forecastRemainingHours: number;
  forecastPercent: number;
  currentPackage: string;
  currentTask: string;
  note: string;
  historicalCriticalHours?: number;
  effortSemantics?: string;
  milestones: WbsMilestone[];
};

const MORENUMTEGRA_MAIN = "1626e808c03a4bf88bd11f31d1a9078b5b6c8dfe";

const morenumtegraWbs: ProjectWbsSnapshot = {
  source: `MoreNumTegra main ${MORENUMTEGRA_MAIN} · docs/sfjm/CURRENT_PROGRAM_STATE.json + docs/sfjm/PROJECT_READ_MODEL.json + handoffs/CURRENT.md + docs/NEXT_SAFE_ACTION.md; PROGRAM_TASK_GRAPH/human WBS retained for hierarchy/planning hours only`,
  basis: "Project-published MNT-RESF planning forecast. PROGRAM_TASK_GRAPH owns hierarchy/planning hours; CURRENT_PROGRAM_STATE + PROJECT_READ_MODEL + CURRENT handoff own current lifecycle/progress; NEXT_SAFE_ACTION owns execution authority. Current-state overlay supersedes stale lifecycle fields in older structural snapshots.",
  estimationPolicy: "PROJECT_PUBLISHED_PLANNING_ESTIMATE · parent=sum(immediate children) · no parent/child double count · no Workspace-invented hours",
  totalCriticalHours: 1240,
  forecastCompletedHours: 640,
  forecastRemainingHours: 600,
  forecastPercent: 51.61,
  currentPackage: "MNT-M4 — ACTIVE · MNT-M4-05 IN_PROGRESS / AUTHORIZED",
  currentTask: "MNT-M4-05 — Factual JSON-LD expansion · PR #69 · IN_PROGRESS / AUTHORIZED",
  note: "Commercial V1 remains operational. 51.61% is accepted scope-equivalent planning progress, not product readiness or actual timesheet. M0-M3 are complete/accepted; M4-01..04 are complete/merged; M4-05 is authorized and in progress but contributes 0 additional accepted hours until accepted complete. M4-06 does not start by sequence.",
  effortSemantics: "PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET",
  milestones: [
    {
      id: "MNT-M0",
      label: "V1 Foundation & Commercial Production",
      hours: 160,
      state: "COMPLETE",
      completedHours: 160,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M0-01", label: "Governance, canonical GitHub flow and baselines", hours: 16, state: "COMPLETE" },
        { id: "MNT-M0-02", label: "Portable HTML/CSS/JS architecture for Vercel/Green", hours: 16, state: "COMPLETE" },
        { id: "MNT-M0-03", label: "Catalogue, data model, filters and stage visibility", hours: 24, state: "COMPLETE" },
        { id: "MNT-M0-04", label: "Mobile UX, floating CTAs and WhatsApp", hours: 16, state: "COMPLETE" },
        { id: "MNT-M0-05", label: "Green native Form 46 and lead journey", hours: 24, state: "COMPLETE" },
        { id: "MNT-M0-06", label: "Vercel Preview and stable homologation flow", hours: 16, state: "COMPLETE" },
        { id: "MNT-M0-07", label: "Search + Conversion package and indexability work", hours: 24, state: "COMPLETE" },
        { id: "MNT-M0-08", label: "Controlled Green release and production smoke", hours: 16, state: "COMPLETE" },
        { id: "MNT-M0-09", label: "Initial Search Console/indexation evidence", hours: 8, state: "COMPLETE" }
      ]
    },
    {
      id: "MNT-M1",
      label: "RESF Adoption & Existing-State Reconciliation",
      hours: 96,
      state: "COMPLETE",
      completedHours: 96,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M1-01", label: "Resolve and pin RESF v1 immutable provider revision", hours: 8, state: "COMPLETE" },
        { id: "MNT-M1-02", label: "Create RESF consumer adoption manifest", hours: 8, state: "COMPLETE" },
        { id: "MNT-M1-03", label: "Classify adopted, deferred and rejected RESF modules", hours: 8, state: "COMPLETE" },
        { id: "MNT-M1-04", label: "Reconcile existing implementation/evidence against RESF contracts", hours: 24, state: "COMPLETE" },
        { id: "MNT-M1-05", label: "Register GSC T0 baseline observed 2026-09-10", hours: 8, state: "COMPLETE" },
        { id: "MNT-M1-06", label: "Register gaps, overrides and residual risks", hours: 8, state: "COMPLETE" },
        { id: "MNT-M1-07", label: "Publish consumer-readable WBS/task graph and continuity entrypoints", hours: 16, state: "COMPLETE" },
        { id: "MNT-M1-08", label: "Schema/consistency review, documentation audit and PR lifecycle", hours: 16, state: "COMPLETE", note: "Closure anchor: MoreNumTegra PR #39 / dba0de3b…" }
      ]
    },
    {
      id: "MNT-M2",
      label: "Measurement Foundation & Consent",
      hours: 144,
      state: "COMPLETE",
      completedHours: 144,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M2-01", label: "Inventory tracking already present in live runtime", hours: 8, state: "COMPLETE" },
        { id: "MNT-M2-02", label: "Define transport architecture and duplicate-event prevention", hours: 16, state: "COMPLETE" },
        { id: "MNT-M2-03", label: "Define canonical event taxonomy", hours: 16, state: "COMPLETE" },
        { id: "MNT-M2-04", label: "Define primary and secondary conversions", hours: 8, state: "COMPLETE" },
        { id: "MNT-M2-05", label: "Define ownership for MoreNumTegra GTM and GA4", hours: 8, state: "COMPLETE" },
        { id: "MNT-M2-06", label: "Define ownership for Meta Pixel/Dataset", hours: 8, state: "COMPLETE" },
        { id: "MNT-M2-07", label: "Define consent model and LGPD gating", hours: 16, state: "COMPLETE" },
        { id: "MNT-M2-08", label: "Define denied/granted consent QA contract", hours: 16, state: "COMPLETE" },
        { id: "MNT-M2-09", label: "Implement authorized tracking configuration", hours: 24, state: "COMPLETE" },
        { id: "MNT-M2-10", label: "Execute end-to-end Measurement QA", hours: 24, state: "COMPLETE" }
      ]
    },
    {
      id: "MNT-M3",
      label: "Intelligence, Product Truth & Search Contract",
      hours: 144,
      state: "COMPLETE",
      completedHours: 144,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M3-01", label: "Market and Search demand research", hours: 24, state: "COMPLETE" },
        { id: "MNT-M3-02", label: "Extract and classify Search Console queries", hours: 16, state: "COMPLETE" },
        { id: "MNT-M3-03", label: "SERP, competitor and search-intent analysis", hours: 16, state: "COMPLETE" },
        { id: "MNT-M3-04", label: "Governed Product Fact & Claim Registry", hours: 24, state: "COMPLETE" },
        { id: "MNT-M3-05", label: "Search Intent / Query Ownership Contract", hours: 24, state: "COMPLETE" },
        { id: "MNT-M3-06", label: "Query-family to page-owner map", hours: 24, state: "COMPLETE" },
        { id: "MNT-M3-07", label: "KPI baseline and success criteria", hours: 16, state: "COMPLETE" }
      ]
    },
    {
      id: "MNT-M4",
      label: "IA, Content, Schema, GEO/AEO & Linking",
      hours: 208,
      state: "ACTIVE",
      completedHours: 96,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M4-01", label: "Information Architecture", hours: 24, state: "COMPLETE" },
        { id: "MNT-M4-02", label: "Page contracts and page types", hours: 24, state: "COMPLETE" },
        { id: "MNT-M4-03", label: "Decision-useful content architecture", hours: 24, state: "COMPLETE" },
        { id: "MNT-M4-04", label: "Entity graph and schema contract", hours: 24, state: "COMPLETE" },
        { id: "MNT-M4-05", label: "Factual JSON-LD expansion", hours: 16, state: "ACTIVE", note: "IN_PROGRESS / AUTHORIZED · PR #69 · complete candidate, validate Preview/schema and consolidate in src-greenn/moretegra.js; Ready/merge separate" },
        { id: "MNT-M4-06", label: "GEO/AEO / answerability / AI discoverability readiness", hours: 24, state: "PLANNED", note: "DO_NOT_START_BY_SEQUENCE" },
        { id: "MNT-M4-07", label: "Semantic internal-linking contract", hours: 16, state: "PLANNED" },
        { id: "MNT-M4-08", label: "Implement prioritized content/architecture", hours: 32, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M4-09", label: "Resolve technical SEO residuals: sitemap/www/canonical where capability permits", hours: 24, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" }
      ]
    },
    {
      id: "MNT-M5",
      label: "UX, Performance, Conversion, Lead & CRM",
      hours: 168,
      state: "PLANNED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M5-01", label: "Mobile UX and accessibility audit", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-02", label: "Core Web Vitals/performance baseline", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-03", label: "Media/image/video performance strategy", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-04", label: "Regression of filters, touch and mobile controls", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-05", label: "Conversion architecture", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-06", label: "CTA/form journey optimization design", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-07", label: "Lead semantics and lead-validity contract", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-08", label: "Green/Form 46 CRM handoff contract", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-09", label: "Form/CTA conversion QA", hours: 16, state: "PLANNED" },
        { id: "MNT-M5-10", label: "Authorized performance remediation", hours: 24, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" }
      ]
    },
    {
      id: "MNT-M6",
      label: "Attribution & Paid Media Readiness",
      hours: 128,
      state: "PLANNED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M6-01", label: "Attribution model and identifier boundaries", hours: 16, state: "PLANNED" },
        { id: "MNT-M6-02", label: "UTM/source/medium/campaign contract", hours: 8, state: "PLANNED" },
        { id: "MNT-M6-03", label: "Google Ads conversion architecture", hours: 16, state: "PLANNED" },
        { id: "MNT-M6-04", label: "SEM campaign/query contract", hours: 24, state: "PLANNED" },
        { id: "MNT-M6-05", label: "Landing-page/query mapping", hours: 16, state: "PLANNED" },
        { id: "MNT-M6-06", label: "Budget/spend authorization gate", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M6-07", label: "Authorized external platform implementation", hours: 24, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M6-08", label: "Paid conversion QA", hours: 16, state: "PLANNED" }
      ]
    },
    {
      id: "MNT-M7",
      label: "QA, Release, Observability & Learning Loop",
      hours: 192,
      state: "PLANNED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M7-01", label: "Preview validation", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-02", label: "Technical/content QA", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-03", label: "Independent mobile QA", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-04", label: "Tracking + lead end-to-end QA", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-05", label: "Regression suite", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-06", label: "P0/P1 release adjudication", hours: 8, state: "PLANNED" },
        { id: "MNT-M7-07", label: "Vercel Production homologation", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M7-08", label: "Controlled Green publication", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M7-09", label: "Production smoke", hours: 8, state: "PLANNED" },
        { id: "MNT-M7-10", label: "Post-release measurement", hours: 24, state: "PLANNED" },
        { id: "MNT-M7-11", label: "GSC/GA4/Ads observation window", hours: 24, state: "PLANNED" },
        { id: "MNT-M7-12", label: "Result registration with provenance", hours: 16, state: "PLANNED" },
        { id: "MNT-M7-13", label: "RESF provider evidence intake / learning loop", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" }
      ]
    }
  ]
};

export function getProjectWbs(projectName: string): ProjectWbsSnapshot | undefined {
  if (projectName === "FECH.AI") return workspaceDemo.fechaiWbs as ProjectWbsSnapshot;
  if (projectName === "MoreNumTegra") return morenumtegraWbs;
  return undefined;
}
