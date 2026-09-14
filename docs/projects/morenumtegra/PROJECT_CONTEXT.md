# MoreNumTegra — SFJM Workspace consumer context

Observed live on 2026-09-14.

## Canonical project

- repository: `wagnerjfjunior/MoreNumTegra`
- live `main`: `1626e808c03a4bf88bd11f31d1a9078b5b6c8dfe`
- latest live merge observed: PR #76 (`canonicalize PR75 runtime parity closure`)
- Workspace authority: read-only derived representation

## WBS contract and precedence

The project publishes a full MNT-RESF structural WBS and separate current-state overlays. Current consumption precedence is:

```text
PROGRAM_TASK_GRAPH / human WBS = hierarchy + planning hours
CURRENT_PROGRAM_STATE = current lifecycle + accepted progress
PROJECT_READ_MODEL + handoffs/CURRENT = current read model / continuity
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
Workspace = read-only consumer
```

Older structural snapshots can retain stale lifecycle fields. Current-state overlays supersede those lifecycle fields; hierarchy/task identity/planning hours remain project-owned.

## Current program position

Canonical current state on `main`:

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 COMPLETE
MNT-M3 COMPLETE / ACCEPTED
MNT-M4 ACTIVE
MNT-M4-01..04 COMPLETE / MERGED
MNT-M4-05 IN_PROGRESS / AUTHORIZED — PR #69
```

Program planning rollup:

```text
forecast total = 1240h
accepted scope-equivalent = 640h
remaining forecast = 600h
program progress = 51.61%
```

`MNT-M4-05` contributes no additional accepted hours while it remains in progress.

## Current next safe action

The unique next safe action is to complete `MNT-M4-05 — Factual JSON-LD expansion` on PR #69, validate Preview/schema, consolidate the logic into the single Green JavaScript artifact at `src-greenn/moretegra.js`, and stop at `COMPLETE_CANDIDATE / PENDING_READY_MERGE` unless a separate lifecycle authorization is given.

`MNT-M4-06` does not start automatically by sequence.

Ready and merge of PR #69 remain separate gates.

## Runtime parity side intervention

PR #75 closed the Vercel `lp.moretegra.com.br` Form 46 + Measurement runtime-parity intervention. PR #76 canonicalized that closure. This work is outside the normal M4 sequence and does not change MNT-RESF accepted-hours accounting.

The production Green site remains a separate authority boundary; runtime-parity closure does not authorize replacing the native Green Form 46 or broadening GTM/GA4/Meta/Ads/DNS/Search Console/FECH.AI scope.

## Workspace representation boundary

This Workspace PR changes only the derived consumer snapshot. It does not mutate MoreNumTegra, Green, GTM, GA4, Meta, Ads, DNS, Search Console or production infrastructure.

Consumers must resolve live MoreNumTegra `main` before current-state claims and mark the Workspace snapshot stale whenever its observed SHA differs from live `main`.

`WORKSPACE REPRESENTATION != PROJECT AUTHORITY`

`PROGRAM PROGRESS != PRODUCT READINESS`

`MNT-M4-05 AUTHORIZED/IN_PROGRESS != COMPLETE != READY != MERGED`
