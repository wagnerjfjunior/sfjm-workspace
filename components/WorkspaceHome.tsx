"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExternalProject,
  type WbsMilestone,
  type WbsTask
} from "@/data/workspace-demo";
import { morenumtegraCanonical } from "@/data/morenumtegra-canonical";

const FECHAI = "FECH.AI";
const MORENUMTEGRA = "MoreNumTegra";

const FECHAI_PROGRAM_PROGRESS = calculateAcceptedProgramProgress(workspaceDemo.fechaiProgram.milestones);

type ProjectTaskDecomposition = NonNullable<ExternalProject["taskDecompositions"]>[number];

type DashboardWbs = {
  id?: string;
  name?: string;
  currentPackage: string;
  currentTask: string;
  currentTaskId?: string;
  totalCriticalHours: number;
  historicalCriticalHours: number;
  forecastCompletedHours: number;
  forecastRemainingHours: number;
  forecastPercent: number;
  milestones: WbsMilestone[];
};

type DashboardProject = ExternalProject & {
  wbs?: DashboardWbs;
  objective?: {
    id: string;
    text: string;
    source: string;
  };
  continuityHeadline?: string;
  continuityDetail?: string;
  progressBasisLabel?: string;
  blockProgressDetail?: string;
  wbsForecastIsCanonical?: boolean;
  wbsFootnote?: string;
  evidenceHandoff?: string;
};

const dashboardProjects: DashboardProject[] = workspaceDemo.externalProjects.map((project) => {
  if (project.name === FECHAI) {
    const wbs = workspaceDemo.fechaiWbs as DashboardWbs;
    return {
      ...project,
      wbs,
      continuityHeadline: wbs.currentPackage,
      continuityDetail: wbs.currentTask,
      progressBasisLabel: `estimativa Workspace · baseline histórica ${wbs.historicalCriticalHours}h`,
      blockProgressDetail: `macro gates históricos ${FECHAI_PROGRAM_PROGRESS.toFixed(2)}%`,
      wbsForecastIsCanonical: false,
      wbsFootnote: `Regra de visualização: o WBS mostra sempre as tarefas de primeiro nível do bloco. Filhos canônicos só aparecem por expansão manual da tarefa-mãe. O Workspace não cria tarefas. Horas marcadas “est.” são forecast derivado por complexidade (S=8h, M=16h, L=24h, XL=32h); ${wbs.historicalCriticalHours}h permanece a baseline histórica do FECH.AI.`,
      evidenceHandoff: workspaceDemo.fechaiProgram.specialistRouting.length
        ? workspaceDemo.fechaiProgram.specialistTransport
        : "Não definido · aguarda autorização/bootstrap"
    };
  }

  if (project.name === MORENUMTEGRA) {
    const wbs = morenumtegraCanonical.wbs as unknown as DashboardWbs;
    return {
      ...morenumtegraCanonical.project,
      wbs,
      objective: morenumtegraCanonical.objective,
      continuityHeadline: morenumtegraCanonical.project.continuityState,
      continuityDetail: wbs.currentTask,
      progressBasisLabel: "planning forecast publicado pelo projeto · não timesheet",
      blockProgressDetail: "accepted scope-equivalent preservado em 160h",
      wbsForecastIsCanonical: true,
      wbsFootnote: "Regra de visualização: o WBS reproduz as tarefas publicadas pelo MoreNumTegra. As horas são planning forecast/scope-equivalent publicadas no repositório canônico, não horas reais trabalhadas. O Workspace não cria tarefas, não inventa horas e não soma pai + filhos em duplicidade.",
      evidenceHandoff: `${morenumtegraCanonical.source.readModel} → ${morenumtegraCanonical.source.taskGraph}`
    };
  }

  return project;
});

function normalizeWbsTaskIdentity(taskId: string) {
  return taskId.startsWith("STS-") ? taskId.slice(4) : taskId;
}

function findTaskDecomposition(project: ExternalProject, parentTaskId?: string) {
  if (!parentTaskId) return undefined;
  const normalizedParent = normalizeWbsTaskIdentity(parentTaskId);
  return project.taskDecompositions?.find(
    (decomposition) => normalizeWbsTaskIdentity(decomposition.parentTaskId) === normalizedParent
  );
}

function taskIsEligibleButUnauthorized(task: WbsTask) {
  const note = task.note ?? "";
  return note.includes("NEXT ELIGIBLE / NOT_AUTHORIZED") ||
    note.includes("NEXT_ELIGIBLE / NOT_AUTHORIZED") ||
    note.includes("ELIGIBLE_NOT_AUTHORIZED");
}

function milestoneIsEligibleButUnauthorized(milestone: WbsMilestone) {
  return milestone.operationalState === "ELIGIBLE_NOT_AUTHORIZED";
}

function findActiveMilestone(milestones: WbsMilestone[]) {
  return milestones.find((milestone) => milestone.state === "ACTIVE");
}

function findDisplayMilestone(milestones: WbsMilestone[]) {
  return findActiveMilestone(milestones) ??
    milestones.find(milestoneIsEligibleButUnauthorized) ??
    milestones.find((milestone) => milestone.state !== "COMPLETE") ??
    milestones[0];
}

function taskIsPlannedButUnauthorized(task: WbsTask) {
  return task.note?.includes("PLANNED_NOT_AUTHORIZED") ?? false;
}

function taskIsAuthorizedReadOnly(task: WbsTask) {
  return task.note?.includes("AUTHORIZED_READ_ONLY") ?? false;
}

function taskIsAuthorizedNotInitiated(task: WbsTask) {
  const note = task.note ?? "";
  return note.includes("AUTHORIZED / NOT_INITIATED") ||
    note.includes("AUTHORIZED_NOT_INITIATED");
}

function taskIsAuthorizedDeferred(task: WbsTask) {
  const note = task.note ?? "";
  return note.includes("AUTHORIZED_DEFERRED");
}

