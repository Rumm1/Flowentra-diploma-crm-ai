# Flowentra Final QA Audit — PD-13 through PD-18

| Field | Value |
|---|---|
| Audit date | 24 October 2026 |
| Repository | [Rumm1/Flowentra-diploma-crm-ai](https://github.com/Rumm1/Flowentra-diploma-crm-ai) |
| Responsible student | Daniil Khvan (task assignment; Git authorship is not established) |
| Main baseline | `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd` |
| Audit branch | `pd-18-qa-review` |
| Scope | Remote branch state, task artifacts, branch history, API validator, GitHub PR records, and accessible Taiga page |

## 1. Executive summary

All six required task branches exist locally and on `origin`. Each contains the expected task deliverables, and each has an audited task-specific commit relative to `main` (the PD-18 branch additionally receives this audit report and contribution-evidence corrections). The latest GitHub refresh shows six open task PRs, #8–#13, all targeting `main`. They have no recorded reviews, review threads/comments, or checks, and their descriptions still contain blank template fields. The tasks are therefore **In Review — Awaiting Peer Review**, not accepted or merged.

The written QA artifacts are substantially traceable and consistent: 37 PD-14 requirement IDs map one-to-one to the 37 PD-15 test cases; all 37 are also referenced by the PD-16 plan, and every requirement ID referenced by the PD-17 risk register exists in PD-14. The PD-17 risk register's 24 rows have consistent scores and levels. The PD-13 review contains 15 cited sources, including 12 peer-reviewed publications; its 15 references are cited in the review text.

The repository's `main` branch remains a design/documentation baseline, not a runnable CRM: it has no application backend/frontend, database schema or migrations, deployed API, AI provider implementation, or runtime test suite. The API contract validator passes, but this is not runtime verification. No user, AI, security, performance, or product-value evaluation has been performed.

Three review findings remain important: merged PRs #1–#6 lack accessible independent human-review evidence despite the repository merge policy and PR descriptions; `README.md` / `docs/00_Submission_Checklist.md` contain stale PR-status statements; and the new PRs #8–#13 have incomplete descriptions and no peer-review/check evidence. The PD-18 contribution evidence records its original artifact commit and the new account-level PR evidence, while correctly leaving Git author `2 <3>` and real-world account identity unresolved.

## 2. Repository, branch, and evidence state

- Fetch completed successfully. The current checkout is `pd-18-qa-review`; it tracked `origin/pd-18-qa-review` at the start of this audit, with no pre-existing local changes.
- `origin/main` and local `main` are at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`.
- Each required local task branch tracks its corresponding `origin` branch. All six remote heads matched the task commits listed below when fetched.
- The task branches add only the deliverables listed in the summary table, relative to `main`. The latest GitHub refresh shows the six task PRs #8–#13 open against `main`.
- Git records the PD-13 through PD-18 artifact commits under author `2 <3>`. This does not establish that Daniil Khvan authored them. Commit metadata was not rewritten.
- `package.json` has one project script: `npm run validate:api`.
- The accessible Taiga kanban page identifies the project as private. No board status was inspected through an authenticated project session or changed.

## 3. Task summary

The SHA column records the task's deliverable commit. The PD-18 audit update is an additional commit on its branch; its SHA is reported in the completion message and repository history.

| Task ID | Branch | Acceptance Criteria | Files | Validation | Commit SHA | Push Status | PR URL | Peer Review | Final Status |
|---|---|---|---|---|---|---|---|---|---|
| PD-13 | [`pd-13-literature-review`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-13-literature-review) | 15 sources / 12 peer-reviewed; citation metadata and analysis present | `docs/03_Literature_Review.md` | Source/reference/citation checks; DOI metadata cross-check | `f5daed37e785adcb5af8b9eaba8d4487712ef28b` | Confirmed on `origin` | [PR #11](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/11), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |
| PD-14 | [`pd-14-requirements`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-14-requirements) | 23 FR, 14 NFR; unique IDs, acceptance criteria, scope, dependencies, traceability | `docs/06_Requirements.md` | 37 requirement and 37 acceptance IDs; traceability cross-check | `b5bbce29ba7385f8a5ca53d2f7177ae499049caa` | Confirmed on `origin` | [PR #10](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/10), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |
| PD-15 | [`pd-15-test-cases`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-15-test-cases) | 37 test cases, valid CSV, requirement coverage, strategy and defect template | `tests/Test_Cases.csv`; `tests/Test_Strategy.md`; `tests/Defect_Report_Template.md` | CSV parsed; 37/37 trace; 36 Not Run, one static check Passed | `25b330b2217dd9e0599f756f2bff9ff08a147dc2` | Confirmed on `origin` | [PR #9](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/9), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |
| PD-16 | [`pd-16-verification-plan`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-16-verification-plan) | Reproducible verification, AI, baseline, timing, integrity, usability, and metrics plan | `docs/09_Verification_and_Evaluation_Plan.md` | 37 requirement and 37 test references match PD-14/PD-15; targets reviewed as proposed | `2c45803b16827132f67008699814901ede63d588` | Confirmed on `origin` | [PR #8](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/8), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |
| PD-17 | [`pd-17-risk-management`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-17-risk-management) | 24 risks, consistent scoring, owners, controls, and all requested categories | `docs/10_Project_Management_and_Risks.md`; `plans/Risk_Register.csv` | CSV structure, required fields, score/level arithmetic, and requirement references checked | `f14d1f9a473b92f7bc7ac03b3654770566725a22` | Confirmed on `origin` | [PR #12](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/12), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |
| PD-18 | [`pd-18-qa-review`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/pd-18-qa-review) | Evidence-based review, accurate PR and contribution evidence, pending status disclosures | `docs/QA_Review_Summary.md`; `plans/Contribution_Evidence.md`; `plans/Review_Checklist.md`; `docs/QA_Final_Audit_Report.md` | Reviewed against fetched GitHub/branch evidence; contribution table updated for account-level PR evidence | `e4130bf3ba60afa2a4eb379cde66557398aaedec` | Task commit and audit updates confirmed on `origin` | [PR #13](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/13), open → `main` | None; no reviews/comments/checks | In Review — Awaiting Peer Review |

“Confirmed on `origin`” means the task commit is present in the fetched remote branch. It does not mean the PR is merged, reviewed, or accepted. The PD-18 audit commit is an additional commit on the PD-18 branch.

## 4. Acceptance criteria by task

### PD-13 — Literature Review

| Criterion | Result | Evidence / limitation |
|---|---|---|
| Minimum source count and peer-reviewed threshold | Met | The analytical table and numbered references contain 15 unique publications: 12 peer-reviewed journal/conference publications and three NIST guidance publications. |
| Verifiable bibliographic metadata and DOI | Met with access limitation | The review records 11 scholarly Crossref metadata checks, one ACL Anthology record, and three official NIST records. This audit queried Crossref for the 11 scholarly DOIs and confirmed matching DOI/title/author/year metadata. The ACL and NIST DOI targets resolved to official records. Several publisher hosts returned HTTP 403 to direct requests; those blocked pages were not treated as evidence of invalid DOIs. |
| No fabricated sources | No issue observed in checked references | No mismatch was identified in the 15 checked source records. This is a bounded bibliographic check, not proof that every interpretation or finding in the literature synthesis is exhaustive. |
| Critical analysis rather than summaries | Met | The review includes thematic analysis, methodology comparison, benefits/limitations, research gaps, implications, recommendations, and review limitations. |
| Connection to actual Flowentra | Met as a design-level synthesis | It describes Flowentra as proposed and connects evidence to the documented CRM, AI, architecture, privacy/security, and evaluation needs. It does not claim implemented outcomes. |

### PD-14 — Requirements Specification

| Criterion | Result | Evidence / limitation |
|---|---|---|
| Functional and non-functional requirements | Met | 23 functional and 14 non-functional requirement IDs are defined. |
| Unique IDs and testable acceptance criteria | Met at specification level | The 37 requirement IDs and 37 acceptance-criterion IDs are unique. Acceptance conditions and verification methods are documented; runtime testability has not been demonstrated. |
| Dependencies and priorities | Met as proposed planning | The document states assumptions, constraints, dependencies, and P0/P1/P2 priorities. These are proposed and not stakeholder-approved. |
| MVP and future scope | Met | Mandatory proposed MVP, proposed quality targets, and future/excluded scope are separated. |
| Alignment with architecture | Met against documented design | Requirements align with the proposed React/Go/PostgreSQL, REST/OpenAPI, single-organization design. There is no runtime implementation to check. |
| Requirement traceability | Met | The requirement traceability table has 37 rows and links each requirement to a test case; cross-check against PD-15 found no missing or unknown IDs. |

### PD-15 — Test Cases and Test Strategy

| Criterion | Result | Evidence / limitation |
|---|---|---|
| At least 30 meaningful test cases | Met as test design | CSV contains 37 unique cases with populated required fields. |
| CSV validity and requirement traceability | Met | Ruby CSV parsing succeeded; all 37 requirements map one-to-one to 37 cases. |
| Scenario breadth | Met as planned coverage | Cases include positive/negative, boundaries, authorization/ownership, duplicate/replay/idempotency, retry/failure, schema/grounding, and prompt-injection-related scenarios. These remain test cases, not executed evidence. |
| Execution status honesty | Met | 36 cases are `Not Run`; only the static API contract case is `Passed`. This audit observed no runtime case falsely recorded as passed. |
| Strategy and defect template | Met by inspection | The strategy covers test levels, environment, test data, traceability, execution criteria, regression, security, API, database, AI, and reporting. The defect template covers reproduction, expected/actual results, evidence, severity, priority, and verification. |

### PD-16 — Verification and Evaluation Plan

| Criterion | Result | Evidence / limitation |
|---|---|---|
| Reproducible layered verification | Met as plan | Requirements, unit, integration, API, system/regression, security, database, usability, AI, performance, and reliability methods are described with procedures and evidence expectations. |
| AI evaluation methodology | Met as proposed protocol | Synthetic held-out data, reviewed reference answers, schema/field/case scoring, safety/refusal handling, versioning, and privacy controls are specified. No dataset or AI output has been evaluated. |
| Baseline and time measurement | Met as proposed protocol | Comparable workflows, paired timing, start/end points, training, exclusions, and summary statistics are described. No measured baseline or Flowentra timing exists. |
| Data integrity and usability | Met as proposed protocol | Referential integrity, duplicates, transactions/failures, repeated requests, recovery, API/storage consistency, task outcomes, feedback, and SUS handling are addressed. |
| Metric rules and status of targets | Met as plan; targets remain unapproved | The plan defines denominators/scoring and labels 85% structured-AI correctness, 20% median task-time reduction, and p95 below 500 ms under a proposed workload as **targets**, not results. No measurements are claimed. |

### PD-17 — Risk Management

| Criterion | Result | Evidence / limitation |
|---|---|---|
| Risk register exists and is structurally valid | Met | 24 unique CSV risk rows contain all specified columns and non-empty required values. |
| Scoring consistency | Met | Likelihood and impact are 1–5; all products and Low/Moderate/High/Critical bands match the declared thresholds. |
| Owners, prevention, detection, and recovery | Met as proposed controls | Each row identifies role owners, prevention, detection, recovery/contingency, triggers, status, and related requirement/component. These controls are not confirmed as implemented. |
| Category coverage | Met | Technical 8; AI 6; Security & Privacy 5; Organizational 5. Conditional status is used where AI/provider exposure is not implemented. |
| Narrative consistency | Met | All 24 risk IDs in the register are referenced in the narrative; the narrative has no unknown risk IDs. Ratings remain qualitative planning estimates, not measured probabilities. |

### PD-18 — QA Review and Contribution Evidence

| Criterion | Result | Evidence / limitation |
|---|---|---|
| Review findings are evidence-based | Met within inspected scope | The summary distinguishes process/documentation issues, missing evidence, potential issues, and blocked checks. The two confirmed findings concern review governance and stale PR-status documentation, not unobserved runtime defects. |
| Contribution evidence matches Git history | Met with attribution limitation | All task commit hashes/authors were checked. The contribution table now includes PD-18 commit `e4130bf…`; all six task commits use `2 <3>`, which cannot be attributed to Daniil without identity evidence. |
| PR status accuracy | Met for accessible records | GitHub lists open PRs #8–#13 for PD-13–PD-18, each targeting `main`. No reviews, review threads/comments, requested reviewers, or check runs were returned; no approval is claimed. |
| Pending checks remain pending | Met | Runtime implementation, tests, independent review, user evaluation, and attribution are described as pending/blocked where evidence is absent. |
| Supervisor feedback | Met | The required statement is present: “Supervisor feedback was not available in the inspected project materials.” No fictional feedback is included. |
| Known limitations | Met | No runtime application was available; external discussions, real-world Git author identity, and private Taiga task status could not be verified. |

## 5. Cross-document consistency

- **Requirement-to-test:** PD-14 has 37 unique requirements; PD-15 has 37 unique test IDs and maps every requirement exactly once. No unknown or unmapped requirement IDs were found.
- **Evaluation traceability:** PD-16 references all 37 PD-14 requirement IDs and all 37 PD-15 test IDs; no unknown references were found.
- **Risk traceability:** Every PD-17 requirement ID in the register's related-component field exists in PD-14. All 24 register risk IDs are referenced in the risk narrative.
- **MVP and AI scope:** The documents consistently treat the system as a proposed single-organization CRM MVP with bounded AI and human confirmation. AI functions, controls, and outputs are proposed; no AI endpoint/provider/runtime is present.
- **Evidence statuses:** The test inventory and evaluation/risk documents consistently label unexecuted tests, targets, and mitigations as planned rather than achieved. The PD-08 interview simulations are explicitly fictional and are not treated as actual user research.
- **Known documentation inconsistency:** [README.md](../README.md) and [docs/00_Submission_Checklist.md](./00_Submission_Checklist.md) contain stale status statements describing PRs #1–#6 as open/unmerged or pending, while accessible GitHub records show them merged. Correct these on an appropriate repository-maintenance change; this audit did not silently change files outside PD-18.

## 6. Tests and documentation validation

| Command/check | Result | Meaning |
|---|---|---|
| `npm run validate:api` | **Passed** | Static OpenAPI 3.0.3 schema/reference validation; 17 paths, 27 operations, 225 example occurrences, six invalid fixtures rejected, and selected contract conventions checked. No server requests were made. |
| Ruby CSV parsing and PD-14/PD-15 traceability check | **Passed** | 37 requirement IDs map to 37 unique, fully populated test rows; execution status is 36 `Not Run`, one `Passed`. |
| PD-13 citation/source check | **Passed with publisher access limitations** | 15 unique reference/table entries; 12 peer-reviewed entries; all 15 sources cited in review text. DOI metadata was cross-checked as described above. |
| PD-17 CSV validation | **Passed** | 24 unique complete rows; scores, thresholds, levels, required fields, category counts, and narrative ID references validated. |
| Cross-task reference check | **Passed** | All PD-16 requirement/test references and PD-17 requirement references map to their source artifacts. |
| Markdown relative-link check across task branches and PD-18 audit files | **Passed** | All inspected relative Markdown links resolve to files in their respective branch trees. |
| `git diff --check` | **Passed** | No whitespace errors in the staged audit report and contribution-evidence update. |
| Runtime unit/integration/API/database/browser/security/AI/performance tests | **Blocked / Not Run** | No application implementation or runtime test environment exists in the inspected repository. |

No repository-provided check failed. Two initial ad hoc audit one-liners failed because of parsing/script assumptions; corrected CSV, traceability, and citation validators passed. These were audit-tool errors, not project-test failures. There is no configured build, lint, or runtime test script in `package.json` beyond the API validator.

## 7. GitHub, review, and task-board status

| Task | PR | Source → target | Status / mergeability | Review, comments, checks |
|---|---|---|---|---|
| PD-13 | [#11](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/11) | `pd-13-literature-review` → `main` | Open, non-draft; `clean` | No reviews, review threads/comments, or check runs returned |
| PD-14 | [#10](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/10) | `pd-14-requirements` → `main` | Open, non-draft; `clean` | No reviews, review threads/comments, or check runs returned |
| PD-15 | [#9](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/9) | `pd-15-test-cases` → `main` | Open, non-draft; `clean` | No reviews, review threads/comments, or check runs returned |
| PD-16 | [#8](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/8) | `pd-16-verification-plan` → `main` | Open, non-draft; `clean` | No reviews, review threads/comments, or check runs returned |
| PD-17 | [#12](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/12) | `pd-17-risk-management` → `main` | Open, non-draft; `clean` | No reviews, review threads/comments, or check runs returned |
| PD-18 | [#13](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/13) | `pd-18-qa-review` → `main` | Open, non-draft; mergeability `unknown` at inspection | No reviews, review threads/comments, or check runs returned |

The six PRs are authored by GitHub account `DaniilKhvan`; this is account-level evidence, not independent real-world identity verification. Their PR descriptions retain the blank repository template, including empty task ID, summary, file list, baseline, validation, completion-time, Taiga reference, and reviewer-request fields; author checkboxes remain unchecked. No requested reviewers were returned. These are confirmed review-readiness gaps; no task PR has an approval or CI/check evidence.

For context, PRs #1–#6 are closed with merge timestamps; PR #7 (PD-08) remains open. PR #7's reviews/comments were empty and its combined status had zero checks at inspection time. `CONTRIBUTING.md` prohibits merging without independent review, while available descriptions for merged PRs #1–#6 indicated independent review was pending/required. PR #1 has an automated Codex review and unresolved review threads; no human review record was returned for #2–#6.

Taiga returned a private-project view, so statuses were not inspected or changed. Recommended board action: keep the six items open and move them to the workflow's in-review state, if available; do not mark accepted/closed until independent review and acceptance evidence are recorded. No PR was merged by this audit.

## 8. Findings, release risks, and remaining work

### Confirmed issues

1. **Independent-review gate evidence is missing for merged PRs #1–#6 (High review priority).** Preserve history; obtain independent review of the merged content or document an authorized exception, and disposition the outstanding PR #1 threads.
2. **Repository PR-status documentation is stale (Medium review priority).** Update README and submission checklist statuses and baseline references through an appropriately scoped, reviewed change.
3. **Open task PRs #8–#13 are not review-ready (Medium review priority).** Their PR bodies are unfilled templates and no reviewer, review, or check evidence is present. Complete the metadata and request independent review.

### Critical release/readiness risks

- There is no runnable CRM, backend/frontend source, database schema/migrations, deployed API, AI integration, or runtime tests on `main`. Product behavior and security cannot be accepted from design documents or a static API validator.
- The PD-13 through PD-18 artifacts remain on separate unmerged branches with open PRs #8–#13; they are not one accepted project baseline.
- Git commit attribution to Daniil is not established by author metadata (`2 <3>`). PR account `DaniilKhvan` is verified at account level; the account-to-student mapping still needs independent confirmation. Do not rewrite existing author metadata.
- Privacy review, AI provider/model selection, user recruitment/evaluation, supervisor feedback, and risk-owner acceptance remain outstanding.

### Required next actions

1. Fill the task IDs, summaries, changed files, baseline, actual validation, limitations, Taiga references, and reviewer request in PRs #8–#13; request an independent reviewer and review in dependency order. Do not self-approve or merge.
2. Resolve the stale main-branch PR-status documentation and decide integration order. Reconcile dependent links and versions after review.
3. Implement a minimal vertical slice with reproducible setup, database migrations, server-side authorization, frontend workflows, and synthetic test data before claiming functional acceptance.
4. Run PD-15 runtime cases and retain build-specific evidence; keep current `Not Run` statuses until actually executed.
5. Approve and execute the PD-16 AI, usability, timing, integrity, security, performance, and reliability protocols. Continue to label targets as targets until measured.
6. Obtain verified contributor identity evidence, real supervisor feedback (if available), and authenticated Taiga task state; do not fabricate or infer these records.

## 9. Unverified claims and limitations

- This audit did not inspect a running application, conduct penetration testing, examine production data, or perform a formal usability/user study.
- DOI metadata was checked through Crossref/official records; some publisher hosts blocked direct access with HTTP 403. That restriction limited direct full-text publisher verification but did not produce a DOI metadata mismatch in the checked records.
- The GitHub PR/review/check data and remote branch heads are a point-in-time snapshot. Informal reviews outside GitHub and real-world account identities cannot be inferred.
- Taiga is private in the available unauthenticated view; no board status updates were attempted.
- Risk scores and proposed evaluation thresholds are planning judgments/targets, not measured outcomes or stakeholder-approved commitments.
