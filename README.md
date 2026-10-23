# Flowentra

**AI-Powered Business Management and CRM Platform** — diploma project.

Flowentra proposes a shared client directory, owned deals/tasks, employee appointment scheduling, management reports, and a permission-constrained AI assistant for small service businesses. AI can prepare task/appointment creation for explicit confirmation; manual CRM workflows remain available. Conversational access is an integration choice, not a claim of a new CRM category.

## Current evidence and limitations

The clean baseline is `1c5ca651592767674a8221130d19690fb43ac9ae`. PD-01–PD-06 are separate design/readiness changes for independent review. **These artifacts do not establish a working backend, frontend prototype, database deployment, or AI integration.** Passing an OpenAPI validator proves contract structure, not endpoint implementation.

The proposed MVP serves one organization with fixed admin/manager/employee roles. Clients are records, not portal accounts. Multi-tenancy, payments, recurring bookings, external calendars, bulk exports, and autonomous AI actions are out of scope. Telegram, WhatsApp, and Instagram are proposed future extensions only.

## Team and ownership

| Person | Responsibility | Evidence boundary |
| --- | --- | --- |
| Aitzhan Iliyas (`Rumm1`) | Backend and AI integration; PD-01–PD-06 | Task changes require student verification and independent review |
| Aibek Galymbekov | Frontend and UX; new PD-10 prototype | No current prototype URL; no completion claimed |
| Daniil Khvan | QA and testing | No runtime/acceptance results supplied; no completion claimed |
| Gulnur Shuteyeva | Supervisor named in baseline README | No feedback or approval claimed |

Independent review is requested from Aibek or Daniil. Their exact GitHub usernames are pending verification. Do not assign an unverified account or overwrite another student's files without coordination.

## Proposed technology stack

| Layer | Selection | Purpose |
| --- | --- | --- |
| Browser | React | CRM forms and AI confirmation UI |
| Backend | Go modular monolith | Authentication, policy, CRM, scheduling, reports, AI orchestration |
| Database | PostgreSQL | Relational integrity, transactions, booking exclusion constraints |
| API | REST/JSON; OpenAPI 3.0.3 | Reviewable browser/backend contract |
| AI | Provider-neutral external adapter | Bounded structured intents; no unrestricted database access |
| Artifact validation | Pinned Node.js tools in PD-04 | Contract validation, not a backend runtime dependency |

PD-02 explains trade-offs. No performance measurement is claimed. Production versions and deployment infrastructure require a reviewed implementation plan.

## Documentation and review navigation

Task PRs are independent and unmerged. Links below use exact task commits, so they do not imply that the files are already on `main` or in this PD-06 checkout. After reviewed integration, maintainers can use relative links.

| Task | Artifact | Review |
| --- | --- | --- |
| PD-01 | [Proposal and MVP](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/fc1c5db473620a21e64a59db38b9ac0e72ae4ef9/docs/01_Project_Proposal.md) | [PR #1](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/1) |
| PD-02 | [Technology comparison](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/9a4eb83f4f9e90477acfd3c3e77ac3679334e487/docs/05_Technology_Comparison.md) | [PR #2](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/2) |
| PD-03 | [Architecture](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/35a9a3fcf045190a555a20c26f4c583c1477c52c/docs/07_Architecture.md), [DOT/SVG/PNG diagrams](https://github.com/Rumm1/Flowentra-diploma-crm-ai/tree/35a9a3fcf045190a555a20c26f4c583c1477c52c/diagrams) | [PR #3](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/3) |
| PD-04 | [OpenAPI](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/1b81c15b1d254f3bdce6068fa6e169b930b74339/api/openapi.yaml), [backend design](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/1b81c15b1d254f3bdce6068fa6e169b930b74339/docs/Backend_Design.md) | [PR #4](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/4) |
| PD-05 | [AI integration and security](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/403a2b0a33cb96156a78ca7eb3924d44eb8ec44b/docs/AI_Integration_and_Security.md) | [PR #5](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/5) |
| PD-06 | [Submission checklist](docs/00_Submission_Checklist.md), [contribution guide](CONTRIBUTING.md), [PR template](.github/pull_request_template.md) | This branch; see [open PRs](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pulls) |

Review dependencies run from PD-01 scope through PD-02 decisions, PD-03 architecture, PD-04 API, PD-05 AI rules, and PD-06 readiness. PRs use disjoint files. Reconcile upstream review changes before integrating downstream artifacts. Open PRs are not approvals; no PR should be merged without independent review.

## Repository structure

This is the combined artifact layout **after reviewed integration**, not a claim that all paths are on the baseline:

```text
.github/pull_request_template.md
api/openapi.yaml
diagrams/
  01_System_Context.dot / .svg / .png
  03_Component_Diagram.dot / .svg / .png
docs/
  00_Submission_Checklist.md
  01_Project_Proposal.md
  05_Technology_Comparison.md
  07_Architecture.md
  Backend_Design.md
  AI_Integration_and_Security.md
scripts/validate_openapi.cjs
package.json
package-lock.json
CONTRIBUTING.md
README.md
```

Future Go/frontend source, migrations, deployment configuration, and runtime tests are not delivered by these tasks. Document-number gaps follow the assignment and do not imply other work is complete.

## Viewing the prototype and artifacts

**No current application prototype is available.** The user confirmed that the previous prototype was removed during repository initialization. Aibek owns the new prototype in PD-10. Do not restore `initial-ai-draft` as a substitute. After PD-10 review, add its verified revision, prerequisites, run command, demonstration steps, and URL here.

For now, read the linked Markdown, open SVG/PNG exports in a browser/image viewer, and inspect OpenAPI in a compatible local viewer. These are design artifacts, not runtime screenshots or deployment evidence. No application startup command has been verified.

To reproduce PD-04 validation in an isolated checkout:

```sh
git clone --branch pd-04-backend-api https://github.com/Rumm1/Flowentra-diploma-crm-ai.git flowentra-api-review
cd flowentra-api-review
npm ci --ignore-scripts
npm run validate:api
```

Observed environment: Node.js 24.11.0, npm 11.6.1. Where PowerShell blocks `npm.ps1`, use `npm.cmd`. The validator checks schemas/references, example occurrences, and selected contract conventions; it does not execute an API, database, or model. PD-03 contains DOT rendering instructions.

## Workflow and project links

Use task branches, meaningful commits, actual timestamps, and independent review. The timing policy and disclosed fallback are in [CONTRIBUTING.md](CONTRIBUTING.md). Never commit directly to `main`, force-push `main`, merge without review, or create `pre-defense-1` before the reviewed submission is ready.

- [GitHub repository](https://github.com/Rumm1/Flowentra-diploma-crm-ai)
- [Taiga project board](https://tree.taiga.io/project/rumm1-flowentra-1/kanban)
- Exact PD-01–PD-06 task URLs: **pending / unverified**; do not invent IDs.
- Remaining pre-defense work: [submission checklist](docs/00_Submission_Checklist.md).

AI-assisted material requires student verification and must be explainable at defense. No interviews, approvals, benchmarks, teammate contributions, or runtime results are inferred from these documents.
