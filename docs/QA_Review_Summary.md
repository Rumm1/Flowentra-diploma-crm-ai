# Flowentra CRM AI — QA Review Summary

| Field | Value |
|---|---|
| Task | PD-18 — QA Review and Contribution Evidence |
| Reviewer | Daniil Khvan (task assignment) |
| Review date | 24 October 2026 |
| Review type | Evidence-based documentation, repository, history, and GitHub review |
| Review branch | `pd-18-qa-review` |
| Baseline reviewed | `main` at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`, plus explicitly identified unmerged task branches |
| Contribution record | [`plans/Contribution_Evidence.md`](../plans/Contribution_Evidence.md) |
| Review checklist | [`plans/Review_Checklist.md`](../plans/Review_Checklist.md) |

## 1. Review objective

Assess whether the available Flowentra documentation, system design, API contract, requirements, test/evaluation plans, risk register, repository history, and accessible GitHub review records provide sufficient and internally consistent evidence for implementation compliance, QA readiness, contribution attribution, and project status.

This is a documentation/repository review, not a code review of a running application, penetration test, usability study, supervisor assessment, or approval of any task. Findings distinguish a confirmed process/documentation issue from missing evidence and behavior that cannot yet be verified.

## 2. Review scope

Reviewed the synchronized `main` baseline and, where artifacts were absent from `main`, inspected the available remote task branches for PD-08 and PD-13 through PD-18. Reviewed repository files and inventory, Git branches/commits/authors, OpenAPI contract and validator, project proposal, README, architecture, backend/API design, AI design, submission checklist, contributing policy, requirements, test cases/strategy, verification plan, risk register, and accessible pull-request records.

No Go backend, React/TypeScript/JSX frontend, SQL migration, database model/schema, deployed endpoint, runtime test suite, or AI provider implementation was found. The repository does contain a JavaScript OpenAPI validator (`scripts/validate_openapi.cjs`); it checks contract artifacts only.

## 3. Repository state and materials inspected

- `main` and `origin/main` were at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`.
- PD-13 through PD-18 were available as remote branches but were not merged into `main`; exact task commits are recorded in [Contribution Evidence](../plans/Contribution_Evidence.md).
- PD-18 was created from `origin/main`; this review does not merge other task branches.
- The design baseline includes `README.md`, `CONTRIBUTING.md`, `docs/01_Project_Proposal.md`, `docs/05_Technology_Comparison.md`, `docs/07_Architecture.md`, `docs/Backend_Design.md`, `docs/AI_Integration_and_Security.md`, `api/openapi.yaml`, diagrams, and the OpenAPI validator.
- PD-14 requirements, PD-15 test inventory/strategy, PD-16 evaluation plan, and PD-17 risk register were read from their named task branches. They are proposed artifacts, not evidence of runtime implementation or stakeholder approval.
- GitHub PRs #1–#6 are closed/merged; PR #7 (PD-08) and task PRs #8–#13 are open against `main`.
- The branch artifacts include [PD-14 requirements](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/b5bbce29ba7385f8a5ca53d2f7177ae499049caa/docs/06_Requirements.md), [PD-15 test strategy](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/25b330b2217dd9e0599f756f2bff9ff08a147dc2/tests/Test_Strategy.md), [PD-16 evaluation plan](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/2c45803b16827132f67008699814901ede63d588/docs/09_Verification_and_Evaluation_Plan.md), and [PD-17 risk register](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/f14d1f9a473b92f7bc7ac03b3654770566725a22/plans/Risk_Register.csv), at the commits inspected.

## 4. Review methodology and severity

Compared written scope to available implementation files, checked the contract against its stated validator scope, compared PD-14 requirement IDs with PD-15 test mappings, reviewed evaluation metrics and risk scoring, and examined accessible PR descriptions, authors, reviews, review threads, and checks. `npm run validate:api` was executed on the PD-18 base.

**Severity scale:** **Critical** — likely to invalidate a safe acceptance/release decision or permit severe data/security impact; **High** — material blocker to implementation acceptance, traceability, or required review; **Medium** — significant evidence, coordination, or usability gap requiring resolution; **Low** — limited documentation/administrative gap. Severity describes review priority, not a measured probability. Missing evidence is not treated as proof of a defective feature.

Finding classifications used below are: **Confirmed issue**, **Potential issue requiring further verification**, **Documentation inconsistency**, **Missing evidence**, **Pending review**, and **No issue observed within the inspected scope**.

## 5. Confirmed findings

