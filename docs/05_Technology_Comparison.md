# Flowentra: Technology Comparison

Task: **PD-02** | Responsible student: **Aitzhan Iliyas**

Status: proposed technical decisions, pending student verification and independent review. This is a qualitative evaluation, not a benchmark report. No runtime or database performance measurements were collected for this task.

## 1. Decision context and method

The proposed MVP is a React web client and a single-organization CRM with users, clients, deals, tasks, appointments, fixed role permissions, reports, and a bounded external AI integration. The design assumptions come from PD-01, which is a separate review dependency; they are restated here so this change remains independently readable. The workload has relational records, concurrent booking writes, short interactive queries, and potentially slow external AI calls.

The criteria below reflect this workload. Priority describes engineering judgment for Flowentra, not a numerical score or an empirically established ranking. Team experience has not been measured; language familiarity must be confirmed with the students rather than assumed.

| Criterion | Priority | Reason |
| --- | --- | --- |
| Integrity and enforceable security boundaries | Essential | Ownership checks, consistent mutations, and booking conflicts are acceptance requirements |
| Maintainability and reviewability | High | A small diploma team must explain and independently test the design |
| Browser and tooling compatibility | High | React integration and an inspectable API contract are required |
| Deployment and operational complexity | High | A modular monolith should be reproducible without a distributed platform |
| Concurrency and cancellation | High | Requests must tolerate DB contention and external provider delays |
| Flexibility for unknown future clients | Medium | Useful, but does not justify speculative infrastructure |
| Throughput and latency | To measure | No technology is selected on an invented performance advantage |

## 2. Backend: Go, Java, and Node.js

Java is considered as a conventional JVM HTTP application; Node.js as a JavaScript/TypeScript server; Go as a compiled service using its HTTP and context facilities. Framework choice is a later implementation decision, so the comparison does not attribute framework-specific behavior to a language.

| Criterion | Go | Java | Node.js |
| --- | --- | --- | --- |
| Programming model | Static typing and explicit error handling; compact service code, but repeated validation must be organized | Static typing with extensive enterprise tooling; framework conventions can reduce or hide boilerplate | JavaScript runtime; TypeScript can add compile-time checks, but input still needs runtime validation |
| Concurrent I/O | Goroutines support concurrent request handling; shared mutable state still needs synchronization [1] | Platform and virtual threads offer thread-oriented concurrency; virtual threads suit many blocking I/O tasks [2] | Event loop supports concurrent I/O; blocking callbacks and CPU-heavy work can delay other requests [3] |
| Cancellation and limits | Request context can propagate deadlines; must be passed into DB and HTTP calls | Thread/framework cancellation and timeouts must be wired consistently | Abort signals, timeouts, and bounded queues must be used consistently |
| Packaging | A compiled executable simplifies the application artifact; OS libraries may still matter with cgo | A JVM runtime and application artifact are typical; image/runtime configuration needs documentation | A runtime and application dependencies are deployed together; lockfiles matter |
| Engineering trade-off | Explicit module boundaries fit the scope; authentication, migrations, and policy still require deliberate implementation | Strong option when team expertise or enterprise integration favors the Java ecosystem | Strong option when a shared frontend/backend language reduces team cost; event-loop discipline remains necessary |
| Flowentra fit | Selected: clear service boundaries and direct control over request lifetimes | Viable alternative; no evidence it is too slow or unsuitable | Viable alternative; no claim that it cannot scale |

**Decision B-01 — Go.** Flowentra benefits from explicit service interfaces, a small deployment unit, and a straightforward HTTP/database integration model. This is a workload and maintainability judgment. Goroutines do not remove race conditions, and compilation does not guarantee low latency. The selected design must limit database connections, propagate cancellation, avoid unbounded goroutines, and use a race detector where appropriate.

Reconsider if team implementation evidence shows substantially greater delivery confidence in Java or TypeScript, or if a mandatory integration depends on another runtime. Confirm the supported Go version and dependencies when implementation begins; this document does not label a particular release as permanently current.

## 3. Database: PostgreSQL, MySQL, and MongoDB

| Criterion | PostgreSQL | MySQL with InnoDB | MongoDB |
| --- | --- | --- | --- |
| Core data model | Relational tables, foreign keys, joins, checks, and transactions [4] | Relational tables and transactional InnoDB storage [6] | Documents with embedding/references; flexible shape requires intentional schema validation [7] |
| Atomic multi-record work | Transactions fit a mutation plus its audit and idempotency records | Transactions also support this workflow; isolation and locking need deliberate choices | Multi-document transactions exist; it is incorrect to describe MongoDB as lacking transactions [7] |
| Booking overlaps | Range types and exclusion constraints directly express non-overlap per employee [5] | Requires a carefully designed locking/serialization strategy or alternative booking representation | Requires a carefully designed document/transaction concurrency strategy; a prior query alone is unsafe |
| CRM relations and reports | Natural fit for client/deal/task relationships and grouped queries | Also a natural fit for relational CRM and grouped queries | Embedding can simplify local reads, but duplicated relationships and cross-collection reports need care |
| Evolution | Explicit migrations make contract changes reviewable; migration/rollback planning still required | Same discipline is required for relational migrations | Flexible documents do not eliminate schema evolution, data cleanup, or version handling |
| Flowentra trade-off | Selected for relational integrity and direct booking constraints | Reasonable alternative; extra booking-concurrency design for this MVP | Reasonable for document-centric workloads; less aligned with this relational MVP |

