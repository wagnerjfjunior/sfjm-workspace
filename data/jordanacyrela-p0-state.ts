import { jordanacyrelaProject } from "@/data/jordanacyrela-project";

jordanacyrelaProject.continuityState =
  "JCY-P0 MEASUREMENT INTEGRITY ACTIVE / AUTHORIZED · READ_ONLY DIAGNOSTIC COMPLETE · REMEDIATION REQUIRED";

jordanacyrelaProject.nextSafeAction =
  "Executar o bounded JCY-P0 remediation package: Royal GTM/GA4, web/server GA4 destination, form contract, score observability, traffic hygiene, apex/www e post-remediation evidence.";

jordanacyrelaProject.blockers = [
  "Royal: /royal perdeu representação GA4 normal após o início de março enquanto Search Console continuou observando a rota",
  "Scoring: jcy_intent/page_slug passam, mas score_update está ausente no GA4 e score pré-lead não é observável",
  "Forms: abandono não é observável; contrato atual de form_start/lead precisa QA controlado",
  "Traffic hygiene: admin/referral e data-center-style sessions distorcem uma amostra pequena",
  "Canonical host: home dividida entre www e apex",
  "Web/server GA4: divergência histórica de destino precisa ser reconciliada no runtime atual"
];

const p0 = jordanacyrelaProject.taskDecompositions?.find(
  (decomposition) => decomposition.parentTaskId === "JCY-P0"
);

if (p0) {
  for (const item of p0.items) {
    item.state = "ACTIVE";

    if (item.id === "JCY-P0-01") {
      item.status = "DIAGNOSIS_COMPLETE / REMEDIATION_REQUIRED";
      item.note = "Search Console continues to observe /royal; GA4 normal page_view population stopped after 2026-02-27 / early March transition.";
      item.evidenceRef = "docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md";
    } else if (item.id === "JCY-P0-02") {
      item.status = "PARTIAL_PASS / PRE_LEAD_SCORE_OBSERVABILITY_FAIL / REMEDIATION_REQUIRED";
      item.note = "jcy_intent and page_slug observed; score_update absent in GA4 and score dimensions not populated on pre-lead intent events.";
      item.evidenceRef = "docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md";
    } else if (item.id === "JCY-P0-03") {
      item.status = "PARTIAL_PASS / CONTROLLED_QA_AND_REMEDIATION_REQUIRED";
      item.note = "form_start and lead are observable; no usable abandonment event population is present in GA4.";
      item.evidenceRef = "docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md";
    } else if (item.id === "JCY-P0-04") {
      item.status = "DIAGNOSIS_COMPLETE / REPORTING_HYGIENE_REQUIRED";
      item.note = "Known admin/referral patterns plus data-center-style direct traffic materially affect the small baseline; raw data must remain preserved.";
      item.evidenceRef = "docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md";
    } else if (item.id === "JCY-P0-05") {
      item.status = "DIAGNOSIS_COMPLETE / CANONICAL_NORMALIZATION_REQUIRED";
      item.note = "Both www and apex generate home sessions; Search Console selects www home while product architecture is predominantly apex.";
      item.evidenceRef = "docs/projects/jordanacyrela/evidence/2026-09-11-JCY-P0-MEASUREMENT-INTEGRITY.md";
    }
  }
}
