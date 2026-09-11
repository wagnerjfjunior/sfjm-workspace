# Jordana Cyrela — Optimization WBS

## Status

`DEFINED / NOT_AUTHORIZED_FOR_IMPLEMENTATION`

Baseline observed: 2026-09-11 using GA4 and Search Console data through 2026-09-08.

Estimated effort in this document is a Workspace planning estimate, not canonical actual effort.

## WBS summary

| WBS | Workstream | State | Estimate | Primary exit condition |
| --- | --- | --- | ---: | --- |
| JCY-P0 | Measurement Integrity | NEXT / NOT_AUTHORIZED | 20h | analytics funnel trusted enough for optimization decisions |
| JCY-P1 | Capri CRO | PLANNED / NOT_AUTHORIZED | 28h | commercial-intent layer deployed and measured without harming SEO/GEO |
| JCY-P2 | SEO / CTR Recovery | PLANNED / NOT_AUTHORIZED | 24h | CTR/ranking recovery plan implemented across priority products |
| JCY-P3 | Mobile Conversion | PLANNED / NOT_AUTHORIZED | 16h | mobile contact path validated end-to-end |
| JCY-P4 | Retargeting + GEO Bridge | PLANNED / NOT_AUTHORIZED | 20h | high-intent audiences and AI-to-action path measurable |
| JCY-P5 | Neighborhood Hubs | PLANNED / NOT_AUTHORIZED | 20h | Jardim Europa/Vila Mariana become useful authority distributors |
| JCY-P6 | Evidence + KPI Loop | PLANNED / NOT_AUTHORIZED | 12h | repeatable evidence pack and optimization cadence established |
|  | **Total forecast** |  | **140h** |  |

---

## JCY-P0 — Measurement Integrity

**State:** `NEXT_ELIGIBLE / NOT_AUTHORIZED`

**Objective:** remove known evidence defects before production CRO/SEO changes.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P0-01 | Diagnose `/royal` Search Console vs GA4 routing/tag discrepancy | 4h | S |
| JCY-P0-02 | Validate `jcy_intent`, `page_slug`, score and lead-class propagation | 4h | S |
| JCY-P0-03 | Validate form view/start/abandon/lead event contract end-to-end | 4h | S |
| JCY-P0-04 | Review internal traffic, data-center/bot noise and unwanted referrals | 4h | S |
| JCY-P0-05 | Validate apex/www canonical, redirects, cross-domain and referral behavior | 4h | S |

### Acceptance criteria

- `/royal` navigation from Google is reproducibly visible in GA4 or the reason for non-observation is documented and corrected.
- `jcy_intent` events carry the expected product/page dimensions.
- pre-lead scoring fields are populated when scoring is expected, rather than only at `lead`.
- form view, form start, abandonment and lead outcomes can be distinguished in controlled tests.
- internal/test/referral traffic exclusions are documented and reproducible.
- apex/www canonical and redirect behavior is consistent and does not split attribution.
- baseline GA4 and Search Console queries are saved/documented for all program KPIs.

---

## JCY-P1 — Capri CRO

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** convert existing product interest into commercial action while preserving Capri's current SEO/GEO authority.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P1-01 | Commercial-offer architecture above the fold | 6h | M |
| JCY-P1-02 | Sticky/mobile CTA and persistent contact path | 4h | S |
| JCY-P1-03 | Reposition CTA after plants/gallery/high-intent sections | 4h | S |
| JCY-P1-04 | Add current-price/availability framing with freshness semantics | 4h | S |
| JCY-P1-05 | Implement commercial-intent event taxonomy | 4h | S |
| JCY-P1-06 | QA + experiment design + regression check for SEO/GEO | 6h | M |

### Required commercial actions

At minimum test/measure:

- `Ver plantas`
- `Receber tabela e disponibilidade atual`
- `Falar no WhatsApp`
- `Agendar visita`

### Guardrails

- do not remove semantic sections solely to shorten the page;
- do not remove structured data or entity signals without evidence;
- preserve canonical URL and indexability;
- every CRO release must include before/after event validation.

### Evaluation targets

These are experiment targets, not claims of expected performance:

- commercial CTA rate should materially exceed the current near-zero contact-action rate;
- form-section reach should improve from the observed 4 users / 171 active users baseline;
- session-to-lead conversion should be evaluated only after a minimum meaningful sample, preferably >= 200 qualified sessions for directional interpretation;
- no material deterioration in indexed visibility, rich-result eligibility or GEO citation path.

---

## JCY-P2 — SEO / CTR Recovery and Product Diversification

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** recover organic acquisition and reduce excessive dependency on Capri.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P2-01 | Cluster Search Console queries by informational vs commercial intent | 4h | S |
| JCY-P2-02 | Rewrite/test titles and descriptions for commercial relevance | 6h | M |
| JCY-P2-03 | Royal optimization | 4h | S |
| JCY-P2-04 | Zen optimization | 4h | S |
| JCY-P2-05 | Epic optimization | 4h | S |
| JCY-P2-06 | Structured-data/snippet regression review | 2h | S |

