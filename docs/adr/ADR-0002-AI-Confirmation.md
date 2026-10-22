# ADR-0002 — AI proposes, application validates, human confirms (proposed)

Date: 2026-10-22 (proposal drafting)  
Status: **Proposed — not approved or implemented**

## Context
A language model may misunderstand users, fabricate fields, or be manipulated by instructions inside customer text. A CRM write is an accountable business action, not ordinary text generation.

## Decision
AI accepts a limited, minimized context and returns a typed draft (`CREATE_TASK`, `CREATE_BOOKING`, `DRAFT_REPLY`). The server validates schema, tenant/role scope and target objects. Any mutating action requires a human review/approval interaction; confirmation repeats authorization, resource availability, proposal-expiry and idempotency checks before invoking an existing application service. The LLM never gets DB credentials or direct write privileges.

## Alternatives
Pure rule-based intent parser as a baseline, or unrestricted LLM direct API/SQL execution (explicitly rejected).

## Trade-offs
Adds interactions and implementation cost; improves auditability and gives a testable safety boundary. Human approval does not itself guarantee correctness, so negative and adversarial tests remain mandatory.
