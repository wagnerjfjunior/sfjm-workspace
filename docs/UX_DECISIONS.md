# SFJM Workspace — UX Decisions

## Status

This document records product UX decisions currently approved for the SFJM Workspace.

These decisions remain in force until explicitly changed through a separate, authorized product decision.

## Primary hierarchy

The interface hierarchy is:

1. Estado de Continuidade
2. Próxima Ação Segura
3. Contextos Preservados
4. Visão da Jornada
5. Fontes Canônicas
6. Evidências, handoffs, auditorias e governança
7. Projeto associado

The continuity state must receive more visual emphasis than the project name.

## Home structure

The Home must begin with:

> De onde você precisa continuar hoje?

The approved order is:

1. Estado de Continuidade at the top;
2. Próxima Ação Segura in strong prominence;
3. Contextos Preservados above Visão da Jornada;
4. Visão da Jornada below Contextos Preservados;
5. Fontes Canônicas and Linha do Tempo in the secondary column.

The primary navigation begins with `Continue`.

## Continuity states

The interface must be able to communicate states such as:

- Continuável;
- Aguardando decisão;
- Aguardando autorização;
- Aguardando auditoria;
- Bloqueado;
- Estado inconsistente;
- Fonte canônica indisponível;
- Próxima ação indefinida.

The interface must not present `Continuável`, high confidence or positive operational indicators without observable support.

Demonstrative prototype data must be clearly identified as demonstrative.

## Visual direction

Approved direction:

- dark interface;
- futuristic and premium appearance;
- blue, purple, cyan and green accents;
- command-center feeling;
- light glassmorphism;
- restrained borders and glow;
- high legibility;
- compact density;
- general inspiration from Linear, Vercel and Raycast without direct cloning.

## Density and responsiveness

The layout must work at 100% browser zoom on common notebook screens.

Do not solve density problems by excessively reducing typography.

Prefer:

- compact sidebar;
- narrower secondary column;
- efficient padding;
- shorter cards;
- clear typographic hierarchy;
- controlled visual effects.

## Change control

Do not reverse these decisions without explicit authorization.

Potential improvements must be classified as either:

- blocking for the current delivery; or
- future non-blocking improvement.

A future improvement must not become a new gate automatically.
