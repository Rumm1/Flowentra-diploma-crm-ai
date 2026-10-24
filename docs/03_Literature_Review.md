# Literature Review: Flowentra CRM AI

**Task:** PD-13 — Literature Review

**Project:** Flowentra diploma project

**Responsible student:** Daniil Khvan

**Review date:** 24 October 2026

**Document status:** Research synthesis for student verification; it does not report implementation or evaluation results.

## Executive summary

This review examines literature relevant to Flowentra's proposed combination of customer relationship management (CRM), bounded AI assistance, routine business workflows, and software quality controls. The repository describes a single-organization MVP with a shared client directory, assigned deals and tasks, employee appointments, bounded management reports, fixed administrator/manager/employee roles, and an optional external AI adapter. The AI is designed to retrieve authorized information and prepare task or appointment proposals for explicit confirmation. Core workflows remain available manually. These are design artifacts: the repository does not establish a running application, database, AI integration, user study, or measured product benefit.

The review includes **15 verified sources**: **12 peer-reviewed journal or conference publications** and three official NIST publications. DOI metadata was verified for all 15 references: 11 scholarly records through Crossref, one through the ACL Anthology's official proceedings record, and three through official NIST publication records. The peer-reviewed publications range from CRM process frameworks and empirical CRM research to AI-in-marketing frameworks, process automation, human-AI interaction, modular software design, access control, foundational security principles, and evaluation of generated language. The NIST material contributes risk-management and secure-development guidance; it is authoritative guidance, not peer-reviewed experimental research.

The sources converge on several relevant points: CRM should be treated as coordinated cross-functional processes rather than a contact database alone; automation is most useful when bounded to well-understood work; AI should augment rather than replace human decision-making in consequential workflows; and architecture, access control, and quality assurance require explicit design rather than reliance on interface behavior or model output. However, much of the literature is conceptual or based on settings unlike a small service-business CRM. None of the reviewed work demonstrates that Flowentra will reduce missed follow-ups, improve revenue, or prevent booking errors.

The evidence supports recommendations to preserve ordinary manual workflows; enforce authorization and ownership in server-side services; keep AI tools allowlisted and provider access minimized; show users the exact validated action before confirmation; test concurrency, permission boundaries, replay, malformed output, and provider failure; and evaluate AI output against task-specific fixtures and human review. These are recommendations for the proposed design and future implementation, not claims that the controls already work.

## 1. Research scope and review methodology

### 1.1 Review questions

This targeted literature review addresses the following questions:

1. What CRM process models and empirical findings inform the proposed Flowentra workflows?
2. What do AI and automation research suggest about task boundaries, human oversight, and organizational risk?
3. Which software architecture, security, and quality-assurance principles apply to a permission-constrained CRM?
4. How should an AI feature that returns structured intents and natural-language summaries be evaluated without treating valid syntax as proof of correctness?

### 1.2 Project evidence reviewed

The repository review covered the README, project proposal, architecture, technology comparison, backend/API design, AI integration and security design, OpenAPI contract, submission checklist, and component diagram. The review used the actual repository state on `pd-13-literature-review`, based on the fetched `origin/main` revision `58a4f2be5a59dd20d72080f6a2d9721fbb9794bd`.

The source material confirms the following project boundaries:

- **Proposed stack:** React browser client, Go modular monolith, PostgreSQL, REST/JSON, and an external provider-neutral AI adapter.
- **Proposed CRM scope:** shared client contact records; owned deals and tasks; single-employee/client appointments; bounded management summaries.
- **Proposed access policy:** one organization per deployment, fixed admin/manager/employee roles, server-enforced permissions and record ownership; no client portal.
- **Proposed AI scope:** authorized lookup/summaries and proposed task or appointment creation, with server-side validation and explicit confirmation. No autonomous execution, arbitrary database queries, generic network tools, destructive AI actions, or public AI endpoint is currently specified.
- **Implementation boundary:** project docs and OpenAPI describe a design and contract, not an implemented backend, frontend prototype, deployed database, or integrated model. The contract validator checks static schema/contract properties only.

### 1.3 Search and source verification

This was a **targeted, narrative review**, not a systematic review or meta-analysis. Source selection began with the project’s documented risks and design questions, followed by targeted verification of candidate publications and standards/guidance. Crossref Works API records were retrieved by DOI for the scholarly articles; the ACL Anthology proceedings record was used for the EMNLP paper; official NIST publication records were used for NIST sources. DOI resolvers and publisher DOI links are included so readers can locate the cited records.

The Crossref API returned HTTP 429 for some attempted requests. The sources retained in this review were included only where the metadata could be verified from a successful Crossref response or an official ACL/NIST record. No Google Scholar, IEEE Xplore, ACM Digital Library, or other discovery service is claimed as searched. Search terms used to frame source selection included *customer relationship management process*, *artificial intelligence marketing*, *robotic process automation*, *human-AI interaction*, *software modularization*, *role-based access control*, *information system protection*, *NLG evaluation*, *AI risk management*, and *secure software development*. Candidate citations not verified sufficiently were excluded rather than used to satisfy the source threshold.

