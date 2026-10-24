# Flowentra: User Interview Guide

Task: **PD-08** | Prepared: **2026-10-24** | Version: **1.0**

**Research instrument, not evidence of completed fieldwork.** This guide supports future interviews with small-business owners and sales managers. The companion [summary](Interview_Summary.md) contains four explicitly fictional interview simulations. Use the [note template](Interview_Note_Template.md) to record real sessions separately.

## 1. Research purpose and decisions

Explore how small teams manage clients, sales follow-up, tasks, and appointments; identify where existing tools create work; and determine which routines could benefit from a bounded CRM assistant. Assess whether Flowentra's proposed simple workspace and assisted task/appointment creation address a real need.

The decisions to inform are the initial customer segment, essential daily workflows, onboarding priorities, acceptable AI behavior, and the basis for a later pricing experiment. This study does not establish market size, demand prevalence, predictive-AI accuracy, or a viable price by itself.

The current product boundary comes from [PD-01](../docs/01_Project_Proposal.md) and [PD-05](../docs/AI_Integration_and_Security.md): a single-organization CRM with clients, fixed deal stages, tasks, appointments, reports, and permission-constrained AI assistance. Discuss unmet needs freely, but do not promise features. Messenger integrations, bulk import, autonomous writes, billing, inventory, and predictive analytics are outside the documented MVP.

## 2. Participants and recruitment

Recruit owners who select/pay for business software and sales managers who use or configure it. Include current CRM users, people who abandoned CRM, and spreadsheet/message-based teams. An initial recruitment wave may seek two owners and two sales managers across real estate, e-commerce, consulting, and software development; this is a discovery plan, not a representative sample or a claim that four sessions establish saturation.

Screen for hands-on involvement in a recent client or sales workflow, approximate team size, sector, current tool category, decision authority, and willingness to discuss an anonymized example. Record both purchasing and daily-use roles where they overlap. Prioritize concrete experience over enthusiasm for AI. Keep satisfied CRM users and people with no AI use in the sample to expose contrary evidence.

Recruitment script:

> We are exploring how small teams manage client work and sales follow-up. We would like to hear about your current process, including what works well. The conversation takes about 45 minutes. This is research, not a product sale; there are no right answers. Please do not share customer identities, credentials, or confidential business records.

Do not invent participant names, organizations, recruitment dates, consent, or attendance. Use participant IDs in repository artifacts; keep any necessary contact and consent records in an approved private location, separate from public research notes.

## 3. Hypothesis register

These are starting assumptions to challenge. A hypothetical response is not confirmation. For real interviews, distinguish a participant's report from directly observed behavior and the researcher's interpretation.

| ID | Starting hypothesis | Evidence to seek | Evidence that would weaken it | Questions |
| --- | --- | --- | --- | --- |
| H01 | Setup complexity prevents small teams from using CRM consistently | A recent setup/change episode, who did it, unresolved configuration, workaround | A usable setup without outside help; customization benefits outweigh effort | Q05, Q06 |
| H02 | Total software cost discourages adoption or expansion | Last purchase/renewal, paid seats, add-ons, rejected alternatives, trade-offs | Current cost is acceptable; another barrier controls the decision | Q08, Q09 |
| H03 | Fragmented tools create repeated entry and missed follow-up | A reconstructed client journey, handoffs, repeated fields, recovery work | A reliable integrated workflow with little duplication | Q03, Q04, Q07 |
| H04 | Current AI is weak for practical CRM routines | A specific attempted AI task, available context, output, correction, or abandonment | Useful AI already completes the routine; no AI need exists | Q10, Q11 |
| H05 | Users want visibility and control over AI writes | Actions that need review, acceptable preview, handling ambiguous clients or times | Repeated review adds more effort than value; users prefer narrowly scoped automatic writes after setup | Q12, Q16 |
| H06 | Simple defaults matter more than extensive customization | First-use priorities, features willingly omitted, employee onboarding episodes | Custom workflows are essential even for initial adoption | Q06, Q14, Q17 |
| H07 | Language, timezone, or regional billing creates friction | A concrete recent example and its consequence | Current localization and payment arrangements work adequately | Q13 |
| H08 | Client-linked tasks and appointments form a useful common workflow | A recent handoff/booking and responsibility for completion | Stock/order processing, property inventory, or project delivery dominates needs | Q03, Q07, Q14 |

## 4. Session structure: 45-minute target

Use elapsed times as a planning aid. Record actual timing in the notes; never fill planned times as if they were observed.

| Planned elapsed time | Topic | Purpose |
| --- | --- | --- |
| 00:00–04:00 | Introduction and permission | Explain purpose, note-taking, optional recording, and participant choice |
| 04:00–09:00 | Role and current tools | Establish purchasing/use context, Q01–Q02 |
| 09:00–19:00 | Recent client workflow | Reconstruct behavior and workarounds, Q03–Q04 and Q07 |
| 19:00–27:00 | Setup and cost | Explore configuration and the latest purchasing decision, Q05–Q06 and Q08–Q09 |
| 27:00–34:00 | AI and regional needs | Identify attempted tasks, limits, and control needs, Q10–Q13 |
| 34:00–41:00 | Priorities and optional concept | Discuss desired outcomes before showing Flowentra, Q14–Q17 |
| 41:00–45:00 | Recap and close | Check interpretation, invite corrections, Q18 |

If time is short, prioritize one complete recent episode over covering every question. Record skipped questions. Probe only relevant topics; avoid turning the conversation into a checklist or pitching the product early.

### Opening and permission script

