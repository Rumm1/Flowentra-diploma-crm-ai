# Flowentra: Backend REST API Design

Task: **PD-04** | Responsible student: **Aitzhan Iliyas**

**Design only.** The authoritative machine-readable contract is [api/openapi.yaml](../api/openapi.yaml), OpenAPI 3.0.3, version `0.1.0-design`. No handler, Go application, migration, database test, deployment, or API runtime is delivered by this task. The validator checks a specification, not implemented behavior.

## 1. Architecture and contract scope

The proposed implementation is a Go modular monolith with HTTP transport, identity/policy, CRM, scheduling, reporting, audit, and persistence modules. React consumes REST/JSON under `/api/v1`; PostgreSQL persists one organization's data. These assumptions depend on PD-01–PD-03 (PRs #1–#3). Files in this change do not overlap those task branches. Reconcile upstream review changes before merging.

The local server URL in OpenAPI is illustrative. HTTPS is mandatory outside local development. No public registration, custom roles, multi-tenancy, hard deletion, outbound messaging, or AI HTTP endpoints are specified. The AI design in PD-05 will call the same authorized business services; its proposal/confirmation API requires a later contract change.

## 2. Endpoint inventory

Each path below is relative to `/api/v1`. The YAML contains individual parameters, request/response schemas, errors, and role annotations for all **27 operations**.

| Path | Methods | Purpose |
| --- | --- | --- |
| `/auth/login` | POST | Credentials to one-hour opaque session |
| `/auth/logout` | POST | Revoke presented session; 204 |
| `/auth/me` | GET | Current user and resource ETag |
| `/auth/password` | PUT | Verify current password, change it, revoke all sessions; 204 |
| `/roles` | GET | Admin-only fixed role catalog |
| `/users/directory` | GET | Paginated active user IDs/display names for assignment |
| `/users` | GET, POST | Admin-only account list/create |
| `/users/{id}` | GET, PATCH | Admin-only account read/update/deactivate |
| `/clients` | GET, POST | Shared client search/list/create |
| `/clients/{id}` | GET, PATCH | Shared read/update; archive/restore restricted by field |
| `/deals` | GET, POST | Scoped opportunity list/create |
| `/deals/{id}` | GET, PATCH | Scoped read/edit/stage/assignment |
| `/tasks` | GET, POST | Scoped task list/create |
| `/tasks/{id}` | GET, PATCH | Scoped read/edit/status/assignment |
| `/appointments` | GET, POST | Scoped appointment list/create |
| `/appointments/{id}` | GET, PATCH | Scoped read/reschedule/cancel |
| `/reports/summary` | GET | Bounded manager/admin aggregates |

Business creates return 201, a resource, `Location`, and `ETag`. Reads and patches return 200 and a resource; single-resource responses include `ETag`. Logout/password changes return 204 without a body. Archiving, cancellation, and deactivation preserve history; no DELETE is defined.

## 3. Authentication and authorization

The server generates a cryptographically random opaque bearer token with at least 256 bits of entropy. Only its hash is stored with user ID, expiry, and revocation state. The proposed lifetime is 3,600 seconds with no refresh token. React keeps it in memory; reload requires login. Never store it in local storage, URLs, logs, or prompts. Requests resolve the current user and session state rather than trusting a role encoded by the caller.

Passwords are 12–128 characters for new credentials and must be hashed using Argon2id with a unique salt and implementation parameters selected against OWASP guidance and measured on the target host [4]. Login accepts existing credential lengths up to 128. Do not trim or silently normalize passwords. Use generic invalid-credential responses and rate limits. Initial admin provisioning is an explicit future CLI/seed operation, never a public signup endpoint or a hard-coded password. Administrator-created users receive an initial credential through a separately agreed secure handoff; automated email and reset workflows are deferred. `/auth/password` permits immediate replacement.

Deactivation, role change, and password change revoke affected sessions in the same transaction. Logout revokes the current session. Repeating logout with the revoked token yields 401; it cannot create another session. Every request must check session validity, route permission, field permission, and record scope. The `x-roles` OpenAPI extension documents policy but cannot enforce it.

