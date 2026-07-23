export const workspaceDemo = {
  user: { name: "Wagner Fernandes", role: "Administrador" },
  continuity: {
    status: "CONTINUÁVEL",
    message: "Você pode continuar com segurança.",
    confidence: 99,
    checks: ["Bootstrap", "Handoff", "Fonte canônica", "Próxima ação", "Conflitos", "Conversa"]
  },
  nextAction: {
    title: "Criar o SFJM Workspace",
    description: "Estabelecer o ambiente operacional do SFJM para centralizar projetos, jornadas, handoffs e evidências.",
    estimate: "20 min",
    dependencies: "Nenhuma",
    blockers: "Nenhum"
  },
  contexts: [
    ["🧠", "Contexto Preservado"], ["☑", "Decisões Preservadas"], ["📁", "Evidências Preservadas"],
    ["🤝", "Handoffs Atualizados"], ["🔒", "Governança Ativa"], ["◉", "GitHub Sincronizado"]
  ],
  journey: ["Bootstrap Canônico", "Trilho 1 Kit Operacional", "Trilho 2 Bootstrap V1", "Projeto 0 Migração", "PASS Qualificado", "Conversa Aposentada", "Workspace Atual"],
  sources: ["GitHub Main", "Handoff Atual", "Bootstrap", "Dashboard"],
  timeline: ["Projeto 0 concluído com PASS", "PR #81 mergeada", "PR #81 Ready", "Auditoria PASS"]
} as const;
