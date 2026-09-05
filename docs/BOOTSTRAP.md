# SFJM Workspace — Project Bootstrap

## Purpose

This is the project-owned bootstrap entrypoint for material work on the SFJM Workspace.

It exists so a new conversation, specialist or operator can reconstruct enough project context to work safely without relying on memory.

The Workspace product is separate from the SFJM protocol.

## 1. Project identity

Project:

`SFJM Workspace`

Meaning:

`Stateful Flow & Journey Management`

Canonical product repository:

`wagnerjfjunior/sfjm-workspace`

Protocol repository:

`wagnerjfjunior/StopJuniorMode`

The Workspace applies SFJM principles but does not redefine the protocol.

## 2. Canonical source of truth

For Workspace product state, use this precedence:

1. live `main` of `wagnerjfjunior/sfjm-workspace`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. other applicable versioned Workspace documents.

Conversation history, memory, screenshots, Vercel, Google Drive and other auxiliary sources must not silently replace versioned product state.

External projects represented by the Workspace remain authoritative for their own product, lifecycle, runtime, security and authorization truth.

## 3. Live-ref resolution

Before material work:

1. resolve the current live SHA of `wagnerjfjunior/sfjm-workspace main`;
2. treat that live `main` SHA as the canonical product-state anchor;
3. when auditing or reviewing a candidate branch/PR, preserve the candidate head separately;
4. do not call a candidate head canonical `main`;
5. if live `main` cannot be resolved, stop with `CANONICAL_SOURCE_UNRESOLVED`.

A conversation or copied handoff never substitutes for live GitHub ref resolution.

## 4. Bootstrap order

Minimum reconstruction order:

1. resolve live `main`;
2. read this bootstrap;
3. read `docs/SFJM_BOUNDARY.md`;
4. read `handoffs/CURRENT.md`;
5. read `docs/PROJECT_STATUS.md`;
6. read `docs/NEXT_SAFE_ACTION.md`;
7. read `docs/CANONICAL_RECONCILIATION_GUARDRAILS.md` when reconciliation/audit lifecycle is material;
8. read other project-owned sources required by the exact task;
9. resolve the exact live PR, branch, issue, commit, deployment or external-project evidence material to the task;
10. declare gaps, conflicts, blocked actions and the single next safe action before mutation.

Do not reconstruct the project from conversation memory when versioned state is available.

## 5. Authority model

Product Authority controls material Workspace decisions.

Specialists and auditors may analyze, recommend, validate and classify findings, but they do not independently grant Product Authority decisions.

Current mutation/lifecycle authority must be resolved from the applicable live task context and explicit Product Authority authorization.

Preserve:

```text
AUDIT_PASS != PRODUCT_AUTHORIZATION
READY_RECOMMENDATION != READY_AUTHORITY
TOOL_CAPABILITY != MUTATION_AUTHORITY
REGISTERED != AUTHORIZED
ADOPTED != AUTHORIZED_TO_MUTATE
```

Merge remains a distinct material lifecycle action and must not be inferred from audit success or Ready state.

No Workspace decision transfers authority over an external represented project.

## 6. Specialist resolution

Project-local specialist mappings must not be guessed.

When SES-mediated specialist work is used, resolve the current SES `core/protocols/MANUAL_SPECIALIST_HANDOFF_CONTRACT.md` when the consultation uses manual copy/paste:

1. resolve the current SES canonical source;
2. resolve the Workspace project identity through the SES Project Registry when registered;
3. read the current Workspace Project Adapter and exact role map;
4. use only explicitly adopted role mappings;
5. if a requested role is not adopted, do not infer a nearby specialist;
6. for any selected SES archetype, resolve its exact `CANONICAL_NAME` from `archetypes/REGISTRY.md` and use it as `SPECIALIST_TARGET_NAME` in human handoff instructions;
7. legacy/project-local aliases may be carried only as continuity and must not replace the canonical SES destination identity.

`SPECIALIST_TARGET_NAME = ARCHETYPE_REGISTRY.CANONICAL_NAME` for any SES-selected specialist. A certified SES specialist may be consulted ad hoc only when the current SES contract explicitly permits it. Such consultation must be labeled ad hoc and must not be represented as project adoption.

If required specialist rules cannot be resolved, stop with `SPECIALIST_RULES_UNRESOLVED`.

## 6.1 Consumer consultation versus SES release lifecycle

SFJM Workspace must not infer that a newer/noncurrent SES specialist candidate invalidates an already adopted ACTIVE/certified role or requires the Workspace to perform SES release certification.

```text
ADOPTED ROLE + ACTIVE ARCHETYPE + CURRENT SES LEDGER YES
→ CONSULTATION ELIGIBLE

NONCURRENT SES CANDIDATE EXISTS
!= WORKSPACE BLOCKED

CONSUMER_RECERTIFICATION_DETOUR_FORBIDDEN = YES
```

Exact runtime certification is material only when the task/authority explicitly requires that exact fingerprint.

## 7. Evidence rules

Rank evidence as follows for Workspace product-state decisions:

1. live GitHub evidence from the canonical repository;
2. applicable versioned Workspace sources on the resolved ref;
3. explicitly supplied task evidence whose scope and provenance are clear;
4. auxiliary sources used only within their demonstrated boundary;
5. inference, which must be labeled and must not replace missing evidence;
6. memory/conversation history, which is continuity assistance only.

Do not convert missing or stale evidence into:

- `Continuável`;
- high confidence;
- healthy/synced/live status;
- progress percentage;
- authorization;
- absence of blockers.

Demonstrative data must remain labeled as demonstrative/manual.

## 8. Environment and boundary model

Current product scope is frontend/documentation oriented unless a separate explicit authorization expands it.

Without explicit applicable authorization, do not introduce or mutate:

- authentication;
- database or Supabase;
- backend APIs;
- automatic synchronization;
- webhook/cron/polling/background monitoring;
- write-back to external projects;
- Vercel/deployment configuration;
- external production systems;
- the SFJM protocol repository.

The Workspace may represent external project snapshots, but representation is not ownership or runtime authority.

## 9. Continuity entrypoint

For durable current-state continuity read:

`handoffs/CURRENT.md`

Then reconcile with:

- live `main`;
- `docs/PROJECT_STATUS.md`;
- `docs/NEXT_SAFE_ACTION.md`;
- material live GitHub evidence.

If those sources conflict, live `main` and the canonical precedence above govern. Do not silently choose the most convenient source.

## 10. Fail-closed behavior

If material context cannot be resolved, stop and name the gap explicitly.

Use states such as:

- `CANONICAL_SOURCE_UNRESOLVED`;
- `PROJECT_BOOTSTRAP_UNAVAILABLE`;
- `AUTHORITY_UNRESOLVED`;
- `SPECIALIST_RULES_UNRESOLVED`;
- `PROJECT_CONTINUITY_UNAVAILABLE`;
- `MISSING_EVIDENCE`;
- `CONFLICTING_PROJECT_SOURCES`;
- `MUTATION_NOT_AUTHORIZED`;
- `STALE_REVALIDATION_REQUIRED`.

Missing evidence must not become invented context or a broad PASS.

## Safe-work rule

Before implementation:

1. confirm canonical live state;
2. identify the single next safe action;
3. confirm authorized scope;
4. identify exact files/objects allowed to change;
5. stop on unresolved material divergence;
6. use a dedicated branch for relevant changes;
7. keep diffs bounded;
8. validate locally or through applicable evidence;
9. use independent audit where required;
10. preserve merge as a separate authorization gate.

A new conversation does not reset project history. It must reconstruct from canonical state and continue from there.
