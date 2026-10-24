# Flowentra CRM AI — Requirements Specification

**Task:** PD-14 — Requirements Specification

**Responsible student:** Daniil Khvan

**Specification version:** 1.0

**Review date:** 24 October 2026

**Baseline reviewed:** `origin/main` at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`
**Status:** Proposed requirements for stakeholder review. This document does not claim that the application is implemented or that the requirements have been approved.

## 1. Purpose and scope

This specification converts Flowentra’s current project proposal, architecture, backend design, OpenAPI contract, and AI-security design into testable requirements. It establishes stable IDs for the later QA/test-design task and distinguishes documented design from verified runtime behavior.

The target is the proposed single-organization CRM MVP for small, non-medical service businesses. The MVP includes internal staff accounts, fixed roles, shared client records, assigned deals and tasks, employee appointments, bounded reports, and an optional AI assistant for authorized lookup and human-confirmed task/appointment proposals. Manual CRM workflows remain available if the AI provider is unavailable.

This specification does not add an implementation, amend the OpenAPI contract, or make decisions for the frontend or another student’s work. Where the supplied documents disagree, omit a detail, or require stakeholder agreement, the discrepancy is recorded below rather than silently decided.

## 2. System overview and evidence boundary

The documented design proposes a React browser client, Go modular monolith, PostgreSQL database, REST/JSON API under `/api/v1`, and a provider-neutral external AI adapter. The OpenAPI 3.0.3 document describes 17 paths and 27 operations. The design also describes fixed admin/manager/employee roles, record ownership, session revocation, transaction and retry behavior, and a bounded AI proposal lifecycle.

**Repository inspection on the review date found no Go application source, React application source, database migration/schema files, deployed database, or application/runtime test files.** The repository contains design documents, diagrams, `api/openapi.yaml`, and a Node-based static OpenAPI contract validator. That validator verifies contract structure and selected conventions; it does not run an API, database, browser, or model.

Therefore:

- “Specified” means present in the OpenAPI or design documentation. It does not mean implemented.
- “Not specified” means this baseline does not define enough behavior to write a conforming requirement without a stakeholder decision.
- No frontend flow, form validation, loading/empty state, visual accessibility, or error rendering has been verified against a running UI.
- The AI feature is described in design documentation but has no public AI operation in the current OpenAPI contract and no implementation.
- PD-13’s literature review was inspected on `pd-13-literature-review`. It is an unmerged task branch and is not part of the `main` baseline used here. Its evidence-informed conclusions support distinguishing design recommendations from product evidence; it does not establish Flowentra implementation or performance.

## 3. Stakeholders, assumptions, and constraints

### 3.1 Stakeholders

| Stakeholder | Interest represented in this specification | Confirmation needed |
|---|---|---|
| Administrator | Internal accounts, fixed roles, organization records, operational bootstrap | Confirm first-admin procedure and initial-password handoff |
| Manager | Organization-wide CRM work, appointments, and bounded reports | Confirm report meanings and operational boundaries |
| Employee | Shared client directory and own assigned deal/task/appointment work | Confirm shared-client visibility and ownership policy |
| Client | A CRM contact record only; no sign-in or self-service in the MVP | Confirm if future client access is desired |
| Project team / implementers | Contract, components, implementation and test obligations | Confirm technical choices and unresolved contract details |
| QA / reviewer | Objective evidence, traceability, negative tests, and honest status | Approve test fixtures and environment before execution |

### 3.2 Assumptions and constraints

1. The baseline MVP is one organization per deployment; clients are not user accounts.
2. The three roles are fixed: `admin`, `manager`, and `employee`.
3. Employees have access to the shared client directory but only their own deals, tasks, and appointments. Managers and admins may access organization-wide business records. Admin-only account and role operations remain distinct from business-record access.
4. The API contract is design-only. The production URL, deployment infrastructure, supported runtime versions, and operational service levels are not established.
5. AI provider, model, processing terms, retention policy, final AI HTTP contract, and frontend confirmation workflow have not been selected or implemented.
6. The specifications below preserve the current project proposal and OpenAPI behavior. A requirement that depends on unresolved stakeholder approval is marked as proposed or requiring confirmation.

## 4. Definitions and conventions

| Term | Meaning |
|---|---|
| **MVP baseline** | The scope proposed in the project documents; it is not evidence of implementation or formal stakeholder sign-off. |
| **P0 — MVP mandatory (proposed)** | Necessary to meet the documented MVP scope. “P0” does not imply signed approval. |
| **P1 — pre-pilot target (proposed)** | A measurable quality target or design choice that needs stakeholder approval before it is treated as binding. |
| **P2 — future** | Explicitly outside the current MVP unless scope is formally changed. |
| **Specified, not implemented** | A behavior appears in a design document or API schema, but no runtime implementation was found. |
| **Partially specified** | Some behavior is documented, but a decision, contract, or testable detail remains open. |
| **Not specified** | No authoritative behavior was found in the inspected baseline. |
| **Strong ETag / `If-Match`** | Resource-version precondition described by the API design for conditional PATCH. |
| **Idempotency key** | A client-supplied UUID used by the design to safely retry selected POST requests. |
| **Current-state report** | A bounded aggregate over records’ present state; not an immutable historical accounting statement. |
| **AI proposal** | A server-created, validated, actor-bound candidate action that cannot change CRM data until explicitly confirmed and reauthorized. |
| **Acceptance criterion (AC)** | An observable outcome for a requirement. The `AC-*` identifier is used in the traceability matrix. |
| **Verification / test case** | Verification methods and `TC-PD15-*` IDs below are planned. Unless independently recorded later, no runtime test case has been executed. |

### Implementation-status vocabulary

- **Contract specified — not implemented:** request, response, or behavior is present in OpenAPI/design only.
- **Design specified — API gap — not implemented:** a design describes the behavior, but the public API contract does not define it.
- **Partially specified — decision required:** a material operation or implementation detail remains open.
- **Not specified — confirmation required:** the current baseline cannot support a testable product requirement without a decision.
- **Proposed quality target — not implemented:** a numeric or conformance target is proposed, not approved or measured.

## 5. Functional requirements

All priorities in this section are **P0 — MVP mandatory (proposed)**. Scope labels distinguish the proposed MVP from decisions that remain subject to confirmation.

### 5.1 Authentication

#### FR-AUTH-001 — Authenticate an active internal account

- **Description:** The API shall accept an internal user’s email and password and, only for valid credentials and an active account, create a bearer session. Invalid credentials and unavailable accounts shall not reveal whether a particular email exists. Login attempts are subject to the proposed limits recorded in NFR-SEC-004.
- **Status:** Contract specified — not implemented.
- **Dependencies:** None.
- **Component/API:** Identity and session services; `POST /auth/login`.
- **Acceptance criterion AC-AUTH-001:** Given valid credentials for an active account, when the client submits the login request, then the response is `200`, contains a bearer token, `expires_in` of 3600 seconds, and the current user. Given invalid credentials or an inactive/nonexistent account, when login is attempted, then the response is `401` with the generic authentication error and does not disclose account existence.
- **Verification:** API integration tests for valid, invalid, and inactive accounts; compare error body shape and status.
- **Test case:** `TC-PD15-AUTH-001` (reserved).

#### FR-AUTH-002 — Validate and revoke sessions

- **Description:** Every protected operation shall resolve the currently valid session and current user state. Logout shall revoke the presented session; expired, revoked, deactivated, or otherwise invalid sessions shall not authorize requests.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-AUTH-001.
- **Component/API:** Authentication middleware and identity service; `POST /auth/logout`, `GET /auth/me`, protected `/api/v1` operations.
- **Acceptance criterion AC-AUTH-002:** Given a valid session, when the user logs out, then logout returns `204` and the same token subsequently receives `401`. Given a revoked or expired session, when any protected operation is attempted, then it receives `401` and no protected resource data is returned. The current-user endpoint returns the authenticated user only.
- **Verification:** API integration tests for logout/replay, expiry, deactivation, and protected-route denial.
- **Test case:** `TC-PD15-AUTH-002` (reserved).

#### FR-AUTH-003 — Change the authenticated user’s password

- **Description:** An authenticated user shall be able to replace their own password after supplying the current password. A new password shall be 12–128 characters and differ from the current password. Password change shall revoke that user’s sessions atomically; authentication shall be required again.
- **Status:** Contract specified — not implemented.
- **Dependencies:** FR-AUTH-001, FR-AUTH-002.
- **Component/API:** Identity service; `PUT /auth/password`.
- **Acceptance criterion AC-AUTH-003:** Given a valid current password and a valid different new password, when the user changes it, then the operation returns `204`, the previous sessions no longer authorize requests, the old password cannot log in, and the new password can. A wrong current password or invalid new password causes no password change.
- **Verification:** API integration tests including concurrent requests and session revocation; inspect that no password is returned in the response.
- **Test case:** `TC-PD15-AUTH-003` (reserved).

#### FR-AUTH-004 — Provision the first administrator without public signup

- **Description:** A fresh deployment shall receive its first administrator only through the proposed one-time operator-run bootstrap process. No public registration or built-in credential shall be available. Bootstrap shall refuse to create another first administrator after an administrator exists.
- **Status:** Partially specified — bootstrap command/contract absent; not implemented.
- **Dependencies:** None.
- **Component/API:** Proposed operator CLI/bootstrap and identity persistence; no public endpoint is specified.
- **Acceptance criterion AC-AUTH-004:** Given a fresh database and a supplied secret, when an authorized operator runs the bootstrap procedure, then exactly one admin is created with a password hash and no plaintext secret is logged or persisted. Given that an admin already exists, when bootstrap is run again, then it fails without changing accounts.
- **Verification:** CLI/database integration tests and log inspection; exact invocation and operator authorization must be agreed before implementation.
- **Test case:** `TC-PD15-AUTH-004` (reserved).

### 5.2 Role-based access control and identity administration

#### FR-RBAC-001 — Enforce the fixed role permission matrix

- **Description:** The server shall enforce the `admin`, `manager`, and `employee` roles on each operation. Role values submitted by a caller or AI output shall not grant authority. Account/role administration is admin-only; reporting is manager/admin-only; all authenticated roles can use the shared client directory.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-AUTH-001.
- **Component/API:** Authentication/policy and identity services; `GET /roles`, `/users*`, `/clients*`, `/reports/summary`.
- **Acceptance criterion AC-RBAC-001:** Given one authenticated account for each role, when each calls every operation in the permission matrix, then the request is allowed only for the role/field combinations specified in `docs/Backend_Design.md`. Employees cannot administer users or access reports; managers cannot administer roles/accounts; no caller can change authority by submitting a role claim.
- **Verification:** Positive and negative API tests generated from the role-operation-field matrix.
- **Test case:** `TC-PD15-RBAC-001` (reserved).

#### FR-RBAC-002 — Scope deals, tasks, and appointments by ownership

- **Description:** Managers and admins may read and manage organization-wide deals, tasks, and appointments. Employees may read/update only their assigned records and may create these records only for themselves. A shared client record does not grant access to related records owned by another employee.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-RBAC-001.
- **Component/API:** Policy service and scoped CRM/scheduling queries; `/deals`, `/tasks`, `/appointments` collection and item operations.
- **Acceptance criterion AC-RBAC-002:** Given employee A and a deal, task, or appointment assigned to employee B, when employee A lists, reads, patches, or attempts to reassign that record, then the operation is denied without disclosing the record. A manager/admin can access it. Employee collection counts and pages contain only employee A’s authorized records.
- **Verification:** API tests with two employees and manager/admin; assert list contents, pagination, response status, and absence of protected fields.
- **Test case:** `TC-PD15-RBAC-002` (reserved).

#### FR-RBAC-003 — Enforce field-level and account-lifecycle restrictions

- **Description:** The server shall enforce field restrictions regardless of client UI. Employees cannot submit the client `archived` field or a reassignment field on PATCH. Only admins may administer users. Deactivating a user or changing their role shall revoke affected sessions; the last active admin cannot be deactivated or demoted.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-RBAC-001, FR-AUTH-002.
- **Component/API:** Policy and identity/CRM services; `PATCH /users/{id}`, `PATCH /clients/{id}`, and scoped deal/task/appointment PATCH operations.
- **Acceptance criterion AC-RBAC-003:** Given an employee, when a PATCH includes a forbidden field even if its value would leave the resource unchanged, then the server returns `403` and persists no change. Given an attempted demotion/deactivation of the last active admin, then the server returns the documented conflict and preserves an active admin. A role change/deactivation revokes the affected account’s existing sessions.
- **Verification:** API/database tests for forbidden-field payloads, last-admin concurrency, and session invalidation.
- **Test case:** `TC-PD15-RBAC-003` (reserved).

#### FR-RBAC-004 — Avoid disclosing protected object existence

- **Description:** Missing and inaccessible records/references shall be indistinguishable to callers; route or field permission violations shall use the documented forbidden response.
- **Status:** Contract specified — not implemented.
- **Dependencies:** FR-RBAC-001, FR-RBAC-002.
- **Component/API:** Policy/transport error mapping; single-resource endpoints under `/users`, `/clients`, `/deals`, `/tasks`, and `/appointments`.
- **Acceptance criterion AC-RBAC-004:** Given an employee, when they request another employee’s restricted record and then a nonexistent record, then both return `404` with the same safe error shape and neither response reveals the record’s contents. A forbidden operation at the route/field level returns `403`.
- **Verification:** API response comparison and authorization regression tests.
- **Test case:** `TC-PD15-RBAC-004` (reserved).

#### FR-RBAC-005 — Administer internal accounts and assignment targets

- **Description:** Admins shall list, create, read, update, and deactivate internal accounts. Authenticated roles may read an active assignment directory limited to user ID and display name. Public signup and custom roles are not part of the MVP.
- **Status:** Contract specified — not implemented; secure initial-credential handoff remains unresolved.
- **Dependencies:** FR-AUTH-004, FR-RBAC-001.
- **Component/API:** Identity service; `GET /users`, `POST /users`, `GET/PATCH /users/{id}`, `GET /users/directory`.
- **Acceptance criterion AC-RBAC-005:** Given a non-admin, when they call an account administration endpoint, then the server returns `403`. Given any authenticated role, when they read the assignment directory, then only active users’ identifiers and display names are returned; email, role, and inactive account details are absent. User creation accepts only the fixed role set and rejects duplicate email.
- **Verification:** API schema, authorization, and response-field tests; verify the initial-password handoff with stakeholders before release.
- **Test case:** `TC-PD15-RBAC-005` (reserved).

### 5.3 Client management

#### FR-CLIENT-001 — Create, list, search, and read client records

- **Description:** Authenticated roles shall create and access shared client contact records. Client creation requires a nonblank display name of at most 200 characters and permits nullable email (maximum 254 characters) and nullable phone in `+` followed by 8–15 digits, first digit nonzero. Lists shall use bounded cursor pagination; client search is a literal case-insensitive display-name substring.
- **Status:** Contract specified — not implemented.
- **Dependencies:** FR-AUTH-001, FR-RBAC-001.
- **Component/API:** CRM client service; `GET/POST /clients`, `GET /clients/{id}`.
- **Acceptance criterion AC-CLIENT-001:** Given an authenticated role, when a valid client is created, then the response is `201` with the created resource, `Location`, and `ETag`. Listing/search returns only matching authorized client records and follows the documented limit/cursor behavior. Blank or overlength names, email longer than 254 characters or invalid in format, phone not matching the specified pattern, unknown fields, and invalid cursor values are rejected without persistence.
- **Verification:** API integration tests for all roles, schema/business validation, literal wildcard searches, pagination, and response headers.
- **Test case:** `TC-PD15-CLIENT-001` (reserved).

#### FR-CLIENT-002 — Update, archive, and restore clients without deleting history

- **Description:** Authorized roles may update client contact fields. Only admins/managers may submit the archive field. Archiving shall preserve historical records and prevent creation of new related business records; restore is represented by setting `archived` false where allowed.
- **Status:** Contract/design specified — not implemented. Team confirmation of shared-client access is still required.
- **Dependencies:** FR-CLIENT-001, FR-RBAC-003.
- **Component/API:** CRM client service; `PATCH /clients/{id}`.
- **Acceptance criterion AC-CLIENT-002:** Given a current ETag, when an authorized user updates contact fields, then the new values persist and the version increments. A stale/missing precondition is rejected as specified. An employee’s archive-field PATCH returns `403`. Archiving preserves existing linked records and a later attempt to create a new deal/task/appointment linked to that archived client is rejected.
- **Verification:** API/database tests for permitted fields, role denial, optimistic concurrency, history retention, and inactive-reference rejection.
- **Test case:** `TC-PD15-CLIENT-002` (reserved).

### 5.4 Deal management

#### FR-DEAL-001 — Create and retrieve scoped deals

- **Description:** Authorized users shall create client-linked deals assigned to an active employee. A deal shall have a nonblank title of at most 200 characters, a non-negative decimal amount with at most 12 integer digits and two fractional digits, and the single currency configured for the deployment. New deals start in stage `new`; client and currency are immutable after creation.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-CLIENT-001, FR-RBAC-002.
- **Component/API:** CRM deal service; `POST/GET /deals`, `GET /deals/{id}`.
- **Acceptance criterion AC-DEAL-001:** Given a valid active client, active owner, valid amount (at most 12 integer digits and two fractional digits), and matching deployment currency, when an authorized user creates a deal, then it is returned as `201` with stage `new` and the submitted exact amount. Invalid/inactive references, mismatched currency, negative/overprecision amount, blank or overlength title, or unauthorized ownership produce the documented error and no deal.
- **Verification:** API/database tests for decimal boundaries, currency, reference state, role scope, and persisted response.
- **Test case:** `TC-PD15-DEAL-001` (reserved).

#### FR-DEAL-002 — Update deal fields and stage timestamps

- **Description:** Authorized users shall update permitted deal fields and transition among `new`, `qualified`, `won`, and `lost`. Entering `won` or `lost` shall set `closed_at` to server time; reopening shall clear it. Updates shall use resource-version preconditions.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-DEAL-001, FR-RBAC-002.
- **Component/API:** CRM deal service; `PATCH /deals/{id}`.
- **Acceptance criterion AC-DEAL-002:** Given an authorized owner or manager/admin and a current `If-Match`, when the stage changes to `won` or `lost`, then `closed_at` is populated by the server. Changing back to an open stage clears `closed_at`; a patch without stage change preserves it. Client and currency changes are rejected. A stale version returns `412`; no rejected update changes the resource.
- **Verification:** API/database tests for every stage transition, timestamp behavior, immutable fields, role scope, and stale ETag.
- **Test case:** `TC-PD15-DEAL-002` (reserved).

### 5.5 Task management

#### FR-TASK-001 — Create, list, and read scoped tasks

- **Description:** Authorized users shall create tasks with a nonblank title of at most 200 characters and active owner, optionally linked to an active client and nullable due time. New tasks start with status `todo`; employees may create only tasks assigned to themselves.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-CLIENT-001, FR-RBAC-002.
- **Component/API:** CRM task service; `POST/GET /tasks`, `GET /tasks/{id}`.
- **Acceptance criterion AC-TASK-001:** Given valid inputs and an authorized owner, when a task is created, then the response is `201` and the stored status is `todo`. A blank/overlength title, employee attempting to create for another employee, or any caller linking an inactive/nonexistent reference receives the documented error and creates no task. Lists apply role/ownership scope before pagination.
- **Verification:** API/database tests for role scope, reference validation, optional fields, pagination, and create response.
- **Test case:** `TC-PD15-TASK-001` (reserved).

#### FR-TASK-002 — Update task status and completion time

- **Description:** Authorized users shall update permitted task fields and transition among `todo`, `in_progress`, `done`, and `cancelled`. Entering `done` sets server-generated `completed_at`; leaving `done` clears it. PATCH shall be protected against lost updates.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-TASK-001, FR-RBAC-002.
- **Component/API:** CRM task service; `PATCH /tasks/{id}`.
- **Acceptance criterion AC-TASK-002:** Given an authorized user and current `If-Match`, when a task transitions into `done`, then `completed_at` is set by the server; when it leaves `done`, the field is cleared. An unchanged stage preserves its timestamp. Missing or stale preconditions produce `428` or `412` respectively, without partial changes.
- **Verification:** API/database tests for all status transitions, nullable due time, stale version, and employee ownership.
- **Test case:** `TC-PD15-TASK-002` (reserved).

### 5.6 Appointment scheduling

#### FR-APPT-001 — Create and query appointments with explicit time semantics

- **Description:** Authorized users shall create an appointment for one active client and one active employee with offset-bearing RFC 3339 start/end instants and a valid IANA display timezone. The interval must be positive, no longer than 24 hours, and is interpreted as half-open `[start,end)`. Past appointments may be recorded.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-CLIENT-001, FR-RBAC-002.
- **Component/API:** Scheduling service; `POST/GET /appointments`, `GET /appointments/{id}`.
- **Acceptance criterion AC-APPT-001:** Given valid references and times (including a past time), when an appointment is created, then the stored instants represent the submitted offsets normalized to UTC and the display timezone is preserved. Missing offsets, unknown timezones, `start_at >= end_at`, duration above 24 hours, or invalid reference state are rejected. Filter `from` and `to` must be supplied together and define a positive interval no longer than 366 days.
- **Verification:** API/database tests around offsets, timezone validity, duration boundaries, interval filters, and scope.
- **Test case:** `TC-PD15-APPT-001` (reserved).

#### FR-APPT-002 — Prevent overlapping active appointments per employee

- **Description:** The persistence layer shall reject overlapping active appointments for the same employee on both create and reschedule. Adjacent half-open intervals and overlapping intervals for different employees shall be allowed. Cancellation shall release the occupied interval.
- **Status:** Design and illustrative DDL specified — migration/database behavior not implemented or verified.
- **Dependencies:** FR-APPT-001.
- **Component/API:** Scheduling service and proposed PostgreSQL exclusion constraint; `POST /appointments`, `PATCH /appointments/{id}`.
- **Acceptance criterion AC-APPT-002:** Given two concurrent requests for overlapping active intervals for one employee, when both attempt to commit, then exactly one succeeds and the other returns `409 appointment_overlap`, with no partial appointment/audit state. Adjacent intervals and same-time intervals for different employees both succeed. A committed cancellation permits a new booking in the released interval.
- **Verification:** Repeatable PostgreSQL integration test with synchronized concurrent create and reschedule transactions; inspect committed rows and audit records.
- **Test case:** `TC-PD15-APPT-002` (reserved).

#### FR-APPT-003 — Reschedule or cancel appointments without losing history

- **Description:** Authorized users shall reschedule appointments using the merged, validated interval and current employee assignment, or cancel by setting status to `cancelled`. Cancellation is terminal; existing appointments are retained, and cancellation remains possible when the client is archived or employee is inactive.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-APPT-001, FR-APPT-002, FR-RBAC-002.
- **Component/API:** Scheduling service; `PATCH /appointments/{id}`.
- **Acceptance criterion AC-APPT-003:** Given a current ETag, when a valid reschedule is submitted, then the complete new interval and employee pass the same validation and overlap rule as creation. When cancellation is submitted, then status becomes `cancelled` and a later PATCH is rejected with `409`; an overlap failure leaves the prior booking and version intact. A stale/missing ETag causes no change.
- **Verification:** API/database tests for reschedule collision, cancellation, terminal state, inactive-reference cancellation, and optimistic concurrency.
- **Test case:** `TC-PD15-APPT-003` (reserved).

### 5.7 Reporting

#### FR-REPORT-001 — Provide bounded manager/admin current-state summaries

- **Description:** Admins and managers shall retrieve a summary for a required explicit `from`/`to` interval with `from < to` and a maximum interval of 366 days. Employees shall not access reports. Metrics shall use one consistent database snapshot and be identified as current-state aggregates rather than historical accounting: clients created (including currently archived); deals created regardless of current stage; currently done tasks whose current `completed_at` is in range; currently scheduled appointments whose `start_at` is in range; and currently won deals whose current `closed_at` is in range, with count and exact current amounts. Time boundaries are UTC `[from,to)`.
- **Status:** Contract/design specified — not implemented; report presentation/labels are not designed in a frontend.
- **Dependencies:** FR-RBAC-001.
- **Component/API:** Reporting service; `GET /reports/summary`.
- **Acceptance criterion AC-REPORT-001:** Given a deterministic dataset and an admin or manager with a valid interval, when the summary is requested, then `clients_created`, `deals_created`, `tasks_completed`, `appointments_scheduled`, `won_deal_count`, and `won_deal_value` equal independently calculated values under the definitions above, and the response includes the requested interval, deployment currency, and generation time. An employee receives `403`; an invalid, reversed, missing, or over-366-day interval is rejected. Reopening or cancelling records may change historical-period aggregates as described in the current-state limitation.
- **Verification:** API/database tests against a deterministic synthetic dataset, permission tests, and boundary dates; independently recompute expected metrics.
- **Test case:** `TC-PD15-REPORT-001` (reserved).

### 5.8 AI assistant

#### FR-AI-001 — Limit AI requests to authorized allowlisted intents

- **Description:** The assistant shall support only the documented bounded intents: client lookup, scoped task listing, authorized client summary, manager/admin bounded report summary, task proposal, appointment proposal, clarification, and refusal. Retrieval shall be performed by application services after authorization; the model shall not receive database credentials or arbitrary SQL, shell, generic HTTP, URL-fetch, export, role-administration, or destructive-action tools.
- **Status:** Design specified — API gap — not implemented; provider/model unselected.
- **Dependencies:** FR-AUTH-002, FR-RBAC-001, FR-RBAC-002, FR-REPORT-001.
- **Component/API:** Proposed AI orchestrator/provider adapter and CRM/report services; no AI endpoint in current OpenAPI.
- **Acceptance criterion AC-AI-001:** Given a signed-in user, when an allowed intent is requested, then retrieval is limited to that user’s current permissions and the documented row/field bounds. When a forbidden intent or prompt asks for broader access, then no protected retrieval or mutation occurs and the request is refused. A model-supplied role/identity never changes the authenticated actor.
- **Verification:** AI integration tests using synthetic fixtures, authorization instrumentation, and inspection of provider tool/configuration allowlists.
- **Test case:** `TC-PD15-AI-001` (reserved; relates to planned AI-01–AI-06 and AI-15).

#### FR-AI-002 — Validate model output and ground read-only answers

- **Description:** Every model candidate shall be parsed against a versioned strict schema, reject unknown fields/unsupported intents/versions and invalid references, then pass deterministic semantic, authorization, and business validation. Read-only summaries shall use only authorized source handles; report totals shall come from the reporting service and not model arithmetic.
- **Status:** Design specified — API gap — not implemented.
- **Dependencies:** FR-AI-001.
- **Component/API:** Proposed AI orchestrator; intent and answer schemas described in `docs/AI_Integration_and_Security.md`.
- **Acceptance criterion AC-AI-002:** Given malformed, schema-invalid, semantically invalid, out-of-scope, or invented-reference output, when it reaches the orchestrator, then it is rejected or clarified and cannot cause a write or disclose a protected source. A displayed summary refers only to sources returned by authorized retrieval; displayed report totals equal the reporting service response.
- **Verification:** Deterministic parser/schema tests, semantic validation tests, source-reference tests, and synthetic adversarial prompt suite.
- **Test case:** `TC-PD15-AI-002` (reserved; relates to planned AI-02, AI-05, AI-10–AI-14).

#### FR-AI-003 — Require actor-bound confirmation for every AI write

- **Description:** Task and appointment creation through AI shall produce an immutable, expiring proposal bound to the authenticated actor/session, exact canonical arguments, and relevant resource versions. No mutation shall occur before explicit confirmation. Confirmation shall recheck current authorization and state and execute through the same business service, transaction, constraints, and audit path as manual creation.
- **Status:** Design specified — AI proposal/confirmation API gap — not implemented.
- **Dependencies:** FR-AI-001, FR-AI-002, FR-TASK-001, FR-APPT-001, FR-APPT-002.
- **Component/API:** Proposed AI proposal lifecycle and React confirmation UI; no corresponding OpenAPI routes currently exist.
- **Acceptance criterion AC-AI-003:** Given a valid task or appointment candidate, when the proposal is created but not confirmed, then no business record is written. Confirmation by another actor, after expiry, after a relevant version/permission change, or with altered arguments is rejected without mutation. A successful authorized confirmation creates exactly one record and one corresponding committed audit event; the UI presents the exact client, assignee, and task fields or appointment times/timezone from canonical server data.
- **Verification:** AI/API/database integration tests for no-click, altered, stale, expired, cross-user, concurrent, and successful confirmation cases; UI acceptance test once a frontend exists.
- **Test case:** `TC-PD15-AI-003` (reserved; relates to planned AI-07–AI-09 and AI-16–AI-19).

#### FR-AI-004 — Fail explicitly and preserve manual workflows

- **Description:** Provider timeout, rate limiting, invalid response, database failure, or audit failure shall not be represented as successful AI completion. Provider failure shall not disable manual CRM operations. Invalid or unavailable AI output may offer a manual form only with fields that have independently passed validation.
- **Status:** Design specified — API/UI behavior unimplemented.
- **Dependencies:** FR-AI-001, FR-AI-003.
- **Component/API:** AI adapter, CRM services, React assistant/manual forms; AI error contract is not in OpenAPI.
- **Acceptance criterion AC-AI-004:** Given a provider or persistence failure, when the assistant request fails, then no unauthorized or partial mutation is reported as successful, an explicit unavailable/error state is returned, and an ordinary authenticated manual CRM operation remains available. No automatic retry may create a second action.
- **Verification:** Fault-injection tests for provider, database, and audit failures; manual-flow regression and UI tests after implementation.
- **Test case:** `TC-PD15-AI-004` (reserved; relates to planned AI-11, AI-18, and AI-20).

## 6. Non-functional requirements

NFR IDs describe measurable or observable quality constraints. “P0” and “P1” are proposed priorities, not stakeholder approvals. Design-only security numbers and performance targets remain unapproved until the relevant owner confirms them.

### Security

#### NFR-SEC-001 — Protect credentials and bearer sessions

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Passwords shall be stored only as salted Argon2id hashes using parameters selected and measured on the target host. Bearer tokens shall be opaque, contain at least 256 bits of cryptographic entropy, be stored server-side only as a hash, and be excluded from URLs, local storage, prompts, and ordinary logs. The proposed browser holds the token in memory; HTTPS is required outside local development.
- **Status:** Design specified — not implemented; Argon2id cost and deployment/TLS details require operational confirmation.
- **Dependencies:** FR-AUTH-001, FR-AUTH-002.
- **Component/API:** Identity/session service, React client, deployment ingress.
- **Acceptance criterion AC-SEC-001:** Given a stored user/session record, when storage and application logs are inspected after login, then no plaintext password or bearer token is present; the stored password is an Argon2id hash with unique salt and the stored session token is only its hash. Production requests are accepted only over HTTPS.
- **Verification:** Security-focused storage/log tests, code/configuration review, and deployment TLS check.
- **Test case:** `TC-PD15-SEC-001` (reserved).

#### NFR-SEC-002 — Validate inputs and return safe errors

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** The API shall reject unknown request properties, malformed JSON, invalid fields and cross-field values; cap request bodies at 64 KiB; authenticate before revealing protected-resource details; and use the documented RFC 9457 `application/problem+json` error shape. Responses shall not include stack traces, SQL, passwords, full secrets, or another employee’s booking details.
- **Status:** Contract specified — not implemented.
- **Dependencies:** FR-AUTH-001, FR-RBAC-004.
- **Component/API:** HTTP transport and request validation; all `/api/v1` operations.
- **Acceptance criterion AC-SEC-002:** Given malformed JSON, unknown fields, invalid content type, an oversized body, or invalid business values, when a request is submitted, then it is rejected using the documented `400`, `413`, `415`, or `422` behavior and safe problem response. No mutation occurs. Error responses contain no secret, stack trace, SQL, or protected record detail.
- **Verification:** Contract tests, negative API tests, response-body secret scan, and body-limit tests.
- **Test case:** `TC-PD15-SEC-002` (reserved).

#### NFR-SEC-003 — Treat untrusted browser content as text

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** The browser shall render client-provided, task, deal, and model-generated text as text rather than executable markup. CORS shall allow only explicitly configured frontend origins. These rules do not replace server authorization or input validation.
- **Status:** Design specified — not implemented; exact deployment origins and content security policy require configuration.
- **Dependencies:** NFR-SEC-002, FR-AI-002.
- **Component/API:** React rendering, HTTP ingress/CORS, assistant UI.
- **Acceptance criterion AC-SEC-003:** Given text containing HTML/script-like markup in a CRM field or AI answer, when it is displayed, then it is visible only as inert text and no embedded script executes. A browser request from an unconfigured origin is not granted cross-origin access.
- **Verification:** Browser security tests with hostile synthetic strings and CORS configuration tests.
- **Test case:** `TC-PD15-SEC-003` (reserved).

#### NFR-SEC-004 — Apply documented request-rate limits

- **Priority/scope:** P1 — proposed security limits; threshold approval required.
- **Description:** The API design proposes login limits of five failed attempts per account+IP per 15 minutes and 30 attempts per IP per minute, plus 120 authenticated requests per actor per minute. The AI design separately proposes 20 AI requests per actor per minute. These are design values, not approved tuning or measured abuse controls.
- **Status:** Contract/design specified — not implemented; limits/window behavior require stakeholder and operational confirmation.
- **Dependencies:** FR-AUTH-001, FR-AUTH-002, FR-AI-001.
- **Component/API:** Authentication, API middleware, AI adapter; `POST /auth/login` and authenticated routes.
- **Acceptance criterion AC-SEC-004:** After approval of the limits and window algorithm, requests within the configured limits are processed; a request exceeding a limit returns `429` with `Retry-After`, is not processed as an authenticated business operation, and does not expose account existence. A test verifies each approved limit at its boundary and one request beyond it.
- **Verification:** Deterministic clock-controlled rate-limit integration tests for login, authenticated, and AI routes; configuration review.
- **Test case:** `TC-PD15-SEC-004` (reserved).

### Reliability

#### NFR-REL-001 — Make writes atomic and retries bounded

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** A business mutation, its required audit record, and successful idempotency result shall commit atomically. Creates shall use a scoped idempotency key for 24 hours as specified; PATCH shall use a strong ETag and exactly one matching `If-Match`. Transient transaction retries shall be bounded as specified in the backend design.
- **Status:** Contract/design specified — not implemented.
- **Dependencies:** FR-CLIENT-001, FR-DEAL-001, FR-TASK-001, FR-APPT-001, FR-APPT-002.
- **Component/API:** Service transaction boundary, persistence, audit, idempotency; POST business creates and PATCH resource endpoints.
- **Acceptance criterion AC-REL-001:** Given a database/audit failure during a write, when the transaction aborts, then no business mutation or successful replay result remains. Repeating a successful create with the same actor/key/body during the retention window returns the original authorized result without a duplicate; reusing the key with a different body conflicts. Missing/stale PATCH preconditions return `428`/`412` with no change.
- **Verification:** Database integration tests with failure injection, response-loss/replay tests, and concurrent same-key requests.
- **Test case:** `TC-PD15-REL-001` (reserved).

#### NFR-REL-002 — Fail closed on dependency errors

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Database or audit unavailability shall not produce success-shaped responses or partial business writes. An AI provider outage shall fail the assistant operation explicitly while preserving manual CRM availability.
- **Status:** Design specified — not implemented.
- **Dependencies:** NFR-REL-001, FR-AI-004.
- **Component/API:** Transport, transaction boundary, AI adapter, manual CRM services.
- **Acceptance criterion AC-REL-002:** Given a simulated database/audit outage, when a write is attempted, then the API reports a documented server/dependency error and the database contains no partial mutation. Given an AI provider outage, then AI reports unavailable and a manual CRM request can still complete.
- **Verification:** Fault-injection integration tests and manual workflow availability test.
- **Test case:** `TC-PD15-REL-002` (reserved).

### Performance

#### NFR-PERF-001 — Measure the proposed non-AI response-time target

- **Priority/scope:** P1 — pre-pilot target; approval required.
- **Description:** The project proposal suggests a non-AI API target of p95 below 500 ms with 20 concurrent users and 1,000 synthetic clients on a documented local test environment. This is a proposed acceptance target, not an approved service-level objective and not a measured result. AI latency shall be measured separately because it depends on an unselected external provider.
- **Status:** Proposed quality target — not implemented or measured.
- **Dependencies:** Functional API implementation; synthetic workload and test environment.
- **Component/API:** Backend API and database; excludes external AI provider calls.
- **Acceptance criterion AC-PERF-001:** After stakeholder approval of workload and environment, run the documented benchmark with 20 concurrent users and 1,000 synthetic clients; record p50/p95/p99, failures, machine/configuration, and workload. The proposed target passes only if non-AI request p95 is below 500 ms with no unreported failed requests. Until approval and measurement, status remains “not evaluated.”
- **Verification:** Reproducible load test with saved sanitized results; separately report AI latency and provider failures.
- **Test case:** `TC-PD15-PERF-001` (reserved).

### Usability and accessibility

#### NFR-USAB-001 — Make validation and operation outcomes observable

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** The browser client shall present field validation, permission denial, stale-resource conflicts, rate limits, provider outage, loading, empty-list, and successful mutation states in a way that does not imply a failed or pending operation succeeded. API error codes are stable; UI wording remains a frontend decision.
- **Status:** Partially specified — no frontend implementation or UX specification found.
- **Dependencies:** NFR-SEC-002, FR-AI-004, NFR-REL-001.
- **Component/API:** React forms and assistant UI; RFC 9457 API error contract.
- **Acceptance criterion AC-USAB-001:** For each listed state, when the corresponding API response is supplied to the UI, then the UI displays a distinguishable state, does not show a success result for an error or unknown commit outcome, and exposes a recovery action where one is defined (for example refetch after `412`, retry with the same idempotency key, or use the manual form after AI failure).
- **Verification:** UI acceptance tests using mocked documented error responses and manual review of loading/empty/error states after frontend delivery.
- **Test case:** `TC-PD15-USAB-001` (reserved).

#### NFR-USAB-002 — Resolve and present appointment time unambiguously

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Appointment entry and AI confirmation shall show the resolved local time, timezone, and corresponding instant to the user. Ambiguous or nonexistent local times shall be resolved explicitly rather than silently interpreted.
- **Status:** Design specified — frontend implementation/interaction details not found.
- **Dependencies:** FR-APPT-001, FR-AI-003.
- **Component/API:** React appointment form and AI confirmation UI; appointment request/response schemas.
- **Acceptance criterion AC-USAB-002:** Given an appointment entered in a timezone with an ambiguous or nonexistent local time, when the user proceeds, then the UI requires explicit resolution or rejects the value and displays the final offset/instant before submission or confirmation. A changed date/time requires a new proposal confirmation.
- **Verification:** UI tests for timezone boundary fixtures and manual review of displayed local/UTC values.
- **Test case:** `TC-PD15-USAB-002` (reserved).

#### NFR-USAB-003 — Confirm an accessibility conformance target

- **Priority/scope:** P1 — stakeholder decision required; proposed target.
- **Description:** The repository does not define an accessibility conformance level. The project should decide whether to require WCAG 2.2 Level AA for the browser UI before implementation acceptance.
- **Status:** Not specified — stakeholder confirmation required; no frontend implementation found.
- **Dependencies:** Frontend prototype and accessibility scope decision.
- **Component/API:** React browser UI; no API endpoint.
- **Acceptance criterion AC-USAB-003:** If WCAG 2.2 AA is approved, then an accessibility audit shall test all MVP workflows against the approved conformance scope, record each failure, and show no unresolved Level A/AA failure in the agreed acceptance pages. Until approval, no conformance claim may be made.
- **Verification:** Automated accessibility checks plus keyboard/screen-reader manual audit; tool and supported browser matrix to be agreed.
- **Test case:** `TC-PD15-USAB-003` (reserved).

### Maintainability

#### NFR-MAINT-001 — Keep implementation, API contract, and tests traceable

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Each implemented requirement shall map to a component/API operation and at least one repeatable verification case. Contract changes shall be reflected in the API specification and regression tests. The modular monolith shall keep authorization and business rules in trusted service boundaries rather than relying on browser checks.
- **Status:** Design intent — source implementation and runtime tests absent.
- **Dependencies:** All functional requirements selected for implementation.
- **Component/API:** Go modules, OpenAPI contract, React integration, automated test suite.
- **Acceptance criterion AC-MAINT-001:** Given any requirement marked implemented, when a reviewer follows its traceability row, then they can locate its implementation, API contract where applicable, and passing test evidence. A changed request/response contract with no corresponding specification/test update fails the documentation/CI gate.
- **Verification:** Change review, traceability audit, contract test, and CI test report.
- **Test case:** `TC-PD15-MAINT-001` (reserved).

### Data integrity

#### NFR-DATA-001 — Preserve relational and business invariants

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Persisted relationships and business invariants shall be enforced at the service/database boundary: active references on new records, immutable deal/task client linkage, exact decimal deal values, valid task/deal timestamps, and employee appointment non-overlap. Presentation-layer validation alone shall not be authoritative.
- **Status:** Design and illustrative DDL specified — migrations/schema/runtime absent.
- **Dependencies:** FR-CLIENT-002, FR-DEAL-001, FR-DEAL-002, FR-TASK-001, FR-TASK-002, FR-APPT-001, FR-APPT-002.
- **Component/API:** PostgreSQL persistence and business services; client/deal/task/appointment create and update operations.
- **Acceptance criterion AC-DATA-001:** Given invalid, inactive, duplicate-conflicting, or concurrently conflicting data sent directly to the API, when the mutation is attempted, then the service/database rejects it and leaves existing valid records unchanged. Successful values round-trip without monetary precision loss and preserve declared relationships.
- **Verification:** Database integration/property tests, concurrent booking tests, and direct API tests that bypass browser validation.
- **Test case:** `TC-PD15-DATA-001` (reserved).

### Privacy

#### NFR-PRIV-001 — Minimize and govern personal data exposure

- **Priority/scope:** P0 — MVP mandatory (proposed); provider-specific controls require confirmation before real data use.
- **Description:** AI requests shall receive only the minimum authorized fields/records needed for the intent. Passwords, session tokens, provider keys, raw prompts by default, authentication tables, audit logs, and unrelated personal data shall not be sent to the provider. The demonstration shall use synthetic records. Provider retention, region, training use, deletion, and legal basis must be reviewed before processing real personal data.
- **Status:** Design specified — provider, terms, retention implementation, and privacy approval absent.
- **Dependencies:** FR-AI-001, FR-AI-002.
- **Component/API:** AI retrieval/orchestration and provider adapter; no AI endpoint in OpenAPI.
- **Acceptance criterion AC-PRIV-001:** Given each supported AI intent, when outbound requests are inspected using synthetic fixtures, then only allowlisted fields and bounded authorized records are included; secrets and excluded data are absent. Real CRM data is not enabled until provider processing and retention decisions are documented and approved by the responsible stakeholder.
- **Verification:** Outbound payload tests, log/data-flow inspection, provider configuration review, and documented privacy gate.
- **Test case:** `TC-PD15-PRIV-001` (reserved).

### Auditability

#### NFR-AUD-001 — Record security events and committed mutations safely

- **Priority/scope:** P0 — MVP mandatory (proposed).
- **Description:** Successful mutations shall create an audit record containing minimal actor/action/object/time/outcome/request-correlation metadata in the same transaction as the mutation. Authentication/security denials shall use the proposed restricted event path. Ordinary diagnostic logs shall omit passwords, tokens, provider keys, raw prompts, and full client payloads.
- **Status:** Design specified — not implemented; retention and operator access policy require confirmation.
- **Dependencies:** FR-AUTH-002, FR-RBAC-003, NFR-REL-001, FR-AI-003.
- **Component/API:** Audit module, persistence transaction, restricted security-event sink, diagnostic logging.
- **Acceptance criterion AC-AUD-001:** Given a committed business mutation, when the database is queried, then exactly one associated audit record identifies the actor, action, object, timestamp, outcome, and request ID. If audit persistence fails, the business transaction does not commit. A denied operation produces no business mutation and is observable through the restricted security-event mechanism without recording secret payloads.
- **Verification:** Transaction integration tests, denial-event tests, log redaction tests, and audit-access review.
- **Test case:** `TC-PD15-AUD-001` (reserved).

## 7. MVP, future scope, and prioritization

### 7.1 Mandatory MVP scope (proposed; not implementation status)

| Capability | Requirement IDs | Rationale |
|---|---|---|
| Internal login, revocable sessions, password change, first-admin bootstrap | FR-AUTH-001–004 | Staff identity and a safe initial installation are prerequisites to all protected workflows. Bootstrap mechanics and password handoff still need confirmation. |
| Fixed roles, ownership/field rules, admin account management | FR-RBAC-001–005 | The documented business model depends on distinct staff permissions and scoped employee records. |
| Shared client records | FR-CLIENT-001–002 | The shared client directory is core CRM scope; access policy must be confirmed. |
| Deals and tasks | FR-DEAL-001–002; FR-TASK-001–002 | These are the documented follow-up and work-management capabilities. |
| Employee appointment scheduling with concurrency integrity | FR-APPT-001–003; NFR-DATA-001 | The proposal explicitly includes booking, rescheduling, cancellation, and overlapping-booking acceptance conditions. |
| Bounded manager/admin reports | FR-REPORT-001 | Included in the proposal; results are current-state aggregates, not accounting records. |
| Bounded AI read and human-confirmed create proposals | FR-AI-001–004; NFR-PRIV-001 | Included in the proposed MVP, but the feature is design-only, has no API contract, and requires provider/privacy decisions. Manual workflows remain independently required. |
| Cross-cutting security, reliability, data integrity, privacy, audit, maintainability, and observable UI outcomes | NFR-SEC-001–002; NFR-REL-001–002; NFR-MAINT-001; NFR-DATA-001; NFR-PRIV-001; NFR-AUD-001; NFR-USAB-001–002 | Necessary to make the defined CRM operations testable and safe; none is claimed implemented. |

P0 denotes the priority implied by the current proposed MVP, not a verified supervisor or customer approval. Requirements cannot be marked “implemented” from contract validation alone.

### 7.2 Proposed targets requiring stakeholder approval

- **Non-AI performance:** the project proposal suggests p95 below 500 ms with 20 concurrent users and 1,000 synthetic clients in a documented local test (NFR-PERF-001). The target is not measured or approved.
- **Accessibility:** WCAG 2.2 AA is proposed for confirmation (NFR-USAB-003); the repository does not currently set a conformance level.
- **AI limits and lifecycle:** AI request/token/concurrency limits, proposal expiry, audit retention, and provider data handling are design proposals requiring confirmation and implementation. They are not product behavior yet.

### 7.3 Explicitly future or excluded from the current MVP

- Telegram, WhatsApp, Instagram, external calendar synchronization, outbound messaging, and public/customer self-service.
- Multi-tenancy, payments, invoicing, inventory, recurring appointments/tasks, bulk import/export, advanced analytics, predictive revenue, custom pipelines/roles, native mobile applications, and self-hosted model infrastructure.
- Autonomous AI execution, role/account changes through AI, destructive actions, mass messaging, arbitrary SQL/database access, generic network tools, and model training on CRM records.

These items require separate scope, architecture, privacy/security, and acceptance decisions before inclusion. Exclusion is consistent with the current proposal; it does not imply the team has formally approved a future roadmap.

## 8. Dependencies and constraints

1. Authentication precedes protected operations; RBAC policy depends on a trustworthy authenticated actor.
2. Client creation precedes valid client-linked deals, tasks, and appointments. Active client/user checks precede new linked records.
3. Employee ownership policy is applied before list ordering, counting, or cursor pagination; a cursor does not grant access.
4. Appointment overlap integrity depends on a PostgreSQL migration and database constraint, not only on an availability query or UI check.
5. Optimistic updates require resource versions/ETags. All PATCH operations require the agreed `If-Match` behavior; create retries require idempotency keys and stored successful results.
6. AI write proposals depend on the same policy, validation, and transaction services as manual writes. They also require an AI proposal/status API and frontend design that are absent from the current contract.
7. The external provider, its processing terms, model version, service limits, and data retention are unknown. Real personal data must not be sent before review and approval.
8. Database isolation, deployment TLS, secret provision, backup/restore, retention, security-event storage, and recovery objectives need implementation-specific decisions.
9. No approved regulatory or institution-specific compliance standard was supplied. This document does not claim legal compliance or certification.

## 9. API and component alignment

### 9.1 Contract alignment

`api/openapi.yaml` is the current authoritative machine-readable API contract in this repository. It declares OpenAPI 3.0.3, 17 paths, 27 operations, fixed role annotations, request/response schemas, and standardized errors. Its presence is contract evidence only.

The contract provides operations for authentication/session/password, fixed roles and internal user administration, active assignment directory, clients, deals, tasks, appointments, and manager/admin summary reports. It specifies `application/problem+json` errors, a 64 KiB request-body limit, pagination, request IDs, `Cache-Control: no-store`, ETags, conditional PATCH, idempotent POST conventions, and detailed role annotations.

### 9.2 Implementation alignment and mismatches

| Surface | Evidence found | Alignment / gap |
|---|---|---|
| Backend runtime | No Go source or application entry point in the repository | All functional runtime behavior remains specified or planned, not implemented. No handler-level RBAC, input validation, transaction, or error behavior can be verified. |
| Frontend runtime | No React source; README says no current prototype is available and refers to future PD-10 work | Forms, auth token handling, client/deal/task/appointment workflows, error/loading/empty states, timezone behavior, accessibility, and AI confirmation UI cannot be compared to API behavior. |
| API contract | `api/openapi.yaml`; static validator in `scripts/validate_openapi.cjs` | Contract is present and validates structurally; it is not a running service. The contract lacks AI proposal, confirmation, status/result, or assistant request endpoints. |
| Database | No migrations, schema, or database integration tests found | PostgreSQL entities, foreign keys, exclusion constraint, audit, idempotency, and proposal storage remain design only. The appointment DDL in Backend Design is illustrative, not applied. |
| Authentication / RBAC | Security and backend design docs plus API security annotations | No authentication middleware, session store, account workflow, policy code, or runtime authorization tests found. |
| AI | `docs/AI_Integration_and_Security.md` design only | No provider selected, model configured, AI service, schemas in OpenAPI, UI, or executed AI evaluation suite found. |
| Tests | `scripts/validate_openapi.cjs` and npm command `validate:api` | Static contract/reference/schema examples and selected conventions are checked. No application unit, integration, browser, security, performance, database, or model tests were found. |
| PD-13 review | `docs/03_Literature_Review.md` on remote task branch `pd-13-literature-review`; not on the inspected `main` baseline | The review identifies evidence gaps and supports this specification’s non-implementation caveat. It is not a runtime or product acceptance source. |

### 9.3 Contract discrepancies and missing decisions

- **AI interface:** the AI design describes an immutable proposal, confirmation, and safe retrieval, but explicitly states that the final proposal API is not defined in PD-04. FR-AI-001–004 are therefore design requirements and cannot be implemented against the current OpenAPI alone.
- **First-admin bootstrap:** project proposal requires an operator CLI/bootstrap procedure; there is no such command or route in the repository.
- **Password handoff:** administrator-created initial credentials require a separately agreed secure handoff; automated reset/email flows are out of scope and absent.
- **Shared client policy:** documentation says this is intentional but requires team confirmation; access to linked deals/tasks/appointments must not be inferred from access to a client.
- **Frontend behavior:** no implementation exists to validate token storage, forms, confirmation rendering, timezone display, server error mapping, or accessibility.
- **Quality targets:** the p95 target is a proposal without a benchmark; rate limits, Argon2id parameters, provider budgets, retention, and accessibility level require decisions and/or measurement.
- **Prior documentation issue:** `docs/Backend_Design.md` contains a masked placeholder in a security sentence in the `GET /reports/summary` area (“****** is not an XSS defense”). The intended text must be checked against the source commit before implementation; this specification does not silently replace it with an inferred control.

No discrepancy is resolved by changing another team’s implementation. Contract or design revisions should be made by the responsible owner in a reviewed change.

## 10. Requirement traceability

All `TC-PD15-*` identifiers below are **reserved for test design/execution in PD-15**. Their presence does not mean a test has been written or run. Acceptance IDs are stable references to the criteria in sections 5 and 6.

| Requirement ID | Feature | Component/API | Acceptance criteria | Verification method | Test case ID |
|---|---|---|---|---|---|
| FR-AUTH-001 | Login | Identity; `POST /auth/login` | AC-AUTH-001 | API integration | TC-PD15-AUTH-001 |
| FR-AUTH-002 | Sessions | Identity; logout/me/protected routes | AC-AUTH-002 | API integration | TC-PD15-AUTH-002 |
| FR-AUTH-003 | Password change | Identity; `PUT /auth/password` | AC-AUTH-003 | API/database integration | TC-PD15-AUTH-003 |
| FR-AUTH-004 | First-admin bootstrap | Operator CLI; no public route | AC-AUTH-004 | CLI/database integration | TC-PD15-AUTH-004 |
| FR-RBAC-001 | Fixed role matrix | Policy; `/roles`, users, clients, reports | AC-RBAC-001 | Role matrix API tests | TC-PD15-RBAC-001 |
| FR-RBAC-002 | Record ownership | Policy; deals/tasks/appointments | AC-RBAC-002 | Cross-user API tests | TC-PD15-RBAC-002 |
| FR-RBAC-003 | Field/account lifecycle | Policy/identity; PATCH users/clients/business records | AC-RBAC-003 | API/database security tests | TC-PD15-RBAC-003 |
| FR-RBAC-004 | Non-disclosure | Policy/error mapping; item endpoints | AC-RBAC-004 | Response comparison | TC-PD15-RBAC-004 |
| FR-RBAC-005 | Account administration/directory | Identity; `/users*`, `/users/directory` | AC-RBAC-005 | Schema and role tests | TC-PD15-RBAC-005 |
| FR-CLIENT-001 | Client create/read/search | CRM; `/clients*` | AC-CLIENT-001 | API/schema/database tests | TC-PD15-CLIENT-001 |
| FR-CLIENT-002 | Client update/archive | CRM; `PATCH /clients/{id}` | AC-CLIENT-002 | API/database tests | TC-PD15-CLIENT-002 |
| FR-DEAL-001 | Deal create/read/list | CRM; `/deals*` | AC-DEAL-001 | API/database tests | TC-PD15-DEAL-001 |
| FR-DEAL-002 | Deal stage/update | CRM; `PATCH /deals/{id}` | AC-DEAL-002 | Transition/ETag tests | TC-PD15-DEAL-002 |
| FR-TASK-001 | Task create/read/list | CRM; `/tasks*` | AC-TASK-001 | API/database tests | TC-PD15-TASK-001 |
| FR-TASK-002 | Task status/update | CRM; `PATCH /tasks/{id}` | AC-TASK-002 | Transition/ETag tests | TC-PD15-TASK-002 |
| FR-APPT-001 | Appointment inputs/queries | Scheduling; `/appointments*` | AC-APPT-001 | API/timezone tests | TC-PD15-APPT-001 |
| FR-APPT-002 | Appointment non-overlap | Scheduling/PostgreSQL; appointment POST/PATCH | AC-APPT-002 | Concurrent database tests | TC-PD15-APPT-002 |
| FR-APPT-003 | Reschedule/cancel | Scheduling; `PATCH /appointments/{id}` | AC-APPT-003 | API/database tests | TC-PD15-APPT-003 |
| FR-REPORT-001 | Bounded summaries | Reporting; `GET /reports/summary` | AC-REPORT-001 | Synthetic data/API tests | TC-PD15-REPORT-001 |
| FR-AI-001 | Authorized intent allowlist | AI orchestrator/provider adapter; no current route | AC-AI-001 | AI integration/authorization | TC-PD15-AI-001 |
| FR-AI-002 | Output validation/grounding | AI orchestrator; design schemas only | AC-AI-002 | Schema/semantic tests | TC-PD15-AI-002 |
| FR-AI-003 | Human-confirmed writes | AI proposal API/UI; contract absent | AC-AI-003 | API/database/UI tests | TC-PD15-AI-003 |
| FR-AI-004 | Explicit failure/manual fallback | AI adapter and manual UI | AC-AI-004 | Fault injection/UI regression | TC-PD15-AI-004 |
| NFR-SEC-001 | Credential/session protection | Identity, browser, deployment | AC-SEC-001 | Security/config review | TC-PD15-SEC-001 |
| NFR-SEC-002 | Validation/safe errors | HTTP transport; all API routes | AC-SEC-002 | Negative contract/security tests | TC-PD15-SEC-002 |
| NFR-SEC-003 | Safe rendering/CORS | React and HTTP ingress | AC-SEC-003 | Browser/CORS security tests | TC-PD15-SEC-003 |
| NFR-SEC-004 | Rate limits | Auth/API/AI middleware | AC-SEC-004 | Clock-controlled boundary tests | TC-PD15-SEC-004 |
| NFR-REL-001 | Atomicity/retry safety | Database, audit, idempotency, ETags | AC-REL-001 | Failure/concurrency integration | TC-PD15-REL-001 |
| NFR-REL-002 | Dependency failure behavior | Transport, persistence, AI adapter | AC-REL-002 | Fault injection | TC-PD15-REL-002 |
| NFR-PERF-001 | Response-time target | Non-AI API/database | AC-PERF-001 | Reproducible load test | TC-PD15-PERF-001 |
| NFR-USAB-001 | Observable UI states | React and problem responses | AC-USAB-001 | UI acceptance tests | TC-PD15-USAB-001 |
| NFR-USAB-002 | Unambiguous appointment times | React scheduling/AI confirmation | AC-USAB-002 | Timezone UI tests | TC-PD15-USAB-002 |
| NFR-USAB-003 | Accessibility target | React UI | AC-USAB-003 | Accessibility audit | TC-PD15-USAB-003 |
| NFR-MAINT-001 | Traceability/contract maintenance | Source, OpenAPI, test/CI | AC-MAINT-001 | Review and CI audit | TC-PD15-MAINT-001 |
| NFR-DATA-001 | Persisted invariants | PostgreSQL and business services | AC-DATA-001 | Database integration tests | TC-PD15-DATA-001 |
| NFR-PRIV-001 | Data minimization/provider gate | AI retrieval/adapter | AC-PRIV-001 | Payload/log/provider review | TC-PD15-PRIV-001 |
| NFR-AUD-001 | Mutation/security audit | Audit module and transaction | AC-AUD-001 | Transaction/security-log tests | TC-PD15-AUD-001 |

## 11. Open questions requiring stakeholder or owner decision

1. Does the team approve the shared client directory for all three roles, while keeping linked deals/tasks/appointments scoped by owner?
2. What exact CLI, deployment identity, secret source, and operational evidence are required for first-admin bootstrap?
3. How will initial passwords be handed securely to admin-created users, given that email/reset flows are deferred?
4. Which AI provider/model will be evaluated, under what processing region/retention/training terms, and what data may leave the deployment?
5. What authenticated AI request/proposal/confirm/status API will connect the design to the React UI? Who owns its contract and when will it be reviewed?
6. What frontend flows, supported browsers, error/loading/empty states, and accessibility conformance target are accepted? Is WCAG 2.2 AA required?
7. Is the proposed non-AI p95 <500 ms target under 20 concurrent users and 1,000 synthetic clients accepted? What hardware, test mix, warm-up, and failure threshold should define the benchmark?
8. Are proposed rate limits, provider budgets, circuit-breaker settings, proposal expiry, audit retention, and deletion rules approved? Which values are requirements versus tuning defaults?
9. What deployment environment, TLS termination, backup/restore recovery objective, and operational logging/security-event sink are expected for the diploma demonstration?
10. Which institution rubric or jurisdiction-specific privacy/accessibility requirements apply? No such authority was supplied for this specification.
11. What source text was intended by the masked placeholder in `docs/Backend_Design.md`, and should that upstream design document be corrected by its owner?

Unanswered questions do not block recording the current design boundary, but they block approval or implementation of the affected requirement where specified above.

## 12. Known implementation gaps

At the reviewed baseline, all runtime requirements in this document remain unimplemented. Specifically, the repository has no backend, frontend, database schema/migrations, deployed services, browser flows, or runtime test suite. The static OpenAPI validator is the only executable project validation found.

Additional gaps that prevent end-to-end acceptance:

- No CLI or route implements first-admin bootstrap.
- No production authentication/session store, password hashing, account provisioning, or authorization middleware exists.
- No CRUD handlers, transaction boundaries, idempotency persistence, ETag checks, database exclusion constraint, report query, audit storage, or diagnostic logging implementation exists.
- No browser UI exists to verify required forms, response handling, timezones, accessibility, token handling, or human confirmation.
- No AI provider, model, AI API contract, proposal store, or output/prompt evaluation has been implemented or run.
- Provider privacy/retention decisions, audit retention/access policy, backup/restore operations, and production targets remain open.
- The existing OpenAPI contract and static validator pass design-level checks only; they do not satisfy runtime acceptance criteria in this document.

Implementation owners should update status only with source/test evidence. Do not change another student’s code to make this requirements document appear satisfied; record any conflict for owner review.

## 13. Change history

| Version | Date | Change |
|---|---|---|
| 1.0 | 24 October 2026 | Initial PD-14 requirements specification derived from the current `main` design documents and OpenAPI contract. Recorded missing runtime implementation, reviewed PD-13 findings on its separate branch, assigned stable functional/non-functional/acceptance/test IDs, and marked unapproved targets and open questions explicitly. |

## Sources reviewed

- [`README.md`](../README.md) — project scope, current evidence, and implementation limits.
- [`docs/01_Project_Proposal.md`](./01_Project_Proposal.md) — proposed MVP, roles, acceptance objectives, and performance proposal.
- [PD-13 literature review](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/pd-13-literature-review/docs/03_Literature_Review.md) — inspected on its separate task branch; not merged into the base branch used for PD-14.
- [`docs/07_Architecture.md`](./07_Architecture.md) — proposed components, trust boundaries, and transaction flows.
- [`docs/Backend_Design.md`](./Backend_Design.md) — API behavior, role matrix, validation, pagination, errors, retries, and report definitions.
- [`docs/AI_Integration_and_Security.md`](./AI_Integration_and_Security.md) — proposed AI intents, retrieval, privacy, confirmation, failure, and evaluation cases.
- [`api/openapi.yaml`](../api/openapi.yaml) — OpenAPI 3.0.3 contract; no runtime implementation implied.
- [`scripts/validate_openapi.cjs`](../scripts/validate_openapi.cjs) — static contract validation only.
