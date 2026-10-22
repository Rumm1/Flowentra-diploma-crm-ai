# 5. Technology Comparison and Architecture Decision Rationale

**Status:** Alternatives evaluated qualitatively against the proposed MVP requirements, not with measured performance benchmarks. Official documentation should be checked at the implementation stage for exact library and security versions. Scores below are planning judgments, not objective measurements.

## 5.1 Decision criteria

- **K1 Engineering fit:** typed handlers, testability, familiar tooling for a three-person team.
- **K2 Data correctness:** transactions, constraints, and predictable consistency for concurrent bookings.
- **K3 Security:** manageable authentication, authorization and data boundaries.
- **K4 Complexity / delivery risk:** feasibility within the diploma schedule.
- **K5 Future integrations:** API documentation and ability to evolve without rewriting the UI.

The initial technology preferences (Go, PostgreSQL, REST, React/TypeScript/Vite/Tailwind) are grounded in team justification documents. Selection below is **proposed** and should be recorded as architectural decisions in Git.

## 5.2 Decision A — backend platform (3 alternatives)

| Option | Strengths | Trade-offs | Decision |
|---|---|---|---|
| Go (net/http with optional Gin) | Lightweight deployment, simple concurrency and strong standard testing library; aligns with identified backend role | Manual handling of some enterprise conventions; discipline required for validation | **Preferred** |
| Node.js + NestJS | Shared TypeScript with frontend; productive typed REST patterns | Runtime and dependency surface; different concurrency/reliability profile | Valid alternative |
| Java + Spring Boot | Mature ecosystem and robust enterprise framework | Extra framework and JVM complexity for constrained MVP | Valid alternative |

**Rationale:** Since the backend engineer plans to work in Go, using Go reduces ramp-up risk and supports explicit booking transactions. This is not a claim that Go is universally faster. A small modular monolith is easier to test than premature microservices.

## 5.3 Decision B — persistent storage (3 alternatives)

| Option | Strengths | Trade-offs | Decision |
|---|---|---|---|
| PostgreSQL | Transactions, referential integrity, exclusion constraints and mature tooling | Schema migrations must be planned | **Preferred** |
| MySQL | Mature SQL RDBMS with transactions | Interval collision guarantee may require more application/locking design | Valid alternative |
| MongoDB | Flexible document storage | Relational CRM records and booking invariants add modeling/transaction complexity | Not preferred for core domain |

**Rationale:** Clients, deals, tasks, staff and bookings are closely related and require consistent updates. A PostgreSQL exclusion constraint or equivalent transaction design protects bookings even against simultaneous requests. The exact database constraint is an implementation proposal to be tested, not already built.

## 5.4 Decision C — component interaction (3 alternatives)

| Option | Strengths | Trade-offs | Decision |
|---|---|---|---|
| REST + JSON + OpenAPI | Browser-friendly, inspectable, testable with ordinary HTTP tooling | Needs endpoint/version discipline | **Preferred** |
| GraphQL | Flexible client-selected querying | Schema/authorization and caching are more complex for the first milestone | Defer |
| gRPC | Strict contracts and efficient service-to-service calls | Browser integration requires gateway and adds complexity | Defer |

**Rationale:** There is initially one web frontend and one backend. REST with structured error responses, OpenAPI definitions and idempotency keys covers MVP needs at lower integration complexity.

## 5.5 Decision D — frontend platform (3 alternatives)

| Option | Strengths | Trade-offs | Decision |
|---|---|---|---|
| React + TypeScript + Vite | Component ecosystem; matches frontend engineer's proposed stack | State organization and accessibility need active attention | **Preferred** |
| Vue + TypeScript + Vite | Fast UI development and approachable component patterns | Team change cost; alternate ecosystem | Valid alternative |
| Angular + TypeScript | Prescriptive full framework, mature enterprise structures | Heavier setup for short-scope MVP | Valid alternative |

**Rationale:** Use React with reusable forms/tables, type-safe API adapters and explicit loading/empty/error states. Tailwind CSS may be used for presentation, but accessibility and component states are a requirement independent of CSS framework.

## 5.6 Decision E — AI-action execution strategy (3 alternatives)

| Option | Benefits | Risks | Decision |
|---|---|---|---|
| Typed LLM proposal + allowlisted server handler + human confirmation | Natural-language interaction with auditable mutations | Model may propose incorrect fields; needs benchmarks | **Preferred** |
| Strict rule/keyword interpreter | Transparent, low-cost and easy to predict | Poor coverage for varied language | Evaluation baseline |
| Direct LLM-to-database or arbitrary API execution | Appears flexible | Dangerous; bypasses validation, authorization and approval | **Rejected** |

**Non-negotiable constraint:** the LLM has no DB credentials. All data mutations go through authenticated application services. Proposed actions are signed/short-lived server-side records or otherwise re-validated at confirmation time; untrusted text is never executed as SQL. Fail closed if model output is malformed.

## 5.7 Consequences, ADRs and explicit assumptions

- Start with a modular monolith: auth, clients, deals, tasks, scheduling, reports and AI-orchestration modules behind one API.
- Use a relational PostgreSQL schema with migrations in a single controlled sequence.
- Document one canonical API contract and acceptance checks; do not allow frontend and AI logic to duplicate business rules.
- For booking writes, rely on a database-backed transactional invariant rather than only a calendar free-slot check.
- Future server hosting, CI, costs, provider agreements and data retention must be specified before real production deployment.

See: `docs/adr/ADR-0001-Modular-Monolith.md`, `ADR-0002-AI-Confirmation.md`, and `docs/07_Architecture.md`.
