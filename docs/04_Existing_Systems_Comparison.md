# 4. Existing System Comparison

**Compared products:** HubSpot Sales Hub/CRM; Zoho CRM; Pipedrive; Bitrix24.  
**Evidence:** Vendor websites and help pages reviewed 22 October 2026. Descriptions below indicate **documented feature categories**, not our independent hands-on verification, and do not imply a feature is included in any particular pricing tier.

## 4.1 Consistent criteria and evidence matrix

Legend: **D** = documented in vendor source(s); **N/V** = not verified from consulted sources (not evidence of absence); **P** = proposed MVP feature, not yet implemented.

| Criterion | HubSpot | Zoho CRM | Pipedrive | Bitrix24 | Proposed diploma |
|---|---|---|---|---|---|
| C1 Contact/customer records | D | D | D | D | P |
| C2 Deal pipeline | D | D | D | D | P |
| C3 Task/activities | D | D | D | D | P |
| C4 Scheduling / meetings | D | D | D | D | P: service bookings |
| C5 Reports / insights | D | D | D | D | P: basic reports |
| C6 AI assistance | D (Breeze) | D (Zia) | D (Sales Assistant) | D (CoPilot) | P: guarded action drafting |
| C7 Integration/API facilities | D | D | D | D | P: documented REST API |
| C8 Service booking overlap invariant with auditable confirmation | N/V | N/V | D for scheduler double-booking prevention | N/V | P: explicit transactional invariant |
| C9 Fine-grained role-based authorization | N/V | N/V | N/V | N/V | P: server-side role checks |

The **N/V** entries are deliberate: the consulted marketing pages do not provide sufficient evidence to make an absence/limitation claim. Before the final defense, the team should test comparable workflows in trial accounts and record edition, settings, date, screenshots and pricing tier.

## 4.2 Profile and strengths

**HubSpot:** A broad sales platform with pipeline, task assignment, meeting scheduling and Breeze-branded AI assistance. This is an established competitor; our work cannot truthfully claim these capabilities do not already exist. Official vendor feature page: https://www.hubspot.com/products/sales

**Zoho CRM:** CRM workflows with natural-language Zia assistant features including task/meeting creation, sales suggestions and data retrieval. It is especially important not to claim “AI cannot create tasks in other CRMs.” Official technical help: https://help.zoho.com/portal/en/kb/crm/zia-artificial-intelligence/zia/articles/zia-overview

**Pipedrive:** Strong visual deal pipeline and activity/meeting calendar. Its official scheduler documentation explicitly mentions avoiding double booking; our comparative argument is **testability of our server-side invariant**, not unique invention of conflict prevention. Official feature pages: https://www.pipedrive.com/en/features/pipeline-management and https://www.pipedrive.com/en/features/activity-calendar and https://www.pipedrive.com/en/features/crm-calendar

**Bitrix24:** An extensive combination of CRM, tasks/projects, calendars, reports, integrations, and CoPilot AI. It covers more scope than the diploma MVP. Official catalog: https://www.bitrix24.com/tools/

## 4.3 Evaluation framework for practical comparison (planned)

A fair later trial should involve the same task script: create customer, create deal, assign follow-up, book an available service slot, request an AI proposal, and produce a summary. Record only observable facts: completion time, action count, errors, approval visibility, whether the specific edition supports the flow, and the configured data-access permissions. Do not compare our prototype against fully implemented commercial products as if they were equivalent maturity levels.

## 4.4 Why this diploma is still justified

The research contribution is **bounded integration and measurable control**, not feature novelty. The project will expose a concise end-to-end service-business workflow, enforce appointment and role constraints in code, and evaluate AI-generated actions against domain-specific safety checks. Its advantages over existing systems remain **hypotheses to be tested**, not marketing facts.