| Operation | Admin | Manager | Employee |
| --- | --- | --- | --- |
| Own session/password/current user | Yes | Yes | Yes |
| User account list/read/create/edit; roles | Yes | No | No |
| Active assignment directory (ID/name only) | Yes | Yes | Yes |
| Client list/read/create/contact edit | All | All | All shared clients |
| Submit client `archived` field | Yes | Yes | No, even when value is false |
| Deal/task/appointment list/read/edit | All | All | Only records assigned to self |
| Create deal/task/appointment | Any active assignee | Any active assignee | Assignee must be self |
| Submit reassignment field on PATCH | Yes | Yes | No, even when value is self |
| Reports | Yes | Yes | No |

The last active admin cannot be deactivated or demoted. Missing and inaccessible objects/references both return 404; forbidden route/field permissions return 403. Apply scope in database predicates **before** ordering, counting, or pagination. A shared client record does not grant access to all its related deals/tasks/appointments. The directory exposes no email, role, or inactive account details to employees.

Proposed authenticated rate limit: 120 requests/minute per actor, with 429 and `Retry-After`. Login has separate account+IP and IP limits in the specification. Enforce body limits and rate limits before costly work. Use exact configured CORS origins and deny token-bearing redirects to other origins. Bearer authentication is not an XSS defense: React must render untrusted content as text and apply a reviewed content security policy.

## 4. Schema and validation conventions

Request objects reject unknown properties and control characters. An omitted PATCH field is unchanged; `null` clears only a schema-declared nullable field. Empty PATCH objects are invalid. UUID shape, enums, length, decimal, and RFC 3339 format checks are necessary but insufficient: Go services must also validate relationships, timezone names, transitions, and permissions. Schema `format` annotations alone do not prove server validation.

| Data | Contract and business validation |
| --- | --- |
| Names/titles | 1–200 characters after trimming; reject blank strings and control characters |
| Email | At most 254 characters; syntactic email check; trim/lowercase under a documented MVP policy; user email unique and immutable |
| Phone | Nullable; `+` followed by 8–15 digits, first digit nonzero; validation does not prove ownership or reachability |
| Money | String decimal, non-negative, at most 12 integer and 2 fractional digits; PostgreSQL `numeric(14,2)`; responses use 2 fractional digits |
| Currency | One deployment-configured 3-letter currency code; reject mismatched deal currency; no FX conversion |
| IDs/assignment | Existing records; new linked records require active client/user; employees may assign only self |
| Timestamps | RFC 3339 with explicit offset; normalize instants to UTC; reject missing offset and non-finite values |
| Appointment interval | `start_at < end_at`; at most 24 hours; half-open `[start,end)`; valid IANA display timezone |
| Appointment history | Past dates permitted for recording history; no automatic future-only validation is implied |
| Appointment filters | `from` and `to` supplied together, positive interval at most 366 days; select interval overlap |
| Report filters | Required `from < to`, at most 366 days; all boundaries use UTC `[from,to)` |

IANA timezone metadata controls display; submitted offsets determine instants. React must resolve ambiguous/nonexistent local clock times before submission and show the resulting instant to the user. The server should reject an unknown timezone name rather than silently substituting its host timezone.

Clients start active; omitted phone/email become null. Deals start `new`; any transition among `new`, `qualified`, `won`, `lost` is permitted. Entering `won` or `lost` sets `closed_at` to server time; entering an open stage clears it. Edits without a stage transition preserve it. Deal client/currency are immutable. Tasks start `todo`; all defined status transitions are allowed; entering `done` sets `completed_at`, leaving clears it. Omitted task client/deadline become null; client linkage is immutable.

Appointments start `scheduled`. Rescheduling evaluates the fully merged interval and employee. A cancellation PATCH contains only `{"status":"cancelled"}`. Cancellation is terminal; later patches return 409. Cancellation remains allowed when the client is archived or employee inactive. Active client/user checks still apply to rescheduling. Client archiving/deactivation does not silently cancel existing appointments; managers must resolve them explicitly.

