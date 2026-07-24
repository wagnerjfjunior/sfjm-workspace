# FECH.AI — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: 2026-07-24

## Project identity

- Project: FECH.AI
- Canonical repository: `wagnerjfjunior/fecha.ai`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `8a2eb00a9dcd46d7ee346741ca27c6081af52124`
- Main tip message: `docs(sfjm): reconcile F1-01 state after PR 94 merge (#98)`
- Open pull requests observed: `NONE`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

The FECH.AI repository remains the only canonical source for FECH.AI product, governance, runtime and security state. This Workspace record is a bounded external-project context snapshot and must not override FECH.AI versioned evidence.

## SFJM application state inside FECH.AI

The SFJM documentation and continuity layer inside FECH.AI is complete and reconciled through the merged continuity cycle represented by PRs #95, #96, #97 and the later product-state reconciliation in PR #98.

This completion means:

- the FECH.AI repository contains its versioned SFJM continuity layer;
- canonical entry, current-state, authorization, freshness, handoff and next-safe-action records exist in FECH.AI;
- the post-merge continuity cycle was reconciled and closed;
- future conversations must resolve live GitHub state rather than rely on this snapshot.

It does not mean:

- FECH.AI product work is complete;
- MVP Família is accepted or ready;
- Security Go was granted;
- runtime or Supabase was validated;
- tenant isolation was proven;
- WDP was awarded;
- F1-01 checkpoint acceptance was granted.

## F1-01 product-governance state

FECH.AI PR #94, `docs(m1): add F1-01 acceptance evidence map`, is closed and squash-merged.

Final verified state:

- final head: `a7e64c6ed817c03c4dbce7e1b9642e20360b3010`;
- squash commit: `1caf90c60681771af6609b96ee840b190668fa0f`;
- reaudit result: `PASS WITH RESIDUAL RISK`;
- review threads: 6 resolved, 0 open;
- post-merge reconciliation: PR #98 merged into `main`.

The F1-01 evidence map is merged, but checkpoint acceptance remains `NOT GRANTED`. The merge does not grant Security Go, validate runtime or Supabase, prove tenant isolation, confirm MVP Família readiness or award WDP.

## Workspace representation boundary

SFJM Workspace may represent FECH.AI as an external project context using versioned, manually refreshed evidence.

This record authorizes no automatic behavior. It does not implement:

- GitHub API ingestion;
- automatic synchronization;
- background monitoring;
- write-back to FECH.AI;
- backend or database integration;
- Supabase integration;
- runtime or deployment monitoring;
- automatic state scoring;
- automatic approval, merge, Security Go, checkpoint acceptance or WDP decisions.

Any Workspace interface derived from this record must label the data as demonstrative or manually verified and must include the source repository, observed SHA and observation date.

## Current bounded state

- SFJM continuity layer in FECH.AI: `COMPLETE`
- FECH.AI product lifecycle: `ACTIVE`
- Active phase: `MVP 1 — Família`
- Open pull requests: `NONE`
- F1-01 evidence map: `MERGED`
- F1-01 checkpoint acceptance: `NOT GRANTED`
- Security Go: `NOT GRANTED`
- MVP Família readiness: `NOT CONFIRMED`
- Runtime validation: `NOT CONFIRMED`
- Supabase live security state: `NOT CONFIRMED`
- Tenant isolation: `NOT PROVEN`
- WDP: `0 / NOT AWARDED`
- Next workstream: `F1-02 PLANNED / READ-ONLY / NOT AUTHORIZED FOR EXECUTION`
- Workspace synchronization: `NOT IMPLEMENTED`

## Canonical sources to consult

In `wagnerjfjunior/fecha.ai`, resolve live and read at minimum:

- `docs/bootstrap/INDEX.md`;
- `docs/sfjm/INDEX.md`;
- `docs/sfjm/CURRENT_STATE.md`;
- `docs/sfjm/NEXT_SAFE_ACTION.md`;
- `docs/sfjm/BLOCKED_ACTIONS.md`;
- `docs/sfjm/AUTHORIZATIONS.md`;
- `docs/sfjm/EVIDENCE_FRESHNESS.md`;
- `docs/sfjm/handoffs/CURRENT.md`.

For F1-01 or F1-02 work, also resolve the applicable B0, M1 and product-scope records and the live pull-request state.

## Refresh rule

This snapshot becomes stale when any of the following changes:

- FECH.AI `main` tip;
- open pull-request set;
- FECH.AI authorization state;
- active product phase or selected workstream;
- Security Go, F1-01, runtime, Supabase, tenant isolation or WDP decision;
- the Workspace representation contract.

A stale snapshot must be revalidated against live GitHub before it supports any current conclusion.

## Next safe action

After independent review of this documentation-only record, select one bounded Workspace action:

1. expose FECH.AI as a manually verified demonstrative project card using this contract; or
2. refresh this external-project snapshot if FECH.AI canonical state changes.

Neither option authorizes automatic integration, F1-02 execution or changes in `wagnerjfjunior/fecha.ai`.
