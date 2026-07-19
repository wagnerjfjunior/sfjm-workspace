# SFJM Workspace — Product and Protocol Boundary

## Purpose

This document defines the operational boundary between the SFJM Workspace product and the SFJM protocol.

## Canonical repositories

### Product

Repository:

`wagnerjfjunior/sfjm-workspace`

This repository is canonical for:

- product state;
- product documentation;
- interface decisions;
- product code;
- product handoffs;
- product implementation history.

### Protocol

Repository:

`wagnerjfjunior/StopJuniorMode`

This repository is canonical for:

- the SFJM protocol;
- protocol research;
- protocol governance;
- protocol evidence;
- protocol evaluation material.

## Separation rule

The SFJM Workspace applies SFJM principles but does not redefine the SFJM protocol.

Routine product decisions must not be copied into, interpreted as changes to, or treated as extensions of the protocol.

Changes in this repository do not modify the protocol repository.

Any proposed protocol change requires a separate scope, separate evidence, separate authorization and work performed in `wagnerjfjunior/StopJuniorMode`.

## Canonical product-state priority

When product-state sources conflict, use this order:

1. `main` of `wagnerjfjunior/sfjm-workspace`;
2. `handoffs/CURRENT.md`;
3. `docs/PROJECT_STATUS.md`;
4. `docs/NEXT_SAFE_ACTION.md`;
5. other versioned product documents.

Conversations, memory, summaries, screenshots, Google Drive and Vercel are auxiliary sources and must not silently replace versioned product state.

## Current restrictions

Without explicit authorization, do not:

- modify the protocol repository from Workspace work;
- infer protocol requirements from interface choices;
- add production infrastructure;
- create real synchronization claims;
- deploy or alter external systems;
- broaden the authorized product scope.
