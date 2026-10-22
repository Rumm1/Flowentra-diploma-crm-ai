# 7. Architecture and Required Diagrams

The proposed system is a **modular monolith** for a small service business, not a deployed microservice architecture. The following three diagrams correspond to the university's first pre-defense requirement. Editable `.dot` and `.puml` sources, plus readable `.svg` exports, are in `diagrams/`.

## 7.1 System Context Diagram

**Actors:** Business owner/admin; manager; employee. All use a browser. An external AI provider receives a limited request through the backend AI gateway. PostgreSQL is a platform data store; it is not accessible from the browser. Clients are recipients of business services, but a separate customer-facing portal is not in MVP.

Diagram: `diagrams/01_System_Context.svg` and `diagrams/01_System_Context.dot`.

## 7.2 Use Case Diagram

**Use cases:** Sign in; manage clients; track deals; manage assigned tasks; schedule/modify appointments; view reports; draft AI actions; approve/reject proposed action; manage staff permissions. `Approve/reject proposed action` is a separate use case, not an invisible step in chat output. A `.puml` UML source is included for reuse in PlantUML.

Diagram: `diagrams/02_Use_Cases.svg`, `diagrams/02_Use_Cases.dot` and `diagrams/02_Use_Cases.puml`.

## 7.3 Component Diagram (draft)

**Presentation layer:** React/TypeScript SPA and API adapter.  
**Application layer:** REST controller, authentication/authorization middleware; clients, deals, tasks, booking, reports and AI proposal/confirmation services.  
**Infrastructure layer:** PostgreSQL and guarded outbound LLM API client.

There must be **one authoritative business-rule implementation** in backend services. The frontend and AI component may request actions but cannot bypass it. The AI provider gets minimized, permission-filtered context and cannot call database directly.

Diagram: `diagrams/03_Components.svg` and `diagrams/03_Components.dot`.

## 7.4 Request / action sequences

**Ordinary booking:** browser `POST /bookings` → authentication and role check → validate time interval → transaction and database conflict check → persist confirmed booking → return 201 or 409 → update calendar.

**AI-assisted booking:** browser sends text → AI orchestration extracts typed candidate fields → server validates proposal schema and stores a temporary proposal → frontend displays proposed staff, client, time, service and a **Confirm** button → user approves → same authenticated booking service re-checks all invariants → creates booking or returns conflict. AI denial, refusal or provider timeout **cannot** mutate state.

## 7.5 Data model (initial)

- `users(id, organization_id, role, display_name, status, password_hash, created_at)`
- `clients(id, organization_id, name, email, phone, notes, created_at, updated_at)`
- `deals(id, organization_id, client_id, owner_user_id, title, stage, amount_minor_nullable, created_at)`
- `tasks(id, organization_id, client_id_nullable, assignee_id, title, due_at, status, created_at)`
- `services(id, organization_id, name, duration_min)`
- `bookings(id, organization_id, client_id, employee_id, service_id, starts_at, ends_at, status, created_by)`
- `ai_proposals(id, organization_id, requester_id, action_type, payload_json, status, expires_at, created_at)`
- `audit_events(id, organization_id, actor_id, object_type, object_id, operation, occurred_at)`

`organization_id` is reserved for segregation and future evolution, but full cross-tenant SaaS is not a validated MVP deliverable. Remove or simplify this dimension only after explicit decision and migration planning.

## 7.6 Booking integrity constraint (illustrative SQL, not executed)

```sql
-- PostgreSQL example; apply after table types/status enum finalized.
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE bookings ADD CONSTRAINT prevent_overlapping_confirmed
EXCLUDE USING gist (
  organization_id WITH =,
  employee_id WITH =,
  tstzrange(starts_at, ends_at, '[)') WITH &&
) WHERE (status = 'confirmed');
```

This is a design example only; it requires a compatible finalized schema, data cleanup and migration tests. If a multi-employee or service-room model is chosen, adjust the resource key and scope.

## 7.7 Security / deployment boundaries

Passwords are hashed with a suitable modern password-hashing scheme; session/refresh mechanisms require a reviewed threat model. Transport must use HTTPS in production. Authentication and permissions are enforced on every server route and again at the AI confirmation endpoint. Secrets are never stored in Git. Logs remove customer contact content and LLM secrets. Availability of the external model is nonessential to ordinary CRM operations.

## 7.8 External contracts

The initial REST endpoint specification and example JSON responses are provided in `api/openapi.yaml`. These are **draft API contracts**, not claims that deployed endpoints exist.
