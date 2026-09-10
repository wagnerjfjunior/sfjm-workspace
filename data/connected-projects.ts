import {
  workspaceDemo,
  type ExternalProject,
  type ProjectIssue,
  type WbsMilestone
} from "@/data/workspace-demo";

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
  effortSemantics: string;
  historicalCriticalHours?: number;
  milestones: WbsMilestone[];
};

export type ConnectedProject = ExternalProject & {
  projectId: string;
  programId?: string;
  objective?: string;
  objectiveSource?: string;
  wbs?: ProjectWbsSnapshot;
  evidenceBoundary?: string;
  specialistTransport?: string;
  sourceRefs?: string[];
};

const MORENUMTEGRA_SHA = "347b62298d30ba3567a76d3f48a815e9f0f5b26c";

function mntIssue(
  id: string,
  issueClass: ProjectIssue["class"],
  scope: string,
  state: string,
  label: string,
  source: string,
  resolutionCondition: string,
  displayPolicy: string
): ProjectIssue {
  return {
    id,
    class: issueClass,
    scope,
    state,
    label,
    blockingForCurrentTask: false,
    source,
    sourceRef: MORENUMTEGRA_SHA,
    lastValidatedAt: "2026-09-10",
    resolutionCondition,
    displayPolicy
  };
}

const morenumtegraIssues: ProjectIssue[] = [
  mntIssue(
    "MNT-ISSUE-MEASUREMENT-NOT-PROVEN",
    "REQUIRED_CURRENT",
    "MNT-M2",
    "OPEN",
    "MoreNumTegra-specific Measurement stack is not configured/proven",
    "docs/PROJECT_STATUS.md",
    "Authorize and complete Measurement Foundation design; implementation and QA remain separately gated",
    "CURRENT_MATERIAL_RESTRICTIONS"
  ),
  mntIssue(
    "MNT-ISSUE-CONSENT-ENFORCEMENT",
    "REQUIRED_CURRENT",
    "RESF-CONSENT / MNT-M2",
    "OPEN / NOT_PROVEN",
    "LGPD modal is observed but denied/granted enforcement is not proven",
    "docs/PROJECT_STATUS.md",
    "Define and execute consent proof obligations under authorized Measurement work",
    "CURRENT_MATERIAL_RESTRICTIONS"
  ),
  mntIssue(
    "MNT-RESIDUAL-CANONICAL",
    "RESIDUAL",
    "SEARCH",
    "OPEN / NON_BLOCKING_FOR_CURRENT_V1",
    "Commercial canonical is client-side rather than static/SSR",
    "docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md",
    "Revisit if Green/head capability or architecture changes",
    "RESIDUAL_RISKS"
  ),
  mntIssue(
    "MNT-RESIDUAL-SITEMAP",
    "RESIDUAL",
    "SEARCH",
    "OPEN / NON_BLOCKING_FOR_CURRENT_V1",
    "sitemap.xml is not available",
    "docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md",
    "Resolve platform capability or later architecture decision",
    "RESIDUAL_RISKS"
  ),
  mntIssue(
    "MNT-RESIDUAL-WWW-REDIRECT",
    "RESIDUAL",
    "SEARCH / DNS",
    "OPEN / HTTP_301_308_NOT_PROVEN",
    "www redirect works at page level but HTTP 301/308 semantics remain unproven",
    "docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md",
    "Obtain HTTP-level evidence or authorized DNS/platform remediation",
    "RESIDUAL_RISKS"
  ),
  mntIssue(
    "MNT-GATE-M2-START",
    "FUTURE_GATE",
    "MNT-M2",
    "NOT_AUTHORIZED",
    "MNT-M2 READ_ONLY / DESIGN start requires explicit Product Authority authorization",
    "docs/NEXT_SAFE_ACTION.md",
    "Product Authority explicitly authorizes bounded MNT-M2 design start",
    "ROADMAP_GATES"
  ),
  mntIssue(
    "MNT-GATE-EXTERNAL-MUTATIONS",
    "FUTURE_GATE",
    "TRACKING / ADS / DNS / DEPLOY",
    "NOT_AUTHORIZED_BY_MNT_M1_CLOSURE",
    "Tracking, Ads, DNS and production mutations require separate Product Authority gates",
    "docs/BLOCKED_ACTIONS.md",
    "Obtain explicit scope-specific authorization after prerequisite design/evidence",
    "ROADMAP_GATES"
  )
];

