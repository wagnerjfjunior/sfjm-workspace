# SFJM Workspace — Next Safe Action

## Single next safe action

Execute an independent read-only audit of branch:

`docs/canonical-continuity-layer`

against the current canonical `main`.

The audit must confirm that the six documents:

- describe the current repository state without relying on conversation memory;
- preserve the approved product direction;
- keep the SFJM Workspace separate from the SFJM protocol repository;
- do not authorize implementation, integration, deployment or redesign;
- do not present demonstrative prototype data as verified operational facts;
- remain internally and cross-document consistent;
- identify the exact live base, merge base and branch head being audited;
- contain exactly the authorized six-file scope.

## Completion condition

This action is complete only when an independent read-only audit of the exact live branch head returns no blocking finding.

A successful audit completes only this gate. It does not authorize any later gate.

## Independent gates after a successful audit

The following are separate actions and each requires a fresh state verification and explicit user authorization:

1. creation of a Draft pull request;
2. transition of that pull request to Ready for review;
3. merge.

Authorization for one gate does not imply authorization for any later gate.

## Action after successful merge

Only after this documentation layer is merged into `main` may the next product action be reassessed from the new canonical state.

The currently known visual priority is to improve layout density for normal notebook screens at 100% zoom while preserving legibility and the approved hierarchy. This is a future implementation candidate, not authorization to modify the prototype now.

## Expiration conditions

This next safe action expires if:

- the live branch head changes for any reason;
- the base branch or base SHA changes;
- the merge base changes;
- the authorized six-file scope changes;
- the user changes the authorization;
- evidence shows that any statement in these documents is inconsistent with the repository.
