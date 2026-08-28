# MoreNumTegra — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC`

Observed on: 2026-08-28

## Project identity

- Project: MoreNumTegra
- Canonical repository: `wagnerjfjunior/MoreNumTegra`
- Canonical branch: `main`
- Live `main` observed for this snapshot: `3eca0d4fc212ef5bb499c92534dedd5ac86094e6`
- Production commercial URL observed: `https://moretegra.com.br`
- Public homologation URL: `https://morenumtegra.vercel.app/`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`

The MoreNumTegra repository remains the only canonical source for product truth, lifecycle, implementation, Green/Vercel state, commercial data, authorization and next-safe-action state. This Workspace record is a bounded external-project snapshot and must not override MoreNumTegra versioned evidence.

## Current bounded state observed

The MoreNumTegra project documentation records the V1 Green commercial production as functionally homologated.

Observed state includes:

- Green Sales as commercial V1 production;
- `moretegra.com.br` operational over HTTPS;
- HTTP -> HTTPS redirect on the root domain;
- favicon active;
- 21-project catalogue;
- filters validated on desktop/mobile;
- search by name/neighborhood validated on mobile;
- ELO and ODE promotional states validated in production;
- WhatsApp CTA validated;
- Green native Form 46 submit and lead persistence validated;
- floating CTAs corrected through project PR #27 and observed across Form 46, HTML 02 and footer;
- canonical future flow preserved as GitHub -> Vercel -> Green.

The functional release reference recorded by MoreNumTegra is:

`2d1f9d656761433102f95e4c80bfdebf47f3607e`

The later canonical `main` snapshot observed for this Workspace record is:

`3eca0d4fc212ef5bb499c92534dedd5ac86094e6`

That later SHA contains the project-state documentation closure and does not replace the functional release reference.

## Non-blocking operational pending item

At the observation time:

- `www.moretegra.com.br` CNAME was configured in Green Sales;
- certificate validation for the `www` hostname remained pending;
- the root domain `moretegra.com.br` was already operational and this `www` item was recorded as non-blocking.

## Workspace representation boundary

SFJM Workspace may represent MoreNumTegra as an external project context using manually refreshed evidence.

This record implements no automatic behavior. It does not authorize or implement:

- GitHub ingestion or continuous synchronization;
- Vercel or Green API synchronization;
- automatic production monitoring;
- write-back to MoreNumTegra;
- DNS changes;
- Green Sales publication;
- analytics/pixels/tags;
- Search/SEO/SEM mutation;
- commercial-data mutation;
- backend, database or CMS integration.

Any Workspace interface derived from this record must label the data as manual/demonstrative and display repository, observed SHA and observation date.

## Canonical sources to consult

Resolve MoreNumTegra live and read at minimum:

- `bootstrap/BOOTSTRAP_CANONICO.md`;
- `handoffs/CURRENT.md`;
- `docs/PROJECT_STATUS.md`;
- `docs/NEXT_SAFE_ACTION.md`;
- `docs/BLOCKED_ACTIONS.md`;
- applicable baselines/ADR.

For specialist routing, resolve the SES Project Adapter separately; the Workspace does not replace SES registration or adoption rules.

## Current next safe action observed

The project next-safe-action record currently places MoreNumTegra in Green V1 operational maintenance.

The immediate bounded action is:

1. keep Green production stable;
2. when Green finishes the `www` certificate, validate `https://www.moretegra.com.br`;
3. route every future material change through GitHub branch/PR -> Vercel Preview -> merge main -> Vercel Production -> Green Sales -> production smoke.

## Refresh rule

This snapshot becomes stale when any of the following changes:

- MoreNumTegra `main` tip;
- project continuity or next-safe-action state;
- Green/Vercel production state;
- domain/certificate state;
- catalogue/commercial facts materially relevant to the displayed state;
- authorization boundaries;
- Workspace representation contract.

A stale snapshot must be refreshed from MoreNumTegra live before supporting a current conclusion.
