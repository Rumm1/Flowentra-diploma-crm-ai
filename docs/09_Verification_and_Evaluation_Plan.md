# Flowentra CRM AI — Verification and Evaluation Plan

| Field | Value |
|---|---|
| Task | PD-16 — Verification and Evaluation Plan |
| Responsible student | Daniil Khvan |
| Document status | Proposed plan; evaluation not performed |
| Branch | `pd-16-verification-plan` |
| Repository baseline | `main` at `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd` |
| Requirements baseline | PD-14 commit `b5bbce29ba7385f8a5ca53d2f7177ae499049caa`, currently on the unmerged [`pd-14-requirements` branch](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/pd-14-requirements/docs/06_Requirements.md) |
| Test strategy baseline | PD-15 commit `25b330b2217dd9e0599f756f2bff9ff08a147dc2`, currently on the unmerged [`pd-15-test-cases` branch](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/pd-15-test-cases/tests/Test_Strategy.md) |
| Literature review | PD-13 commit `f5daed37e785adcb5af8b9eaba8d4487712ef28b`, currently on the unmerged [`pd-13-literature-review` branch](https://github.com/Rumm1/Flowentra-diploma-crm-ai/blob/pd-13-literature-review/docs/03_Literature_Review.md) |

## 1. Purpose and scope

This plan defines how Flowentra's proposed requirements and product value should be verified and evaluated when an executable build is available. It separates:

- **Verification:** objective evidence that an implemented component satisfies an approved requirement, contract, or design.
- **Evaluation:** evidence about whether the product and its AI-assisted workflows are useful, usable, reliable, and fit for intended staff.

The plan covers the proposed single-organization MVP: staff authentication and fixed roles; shared clients; assigned deals and tasks; employee appointments; management reports; and a bounded AI assistant for authorized lookup, summaries, and human-confirmed task or appointment proposals. External messaging channels, multi-tenancy, payments, recurring bookings, autonomous AI actions, and other future scope are excluded.

The three upstream deliverables are separate, unmerged task branches. Requirement IDs and test-case IDs below are taken from those exact commits; they are not yet a single integrated release baseline. The baseline must be reconciled after review and merge, and any changed requirement or API contract must be traced to updated tests before evaluation.

## 2. Evaluation objectives

1. Determine implementation compliance with each approved PD-14 acceptance criterion.
2. Verify API, authorization, persistence, audit, and failure behavior at the relevant layer.
3. Evaluate whether staff can complete representative CRM tasks accurately and with less effort than their documented current workflow.
4. Assess AI structured output quality separately from security, authorization, and action safety.
5. Measure performance and reliability against approved workloads and explicitly provisional targets.
6. Preserve reproducible, privacy-safe evidence; make no claim of success without results tied to a build.

The PD-13 literature synthesis supports layered evaluation of workflow outcomes, software quality, and AI safety; it cautions that results from other CRM, automation, and language-model studies do not establish benefits for Flowentra. It also supports evaluating structured outputs against human-reviewed expected outcomes and validating them independently rather than treating plausible generated text as evidence. These findings inform the proposed method only; they are not Flowentra-specific results.

## 3. System under evaluation

The repository describes a proposed React browser client, Go modular-monolith backend, PostgreSQL persistence, REST/JSON API described by OpenAPI 3.0.3, and an optional provider-neutral AI adapter. A single application process is intended to contain authentication/policy, identity, CRM, scheduling, reporting, AI orchestration, audit, transport, and persistence modules.

The design documents and OpenAPI contract are not an implementation. At the inspected baseline, there is no Go or React source, deployable service, database migration/schema, live API, AI model/provider integration, or runtime/acceptance test suite. The only executable project check is the static OpenAPI validator. No prototype URL or running demonstration is available. Consequently, this document specifies future evaluation activities; it records no product result.

The AI design proposes eight bounded intents: client lookup, task listing, client summary, report summary, task proposal, appointment proposal, clarification, and refusal. It specifies no public AI endpoint or selected provider/model. Writes are to require explicit, actor-bound confirmation through ordinary authorized services. These capabilities and safeguards are design intent only until implemented and tested.

## 4. Verification strategy

### 4.1 Layered methods

| Method | Objective and scope | Procedure | Required environment and data | Measurement and success criteria | Evidence and limitations |
|---|---|---|---|---|---|
| Requirements verification | Establish that each approved requirement is unambiguous, traceable, testable, and reflected by the build. | Review each PD-14 acceptance criterion with its linked PD-15 test; execute the test against a named build; classify each criterion as Pass, Fail, Blocked, Not Run, or Not Applicable with rationale. | Versioned requirements, test inventory, release commit, stakeholder decisions, isolated build and synthetic fixtures. | Report passing criteria / executed criteria and passing criteria / all applicable criteria separately. A mandatory criterion is satisfied only with execution evidence and a pass; documents alone cannot establish implementation compliance. | Trace matrix, test logs, defects, approved decisions. Current requirements are proposed and unmerged; no runtime build exists. |
| Unit testing | Check isolated validation, authorization predicates, state transitions, serializers, calculations, and AI schema handling. | Run deterministic tests for valid, invalid, boundary, and fault inputs; measure coverage as supporting—not substitutive—evidence. | Implementation source, pinned language/toolchain, mock clock and provider, synthetic fixtures. | Every critical branch and rule has an assertion; all tests pass on the candidate commit. Coverage thresholds require project approval and do not prove correctness. | Test report, coverage output, commit and tool versions. No unit suite/source is present now. |
| Integration testing | Verify module/service interaction, transaction boundaries, session lifecycle, audit, idempotency, and provider boundary. | Exercise real internal interfaces and disposable database with injected provider responses and failures. Verify committed state as well as HTTP responses. | Running backend, applied migrations, disposable PostgreSQL, deterministic clock and mock AI provider. | All linked integration cases pass; rejected/failed operations leave no prohibited partial state or unauthorized side effect. | Sanitized requests, responses, database assertions, logs, test run. No integration environment exists now. |
| API testing | Compare endpoint behavior to the reviewed OpenAPI contract and role/error semantics. | Send positive, invalid, boundary, unauthorized, stale-version, duplicate/retry, and pagination requests; verify headers, schemas, status, and persisted side effects. | Live non-production API, versioned OpenAPI, synthetic accounts and records, test credentials. | Every approved contract case passes; invalid writes do not mutate data; actual responses match contract. Static OpenAPI validation is not this test. | Client collection/script output, request IDs, response samples with secrets removed, linked defect reports. No live API exists now. |
| System and acceptance testing | Verify complete user workflows against end-to-end acceptance criteria. | Execute all applicable mandatory cases through the browser and API, including positive, negative, role-specific, empty, loading, retry, and recovery states. | Release candidate, supported browser, UI/API deployment, synthetic end-to-end fixtures, agreed user workflows. | Every mandatory acceptance criterion has a recorded result; no unresolved P0 issue remains; failures and blocked cases are explicitly dispositioned. | Build identifier, test report, screenshots/logs with synthetic data, defects. No frontend or running system exists now. |
| Regression testing | Detect recurrence after changes to code, schema, contract, or prompt/policy. | Run focused tests for changed components, then the full affected P0 and cross-module suite; rerun all safety cases after AI changes. | Candidate commit, test automation, versioned test data and requirements. | All previously passing affected mandatory tests remain passing; all changes trace to tests and defects. | Before/after results, changed-file mapping, commit references. No automated runtime regression suite exists now. |
| Security testing | Verify authentication, server-side RBAC/ownership, privacy boundaries, input/error handling, and safe AI action controls. | Execute PD-15 direct-API cross-role/cross-user cases; inspect storage/logging; test hostile inert text, rate limits under approved policy, provider payload minimization, prompt injection, and unauthorized actions. | Isolated non-production system, synthetic accounts/canary secrets, configured origins, authorized test plan, mock provider. | All mandatory security cases pass; no unauthorized disclosure/mutation or secret exposure; every denial leaves protected business state unchanged. | Sanitized request/response evidence, restricted audit/log excerpts, test report, defects. Static review and contract annotations do not prove server enforcement; no runtime controls are presently verifiable. |
| Database integrity verification | Verify data constraints, transactions, references, concurrency, retries, and failure recovery. | Use disposable PostgreSQL and direct service/API tests for valid/invalid foreign keys, uniqueness, exact money values, overlap races, stale updates, repeated requests, rollbacks, and response-versus-storage consistency. | Versioned migrations and application, disposable database, independent state queries, synchronized test clients. | Every declared invariant is enforced at the persistence/service boundary; failed requests create no partial or duplicate prohibited state; response and committed state agree. | Migration version, before/after queries, transaction/audit logs, test results. No schema or migration is present now; no hard-delete API is specified. |
| Usability evaluation | Assess representative staff ability to complete common workflows and interpret errors/AI confirmations. | Conduct moderated, task-based sessions using equivalent scenarios and a pre-registered baseline protocol; record outcomes and short post-task feedback. Apply SUS only after participants complete the relevant workflow. | Reviewed prototype/build, representative participants, consent, synthetic scenarios, consistent script and recording process. | Report completion, time, errors, assistance and feedback by task/role; assess against targets approved before data collection. Do not infer usability from developer inspection. | Anonymized task sheets, timings, questionnaire calculations, facilitator notes. No prototype or participant data is available now. |
| AI output evaluation | Quantify structured candidate correctness and separately verify schema, grounding, safety, and human-facing usefulness. | Freeze a held-out synthetic evaluation set and prompt/model/config; compare parsed output to independently reviewed gold slots; run security tests separately. | Implemented orchestrator, identified provider/model/version, test-only credentials, mock or controlled non-production endpoint, synthetic corpus and rubric. | Report schema validity, case exactness, slot-level precision/recall/F1, and safety violations with denominators. The 85% correctness goal is proposed, not achieved or binding until approved. | Dataset version/hash, configuration, raw sanitized outputs, gold labels, rater decisions, scripts and score report. There is no AI implementation or evaluation set now. |
| Performance and reliability | Measure API latency/error behavior, load response, AI latency, and recovery from dependency failures. | Run the approved fixed workload on documented hardware; repeat identical runs; inject controlled timeouts and outages; report service and AI paths separately. | Stable release build, isolated deployment/database, specified hardware, synthetic data, load generator, mock/approved provider. | Compare measured percentiles/error rates to approved criteria; p95 <500 ms under 20 concurrent users and 1,000 synthetic clients is a proposed non-AI target only. No measured result is claimed. | Raw sanitized measurements, environment manifest, load scripts, run summary, incident logs. Network, provider, hardware, and test-data differences constrain generalization. |

### 4.2 Verification outcome vocabulary

Use the PD-15 vocabulary: `Not Run`, `Passed`, `Failed`, `Blocked`, and `Not Applicable`. A `Passed` result requires a named build, actual execution, expected and observed outcomes, and retained evidence. `Blocked` requires a specific prerequisite that prevented execution. `Not Applicable` requires an approved scope rationale. Documentation review, design inspection, and static contract validation must not be reported as runtime passes.

For each failure or partial compliance, record the requirement ID, acceptance criterion, test case ID, build, actual result, severity/priority, and linked defect. A requirement is **partial** only when its criteria are separately assessed and at least one criterion passes while at least one fails or remains blocked; preserve each criterion result instead of averaging them into a pass. Missing implementation is reported as `Not Implemented` in the evaluation summary and `Not Run` for an unexecutable runtime test, not as a failed execution or an assumed pass.

## 5. Functional evaluation

The PD-14 acceptance criteria are the oracle only after stakeholder review/approval. For each requirement:

1. Freeze the approved requirement and identify its criterion(s), scope, priority, implementation status, and dependency.
2. Link each criterion to one or more PD-15 tests. Use the case IDs from the baseline table below; add a case before testing if coverage is missing.
3. Execute against the exact candidate build and capture observable API/UI outcomes and state changes.
4. Record individual criterion results. A listed test ID is traceability, not evidence of execution.
5. Record missing, partial, contradictory, or untestable behavior as a gap/decision/defect, with an owner and retest condition.

### Requirement-to-test traceability baseline

The mapping below reuses PD-14 IDs and PD-15 IDs. The tests and requirements remain on separate unmerged branches at this document's baseline.

| Requirement ID | Area | Test case ID |
|---|---|---|
| FR-AUTH-001 | Login | TC-PD15-AUTH-001 |
| FR-AUTH-002 | Session lifecycle | TC-PD15-AUTH-002 |
| FR-AUTH-003 | Password change | TC-PD15-AUTH-003 |
| FR-AUTH-004 | Initial administrator bootstrap | TC-PD15-AUTH-004 |
| FR-RBAC-001 | Role/operation/field permissions | TC-PD15-RBAC-001 |
| FR-RBAC-002 | Ownership and cross-user isolation | TC-PD15-RBAC-002 |
| FR-RBAC-003 | Restricted fields and administrator invariant | TC-PD15-RBAC-003 |
| FR-RBAC-004 | Non-disclosing missing/inaccessible resources | TC-PD15-RBAC-004 |
| FR-RBAC-005 | Account administration and directory | TC-PD15-RBAC-005 |
| FR-CLIENT-001 | Client create/search/list | TC-PD15-CLIENT-001 |
| FR-CLIENT-002 | Client update/archive/restore | TC-PD15-CLIENT-002 |
| FR-DEAL-001 | Deal creation and validation | TC-PD15-DEAL-001 |
| FR-DEAL-002 | Deal transitions and conditional update | TC-PD15-DEAL-002 |
| FR-TASK-001 | Task creation and assignment | TC-PD15-TASK-001 |
| FR-TASK-002 | Task transitions and conditional update | TC-PD15-TASK-002 |
| FR-APPT-001 | Appointment input and time boundaries | TC-PD15-APPT-001 |
| FR-APPT-002 | Overlap exclusion and concurrency | TC-PD15-APPT-002 |
| FR-APPT-003 | Reschedule/cancel lifecycle | TC-PD15-APPT-003 |
| FR-REPORT-001 | Bounded reports and access | TC-PD15-REPORT-001 |
| FR-AI-001 | Bounded intents and retrieval | TC-PD15-AI-001 |
| FR-AI-002 | AI output schema and grounding | TC-PD15-AI-002 |
| FR-AI-003 | Explicit, bound, one-time confirmation | TC-PD15-AI-003 |
| FR-AI-004 | AI/provider failure behavior | TC-PD15-AI-004 |
| NFR-SEC-001 | Credential/token protection | TC-PD15-SEC-001 |
| NFR-SEC-002 | Input and error safety | TC-PD15-SEC-002 |
| NFR-SEC-003 | Inert rendering and configured-origin CORS | TC-PD15-SEC-003 |
| NFR-SEC-004 | Approved rate limits | TC-PD15-SEC-004 |
| NFR-REL-001 | Retry/idempotency and preconditions | TC-PD15-REL-001 |
| NFR-REL-002 | Dependency failure handling | TC-PD15-REL-002 |
| NFR-PERF-001 | Non-AI response-time target | TC-PD15-PERF-001 |
| NFR-USAB-001 | Visible UI states and recovery | TC-PD15-USAB-001 |
| NFR-USAB-002 | Time-zone/DST interaction | TC-PD15-USAB-002 |
| NFR-USAB-003 | Accessibility evaluation | TC-PD15-USAB-003 |
| NFR-MAINT-001 | Static contract validation | TC-PD15-MAINT-001 |
| NFR-DATA-001 | Persistence invariants | TC-PD15-DATA-001 |
| NFR-PRIV-001 | AI data minimization | TC-PD15-PRIV-001 |
| NFR-AUD-001 | Audit atomicity and redaction | TC-PD15-AUD-001 |

Current trace limitations: the mapping is proposed-baseline coverage, not proof that the acceptance criteria are approved or tests executed. The static validator case covers only contract artifacts. AI-proposal behavior has no public endpoint in the current OpenAPI contract and requires an implementation/API contract before runtime acceptance testing.

## 6. AI accuracy evaluation methodology

### 6.1 Objective and evaluation boundary

Evaluate whether the proposed assistant produces correct, schema-valid structured candidates for its supported intents and whether read-only responses are supported by authorized retrieved records. Score action-safety and authorization independently from semantic quality. A high correctness score cannot compensate for an unauthorized disclosure or mutation.

The current repository contains only a proposed design. No provider, model, prompt, orchestrator, evaluation corpus, or observed output exists. All steps here are future protocol; no accuracy or safety result is claimed.

### 6.2 Dataset construction and controls

- Build a versioned, held-out set of synthetic prompts after the intent schema, target user population, and evaluation question are approved. Do not use real customer records, credentials, production transcripts, or personal data.
- Include every supported intent and cases covering clear requests, paraphrases, omitted/ambiguous fields, invalid values, boundary values, ambiguous time expressions, unsupported actions, conflicting instructions, injected instructions, unauthorized references, stale context, and provider-format failures. Keep normal quality prompts and adversarial/safety cases labeled separately.
- Include only cases with a well-defined expected response and sufficient synthetic context. Exclude cases where the intended answer cannot be determined, duplicate prompts without a distinct evaluation purpose, and prompts whose expected answer depends on unapproved policy. Report excluded counts/reasons.
- Freeze the corpus, rubric, model/provider/version, system prompt, tool configuration, temperature/sampling parameters, schema version, retrieval snapshot, and scoring script before the evaluation run. Separate development examples from held-out evaluation examples; do not tune prompts on the held-out results and then report the same run as independent evaluation.
- Determine and document the corpus size before collection using the intended scope and available resources; no sample size is established by this plan. Report all eligible, excluded, executed, invalid, and missing-output counts. Do not silently discard errors or retries.

### 6.3 Reference answers and independent review

For each case, define the expected intent or refusal/clarification, required fields and their exact canonical values, permitted source references, and any prohibited extra action. Two reviewers independently create or verify the gold record using the approved requirement and synthetic context. Reviewers must not see model output while authoring labels. Resolve disagreement by documented adjudication before scoring; preserve original labels, rationale, adjudicated value, and version. A reviewer may be a project stakeholder or domain reviewer, but must not be represented as an independent expert unless that role is verified.

### 6.4 Metrics and scoring rules

Score each output in the following separate dimensions:

| Metric | Calculation | Interpretation |
|---|---|---|
| Schema validity | Number of outputs presented as structured candidates that parse and satisfy the exact versioned schema ÷ all outputs presented as structured candidates. A controlled error/refusal outside the candidate schema is reported separately as fallback; also report candidate/fallback/provider-failure counts over all prompts attempted. | Measures structural conformance, not truth or authorization. Report malformed, missing, and extra-field counts. |
| Case-level exact correctness | Number of actionable cases for which intent and every required canonical field are correct, with no unsupported extra action ÷ all eligible actionable cases submitted to the system. A missing response, timeout, or provider failure remains in the denominator and is not a correct case. Incorrect, missing, or extra required/action fields make that case incorrect. | Strict end-to-end correctness for structured task/appointment suggestions. Report per intent and pooled result with numerator and denominator. |
| Field-level precision | Correctly predicted required-slot values ÷ all predicted slot values. An unsupported or incorrect predicted slot is a false positive. | Shows whether supplied fields are trustworthy. |
| Field-level recall | Correctly predicted required-slot values ÷ all gold required-slot values. An omitted or incorrect slot is a false negative. | Shows completeness. |
| Field-level F1 | `2 × precision × recall ÷ (precision + recall)`; if either denominator is zero, report the component as undefined and state the count rather than silently substituting zero. | Balances completeness and correctness; report per slot and intent, not only a pooled score. |
| Exact-field match | Correct canonical predictions ÷ gold required slots for that field. | Makes errors in different fields visible (for example, owner, client, due time, appointment instant, timezone). |
| Safe refusal/clarification | Correct controlled refusal/clarification outcomes ÷ eligible unsupported, ambiguous, or unsafe cases submitted. Missing responses and uncontrolled outputs remain in the denominator and are incorrect. | Assesses abstention separately; do not combine it with actionable-case accuracy. |
| Unauthorized action/disclosure | Count of unauthorized retrievals, sensitive disclosures, or mutations observed in the safety set. | Report raw counts and test denominator; mandatory criterion is zero observed violations in the tested set, not a claim of zero risk. |

For slot matching, compare IDs against the server-resolved gold entity, timestamps as UTC instants, and timezone names separately. Normalize only according to a written, frozen field-specific rule (for example, Unicode NFC and schema-defined trimming); do not use fuzzy similarity to turn an incorrect entity, amount, date, or status into a correct result. Unknown output fields or additional actions fail schema/safety checks.

For a wrong value in a required slot, count one false positive for the supplied value and one false negative for the missing gold value; for a missing value, count one false negative; for an unsupported extra value, count one false positive. Pool micro-averaged slot counts only when explicitly labeled as pooled and also report each intent and field separately. For binomial proportions (schema validity, exact case correctness, and safe refusal), report a 95% Wilson confidence interval as well as numerator and denominator; do not claim statistical significance from the interval alone.

The proposed **85% structured-suggestion correctness goal** is a target only, not an approved binding criterion or achieved result. Unless stakeholders approve another rule, interpret it as `case-level exact-correct actionable cases / eligible actionable cases submitted >= 0.85`, reported separately for task and appointment intents with the denominator and 95% Wilson interval. Do not count clarifications/refusals as correct actionable suggestions. A run with no eligible cases has no score. The project must approve the dataset size and whether this goal is appropriate before using it for acceptance.

### 6.5 Human review and quality categories

Two reviewers blinded to model/configuration assess each read-only answer for factual support, completeness, clarity, and whether cited source handles point to authorized retrieved records. Use a fixed anchored rubric (e.g., 1 = unsupported/incorrect, 3 = partially supported or incomplete, 5 = fully supported and clear); retain component scores instead of collapsing them into one unqualified accuracy number. Report distributions, exact reviewer agreement, quadratic-weighted Cohen's kappa for ordinal ratings when its assumptions are met, disagreements, and adjudications. For structured candidates, reviewers adjudicate gold labels, not model quality impressions.

Categorize every error as intent classification, missing field, wrong field/entity, unsupported field/action, temporal/timezone error, schema/serialization error, grounding/source error, unauthorized retrieval/disclosure, unsafe proposal/confirmation behavior, refusal/clarification failure, provider failure, or human-scoring disagreement. Report semantic-quality errors separately from security/safety incidents.

### 6.6 Reproducibility and privacy

Record corpus and scoring-script hashes, sanitized prompt/context identifiers, model/provider/version, prompt and schema versions, configuration, time, sampling settings, retrieval fixture, request IDs, output, retries, and adjudication. Store credentials outside source control; restrict access to evaluation artifacts. Use synthetic content only and redact secrets from captured logs. Provider terms, processing location, retention, deletion, and training-use settings must be reviewed before any real data is sent.

Limitations include model nondeterminism/provider changes, synthetic-to-real distribution shift, evaluator subjectivity, small or convenience-sampled corpora, prompt leakage, and the fact that passing finite safety tests does not establish absence of risk.

## 7. Baseline methodology

No product workflow or current performance baseline is available at the inspected repository state. The baseline must be measured after an incumbent workflow is selected and before comparing Flowentra.

### Workflow comparison

- **Baseline condition:** the participant's current approved CRM/manual process for the same task, documented by version and configuration. If no comparable current process exists, record “no comparable baseline”; do not substitute a hypothetical workflow or the API contract.
- **Flowentra condition:** the implemented build and exact path recorded. Separate manual UI use from AI-assisted use; compare the manual route with baseline manual work and compare AI-assisted task/appointment workflows as a distinct condition.
- **Candidate task set:** client creation/search, deal update, task creation, appointment scheduling, and report generation are in the proposed API/MVP design. They are not currently supported by a running product; run only after the relevant implementation exists. AI comparison is limited to proposed supported lookups, summaries, and task/appointment proposals, and only after implementation.
- **Participant selection:** recruit people who perform CRM work in the intended small service-business context; seek role coverage for relevant staff responsibilities and record experience level. Exclude developers/test authors from primary user-value estimates where practicable; retain them only as a separately labeled formative cohort. Record recruitment and exclusions without unnecessary personal data.
- **Training:** provide the same written scenario and a fixed, timed orientation for each condition; record training time and do not include it in task completion time. Any additional assistance is recorded.
- **Order and scenario control:** use a within-participant comparison when feasible; counterbalance condition order. Use equivalent synthetic data variants to reduce learning and memory effects. Keep starting state, task goal, and information available comparable.
- **Repetitions:** planned protocol is one unscored familiarization and three scored trials per task per condition, using equivalent variants in randomized/counterbalanced order. This is a proposed procedure, not a completed sample or measured result; the final burden and scenario count require stakeholder approval and must be fixed before data collection.
- **Failure handling:** a failed or abandoned task remains a failure in task completion rate. Include elapsed time to termination as a separate value; do not treat it as a successful completion time. Record interruptions and protocol deviations; exclude a trial only under pre-defined reasons and report all exclusions.

The 20% time reduction is a proposed objective only. For each task and condition, calculate each participant's median of valid completed trial times across that participant's scored repetitions. Calculate the median baseline and Flowentra participant medians and the paired reduction:

`reduction (%) = 100 × (median of participant baseline medians − median of participant Flowentra medians) / median of participant baseline medians`

Report the paired participant differences and an exploratory 95% percentile bootstrap interval that resamples participants (not individual trials) with a fixed, recorded random seed. Report the median and interquartile range of times, participant/trial counts, exclusions, and task completion rate (`successfully completed assigned trials / all assigned trials`). Record a user-error count as observable user actions corrected, retried, or resulting in an incorrect state; report the denominator of assigned trials and record facilitator help separately. A positive result is not evidence of a 20% reduction unless the estimate meets the proposed target under a pre-approved analysis rule. Do not pool unlike tasks, roles, or manual/AI modes into a single opaque figure. A zero or missing baseline median makes the percentage undefined and must be reported as such.

Potential biases include participant familiarity, order/learning effects, novelty, differing data quality, time pressure, facilitator assistance, self-selection, small convenience samples, and comparing unlike baseline tools. Record these in the report.

## 8. Task-time measurement

For every scored trial, start timing when the facilitator presents the task and the participant begins acting; stop when the participant submits the final action and the system visibly confirms the intended persisted result. A result not visibly confirmed is not a completed task, even if a server-side write is later found. Separately record post-submit confirmation delay where needed to diagnose perceived latency.

Record task ID, condition, anonymized participant/role code, order, trial number, start/end timestamps, outcome, error count, assistance, interruption, and reason for termination. Prefer screen/event timestamps with a monotonic clock; verify timestamps against the same reference clock. Do not include facilitator setup or training in task time. Report median, interquartile range, minimum/maximum, sample count, and completion/error rates by task and condition. Keep raw trial data; do not remove outliers after seeing results. If a pre-registered exclusion applies, report excluded values and rationale.

## 9. Data integrity verification

Run only on an isolated disposable database after implementation/migrations exist. For each test, preserve pre-state, request, response, committed state, and audit evidence. Verify:

1. **References and validation:** submit valid and invalid client/user links, inactive references, invalid decimal/timezone/enum/length values, and boundary-valid values. Confirm database and API agree on accepted values.
2. **Duplicates and repeated requests:** repeat creates with the same and different idempotency keys/bodies, including concurrent calls. Verify the documented replay/conflict behavior and inspect row counts, responses, and audit events. Do not assume every POST is idempotent.
3. **Transactions and partial failures:** inject failure during multi-write operations and audit persistence. Verify rollback of all coupled state and no success-shaped cached replay.
4. **Concurrent updates:** race updates using the same ETag and appointment-overlap requests. Verify one valid winner or the documented conflict, no lost update, and consistency after reload.
5. **Update/archive/cancel/deactivation:** compare the returned representation and version to persisted state; verify history retention. The current design has no hard-delete endpoint; test archive/cancel/deactivate semantics, not an invented deletion contract.
6. **Recovery:** retry after known and unknown timeout outcomes using the documented key/precondition behavior; verify no duplicate record, audit event, or unintended transition.
7. **Database-to-API consistency:** read the committed record through an independent service/API path and compare canonical fields, relationships, timestamps, and status. Never edit test results manually to make them match.

A check passes only when the expected constraints hold in both observable responses and persisted state, all relevant transactions complete/rollback as required, and sanitized evidence identifies the migration/build and database version. The repository currently has no implemented schema or constraint set to verify.

## 10. Security evaluation

Security verification must be authorized, scoped, and confined to non-production systems with synthetic records. Follow the PD-15 security and RBAC cases:

- Test missing, invalid, expired, revoked, and underprivileged credentials; test role and ownership checks through direct API calls, not just hidden UI controls.
- Attempt cross-employee record access, forbidden fields, directory overexposure, report access by employees, and account administration by non-admin roles. Confirm no protected data or state change on denial.
- Inspect password/session storage, transport configuration, headers, errors, request logs, audit logs, CORS, and rendered hostile text using synthetic canary values.
- Verify rate limits only after limits are approved; do not treat OpenAPI role annotations as enforcement.
- For AI, test prompt injection and unauthorized/stale references with synthetic context, provider data minimization, strict tool boundaries, actor-bound proposal confirmation, expiry, replay, and reauthorization. Any unauthorized data access or action is a mandatory failure irrespective of average quality metrics.

Evidence comprises test scripts, sanitized status/body/header samples, controlled account/role setup, state snapshots, and restricted redacted logs. This plan is not authorization for external penetration testing, and finite test coverage is not a security certification.

## 11. Usability evaluation

Conduct formal sessions only after a reviewable prototype/build and task flows are available. Obtain informed consent and use anonymized participant codes and synthetic CRM records. The facilitator reads a fixed scenario without coaching; record completion, time, user errors, requests for help, recovery, and observed confusion. Follow each task with a short neutral feedback prompt (what was difficult, what was unclear, and what the participant expected). Keep facilitator notes separate from objective task outcomes.

If SUS is selected, administer its standard 10-item questionnaire after a participant has used the evaluated system, using the standard five-point response scale and original item wording. Score each odd-numbered response as response minus 1 and each even-numbered response as 5 minus response; sum the adjusted values and multiply by 2.5 to report a 0–100 SUS score. Do not interpret it as a percentage or combine it with task success. A questionnaire with any unanswered item receives no total SUS score; report the incomplete response count separately. Report response count, score distribution, and whether feedback concerns the manual or AI workflow. A conventional benchmark may be shown for context, but no SUS acceptance threshold is approved in this plan.

Developer inspection and automated accessibility scans are formative evidence only. They do not replace representative-user sessions, keyboard testing, screen-reader evaluation, or stakeholder approval of the target accessibility level. NFR-USAB-003 currently requires target confirmation.

## 12. Performance and reliability evaluation

The project proposal identifies a **proposed** non-AI target: p95 below 500 ms with 20 concurrent users and 1,000 synthetic clients. It is not an approved SLA or measured result. Confirm stakeholder approval and define hardware, software, endpoint mix, data distribution, network path, warm-up, steady-state period, and acceptable error rate before judging pass/fail. Measure AI latency separately because external provider/network behavior is different.

For each agreed API operation, measure client-observed and server-side latency where possible from request start to complete response; state which metric is used. Calculate percentiles using the nearest-rank rule (`rank = ceil(p × n)`, using the sorted value at that 1-based rank). Define error rate as unexpected HTTP outcomes, transport errors, and timeouts divided by all requests attempted; report expected business rejections separately. Report count, p50, p90, p95, p99, maximum, status/error rate, timeouts, and dependency latency. Use a fixed workload and synthetic dataset; execute three independent runs under comparable conditions and preserve all run results. Do not discard slow/error requests from latency summaries without also reporting them and the exclusion rule. Report database latency separately from API latency; AI provider wait, orchestration, and total end-to-end AI latency separately.

Reliability tests should inject provider timeout/error, database unavailability, audit failure, and uncertain client timeout in a disposable environment. Measure recovery behavior, explicit error/fallback, lost/duplicate writes, and time to return to service if a recovery target has been approved. Verify manual CRM use remains available when AI is unavailable as specified. No MTBF, availability, recovery-time, or AI-latency target is established by current evidence; set targets only after deployment constraints and stakeholder approval.

## 13. Test environment

### Available now

- `api/openapi.yaml` (design contract) and the Node-based `npm run validate:api` static validator.
- Node.js/npm artifacts in the repository; the latest observed local validation should record actual versions at execution time.
- PD-14 requirements, PD-15 test strategy/cases, and PD-13 literature review on separate task branches.
- No running app, browser prototype, database, schema/migration, model/provider, runtime test harness, deployment profile, or benchmark infrastructure.

### Required for planned evaluation

| Component | Required configuration and evidence |
|---|---|
| Application | Candidate commit/build, startup/deployment instructions, frontend/backend versions, feature flags, and approved API contract. |
| Database | Selected PostgreSQL version, migration revision, disposable database, deterministic fixture/cleanup scripts, and access restricted to test operators. |
| AI | Selected provider/model/version and region, test-only secret management, prompt/schema/tool versions, deterministic mock mode, timeout/retry policy, and approved privacy/retention review before any real-data use. |
| Test tools | Pinned unit/integration/API/browser/load tools and exact versions; commands recorded. Do not present tools that are not selected/installed as current dependencies. |
| Environment | OS, CPU, memory, runtime, database resource limits, network conditions, browser/time zone settings, clocks, and relevant service configuration. |
| Data | Synthetic unique records and role fixtures; no real personal or confidential data. Version and hash the test corpus/seed where appropriate. |
| Security | HTTPS outside local development, secret handling, least-privilege test accounts, restricted logs, and explicit non-production scope. |

Currently executable repository check: `npm run validate:api`. No application startup or runtime-test command is available. Do not invent a command for a future Go/React implementation.

## 14. Data collection and analysis

For every run, record task/test IDs, requirement IDs, commit/build, environment versions, configuration, start time, operator, inputs/fixture version, expected result, observed result, status, duration where relevant, request/correlation IDs, defect link, and evidence location. Apply data minimization: use synthetic content and anonymized participant codes; store any consent records separately with access control.

Preserve raw observations and derive summary statistics using versioned scripts or documented calculations. Report denominators, missing values, exclusions, failures, and uncertainty. For paired task-time comparisons, retain participant-level paired outcomes and report the planned difference calculation. For AI results, retain per-case/per-slot outputs and labels, not just one pooled score. Do not claim statistical significance unless the design, assumptions, analysis method, and sample size justify it.

## 15. Success criteria

These criteria are planned gates, not completed results. Approval status and evidence must be recorded for each before release evaluation.

| ID | Classification | Criterion | Required evidence |
|---|---|---|---|
| SC-01 | Mandatory | Every approved mandatory MVP acceptance criterion is mapped to a test and executed on the named candidate; no mandatory criterion is silently omitted or treated as passed from documentation. | Approved requirement baseline, trace matrix, execution report, build/commit, and linked defects. |
| SC-02 | Mandatory | All P0 authentication, authorization, cross-user isolation, data-integrity, transaction, and AI action-safety cases pass; no unresolved critical/high security or integrity defect remains. | Actual API/UI/runtime test evidence, state/audit checks, security review and defect disposition. |
| SC-03 | Mandatory | Failed writes, duplicate/retry cases, and dependency failures follow approved contracts and leave no unauthorized or partial state. | Request/response captures plus independent committed-state and audit assertions. |
| SC-04 | Mandatory | Every executed AI mutation requires valid, actor-bound explicit confirmation and current permission/state recheck; zero unauthorized action/disclosure is observed in the defined test set. | Versioned safety cases, mock/provider outputs, confirmation logs, authorization checks, and denominators. |
| SC-05 | Mandatory | All evaluation reports identify build, environment, denominator, missing/excluded data, status, and evidence; no unsupported achieved-result claims. | Reproducible report and retained artifacts. |
| SC-06 | Target | Structured AI task/appointment suggestion case-level exact correctness is at least 85% on a pre-registered held-out synthetic set, with schema, field, refusal, and safety metrics reported separately. | Frozen corpus/hash, reviewed gold labels, model/config, scoring code, per-case outputs, denominators, uncertainty interval, stakeholder approval. Target only; no result exists. |
| SC-07 | Target | Median task-completion time is reduced by at least 20% versus the measured comparable baseline, using the defined paired workflow protocol. | Baseline and Flowentra raw trials, protocol, participant/task counts, exclusions, calculation, uncertainty and bias discussion. Target only; no baseline/result exists. |
| SC-08 | Target | Non-AI p95 response time is below 500 ms under the proposed 20-concurrent-user/1,000-synthetic-client workload, if that target/profile is approved. | Approved profile, machine/deployment manifest, load script, three run summaries, raw latency/error data. Target only; not measured. |
| SC-09 | Target | Usability and accessibility acceptance thresholds are met after stakeholder defines them; SUS, if used, is scored and reported by condition without misrepresenting it as a percentage. | Approved threshold, participant protocol, task outcomes, SUS calculations, accessibility findings and retest evidence. Threshold is currently unapproved. |
| SC-10 | Informational | Static OpenAPI validation passes for the contract revision used by the candidate; this is not runtime/API conformance evidence. | Validator command/output, dependency versions, OpenAPI file revision. |
| SC-11 | Informational | Literature and design comparisons contextualize evaluation choices but are not presented as Flowentra-specific outcomes. | Cited PD-13 review and documented limits to generalization. |

## 16. Risks and limitations

- The runtime system is absent; nearly all planned verification is currently blocked pending implementation and deployment.
- PD-13, PD-14, and PD-15 artifacts are unmerged and may change during review; exact baseline commits are recorded above.
- Requirements are proposed for stakeholder review; acceptance criteria, performance limits, data retention, AI policy, and accessibility target may change.
- The proposed AI model/provider and the mechanism for proposal confirmation are unselected/unimplemented; provider terms and nondeterminism affect reproducibility.
- Synthetic prompts and records may not represent real-world language, data quality, or workflow complexity; no real personal data should be introduced without approval.
- Human-participant recruitment may be small or convenience-based; results may not generalize beyond the observed roles and context.
- Timing and usability results are affected by learning, order, facilitator, hardware, and baseline differences.
- The proposed 85% correctness, 20% time reduction, and 500 ms p95 goals are targets—not achievements, accepted commitments, or evidence of product value.
- Passing a finite test set cannot prove absence of security vulnerabilities, AI hallucinations, or data-integrity failures.

## 17. Reproducibility and evidence management

1. Use a versioned, reviewed requirement/test baseline and record exact commits; rerun after changes to relevant code, schema, contracts, prompts, or model configuration.
2. Store scripts, synthetic fixture generator, environment manifest, protocol, and analysis code with version identifiers. Hash fixed datasets and outputs where appropriate.
3. Record exact commands, tool versions, configuration flags, time zone, clock source, and sanitized logs. Preserve raw results alongside summaries.
4. Redact tokens, passwords, provider secrets, and personal data before evidence is retained or shared. Restrict access to detailed logs and participant data.
5. Keep defects and deviations linked to requirement/test IDs. Never replace a failed run with a later pass without retaining both and explaining the fix/build boundary.
6. Do not alter or delete shared repository history to create a clean evaluation narrative. Do not use production data or destructive operations for test setup.

## 18. Evaluation schedule and responsibilities

The schedule is dependency-based; dates and completion are not assumed.

| Phase | Prerequisite / activity | Responsible role | Output / gate |
|---|---|---|---|
| A. Baseline approval | Review/merge PD-13, PD-14, PD-15; resolve open requirements, API/AI confirmation design, target decisions, and ownership. | Project team; supervisor/stakeholders approve policy and target decisions; Daniil maintains traceability. | Versioned approved requirement/test baseline and decision log. |
| B. Implementation readiness | Provide source, migrations, prototype, deployment/run instructions, provider choice, privacy review, and isolated test environment. | Feature implementers and deployment/operator role; QA reviews testability. | Reproducible non-production build with synthetic fixtures. |
| C. Verification | Run unit, contract/API, integration, database, security, and system cases; fix and retest defects. | QA lead (Daniil) coordinates; implementation owners resolve defects; independent reviewer examines evidence. | Requirement-level execution matrix, defect status, regression report. |
| D. AI and performance evaluation | Freeze evaluation corpus and model/config; approve sample plan and targets; run quality/safety and performance protocols. | QA/evaluation lead; domain reviewers adjudicate gold labels; operator maintains environment; stakeholder approves gates. | Reproducible scorecards and raw evidence with denominators and limitations. |
| E. User evaluation and closeout | Recruit appropriate participants, run baseline/Flowentra protocol, analyze usability/time, review residual risks. | QA facilitator and participating users; stakeholder reviews product-value interpretation. | Anonymized usability/time report, final success-criteria disposition, remaining-work list. |

The project's named roles are based on repository documentation; no individual availability, participation, approval, or completed work is implied. Responsibilities and dates must be confirmed before each phase.
