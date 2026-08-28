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
  overallProgress: number;
  weightingBasis: string;
  evidenceBoundary: string;
  invalidatesOn: string;
  milestones: ProgramMilestone[];
  runbook: RunbookItem[];
};

export const workspaceDemo = {
  notice: "Snapshot manual verificado em fontes canônicas — sem sincronização automática, polling ou write-back.",
  nav: [
    { icon: "▶", label: "Continue", helper: "Próxima ação segura", href: "#continue", active: true },
    { icon: "◎", label: "Roadmap", helper: "Security-to-Scale", href: "#fechai-program" },
    { icon: "☷", label: "Runbook", helper: "Execução M1", href: "#fechai-runbook" },
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
    { label: "Próxima ação", value: "M1-A read-only" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "M0 fechado · M1 Security Truth Baseline ativo",
      nextSafeAction: "Executar M1-A READ_ONLY: LIVE DB × GitHub main × migration ledger e inventário atual de superfícies privilegiadas.",
      blockers: [
        "Security Go não concedido",
        "Comercialização ampla paga bloqueada",
        "F1-02 final acceptance bloqueado",
        "WDP increase depende de governança",
        "M1 live database truth ainda não estabelecida",
        "#139 permanece workstream ativo e exige revalidação live antes de lifecycle",
        "#140 config estática não prova Action/Builder runtime"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "3eeb6fd230309f206be7920607739f8e4545556f",
      observedAt: "28 Aug 2026",
      verification: "Snapshot manual · FECH.AI continua sendo a autoridade"
    },
    {
      name: "MoreNumTegra",
      kind: "Projeto externo",
      continuityState: "Green V1 funcionalmente homologada",
      nextSafeAction: "Manter a produção estável e validar o HTTPS de www.moretegra.com.br quando a Green concluir o certificado.",
      blockers: [
        "www.moretegra.com.br com certificado ainda pendente no snapshot",
        "Analytics/pixels/tags dependem de gate específico",
        "Mudanças materiais devem seguir GitHub → Vercel → Green",
        "Dados comerciais mutáveis exigem nova evidência antes de atualização"
      ],
      repository: "wagnerjfjunior/MoreNumTegra",
      observedSha: "3eca0d4fc212ef5bb499c92534dedd5ac86094e6",
      observedAt: "28 Aug 2026",
      verification: "Snapshot manual verificado · sem sincronização automática"
    }
  ] satisfies ExternalProject[],

  fechaiProgram: {
    name: "FECH.AI Security-to-Scale 2026",
    repository: "wagnerjfjunior/fecha.ai",
    observedSha: "3eeb6fd230309f206be7920607739f8e4545556f",
    observedAt: "28 Aug 2026",
    programIssue: "#141",
    currentMilestone: "M1 — Security Truth Baseline",
    securityGo: "NOT GRANTED",
    commercialization: "BLOCKED",
    overallProgress: 6.25,
    weightingBasis: "Peso = duração planejada da janela; progresso só avança quando o gate do milestone é aceito.",
    evidenceBoundary: "STATIC != LIVE != RUNTIME · VERSIONED != APPLIED · RUNTIME_BOUNDED != SECURITY_GO",
    invalidatesOn: "Mudança material em FECH.AI main, Issues #141/#150, lifecycle de workstreams ou evidência de Security Go.",
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
        evidence: "Current live truth not yet established for M1.",
        nextAction: "Run bounded read-only catalog/migration cross-check."
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
        evidence: "No broad current runtime proof claimed.",
        nextAction: "Define static/live/runtime proof boundaries and isolated-test requirements."
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
    { label: "FECH.AI", value: "M0 fechado · M1 ativo" },
    { label: "Fonte canônica", value: "GitHub / main" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "3eeb6fd2…", badge: true },
    { label: "Program issue", value: "#141", badge: true },
    { label: "M1 issue", value: "#150", badge: true },
    { label: "Snapshot", value: "Manual", badge: true }
  ] satisfies SourceRow[],

  timeline: [
    { date: "28 Aug 2026", text: "FECH.AI M1 Security Truth Baseline tornou-se o milestone ativo" },
    { date: "28 Aug 2026", text: "M0 #142 foi encerrado após reconciliação e merge do SFJM" },
    { date: "28 Aug 2026", text: "Security-to-Scale #141 selecionado para Roadmap + Runbook" },
    { date: "24 Jul 2026", text: "FECH.AI registrado como contexto externo manual" }
  ] satisfies TimelineItem[]
};
