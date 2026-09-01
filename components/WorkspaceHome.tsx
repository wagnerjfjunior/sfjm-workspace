"use client";

import { useState } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExecutionItem,
  type ExternalProject,
  type ProgramMilestone,
  type SourceRow,
  type TimelineItem
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

  return (
    <article className="panel statePanel" id="continue">
      <div>
        <div className="eyebrow">Estado de continuidade</div>
        <div className="stateTitle">
          <div className="shield">✓</div>
          <h2>M1 CONCLUÍDO · B4 APLICADO · M2 PLANEJADO</h2>
        </div>
        <p>
          O trabalho atual não substitui o programa. B4 já foi mergeado e aplicado com exact READ_ONLY catalog proof PASS;
          o fechamento pós-aplicação ainda está pendente, enquanto o futuro M2–M6 continua visível.
        </p>
        <div className="checks">
          {workspaceDemo.checks.map((item) => (
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
        <h3>Fechar a etapa pós-aplicação do B4</h3>
        <p className="muted">
          A implementação tenant-safe de visibilidade de listas já foi mergeada e aplicada.
          Agora falta a adjudicação pós-aplicação e a reconciliação canônica, sem confundir isso com M2.
        </p>
        <div className="metaRow">
          <div className="meta">
            Último milestone
            <strong>{program.lastCompletedMilestone}</strong>
          </div>
          <div className="meta">
            Workstream atual
            <strong>B4 pós-aplicação</strong>
          </div>
          <div className="meta">
            Próximo milestone
            <strong>M2</strong>
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

function ExecutionCard({ item }: { item: ExecutionItem }) {
  return (
    <div className={`executionCard ${item.state.toLowerCase()}`}>
      <div className="executionTop">
        <span className="executionId">{item.id}</span>
        <span className={`runbookState ${item.state.toLowerCase()}`}>{item.state}</span>
      </div>
      <strong>{item.label}</strong>
      <span className="executionCategory">{item.category}</span>
      <p>{item.evidence}</p>
      <small>{item.owner}</small>
      <div className="executionNext">{item.nextAction}</div>
    </div>
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
  return (
    <section className={`executionLane ${laneClass}`}>
      <div className="executionLaneHeader">
        <div>
          <span>{title}</span>
          <small>{helper}</small>
        </div>
        <b>{items.length}</b>
      </div>
      <div className="executionItems">
        {items.map((item) => <ExecutionCard item={item} key={item.id} />)}
      </div>
    </section>
  );
}

function FechaiExecutionBoard() {
  const program = workspaceDemo.fechaiProgram;

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
          items={program.future}
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
        {events.map((item, index) => (
          <div className={`step ${index === events.length - 1 ? "current" : ""}`} key={`${item.date}-${item.text}`}>
            <div className="stepDot">{index === events.length - 1 ? "●" : "✓"}</div>
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
              <FechaiExecutionBoard />
              <ExternalProjects />
              <article className="panel footer">
                <span>SFJM preserva plano, jornada e continuidade; FECH.AI permanece autoridade sobre a verdade.</span>
                <a href="#fechai-program">Abrir Roadmap →</a>
              </article>
            </section>

            <aside className="stack right">
              <SideCard title="Posição no programa" rows={workspaceDemo.currentState} />
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