The review records publication type and peer-review status at the level supported by the journal or conference proceedings record. Crossref verifies bibliographic metadata, not peer review; peer-review status is based on the publication venue and its scholarly publication type. NIST publications are treated as official guidance and are not counted as peer-reviewed scientific publications.

### 1.4 Inclusion and exclusion criteria

**Included**

- Peer-reviewed journal articles and conference proceedings directly relevant to CRM processes, applied AI, workflow automation, human-AI interaction, software modularity, access control, security principles, or evaluation of generated language.
- Official NIST risk-management or secure-development guidance relevant to the proposed AI and software lifecycle.
- Publications with author, title, venue, year, and a stable DOI or official publication URL verifiable from an authoritative metadata record.
- Sources whose method and limitations can be described without assuming they tested Flowentra.

**Excluded**

- Vendor marketing and unsupported performance claims.
- Unverified citations, guessed DOI strings, and citations whose publication metadata could not be confirmed.
- Work that only concerns unrelated AI capabilities or regulated domains without a defensible link to the MVP.
- Claims that the proposed design has already achieved security, reliability, usability, or commercial outcomes.

## 2. Analytical literature table

Key findings below describe what the cited publication reports or proposes. The “Relevance” column is this review’s interpretation for Flowentra, not a result observed in the project.

