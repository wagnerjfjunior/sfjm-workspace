import { workspaceDemo } from "@/data/workspace-demo";

const LIVE_MAIN = "ba2a70c793e6879d28192fda4730f950ec6cc68d";

const project = workspaceDemo.externalProjects.find((item) => item.name === "MoreNumTegra");

if (project) {
  project.continuityState = "MNT-M2-09 COMPLETE / MNT-M2 ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION";
  project.nextSafeAction = "Obter autorização explícita da Product Authority antes de iniciar MNT-M2-10 — Execute end-to-end Measurement QA. A autorização é bounded a QA/evidência e não autoriza automaticamente novas mutações GTM/GA4/Meta/Ads/Green/DNS/Vercel.";
  project.blockers = [
    "MNT-M2-10 está PLANNED / EXECUTION_NOT_AUTHORIZED",
    "Full end-to-end Measurement QA ainda não foi executado/aceito",
    "Meta Dataset/Pixel runtime identifiers permanecem não provados e Meta runtime não implementado",
    "Vercel Production homologation permanece manual e não está provada atualizada para o último main"
  ];
  project.repository = "wagnerjfjunior/MoreNumTegra";
  project.observedSha = LIVE_MAIN;
  project.observedAt = "12 Sep 2026 · PR #53 merged · MNT-M2-09 canonical closure";
  project.verification = "Live main resolved at ba2a70c793e6… · CURRENT_PROGRAM_STATE / PROJECT_READ_MODEL / NEXT_SAFE_ACTION reconciled · MNT-M2-09 COMPLETE · 376h accepted / 864h remaining / 30.32% · MNT-M2-10 next and not authorized";
}
