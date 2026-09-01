# FECH.AI — External Project Context

## Current manual refresh override — 2026-09-01

M1 Security Truth Baseline is complete and Issue #150 is closed. M1-C-F01 has been applied and proven. The current bounded remediation is F1-02/B3 through Draft PR #157 at exact head `6f22afeb723414d87e5481d80196a2c99789e4b1`; Backend/Data passed and independent AppSec review is the next gate. Security Go remains denied, and Ready, merge and Supabase application remain unauthorized.

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
