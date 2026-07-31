# INVENTARIO RESUMIDO DE SKILLS VIVAS

> **Nota de rutas**: todas las rutas en este archivo son relativas a `McComics-Agent-System/skills/`.
> Desde la raiz del sistema, anteponer `./McComics-Agent-System/skills/` a cada ruta listada.

Este es el inventario canonico resumido de skills locales del workspace. Se consulta primero para saber que skill abrir, sin tener que cargar todo el corpus.

## Reglas operativas

- revisar este archivo antes de abrir una skill individual
- cargar solo la skill que realmente corresponda
- si la tarea cruza UI HTML y servidores, cargar ambas
- toda skill nueva debe registrarse aqui en el mismo cambio con ruta exacta, titulo-resumen y cuando cargar
- estas skills viven en `./McComics-Agent-System/skills/` y son la referencia real actual para OpenCode, Codex y Claude Code

## Inventario rapido — UI, ventanas y operacion

| Skill                                                                       | Titulo-resumen                                                                        | Cargar cuando                                                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `./McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md`            | Canon visual y operativo de ventanas HTML McComics                                    | HtmlDialog, WebDialog, dashboards, CSS, JS, chat UI y layout general                                       |
| `./McComics-Agent-System/skills/mccomics-contrato-visual-ventanas/SKILL.md` | Contrato visual y medicion exacta de ancho/alto por overflow real                     | Cambios de header, branding, resize, spacing, tabs o layout en ventanas McComics                           |
| `./McComics-Agent-System/skills/mccomics-dialogos-tabs-compactos/SKILL.md`  | Patron de dialogos compactos con tabs dinamicas y scroll interno                      | Ventanas pequenas o medianas con mucho contenido, tabs, CTA arriba y cero aire muerto                      |
| `./McComics-Agent-System/skills/mccomics-servidores/SKILL.md`               | Backend local, bridges, workers y procesos auxiliares                                 | Servidores locales, endpoints, polling, workers, dashboards con estado externo                             |
| `./McComics-Agent-System/skills/mccomics-migracion-hibrida-go-cpp/SKILL.md` | Migracion Ruby a Go/C++ con fixtures, modo sombra, licencias y actualizador           | Migrar modulos Ruby, tocar `native/mccomics_core`, crear releases firmados o conectar adapters reversibles |
| `./McComics-Agent-System/skills/mccomics-modularizacion-fachada-servicios/SKILL.md` | Modularizacion por fachadas, callbacks, servicios y probes remotos                   | Partir archivos gigantes McComics sin romper callbacks, `set_file`, Ruby owner, Go sombra ni deploy seguro |
| `./McComics-Agent-System/skills/mccomics-remote-console-preflight/SKILL.md` | Preflight obligatorio para corridas remotas con PowerShell, UTF-8 y rutas Unicode     | Antes de cualquier probe Remote Console, script `.ps1` asociado o corrida con rutas largas, espacios o `™` |
| `./McComics-Agent-System/skills/mccomics-remote-console-suite/SKILL.md`     | Validacion remota de ventanas McComics en SketchUp                                    | Remote Console, docking, probes reutilizables y evidencia de runtime                                       |
| `./McComics-Agent-System/skills/mccomics-patch-safety-loop/SKILL.md`        | Bucle seguro de backup, evidencia previa, validacion repetida y comparacion posterior | Cambios vivos con riesgo en SketchUp, HtmlDialog, bridges o slices no 100% claros                          |
| `./McComics-Agent-System/skills/mccomics-formaciones-irrompibles/SKILL.md`  | Blindaje del escalado/redimensionado grupal y formaciones C/L/O con checker de invariantes ejecutable | **SIEMPRE** antes de tocar escalador, reflow de formaciones, joystick, zócalos o `handle_scaled_update` |
| `./McComics-Agent-System/skills/mccomics-publicacion-segura-github/SKILL.md` | Publicación SEGURA de plugin McComics® en GitHub: repo público "vitrina" (estrellas, demos, marketing) + repo privado "core" (IP: código real, licencias, despiece) | Al **publicar/distribuir** el plugin en GitHub: estrategia freemium, protección de IP, estructura de dos repos, releases firmados |

