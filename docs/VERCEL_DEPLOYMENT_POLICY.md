# Vercel Deployment Policy

## Status

Canonical cross-project infrastructure standard.

## Principle

**Repository activity is not deployment activity.**

A Vercel build must be skipped when a commit changes only paths explicitly classified as non-runtime documentation or governance. If any changed file falls outside that explicit list, the build proceeds.

## Vercel semantics

The standard uses `vercel.json` `ignoreCommand`:

- exit `0` = ignore/skip the build;
- exit `1` = continue the build.

## Baseline non-runtime candidates

Where present and not consumed by the application:

- `docs/`
- `handoffs/`
- `bootstrap/`
- `.github/`
- `README.md`

Repositories may extend the list only for paths proven not to affect production output.

## Safety invariant

Unknown or new paths are runtime-impacting by default.

Therefore:

```text
EXPLICIT_NON_RUNTIME_ONLY -> SKIP_BUILD
ANY_OTHER_CHANGE          -> BUILD
UNCERTAINTY                -> BUILD
```

Do not add application code, assets, SEO runtime files, deployment configuration, generated production output, or application-consumed data to the skip list merely to reduce quota consumption.

## Monorepo / project-root rule

When a Vercel project uses a dedicated root directory, prefer a root-local ignored-build step such as:

```sh
git diff --quiet HEAD^ HEAD .
```

This makes the project build only when its own root changes.

## Operational objective

Prevent documentation, audit, handoff, evidence and governance churn from exhausting Vercel build-rate quotas while preserving automatic deployment for production-impacting changes.