> We are studying your work process, not your performance. You can skip any question or stop at any time. With your permission, I will take anonymized notes for the research team. May I do that? Recording is optional and requires separate permission. Please use fictional client details if you show an example. We will agree how any approved material may be used before sharing it beyond this session.

Record the actual answer. If note-taking is declined, do not create respondent notes; if recording is declined, continue only with the permitted method. Stop or redirect when confidential data appears. Do not put recordings, customer screenshots, participant contact details, or identifiable transcripts in this public repository. Agree the private storage owner and retention/deletion date before collecting material; do not claim these arrangements already exist.

## 5. Question scripts and neutral probes

| ID | Main question | Optional probes |
| --- | --- | --- |
| Q01 | What is your role in handling clients and choosing the tools your team uses? | Who uses the tool daily? Who approves payment? Who maintains it? |
| Q02 | Which tools did you use for client work last week, and what works well in them? | CRM, spreadsheet, inbox, calendar, messages; when would you keep the current setup? |
| Q03 | Walk me through the most recent client inquiry, from arrival to the next action or outcome. | Where was each step recorded? Who acted next? What happened at a handoff? |
| Q04 | Did that example involve repeated entry, searching, or checking? If so, where? | If none, what prevented repetition? Can you show a sanitized reconstruction? |
| Q05 | Tell me about the last time you set up or changed your CRM or tracking process. | What triggered the change? Who helped? What remained unfinished? How do you know how long it took? |
| Q06 | What was easy or difficult for the last colleague learning this process? | Which defaults helped? Which customization was necessary? What could be removed? |
| Q07 | Describe the last delayed follow-up, task handoff, or appointment change, if one occurred. | What caused it? Was there a collision? What was the consequence and recovery? Do not assume an incident occurred. |
| Q08 | How did you decide whether to pay for or renew your current tools? | Actual plan, seat count, billing period, add-ons, implementation help; allow the participant to decline amounts. |
| Q09 | What did you reject or give up in that decision, and why? | Was price decisive? What, if anything, would justify a higher total cost? Record currency and whether amounts are estimates. |
| Q10 | Have you used an AI tool for client or sales work? If so, describe the latest attempt. | Goal, inputs, available context, result, corrections; if unused, ask why and skip outcome claims. |
| Q11 | How did you decide whether the result was useful enough to use? | Did it complete work or only draft text? What worked well? Could a rule, search, or ordinary form do the job? |
| Q12 | Which actions could software take automatically, and which would you want to review? | Creating a task, booking an appointment, changing a deal, sending a message; ask the reason for each boundary. |
| Q13 | Have language, dates/timezones, payments, or local communication channels affected your work? | Ask for an example; record “no issue” when applicable. Avoid presuming regional difficulty. |
| Q14 | If you could improve only one part of this workflow, what would you choose? | What would success look like? Which other capability would you trade away? |
| Q15 | After hearing this concept, which parts fit your process and which do not? | Ask only after the optional concept script below. What would stop adoption? What is already solved? |
| Q16 | Would you use an assistant's proposed task or appointment? If so, what would you need to see before confirming it? | First elicit an unaided answer; only then probe client, employee, time, timezone, context, or conflicts. Accept rejection and ask why. |
| Q17 | What would have to be true for you to trial or switch to this approach? | Setup, migration, missing features, support, cost, and who decides; intention is not a purchase commitment. |
| Q18 | Have I understood your main difficulty correctly, and what have I missed? | Read back the interpretation, invite disagreement, and record the correction. |

Optional concept script, only after unaided workflow/prioritization questions:

> Flowentra is a proposed workspace for clients, deals, tasks, and employee appointments. Its optional assistant could retrieve permitted CRM information and prepare a task or appointment for review before saving. Ordinary forms would remain available. It is a design concept, not a finished product. It does not currently promise messenger integration, automatic messages, a commercial price, or predictive sales forecasts.

Record when the concept was introduced. Treat answers after that point as prompted concept reactions, separate from independently raised problems. Do not describe agreement with the script as proof of demand.

## 6. Moderator and analysis rules

- Ask about actual recent behavior before preferences or future intentions. Use “What happened next?” rather than suggesting the cause.
- Do not ask “Is your CRM too expensive?” or “Would better AI solve this?” Ask Q08–Q11 and accept contrary answers.
- Separate participant-reported frequency/time/cost from measured task duration. Record units, reference period, basis, and unknowns; do not extrapolate an anecdote into monthly savings.
- Capture evidence with IDs such as `R01-N01`, the question, elapsed timestamp, and permitted source location. Record verbatim wording only when it was actually captured and allowed; label paraphrases.
- Rate impact using the rubric in the [note template](Interview_Note_Template.md). Keep severity, frequency, and evidence status separate; missing evidence means “unknown,” not “no problem.”
- Synthesize each real session before grouping themes. Preserve contradictions and alternative explanations. A second reviewer should check the evidence-to-claim mapping; do not record that review as completed in advance.
- Classify each hypothesis as untested, supported in a named real case, challenged, or mixed, with traceable evidence. A small qualitative sample does not establish a market-wide percentage or causal effect.

## 7. Session close and next steps

Thank the participant, confirm what may be retained/shared, and record any separately agreed follow-up. Do not promise features, discounts, or an already scheduled pilot. Complete notes promptly, distinguish missing material from negative answers, and identify the one most important uncertainty for the next interview.

This guide and the companion artifacts were prepared with AI assistance against the repository's current design. No participant recruitment, consent, interview, recording, or independent review is asserted by this document.
