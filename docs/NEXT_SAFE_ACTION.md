# SFJM Workspace — Next Safe Action

## Canonical context

Repository:

`wagnerjfjunior/sfjm-workspace`

Current FECH.AI tracking authority:

- Workspace issue #18;
- external canonical program `wagnerjfjunior/fecha.ai#141`;
- active FECH.AI milestone `#150 M1 Security Truth Baseline`.

## Single immediate next safe action

**Validate the active FECH.AI Roadmap + Runbook implementation candidate.**

Required gate:

1. resolve Workspace `main` and candidate head live;
2. confirm the candidate remains based on the intended current main or reconcile drift;
3. confirm changed-file scope is bounded to dashboard data/UI/styles, the FECH.AI manual context and directly related continuity;
4. run `npm run lint`;
5. run `npm run build`;
6. read all final material files through EOF;
7. verify the UI does not claim automatic freshness, synchronization, Security Go or runtime proof;
8. inspect reviews/threads/checks;
9. correct and revalidate every material blocker;
10. advance through Ready and merge only on a validated clean head.

Product Authority has already authorized this bounded sequence through merge. That authority does not remove any technical/evidence gate.

## Candidate acceptance criteria

- FECH.AI card no longer displays the obsolete July/F1-01 snapshot;
- source repository, observed SHA and observation date are visible;
- M0–M6 Roadmap is visible;
- current milestone M1 is distinguishable;
- Operational Runbook lists the M1-A–M1-F evidence sequence;
- weighted progress is based only on accepted gates;
- Security Go remains `NOT GRANTED`;
- broad commercialization remains `BLOCKED`;
- manual/demo boundary remains explicit;
- desktop/mobile layout builds without material regression.

## Explicitly blocked

- deploy;
- Vercel configuration mutation;
- backend/API;
- auth/database/Supabase;
- automatic sync, webhooks, cron or polling;
- external-project write-back;
- changing FECH.AI canonical state;
- presenting snapshot data as automatically current.

## Post-merge semantic continuation

After a clean merge, the Workspace returns to visualization duty. The FECH.AI canonical next action remains the live-resolved M1 action from `wagnerjfjunior/fecha.ai`; the Workspace must not independently advance FECH.AI milestones.

Any material FECH.AI change invalidates the manual dashboard snapshot and requires a bounded refresh.
