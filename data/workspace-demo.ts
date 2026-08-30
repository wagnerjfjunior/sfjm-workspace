export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type JourneyStep = { label: string; date: string; current?: boolean };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string };
export type ExternalProject = {
  name: string;
  kind: string;
  continuityState: string;
  nextSafeAction: string;
  blockers: string[];
  repository: string;
  observedSha: string;
  observedAt: string;
  verification: string;
};

export type ProgramMilestone = {
  id: string;
  label: string;
  window: string;
  weight: number;
  acceptedPercent: number;
  status: "COMPLETE" | "ACTIVE" | "PLANNED";
  owner: string;
  exit: string;
};

export type RunbookItem = {
  id: string;
  task: string;
  owner: string;
  state: "ACTIVE" | "PENDING" | "BLOCKED" | "COMPLETE";
  evidence: string;
  nextAction: string;
};

export type ProgramSnapshot = {
  name: string;
  repository: string;
  observedSha: string;
  observedAt: string;
  programIssue: string;
  currentMilestone: string;
  securityGo: string;
  commercialization: string;
  weightingBasis: string;
  evidenceBoundary: string;
  invalidatesOn: string;
  milestones: ProgramMilestone[];
  runbook: RunbookItem[];
};

export type SearchPortfolioSnapshot = {
  consumer: string;
  consumerRepository: string;
  consumerObservedSha: string;
  releaseSha: string;
  provider: string;
  providerRepository: string;
  providerObservedSha: string;
  observedAt: string;
  status: string;
  nextAction: string;
  providerResult: string;
  searchState: string[];
  measurementState: string[];
  boundaries: string[];
};

export function calculateAcceptedProgramProgress(milestones: ProgramMilestone[]) {
  return milestones.reduce(
    (total, milestone) => total + milestone.weight * (milestone.acceptedPercent / 100),
    0
  );
}