| ID | Authors and Year | Publication | Research Focus | Methodology | Key Findings | Limitations | Relevance to Flowentra | DOI/URL |
|---|---|---|---|---|---|---|---|---|
| [1] | Payne & Frow, 2005 | *Journal of Marketing*, 69(4), 167–176. Peer-reviewed journal article. | Strategic, cross-functional CRM framework. | Conceptual synthesis of CRM and relationship-marketing literature. | Proposes five connected CRM processes: strategy development, value creation, multichannel integration, information management, and performance assessment. | Conceptual framework; it does not establish that a particular software implementation improves outcomes. | Supports treating client records, follow-up, scheduling, information handling, and reporting as related processes—not isolated CRUD screens. Its enterprise/strategic framing is broader than this single-organization MVP. | [doi.org/10.1509/jmkg.2005.69.4.167](https://doi.org/10.1509/jmkg.2005.69.4.167) |
| [2] | Reinartz, Krafft, & Hoyer, 2004 | *Journal of Marketing Research*, 41(3), 293–305. Peer-reviewed journal article. | Measurement and performance implications of CRM processes. | Construct development/validation and two cross-sectional studies across four industries and three countries. | Defines CRM process stages as initiation, maintenance, and termination; reports a moderately positive association between CRM process implementation and perceptual and objective company performance. | Cross-sectional associations do not establish causality; results across the sampled contexts do not prove an effect for Flowentra or small local service businesses. | Gives an empirical basis for organizing project requirements around relationship stages, while reinforcing that Flowentra-specific benefits require its own evaluation. | [doi.org/10.1509/jmkr.41.3.293.35991](https://doi.org/10.1509/jmkr.41.3.293.35991) |
| [3] | Davenport, Guha, Grewal, & Bressgott, 2020 | *Journal of the Academy of Marketing Science*, 48(1), 24–42. Peer-reviewed journal article. | Potential effects of AI on marketing and human work. | Conceptual framework drawing on prior work and interactions with practitioners; includes a research agenda. | Organizes AI by intelligence level, task type, and embodiment; argues that AI can augment rather than replace human managers and highlights privacy, bias, and ethics questions. | Forward-looking framework, not a controlled evaluation of a CRM product; business/marketing contexts are broad. | Supports positioning the assistant as augmentation and keeping decisions and permissions with staff and server-side policy. It does not justify a claim that an AI assistant will improve Flowentra outcomes. | [doi.org/10.1007/s11747-019-00696-0](https://doi.org/10.1007/s11747-019-00696-0) |
| [4] | Huang & Rust, 2021 | *Journal of the Academy of Marketing Science*, 49(1), 30–50. Peer-reviewed journal article. | Strategic roles of AI in marketing tasks. | Conceptual framework classifying AI capabilities and marketing tasks. | Distinguishes mechanical, thinking, and feeling AI and relates them to marketing research, strategy, and action; provides a framework for deciding where automation or augmentation may fit. | A taxonomy and research framework, not evidence that a particular AI capability is accurate, safe, or useful in a deployed CRM. | Helps distinguish deterministic workflow automation from model-mediated interpretation. Flowentra’s proposal generation should remain bounded and should not be treated as authority simply because it uses AI. | [doi.org/10.1007/s11747-020-00749-9](https://doi.org/10.1007/s11747-020-00749-9) |
| [5] | van der Aalst, Bichler, & Heinzl, 2018 | *Business & Information Systems Engineering*, 60(4), 269–272. Peer-reviewed journal article. | Robotic process automation (RPA) and its place in information systems. | Short conceptual perspective on RPA and its implications. | Frames software robots as a business-process automation development and calls attention to its relationship with existing information systems and process management. | Short perspective rather than a systematic synthesis or controlled comparison; it does not quantify benefits or failure rates. | Offers a useful contrast: Flowentra’s proposed AI is not an autonomous robot. It should invoke a narrow set of established business services, with human confirmation for writes. | [doi.org/10.1007/s12599-018-0542-4](https://doi.org/10.1007/s12599-018-0542-4) |
| [6] | Syed et al., 2020 | *Computers in Industry*, 115, article 103162. Peer-reviewed journal article. | Contemporary RPA themes and implementation challenges. | Literature-based synthesis and thematic organization of RPA research and practice. | Maps themes and challenges across RPA research and emphasizes that automation raises organizational and implementation concerns beyond the bot itself. | The RPA landscape is not equivalent to generative AI; findings are not direct measures of a conversational CRM assistant. | Supports testing the entire workflow—including exceptions, process ownership, and failure handling—instead of judging automation by successful happy-path examples alone. | [doi.org/10.1016/j.compind.2019.103162](https://doi.org/10.1016/j.compind.2019.103162) |
| [7] | Amershi et al., 2019 | *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems*, 1–13. Peer-reviewed conference paper. | Human-AI interaction design. | Synthesis of prior research, design practice, and practitioner/researcher input into 18 design guidelines. | Presents guidelines for AI systems, including communicating capabilities, supporting correction, handling errors, and providing appropriate user control over time. | Guidelines are not a guarantee of usability or safety; local users and tasks still require evaluation. | Informs clear uncertainty/error communication, recoverable interaction, and user control over AI-prepared actions. Confirmation UI must show exact validated fields, not just a generic “AI completed” message. | [doi.org/10.1145/3290605.3300233](https://doi.org/10.1145/3290605.3300233) |
| [8] | Shneiderman, 2020 | *International Journal of Human–Computer Interaction*, 36(6), 495–504. Peer-reviewed journal article. | Human-centered AI and reliable, safe, trustworthy systems. | Normative/conceptual framework for human-centered AI. | Advocates high levels of automation paired with meaningful human control and system reliability. | A design argument rather than an empirical evaluation of Flowentra-like applications; principles need operationalization and testing. | Supports the project’s non-autonomous action boundary, manual fallback, and visible confirmation. A confirmation click alone is insufficient if the user cannot understand what will happen. | [doi.org/10.1080/10447318.2020.1741118](https://doi.org/10.1080/10447318.2020.1741118) |
| [9] | Parnas, 1972 | *Communications of the ACM*, 15(12), 1053–1058. Peer-reviewed journal article. | Criteria for decomposing software into modules. | Conceptual analysis with comparison of alternative decompositions of a system-design problem. | Argues that decomposition criteria influence flexibility and comprehensibility; information hiding can be preferable to decomposition that mirrors execution steps. | Foundational work predating contemporary web systems; it does not prove that a Go modular monolith is optimal for this project. | Provides a rationale for coherent module boundaries and hidden implementation decisions. Whether the proposed boundaries are maintainable must be judged from implementation and change evidence. | [doi.org/10.1145/361598.361623](https://doi.org/10.1145/361598.361623) |
| [10] | Saltzer & Schroeder, 1975 | *Proceedings of the IEEE*, 63(9), 1278–1308. Peer-reviewed journal article. | Protection principles for computer systems. | Analytical treatment of security design principles and system mechanisms. | Articulates enduring principles including least privilege, fail-safe defaults, complete mediation, and economy of mechanism. | Written for earlier system architectures; principles require translation to modern web, database, and AI-provider boundaries. | Directly informs server-side authorization on every request, narrow model tools, default-deny handling, and keeping provider credentials away from the browser and model. | [doi.org/10.1109/PROC.1975.9939](https://doi.org/10.1109/PROC.1975.9939) |
| [11] | Sandhu, Coyne, Feinstein, & Youman, 1996 | *Computer*, 29(2), 38–47. Peer-reviewed journal article. | Role-based access control (RBAC) models. | Conceptual/model analysis of RBAC families and their relationships. | Establishes a structured vocabulary and model framework for assigning permissions through roles rather than embedding each permission in individual users. | Role assignment is not a complete authorization design: object ownership, field-level rules, lifecycle state, and tenant isolation need additional controls. | Helps frame Flowentra’s fixed roles, but the project’s own rules must additionally scope records by assignment and enforce sensitive field restrictions. | [doi.org/10.1109/2.485845](https://doi.org/10.1109/2.485845) |
| [12] | Liu et al., 2023 | *Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing*, 2511–2522. Peer-reviewed conference paper. | LLM-based evaluation of generated natural language. | Empirical evaluation of G-Eval, a rubric/chain-of-thought-based evaluator, against human judgments on NLG tasks. | Reports improved alignment with human judgments on the studied summarization and dialogue-generation tasks compared with evaluated alternatives. | Evaluator behavior and results are task- and prompt-dependent; NLG quality judgments do not verify structured action semantics, authorization, or transactional correctness. | Supports using model-assisted ratings, if at all, only as one supplementary signal. Flowentra action intents require deterministic schema/business validation and human-authored expected outcomes. | [ACL Anthology](https://aclanthology.org/2023.emnlp-main.153/); DOI: [10.18653/v1/2023.emnlp-main.153](https://doi.org/10.18653/v1/2023.emnlp-main.153) |
| [13] | Tabassi, 2023 | *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1. Official NIST framework; not a peer-reviewed paper. | Risk management for AI systems. | Voluntary framework developed through an open, consensus-oriented process; organizes risk work into Govern, Map, Measure, and Manage. | Provides a lifecycle-oriented vocabulary and practices for identifying, assessing, and managing AI trustworthiness risks. | Voluntary, use-case agnostic guidance; not a certification, product test, or guarantee of regulatory compliance. | Can structure future review of provider choice, privacy, model failure, monitoring, and evaluation. It does not certify the proposed integration as trustworthy. | [doi.org/10.6028/NIST.AI.100-1](https://doi.org/10.6028/NIST.AI.100-1) |
| [14] | Autio et al., 2024 | *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, NIST AI 600-1. Official NIST profile; not a peer-reviewed paper. | Risks specific to generative AI and risk-management actions. | Companion profile mapping generative-AI risks and suggested actions to the AI RMF. | Extends the general risk-management framework with generative-AI-specific considerations and mitigations. | Guidance does not establish that listed controls will prevent errors or leakage in a particular deployment. | Relevant to model-generated summaries, untrusted input, privacy, and output validation. It is a checklist source for design review, not runtime evidence. | [doi.org/10.6028/NIST.AI.600-1](https://doi.org/10.6028/NIST.AI.600-1) |
| [15] | Scarfone, Souppaya, & Dodson, 2022 | *Secure Software Development Framework (SSDF) Version 1.1*, NIST SP 800-218. Official NIST guidance; not a peer-reviewed paper. | Secure software development practices across the lifecycle. | Practice-oriented framework with recommendations for preparing organizations, protecting software, producing secure software, and responding to vulnerabilities. | Provides lifecycle practices that can be incorporated into development and delivery rather than deferred to a final security test. | Guidance is not a substitute for project-specific threat modeling, implementation, testing, or operational evidence. | Supports adding security requirements and checks to the future implementation workflow; no claim is made that Flowentra currently follows or passes the SSDF. | [doi.org/10.6028/NIST.SP.800-218](https://doi.org/10.6028/NIST.SP.800-218) |

## 3. Thematic analysis

### 3.1 CRM as a set of connected business processes

Payne and Frow frame CRM as a strategic, cross-functional process, joining strategy, value creation, channel integration, information management, and performance assessment [1]. Reinartz, Krafft, and Hoyer operationalize CRM processes around initiation, maintenance, and termination, and report a moderate positive association with company performance in cross-sectional studies [2]. These sources complement one another: the former offers a managerial/process framework, while the latter provides empirical measurement and association evidence.

For Flowentra, their shared implication is that a client directory alone would not represent CRM value. The proposed deals, tasks, appointments, and bounded reporting should be understood as connected workflow support. Their evidence does **not** establish a causal effect for Flowentra: the cited performance association is cross-sectional, and no project-specific user research or outcome evaluation is in the repository. The appropriate project claim is that these sources motivate a coherent workflow design, not that the design will improve retention or revenue.

### 3.2 AI-assisted CRM and business-process automation

Davenport et al. and Huang and Rust offer complementary conceptual approaches to AI in marketing [3, 4]. Davenport et al. emphasize tasks, intelligence levels, and whether AI augments human managers; Huang and Rust distinguish mechanical, thinking, and feeling AI across marketing work. Both help disaggregate “AI” into tasks instead of treating it as a single capability. Neither is evidence that current language models can reliably resolve Flowentra entities, interpret ambiguous booking requests, or complete CRM actions safely.

RPA literature likewise cautions against reducing automation to the apparent simplicity of an automated interface. van der Aalst et al. situate RPA within information systems and process management [5], while Syed et al. organize implementation themes and challenges across RPA work [6]. RPA typically automates repetitive, explicit procedures; Flowentra’s proposed natural-language layer adds probabilistic interpretation and therefore a different class of uncertainty. The useful connection is the need to assess process fit, exceptions, operational ownership, and failure recovery. The limitation is that RPA findings cannot be transferred directly to generative AI.

### 3.3 Human-AI collaboration and decision support

Amershi et al. provide design guidelines for interactive AI systems, and Shneiderman argues for combining automation with meaningful human control [7, 8]. Their approaches differ: one translates a synthesis of research and practice into interaction guidance, while the other argues for a broad human-centered framework. Both support keeping users informed and able to correct or decline system output.

For Flowentra, the confirmation screen is not merely a compliance step. A useful confirmation should display the resolved client, assignee, task fields or appointment interval, and the consequences of the operation. The server should bind confirmation to those exact canonical values and recheck current authorization and record state at execution time. A user cannot provide meaningful oversight if an opaque model-written sentence hides the actual proposed action. At the same time, human confirmation does not make a false or confusing proposal safe by itself; ambiguity handling, field validation, and manual alternatives remain necessary.

### 3.4 Architecture, maintainability, and reliability

Parnas’s modularization argument emphasizes information hiding and the consequences of decomposition criteria [9]. It offers a conceptual basis for separating Flowentra’s identity/policy, CRM, scheduling, reporting, AI orchestration, and persistence responsibilities. It does not empirically validate the chosen modular monolith. The architecture decision should be evaluated through cohesion, dependency direction, testability, and the cost of changing a business rule—not through the label “modular.”

Reliability in this context is not just availability. The design depends on correct behavior under concurrent appointment requests, stale updates, retries, account deactivation, and provider outages. The project’s proposed database exclusion constraint, optimistic version checks, idempotency records, and transactionally coupled audit writes target specific failure modes. These controls remain design intent until implemented and tested under the database and concurrency conditions they describe. Parnas’s work can guide boundaries, but database constraints and fault tests are required to establish the corresponding runtime properties.

### 3.5 Security, privacy, and access control

Saltzer and Schroeder’s principles—least privilege, fail-safe defaults, complete mediation, and economy of mechanism—remain useful for reasoning about application boundaries [10]. Sandhu et al. formalize role-based access control models [11]. Together, they clarify why a role matrix is necessary but insufficient: the project also requires object ownership, field-level restrictions, current account/session checks, and scope-aware record retrieval.

This is particularly important for the AI feature. Retrieved text is untrusted, model output is not authority, and a role label in a prompt cannot authorize an operation. A server-side adapter should retrieve only authorized, minimized context, offer only narrowly allowlisted tools, and route confirmed writes through the same business services as manual workflows. NIST’s AI RMF and generative-AI profile can help organize risk assessment, while the SSDF can inform secure lifecycle work [13–15]. They are voluntary guidance documents; citing them does not demonstrate compliance or security.

The repository describes proposed privacy safeguards—synthetic demonstration data, minimized provider context, no prompt logging by default, session-bound context, restricted provider exposure, and unresolved retention/provider-terms decisions. Literature and guidance reinforce the need to review those decisions, but no provider is selected and no privacy assessment or operational safeguard is demonstrated. Any use of real personal data must remain a separate gate pending provider, legal, and retention review.

### 3.6 Evaluation of natural-language and structured outputs

Liu et al.’s G-Eval evaluates generated natural language by prompting an LLM-based evaluator and comparing its judgments with human assessments in selected NLG tasks [12]. This can inform evaluation of explanatory summaries, but it cannot establish that a structured intent names the correct client, respects ownership rules, or books a valid interval. The measured construct matters: perceived textual quality is not the same as semantic correctness, authorization, or safe execution.

Accordingly, Flowentra should use layered evaluation:

1. **Contract checks:** required fields, enum values, length limits, unknown-field rejection, and version handling.
2. **Semantic/business checks:** entity resolution, explicit time interpretation, valid references, role and ownership checks, interval rules, and lifecycle state.
3. **Action safety checks:** no write before confirmation; immutable actor/action/argument binding; replay/stale/expired proposal rejection; transaction and audit assertions.
4. **Human-centered evaluation:** review task completion, comprehension of proposed fields, correction, refusal, and recovery with representative users.
5. **Text quality evaluation:** where useful, blinded human ratings or carefully scoped model ratings for readability and factual grounding, separately from action acceptance.

Every level requires actual implementation and recorded test evidence. A schema-valid JSON response is only evidence that the response passed a schema check; it is not evidence that the action is true, authorized, or useful.

## 4. Comparison of research approaches

The reviewed sources use materially different forms of evidence. Reinartz et al. measure and validate a CRM process construct and analyze cross-sectional associations [2]. Their design supports claims about observed relationships in the studied samples, but not causal claims for a new prototype. Payne and Frow, Davenport et al., Huang and Rust, Parnas, Saltzer and Schroeder, and Shneiderman provide conceptual frameworks or principles [1, 3, 4, 8–10]. These are useful for framing design decisions but cannot substitute for testing a specific implementation.

Syed et al. synthesize themes and challenges in RPA, while Amershi et al. translate prior research and practice into interaction guidelines [6, 7]. Such syntheses help identify dimensions and recurring concerns but depend on the scope and selection of the underlying literature. Sandhu et al. compare formal access-control models, which provides conceptual precision about RBAC but does not cover Flowentra’s full object-ownership policy [11].

Liu et al. test an LLM-based evaluation approach on text-generation tasks [12]. It has an empirical orientation but a different target than Flowentra’s action-safety requirements. The NIST publications are normative/practice-oriented guidance rather than empirical evidence of product-level effectiveness [13–15]. Thus, the literature offers complementary theory, association, guidelines, model structures, and risk practices—but no single source evaluates the project as a whole.

## 5. Benefits and limitations of existing approaches

### Potential benefits supported by the literature

- **Process coherence:** CRM frameworks help expose dependencies among client information, follow-up, service interactions, and performance assessment [1, 2].
- **Task-level AI selection:** AI frameworks encourage choosing capabilities for particular tasks and considering augmentation rather than assuming full automation is desirable [3, 4].
- **Workflow automation discipline:** RPA research draws attention to process fit, exception paths, and organizational integration [5, 6].
- **User agency:** Human-AI interaction research supplies practical design considerations for communicating capabilities, supporting correction, and retaining user control [7, 8].
- **Explicit security boundaries:** RBAC and foundational protection principles provide concepts for least privilege, default denial, and mediation at trusted service boundaries [10, 11].
- **Lifecycle risk management:** NIST guidance offers structured ways to plan AI risk and secure-development work throughout a lifecycle [13–15].

### Limitations and risks

- Conceptual frameworks do not show that the recommended practices will produce measurable benefits in Flowentra.
- The CRM studies are not direct evaluations of small appointment-based businesses using a conversational assistant.
- RPA is not equivalent to generative AI; automation research must be transferred cautiously.
- Interaction guidelines and human approval can fail if users misunderstand a proposed action, face automation bias, or cannot see the canonical fields.
- RBAC does not by itself enforce record ownership, field restrictions, tenant boundaries, or safe AI context retrieval.
- LLM evaluators can share model biases and may score fluent but incorrect output favorably; generated-text assessment does not validate business actions.
- Standards and frameworks are not certifications and do not prove a system is secure, reliable, privacy-preserving, or legally compliant.
- Quality attributes can conflict: minimizing provider context may reduce answer completeness; stronger confirmation may add interaction cost; detailed auditability can increase privacy and retention risk.

## 6. Research gaps

The reviewed literature and project artifacts leave the following questions unresolved:

1. **User need and workflow fit:** Does the proposed assistant solve a documented problem for the intended small service businesses? The repository treats this as a hypothesis; there are no supplied interview or field-study results.
2. **Comparative usability:** Do staff complete common lookup, task, and appointment workflows more accurately or efficiently with the assistant than with manual forms? No project-specific comparative study exists.
3. **Action-intent performance:** What are the exact intent-level error rates across realistic, ambiguous, multilingual, and adversarial prompts? No provider/model is selected and no benchmark has been run.
4. **Entity and time resolution:** How reliably can the system distinguish clients with similar names and interpret dates/timezones, and when should it ask for clarification? The repository defines expected behavior but has no outcome data.
5. **Confirmation quality:** Do users understand and verify proposed fields before confirmation? Human-in-the-loop design does not establish that attention or comprehension occurs.
6. **Security under implementation:** Do service authorization, data minimization, injection defenses, provider egress restrictions, audit integrity, and replay checks withstand adversarial and integration testing?
7. **Reliability and concurrency:** Does the implemented database constraint correctly handle simultaneous create/reschedule operations, transaction retries, and uncertain commit outcomes?
8. **Privacy and provider governance:** Which provider, region, processing terms, retention settings, data-subject requirements, and deletion procedures will apply? These decisions remain open.
9. **Sustained maintainability:** Do the proposed modules and contracts help the actual team make changes with fewer defects and clearer review? The architectural hypothesis needs implementation evidence over time.

The project's planned synthetic-prompt and acceptance tests can address some of these gaps, but synthetic test results would not alone establish real-world benefit or representativeness.

## 7. Implications for Flowentra

The strongest implication is methodological: Flowentra should be evaluated as a conventional CRM with an optional AI interaction layer, not as an AI system whose presence proves novelty or value. The CRM literature informs which business processes the product should support [1, 2]; the AI literature informs the boundaries and interaction design of assistance [3, 4, 7, 8]; architecture and security literature inform implementation constraints [9–11]; and NIST guidance can structure future lifecycle risk review [13–15].

The current design choices are consistent with those implications at a proposal level:

- preserve direct manual forms so provider delay or failure does not block core work;
- treat the external model as an untrusted component, without database credentials or arbitrary tools;
- retrieve only data permitted for the current actor and intent;
- allow only bounded read operations and task/appointment proposals;
- display server-resolved canonical fields and require explicit confirmation for writes;
- recheck permissions and state at confirmation time and execute through ordinary business services;
- protect database invariants with transactions and constraints, not only prompt instructions or prior availability checks.

These are observations about documented design intent. The OpenAPI contract, diagrams, and validation script do not show that the controls have been implemented or that they are effective.

## 8. Evidence-based recommendations

| Area | Recommendation | Evidence and reasoning | Applicability and verification condition |
|---|---|---|---|
| Architecture | Keep cohesive business and policy boundaries in the initial modular application; avoid adding separately deployed services without measured need. | Information hiding provides a basis for modular design [9]; CRM work spans connected processes [1]. The project explicitly chooses a small single-organization scope. | Applies while the deployment/team remain small and shared transactions are valuable. Confirm with dependency tests, module-level tests, and observed change/operation needs; do not cite this as proof the monolith is optimal. |
| CRM functionality | Implement and evaluate client, deal, task, appointment, and reporting flows as connected workflows; keep reports bounded and clearly defined. | CRM frameworks describe cross-functional processes and lifecycle stages [1, 2]. | Use the project’s actual MVP boundary. Measure workflow completion and data correctness before claiming business impact. Do not introduce out-of-scope predictive revenue or marketing automation without new evidence. |
| AI functionality | Retain manual alternatives and restrict AI to authorized lookup/summaries plus explicit task/appointment proposals. Display exact server-resolved fields and require a fresh confirmation after any change. | AI-in-marketing frameworks support task-specific augmentation [3, 4]; HAI guidance and human-centered AI stress user control and interaction quality [7, 8]. | Applies to any future external model integration. Verify with UI tests and user comprehension studies; do not treat a confirmation button as authorization or a safety guarantee. |
| Authorization and privacy | Enforce role, ownership, field, account-state, and object-scope checks in trusted server-side services. Minimize provider context and keep provider credentials and database capabilities inaccessible to the model. | Least privilege, fail-safe defaults, and complete mediation [10]; RBAC models [11]; AI risk guidance [13, 14]. | Applies before any real personal data or provider call. Verify both allowed and denied cases, indirect-injection inputs, egress configuration, and retention/provider terms. |
| Reliability | Enforce appointment non-overlap and atomic mutation/audit/idempotency behavior at the persistence/service boundary; test simultaneous requests and uncertain responses. | Protection and modularity principles motivate explicit trusted mechanisms [9, 10]; this recommendation also follows the project’s documented concurrency risks, not a claim that the papers validated its DDL. | Applies when the PostgreSQL design is implemented. Use integration tests against the selected PostgreSQL version; static schema or OpenAPI checks are insufficient. |
| AI output evaluation | Combine schema validation with deterministic semantic/business tests and human review. Keep generated-text quality ratings separate from action acceptance. | G-Eval studies LLM judging of NLG and human alignment, not transaction or authorization correctness [12]; NIST GenAI guidance supports risk-based assessment [14]. | Applies only once a concrete model, version, prompt, and intent contract are selected. Record dataset provenance, expected outcomes, failures, and version changes; do not use model self-confidence as permission. |
| Quality assurance | Turn security and quality assumptions into traceable requirements, negative tests, regression fixtures, and release evidence throughout development. | NIST SSDF structures secure-development practices across the lifecycle [15]; AI RMF supplies Govern/Map/Measure/Manage risk activities [13]. | Applies to future implementation and deployment. Record actual test outputs and unresolved risks; NIST alignment must not be represented as certification. |

## 9. Limitations of this review

This narrative review is targeted and non-systematic. It does not use a preregistered protocol, formal search-string execution across multiple scholarly databases, duplicate screening by independent reviewers, risk-of-bias scoring, or meta-analysis. The source set emphasizes foundational and directly relevant work rather than exhaustive coverage. Some Crossref requests were rate-limited; sources lacking authoritative metadata verification were excluded. The included conceptual papers and guidance documents vary substantially in evidence type, so their findings cannot be compared as if they were equivalent empirical measurements.

The review is current to 24 October 2026 and does not guarantee that no more recent work exists. The sources are mostly broad frameworks or research settings that do not match Flowentra’s exact population, country, language mix, implementation, or provider. The evaluation literature addresses natural-language generation rather than the full correctness and safety of CRM actions. The NIST documents provide voluntary guidance, not legal advice, compliance evidence, or implementation results. Finally, the project documentation itself is proposed design; changing the implementation or scope would require revisiting these implications.

## 10. Conclusion

The literature offers a defensible basis for a bounded CRM design and a cautious AI interaction model, but it does not establish the value or safety of Flowentra itself. CRM scholarship supports coherent relationship workflows; AI and automation work support task-specific augmentation and attention to process boundaries; human-AI research supports visible user control; architecture and security literature support modularity, least privilege, and explicit enforcement; and evaluation research demonstrates why output-quality judgment must not be confused with action correctness.

For PD-13, the main conclusion is therefore conditional: the proposed design is plausibly aligned with established principles, but its claims remain hypotheses until the system is implemented and evaluated. The next evidence should come from verified implementation, authorization and concurrency tests, representative user tasks, adversarial and failure scenarios, and transparent reporting of both successful and unsuccessful outcomes.

## References

1. Payne, A., & Frow, P. (2005). A strategic framework for customer relationship management. *Journal of Marketing, 69*(4), 167–176. https://doi.org/10.1509/jmkg.2005.69.4.167
2. Reinartz, W., Krafft, M., & Hoyer, W. D. (2004). The customer relationship management process: Its measurement and impact on performance. *Journal of Marketing Research, 41*(3), 293–305. https://doi.org/10.1509/jmkr.41.3.293.35991
3. Davenport, T. H., Guha, A., Grewal, D., & Bressgott, T. (2020). How artificial intelligence will change the future of marketing. *Journal of the Academy of Marketing Science, 48*(1), 24–42. https://doi.org/10.1007/s11747-019-00696-0
4. Huang, M.-H., & Rust, R. T. (2021). A strategic framework for artificial intelligence in marketing. *Journal of the Academy of Marketing Science, 49*(1), 30–50. https://doi.org/10.1007/s11747-020-00749-9
5. van der Aalst, W. M. P., Bichler, M., & Heinzl, A. (2018). Robotic process automation. *Business & Information Systems Engineering, 60*(4), 269–272. https://doi.org/10.1007/s12599-018-0542-4
6. Syed, R., Suriadi, S., Adams, M., Bandara, W., Leemans, S. J. J., Ouyang, C., ter Hofstede, A. H. M., van de Weerd, I., Wynn, M. T., & Reijers, H. A. (2020). Robotic process automation: Contemporary themes and challenges. *Computers in Industry, 115*, 103162. https://doi.org/10.1016/j.compind.2019.103162
7. Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collisson, P., Suh, J., Iqbal, S., Bennett, P. N., Inkpen, K., Teevan, J., Kikin-Gil, R., & Horvitz, E. (2019). Guidelines for human-AI interaction. In *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems* (pp. 1–13). Association for Computing Machinery. https://doi.org/10.1145/3290605.3300233
8. Shneiderman, B. (2020). Human-centered artificial intelligence: Reliable, safe & trustworthy. *International Journal of Human–Computer Interaction, 36*(6), 495–504. https://doi.org/10.1080/10447318.2020.1741118
9. Parnas, D. L. (1972). On the criteria to be used in decomposing systems into modules. *Communications of the ACM, 15*(12), 1053–1058. https://doi.org/10.1145/361598.361623
10. Saltzer, J. H., & Schroeder, M. D. (1975). The protection of information in computer systems. *Proceedings of the IEEE, 63*(9), 1278–1308. https://doi.org/10.1109/PROC.1975.9939
11. Sandhu, R. S., Coyne, E. J., Feinstein, H. L., & Youman, C. E. (1996). Role-based access control models. *Computer, 29*(2), 38–47. https://doi.org/10.1109/2.485845
12. Liu, Y., Iter, D., Xu, Y., Wang, S., Xu, R., & Zhu, C. (2023). G-Eval: NLG evaluation using GPT-4 with better human alignment. In *Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing* (pp. 2511–2522). Association for Computational Linguistics. https://doi.org/10.18653/v1/2023.emnlp-main.153
13. Tabassi, E. (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0)* (NIST AI 100-1). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.AI.100-1
14. Autio, C., Schwartz, R., Dunietz, J., Jain, S., Stanley, M., Tabassi, E., Hall, P., & Roberts, K. (2024). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile* (NIST AI 600-1). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.AI.600-1
15. Scarfone, K., Souppaya, M., & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218). National Institute of Standards and Technology. https://doi.org/10.6028/NIST.SP.800-218

### Verification record

- Verified publication metadata for references [1]–[11] through successful Crossref Works API records; [12] through the official ACL Anthology proceedings page; and [13]–[15] through official NIST publication records.
- **Verified source total:** 15. **Peer-reviewed scientific publications:** 12 ([1]–[12]). **Official NIST guidance publications:** 3 ([13]–[15]).
- **References with verified DOI metadata:** 15 of 15. DOI metadata came from Crossref for [1]–[11], the ACL Anthology record for [12], and official NIST records for [13]–[15].
- Crossref rate-limited some unselected requests. No such unverified candidate is included in the source count.
- Crossref DOI records and official ACL/NIST pages were checked on 24 October 2026. Publisher pages hosted by SAGE and ACM were not relied on where direct requests returned HTTP 403; the cited DOI metadata was instead verified through Crossref.
- No Flowentra interview, usability study, security test, runtime evaluation, benchmark, or performance improvement is claimed by this review.
