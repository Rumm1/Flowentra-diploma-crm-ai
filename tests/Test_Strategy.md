# Flowentra CRM AI — Test Strategy

| Field | Value |
|---|---|
| Task | PD-15 — Test Cases and Test Strategy |
| Owner | Daniil Khvan |
| Status | Test design; runtime execution not available |
| Branch | `pd-15-test-cases` |
| Test case inventory | [`Test_Cases.csv`](./Test_Cases.csv) |
| Requirements baseline | PD-14, commit `b5bbce29ba7385f8a5ca53d2f7177ae499049caa`, branch [`pd-14-requirements`](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/pd-14-requirements/docs/06_Requirements.md) |

## 1. Testing objectives

- Establish reproducible checks for the functional and quality requirements identified by PD-14.
- Find contract, authorization, data-integrity, privacy, reliability, and AI-action safety failures before release.
- Distinguish checks of the written API/design contract from tests of a running product.
- Preserve evidence for each execution; never infer a pass from inspection or from a static contract check.

## 2. Scope and exclusions

The inventory has 37 cases: 36 runtime/specification-level cases and one static contract-validation case. It covers authentication, all three documented roles (`admin`, `manager`, `employee`), clients, deals, tasks, appointments, reporting, the proposed AI assistant, security, reliability, performance, usability, maintainability, data integrity, privacy, and auditability.

The runtime cases are derived from the PD-14 requirements and proposed API/design contracts. They are not evidence that corresponding endpoints, screens, database constraints, authentication middleware, model integration, or controls exist. They must be executed only after an implementation and isolated test environment are available. No production system or production data is in scope.

The current checkout has no backend, frontend, database migrations, AI provider integration, or runtime test suite. There is no authoritative deployed API against which to run the 37 runtime cases. The OpenAPI file and design documents are specifications, not proof of implementation.

## 3. Test levels

| Level | Purpose | Automation |
|---|---|---|
| Static contract | Parse and validate OpenAPI structure, examples, and selected API conventions. | Available now via `npm run validate:api`. |
| Unit | Validate input rules, permission predicates, state transitions, serializers, output schemas, and report calculations. | Recommended once application source exists. |
| Integration | Exercise API, authentication, database transactions, constraints, audit, idempotency, and AI-provider boundary using disposable dependencies. | Recommended; provider should be mocked by default. |
| End-to-end | Verify browser workflows, role-specific views, confirmation flows, errors, and recovery against a test deployment. | Automated smoke/regression plus manual usability review. |
| Acceptance | Validate stakeholder-approved requirements and proposed targets. | Product/stakeholder participation required. |

## 4. Test types

Functional, negative, boundary-value, API contract, authorization, security, privacy, database-integrity, concurrency, idempotency/retry, reliability/fault-injection, usability/accessibility, performance, and AI quality/safety checks are included. AI response-quality checks (grounding, schema conformance, clarification/refusal) must be reported separately from security checks (authorization, prompt injection, disclosure, unauthorized actions). No accuracy, hallucination, safety, or performance rate is claimed without measured evidence.

## 5. Test environment

### Present environment

- Repository contract artifacts: `api/openapi.yaml`, `docs/Backend_Design.md`, and `docs/AI_Integration_and_Security.md`.
- Node-based static validator: `npm run validate:api`, with dependencies from `package-lock.json`.
- No executable application environment or test database is present in this checkout.

### Required before runtime execution

- A versioned application build/commit and configured API/UI deployment.
- Disposable database initialized from the migration under test; deterministic fixtures and cleanup.
- Test identities for each documented role, including distinct employees and controlled active/inactive accounts.
- Controllable clock for session expiry, idempotency retention, proposal expiry, and audit timestamps.
- Mock AI provider that can emit deterministic success, malformed, unsafe, timeout, and provider-error responses.
- Fault injection and synchronized clients for transaction, retry, and appointment-overlap cases.
- Documented target browser, operating system, time zone database, and deployment configuration.

Do not point tests that create, mutate, or delete data at production. Use synthetic names, addresses, tokens, and credentials. Never place a real secret or personal record in the test fixtures.

## 6. Tools and dependencies

