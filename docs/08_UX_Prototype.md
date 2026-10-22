# 8. UX Prototype and Representative Scenarios

The deliverable is an **interactive browser prototype** at `prototype/index.html`. It uses deterministic sample data held in browser memory and makes **no calls to a real backend or AI model**. Therefore the prototype demonstrates proposed interaction, not production functionality, database persistence or security. The page includes an explicit prototype banner.

## 8.1 Information architecture / screen map

1. **Overview:** high-level counts, current activity and a concise navigation path.
2. **Clients:** view/search records; add a client through a validated sample form.
3. **Deals:** stage overview and deal creation linked to a sample client.
4. **Tasks:** assignee, due date and completion state.
5. **Bookings:** staff, service, date and time; conflict feedback in prototype for example data.
6. **AI Assistant:** enter an instruction; show a simulated typed proposal; require explicit confirmation before showing a demo-state change.
7. **Reports:** simple aggregates from mock in-browser data.

## 8.2 Critical paths for usability evaluation

| ID | Persona | User task | Completion criterion |
|---|---|---|---|
| UX-01 | Manager | Find a client and add a follow-up task | Correct client and task are displayed |
| UX-02 | Manager | Create a booking for a known staff member | Appropriate slot is shown; overlapping test slot visibly rejected |
| UX-03 | Manager | Ask AI to prepare a task, inspect its parameters, and approve | UI distinguishes AI proposal from committed action |
| UX-04 | Owner | Locate current counts and deal-stage report | Counts are understandable without opening multiple unrelated screens |

## 8.3 UI controls and states

Every CRUD screen should have a search/empty state, a loading state after integration, an error state for network/validation failure, labels for fields, keyboard-visible focus, and an explicit saved/unsaved state. The booking dialog should always display employee/resource and local timezone. Do not claim a conflict is prevented merely because the browser disables a slot; the server must enforce it.

## 8.4 Demonstration script for pre-defense

Open `prototype/index.html` in a modern browser. Navigate Overview → Clients → Deals → Tasks → Bookings → AI Assistant → Reports. Enter a sample client. Create a booking for a sample employee; try the same slot again to see a demo conflict. Ask the AI demo `create a task to call the client tomorrow`; explain that the proposal is simulated and deliberately gated behind confirmation. Show that the Word report and architecture diagrams specify a **separate future backend** that must re-check authorization and state.

## 8.5 Design validation

Run 5 pilot participants only if available, collect task success, completion time, errors and 10-item System Usability Scale. Do not fill results without real participation. The prototype is a baseline for discussion and for implementation handoff to the frontend engineer.
