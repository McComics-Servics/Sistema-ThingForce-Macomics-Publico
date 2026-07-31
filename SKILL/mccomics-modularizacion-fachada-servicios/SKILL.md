---
name: mccomics-modularizacion-fachada-servicios
description: Usa esta skill para modularizar archivos gigantes de McComicsUp Suite Pro IA en fachadas, registradores de callbacks, servicios, comandos, partials o planners, preservando callbacks HtmlDialog, rutas set_file, contratos Ruby-Go, modo sombra, rollback, pruebas Remote Console y deploy seguro.
---

# Skill McComics Modularizacion Fachada Servicios

## Activar Cuando

- un archivo runtime McComics supera 500 lineas u 80 KB y debe quedar mantenible
- el cambio toca SketchUp Ruby, HtmlDialog, callbacks, JS/CSS de ventanas o servicios internos
- una migracion Ruby -> Go/C++ esta en modo sombra y no se debe romper el fallback Ruby
- se necesita convertir un monolito en fachada + registradores + servicios con evidencia real

## Lectura Obligatoria

1. `./AGENTS.md`, `./SELECTOR_DE_MEMORIA.md` y las 3 skills ThinkForce obligatorias.
2. `./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mc_graph_out/GRAPH_REPORT.md`.
3. `./McComics-Agent-System/skills/mccomics-patch-safety-loop/SKILL.md`.
4. `./McComics-Agent-System/skills/mccomics-remote-console-preflight/SKILL.md` y `./McComics-Agent-System/PROTOCOLO_REMOTE_CONSOLE.md` si hay runtime SketchUp.
5. El owner exacto del modulo: arquitectura, plan vivo, checklist o contrato de migracion que aplique.

## Patron Canonico

- Fachada: conserva entrypoints publicos, carga dependencias y expone coordinacion de alto nivel.
- Registradores: registran callbacks por familia. No deben contener logica pesada.
- Servicios: contienen logica privada/reutilizable. No registran callbacks HtmlDialog.
- Comandos: encapsulan acciones de usuario cuando el flujo tiene validacion, undo o side effects claros.
- Partials/bundles: dividen HTML, CSS o JS en fuentes mantenibles, pero mantienen el archivo cargado por SketchUp si `set_file` lo requiere.
- Planners: solo se mueven a Go si existe DTO, fixture Ruby golden, test Go y probe remoto del slice.

## Flujo Seguro

1. Identificar superficie publica: callbacks, IDs HTML, scripts cargados, `set_file`, contratos JSON, rutas y nombres de metodos.
2. Capturar evidencia previa con Remote Console o el chequeo ejecutable mas cercano.
3. Crear backup comparativo de cada archivo vivo antes de editar.
4. Extraer un slice pequeno y contiguo por ciclo; no abrir varios owners al mismo tiempo.
5. Mantener nombres publicos exactos: callbacks, IDs, rutas, DTOs, archivos cargados por SketchUp.
6. Actualizar requires, reload slice probe e indices reutilizables si se agregan archivos.
7. Ejecutar sintaxis local del mismo stack: `ruby -c`, `node --check`, tests Go si toca migracion.
8. Recargar el slice con Remote Console y repetir el probe que valida el contrato publico.
9. Actualizar plan, checklist, bitacora, inventario de lineas y porcentaje de avance.
10. Regenerar el grafo incremental si cambia la estructura del repo.

## Rutas Unicode Y Backups

- Evitar crear backups hacia rutas con `™` desde scripts Ruby inline en Windows: se valido que puede nacer una carpeta mojibake `Sistema ThingForceÔäó McComics`.
- Para backups en carpetas con Unicode, preferir PowerShell con `Resolve-Path` + `Copy-Item -LiteralPath`, o verificar inmediatamente `git status` buscando `ThingForceÔ`/`ThingForce\303`.
- Si aparece una carpeta mojibake creada por el agente, copiar primero su contenido al destino correcto, verificar ruta absoluta dentro del workspace y eliminar solo esa carpeta accidental.

## Guardrails McComics

- Ruby sigue siendo owner productivo de SketchUp API, HtmlDialog, seleccion, undo, atributos, timers y tools.
- Go/C++ en sombra no autoriza borrar ni retirar Ruby. `source_retirement.json` manda sobre cualquier retiro.
- No cambiar contratos `contracts/mccomics_core/v1/` durante una modularizacion salvo que el usuario pida migracion contractual.
- No recrear monolitos retirados por el usuario si el runtime ya carga fuentes modulares y los probes pasan.
- `app.js` de Estructura Pro no es obligatorio si `index.html` carga los JS modulares y el probe confirma `mode=modular_validated`.
- Evitar hardcoding de medidas, materiales, flags o rutas; leer de inputs, presets, configs o contratos existentes.

## Validacion Minima

- Ruby: `ruby -c` en cada archivo tocado y entrypoint afectado.
- JS: `node --check` en los modulos modificados o bundle activo.
- Go: `go test -count=1 -timeout=60s ./cmd/... ./internal/core` si la tajada toca migracion, DTOs o planners nativos.
- Remote Console: reload slice, probe de callbacks, smoke del modulo y status de migracion cuando el slice convive con Go sombra.
- Suite: smoke de ventanas si se tocaron HtmlDialogs o navegacion entre modulos.

## Destinos Documentales

- Planes/checklists: `./Utilidades/PLanes y ChekList/McComicsUp Suite Pro IA/`.
- Debug reutilizable: `./Utilidades/Codigos Debug/Codigos Debug Reutilizables/08_suite/`.
- Herramientas reutilizables: `./Utilidades/Modulos y Herramientas Reutilizables/INDICE.md`.
- Skill nueva o actualizada: registrar tambien en `./McComics-Agent-System/skills/INDICE_SKILLS.md`, `./SELECTOR_DE_MEMORIA.md` y `./McComics-Agent-System/02-MAPA_FUENTES_ORIGINALES.md` si abre ruta nueva.
