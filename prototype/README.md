# Interactive prototype — Clario (temporary design label)

Open `index.html` in a current desktop/mobile browser. It is a standalone self-contained HTML/CSS/JavaScript **interactive UX prototype**; no npm, server or credentials needed.

Demo flow: Overview → Clients (add) → Deals (add) → Tasks (mark done) → Bookings (try overlapping `Employee A`, `2026-10-23`, `10:30`–`11:30` to see demo conflict) → AI Assistant (try “Create a task to call the new client tomorrow”, inspect and confirm/reject) → Reports (counts update).

Important: The prototype maintains records in **JavaScript in memory** only. Reload resets all records. It contains synthetic records (`@example.org`). No real AI model is used: the proposal flow is deterministic. Auth/RBAC, multi-user concurrency, database transactions, accessibility audit, real React components and secure server integration remain to be implemented and tested. A browser-only conflict check is **not** evidence of safe server scheduling.

`Clario` is just a visual placeholder name; the official diploma topic remains *Development of a Business Management and CRM Platform with an Embedded AI Assistant*.
