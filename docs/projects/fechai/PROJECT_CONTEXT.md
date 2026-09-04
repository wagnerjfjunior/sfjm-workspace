# FECH.AI — Current Project Context

## CURRENT FECH.AI DERIVED SNAPSHOT — PR #170 MERGED — 2026-09-04

```text
Workspace duty = DERIVED VISUALIZATION / CONTINUITY
FECH.AI canonical main observed = 252fb981bba4fb410136fd34cb29b9f2d0e057f8
PR #170 = CLOSED / MERGED
current execution program = Issue #141 — Security-to-Scale 2026
program hierarchy = docs/governance/2026-09-04-fechai-bcr-security-to-scale-program-hierarchy-core-dod.md
current granular execution baseline = docs/roadmap/fechai-security-to-scale-2026-wbs.md

STS-M1 = COMPLETE WITH DEFERRED SECURITY ASSURANCE
J4 environment-dependent evidence = DEFERRED / NOT PASS
IMP-003 = NOT_DETERMINED
ROLLBACK_REAPPLY = NOT_DETERMINED
SECURITY_GO = NOT_GRANTED
OC-01 = REQUIRED BEFORE EXTERNAL USERS

STS-M2 = ELIGIBLE / NOT STARTED
STS-M2-01 = Matriz de 43 tabelas / 20h
STS-M2-01 current authority = READ_ONLY SCOPE/EVIDENCE RECONSTRUCTION ONLY
STS-M2-01 implementation = NOT_AUTHORIZED

CRITICAL_PATH_TOTAL = 832h
CURRENT_ACCEPTED_COMPLETE = 204h
REMAINING_CRITICAL_PATH = 628h
```

### Current authority boundary

The canonical FECH.AI program hierarchy now distinguishes:
- `PRODUCT_MODULE_M1..M6` — product capability taxonomy;
- `B0-M1..M6` — immutable historical 300 WDP comparison baseline;
- `STS-M0..STS-M6` — current Security-to-Scale execution milestones.

The SFJM Workspace is a derived visualization only. It must not redefine FECH.AI program authority, silently start STS-M2, convert deferred evidence to PASS, or infer Security Go.

CURRENT SNAPSHOT AUTHORITY — 2026-09-04

This top section is the current Workspace representation. Any older "current" wording below is historical lineage when it conflicts.

```text
FECH.AI canonical live main:
  2bad8e9c3d6d6e091a6416c556e793eb1b24e0ec

M1:
  COMPLETE WITH DEFERRED SECURITY ASSURANCE

F1-02 operational remediation:
  CLOSED FOR CURRENT M1 ROADMAP

J4 environment-dependent evidence:
  DEFERRED / frozen / not waived / not PASS

IMP-003:
  NOT_DETERMINED

ROLLBACK_REAPPLY:
  NOT_DETERMINED

Security Go:
  DENIED / NOT_GRANTED

OC-01:
  REQUIRED BEFORE EXTERNAL USERS
  NOT BLOCKING FOR M1 ROADMAP CLOSE

M2:
  NEXT ELIGIBLE MILESTONE
  NOT STARTED

single next safe action:
  M2 bootstrap
  -> resolve live main
  -> reconstruct M2/M2-01 bounded scope
  -> no implementation until separately authorized

decision anchor:
  PR #168 merge commit 4ede55dfe63b5da342e53b125e85068980090c82

handoff reconciliation:
  PR #169 merge commit 2bad8e9c3d6d6e091a6416c556e793eb1b24e0ec
```

Deferred J4 evidence may be reopened only when all three are true:

```text
Supabase Pro
AND isolated non-production environment available
AND explicit Product Authority execution authorization
```

This Workspace snapshot does not authorize FECH.AI runtime, Supabase/Auth, production, deploy, OC-01 execution, Security Go, M2 implementation or external write-back.

---

# FECH.AI — Historical refresh — B4 post-application — superseded

Historical lineage only; superseded by the 2026-09-04 authority above.

