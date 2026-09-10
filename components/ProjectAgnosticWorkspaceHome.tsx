"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import {
  workspaceDemo,
  type WbsMilestone,
  type WbsTask
} from "@/data/workspace-demo";
import {
  connectedProjects,
  type ConnectedProject,
  type ProjectWbsSnapshot
} from "@/data/connected-projects";

type ProjectTaskDecomposition = NonNullable<ConnectedProject["taskDecompositions"]>[number];
type DecompositionItem = ProjectTaskDecomposition["items"][number];

function normalizeTaskIdentity(taskId: string) {
  return taskId.startsWith("STS-") ? taskId.slice(4) : taskId;
}

function findTaskDecomposition(project: ConnectedProject, parentTaskId?: string) {
  if (!parentTaskId) return undefined;
  const normalizedParent = normalizeTaskIdentity(parentTaskId);
  return project.taskDecompositions?.find(
    (decomposition) => normalizeTaskIdentity(decomposition.parentTaskId) === normalizedParent
  );
}

function taskNote(task: WbsTask) {
  return task.note ?? "";
}

function taskIsEligibleButUnauthorized(task: WbsTask) {
  const note = taskNote(task);
  return note.includes("NEXT ELIGIBLE / NOT_AUTHORIZED") ||
    note.includes("NEXT_ELIGIBLE / NOT_AUTHORIZED") ||
    note.includes("ELIGIBLE_NOT_AUTHORIZED") ||
    note.includes("NEXT_CANDIDATE");
}

function taskIsPlannedButUnauthorized(task: WbsTask) {
  return taskNote(task).includes("PLANNED_NOT_AUTHORIZED");
}

function taskIsAuthorizedReadOnly(task: WbsTask) {
  return taskNote(task).includes("AUTHORIZED_READ_ONLY");
}

function taskIsAuthorizedNotInitiated(task: WbsTask) {
  const note = taskNote(task);
  return note.includes("AUTHORIZED / NOT_INITIATED") || note.includes("AUTHORIZED_NOT_INITIATED");
}

function taskIsAuthorizedDeferred(task: WbsTask) {
  return taskNote(task).includes("AUTHORIZED_DEFERRED");
}

function taskRequiresRebaseline(task: WbsTask) {
  return taskNote(task).includes("REBASELINE_REQUIRED");
}

function taskHasFinalClosurePending(task: WbsTask) {
  return taskNote(task).includes("FINAL_CLOSURE_PENDING");
}

function taskHasWorkspaceEstimate(task: WbsTask) {
  return task.effortSource === "WORKSPACE_ESTIMATE" || task.effortSource === "DERIVED_FROM_CHILDREN";
}

function taskIsFinalClosed(task: WbsTask) {
  return task.state === "COMPLETE" && !taskHasFinalClosurePending(task);
}

function taskIsActiveButExecutionGated(task: WbsTask) {
  const note = taskNote(task);
  return task.state === "ACTIVE" && (
    note.includes("CURRENT_AUTHORIZED_TECHNICAL_EXECUTION = NONE") ||
    note.includes("NEXT MATERIAL GATE REQUIRES PRODUCT AUTHORITY") ||
    note.includes("ACTIVE_REBASELINE_REQUIRED")
  );
}

function taskEffortLabel(task: WbsTask) {
  if (taskHasWorkspaceEstimate(task)) return `${task.hours}h est.`;
  if (taskRequiresRebaseline(task) && !task.hours) return "REBASELINE";
  return `${task.hours}h`;
}