## 5. Pagination and reads

Lists return `{ "data": [...], "next_cursor": "..." }`, with `next_cursor: null` at the end. `limit` defaults to 20 and ranges from 1 to 100. Sort by `(created_at DESC, id DESC)` and encode the last pair into an opaque signed cursor bound to actor ID, normalized filters, endpoint, limit, and a 15-minute expiry. Reject tampered/expired/mismatched cursors with 400. Re-evaluate current authorization on every page; the cursor never grants access.

Pagination is not a snapshot. Concurrent insertions appear when the user restarts the listing; changed filters/ownership may change membership. Do not promise a historical count across pages. Client search is a case-insensitive literal display-name substring; escape SQL wildcard characters and use parameters. Deal/task/status and appointment interval filters are enumerated in YAML. No arbitrary field selection, sorting, or model-generated SQL is accepted.

## 6. Standardized errors

Errors use `application/problem+json` following RFC 9457 [2]. This contract uses `type: "about:blank"`, a standard HTTP reason phrase in `title`, matching numeric `status`, a safe `detail`, application `code`, server-generated `request_id`, and optional field errors. Do not return stack traces, SQL, passwords, complete request values, or another employee's booking details.

| Status | Meaning / representative code |
| --- | --- |
| 400 | Malformed syntax, unknown field, invalid cursor, or invalid header: `invalid_request` |
| 401 | Invalid credentials/session: `unauthenticated`; includes Bearer challenge |
| 403 | Forbidden route or field: `forbidden` |
| 404 | Missing or inaccessible object/reference: `not_found` |
| 409 | Business conflict: `appointment_overlap`, `idempotency_mismatch`, `idempotency_in_progress`, `inactive_reference`, `last_admin`, `duplicate_email`, `invalid_transition` |
| 412 | Stale version: `stale_version` |
| 413 / 415 | Body above 64 KiB / non-JSON request body |
| 422 | Valid JSON with invalid field or cross-field values: `validation_failed` |
| 428 | Missing update precondition: `precondition_required` |
| 429 | Rate limit: `rate_limited`, with `Retry-After` |
| 500 / 503 | Unexpected failure / dependency unavailable; no partial success |

Example of an authorized caller's overlap error:

```json
{
  "type": "about:blank",
  "title": "Conflict",
  "status": 409,
  "detail": "The selected employee is unavailable for that interval.",
  "code": "appointment_overlap",
  "request_id": "00000000-0000-4000-8000-000000000001"
}
```

All responses use `Cache-Control: no-store` and `X-Request-ID`. The error code is stable enough for UI branching; prose is not. Authenticate before revealing protected-resource validation details.

## 7. Optimistic updates and retries

Each mutable resource has an integer `version`, initially 1. Single-resource responses expose the corresponding strong ETag, for example `"v7"`. Every PATCH requires exactly one matching `If-Match`; missing returns 428, invalid syntax 400, and stale version 412. Reject wildcard and multi-tag values. Perform an atomic conditional update scoped by ID/ownership/version; increment version and `updated_at` once. Authorized callers must refetch after 412 and decide whether to reapply their changes. Do not silently retry a stale update.

`Idempotency-Key` is required on POST `/users`, `/clients`, `/deals`, `/tasks`, and `/appointments`. It is an application-level UUID key, not a claim that POST is inherently idempotent [1]. Retain successful response records for **24 hours** with a unique `(actor_id, method, canonical_route, key)` tuple and a keyed fingerprint of normalized validated request content. For user creation, never retain the plaintext initial password or an unkeyed low-entropy password digest in this record.

