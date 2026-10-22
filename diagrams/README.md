# Architecture diagrams

University-required diagrams are provided as both **editable source** and **readable export**:

- `01_System_Context.dot` → `.svg` and `.png`.
- `02_Use_Cases.puml` (actual UML use-case source), plus `02_Use_Cases.dot` → `.svg` and `.png` for offline preview.
- `03_Components.dot` → `.svg` and `.png`.

Edit `.dot` files with Graphviz (`dot -Tsvg FILE.dot -o FILE.svg`). Edit `.puml` with PlantUML; changes to `.puml` are not automatically reflected in the DOT-rendered overview. Keep both versions semantically aligned when revising. All depict **proposed**, not deployed, architecture.