## Inventario rapido — Programas McComicsUp

El indice completo de estas skills vive en `./McComics-Agent-System/skills/skills Sketchup/INDICE_SKILLS.md`

| ID   | Skill                                                       | Titulo-resumen                                    | Cargar cuando                                           |
| ---- | ----------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| SK01 | `skills Sketchup/SK01_registro_carga_empaquetado.md`        | Registro, carga y empaquetado del plugin          | Crear plugin nuevo, loader, `.rbz`, registrar extension |
| SK02 | `skills Sketchup/SK02_ui_menus_toolbars.md`                 | Menus, toolbars, iconos y comandos                | Botones, menus, toolbars e iconos                       |
| SK03 | `skills Sketchup/SK03_htmldialog_webdialog.md`              | HtmlDialog y comunicacion Ruby↔JS                 | Ventanas HTML, CSS y puente Ruby↔JS                     |
| SK04 | `skills Sketchup/SK04_geometria_transformaciones.md`        | Geometria, transformaciones y booleanas           | Crear, mover, escalar, rotar piezas y recortes          |
| SK05 | `skills Sketchup/SK05_materiales_texturas_capas.md`         | Materiales, texturas, UV y capas                  | Materiales, texturas, UV y layers                       |
| SK06 | `skills Sketchup/SK06_observers_callbacks_timers.md`        | Observers, callbacks, timers y concurrencia       | Eventos, observers, timers y sincronizacion             |
| SK07 | `skills Sketchup/SK07_ruby_sintaxis_tipos.md`               | Ruby, validaciones y edge cases                   | Escribir codigo Ruby y cubrir casos limite              |
| SK08 | `skills Sketchup/SK08_rendimiento_memoria.md`               | Rendimiento, memoria y modelos grandes            | Optimizar velocidad o reducir consumo                   |
| SK09 | `skills Sketchup/SK09_atributos_operaciones_undo.md`        | Atributos, operaciones y undo/redo                | `start_operation`, atributos y persistencia             |
| SK10 | `skills Sketchup/SK10_melamina_muebles_mccomics.md`         | Melamina, muebles y despiece McComics             | Muebles, piezas, cajones, despiece y unidades mm        |
| SK11 | `skills Sketchup/SK11_reglas_ia_errores.md`                 | Reglas obligatorias y errores historicos SketchUp | **SIEMPRE en SketchUp** antes de cambios tecnicos       |
| SK12 | `skills Sketchup/SK12_cortes_especiales.md`                 | Cortes especiales, muescas y recortes             | Booleanas, recortes parametrizados y muescas            |
| SK13 | `skills Sketchup/SK13_Corte_45_cargador_Sistema_Frances.md` | Corte a 45 y sistema frances                      | Cortes a 45, cantos especiales y sistema frances        |

## Inventario rapido — Dominio melamina y cocinas

| Skill                                                                               | Titulo-resumen                                      | Cargar cuando                                               |
| ----------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| `./McComics-Agent-System/skills/skills de diseñeo de cocinas/SKILL_MELAMINA_MCC.md` | Reglas McComics de melamina, herrajes y fabricacion | Muebles, despiece, piezas, ranuras, cortes y manufactura    |
| `./McComics-Agent-System/skills/skills de diseñeo de cocinas/SKILL_COCINAS_MCC.md`  | Diseno de cocinas integrales y modulos              | Cocinas, gabinetes, alacenas, modulos, islas y distribucion |

## Inventario rapido — Seguridad y marketplace

| Skill                                                                                        | Titulo-resumen                            | Cargar cuando                                                     |
| -------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| `./McComics-Agent-System/skills/skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md` | Seguridad de servidores, IDE y licencias  | Seguridad, servidor HTTP, cifrado, CORS, autenticacion, licencias |
| `./McComics-Agent-System/skills/skills-seguridad-ide/14_SKILL_MARKETPLACE_EXTENSIONES_IA.md` | Marketplace, extensiones y proveedores IA | Open VSX, marketplace, fork VS Code, Copilot, Claude, BYOK        |

## Inventario rapido — Arquitectura Ruby avanzada

