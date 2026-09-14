# Project-Agnostic WBS Read Model v1

Status: Workspace product contract. This document does not modify the SFJM protocol.

## Purpose

SFJM Workspace may render a WBS for any connected project that publishes a governed WBS/read model. FECH.AI is not a privileged renderer identity.

## Consumer rules

1. External project repository remains authoritative.
2. Resolve project `main` live before current claims.
3. Record observed SHA and observation date.
4. Project-published hierarchy and hours override Workspace estimates.
5. Parent and child hours are never double-counted.
6. Lifecycle/progress comes from the project-owned current-state contract.
7. Execution authority comes from the project-owned next-safe-action contract.
8. `PLANNED != AUTHORIZED`, `IN_PROGRESS != COMPLETE`, `PROGRAM_PROGRESS != PRODUCT_READINESS`.
9. Current-state overlays supersede stale lifecycle fields in older structural snapshots; hierarchy/task identity/planning hours remain project-owned.
10. If live main and current-state authorities materially diverge, render the most restrictive interpretation and flag `STATE INCONSISTENT`.
11. Workspace does not write back to external projects.

## Current registry

- FECH.AI: existing Workspace WBS snapshot and recursive project-published decompositions.
- MoreNumTegra: MNT-RESF M0-M7 project-published planning WBS plus project-owned current-state overlay.
- Projects without a sufficiently published WBS continue to render the fail-closed unavailable state.

## MoreNumTegra precedence

```text
PROGRAM_TASK_GRAPH / human WBS = hierarchy / planning hours
CURRENT_PROGRAM_STATE = lifecycle / accepted progress
PROJECT_READ_MODEL + handoffs/CURRENT = current read model / continuity
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

At the 2026-09-14 refresh, live MoreNumTegra main is `1626e808c03a4bf88bd11f31d1a9078b5b6c8dfe` after PR #76. Project-owned current-state authorities publish 1240h forecast, 640h accepted scope-equivalent, 600h remaining and 51.61% progress. M0-M3 are complete/accepted; M4 is active; M4-01..04 are complete/merged; `MNT-M4-05` is `IN_PROGRESS / AUTHORIZED` on PR #69.

The unique next safe action is to complete the M4-05 candidate, validate Preview/schema and consolidate the logic in `src-greenn/moretegra.js`, then stop at `COMPLETE_CANDIDATE / PENDING_READY_MERGE` unless separately authorized. M4-06 does not start by sequence.

The human WBS and structural graph may retain older lifecycle snapshots; that does not override the current-state overlay.

## Preservation rule

The project-agnostic capability is applied on top of the current Workspace main. Existing FECH.AI recursive rendering, typed issues, current visual shell, JordanaCyrela consumer modules and later main changes are preserved. The superseded PR #39 is implementation reference only and is not merged wholesale.
