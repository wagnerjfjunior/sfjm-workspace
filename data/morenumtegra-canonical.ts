import type { ExternalProject, WbsMilestone, WbsTask } from "./workspace-demo";

const FORECAST_NOTE = "PROJECT_PLANNING_FORECAST / PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET";

type TaskState = WbsTask["state"];

function task(
  id: string,
  label: string,
  state: TaskState,
  hours: number,
  authorization?: string
): WbsTask {
  return {
    id,
    label,
    state,
    hours,
    effortSource: "CANONICAL",
    note: authorization ? `${FORECAST_NOTE} · ${authorization}` : FORECAST_NOTE
  };
}

function milestone(
  id: string,
  label: string,
  state: WbsMilestone["state"],
  hours: number,
  completedHours: number,
  tasks: WbsTask[]
): WbsMilestone {
  return {
    id,
    label,
    state,
    hours,
    completedHours,
    effortSource: "CANONICAL",
    tasks
  };
}

export const morenumtegraCanonical = {
  source: {
    repository: "wagnerjfjunior/MoreNumTegra",
    branch: "main",
    observedSha: "dba0de3bfefc7aec90c5a88588c54eae4317c61f",
    observedAt: "10 Sep 2026 · PR #39 merged",
    readModel: "docs/sfjm/PROJECT_READ_MODEL.json",
    taskGraph: "docs/sfjm/PROGRAM_TASK_GRAPH.json",
    humanWbs: "docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md"
  },
  objective: {
    id: "MNT-OBJ-01",
    text: "Operate and evolve a mobile-first Tegra real-estate discovery and Search-to-Lead experience with verified product truth, organic discoverability, conversion, measurement and controlled paid-media readiness.",
    source: "docs/baseline/FUNCTIONAL_BASELINE_V2.md"
  },
  program: {
    id: "MNT-RESF",
    name: "MoreNumTegra Search-to-Lead 2026",
    framework: "RESF v1 — Search-to-Lead",
    state: "ACTIVE",
    currentPhaseId: "MNT-M1",
    currentTaskId: "MNT-M1-08",
    effortSemantics: "PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET"
  },
  project: {
    name: "MoreNumTegra",
    kind: "Projeto externo",
    continuityState: "GREEN COMMERCIAL V1 OPERATIONAL · MNT-M1 ACTIVE",
    nextSafeAction: "Concluir MNT-M1 — validar schema/consistência, obter auditoria documental independente do exact head e adjudicar P0/P1; nenhuma mutação de runtime.",
    blockers: [
      "Measurement stack específico do MoreNumTegra ainda não está configurado/provado · MNT-M2 · não bloqueia MNT-M1",
      "LGPD modal observado, mas enforcement denied/granted ainda não foi provado · MNT-M2 · não bloqueia MNT-M1",
      "Residual Search: canonical comercial client-side, não static/SSR",
      "Residual Search: sitemap.xml não disponível",
      "Residual Search/DNS: redirect www funciona, mas HTTP 301/308 não está provado",
      "Tracking, Ads, DNS, Search Console, Vercel Production e Green continuam sob gates separados de Product Authority"
    ],
    repository: "wagnerjfjunior/MoreNumTegra",
    observedSha: "dba0de3bfefc7aec90c5a88588c54eae4317c61f",
    observedAt: "10 Sep 2026 · PR #39 merged",
    verification: "PROJECT_READ_MODEL.json + PROGRAM_TASK_GRAPH.json consumidos da main · snapshot manual read-only · stale on SHA drift"
  } satisfies ExternalProject,
  wbs: {
    id: "MNT-RESF",
    name: "MoreNumTegra Search-to-Lead 2026",
    currentPackage: "MNT-M1 · RESF Adoption & Existing-State Reconciliation",
    currentTask: "MNT-M1-08 · Schema/consistency review, independent documentation audit and PR lifecycle",
    currentTaskId: "MNT-M1-08",
    totalCriticalHours: 1240,
    historicalCriticalHours: 160,
    forecastCompletedHours: 160,
    forecastRemainingHours: 1080,
    forecastPercent: 12.9032,
    milestones: [
      milestone(
        "MNT-M0",
        "V1 Foundation & Commercial Production",
        "COMPLETE",
        160,
        160,
        [
          task("MNT-M0-01", "Governance, canonical GitHub flow and baselines", "COMPLETE", 16),
          task("MNT-M0-02", "Portable HTML/CSS/JS architecture for Vercel/Green", "COMPLETE", 16),
          task("MNT-M0-03", "Catalogue, data model, filters and stage visibility", "COMPLETE", 24),
          task("MNT-M0-04", "Mobile UX, floating CTAs and WhatsApp", "COMPLETE", 16),
          task("MNT-M0-05", "Green native Form 46 and lead journey", "COMPLETE", 24),
          task("MNT-M0-06", "Vercel Preview and stable homologation flow", "COMPLETE", 16),
          task("MNT-M0-07", "Search + Conversion package and indexability work", "COMPLETE", 24),
          task("MNT-M0-08", "Controlled Green release and production smoke", "COMPLETE", 16),
          task("MNT-M0-09", "Initial Search Console/indexation evidence", "COMPLETE", 8)
        ]
      ),
      milestone(
        "MNT-M1",
        "RESF Adoption & Existing-State Reconciliation",
        "ACTIVE",
        96,
        0,
        [
          task("MNT-M1-01", "Resolve and pin RESF v1 immutable provider revision", "ACTIVE", 8, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-02", "Create RESF consumer adoption manifest", "ACTIVE", 8, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-03", "Classify adopted, deferred and rejected RESF modules", "ACTIVE", 8, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-04", "Reconcile existing implementation/evidence against RESF contracts", "ACTIVE", 24, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-05", "Register GSC T0 baseline observed 2026-09-10", "ACTIVE", 8, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-06", "Register gaps, overrides and residual risks", "ACTIVE", 8, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-07", "Publish consumer-readable WBS/task graph and continuity entrypoints", "ACTIVE", 16, "DOCUMENTATION_ONLY_AUTHORIZED"),
          task("MNT-M1-08", "Schema/consistency review, independent documentation audit and PR lifecycle", "ACTIVE", 16, "SEPARATE_LIFECYCLE_GATES_APPLY")
        ]
      ),
      milestone(
        "MNT-M2",
        "Measurement Foundation & Consent",
        "PLANNED",
        144,
        0,
        [
          task("MNT-M2-01", "Inventory tracking already present in live runtime", "PLANNED", 8),
          task("MNT-M2-02", "Define transport architecture and duplicate-event prevention", "PLANNED", 16),
          task("MNT-M2-03", "Define canonical event taxonomy", "PLANNED", 16),
          task("MNT-M2-04", "Define primary and secondary conversions", "PLANNED", 8),
          task("MNT-M2-05", "Define ownership for MoreNumTegra GTM and GA4", "PLANNED", 8),
          task("MNT-M2-06", "Define ownership for Meta Pixel/Dataset", "PLANNED", 8),
          task("MNT-M2-07", "Define consent model and LGPD gating", "PLANNED", 16),
          task("MNT-M2-08", "Define denied/granted consent QA contract", "PLANNED", 16),
          task("MNT-M2-09", "Implement authorized tracking configuration", "PLANNED", 24, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M2-10", "Execute end-to-end Measurement QA", "PLANNED", 24)
        ]
      ),
      milestone(
        "MNT-M3",
        "Intelligence, Product Truth & Search Contract",
        "PLANNED",
        144,
        0,
        [
          task("MNT-M3-01", "Market and Search demand research", "PLANNED", 24),
          task("MNT-M3-02", "Extract and classify Search Console queries", "PLANNED", 16),
          task("MNT-M3-03", "SERP, competitor and search-intent analysis", "PLANNED", 16),
          task("MNT-M3-04", "Governed Product Fact & Claim Registry", "PLANNED", 24),
          task("MNT-M3-05", "Search Intent / Query Ownership Contract", "PLANNED", 24),
          task("MNT-M3-06", "Query-family to page-owner map", "PLANNED", 24),
          task("MNT-M3-07", "KPI baseline and success criteria", "PLANNED", 16)
        ]
      ),
      milestone(
        "MNT-M4",
        "IA, Content, Schema, GEO/AEO & Linking",
        "PLANNED",
        208,
        0,
        [
          task("MNT-M4-01", "Information Architecture", "PLANNED", 24),
          task("MNT-M4-02", "Page contracts and page types", "PLANNED", 24),
          task("MNT-M4-03", "Decision-useful content architecture", "PLANNED", 24),
          task("MNT-M4-04", "Entity graph and schema contract", "PLANNED", 24),
          task("MNT-M4-05", "Factual JSON-LD expansion", "PLANNED", 16, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M4-06", "GEO/AEO / answerability / AI discoverability readiness", "PLANNED", 24),
          task("MNT-M4-07", "Semantic internal-linking contract", "PLANNED", 16),
          task("MNT-M4-08", "Implement prioritized content/architecture", "PLANNED", 32, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M4-09", "Resolve technical SEO residuals: sitemap/www/canonical where capability permits", "PLANNED", 24, "PLANNED_NOT_AUTHORIZED")
        ]
      ),
      milestone(
        "MNT-M5",
        "UX, Performance, Conversion, Lead & CRM",
        "PLANNED",
        168,
        0,
        [
          task("MNT-M5-01", "Mobile UX and accessibility audit", "PLANNED", 16),
          task("MNT-M5-02", "Core Web Vitals/performance baseline", "PLANNED", 16),
          task("MNT-M5-03", "Media/image/video performance strategy", "PLANNED", 16),
          task("MNT-M5-04", "Regression of filters, touch and mobile controls", "PLANNED", 16),
          task("MNT-M5-05", "Conversion architecture", "PLANNED", 16),
          task("MNT-M5-06", "CTA/form journey optimization design", "PLANNED", 16),
          task("MNT-M5-07", "Lead semantics and lead-validity contract", "PLANNED", 16),
          task("MNT-M5-08", "Green/Form 46 CRM handoff contract", "PLANNED", 16),
          task("MNT-M5-09", "Form/CTA conversion QA", "PLANNED", 16),
          task("MNT-M5-10", "Authorized performance remediation", "PLANNED", 24, "PLANNED_NOT_AUTHORIZED")
        ]
      ),
      milestone(
        "MNT-M6",
        "Attribution & Paid Media Readiness",
        "PLANNED",
        128,
        0,
        [
          task("MNT-M6-01", "Attribution model and identifier boundaries", "PLANNED", 16),
          task("MNT-M6-02", "UTM/source/medium/campaign contract", "PLANNED", 8),
          task("MNT-M6-03", "Google Ads conversion architecture", "PLANNED", 16),
          task("MNT-M6-04", "SEM campaign/query contract", "PLANNED", 24),
          task("MNT-M6-05", "Landing-page/query mapping", "PLANNED", 16),
          task("MNT-M6-06", "Budget/spend authorization gate", "PLANNED", 8, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M6-07", "Authorized external platform implementation", "PLANNED", 24, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M6-08", "Paid conversion QA", "PLANNED", 16)
        ]
      ),
      milestone(
        "MNT-M7",
        "QA, Release, Observability & Learning Loop",
        "PLANNED",
        192,
        0,
        [
          task("MNT-M7-01", "Preview validation", "PLANNED", 16),
          task("MNT-M7-02", "Technical/content QA", "PLANNED", 16),
          task("MNT-M7-03", "Independent mobile QA", "PLANNED", 16),
          task("MNT-M7-04", "Tracking + lead end-to-end QA", "PLANNED", 16),
          task("MNT-M7-05", "Regression suite", "PLANNED", 16),
          task("MNT-M7-06", "P0/P1 release adjudication", "PLANNED", 8),
          task("MNT-M7-07", "Vercel Production homologation", "PLANNED", 8, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M7-08", "Controlled Green publication", "PLANNED", 8, "PLANNED_NOT_AUTHORIZED"),
          task("MNT-M7-09", "Production smoke", "PLANNED", 8),
          task("MNT-M7-10", "Post-release measurement", "PLANNED", 24),
          task("MNT-M7-11", "GSC/GA4/Ads observation window", "PLANNED", 24),
          task("MNT-M7-12", "Result registration with provenance", "PLANNED", 16),
          task("MNT-M7-13", "RESF provider evidence intake / learning loop", "PLANNED", 16, "PLANNED_NOT_AUTHORIZED")
        ]
      )
    ] satisfies WbsMilestone[]
  }
} as const;
