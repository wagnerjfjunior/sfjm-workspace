import { workspaceDemo, type ExternalProject } from "@/data/workspace-demo";

export const jordanacyrelaProject: ExternalProject = {
  name: "Jordana Cyrela",
  kind: "Projeto externo · SEO/GEO/CRO",
  continuityState: "DIAGNOSTIC COMPLETE · SEO/GEO VISIBLE · ACQUISITION DECLINING · CONVERSION WEAK · WBS DEFINED / IMPLEMENTATION NOT AUTHORIZED",
  nextSafeAction: "Autorizar JCY-P0 — Measurement Integrity antes de qualquer mutação CRO/SEO: corrigir/explicar Royal GA4 vs Search Console, validar scoring, abandono, referrals/bots e consistência apex/www.",
  blockers: [
    "Search Console registra tráfego para /royal sem padrão equivalente confiável no GA4",
    "score_session/score_total/lead_bucket/lead_class estão ausentes no pré-lead observado",
    "abandono de formulário não produz população utilizável no baseline",
    "Capri concentra ~59% das sessões e ~75% dos cliques orgânicos, mas gerou 0 leads no período",
    "mobile recebeu 93 sessões e 0 leads no baseline",
    "tráfego interno/referral/data-center pode distorcer uma amostra pequena",
    "implementação de P0-P6 ainda não foi autorizada"
  ],
  repository: "wagnerjfjunior/ProjetosCyrela",
  observedSha: "60a8af63a94b86542c52f992d76bb5df1ca4ea2e",
  observedAt: "11 Sep 2026 · GA4/Search Console baseline through 8 Sep 2026",
  verification: "Manual analytics snapshot · Windsor GA4 + Search Console · production discovery observed · no automatic sync",
  taskDecompositions: [
    {
      parentTaskId: "JCY-P0",
      parentLabel: "Measurement Integrity",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P0-01", label: "Royal GA4 vs Search Console routing/tag diagnosis", state: "NEXT", status: "NEXT_ELIGIBLE / NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P0-02", label: "Intent, page_slug, score and lead-class propagation", state: "NOT_AUTHORIZED", status: "DEFINED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P0-03", label: "Form view/start/abandon/lead contract validation", state: "NOT_AUTHORIZED", status: "DEFINED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P0-04", label: "Internal/referral/bot contamination review", state: "NOT_AUTHORIZED", status: "DEFINED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P0-05", label: "Apex/www canonical + cross-domain attribution validation", state: "NOT_AUTHORIZED", status: "DEFINED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P1",
      parentLabel: "Capri CRO",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P1-01", label: "Commercial offer above the fold", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 6, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P1-02", label: "Sticky/mobile commercial CTA", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P1-03", label: "CTA placement after plants/gallery", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P1-04", label: "Price and availability framing", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P1-05", label: "Commercial-intent event taxonomy", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P1-06", label: "CRO QA + experiment + SEO/GEO regression check", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 6, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P2",
      parentLabel: "SEO / CTR Recovery and Product Diversification",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P2-01", label: "Commercial-intent query clustering", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P2-02", label: "Title/description CTR optimization", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 6, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P2-03", label: "Royal optimization", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P2-04", label: "Zen optimization", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P2-05", label: "Epic optimization", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P2-06", label: "Structured-data/snippet regression review", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 2, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P3",
      parentLabel: "Mobile Conversion",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P3-01", label: "Mobile UX/contact audit", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P3-02", label: "Mobile sticky CTA + compact lead path", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 6, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P3-03", label: "iPhone/Android contact-flow validation", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P3-04", label: "Mobile analytics QA", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 2, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P4",
      parentLabel: "Retargeting + GEO Conversion Bridge",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P4-01", label: "Behavioral high-intent audiences", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 6, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P4-02", label: "Google/Meta audience activation mapping", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P4-03", label: "AI-assistant landing/commercial bridge", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P4-04", label: "AI Assistant attribution validation", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 3, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P4-05", label: "Audience/event/privacy QA", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 3, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P5",
      parentLabel: "Neighborhood Hubs / Internal Authority Distribution",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P5-01", label: "Jardim Europa hub architecture", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 8, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P5-02", label: "Vila Mariana hub architecture", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 8, complexity: "M", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P5-03", label: "Internal-link authority graph", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    },
    {
      parentTaskId: "JCY-P6",
      parentLabel: "Evidence, KPI Dashboard and Optimization Loop",
      source: "docs/projects/jordanacyrela/OPTIMIZATION_WBS.md",
      items: [
        { id: "JCY-P6-01", label: "Acquisition-to-sale KPI contract", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P6-02", label: "Baseline/acceptance evidence pack", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" },
        { id: "JCY-P6-03", label: "28/60-day optimization review procedure", state: "NOT_AUTHORIZED", status: "PLANNED_NOT_AUTHORIZED", hours: 4, complexity: "S", effortSource: "WORKSPACE_ESTIMATE" }
      ]
    }
  ]
};

if (!workspaceDemo.externalProjects.some((project) => project.name === jordanacyrelaProject.name)) {
  (workspaceDemo.externalProjects as ExternalProject[]).push(jordanacyrelaProject);
}
