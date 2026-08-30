"use client";

import { useState } from "react";
import {
  calculateAcceptedProgramProgress,
  workspaceDemo,
  type ExternalProject,
  type ProgramMilestone,
  type RunbookItem,
  type SourceRow
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
        ● Dashboard unificado
        <br />
        <span className="muted">Snapshots manuais · {workspaceDemo.searchPortfolio.observedAt}</span>
      </div>
    </aside>
  );
}

function ContinuityState() {
  const progress = calculateAcceptedProgramProgress(workspaceDemo.fechaiProgram.milestones);

  return (
    <article className="panel statePanel" id="continue">
      <div>
        <div className="eyebrow">Estado de continuidade</div>
        <div className="stateTitle">
          <div className="shield">✓</div>
          <h2>M1 ASSUMIDO</h2>
        </div>
        <p>M0 foi encerrado no FECH.AI e o Security Truth Baseline é o milestone ativo. O Workspace representa um snapshot manual, não sincronização live.</p>
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
            <span>snapshot manual</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function NextSafeAction({ onContinue }: { onContinue: () => void }) {
  return (
    <article className="panel actionPanel">
      <div className="actionArt">
        <div className="target" />
      </div>
      <div className="actionContent">
        <div className="eyebrow">Próxima ação segura</div>
        <h3>Executar M1-A em modo READ_ONLY</h3>
        <p className="muted">
          Cruzar LIVE DB × GitHub main × migration ledger e estabelecer a superfície privilegiada realmente aplicada antes de qualquer simplificação.
        </p>
        <div className="metaRow">
          <div className="meta">
            Escopo
            <strong>Security Truth Baseline</strong>
          </div>
          <div className="meta">
            Estado
            <strong>M1 ativo</strong>
          </div>
          <div className="meta">
            Mutação
            <strong>Bloqueada</strong>
          </div>
        </div>
        <button className="primary" onClick={onContinue}>▶ VER BOUNDARY</button>
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
          <div className="eyebrow">Macro Roadmap / Executive View</div>
          <h3>{program.name}</h3>
        </div>
        <span className="manualBadge">MANUAL · {program.observedAt}</span>
      </div>

      <div className="programSummary">
        <div>
          <span>Progresso ponderado</span>
          <strong>{progress.toFixed(2)}%</strong>
          <small>{program.weightingBasis}</small>
        </div>
        <div>
          <span>Milestone atual</span>
          <strong>{program.currentMilestone}</strong>
          <small>{program.programIssue} · {program.repository}</small>
        </div>
        <div>
          <span>Security Go</span>
          <strong className="dangerText">{program.securityGo}</strong>
          <small>Comercialização ampla: {program.commercialization}</small>
        </div>
        <div>
          <span>Fonte observada</span>
          <code>{program.observedSha}</code>
          <small>{program.invalidatesOn}</small>
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

function SearchPortfolio() {
  const search = workspaceDemo.searchPortfolio;

  return (
    <article className="panel panelInner programPanel" id="search-portfolio">
      <div className="sectionTitle programTitle">
        <div>
          <div className="eyebrow">Search / SEO consolidado</div>
          <h3>MoreNumTegra + Search Provider</h3>
        </div>
        <span className="manualBadge">MANUAL · {search.observedAt}</span>
      </div>

      <div className="programSummary">
        <div>
          <span>Consumer</span>
          <strong>{search.consumer}</strong>
          <code>{search.consumerObservedSha}</code>
        </div>
        <div>
          <span>Release publicada</span>
          <code>{search.releaseSha}</code>
          <small>{search.consumerRepository}</small>
        </div>
        <div>
          <span>Provider Search</span>
          <strong>{search.provider}</strong>
          <code>{search.providerObservedSha}</code>
        </div>
        <div>
          <span>Estado consolidado</span>
          <strong>{search.status}</strong>
          <small>{search.nextAction}</small>
        </div>
      </div>

      <div className="evidenceBoundary">
        {search.providerResult}
      </div>

      <div className="projectGrid">
        <div>
          <span>Search / indexabilidade</span>
          <ul>
            {search.searchState.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <span>Measurement / aquisição</span>
          <ul>
            {search.measurementState.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="projectAction">
        <span>Fronteira de consolidação</span>
        <strong>{search.boundaries.join(" · ")}</strong>
      </div>
    </article>
  );
}

function RunbookRow({ item }: { item: RunbookItem }) {
  return (
    <tr>
      <th scope="row" data-label="ID">{item.id}</th>
      <td data-label="Tarefa / evidência">
        <strong>{item.task}</strong>
        <small>{item.evidence}</small>
      </td>
      <td data-label="Owner">{item.owner}</td>
      <td data-label="Estado"><span className={`runbookState ${item.state.toLowerCase()}`}>{item.state}</span></td>
      <td data-label="Próxima ação">{item.nextAction}</td>
    </tr>
  );
}

function FechaiRunbook() {
  return (
    <article className="panel panelInner runbookPanel" id="fechai-runbook">
      <div className="sectionTitle">
        <div>
          <div className="eyebrow">Operational Runbook View</div>
          <h3>M1 — Security Truth Baseline</h3>
        </div>
        <span className="manualBadge">READ_ONLY FIRST</span>
      </div>
      <div className="runbookScroll">
        <table className="runbookTable">
          <caption className="srOnly">Runbook operacional do M1 Security Truth Baseline</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tarefa / evidência</th>
              <th scope="col">Owner</th>
              <th scope="col">Estado</th>
              <th scope="col">Próxima ação</th>
            </tr>
          </thead>
          <tbody>
            {workspaceDemo.fechaiProgram.runbook.map((item) => <RunbookRow item={item} key={item.id} />)}
          </tbody>
        </table>
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
  return (
    <article className="panel panelInner" id="journey">
      <div className="sectionTitle">
        <h3>Visão da jornada</h3>
        <a href="#fechai-program">Ver programa →</a>
      </div>
      <div className="journey">
        {workspaceDemo.journey.map((item) => (
          <div className={`step ${item.current ? "current" : ""}`} key={item.label}>
            <div className="stepDot">{item.current ? "●" : "✓"}</div>
            <strong>{item.label}</strong>
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

function Timeline() {
  return (
    <article className="panel sideCard">
      <h3>Linha do tempo</h3>
      <div className="timeline">
        {workspaceDemo.timeline.map((item) => (
          <div className="timelineItem" key={`${item.date}-${item.text}`}>
            <small>{item.date}</small>
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
              <FechaiRunbook />
              <SearchPortfolio />
              <ExternalProjects />
              <article className="panel footer">
                <span>SFJM Workspace consolida a visão; projetos e providers permanecem autoridades sobre suas próprias fontes.</span>
                <a href="#search-portfolio">Abrir Search consolidado →</a>
              </article>
            </section>
            <aside className="stack right">
              <SideCard title="Estado atual" rows={workspaceDemo.currentState} />
              <SideCard title="Fontes canônicas" rows={workspaceDemo.sources} />
              <Timeline />
            </aside>
          </div>
        </main>
      </div>
      <div className={`modal ${modalOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!modalOpen}>
        <div className="modalCard">
          <h2>Boundary M1</h2>
          <p className="muted">
            M1-A é read-only. DDL/DML, migration apply, Supabase mutation, deploy, Auth/business-data mutation e Security Go permanecem bloqueados.
          </p>
          <div className="modalActions">
            <button className="secondary" onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
}