function taskStateLabel(task: WbsTask, isFocus = false) {
  if (taskHasFinalClosurePending(task)) return "Baseline aceito · fechamento final pendente";
  if (task.state === "COMPLETE") return "Concluída";
  if (taskIsActiveButExecutionGated(task)) return "Ativa · aguardando próximo gate";
  if (task.state === "ACTIVE") return "Em execução";
  if (taskIsAuthorizedReadOnly(task)) return "Autorizada READ_ONLY · pronta";
  if (taskIsAuthorizedDeferred(task)) return "Autorizada · adiada / não é ação atual";
  if (taskIsAuthorizedNotInitiated(task)) return "Autorizada · não iniciada";
  if (taskIsEligibleButUnauthorized(task)) return "Próxima candidata · não autorizada";
  if (taskIsPlannedButUnauthorized(task)) return "Planejada · não autorizada";
  if (isFocus) return "Próxima";
  if (task.state === "PARKED") return "Backlog";
  return "Planejada";
}

function taskStateIcon(task: WbsTask, isFocus = false) {
  if (taskHasFinalClosurePending(task)) return "◐";
  if (task.state === "COMPLETE") return "✓";
  if (taskIsActiveButExecutionGated(task)) return "Ⅱ";
  if (taskIsEligibleButUnauthorized(task) || taskIsPlannedButUnauthorized(task)) return "⊘";
  if (taskIsAuthorizedDeferred(task)) return "Ⅱ";
  if (taskIsAuthorizedReadOnly(task) || taskIsAuthorizedNotInitiated(task) || isFocus || task.state === "ACTIVE") return "▶";
  return "○";
}

function milestoneIsNextUnauthorized(milestone: WbsMilestone) {
  return milestone.operationalState === "ELIGIBLE_NOT_AUTHORIZED" ||
    milestone.operationalState === "PLANNED_NOT_AUTHORIZED";
}

function findActiveMilestone(milestones: WbsMilestone[]) {
  return milestones.find((milestone) => milestone.state === "ACTIVE");
}

function findDisplayMilestone(milestones: WbsMilestone[]) {
  return findActiveMilestone(milestones) ??
    milestones.find(milestoneIsNextUnauthorized) ??
    milestones.find((milestone) => milestone.state !== "COMPLETE") ??
    milestones[0];
}

