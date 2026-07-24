"use client";

import { useState } from "react";
import { workspaceDemo, type ExternalProject, type SourceRow } from "@/data/workspace-demo";

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
        ● Estado verificado
        <br />
        <span className="muted">GitHub main · 24 Jul 2026</span>
      </div>
    </aside>
  );
}

function ContinuityState() {
  return (
    <article className="panel statePanel" id="continue">
      <div>
        <div className="eyebrow">Estado de continuidade</div>
        <div className="stateTitle">
          <div className="shield">✓</div>
          <h2>MIGRAÇÃO ASSUMIDA</h2>
        </div>
        <p>O Chat 2 assumiu o estado canônico e o Chat 1 foi aposentado após validação.</p>
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
        <div className="ring">
          <div className="ringContent">
            <strong>MAIN</strong>
            <span>Fonte canônica</span>
            <span>Verificada</span>
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
        <h3>Ajustar a densidade desktop da Home</h3>
        <p className="muted">
          Refinar espaçamentos e proporções para uso confortável em 100% de zoom, sem alterar a hierarquia aprovada.
        </p>
        <div className="metaRow">
          <div className="meta">
            Escopo
            <strong>CSS da Home</strong>
          </div>
          <div className="meta">
            Estado
            <strong>Aguardando autorização</strong>
          </div>
          <div className="meta">
            Integrações
            <strong>Não autorizadas</strong>
          </div>
        </div>
        <button className="primary" onClick={onContinue}>▶ REVISAR ESCOPO</button>
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
        <a href="#journey">Ver jornada completa →</a>
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
              <ExternalProjects />
              <PreservedContexts />
              <JourneyOverview />
              <article className="panel footer">
                <span>SFJM protege a continuidade cognitiva e operacional entre conversas de IA.</span>
                <a href="#continue">Saiba mais sobre o SFJM →</a>
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
          <h2>Escopo delimitado</h2>
          <p className="muted">O ajuste de densidade permanece bloqueado até autorização separada. Esta interação é demonstrativa.</p>
          <div className="modalActions">
            <button className="secondary" onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        </div>
      </div>
    </>
  );
}