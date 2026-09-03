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
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#projects" },
    { icon: "⌁", label: "Jornada", helper: "Visão da jornada", href: "#journey" },
    { icon: "⇄", label: "Handoffs", helper: "Transições de estado", href: "#" },
    { icon: "≋", label: "Evidências", helper: "Registros e artefatos", href: "#" },
    { icon: "⬡", label: "Governança", helper: "Regras e protocolos", href: "#" }
  ] satisfies NavItem[],

  checks: [
    { label: "Main canônico", value: "Verificado" },
    { label: "Handoff", value: "Assumido" },
    { label: "Conversa atual", value: "Handoff FECH.AI" },
    { label: "Milestone", value: "M1 completo" },
    { label: "Próxima ação", value: "J4 · reconstrução READ_ONLY" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "M0/M1 fechados · B2/B3/B4 fechados · J3 fechado com residual · J4 ativo",
      nextSafeAction: "J4/F1-02 — reconstrução READ_ONLY do gate contra a main canônica; separar harness versionado, runtime PR-08, rollback/reapply, OC-01, PR-09 e Security Go.",
      blockers: [
        "Security Go não concedido",
        "Comercialização ampla paga bloqueada",
        "PR-08 runtime = NOT_EXECUTED",
        "IMP-003 = NOT_DETERMINED",
        "ROLLBACK_REAPPLY = NOT_DETERMINED",
        "PR08-RR-64M-CANONICAL-HASH = ACCEPTABLE WITH RESIDUAL RISK",
        "OC-01 e PR-09 não estão autorizados por este snapshot"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "f4ff8e42f601a1e033ae6ceaf4c5ecd17b23f3a8",
      observedAt: "3 Sep 2026",
      verification: "Snapshot manual verificado · FECH.AI continua sendo a autoridade"
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
    observedSha: "f4ff8e42f601a1e033ae6ceaf4c5ecd17b23f3a8",
    observedAt: "3 Sep 2026",
    programIssue: "#141",
    currentMilestone: "Pós-M1 — F1-02/J4 evidence-gate reconstruction",
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
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Backend/Data + AppSec + Documentation",
        exit: "Baseline concluído; Issue #150 fechada; achados classificados e remediação ativa."
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
        state: "COMPLETE",
        evidence: "LIVE DB × GitHub × ledger reconciliados; provenance residual preservado.",
        nextAction: "Encerrado no baseline M1."
      },
      {
        id: "M1-B",
        task: "Privileged-surface inventory",
        owner: "backend_data",
        state: "COMPLETE",
        evidence: "Superfície privilegiada live recomputada e M1-B-F01 classificado.",
        nextAction: "Remediar M1-B-F01 em ciclo próprio."
      },
      {
        id: "M1-C",
        task: "Tenant-isolation proof plan",
        owner: "application_security",
        state: "COMPLETE",
        evidence: "Plano de prova definido; M1-C-F01 aplicado e provado sem reabrir Security Go.",
        nextAction: "Encerrado; remediação F1-02 segue em B4."
      },
      {
        id: "M1-D",
        task: "Dependency / known-vulnerability inventory",
        owner: "application_security",
        state: "COMPLETE",
        evidence: "M1-D-F01 e M1-D-F02 identificados e classificados.",
        nextAction: "Remediar dependências em ciclo próprio."
      },
      {
        id: "M1-E",
        task: "Secrets / infrastructure attack-surface inventory",
        owner: "application_security",
        state: "COMPLETE",
        evidence: "M1-E-F01 a F04 identificados sem exposição de valores secretos.",
        nextAction: "Remediar achados M1-E em ciclos próprios."
      },
      {
        id: "M1-F",
        task: "Evidence reconciliation / M1 verdict",
        owner: "documentation_audit",
        state: "COMPLETE",
        evidence: "Backend/Data, AppSec e Documentation concluíram o baseline; #150 fechada.",
        nextAction: "Encerrado; não reabrir sem invalidação material."
      },
      {
        id: "R-M1C",
        task: "M1-C-F01 — integridade tenant do funil",
        owner: "backend_data + application_security",
        state: "COMPLETE",
        evidence: "B1 e anomalias encerrados; migration aplicada; 4 FKs tenant-aware validadas; mismatches = 0.",
        nextAction: "Nenhuma; manter evidência e rollback."
      },
      {
        id: "R-B2",
        task: "F1-02/B2 — bloquear writes CRM diretos",
        owner: "backend_data + application_security",
        state: "COMPLETE",
        evidence: "PR #159 merged; migration f1_02_b2_revoke_direct_crm_writes aplicada uma vez; READ_ONLY catalog proof PASS.",
        nextAction: "Nenhuma; runtime-negative PASS permanece não estabelecido."
      },
      {
        id: "R-B3",
        task: "F1-02/B3 — bloquear histórico forjável",
        owner: "application_security",
        state: "COMPLETE",
        evidence: "PR #157 merged; migration aplicada; READ_ONLY catalog proof PASS.",
        nextAction: "Nenhuma; não reabrir sem evidência contraditória."
      },
      {
        id: "R-B4",
        task: "F1-02/B4 / PR-06 — tenant-safe list visibility",
        owner: "architecture + application_security + leadops",
        state: "COMPLETE",
        evidence: "PR #162 merged como 020594a2bb66fed5b6ab38f2d015878a7ef54d71; J3 avançou além do PR-06.",
        nextAction: "Encerrado no fluxo J3; não reabrir sem invalidação material."
      },
      {
        id: "R-J3-PR07",
        task: "J3 / PR-07 — tenant-safe reads + payload integrity",
        owner: "backend_data + application_security + leadops",
        state: "COMPLETE",
        evidence: "PR #163 merged; migration aplicada; J3 fechado por Product Authority com bounded residual evidence.",
        nextAction: "Preservar IMP-003 e rollback/reapply como NOT_DETERMINED; não promover a PASS."
      },
      {
        id: "R-J4-PR08",
        task: "J4 / PR-08 — repeatable executable security matrix",
        owner: "application_security + github_cicd + documentation",
        state: "ACTIVE",
        evidence: "PR #166 merged; harness/matrix versionados; Vercel Production SUCCESS; PR #167 SFJM reconciliation merged. Runtime PR-08 permanece NOT_EXECUTED.",
        nextAction: "READ_ONLY reconstruction do próximo gate J4/F1-02 contra a main f4ff8e42; separar runtime, rollback/reapply, OC-01, PR-09 e Security Go."
      }
    ] satisfies RunbookItem[]
  } satisfies ProgramSnapshot,

  contexts: [
    { icon: "🧠", label: "Contexto Preservado", value: "Confirmado" },
    { icon: "☑", label: "Decisões Preservadas", value: "Confirmado" },
    { icon: "📁", label: "Evidências Canônicas", value: "GitHub" },
    { icon: "🤝", label: "Handoff Assumido", value: "J4 continuity" },
    { icon: "🔒", label: "Governança Mantida", value: "Ativa" },
    { icon: "◉", label: "Fonte Verificada", value: "main" }
  ] satisfies ContextCard[],

  journey: [
    { label: "Home Migrada", date: "23 Jul 2026" },
    { label: "Guardrails", date: "23 Jul 2026" },
    { label: "FECH.AI Continue", date: "24 Jul 2026" },
    { label: "Security-to-Scale", date: "28 Aug 2026" },
    { label: "M0 fechado", date: "28 Aug 2026" },
    { label: "M1 completo", date: "31 Aug 2026" },
    { label: "B4 / PR-06 fechado", date: "1 Sep 2026" },
    { label: "J3 / PR-07 fechado c/ residual", date: "2 Sep 2026" },
    { label: "J4 / PR-08 mergeado", date: "3 Sep 2026" },
    { label: "Reconstrução J4", date: "3 Sep 2026", current: true }
  ] satisfies JourneyStep[],

  currentState: [
    { label: "Estado de continuidade", value: "M1 completo · remediação ativa" },
    { label: "Conversa ativa", value: "Workspace — Chart 3" },
    { label: "FECH.AI", value: "M0/M1 fechados · B2/B3/B4 fechados · J3 fechado c/ residual · J4 ativo" },
    { label: "Fonte canônica", value: "GitHub / main" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "f4ff8e42…", badge: true },
    { label: "Program issue", value: "#141", badge: true },
    { label: "M1 issue", value: "#150 CLOSED", badge: true },
    { label: "Snapshot", value: "Manual", badge: true }
  ] satisfies SourceRow[],

  timeline: [
    { date: "3 Sep 2026", text: "PR #167 SFJM pós-merge/pós-deploy mergeada; main FECH.AI avançou para f4ff8e42" },
    { date: "3 Sep 2026", text: "PR #166 / PR-08 mergeada; Vercel Production SUCCESS; runtime PR-08 permanece NOT_EXECUTED" },
    { date: "2 Sep 2026", text: "J3 / PR-07 fechado com bounded residual evidence; IMP-003 e rollback/reapply seguem NOT_DETERMINED" },
    { date: "1 Sep 2026", text: "B4 / PR-06 concluído em PR #162; fluxo avançou para PR-07/J3" },
    { date: "1 Sep 2026", text: "B2 e B3 fechados no boundary catalogal; B4 passa a ser o próximo risco ativo" },
    { date: "1 Sep 2026", text: "B2: PR #159 merged + migration aplicada + READ_ONLY catalog proof PASS" },
    { date: "1 Sep 2026", text: "B3: PR #157 merged + migration aplicada + READ_ONLY catalog proof PASS" },
    { date: "1 Sep 2026", text: "M1-C-F01 aplicado e provado; integridade tenant do funil preservada" },
    { date: "31 Aug 2026", text: "M1 Security Truth Baseline concluído e Issue #150 fechada" },
    { date: "28 Aug 2026", text: "M0 #142 foi encerrado após reconciliação e merge do SFJM" },
    { date: "28 Aug 2026", text: "Security-to-Scale #141 selecionado para Roadmap + Runbook" },
    { date: "24 Jul 2026", text: "FECH.AI registrado como contexto externo manual" }
  ] satisfies TimelineItem[]
};
