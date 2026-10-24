# Flowentra CRM AI — Defect Report Template

Copy this template for each verified or suspected defect. Use synthetic data in evidence. Do not include passwords, bearer tokens, provider keys, or real customer information.

## Defect details

| Field | Value |
|---|---|
| Defect ID | |
| Title | |
| Environment | |
| Build or commit | |
| Affected requirement ID | |
| Related test case ID | |
| Severity | S1 Critical / S2 High / S3 Medium / S4 Low |
| Priority | P0 / P1 / P2 |
| Status | New / Triaged / In Progress / Ready for Retest / Verified / Reopened / Closed |
| Reporter | |
| Assignee | |
| Date reported | |

## Preconditions

List the required role/account state, data fixtures, configuration, and starting system state. Confirm that the environment is non-production.

## Steps to reproduce

1. [Action]
2. [Action]
3. [Action]

## Expected result

State the observable behavior required by the linked requirement or API contract.

## Actual result

State the observed behavior, including response status or visible state. Separate observation from interpretation.

## Reproducibility

Record frequency (for example, `3/3`), tested build/environment, and whether the defect survives a clean retry.

## Evidence

- Logs or screenshots (sanitized and access-controlled):
- Request/response or test output (remove secrets and personal data):
- Database or audit evidence (only if obtained from a disposable environment):

## Workaround

Describe a verified workaround, or state `None known`.

## Verification result

- Fix build/commit:
- Retest date and tester:
- Reproduction steps rerun:
- Result: Not Run / Passed / Failed / Blocked
- Regression cases run:
- Remaining risk:

## Severity definitions

- **S1 Critical:** Broad compromise, unrecoverable data loss, or core service unavailable; immediate stop-ship response.
- **S2 High:** Major protected-data, authorization, business-workflow, or data-integrity failure with no acceptable workaround.
- **S3 Medium:** Limited feature failure or degraded behavior with a viable workaround.
- **S4 Low:** Minor cosmetic or low-impact issue with negligible business effect.

## Priority definitions

- **P0:** Immediate release blocker; resolve before release or further testing of dependent workflows.
- **P1:** High-priority fix for the current release; requires explicit disposition before release.
- **P2:** Lower-priority improvement that may be scheduled after release subject to product approval.

Severity describes impact; priority describes urgency and scheduling. The values may differ and should be justified during triage.