1. Authenticate and check current route permission before looking up a replay record.
2. Claim the scoped key within the business transaction using a unique constraint; concurrent same-key requests serialize. Bound waiting; a still-running competitor can return 409 `idempotency_in_progress`.
3. If a successful record exists, compare fingerprints. A different request returns 409 `idempotency_mismatch`.
4. Before replaying, recheck current access to the resulting resource. Revoked sessions return 401; lost object access returns 404. Do not disclose a cached response after reassignment. A valid authorized replay returns the original 201, body, `Location`, and original ETag; that historical ETag may now be stale.
5. Otherwise perform the mutation, audit insert, and successful response-record insert atomically. A rolled-back transaction leaves no successful key record; do not cache 4xx/5xx responses as committed success.

Clients must retry uncertain creates with the same key and body during the retention period. After expiry, a reused key is a new request and duplicate prevention is no longer guaranteed; reconcile state manually rather than blindly retry. No persistent queue or automatic background retry is implied. PATCH is guarded by versions; after a lost response, GET the resource and reconcile before another update. Login is not idempotency-cached, and credentials/tokens never appear in cached responses for business creates.

## 8. Transactions and lock ordering

Proposed default isolation is PostgreSQL READ COMMITTED for short writes, with constraints and explicit locking for invariants. Each write includes business mutation, mutation audit, and any success replay record in one transaction. A database/audit failure rolls back all three. Security-denial events use a separate restricted event path because a rejected business transaction must not erase the denial evidence. An unavailable security-event sink must raise an operational alert and must never turn a denial into an approval.

Use one seeded `policy_guard` row: ordinary business writes/login acquire a shared lock; identity changes, password changes, and session revocation acquire an exclusive lock. This makes account/session state changes serialize against authorized mutations and makes the last-active-admin check atomic. It is a deliberate small-MVP trade-off: short exclusive identity transactions can pause writes. Do not hold this lock during password hashing, external requests, or user interaction; verify expensive inputs beforehand and recheck relevant state under the lock.

Use one consistent order: (1) policy guard; (2) scoped idempotency key when applicable; (3) referenced client rows in UUID order with `FOR SHARE`; (4) target business row with the required update lock; (5) audit and response records. Identity changes use the guard first and lock user/session rows in a consistent order. Client archive uses an update lock on the client row; it conflicts with the business create's shared reference lock. Active-user checks are protected by the policy guard. Read immutable client linkage before locking an existing business row, then recheck scope and version under the lock.

If a deadlock/serialization failure occurs, retry the entire uncommitted transaction at most twice with jitter under the original request deadline and idempotency key. Never retry a transaction after a known successful commit. If the connection is lost during commit, the client resolves the uncertain result through idempotency; do not invent success. Map exhausted transient dependency failures to 503. Database connection pools and timeouts must be bounded and measured during implementation.

Reports run in one read-only REPEATABLE READ transaction so multiple aggregates share a snapshot. No transaction stays open during an AI provider request or confirmation wait.

## 9. Double-booking prevention

