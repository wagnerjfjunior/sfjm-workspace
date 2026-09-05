"use client";

import { useMemo, useState } from "react";
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
      <aside className={`commandSidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div>
            <div className="brandTitle">SFJM</div>
            <div className="brandSub">Workspace</div>
          </div>
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
                    <a href="#risks">Problemas</a>
                    {selectedIsFechai ? <a href="#wbs">WBS</a> : <span>WBS · indisponível</span>}
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
      {open ? <button className="sidebarBackdrop" type="button" aria-label="Fechar menu" onClick={onClose} /> : null}
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
            <div className="eyebrow">Dashboard operacional</div>
            <h1>{project.name}</h1>
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
          <strong>{isFechai ? "STS-M2 · STARTED" : project.continuityState}</strong>
          <small>{isFechai ? "M2-04 é o próximo gate · ainda não iniciado" : "Snapshot manual do projeto"}</small>
        </div>
        <div className="heroMetric progressMetric">
          <span>Concluído</span>
          <strong>{isFechai ? `${wbsPercent.toFixed(1)}%` : "—"}</strong>
          <small>{isFechai ? `${completedHours}h de ${criticalHours}h do WBS crítico` : "Sem WBS canônica suficiente no snapshot"}</small>
        </div>
        <div className="heroMetric">
          <span>Bloco atual</span>
          <strong>{isFechai ? workspaceDemo.fechaiWbs.currentPackage : "Não modelado"}</strong>
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
  const activeMilestone = workspaceDemo.fechaiWbs.milestones.find((milestone) => milestone.state === "ACTIVE");
  const focusTask = activeMilestone?.tasks.find((task) => task.note?.includes("NEXT GATE")) ??
    activeMilestone?.tasks.find((task) => task.state !== "COMPLETE");
  const primaryRoute = workspaceDemo.fechaiProgram.specialistRouting.find((route) => route.requirement === "REQUIRED");

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
        <div className="actionFacts">
          <div><span>Bloco</span><strong>{activeMilestone.id}</strong></div>
          <div><span>Tarefa</span><strong>{focusTask.id} · {focusTask.hours}h</strong></div>
          <div><span>Situação</span><strong>Next gate / not started</strong></div>
          <div><span>Destino</span><strong>{primaryRoute?.targetName ?? "Manual"}</strong></div>
        </div>
      ) : (
        <div className="genericActionText">{project.nextSafeAction}</div>
      )}

      <div className="actionFooter">
        <span className="manualChip">MANUAL COPY/PASTE</span>
        <span>{isFechai ? "Workspace indica o destino; não executa automaticamente." : project.verification}</span>
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

function ExecutiveMap() {
  const milestones = workspaceDemo.fechaiWbs.milestones;
  return (
    <article className="commandCard executiveMap" id="roadmap">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Mapa executivo</div>
          <h2>Onde estamos no caminho completo</h2>
        </div>
        <div className="legend" aria-label="Legenda de estados">
          <span><i className="legendDot complete" />Concluído</span>
          <span><i className="legendDot active" />Atual</span>
          <span><i className="legendDot planned" />Próximo</span>
        </div>
      </div>
      <div className="roadmapRail" tabIndex={0} role="region" aria-label="Mapa executivo STS-M0 a STS-M6">
        {milestones.map((milestone, index) => {
          const done = milestone.tasks.filter((task) => task.state === "COMPLETE").length;
          return (
            <div className={`roadmapNode ${milestone.state.toLowerCase()}`} key={milestone.id}>
              <div className="roadmapNodeTop">
                <span>{milestone.id}</span>
                <b>{done}/{milestone.tasks.length}</b>
              </div>
              <strong>{milestone.label}</strong>
              <small>{milestone.hours}h</small>
              <div className="roadmapMiniTrack">
                <span style={{ width: `${(done / milestone.tasks.length) * 100}%` }} />
              </div>
              {index < milestones.length - 1 ? <i className="roadmapConnector" aria-hidden="true" /> : null}
            </div>
          );
        })}
      </div>
    </article>
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

function WbsMilestoneTab({ milestone, active }: { milestone: WbsMilestone; active: boolean }) {
  const completed = milestone.tasks.filter((task) => task.state === "COMPLETE").length;
  return (
    <div className={`wbsMilestoneTab ${milestone.state.toLowerCase()} ${active ? "selected" : ""}`}>
      <div>
        <span>{milestone.id}</span>
        <b>{milestone.hours}h</b>
      </div>
      <strong>{milestone.label}</strong>
      <small>{completed}/{milestone.tasks.length} tarefas concluídas</small>
    </div>
  );
}

function WbsCommandCenter() {
  const wbs = workspaceDemo.fechaiWbs;
  const activeMilestone = wbs.milestones.find((milestone) => milestone.state === "ACTIVE") ?? wbs.milestones[0];
  const focusTask = activeMilestone.tasks.find((task) => task.note?.includes("NEXT GATE")) ??
    activeMilestone.tasks.find((task) => task.state !== "COMPLETE");
  const completedHours = wbs.milestones.reduce(
    (total, milestone) => total + milestone.tasks.filter((task) => task.state === "COMPLETE").reduce((sum, task) => sum + task.hours, 0),
    0
  );
  const remaining = wbs.totalCriticalHours - completedHours;

  return (
    <article className="commandCard wbsCommand" id="wbs">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">WBS / effort</div>
          <h2>Bloco atual, tarefa seguinte e caminho futuro</h2>
        </div>
        <div className="wbsTotals">
          <span><small>Concluído</small><strong>{completedHours}h</strong></span>
          <span><small>Restante</small><strong>{remaining}h</strong></span>
          <span><small>Total</small><strong>{wbs.totalCriticalHours}h</strong></span>
        </div>
      </div>

      <div className="wbsTabs" tabIndex={0} role="region" aria-label="Blocos do WBS STS-M0 a STS-M6">
        {wbs.milestones.map((milestone) => (
          <WbsMilestoneTab milestone={milestone} active={milestone.id === activeMilestone.id} key={milestone.id} />
        ))}
      </div>

      <div className="wbsFocusGrid">
        <section className="currentBlock">
          <div className="currentBlockHeader">
            <div>
              <span>Bloco atual</span>
              <h3>{activeMilestone.id}</h3>
              <strong>{activeMilestone.label}</strong>
            </div>
            <span className="statusPill active">ACTIVE</span>
          </div>
          <div className="currentBlockProgress">
            <span style={{ width: `${(activeMilestone.tasks.filter((task) => task.state === "COMPLETE").length / activeMilestone.tasks.length) * 100}%` }} />
          </div>
          <ul className="focusTaskList">
            {activeMilestone.tasks.map((task) => <WbsFocusTask task={task} focusId={focusTask?.id} key={task.id} />)}
          </ul>
        </section>

        <aside className="nextBlocks">
          <div className="nextBlocksHeader">
            <span>Próximos blocos</span>
            <strong>Visão futura preservada</strong>
          </div>
          {wbs.milestones.filter((milestone) => milestone.state === "PLANNED").map((milestone) => (
            <div className="nextBlockRow" key={milestone.id}>
              <span>{milestone.id}</span>
              <div>
                <strong>{milestone.label}</strong>
                <small>{milestone.tasks.length} tarefas · {milestone.hours}h</small>
              </div>
              <b>○</b>
            </div>
          ))}
        </aside>
      </div>
      <div className="wbsFootnote">Planejamento estrutural: horas não são timesheet, confiança ou Security Go.</div>
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
        <div><span>Handoff</span><strong>{isFechai ? workspaceDemo.fechaiProgram.specialistTransport : "Snapshot manual"}</strong></div>
      </div>
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
      <div className="topGrid">
        <NextActionCard project={project} />
        <RisksCard project={project} />
      </div>
      {isFechai ? <IntegrityStrip /> : null}
      {isFechai ? <ExecutiveMap /> : null}
      {isFechai ? <WbsCommandCenter /> : <GenericProjectStructure project={project} />}
      <EvidenceCard project={project} />
    </>
  );
}

export function WorkspaceHome() {
  const initialProject = workspaceDemo.externalProjects.find((project) => project.name === FECHAI) ?? workspaceDemo.externalProjects[0];
  const [selectedProjectName, setSelectedProjectName] = useState(initialProject.name);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedProject = useMemo(
    () => workspaceDemo.externalProjects.find((project) => project.name === selectedProjectName) ?? initialProject,
    [selectedProjectName, initialProject]
  );

  return (
    <div className="workspaceShell">
      <Sidebar
        open={menuOpen}
        selectedProject={selectedProject.name}
        onSelectProject={setSelectedProjectName}
        onClose={() => setMenuOpen(false)}
      />
      <main className="commandMain">
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
