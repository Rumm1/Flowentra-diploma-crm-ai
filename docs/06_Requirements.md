# 6. Requirements Specification, Priorities and Acceptance Criteria

**Status:** Initial proposed requirements pending real user interviews and supervisor feedback.  
**Priority:** P0 = needed for defensible end-to-end MVP; P1 = important but can be phased; P2 = optional enhancement.  
**Roles:** ADMIN, MANAGER, EMPLOYEE. Exact permission mapping is proposed for review, not yet authorized by a customer.

## 6.1 Functional requirements (FR)

| ID | Priority | Functional requirement | Verifiable acceptance criterion | Owner |
|---|---|---|---|---|
| FR-01 | P0 | Staff sign in and sign out | Valid staff can authenticate; invalid credentials return generic rejection; signing out invalidates session | Backend / FE / QA |
| FR-02 | P0 | Role-based access control | Forbidden update/read operation receives 403/404 as appropriate and does not mutate state | Backend / QA |
| FR-03 | P0 | Create and edit a client | Valid name + permitted contact info persists and is returned by client ID | Backend / FE / QA |
| FR-04 | P0 | Search/list clients | Authorized user can paginate/search clients without viewing unauthorized records | Backend / FE / QA |
| FR-05 | P0 | Create and update deals | Deal references an existing client; invalid stage is rejected; change appears in pipeline | Backend / FE / QA |
| FR-06 | P0 | Manage tasks | Assigned task with due date is created, updated, filtered and visible to authorized user | Backend / FE / QA |
| FR-07 | P0 | Create service booking | A valid free interval and staff/resource produces confirmed booking | Backend / FE / QA |
| FR-08 | P0 | Prevent overlapping confirmed bookings | Under two concurrent requests for same staff/resource and overlapping interval, at most one is confirmed; loser receives 409 | Backend / QA |
| FR-09 | P0 | Move/cancel booking | Reschedule re-checks overlap; cancellation frees interval according to status rules | Backend / FE / QA |
| FR-10 | P0 | Dashboard overview | Count summaries equal data retrieved from the same authorized scope | Backend / FE / QA |
| FR-11 | P0 | AI intent proposal | A user utterance yields valid typed proposal or explicit request for clarification; invalid JSON rejected | AI / QA |
| FR-12 | P0 | Explicit AI mutation confirmation | No client/deal/task/booking mutation occurs before confirmation; denied confirmation causes no mutation | Backend AI / FE / QA |
| FR-13 | P0 | Re-authorize AI action at execution | Revoke a role between proposal and confirmation; executing user gets rejection and no state change | Backend AI / QA |
| FR-14 | P0 | AI unsupported/unsafe requests | Unrecognized or forbidden intent does not execute; UI explains limitation without leaking private data | AI / FE / QA |
| FR-15 | P0 | Input validation and error feedback | Missing/invalid fields show useful errors; backend performs authoritative checks independently of UI | All |
| FR-16 | P0 | Document REST API | All implemented public API routes appear in an up-to-date OpenAPI file with samples | Backend |
| FR-17 | P1 | Audit events | Sensitive writes log actor ID, action, object ID and timestamp without logging secrets | Backend / QA |
| FR-18 | P1 | CSV/report export | Manager exports authorized tabular report with matching rows and visible date filters | Backend / FE / QA |
| FR-19 | P1 | Repeat-request idempotency | Repeating same create request with same idempotency key avoids duplicate creation | Backend / QA |
| FR-20 | P1 | Basic AI response draft | User receives an editable suggestion, not an automatically sent message | AI / FE / QA |
| FR-21 | P2 | Customer portal or mobile apps | Explicitly excluded from MVP; proposed future only | — |
| FR-22 | P2 | Payroll and accounting | Explicitly excluded from MVP | — |

## 6.2 Non-functional requirements (NFR)

| ID | Priority | Quality attribute | Target / acceptance approach (proposed, not achieved) |
|---|---|---|---|
| NFR-01 | P0 | Authorization | 0 unauthorized state changes across all prepared negative-role cases |
| NFR-02 | P0 | Integrity | 0 confirmed overlapping bookings across designed concurrent test batches |
| NFR-03 | P0 | Data minimization | No production customer personal data in source control, screenshots, prompts or test fixtures |
| NFR-04 | P0 | AI safety | 0 unconfirmed or unauthorized AI-initiated writes in a minimum 100-case evaluation set |
| NFR-05 | P0 | Reproducibility | A reviewer can set up services and run documented tests in a clean environment |
| NFR-06 | P1 | API responsiveness | Provisional p95 <800 ms for ordinary local/staging CRUD at 20 concurrent simulated users, reported with machine configuration |
| NFR-07 | P1 | Usability | SUS ≥70 (aspirational pilot target) plus task success and error tracking; include respondent count |
| NFR-08 | P1 | Robustness | Malformed request, lost AI provider and duplicate retry have predictable non-corrupting error paths |
| NFR-09 | P1 | Maintainability | Module ownership, lint/test commands, ADRs and peer PR reviews documented |
| NFR-10 | P1 | Accessibility | Keyboard navigation and form labels present in main flows; test contrast and focus order |
| NFR-11 | P1 | Observability | Request IDs, timestamps and structured error logging without raw personal content |
| NFR-12 | P2 | Scalability | Future capacity testing; no unsupported production scale claim at first pre-defense |

**Quantitative thresholds are evaluation design choices**, not results or vendor claims; the supervisor may revise them after pilot evidence.

## 6.3 Permission matrix (proposal for review)

| Action | ADMIN | MANAGER | EMPLOYEE |
|---|---|---|---|
| Manage staff roles | Yes | No | No |
| Manage client records | Yes | Yes | Assigned/authorized only |
| Manage deals | Yes | Yes | Assigned deals only |
| Assign tasks to others | Yes | Yes | No |
| Update own assigned tasks | Yes | Yes | Yes |
| Create/change booking | Yes | Yes | Assigned bookings only |
| View aggregate business reports | Yes | Yes | No |
| Review/confirm AI action | Yes, within permission | Yes, within permission | Yes, only own allowed actions |

## 6.4 Key business rules

- **BR-01:** A booking has half-open time interval `[start, end)` with `start < end`, an assigned employee/resource, client and service. Overlap is `new.start < existing.end AND existing.start < new.end`; only confirmed bookings block.
- **BR-02:** Overlap checks must be re-evaluated inside transaction; final database constraint or equivalent serializable locking resolves races.
- **BR-03:** AI output is **never** authoritative. Server re-validates inputs, current actor permissions and target state after explicit confirmation.
- **BR-04:** A deal must belong to an existing client; an orphaned task/booking is rejected or handled by documented soft-deletion behavior.
- **BR-05:** Unknown record IDs and unauthorized record IDs must not leak private information through distinguishable UI content.
- **BR-06:** Audit metadata records confirmed effects; draft/failed AI outputs are not counted as completed actions.

## 6.5 Traceability examples

| Requirement | Scenario | Test reference | Target artifact |
|---|---|---|---|
| FR-03 | Create new client | TC-03 / TC-04 | Client form / REST POST /clients |
| FR-08 | Concurrent overlapping appointments | TC-13 / TC-14 | Booking service / DB constraint |
| FR-12–14 | AI proposal, confirm, reject | TC-17–TC-23 | Assistant UI + typed proposal handler |
| NFR-01 | Change role then retry edit | TC-07 / TC-22 | Authorization middleware |
| NFR-07 | Complete guided workflows | UX-01–UX-04 | Prototype / SUS questionnaire |

See `tests/Test_Cases.csv` and `docs/09_Verification_Plan.md` for measurement conditions.
