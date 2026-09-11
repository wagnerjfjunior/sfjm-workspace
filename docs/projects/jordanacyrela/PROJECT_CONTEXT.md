# Jordana Cyrela — SEO/GEO/CRO Optimization — External Project Context

## Record status

`DOCUMENTATION_ONLY / MANUAL_SNAPSHOT / NO_AUTOMATIC_SYNC / DIAGNOSTIC_COMPLETE / IMPLEMENTATION_NOT_AUTHORIZED`

Observed on: 2026-09-11

Analytics baseline window: 2026-06-11 through 2026-09-08, compared with 2026-03-13 through 2026-06-10.

## Project identity

- Project: Jordana Cyrela — SEO/GEO/CRO Optimization
- Project id: `jordanacyrela-optimization`
- Canonical product repository: `wagnerjfjunior/ProjetosCyrela`
- Canonical branch: `main`
- Canonical repository `main` observed for this snapshot: `60a8af63a94b86542c52f992d76bb5df1ca4ea2e`
- Production URL: `https://jordanacyrela.com.br`
- Workspace repository: `wagnerjfjunior/sfjm-workspace`
- Analytics source observed: GA4 property `jordanacyrela.com.br`
- Search source observed: Search Console property `sc-domain:jordanacyrela.com.br`

`wagnerjfjunior/ProjetosCyrela` remains authoritative for product implementation, RESF contracts, pages, deployment state, SEO/GEO implementation and production truth. This Workspace record represents the optimization program and its bounded analytics baseline; it must not override the canonical repository.

## Program objective

Transform `jordanacyrela.com.br` from a site that is already discoverable through Google and AI assistants into a measurable acquisition and conversion system, while preserving the RESF/SEO/GEO authority already accumulated.

The program must improve the complete path:

`Google / AI / direct discovery -> qualified landing session -> product intent -> commercial intent -> contact -> lead -> qualified lead -> visit -> sale`

The project is explicitly not a redesign-for-redesign's-sake. Existing semantic content that contributes to ranking, rich results or GEO authority must be preserved unless evidence demonstrates that a bounded change is safe.

## Analytics baseline — observed facts

### GA4 — last 90-day window

- sessions: 229
- active users: 171
- engaged sessions: 131
- engagement rate: 57.21%
- bounce rate: 42.79%
- average engagement time per session: 42.07 seconds
- page/screen views: 261
- views per session: 1.14
- leads: 1
- session-to-lead conversion rate: 0.44%

### GA4 — previous 90-day comparison

- sessions: 313
- active users: 254
- engaged sessions: 180
- engagement rate: 57.51%
- average engagement time per session: 64.30 seconds
- leads: 4
- session-to-lead conversion rate: 1.28%

Observed directional change:

- sessions: approximately -26.8%
- active users: approximately -32.7%
- leads: -75%
- session-to-lead conversion: approximately -65.6%
- average engagement time per session: approximately -34.6%

### Search Console — last 90-day window

- clicks: 102
- impressions: 8,251
- CTR: 1.24%
- average position: 7.80

### Search Console — previous 90-day comparison

- clicks: 179
- impressions: 11,999
- CTR: 1.49%
- average position: 6.71

Observed directional change:

- clicks: approximately -43.0%
- impressions: approximately -31.2%
- CTR declined
- average position deteriorated by about 1.09 positions

### Recent 28-day warning

For 2026-08-12 through 2026-09-08:

- sessions: 57
- active users: 40
- engaged sessions: 35
- average engagement time per session: 25.81 seconds
- leads: 0
- Search Console clicks: 20
- Search Console impressions: 2,235
- Search Console CTR: 0.89%
- Search Console average position: 8.66

The preceding comparable 28-day Search Console window had 39 clicks and 1.60% CTR.

## Product concentration risk

`/capri` is currently the dominant acquisition asset.

Observed in the last 90-day window:

- GA4 landing sessions on `/capri`: 135 of 229 total sessions (~59%)
- Search Console `/capri`: 77 clicks and 4,975 impressions
- `/capri` represents roughly 75% of Search Console clicks in the observed window
- `/capri` engagement rate: 66.67%
- `/capri` average engagement time per session: 56.99 seconds
- `/capri` leads: 0

Search Console concentration by product page:

| Page | Clicks | Impressions | CTR | Avg. position |
| --- | ---: | ---: | ---: | ---: |
| `/capri` | 77 | 4,975 | 1.55% | 5.48 |
| `/zen` | 10 | 987 | 1.01% | 9.34 |
| `/royal` | 7 | 966 | 0.72% | 11.18 |
| `/epic` | 3 | 915 | 0.33% | 12.09 |
| `/jardim-europa` | 0 | 265 | 0% | 26.17 |
| `/vila-mariana` | 0 | 50 | 0% | 24.98 |

