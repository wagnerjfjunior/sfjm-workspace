# SFJM Workspace — Project-Agnostic WBS Read Model v1

Status: `CANDIDATE_IN_PR` until merged to `main`  
Date: `2026-09-10`

## 1. Decision

SFJM Workspace must render any external project that publishes a compatible, project-owned WBS/read model without adding project-name-specific frontend branches.

The Workspace is a read-only derived visualization layer. Project repositories remain authoritative.

```text
PROJECT CANONICAL MAIN
  -> project-owned read model / current state / task graph
  -> bounded manual Workspace snapshot
  -> generic Workspace renderer
  -> dashboard + WBS + progress + risks + evidence
```

## 2. Not the SES Project Adapter

The SES Project Adapter is a separate mechanism for specialist routing, precedence and project context.

```text
SES Project Adapter != SFJM Workspace data feed
```

The Workspace connection layer must not use or redefine the SES Adapter as the source of WBS/state data.

## 3. Consumer shape

The generic renderer consumes a `ConnectedProject` containing, when available:

- project identity and repository;
- observed source SHA/time;
- continuity/current state;
- next safe action;
- objective/source;
- typed issues/restrictions;
- WBS snapshot;
- milestones;
- tasks;
- recursive project-published task decomposition;
- hours/progress semantics;
- provenance/source refs.

A project without WBS may still appear in the Workspace, but the UI must show WBS as unavailable instead of inventing structure or percentage.

## 4. WBS rendering rules

- top-level view shows milestones/phases;
- selecting a milestone shows immediate child tasks;
- recursive descendants remain collapsed by default;
- descendants expand only on explicit user action;
- parent and child hours are never double-counted;
- project-published hours/state/authorization have priority over Workspace inference;
- Workspace-only estimates, when used for a project such as FECH.AI, remain explicitly labeled estimates;
- `PLANNED`, `ACTIVE`, `COMPLETE`, `ELIGIBLE_NOT_AUTHORIZED`, `PLANNED_NOT_AUTHORIZED`, deferred authorization and rebaseline semantics remain distinguishable.

## 5. MoreNumTegra first project-owned read-model consumer

Initial canonical upstream consumed by this implementation:

`wagnerjfjunior/MoreNumTegra@347b62298d30ba3567a76d3f48a815e9f0f5b26c`

Entrypoints:

- `docs/sfjm/PROJECT_READ_MODEL.json`;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- `docs/NEXT_SAFE_ACTION.md`.

Consumed state:

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 PLANNED_NOT_AUTHORIZED / NEXT
MNT-M3..M7 PLANNED

forecast total = 1240h
accepted scope-equivalent = 256h
remaining = 984h
progress = 20.65%
```

Commercial V1 remains operational. `20.65%` is MNT-RESF program progress and is not a production-readiness percentage.

## 6. FECH.AI compatibility

This change does not migrate FECH.AI authority into the Workspace and does not replace its current snapshot semantics.

The generic connection layer wraps the existing FECH.AI Workspace model so the same renderer can show its WBS, task decompositions and Workspace-estimated effort without changing FECH.AI canonical ownership.

## 7. Staleness

Version 1 is intentionally manual/static.

A connected snapshot is stale when the upstream project `main` SHA differs from the SHA captured by the Workspace snapshot.

The UI may display the observed SHA/time and a staleness warning embedded in verification text, but it must not claim automatic drift detection.

Refresh remains a bounded manual reconciliation.

## 8. Automation explicitly not introduced

This v1 does not add:

- backend;
- API ingestion;
- GitHub webhook;
- polling;
- cron;
- automatic sync;
- write-back;
- project mutation;
- SES routing mutation;
- automatic deployment action.

Any of those capabilities require a separate architectural decision and authorization.

## 9. Implementation boundary

Implementation files:

- `data/connected-projects.ts` — manual read/adaptation snapshots;
- `components/ProjectAgnosticWorkspaceHome.tsx` — generic dashboard/WBS renderer;
- `app/page.tsx` — switches the public Workspace entrypoint to the generic renderer.

The prior `components/WorkspaceHome.tsx` remains present as rollback/reference during this transition. It is not deleted by this change.

## 10. Acceptance

PASS requires:

1. FECH.AI remains selectable and retains a WBS view;
2. MoreNumTegra is selectable in the same URL;
3. MoreNumTegra shows M0–M7 and all immediate tasks;
4. MoreNumTegra shows 1240h / 256h / 984h / 20.65%;
5. MNT-M2 is displayed as planned/not authorized, not active;
6. FECH.AI recursive decompositions remain expandable where snapshot data supplies them;
7. no project without WBS receives invented progress;
8. source repository/SHA/date remain visible;
9. build succeeds;
10. no automatic sync/write-back is introduced.
