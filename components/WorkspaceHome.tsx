"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExternalProject,
  type WbsMilestone,
  type WbsTask
} from "@/data/workspace-demo";

const FECHAI = "FECH.AI";

function taskStateLabel(task: WbsTask, isFocus: boolean) {
  if (task.state === "COMPLETE") return "Concluída";
  if (isFocus) return "Próximo gate";
  if (task.state === "PARKED") return "Backlog";
  if (task.state === "ACTIVE") return "Em execução";
  return "Planejada";
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

function ProjectHeader({ project, onMenu }: { project: ExternalProject; onMenu: () => void }) {
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
          <button className="mobileMenu" type="button" onClick={onMenu} aria-label="Abrir menu de projetos">☰</button>
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

function NextActionCard({ project }: { project: ExternalProject }) {
  const isFechai = project.name === FECHAI;
  const program = workspaceDemo.fechaiProgram;
  const activeMilestone = workspaceDemo.fechaiWbs.milestones.find((milestone) => milestone.state === "ACTIVE");
  const activeTasks: WbsTask[] = activeMilestone?.tasks ?? [];
  const focusTask = activeTasks.find((task) => task.note?.includes("NEXT GATE")) ??
    activeTasks.find((task) => task.state !== "COMPLETE");
  const requiredRoutes = program.specialistRouting.filter((route) => route.requirement === "REQUIRED");
  const conditionalRoute = program.specialistRouting.find((route) => route.requirement === "CONDITIONAL");

  return (
    <article className="commandCard nextActionCard" id="next-action">
      <div className="cardHeading">
        <div>
          <div className="eyebrow">Próxima ação segura</div>
          <h2>{isFechai && focusTask ? focusTask.label : project.nextSafeAction}</h2>
        </div>
        <span className="statusPill next">NEXT</span>
      </div>

      {isFechai && focusTask && activeMilestone ? (
        <>
          <p className="safeSequence">{program.nextSafeAction}</p>
          <div className="actionFacts">
            <div><span>Bloco</span><strong>{activeMilestone.id}</strong></div>
            <div><span>Tarefa</span><strong>{focusTask.id} · {focusTask.hours}h</strong></div>
            <div><span>Situação</span><strong>{taskStateLabel(focusTask, true)}</strong></div>
            <div>
              <span>Sequência de especialistas</span>
              <strong>{requiredRoutes.map((route) => route.targetName).join(" → ")}</strong>
            </div>
          </div>
          <div className="actionFooter actionFooterStack">
            <div>
              <span className="manualChip">MANUAL COPY/PASTE</span>
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

function WbsFocusTask({ task, focusId }: { task: WbsTask; focusId?: string }) {
  const isFocus = task.id === focusId;
  return (
    <li className={`focusTask ${task.state.toLowerCase()} ${isFocus ? "focus" : ""}`}>
      <span className="taskStateIcon" aria-hidden="true">
        {task.state === "COMPLETE" ? "✓" : isFocus ? "▶" : "○"}
      </span>
      <div>
        <div className="taskTitleLine">
          <span>{task.id}</span>
          <strong>{task.label}</strong>
        </div>
        <small>{taskStateLabel(task, isFocus)}{task.note ? ` · ${task.note}` : ""}</small>
      </div>
      <b>{task.hours}h</b>
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

function WbsCommandCenter() {
  const wbs = workspaceDemo.fechaiWbs;
  const activeMilestone =
    wbs.milestones.find((milestone) => milestone.state === "ACTIVE") ??
    wbs.milestones[0];

  const [selectedMilestoneId, setSelectedMilestoneId] = useState(activeMilestone.id);

  const selectedMilestone =
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
        : "PLANEJADO";

  const selectedFocusId = selectedIsActive ? focusTask?.id : undefined;

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
          {selectedMilestone.tasks.map((task) => (
            <WbsFocusTask task={task} focusId={selectedFocusId} key={task.id} />
          ))}
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
      {isFechai ? <WbsCommandCenter /> : <GenericProjectStructure project={project} />}
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
        onClose={() => setMenuOpen(false)}
      />
      <main className="commandMain" inert={menuOpen ? true : undefined}>
        <ProjectHeader project={selectedProject} onMenu={() => setMenuOpen(true)} />
        <ProjectDashboard project={selectedProject} />
        <footer className="commandFooter">
          <span>SFJM Workspace · visão operacional multi-projeto</span>
          <span>Dados apresentados somente quando sustentados pelo snapshot canônico disponível.</span>
        </footer>
      </main>
    </div>
  );
}