- Node.js and npm using the committed lockfile for OpenAPI validation.
- A standard CSV reader/parser for inventory validation.
- When implemented: the project's selected test runner, API client, browser automation/accessibility tooling, PostgreSQL test instance, and load-test tool. These choices are not represented as installed or approved until the project selects them.
- Sanitized logs, database snapshots, and test reports stored with restricted access.

## 7. Test data strategy

Create isolated, deterministic synthetic fixtures with unique identifiers per run. Include one admin, manager, and at least two employees; active/inactive accounts and clients; employee-owned and cross-employee deals, tasks, and appointments; and known report records around UTC interval boundaries. Use exact decimal boundary values, invalid enum/length/null values, stale ETags, repeated idempotency keys, and hostile-but-inert text literals. Do not use actual customer data.

Create separate database state for concurrency and constraint tests. Reset or destroy only the disposable test database. Preserve request IDs, generated fixture IDs, and sanitized results as evidence; redact bearer tokens, passwords, provider keys, and personal data.

## 8. Requirement traceability

Each CSV row maps to one PD-14 ID and has a unique stable `TC-PD15-*` identifier. The inventory covers all 23 functional and 14 non-functional IDs from the PD-14 baseline. `TC-PD15-MAINT-001` is the one static check and maps to `NFR-MAINT-001`.

| Requirement ID | Test case ID | Verification method |
|---|---|---|
| FR-AUTH-001 | TC-PD15-AUTH-001 | API integration; positive and negative credentials |
| FR-AUTH-002 | TC-PD15-AUTH-002 | API integration; session lifecycle and expiry |
| FR-AUTH-003 | TC-PD15-AUTH-003 | API integration; password change and revocation |
| FR-AUTH-004 | TC-PD15-AUTH-004 | Isolated bootstrap/operations test |
| FR-RBAC-001 | TC-PD15-RBAC-001 | Direct API role/operation/field matrix |
| FR-RBAC-002 | TC-PD15-RBAC-002 | API cross-user access and pagination |
| FR-RBAC-003 | TC-PD15-RBAC-003 | API authorization and persistence check |
| FR-RBAC-004 | TC-PD15-RBAC-004 | API error/disclosure comparison |
| FR-RBAC-005 | TC-PD15-RBAC-005 | API account administration and directory checks |
| FR-CLIENT-001 | TC-PD15-CLIENT-001 | API boundary, search, and pagination tests |
| FR-CLIENT-002 | TC-PD15-CLIENT-002 | API conditional update/archive integration |
| FR-DEAL-001 | TC-PD15-DEAL-001 | API validation and database round-trip |
| FR-DEAL-002 | TC-PD15-DEAL-002 | API state-transition and ETag tests |
| FR-TASK-001 | TC-PD15-TASK-001 | API create, reference, and ownership checks |
| FR-TASK-002 | TC-PD15-TASK-002 | API state-transition and ETag tests |
| FR-APPT-001 | TC-PD15-APPT-001 | API time-zone, interval, and filter boundaries |
| FR-APPT-002 | TC-PD15-APPT-002 | Concurrent integration test on disposable PostgreSQL |
| FR-APPT-003 | TC-PD15-APPT-003 | API reschedule/cancel state and concurrency checks |
| FR-REPORT-001 | TC-PD15-REPORT-001 | API authorization and independently computed metrics |
| FR-AI-001 | TC-PD15-AI-001 | Mock-provider intent, retrieval, and authorization test |
| FR-AI-002 | TC-PD15-AI-002 | Mock-provider schema, grounding, and validation test |
| FR-AI-003 | TC-PD15-AI-003 | Proposal/confirmation integration and replay test |
| FR-AI-004 | TC-PD15-AI-004 | Provider/database/audit fault-injection test |
| NFR-SEC-001 | TC-PD15-SEC-001 | Storage, transport, response, and log inspection |
| NFR-SEC-002 | TC-PD15-SEC-002 | API malformed-input and error-response tests |
| NFR-SEC-003 | TC-PD15-SEC-003 | Browser rendering and CORS checks |
| NFR-SEC-004 | TC-PD15-SEC-004 | Rate-limit boundary test after policy approval |
| NFR-REL-001 | TC-PD15-REL-001 | Sequential/concurrent idempotency and precondition tests |
| NFR-REL-002 | TC-PD15-REL-002 | Database/audit/provider fault injection |
| NFR-PERF-001 | TC-PD15-PERF-001 | Approved non-AI load benchmark |
| NFR-USAB-001 | TC-PD15-USAB-001 | Browser end-to-end state/error recovery review |
| NFR-USAB-002 | TC-PD15-USAB-002 | Browser timezone/DST boundary checks |
| NFR-USAB-003 | TC-PD15-USAB-003 | Automated and manual accessibility assessment |
| NFR-MAINT-001 | TC-PD15-MAINT-001 | Static OpenAPI validator |
| NFR-DATA-001 | TC-PD15-DATA-001 | Disposable database constraints/transaction tests |
| NFR-PRIV-001 | TC-PD15-PRIV-001 | Mock-provider outbound payload/privacy inspection |
| NFR-AUD-001 | TC-PD15-AUD-001 | Transaction/audit integration and redaction inspection |