function taskRequiresRebaseline(task: WbsTask) {
  return task.note?.includes("REBASELINE_REQUIRED") ?? false;
}

function taskHasWorkspaceEstimate(task: WbsTask) {
  return task.effortSource === "WORKSPACE_ESTIMATE" || task.effortSource === "DERIVED_FROM_CHILDREN";
}

function taskHasCanonicalPlanningForecast(task: WbsTask) {
  return task.note?.includes("PROJECT_PLANNING_FORECAST") ?? false;
}

function taskEffortLabel(task: WbsTask) {
  if (taskHasCanonicalPlanningForecast(task)) return `${task.hours}h forecast`;
  if (taskHasWorkspaceEstimate(task)) return `${task.hours}h est.`;
  if (taskRequiresRebaseline(task)) return "REBASELINE";
  return `${task.hours}h`;
}

function taskHasFinalClosurePending(task: WbsTask) {
  return task.note?.includes("FINAL_CLOSURE_PENDING") ?? false;
}

function taskIsFinalClosed(task: WbsTask) {
  return task.state === "COMPLETE" && !taskHasFinalClosurePending(task);
}

function taskIsActiveButExecutionGated(task: WbsTask) {
  const note = task.note ?? "";
  return task.state === "ACTIVE" && (
    note.includes("CURRENT_AUTHORIZED_TECHNICAL_EXECUTION = NONE") ||
    note.includes("NEXT MATERIAL GATE REQUIRES PRODUCT AUTHORITY") ||
    note.includes("ACTIVE_REBASELINE_REQUIRED")
  );
}

function taskStateLabel(task: WbsTask, isFocus: boolean) {
  if (taskHasFinalClosurePending(task)) return "Baseline aceito · fechamento final pendente";
  if (task.state === "COMPLETE") return "Concluída";
  if (taskIsActiveButExecutionGated(task)) return "Ativa · aguardando próximo gate";
  if (task.state === "ACTIVE") return "Em execução";
  if (taskIsAuthorizedReadOnly(task)) return "Autorizada READ_ONLY · Pronta";
  if (taskIsAuthorizedDeferred(task)) return "Autorizada · Adiada / não é ação atual";
  if (taskIsAuthorizedNotInitiated(task)) return "Autorizada · Não iniciada";
  if (taskIsEligibleButUnauthorized(task)) return "Próxima elegível · Não autorizada";
  if (taskIsPlannedButUnauthorized(task)) return "Planejada · Não autorizada";
  if (isFocus) return "Próximo gate";
  if (task.state === "PARKED") return "Backlog";
  return "Planejada";
}

function taskStateIcon(task: WbsTask, isFocus: boolean) {
  if (taskHasFinalClosurePending(task)) return "◐";
  if (task.state === "COMPLETE") return "✓";
  if (taskIsActiveButExecutionGated(task)) return "Ⅱ";
  if (taskIsEligibleButUnauthorized(task) || taskIsPlannedButUnauthorized(task)) return "⊘";
  if (taskIsAuthorizedDeferred(task)) return "Ⅱ";
  if (taskIsAuthorizedReadOnly(task) || taskIsAuthorizedNotInitiated(task) || isFocus || task.state === "ACTIVE") return "▶";
  return "○";
}

