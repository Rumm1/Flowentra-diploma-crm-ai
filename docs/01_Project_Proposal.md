# Flowentra: Project Proposal and MVP Definition

Task: **PD-01** | Responsible student: **Aitzhan Iliyas — Backend & AI Integration**

Status: proposed design for student and independent reviewer verification. This document does not establish that the software, user research, or acceptance tests have been completed.

## 1. Project overview and problem statement

Flowentra is a proposed web application for small service businesses that need to manage client relationships, sales follow-up, employee tasks, and appointments in one workspace. A React interface will communicate with a Go REST API backed by PostgreSQL. An optional AI assistant will help authorized staff retrieve information and prepare limited CRM actions for explicit human confirmation.

The problem hypothesis is that information spread across spreadsheets, calendars, and messages can make it difficult to find a client's history, identify overdue work, and avoid conflicting appointments. This is a design motivation, not a finding from interviews or a quantified claim about businesses. Before a production pilot, the team must validate it with appropriately consented user research and record the evidence separately.

Conventional CRM workflows commonly require users to move between forms, filters, records, and scheduling screens. Flowentra proposes a conversational entry point into those same controlled workflows: for example, finding overdue follow-up tasks or preparing a booking from a natural-language request. It retains structured forms, role checks, and human decisions. Conversational CRM is not claimed as a new invention; the diploma contribution is the design, implementation, and evaluation of a bounded integration in this particular system.

## 2. Target sectors and users

Candidate sectors are small consulting agencies, repair and maintenance providers, and non-medical appointment-based services. They share client records, follow-up work, and single-employee bookings. These are proposed target sectors, not confirmed customers. Medical records, financial advice, and other regulated specialist workflows are outside this MVP.

| User role | Intended needs | MVP access boundary |
| --- | --- | --- |
| Administrator | Maintain internal accounts and role assignments; configure the workspace | All business records and account administration within the single organization |
| Manager | Review clients, deals, workloads, appointments, and summary reports | All CRM records; cannot administer accounts or roles |
| Employee | Maintain shared client contact records and perform assigned work | Shared client directory; own deals, tasks, and appointments; no organization-wide reports |

Clients are records in the MVP, not authenticated portal users. There is no public registration or customer self-booking. One deployment serves one organization. Multi-tenant hosting would require a separate isolation design and is not implied by these roles.

## 3. Aim and measurable objectives

**Aim:** design and demonstrate a maintainable CRM prototype that combines reliable business workflows with permission-constrained AI assistance.

| ID | Objective | Planned evidence and acceptance threshold |
| --- | --- | --- |
| OBJ-01 | Define a coherent, reviewable system contract | Proposal, technology comparison, architecture with editable diagrams, and validated OpenAPI agree on roles, entities, and limitations |
| OBJ-02 | Demonstrate core CRM workflows | A recorded scenario creates a client, deal, assigned task, and appointment, then retrieves the persisted records after restarting the application |
| OBJ-03 | Enforce access rules on the server | Automated allowed/denied tests cover every operation in the agreed permission matrix; employee access to another employee's restricted record is rejected |
| OBJ-04 | Preserve booking integrity | Two concurrent overlapping bookings for the same employee yield one success and one conflict; adjacent intervals and different employees are accepted |
| OBJ-05 | Demonstrate bounded AI assistance | At least 20 synthetic prompts with expected outcomes cover retrieval, ambiguity, confirmed actions, injection attempts, invalid output, and provider outage; no unauthorized mutation is accepted |
| OBJ-06 | Make delivery traceable | Each PD task has an isolated change set, validation record, and independently reviewed PR before its board status becomes Done |

These are proposed evaluation targets, not results. The team must publish reproducible inputs, environment details, and observed failures alongside successful outcomes.

## 4. Proposed solution and expected outcomes

The browser presents structured forms and an assistant panel. A modular Go application owns authentication, authorization, CRM rules, scheduling, reports, AI orchestration, and audit recording. PostgreSQL enforces relational integrity and appointment overlap rules. The AI provider receives only minimized, authorized context through a server adapter; it cannot connect to the database or choose arbitrary tools.

The expected outcomes are a coherent design package, an executable prototype in a later implementation stage, a repeatable demonstration using synthetic data, and documented limits of the AI feature. Reduced context switching and fewer booking errors are hypotheses to evaluate, not promised business benefits.

## 5. Engineering complexity

The complexity is in coordinating constraints rather than merely exposing CRUD endpoints:

- Authentication must support session revocation and server-enforced role and record ownership checks.
- Concurrent booking requests require a database constraint; an availability check alone can race.
- Deal and task updates must not silently overwrite concurrent edits. Version preconditions and transactions must be consistent across the API and persistence layers.
- Retried create requests need bounded idempotency handling so network uncertainty does not create duplicates.
- AI output is untrusted: entity resolution, schema validation, current permissions, explicit confirmation, and audit records must precede any permitted mutation.
- Provider delays and outages must not prevent manual CRM work. Logs must help diagnosis without copying passwords, tokens, or client conversations.

A modular monolith is appropriate for the initial team and deployment scope. Internal module boundaries support separate responsibilities while avoiding distributed transactions and multiple service deployments before a demonstrated need exists.

## 6. MVP scope

