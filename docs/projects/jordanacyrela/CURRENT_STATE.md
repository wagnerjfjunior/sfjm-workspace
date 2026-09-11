# Jordana Cyrela — Current State

Observed: 2026-09-11

## Program state

`JCY-P0 — MEASUREMENT INTEGRITY = ACTIVE / AUTHORIZED`

Product Authority authorized starting JCY-P0 on 2026-09-11.

The read-only diagnostic pass is complete and evidence is published in:

`docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md`

## Current task states

- `JCY-P0-01` — Royal GA4 vs Search Console: `DIAGNOSIS COMPLETE / REMEDIATION REQUIRED`
- `JCY-P0-02` — intent/page/score propagation: `PARTIAL PASS / REMEDIATION REQUIRED`
- `JCY-P0-03` — form/abandon/lead contract: `PARTIAL PASS / CONTROLLED QA + REMEDIATION REQUIRED`
- `JCY-P0-04` — internal/referral/bot contamination: `DIAGNOSIS COMPLETE / REPORTING HYGIENE REQUIRED`
- `JCY-P0-05` — apex/www consistency: `DIAGNOSIS COMPLETE / REMEDIATION REQUIRED`

## Material findings

1. `/royal` stopped producing normal GA4 page-view evidence around early March 2026 while Search Console continued to observe the route.
2. `jcy_intent` and `page_slug` work; pre-lead score observability does not.
3. No usable abandonment event is present in the current GA4 dataset.
4. QA/admin referrals and data-center-style sessions materially affect a small sample.
5. Home traffic is split between `www` and apex.
6. Historical GTM documentation records different GA4 destinations on web vs server; current intentionality is not yet proven.

## Current next safe action

Execute the bounded JCY-P0 remediation package against current runtime configuration, in this order:

1. Royal GTM/GA4 runtime repair and `/royal` vs `/royal2` reconciliation.
2. Web/server GA4 destination reconciliation.
3. Form event naming + controlled form/lead/abandon QA.
4. Score observability + lead page/product-context propagation.
5. Raw-vs-commercial reporting hygiene.
6. Apex/www canonical normalization.
7. Post-remediation evidence run.

## Boundary

JCY-P0 authorization allows this measurement-integrity workstream to proceed, but this document does not claim any external mutation already occurred. Every mutation must be validated against current runtime configuration and must preserve raw analytics evidence and the canonical RESF contracts.