function trapDrawerFocus(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== "Tab") return;

  const focusable = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
  ).filter((element) => element.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function Sidebar({
  open,
  selectedProject,
  onSelectProject,
  onClose
}: {
  open: boolean;
  selectedProject: string;
  onSelectProject: (name: string) => void;
  onClose: () => void;
}) {
  const selectedHasWbs = Boolean(dashboardProjects.find((project) => project.name === selectedProject)?.wbs);

  return (
    <>
      <aside
        className={`commandSidebar ${open ? "open" : ""}`}
        aria-label="Navegação de projetos"
        onKeyDown={open ? trapDrawerFocus : undefined}
      >
        <div className="brandRow">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandTitle">SFJM</div>
              <div className="brandSub">Workspace</div>
            </div>
          </div>
          {open ? (
            <button className="drawerClose" type="button" onClick={onClose} autoFocus aria-label="Fechar menu de projetos">
              ×
            </button>
          ) : null}
        </div>

        <div className="sidebarSectionLabel">Continue</div>
        <nav className="projectNav" aria-label="Projetos disponíveis">
          {dashboardProjects.map((project) => {
            const active = project.name === selectedProject;
            return (
              <div className={`projectNavGroup ${active ? "active" : ""}`} key={project.name}>
                <button
                  className="projectNavButton"
                  type="button"
                  onClick={() => {
                    onSelectProject(project.name);
                    onClose();
                  }}
                  aria-pressed={active}
                >
                  <span className="projectDot" aria-hidden="true" />
                  <span>
                    <strong>{project.name}</strong>
                    <small>{active ? "Projeto selecionado" : "Abrir dashboard"}</small>
                  </span>
                  <span className="projectChevron" aria-hidden="true">›</span>
                </button>

                {active ? (
                  <div className="projectSubnav">
                    <a href="#overview">Estado & continuidade</a>
                    <a href="#next-action">Próxima ação</a>
                    {selectedHasWbs ? <a href="#wbs">WBS</a> : <span>WBS · indisponível</span>}
                    <a href="#risks">Problemas</a>
                    <a href="#evidence">Evidências</a>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="sidebarSpacer" />
        <div className="sidebarFoot">
          <span className="liveDot" aria-hidden="true" />
          <div>
            <strong>Snapshot manual</strong>
            <small>Uma URL · múltiplos projetos</small>
          </div>
        </div>
      </aside>
      {open ? <button className="sidebarBackdrop" type="button" tabIndex={-1} aria-label="Fechar menu" onClick={onClose} /> : null}
    </>
  );
}

function ProjectHeader({
  project,
  onMenu,
  menuButtonRef
}: {
  project: DashboardProject;
  onMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const wbs = project.wbs;
  const criticalHours = wbs?.totalCriticalHours ?? 0;
  const completedHours = wbs?.forecastCompletedHours ?? 0;
  const wbsPercent = wbs?.forecastPercent ?? 0;
  const activeMilestone = wbs ? findActiveMilestone(wbs.milestones) : undefined;
  const activeMilestoneCompleted = activeMilestone?.completedHours ?? 0;
  const activeMilestonePercent = activeMilestone?.hours ? (activeMilestoneCompleted / activeMilestone.hours) * 100 : 0;
  const progressSuffix = project.wbsForecastIsCanonical ? " FORECAST" : " EST.";

  return (
    <section className="projectHero" id="overview">
      <div className="projectHeroTop">
        <div className="projectIdentity">
          <button ref={menuButtonRef} className="mobileMenu" type="button" onClick={onMenu} aria-label="Abrir menu de projetos">☰</button>
          <div>
            <div className="eyebrow projectNameLabel">{project.name}</div>
            <h1>De onde você precisa continuar hoje?</h1>
          </div>
        </div>
        <div className="sourceStamp">
          <span className="liveDot" aria-hidden="true" />
          <div>
            <strong>Fonte observada</strong>
            <small>{project.observedAt}</small>
          </div>
        </div>
      </div>

      <div className="heroMetrics">
        <div className="heroMetric continuityMetric">
          <span>Estado & continuidade</span>
          <strong>{project.continuityHeadline ?? project.continuityState}</strong>
          <small>{project.continuityDetail ?? "Snapshot manual do projeto"}</small>
        </div>
        <div className="heroMetric progressMetric">
          <span>Conclusão total</span>
          <strong>{wbs ? `${wbsPercent.toFixed(1)}%${progressSuffix}` : "—"}</strong>
          {wbs ? (
            <div className="totalProgressTrack" aria-label={`${wbsPercent.toFixed(1)}% do forecast representado concluído`}>
              <span style={{ width: `${wbsPercent}%` }} />
            </div>
          ) : null}
          <small>{wbs
            ? `${completedHours}h de ${criticalHours}h forecast · ${project.progressBasisLabel ?? "base publicada pelo projeto"}`
            : "Sem WBS canônica suficiente no snapshot"}</small>
        </div>
        <div className="heroMetric">
          <span>Bloco atual</span>
          <strong>{wbs ? wbs.currentPackage : "Não modelado"}</strong>
          <small>{wbs
            ? `${activeMilestonePercent.toFixed(1)}% do ${activeMilestone?.id ?? "bloco"} por esforço representado${project.blockProgressDetail ? ` · ${project.blockProgressDetail}` : ""}`
            : "Sem inferência automática"}</small>
        </div>
        <div className="heroMetric sourceMetric">
          <span>Canônico externo</span>
          <strong>{project.repository}</strong>
          <code>{project.observedSha.slice(0, 12)}…</code>
        </div>
      </div>
    </section>
  );
}

function decompositionIcon(state: ProjectTaskDecomposition["items"][number]["state"]) {
  if (state === "COMPLETE") return "✓";
  if (state === "ACTIVE" || state === "NEXT") return "▶";
  if (state === "BLOCKED") return "!";
  if (state === "NOT_AUTHORIZED") return "⊘";
  return "○";
}

function decompositionStateLabel(state: ProjectTaskDecomposition["items"][number]["state"]) {
  if (state === "COMPLETE") return "Concluído";
  if (state === "ACTIVE") return "Em execução";
  if (state === "NEXT") return "Próxima";
  if (state === "BLOCKED") return "Bloqueado";
  if (state === "NOT_AUTHORIZED") return "Não autorizado";
  if (state === "PLANNED") return "Planejado";
  return "Estado indefinido";
}

function decompositionVisualStateLabel(item: ProjectTaskDecomposition["items"][number]) {
  if (item.status.includes("AUTHORIZED_DEFERRED")) {
    return "Autorizado · adiado";
  }
  if (item.state === "NOT_AUTHORIZED" && item.status.includes("NEXT CANDIDATE")) {
    return "Próxima · Não autorizado";
  }
  if (item.state === "UNKNOWN" && item.status.includes("NOT_CANONICALLY_DEFINED")) {
    return "Semântica indefinida · Não autorizado";
  }
  return decompositionStateLabel(item.state);
}

function decompositionRegionId(instanceId: string, parentTaskId: string, itemId: string) {
  return `decomposition-${instanceId}-${parentTaskId}-${itemId}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function TaskDecompositionPanel({
  decomposition,
  instanceId
}: {
  decomposition: ProjectTaskDecomposition;
  instanceId: string;
}) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const presentationGroups = decomposition.presentationGroups ?? [];
  const groupedMemberIds = new Set(presentationGroups.flatMap((group) => group.memberIds));
  const ungroupedItems = decomposition.items.filter((item) => !groupedMemberIds.has(item.id));

  useEffect(() => {
    setExpandedItemId(null);
  }, [decomposition.parentTaskId]);

  type DecompositionItem = ProjectTaskDecomposition["items"][number];

  const renderCanonicalChildNode = (child: DecompositionItem) => {
    const descendants = child.children ?? [];

    return (
      <li className={`decompositionChildNode ${child.state.toLowerCase()}`} key={child.id}>
        <div className={`decompositionChildRow ${child.state.toLowerCase()}`}>
          <span className="decompositionChildGuide" aria-hidden="true">└</span>
          <span className="decompositionChildIcon" aria-hidden="true">{decompositionIcon(child.state)}</span>
          <span className="decompositionChildIdentity">
            <span className="decompositionChildTitle">
              <strong>{child.id}</strong>
              <span>{child.label}</span>
            </span>
            <small className="decompositionChildCanonicalStatus">
              {child.status}{child.hours ? ` · ${child.hours}h ${child.effortSource === "WORKSPACE_ESTIMATE" ? "EST." : ""}${child.complexity ? ` · ${child.complexity}` : ""}` : ""}
            </small>
          </span>
          <span className="decompositionChildState">{decompositionVisualStateLabel(child)}</span>
        </div>

        {descendants.length ? (
          <ol className="decompositionNestedChildren" role="list" aria-label={`Subetapas de ${child.id}`}>
            {descendants.map((descendant) => renderCanonicalChildNode(descendant))}
          </ol>
        ) : null}
      </li>
    );
  };

  const renderCanonicalChildren = (
    parentId: string,
    children: ProjectTaskDecomposition["items"],
    regionId: string,
    hidden: boolean
  ) => {
    return (
      <div
        className="decompositionChildrenRegion"
        id={regionId}
        aria-label={`Subetapas de ${parentId}`}
        hidden={hidden}
      >
        <ol className="decompositionChildrenList" role="list">
          {children.map((child) => renderCanonicalChildNode(child))}
        </ol>
      </div>
    );
  };

  return (
    <aside className="taskDecompositionPanel" aria-label={`Decomposição da tarefa ${decomposition.parentTaskId}`}>
      <div className="taskDecompositionHeader">
        <div>
          <div className="eyebrow">Decomposição da tarefa</div>
          <strong>{decomposition.parentTaskId}</strong>
          <span>{decomposition.parentLabel}</span>
        </div>
        <span className="decompositionCount">{decomposition.items.length} etapas</span>
      </div>

      <ol className="decompositionList" role="list">
        {presentationGroups.map((group) => {
          const members = group.memberIds
            .map((memberId) => decomposition.items.find((item) => item.id === memberId))
            .filter((item): item is ProjectTaskDecomposition["items"][number] => Boolean(item));
          const completeMembers = members.filter((item) => item.state === "COMPLETE").length;
          const allComplete = members.length > 0 && completeMembers === members.length;
          const expansionId = `presentation:${group.id}`;
          const expanded = expandedItemId === expansionId;
          const childRegionId = decompositionRegionId(instanceId, decomposition.parentTaskId, `presentation-${group.id}`);

          return (
            <li
              className={`decompositionItem presentationGroup branch ${allComplete ? "complete" : ""} ${expanded ? "expanded" : ""}`}
              key={expansionId}
            >
              <button
                type="button"
                className="decompositionDisclosure"
                aria-expanded={expanded}
                aria-controls={childRegionId}
                aria-label={`${group.id}, agrupamento visual ${group.label}, ${completeMembers} de ${members.length} etapas canônicas concluídas`}
                onClick={() => setExpandedItemId((current) => current === expansionId ? null : expansionId)}
              >
                <span className="decompositionChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
                <span className="decompositionStateIcon" aria-hidden="true">{allComplete ? "✓" : "○"}</span>
                <span className="decompositionItemMain">
                  <span className="decompositionTitleLine">
                    <strong>{group.id}</strong>
                    <span>{group.label}</span>
                  </span>
                  <span className="decompositionBranchMeta">
                    <span className="decompositionChildCount" aria-hidden="true">
                      {allComplete ? "✓ " : ""}{completeMembers}/{members.length}
                    </span>
                    <span className="decompositionStatusPill presentation">
                      {completeMembers}/{members.length} concluídas
                    </span>
                  </span>
                  <small className="decompositionCanonicalStatus presentationOnly">
                    Agrupamento visual · membros canônicos preservados
                  </small>
                </span>
              </button>

              {renderCanonicalChildren(group.id, members, childRegionId, !expanded)}
            </li>
          );
        })}

        {ungroupedItems.map((item) => {
          const children = item.children ?? [];
          const hasChildren = children.length > 0;
          const completedChildren = children.filter((child) => child.state === "COMPLETE").length;
          const expanded = hasChildren && expandedItemId === item.id;
          const childRegionId = decompositionRegionId(instanceId, decomposition.parentTaskId, item.id);

          return (
            <li
              className={`decompositionItem ${item.state.toLowerCase()} ${hasChildren ? "branch" : "leaf"} ${expanded ? "expanded" : ""}`}
              key={item.id}
            >
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="decompositionDisclosure"
                    aria-expanded={expanded}
                    aria-controls={childRegionId}
                    aria-label={`${item.id}, ${item.label}, ${decompositionVisualStateLabel(item)}, status canônico: ${item.status}, ${completedChildren} de ${children.length} subetapas concluídas`}
                    onClick={() => setExpandedItemId((current) => current === item.id ? null : item.id)}
                  >
                    <span className="decompositionChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
                    <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
                    <span className="decompositionItemMain">
                      <span className="decompositionTitleLine">
                        <strong>{item.id}</strong>
                        <span>{item.label}</span>
                      </span>
                      <span className="decompositionBranchMeta">
                        <span className="decompositionChildCount" aria-hidden="true">
                          {completedChildren === children.length ? "✓ " : ""}{completedChildren}/{children.length}
                        </span>
                        <span className={`decompositionStatusPill ${item.state.toLowerCase()}`}>
                          {decompositionVisualStateLabel(item)}
                        </span>
                      </span>
                      <small className="decompositionCanonicalStatus">
                        {item.status}{item.hours ? ` · ${item.hours}h ${item.effortSource === "WORKSPACE_ESTIMATE" ? "EST." : ""}${item.complexity ? ` · ${item.complexity}` : ""}` : ""}
                      </small>
                    </span>
                  </button>

                  {renderCanonicalChildren(item.id, children, childRegionId, !expanded)}
                </>
              ) : (
                <div
                  className="decompositionLeafRow"
                  title={item.note ?? item.status}
                  aria-label={`${item.id}, ${item.label}, ${decompositionVisualStateLabel(item)}, status canônico: ${item.status}`}
                >
                  <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
                  <span className="decompositionItemMain">
                    <span className="decompositionTitleLine">
                      <strong>{item.id}</strong>
                      <span>{item.label}</span>
                    </span>
                    <span className={`decompositionStatusPill ${item.state.toLowerCase()}`}>
                      {decompositionVisualStateLabel(item)}
                    </span>
                    <small className="decompositionCanonicalStatus">
                      {item.status}{item.hours ? ` · ${item.hours}h ${item.effortSource === "WORKSPACE_ESTIMATE" ? "EST." : ""}${item.complexity ? ` · ${item.complexity}` : ""}` : ""}
                    </small>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="decompositionSource">
        <span>Fonte publicada pelo projeto</span>
        <small>{decomposition.source}</small>
      </div>
    </aside>
  );
}

function NextActionCard({ project }: { project: DashboardProject }) {
  const isFechai = project.name === FECHAI;
  const program = workspaceDemo.fechaiProgram;
  const operationalMilestone = isFechai
    ? findDisplayMilestone(workspaceDemo.fechaiWbs.milestones)
    : project.wbs
      ? findDisplayMilestone(project.wbs.milestones)
      : undefined;
  const operationalTasks: WbsTask[] = operationalMilestone?.tasks ?? [];
  const focusTask = isFechai
    ? operationalTasks.find(taskIsEligibleButUnauthorized) ??
      operationalTasks.find((task) => task.note?.includes("NEXT GATE")) ??
      operationalTasks.find((task) => task.state !== "COMPLETE")
    : project.wbs?.currentTaskId
      ? operationalTasks.find((task) => task.id === project.wbs?.currentTaskId)
      : operationalTasks.find((task) => task.state !== "COMPLETE");
  const requiredRoutes = program.specialistRouting.filter((route) => route.requirement === "REQUIRED");
  const conditionalRoute = program.specialistRouting.find((route) => route.requirement === "CONDITIONAL");
  const focusEligibleUnauthorized = isFechai && focusTask ? taskIsEligibleButUnauthorized(focusTask) : false;
  const focusAuthorizedNotInitiated = isFechai && focusTask ? taskIsAuthorizedNotInitiated(focusTask) : false;
  const focusActiveGated = isFechai && focusTask ? taskIsActiveButExecutionGated(focusTask) : false;

  return (
    <article className="commandCard nextActionCard" id="next-action">
      <div className="nextActionLayout">
        <div className="nextActionPrimary">
          <div className="cardHeading">
            <div>
              <div className="eyebrow">Próxima ação segura</div>
              <h2>{isFechai && focusTask
                ? focusActiveGated
                  ? "Continuar o próximo trabalho normal do WBS"
                  : focusTask.label
                : project.nextSafeAction}</h2>
            </div>
            <span className={`statusPill ${focusEligibleUnauthorized || focusActiveGated ? "restricted" : "next"}`}>
              {focusActiveGated
                ? "AGUARDANDO SELEÇÃO / AUTORIZAÇÃO"
                : focusEligibleUnauthorized
                  ? "PRÓXIMA ELEGÍVEL · NÃO AUTORIZADA"
                  : focusAuthorizedNotInitiated
                    ? "AUTORIZADA · NÃO INICIADA"
                    : focusTask?.state === "ACTIVE"
                      ? "ATUAL"
                      : "PRÓXIMA"}
            </span>
          </div>

          {isFechai && focusTask && operationalMilestone ? (
            <>
              <p className="safeSequence" title={program.nextSafeAction}>{project.nextSafeAction}</p>
              <div className="actionFacts">
                <div><span>Bloco</span><strong>{operationalMilestone.id}</strong></div>
                <div><span>Tarefa</span><strong>{focusTask.id} · {taskEffortLabel(focusTask)}</strong></div>
                <div><span>Situação</span><strong>{taskStateLabel(focusTask, true)}</strong></div>
                {requiredRoutes.length ? (
                  <div>
                    <span>Roteamento previsto</span>
                    <strong>{requiredRoutes.map((route) => route.targetName.replace("SES — ", "")).join(" → ")}</strong>
                  </div>
                ) : null}
              </div>
              {program.specialistRouting.length ? (
                <div className="actionFooter actionFooterStack">
                  <div>
                    <span className="manualChip">CÓPIA MANUAL</span>
                    <span>{program.specialistTransport}</span>
                  </div>
                  {conditionalRoute ? (
                    <div className="conditionalRoute">
                      <strong>Escalonamento condicional:</strong> {conditionalRoute.targetName} · {conditionalRoute.purpose}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="actionFooter">
                  <span>Roteamento de especialista ainda não definido · aguarda autorização/bootstrap</span>
                </div>
              )}
            </>
          ) : focusTask && operationalMilestone ? (
            <>
              <div className="actionFacts">
                <div><span>Bloco</span><strong>{operationalMilestone.id}</strong></div>
                <div><span>Tarefa atual</span><strong>{focusTask.id}</strong></div>
                <div><span>Esforço</span><strong>{taskEffortLabel(focusTask)}</strong></div>
                <div><span>Situação</span><strong>{taskStateLabel(focusTask, true)}</strong></div>
              </div>
              <div className="actionFooter">
                <span>{project.verification}</span>
              </div>
            </>
          ) : (
            <div className="actionFooter">
              <span>{project.verification}</span>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}

function RisksCard({ project }: { project: DashboardProject }) {
  const issues = project.issues ?? [];
  const currentRestrictions = project.currentRestrictions ?? [];

  if (!issues.length) {
    const blockers = project.blockers ?? [];
    return (
      <article className="commandCard risksCard" id="risks">
        <div className="cardHeading compact">
          <div>
            <div className="eyebrow">Problemas / restrições</div>
            <h2>{blockers.length} itens publicados no snapshot</h2>
          </div>
          <span className="countBadge">{blockers.length}</span>
        </div>
        <ul className="riskList">
          {blockers.map((blocker, index) => (
            <li key={blocker}>
              <span className="riskIndex">{String(index + 1).padStart(2, "0")}</span>
              <span>{blocker}</span>
            </li>
          ))}
        </ul>
      </article>
    );
  }

  const currentBlockers = issues.filter(
    (issue) => issue.class === "BLOCKING" || issue.class === "REQUIRED_CURRENT"
  );
  const issueValidationAnchors = Array.from(
    new Set([...issues, ...currentRestrictions].map((issue) => issue.sourceRef).filter(Boolean))
  );
  const issueSources = Array.from(
    new Set([...issues, ...currentRestrictions].map((issue) => issue.source).filter(Boolean))
  );

  const groups = [
    {
      key: "current",
      label: "Restrições materiais atuais · main",
      items: currentRestrictions
    },
    {
      key: "blockers",
      label: "Bloqueios tipados · CURRENT_ISSUES 08/09",
      items: currentBlockers
    },
    {
      key: "residuals",
      label: "Riscos / residuais",
      items: issues.filter((issue) => issue.class === "RESIDUAL")
    },
    {
      key: "deferred",
      label: "Evidências deferred",
      items: issues.filter((issue) => issue.class === "DEFERRED_EVIDENCE")
    },
    {
      key: "gates",
      label: "Gates programa / segurança",
      items: issues.filter(
        (issue) => issue.class === "FUTURE_GATE" || issue.class === "SECURITY_GATE"
      )
    }
  ];

  return (
    <article className="commandCard risksCard typedRisksCard" id="risks">
      <div className="cardHeading compact">
        <div>
          <div className="eyebrow">Problemas / restrições</div>
          <h2>{currentBlockers.length} bloqueios tipados · {currentRestrictions.length} restrições materiais atuais</h2>
          <small className="riskFreshness">
            CURRENT_ISSUES continua em 08/09; restrições atuais foram reconciliadas com {project.observedAt}
          </small>
        </div>
        <span className="countBadge">{currentRestrictions.length}</span>
      </div>

      <div className="issueSummaryGrid">
        {groups.map((group) => (
          <section className={`issueGroup ${group.key}`} key={group.key}>
            <div className="issueGroupHeader">
              <strong>{group.label}</strong>
              <span>{group.items.length}</span>
            </div>
            {group.items.length ? (
              <ul className="issueList">
                {group.items.map((issue) => (
                  <li key={issue.id}>
                    <div className="issueLine">
                      <strong>{issue.label}</strong>
                      <span>{issue.state}</span>
                    </div>
                    <small>{issue.scope} · {issue.id} · {issue.source} · validado {issue.lastValidatedAt}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="issueEmpty">Nenhum item nesta classe.</p>
            )}
          </section>
        ))}
      </div>

      <div className="riskSource">
        <span>Proveniência das restrições</span>
        <strong>{issueSources.join(" · ")}</strong>
        <code>{issueValidationAnchors.length === 1 ? issueValidationAnchors[0] : issueValidationAnchors.join(" · ")}</code>
      </div>
    </article>
  );
}

function IntegrityStrip() {
  return (
    <section className="integrityStrip" aria-label="Integridade de continuidade">
      {workspaceDemo.contexts.map((item) => (
        <div className="integrityItem" key={item.label}>
          <span className="integrityIcon" aria-hidden="true">{item.icon}</span>
          <span>
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        </div>
      ))}
    </section>
  );
}

function ProjectObjectiveCard({ project }: { project: DashboardProject }) {
  if (!project.objective) return null;

  return (
    <article className="commandCard" aria-label={`Objetivo preservado de ${project.name}`}>
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Objetivo preservado</div>
          <h2>{project.objective.text}</h2>
        </div>
        <span className="statusPill verified">CANÔNICO</span>
      </div>
      <div className="riskSource">
        <span>Fonte do objetivo</span>
        <strong>{project.objective.id}</strong>
        <code>{project.objective.source}</code>
      </div>
    </article>
  );
}

function WbsFocusTask({
  task,
  focusId,
  decomposition,
  expanded,
  onToggleDecomposition
}: {
  task: WbsTask;
  focusId?: string;
  decomposition?: ProjectTaskDecomposition;
  expanded: boolean;
  onToggleDecomposition: () => void;
}) {
  const isFocus = task.id === focusId;
  const eligibleUnauthorized = taskIsEligibleButUnauthorized(task);
  const plannedUnauthorized = taskIsPlannedButUnauthorized(task);
  const decompositionRegionId = `wbs-decomposition-${task.id}`.replace(/[^a-zA-Z0-9_-]/g, "-");

  return (
    <li className={`focusTask ${task.state.toLowerCase()} ${isFocus ? "focus" : ""} ${eligibleUnauthorized ? "eligibleUnauthorized" : ""} ${plannedUnauthorized ? "plannedUnauthorized" : ""} ${decomposition ? "hasDecomposition" : ""} ${expanded ? "decompositionOpen" : ""}`}>
      <span className="taskStateIcon" aria-hidden="true">
        {taskStateIcon(task, isFocus)}
      </span>
      <div>
        <div className="taskTitleLine">
          <span>{task.id}</span>
          <strong>{task.label}</strong>
        </div>
        <small>{taskStateLabel(task, isFocus)}{task.note ? ` · ${task.note}` : ""}</small>
      </div>
      <div className="taskMetaStack">
        {decomposition ? (
          <button
            type="button"
            className="taskSplitBadge taskSplitToggle"
            aria-expanded={expanded}
            aria-controls={decompositionRegionId}
            onClick={onToggleDecomposition}
            title={`Decomposição publicada para ${decomposition.parentTaskId}`}
          >
            <span>{decomposition.items.length} subetapas</span>
            <span className="taskSplitChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
          </button>
        ) : null}
        <b>{taskEffortLabel(task)}</b>
      </div>

      {decomposition ? (
        <div
          className="wbsTaskDecomposition"
          id={decompositionRegionId}
          hidden={!expanded}
          aria-label={`Decomposição preservada de ${task.id}`}
        >
          <TaskDecompositionPanel decomposition={decomposition} instanceId={`wbs-${task.id}`} />
        </div>
      ) : null}
    </li>
  );
}

function WbsMilestoneTab({
  milestone,
  active,
  selected,
  totalHours,
  forecastIsCanonical,
  onSelect
}: {
  milestone: WbsMilestone;
  active: boolean;
  selected: boolean;
  totalHours: number;
  forecastIsCanonical: boolean;
  onSelect: () => void;
}) {
  const completed = milestone.tasks.filter(taskIsFinalClosed).length;
  const effortShare = totalHours ? (milestone.hours / totalHours) * 100 : 0;
  const effortSuffix = forecastIsCanonical
    ? " forecast"
    : milestone.effortSource === "MIXED_ESTIMATE"
      ? " est."
      : "";
  const operationalLabel =
    milestone.state === "COMPLETE" ? "Concluído" :
    milestone.state === "ACTIVE" ? "Atual" :
    milestone.operationalState === "ELIGIBLE_NOT_AUTHORIZED" ? "Próximo elegível · Não autorizado" :
    milestone.operationalState === "PLANNED_NOT_AUTHORIZED" ? "Planejado · Não autorizado" :
    "Planejado";

  return (
    <button
      className={`wbsMilestoneTab ${milestone.state.toLowerCase()} ${selected ? "selected" : ""}`}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${milestone.id}: ${milestone.label}. ${operationalLabel}. ${completed} de ${milestone.tasks.length} tarefas concluídas.`}
    >
      <div>
        <span>{milestone.id}</span>
        <b>{milestone.hours}h{effortSuffix} · {effortShare.toFixed(2)}%</b>
      </div>
      <strong>{milestone.label}</strong>
      <div className="milestoneMetaLine">
        <small>{completed}/{milestone.tasks.length} tarefas concluídas</small>
        <span className={`milestoneOperationalState ${milestone.state.toLowerCase()}`}>
          {active && milestone.state === "ACTIVE" ? "ATUAL" : operationalLabel.toUpperCase()}
        </span>
      </div>
    </button>
  );
}

function WbsCommandCenter({ project }: { project: DashboardProject }) {
  const wbs = project.wbs as DashboardWbs;
  const activeMilestone = findActiveMilestone(wbs.milestones);
  const displayMilestone = findDisplayMilestone(wbs.milestones);

  const [selectedMilestoneId, setSelectedMilestoneId] = useState(displayMilestone.id);
  const [expandedWbsTaskId, setExpandedWbsTaskId] = useState<string | null>(null);

  const selectedMilestone: WbsMilestone =
    wbs.milestones.find((milestone) => milestone.id === selectedMilestoneId) ??
    displayMilestone;

  const operationalTasks: WbsTask[] = displayMilestone.tasks;
  const focusTask =
    (wbs.currentTaskId ? operationalTasks.find((task) => task.id === wbs.currentTaskId) : undefined) ??
    operationalTasks.find(taskIsEligibleButUnauthorized) ??
    operationalTasks.find((task) => task.note?.includes("NEXT GATE")) ??
    operationalTasks.find((task) => task.state !== "COMPLETE");

  const completedHours = wbs.forecastCompletedHours;
  const remaining = wbs.forecastRemainingHours;

  const selectedCompletedTasks = selectedMilestone.tasks.filter(taskIsFinalClosed).length;
  const selectedCompletedHours = selectedMilestone.completedHours ?? selectedMilestone.tasks
    .filter(taskIsFinalClosed)
    .reduce((sum, task) => sum + task.hours, 0);
  const selectedProgress = selectedMilestone.hours
    ? (selectedCompletedHours / selectedMilestone.hours) * 100
    : 0;

  const selectedIsActive = Boolean(activeMilestone && selectedMilestone.id === activeMilestone.id);
  const selectedStateLabel =
    selectedMilestone.state === "COMPLETE"
      ? "CONCLUÍDO"
      : selectedMilestone.state === "ACTIVE"
        ? "ACTIVE"
        : selectedMilestone.operationalState === "ELIGIBLE_NOT_AUTHORIZED"
          ? "PRÓXIMO ELEGÍVEL · NÃO AUTORIZADO"
          : selectedMilestone.operationalState === "PLANNED_NOT_AUTHORIZED"
            ? "PLANEJADO · NÃO AUTORIZADO"
            : "PLANEJADO";

  const selectedFocusId = selectedIsActive ? focusTask?.id : undefined;

  useEffect(() => {
    const selectedTaskIds = new Set(selectedMilestone.tasks.map((task) => task.id));
    setExpandedWbsTaskId((current) => current && selectedTaskIds.has(current) ? current : null);
  }, [selectedMilestone]);

  return (
    <article className="commandCard wbsCommand" id="wbs">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">WBS / effort</div>
          <h2>Tarefas principais do bloco e decomposição sob demanda</h2>
        </div>
        <div className="wbsTotals">
          <span><small>Concluído</small><strong>{completedHours}h</strong></span>
          <span><small>Restante</small><strong>{remaining}h</strong></span>
          <span><small>Forecast</small><strong>{wbs.totalCriticalHours}h {project.wbsForecastIsCanonical ? "FORECAST" : "EST."}</strong></span>
        </div>
      </div>

      <div className="wbsTabs" role="region" aria-label={`Selecione um bloco do WBS ${wbs.id ?? project.name}`}>
        {wbs.milestones.map((milestone) => (
          <WbsMilestoneTab
            milestone={milestone}
            active={Boolean(activeMilestone && milestone.id === activeMilestone.id)}
            selected={milestone.id === selectedMilestone.id}
            totalHours={wbs.totalCriticalHours}
            forecastIsCanonical={Boolean(project.wbsForecastIsCanonical)}
            onSelect={() => setSelectedMilestoneId(milestone.id)}
            key={milestone.id}
          />
        ))}
      </div>

      <section className={`currentBlock selectedBlock ${selectedMilestone.state.toLowerCase()}`}>
        <div className="currentBlockHeader">
          <div>
            <span>{selectedIsActive ? "Bloco atual" : "Bloco selecionado"}</span>
            <h3>{selectedMilestone.id}</h3>
            <strong>{selectedMilestone.label}</strong>
          </div>
          <div className="selectedBlockStatus">
            <span className={`statusPill ${selectedMilestone.state.toLowerCase()}`}>
              {selectedStateLabel}
            </span>
            {!selectedIsActive ? (
              <small>{activeMilestone ? `Bloco operacional atual: ${activeMilestone.id}` : `Nenhum bloco com execução ativa · próximo elegível: ${displayMilestone.id}`}</small>
            ) : null}
          </div>
        </div>

        <div className="selectedBlockProgressMeta">
          <span>{selectedCompletedHours}h / {selectedMilestone.hours}h · {selectedCompletedTasks}/{selectedMilestone.tasks.length} tarefas-mãe final-fechadas</span>
          <strong>{selectedProgress.toFixed(1)}%{project.wbsForecastIsCanonical ? " FORECAST" : selectedMilestone.effortSource === "MIXED_ESTIMATE" ? " EST." : ""}</strong>
        </div>
        <div className="currentBlockProgress" aria-label={`${selectedProgress.toFixed(1)}% do esforço do bloco selecionado concluído`}>
          <span style={{ width: `${selectedProgress}%` }} />
        </div>

        <div className="selectedBlockListLabel">
          <span>Nível principal</span>
          <strong>{selectedMilestone.tasks.length} tarefas-mãe · subtarefas recolhidas por padrão</strong>
        </div>
        <ul className="focusTaskList selectedTaskList">
          {selectedMilestone.tasks.map((task) => {
            const decomposition = findTaskDecomposition(project, task.id);
            return (
              <WbsFocusTask
                task={task}
                focusId={selectedFocusId}
                decomposition={decomposition}
                expanded={expandedWbsTaskId === task.id}
                onToggleDecomposition={() => {
                  if (!decomposition) return;
                  setExpandedWbsTaskId((current) => current === task.id ? null : task.id);
                }}
                key={task.id}
              />
            );
          })}
        </ul>
      </section>

      <div className="wbsFootnote">
        {project.wbsFootnote} {activeMilestone ? `O bloco operacional atual continua sendo ${activeMilestone.id}.` : `Nenhum bloco tem execução ativa; ${displayMilestone.id} é apenas o próximo elegível.`}
      </div>
    </article>
  );
}

function EvidenceCard({ project }: { project: DashboardProject }) {
  const isFechai = project.name === FECHAI;
  return (
    <article className="commandCard evidenceCard" id="evidence">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Evidência & proveniência</div>
          <h2>Fonte que sustenta este painel</h2>
        </div>
        <span className="statusPill verified">VERIFICADA</span>
      </div>
      <div className="evidenceGrid">
        <div><span>Repositório</span><strong>{project.repository}</strong></div>
        <div><span>SHA observado</span><code>{project.observedSha}</code></div>
        <div><span>Verificação</span><strong>{project.verification}</strong></div>
        <div><span>Observado em</span><strong>{project.observedAt}</strong></div>
        <div><span>Handoff / read model</span><strong>{project.evidenceHandoff ?? "Não definido neste snapshot"}</strong></div>
      </div>
      {isFechai ? (
        <div className="evidenceBoundaryCompact">
          <span>Boundary de evidência</span>
          <strong>{workspaceDemo.fechaiProgram.evidenceBoundary}</strong>
        </div>
      ) : null}
    </article>
  );
}

function GenericProjectStructure({ project }: { project: DashboardProject }) {
  return (
    <article className="commandCard unavailableWbs" id="wbs">
      <div className="emptyStateIcon" aria-hidden="true">⌁</div>
      <div>
        <div className="eyebrow">WBS</div>
        <h2>Estrutura granular não disponível neste snapshot</h2>
        <p>O Workspace não inventa percentual, milestones ou tarefas quando a fonte atual do projeto não fornece essa estrutura.</p>
        <strong>{project.repository}</strong>
      </div>
    </article>
  );
}

function ProjectDashboard({ project }: { project: DashboardProject }) {
  const isFechai = project.name === FECHAI;
  const hasWbs = Boolean(project.wbs);
  return (
    <>
      <NextActionCard project={project} />
      {isFechai ? <IntegrityStrip /> : null}
      <ProjectObjectiveCard project={project} />
      {hasWbs ? <WbsCommandCenter project={project} /> : <GenericProjectStructure project={project} />}
      <RisksCard project={project} />
      <EvidenceCard project={project} />
    </>
  );
}

export function WorkspaceHome() {
  const initialProject =
    dashboardProjects.find((project) => project.name === FECHAI) ??
    dashboardProjects[0];

  const [selectedProjectName, setSelectedProjectName] = useState(initialProject.name);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    const closeDrawerOnDesktop = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };

    window.addEventListener("resize", closeDrawerOnDesktop);
    closeDrawerOnDesktop();
    return () => window.removeEventListener("resize", closeDrawerOnDesktop);
  }, []);

  const selectedProject =
    dashboardProjects.find((project) => project.name === selectedProjectName) ??
    initialProject;

  return (
    <div className="workspaceShell">
      <Sidebar
        open={menuOpen}
        selectedProject={selectedProject.name}
        onSelectProject={setSelectedProjectName}
        onClose={closeMobileMenu}
      />
      <main className="commandMain" inert={menuOpen ? true : undefined}>
        <ProjectHeader
          project={selectedProject}
          onMenu={() => setMenuOpen(true)}
          menuButtonRef={menuButtonRef}
        />
        <ProjectDashboard project={selectedProject} />
        <footer className="commandFooter">
          <span>SFJM Workspace · visão operacional multi-projeto</span>
          <span>Dados apresentados somente quando sustentados pelo snapshot canônico disponível.</span>
        </footer>
      </main>
    </div>
  );
}
