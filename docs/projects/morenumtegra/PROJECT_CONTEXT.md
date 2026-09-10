# MoreNumTegra — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_DERIVED_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: `2026-09-10`

## Project identity

- Project: `MoreNumTegra`
- Canonical repository: `wagnerjfjunior/MoreNumTegra`
- Canonical branch: `main`
- Live `main` consumed for this snapshot: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
- Commercial production: `https://moretegra.com.br/`
- Public homologation: `https://morenumtegra.vercel.app/`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

MoreNumTegra remains the authority for project truth, lifecycle, WBS hierarchy, project-published planning hours, authorization, implementation/runtime state and next-safe-action. This Workspace record is a read-only derived snapshot.

## Canonical consumer contract now available

MoreNumTegra publishes structured SFJM-consumable state at its own `main`:

1. `docs/sfjm/PROJECT_READ_MODEL.json` — project summary and pointers;
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress overlay;
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — structural M0–M7 hierarchy and planning hours;
4. `docs/sfjm/PROGRAM_TASK_GRAPH.md` — read/presentation contract;
5. `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — human WBS.

The current lifecycle overlay takes precedence for current state/progress; the structural graph remains authoritative for hierarchy/task IDs/planning hours.

## Current program state consumed

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             COMPLETE
MNT-M2  Measurement Foundation & Consent                          PLANNED_NOT_AUTHORIZED / NEXT
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Program forecast published by MoreNumTegra:

```text
forecast total                = 1240h
accepted scope-equivalent     = 256h
remaining forecast            = 984h
program progress              = 20.65%
```

These are planning/scope-equivalent values, not actual timesheets. Commercial V1 is already operational; program progress must not be interpreted as product-readiness percentage.

## Current next safe action consumed

There is no active post-M1 program phase/task.

```text
CURRENT_ACTIVE_PHASE = NONE
CURRENT_ACTIVE_TASK = NONE
NEXT_PHASE = MNT-M2
NEXT_TASK_CANDIDATE = MNT-M2-01
MNT-M2_START = NOT_AUTHORIZED
```

The next safe action is an explicit Product Authority decision on whether to authorize bounded MNT-M2 `READ_ONLY / DESIGN` work.

MNT-M1 closure does not authorize tracking implementation or external mutation.

## Current material issues / gates

The Workspace snapshot exposes without changing project authority:

- MoreNumTegra Measurement stack not configured/proven;
- consent denied/granted enforcement not proven;
- client-side canonical residual;
- sitemap unavailable;
- `www` HTTP 301/308 semantics not proven;
- MNT-M2 start gate = NOT_AUTHORIZED;
- tracking/Ads/DNS/deploy mutations remain separately gated.

Search P0-B remains `PASS_WITH_RESIDUAL_RISK` according to MoreNumTegra evidence.

## RESF relationship

MoreNumTegra selectively adopted RESF v1 in PR #39, with provider pinned to:

`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`

Adoption does not transfer Product Authority and does not imply module implementation/runtime validation.

## Workspace rendering contract

The Workspace renderer may show:

- objective;
- WBS M0–M7;
- phase/task hierarchy;
- recursive subtasks when published;
- hours and effort semantics;
- accepted/remaining effort and percentage;
- current/next state;
- restrictions/residuals/future gates;
- provenance and observed SHA/date.

It must not invent missing tasks, hours, state, authorization or evidence.

The same project-agnostic renderer should serve FECH.AI, MoreNumTegra and future projects that expose a compatible read model. No project-specific dashboard fork is required.

## Automation boundary

This connection remains manual/static. It does not implement or authorize:

- API/backend ingestion;
- polling, cron, webhook or live sync;
- write-back to MoreNumTegra;
- GitHub mutation in the consumer project;
- Green/Vercel/DNS/Search Console mutation;
- GTM/GA4/Meta/Ads configuration;
- spend/campaign publication;
- SES routing changes.

The SES Project Adapter remains a separate specialist-routing mechanism and is not used as the Workspace data feed.

## Staleness rule

This snapshot is current only while its observed MoreNumTegra SHA equals the live `main` SHA it claims to represent.

Any later MoreNumTegra `main` change makes this snapshot potentially stale. The Workspace does not currently detect drift automatically; refresh remains a bounded manual reconciliation.

## Canonical sources for refresh

Always resolve MoreNumTegra live first, then read:

1. `bootstrap/BOOTSTRAP_CANONICO.md`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. `docs/BLOCKED_ACTIONS.md`;
6. `docs/sfjm/PROJECT_READ_MODEL.json`;
7. `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
8. `docs/sfjm/PROGRAM_TASK_GRAPH.json`.
