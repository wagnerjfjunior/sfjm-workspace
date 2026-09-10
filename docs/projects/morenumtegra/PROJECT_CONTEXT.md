# MoreNumTegra — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_DERIVED_SNAPSHOT / PROJECT_OWNED_READ_MODEL_CONSUMED / NO_AUTOMATIC_SYNC`

Observed on: `2026-09-10`

## Project identity

- Project: MoreNumTegra
- Canonical repository: `wagnerjfjunior/MoreNumTegra`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `dba0de3bfefc7aec90c5a88588c54eae4317c61f`
- Source lifecycle: PR #39 merged
- Production commercial URL: `https://moretegra.com.br/`
- Public homologation URL: `https://morenumtegra.vercel.app/`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

The MoreNumTegra repository remains the only canonical source for project truth, lifecycle, implementation, commercial/runtime state, authorization and next-safe-action state. The SFJM Workspace is a read-only derived representation and must not override MoreNumTegra versioned evidence.

## Project-owned SFJM consumer contract

MoreNumTegra now publishes a project-owned read model specifically suitable for read-only SFJM Workspace consumption.

Primary entrypoint:

`docs/sfjm/PROJECT_READ_MODEL.json`

Full task graph:

`docs/sfjm/PROGRAM_TASK_GRAPH.json`

Human WBS:

`docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

Consumer rule:

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
PROJECT_READ_MODEL = CONSUMER ENTRYPOINT / DERIVED CONTRACT
PROGRAM_TASK_GRAPH = PROJECT-PUBLISHED PROGRAM STRUCTURE
SFJM WORKSPACE = READ-ONLY DERIVED REPRESENTATION

WBS PLANNED != AUTHORIZED
PROGRAM PROGRESS != V1 PRODUCT READINESS
WORKSPACE REPRESENTATION != PROJECT AUTHORITY
```

The Workspace must resolve MoreNumTegra `main` live, record the observed SHA/time and treat any cached snapshot as stale when the observed SHA differs from live `main`.

## Objective

Canonical objective `MNT-OBJ-01`:

> Operate and evolve a mobile-first Tegra real-estate discovery and Search-to-Lead experience with verified product truth, organic discoverability, conversion, measurement and controlled paid-media readiness.

Objective source:

`docs/baseline/FUNCTIONAL_BASELINE_V2.md`

## Program

Program:

`MNT-RESF — MoreNumTegra Search-to-Lead 2026`

Framework:

`RESF v1 — Search-to-Lead`

Current program state:

`ACTIVE`

Current phase:

`MNT-M1 — RESF Adoption & Existing-State Reconciliation`

Current task published by the project:

`MNT-M1-08 — Schema/consistency review, independent documentation audit and PR lifecycle`

## Canonical planning / effort snapshot

```text
forecast total                = 1240h
accepted scope-equivalent     = 160h
remaining forecast            = 1080h
accepted program percent      = 12.90%
current phase                 = MNT-M1
current task                  = MNT-M1-08
```

Phase rollup:

```text
MNT-M0  160h  COMPLETE  accepted 160h
MNT-M1   96h  ACTIVE    accepted   0h
MNT-M2  144h  PLANNED   accepted   0h
MNT-M3  144h  PLANNED   accepted   0h
MNT-M4  208h  PLANNED   accepted   0h
MNT-M5  168h  PLANNED   accepted   0h
MNT-M6  128h  PLANNED   accepted   0h
MNT-M7  192h  PLANNED   accepted   0h
TOTAL   1240h
```

Effort semantics are authoritative and must remain visible:

`PLANNING_FORECAST_NOT_ACTUAL_TIMESHEET`

The Workspace may render project-published planning hours, but must not present them as actual worked time. It must also avoid parent/child double counting. Later MoreNumTegra-published canonical task hours supersede prior estimates.

## Current product state

Product state published in the read model:

`GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`

This must not be confused with the 12.90% MNT-RESF program progress. The commercial V1 is already operational; the program percentage describes accepted scope-equivalent against the wider Search-to-Lead roadmap.

## Current issues / residuals

Published current/non-blocking program facts include:

- MoreNumTegra-specific Measurement stack is not configured/proven; this belongs to MNT-M2 and does not block current MNT-M1;
- LGPD modal exists, but denied/granted enforcement is not proven; this belongs to MNT-M2 and does not block current MNT-M1;
- commercial canonical remains client-side rather than static/SSR;
- `sitemap.xml` remains unavailable;
- `www` redirect works at page level but HTTP 301/308 semantics remain unproven;
- tracking, Ads, DNS and production mutations remain separately gated.

## Current next safe action

Authority:

`docs/NEXT_SAFE_ACTION.md`

Current action is to conclude MNT-M1 as bounded documentation/governance work by validating schema/consistency, hours/progress, RESF adoption/provider pinning and evidence semantics, obtaining the required independent exact-head documentation audit, adjudicating any P0/P1 findings and then following separately authorized lifecycle gates.

No runtime mutation is authorized by MNT-M1.

## Workspace representation boundary

SFJM Workspace may represent MoreNumTegra using manually refreshed canonical evidence.

This Workspace integration does not authorize or implement:

- automatic GitHub ingestion or continuous synchronization;
- write-back to MoreNumTegra;
- Vercel or Green mutation;
- DNS change;
- Search Console mutation;
- GTM / GA4 / Meta configuration;
- Google Ads publication or spend;
- commercial data mutation;
- runtime tracking/consent mutation.

Any current Workspace claim must display repository, observed SHA and observation date.

## Canonical sources to consult

Resolve MoreNumTegra live and read at minimum:

1. `docs/sfjm/PROJECT_READ_MODEL.json`;
2. `docs/sfjm/PROGRAM_TASK_GRAPH.json` when WBS/tasks/hours are material;
3. `bootstrap/BOOTSTRAP_CANONICO.md`;
4. `handoffs/CURRENT.md`;
5. `docs/PROJECT_STATUS.md`;
6. `docs/NEXT_SAFE_ACTION.md`;
7. `docs/BLOCKED_ACTIONS.md`;
8. applicable baselines/evidence/ADR.

## Refresh rule

This snapshot becomes stale when any of the following changes:

- MoreNumTegra `main` tip;
- `PROJECT_READ_MODEL.json` or `PROGRAM_TASK_GRAPH.json` semantics;
- project objective;
- WBS hierarchy, task identity, task hours or effort semantics;
- program/current-task state;
- next-safe-action state;
- issues or authorization boundaries;
- product/Green/Vercel state materially relevant to displayed continuity.

A stale snapshot must be refreshed from MoreNumTegra live before supporting a current conclusion.
