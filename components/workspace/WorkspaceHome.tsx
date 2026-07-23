"use client";

import { useState } from "react";
import { workspaceDemo } from "@/data/workspace-demo";

const navItems = ["Continue", "Jornada", "Projetos", "Handoffs", "Evidências", "Auditorias", "Governança", "Configurações"];

export function WorkspaceHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const data = workspaceDemo;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand"><span className="brand-mark"/><div><strong>SFJM</strong><small>Workspace</small></div></div>
        <nav>{navItems.map((item, index) => <a key={item} className={index === 0 ? "active" : ""} href={index === 0 ? "#continue" : index === 1 ? "#journey" : "#"}><span>{index === 0 ? "▶" : "◇"}</span><strong>{item}</strong></a>)}</nav>
        <div className="sidebar-spacer"/>
        <div className="sidebar-card"><strong>{data.user.name}</strong><span>{data.user.role}</span></div>
        <div className="sidebar-card demo-note">Dados demonstrativos</div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div><h1>Bom dia, Wagner.</h1><p>De onde você precisa continuar hoje?</p></div><button className="icon-button mobile" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button></header>
        <div className="content-grid">
          <section className="stack">
            <article className="panel state-panel" id="continue"><div><div className="eyebrow">Estado de continuidade · demonstrativo</div><div className="state-title"><span className="shield">✓</span><h2>{data.continuity.status}</h2></div><p>{data.continuity.message}</p><div className="checks">{data.continuity.checks.map(check => <div className="check" key={check}><strong>{check}<span>●</span></strong>Válido</div>)}</div></div><div className="confidence"><div className="ring"><div><strong>{data.continuity.confidence}%</strong><span>DEMONSTRATIVO</span></div></div></div></article>
            <article className="panel action-panel"><div className="action-art"><div className="target"/></div><div className="action-content"><div className="eyebrow">Próxima ação segura · demonstrativa</div><h3>{data.nextAction.title}</h3><p>{data.nextAction.description}</p><div className="meta-row"><span>Tempo estimado<strong>{data.nextAction.estimate}</strong></span><span>Dependências<strong>{data.nextAction.dependencies}</strong></span><span>Bloqueios<strong>{data.nextAction.blockers}</strong></span></div><button className="primary" onClick={() => setModalOpen(true)}>▶ CONTINUAR AGORA</button></div></article>
            <article className="panel panel-inner"><div className="section-title"><h3>Contextos preservados</h3></div><div className="contexts">{data.contexts.map(([icon, label]) => <div className="context-card" key={label}><span>{icon}</span><strong>{label}</strong><b>100%</b></div>)}</div></article>
            <article className="panel panel-inner" id="journey"><div className="section-title"><h3>Visão da jornada</h3></div><div className="journey">{data.journey.map((step, index) => <div className={`step ${index === data.journey.length - 1 ? "current" : ""}`} key={step}><span>{index === data.journey.length - 1 ? "●" : "✓"}</span><strong>{step}</strong></div>)}</div></article>
            <article className="panel footer"><span>SFJM protege a continuidade cognitiva e operacional entre conversas de IA.</span><span>Protótipo frontend demonstrativo</span></article>
          </section>
          <aside className="stack right-column"><article className="panel side-card"><h3>Estado atual</h3><div className="row"><span>Fonte canônica</span><strong>GitHub Main</strong></div><div className="row"><span>Projeto ativo</span><strong>SFJM Workspace</strong></div></article><article className="panel side-card"><h3>Fontes canônicas</h3>{data.sources.map(source => <div className="row" key={source}><span>{source}</span><b className="badge">DEMO</b></div>)}</article><article className="panel side-card"><h3>Linha do tempo</h3><div className="timeline">{data.timeline.map(item => <div className="timeline-item" key={item}><small>19 Jul 2026</small>{item}</div>)}</div></article></aside>
        </div>
      </main>

      {modalOpen && <div className="modal" role="dialog" aria-modal="true"><div className="modal-card"><h2>Próxima ação iniciada</h2><p>Esta versão demonstra o fluxo principal sem backend.</p><button className="secondary" onClick={() => setModalOpen(false)}>Fechar</button></div></div>}
    </div>
  );
}
