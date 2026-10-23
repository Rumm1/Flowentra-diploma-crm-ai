# Flowentra: Pre-Defense Submission Checklist

Task: **PD-06** | Owner: **Aitzhan Iliyas**

This is an evidence register, not a declaration that the diploma or team work is complete. Snapshot: **2026-10-23, Asia/Qyzylorda**. PD-01–PD-05 have open PRs; PD-06 is this change set and must have its actual publication verified in GitHub. Independent review is pending for all six. No task is marked Done by this document.

## 1. Task artifact evidence

| Task | Required artifacts | Observed validation | Review status |
| --- | --- | --- | --- |
| PD-01 | `docs/01_Project_Proposal.md` | Scope, objectives, responsibilities and staged diff reviewed | [PR #1](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/1); independent review pending |
| PD-02 | `docs/05_Technology_Comparison.md` | Three decisions, three options each; twelve primary references; no invented benchmark | [PR #2](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/2); independent review pending |
| PD-03 | Architecture; two DOT sources and SVG/PNG exports | Graphviz WASM rendering and visual review; no runtime test | [PR #3](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/3); independent review pending |
| PD-04 | OpenAPI; backend design; pinned validator and lockfile | Schema/references: 17 paths, 27 operations, 28 schemas; 225 example occurrences including reused errors; six invalid fixtures rejected | [PR #4](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/4); independent review pending |
| PD-05 | AI integration/security design | JSON example, twenty planned evaluation cases, security/contract consistency; no model tests | [PR #5](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/5); independent review pending |
| PD-06 | README; CONTRIBUTING; PR template; this checklist | Navigation, evidence wording, task isolation, and final diff checked before commit; results recorded in PR | This task branch; verify publication and independent review |

The README links upstream artifacts at exact commits. These are unmerged task branches from baseline `1c5ca65`; their contents are not all on `main`. Combined file/link validation is static review of the proposed union, not an integration merge or an application test.

## 2. Actual timing and commit record

All times below are **2026-10-23 +05:00**. T0 records initial draft completion before verification/corrections. The agent disclosed inability to guarantee six successive 20–25-minute windows; the user subsequently authorized real commits/PRs. These timestamps do **not** claim completed timed review windows. No timestamps were altered.

| Task | Draft T0 | Commit time | Commit |
| --- | --- | --- | --- |
| PD-01 | 23:01:44 | 23:06:55 | `754ccad48a0c838569673f053a5915f71250de18` |
| PD-02 | 23:04:15 | 23:08:56 | `9a4eb83f4f9e90477acfd3c3e77ac3679334e487` |
| PD-03 | 23:12:14 | 23:13:38 | `35a9a3fcf045190a555a20c26f4c583c1477c52c` |
| PD-04 | 23:21:07 | 23:21:40 | `1b81c15b1d254f3bdce6068fa6e169b930b74339` |
| PD-05 | 23:24:36 | 23:26:02 | `403a2b0a33cb96156a78ca7eb3924d44eb8ec44b` |
| PD-06 | Recorded in task PR/final execution report | Read actual Git metadata after commit | Do not invent a self-referential SHA here |

PD-02 was drafted locally before PD-01 publication while the initial remote/timing fallback was being resolved. Publication subsequently proceeded in task order. Do not describe the drafting sequence as six completed timed cycles.

## 3. Review and traceability gates

- [ ] Aitzhan verifies and can defend every AI-assisted claim and source.
- [ ] Each task receives independent review from Aibek or Daniil, with actual review evidence.
- [ ] Their GitHub usernames are verified and reviewer requests are assigned correctly.
- [ ] Exact Taiga PD-01–PD-06 permalinks are supplied and added to PRs. Only the [project board](https://tree.taiga.io/project/rumm1-flowentra-1/kanban) is supplied and confirmed by the user.
- [ ] Upstream review changes are reconciled, then reviewed changes are integrated in dependency order.
- [ ] The final submission revision is identified and links/checks rerun on that actual integrated revision.
- [ ] Tasks move to Done only after acceptance and required review; no board transition is assumed.
- [ ] `pre-defense-1` is created only when the reviewed submission is ready and authorized. It has not been created in this work.

## 4. Team-wide deliverables requiring evidence

| Requirement | Current evidence | Owner / next action |
| --- | --- | --- |
| Working frontend prototype | Not available; previous prototype removed at initialization | Aibek: reviewed PD-10 source, run steps, URL |
| Backend and migrations | Design only | Aitzhan: implement vertical slice and core modules |
| Authentication/RBAC/ownership | Permission matrix; no runtime results | Aitzhan + Daniil: positive/negative tests |
| Concurrent booking, versions, retries | Constraints/protocol specified, not executed | Aitzhan + Daniil: PostgreSQL and response-loss tests |
| AI adapter and confirmation UI | Design; no provider selected | Aitzhan + Aibek: final endpoint contract and implementation |
| AI safety/quality evaluation | Twenty-case plan; no outcomes | Aitzhan + Daniil: fixtures and observed results |
| Performance | Proposed target only | Team: measured workload/environment and failures |
| Deployment, backup, recovery | Architectural intent only | Team: reproducible configuration and restore demonstration |
| User research/client acceptance | No interviews or approvals supplied | Team: legitimate evidence if required by rubric |
| Supervisor/academic approval | Supervisor identified only | Team: verify rubric and obtain real feedback |
| Defense presentation/report/demo | No evidence supplied by these tasks | Team: allocate, prepare, review, rehearse |

This table does not assign completed work or credit to another student. Academic requirements, deadlines, and format must be confirmed against the institution's actual rubric.

## 5. Proposed defense demonstration

After implementation/review, demonstrate with synthetic data: login as each role; create/retrieve a client, deal, task; show ownership denial; create/reschedule/cancel an appointment; show a concurrent overlap rejection; show idempotent replay and stale-version rejection; verify a report against seeded data; propose/confirm an AI action; show injection denial and provider-outage manual fallback. Retain commands, fixture revision, expected/actual outcomes, and sanitized logs. **This sequence has not been performed yet.**

The frontend must label reports as current-state summaries rather than accounting records. AI completion must follow the backend's committed result. Messaging channels must remain labeled future work in defense materials.

## 6. Final artifact and integrity checks

- [ ] Required files exist on the actual reviewed submission revision, not just in separate open PRs.
- [ ] DOT and readable SVG/PNG exports agree; links resolve on that revision.
- [ ] Pinned `npm ci --ignore-scripts` and `npm run validate:api` pass.
- [ ] Future implementation tests have genuine logs distinct from static checks.
- [ ] No secrets, personal datasets, temporary files, dependencies, or machine-specific paths are committed.
- [ ] No unsupported novelty, benchmark, interview, approval, deployment, or contribution claims remain.
- [ ] Team files were coordinated; old draft tag/history was preserved, not concealed.
- [ ] Any future Word document uses Times New Roman, 12 pt, Automatic text color. These tasks deliver no Word file.
- [ ] Remaining limitations and failed/unexecuted checks are disclosed in defense materials.

This package was prepared with AI assistance from the clean baseline and supplied instructions. Team/supervisor identity was retained from the baseline README and checked against the user's clarifications. No old draft or backup content was restored. Independent review and implementation evidence remain necessary.