The program must reduce dependency on Capri by improving Zen, Royal, Epic and the neighborhood hubs without degrading Capri's existing authority.

## Conversion funnel finding

Observed custom-event behavior in the last 90-day window:

- users with `jcy_intent`: 23
- users clicking `cta_ver_plantas`: 11
- users reaching `view_section_formulario`: 4
- `form_start`: 1 user
- `lead`: 1 user

This establishes the primary observed leak as occurring before form start: users show product interest but rarely progress to explicit commercial contact.

The current evidence does not support the hypothesis that form completion itself is the primary bottleneck, because the one observed `form_start` also produced the one observed `lead`.

## Mobile conversion finding

Observed GA4 last 90-day window:

- desktop: 139 sessions, 1 lead
- mobile: 93 sessions, 0 leads
- engagement rates were similar on desktop and mobile (~57-58%)

Observed Search Console:

- mobile: 59 clicks, 4,068 impressions, 1.45% CTR, average position 6.31
- desktop: 43 clicks, 4,166 impressions, 1.03% CTR, average position 9.26

Mobile is therefore a priority conversion surface: Google is delivering meaningful mobile visibility, but the observed mobile sessions generated no leads.

## GEO / AI discovery finding

GA4 already records an `AI Assistant` channel.

Observed last 90-day window:

- AI Assistant sessions: 11
- ChatGPT sessions: 4
- Gemini sessions: 7
- AI Assistant leads: 0

This proves discoverability from AI assistants in the observed dataset, but does not yet prove commercial contribution. GEO work must therefore preserve machine-readable authority while improving the transition from AI answer/citation to commercial action.

## Measurement integrity findings

The program must not treat the current analytics layer as fully trusted until JCY-P0 closes.

Observed gaps include:

1. Search Console recorded 7 clicks to `/royal`, while GA4 did not present a corresponding normal `/royal` traffic pattern and instead exposed a sparse `/royal2` path.
2. Custom dimensions `score_session`, `score_total`, `lead_bucket` and `lead_class` were `(not set)` across the observed pre-lead event population; values appeared on the single `lead` event only.
3. `form_start = 1` and `lead = 1`; no usable abandonment event population was observed in the baseline.
4. Traffic includes data-center/foreign-city patterns and internal/referral sources that can materially distort a small sample.
5. Root/home observations include `www.jordanacyrela.com.br` while product pages are primarily represented on the apex host; canonical/redirect/measurement consistency must be verified.

## Program workstreams

The canonical optimization WBS for this Workspace snapshot is defined in `OPTIMIZATION_WBS.md`.

High-level order:

1. `JCY-P0` — Measurement Integrity
2. `JCY-P1` — Capri CRO
3. `JCY-P2` — SEO / CTR Recovery and Product Diversification
4. `JCY-P3` — Mobile Conversion
5. `JCY-P4` — Retargeting + GEO Conversion Bridge
6. `JCY-P5` — Neighborhood Hubs / Internal Authority Distribution
7. `JCY-P6` — Evidence, KPI Dashboard and Optimization Loop

Only the diagnostic and planning work represented by this Workspace registration is authorized by the current request. Implementation of changes to production, tracking configuration, ad platforms, Green, GTM, GA4, Search Console, Vercel or the canonical product repository remains separately gated.

## Current next safe action

`JCY-P0 — Measurement Integrity` is the next eligible workstream.

It is not yet authorized for implementation by this record.

Before CRO/SEO mutation, JCY-P0 must prove or correct:

- Royal routing/tagging consistency;
- event and custom-dimension propagation;
- form-start/abandon/lead measurement;
- internal/referral/bot contamination controls;
- canonical host and cross-domain/referral behavior;
- a reproducible baseline query for every program KPI.

## Workspace representation boundary

The Workspace may display this project as an external project context using manually refreshed evidence.

This registration does not create live synchronization and does not authorize:

- automatic GA4/Search Console/Windsor ingestion;
- automatic GitHub ingestion;
- mutation of `wagnerjfjunior/ProjetosCyrela`;
- Vercel deployment;
- GTM/GA4/Search Console changes;
- Green Sales changes;
- Google Ads or Meta Ads mutation;
- production CRO changes;
- SEO metadata/schema mutation;
- automatic remarketing audience creation.

Any current conclusion supported by this snapshot must carry its observation date and baseline window.

## Refresh rule

Refresh this snapshot whenever any of the following materially changes:

- `ProjetosCyrela/main` tip;
- GA4 tagging/event contract;
- Search Console visibility profile;
- production page routing or canonical host behavior;
- lead/form flow;
- RESF contract;
- major page content/metadata/schema;
- paid-media activation;
- program authorization state;
- WBS acceptance or completion state.
