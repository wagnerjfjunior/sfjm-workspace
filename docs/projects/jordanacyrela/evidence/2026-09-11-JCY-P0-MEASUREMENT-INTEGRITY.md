# JCY-P0 — Measurement Integrity Evidence

## Record status

`AUTHORIZED / ACTIVE / READ_ONLY DIAGNOSTIC COMPLETE / REMEDIATION REQUIRED`

Observed on: 2026-09-11

Primary analytics window: 2026-06-11 through 2026-09-08.

Historical validation window: 2026-01-01 through 2026-09-08.

Canonical external project: `wagnerjfjunior/ProjetosCyrela`

Workspace project: `jordanacyrela-optimization`

## Authorization

Product Authority explicitly authorized starting `JCY-P0 — Measurement Integrity` on 2026-09-11.

This evidence pack records bounded diagnosis and the remediation requirements discovered from current analytics plus historical configuration evidence. It does not claim that GTM, GA4, Green, Search Console, DNS, Vercel, Google Ads, Meta Ads or production pages have already been mutated.

## Executive conclusion

JCY-P0 found five material measurement defects or integrity risks. The current dataset is useful enough to diagnose acquisition/conversion direction, but it is not yet trustworthy enough for production CRO experiments without remediation.

1. `/royal` tracking stopped behaving normally around early March 2026 while Search Console continued to observe the canonical route.
2. `jcy_intent` and `page_slug` propagate correctly, but score state does not propagate through pre-lead analytics and `score_update` is absent from GA4 despite historical GTM evidence that it existed.
3. The current GA4 dataset has no usable form-abandon event; historical GTM evidence also records a `form_start` versus `form.start` naming risk and an over-broad All Forms trigger.
4. Internal/QA referrals and clear data-center-style direct sessions materially contaminate a small traffic sample.
5. The home is split between `www.jordanacyrela.com.br` and the apex host, while product pages are primarily apex; Search Console selects the `www` home in the observed window.

A sixth reconciliation item was also identified from historical GTM documentation: the web and server containers were documented with different GA4 measurement IDs. This must be proven intentional or converged before measurement closure.

## JCY-P0-01 — `/royal` Search Console vs GA4

Search Console continues to attribute impressions/clicks to `https://jordanacyrela.com.br/royal`. In the primary 90-day window, `/royal` had 7 clicks, 966 impressions, 0.72% CTR and average position 11.18.

GA4 historical inspection shows `/royal` worked earlier in 2026: 31 `page_view` events / 14 active users in the historical aggregate; normal page/session events in January/February; last reliable `/royal` `page_view` on 2026-02-27. On 2026-03-04, `/royal` still shows `session_start`/`user_engagement` without a corresponding `page_view`. From 2026-06-11 through 2026-09-08, no normal `/royal` population appears; only a sparse `/royal2` path is visible.

**Finding:** `PROVEN MEASUREMENT BREAK / ROOT CAUSE IMPLEMENTATION-SIDE NOT YET PROVEN`.

Required remediation: verify the active GTM web container on `/royal`; validate `page_view`, `session_start`, `user_engagement` and custom listeners in GTM Preview/GA4 DebugView; reconcile `/royal` versus `/royal2`; prove a fresh `/royal` visit in the official GA4 property.

Status: `DIAGNOSIS COMPLETE / REMEDIATION REQUIRED`.

## JCY-P0-02 — Intent, page context and scoring

`jcy_intent` correctly carries `page_slug` and intent values such as `cta_ver_plantas`, `view_section_plantas`, `view_section_formulario`, `cta_whatsapp`, `cta_solicitar_book_digital` and `cta_agendar_visita`.

However, `score_session`, `score_total`, `lead_bucket` and `lead_class` are `(not set)` on observed pre-lead intent events. The one lead in the primary baseline carries score `3`, bucket `0-5`, class `FRIO`, but loses `page_slug`/intent context. Querying GA4 for `score_update` from 2026-01-01 through 2026-09-08 returns no events.

Historical GTM documentation records a score engine and a `score_update` dataLayer event. Historical documentation is not treated as proof of current runtime.

**Finding:** `INTENT/PAGE CONTEXT PASS / PRE-LEAD SCORE OBSERVABILITY FAIL`.

Required remediation: make score progression observable on relevant intent/micro-conversion events and/or restore a validated `score_update`; preserve score provenance; preserve product/page context on final lead; prove deterministic classification behavior.

Status: `PARTIAL PASS / REMEDIATION REQUIRED`.

## JCY-P0-03 — Form view/start/abandon/lead contract

Historical aggregate 2026-01-01 through 2026-09-08: `form_start` 67 events / 19 active users; `lead` 40 events / 12 active users; no abandonment-named event was observed in GA4. Primary baseline: one `form_start` user and one `lead` user.