PD-14 has not been merged to `main`; its requirement file and IDs are taken from the branch/commit in the metadata above. This PD-15 branch does not merge or duplicate the PD-14 deliverable. Merge the requirements baseline before using these files as a single-branch release baseline, or retain the stated commit reference.

Test cases are specification-level where implementation is absent. Any requirement whose intended behavior remains subject to stakeholder approval (including proposed performance/accessibility/rate-limit targets) must remain visibly unapproved and must not be reported as passed.

## 9. Entry criteria

### Static contract validation

- Clean checkout of the commit to be assessed.
- Locked Node dependencies installed.
- Validator and OpenAPI artifacts available.

### Runtime, security, and acceptance tests

- The feature is implemented and deployed to a non-production environment.
- Requirement/API behavior and role matrix are approved and versioned.
- Test build, migrations, fixtures, test identities, and logs are available.
- Any proposed threshold or policy used as an expected result has stakeholder approval.
- Destructive and fault-injection scenarios are restricted to disposable resources.

If an entry criterion is missing, do not report the test as passed. Record `Not Run` until execution is attempted; use `Blocked` when an execution was attempted but a specific unavailable prerequisite prevented it, and explain the blocker in the execution report.

## 10. Exit criteria

These are release-gate criteria to be agreed and applied when an implementation exists; they are **not claimed as satisfied**:

1. All approved mandatory-MVP cases have execution evidence; no untriaged P0/P1 failure remains.
2. All P0 authorization, data-integrity, credential-handling, AI confirmation, and privacy cases pass on the release candidate.
3. Every `Failed` or `Blocked` case has an owner, linked defect or documented dependency, and disposition.
4. Requirement-to-test traceability has no unexplained mandatory requirement without verification.
5. Critical regression cases pass after final code changes.
6. Accepted performance/accessibility criteria have measured results and the target workload/scope is recorded.
7. The static OpenAPI check passes for the release candidate.

## 11. Priority and severity

**Test priority** indicates execution order: `P0` is a release-blocking security/core-data or fundamental workflow check; `P1` is important quality or operational behavior; `P2` is lower-risk coverage. Priority is not defect severity.

**Defect severity** measures user/business impact: `S1 Critical` — broad compromise, unrecoverable data loss, or core service unavailable; `S2 High` — major protected-data, workflow, or integrity failure with no acceptable workaround; `S3 Medium` — limited feature failure or a usable workaround; `S4 Low` — minor, cosmetic, or low-impact issue. See [`Defect_Report_Template.md`](./Defect_Report_Template.md) for fields and priority definitions.

## 12. Defect lifecycle

Record the exact environment, build/commit, requirement and test-case IDs, sanitized evidence, and reproducible steps. Triage assigns severity, priority, owner, and status. Suggested states are `New`, `Triaged`, `In Progress`, `Ready for Retest`, `Verified`, `Reopened`, and `Closed`. A fix is verified by rerunning the reproducer and relevant regression set on a named build. Retain failures and blocked tests in reports; do not silently remove them.

## 13. Regression strategy

