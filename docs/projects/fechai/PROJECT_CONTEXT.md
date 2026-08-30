# FECH.AI — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: 2026-08-30

## Project identity

- Project: FECH.AI
- Canonical repository: `wagnerjfjunior/fecha.ai`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `a15dde5067c716b0ab3c9342855069c1fc00bcd0`
- Program authority: Issue #141 — `Security-to-Scale 2026`
- Current milestone work item: Issue #150 — `M1: Security Truth Baseline`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

FECH.AI remains the only canonical authority for FECH.AI product, security,
architecture, runtime, lifecycle, milestone and authorization state. This
Workspace record is a bounded manual snapshot only.

## Current program state

```text
#141 Security-to-Scale 2026: OPEN
#142 M0: CLOSED / completed
#150 M1 Security Truth Baseline: OPEN
M1 status: ACTIVE
Security Go: NOT GRANTED
Broad paid commercialization: BLOCKED
```

M1 is not marked complete by this snapshot. The Workspace preserves the
accepted-gate rule: activity, PR count and elapsed time do not advance the
program percentage without a canonical milestone-exit acceptance.

## Material transition — APPSEC-M1-003 / public.leads

Canonical FECH.AI evidence observed on 2026-08-30:

```text
PR #152: CLOSED / MERGED
reviewed exact head:
  6964ad993b0deddd85fcf4ff7711929b4d956285
merge commit at implementation closure:
  30f4d40acbe0a1f026df9c29451607d6fa361d11

production migration:
  APPLIED / SUCCESS_CONFIRMED

LIVE_DATABASE_CONTROL_PRESENT:
  PROVEN

4 parent UNIQUE (id, empresa_id):
  PRESENT / VALIDATED

4 public.leads composite tenant-aware FKs:
  PRESENT / VALIDATED

RLS / FORCE RLS:
  PRESERVED / PASS

public.leads rows:
  5691

cross-tenant relationship mismatches:
  corretor = 0
  time = 0
  lista = 0
  lote = 0
```

Independent AppSec result:

```text
PUBLIC_LEADS_SLICE_STATUS =
  IMPLEMENTATION_COMPLETE_WITH_EXPLICIT_RUNTIME_EVIDENCE_LIMITATION

FINAL_POST_APPLICATION_VERDICT =
  APPSEC_M1_003_PUBLIC_LEADS_POST_APPLICATION_PASS_WITH_RESIDUAL_RUNTIME_EVIDENCE_LIMITATION

BLOCKERS = NONE
```

Documentation reconciliation:

```text
PR #153: CLOSED / MERGED
merge commit / current FECH.AI main:
  a15dde5067c716b0ab3c9342855069c1fc00bcd0

Vercel status on merge commit:
  SUCCESS
```

## Residual risks preserved

```text
CONTROLLED_RUNTIME_NEGATIVE_PASS = NOT_ESTABLISHED

MIGRATION_LEDGER_PROVENANCE =
  NON_BLOCKING_PROVENANCE_RESIDUAL

repository migration version:
  20260830030000

applied ledger version:
  20260830184834

Security Go:
  NOT GRANTED
```

No production adversarial write was executed. Migration-ledger history was not
rewritten. The public.leads closure does not imply a broad M1 PASS or Security Go.

## Dashboard interpretation

The current FECH.AI card may state:

```text
M1 ACTIVE
public.leads implementation/catalog slice COMPLETE
runtime-negative PASS NOT ESTABLISHED
Security Go NOT GRANTED
```

The dashboard must not show the prior statement that FECH.AI live database
truth is wholly unestablished. It may show the proven public.leads LIVE evidence
only within its bounded scope.

## Program progress representation

The Workspace continues to use:

```text
program progress = sum(milestone weight × accepted milestone completion)
```

M0 remains the only milestone with an accepted exit represented as complete.
M1 remains OPEN, therefore no additional weighted milestone contribution is
recorded by this refresh.

Current represented program progress remains: **6.25%**.

This is a planning/accepted-gate visualization, not a security-confidence,
runtime-readiness or Security Go score.

## Current continuation boundary

The previously versioned FECH.AI `docs/sfjm/NEXT_SAFE_ACTION.md` still contains
older M1-A wording. Later canonical evidence closes the bounded public.leads
implementation/catalog slice, but does not itself select another APPSEC-M1-003
surface.

Therefore this Workspace snapshot does not invent a new FECH.AI technical task.

Dashboard-safe continuation:

> Resolve FECH.AI live and select exactly one next material workstream under
> Product Authority; do not reopen public.leads without a material invalidation
> event.

## Current blockers / limitations preserved

- Security Go: `NOT GRANTED`;
- broad paid commercialization: `BLOCKED`;
- Issue #150 M1 remains `OPEN`;
- `CONTROLLED_RUNTIME_NEGATIVE_PASS = NOT_ESTABLISHED` for public.leads;
- migration-ledger provenance mismatch remains a non-blocking operational residual;
- #139 and #140 remain separate workstreams until resolved live;
- Workspace does not select or authorize the next FECH.AI implementation slice.

## Evidence boundary

Preserve:

```text
STATIC_IMPLEMENTATION_REVIEW != LIVE_DATABASE_VALIDATED
LIVE_DATABASE_VALIDATED != CONTROLLED_RUNTIME_PASS
CONTROLLED_RUNTIME_PASS != SECURITY_GO
VERSIONED != MERGED != APPLIED != DEPLOYED != RUNTIME_TESTED
```

## Workspace representation boundary

The Workspace does not implement or authorize:

- automatic GitHub ingestion;
- API/webhook/cron/polling synchronization;
- background monitoring;
- write-back to FECH.AI;
- Supabase/database mutation;
- production adversarial testing;
- migration-ledger mutation;
- automatic state scoring;
- automatic approval, Ready, merge or Security Go.

The UI must label this data as manual and show repository, observed SHA and
observation date.

## Refresh / invalidation rule

This snapshot becomes stale when any material FECH.AI state changes, including:

- FECH.AI `main`;
- Issues #141/#150;
- public.leads invalidation evidence;
- active workstream classification;
- milestone exit acceptance;
- Security Go or commercialization decision.

A stale snapshot must be manually revalidated against FECH.AI canonical
evidence before it supports a current conclusion.

## Canonical sources used for this refresh

Resolved from `wagnerjfjunior/fecha.ai@a15dde5067c716b0ab3c9342855069c1fc00bcd0`:

- `docs/sfjm/CURRENT_STATE.md`;
- `docs/sfjm/EVIDENCE_FRESHNESS.md`;
- `docs/sfjm/handoffs/CURRENT.md`;
- `docs/sfjm/NEXT_SAFE_ACTION.md`;
- Issue #141;
- Issue #150;
- live PR #152/#153 lifecycle evidence;
- Vercel commit status for the PR #153 merge commit.
