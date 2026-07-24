export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type JourneyStep = { label: string; date: string; current?: boolean };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string };
export type ExternalProject = {
  name: string;
  kind: string;
  continuityState: string;
  nextSafeAction: string;
  blockers: string[];
  repository: string;
  observedSha: string;
  observedAt: string;
  verification: string;
};

export const workspaceDemo = {
  notice: "Dados demonstrativos baseados em snapshots canônicos verificados em 24 Jul 2026 — sem sincronização automática.",
  nav: [
    { icon: "▶", label: "Continue", helper: "Próxima ação segura", href: "#continue", active: true },
    { icon: "⌁", label: "Jornada", helper: "Visão da jornada", href: "#journey" },
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#projects" },
    { icon: "⇄", label: "Handoffs", helper: "Transições de estado", href: "#" },
    { icon: "≋", label: "Evidências", helper: "Registros e artefatos", href: "#" },
    { icon: "◇", label: "Auditorias", helper: "Avaliações e resultados", href: "#" },
    { icon: "⬡", label: "Governança", helper: "Regras e protocolos", href: "#" },
    { icon: "⚙", label: "Configurações", helper: "Preferências", href: "#" }
  ] satisfies NavItem[],
  checks: [
    { label: "Main canônico", value: "Verificado" },
    { label: "Handoff", value: "Assumido" },
    { label: "Conversa anterior", value: "Aposentada" },
    { label: "Conversa atual", value: "Chat 2" },
    { label: "Próxima ação", value: "Delimitada" },
    { label: "Implementação", value: "Aguardando autorização" }
  ] satisfies StatusCheck[],
  externalProjects: [
    {
      name: "FECH.AI",
      kind: "Projeto externo",
      continuityState: "Aguardando decisão",
      nextSafeAction: "Definir o próximo gate de F1-01 antes de iniciar F1-02.",
      blockers: ["Security Go não concedido", "Runtime e Supabase live não confirmados", "F1-02 sem autorização de execução"],
      repository: "wagnerjfjunior/fecha.ai",
      observedSha: "8a2eb00a9dcd46d7ee346741ca27c6081af52124",
      observedAt: "24 Jul 2026",
      verification: "Snapshot manual verificado"
    }
  ] satisfies ExternalProject[],
  contexts: [
    { icon: "🧠", label: "Contexto Preservado", value: "Confirmado" },
    { icon: "☑", label: "Decisões Preservadas", value: "Confirmado" },
    { icon: "📁", label: "Evidências Canônicas", value: "GitHub" },
    { icon: "🤝", label: "Handoff Assumido", value: "Chat 2" },
    { icon: "🔒", label: "Governança Mantida", value: "Ativa" },
    { icon: "◉", label: "Fonte Verificada", value: "main" }
  ] satisfies ContextCard[],
  journey: [
    { label: "Bootstrap Frontend", date: "23 Jul 2026" },
    { label: "Home Migrada", date: "23 Jul 2026" },
    { label: "Guardrails", date: "23 Jul 2026" },
    { label: "Ciclo Documental", date: "23 Jul 2026" },
    { label: "PR #11 Mergeada", date: "23 Jul 2026" },
    { label: "Chat 1 Aposentada", date: "24 Jul 2026" },
    { label: "Chat 2 Assumiu", date: "24 Jul 2026", current: true }
  ] satisfies JourneyStep[],
  currentState: [
    { label: "Estado de continuidade", value: "Assumido" },
    { label: "Conversa ativa", value: "Workspace — Chat 2" },
    { label: "Conversa aposentada", value: "Workspace — Chat 1" },
    { label: "Fonte canônica", value: "GitHub / main" }
  ] satisfies SourceRow[],
  sources: [
    { label: "GitHub main", value: "Verificado", badge: true },
    { label: "handoffs/CURRENT.md", value: "Lido", badge: true },
    { label: "PROJECT_STATUS.md", value: "Lido", badge: true },
    { label: "NEXT_SAFE_ACTION.md", value: "Lido", badge: true }
  ] satisfies SourceRow[],
  timeline: [
    { date: "24 Jul 2026", text: "FECH.AI registrado como contexto externo manual" },
    { date: "24 Jul 2026", text: "Chat 2 verificou o novo main canônico" },
    { date: "24 Jul 2026", text: "Chat 1 foi aposentada após validação" },
    { date: "23 Jul 2026", text: "Home Next.js e guardrails preservados" }
  ] satisfies TimelineItem[]
};