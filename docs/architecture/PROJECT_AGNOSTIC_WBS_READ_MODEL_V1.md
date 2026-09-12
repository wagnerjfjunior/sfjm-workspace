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
8. `PLANNED != AUTHORIZED`, `PARTIAL != COMPLETE`, `PROGRAM_PROGRESS != PRODUCT_READINESS`.
9. If live main and lifecycle/read-model documents materially diverge, render the most restrictive interpretation and flag `STATE INCONSISTENT`.
10. Workspace does not write back to external projects.

## Current registry

- FECH.AI: existing Workspace WBS snapshot and recursive project-published decompositions.
- MoreNumTegra: MNT-RESF M0-M7 project-published planning WBS.
- Projects without a sufficiently published WBS continue to render the fail-closed unavailable state.

## MoreNumTegra precedence

```text
PROGRAM_TASK_GRAPH = hierarchy / planning hours
CURRENT_PROGRAM_STATE = lifecycle / accepted progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

At the 2026-09-12 reconciliation, live MoreNumTegra main is `70f2b77e93225b65a1972c12875c58bd7198be1d`. Its WBS/current-state files publish 1240h forecast, 352h accepted scope-equivalent, 888h remaining and 28.39%. Live main also contains PR #52 while lifecycle/read-model documents still expose the earlier MNT-M2-09 state; Workspace therefore renders the WBS but flags state inconsistency rather than inventing a newer accepted state.

## Preservation rule

The project-agnostic capability is applied on top of the current Workspace main. Existing FECH.AI recursive rendering, typed issues, current visual shell, JordanaCyrela consumer modules and later main changes are preserved. The superseded PR #39 is implementation reference only and is not merged wholesale.
