# MoreNumTegra — SFJM Workspace consumer context

Observed live on 2026-09-12.

## Canonical project

- repository: `wagnerjfjunior/MoreNumTegra`
- live `main`: `70f2b77e93225b65a1972c12875c58bd7198be1d`
- latest live merge observed: PR #52 (`align Form 46 submit signal`)
- Workspace authority: read-only derived representation

## WBS contract

The project publishes a complete MNT-RESF WBS:

- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`
- `docs/sfjm/PROJECT_READ_MODEL.json`
- `docs/NEXT_SAFE_ACTION.md`

Consumption precedence remains:

```text
PROGRAM_TASK_GRAPH = hierarchy + planning hours
CURRENT_PROGRAM_STATE = lifecycle + accepted progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
Workspace = read-only consumer
```

## Published program structure

- MNT-M0: 160h / COMPLETE
- MNT-M1: 96h / COMPLETE
- MNT-M2: 144h / ACTIVE in the published lifecycle overlay
- MNT-M3: 144h / PLANNED
- MNT-M4: 208h / PLANNED
- MNT-M5: 168h / PLANNED
- MNT-M6: 128h / PLANNED
- MNT-M7: 192h / PLANNED
- total forecast: 1240h

The latest integrated WBS/current-state files still publish 352h accepted, 888h remaining and 28.39% accepted scope-equivalent progress.

## Current inconsistency boundary

Live `main` advanced through PR #52 on 2026-09-12, while `CURRENT_PROGRAM_STATE.json`, `PROJECT_READ_MODEL.json`, `NEXT_SAFE_ACTION.md`, the human WBS lifecycle section and `handoffs/CURRENT.md` still contain the earlier MNT-M2-09 lifecycle/gate state.

Therefore the Workspace consumer MUST:

1. render the project-published WBS hierarchy and planning hours;
2. preserve the last explicitly published 352h / 28.39% overlay rather than invent newer accepted hours;
3. flag continuity as `STATE INCONSISTENT` until MoreNumTegra reconciles those canonical state documents against live main;
4. not infer MNT-M2-09 completion, MNT-M2-10 completion or new execution authority from PR #52 commit text alone;
5. mark the snapshot stale whenever the observed MoreNumTegra SHA drifts.

## Workspace representation boundary

This reconciliation changes only the Workspace consumer. It does not mutate MoreNumTegra, Green, GA4, GTM, Meta, Vercel production, DNS, Search Console, Ads or campaign spend.

`LIVE IMPLEMENTATION CHANGE != CANONICAL PROGRAM LIFECYCLE RECONCILIATION`

`WORKSPACE REPRESENTATION != PROJECT AUTHORITY`

`PROGRAM PROGRESS != PRODUCT READINESS`