const morenumtegraWbs: ProjectWbsSnapshot = {
  source: `MoreNumTegra docs/sfjm/PROJECT_READ_MODEL.json + CURRENT_PROGRAM_STATE.json + PROGRAM_TASK_GRAPH.json @ ${MORENUMTEGRA_SHA}`,
  basis: "Project-published MNT-RESF planning forecast. M0 is retrospective scope-equivalent; M1 is accepted planning scope after lifecycle closure; future phases remain forecast.",
  estimationPolicy: "PROJECT_PUBLISHED_PLANNING_ESTIMATE · parent=sum(immediate children) · no parent/child double count · stronger future project hours supersede prior estimates",
  totalCriticalHours: 1240,
  forecastCompletedHours: 256,
  forecastRemainingHours: 984,
  forecastPercent: 20.65,
  currentPackage: "MNT-M2 — PLANNED_NOT_AUTHORIZED / NEXT",
  currentTask: "MNT-M2-01 · next candidate · no active task until Product Authority authorizes bounded MNT-M2 READ_ONLY / DESIGN",
  note: "Commercial V1 is already operational. Program progress is not product-readiness percentage. No MNT-M2 execution or external/runtime mutation is authorized by the MNT-M1 closure.",
  effortSemantics: "PROJECT_PUBLISHED_PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET",
  historicalCriticalHours: 160,
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
        { id: "MNT-M1-08", label: "Schema/consistency review, documentation audit and PR lifecycle", hours: 16, state: "COMPLETE", note: "Closure anchor: PR #39 merged; post-merge state reconciled by PR #40." }
      ]
    },
    {
      id: "MNT-M2",
      label: "Measurement Foundation & Consent",
      hours: 144,
      state: "PLANNED",
      operationalState: "PLANNED_NOT_AUTHORIZED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M2-01", label: "Inventory tracking already present in live runtime", hours: 8, state: "PLANNED", note: "NEXT_CANDIDATE · PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-02", label: "Define transport architecture and duplicate-event prevention", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-03", label: "Define canonical event taxonomy", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-04", label: "Define primary and secondary conversions", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-05", label: "Define ownership for MoreNumTegra GTM and GA4", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-06", label: "Define ownership for Meta Pixel/Dataset", hours: 8, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-07", label: "Define consent model and LGPD gating", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-08", label: "Define denied/granted consent QA contract", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M2-09", label: "Implement authorized tracking configuration", hours: 24, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED · EXTERNAL_MUTATION_GATE" },
        { id: "MNT-M2-10", label: "Execute end-to-end Measurement QA", hours: 24, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" }
      ]
    },
    {
      id: "MNT-M3",
      label: "Intelligence, Product Truth & Search Contract",
      hours: 144,
      state: "PLANNED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M3-01", label: "Market and Search demand research", hours: 24, state: "PLANNED" },
        { id: "MNT-M3-02", label: "Extract and classify Search Console queries", hours: 16, state: "PLANNED" },
        { id: "MNT-M3-03", label: "SERP, competitor and search-intent analysis", hours: 16, state: "PLANNED" },
        { id: "MNT-M3-04", label: "Governed Product Fact & Claim Registry", hours: 24, state: "PLANNED" },
        { id: "MNT-M3-05", label: "Search Intent / Query Ownership Contract", hours: 24, state: "PLANNED" },
        { id: "MNT-M3-06", label: "Query-family to page-owner map", hours: 24, state: "PLANNED" },
        { id: "MNT-M3-07", label: "KPI baseline and success criteria", hours: 16, state: "PLANNED" }
      ]
    },
    {
      id: "MNT-M4",
      label: "IA, Content, Schema, GEO/AEO & Linking",
      hours: 208,
      state: "PLANNED",
      completedHours: 0,
      effortSource: "CANONICAL",
      tasks: [
        { id: "MNT-M4-01", label: "Information Architecture", hours: 24, state: "PLANNED" },
        { id: "MNT-M4-02", label: "Page contracts and page types", hours: 24, state: "PLANNED" },
        { id: "MNT-M4-03", label: "Decision-useful content architecture", hours: 24, state: "PLANNED" },
        { id: "MNT-M4-04", label: "Entity graph and schema contract", hours: 24, state: "PLANNED" },
        { id: "MNT-M4-05", label: "Factual JSON-LD expansion", hours: 16, state: "PLANNED", note: "PLANNED_NOT_AUTHORIZED" },
        { id: "MNT-M4-06", label: "GEO/AEO / answerability / AI discoverability readiness", hours: 24, state: "PLANNED" },
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

const existingFechai = workspaceDemo.externalProjects.find((project) => project.name === "FECH.AI");

if (!existingFechai) {
  throw new Error("FECH.AI snapshot missing from workspaceDemo");
}

export const connectedProjects: ConnectedProject[] = [
  {
    ...existingFechai,
    projectId: "fechai",
    programId: "STS",
    objective: workspaceDemo.fechaiProgram.programObjective,
    objectiveSource: workspaceDemo.fechaiProgram.objectiveSource,
    wbs: workspaceDemo.fechaiWbs as unknown as ProjectWbsSnapshot,
    evidenceBoundary: workspaceDemo.fechaiProgram.evidenceBoundary,
    specialistTransport: workspaceDemo.fechaiProgram.specialistTransport,
    sourceRefs: [
      "FECH.AI docs/sfjm/CURRENT_STATE.md",
      "FECH.AI docs/sfjm/NEXT_SAFE_ACTION.md",
      "FECH.AI docs/sfjm/PROGRAM_TASK_GRAPH.md"
    ]
  },
  {
    projectId: "morenumtegra",
    programId: "MNT-RESF",
    name: "MoreNumTegra",
    kind: "Projeto externo",
    continuityState: "MNT-M1 COMPLETE · MNT-M2 PLANNED_NOT_AUTHORIZED · Green commercial V1 operational",
    nextSafeAction: "Obter autorização explícita da Product Authority antes de iniciar MNT-M2 em READ_ONLY / DESIGN. Nenhuma mutação de tracking, Green, Vercel, DNS, Search Console, Ads ou spend está autorizada pela conclusão de MNT-M1.",
    issues: morenumtegraIssues,
    currentRestrictions: morenumtegraIssues.filter((issue) => issue.class === "REQUIRED_CURRENT" || issue.id === "MNT-GATE-M2-START"),
    repository: "wagnerjfjunior/MoreNumTegra",
    observedSha: MORENUMTEGRA_SHA,
    observedAt: "10 Sep 2026 · PR #40 merged · MNT-M1 canonical closure consumed",
    verification: "Snapshot manual derivado de PROJECT_READ_MODEL + CURRENT_PROGRAM_STATE + PROGRAM_TASK_GRAPH; sem live sync; stale se MoreNumTegra main divergir de 347b622…",
    objective: "Operate and evolve a mobile-first Tegra real-estate discovery and Search-to-Lead experience with verified product truth, organic discoverability, conversion, measurement and controlled paid-media readiness.",
    objectiveSource: "MoreNumTegra docs/baseline/FUNCTIONAL_BASELINE_V2.md",
    wbs: morenumtegraWbs,
    evidenceBoundary: "PROJECT TRUTH != WORKSPACE SNAPSHOT · PROGRAM PROGRESS != V1 READINESS · PLANNED != AUTHORIZED · DOCUMENTED != IMPLEMENTED != DEPLOYED != VALIDATED",
    specialistTransport: "SES routing is separate from Workspace read-model consumption",
    sourceRefs: [
      `MoreNumTegra@${MORENUMTEGRA_SHA}/docs/sfjm/PROJECT_READ_MODEL.json`,
      `MoreNumTegra@${MORENUMTEGRA_SHA}/docs/sfjm/CURRENT_PROGRAM_STATE.json`,
      `MoreNumTegra@${MORENUMTEGRA_SHA}/docs/sfjm/PROGRAM_TASK_GRAPH.json`,
      `MoreNumTegra@${MORENUMTEGRA_SHA}/docs/NEXT_SAFE_ACTION.md`
    ]
  }
];
