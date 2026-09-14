import { workspaceDemo } from "@/data/workspace-demo";

const LIVE_MAIN = "1626e808c03a4bf88bd11f31d1a9078b5b6c8dfe";

const project = workspaceDemo.externalProjects.find((item) => item.name === "MoreNumTegra");

if (project) {
  project.continuityState = "MNT-M4 ACTIVE / MNT-M4-05 IN_PROGRESS / AUTHORIZED — PR #69";
  project.nextSafeAction = "Concluir MNT-M4-05 — Factual JSON-LD expansion na PR #69, validar Preview/schema e consolidar a lógica no artefato JavaScript único da Green (`src-greenn/moretegra.js`). Parar em COMPLETE_CANDIDATE / PENDING_READY_MERGE salvo autorização específica de lifecycle. MNT-M4-06 não inicia por sequência automática.";
  project.blockers = [
    "MNT-M4-05 está em execução e ainda não é COMPLETE/ACCEPTED",
    "Ready e merge da PR #69 permanecem gates separados",
    "MNT-M4-06 não inicia por sequência automática",
    "A intervenção de runtime parity PR #75 foi encerrada e não altera a contabilidade do MNT-RESF",
    "Mudanças futuras em GTM/GA4/Meta/Ads/DNS/Search Console/Green/FECH.AI continuam fora deste gate salvo autorização específica"
  ];
  project.repository = "wagnerjfjunior/MoreNumTegra";
  project.observedSha = LIVE_MAIN;
  project.observedAt = "14 Sep 2026 · PR #76 canonicalized runtime parity closure · M4-05/PR #69 preserved as current safe action";
  project.verification = "Live main resolved at 1626e808c03a… · CURRENT_PROGRAM_STATE / PROJECT_READ_MODEL / handoffs/CURRENT / NEXT_SAFE_ACTION agree: M0-M3 COMPLETE, M4 ACTIVE, M4-01..04 COMPLETE, M4-05 IN_PROGRESS/AUTHORIZED · 640h accepted / 600h remaining / 51.61%";
}