```text
FECH.AI main observed:
  020594a2bb66fed5b6ab38f2d015878a7ef54d71

PR #162:
  CLOSED / MERGED
  reviewed head: 89c049cec92d1a74fd3011088581c3bf1b4e5a8a
  merge commit: 020594a2bb66fed5b6ab38f2d015878a7ef54d71

B4 migration:
  repository artifact: supabase/migrations/20260901175000_f1_02_b4_list_acl_tenant_integrity.sql
  live ledger: 20260901222707 / f1_02_b4_list_acl_tenant_integrity
  application: APPLIED

exact read-only proof:
  supabase/tests/f1-02-b4/list_acl_tenant_integrity.sql
  blob: 13c21a7a747406b3e17baefdbd26105e7a90e527
  result: PASS

post-application catalog state:
  authenticated SELECT=true
  authenticated INSERT=false
  authenticated UPDATE=false
  authenticated DELETE=false
  RLS=true
  FORCE RLS=true
  ACL rows=12
  ACL fingerprint preserved=true
  empresa targets=0
  unsupported targets=0
  list/company mismatches=0
  invalid broker targets=0
  invalid team targets=0
  composite list/company FK=present
  target-integrity trigger=present
  controlled caller definitions preserved=true

RUNTIME_NEGATIVE_PASS:
  NOT_ESTABLISHED

Security Go:
  DENIED
```

B4 is therefore **merged + applied + exact READ_ONLY catalog-proven**, but is not represented as fully closed because no later canonical post-application AppSec/Documentation closure was found in FECH.AI at this refresh.

Current continuation represented by the Workspace:

```text
ACTIVE_WORKSTREAM:
  F1-02/B4 — POST_APPLICATION_CLOSURE_PENDING

NEXT_SAFE_ACTION:
  independent post-application adjudication + canonical reconciliation

NEXT_PROGRAM_MILESTONE:
  M2 — Database Simplification & Optimization Plan
```

The B4 advancement does not consume or replace M2–M6.

---

# FECH.AI — Persistent Continuity Model v2

## Current representation contract — 2026-09-01

This section supersedes older snapshot-shape guidance when it conflicts. Historical evidence below remains lineage and must not be deleted merely because current state advances.

The dashboard must preserve four independent layers:

```text
PROGRAM_PLAN
+ EVENT_LEDGER
+ CURRENT_PROJECTION
+ FUTURE_QUEUE
= CONTINUITY_VIEW
```

### Program plan

The canonical Security-to-Scale plan remains M0–M6 from FECH.AI Issue #141.

A remediation workstream MUST NOT replace, rename or consume the program milestone position.

Current position at this snapshot:

```text
LAST_COMPLETED_MILESTONE:
  M1 — Security Truth Baseline

ACTIVE_WORKSTREAM:
  F1-02/B4 — LIST ACL CROSS-TENANT TARGET RISK

NEXT_SAFE_ACTION:
  TARGET DESIGN + AUTHORIZATION MATRIX FIRST

NEXT_PROGRAM_MILESTONE:
  M2 — Database Simplification & Optimization Plan

FUTURE_PROGRAM:
  M2 -> M3 -> M4 -> M5 -> M6
```

### Event ledger

Historical material events are append-only for ordinary refreshes.

A refresh may append a new event or correct a proven factual error. It must not delete prior completed gates, remediations or transitions merely because a newer action exists.

### Current projection

Current projection answers only:

```text
What was last completed?
What is active now?
What is the next safe action?
What is the next program milestone?
What is blocked?
```

It does not own or replace history or future.

### Future queue

Known future work remains visible before execution.

This includes:

- M2–M6 from canonical program #141;
- confirmed unresolved M1 findings that still require bounded remediation;
- other canonically planned workstreams when their future status is evidenced.

Unknown implementation details must not be invented. If sequencing or implementation design is not yet canonical, keep the item visible as PLANNED with that uncertainty explicit.

### Refresh invariant

Every manual refresh MUST satisfy:

```text
previous completed history ⊆ refreshed completed history
canonical future plan not consumed by current workstream
current workstream != current/next program milestone
material supersession is recorded, not silently erased
```

