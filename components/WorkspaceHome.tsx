"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExternalProject,
  type WbsMilestone,
  type WbsTask
} from "@/data/workspace-demo";

const FECHAI = "FECH.AI";

type ProjectTaskDecomposition = NonNullable<ExternalProject["taskDecompositions"]>[number];

function findTaskDecomposition(project: ExternalProject, parentTaskId?: string) {
  if (!parentTaskId) return undefined;
  return project.taskDecompositions?.find((decomposition) => decomposition.parentTaskId === parentTaskId);
}

function taskIsEligibleButUnauthorized(task: WbsTask) {
  return task.note?.includes("NEXT ELIGIBLE / NOT_AUTHORIZED") ?? false;
}

function taskIsPlannedButUnauthorized(task: WbsTask) {
  return task.note?.includes("PLANNED_NOT_AUTHORIZED") ?? false;
}

function taskStateLabel(task: WbsTask, isFocus: boolean) {
  if (task.state === "COMPLETE") return "Concluída";
  if (task.state === "ACTIVE") return "Em execução";
  if (taskIsEligibleButUnauthorized(task)) return "Próxima elegível · Não autorizada";
  if (taskIsPlannedButUnauthorized(task)) return "Planejada · Não autorizada";
  if (isFocus) return "Próximo gate";
  if (task.state === "PARKED") return "Backlog";
  return "Planejada";
}

