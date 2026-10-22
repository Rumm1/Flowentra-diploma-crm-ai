# 1. Project Proposal and Scope

**Working title:** Development of a Business Management and CRM Platform with an Embedded AI Assistant  
**Programme:** Software Engineering, SE-2417  
**Team:** Aitzhan Iliyas — Backend Developer and AI Integration Engineer; Aibek Galmbekov — Frontend Developer; Daniil Khvan — QA Engineer  
**Supervisor:** Gulnur Shuteyeva  
**Submission stage:** First pre-defense, 24 October 2026  
**Status:** Draft proposal for supervisor validation; not evidence of implemented code.

## 1.1 Problem statement

Small service-oriented businesses often work with client contact details, sales opportunities, follow-up tasks and service bookings in separate tools or spreadsheets. In such a fragmented workflow, staff may re-enter client information, lose the link between a customer request and a later appointment, and struggle to maintain an auditable history of changes. These are **project hypotheses**, not yet verified findings about any particular business. Section 2 specifies how they will be tested by interviews and observation.

Existing CRM vendors already offer many relevant features; the project does not claim that integrated CRM or AI assistance is a novel software category. The engineering question is whether a coherent, limited-scope solution can reliably connect a client's inquiry to a recorded CRM action, a non-conflicting appointment or task, and an intelligible report while making AI-generated proposals controllable by a human operator.

## 1.2 Aim

To design, implement and empirically evaluate a web-based CRM and business-workflow platform for a small service business, integrating a language-model assistant that proposes structured actions but does not bypass server-side authorization or user confirmation.

## 1.3 Specific objectives

1. Study actual small-business workflows and validate the requirements with at least three to five user representatives, or document a substantive agreement with a real client.
2. Compare contemporary research, four existing platforms and alternative architectural technologies.
3. Define verifiable functional/non-functional requirements and trace them to tests.
4. Design a modular, testable architecture with a relational data model and documented REST API.
5. Develop role-aware web interfaces for clients, deals, tasks, service bookings, reports and an AI-assistant proposal/confirmation flow.
6. Implement transactional booking conflict prevention, request validation, and server-enforced role checks.
7. Evaluate quality with reproducible functional, concurrency, security, usability and AI-tool-safety scenarios against a manual-workflow baseline.

## 1.4 Intended users and stakeholders

- **Business owner / administrator:** manages employee access and reviews aggregated activity.
- **Manager:** maintains clients, opportunities, task assignment and service bookings.
- **Employee:** handles assigned clients, tasks and bookings subject to granted permissions.
- **Client/customer:** provides an inquiry or requests a service; direct customer self-service is **out of MVP scope** unless user evidence changes this.
- **Supervisor and diploma committee:** assess design, technical rigor, contribution and evaluation.

The first deployment assumption is **one service business**. Multi-company tenant isolation is a future design consideration, not a confirmed MVP requirement. This assumption must be confirmed with user representatives and the supervisor.

## 1.5 Scope boundaries

### In scope (proposed MVP)

- Staff sign-in and authorization by roles.
- Client contact records and customer interaction notes.
- Deal pipeline and stage updates.
- Assigned tasks with due dates and status changes.
- Service calendar and bookings with server-side anti-overlap checks.
- Reports showing counts and status breakdowns from stored records.
- AI-assistant: extracts a user intent, produces a typed proposed action or answer draft, exposes it for verification, and executes **only allowed operations after explicit approval** where a mutation is requested.
- Audit events for important changes; API documentation; automated testing and evaluation.

### Out of scope for the first milestone

Payroll, payment processing, accounting, multi-branch ERP, marketing campaigns, mobile apps, voice calls, direct autonomous messaging to customers, automatic AI financial calculations, unreviewed AI mutations, and production-scale enterprise deployment. These are candidate enhancements only.

## 1.6 Proposed primary user journey

A manager receives a customer request → finds or creates a client record → creates a deal and follow-up task → checks staff availability → creates a service booking → sees it in the calendar → reads the status in a report. As an alternative interface, the manager can ask the AI assistant to draft a task or booking from a natural-language instruction; the assistant provides a structured preview, and the server re-checks permission and booking availability **after** the human confirms.

## 1.7 Expected outcomes / deliverables

**Engineering artifacts:** version-controlled frontend and backend, database schema and migrations, OpenAPI specification, editable diagrams, prototype, automated tests, deployment instructions.  
**Research artifacts:** evidence-of-relevance records, literature review, comparisons, requirements traceability, evaluation dataset and results.  
**Demonstration:** reproducible end-to-end walkthrough showing one complete customer request, optional AI draft, confirmed staff action, persistence and reporting.

## 1.8 Research questions

- **RQ1:** Can the proposed integrated workflow reduce median completion time relative to a documented manual/spreadsheet workflow in controlled representative tasks?
- **RQ2:** Can the booking design maintain zero accepted overlapping confirmed bookings under concurrent requests?
- **RQ3:** What proportion of an annotated set of user utterances does the assistant correctly turn into safe, permission-compliant action proposals?
- **RQ4:** Can target users complete common CRM scenarios with acceptable usability as measured by task success and SUS?

## 1.9 Success criteria (targets, not measured findings)

- Functional acceptance tests pass for all P0 requirements.
- Zero unauthorized state mutations in the defined negative-role and AI safety test corpus.
- Zero accepted appointment conflicts in a controlled concurrent-request test.
- At least 85% correct structured AI proposals on the team-curated evaluation set (target to validate).
- Median guided task completion time at least 20% below the documented manual baseline **if confirmed by paired evaluation** (hypothesis, not promised benefit).
- SUS target ≥70 in the selected pilot, reported with the number of respondents and uncertainty; do not treat this small pilot as statistically representative.

## 1.10 Assumptions, dependencies and decision gates

- A representative service business can be recruited for ethical, consenting user research; otherwise the lack of validated evidence must be disclosed.
- The final AI model provider, terms of use and treatment of personal data need explicit approval before live-data use.
- Team capacities, hosting and budget are not confirmed; no financial feasibility claim is made.
- **Supervisor gate:** approve MVP exclusions, problem framing, evaluation thresholds and whether one-business or multi-business support is required.

**Origin:** Team roles, project title, candidate stack and module intentions come from the three team justifications. Workflow hypotheses, milestones, exclusions and numeric targets are proposed design decisions, not facts from the team documents.
