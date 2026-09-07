export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string; kind: "PROGRAM" | "BASELINE" | "REMEDIATION" | "EVIDENCE" };
export type TaskDecompositionState =
  | "COMPLETE"
  | "ACTIVE"
  | "NEXT"
  | "PLANNED"
  | "BLOCKED"
  | "NOT_AUTHORIZED"
  | "UNKNOWN";

export type TaskDecompositionItem = {
  id: string;
  label: string;
  state: TaskDecompositionState;
  status: string;
  note?: string;
  hours?: number;
  owner?: string;
  evidenceRef?: string;
  children?: TaskDecompositionItem[];
};

export type TaskDecompositionPresentationGroup = {
  id: string;
  label: string;
  memberIds: string[];
};

export type TaskDecomposition = {
  parentTaskId: string;
  parentLabel: string;
  source: string;
  items: TaskDecompositionItem[];
  presentationGroups?: TaskDecompositionPresentationGroup[];
};

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
  taskDecompositions?: TaskDecomposition[];
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

export type SpecialistRoute = {
  sequence: number;
  role: string;
  archetypeId: string;
  targetName: string;
  purpose: string;
  requirement: "REQUIRED" | "CONDITIONAL";
};

export type ProgramSnapshot = {
  name: string;
  repository: string;
  observedSha: string;
  observedAt: string;
  programIssue: string;
  programObjective: string;
  objectiveSource: string;
  objectiveIntegrity: string;
  objectiveChangePolicy: string;
  specialistTransport: string;
  specialistRouting: SpecialistRoute[];
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
  notice: "Snapshot manual · objetivo + plano + histórico + estado atual + futuro + roteamento preservados separadamente.",
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
    { label: "Último milestone", value: "STS-M1 fechado · deferred assurance" },
    { label: "Milestone atual", value: "STS-M2 · STARTED" },
    { label: "Próxima ação", value: "STS-M2-04E · selecionar/autorizar architecture synthesis" },
    { label: "Objetivo principal", value: "Preservado · Issue #141" },
    { label: "Histórico", value: "Preservado" },
    { label: "Security Go", value: "Não concedido" }
  ] satisfies StatusCheck[],

  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "STS-M2 STARTED · STS-M2-04 IN PROGRESS · B1/B2/B3/C/D COMPLETE · M2-04E NEXT CANDIDATE / NOT AUTHORIZED",
      nextSafeAction: "STS-M2-04 → Product Authority selecionar/autorizar M2-04E — architecture synthesis. M2-04E e M2-04F permanecem não autorizados; nenhum slice é iniciado automaticamente.",
      blockers: [
        "Security Go continua DENIED / NOT_GRANTED",
        "Broad paid commercialization continua BLOCKED",
        "J4 environment-dependent evidence está DEFERRED, não PASS",
        "IMP-003 permanece NOT_DETERMINED",
        "ROLLBACK_REAPPLY permanece NOT_DETERMINED",
        "OC-01 é REQUIRED BEFORE EXTERNAL USERS",
        "Cinco bounded authority residuals permanecem: 004, 031, 036, 047, 127",
        "M2-04D remediation backlog D-01..D-08 permanece NOT_IMPLEMENTED",
        "STS-M2-04E e STS-M2-04F permanecem NOT_AUTHORIZED"
      ],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "aa266df3124f407a3f2c155c8f8ab5c193707783",
      observedAt: "6 Sep 2026 · M2-04D accepted",
      verification: "Snapshot manual · FECH.AI continua sendo a autoridade",
      taskDecompositions: [{
        parentTaskId: "STS-M2-04",
        parentLabel: "Política target de DEFINER / RLS / DML",
        source: "FECH.AI docs/sfjm/CURRENT_STATE.md + NEXT_SAFE_ACTION.md + handoffs/CURRENT.md @ aa266df3…",
        presentationGroups: [
          {
            id: "M2-04B",
            label: "Routine authority classification",
            memberIds: ["M2-04B1", "M2-04B2", "M2-04B3"]
          }
        ],
        items: [
          {
            id: "M2-04B1",
            label: "Routine Authority Policy Core",
            state: "COMPLETE",
            status: "COMPLETE / ACCEPTED WITH RESIDUALS",
            note: "Target contract accepted; per-routine compliance remained downstream.",
            evidenceRef: "docs/security/evidence/2026-09-05-sts-m2-04b1-routine-authority-policy.md"
          },
          {
            id: "M2-04B2",
            label: "High-Risk Routine Authority Classification",
            state: "COMPLETE",
            status: "COMPLETE / ACCEPTED WITH RESIDUALS",
            note: "15 high-risk routines classified; runtime/AppSec residuals preserved.",
            evidenceRef: "docs/security/evidence/2026-09-05-sts-m2-04b2-high-risk-routine-authority-classification.md"
          },
          {
            id: "M2-04B3",
            label: "Remaining Routine Authority Classification",
            state: "COMPLETE",
            status: "COMPLETE / ACCEPTED",
            note: "113/113 classified · 52 DEFINER · 4 INVOKER · 57 NOT_DETERMINED · six authority blockers preserved.",
            evidenceRef: "docs/security/evidence/2026-09-05-sts-m2-04b3-remaining-routine-authority-classification.md"
          },
          {
            id: "M2-04C",
            label: "RLS / FORCE RLS / direct DML / policy composition",
            state: "COMPLETE",
            status: "COMPLETE / ACCEPTED WITH BOUNDED AUTHORITY RESIDUALS",
            note: "Target projection: 68 DEFINER / 40 INVOKER / 5 NOT_DETERMINED / 113 total.",
            children: [
              {
                id: "M2-04C1",
                label: "Live RLS / FORCE RLS / ACL / policy inventory",
                state: "COMPLETE",
                status: "COMPLETE"
              },
              {
                id: "M2-04C2",
                label: "Policy-helper graph / USING-WITH CHECK / direct-DML authority",
                state: "COMPLETE",
                status: "COMPLETE WITH RESIDUAL EVIDENCE GAPS / ACCEPTED"
              },
              {
                id: "M2-04C3",
                label: "57-routine target-mode adjudication",
                state: "COMPLETE",
                status: "COMPLETE WITH RESIDUAL NOT_DETERMINED / ACCEPTED"
              },
              {
                id: "M2-04C4",
                label: "Target RLS / direct-DML contract consolidation",
                state: "COMPLETE",
                status: "COMPLETE / ACCEPTED"
              }
            ]
          },
          {
            id: "M2-04D",
            label: "Trigger provenance / trigger classification",
            state: "COMPLETE",
            status: "COMPLETE / ACCEPTED TRIGGER AUTHORITY CONTRACT",
            note: "9 trigger functions · 18 trigger instances · target 8 DEFINER / 1 INVOKER / 0 NOT_DETERMINED."
          },
          {
            id: "M2-04E",
            label: "Architecture synthesis",
            state: "NOT_AUTHORIZED",
            status: "NEXT CANDIDATE / NOT AUTHORIZED",
            note: "Next semantic gate requires separate Product Authority selection/authorization."
          },
          {
            id: "M2-04F",
            label: "AppSec assurance",
            state: "NOT_AUTHORIZED",
            status: "NOT AUTHORIZED / NOT STARTED",
            note: "Remains outside current authorization."
          }
        ]
      }]
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
    observedSha: "aa266df3124f407a3f2c155c8f8ab5c193707783",
    observedAt: "6 Sep 2026 · M2-04D accepted",
    programIssue: "#141",
    programObjective: "Reach a sellable, operable FECH.AI with a defensible Security Go candidate and a clear path out of the current frontend/backend monolith before year-end, without hiding unresolved risk or performing a big-bang rewrite.",
    objectiveSource: "FECH.AI Issue #141 + program-hierarchy BCR",
    objectiveIntegrity: "PRESERVED · no approved objective drift observed",
    objectiveChangePolicy: "Material objective change must be versioned in the canonical project and explicitly approved; otherwise flag OBJECTIVE_DRIFT and do not claim safe continuity.",
    specialistTransport: "MANUAL COPY/PASTE · Workspace only indicates the destination",
    specialistRouting: [
      {
        sequence: 1,
        role: "backend_data",
        archetypeId: "backend-data-platform-specialist",
        targetName: "SES — Backend & Data Platform Specialist",
        purpose: "Primary M2-04 target-policy reconstruction",
        requirement: "REQUIRED"
      },
      {
        sequence: 2,
        role: "architecture",
        archetypeId: "software-systems-architect",
        targetName: "SES — Software Systems Architect",
        purpose: "Architecture adjudication and downstream M2-05/M2-06 fit",
        requirement: "REQUIRED"
      },
      {
        sequence: 3,
        role: "application_security",
        archetypeId: "application-security-assurance-specialist",
        targetName: "SES — Application Security Assurance Specialist",
        purpose: "Bounded independent assurance only for material target-security-policy questions",
        requirement: "CONDITIONAL"
      }
    ],
    lastCompletedMilestone: "STS-M1 — COMPLETE WITH DEFERRED SECURITY ASSURANCE",
    nextProgramMilestone: "STS-M3 — Backend Authority Contract Freeze · PLANNED",
    activeWorkstream: "STS-M2 · STARTED · STS-M2-04 IN PROGRESS · B1/B2/B3/C/D complete · E next candidate",
    nextSafeAction: "Resolve live main aa266df3… → Product Authority select/authorize STS-M2-04E architecture synthesis → M2-04E/M2-04F remain NOT_AUTHORIZED until separately approved → no slice auto-starts",
    securityGo: "NOT GRANTED",
    commercialization: "BLOCKED",
    weightingBasis: "Peso = duração planejada; progresso só avança quando o gate do milestone é aceito.",
    evidenceBoundary: "OBJECTIVE != TASK · WBS_STRUCTURE != CURRENT_STATE · STATIC != LIVE != RUNTIME · VERSIONED != APPLIED · RUNTIME_BOUNDED != SECURITY_GO",
    invalidatesOn: "Mudança material no plano #141, evidência, findings, Security Go, comercialização ou classificação de workstreams.",
    milestones: [
      {
        id: "STS-M0",
        label: "Program Control / Truth Reconciliation",
        window: "28 Aug–4 Sep",
        weight: 6.25,
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Documentation",
        exit: "M0 #142 fechado; verdade reconciliada e transição para M1 publicada."
      },
      {
        id: "STS-M1",
        label: "Security Truth Baseline",
        window: "4–18 Sep",
        weight: 12.5,
        acceptedPercent: 100,
        status: "COMPLETE",
        owner: "Backend/Data + AppSec + Documentation",
        exit: "Baseline concluído; #150 fechado; findings classificados; remediação continua em trilha própria."
      },
      {
        id: "STS-M2",
        label: "Database Simplification & Optimization Plan",
        window: "18 Sep–9 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "ACTIVE",
        owner: "Backend/Data + Architecture",
        exit: "Canonicality matrix + routine/policy/trigger/grant map + target authority policy + Database Contract Map + evolution decision."
      },
      {
        id: "STS-M3",
        label: "Backend Authority Contract Freeze",
        window: "9–30 Oct",
        weight: 18.75,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Backend/Data + AppSec + Architecture",
        exit: "Canonical authority model + commands/queries + privileged allowlist + staging/security plan."
      },
      {
        id: "STS-M4",
        label: "Frontend Modularization / App.jsx Extraction",
        window: "30 Oct–27 Nov",
        weight: 25,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "Architecture + UX/UI + Domains",
        exit: "AppShell apenas composição; slices críticos extraídos; nenhuma autoridade movida ao frontend."
      },
      {
        id: "STS-M5",
        label: "Integrated Security / Reliability Validation",
        window: "27 Nov–11 Dec",
        weight: 12.5,
        acceptedPercent: 0,
        status: "PLANNED",
        owner: "AppSec + Platform + SRE + Backend/Data",
        exit: "Negative/regression gates + CVE/secrets/deploy/observability/rollback readiness."
      },
      {
        id: "STS-M6",
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
        id: "STS-M1-A",
        label: "LIVE DB × GitHub main × applied migration ledger",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "backend_data",
        evidence: "Baseline M1 reconciliado; provenance residual preservado.",
        nextAction: "Histórico fechado; não reabrir sem invalidação material."
      },
      {
        id: "STS-M1-B",
        label: "Privileged-surface inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "backend_data",
        evidence: "Superfície privilegiada recomputada; M1-B-F01 classificado.",
        nextAction: "Baseline fechado; finding segue na fila de remediação."
      },
      {
        id: "STS-M1-C",
        label: "Tenant-isolation proof plan",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "Plano de prova concluído; M1-C-F01 seguiu para remediação e foi aplicado/provado.",
        nextAction: "Histórico fechado."
      },
      {
        id: "STS-M1-D",
        label: "Dependency / known-vulnerability inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "M1-D-F01 e M1-D-F02 identificados e classificados.",
        nextAction: "Baseline fechado; findings permanecem na fila futura."
      },
      {
        id: "STS-M1-E",
        label: "Secrets / infrastructure attack-surface inventory",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "application_security",
        evidence: "M1-E-F01 a F04 identificados sem exposição de valores secretos.",
        nextAction: "Baseline fechado; findings permanecem na fila futura."
      },
      {
        id: "STS-M1-F",
        label: "Evidence reconciliation / M1 verdict",
        category: "BASELINE",
        state: "COMPLETE",
        owner: "documentation_audit",
        evidence: "M1 concluído e Issue #150 fechada.",
        nextAction: "Não reabrir sem invalidação material."
      },
      {
        id: "STS-M1-C-F01",
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
        evidence: "PR #159 merged; migration f1_02_b2_revoke_direct_crm_writes aplicada exatamente uma vez; READ_ONLY catalog proof PASS.",
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
      },
      {
        id: "PR-08 / J4",
        label: "Repeatable Executable Security Matrix",
        category: "REMEDIATION",
        state: "COMPLETE",
        owner: "Backend/Data + AppSec",
        evidence: "PR #166 merged; static phases 1–4 closed; PR08-RR-64M-CANONICAL-HASH accepted with residual risk; runtime remained NOT_EXECUTED.",
        nextAction: "Deferred J4 evidence stays frozen; reopen only on the three-part environment/authority trigger."
      },
      {
        id: "PR-09 / STS-M1 CLOSE-OUT",
        label: "Final close-out & adjudicação",
        category: "PROGRAM",
        state: "COMPLETE",
        owner: "Product Authority + Documentation",
        evidence: "PR #168 merged at 4ede55df…; PR #169 reconciled handoff; PR #170 canonicalized the STS program hierarchy/WBS; STS-M1 remains closed with deferred security assurance.",
        nextAction: "STS-M2 está STARTED; M2-01..03 foram consumidos e M2-04 é o próximo gate."
      },
      {
        id: "STS-M2-01",
        label: "Database canonicality matrix",
        category: "PROGRAM",
        state: "COMPLETE",
        owner: "Backend/Data + Architecture",
        evidence: "COMPLETE / ACCEPTED; matriz canônica preservada em durable evidence.",
        nextAction: "Não reabrir sem invalidação material."
      },
      {
        id: "STS-M2-02",
        label: "Database authority map",
        category: "PROGRAM",
        state: "COMPLETE",
        owner: "Backend/Data + Architecture",
        evidence: "COMPLETE / ACCEPTED WITH RESIDUALS; authority map suficientemente compreendido.",
        nextAction: "Residuals alimentam target policy; não reabrir globalmente."
      },
      {
        id: "STS-M2-03",
        label: "Indexes / ACL contradictions",
        category: "PROGRAM",
        state: "COMPLETE",
        owner: "Backend/Data + Architecture",
        evidence: "COMPLETE / ACCEPTED WITH RESIDUALS; current live state suficientemente conhecido.",
        nextAction: "Consumir como input do M2-04; nenhuma remoção/alteração implícita."
      }
    ] satisfies ExecutionItem[],

    active: [
      {
        id: "STS-M2-04",
        label: "Target Database Authority Policy · SECURITY DEFINER / RLS / DML",
        category: "PROGRAM",
        state: "ACTIVE",
        owner: "Backend/Data + Architecture",
        evidence: "STS-M2-04 está IN PROGRESS. B1/B2/B3/C/D estão concluídos; M2-04C fechou com cinco bounded authority residuals e M2-04D fechou o trigger authority contract. M2-04E/M2-04F permanecem não autorizados.",
        nextAction: "Product Authority selecionar/autorizar STS-M2-04E architecture synthesis; nenhum candidato é iniciado automaticamente."
      }
    ] satisfies ExecutionItem[],

    future: [
      {
        id: "STS-M1-B-F01",
        label: "Anon privileged RPC execution surface",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "Backend/Data + AppSec",
        evidence: "Finding confirmado no fechamento M1; ordem de remediação ainda não redefine o roadmap.",
        nextAction: "Remediação futura em ciclo próprio, com autoridade e evidência próprias."
      },
      {
        id: "STS-M1-D-F01",
        label: "Dependency reproducibility gap",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "Finding confirmado no baseline M1.",
        nextAction: "Corrigir em ciclo próprio sem apagar o histórico do baseline."
      },
      {
        id: "STS-M1-D-F02",
        label: "Vite 6.4.2 known affected version",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "GHSA-fx2h-pf6j-xcff registrado; exploitabilidade em produção não estabelecida.",
        nextAction: "Upgrade e validação em ciclo próprio."
      },
      {
        id: "STS-M1-E-F01",
        label: "Live Edge function not versioned",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "Platform + AppSec",
        evidence: "assistente-ai v10 live; source ausente do main no fechamento M1.",
        nextAction: "Restaurar rastreabilidade/versionamento em ciclo próprio."
      },
      {
        id: "STS-M1-E-F02",
        label: "Browser session refresh-token exposure surface",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec",
        evidence: "Finding material confirmado; localStorage por si só não equivale a exploit.",
        nextAction: "Reduzir superfície em ciclo próprio."
      },
      {
        id: "STS-M1-E-F03",
        label: "External worker proxy authority gap",
        category: "REMEDIATION",
        state: "PLANNED",
        owner: "AppSec + Platform",
        evidence: "Finding material estático; abuso/runtime crossover não provado.",
        nextAction: "Fechar authority gap com prova própria."
      },
      {
        id: "STS-M1-E-F04",
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
      { date: "3 Sep 2026", text: "PR #166 avançou ao head 0f3f266c...; review independente abriu 9 findings; runners continuam NOT_EXECUTED", kind: "EVIDENCE" },
      { date: "3 Sep 2026", text: "PR #166 mergeada; PR-08 static phases 1–4 fechadas; runtime permanece NOT_EXECUTED", kind: "REMEDIATION" },
      { date: "4 Sep 2026", text: "PR #168 mergeada: M1 COMPLETE WITH DEFERRED SECURITY ASSURANCE; F1-02 fechado para o roadmap M1", kind: "PROGRAM" },
      { date: "4 Sep 2026", text: "PR #169 mergeada: handoff pós-STS-M1 reconciliado; STS-M2 torna-se NEXT ELIGIBLE / NOT STARTED", kind: "PROGRAM" },
      { date: "4 Sep 2026", text: "PR #170 mergeada no FECH.AI main 252fb981…: hierarquia STS e WBS granular de 832h tornam-se baseline canônica", kind: "PROGRAM" },
      { date: "4 Sep 2026", text: "STS-M2 iniciado; STS-M2-01 aceito e durable canonicality matrix preservada", kind: "PROGRAM" },
      { date: "5 Sep 2026", text: "STS-M2-02 COMPLETE / ACCEPTED WITH RESIDUALS; authority map preservado", kind: "PROGRAM" },
      { date: "5 Sep 2026", text: "STS-M2-03 COMPLETE / ACCEPTED WITH RESIDUALS; STS-M2-04 torna-se NEXT GATE / NOT STARTED", kind: "PROGRAM" },
      { date: "5 Sep 2026", text: "PR #179 alinha handoffs FECH.AI à identidade canônica SES; transporte permanece manual copy/paste", kind: "EVIDENCE" }
    ] satisfies TimelineItem[]

  } satisfies ProgramSnapshot,

  fechaiWbs: {
    source: "WBS structure: docs/roadmap/fechai-security-to-scale-2026-wbs.md · current task state: FECH.AI docs/sfjm/CURRENT_STATE.md + NEXT_SAFE_ACTION.md @ aa266df3…",
    basis: "Planning estimates for visibility, not clocked timesheets.",
    totalCriticalHours: 832,
    completedHours: 264,
    remainingCriticalHours: 568,
    preSecurityGoBacklogHours: 116,
    plannedBacklogHours: 104,
    currentPackage: "STS-M2 — STARTED",
    currentTask: "STS-M2-04 · Política target de DEFINER / RLS / DML · IN PROGRESS · 20h",
    note: "Rótulos/horas vêm da WBS estrutural; estado corrente vem do SFJM do FECH.AI. STS-M2-04 está em progresso; B1/B2/B3/C/D estão concluídos; E é o próximo candidato e continua não autorizado. Horas são planejamento, não timesheet.",
    milestones: [
      {
        id: "STS-M0",
        label: "Program Control / Truth Reconciliation",
        hours: 36,
        state: "COMPLETE",
        tasks: [
          { id: "STS-M0-01", label: "Inventário de PRs e continuidade", hours: 8, state: "COMPLETE" },
          { id: "STS-M0-02", label: "Pacotes de especialistas e dependências", hours: 8, state: "COMPLETE" },
          { id: "STS-M0-03", label: "SFJM / Workspace baseline", hours: 10, state: "COMPLETE" },
          { id: "STS-M0-04", label: "Roadmap / governança única", hours: 10, state: "COMPLETE" }
        ]
      },
      {
        id: "STS-M1",
        label: "Security Truth Baseline / F1-02",
        hours: 168,
        state: "COMPLETE",
        tasks: [
          { id: "B1", label: "Baseline de evidências", hours: 18, state: "COMPLETE" },
          { id: "B2", label: "Direct CRM writes", hours: 28, state: "COMPLETE" },
          { id: "B3", label: "Funnel history boundary", hours: 24, state: "COMPLETE" },
          { id: "B4", label: "List ACL tenant integrity", hours: 34, state: "COMPLETE" },
          { id: "PR-07", label: "Tenant-safe reads + payload validation", hours: 36, state: "COMPLETE", note: "PR #163 merged; migration applied; J3 closed with bounded residual evidence." },
          { id: "PR-08", label: "Proof matrix / negative tests", hours: 22, state: "COMPLETE", note: "PR #166 merged; static phases 1–4 closed; runtime remained NOT_EXECUTED and deferred evidence was not promoted to PASS." },
          { id: "PR-09", label: "Close-out & adjudicação final", hours: 6, state: "COMPLETE", note: "PR #168 merged; STS-M1 closed with deferred security assurance; PR #169 reconciled the handoff; PR #170 canonicalized the STS execution WBS." }
        ]
      },
      {
        id: "STS-M2",
        label: "Database Simplification & Optimization Plan",
        hours: 116,
        state: "ACTIVE",
        tasks: [
          { id: "STS-M2-01", label: "Matriz de 43 tabelas", hours: 20, state: "COMPLETE" },
          { id: "STS-M2-02", label: "Mapa routines / policies / triggers / grants", hours: 24, state: "COMPLETE", note: "Accepted with residuals." },
          { id: "STS-M2-03", label: "Índices / ACL contraditórias", hours: 16, state: "COMPLETE", note: "Accepted with residuals." },
          { id: "STS-M2-04", label: "Política target de DEFINER / RLS / DML", hours: 20, state: "ACTIVE", note: "IN PROGRESS · B1/B2/B3/C/D complete · M2-04E next candidate / NOT_AUTHORIZED." },
          { id: "STS-M2-05", label: "Database Contract Map", hours: 20, state: "PLANNED", note: "Successor; consumes M2-04 target policy." },
          { id: "STS-M2-06", label: "Decisão arquitetural do banco", hours: 16, state: "PLANNED", note: "Successor; consumes M2-04/M2-05 evidence." }
        ]
      },
      {
        id: "STS-M3",
        label: "Backend Authority Contract Freeze",
        hours: 152,
        state: "PLANNED",
        tasks: [
          { id: "STS-M3-01", label: "Identity / membership / team / role model", hours: 24, state: "PLANNED" },
          { id: "STS-M3-02", label: "Authority contract por contexto", hours: 28, state: "PLANNED" },
          { id: "STS-M3-03", label: "Allowlist de RPCs privilegiadas", hours: 24, state: "PLANNED" },
          { id: "STS-M3-04", label: "Redução de DML sensível direto", hours: 24, state: "PLANNED" },
          { id: "STS-M3-05", label: "Fechamento Auth / Admin flows", hours: 24, state: "PLANNED" },
          { id: "STS-M3-06", label: "Staging / test plan de segurança", hours: 28, state: "PLANNED" }
        ]
      },
      {
        id: "STS-M4",
        label: "Frontend Modularization / App.jsx Extraction",
        hours: 172,
        state: "PLANNED",
        tasks: [
          { id: "STS-M4-01", label: "AppShell / Shared Frontend Boundary", hours: 20, state: "PLANNED" },
          { id: "STS-M4-02", label: "CRM + Funil Core Slice", hours: 40, state: "PLANNED" },
          { id: "STS-M4-03", label: "LeadOps Execution Slice — Leads / Listas / Distribuição / Discador / Power Message Engine", hours: 32, state: "PLANNED" },
          { id: "STS-M4-04", label: "MesaCliente Core Slice", hours: 32, state: "PLANNED" },
          { id: "STS-M4-05", label: "Feature Gateways / API Boundaries", hours: 24, state: "PLANNED" },
          { id: "STS-M4-06", label: "Core Functional Equivalence & Regression", hours: 24, state: "PLANNED" }
        ]
      },
      {
        id: "STS-M5",
        label: "Integrated Security / Reliability Validation",
        hours: 128,
        state: "PLANNED",
        tasks: [
          { id: "STS-M5-01", label: "Hostile-client suite isolada", hours: 28, state: "PLANNED" },
          { id: "STS-M5-02", label: "Regressão tenant / role / auth / storage", hours: 28, state: "PLANNED" },
          { id: "STS-M5-03", label: "Dependency / CVE gate", hours: 12, state: "PLANNED" },
          { id: "STS-M5-04", label: "Secrets / config / deploy gate", hours: 16, state: "PLANNED" },
          { id: "STS-M5-05", label: "Observabilidade / rollback / incidente", hours: 24, state: "PLANNED" },
          { id: "STS-M5-06", label: "Adjudicação de residual risk", hours: 20, state: "PLANNED" }
        ]
      },
      {
        id: "STS-M6",
        label: "Security Go Candidate / Commercial Readiness",
        hours: 60,
        state: "PLANNED",
        tasks: [
          { id: "STS-M6-01", label: "Security Evidence + Final AS-BUILT Package", hours: 14, state: "PLANNED" },
          { id: "STS-M6-02", label: "Blocker closeout", hours: 8, state: "PLANNED" },
          { id: "STS-M6-03", label: "Onboarding / support / operational runbooks", hours: 18, state: "PLANNED" },
          { id: "STS-M6-04", label: "Decisão comercial controlada", hours: 8, state: "PLANNED" },
          { id: "STS-M6-05", label: "Launch readiness + AS-BUILT acceptance review", hours: 12, state: "PLANNED" }
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
    { icon: "🧠", label: "Objetivo Preservado", value: "Issue #141" },
    { icon: "☑", label: "Histórico Preservado", value: "Append-only" },
    { icon: "🗺", label: "Plano Futuro", value: "STS-M2–STS-M6" },
    { icon: "📁", label: "Evidências Canônicas", value: "GitHub" },
    { icon: "🔒", label: "Governança Mantida", value: "Ativa" },
    { icon: "◉", label: "Fonte Verificada", value: "main" }
  ] satisfies ContextCard[],

  currentState: [
    { label: "Último milestone concluído", value: "STS-M1 · deferred assurance" },
    { label: "Milestone atual", value: "STS-M2 · STARTED" },
    { label: "Próxima continuidade", value: "STS-M2-04E · selecionar/autorizar architecture synthesis" },
    { label: "Objetivo", value: "Issue #141 · PRESERVED" }
  ] satisfies SourceRow[],

  sources: [
    { label: "FECH.AI main", value: "aa266df3…", badge: true },
    { label: "Program objective", value: "#141 OPEN · PRESERVED", badge: true },
    { label: "Current state source", value: "docs/sfjm/CURRENT_STATE.md", badge: true },
    { label: "WBS structure", value: "832h · structural baseline", badge: true },
    { label: "SES main / routing", value: "61cee7b3… · manual", badge: true },
    { label: "Snapshot", value: "Manual · 5 Sep", badge: true }
  ] satisfies SourceRow[]
};