If canonical FECH.AI changes the actual plan, record that change as a material plan revision with provenance. Do not rewrite history as if the prior plan never existed.

---
# FECH.AI — External Project Context

## Current manual refresh override — 2026-09-01

FECH.AI main is `bd645210d61b2a7e4af60112c2fe8cef71d761cc`. M1 Security Truth Baseline is complete and Issue #150 is closed. F1-02/B3 and F1-02/B2 are both `REMEDIATED — MERGED + APPLIED + READ_ONLY_CATALOG_PROVEN`. B2 used migration `f1_02_b2_revoke_direct_crm_writes` and its post-application READ_ONLY catalog proof passed. The next bounded risk is F1-02/B4 — list ACL cross-tenant target risk / PR-06. The next action is `TARGET DESIGN + AUTHORIZATION MATRIX FIRST` with Architecture, AppSec and LeadOps before implementation. `RUNTIME_NEGATIVE_PASS = NOT ESTABLISHED`; Security Go remains denied and broad paid commercialization remains blocked. Accepted macro program progress remains 18.75%; M2 is not advanced by this snapshot.

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: 2026-08-28

## Project identity

- Project: FECH.AI
- Canonical repository: `wagnerjfjunior/fecha.ai`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `3eeb6fd230309f206be7920607739f8e4545556f`
- Program authority: Issue #141 — `Security-to-Scale 2026`
- Current milestone work item: Issue #150 — `M1: Security Truth Baseline`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

FECH.AI remains the only canonical authority for FECH.AI product, security, architecture, runtime, lifecycle, milestone and authorization state. This Workspace record is a bounded manual snapshot only.

## Security-to-Scale transition

Current verified program transition at this snapshot:

```text
#141 Security-to-Scale 2026: OPEN
#142 M0 Truth Reconciliation: CLOSED / completed
PR #149 M0 SFJM publication: MERGED
PR #151 M0 -> M1 SFJM transition: MERGED
#150 M1 Security Truth Baseline: OPEN / READ_ONLY FIRST
Security Go: NOT GRANTED
Broad paid commercialization: BLOCKED
```

M0 is complete only for its analytical/documentation purpose. It did not establish a broad current live-database security PASS, runtime Security Go or commercial readiness.

## Durable workstream classification

At M1 entry:

- #139: `ACTIVE` — user-creation membership-boundary implementation; resolve current lifecycle/findings live before acting;
- #140: `ACTIVE` — read-only Supabase Action/config evidence workstream; static versioned config does not itself prove current runtime Action/Builder application;
- #131: `STALE_CONTINUITY`;
- #124: `STALE_CONTINUITY`;
- #120: `SUPERSEDED`.

Volatile heads, review-thread state, checks and mergeability must always be resolved live in FECH.AI rather than trusted from this snapshot.

## M1 objective and runbook

M1 is `READ_ONLY FIRST`.

Required workstreams:

1. **M1-A** — LIVE DB × GitHub main × applied migration ledger cross-check;
2. **M1-B** — current privileged-surface inventory;
3. **M1-C** — tenant-isolation proof plan and isolated runtime/staging requirements;
4. **M1-D** — dependency / known-vulnerability inventory;
5. **M1-E** — secrets / infrastructure attack-surface inventory;
6. **M1-F** — documentation/evidence reconciliation and one M1 verdict / next safe action.

M1 evidence acquisition does not authorize DDL/DML, migration application, Supabase mutation, Auth/business-data mutation, deploy, production offensive testing, database simplification implementation or Security Go.

## Program roadmap representation

The Workspace dashboard represents M0–M6 as a **manual planning snapshot**.

Weighting rule:

```text
milestone weight = planned target-window duration / total Security-to-Scale window
program progress = sum(weight × accepted milestone completion)
```

No partial milestone progress is inferred from activity, PR count or subjective health. A milestone contributes only to the extent its exit gate has been accepted by canonical FECH.AI evidence.

Current accepted values in this snapshot:

