# FECH.AI — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: 2026-07-24

## Project identity

- Project: FECH.AI
- Canonical repository: `wagnerjfjunior/fecha.ai`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `93123ac0f44aca9b64892bd75ac548ea40161e10`
- Main tip message: `docs(sfjm): close PR 96 continuity cycle (#97)`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

The FECH.AI repository remains the only canonical source for FECH.AI product, governance, runtime and security state. This Workspace record is a bounded external-project context snapshot and must not override FECH.AI versioned evidence.

## SFJM application state inside FECH.AI

The SFJM documentation and continuity layer inside FECH.AI is complete through the merged continuity cycle represented by PRs #95, #96 and #97.

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
- PR #94 was corrected, accepted or merged.

## Current product-governance exception

FECH.AI PR #94, `docs(m1): add F1-01 acceptance evidence map`, remains a separate product-governance artifact.

Last verified audit target:

- head: `140e92dd12c72eae5f90fa55b5b125bbedf6fbaa`;
- result: `FAIL`;
- reason: the F1-01 map contains incomplete or incorrectly classified M1 paths and unresolved review findings;
- consequence: F1-01 cannot be accepted from the current PR state.

The PR #94 finding does not reopen or invalidate the completed SFJM continuity-layer installation. It blocks only conclusions or actions that depend on a correct F1-01 evidence map.

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
- automatic approval, merge, Security Go, F1-01 acceptance or WDP decisions.

Any Workspace interface derived from this record must label the data as demonstrative or manually verified and must include the source repository, observed SHA and observation date.

## Current bounded state

- SFJM continuity layer in FECH.AI: `COMPLETE`
- FECH.AI product lifecycle: `ACTIVE`
- Active phase: `MVP 1 — Família`
- Security Go: `NOT GRANTED`
- MVP Família readiness: `NOT CONFIRMED`
- F1-01 acceptance: `NOT CONFIRMED`
- Runtime validation: `NOT CONFIRMED`
- Supabase live security state: `NOT CONFIRMED`
- WDP: `NOT AWARDED`
- Workspace synchronization: `NOT IMPLEMENTED`

## Canonical sources to consult

In `wagnerjfjunior/fecha.ai`, resolve live and read at minimum:

- `docs/bootstrap/INDEX.md`;
- `docs/sfjm/INDEX.md`;
- `docs/sfjm/CURRENT_STATE.md`;
- `docs/sfjm/NEXT_SAFE_ACTION.md`;
- `docs/sfjm/AUTHORIZATIONS.md`;
- `docs/sfjm/EVIDENCE_FRESHNESS.md`;
- `docs/sfjm/handoffs/CURRENT.md`.

For F1-01 work, also resolve the live state of PR #94 and the applicable B0, M1 and product-scope records.

## Refresh rule

This snapshot becomes stale when any of the following changes:

- FECH.AI `main` tip;
- PR #94 head, state, diff, reviews or threads;
- FECH.AI authorization state;
- active product phase;
- Security Go, F1-01, runtime, Supabase or WDP decision;
- the Workspace representation contract.

A stale snapshot must be revalidated against live GitHub before it supports any current conclusion.

## Next safe action

After independent review of this documentation-only record, select one bounded Workspace action:

1. expose FECH.AI as a manually verified demonstrative project card using this contract; or
2. refresh this external-project snapshot if FECH.AI canonical state changes.

Neither option authorizes automatic integration or changes in `wagnerjfjunior/fecha.ai`.
