export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string; kind: "PROGRAM" | "BASELINE" | "REMEDIATION" | "EVIDENCE" };
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

export type ExecutionItem = {
  id: string;
  label: string;
  category: "BASELINE" | "REMEDIATION" | "PROGRAM";
  state: "COMPLETE" | "ACTIVE" | "PLANNED" | "BLOCKED";
  owner: string;
  evidence: string;
  nextAction: string;
};

export type ProgramSnapshot = {
  name: string;
  repository: string;
  observedSha: string;
  observedAt: string;
  programIssue: string;
  lastCompletedMilestone: string;
  nextProgramMilestone: string;
  activeWorkstream: string;
  nextSafeAction: string;
  securityGo: string;
  commercialization: string;
  weightingBasis: string;
  evidenceBoundary: string;
  invalidatesOn: string;
  milestones: ProgramMilestone[];
  history: ExecutionItem[];
  active: ExecutionItem[];
  future: ExecutionItem[];
  eventLedger: TimelineItem[];
};

export function calculateAcceptedProgramProgress(milestones: ProgramMilestone[]) {
  return milestones.reduce(
    (total, milestone) => total + milestone.weight * (milestone.acceptedPercent / 100),
    0
  );
}

export const workspaceDemo = {
  notice: "Snapshot manual · plano + histórico + estado atual + futuro preservados separadamente.",
  nav: [
    { icon: "▶", label: "Continue", helper: "Próxima ação segura", href: "#continue", active: true },
    { icon: "◎", label: "Roadmap", helper: "Security-to-Scale", href: "#fechai-program" },
    { icon: "☷", label: "Execução", helper: "Histórico · Agora · Futuro", href: "#fechai-execution" },
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#projects" },
    { icon: "⌁", label: "Jornada", helper: "Ledger de eventos", href: "#journey" },
    { icon: "⇄", label: "Handoffs", helper: "Transições de estado", href: "#" },
    { icon: "≋", label: "Evidências", helper: "Registros e artefatos", href: "#" },
    { icon: "⬡", label: "Governança", helper: "Regras e protocolos", href: "#" }
  ] satisfies NavItem[],

  checks: [
    { label: "Último milestone", value: "M1 completo" },
    { label: "Workstream ativo", value: "B4 pós-aplicação" },
    { label: "Próximo milestone", value: "M2 planejado" },
    { label: "Próxima ação", value: "B4 · fechamento pós-aplicação" },
    { label: "Histórico", value: "Preservado" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "M0/M1 concluídos · B4 merged + applied + catalog proof PASS · fechamento pós-aplicação pendente · M2–M6 preservados",
      nextSafeAction: "F1-02/B4 — concluir adjudicação pós-aplicação e reconciliação canônica; exact READ_ONLY catalog proof já passou.",
      blockers: [
        "Security Go não concedido",
        "Comercialização ampla paga bloqueada",
        "F1-02 final acceptance bloqueado",
        "RUNTIME_NEGATIVE_PASS não estabelecido",
        "F1-02/B4 foi mergeado e aplicado; fechamento pós-aplicação ainda não está canonicamente registrado",
        "Achados M1-B, M1-D e M1-E ainda possuem remediações pendentes"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "020594a2bb66fed5b6ab38f2d015878a7ef54d71",
      observedAt: "1 Sep 2026",
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
    observedSha: "020594a2bb66fed5b6ab38f2d015878a7ef54d71",
    observedAt: "1 Sep 2026",
    programIssue: "#141",
    lastCompletedMilestone: "M1 — Security Truth Baseline",
    nextProgramMilestone: "M2 — Database Simplification & Optimization Plan",
    activeWorkstream: "F1-02/B4 — pós-aplicação de list ACL tenant integrity",
    nextSafeAction: "Post-application adjudication + canonical reconciliation; runtime-negative remains NOT_ESTABLISHED",
    securityGo: "NOT GRANTED",
    commercialization: "BLOCKED",
    weightingBasis: "Peso = duração planejada; progresso só avança quando o gate do milestone é aceito.",
    evidenceBoundary: "STATIC != LIVE != RUNTIME · VERSIONED != APPLIED · RUNTIME_BOUNDED != SECURITY_GO",
    invalidatesOn: "Mudança material no plano #141, evidência, findings, Security Go, comercialização ou classificação de workstreams.",
    milestones: [
      {
        id: "M0",
        label: "Program Control / Truth Reconciliation",
        window: "28 Aug–4 Sep",
        weight: 6.25,
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Documentation",
        exit: "M0 #142 fechado; verdade reconciliada e transição para M1 publicada."
      },
      {
        id: "M1",
        label: "Security Truth Baseline",
        window: "4–18 Sep",
        weight: 12.5,
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Backend/Data + AppSec + Documentation",
        exit: "Baseline concluído; #150 fechado; findings classificados; remediação continua em trilha própria."
      },
      {
        id: "M2",
        label: "Database Simplification & Optimization Plan",
        window: "18 Sep–9 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Backend/Data + Architecture",
        exit: "Canonicality matrix + routine/policy/trigger/grant map + Database Contract Map + evolution decision."
      },
      {
        id: "M3",
        label: "Backend Authority Contract Freeze",
        window: "9–30 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Backend/Data + AppSec + Architecture",
        exit: "Canonical authority model + commands/queries + privileged allowlist + staging/security plan."
      },
      {
        id: "M4",
        label: "Frontend Modularization / App.jsx Extraction",
        window: "30 Oct–27 Nov",
        weight: 25,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Architecture + UX/UI + Domains",
        exit: "AppShell apenas composição; slices críticos extraídos; nenhuma autoridade movida ao frontend."
      },
      {
        id: "M5",
        label: "Integrated Security / Reliability Validation",
        window: "27 Nov–11 Dec",
        weight: 12.5,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "AppSec + Platform + SRE + Backend/Data",
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
        exit: "Security Go evidence packet + launch blockers resolved + commercialization decision separada."
      }
    ] satisfies ProgramMilestone[],

    history: [
      {
        id: "M1-A",
        label: "LIVE DB × GitHub main × applied migration ledger",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "backend_data",
        evidence: "Baseline M1 reconciliado; provenance residual preservado.",
        nextAction: "Histórico fechado; não reabrir sem invalidação material."
      },
      {
        id: "M1-B",
        label: "Privileged-surface inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "backend_data",
        evidence: "Superfície privilegiada recomputada; M1-B-F01 classificado.",
        nextAction: "Baseline fechado; finding segue na fila de remediação."
      },
      {
        id: "M1-C",
        label: "Tenant-isolation proof plan",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "Plano de prova concluído; M1-C-F01 seguiu para remediação e foi aplicado/provado.",
        nextAction: "Histórico fechado."
      },
      {
        id: "M1-D",
        label: "Dependency / known-vulnerability inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "M1-D-F01 e M1-D-F02 identificados e classificados.",
        nextAction: "Baseline fechado; findings permanecem na fila futura."
      },
      {
        id: "M1-E",
        label: "Secrets / infrastructure attack-surface inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "M1-E-F01 a F04 identificados sem exposição de valores secretos.",
        nextAction: "Baseline fechado; findings permanecem na fila futura."
      },
      {
        id: "M1-F",
        label: "Evidence reconciliation / M1 verdict",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "documentation_audit",
        evidence: "M1 concluído e Issue #150 fechada.",
        nextAction: "Não reabrir sem invalidação material."
      },
      {
        id: "M1-C-F01",
        label: "Integridade tenant do funil",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "backend_data + application_security",
        evidence: "Migration aplicada; 4 FKs tenant-aware validadas; mismatches = 0.",
        nextAction: "Manter evidência e rollback."
      },
      {
        id: "F1-02/B2",
        label: "Bloquear writes CRM diretos",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "backend_data + application_security",
        evidence: "PR #159 merged; migration aplicada; READ_ONLY catalog proof PASS.",
        nextAction: "Runtime-negative PASS permanece residual separado."
      },
      {
        id: "F1-02/B3",
        label: "Bloquear histórico forjável",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "PR #157 merged; migration aplicada; READ_ONLY catalog proof PASS.",
        nextAction: "Não reabrir sem evidência contraditória."
      }
    ] satisfies ExecutionItem[],

    active: [
      {
        id: "F1-02/B4",
        label: "Impedir ACL de lista cross-tenant",
        category: "REMEDIATION",
        state: "ACTIVE",
        owner: "Architecture + AppSec + LeadOps",
        evidence: "PR #162 mergeada em 020594a2...; migration 20260901222707 aplicada; exact READ_ONLY catalog proof PASS; 12 ACL rows e fingerprint preservados; direct authenticated I/U/D revogados; FK/trigger/integridade PASS.",
        nextAction: "Fechar adjudicação pós-aplicação e reconciliar o estado canônico. RUNTIME_NEGATIVE_PASS permanece NOT_ESTABLISHED."
      }
    ] satisfies ExecutionItem[],

    future: [
      {
        id: "M1-B-F01",
        label: "Anon privileged RPC execution surface",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "Backend/Data + AppSec",
        evidence: "Finding confirmado no fechamento M1; ordem de remediação ainda não redefine o roadmap.",
        nextAction: "Remediação futura em ciclo próprio, com autoridade e evidência próprias."
      },
      {
        id: "M1-D-F01",
        label: "Dependency reproducibility gap",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "Finding confirmado no baseline M1.",
        nextAction: "Corrigir em ciclo próprio sem apagar o histórico do baseline."
      },
      {
        id: "M1-D-F02",
        label: "Vite 6.4.2 known affected version",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "GHSA-fx2h-pf6j-xcff registrado; exploitabilidade em produção não estabelecida.",
        nextAction: "Upgrade e validação em ciclo próprio."
      },
      {
        id: "M1-E-F01",
        label: "Live Edge function not versioned",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "Platform + AppSec",
        evidence: "assistente-ai v10 live; source ausente do main no fechamento M1.",
        nextAction: "Restaurar rastreabilidade/versionamento em ciclo próprio."
      },
      {
        id: "M1-E-F02",
        label: "Browser session refresh-token exposure surface",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec",
        evidence: "Finding material confirmado; localStorage por si só não equivale a exploit.",
        nextAction: "Reduzir superfície em ciclo próprio."
      },
      {
        id: "M1-E-F03",
        label: "External worker proxy authority gap",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "Finding material estático; abuso/runtime crossover não provado.",
        nextAction: "Fechar authority gap com prova própria."
      },
      {
        id: "M1-E-F04",
        label: "Leaked password protection disabled",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec",
        evidence: "Auth hardening gap confirmado.",
        nextAction: "Endurecimento de Auth em ciclo próprio."
      },
      {
        id: "M2",
        label: "Database Simplification & Optimization Plan",
        category: "PROGRAM",
        state: "PLANNED",
        owner: "Backend/Data + Architecture",
        evidence: "Milestone futuro definido no programa #141.",
        nextAction: "Iniciar somente quando a transição canônica do programa autorizar."
      },
      {
        id: "M3",
        label: "Backend Authority Contract Freeze",
        category: "PROGRAM",
        state: "PLANNED",
        owner: "Backend/Data + AppSec + Architecture",
        evidence: "Milestone futuro definido no programa #141.",
        nextAction: "Preservar como futuro até a transição canônica."
      },
      {
        id: "M4",
        label: "Frontend Modularization / App.jsx Extraction",
        category: "PROGRAM",
        state: "PLANNED",
        owner: "Architecture + UX/UI + Domains",
        evidence: "Milestone futuro definido no programa #141.",
        nextAction: "Preservar como futuro até a transição canônica."
      },
      {
        id: "M5",
        label: "Integrated Security / Reliability Validation",
        category: "PROGRAM",
        state: "PLANNED",
        owner: "AppSec + Platform + SRE + Backend/Data",
        evidence: "Milestone futuro definido no programa #141.",
        nextAction: "Preservar como futuro até a transição canônica."
      },
      {
        id: "M6",
        label: "Security Go Candidate / Commercial Readiness",
        category: "PROGRAM",
        state: "PLANNED",
        owner: "Product Authority + Security + Platform",
        evidence: "Milestone futuro definido no programa #141.",
        nextAction: "Preservar como futuro até a transição canônica."
      }
    ] satisfies ExecutionItem[],

    eventLedger: [
      { date: "24 Jul 2026", text: "FECH.AI registrado como contexto externo manual", kind: "PROGRAM" },
      { date: "28 Aug 2026", text: "Security-to-Scale #141 selecionado como programa canônico", kind: "PROGRAM" },
      { date: "28 Aug 2026", text: "M0 #142 encerrado após reconciliação", kind: "PROGRAM" },
      { date: "28 Aug 2026", text: "M1 Security Truth Baseline iniciado", kind: "BASELINE" },
      { date: "30 Aug 2026", text: "APPSEC-M1-003 / public.leads: implementação/catalog closure registrada com limitação runtime", kind: "EVIDENCE" },
      { date: "31 Aug 2026", text: "M1 Security Truth Baseline concluído; Issue #150 fechada", kind: "BASELINE" },
      { date: "31 Aug 2026", text: "M1-C-F01 aplicado e provado; integridade tenant do funil preservada", kind: "REMEDIATION" },
      { date: "1 Sep 2026", text: "F1-02/B3 fechado: merged + applied + READ_ONLY catalog proof PASS", kind: "REMEDIATION" },
      { date: "1 Sep 2026", text: "F1-02/B2 fechado: merged + applied + READ_ONLY catalog proof PASS", kind: "REMEDIATION" },
      { date: "1 Sep 2026", text: "F1-02/B4 ativado como workstream atual; target design first", kind: "REMEDIATION" },
      { date: "1 Sep 2026", text: "F1-02/B4 PR #162 mergeada no FECH.AI main 020594a2...", kind: "REMEDIATION" },
      { date: "1 Sep 2026", text: "F1-02/B4 migration 20260901222707 aplicada; exact READ_ONLY post-application catalog proof PASS", kind: "EVIDENCE" }
    ] satisfies TimelineItem[]
  } satisfies ProgramSnapshot,

  contexts: [
    { icon: "🧠", label: "Contexto Preservado", value: "Confirmado" },
    { icon: "☑", label: "Histórico Preservado", value: "Append-only" },
    { icon: "🗺", label: "Plano Futuro", value: "M2–M6" },
    { icon: "📁", label: "Evidências Canônicas", value: "GitHub" },
    { icon: "🔒", label: "Governança Mantida", value: "Ativa" },
    { icon: "◉", label: "Fonte Verificada", value: "main" }
  ] satisfies ContextCard[],

  currentState: [
    { label: "Último milestone concluído", value: "M1" },
    { label: "Workstream ativo", value: "B4 pós-aplicação" },
    { label: "Próximo milestone", value: "M2" },
    { label: "Modelo temporal", value: "Passado + Agora + Futuro" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "020594a2…", badge: true },
    { label: "Program issue", value: "#141", badge: true },
    { label: "M1 issue", value: "#150 CLOSED", badge: true },
    { label: "Snapshot", value: "Manual", badge: true }
  ] satisfies SourceRow[]
};
