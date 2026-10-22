# 3. Critical Literature Review

**Search and selection method:** Publications were selected for direct relevance to four design questions: integrated customer workflows, responsible AI service assistance, controlled tool/API invocation, and evaluation/security limitations. Publisher pages or publication repositories were checked for titles and publication venues on 22 October 2026. The table contains **13 meaningfully used scientific publications** (2020–2024; 12 from 2021–2024 and one foundational 2020 work). This is a structured engineering-oriented review, not a claim of an exhaustive systematic literature search.

## 3.1 Structured analysis table

| ID | Scientific publication / year and venue | Relevant finding or contribution | Limitations / critical interpretation | Concrete application to diploma |
|---|---|---|---|---|
| L01 | Huang & Rust (2021), *Journal of the Academy of Marketing Science* | Distinguishes AI for standardized automation, analytical support and relational interaction. | Conceptual marketing framework, not evidence that a particular CRM integration is effective. | Keep repetitive CRUD deterministic; reserve LLM for language tasks and review. |
| L02 | Ferraro et al. (2024), *Business Horizons* | Discusses benefits and paradoxes of generative AI in customer service, including privacy and trust. | Managerial synthesis rather than validation of this implementation. | Explain assistant limitations and require user confirmation. |
| L03 | Mialon et al. (2023), *Transactions on Machine Learning Research* | Surveys language models augmented with tools and reasoning. | Broad taxonomy; choice of tool design still needs empirical validation. | Use an explicit internal action catalogue, not unconstrained execution. |
| L04 | Yao et al. (2023), *ICLR* — ReAct | Combines planning/reasoning and external actions. | Agent demonstrations do not guarantee safety or availability of business data. | Separate proposal generation from server-authorized execution. |
| L05 | Schick et al. (2023), *NeurIPS* — Toolformer | Illustrates model/API calling. | Tool-selection research is not transaction consistency or access control. | Treat model output as untrusted structured input. |
| L06 | Li et al. (2023), *EMNLP* — API-Bank | Benchmark highlights API selection and parameter errors. | Benchmark distributions differ from SME CRM use. | Build action-intent corpus with missing-field and wrong-tool cases. |
| L07 | Qin et al. (2024), *ICLR* — ToolLLM | Studies large sets of real-world tool APIs and tool-use evaluation. | Large-scale generic tool use exceeds MVP; complexity itself creates failure cases. | Keep AI allowlist small and test precision, not number of tools. |
| L08 | Liu et al. (2024), *TACL* — Lost in the Middle | Long-context models may miss relevant information by position. | Not a direct study of client records; vendor/model dependent. | Provide compact structured facts, not unbounded record dumps. |
| L09 | Wei et al. (2022), *NeurIPS* — Chain-of-Thought | Demonstrates reasoning improvements on selected tasks with exemplars. | Benchmarked reasoning performance does not ensure valid CRM action parameters. | Validate required parameters and never infer missing approval. |
| L10 | Shinn et al. (2023), *NeurIPS* — Reflexion | Uses feedback to improve language-agent decisions. | Feedback loops can also amplify mistakes without ground truth. | Keep explicit AI error logs and regression cases for repeated failures. |
| L11 | Greshake et al. (2023), *ACM AISec* | Demonstrates indirect prompt-injection risks in LLM-connected applications. | Attack setup varies across implementations. | Never trust incoming customer text as privileged instructions; RBAC server-side. |
| L12 | Xiao Liu et al. (2024), *ICLR* — AgentBench | Evaluates agents across different interaction environments. | General benchmarks do not substitute domain-specific acceptance tests. | Evaluate assistant on real role-based CRM scenarios and state changes. |
| L13 | Lewis et al. (2020), *NeurIPS* — Retrieval-Augmented Generation | Introduces retrieval support for factual generation. | Foundational work precedes current tool-calling models; RAG is not automatically needed. | Consider scoped retrieval for future report Q&A; defer until requirements justify it. |

## 3.2 Synthesis and research gap

