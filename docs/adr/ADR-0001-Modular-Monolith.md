# ADR-0001 — One modular Go REST backend (proposed)

Date: 2026-10-22 (proposal drafting)  
Status: **Proposed — not approved or implemented**

## Context
Three-person diploma team, one web client, related business domains (clients, deals, tasks, booking, reports, AI proposal), need end-to-end transactional correctness and manageable integration.

## Decision
Use a modular monolith with Go backend, REST/JSON/OpenAPI and PostgreSQL. Separate feature modules in the codebase but initially deploy one backend. The frontend is React + TypeScript. Contracts are versioned and tested.

## Considered alternatives
Node.js/NestJS, Java/Spring Boot; GraphQL or gRPC; premature separate microservices. See `docs/05_Technology_Comparison.md`.

## Consequences
Positive: simpler local run, fewer distributed consistency issues. Negative: requires enforced module boundaries and deliberate refactor if scaling proves necessary. This is a decision **pending supervisor/team approval**, not a fact about any existing code.