| Skill                                                                                                     | Titulo-resumen                                         | Cargar cuando                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `./McComics-Agent-System/skills/skills-arquitectura-ruby/SKILL_MCCOMICS_ARQUITECTURA_PARAMETRICA_RUBY.md` | Arquitectura parametrica profunda y matrices complejas | Componentes externos `.skp`, matrices complejas, herrajes, BoundingBox |
| `./McComics-Agent-System/skills/skills-arquitectura-ruby/McComics_Ruby_Architect.md`                      | Ingenieria SketchUp Ruby a nivel produccion            | Complemento de SK04 para colisiones, anclajes y fallback jerarquico    |

## Referencia general

| Skill                                                                     | Titulo-resumen                            | Cargar cuando                                                                    |
| ------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------- |
| `./McComics-Agent-System/skills/Skill_Inteligente_McComics_Organizada.md` | Orientacion tecnica amplia por categorias | Punto de partida rapido cuando la tarea es amplia y aun no esta claro el routing |

## Continuidad obligatoria

- una skill nueva debe vivir en una carpeta propia dentro de `./McComics-Agent-System/skills/`
- el mismo cambio que crea una skill nueva debe registrarla aqui con ruta exacta, titulo-resumen y cuando cargar
- si la skill abre una ruta nueva de trabajo, hay que actualizar `./SELECTOR_DE_MEMORIA.md` y `./McComics-Agent-System/02-MAPA_FUENTES_ORIGINALES.md`
- no dejar skills huerfanas en disco ni skills nuevas escondidas solo en una conversacion

## Carga recomendada por tema

- dialogo compacto con tabs y scroll: `mccomics-dialogos-tabs-compactos` + `mccomics-ventanas-html` + SK03
- header, branding, resize o layout de ventanas McComics: `mccomics-contrato-visual-ventanas` + `mccomics-ventanas-html` + SK03
- HtmlDialog, WebDialog, dashboard interno, chat UI, CSS, layout general: `mccomics-ventanas-html` + SK03
- bridge, worker Python, servidor local, endpoints, healthcheck: `mccomics-servidores`
- migracion Ruby a Go/C++, modo sombra, fixtures golden, licencias/releases: `mccomics-migracion-hibrida-go-cpp` + `mccomics-servidores` + `mccomics-patch-safety-loop`
- modularizar archivos gigantes McComics: `mccomics-modularizacion-fachada-servicios` + `mccomics-patch-safety-loop` + skill del owner
- Remote Console, docking, titulos, popups y validacion de ventanas de suite: `mccomics-remote-console-preflight` + `mccomics-remote-console-suite` + `mccomics-ventanas-html`
- cambios vivos con riesgo, necesidad de backup comparativo o falta de certeza total: `mccomics-patch-safety-loop` + `mccomics-remote-console-preflight` + skill del owner
- Ruby puro, observers, timers, atributos, undo: SK06 + SK07 + SK09
- geometria, transformaciones, piezas nuevas: SK04 + (SK08 si modelo grande)
- melamina, cajones, estructura, despiece: SK10 + `SKILL_MELAMINA_MCC.md`
- cocinas integrales: SK10 + `SKILL_COCINAS_MCC.md` + `SKILL_MELAMINA_MCC.md`
- componentes externos, herrajes, matrices complejas: SK04 + `SKILL_MCCOMICS_ARQUITECTURA_PARAMETRICA_RUBY.md`
- plugin nuevo o loader: SK01 + SK02
- VPS publico, Docker, reverse proxy, PostgreSQL, Redis, Cloudflare edge, backups, observabilidad y hardening de produccion: `ThinkForce/14_SKILL_CIBERSEGURIDAD_Y_RENDIMIENTO_DE_SERVIDORES.md` + `skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md`
- seguridad o servidor HTTP: `skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md`
- Open McComics IDE o marketplace: `skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md` + `skills-seguridad-ide/14_SKILL_MARKETPLACE_EXTENSIONES_IA.md`
- si una tarea toca ambas capas UI+backend: primero `mccomics-ventanas-html`, luego `mccomics-servidores`

---

<!-- sistema: ThinkForce™ McComics | archivo: INDICE_SKILLS.md | actualizado: 2026-05 -->
