# SFJM Workspace — Current Handoff

## Canonical source

Repository: `wagnerjfjunior/sfjm-workspace`

Live `main` is canonical for Workspace product state. FECH.AI remains canonical for FECH.AI product/security/program state.

## Current conversation continuity

Current operating conversation label:

`SFJM Workspace — Chart 3`

This label is an auxiliary continuity cue only. It does not authorize product/security actions and it never overrides GitHub `main`, FECH.AI canonical state or the current lifecycle state of the dashboard candidate.

## Current Workspace initiative

Selected tracking issue:

`#18 — Track FECH.AI Security-to-Scale milestones in Continue`

Bounded implementation candidate:

- manual FECH.AI snapshot refresh;
- Security-to-Scale M0–M6 program data;
- Macro Roadmap / Executive View;
- M1 Operational Runbook View;
- source/ref/date/evidence boundary;
- no automatic synchronization or write-back.

Resolve its current PR/branch/head/lifecycle live rather than trusting a frozen identifier here.

## FECH.AI snapshot carried by this candidate

Observed on 2026-08-28:

```text
wagnerjfjunior/fecha.ai
main: 3eeb6fd230309f206be7920607739f8e4545556f
#141: OPEN / Security-to-Scale 2026
#142: CLOSED / M0 completed
#150: OPEN / M1 READ_ONLY FIRST
Security Go: NOT GRANTED
broad paid commercialization: BLOCKED
```

Current durable FECH.AI workstream meaning:

- #139 ACTIVE;
- #140 ACTIVE;
- #131/#124 STALE_CONTINUITY;
- #120 SUPERSEDED.

Volatile heads/reviews/threads/checks must be resolved live in FECH.AI if material.

## Progress rule

The dashboard derives program progress from the milestone array itself:

```text
sum(milestone weight × accepted completion)
```

At this snapshot M0 is the only accepted exit gate, contributing 6.25%. M1–M6 contribute zero until their canonical exit gates are accepted.

Do not interpret that percentage as security confidence, runtime readiness or Security Go.

## Lifecycle-aware next safe action

Resolve the dashboard candidate lifecycle live, then apply exactly one branch:

### If the dashboard candidate is OPEN

```text
exact refs / drift
-> changed-file scope
-> lint
-> build
-> final-file read
-> delta revalidation of recorded findings
-> Ready only on a validated head
-> pre-merge verification
```

Product Authority authorized this bounded correction sequence through **pre-merge**. Merge is not part of the current authorization.

### If the dashboard candidate is already MERGED

Do not reopen its delivery gate.

Return immediately to FECH.AI canonical continuity and execute the live-resolved M1 next action. At the current snapshot that means:

```text
FECH.AI M1-A READ_ONLY:
LIVE DB × GitHub main × applied migration ledger cross-check,
including current privileged-surface evidence.
```

The Workspace then returns to visualization/continuity duty only.

## Boundaries

Still prohibited from this Workspace delivery:

- merge under the current authorization;
- deployment;
- backend/auth/database/Supabase;
- automatic API/GitHub sync;
- webhook/cron/polling;
- external project mutation/write-back;
- automatic Security Go/progress decisions;
- modifying FECH.AI/MoreNumTegra/StopJuniorMode from Workspace work.

## Invalidation

This handoff becomes stale if:

- Workspace main/candidate head/scope materially changes;
- FECH.AI main or Issues #141/#150 materially change;
- a milestone exit is accepted/revoked;
- Security Go or commercialization decision changes;
- a material dashboard delta introduces a direct regression.

A new conversation must resolve live refs and continue from the applicable lifecycle-aware branch above. It must not restart completed gates.
