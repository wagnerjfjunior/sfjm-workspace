# MoreNumTegra — SFJM Workspace consumer context

Observed live on 2026-09-12.

## Canonical project

- repository: `wagnerjfjunior/MoreNumTegra`
- live `main`: `ba2a70c793e6879d28192fda4730f950ec6cc68d`
- latest live merge observed: PR #53 (`close MNT-M2-09 documentation`)
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
- MNT-M2: 144h / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
- MNT-M3: 144h / PLANNED
- MNT-M4: 208h / PLANNED
- MNT-M5: 168h / PLANNED
- MNT-M6: 128h / PLANNED
- MNT-M7: 192h / PLANNED
- total forecast: 1240h

Current accepted planning state published by MoreNumTegra:

```text
accepted scope-equivalent = 376h
remaining forecast = 864h
program progress = 30.32%
MNT-M2 accepted = 120h / 144h
```

## Current lifecycle

PR #53 reconciled the project lifecycle/read-model state after the accepted MNT-M2-09 runtime result.

Current state:

```text
MNT-M2-01..09 = COMPLETE
MNT-M2-10 = PLANNED / EXECUTION_NOT_AUTHORIZED
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
NEXT_TASK = MNT-M2-10
```

The unique next safe action is to obtain explicit Product Authority authorization before starting `MNT-M2-10 — Execute end-to-end Measurement QA`.

MNT-M2-10 authorization, if granted later, is bounded to QA/evidence. It does not automatically authorize additional GTM/GA4/Meta/Ads/Green/DNS/Search Console/Vercel mutations.

## Workspace representation boundary

This reconciliation changes only the Workspace consumer. It does not mutate MoreNumTegra, Green, GA4, GTM, Meta, Vercel production, DNS, Search Console, Ads or campaign spend.

Consumers must resolve live MoreNumTegra `main` before refreshing state and mark this snapshot stale when the observed SHA differs from live `main`.

`WORKSPACE REPRESENTATION != PROJECT AUTHORITY`

`PROGRAM PROGRESS != PRODUCT READINESS`

`MNT-M2-09 COMPLETE != MNT-M2-10 AUTHORIZED != MNT-M2-10 VALIDATED != MNT-M2 COMPLETE`
