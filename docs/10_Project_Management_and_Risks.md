# 10. Project Management, Responsibility, Risks and Dependencies

**Required tools:** one continuous GitHub/GitLab repository and a YouTrack project. **These services have NOT been created or modified from this document.** The provided CSV is a proposed backlog requiring real import and assignment in a team-owned YouTrack workspace.

## 10.1 Ownership / responsibility matrix

| Workstream | Accountable / lead | Supporting contributor | Independent check |
|---|---|---|---|
| Backend architecture, data model and API | Aitzhan Iliyas | Aibek (contract consultation) | Daniil (API tests) |
| AI proposal/authorization integration | Aitzhan Iliyas | Aibek (confirmation UI) | Daniil (safety matrix) |
| UX research synthesis, wireframes, React SPA | Aibek Galmbekov | Aitzhan (API agreement) | Daniil (task checks) |
| Test plan, traceability, defects and regression | Daniil Khvan | Both developers | Supervisor at checkpoints |
| Literature and product comparison | All three, split by section | — | Supervisor |
| Scope and pre-defense submission | All three jointly | — | Supervisor |

Individual Git identities, actual deliverable authorship and reviews must be verified by genuine commits and peer feedback, not invented. This pack is an initial document **draft** and does not substitute for the team's work history.

## 10.2 Proposed near-term milestone plan (not an official university schedule)

| Milestone | Suggested date | Outputs / gate | Status |
|---|---|---|---|
| M0: Initiate repository / tracker | 22 Oct 2026 | Repository invitation and issue board verified | NOT VERIFIED |
| M1: Research and design package | 22–23 Oct 2026 | Draft 11 deliverables checked against rubric | DRAFTED IN PACK |
| M2: Evidence/supervisor gate | By 24 Oct 2026 if practical | Real interviews or client discussion; feedback tracked | HUMAN ACTION OPEN |
| M3: First pre-defense | 24 Oct 2026 | Baseline repo, required files, `pre-defense-1` tag | NOT PERFORMED |
| M4: Backend + UI vertical slice | Proposed after pre-defense | Auth/client/task and CI demonstration | PLANNED |
| M5: Booking + AI safeguards | Proposed after M4 | Concurrency + proposal tests | PLANNED |
| M6: Empirical evaluation/finalization | Future date to be agreed | Pilot metrics, final report and revisions | PLANNED |

## 10.3 Backlog and YouTrack rules

See `plans/YouTrack_Backlog.csv`. The `PLAN-###` identifiers are **local planning references**, not issued YouTrack IDs. After creating the actual project, transfer the rows as real tasks, assign one accountable student per task, add deadlines and checkable acceptance criteria, then replace local IDs with actual issue IDs in branch names and PR descriptions. All rows start `Planned` because completion has not been established.

Suggested task workflow: **Open → In Progress → Review → Done**. A task becomes Done only after its acceptance criterion is met and a genuine commit, diagram, interview record, or other verifiable artifact is attached. Record blocked issues and dependencies openly.

## 10.4 Git workflow (must occur in real accounts)

1. Create GitHub/GitLab repository and grant the supervisor plus all members access; grant committee access before pre-defense.
2. Use each person's own authenticated account and identifiable commit authorship; do not fabricate historical commits or share identities.
3. Keep `main` as reviewed baseline. Work in task-named branches: `PLAN-006-requirements`, later actual `DIP-23-database-schema` etc.
4. Every Pull/Merge Request references task ID, explains changes, test evidence and documents review; another team member reviews team PRs.
5. Commit code, design changes, docs and test assets progressively with meaningful messages.
6. Make an immutable annotated tag `pre-defense-1` at the exact submitted reviewed commit; do not move it later.
7. Save submission link, tag, limitations and outstanding tasks in `SUBMISSION_STATUS.md`.

**Suggested Git commands AFTER reviewers approve content:**

```bash
git init
git add .
git commit -m "docs: establish first pre-defense baseline"
# Push to real remote, complete member PRs and supervisor check before stage tag.
git tag -a pre-defense-1 -m "First pre-defense submitted, 2026-10-24"
```

Do **not** execute a tag until all required artifacts and approval are actually ready. One assistant-generated commit cannot demonstrate each student's progressive contributions.

## 10.5 Risk register

| ID | Risk | Likelihood / impact (planning assessment) | Mitigation | Owner |
|---|---|---|---|---|
| R-01 | Cannot recruit users before stage deadline | High / High | Arrange consultations promptly; transparently disclose missing evidence | All |
| R-02 | Scope grows into general ERP | High / High | Maintain six core flows, record additions for later | Aitzhan + supervisor |
| R-03 | AI proposes harmful/unauthorized actions | Med / Critical | Typed allowlist, backend RBAC, approval, negative test corpus | Aitzhan / Daniil |
| R-04 | Concurrent bookings overlap | Med / Critical | PostgreSQL transactional invariant and load tests | Aitzhan / Daniil |
| R-05 | Provider downtime/cost / personal-data concern | Med / High | Mock provider, fallback, data minimization, cost cap | Aitzhan |
| R-06 | Frontend and backend contracts diverge | High / Med | OpenAPI as contract, fixture tests and review | Aibek / Aitzhan |
| R-07 | Inadequate historical Git trace | High / High | Start authentic commits immediately; never manufacture past history | All |
| R-08 | Supervisor cannot review in time | Med / High | Send concise decision log and request explicit response | All |
| R-09 | Usability test sample too small | Med / Med | Report sample and limitations; do not overclaim results | Aibek / Daniil |
| R-10 | Sensitive customer data leaks in research | Med / High | Consent, anonymization, synthetic fixtures and access limits | All |

## 10.6 Dependencies and order of implementation

Client model must exist before deal and booking integration. Role policies must exist before any AI-generated action can be executed. Scheduling schema and invariant should be reviewed before calendar integration. API shape must be agreed before React integration. Acceptance criteria should be drafted before test automation. Pilot use of real data requires consent, data-handling review and the supervisor's approval.

## 10.7 Evidence of actual contribution

Required for pre-defense: real task URLs, branch/commit links, PR authors/reviewers and short task-to-deliverable trace per person. Fill `plans/Contribution_Evidence_Template.md` with only verified URLs. The initial archive provides materials to begin team work; it cannot prove historical individual contributions.
