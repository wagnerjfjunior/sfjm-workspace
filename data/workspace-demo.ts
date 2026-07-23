export type NavItem = { icon: string; label: string; helper: string; href: string; active?: boolean };
export type StatusCheck = { label: string; value: string };
export type ContextCard = { icon: string; label: string; value: string };
export type JourneyStep = { label: string; date: string; current?: boolean };
export type SourceRow = { label: string; value: string; badge?: boolean };
export type TimelineItem = { date: string; text: string };

export const workspaceDemo = {
  notice: "Dados demonstrativos — não representam estado operacional verificado.",
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
    { label: "Bootstrap", value: "Válido" }, { label: "Handoff", value: "Válido" },
    { label: "Fonte canônica", value: "Sincronizada" }, { label: "Próxima ação", value: "Definida" },
    { label: "Conflitos", value: "Nenhum" }, { label: "Conversa", value: "Ativa" }
  ] satisfies StatusCheck[],
  contexts: [
    { icon: "🧠", label: "Contexto Preservado", value: "100%" },
    { icon: "☑", label: "Decisões Preservadas", value: "100%" },
    { icon: "📁", label: "Evidências Preservadas", value: "100%" },
    { icon: "🤝", label: "Handoffs Atualizados", value: "100%" },
    { icon: "🔒", label: "Governança Ativa", value: "100%" },
    { icon: "◉", label: "GitHub Sincronizado", value: "100%" }
  ] satisfies ContextCard[],
  journey: [
    { label: "Bootstrap Canônico", date: "13 Jul 2026" }, { label: "Trilho 1 Kit Operacional", date: "13 Jul 2026" },
    { label: "Trilho 2 Bootstrap V1", date: "16 Jul 2026" }, { label: "Projeto 0 Migração", date: "19 Jul 2026" },
    { label: "PASS Qualificado", date: "19 Jul 2026" }, { label: "Conversa Aposentada", date: "19 Jul 2026" },
    { label: "Workspace", date: "Agora", current: true }
  ] satisfies JourneyStep[],
  currentState: [
    { label: "Última sincronização", value: "19 Jul 2026" }, { label: "Fonte canônica", value: "GitHub Main" },
    { label: "Handoff atual", value: "SFJM_CURRENT..." }, { label: "Projeto ativo", value: "Stop Junior Mode" }
  ] satisfies SourceRow[],
  sources: [
    { label: "GitHub Main", value: "OK", badge: true }, { label: "Handoff Atual", value: "OK", badge: true },
    { label: "Bootstrap", value: "OK", badge: true }, { label: "Dashboard", value: "Online", badge: true }
  ] satisfies SourceRow[],
  timeline: [
    { date: "19 Jul 2026 11:42", text: "Projeto 0 concluído com PASS" },
    { date: "19 Jul 2026 11:40", text: "PR #81 mergeada" },
    { date: "19 Jul 2026 11:35", text: "PR #81 Ready" },
    { date: "19 Jul 2026 11:20", text: "Auditoria PASS" }
  ] satisfies TimelineItem[]
};