Historical GTM review recorded two risks: both `form_start` and `form.start` appeared in prior material, and the form-submission trigger was documented as firing on `All Forms`.

**Finding:** `FORM_START OBSERVABLE / LEAD OBSERVABLE / ABANDONMENT NOT OBSERVABLE / CURRENT TRIGGER CONTRACT NOT PROVEN`.

Controlled QA must distinguish: form not touched; form section reached; form start then leave; invalid submit; valid submit; direct thank-you access; refresh/back after successful lead; representative desktop/mobile browsers. Direct thank-you must not create a new lead. If abandonment remains a KPI, its event semantics must be explicit and reproducible.

Status: `PARTIAL PASS / CONTROLLED QA + REMEDIATION REQUIRED`.

## JCY-P0-04 — Internal, referral and bot/data-center contamination

Observed referrals include `adm.greennsales.com.br / referral`, `moretegra.com.br / referral` and `chat.smclick.com.br / referral`. The Green admin referral pattern is consistent with admin/QA activity across many routes from a very small user population.

At minimum nine direct sessions were observed from Singapore, Ashburn, Boardman and Council Bluffs with zero engagement in the primary window. On a 229-session baseline this is material. Foreign traffic must not be blanket-deleted because legitimate users, VPNs and infrastructure can exist.

**Finding:** `RAW DATA PRESERVE / COMMERCIAL REPORTING SEGMENT REQUIRED`.

Required remediation: preserve raw GA4; create reproducible commercial-quality reporting segmentation; identify known QA/admin sources; apply internal traffic only where origin is reliably known; evaluate unwanted referrals carefully; classify suspicious cloud traffic analytically rather than by blanket geography.

Status: `DIAGNOSIS COMPLETE / REPORTING HYGIENE REQUIRED`.

## JCY-P0-05 — Apex/www canonical and attribution consistency

Both hosts generate tracked home traffic in the primary window.

`https://www.jordanacyrela.com.br/`: 22 page views, 21 session starts, 9 Google organic sessions and 12 direct sessions.

`https://jordanacyrela.com.br/`: 29 page views, 25 session starts, 1 Google organic session and 23 direct sessions.

Product pages are primarily represented on the apex host. Search Console returned the `www` home for the observed exact-home query: 6 clicks, 208 impressions, 2.88% CTR and average position 6.91.

**Finding:** `HOST SPLIT PROVEN / CANONICAL NORMALIZATION REQUIRED`.

Required remediation: select one preferred host and enforce permanent redirect plus canonical/internal-link/sitemap consistency. Apex is the current working recommendation because product architecture is predominantly apex, but current Green/domain constraints must be verified before mutation. Keep the Search Console domain property during migration.

Status: `DIAGNOSIS COMPLETE / REMEDIATION REQUIRED`.

## Additional reconciliation — web GA4 vs server GA4

Historical GTM documentation records different measurement IDs for the web tag and server pass-through tag. The currently queried Windsor GA4 account/property is account `512237190`, name `jordanacyrela.com.br`, stream id `12955413603`, stream name `jordanacyrela.com.br`. Windsor does not expose the measurement ID in the current field set.

**Finding:** `HISTORICAL PROPERTY DIVERGENCE RISK / CURRENT INTENTIONALITY NOT PROVEN`.

Before closure, GTM Web and GTM Server must prove whether the different historical destinations were intentional or accidental. No measurement ID should be changed from historical documentation alone.

## Canonical contract alignment

The external canonical Tracking Contract requires declared event semantics, route/page/product context, destination separation, lead validity before the lead event and tracking QA. The Form/CRM contract requires a defined capture-success condition and states that a thank-you page alone does not define a lead. JCY-P0 remediation is therefore an implementation of existing RESF contracts, not a parallel tracking architecture.

## Remediation order

1. Royal current-runtime GTM/GA4 repair and `/royal` vs `/royal2` reconciliation.
2. Web/server GA4 destination reconciliation and official-property proof.
3. Standardize form event naming and run controlled form/lead/abandon QA.
4. Restore/prove score observability and preserve page/product context through lead.
5. Establish raw-vs-commercial reporting hygiene for QA/referral/cloud traffic.
6. Normalize apex/www with one canonical redirect plan.
7. Re-run baseline queries and publish acceptance evidence.

## Exit condition

JCY-P0 may be marked `COMPLETE / ACCEPTED` only when `/royal` is reproducibly visible in the official GA4 property; web/server destination architecture is proven; intent + page/product + score fields are observable under the agreed contract; form states are reproducibly distinguishable; traffic hygiene is documented without corrupting raw data; one canonical hostname is enforced; and post-remediation baseline evidence is captured.

## Current next safe action

`JCY-P0` remains ACTIVE. The next material execution package is bounded measurement remediation against the current runtime configuration. This evidence document does not claim those external mutations have already occurred.