| ID | Classification | Severity | Finding and evidence |
|---|---|---|---|
| QA-01 | Confirmed issue — review-process nonconformance | High | [PR #1](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/1)–[#6](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/6) were merged, while their PR descriptions state they were prepared for independent review and that independent review was pending/required. The current [`CONTRIBUTING.md`](../CONTRIBUTING.md) says not to merge without independent review. GitHub records for PR #1 show an automated Codex review and two unresolved review threads; PRs #2–#6 have no human review records in the accessible review endpoints. PR #6 has a Codex bot summary for commit `08de27ee99802af38a4d832d3a5a7970f8e66db2`, while its final PR head is `6052d3c0f3f9f87224881ae58e05d8e3ce74f327`. This is a verified process/evidence discrepancy, not a finding that the document contents are wrong. |
| QA-02 | Missing evidence — implementation | High | The repository explicitly describes the stack as proposed and has no application source, database migrations, runtime tests, or deployment. Consequently, no conclusion can be made about runtime API compliance, authentication/RBAC enforcement, database integrity, frontend workflows, error behavior, or AI controls. The absence is confirmed; a feature defect is not. |
| QA-03 | Missing evidence — integrated QA baseline | High | PD-13–PD-18 deliverables remain on separate branches and absent from `main`. Open PRs #8–#13 exist, but none has recorded peer review or checks; the requirements, tests, evaluation plan, and risk register are not yet an approved, integrated baseline. Their cross-branch traceability was checked against exact commits. |
| QA-04 | Missing evidence — contribution attribution | Medium | The six PD-13–PD-18 commits have Git author metadata `2 <3>`. GitHub PRs #8–#13 are authored by account `DaniilKhvan` and point to the corresponding task branches. This verifies account-level attribution but does not independently establish the account holder's real-world identity. |
| QA-05 | No issue observed within the inspected scope — research honesty | Low | PD-08 PR #7's description and `evidence/Interview_Summary.md` explicitly identify four interviews as fictional simulations and state that no real interviews occurred. These materials must not be represented as field research. The PR remains open and has no recorded GitHub reviews or check runs. |
| QA-06 | Missing evidence — supervisor feedback | Medium | No supervisor feedback or approval was available in the inspected active project materials. The historical draft commit also contains a blank feedback template that explicitly says feedback was not obtained; that file is not present on `main`. See the exact statement in section 14. |
| QA-07 | Documentation inconsistency | Medium | [`README.md`](../README.md) and [`docs/00_Submission_Checklist.md`](./00_Submission_Checklist.md) still describe PD-01–PD-06 as unmerged/open or pending publication, while GitHub records [PRs #1–#6](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pulls?q=is%3Apr+is%3Amerged) as merged into `main`. The README also identifies `1c5ca651...` as the clean baseline although the reviewed `main` is `58a4f2be...`. Update repository navigation/status statements; this does not invalidate the underlying design content. |
| QA-08 | Confirmed issue — incomplete PR evidence | Medium | Open task PRs #8–#13 target `main`, but their descriptions retain the unfilled PR template: task ID, summary, changed files, baseline, validation, T0, Taiga reference, reviewer request, and author checkboxes are blank/uncompleted. The PR review, review-thread/comment, requested-reviewer, and check-run endpoints returned no records. Complete the descriptions and request independent peer review. |

## 6. Potential issues requiring further verification

These are high-risk behaviors to verify when implementation exists; the review did not establish that they are defective:

- **Authentication and RBAC:** the OpenAPI `security` declarations and role annotations describe intended behavior. There is no server middleware or endpoint implementation to test for session validation, permission checks, field restrictions, or cross-user isolation.
- **API conformance:** OpenAPI 3.0.3 declares 17 paths and 27 operations. The validator checks schema/reference structure, examples, and selected conventions; it makes no live API requests. Request/response/status/error/ETag/idempotency behavior remains unverified against implementation.
- **Database integrity:** PostgreSQL foreign keys, appointment exclusion, transaction/audit atomicity, idempotency storage, and optimistic concurrency are proposed design behaviors. No schema/migration exists to inspect or test.
- **AI boundaries:** the AI document describes bounded intents and human-confirmed writes, but there is no model/provider, orchestrator, proposal endpoint, or confirmation UI. Prompt injection, output validation, privacy, and action replay remain conditional verification targets.
- **Exception handling and deployment:** no runtime configuration, TLS/ingress, logging, backup/restore, or recovery implementation is available to review.
- **User workflows/accessibility:** architecture documents describe intended React workflows, but no prototype or screens are available. No usability or accessibility study is evidenced.

## 7. Requirement and architecture review

The architecture consistently describes a single-organization modular monolith, proposed React client, Go backend, PostgreSQL, REST/OpenAPI, fixed roles, and external AI boundary. README and architecture label the design and implementation evidence boundary clearly. No architectural inconsistency was observed in those documents within the inspected scope.

Repository navigation/status text is stale: the README and submission checklist describe PRs #1–#6 as unmerged/open, although GitHub shows them merged. This documentation-status inconsistency (QA-07) is separate from the design's accurate statement that no runtime implementation exists.

The PD-14 specification contains 37 unique requirement IDs (23 functional and 14 non-functional) and labels requirements proposed for stakeholder review. PD-15 maps all 37 IDs to unique test cases in its branch. This static mapping was independently checked; it does not show that requirements are approved, implemented, or tested.

The most important discrepancy is between the planned feature set and the actual implementation evidence: functional requirements describe a proposed future application, while the repository contains no application runtime. This is accurately disclosed by project documentation and is classified as a readiness/evidence blocker, not as proof that implementation behavior is wrong.

## 8. API findings

The machine-readable contract is `api/openapi.yaml`, version `0.1.0-design`. It specifies authentication, identity, client, deal, task, appointment, and report operations. The AI design explicitly has no public AI endpoint in the contract; a future proposal/confirmation API would require a reviewed contract update.

`npm run validate:api` passed on the reviewed `main` commit. Actual output: `PASS: OpenAPI 3.0.3 schema/reference validation; 17 paths, 27 operations; 225 example occurrences (including reused error examples) validated; 6 invalid fixtures rejected; authentication, retry, precondition, error, pagination, and response-shape checks.`

This validates the API design artifact only. No request was sent to a Flowentra server. There is no implementation against which to compare paths, methods, schemas, status codes, authorization, ownership, validation, or error handling. No API discrepancy is confirmed from runtime evidence.

## 9. UX and workflow findings

The proposal and architecture describe expected navigation, forms, error/loading/empty states, timezone handling, and an AI confirmation flow. No frontend source, executable prototype, screenshots, or user-session recordings are present on `main` or in the reviewed PD-13–PD-17 branches. UI workflow checks are **Blocked**; user evaluation has not been conducted.

PD-08's fictional interview simulations are clearly disclosed and do not constitute participant feedback, validation of demand, usability testing, or evidence of time savings. Do not use the simulation results as user findings.

## 10. Test coverage and execution status

The PD-15 branch contains 37 cases: 36 runtime/specification-level cases marked `Not Run`, and one static contract-validation case marked `Passed`. All map to the PD-14 IDs. The test strategy states that no runtime environment exists. Independently, the PD-15 CSV was parsed and traced against PD-14 during this review.

The only executable project check observed is `npm run validate:api`, which passed as recorded above. No unit, integration, database, API runtime, browser, security, AI, performance, reliability, or acceptance test was executed in this review. A static pass is not runtime acceptance evidence.

## 11. Evaluation plan and risk management review

The PD-16 plan defines layered verification and evaluation, denominators for AI schema/slot/case scoring, a baseline workflow comparison, task-time measurements, integrity/security protocols, and proposed targets of 85% AI exact suggestion correctness, 20% median task-time reduction, and p95 below 500 ms at a proposed workload. These are explicitly targets, not observed outcomes; no participants, dataset, benchmark, or AI model evaluation is reported.

The PD-17 register contains 24 entries across Technical (8), AI (6), Security & Privacy (5), and Organizational (5). Its likelihood/impact arithmetic and risk levels were independently validated. AI risks are marked conditional. Risk owners are roles, not claimed personal assignments; mitigation controls are proposals, not evidence of implemented safeguards.

## 12. Pull request review status

GitHub access was available for PR metadata and reviews. In the current snapshot:

- PRs #1–#6 are merged. Available descriptions state independent review was pending/required. PR #1 has automated review findings and unresolved review threads; its later content includes corrections described in the PR, but the thread status remains unresolved in the returned GitHub data. PR #6's automated summary says no findings for an earlier commit; no human review record was found.
- PR #7, PD-08 user research artifacts, is open against `main`, with no review records, review comments, or check runs returned at review time.
- PR #8 (PD-16), #9 (PD-15), #10 (PD-14), #11 (PD-13), #12 (PD-17), and #13 (PD-18) are open against `main` at baseline `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`; source refs and task heads match the audited branches.
- GitHub reports mergeable state `clean` for PRs #8–#12. PR #13's mergeable state was `unknown` at inspection time.
- PRs #8–#13 are authored by GitHub account `DaniilKhvan`. Their descriptions retain the unfilled PR template; task ID, validation evidence, Taiga reference, and reviewer request are blank, and author checkboxes are not completed.
- PR review records, review threads/comments, and check runs are empty for each of PRs #8–#13. No requested reviewers were returned. None has been approved or merged; independent peer review remains outstanding.
- No PR was created, approved, or merged by this review. The six task PRs were already open in the latest GitHub refresh.

The PR list and review data are a snapshot; future GitHub updates may change status.

## 13. Contribution evidence summary

The branch/task artifacts and account-level PR authorship are verifiable. Git commits remain authored as `2 <3>`; the account `DaniilKhvan` authored PRs #8–#13, but the account-to-real-world identity mapping has not been independently authenticated. See [`plans/Contribution_Evidence.md`](../plans/Contribution_Evidence.md). No percentage allocation is justified.

## 14. Supervisor feedback availability

Supervisor feedback was not available in the inspected project materials.

The current README identifies a supervisor but states no feedback or approval is claimed; the submission checklist says approval is pending. A historical imported draft has a blank template stating that no feedback or approval was present in its supplied sources. No dated comment, meeting note, signed approval, or verified supervisor PR review was found.

## 15. Known limitations

- Review is limited to the fetched repository branches, documentation, Git metadata, and GitHub records accessible at the review time.
- No application source or deployed environment exists in the inspected scope, so runtime correctness cannot be concluded.
- PD-13–PD-18 artifacts are unmerged and may receive later changes; the six task PRs are open. This review pins task commits and PR state observed at review time.
- PR metadata/review endpoints do not prove informal discussions outside GitHub; absence of a GitHub review record is reported as absence of accessible evidence, not proof no discussion occurred elsewhere.
- Git author strings and GitHub account names do not by themselves prove a real-world identity.
- Risk ratings are qualitative judgments; evaluation targets are not accepted or achieved results.
- No formal usability, accessibility, supervisor, customer, or AI evaluation evidence is available.

## 16. Recommended corrective actions

1. **Before marking merged tasks Done:** obtain and record independent human review evidence for PRs #1–#6 or document an authorized exception; resolve or explicitly disposition PR #1 review threads. Preserve the existing history.
2. **Complete the open task PRs:** fill in task IDs, summaries, changed files, validation, baselines, Taiga references, and reviewer requests in PRs #8–#13; request independent review in dependency order; reconcile requirement/test IDs and links after any upstream change. Do not treat these artifacts as integrated `main` until merged.
3. **Implement a vertical slice:** provide reproducible source, database migration, frontend, deployment instructions, and synthetic fixtures before claiming functionality.
4. **Prioritize core safeguards:** implement and execute authentication/RBAC/cross-user isolation, database constraints/transactions, error handling, audit, idempotency, and appointment concurrency tests.
5. **Keep AI disabled for real data until ready:** select a provider, complete processing/retention review, implement bounded validation and actor-bound confirmation, and run the planned synthetic safety/quality suite.
6. **Collect genuine user and supervisor evidence:** conduct consented user research and usability evaluation only with an actual system/prototype; record supervisor feedback only from a verifiable source.
7. **Clarify QA contribution attribution:** verify Git identity/PR authorship through the repository owner and record evidence without changing historical commit authors or assigning unsupported credit.

## 17. Outstanding items

| Item | Status | Missing evidence / next step |
|---|---|---|
| Application/API/database/frontend implementation | Blocked | Source, migrations, runnable environment, and integrated build |
| PD-13–PD-18 integrated documentation baseline | Pending | Independent review and approved integration of open PRs #8–#13 |
| Independent human review for PRs #1–#6 | Pending | Verifiable review record or authorized exception |
| PR #7 independent review and checks | Pending | Reviewer feedback and CI/check evidence |
| Runtime tests and test report | Blocked | Implemented system and test environment |
| User/usability and AI evaluation | Blocked | Working prototype, approved protocol, participants/dataset, results |
| Supervisor feedback | Pending | Actual dated supervisor feedback or approval source |
| Real-world identity behind Git author `2 <3>` | Pending | Independently verified link between GitHub account `DaniilKhvan` and the assigned student; do not rewrite commit metadata |
| Risk owner assignment and control implementation | Pending | Team-confirmed role assignments and tested mitigations |

## 18. Overall evidence-based assessment

The project has substantial and comparatively careful design, requirements, test-planning, evaluation-planning, and risk-management documentation. The artifact-only validator passes, the requirement-to-test mapping is complete at the document level, and the design materials repeatedly distinguish proposals from implemented behavior.

However, the reviewed repository does **not** establish a functioning CRM system or runtime compliance. Core security, data integrity, API, UX, AI, performance, reliability, and acceptance behaviors remain unverified because implementation and test infrastructure are absent. The project is therefore **not ready for a runtime quality or product-value conclusion**. The GitHub evidence also shows a review-governance gap: multiple PRs were merged while their descriptions still said independent review was pending. These are readiness and process findings, not claims that uninspected runtime features failed.
