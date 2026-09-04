"use client";

import { useState } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExecutionItem,
  type ExternalProject,
  type ProgramMilestone,
  type SourceRow,
  type TimelineItem,
  type WbsBacklog,
  type WbsMilestone,
  type WbsTask
} from "@/data/workspace-demo";

function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brandMark" />
        <div>
          <div className="brandTitle">SFJM</div>
          <div className="brandSub">Workspace</div>
        </div>
      </div>
      <nav className="nav">
        {workspaceDemo.nav.map((item) => (
          <a className={item.active ? "active" : ""} href={item.href} key={item.label}>
            <span>{item.icon}</span>
            <span>
              <strong>{item.label}</strong>
              <small>{item.helper}</small>
            </span>
          </a>
        ))}
      </nav>
      <div className="spacer" />
      <div className="profile">
        <strong>Wagner Fernandes</strong>
        <br />
        <span className="muted">Administrador</span>
      </div>
      <div className="sync">
        ● Snapshot manual
        <br />
        <span className="muted">FECH.AI · {workspaceDemo.fechaiProgram.observedAt}</span>
      </div>
    </aside>
  );
}

function ContinuityState() {
  const program = workspaceDemo.fechaiProgram;
  const progress = calculateAcceptedProgramProgress(program.milestones);
  const checks: SourceRow[] = [
    { label: "Último milestone", value: program.lastCompletedMilestone },
    { label: "Workstream atual", value: program.activeWorkstream },
    { label: "Próximo milestone", value: program.nextProgramMilestone },
    { label: "Próxima ação", value: program.nextSafeAction },
    { label: "Histórico", value: "Preservado" },
    { label: "Security Go", value: program.securityGo }
  ];

  return (
    <article className="panel statePanel" id="continue">
      <div>
        <div className="eyebrow">Estado de continuidade</div>
        <div className="stateTitle">
          <div className="shield">✓</div>
          <h2>{program.lastCompletedMilestone} · CONTINUIDADE ATIVA</h2>
        </div>
        <p>
          O trabalho atual é {program.activeWorkstream}. A próxima ação segura é {program.nextSafeAction}.
          O próximo milestone permanece {program.nextProgramMilestone}; histórico e futuro continuam preservados.
        </p>
        <div className="checks">
          {checks.map((item) => (
            <div className="check" key={item.label}>
              <strong>
                {item.label}
                <span className="ok">●</span>
              </strong>
              {item.value}
            </div>
          ))}
        </div>
      </div>
      <div className="confidence">
        <div
          className="ring programRing"
          style={{ background: `conic-gradient(var(--green) 0 ${progress * 3.6}deg,#172238 ${progress * 3.6}deg)` }}
        >
          <div className="ringContent">
            <strong>{progress.toFixed(2)}%</strong>
            <span>gates aceitos</span>
            <span>macro programa</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function NextSafeAction({ onContinue }: { onContinue: () => void }) {
  const program = workspaceDemo.fechaiProgram;

  return (
    <article className="panel actionPanel">
      <div className="actionArt">
        <div className="target" />
      </div>
      <div className="actionContent">
        <div className="eyebrow">Próxima ação segura</div>
        <h3>{program.nextSafeAction}</h3>
        <p className="muted">
          Workstream atual: {program.activeWorkstream}. Fonte observada: {program.repository} @ {program.observedSha}.
          O Workspace apenas representa essa continuidade; a autoridade continua no FECH.AI.
        </p>
        <div className="metaRow">
          <div className="meta">
            Último milestone
            <strong>{program.lastCompletedMilestone}</strong>
          </div>
          <div className="meta">
            Workstream atual
            <strong>{program.activeWorkstream}</strong>
          </div>
          <div className="meta">
            Próximo milestone
            <strong>{program.nextProgramMilestone}</strong>
          </div>
          <div className="meta">
            Mutação
            <strong>Nenhuma autorizada</strong>
          </div>
        </div>
        <button className="primary" onClick={onContinue}>▶ VER CONTINUIDADE</button>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: ExternalProject }) {
  return (
    <article className="projectCard">
      <div className="projectHeader">
        <div>
          <span className="projectKind">{project.kind}</span>
          <h4>{project.name}</h4>
        </div>
        <span className="projectState">{project.continuityState}</span>
      </div>
      <div className="projectAction">
        <span>Próxima ação segura observada</span>
        <strong>{project.nextSafeAction}</strong>
      </div>
      <div className="projectGrid">
        <div>
          <span>Bloqueios preservados</span>
          <ul>
            {project.blockers.map((blocker) => <li key={blocker}>{blocker}</li>)}
          </ul>
        </div>
        <div className="projectSource">
          <span>Fonte canônica externa</span>
          <strong>{project.repository}</strong>
          <code>{project.observedSha}</code>
          <small>{project.verification} · {project.observedAt}</small>
        </div>
      </div>
    </article>
  );
}

function ExternalProjects() {
  return (
    <article className="panel panelInner" id="projects">
      <div className="sectionTitle">
        <h3>Projetos para continuar</h3>
        <span className="manualBadge">Snapshots manuais</span>
      </div>
      <div className="projectList">
        {workspaceDemo.externalProjects.map((project) => <ProjectCard project={project} key={project.name} />)}
      </div>
    </article>
  );
}

function MilestoneCard({ milestone }: { milestone: ProgramMilestone }) {
  const contribution = milestone.weight * (milestone.acceptedPercent / 100);

  return (
    <div className={`milestoneCard ${milestone.status.toLowerCase()}`}>
      <div className="milestoneTop">
        <span className="milestoneId">{milestone.id}</span>
        <span className="milestoneStatus">{milestone.status}</span>
      </div>
      <strong>{milestone.label}</strong>
      <small>{milestone.window}</small>
      <div className="progressTrack" aria-label={`${milestone.id} ${milestone.acceptedPercent}% aceito`}>
        <div className="progressFill" style={{ width: `${milestone.acceptedPercent}%` }} />
      </div>
      <div className="milestoneMeta">
        <span>Peso <b>{milestone.weight}%</b></span>
        <span>Aceito <b>{milestone.acceptedPercent}%</b></span>
        <span>Contribui <b>{contribution.toFixed(2)}%</b></span>
      </div>
      <p>{milestone.exit}</p>
      <small>{milestone.owner}</small>
    </div>
  );
}

function FechaiProgramTracking() {
  const program = workspaceDemo.fechaiProgram;
  const progress = calculateAcceptedProgramProgress(program.milestones);

  return (
    <article className="panel panelInner programPanel" id="fechai-program">
      <div className="sectionTitle programTitle">
        <div>
          <div className="eyebrow">Macro Roadmap / plano preservado</div>
          <h3>{program.name}</h3>
        </div>
        <span className="manualBadge">MANUAL · {program.observedAt}</span>
      </div>

      <div className="programSummary continuitySummary">
        <div>
          <span>Progresso ponderado</span>
          <strong>{progress.toFixed(2)}%</strong>
          <small>{program.weightingBasis}</small>
        </div>
        <div>
          <span>Último milestone concluído</span>
          <strong>{program.lastCompletedMilestone}</strong>
          <small>Histórico preservado; não é substituído pelo workstream atual.</small>
        </div>
        <div>
          <span>Workstream ativo</span>
          <strong>{program.activeWorkstream}</strong>
          <small>{program.nextSafeAction}</small>
        </div>
        <div>
          <span>Próximo milestone do programa</span>
          <strong>{program.nextProgramMilestone}</strong>
          <small>O futuro permanece visível antes de começar.</small>
        </div>
        <div>
          <span>Security Go</span>
          <strong className="dangerText">{program.securityGo}</strong>
          <small>Comercialização ampla: {program.commercialization}</small>
        </div>
      </div>

      <div className="overallTrack" aria-label={`Progresso global ${progress}%`}>
        <div className="overallFill" style={{ width: `${progress}%` }} />
      </div>
      <div className="evidenceBoundary">{program.evidenceBoundary}</div>

      <div className="milestoneGrid">
        {program.milestones.map((milestone) => <MilestoneCard milestone={milestone} key={milestone.id} />)}
      </div>
    </article>
  );
}


function WbsTaskRow({ task }: { task: WbsTask }) {
  const stateLabel =
    task.state === "COMPLETE" ? "Concluída" :
    task.state === "ACTIVE" ? "Agora" :
    task.state === "PARKED" ? "Backlog" : "Planejada";

  return (
    <li className={`wbsTask ${task.state.toLowerCase()}`}>
      <span className="wbsTaskState" role="status">
        <span aria-hidden="true">{task.state === "COMPLETE" ? "✓" : task.state === "ACTIVE" ? "●" : "○"}</span>
        <span className="srOnly">{stateLabel}</span>
      </span>
      <div className="wbsTaskBody">
        <div className="wbsTaskTitle">
          <span>{task.id}</span>
          <strong>{task.label}</strong>
        </div>
        {task.note ? <small>{task.note}</small> : null}
      </div>
      <b>{task.hours}h</b>
    </li>
  );
}

function WbsMilestoneCard({
  milestone,
  totalHours
}: {
  milestone: WbsMilestone;
  totalHours: number;
}) {
  const effortShare = (milestone.hours / totalHours) * 100;
  const completedTaskHours = milestone.tasks
    .filter((task) => task.state === "COMPLETE")
    .reduce((total, task) => total + task.hours, 0);

  return (
    <section className={`wbsMilestone ${milestone.state.toLowerCase()}`} aria-labelledby={`wbs-${milestone.id}`}>
      <header className="wbsMilestoneHeader">
        <div>
          <div className="wbsMilestoneId">{milestone.id}</div>
          <h4 id={`wbs-${milestone.id}`}>{milestone.label}</h4>
        </div>
        <span className={`wbsMilestoneState ${milestone.state.toLowerCase()}`}>{milestone.state}</span>
      </header>
      <div className="wbsMilestoneNumbers">
        <div>
          <span>Esforço</span>
          <strong>{milestone.hours}h</strong>
        </div>
        <div>
          <span>% do objetivo final</span>
          <strong>{effortShare.toFixed(2)}%</strong>
        </div>
        <div>
          <span>Horas de tarefas concluídas</span>
          <strong>{completedTaskHours}h</strong>
        </div>
      </div>
      <ul className="wbsTasks">
        {milestone.tasks.map((task) => <WbsTaskRow task={task} key={task.id} />)}
      </ul>
    </section>
  );
}

function WbsBacklogCard({ backlog }: { backlog: WbsBacklog }) {
  const taskHours = backlog.tasks.reduce((total, task) => total + task.hours, 0);

  return (
    <section className="wbsBacklogCard" aria-labelledby={`wbs-backlog-${backlog.id}`}>
      <header>
        <div>
          <span>Backlog separado do caminho crítico</span>
          <h4 id={`wbs-backlog-${backlog.id}`}>{backlog.label}</h4>
        </div>
        <strong>{taskHours}h</strong>
      </header>
      <ul className="wbsTasks">
        {backlog.tasks.map((task) => <WbsTaskRow task={task} key={task.id} />)}
      </ul>
    </section>
  );
}

function FechaiWbsView() {
  const wbs = workspaceDemo.fechaiWbs;
  const computedCriticalHours = wbs.milestones.reduce((total, milestone) => total + milestone.hours, 0);
  const computedCompletedHours = wbs.milestones.reduce(
    (total, milestone) =>
      total + milestone.tasks
        .filter((task) => task.state === "COMPLETE")
        .reduce((taskTotal, task) => taskTotal + task.hours, 0),
    0
  );
  const computedRemaining = computedCriticalHours - computedCompletedHours;
  const preSecurityGoBacklogHours =
    wbs.backlogs.find((backlog) => backlog.id === "PRE_SECURITY_GO")?.tasks.reduce(
      (total, task) => total + task.hours,
      0
    ) ?? 0;
  const plannedBacklogHours =
    wbs.backlogs.find((backlog) => backlog.id === "PLANNED_FUTURE")?.tasks.reduce(
      (total, task) => total + task.hours,
      0
    ) ?? 0;

  return (
    <article className="panel panelInner wbsPanel" id="fechai-wbs">
      <div className="sectionTitle programTitle">
        <div>
          <div className="eyebrow">WBS / Effort View · visão complementar</div>
          <h3>FECH.AI — caminho crítico até o final</h3>
        </div>
        <span className="manualBadge">PLANNING BASELINE · NÃO É TIMESHEET</span>
      </div>

      <p className="wbsIntro">
        Esta view não substitui Roadmap, Continuidade ou Evidências. Ela mostra todas as tarefas descritas,
        suas horas estimadas e a participação de cada milestone no esforço total de {computedCriticalHours}h.
        Percentuais são exibidos somente em M0–M6.
      </p>

      <div className="wbsSummary">
        <div>
          <span>Status atual</span>
          <strong>{wbs.currentPackage}</strong>
          <small>{wbs.currentTask}</small>
        </div>
        <div>
          <span>Horas concluídas</span>
          <strong>{computedCompletedHours}h</strong>
          <small>Somente tarefas marcadas COMPLETE</small>
        </div>
        <div>
          <span>Restante no caminho crítico</span>
          <strong>{computedRemaining}h</strong>
          <small>Total crítico = {computedCriticalHours}h</small>
        </div>
        <div>
          <span>Backlog pré-Security-Go</span>
          <strong>{preSecurityGoBacklogHours}h</strong>
          <small>Fora do caminho crítico até classificação material</small>
        </div>
        <div>
          <span>Backlog planejado</span>
          <strong>{plannedBacklogHours}h</strong>
          <small>Futuro / não bloqueante</small>
        </div>
      </div>

      <div className="wbsBoundary">{wbs.note}</div>

      <div className="wbsMilestoneGrid" tabIndex={0} role="region" aria-label="Milestones M0 a M6 do caminho crítico">
        {wbs.milestones.map((milestone) => (
          <WbsMilestoneCard milestone={milestone} totalHours={computedCriticalHours} key={milestone.id} />
        ))}
      </div>

      <div className="wbsBacklogGrid">
        {wbs.backlogs.map((backlog) => <WbsBacklogCard backlog={backlog} key={backlog.id} />)}
      </div>
    </article>
  );
}

function ExecutionCard({ item }: { item: ExecutionItem }) {
  return (
    <li className={`executionCard ${item.state.toLowerCase()}`}>
      <div className="executionTop">
        <span className="executionId">{item.id}</span>
        <span className={`runbookState ${item.state.toLowerCase()}`}>{item.state}</span>
      </div>
      <strong>{item.label}</strong>
      <span className="executionCategory">{item.category}</span>
      <p>{item.evidence}</p>
      <small>{item.owner}</small>
      <div className="executionNext">{item.nextAction}</div>
    </li>
  );
}

function ExecutionLane({
  title,
  helper,
  items,
  laneClass
}: {
  title: string;
  helper: string;
  items: ExecutionItem[];
  laneClass: string;
}) {
  const headingId = `execution-${laneClass}-heading`;

  return (
    <section className={`executionLane ${laneClass}`} aria-labelledby={headingId}>
      <div className="executionLaneHeader">
        <div>
          <h4 id={headingId}>{title}</h4>
          <small>{helper}</small>
        </div>
        <b>{items.length}</b>
      </div>
      <ul className="executionItems">
        {items.map((item) => <ExecutionCard item={item} key={item.id} />)}
      </ul>
    </section>
  );
}

function FechaiExecutionBoard() {
  const program = workspaceDemo.fechaiProgram;
  const futureProgram = program.milestones
    .filter((milestone) => milestone.status === "PLANNED")
    .map<ExecutionItem>((milestone) => ({
      id: milestone.id,
      label: milestone.label,
      category: "PROGRAM",
      state: "PLANNED",
      owner: milestone.owner,
      evidence: `Milestone futuro definido no programa ${program.programIssue} · ${milestone.window}.`,
      nextAction: "Preservar como futuro até a transição canônica do programa."
    }));
  const futureItems = [...program.future, ...futureProgram];

  return (
    <article className="panel panelInner executionPanel" id="fechai-execution">
      <div className="sectionTitle programTitle">
        <div>
          <div className="eyebrow">Mapa operacional persistente</div>
          <h3>Histórico · Agora · Futuro</h3>
        </div>
        <span className="manualBadge">NÃO SOBRESCREVER O PASSADO</span>
      </div>
      <p className="executionIntro">
        Refresh altera a projeção atual, não apaga eventos concluídos nem tarefas planejadas.
        Remediações e milestones permanecem em trilhas separadas.
      </p>
      <div className="executionBoard">
        <ExecutionLane
          title="Histórico"
          helper="Gates e remediações já concluídos"
          items={program.history}
          laneClass="historyLane"
        />
        <ExecutionLane
          title="Agora"
          helper="Único workstream operacional em foco"
          items={program.active}
          laneClass="nowLane"
        />
        <ExecutionLane
          title="Futuro"
          helper="Findings pendentes + M2–M6 já conhecidos"
          items={futureItems}
          laneClass="futureLane"
        />
      </div>
    </article>
  );
}

function PreservedContexts() {
  return (
    <article className="panel panelInner">
      <div className="sectionTitle"><h3>Contextos preservados</h3></div>
      <div className="contexts">
        {workspaceDemo.contexts.map((item) => (
          <div className="contextCard" key={item.label}>
            <div className="contextIcon">{item.icon}</div>
            <strong>{item.label}</strong>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function JourneyOverview() {
  const events = workspaceDemo.fechaiProgram.eventLedger;

  return (
    <article className="panel panelInner" id="journey">
      <div className="sectionTitle">
        <h3>Visão da jornada · event ledger</h3>
        <a href="#fechai-execution">Ver execução →</a>
      </div>
      <div className="journey">
        {events.map((item) => (
          <div className="step" key={`${item.date}-${item.text}`}>
            <div className="stepDot">✓</div>
            <strong>{item.text}</strong>
            <small>{item.date}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function SideCard({ title, rows }: { title: string; rows: SourceRow[] }) {
  return (
    <article className="panel sideCard">
      <h3>{title}</h3>
      {rows.map((row) => (
        <div className="row" key={row.label}>
          <span>{row.label}</span>
          <span className={row.badge ? "badge" : ""}>{row.value}</span>
        </div>
      ))}
    </article>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <article className="panel sideCard">
      <h3>Linha do tempo preservada</h3>
      <div className="timeline">
        {[...items].reverse().map((item) => (
          <div className={`timelineItem timeline-${item.kind.toLowerCase()}`} key={`${item.date}-${item.text}`}>
            <small>{item.date} · {item.kind}</small>
            {item.text}
          </div>
        ))}
      </div>
    </article>
  );
}

export function WorkspaceHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const program = workspaceDemo.fechaiProgram;
  const currentState: SourceRow[] = [
    { label: "Último milestone concluído", value: program.lastCompletedMilestone },
    { label: "Próxima continuidade", value: program.activeWorkstream },
    { label: "Próximo milestone", value: program.nextProgramMilestone },
    { label: "Modelo temporal", value: "Passado + Agora + Futuro" }
  ];

  return (
    <>
      <div className="demoNotice">{workspaceDemo.notice}</div>
      <div className="app">
        <Sidebar open={menuOpen} />
        <main className="main">
          <header className="topbar">
            <div>
              <h1>Bom dia, Wagner.</h1>
              <p>De onde você precisa continuar hoje?</p>
            </div>
            <div className="tools">
              <button aria-label="Abrir menu" className="tool mobile" onClick={() => setMenuOpen((value) => !value)}>☰</button>
              <button aria-label="Buscar" className="tool">⌕</button>
              <button aria-label="Notificações" className="tool">♢</button>
              <button aria-label="Painel" className="tool">▤</button>
            </div>
          </header>

          <div className="layout">
            <section className="stack">
              <ContinuityState />
              <NextSafeAction onContinue={() => setModalOpen(true)} />
              <PreservedContexts />
              <JourneyOverview />
              <FechaiProgramTracking />
              <FechaiWbsView />
              <FechaiExecutionBoard />
              <ExternalProjects />
              <article className="panel footer">
                <span>SFJM preserva plano, jornada e continuidade; FECH.AI permanece autoridade sobre a verdade.</span>
                <a href="#fechai-program">Abrir Roadmap →</a>
              </article>
            </section>

            <aside className="stack right">
              <SideCard title="Posição no programa" rows={currentState} />
              <SideCard title="Fontes canônicas" rows={workspaceDemo.sources} />
              <Timeline items={program.eventLedger} />
            </aside>
          </div>
        </main>
      </div>

      <div className={`modal ${modalOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!modalOpen}>
        <div className="modalCard">
          <h2>Continuidade FECH.AI</h2>
          <p className="muted">
            Último milestone: {program.lastCompletedMilestone}. Workstream atual: {program.activeWorkstream}. Próxima ação: {program.nextSafeAction}.
            Próximo milestone: {program.nextProgramMilestone}. A ação atual não apaga nem substitui nenhuma dessas posições.
          </p>
          <div className="modalActions">
            <button className="secondary" onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
}