function taskStateIcon(task: WbsTask, isFocus: boolean) {
  if (task.state === "COMPLETE") return "✓";
  if (taskIsEligibleButUnauthorized(task) || taskIsPlannedButUnauthorized(task)) return "⊘";
  if (isFocus || task.state === "ACTIVE") return "▶";
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
  const selectedIsFechai = selectedProject === FECHAI;

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
          {workspaceDemo.externalProjects.map((project) => {
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
                    {selectedIsFechai ? <a href="#wbs">WBS</a> : <span>WBS · indisponível</span>}
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
  project: ExternalProject;
  onMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const isFechai = project.name === FECHAI;
  const programProgress = calculateAcceptedProgramProgress(workspaceDemo.fechaiProgram.milestones);
  const wbs = workspaceDemo.fechaiWbs;
  const criticalHours = wbs.milestones.reduce((total, milestone) => total + milestone.hours, 0);
  const completedHours = wbs.milestones.reduce(
    (total, milestone) =>
      total + milestone.tasks.filter((task) => task.state === "COMPLETE").reduce((sum, task) => sum + task.hours, 0),
    0
  );
  const wbsPercent = criticalHours ? (completedHours / criticalHours) * 100 : 0;

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
          <strong>{isFechai ? wbs.currentPackage : project.continuityState}</strong>
          <small>{isFechai ? wbs.currentTask : "Snapshot manual do projeto"}</small>
        </div>
        <div className="heroMetric progressMetric">
          <span>Conclusão total</span>
          <strong>{isFechai ? `${wbsPercent.toFixed(1)}%` : "—"}</strong>
          {isFechai ? (
            <div className="totalProgressTrack" aria-label={`${wbsPercent.toFixed(1)}% do WBS crítico concluído`}>
              <span style={{ width: `${wbsPercent}%` }} />
            </div>
          ) : null}
          <small>{isFechai ? `${completedHours}h de ${criticalHours}h do WBS crítico` : "Sem WBS canônica suficiente no snapshot"}</small>
        </div>
        <div className="heroMetric">
          <span>Bloco atual</span>
          <strong>{isFechai ? wbs.currentPackage : "Não modelado"}</strong>
          <small>{isFechai ? `${programProgress.toFixed(2)}% de gates aceitos no macro programa` : "Sem inferência automática"}</small>
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

  const renderCanonicalChildren = (
    parentId: string,
    children: ProjectTaskDecomposition["items"],
    regionId: string,
    hidden: boolean
  ) => {
    const visibleChildren = children.slice(0, 8);
    const hasInlineOverflow = children.length > visibleChildren.length;

    return (
      <div
        className="decompositionChildrenRegion"
        id={regionId}
        aria-label={`Subetapas de ${parentId}`}
        hidden={hidden}
      >
        <ol className="decompositionChildrenList" role="list">
          {visibleChildren.map((child) => (
            <li className={`decompositionChildRow ${child.state.toLowerCase()}`} key={child.id}>
              <span className="decompositionChildGuide" aria-hidden="true">└</span>
              <span className="decompositionChildIcon" aria-hidden="true">{decompositionIcon(child.state)}</span>
              <span className="decompositionChildIdentity">
                <span className="decompositionChildTitle">
                  <strong>{child.id}</strong>
                  <span>{child.label}</span>
                </span>
                <small className="decompositionChildCanonicalStatus">{child.status}</small>
              </span>
              <span className="decompositionChildState">{decompositionVisualStateLabel(child)}</span>
            </li>
          ))}
        </ol>
        {hasInlineOverflow ? (
          <div className="decompositionOverflowNote">
            {children.length - visibleChildren.length} subetapas adicionais · visualização detalhada futura
          </div>
        ) : null}
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
                      <small className="decompositionCanonicalStatus">{item.status}</small>
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
                    <small className="decompositionCanonicalStatus">{item.status}</small>
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

function NextActionCard({ project }: { project: ExternalProject }) {
  const isFechai = project.name === FECHAI;
  const program = workspaceDemo.fechaiProgram;
  const activeMilestone = workspaceDemo.fechaiWbs.milestones.find((milestone) => milestone.state === "ACTIVE");
  const activeTasks: WbsTask[] = activeMilestone?.tasks ?? [];
  const focusTask = activeTasks.find((task) => task.note?.includes("NEXT GATE")) ??
    activeTasks.find((task) => task.state !== "COMPLETE");
  const requiredRoutes = program.specialistRouting.filter((route) => route.requirement === "REQUIRED");
  const conditionalRoute = program.specialistRouting.find((route) => route.requirement === "CONDITIONAL");
  const decomposition = findTaskDecomposition(project, focusTask?.id);
  const focusEligibleUnauthorized = isFechai && focusTask ? taskIsEligibleButUnauthorized(focusTask) : false;

  return (
    <article className="commandCard nextActionCard" id="next-action">
      <div className={`nextActionLayout ${decomposition ? "hasDecomposition" : ""}`}>
        <div className="nextActionPrimary">
          <div className="cardHeading">
            <div>
              <div className="eyebrow">Próxima ação segura</div>
              <h2>{isFechai && focusTask ? focusTask.label : project.nextSafeAction}</h2>
            </div>
            <span className={`statusPill ${focusEligibleUnauthorized ? "restricted" : "next"}`}>
              {focusEligibleUnauthorized ? "PRÓXIMA ELEGÍVEL · NÃO AUTORIZADA" : "PRÓXIMA"}
            </span>
          </div>

          {isFechai && focusTask && activeMilestone ? (
            <>
              <p className="safeSequence" title={program.nextSafeAction}>{project.nextSafeAction}</p>
              <div className="actionFacts">
                <div><span>Bloco</span><strong>{activeMilestone.id}</strong></div>
                <div><span>Tarefa</span><strong>{focusTask.id} · {focusTask.hours}h</strong></div>
                <div><span>Situação</span><strong>{taskStateLabel(focusTask, true)}</strong></div>
                <div>
                  <span>Roteamento previsto</span>
                  <strong>{requiredRoutes.map((route) => route.targetName.replace("SES — ", "")).join(" → ")}</strong>
                </div>
              </div>
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
            </>
          ) : (
            <div className="actionFooter">
              <span>{project.verification}</span>
            </div>
          )}
        </div>

        {decomposition ? <TaskDecompositionPanel decomposition={decomposition} instanceId="next-action" /> : null}
      </div>
    </article>
  );
}

function RisksCard({ project }: { project: ExternalProject }) {
  return (
    <article className="commandCard risksCard" id="risks">
      <div className="cardHeading compact">
        <div>
          <div className="eyebrow">Problemas / restrições</div>
          <h2>{project.blockers.length} abertos</h2>
        </div>
        <span className="countBadge">{project.blockers.length}</span>
      </div>
      <ul className="riskList">
        {project.blockers.map((blocker, index) => (
          <li key={blocker}>
            <span className="riskIndex">{String(index + 1).padStart(2, "0")}</span>
            <span>{blocker}</span>
          </li>
        ))}
      </ul>
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
        <b>{task.hours}h</b>
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
  onSelect
}: {
  milestone: WbsMilestone;
  active: boolean;
  selected: boolean;
  totalHours: number;
  onSelect: () => void;
}) {
  const completed = milestone.tasks.filter((task) => task.state === "COMPLETE").length;
  const effortShare = totalHours ? (milestone.hours / totalHours) * 100 : 0;
  const operationalLabel =
    milestone.state === "COMPLETE" ? "Concluído" :
    milestone.state === "ACTIVE" ? "Atual" :
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
        <b>{milestone.hours}h · {effortShare.toFixed(2)}%</b>
      </div>
      <strong>{milestone.label}</strong>
      <div className="milestoneMetaLine">
        <small>{completed}/{milestone.tasks.length} tarefas concluídas</small>
        <span className={`milestoneOperationalState ${milestone.state.toLowerCase()}`}>
          {active ? "ATUAL" : operationalLabel.toUpperCase()}
        </span>
      </div>
    </button>
  );
}

function WbsCommandCenter({ project }: { project: ExternalProject }) {
  const wbs = workspaceDemo.fechaiWbs;
  const activeMilestone =
    wbs.milestones.find((milestone) => milestone.state === "ACTIVE") ??
    wbs.milestones[0];

  const [selectedMilestoneId, setSelectedMilestoneId] = useState(activeMilestone.id);
  const [expandedWbsTaskId, setExpandedWbsTaskId] = useState<string | null>(null);

  const selectedMilestone: WbsMilestone =
    wbs.milestones.find((milestone) => milestone.id === selectedMilestoneId) ??
    activeMilestone;

  const activeTasks: WbsTask[] = activeMilestone.tasks;
  const focusTask =
    activeTasks.find((task) => task.note?.includes("NEXT GATE")) ??
    activeTasks.find((task) => task.state !== "COMPLETE");

  const completedHours = wbs.milestones.reduce(
    (total, milestone) =>
      total +
      milestone.tasks
        .filter((task) => task.state === "COMPLETE")
        .reduce((sum, task) => sum + task.hours, 0),
    0
  );
  const remaining = wbs.totalCriticalHours - completedHours;

  const selectedCompletedTasks = selectedMilestone.tasks.filter(
    (task) => task.state === "COMPLETE"
  ).length;
  const selectedProgress = selectedMilestone.tasks.length
    ? (selectedCompletedTasks / selectedMilestone.tasks.length) * 100
    : 0;

  const selectedIsActive = selectedMilestone.id === activeMilestone.id;
  const selectedStateLabel =
    selectedMilestone.state === "COMPLETE"
      ? "CONCLUÍDO"
      : selectedMilestone.state === "ACTIVE"
        ? "ACTIVE"
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
          <h2>Bloco, tarefa e caminho operacional</h2>
        </div>
        <div className="wbsTotals">
          <span><small>Concluído</small><strong>{completedHours}h</strong></span>
          <span><small>Restante</small><strong>{remaining}h</strong></span>
          <span><small>Total</small><strong>{wbs.totalCriticalHours}h</strong></span>
        </div>
      </div>

      <div className="wbsTabs" role="region" aria-label="Selecione um bloco do WBS STS-M0 a STS-M6">
        {wbs.milestones.map((milestone) => (
          <WbsMilestoneTab
            milestone={milestone}
            active={milestone.id === activeMilestone.id}
            selected={milestone.id === selectedMilestone.id}
            totalHours={wbs.totalCriticalHours}
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
              <small>Bloco operacional atual: {activeMilestone.id}</small>
            ) : null}
          </div>
        </div>

        <div className="selectedBlockProgressMeta">
          <span>{selectedCompletedTasks}/{selectedMilestone.tasks.length} tarefas concluídas</span>
          <strong>{selectedProgress.toFixed(0)}%</strong>
        </div>
        <div className="currentBlockProgress" aria-label={`${selectedProgress.toFixed(0)}% das tarefas do bloco selecionado concluídas`}>
          <span style={{ width: `${selectedProgress}%` }} />
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
        Seleção é apenas navegação visual. O bloco operacional atual continua sendo {activeMilestone.id}. Horas não são timesheet, confiança ou Security Go.
      </div>
    </article>
  );
}

function EvidenceCard({ project }: { project: ExternalProject }) {
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
        <div><span>Handoff</span><strong>{isFechai ? workspaceDemo.fechaiProgram.specialistTransport : "Não definido neste snapshot"}</strong></div>
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

function GenericProjectStructure({ project }: { project: ExternalProject }) {
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

function ProjectDashboard({ project }: { project: ExternalProject }) {
  const isFechai = project.name === FECHAI;
  return (
    <>
      <NextActionCard project={project} />
      {isFechai ? <IntegrityStrip /> : null}
      {isFechai ? <WbsCommandCenter project={project} /> : <GenericProjectStructure project={project} />}
      <RisksCard project={project} />
      <EvidenceCard project={project} />
    </>
  );
}

export function WorkspaceHome() {
  const initialProject =
    workspaceDemo.externalProjects.find((project) => project.name === FECHAI) ??
    workspaceDemo.externalProjects[0];

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
    workspaceDemo.externalProjects.find((project) => project.name === selectedProjectName) ??
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
