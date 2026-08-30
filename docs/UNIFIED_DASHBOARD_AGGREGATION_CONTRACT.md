# Unified Dashboard Aggregation Contract — SFJM Workspace

## Status

`PRODUCT_AUTHORITY_DECISION / SINGLE_DASHBOARD_MODEL / MANUAL_VERSIONED_FEEDS`

Decision date: 2026-08-30

## 1. Decision

`wagnerjfjunior/sfjm-workspace` is the single dashboard/consolidation surface for project continuity and cross-project executive visibility.

The Search provider project:

`wagnerjfjunior/Blogs-sites-portais-seo`

does not maintain a parallel dashboard for MoreNumTegra or duplicate SFJM Workspace visualization.

Instead, the provider produces versioned Search/SEO/SEM evidence, recommendations, status and handoff artifacts in its own canonical repository. SFJM Workspace consumes those artifacts as bounded external inputs and consolidates them with the consumer/project state in one dashboard.

## 2. Authority boundaries

Canonical truth remains distributed by domain:

- MoreNumTegra product/runtime/commercial/lifecycle truth -> `wagnerjfjunior/MoreNumTegra`;
- Search strategy/evidence/recommendations -> `wagnerjfjunior/Blogs-sites-portais-seo`;
- Workspace visualization/consolidation -> `wagnerjfjunior/sfjm-workspace`;
- SFJM protocol truth -> `wagnerjfjunior/StopJuniorMode`;
- SES specialist routing/certification -> `wagnerjfjunior/Specialist-Engineering-System`.

The dashboard is a consolidation layer, not a replacement source of truth.

## 3. Feed model

Current model is manual/versioned, not automatic sync.

Provider feed into Workspace should contain, when material:

- provider repository and observed SHA;
- consumer repository and observed SHA;
- scope/result identifier;
- Search/SEO/SEM status;
- findings/priorities;
- recommendations accepted/pending/rejected when evidenced;
- measurement/indexability state when proven;
- blockers and next safe action;
- evidence paths;
- invalidation conditions.

Workspace may normalize presentation, but must preserve provenance and evidence class.

## 4. No duplicate dashboard rule

```text
SEO PROVIDER DASHBOARD FOR MORENUMTEGRA = NOT REQUIRED
SFJM WORKSPACE = SINGLE CONSOLIDATED DASHBOARD
```

The provider may maintain project-local status/handoff documents needed for its own governance. Those documents are feeds/evidence, not a competing executive dashboard.

## 5. Refresh semantics

A Workspace Search snapshot becomes stale when any material source changes, including:

- MoreNumTegra main/release/lifecycle;
- provider main/result/lifecycle;
- Search/indexability state;
- measurement/tracking state;
- campaign/spend authorization;
- production evidence;
- provider/consumer authority boundary.

When stale, Workspace must resolve both consumer and provider live before presenting a current conclusion.

## 6. Automation boundary

This decision does not authorize:

- webhook/cron/polling;
- automatic GitHub ingestion;
- automatic provider-to-Workspace writes;
- external-project write-back;
- campaign publication/spend;
- Search Console mutation;
- tracking activation.

Automatic ingestion may be considered later under a separate architecture/security/authority gate.

## 7. Consolidation target

Initial unified dashboard should represent at minimum:

1. FECH.AI continuity/program state;
2. MoreNumTegra product/release state;
3. MoreNumTegra Search/SEO provider state;
4. current Search/indexability and measurement readiness;
5. provenance for each external snapshot.

Future projects may be added under the same contract without creating project-specific parallel dashboards.
