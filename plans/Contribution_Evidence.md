# Flowentra CRM AI — Contribution Evidence

| Field | Value |
|---|---|
| Review task | PD-18 — QA Review and Contribution Evidence |
| Review date | 24 October 2026 |
| Repository baseline | `main` at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd` |
| Method | Git commit metadata, branch contents, and accessible GitHub PR metadata |

## Attribution rules and limitations

This record reports Git/GitHub evidence as observed. It does not infer a person's contribution from a task assignment, a name in a document, or a commit message alone. Git author names/emails are user-configurable; GitHub PR authors establish an account-level attribution, not necessarily a verified real-world identity. No individual work percentages are calculated.

The PD-13–PD-17 task prompts assign responsibility for those QA deliverables to Daniil Khvan. That assignment is not sufficient evidence that a particular Git commit was authored by him. All five task commits inspected below use author metadata `2 <3>`. No matching PR was found in the accessible GitHub PR list. Their file additions and commit hashes are verifiable, but real-person authorship is not.

## Contribution evidence

| Contributor | Contribution | Evidence Type | Commit/PR Reference | Verification Status | Limitations |
|---|---|---|---|---|---|
| Daniil Khvan | QA task responsibility for PD-13 through PD-18 was supplied in the respective task briefs. | Task assignment; not Git authorship evidence | PD-13 `f5daed37e785adcb5af8b9eaba8d4487712ef28b`; PD-14 `b5bbce29ba7385f8a5ca53d2f7177ae499049caa`; PD-15 `25b330b2217dd9e0599f756f2bff9ff08a147dc2`; PD-16 `2c45803b16827132f67008699814901ede63d588`; PD-17 `f14d1f9a473b92f7bc7ac03b3654770566725a22` | Assignment verified from task instructions; commit attribution not established | All five commits list author `2 <3>`; no PD-13–PD-17 PR is present in the accessible PR list. Do not credit these artifacts to Daniil without identity evidence. |
| Git author `2 <3>` (identity unresolved) | Added literature review, requirements specification, test cases/strategy/template, verification/evaluation plan, and risk plan/register on separate task branches. | Git commit author metadata and changed-file stats | `f5daed37e785adcb5af8b9eaba8d4487712ef28b`; `b5bbce29ba7385f8a5ca53d2f7177ae499049caa`; `25b330b2217dd9e0599f756f2bff9ff08a147dc2`; `2c45803b16827132f67008699814901ede63d588`; `f14d1f9a473b92f7bc7ac03b3654770566725a22` | Commits and files verified; contributor identity unresolved | Author string/email do not identify a student or account. PRs were not found; documents remain on unmerged branches. |
| Git author `2 <3>` (identity unresolved) | Added the PD-18 QA review summary, contribution evidence, and review checklist. | Git commit author metadata and changed-file stats | `e4130bf3ba60afa2a4eb379cde66557398aaedec` | Commit and files verified; contributor identity unresolved | Same non-identifying author metadata as PD-13–PD-17; no PD-18 PR was present in the accessible PR list. Do not attribute this work to Daniil without additional identity evidence. |
| GitHub user `Rumm1` | Authored PRs #1–#6 covering proposal, technology comparison, architecture, API/backend design, AI design, and repository-readiness documentation. | GitHub PR author, changed-file metadata, merge state; relevant Git commit metadata | [PR #1](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/1), [PR #2](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/2), [PR #3](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/3), [PR #4](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/4), [PR #5](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/5), [PR #6](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/6) | Account-level PR authorship and merged status verified | Repository documentation associates `Rumm1` with Aitzhan Iliyas, and sampled Git commits show `Iliyas Aitzhan`; this review does not independently authenticate the real-world identity or assign a percentage. PR descriptions say independent review was pending; see the QA review summary. |
| Git author `Iliyas Aitzhan` / GitHub user `Rumm1` | PD-01 initial proposal and follow-up clarification; PD-06 link correction. | Git author metadata and PR #1/#6 descriptions | `754ccad48a0c838569673f053a5915f71250de18`; `fc1c5db473620a21e64a59db38b9ac0e72ae4ef9`; `6052d3c0f3f9f87224881ae58e05d8e3ce74f327`; [PR #1](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/1), [PR #6](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/6) | Commit authorship and PR references verified | Account-to-person mapping is reported as repository documentation, not independently verified identity. These are design/readiness artifacts, not application implementation. |
| GitHub user `aibagalmbekov-alt` | Added PD-08 interview guide, note template, and simulated interview summary. | Git commit author and open PR metadata; file contents | Commit `88e4fc82e3369bcae586d12828f1dcc10e34b22e`; [PR #7](https://github.com/Rumm1/Flowentra-diploma-crm-ai/pull/7) | Account-level authorship and files verified; PR open | Summary states four fictional simulations and zero real respondents. This is not evidence of fieldwork, user validation, or supervisor feedback. No PR review/checks were found at inspection time. |
| `AI-assisted Draft Preparation` (unverified identity) | Historical import of a pre-defense draft package, including an explicitly blank supervisor-feedback template. | Historical Git commit metadata and file list | `9ccfcb63f3650cb751d98f16968a5a468e071046` | Commit and author string verified; identity not attributable | Email is `ai-assisted-draft@invalid.example`; the historical feedback template explicitly states no feedback/approval was present. The template is absent from current `main`. |

## PR and review records

- GitHub PR listing returned PRs #1–#7. PRs #1–#6 are merged; PR #7 is open.
- The available PR listing contained no PR for PD-13, PD-14, PD-15, PD-16, or PD-17.
- PR #1 review data contains an automated Codex review and two unresolved review threads. PRs #2–#6 had no human review records returned by the review endpoint. PR #6 has a Codex bot summary for an earlier commit, not independent human review.
- PR #7, authored by `aibagalmbekov-alt`, has no review records, review comments, or check runs returned at inspection time.
- An empty or absent review record does not prove no discussion occurred outside GitHub; this report only claims what the accessible records establish.

## Supervisor feedback

Supervisor feedback was not available in the inspected project materials. The current README says no feedback or approval is claimed, and the submission checklist says supervisor/academic approval remains to be obtained. The historical draft's `docs/11_Supervisor_Feedback.md` is a blank template that explicitly states that no feedback or approval was present in its supplied sources; it is not on current `main`.