A select-then-insert availability check is vulnerable to concurrent requests. The database must enforce the invariant on both INSERT and UPDATE. PostgreSQL ranges and exclusion constraints provide the mechanism [3]. The following is **illustrative DDL**, not an applied migration; it assumes existing `users` and `clients` tables and omits other API columns for focus:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE appointments (
    id uuid PRIMARY KEY,
    client_id uuid NOT NULL REFERENCES clients(id),
    employee_id uuid NOT NULL REFERENCES users(id),
    start_at timestamptz NOT NULL,
    end_at timestamptz NOT NULL,
    status text NOT NULL CHECK (status IN ('scheduled', 'cancelled')),
    version bigint NOT NULL DEFAULT 1 CHECK (version > 0),
    CHECK (start_at < end_at),
    CHECK (end_at - start_at <= interval '24 hours'),
    CONSTRAINT no_employee_overlap EXCLUDE USING gist (
        employee_id WITH =,
        tstzrange(start_at, end_at, '[)') WITH &&
    ) WHERE (status = 'scheduled')
);
```

Verify finite timestamp inputs in the service. `btree_gist` supplies the UUID equality operator class [5]. Map the named exclusion constraint's SQLSTATE `23P01` to 409 `appointment_overlap`. Do not map every constraint failure to an overlap. A database constraint exception aborts the transaction; rollback before writing any separate denial event. Foreign keys, uniqueness failures, and checks need their own controlled mapping.

Half-open intervals allow `[10:00,11:00)` and `[11:00,12:00)` for the same employee. Different employees may overlap. Cancellation releases its interval when committed. Rescheduling applies the same exclusion rule; if it fails, the previous booking and its version remain intact. The MVP prevents employee double-booking, not client, room, equipment, or multi-participant conflicts.

## 10. Report definitions

`GET /reports/summary?from=...&to=...` accepts at most 366 days. Values reflect current records in the transaction snapshot, not immutable historical accounting.

| Field | Definition |
| --- | --- |
| `clients_created` | Clients whose `created_at` is in the period, including currently archived clients |
| `deals_created` | Deals whose `created_at` is in the period, regardless of current stage |
| `tasks_completed` | Currently done tasks whose current `completed_at` is in the period |
| `appointments_scheduled` | Currently scheduled appointments whose `start_at` is in the period |
| `won_deal_count` / `won_deal_value` | Currently won deals whose current `closed_at` is in the period; sum current exact amounts |
| `currency` | Deployment currency; empty monetary sum is `"0.00"` |
| `generated_at` | Server timestamp for the report snapshot |

Reopening a task/deal or cancelling a booking can change a report for an earlier period. This limitation must be visible in the future UI; the API is not an accounting ledger or an audited revenue statement.

## 11. Validation and implementation acceptance

From this task branch with Node.js/npm available:

```sh
npm ci --ignore-scripts
npm run validate:api
```

On Windows where PowerShell blocks `npm.ps1`, use `npm.cmd`. `package-lock.json` pins the validator dependency graph. The script uses `@apidevtools/swagger-parser` 12.1.0 for OpenAPI schema/reference validation, Ajv 8.17.1 with ajv-formats 3.0.1 for schema examples, and checks unique operation IDs, auth, standardized errors, idempotency, preconditions, and paginated resource shapes. It validates repeated operation-level examples and rejects six deliberately invalid input fixtures. It does not execute endpoint handlers or prove the SQL/role policies. Local authoring tools and dependency directories are excluded from commits.

The following **runtime tests are required later and have not been executed here**:

- Allowed and denied role/field/ownership cases for every operation; IDs guessed across employees return 404.
- Revoked/expired session use, login throttling, password change, and concurrent last-admin changes.
- Two simultaneous overlapping appointment creates/reschedules; adjacency, cancellation, and distinct employees.
- Duplicate key with same/different body; lost success response; changed ownership before replay; expiry handling.
- Same-version concurrent patches produce one success and one 412; failed writes preserve prior state/audit consistency.
- Archive/deactivate races with creates and reschedules; no new record after incompatible state change wins.
- Transaction rollback on audit failure; sensitive values absent from logs/errors; oversized/unknown inputs rejected.
- Report boundary/null/empty datasets and consistent snapshots; cursor tampering, expiry, and permission changes.

Passing design validation is a PD-04 artifact check, not implementation acceptance. Student verification and independent PR review are still required before marking the task Done.

## 12. References and provenance

Primary documentation consulted on 2026-10-23:

1. IETF, [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html).
2. IETF, [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html).
3. PostgreSQL 18, [Range Types](https://www.postgresql.org/docs/18/rangetypes.html).
4. OWASP, [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).
5. PostgreSQL 18, [btree_gist](https://www.postgresql.org/docs/18/btree-gist.html).
6. PostgreSQL 18, [Explicit Locking](https://www.postgresql.org/docs/18/explicit-locking.html).
7. OpenAPI Initiative, [OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3.html).
8. OWASP, [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

The contract and transaction protocol are project design proposals prepared with AI assistance. No old draft material was restored. Tool results must be recorded as observed; frontend behavior, production security, and database correctness remain unverified until implementation and testing.