### Priority baseline

- Capri: 77 clicks / 4,975 impressions / 1.55% CTR / position 5.48
- Zen: 10 / 987 / 1.01% / 9.34
- Royal: 7 / 966 / 0.72% / 11.18
- Epic: 3 / 915 / 0.33% / 12.09

### Query expansion target

Prioritize commercial modifiers such as:

- preço / valor
- tabela
- plantas
- unidades disponíveis
- condições
- fluxo de pagamento
- entrega
- endereço
- decorado
- visita
- condomínio
- financiamento
- comparação

Do not treat product-name queries alone as proof of bottom-funnel intent.

---

## JCY-P3 — Mobile Conversion

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** remove the observed gap where mobile receives strong organic visibility but produced zero leads in the baseline.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P3-01 | Mobile UX/contact audit across priority product pages | 4h | S |
| JCY-P3-02 | Mobile sticky CTA + compact lead path implementation | 6h | M |
| JCY-P3-03 | iPhone/Android form, WhatsApp and keyboard validation | 4h | S |
| JCY-P3-04 | Mobile-specific analytics QA | 2h | S |

### Acceptance criteria

- contact CTA is reachable without requiring deep scroll;
- no CTA is obscured by modal, chat, cookie or Green UI;
- form and WhatsApp work on representative mobile devices;
- mobile commercial actions are separately measurable;
- desktop behavior is not regressed.

---

## JCY-P4 — Retargeting + GEO Conversion Bridge

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** stop losing high-intent visitors after their first or repeated research session, and convert AI discovery into measurable commercial actions.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P4-01 | Define high-intent audiences from behavioral events | 6h | M |
| JCY-P4-02 | Map Google/Meta audience activation requirements | 4h | S |
| JCY-P4-03 | Define AI-assistant landing/commercial bridge | 4h | S |
| JCY-P4-04 | Validate AI Assistant source attribution | 3h | S |
| JCY-P4-05 | QA audience/event eligibility and privacy boundaries | 3h | S |

### Candidate audience signals

- `cta_ver_plantas`
- `view_section_plantas`
- `view_section_formulario`
- high scroll / deep content interaction
- gallery interaction
- FAQ interaction
- returning visitor
- high score, once scoring is proven

No Google Ads or Meta Ads audience mutation is authorized by this WBS definition alone.

---

## JCY-P5 — Neighborhood Hubs / Internal Authority Distribution

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** turn `/jardim-europa` and `/vila-mariana` into real topical/commercial hubs instead of thin internal-linking constructs.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P5-01 | Jardim Europa hub redesign/content architecture | 8h | M |
| JCY-P5-02 | Vila Mariana hub redesign/content architecture | 8h | M |
| JCY-P5-03 | Internal-link graph and related-product distribution | 4h | S |

### Baseline

- `/jardim-europa`: 265 impressions, 0 clicks, avg. position 26.17
- `/vila-mariana`: 50 impressions, 0 clicks, avg. position 24.98

### Hub content model

Potential sections must be justified by source material and search demand, including:

- relevant Cyrela products;
- buyer/market profile where supported;
- comparisons;
- neighborhood context;
- commercial-intent FAQs;
- price/availability framing;
- internal links to product pages;
- structured entity relationships.

---

## JCY-P6 — Evidence, KPI Dashboard and Optimization Loop

**State:** `PLANNED_NOT_AUTHORIZED`

**Objective:** ensure every later optimization decision is evidence-backed and comparable to this baseline.

### Tasks

| Task | Scope | Estimate | Complexity |
| --- | --- | ---: | --- |
| JCY-P6-01 | Define acquisition-to-sale KPI contract | 4h | S |
| JCY-P6-02 | Publish baseline/acceptance evidence pack | 4h | S |
| JCY-P6-03 | Establish 28/60-day review procedure | 4h | S |

### KPI contract

At minimum track by landing page, product, source/medium, device and new/returning:

1. Search impressions -> clicks
2. clicks -> engaged sessions
3. engaged sessions -> product intent
4. product intent -> commercial CTA
5. commercial CTA -> form view/start or WhatsApp
6. form start -> lead
7. lead -> qualified lead
8. qualified lead -> visit
9. visit -> sale
10. returning visitor -> commercial action / lead
11. AI Assistant -> engaged session -> commercial intent -> lead

## Authorization model

Creating this WBS does not authorize its execution.

The required order is:

`JCY-P0` first, then bounded implementation gates based on evidence.

Any change to production, GA4, GTM, Green, Vercel, Search Console, Google Ads, Meta Ads or the canonical `ProjetosCyrela` repository must be explicitly authorized under the applicable workstream.
