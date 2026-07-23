# Canonical Reconciliation Guardrails

## Purpose

Prevent recurring governance regressions in documentation-only reconciliation pull requests for the SFJM Workspace.

This document applies to the product repository `wagnerjfjunior/sfjm-workspace`. It does not modify or extend the SFJM protocol in `wagnerjfjunior/StopJuniorMode`.

## Trigger

Use these guardrails before creating, updating, auditing, marking Ready, or merging any pull request whose purpose is to reconcile canonical state, project status, next safe action, or continuity handoff documents.

## Blocking failure patterns

### 1. Gate skipping

A reconciliation must state the immediate next safe action for the current live state.

It must not replace that action with a later step that depends on an audit, Ready transition, merge, deployment, or other unresolved gate.

Example of failure: documenting post-merge validation as the current next action while the reconciliation pull request is still Draft.

### 2. Implicit authorization

A reconciliation records observed state and active authorization boundaries. It must not create, imply, require, or pre-authorize a new implementation phase.

Future work may be recorded only as non-blocking backlog or as a candidate requiring separate authorization.

### 3. Custody erosion

Editing for brevity must not remove evidence that remains necessary to understand or validate continuity.

Relevant evidence can include:

- pull request numbers and titles;
- audited head SHAs;
- base and merge commit SHAs;
- merge method when operationally relevant;
- completed and pending gates;
- audit findings and their classification;
- active authorization boundaries;
- the reason a prior instruction became obsolete.

A shorter document is not an improvement when it weakens traceability.

### 4. Invalidation weakening

A reconciliation must preserve clear invalidation conditions for any audited snapshot or authorization.

At minimum, a prior validation becomes stale when relevant live state changes, including:

- pull request state;
- base branch or base SHA;
- head branch or head SHA;
- merge base;
- ahead/behind relationship;
- changed-file scope;
- audit evidence;
- authorization evidence.

Any weakening of these rules requires explicit justification and separate authorization.

### 5. Concurrent reconciliation duplication

Only one active reconciliation pull request may represent the same canonical transition unless a separate comparison or replacement process is explicitly authorized.

When two competing reconciliation pull requests exist:

1. stop Ready and merge actions for both;
2. compare exact heads and diffs;
3. identify the valid candidate using canonical evidence;
4. keep the duplicate blocked;
5. close or supersede it only through an explicit action.

## Mandatory pre-PR checklist

Every reconciliation author must answer all items before opening or updating the pull request:

- [ ] The documented next safe action is the immediate action for the current live state.
- [ ] No future implementation, deployment, integration, or broader phase is implicitly authorized.
- [ ] Relevant custody evidence has been preserved.
- [ ] No invalidation rule has been weakened without explicit authorization.
- [ ] Simplification has not reduced traceability or governance precision.
- [ ] Every factual statement is supported by current versioned or live GitHub evidence.
- [ ] Obsolete instructions were removed only after their replacement state was verified.
- [ ] No competing active pull request represents the same reconciliation objective.
- [ ] The diff is limited to the explicitly authorized files.
- [ ] The pull request remains Draft until independent audit passes and Ready is separately authorized.

Any unchecked item is blocking.

## Mandatory audit checks

An independent audit of a reconciliation must verify:

- repository and pull request identity;
- live pull request state;
- exact base, head, and merge base;
- ahead/behind relationship;
- exact changed-file scope;
- factual accuracy of recorded completed gates;
- preservation of evidence custody;
- accuracy of the immediate next safe action;
- absence of implicit authorization;
- strength of invalidation rules;
- absence of a competing reconciliation pull request.

## Treatment of findings

Findings must be classified as:

- **BLOCKING:** incorrect state, gate skipping, implicit authorization, custody erosion, weakened invalidation, concurrent duplicate, unsupported claim, or unauthorized scope;
- **NON-BLOCKING:** optional clarity, formatting, or maintainability improvement that does not change governance meaning.

Blocking findings must be corrected and re-audited at the new exact head. They must not be downgraded merely to preserve delivery speed.

Non-blocking findings may enter backlog and must not automatically become new delivery gates.

## Scope control

Applying these guardrails must remain bounded.

A guardrail correction must not silently:

- redesign the product;
- modify application source;
- authorize backend, authentication, database, APIs, integrations, deployment, or infrastructure;
- alter the SFJM protocol repository;
- replace the active product objective with an open-ended governance initiative.

After the blocking governance defect is documented and contained, work returns to the previously identified product next safe action.