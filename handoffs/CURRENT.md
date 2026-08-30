# SFJM Workspace — Current Handoff

## Canonical source

Repository: `wagnerjfjunior/sfjm-workspace`

Live `main` remains canonical for Workspace product state. External projects remain canonical for their own product, security, runtime, Search/SEM and authorization truth.

## Current Workspace state

The previous FECH.AI Roadmap + Runbook delivery remains complete.

A new bounded Workspace initiative is now active by Product Authority decision:

```text
PR #24
feat: consolidate Search into unified SFJM dashboard
state: OPEN / DRAFT
base: main@90ff0ef74944613e648c45f90320973a753c0afa
```

Purpose:

- make SFJM Workspace the single consolidated dashboard;
- keep FECH.AI continuity/program visibility;
- refresh the stale MoreNumTegra representation;
- ingest bounded Search/SEO/SEM evidence from `Blogs-sites-portais-seo`;
- eliminate the need for a parallel SEO dashboard.

## Unified dashboard rule

`wagnerjfjunior/Blogs-sites-portais-seo` remains the Search Center of Expertise/provider.

It owns Search evidence, strategy, recommendations and provider-local lifecycle. It does not become the dashboard owner.

The dashboard ownership/consolidation rule is:

```text
MoreNumTegra canonical truth
+ Search provider versioned feed
+ FECH.AI canonical snapshot
-> SFJM Workspace unified dashboard
```

Aggregation contract:

`docs/UNIFIED_DASHBOARD_AGGREGATION_CONTRACT.md`

## FECH.AI snapshot refreshed for this initiative

Observed live on 2026-08-30:

- canonical repository: `wagnerjfjunior/fecha.ai`;
- live main: `a15dde5067c716b0ab3c9342855069c1fc00bcd0`;
- Issue #150 M1: OPEN / ACTIVE;
- APPSEC-M1-003 / public.leads: implementation/catalog slice complete with explicit runtime-evidence limitation;
- PR #152: merged and production migration applied;
- live database catalog control: proven;
- PR #153: merged; Vercel post-merge status SUCCESS;
- `CONTROLLED_RUNTIME_NEGATIVE_PASS = NOT_ESTABLISHED`;
- `MIGRATION_LEDGER_PROVENANCE = NON_BLOCKING_PROVENANCE_RESIDUAL`;
- Security Go: NOT GRANTED;
- broad paid commercialization: BLOCKED.

This refresh does not mark M1 complete and does not select another APPSEC-M1-003
slice. The Workspace remains visualization/continuity only.

## MoreNumTegra snapshot refreshed for this initiative

Observed live on 2026-08-30:

- canonical repository: `wagnerjfjunior/MoreNumTegra`;
- live main: `5befb0efee8e4bd6ca96bb594c010afded24056e`;
- current published release recorded by the consumer: `18cfab98e01be29c86d78d08f2f5035a8da70444`;
- Green commercial production: `https://moretegra.com.br/`;
- Vercel homologation: `https://morenumtegra.vercel.app/`;
- Search + Conversion release: completed;
- P0-B Search/indexability: pending next cycle;
- Measurement Foundation: not configured;
- Green capability observed for Meta Pixel, GTM and Google Analytics;
- no MoreNumTegra tracking IDs are configured/authorized by this snapshot.

## Search provider snapshot refreshed for this initiative

Observed live on 2026-08-30:

- provider: `wagnerjfjunior/Blogs-sites-portais-seo`;
- live main: `d0f6e4c9879a48bdac00bea1cf40056e04bf736c`;
- PR #10: MERGED;
- provider result for MoreNumTegra award/conversion/metadata integrated;
- provider itself states it does not maintain a parallel SFJM/dashboard for MoreNumTegra;
- Search recommendations remain evidence/input; MoreNumTegra keeps implementation/deploy/budget/publication authority.

## Current lifecycle

PR #24 must remain Draft until:

1. changed-file scope is final;
2. dashboard/data/docs are validated;
3. Vercel/CI checks for the exact head are inspected;
4. independent exact-head documentation audit passes;
5. Ready receives separate Product Authority authorization.

Merge remains a later separate authorization gate.

## Explicit boundaries

This initiative does not authorize:

- automatic provider-to-Workspace sync;
- GitHub ingestion backend;
- polling/webhooks/cron;
- external-project write-back;
- MoreNumTegra mutation;
- SEO provider mutation;
- Meta/GTM/GA4 activation;
- Search Console mutation;
- Google Ads campaign/spend;
- StopJuniorMode protocol changes.

## Invalidation

This snapshot/initiative must be revalidated when:

- Workspace PR #24 head/base/state changes materially;
- MoreNumTegra main/release/next action changes;
- FECH.AI main/Issue #150/public.leads evidence changes;
- Search provider main/result/lifecycle changes;
- Search/indexability or measurement state changes;
- dashboard aggregation contract changes.
