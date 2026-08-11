# src/features/

Cada funcionalidad vive en su propia carpeta autocontenida:
`src/features/<modulo>/` con sus componentes, hooks, estilos y tests. Se crea
con la skill `scaffold-feature-module` (ver `.claude/skills/`). El módulo se
activa/desactiva desde `src/config/features.ts` — ver `docs/PROJECT.md`
sección 4 y `docs/DESIGN.md`.

Módulos previstos (v1): `countdown`, `gallery`, `location`, `dress-code`,
`gift-table`, `music-player`, `i18n`, `rsvp`, `admin`.