| Milestone | Planned window | Weight | Accepted completion | Program contribution |
|---|---|---:|---:|---:|
| M0 | 28 Aug–4 Sep | 6.25% | 100% | 6.25% |
| M1 | 4–18 Sep | 12.50% | 0% | 0% |
| M2 | 18 Sep–9 Oct | 18.75% | 0% | 0% |
| M3 | 9–30 Oct | 18.75% | 0% | 0% |
| M4 | 30 Oct–27 Nov | 25.00% | 0% | 0% |
| M5 | 27 Nov–11 Dec | 12.50% | 0% | 0% |
| M6 | 11–18 Dec | 6.25% | 0% | 0% |

Current weighted program progress represented in the Workspace: **6.25%**.

This percentage is a planning/accepted-gate visualization, not a Security Go score, delivery confidence score or runtime-security score.

## Evidence boundary

Preserve:

```text
STATIC_IMPLEMENTATION_REVIEW != LIVE_DATABASE_VALIDATED
LIVE_DATABASE_VALIDATED != CONTROLLED_RUNTIME_PASS
CONTROLLED_RUNTIME_PASS != SECURITY_GO
PR_HEAD_ONLY != CURRENT_LIVE_DATABASE_TRUTH
VERSIONED != MERGED != APPLIED != DEPLOYED != RUNTIME_TESTED
```

Historical catalog counts or runtime results remain evidence-at-capture until revalidated when material.

## Current next safe action

Canonical FECH.AI semantic next action at this snapshot:

> Execute M1-A READ_ONLY: establish current LIVE DB × GitHub main × applied migration ledger truth, including the current privileged-surface evidence needed before simplification or implementation decisions.

Primary specialist sequence:

```text
backend_data -> backend-data-platform-specialist
application_security -> application-security-assurance-specialist
documentation_audit -> documentation-auditor
```

Manual specialist transport may be used when the SES runtime route is unavailable; no Gateway receipt may be invented.

## Current blockers preserved

- Security Go: `NOT GRANTED`;
- broad paid commercialization: `BLOCKED`;
- F1-02 final acceptance: blocked;
- WDP increase: requires governance acceptance;
- current M1 live-database truth: not yet established;
- current M1 privileged-surface truth: not yet established;
- current dependency/vulnerability truth: not yet established;
- current infrastructure/secrets attack-surface truth: not yet established;
- #139 and #140 remain separate workstreams and are not advanced by this Workspace snapshot.

## Workspace representation boundary

The Workspace does not implement:

- automatic GitHub ingestion;
- API/webhook/cron/polling synchronization;
- background monitoring;
- write-back to FECH.AI;
- backend/database/Supabase integration;
- runtime/deployment monitoring;
- automatic state scoring;
- automatic approval, Ready, merge, Security Go or commercialization decisions.

The UI must label this data as manual and must show source repository, observed SHA and observation date.

## Refresh / invalidation rule

This snapshot becomes stale when any material FECH.AI state changes, including:

- FECH.AI `main`;
- Issue #141 or #150 state/scope;
- milestone exit acceptance;
- active workstream classification;
- evidence class or major security finding;
- Security Go or commercialization decision;
- Workspace representation contract.

A stale snapshot must be manually revalidated against FECH.AI canonical evidence before it supports a current conclusion.

## Canonical sources to consult

Resolve live in `wagnerjfjunior/fecha.ai`:

- `docs/bootstrap/INDEX.md`;
- `docs/skills/SES_SPECIALIST_ROUTING.md`;
- `docs/sfjm/INDEX.md`;
- `docs/sfjm/CURRENT_STATE.md`;
- `docs/sfjm/NEXT_SAFE_ACTION.md`;
- `docs/sfjm/BLOCKED_ACTIONS.md`;
- `docs/sfjm/AUTHORIZATIONS.md`;
- `docs/sfjm/EVIDENCE_FRESHNESS.md`;
- `docs/sfjm/handoffs/CURRENT.md`;
- Issue #141;
- Issue #150;
- current material PRs when relevant.