**Customer workflows.** L01–L02 support careful task division between conventional software and AI assistance. Neither demonstrates the requirements of the particular intended businesses, so user interviews remain essential. Claims of universal productivity benefits would be unsupported at this point.

**Tool-using assistants.** L03–L07 propose or benchmark models invoking external tools, but an external language model must not be the system of record. The diploma will store data through ordinary authenticated API handlers. Every proposed action is checked for valid schema, permitted role, organization scope, entity existence, idempotency and state invariants.

**Reliability and safety.** L08–L12 motivate tests for context position, tool-choice errors, retries, injection and authorized state mutation. The project’s specific contribution is engineering and evaluating a *guarded* AI-assisted CRM workflow, not inventing a new language model.

**Architecture implications.** The chosen implementation should implement one deterministic data model shared between the ordinary user interface and the AI proposal endpoint. A proposed tool invocation is a draft, not a command. A separate confirmation endpoint re-checks business constraints in a transaction. An LLM may propose text and extract candidate fields, but may not access SQL or independently perform writes.

## 3.3 Citation list (publisher / scholarly links)

- **L01.** Huang, M.-H., & Rust, R. T. (2021). A strategic framework for artificial intelligence in marketing. *Journal of the Academy of Marketing Science, 49*, 30–50. https://doi.org/10.1007/s11747-020-00749-9
- **L02.** Ferraro, C., et al. (2024). The paradoxes of generative AI-enabled customer service: A guide for managers. *Business Horizons, 67*(5), 549–559. https://doi.org/10.1016/j.bushor.2024.04.013
- **L03.** Mialon, G., et al. (2023). Augmented Language Models: A Survey. *Transactions on Machine Learning Research*. https://ai.meta.com/research/publications/augmented-language-models-a-survey/
- **L04.** Yao, S., et al. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. *ICLR*. https://openreview.net/forum?id=WE_vluYUL-X
- **L05.** Schick, T., et al. (2023). Toolformer: Language Models Can Teach Themselves to Use Tools. *NeurIPS 36*. https://papers.neurips.cc/paper_files/paper/2023/hash/d842425e4bf79ba039352da0f658a906-Abstract-Conference.html
- **L06.** Li, M., et al. (2023). API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs. *EMNLP*, 3102–3116. https://aclanthology.org/2023.emnlp-main.187/
- **L07.** Qin, Y., et al. (2024). ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs. *ICLR*. https://proceedings.iclr.cc/paper_files/paper/2024/hash/28e50ee5b72e90b50e7196fde8ea260e-Abstract-Conference.html
- **L08.** Liu, N. F., et al. (2024). Lost in the Middle: How Language Models Use Long Contexts. *Transactions of the ACL, 12*, 157–173. https://aclanthology.org/2024.tacl-1.9/
- **L09.** Wei, J., et al. (2022). Chain-of-Thought Prompting Elicits Reasoning in Large Language Models. *NeurIPS 35*. https://papers.neurips.cc/paper_files/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html
- **L10.** Shinn, N., et al. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. *NeurIPS 36*. https://papers.neurips.cc/paper_files/paper/2023/hash/1b44b878bb782e6954cd888628510e90-Abstract-Conference.html
- **L11.** Greshake, K., et al. (2023). Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection. *ACM AISec ’23*. https://doi.org/10.1145/3605764.3623985
- **L12.** Liu, X., et al. (2024). AgentBench: Evaluating LLMs as Agents. *ICLR*. https://proceedings.iclr.cc/paper_files/paper/2024/hash/e9df36b21ff4ee211a8b71ee8b7e9f57-Abstract-Conference.html
- **L13.** Lewis, P., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS 33*. https://arxiv.org/abs/2005.11401

**Critical limitation of this review:** It emphasizes AI/control architecture. The team should add sector-specific CRM adoption, appointment scheduling and usability papers if user interviews identify a narrower service-industry use case. This is stronger academically than presenting AI references as proof of customer demand.
