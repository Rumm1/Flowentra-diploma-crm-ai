# Business Management and CRM Platform with an Embedded AI Assistant

**Astana IT University — Software Engineering, SE-2417**  
**First pre-defense: 24 October 2026**  
**Supervisor:** Gulnur Shuteyeva  
**Status:** Requirements/research/architecture **draft** + interactive static UX prototype. **Not** a completed or deployed application.

## Team and responsibility

| Member | Role | Planned scope |
|---|---|---|
| Aitzhan Iliyas | Backend Developer and AI Integration Engineer | Go/PostgreSQL REST architecture, clients/deals/tasks/bookings, transaction rules, guarded AI integration |
| Aibek Galmbekov | Frontend Developer | React/TypeScript UI, UX, forms, permissions display, API integration, AI confirmation |
| Daniil Khvan | QA Engineer | Test strategy/cases, regression, permission and booking tests, AI risk/robustness evaluation |

## Problem / target users

For small service businesses, client information, deal status, follow-up tasks and booking schedules may be split across multiple tools. The project will study whether a more coherent workflow is useful for owners, managers and employees. This is a **hypothesis awaiting interviews**, not an asserted finding.

## Scope and expected outcome

MVP: staff authentication and permissions; CRM clients and deal pipeline; assigned tasks; staff/service booking with server-side conflict prevention; basic reports; AI assistant that produces a typed, user-reviewable action draft and only executes allowed mutations after renewed backend authorization and confirmation. Expected outcome is a testable vertical slice with reproducible measurements, not a promise of commercial deployment.

Out of MVP: payroll, accounting/payment flows, multi-branch ERP, customer mobile apps, autonomous AI writes.

## Technology selections (proposed)

- **Backend:** Go, PostgreSQL, REST/OpenAPI.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS.
- **AI:** LLM API behind a guarded proposal/confirmation gateway.
- **Project tools:** GitHub/GitLab and YouTrack; Figma for UX design.

An initial local Git `main` branch and AI-assisted draft-import commit are included in the Git-ready distribution. **No remote GitHub repository, YouTrack project, user accounts, production deployment, or authentic student-contribution history has been created.**

## Submission documents

- Main English report: `deliverables/CRM_AI_PreDefense_Report_EN.docx` (PDF also included).
- Defense presentation: `deliverables/CRM_AI_PreDefense_Slides_EN.pptx` (PDF also included).
- Russian unpacking/completion guide: `00_НАЧНИ_ЗДЕСЬ.md`.
- GitHub publication: `GITHUB_И_СДАЧА_ЗАВТРА.md` and `PUBLISH_TO_GITHUB.ps1` (requires owner authentication).

## Folder structure

```text
.
├── deliverables/          English DOCX + PDF report and PPTX + PDF slides
├── docs/                  00 submission check + 11 numbered deliverables, ADRs
├── evidence/              blank genuine-user interview/client consultation templates
├── diagrams/              editable .dot/.puml and readable .svg/.png
├── prototype/             standalone clickable HTML/CSS/JS mock
├── api/                   draft OpenAPI contract (not running)
├── tests/                 test cases (Not run)
├── plans/                 proposed YouTrack backlog, risks, contribution forms
├── .github/               pull request template
├── CONTRIBUTING.md        truthful Git review and contribution process
└── SUBMISSION_STATUS.md   real links/approvals to enter before stage tag
```

## How to explore the current deliverables

**Prototype:** open `prototype/index.html` directly in a modern browser. Navigate Clients, Deals, Tasks, Bookings, AI Assistant and Reports. All records are **synthetic/in-memory**, reset on reload. **No real backend or AI service is connected.**

**Diagrams:** open `diagrams/*.svg` in the browser; source is `.dot` and `.puml`. Regenerate with Graphviz, for example:

```bash
dot -Tsvg diagrams/01_System_Context.dot -o diagrams/01_System_Context.svg
```

**API draft:** read `api/openapi.yaml` with an OpenAPI viewer; do not attempt requests unless a backend is actually implemented.

**Testing:** see `docs/09_Verification_and_Evaluation_Plan.md` and `tests/Test_Cases.csv`. Every test currently has execution status `Not run`.

**Git & YouTrack:** create actual remote repository and YouTrack project, grant all members/supervisor access, import or manually create authentic tasks from `plans/YouTrack_Backlog.csv`, develop through real branches and peer-reviewed PRs. See `docs/10_Project_Management_and_Risks.md`. Add real links to `SUBMISSION_STATUS.md`, then create the immutable `pre-defense-1` tag at the exact reviewed submission commit.

## University deliverables

`docs/01` Proposal • `02` Relevance evidence • `03` Literature review (13 scholarly sources) • `04` 4 existing systems × 9 criteria • `05` 5 technology choices × 3 alternatives • `06` Requirements + priorities + AC • `07` 3 diagrams • `08` UX prototype • `09` Evaluation plan/baseline • `10` Project management and risks • `11` Supervisor feedback template.

See **`docs/00_Submission_Checklist.md`** for strict distinction between drafted contents and human-only outstanding evidence.

## Research ethics and authenticity

No interview was fabricated, no client agreement or supervisor sign-off was invented, and no historical Git contribution or test run is claimed. Keep customer names/contacts out of Git; supplied demo `@example.org` records are synthetic. Competitive descriptions cite original vendors and literature references link to scholarly venues.

## Project stage and limitations

This archive is a prepared first-stage **document package**, not an operational commercial system. A complete application is not required by the university at this stage; analysis/design and **authentic** progressive contributions are required.