**Decision D-01 — PostgreSQL.** The decisive fit is integrity, especially expressing overlapping appointment intervals at the database boundary. For one employee and a half-open UTC interval `[start,end)`, an exclusion constraint can reject an overlap while accepting an immediately adjacent booking. Cancelled rows can be excluded from the constraint. PD-04 must specify the actual schema and failure mapping; this comparison alone does not prove concurrency correctness.

PostgreSQL is not claimed to outperform MySQL or MongoDB. The trade-off is that range/exclusion features create database-specific design dependencies. Managed hosting must allow the required `btree_gist` extension; otherwise, the scheduling strategy must be reviewed before implementation. A database change would require reconsidering integrity constraints, migrations, and concurrency tests, not just swapping a driver.

## 4. API communication: REST, GraphQL, and gRPC

These options are not identical categories: REST is an architectural style, GraphQL is a query language and execution model, and gRPC is an RPC framework. The decision compares practical interfaces for the React-to-backend boundary.

| Criterion | REST over HTTP with JSON | GraphQL | gRPC |
| --- | --- | --- | --- |
| Contract | Resource paths, HTTP methods, and OpenAPI request/response schemas [8, 9] | Typed schema and client-selected fields [10] | Service methods and generated messages/stubs, commonly Protocol Buffers [11] |
| React integration | Browser HTTP tools work directly; JSON is easy to inspect | Browser clients can request related fields in one query | Browser access needs a supported gRPC-Web setup; its protocol/runtime differences need attention [12] |
| Data fetching | May over-fetch or require multiple requests; bounded summary endpoints can help | Flexible selection can reduce over-fetching; query depth, cost, and resolver behavior need controls | Explicit message contracts fit service-to-service APIs; schema generation adds build steps |
| Authorization | Route and service checks must also enforce record ownership | Every reachable resolver/data path must enforce equivalent permissions | Every RPC and service call must enforce equivalent permissions |
| Caching and errors | HTTP status codes and headers are familiar; authenticated CRM data should use deliberate private/no-store policy | Caching and partial-error semantics require conventions agreed with the client | Status and metadata conventions differ from JSON HTTP APIs |
| Flowentra fit | Selected for finite CRUD/scheduling workflows and readable review artifacts | Viable if many clients later require varied nested data | Viable for future internal services or streaming needs; not required by this monolith |

**Decision A-01 — REST.** A finite set of clients, deals, tasks, and appointments maps clearly to resource endpoints. OpenAPI supports review and tooling without requiring a running server. REST alone does not define payload validation, pagination, authorization, or retries: PD-04 must specify them explicitly.

Create requests are not automatically safe to retry merely because the interface is REST. HTTP defines method semantics [8]; Flowentra separately proposes an `Idempotency-Key` application contract for selected POST operations. Update preconditions, transaction boundaries, and errors must remain consistent across browser forms and AI-confirmed actions.

## 5. Combined decision and risks

The proposed stack is **React + Go + PostgreSQL + REST/JSON**, deployed initially as a modular monolith. It is a coherent small-system choice, not a claim that alternative stacks are inferior. The backend owns business rules and database credentials. An external AI provider remains behind a constrained adapter; its output cannot bypass those rules.

| Risk or uncertainty | Required response |
| --- | --- |
| Unmeasured team familiarity | Implement and review one vertical slice before expanding all modules |
| Database-specific constraints | Document the migration and run real concurrent booking tests |
| Provider latency and outages | Bound requests and preserve manual CRM operation |
| Security mistaken for framework defaults | Explicitly test role, ownership, session, and input validation rules |
| Unsubstantiated performance expectations | Measure a documented workload; report machine, dataset, concurrency, and p95 separately for AI/non-AI traffic |
| Dependency and version drift | Pin implementation dependencies and validation tools; update through reviewed changes |

No benchmark has been executed. A future experiment should use the same workload and environment for alternatives if a comparative performance claim becomes necessary. Current choices can be defended on requirements without inventing a speed ranking.

## 6. Technical references

Official primary documentation consulted on **2026-10-23**. Capability statements above are sourced; the Flowentra suitability judgments are the author's engineering interpretation. Versioned links anchor semantics and do not mandate an implementation version.

1. Go project, [Frequently Asked Questions](https://go.dev/doc/faq), concurrency and runtime model.
2. Oracle, [Java 21: Virtual Threads](https://docs.oracle.com/en/java/javase/21/core/virtual-threads.html), thread model and use cases.
3. Node.js project, [Don't Block the Event Loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop), blocking and concurrency considerations.
4. PostgreSQL, [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html), integrity constraints.
5. PostgreSQL 18, [Range Types](https://www.postgresql.org/docs/18/rangetypes.html), interval operators and exclusion constraints.
6. Oracle MySQL 8.4, [InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html).
7. MongoDB, [Transactions](https://www.mongodb.com/docs/manual/core/transactions/), document and multi-document atomicity.
8. IETF, [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html), methods, status codes, and idempotence.
9. OpenAPI Initiative, [OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3.html), machine-readable HTTP contracts.
10. GraphQL Foundation, [Learn GraphQL](https://graphql.org/learn/), schemas and client field selection.
11. gRPC project, [Introduction to gRPC](https://grpc.io/docs/what-is-grpc/introduction/), service definitions and generated clients.
12. gRPC project, [gRPC-Web Basics](https://grpc.io/docs/platforms/web/basics/), browser integration.

## 7. Review and provenance

Prepared with AI assistance from the task brief and primary documentation; no old draft was restored. The three decision matrices include three reasonable options each. Aitzhan Iliyas must verify technical interpretations and defend the trade-offs. PD-01 scope approval is a dependency; PD-03 and PD-04 must reconcile any changes introduced by independent review. No supervisor, client, or teammate endorsement is implied.
