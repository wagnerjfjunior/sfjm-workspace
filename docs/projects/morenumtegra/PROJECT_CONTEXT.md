# MoreNumTegra — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_DERIVED_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: `2026-09-10`

## Project identity

- Project: `MoreNumTegra`
- Canonical repository: `wagnerjfjunior/MoreNumTegra`
- Canonical branch: `main`
- Live `main` consumed for this snapshot: `f0e89bfc159e7638347997b46290c919f2e5efc7`
- Latest material lifecycle observed: PR #44 merged — MNT-M2 GTM Consent evidence/lifecycle reconciliation
- Commercial production: `https://moretegra.com.br/`
- Public homologation: `https://morenumtegra.vercel.app/`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

MoreNumTegra remains the authority for project truth, lifecycle, WBS hierarchy, project-published planning hours, authorization, implementation/runtime state and next-safe-action. This Workspace record is a read-only derived snapshot.

## Canonical consumer contract

MoreNumTegra publishes structured SFJM-consumable state at its own `main`:

1. `docs/sfjm/PROJECT_READ_MODEL.json` — project summary and pointers;
2. `docs/sfjm/CURRENT_PROGRAM_STATE.json` — current lifecycle/progress overlay;
3. `docs/sfjm/PROGRAM_TASK_GRAPH.json` — structural M0–M7 hierarchy and planning hours;
4. `docs/sfjm/PROGRAM_TASK_GRAPH.md` — read/presentation contract;
5. `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — human WBS;
6. `docs/NEXT_SAFE_ACTION.md` — current execution authority.

State precedence:

```text
CURRENT_PROGRAM_STATE = current lifecycle/progress
PROGRAM_TASK_GRAPH = hierarchy/task IDs/planning hours
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

A later lifecycle overlay may supersede state fields from the structural graph, but the Workspace may not invent hierarchy, hours, authorization or evidence.

## Current program state consumed

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             COMPLETE
MNT-M2  Measurement Foundation & Consent                          ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Current execution state:

```text
ACTIVE_PHASE = MNT-M2
ACTIVE_TASK = NONE
IMMEDIATE_EXECUTION_AUTHORITY = NONE_PENDING_NEXT_TASK_LIFECYCLE
NEXT_TASK = MNT-M2-02 / PLANNED_NOT_AUTHORIZED
```

## Planning / progress snapshot

```text
forecast total                = 1240h
accepted scope-equivalent     = 296h
remaining forecast            = 944h
program progress              = 23.87%
```

Accepted effort is:

```text
MNT-M0 = 160h
MNT-M1 = 96h
MNT-M2-01 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
TOTAL ACCEPTED = 296h
```

MNT-M2 has `40h / 144h` accepted scope-equivalent.

These are planning/scope-equivalent values, not actual timesheets. Commercial V1 is already operational; program progress must not be interpreted as product-readiness percentage.

MNT-M2-09 is `PARTIAL_IMPLEMENTED` but contributes `0 accepted hours` until its full exit criteria are accepted.

## Measurement / Consent evidence now consumed

### T0 historical — MNT-M2-01

Source:

`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`

Preserved findings:

- Green/GDigital platform-injected `POST /page/view` observed;
- GTM/GA4/Meta were not observed in that T0 captured session;
- YouTube embedded-player telemetry was observed;
- `www -> non-www` navigation produced two Green page-view writes with distinct page IDs.

The T0 `GTM NOT_OBSERVED` finding is historical pre-GTM evidence and must not be presented as current truth.

### T1 current — GTM Consent

Source:

`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`

Published/validated state:

```text
GTM container = GTM-PGCR4R47
published version = 4
default consent = denied / denied / denied / denied
Green Continuar = granted / granted / granted / granted
Green Cancelar = denied / denied / denied / denied
persistence after reload = PROVEN for granted and denied
validation = GTM Preview / Tag Assistant
```

Current task adjudication:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 PLANNED_NOT_AUTHORIZED / NEXT CANDIDATE
MNT-M2-03 PLANNED
MNT-M2-04 PLANNED
MNT-M2-05 PARTIAL_EVIDENCE
MNT-M2-06 PLANNED
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED / 0 accepted hours
MNT-M2-10 PLANNED
```

Do not infer full GA4/Ads/Meta/Measurement completion from GTM Consent evidence.

## Current next safe action consumed

The next task candidate is:

`MNT-M2-02 — Define transport architecture and duplicate-event prevention`.

It remains:

`PLANNED_NOT_AUTHORIZED`.

No task is currently executing. The documentation reconciliation does not itself authorize MNT-M2-02 execution or additional external/runtime mutation.

Required MNT-M2-02 inputs include:

- Green already emits platform-injected `/page/view`;
- T0 observed two page-view writes across `www -> non-www` with distinct page IDs;
- future project-owned GA4/Ads events must avoid duplicate page/business conversions;
- YouTube operational telemetry is not a MoreNumTegra business conversion;
- the validated GTM Consent baseline must not be needlessly rebuilt.

## Current material issues / gates

The Workspace snapshot exposes without changing project authority:

- full MoreNumTegra Measurement stack remains incomplete;
- duplicate-measurement risk from T0 is required input for MNT-M2-02;
- GTM consent-state handling is proven, while site-wide third-party telemetry gating remains a residual boundary;
- commercial canonical remains client-side rather than static/SSR;
- `sitemap.xml` remains unavailable;
- `www` redirect works at page level but HTTP 301/308 semantics remain unproven;
- MNT-M2-02 execution requires a separate next-task gate;
- additional tracking, Ads, DNS and production mutations remain separately gated.

Search P0-B remains `PASS_WITH_RESIDUAL_RISK` according to MoreNumTegra evidence.

## RESF relationship

MoreNumTegra selectively adopted RESF v1 with provider pinned to:

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
- Green/Vercel/DNS/Search Console mutation;
- additional GTM/GA4/Meta/Ads configuration;
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
8. `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
9. current evidence referenced by the state overlay.