export const workspaceDemo = {
  notice: "Snapshot manual verificado em fontes canônicas — sem sincronização automática, polling ou write-back.",
  nav: [
    { icon: "▶", label: "Continue", helper: "Próxima ação segura", href: "#continue", active: true },
    { icon: "◎", label: "Roadmap", helper: "Security-to-Scale", href: "#fechai-program" },
    { icon: "☷", label: "Runbook", helper: "Execução M1", href: "#fechai-runbook" },
    { icon: "⌕", label: "Search / SEO", helper: "Visão consolidada", href: "#search-portfolio" },
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#projects" },
    { icon: "⌁", label: "Jornada", helper: "Visão da jornada", href: "#journey" },
    { icon: "⇄", label: "Handoffs", helper: "Transições de estado", href: "#" },
    { icon: "≋", label: "Evidências", helper: "Registros e artefatos", href: "#" },
    { icon: "⬡", label: "Governança", helper: "Regras e protocolos", href: "#" }
  ] satisfies NavItem[],

  checks: [
    { label: "Main canônico", value: "Verificado" },
    { label: "Handoff", value: "Assumido" },
    { label: "Conversa atual", value: "Chart 3" },
    { label: "Milestone", value: "M1 ativo" },
    { label: "Próxima ação", value: "Selecionar próximo workstream FECH.AI" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "M1 ativo · APPSEC-M1-003 public.leads concluído no nível implementação/catálogo",
      nextSafeAction: "Selecionar exatamente um próximo workstream material no FECH.AI; não reabrir public.leads sem evento material.",
      blockers: [
        "Security Go não concedido",
        "Comercialização ampla paga bloqueada",
        "CONTROLLED_RUNTIME_NEGATIVE_PASS = NOT_ESTABLISHED para public.leads",
        "MIGRATION_LEDGER_PROVENANCE = NON_BLOCKING_PROVENANCE_RESIDUAL",
        "M1 #150 permanece OPEN",
        "#139 e #140 permanecem workstreams separados até revalidação live"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "a15dde5067c716b0ab3c9342855069c1fc00bcd0",
      observedAt: "30 Aug 2026",
      verification: "Snapshot manual · PR #152 merged/applied · PR #153 merged · Vercel success"
    },
    {
      name: "MoreNumTegra",
      kind: "Projeto externo",
      continuityState: "Search + Conversion publicada · P0-B pendente",
      nextSafeAction: "Iniciar P0-B Search/indexabilidade; Measurement Foundation permanece em gate separado.",
      blockers: [
        "Robots/sitemap/Search Console ainda não comprovados/configurados",
        "Measurement MoreNumTegra ainda não configurado",
        "Consent enforcement técnico ainda não provado",
        "Tracking, Search Console, Google Ads e spend exigem gates separados"
      ],
      repository: "wagnerjfjunior/MoreNumTegra",
      observedSha: "5befb0efee8e4bd6ca96bb594c010afded24056e",
      observedAt: "30 Aug 2026",
      verification: "Snapshot manual · release publicada 18cfab98e01be29c86d78d08f2f5035a8da70444"
    }
  ] satisfies ExternalProject[],

  searchPortfolio: {
    consumer: "MoreNumTegra",
    consumerRepository: "wagnerjfjunior/MoreNumTegra",
    consumerObservedSha: "5befb0efee8e4bd6ca96bb594c010afded24056e",
    releaseSha: "18cfab98e01be29c86d78d08f2f5035a8da70444",
    provider: "Ecossistema de Blogs, Sites, Portais e SEO",
    providerRepository: "wagnerjfjunior/Blogs-sites-portais-seo",
    providerObservedSha: "d0f6e4c9879a48bdac00bea1cf40056e04bf736c",
    observedAt: "30 Aug 2026",
    status: "Provider PR #10 integrada · dashboard único no SFJM Workspace",
    nextAction: "P0-B Search/indexabilidade no consumer; Measurement Foundation depois de gate próprio.",
    providerResult: "Award + conversion pricing + technical metadata guidance integrated",
    searchState: [
      "Search + Conversion release publicada",
      "Title/meta/canonical JS/JSON-LD básicos no consumer",
      "P0-B: validar indexabilidade, robots, sitemap e Search Console",
      "Vercel permanece homologação noindex"
    ],
    measurementState: [
      "Green capability observada: Meta Pixel, GTM e Google Analytics",
      "MoreNumTegra tracking: NOT_CONFIGURED",
      "LGPD modal ativo; consent enforcement não comprovado",
      "Google Ads somente após Measurement QA"
    ],
    boundaries: [
      "Provider alimenta evidência/recomendação; não mantém dashboard paralelo",
      "MoreNumTegra mantém Product Authority e publicação",
      "Workspace consolida visualização; não substitui fontes canônicas",
      "Sem sync automático, write-back, tracking ou spend por esta decisão"
    ]
  } satisfies SearchPortfolioSnapshot,

  fechaiProgram: {
    name: "FECH.AI Security-to-Scale 2026",
    repository: "wagnerjfjunior/fecha.ai",
    observedSha: "a15dde5067c716b0ab3c9342855069c1fc00bcd0",
    observedAt: "30 Aug 2026",
    programIssue: "#141",
    currentMilestone: "M1 — Security Truth Baseline",
    securityGo: "NOT GRANTED",
    commercialization: "BLOCKED",
    weightingBasis: "Peso = duração planejada da janela; progresso só avança quando o gate do milestone é aceito.",
    evidenceBoundary: "STATIC != LIVE != RUNTIME · VERSIONED != APPLIED · RUNTIME_BOUNDED != SECURITY_GO",
    invalidatesOn: "Mudança material em FECH.AI main, Issues #141/#150, lifecycle de workstreams, evidência de Security Go ou decisão de comercialização.",
    milestones: [
      {
        id: "M0",
        label: "Program Control / Truth Reconciliation",
        window: "28 Aug–4 Sep",
        weight: 6.25,
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Documentation",
        exit: "M0 #142 fechado; SFJM reconciliado; transição M1 mergeada."
      },
      {
        id: "M1",
        label: "Security Truth Baseline",
        window: "4–18 Sep",
        weight: 12.5,
        acceptedPercent: 0,
        status: "ACTIVE",
        owner: "Backend/Data + AppSec + Documentation",
        exit: "Live DB × GitHub × migrations; privileged surface; tenant proof plan; dependency/secrets inventory."
      },
      {
        id: "M2",
        label: "Database Simplification & Optimization",
        window: "18 Sep–9 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Backend/Data + Architecture",
        exit: "Canonicality matrix + Database Contract Map + evolution decision."
      },
      {
        id: "M3",
        label: "Backend Authority Contract Freeze",
        window: "9–30 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Backend/Data + AppSec + Architecture",
        exit: "Canonical authority model + privileged allowlist + staging/security plan."
      },
      {
        id: "M4",
        label: "Frontend Modularization / App.jsx Extraction",
        window: "30 Oct–27 Nov",
        weight: 25,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Architecture + UX/UI + Domains",
        exit: "AppShell only composition; critical slices extracted with equivalence tests."
      },
      {
        id: "M5",
        label: "Integrated Security / Reliability Validation",
        window: "27 Nov–11 Dec",
        weight: 12.5,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "AppSec + SRE + Platform + Backend/Data",
        exit: "Negative/regression gates + CVE/secrets/deploy/observability/rollback readiness."
      },
      {
        id: "M6",
        label: "Security Go Candidate / Commercial Readiness",
        window: "11–18 Dec",
        weight: 6.25,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Product Authority + Security + Platform",
        exit: "Security Go evidence packet + separate commercialization decision."
      }
    ] satisfies ProgramMilestone[],
    runbook: [
      {
        id: "M1-A",
        task: "LIVE DB × GitHub main × applied migration ledger",
        owner: "backend_data",
        state: "ACTIVE",
        evidence: "M1 #150 permanece OPEN. No slice public.leads, LIVE_DATABASE_CONTROL_PRESENT = PROVEN, RLS preservation = PASS e data compatibility = PASS.",
        nextAction: "Não inferir saída completa do M1-A pelo slice public.leads; resolver o próximo workstream FECH.AI pela fonte canônica."
      },
      {
        id: "M1-B",
        task: "Privileged-surface inventory",
        owner: "backend_data",
        state: "PENDING",
        evidence: "Historical counts are capture-only and must be recomputed.",
        nextAction: "Inventory owner, DEFINER/INVOKER, search_path and ACL/executability."
      },
      {
        id: "M1-C",
        task: "Tenant-isolation proof plan",
        owner: "application_security",
        state: "PENDING",
        evidence: "public.leads tem controle de catálogo provado; CONTROLLED_RUNTIME_NEGATIVE_PASS permanece NOT_ESTABLISHED.",
        nextAction: "Preservar STATIC/LIVE/RUNTIME separados e não executar teste adversarial em produção."
      },
      {
        id: "M1-D",
        task: "Dependency / known-vulnerability inventory",
        owner: "application_security",
        state: "PENDING",
        evidence: "Current dependency exposure not yet reconciled in M1.",
        nextAction: "Inspect manifests/lockfiles and classify known-vulnerability evidence."
      },
      {
        id: "M1-E",
        task: "Secrets / infrastructure attack-surface inventory",
        owner: "application_security",
        state: "PENDING",
        evidence: "Do not expose secret values; inventory references/config surfaces only.",
        nextAction: "Map GitHub Actions, Vercel, Edge and Supabase config evidence read-only."
      },
      {
        id: "M1-F",
        task: "Evidence reconciliation / M1 verdict",
        owner: "documentation_audit",
        state: "PENDING",
        evidence: "Depends on M1-A–E evidence.",
        nextAction: "Classify findings, residual risk and define one next safe action."
      }
    ] satisfies RunbookItem[]
  } satisfies ProgramSnapshot,

  contexts: [
    { icon: "🧠", label: "Contexto Preservado", value: "Confirmado" },
    { icon: "☑", label: "Decisões Preservadas", value: "Confirmado" },
    { icon: "📁", label: "Evidências Canônicas", value: "GitHub" },
    { icon: "🤝", label: "Handoff Assumido", value: "Chart 3" },
    { icon: "🔒", label: "Governança Mantida", value: "Ativa" },
    { icon: "◉", label: "Fonte Verificada", value: "main" }
  ] satisfies ContextCard[],

  journey: [
    { label: "Home Migrada", date: "23 Jul 2026" },
    { label: "Guardrails", date: "23 Jul 2026" },
    { label: "FECH.AI Continue", date: "24 Jul 2026" },
    { label: "Security-to-Scale", date: "28 Aug 2026" },
    { label: "M0 fechado", date: "28 Aug 2026" },
    { label: "M1 ativo", date: "28 Aug 2026", current: true }
  ] satisfies JourneyStep[],

  currentState: [
    { label: "Estado de continuidade", value: "M1 ativo" },
    { label: "Conversa ativa", value: "Workspace — Chart 3" },
    { label: "FECH.AI", value: "M1 ativo · public.leads concluído" },
    { label: "Search / SEO", value: "Consolidado no Workspace" },
    { label: "Fonte canônica", value: "GitHub / main" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "a15dde50…", badge: true },
    { label: "Program issue", value: "#141", badge: true },
    { label: "M1 issue", value: "#150", badge: true },
    { label: "MoreNumTegra", value: "5befb0ef…", badge: true },
    { label: "Search provider", value: "d0f6e4c9…", badge: true },
    { label: "Snapshot", value: "Manual", badge: true }
  ] satisfies SourceRow[],

  timeline: [
    { date: "30 Aug 2026", text: "FECH.AI PR #153 mergeada; continuidade public.leads reconciliada e Vercel pós-merge em SUCCESS" },
    { date: "30 Aug 2026", text: "APPSEC-M1-003 public.leads: migration aplicada, controle live provado e residual runtime-negative preservado" },
    { date: "30 Aug 2026", text: "SFJM Workspace definido como dashboard único; Search provider passa a alimentar snapshot consolidado" },
    { date: "30 Aug 2026", text: "MoreNumTegra atualizado para release Search + Conversion e provider PR #10 integrada" },
    { date: "28 Aug 2026", text: "FECH.AI M1 Security Truth Baseline tornou-se o milestone ativo" },
    { date: "28 Aug 2026", text: "M0 #142 foi encerrado após reconciliação e merge do SFJM" },
    { date: "28 Aug 2026", text: "Security-to-Scale #141 selecionado para Roadmap + Runbook" },
    { date: "24 Jul 2026", text: "FECH.AI registrado como contexto externo manual" }
  ] satisfies TimelineItem[]
};