function milestoneStateLabel(milestone: WbsMilestone, active: boolean) {
  if (milestone.state === "COMPLETE") return "Concluído";
  if (active && milestone.state === "ACTIVE") return "Atual";
  if (milestone.operationalState === "ELIGIBLE_NOT_AUTHORIZED") return "Próximo elegível · Não autorizado";
  if (milestone.operationalState === "PLANNED_NOT_AUTHORIZED") return "Planejado · Não autorizado";
  if (milestone.state === "ACTIVE") return "Em execução";
  return "Planejado";
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
  selectedProject: ConnectedProject;
  onSelectProject: (name: string) => void;
  onClose: () => void;
}) {
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
            <button className="drawerClose" type="button" onClick={onClose} autoFocus aria-label="Fechar menu de projetos">×</button>
          ) : null}
        </div>

        <div className="sidebarSectionLabel">Continue</div>
        <nav className="projectNav" aria-label="Projetos disponíveis">
          {connectedProjects.map((project) => {
            const active = project.name === selectedProject.name;
            return (
              <div className={`projectNavGroup ${active ? "active" : ""}`} key={project.projectId}>
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
                    {project.wbs ? <a href="#wbs">WBS / Effort</a> : <span>WBS · indisponível</span>}
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
  project: ConnectedProject;
  onMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const wbs = project.wbs;
  const activeMilestone = wbs ? findActiveMilestone(wbs.milestones) : undefined;
  const displayMilestone = wbs ? findDisplayMilestone(wbs.milestones) : undefined;
  const currentBlock = activeMilestone ?? displayMilestone;
  const currentBlockCompleted = currentBlock?.completedHours ?? 0;
  const currentBlockPercent = currentBlock?.hours ? (currentBlockCompleted / currentBlock.hours) * 100 : 0;

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
          <strong>{wbs ? wbs.currentPackage : project.continuityState}</strong>
          <small>{wbs ? wbs.currentTask : "Snapshot manual do projeto"}</small>
        </div>
        <div className="heroMetric progressMetric">
          <span>Conclusão total</span>
          <strong>{wbs ? `${wbs.forecastPercent.toFixed(2)}%${wbs.effortSemantics.includes("WORKSPACE") ? " EST." : ""}` : "—"}</strong>
          {wbs ? (
            <div className="totalProgressTrack" aria-label={`${wbs.forecastPercent.toFixed(2)}% do forecast concluído`}>
              <span style={{ width: `${Math.min(100, Math.max(0, wbs.forecastPercent))}%` }} />
            </div>
          ) : null}
          <small>{wbs
            ? `${wbs.forecastCompletedHours}h de ${wbs.totalCriticalHours}h · ${wbs.forecastRemainingHours}h restantes`
            : "Sem WBS publicada no snapshot"}</small>
        </div>
        <div className="heroMetric">
          <span>{activeMilestone ? "Bloco atual" : "Próximo bloco"}</span>
          <strong>{currentBlock?.id ?? "Não modelado"}</strong>
          <small>{currentBlock
            ? `${currentBlockPercent.toFixed(1)}% do bloco · ${milestoneStateLabel(currentBlock, Boolean(activeMilestone))}`
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

function decompositionIcon(state: DecompositionItem["state"]) {
  if (state === "COMPLETE") return "✓";
  if (state === "ACTIVE" || state === "NEXT") return "▶";
  if (state === "BLOCKED") return "!";
  if (state === "NOT_AUTHORIZED") return "⊘";
  return "○";
}

function decompositionStateLabel(item: DecompositionItem) {
  if (item.status.includes("AUTHORIZED_DEFERRED")) return "Autorizado · adiado";
  if (item.state === "COMPLETE") return "Concluído";
  if (item.state === "ACTIVE") return "Em execução";
  if (item.state === "NEXT") return "Próxima";
  if (item.state === "BLOCKED") return "Bloqueado";
  if (item.state === "NOT_AUTHORIZED") return "Não autorizado";
  if (item.state === "PLANNED") return "Planejado";
  return "Estado indefinido";
}

function decompositionRegionId(instanceId: string, parentTaskId: string, itemId: string) {
  return `decomposition-${instanceId}-${parentTaskId}-${itemId}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function DecompositionNode({ item, depth }: { item: DecompositionItem; depth: number }) {
  const [expanded, setExpanded] = useState(false);
  const children = item.children ?? [];
  const hasChildren = children.length > 0;

  return (
    <li className={`decompositionChildNode ${item.state.toLowerCase()}`}>
      {hasChildren ? (
        <button
          type="button"
          className="decompositionDisclosure"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <span className="decompositionChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
          <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
          <span className="decompositionItemMain">
            <span className="decompositionTitleLine"><strong>{item.id}</strong><span>{item.label}</span></span>
            <small className="decompositionCanonicalStatus">
              {item.status}{item.hours ? ` · ${item.hours}h${item.effortSource === "WORKSPACE_ESTIMATE" ? " EST." : ""}` : ""}
            </small>
          </span>
        </button>
      ) : (
        <div className="decompositionLeafRow">
          <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
          <span className="decompositionItemMain">
            <span className="decompositionTitleLine"><strong>{item.id}</strong><span>{item.label}</span></span>
            <span className={`decompositionStatusPill ${item.state.toLowerCase()}`}>{decompositionStateLabel(item)}</span>
            <small className="decompositionCanonicalStatus">
              {item.status}{item.hours ? ` · ${item.hours}h${item.effortSource === "WORKSPACE_ESTIMATE" ? " EST." : ""}` : ""}
            </small>
          </span>
        </div>
      )}
      {hasChildren && expanded ? (
        <ol className="decompositionChildren" data-depth={depth + 1}>
          {children.map((child) => <DecompositionNode key={child.id} item={child} depth={depth + 1} />)}
        </ol>
      ) : null}
    </li>
  );
}

function TaskDecompositionPanel({ decomposition, instanceId }: { decomposition: ProjectTaskDecomposition; instanceId: string }) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  useEffect(() => setExpandedItemId(null), [decomposition.parentTaskId]);

  return (
    <aside className="taskDecompositionPanel" aria-label={`Decomposição de ${decomposition.parentTaskId}`}>
      <div className="decompositionHeader">
        <div>
          <span className="eyebrow">Decomposição canônica</span>
          <strong>{decomposition.parentTaskId} · {decomposition.parentLabel}</strong>
        </div>
        <span className="countBadge">{decomposition.items.length}</span>
      </div>
      <ol className="decompositionList">
        {decomposition.items.map((item) => {
          const children = item.children ?? [];
          const hasChildren = children.length > 0;
          const expanded = expandedItemId === item.id;
          const childRegion = decompositionRegionId(instanceId, decomposition.parentTaskId, item.id);
          return (
            <li className={`decompositionItem ${item.state.toLowerCase()} ${hasChildren ? "branch" : "leaf"}`} key={item.id}>
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    className="decompositionDisclosure"
                    aria-expanded={expanded}
                    aria-controls={childRegion}
                    onClick={() => setExpandedItemId((current) => current === item.id ? null : item.id)}
                  >
                    <span className="decompositionChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
                    <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
                    <span className="decompositionItemMain">
                      <span className="decompositionTitleLine"><strong>{item.id}</strong><span>{item.label}</span></span>
                      <span className={`decompositionStatusPill ${item.state.toLowerCase()}`}>{decompositionStateLabel(item)}</span>
                      <small className="decompositionCanonicalStatus">{item.status}</small>
                    </span>
                  </button>
                  {expanded ? (
                    <ol id={childRegion} className="decompositionChildren">
                      {children.map((child) => <DecompositionNode key={child.id} item={child} depth={1} />)}
                    </ol>
                  ) : null}
                </>
              ) : (
                <div className="decompositionLeafRow" title={item.note ?? item.status}>
                  <span className="decompositionStateIcon" aria-hidden="true">{decompositionIcon(item.state)}</span>
                  <span className="decompositionItemMain">
                    <span className="decompositionTitleLine"><strong>{item.id}</strong><span>{item.label}</span></span>
                    <span className={`decompositionStatusPill ${item.state.toLowerCase()}`}>{decompositionStateLabel(item)}</span>
                    <small className="decompositionCanonicalStatus">
                      {item.status}{item.hours ? ` · ${item.hours}h${item.effortSource === "WORKSPACE_ESTIMATE" ? " EST." : ""}` : ""}
                    </small>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <div className="decompositionSource"><span>Fonte publicada pelo projeto</span><small>{decomposition.source}</small></div>
    </aside>
  );
}

function NextActionCard({ project }: { project: ConnectedProject }) {
  const wbs = project.wbs;
  const displayMilestone = wbs ? findDisplayMilestone(wbs.milestones) : undefined;
  const focusTask = displayMilestone?.tasks.find(taskIsEligibleButUnauthorized) ??
    displayMilestone?.tasks.find((task) => task.state === "ACTIVE") ??
    displayMilestone?.tasks.find((task) => task.state !== "COMPLETE");
  const isFechai = project.projectId === "fechai";
  const requiredRoutes = isFechai ? workspaceDemo.fechaiProgram.specialistRouting.filter((route) => route.requirement === "REQUIRED") : [];

  return (
    <article className="commandCard nextActionCard" id="next-action">
      <div className="nextActionLayout">
        <div className="nextActionPrimary">
          <div className="cardHeading">
            <div>
              <div className="eyebrow">Próxima ação segura</div>
              <h2>{focusTask ? focusTask.label : project.nextSafeAction}</h2>
            </div>
            <span className={`statusPill ${focusTask && (taskIsEligibleButUnauthorized(focusTask) || taskIsPlannedButUnauthorized(focusTask)) ? "restricted" : "next"}`}>
              {focusTask ? taskStateLabel(focusTask, true).toUpperCase() : "PRÓXIMA"}
            </span>
          </div>

          <p className="safeSequence" title={project.nextSafeAction}>{project.nextSafeAction}</p>

          {wbs && displayMilestone ? (
            <div className="actionFacts">
              <div><span>Bloco</span><strong>{displayMilestone.id}</strong></div>
              <div><span>Tarefa</span><strong>{focusTask ? `${focusTask.id} · ${taskEffortLabel(focusTask)}` : "Nenhuma ativa"}</strong></div>
              <div><span>Situação</span><strong>{milestoneStateLabel(displayMilestone, displayMilestone.state === "ACTIVE")}</strong></div>
              {requiredRoutes.length ? (
                <div><span>Roteamento previsto</span><strong>{requiredRoutes.map((route) => route.targetName.replace("SES — ", "")).join(" → ")}</strong></div>
              ) : null}
            </div>
          ) : null}

          <div className="actionFooter">
            <span>{project.verification}</span>
          </div>
        </div>
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
          <span><small>{item.label}</small><strong>{item.value}</strong></span>
        </div>
      ))}
    </section>
  );
}

function WbsFocusTask({
  project,
  task,
  focusId,
  expanded,
  onToggleDecomposition
}: {
  project: ConnectedProject;
  task: WbsTask;
  focusId?: string;
  expanded: boolean;
  onToggleDecomposition: () => void;
}) {
  const decomposition = findTaskDecomposition(project, task.id);
  const isFocus = task.id === focusId;
  const plannedUnauthorized = taskIsPlannedButUnauthorized(task) || taskIsEligibleButUnauthorized(task);
  const regionId = `wbs-decomposition-${task.id}`.replace(/[^a-zA-Z0-9_-]/g, "-");

  return (
    <li className={`focusTask ${task.state.toLowerCase()} ${isFocus ? "focus" : ""} ${plannedUnauthorized ? "plannedUnauthorized" : ""} ${decomposition ? "hasDecomposition" : ""} ${expanded ? "decompositionOpen" : ""}`}>
      <span className="taskStateIcon" aria-hidden="true">{taskStateIcon(task, isFocus)}</span>
      <div>
        <div className="taskTitleLine"><span>{task.id}</span><strong>{task.label}</strong></div>
        <small>{taskStateLabel(task, isFocus)}{task.note ? ` · ${task.note}` : ""}</small>
      </div>
      <div className="taskMetaStack">
        {decomposition ? (
          <button
            type="button"
            className="taskSplitBadge taskSplitToggle"
            aria-expanded={expanded}
            aria-controls={regionId}
            onClick={onToggleDecomposition}
          >
            <span>{decomposition.items.length} subetapas</span>
            <span className="taskSplitChevron" aria-hidden="true">{expanded ? "⌄" : "›"}</span>
          </button>
        ) : null}
        <b>{taskEffortLabel(task)}</b>
      </div>
      {decomposition ? (
        <div className="wbsTaskDecomposition" id={regionId} hidden={!expanded}>
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
  const completed = milestone.tasks.filter(taskIsFinalClosed).length;
  const effortShare = totalHours ? (milestone.hours / totalHours) * 100 : 0;
  const estimateSuffix = milestone.effortSource === "MIXED_ESTIMATE" ? " est." : "";
  const stateLabel = milestoneStateLabel(milestone, active);
  return (
    <button
      className={`wbsMilestoneTab ${milestone.state.toLowerCase()} ${selected ? "selected" : ""}`}
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${milestone.id}: ${milestone.label}. ${stateLabel}. ${completed} de ${milestone.tasks.length} tarefas concluídas.`}
    >
      <div><span>{milestone.id}</span><b>{milestone.hours}h{estimateSuffix} · {effortShare.toFixed(2)}%</b></div>
      <strong>{milestone.label}</strong>
      <div className="milestoneMetaLine">
        <small>{completed}/{milestone.tasks.length} tarefas concluídas</small>
        <span className={`milestoneOperationalState ${milestone.state.toLowerCase()}`}>{stateLabel.toUpperCase()}</span>
      </div>
    </button>
  );
}

function WbsCommandCenter({ project, wbs }: { project: ConnectedProject; wbs: ProjectWbsSnapshot }) {
  const activeMilestone = findActiveMilestone(wbs.milestones);
  const displayMilestone = findDisplayMilestone(wbs.milestones);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(displayMilestone.id);
  const [expandedWbsTaskId, setExpandedWbsTaskId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMilestoneId(displayMilestone.id);
    setExpandedWbsTaskId(null);
  }, [project.projectId, displayMilestone.id]);

  const selectedMilestone = wbs.milestones.find((milestone) => milestone.id === selectedMilestoneId) ?? displayMilestone;
  const focusTask = displayMilestone.tasks.find(taskIsEligibleButUnauthorized) ??
    displayMilestone.tasks.find((task) => task.state === "ACTIVE") ??
    displayMilestone.tasks.find((task) => task.state !== "COMPLETE");

  const selectedCompletedTasks = selectedMilestone.tasks.filter(taskIsFinalClosed).length;
  const selectedCompletedHours = selectedMilestone.completedHours ?? selectedMilestone.tasks
    .filter(taskIsFinalClosed)
    .reduce((sum, task) => sum + task.hours, 0);
  const selectedProgress = selectedMilestone.hours ? (selectedCompletedHours / selectedMilestone.hours) * 100 : 0;
  const selectedIsActive = Boolean(activeMilestone && selectedMilestone.id === activeMilestone.id);
  const selectedState = milestoneStateLabel(selectedMilestone, selectedIsActive);

  return (
    <article className="commandCard wbsCommand" id="wbs">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">WBS / effort</div>
          <h2>Tarefas principais do bloco e decomposição sob demanda</h2>
        </div>
        <div className="wbsTotals">
          <span><small>Concluído</small><strong>{wbs.forecastCompletedHours}h</strong></span>
          <span><small>Restante</small><strong>{wbs.forecastRemainingHours}h</strong></span>
          <span><small>Forecast</small><strong>{wbs.totalCriticalHours}h</strong></span>
        </div>
      </div>

      <div className="wbsTabs" role="region" aria-label={`Selecione um bloco do WBS ${project.name}`}>
        {wbs.milestones.map((milestone) => (
          <WbsMilestoneTab
            milestone={milestone}
            active={Boolean(activeMilestone && milestone.id === activeMilestone.id)}
            selected={milestone.id === selectedMilestone.id}
            totalHours={wbs.totalCriticalHours}
            onSelect={() => {
              setSelectedMilestoneId(milestone.id);
              setExpandedWbsTaskId(null);
            }}
            key={milestone.id}
          />
        ))}
      </div>

      <section className={`currentBlock selectedBlock ${selectedMilestone.state.toLowerCase()}`}>
        <div className="currentBlockHeader">
          <div>
            <span>{selectedIsActive ? "Bloco atual" : selectedMilestone.id === displayMilestone.id ? "Próximo / bloco focal" : "Bloco selecionado"}</span>
            <h3>{selectedMilestone.id}</h3>
            <strong>{selectedMilestone.label}</strong>
          </div>
          <div className="selectedBlockStatus">
            <span className={`statusPill ${selectedMilestone.state.toLowerCase()}`}>{selectedState.toUpperCase()}</span>
            {!selectedIsActive ? <small>{activeMilestone ? `Bloco operacional atual: ${activeMilestone.id}` : `Nenhum bloco com execução ativa · próximo/focal: ${displayMilestone.id}`}</small> : null}
          </div>
        </div>

        <div className="selectedBlockProgressMeta">
          <span>{selectedCompletedHours}h / {selectedMilestone.hours}h · {selectedCompletedTasks}/{selectedMilestone.tasks.length} tarefas-mãe final-fechadas</span>
          <strong>{selectedProgress.toFixed(1)}%{selectedMilestone.effortSource === "MIXED_ESTIMATE" ? " EST." : ""}</strong>
        </div>
        <div className="currentBlockProgress" aria-label={`${selectedProgress.toFixed(1)}% do esforço do bloco selecionado concluído`}>
          <span style={{ width: `${Math.min(100, Math.max(0, selectedProgress))}%` }} />
        </div>

        <div className="selectedBlockListLabel">
          <span>Nível principal</span>
          <strong>{selectedMilestone.tasks.length} tarefas-mãe · subtarefas recolhidas por padrão</strong>
        </div>
        <ul className="focusTaskList selectedTaskList">
          {selectedMilestone.tasks.map((task) => (
            <WbsFocusTask
              project={project}
              task={task}
              focusId={selectedMilestone.id === displayMilestone.id ? focusTask?.id : undefined}
              expanded={expandedWbsTaskId === task.id}
              onToggleDecomposition={() => {
                if (!findTaskDecomposition(project, task.id)) return;
                setExpandedWbsTaskId((current) => current === task.id ? null : task.id);
              }}
              key={task.id}
            />
          ))}
        </ul>
      </section>

      <div className="wbsFootnote">
        {wbs.note} · {wbs.effortSemantics}. Regra: filhos canônicos aparecem apenas por expansão manual; o Workspace não cria tarefas, horas, estado ou autorização.
      </div>
    </article>
  );
}

function RisksCard({ project }: { project: ConnectedProject }) {
  const issues = project.issues ?? [];
  const currentRestrictions = project.currentRestrictions ?? [];
  if (!issues.length) {
    const blockers = project.blockers ?? [];
    return (
      <article className="commandCard risksCard" id="risks">
        <div className="cardHeading compact"><div><div className="eyebrow">Problemas / restrições</div><h2>{blockers.length} abertos no snapshot</h2></div><span className="countBadge">{blockers.length}</span></div>
        <ul className="riskList">{blockers.map((blocker, index) => <li key={blocker}><span className="riskIndex">{String(index + 1).padStart(2, "0")}</span><span>{blocker}</span></li>)}</ul>
      </article>
    );
  }

  const currentBlockers = issues.filter((issue) => issue.class === "BLOCKING" || issue.class === "REQUIRED_CURRENT");
  const groups = [
    { key: "current", label: "Restrições materiais atuais", items: currentRestrictions },
    { key: "blockers", label: "Bloqueios / requisitos atuais", items: currentBlockers },
    { key: "residuals", label: "Riscos / residuais", items: issues.filter((issue) => issue.class === "RESIDUAL") },
    { key: "deferred", label: "Evidências deferred", items: issues.filter((issue) => issue.class === "DEFERRED_EVIDENCE") },
    { key: "gates", label: "Gates de programa", items: issues.filter((issue) => issue.class === "FUTURE_GATE" || issue.class === "SECURITY_GATE") }
  ];

  return (
    <article className="commandCard risksCard typedRisksCard" id="risks">
      <div className="cardHeading compact">
        <div><div className="eyebrow">Problemas / restrições</div><h2>{currentBlockers.length} requisitos atuais · {issues.filter((issue) => issue.class === "RESIDUAL").length} residuais</h2><small className="riskFreshness">Snapshot reconciliado com {project.observedAt}</small></div>
        <span className="countBadge">{issues.length}</span>
      </div>
      <div className="issueSummaryGrid">
        {groups.map((group) => (
          <section className={`issueGroup ${group.key}`} key={group.key}>
            <div className="issueGroupHeader"><strong>{group.label}</strong><span>{group.items.length}</span></div>
            {group.items.length ? (
              <ul className="issueList">
                {group.items.map((issue) => <li key={`${group.key}-${issue.id}`}><div className="issueLine"><strong>{issue.label}</strong><span>{issue.state}</span></div><small>{issue.scope} · {issue.id} · {issue.source} · validado {issue.lastValidatedAt}</small></li>)}
              </ul>
            ) : <p className="issueEmpty">Nenhum item nesta classe.</p>}
          </section>
        ))}
      </div>
      <div className="riskSource"><span>Proveniência</span><strong>{project.repository}</strong><code>{project.observedSha}</code></div>
    </article>
  );
}

function EvidenceCard({ project }: { project: ConnectedProject }) {
  return (
    <article className="commandCard evidenceCard" id="evidence">
      <div className="sectionHeader"><div><div className="eyebrow">Evidência & proveniência</div><h2>Fonte que sustenta este painel</h2></div><span className="statusPill verified">SNAPSHOT</span></div>
      <div className="evidenceGrid">
        <div><span>Repositório</span><strong>{project.repository}</strong></div>
        <div><span>SHA observado</span><code>{project.observedSha}</code></div>
        <div><span>Verificação</span><strong>{project.verification}</strong></div>
        <div><span>Observado em</span><strong>{project.observedAt}</strong></div>
        <div><span>Programa</span><strong>{project.programId ?? "Não informado"}</strong></div>
        <div><span>Transporte SES</span><strong>{project.specialistTransport ?? "Separado deste read model"}</strong></div>
      </div>
      {project.objective ? <div className="evidenceBoundaryCompact"><span>Objetivo preservado</span><strong>{project.objective}</strong><small>{project.objectiveSource}</small></div> : null}
      {project.evidenceBoundary ? <div className="evidenceBoundaryCompact"><span>Boundary de evidência</span><strong>{project.evidenceBoundary}</strong></div> : null}
      {project.sourceRefs?.length ? <div className="riskSource"><span>Entrypoints consumidos</span><strong>{project.sourceRefs.join(" · ")}</strong></div> : null}
    </article>
  );
}

function GenericProjectStructure({ project }: { project: ConnectedProject }) {
  return (
    <article className="commandCard unavailableWbs" id="wbs">
      <div className="emptyStateIcon" aria-hidden="true">⌁</div>
      <div><div className="eyebrow">WBS</div><h2>Estrutura granular não disponível neste snapshot</h2><p>O Workspace não inventa percentual, milestones ou tarefas quando o projeto não publica essa estrutura.</p><strong>{project.repository}</strong></div>
    </article>
  );
}

function ProjectDashboard({ project }: { project: ConnectedProject }) {
  return (
    <>
      <NextActionCard project={project} />
      {project.projectId === "fechai" ? <IntegrityStrip /> : null}
      {project.wbs ? <WbsCommandCenter project={project} wbs={project.wbs} /> : <GenericProjectStructure project={project} />}
      <RisksCard project={project} />
      <EvidenceCard project={project} />
    </>
  );
}

export function ProjectAgnosticWorkspaceHome() {
  const initialProject = connectedProjects[0];
  const [selectedProjectName, setSelectedProjectName] = useState(initialProject.name);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const selectedProject = connectedProjects.find((project) => project.name === selectedProjectName) ?? initialProject;

  const closeMobileMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  useEffect(() => {
    const closeDrawerOnDesktop = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) closeMobileMenu();
    };
    window.addEventListener("resize", closeDrawerOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    closeDrawerOnDesktop();
    return () => {
      window.removeEventListener("resize", closeDrawerOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div className="workspaceShell">
      <Sidebar
        open={menuOpen}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProjectName}
        onClose={closeMobileMenu}
      />
      <main className="commandMain" inert={menuOpen ? true : undefined}>
        <ProjectHeader project={selectedProject} onMenu={() => setMenuOpen(true)} menuButtonRef={menuButtonRef} />
        <ProjectDashboard project={selectedProject} />
        <footer className="commandFooter">
          <span>SFJM Workspace · visão operacional multi-projeto</span>
          <span>Projetos publicam a verdade; Workspace consome e renderiza snapshots com proveniência.</span>
        </footer>
      </main>
    </div>
  );
}