Run static contract validation on every API-contract change. After runtime implementation, run focused unit/integration cases on each changed feature, then the full P0 suite and affected cross-module regression. Run the full acceptance/security/data-integrity set on release candidates. Changes to authorization, identity, shared schemas, or migrations require cross-role and cross-resource regression. Changes to AI prompts, schemas, retrieval, providers, or confirmation logic require all AI validation and safety cases.

## 14. Security and authorization strategy

Call protected APIs directly, independently of UI visibility. Test unauthenticated, invalid, expired, revoked, underprivileged, cross-employee, and stale-session access. Check response and error bodies for protected data, existence leaks, secrets, stack traces, and unsafe request reflection. Verify server-side authorization before reads and writes, field-level restrictions, session revocation, rate limiting only against approved limits, and audit redaction. Use only synthetic canary values. Security tests are not penetration tests against public or production systems.

## 15. API testing strategy

Use the OpenAPI contract to construct valid/invalid requests and verify status, content type, schema, error shape, headers, pagination, and preconditions. Exercise documented idempotency and ETag semantics with sequential and concurrent requests. Verify rejected writes leave no state change. The OpenAPI validator currently checks contract artifacts only; it does not make HTTP requests to an application.

## 16. Database integrity strategy

Run migration and constraints tests on disposable PostgreSQL. Verify foreign keys, uniqueness, decimal precision, immutable relationships, transaction rollback, and booking exclusion at the persistence boundary, including concurrent calls. Check that database conflicts map to documented API errors without partial business or audit records. Never execute these tests against production.

## 17. AI evaluation and safety strategy

Use a mock provider with repeatable fixtures before any controlled non-production provider evaluation. Validate strict response schemas, allowed intents, provenance, bounded retrieval, actor permissions, privacy minimization, provider failures, timeouts, and output rendering. Attempt prompt-injection strings only with synthetic data and verify that they cannot expand tools, permissions, retrieval, or write authority. Proposals must have no effect before explicit, actor-bound confirmation; test expiration, permission recheck, argument binding, and replay. Measure response quality separately with an approved evaluation set; do not claim accuracy or hallucination thresholds before measurement and stakeholder approval.

## 18. Automation opportunities

Automate CSV/ID/traceability validation, OpenAPI static checks, unit and schema tests, API role matrices, database constraints, idempotency/concurrency, deterministic AI schema/failure fixtures, and browser smoke/accessibility scans. Keep manual review for requirement approval, ambiguous usability decisions, assistive-technology workflows, provider/privacy assessments, and adjudication of groundedness or content quality. A tool's output is evidence only for the checks it actually performs.

## 19. Execution reporting

Use only `Not Run`, `Passed`, `Failed`, `Blocked`, and `Not Applicable`. `Passed` requires a test execution and supporting result; `Not Run` means no execution; `Blocked` means attempted execution could not proceed due to an identified prerequisite; `Not Applicable` requires a documented scope rationale. Report build/commit, date, environment, case ID, status, defect ID if any, and sanitized evidence location.

### Current execution record

| Case | Result | Evidence / boundary |
|---|---|---|
| `TC-PD15-MAINT-001` | Passed | `npm run validate:api` executed on the PD-15 base contract. It is static API-contract validation only, not application runtime evidence. |
| Remaining 36 cases | Not Run | No backend, frontend, runtime API, database migrations, AI integration, or application test environment exists in this checkout. |

The command output recorded for this validation was: `PASS: OpenAPI 3.0.3 schema/reference validation; 17 paths, 27 operations; 225 example occurrences (including reused error examples) validated; 6 invalid fixtures rejected; authentication, retry, precondition, error, pagination, and response-shape checks.` This suite contains no claim that runtime cases, security controls, or application acceptance criteria passed.

## 20. Known limitations and open dependencies

- PD-14 requirements are in a separate unmerged branch; the baseline is pinned above.
- OpenAPI and design documents describe intended behavior but do not establish deployed behavior.
- No runtime security, privacy, performance, accessibility, database, or AI measurements exist in the current repository.
- AI provider/model, proposal endpoint, data-retention controls, and execution environment are unselected or unimplemented.
- Proposed performance and accessibility targets require stakeholder approval before pass/fail use.
- Appointment overlap, retry, transaction, and audit tests need a disposable PostgreSQL implementation.
- No execution status other than the static validator case should be changed without recorded evidence.
