# Flowentra CRM AI — Project Management and Risk Management

| Field | Value |
|---|---|
| Task | PD-17 — Risk Management |
| Responsible student | Daniil Khvan |
| Status | Initial evidence-based risk assessment; no review meeting or mitigation completion is claimed |
| Branch | `pd-17-risk-management` |
| Repository baseline | `main` at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd` |
| Risk register | [`plans/Risk_Register.csv`](../plans/Risk_Register.csv) |

## 1. Purpose and scope

This document identifies, scores, assigns, and proposes responses for material risks to the Flowentra diploma project. The assessment covers the proposed CRM MVP, software and data architecture, security and privacy, optional AI design, requirements/testing/evaluation readiness, and team coordination.

The register is grounded in the inspected repository at the stated baseline. It is not an incident log, a completed risk review, or evidence that a proposed control is implemented. The repository contains design documents, diagrams, an OpenAPI contract, and a static contract validator, but no Go backend, React application/prototype, database schema or migrations, deployment, runtime test suite, or AI provider/model integration. Risk descriptions therefore distinguish current evidence gaps from future conditional risks.

The risk register has 24 entries across technical, AI, security/privacy, and organizational categories. Entries marked `Conditional` describe a risk that becomes active only if the related component or data flow is implemented or enabled. A conditional entry is not a claim that the corresponding feature exists.

## 2. Risk management methodology

The register uses a prospective, qualitative planning assessment for the period from implementation through evaluation. For each risk:

1. Record the condition and its evidence-based cause.
2. Describe the plausible consequence to scope, quality, security, privacy, schedule, or evaluation validity.
3. Estimate likelihood and impact on the ordinal 1–5 scales below. These ratings are planning judgments, not measured probabilities or incident statistics.
4. Calculate `Risk Score = Likelihood × Impact` and assign the corresponding level.
5. Assign an accountable **role**, preventive controls, detection method, contingency/recovery action, warning trigger, and status in the CSV register.
6. Reassess after the cause changes, mitigation evidence becomes available, an incident occurs, a dependency is delayed, or an upstream requirement/contract changes.

The assessment takes account of the declared single-organization React/Go/PostgreSQL design, fixed roles, proposed REST/OpenAPI contract, external AI trust boundary, project ownership information, and the absence of executable implementation/evaluation at this baseline. A high likelihood can reflect a known missing prerequisite (for example, no runtime tests), not a statistical forecast of failure.

## 3. Risk categories

- **Technical:** integration, persistence, API consistency, exception handling, deployment, performance, testing, and dependency risks.
- **AI:** correctness, prompt injection, action authority, provider availability, duplicate side effects, and behavior variability. All listed AI risks are conditional on implementation; no AI runtime exists in the inspected baseline.
- **Security & Privacy:** authentication, authorization, cross-user exposure, credential/log exposure, third-party data processing, and API perimeter controls.
- **Organizational:** baselining and approval of requirements, frontend/backend coordination, review ownership, contributor availability, and evaluation schedule/readiness.

Categories can overlap in practical response. For example, an AI-generated cross-user disclosure is both an AI and privacy concern; it is registered under the primary risk owner and linked to relevant requirements.

## 4. Likelihood and impact scales

### Likelihood

Likelihood is an ordinal estimate of the chance that the stated risk condition will occur during the implementation-to-evaluation period, given current evidence. It is not a percentage.

| Score | Rating | Planning interpretation |
|---:|---|---|
| 1 | Rare | Requires an unusual combination of conditions; no current warning evidence. |
| 2 | Unlikely | Possible but current controls or project conditions make occurrence less expected. |
| 3 | Possible | Credible under normal project conditions, especially if a known dependency is unresolved. |
| 4 | Likely | Existing evidence or missing prerequisites make occurrence more expected than not unless addressed. |
| 5 | Almost Certain | The condition already exists or will persist without a specific change; this is not a measured probability. |

### Impact

Impact is the plausible consequence if the risk occurs, using the highest credible project-relevant effect.

| Score | Rating | Planning interpretation |
|---:|---|---|
| 1 | Negligible | Local inconvenience with no meaningful quality, security, schedule, or data effect. |
| 2 | Minor | Limited rework or disruption; workaround is straightforward and contained. |
| 3 | Moderate | Noticeable workflow, schedule, or quality loss that is recoverable without major scope impact. |
| 4 | Major | Core workflow, milestone, or substantial data/quality impact; significant rework or recovery needed. |
| 5 | Critical | Potential unauthorized access/disclosure, material integrity loss, unsafe mutation, or failure to demonstrate core system evidence. |

### Rating basis

The likelihood/impact rationale below explains each CSV rating. A current missing implementation or test artifact is a repository observation. Any estimate of how it affects future work remains a planning judgment.

| Risk ID | Likelihood basis | Impact basis |
|---|---|---|
| R-TECH-001 | 4 — frontend/backend source and integrated build are absent while separate ownership is documented. | 4 — incompatible interfaces could block end-to-end MVP workflows and cause significant rework. |
| R-TECH-002 | 4 — no schema/migrations exist, while concurrent booking and transactional integrity are explicit design constraints. | 5 — corruption, duplicate/overlapping bookings, or partial writes undermines core data reliability. |
| R-TECH-003 | 4 — the API is design-only and is not checked against a live implementation. | 4 — contract drift can break consumers or weaken error/precondition behavior across core endpoints. |
| R-TECH-004 | 3 — runtime failure handling is unverified; actual occurrence cannot be observed without code. | 4 — unsafe or partial errors can materially affect data and expose diagnostics. |
| R-TECH-005 | 4 — deployment, migration, startup, and recovery instructions are not delivered in the inspected baseline. | 4 — configuration or restore failure can block a demonstration or lose data. |
| R-TECH-006 | 3 — no benchmark or deployed service exists, so overload is plausible but not observed. | 3 — latency can degrade workflow quality and cause retries, but the target is provisional. |
| R-TECH-007 | 5 — no runtime test suite exists; only static OpenAPI validation is executable. | 5 — unverified core/security behavior can escape detection and invalidate acceptance evidence. |
| R-TECH-008 | 3 — runtime packages/provider are not selected; compatibility risk is credible but not yet evidenced as a failure. | 4 — dependency issues could block builds or introduce a vulnerability in deployed behavior. |
| R-AI-001 | 4 — generative output is inherently variable and no Flowentra-specific evaluation exists; conditional on AI implementation. | 4 — incorrect records or user decisions can materially affect CRM work. |
| R-AI-002 | 3 — prompt injection is a credible threat to any future natural-language interface, but no model/data path is active. | 5 — successful injection could disclose sensitive records or induce unsafe behavior. |
| R-AI-003 | 4 — confirmation lifecycle/API are unimplemented and explicitly require design-to-runtime work. | 5 — an unauthorized or duplicate mutation directly violates the human-control boundary. |
| R-AI-004 | 3 — an external provider is proposed but not selected; outage exposure is conditional and not measured. | 3 — AI functionality would be unavailable, while design intends manual CRM fallback. |
| R-AI-005 | 3 — network retries and uncertain commit outcomes are credible once AI writes exist; behavior is untested. | 5 — duplicate appointment/task side effects can damage business records and trust. |
| R-AI-006 | 4 — model/provider stability is not under project control and versioning is not yet established. | 3 — output drift can regress quality and require reevaluation, though validation can limit impact. |
| R-SEC-001 | 5 — no authentication middleware, handlers, or runtime authorization controls exist to verify at baseline. | 5 — bypass can expose or mutate organization-wide records and accounts. |
| R-SEC-002 | 4 — ownership rules are documented but have no implementation or cross-user runtime evidence. | 5 — cross-user exposure is a critical confidentiality/privacy failure. |
| R-SEC-003 | 4 — no deployed storage/logging configuration has been inspected; secret-control evidence is absent. | 5 — credential or personal-data leakage can enable account takeover or broad disclosure. |
| R-SEC-004 | 4 — no provider or privacy/retention review is selected; applies if real data is sent to an AI service. | 5 — unapproved third-party personal-data processing can create significant privacy and trust harm. |
| R-SEC-005 | 3 — deployment perimeter and middleware do not yet exist, so exposure is a future configuration risk. | 5 — an exposed protected route or insecure transport can permit unauthorized access or interception. |
| R-ORG-001 | 4 — PD-13 through PD-16 are confirmed separate unmerged branches, with downstream references pinned to commits. | 4 — inconsistent baseline undermines traceability and may cause rework or evaluation against wrong criteria. |
| R-ORG-002 | 4 — multiple requirements and targets are explicitly proposed or awaiting stakeholder confirmation. | 4 — treating assumptions as approved can cause disputes, unsafe decisions, or major rework. |
| R-ORG-003 | 4 — separate frontend/backend responsibilities are documented, but no integrated application or schedule is present. | 4 — late integration may block core demonstrations and leave insufficient QA time. |
| R-ORG-004 | 3 — reviewer usernames are noted as unverified and actual availability is unknown. | 3 — delayed independent review can slow integration or leave findings unresolved. |
| R-ORG-005 | 4 — no confirmed evaluation schedule, prototype, recruitment, or environment is evidenced. | 4 — the project may miss meaningful implementation/user evaluation and overstate outcomes. |

## 5. Risk scoring matrix and prioritization

`Risk Score = Likelihood × Impact`, yielding values from 1 to 25.

|  | Impact 1 | Impact 2 | Impact 3 | Impact 4 | Impact 5 |
|---|---:|---:|---:|---:|---:|
| Likelihood 5 | 5 Moderate | 10 High | 15 High | 20 Critical | 25 Critical |
| Likelihood 4 | 4 Low | 8 Moderate | 12 High | 16 High | 20 Critical |
| Likelihood 3 | 3 Low | 6 Moderate | 9 Moderate | 12 High | 15 High |
| Likelihood 2 | 2 Low | 4 Low | 6 Moderate | 8 Moderate | 10 High |
| Likelihood 1 | 1 Low | 2 Low | 3 Low | 4 Low | 5 Moderate |

| Score | Risk level | Proposed response expectation |
|---:|---|---|
| 1–4 | Low | Maintain basic controls; review at the next planned checkpoint or when the trigger occurs. |
| 5–9 | Moderate | Assign an owner and monitor; define a practical response before the related milestone. |
| 10–16 | High | Prioritize prevention and test evidence; review before the affected milestone; escalate unresolved exposure to the Project Lead. |
| 17–25 | Critical | Immediate attention; do not enable/release affected functionality until a control and evidence-based disposition exist; escalate security/privacy incidents immediately. |

Thresholds are planning policy for this register, not an approved organization-wide risk appetite. Scores help prioritize, not replace judgment: a privacy/security trigger is escalated immediately even if a score is lower.

## 6. Risk owners and responsibilities

Owners are accountable **roles**, not claims about confirmed individual availability. The repository identifies Aitzhan Iliyas for backend/AI, Aibek Galymbekov for frontend/UX, and Daniil Khvan for QA coordination; the register uses role labels to avoid implying that these people accepted a specific mitigation assignment for this task.

| Role | Proposed accountability |
|---|---|
| Project Lead | Confirm scope, decisions, dependencies, schedule, escalation, and risk acceptance; must be assigned/confirmed by the team. |
| QA Engineer | Maintain risk/test traceability, validate evidence, surface untested high-risk requirements, and track retests. |
| Backend Developer | Implement and verify API, authentication, authorization, transactions, validation, and error handling. |
| Frontend Developer | Coordinate user workflows, safe rendering, error states, timezone behavior, and contract integration. |
| Database Owner | Review schema/migrations, constraints, transactions, backup/restore, and integrity evidence; role assignment requires confirmation. |
| AI Integration Owner | Own model/provider boundary, output validation, privacy minimization, confirmation lifecycle, and AI evaluation; role assignment requires confirmation. |
| Security Owner / Privacy Owner | Review protection, incident response, and provider/data handling; these roles require assignment where project governance requires them. |
| Deployment/Operations Owner | Own runtime configuration, secrets, deployment, monitoring, and recovery procedure; role assignment requires confirmation. |

A person may hold multiple roles in a small project, but separation of duties for security review and acceptance should be considered. Do not mark an owner or mitigation complete until the project confirms responsibility and records evidence.

## 7. Preventive and detective controls

Every CSV entry contains specific proposed preventive controls and a detection method. The core control themes are:

- **Contract and integration:** version OpenAPI; coordinate changes; test live responses and end-to-end workflows (`R-TECH-001`, `R-TECH-003`).
- **Persistence and recovery:** reviewed migrations/constraints, atomic transactions, failure injection, backup/restore, and state comparisons (`R-TECH-002`, `R-TECH-005`, `R-TECH-004`).
- **Authentication and privacy:** server-side policy, direct API role tests, secret redaction, TLS/configuration checks, and synthetic data (`R-SEC-001`–`R-SEC-005`).
- **AI safety, conditional on implementation:** bounded intents, least-privilege retrieval, schema/entity validation, actor-bound explicit confirmation, idempotent consumption, timeouts, safe manual fallback, and isolated adversarial/evaluation suites (`R-AI-001`–`R-AI-006`).
- **Quality and management:** executable runtime tests, traceability, documented decisions, integration checkpoints, review assignment, and confirmed evaluation schedule (`R-TECH-007`, `R-ORG-001`–`R-ORG-005`).

These are recommendations, not existing controls. The register includes warning signs and measurable detection evidence where feasible; static API-contract validation is not treated as proof of runtime security or behavior.

## 8. Contingency and recovery procedures

The specific action for each risk is recorded in the register. Apply these general safeguards:

1. **Stop or isolate:** disable an affected endpoint, AI intent, or deployment route when continuing could cause unauthorized access, disclosure, unsafe mutation, or data corruption.
2. **Preserve evidence:** retain relevant sanitized request IDs, build/configuration identifiers, timestamps, test data IDs, and restricted logs. Do not copy secrets or real personal data into an issue or shared document.
3. **Contain and assess:** revoke affected sessions/credentials if exposure is plausible; assess affected synthetic or production data under the project's approved incident/privacy process. Do not make unsupported claims about breach scope.
4. **Restore safely:** recover only from a verified backup or known-good build/configuration; reconcile state using an approved repair procedure and keep an audit trail.
5. **Correct and retest:** link a defect and requirement/test IDs; update contract, implementation, tests, and user guidance together; retest affected and cross-module regressions.
6. **Re-enable by evidence:** restore only after the risk owner and required independent reviewer accept the test evidence and any residual risk is recorded. A workaround is not a pass.

No production backup, incident response, rollback, or recovery process is evidenced in the current repository; these procedures require implementation and rehearsal before real-data deployment.

## 9. Risk monitoring and review cadence

No completed risk-review meeting or standing cadence is evidenced. The following cadence is proposed:

- Review the register at least once per active project week after a team agrees the schedule, and at each scope, architecture, integration, security, or evaluation milestone.
- Reassess immediately when a trigger in the CSV occurs, a defect/incident is discovered, requirements or provider choices change, an owner/dependency becomes unavailable, or implementation evidence changes a rating.
- Record review date, participants/roles, score changes, evidence, action owner, due date **only when agreed by the team**, and disposition.
- Retain historical scores or a dated change log; do not silently overwrite rationale or close a risk because a design document was added.

At each review, ask: Is the cause still present? Did likelihood change based on evidence? Is the impact still credible? Were controls implemented and tested? Did the trigger occur? Is the risk accepted, avoided, mitigated, transferred, or still open? Is the residual exposure acceptable to an authorized stakeholder?

## 10. Escalation rules

- Escalate any score **17–25** to the Project Lead immediately for disposition and a mitigation plan; affected critical functionality remains blocked until evidence supports release.
- Escalate **10–16** risks to the Project Lead before the dependent milestone if they remain open or a trigger occurs.
- Review **5–9** risks at the next planned checkpoint and act earlier if the trigger indicates increasing likelihood.
- Escalate any suspected credential compromise, unauthorized data access, personal-data disclosure, or unsafe AI mutation immediately, regardless of score. Contain first; then follow the verified incident process.
- If the owner, decision maker, or required environment is not available, mark the item blocked/open and report the dependency. Do not transfer ownership or accept risk by assumption.

## 11. Residual risk

Likelihood and impact in the CSV are initial/inherent planning estimates before the proposed mitigation is evidenced. No residual score is claimed. After a control is implemented, the owner should record its test evidence and reassess both likelihood and impact; impact may remain severe even when likelihood is reduced. A risk is not `Closed` merely because prevention is documented. Security, privacy, and AI risks require verification and authorized acceptance of remaining exposure before enabling the affected path.

## 12. Relationship to QA and project milestones

Risk responses should feed requirements, test planning, implementation, and evaluation:

- **Baseline and requirements approval:** resolve separate task branches and decisions (`R-ORG-001`, `R-ORG-002`) before treating IDs/targets as a unified acceptance baseline.
- **Implementation readiness:** provide source, schema/migrations, frontend, deployment instructions, and test environment; this is necessary to address `R-TECH-001`–`R-TECH-008` and `R-SEC-001`–`R-SEC-005`.
- **Verification:** prioritize P0 authentication, ownership, transaction, appointment concurrency, retry, and AI action safety cases; link every executed case to a requirement/build and retain evidence (`R-TECH-007`).
- **AI readiness:** do not enable provider or real-data use until privacy review and runtime controls exist (`R-AI-001`–`R-AI-006`, `R-SEC-004`).
- **Evaluation:** measure usability, task time, and performance only on a reproducible implementation and approved protocol; treat proposed goals as targets, not achieved outcomes (`R-TECH-006`, `R-ORG-005`).

This task's risk plan does not change the application scope or mark any implementation requirement complete.

## 13. Current high-priority risks

The initial highest-scored risks are:

- **R-TECH-007 (25, Critical):** absence of executable runtime tests means core requirements cannot currently be verified.
- **R-SEC-001 (25, Critical):** authentication and server-side authorization have no runtime implementation to inspect.
- **R-TECH-002 (20, Critical):** no database schema/migrations exist despite integrity and concurrent booking requirements.
- **R-AI-003 (20, Critical, Conditional):** explicit, actor-bound AI confirmation is unimplemented and could be unsafe if action capability is added without it.
- **R-SEC-002 (20, Critical):** cross-user record isolation is designed but not runtime-tested.
- **R-SEC-003 (20, Critical):** deployed secret/log handling is not evidenced.
- **R-SEC-004 (20, Critical, Conditional):** no AI provider/privacy review exists; real-data use must remain disabled until reviewed.

High and Critical ratings are priorities for planning, not evidence of incidents or proof that an implementation has failed. The complete 24-entry register provides owners, mitigations, detection, recovery, triggers, status, and trace links.

## 14. Known limitations

- This assessment is based on repository documentation and branch artifacts, not source-level or deployed-system testing.
- PD-13, PD-14, PD-15, and PD-16 are separate unmerged task branches; the risk assessment notes these dependencies but does not merge them.
- Requirements, architecture, provider/privacy policy, performance targets, and some role/data policies remain proposed or unconfirmed.
- Likelihood/impact estimates are subjective ordinal planning judgments; no incident history, probability model, schedule, or resource forecast was provided.
- Owners are roles, not confirmed task assignments. Some accountability roles (Project Lead, Database Owner, Security/Privacy Owner, Deployment/Operations Owner) require team confirmation.
- External provider, deployment environment, real-data policy, and participant availability are unknown. Related risks are conditional or carry uncertainty.
- A risk register cannot establish that controls are effective; effectiveness requires implementation, tests, evidence, and review.
