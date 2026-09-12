import { workspaceDemo } from "@/data/workspace-demo";

const LIVE_MAIN = "70f2b77e93225b65a1972c12875c58bd7198be1d";

const project = workspaceDemo.externalProjects.find((item) => item.name === "MoreNumTegra");

if (project) {
  project.continuityState = "STATE INCONSISTENT · MNT-M2 structure/progress is published, but live main advanced through PR #52 while CURRENT_PROGRAM_STATE / NEXT_SAFE_ACTION still publish the earlier M2-09 lifecycle";
  project.nextSafeAction = "Reconcile MoreNumTegra lifecycle/read-model documents against live main before claiming a newer M2-09 accepted state. Workspace may render the published WBS structure and 352h / 28.39% overlay, but must not infer post-PR52 accepted hours or authorization.";
  project.blockers = [
    "Canonical lifecycle/read-model documents are stale relative to live main PR #52",
    "Do not infer post-PR52 accepted hours or M2-09 completion from commit text alone",
    "WBS hierarchy/hours remain consumable from project-published program structure",
    "Workspace is read-only and does not grant MoreNumTegra execution authority"
  ];
  project.repository = "wagnerjfjunior/MoreNumTegra";
  project.observedSha = LIVE_MAIN;
  project.observedAt = "12 Sep 2026 · live main after PR #52";
  project.verification = "Live main resolved at 70f2b77e… · WBS structure exists on main · CURRENT_PROGRAM_STATE/NEXT_SAFE_ACTION remain pre-PR52 and are rendered fail-closed as source-state drift";
}
