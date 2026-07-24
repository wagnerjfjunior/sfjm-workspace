export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type JourneyStep = { label: string; date: string; current?: boolean };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string };

export const workspaceDemo = {
  notice: "Dados demonstrativos baseados no estado canônico verificado em 24 Jul 2026 — sem sincronização automática.",
  nav: [
    { icon: "▶", label: "Continue", helper: "Próxima ação segura", href: "#continue", active: true },
    { icon: "⌁", label: "Jornada", helper: "Visão da jornada", href: "#journey" },
    { icon: "□", label: "Projetos", helper: "Seus projetos", href: "#" },
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
    { date: "24 Jul 2026", text: "Chat 2 verificou o novo main canônico" },
    { date: "24 Jul 2026", text: "Chat 1 foi aposentada após validação" },
    { date: "23 Jul 2026", text: "PR #11 concluiu o ciclo documental" },
    { date: "23 Jul 2026", text: "Home Next.js e guardrails preservados" }
  ] satisfies TimelineItem[]
};