| Module | In scope for the proposed MVP | Explicit limits |
| --- | --- | --- |
| Authentication and RBAC | Administrator-provisioned accounts; login, logout, current user; fixed admin/manager/employee roles | No public signup, SSO, password reset email, custom roles, or multi-organization membership |
| Clients | Create, read, update, search, archive shared client contact records | No bulk import, marketing automation, unrestricted exports, or sensitive specialist records |
| Deals | Client-linked deals; assigned employee; fixed new/qualified/won/lost stages; exact monetary amounts | One configured currency per deployment; no invoicing, payments, tax, forecasting, or custom pipelines |
| Tasks | Assign work linked optionally to a client; due time and status | No recurring tasks, attachments, complex dependencies, or external notifications |
| Appointments | One client and one employee per booking; create, reschedule, cancel; UTC storage with explicit display timezone | No recurrence, rooms, multiple participants, external calendar sync, or public booking |
| Reports | Manager/admin summary counts and won-deal value for an explicitly bounded period | No BI warehouse, predictive revenue claims, or arbitrary SQL reports |
| AI assistant | Authorized lookup and summary; proposed task creation and appointment creation with confirmation | No autonomous execution, destructive actions, role changes, mass messaging, model training, or unrestricted database access |
| Audit and operations | Mutation audit records, authentication/security events, structured diagnostic logs, backup/restore procedure | Audit UI, compliance certification, high availability, and production service guarantees deferred |

React, Go, PostgreSQL, and REST are design selections to justify in PD-02. The MVP is an implementation target; this PD-01–PD-06 assignment primarily produces design and readiness artifacts, not a completed backend.

## 7. Out-of-scope extensions

Telegram, WhatsApp, and Instagram are **proposed future extensions**, not implemented channels. Each would need platform-specific authentication, identity mapping, webhook verification, privacy decisions, abuse controls, and a separate acceptance plan. Other deferred work includes native mobile apps, billing, inventory, multi-tenancy, advanced analytics, automated outbound campaigns, and self-hosted model infrastructure.

## 8. Team responsibilities and coordination

The baseline README identifies the following team and supervisor. These responsibilities describe ownership, not evidence of completed contributions.

| Person | Responsibility | Coordination required |
| --- | --- | --- |
| Aitzhan Iliyas | Backend design and implementation; database/API contracts; secure AI orchestration; PD-01–PD-06 deliverables assigned in this request | Review frontend contract needs with Aibek and testability with Daniil |
| Aibek Galymbekov | Frontend and UX | Confirm navigation, forms, error presentation, timezone display, and human confirmation UI; do not overwrite his work without coordination |
| Daniil Khvan | QA and testing | Agree acceptance scenarios, negative cases, test evidence, and defect reporting; do not claim tests on his behalf |
| Gulnur Shuteyeva | Supervisor named in the baseline README | Academic feedback and assessment requirements remain unverified; no approval is claimed |

One student must not self-approve a PR as independent review. Reviewer usernames and exact Taiga item URLs must be confirmed before final submission. The [repository](https://github.com/Rumm1/Flowentra-diploma-crm-ai) and [project board](https://tree.taiga.io/project/rumm1-flowentra-1/kanban) are the supplied coordination locations; the board URL is not a substitute for a verified task permalink.

## 9. Success criteria and evaluation plan

| Criterion | Pass condition | Evidence still required |
| --- | --- | --- |
| Documentation readiness | Six required task packages exist, their checks pass, and each receives independent review | PR review decisions and verified task links |
| Functional demonstration | OBJ-02 completes using synthetic data with persisted state | Running source, setup steps, recording, and execution log |
| Authorization | All agreed negative RBAC and ownership cases are denied without information disclosure | Automated results and manual inspection of responses |
| Scheduling correctness | Concurrent overlaps are rejected on create and reschedule; cancellation releases the slot; adjacency succeeds | Repeatable database integration tests |
| Retry safety | Repeating a create with the same key and payload returns the original result; changed payload conflicts | Integration test of response loss and replay |
| AI safety | Every write requires confirmation; all forbidden actions in the synthetic set are denied; invalid output never reaches persistence | Versioned prompt set, model/configuration details, and observed results |
| Responsiveness | Proposed target: non-AI requests have p95 below 500 ms on a documented local test with 20 concurrent users and 1,000 synthetic clients | Benchmark script, machine specifications, workload, and measured output; no measurement is currently claimed |
| Reproducibility | A reviewer can follow setup and demonstration instructions from a clean checkout | Independent setup attempt, dependency versions, and limitations |

The responsiveness target is an acceptance proposal, not a measured comparison between technologies. AI response time must be measured separately because it depends on an external service. Any missed target must be reported, investigated, and either corrected or explicitly accepted by the reviewer; it must not be hidden by changing the report.

## 10. Assumptions, risks, and academic integrity

The design assumes a small internal team, synthetic demonstration data, one organization, one configured currency, and manual operations when AI is unavailable. Risks include scope growth, unclear ownership, timezone mistakes, provider cost/availability, and prompt injection. Mitigation starts with the bounded scope above, contract review, database-enforced rules, and a separately evaluated AI boundary.

This document was prepared with AI assistance from the clean repository baseline and the supplied task brief. No material was restored from `initial-ai-draft` or the backup bundle. The team names and supervisor name were reused from the current baseline README and checked against its text; they do not establish approvals or contributions. Aitzhan Iliyas must verify the reasoning and sources and be able to explain the design during defense.

## 11. PD-01 review checklist

- [ ] Student verifies the problem hypothesis and proposed sector selection.
- [ ] Team confirms role permissions, module limits, and responsibility boundaries.
- [ ] Reviewer checks that objectives are measurable and no results are fabricated.
- [ ] Exact Taiga PD-01 item and independent reviewer are recorded in the PR.
- [ ] Independent review is completed before marking PD-01 Done.
