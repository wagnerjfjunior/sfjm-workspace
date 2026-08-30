# SFJM Workspace — Next Safe Action

## Canonical context

Repository:

`wagnerjfjunior/sfjm-workspace`

Active transition:

```text
PR #24
feat: consolidate Search into unified SFJM dashboard
state: OPEN / DRAFT
base: main@90ff0ef74944613e648c45f90320973a753c0afa
```

## Single immediate next safe action

**Complete the bounded PR #24 candidate, then perform exact-head validation/audit while keeping it Draft.**

Required sequence:

1. finalize only the authorized unified-dashboard files;
2. verify MoreNumTegra and Search-provider provenance in the candidate;
3. run/inspect applicable build and Vercel checks for the exact head;
4. inspect exact diff and changed-file scope;
5. read final material files through EOF;
6. perform independent documentation/reconciliation audit on the exact head;
7. stop after audit result.

Do not mark Ready in this authorization.

## Acceptance criteria

- SFJM Workspace is explicitly the single dashboard/consolidation surface;
- Search provider is represented as a versioned feed/evidence source, not a competing dashboard;
- MoreNumTegra snapshot no longer contains the obsolete `3eca0d4f...` / pending-www-certificate state;
- MoreNumTegra current release/search/measurement state is represented with provenance;
- Search provider current integrated result is represented with provider SHA;
- dashboard UI exposes a consolidated Search/SEO section;
- manual/versioned refresh boundary remains explicit;
- FECH.AI visibility remains preserved;
- no authority is transferred from external canonical repositories.

## Explicitly blocked during this gate

- Ready;
- merge;
- deployment/config mutation;
- automatic sync;
- external-project write-back;
- tracking activation;
- Search Console mutation;
- Google Ads campaign/spend;
- StopJuniorMode protocol changes.

## Refresh rule

Any new commit changes the exact head and requires validation/audit against the new revision. Ready requires a separate explicit authorization for the final audited head/base.
