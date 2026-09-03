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

export type WbsTaskState = "COMPLETE" | "ACTIVE" | "PLANNED" | "PARKED";
export type WbsTask = {
  id: string;
  label: string;
  hours: number;
  state: WbsTaskState;
  note?: string;
};
export type WbsMilestone = {
  id: string;
  label: string;
  hours: number;
  state: "COMPLETE" | "ACTIVE" | "PLANNED";
  tasks: WbsTask[];
};
export type WbsBacklog = {
  id: string;
  label: string;
  hours: number;
  tasks: WbsTask[];
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
    { icon: "◫", label: "WBS / Effort", helper: "Horas · tarefas · distância", href: "#fechai-wbs" },
    { icon: "☷", label: "Execução", helper: "Histórico · Agora · Futuro", href: "#fechai-execution" },
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#projects" },
    { icon: "⌁", label: "Jornada", helper: "Ledger de eventos", href: "#journey" },
    { icon: "⇄", label: "Handoffs", helper: "Transições de estado", href: "#" },
    { icon: "≋", label: "Evidências", helper: "Registros e artefatos", href: "#" },
    { icon: "⬡", label: "Governança", helper: "Regras e protocolos", href: "#" }
  ] satisfies NavItem[],

  checks: [
    { label: "Último milestone", value: "M1 completo" },
    { label: "Workstream ativo", value: "J4 / PR-08" },
    { label: "Próximo milestone", value: "M2 planejado" },
    { label: "Próxima ação", value: "PR-08 · exact-head review" },
    { label: "Histórico", value: "Preservado" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "M0/M1 concluídos · B2/B3/B4 fechados · PR-07/J3 encerrado com residual bounded · PR-08 OPEN com 9 findings no exact head · M2–M6 preservados",
      nextSafeAction: "J4 / PR-08 — corrigir os 9 findings abertos no exact HEAD 0f3f266c... e repetir review independente; não executar runners.",
      blockers: [
        "Security Go não concedido",
        "Comercialização ampla paga bloqueada",
        "F1-02 final acceptance bloqueado",
        "WDP increase depende de governança",
        "RUNTIME_NEGATIVE_PASS não estabelecido",
        "IMP-003 concurrent business-RPC runtime permanece NOT_DETERMINED",
        "Migration rollback/reapply permanece NOT_DETERMINED",
        "PR-08 runners permanecem NOT_EXECUTED",
        "PR #166 possui 9 review findings abertos no exact head 0f3f266c...",
        "Achados M1-B, M1-D e M1-E ainda possuem remediações pendentes"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "9d05c64281c2aeeae9d67b139eab674720184fb1",
      observedAt: "3 Sep 2026",
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
    activeWorkstream: "J4 / PR-08 — exact-head findings remediation",
    nextSafeAction: "Address 9 unresolved exact-head review findings on 0f3f266c... and repeat independent review; do not execute any PR-08 runner",
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
      },
      {
        id: "F1-02/B4",
        label: "Impedir ACL de lista cross-tenant",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "Architecture + AppSec + LeadOps",
        evidence: "PR #162 merged; migration 20260901222707 aplicada; exact READ_ONLY catalog proof PASS.",
        nextAction: "Histórico fechado; residual runtime permanece separado."
      },
      {
        id: "PR-07 / J3",
        label: "Tenant-safe reads + CRM payload integrity",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "Backend/Data + AppSec + LeadOps",
        evidence: "PR #163 merged; migration 20260902225240 aplicada; J3 encerrado por Product Authority bounded-residual exception.",
        nextAction: "IMP-003 e rollback/reapply permanecem NOT_DETERMINED; não converter em PASS."
      }
    ] satisfies ExecutionItem[],

    active: [
      {
        id: "PR-08 / J4",
        label: "Repeatable Executable Security Matrix",
        category: "REMEDIATION",
        state: "ACTIVE",
        owner: "Backend/Data + AppSec",
        evidence: "PR #166 OPEN / draft=false no head 0f3f266c...; 98 casos versionados; Vercel SUCCESS; review independente abriu 9 findings ainda não resolvidos; runners permanecem NOT_EXECUTED.",
        nextAction: "Corrigir os 9 findings do exact HEAD e repetir review independente. Não executar runtime/Auth/rollback/reapply/production smoke."
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
    ] satisfies ExecutionItem[],

    eventLedger: [
      { date: "23 Jul 2026", text: "Home Migrada", kind: "PROGRAM" },
      { date: "23 Jul 2026", text: "Guardrails", kind: "PROGRAM" },
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
      { date: "1 Sep 2026", text: "F1-02/B4 migration 20260901222707 aplicada; exact READ_ONLY post-application catalog proof PASS", kind: "EVIDENCE" },
      { date: "2 Sep 2026", text: "PR #163 / PR-07 mergeada; tenant-safe funnel reads + CRM payload integrity", kind: "REMEDIATION" },
      { date: "2 Sep 2026", text: "PR-07 migration 20260902225240 aplicada em produção", kind: "EVIDENCE" },
      { date: "3 Sep 2026", text: "J3 fechado por bounded-residual Product Authority exception; IMP-003 e rollback/reapply seguem NOT_DETERMINED", kind: "PROGRAM" },
      { date: "3 Sep 2026", text: "PR #166 Draft criada para J4 / PR-08 com matriz executável de 98 casos; runners NOT_EXECUTED", kind: "PROGRAM" },
      { date: "3 Sep 2026", text: "PR #166 avançou ao head 0f3f266c...; review independente abriu 9 findings; runners continuam NOT_EXECUTED", kind: "EVIDENCE" }
    ] satisfies TimelineItem[]

  } satisfies ProgramSnapshot,

  fechaiWbs: {
    source: "FECH.AI WBS planning baseline + user-approved roadmap view",
    basis: "Planning estimates for visibility, not clocked timesheets.",
    totalCriticalHours: 832,
    completedHours: 176,
    remainingCriticalHours: 656,
    preSecurityGoBacklogHours: 116,
    plannedBacklogHours: 104,
    currentPackage: "M1 / F1-02 — PR-08 / J4",
    currentTask: "PR-08 proof matrix / negative tests — 9 exact-head review findings em correção",
    note: "WBS agrupa o envelope operacional M1/F1-02. Isso não reabre o milestone canônico M1, que permanece concluído no Roadmap.",
    milestones: [
      {
        id: "M0",
        label: "Program Control / Truth Reconciliation",
        hours: 36,
        state: "COMPLETE",
        tasks: [
          { id: "M0-01", label: "Inventário de PRs e continuidade", hours: 8, state: "COMPLETE" },
          { id: "M0-02", label: "Pacotes de especialistas e dependências", hours: 8, state: "COMPLETE" },
          { id: "M0-03", label: "SFJM / Workspace baseline", hours: 10, state: "COMPLETE" },
          { id: "M0-04", label: "Roadmap / governança única", hours: 10, state: "COMPLETE" }
        ]
      },
      {
        id: "M1",
        label: "Security Truth Baseline / F1-02",
        hours: 168,
        state: "ACTIVE",
        tasks: [
          { id: "B1", label: "Baseline de evidências", hours: 18, state: "COMPLETE" },
          { id: "B2", label: "Direct CRM writes", hours: 28, state: "COMPLETE" },
          { id: "B3", label: "Funnel history boundary", hours: 24, state: "COMPLETE" },
          { id: "B4", label: "List ACL tenant integrity", hours: 34, state: "COMPLETE" },
          { id: "PR-07", label: "Tenant-safe reads + payload validation", hours: 36, state: "COMPLETE", note: "PR #163 merged; migration applied; J3 closed with bounded residual evidence." },
          { id: "PR-08", label: "Proof matrix / negative tests", hours: 22, state: "ACTIVE", note: "PR #166 OPEN no head 0f3f266c...; 98 casos versionados; review independente abriu 9 findings; runners NOT_EXECUTED." },
          { id: "PR-09", label: "Close-out & adjudicação final", hours: 6, state: "PLANNED" }
        ]
      },
      {
        id: "M2",
        label: "Database Simplification & Optimization Plan",
        hours: 116,
        state: "PLANNED",
        tasks: [
          { id: "M2-01", label: "Matriz de 43 tabelas", hours: 20, state: "PLANNED" },
          { id: "M2-02", label: "Mapa routines / policies / triggers / grants", hours: 24, state: "PLANNED" },
          { id: "M2-03", label: "Índices / ACL contraditórias", hours: 16, state: "PLANNED" },
          { id: "M2-04", label: "Política target de DEFINER / RLS / DML", hours: 20, state: "PLANNED" },
          { id: "M2-05", label: "Database Contract Map", hours: 20, state: "PLANNED" },
          { id: "M2-06", label: "Decisão arquitetural do banco", hours: 16, state: "PLANNED" }
        ]
      },
      {
        id: "M3",
        label: "Backend Authority Contract Freeze",
        hours: 152,
        state: "PLANNED",
        tasks: [
          { id: "M3-01", label: "Identity / membership / team / role model", hours: 24, state: "PLANNED" },
          { id: "M3-02", label: "Authority contract por contexto", hours: 28, state: "PLANNED" },
          { id: "M3-03", label: "Allowlist de RPCs privilegiadas", hours: 24, state: "PLANNED" },
          { id: "M3-04", label: "Redução de DML sensível direto", hours: 24, state: "PLANNED" },
          { id: "M3-05", label: "Fechamento Auth / Admin flows", hours: 24, state: "PLANNED" },
          { id: "M3-06", label: "Staging / test plan de segurança", hours: 28, state: "PLANNED" }
        ]
      },
      {
        id: "M4",
        label: "Frontend Modularization / App.jsx Extraction",
        hours: 172,
        state: "PLANNED",
        tasks: [
          { id: "M4-01", label: "AppShell boundary", hours: 20, state: "PLANNED" },
          { id: "M4-02", label: "Slice Leads / Funil", hours: 40, state: "PLANNED" },
          { id: "M4-03", label: "Slice Listas / Distribuição", hours: 32, state: "PLANNED" },
          { id: "M4-04", label: "Slice MesaCliente", hours: 32, state: "PLANNED" },
          { id: "M4-05", label: "Gateways / API por feature", hours: 24, state: "PLANNED" },
          { id: "M4-06", label: "Equivalence / regressão", hours: 24, state: "PLANNED" }
        ]
      },
      {
        id: "M5",
        label: "Integrated Security / Reliability Validation",
        hours: 128,
        state: "PLANNED",
        tasks: [
          { id: "M5-01", label: "Hostile-client suite isolada", hours: 28, state: "PLANNED" },
          { id: "M5-02", label: "Regressão tenant / role / auth / storage", hours: 28, state: "PLANNED" },
          { id: "M5-03", label: "Dependency / CVE gate", hours: 12, state: "PLANNED" },
          { id: "M5-04", label: "Secrets / config / deploy gate", hours: 16, state: "PLANNED" },
          { id: "M5-05", label: "Observabilidade / rollback / incidente", hours: 24, state: "PLANNED" },
          { id: "M5-06", label: "Adjudicação de residual risk", hours: 20, state: "PLANNED" }
        ]
      },
      {
        id: "M6",
        label: "Security Go Candidate / Commercial Readiness",
        hours: 60,
        state: "PLANNED",
        tasks: [
          { id: "M6-01", label: "Evidence packet", hours: 14, state: "PLANNED" },
          { id: "M6-02", label: "Blocker closeout", hours: 8, state: "PLANNED" },
          { id: "M6-03", label: "Onboarding / support / runbooks", hours: 18, state: "PLANNED" },
          { id: "M6-04", label: "Decisão comercial controlada", hours: 8, state: "PLANNED" },
          { id: "M6-05", label: "Launch readiness review", hours: 12, state: "PLANNED" }
        ]
      }
    ] satisfies WbsMilestone[],
    backlogs: [
      {
        id: "PRE_SECURITY_GO",
        label: "Backlog pré-Security-Go",
        hours: 116,
        tasks: [
          { id: "BG-01", label: "OC-01 leaked-password control", hours: 14, state: "PARKED" },
          { id: "BG-02", label: "Harden three Root RPC grants", hours: 10, state: "PARKED" },
          { id: "BG-03", label: "Version baseline of critical helpers", hours: 18, state: "PARKED" },
          { id: "BG-04", label: "Root/Admin Global contract rollout / Issue #133", hours: 32, state: "PARKED" },
          { id: "BG-05", label: "Team Lifecycle Authority / Issue #135", hours: 24, state: "PARKED" },
          { id: "BG-06", label: "Explicit audited Root support mode by tenant", hours: 18, state: "PARKED" }
        ]
      },
      {
        id: "PLANNED_FUTURE",
        label: "Backlog planejado / futuro",
        hours: 104,
        tasks: [
          { id: "PL-01", label: "Global funnel-stage capability, se o produto exigir", hours: 20, state: "PARKED" },
          { id: "PL-02", label: "Import / UX enhancements além do security scope", hours: 16, state: "PARKED" },
          { id: "PL-03", label: "App.jsx cleanup além dos vertical slices aprovados", hours: 24, state: "PARKED" },
          { id: "PL-04", label: "Observability / dashboard polish", hours: 16, state: "PARKED" },
          { id: "PL-05", label: "CRM productivity / UX improvements", hours: 28, state: "PARKED" }
        ]
      }
    ] satisfies WbsBacklog[]
  },

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
    { label: "Workstream ativo", value: "J4 / PR-08" },
    { label: "Próximo milestone", value: "M2" },
    { label: "Modelo temporal", value: "Passado + Agora + Futuro" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "9d05c642…", badge: true },
    { label: "Program issue", value: "#141", badge: true },
    { label: "M1 issue", value: "#150 CLOSED", badge: true },
    { label: "PR-08 candidate", value: "#166 OPEN · 9 findings", badge: true },
    { label: "Snapshot", value: "Manual · 3 Sep", badge: true }
  ] satisfies SourceRow[]
};
