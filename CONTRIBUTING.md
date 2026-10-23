# Contributing to Flowentra

## 1. Ownership and coordination

Aitzhan Iliyas owns backend/AI work, Aibek Galymbekov owns frontend/UX and the new PD-10 prototype, and Daniil Khvan owns QA/testing coordination. Confirm assignments on the [Taiga board](https://tree.taiga.io/project/rumm1-flowentra-1/kanban). Exact task links and reviewer GitHub usernames must be verified, not invented. Work on another student's files requires coordination. The README records responsibility, not completed contribution credit.

Use English for documentation. Identify and critically review legitimately reused material. Do not restore the old AI draft into `main`, rewrite history to hide it, or attribute generated material to a teammate. AI-assisted explanations, references, and code must be checked by the responsible student.

## 2. Git and PR workflow

1. Inspect Git status, branch, remotes, and the reviewed baseline. Preserve unrelated changes; use an isolated worktree when needed.
2. Work on a task branch and document dependencies. The initial PD tasks use baseline `1c5ca65` and disjoint paths; drafting does not require merging another unreviewed PR.
3. Review the complete diff, run relevant checks, exclude secrets/dependencies/temporary files, and record actual results. Stage only inspected paths.
4. Apply the completion/review/commit policy below. Use the configured contributor identity; never alter author/committer dates to simulate activity or impersonate anyone.
5. Push the task branch and open a separate PR with files, decisions, evidence, limitations, task reference, dependencies, and reviewer request.
6. Obtain independent review, resolve findings in meaningful corrective commits, and reconcile upstream contract changes before dependent PRs merge.
7. Mark a Taiga item Done only after acceptance and required review. A commit, open PR, or AI-generated checklist is not approval.

Never commit directly to `main`, force-push `main`, merge without independent review, or create empty/duplicate commits to increase activity. If GitHub access is unavailable, stop remote operations, preserve the local work, and report the blocker.

| Task | Branch | Required initial commit subject |
| --- | --- | --- |
| PD-01 | `pd-01-project-proposal` | `PD-01: Define Flowentra project proposal and MVP` |
| PD-02 | `pd-02-technology-comparison` | `PD-02: Document technology evaluation and decisions` |
| PD-03 | `pd-03-system-architecture` | `PD-03: Design system architecture and diagrams` |
| PD-04 | `pd-04-backend-api` | `PD-04: Define backend REST API specification` |
| PD-05 | `pd-05-ai-integration` | `PD-05: Design secure AI integration architecture` |
| PD-06 | `pd-06-repository-readiness` | `PD-06: Prepare repository for pre-defense review` |

Additional commits must represent separately verifiable corrections or work. Prefer upstream review in order PD-01, PD-02, PD-03, PD-04, PD-05, PD-06. This does not authorize automated merging. If files overlap, coordinate or explicitly stack the dependent PR; do not silently copy unrelated task commits into its diff.

## 3. Completion and commit timing

Task completion does not immediately trigger a commit. Record actual draft completion as T0, then use approximately 20–25 minutes for substantive verification: acceptance coverage, sources, diagrams/specification checks, cross-document consistency, full diff, secrets, and file isolation. Commit only when checks pass; extend review beyond 25 minutes if corrections require it. Never falsify timestamps or wait merely to inflate activity.

If an agent cannot reliably maintain the window, disclose the limitation and prepare changes for a real user-approved commit. Do not claim a scheduled commit happened without evidence. In this PD-01–PD-06 session, the agent disclosed that six successive windows could not be guaranteed; the user then explicitly instructed it to continue with real commits, pushes, and PRs. The commits use actual Git timestamps under that fallback. **They are not evidence of completed 20–25-minute windows.** No persistent background schedule was configured. The original timing policy remains the default for later work unless explicitly changed by the user.

Record completion time, actual commit time/SHA, files, validation, PR URL, and remaining issues. Use a timezone offset; project reporting uses Asia/Qyzylorda (`+05:00` for this session). Corrections during review and independent review status must be reported honestly. Do not configure persistent scheduled commit jobs without explicit approval.

## 4. Development conventions

These are future implementation requirements, not claims that the code already exists:

- Go: separate transport, policy, service, and persistence; use `gofmt`, propagated contexts/deadlines, parameterized queries, and bounded resources. Run relevant `go test` and race checks once packages exist.
- API: change OpenAPI and explanatory documents together; preserve auth/ownership, standardized errors, cursor semantics, version preconditions, and idempotency. Add contract/integration evidence for behavior changes.
- Database: review migrations, constraints, lock order, and rollback/recovery. Test concurrent bookings against PostgreSQL; mocks cannot prove exclusion behavior.
- Frontend coordination: agree errors, conflicts, timezone display, inaccessible records, and exact AI confirmation fields with Aibek.
- Testing: separate plans from observed results; record commands, versions, fixtures, environment, outcomes, and failures. Do not claim Daniil executed tests without evidence.
- Security: keep secrets out of Git, screenshots, logs, prompts, and PRs. Use synthetic data; model output cannot bypass service permissions.
- Documentation: link primary sources, date verification, distinguish design from implementation, and avoid unsupported novelty/performance claims. Future Word artifacts must use Times New Roman, 12 pt, Automatic text color.

## 5. Available artifact checks

On PD-04 or after its reviewed integration:

```sh
npm ci --ignore-scripts
npm run validate:api
```

Use `npm.cmd` where PowerShell blocks `npm.ps1`. This is design validation, not application startup. Review DOT with regenerated SVG/PNG exports, check links, and run `git diff --check` or `git diff --cached --check`. Do not describe static checks as end-to-end tests.

## 6. Submission integrity

Use [the submission checklist](docs/00_Submission_Checklist.md) as an evidence register. Do not fabricate interviews, client consent, supervisor feedback, deployment, runtime results, benchmarks, or teammate work. Pending task links/reviewer usernames may be explicitly disclosed in PRs as authorized by the user; resolve them for final traceability. Create `pre-defense-1` only after the reviewed submission is ready and authorized.
