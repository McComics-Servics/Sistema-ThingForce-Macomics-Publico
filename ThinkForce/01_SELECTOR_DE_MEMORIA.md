# SELECTOR DE MEMORIA — SISTEMA DE 12 ARCHIVOS

> **ROL: Router cognitivo ThinkForce** — decide qué skills de razonamiento, negocio y dominio cargar según el tipo de tarea. Distinto del `SELECTOR_DE_MEMORIA.md` de la raíz, que gestiona archivos del repo.

---

## PROPÓSITO

Este selector impide que la IA cargue todo el paquete a la vez.
Decide con precisión QUÉ cargar según el tipo de tarea, evitando:

- sobrecarga de contexto,
- pérdida de foco,
- respuestas infladas,
- uso de reglas irrelevantes,
- costo innecesario en tokens.

---

## REGLA SUPREMA

Antes de iniciar cualquier tarea, la IA debe ejecutar SIEMPRE este orden:

1. Identificar el tipo real de tarea.
2. Cargar SIEMPRE las 3 Skills base (archivos 02, 03, 04).
3. Cargar SOLO los Módulos de dominio necesarios (archivos 05-08, 10).
4. Cargar herramientas complementarias solo si aplican (archivos 09, 11, 12).
5. No cargar piezas que no aporten valor directo a la tarea actual.
6. Si hay duda entre dos rutas, cargar la más pequeña que mantenga calidad suficiente.
7. Si la tarea cambia de naturaleza a mitad de trabajo, reevaluar la carga.

---

## ARQUITECTURA DEL SISTEMA

### Capa 1 — Base obligatoria (se carga SIEMPRE)

- `02_SKILL_PLANIFICACION_EXTREMA.md` — Planificar, investigar, verificar, profundizar (22+ técnicas integradas)
- `03_SKILL_ESTANDAR_INDUSTRIAL.md` — Calidad, validar, probar, aprobar (compuertas, estados, cuantificación)
- `04_SKILL_AGENTE_OPERATIVO.md` — Conducta, continuidad, memoria, contexto (bitácora, reanudación, economía)
- `13_ANEXO_UX_BACKEND_PROOF_v1.md` — Regla estricta 4/4 UX↔Backend End-to-End (obligatoria para toda IA del IDE)

Cada Skill base ya incluye integradas las capacidades de investigación, validación y memoria que antes estaban en archivos separados (Anexos y Motores). No se necesitan capas adicionales.

### Capa 2 — Módulos de dominio (se carga solo lo necesario)

- `05_MODULO_NEGOCIOS_Y_SERVICIOS.md` — Negocios, pricing, rentabilidad, servicios, punto de equilibrio
- `06_MODULO_SOFTWARE_Y_PRODUCTOS_DIGITALES.md` — Software, plugins, apps, SaaS, releases, arquitectura
- `07_MODULO_MARKETING_Y_VENTAS.md` — Marketing, embudos, ventas, lanzamientos, conversión
- `08_MODULO_LIBROS_Y_FORMACION.md` — Libros, cursos, ebooks, formación, ecosistema educativo, separación público/premium
- `10_MODULO_OFERTAS_Y_PRODUCTIZACION.md` — Ofertas, empaquetado, tiers, bundles, pricing estructural, upsells/downsells

### Capa 3 — Herramientas complementarias (según necesidad)

- `09_GUIA_PUBLICACION_Y_PROMOCION.md` — Solo para publicar/promover productos digitales y crear videos virales
- `11_AGENTS_CONFIGURACION_UNIVERSAL.md` — Solo para configurar IDEs y workspaces
- `14_SKILL_CIBERSEGURIDAD_Y_RENDIMIENTO_DE_SERVIDORES.md` — VPS, Docker, hardening, Cloudflare edge, PostgreSQL, Redis, backups, relay QR y despliegue público seguro
- `../Utilidades/Claude Code/Sistema_Ahorro_Tokens/00_PROTOCOLO/PROTOCOLO_USO_CLAUDE_SKILLS_MCCOMICS.md` — REGLA OBLIGATORIA DE ENTRADA para toda IA; regula inspección, planificación, herramientas, cambios, Claude Code, Execution Runtime, plugins locales y análisis compacto

### Capa 4 — McComics Plugin / SketchUp Ruby (solo para tareas técnicas del plugin)

> Cuando la tarea toca el plugin McComicsUp, SketchUp Ruby, melamina, despiece, o arquitectura paramétrica, NO usar los módulos de negocio. Saltar directamente a este routing técnico.

**Ruta primaria técnica:** `../McComics-Agent-System/skills/INDICE_SKILLS.md`  
(usar primero como inventario resumido para ver titulo y uso de cada skill; luego abrir solo la skill exacta necesaria)

| Si la tarea toca...                                                                     | Cargar                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SketchUp Ruby general, errores, validaciones                                            | SK11 (siempre) + skill del tema                                                                                                                                                               |
| Geometría, transformaciones, piezas, booleanas                                          | SK04 + (SK08 si es modelo grande)                                                                                                                                                             |
| Melamina, cajones, ranuras, despiece                                                    | SK10 + `../McComics-Agent-System/skills/skills de diseñeo de cocinas/SKILL_MELAMINA_MCC.md`                                                                                                   |
| Cocinas integrales                                                                      | SK10 + `../McComics-Agent-System/skills/skills de diseñeo de cocinas/SKILL_COCINAS_MCC.md` + `../McComics-Agent-System/skills/skills de diseñeo de cocinas/SKILL_MELAMINA_MCC.md`             |
| HtmlDialog, UI HTML, CSS, ventanas                                                      | SK03 + `../McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md`                                                                                                                      |
| Dialogo compacto con tabs y scroll interno                                              | SK03 + `../McComics-Agent-System/skills/mccomics-dialogos-tabs-compactos/SKILL.md` + `../McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md`                                        |
| Servidor local, bridge, worker Python                                                   | `../McComics-Agent-System/skills/mccomics-servidores/SKILL.md`                                                                                                                                |
| Componentes externos, herrajes, matrices                                                | SK04 + `../McComics-Agent-System/skills/skills-arquitectura-ruby/SKILL_MCCOMICS_ARQUITECTURA_PARAMETRICA_RUBY.md`                                                                             |
| Loader, registro, empaquetado .rbz                                                      | SK01 + SK02                                                                                                                                                                                   |
| Seguridad, servidor HTTP, cifrado, licencias, VPS, Docker, hardening o relay QR público | `14_SKILL_CIBERSEGURIDAD_Y_RENDIMIENTO_DE_SERVIDORES.md` + `../McComics-Agent-System/skills/skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md`                                      |
| Extensiones, marketplace, Open McComics IDE                                             | `../McComics-Agent-System/skills/skills-seguridad-ide/13_SKILL_SEGURIDAD_SERVIDORES_E_IDE.md` + `../McComics-Agent-System/skills/skills-seguridad-ide/14_SKILL_MARKETPLACE_EXTENSIONES_IA.md` |
| Estructura Pro, ModeConfig, engines                                                     | `../McComics-Agent-System/17-ARQUITECTURA_ESTRUCTURA_PRO.md`                                                                                                                                  |
| Errores nuevos no en índice SketchUp                                                    | `../McComics-Agent-System/ANEXO NUEVOS ERRORES DOCUMENTADOS.md`                                                                                                                               |
| Debuguear código                                                                        | `../Utilidades/Codigos Debug/Codigos Debug Reutilizables/00_INDICE.md`                                                                                                                        |
| Reutilizar módulo existente                                                             | `../Utilidades/Modulos y Herramientas Reutilizables/`                                                                                                                                         |

## MATRIZ DE DECISIÓN RÁPIDA

| Tipo de tarea                      | Skills base | Negocios      | Software      | Marketing | Libros | Ofertas |
| ---------------------------------- | ----------- | ------------- | ------------- | --------- | ------ | ------- |
| Idea de negocio                    | ✅          | ✅            | —             | —         | —      | —       |
| Plan de proyecto complejo          | ✅          | Según dominio | Según dominio | —         | —      | —       |
| Auditoría de estrategia            | ✅          | ✅            | —             | —         | —      | —       |
| Desarrollo de software             | ✅          | —             | ✅            | —         | —      | —       |
| Revisión de entregable             | ✅          | —             | —             | —         | —      | —       |
| Producción de contenido/marketing  | ✅          | —             | —             | ✅        | —      | —       |
| Creación de libro/curso/ebook      | ✅          | —             | —             | —         | ✅     | —       |
| Lanzamiento de producto            | ✅          | ✅            | Según tipo    | ✅        | —      | ✅      |
| Automatización operativa           | ✅          | —             | ✅            | —         | —      | —       |
| Tarea simple y puntual             | ✅          | —             | —             | —         | —      | —       |
| Empaquetar/productizar oferta      | ✅          | —             | —             | —         | —      | ✅      |
| Ecosistema libro + paquete premium | ✅          | —             | —             | ✅        | ✅     | ✅      |
| Diseño de escalera de valor/tiers  | ✅          | ✅            | —             | —         | —      | ✅      |
| Formación/curso con venta          | ✅          | —             | —             | ✅        | ✅     | —       |
| Configurar IDE/workspace           | Solo 11     | —             | —             | —         | —      | —       |

---

## DETECCIÓN POR PALABRAS CLAVE

### Cargar MÓDULO NEGOCIOS (05) si aparecen:

- negocio, servicio, clientes, precio, oferta, punto de equilibrio
- ventas, rentabilidad, margen, validación de mercado, nicho
- cobrar, ticket, unidad económica, escalamiento

### Cargar MÓDULO SOFTWARE (06) si aparecen:

- software, app, plugin, extensión, arquitectura, backend, frontend
- código, release, bug, especificación, MVP, roadmap
- licencia, SaaS, suscripción, API, onboarding

### Cargar MÓDULO MARKETING (07) si aparecen:

- marketing, lanzamiento, copy, funnel, campaña, anuncios
- CTA, conversión, tráfico, posicionamiento, embudo
- leads, ventas, vender, audiencia, contenido, landing

### Cargar MÓDULO LIBROS Y FORMACIÓN (08) si aparecen:

- libro, ebook, manual, guía, curso, formación, bootcamp
- workshop, clase, capacitación, programa educativo
- aprendizaje, bonus, anexos, lead magnet, publicación
- contenido público vs premium, separación de valor

### Cargar MÓDULO OFERTAS Y PRODUCTIZACIÓN (10) si aparecen:

- oferta, productización, empaquetado, bundle, tiers
- pricing, upsell, downsell, order bump, escalera de valor
- premium, pro, gratis, core offer, high ticket, membresía
- licencia, suscripción, paquete, qué incluye, valor percibido

---

## REGLAS DE ECONOMÍA DE CONTEXTO

1. Si una tarea se resuelve con las Skills base + 1 módulo, está prohibido cargar los 5 módulos.
2. Si la tarea es estratégica pero no requiere ejecución técnica, no cargar módulo de software.
3. Si la tarea es de edición o publicación, cargar la Guía de Publicación, no los módulos de dominio.
4. Si la tarea ya tiene datos aportados por el usuario, no activar investigación externa sin necesidad.
5. Si el output es final y público, las Skills base ya incluyen validación de salida.
6. Si el proyecto se desarrollará en varias sesiones, las Skills base ya incluyen memoria operativa.
7. **Módulos 08 y 10 juntos** solo se cargan cuando la tarea sea diseñar un ECOSISTEMA COMPLETO (libro + paquete premium + oferta escalonada). Para tareas de un solo módulo, cargar solo el correspondiente.

---

## COMBINACIONES MÁS FRECUENTES

| Escenario                                     | Cargar                                                   |
| --------------------------------------------- | -------------------------------------------------------- |
| **Emprendedor creando negocio**               | Skills base + M05 Negocios                               |
| **Desarrollador creando software**            | Skills base + M06 Software                               |
| **Creador lanzando producto**                 | Skills base + M07 Marketing + M10 Ofertas                |
| **Autor escribiendo libro**                   | Skills base + M08 Libros                                 |
| **Ecosistema libro + paquete premium**        | Skills base + M08 Libros + M10 Ofertas + M07 Marketing   |
| **Consultor diseñando servicio productizado** | Skills base + M05 Negocios + M10 Ofertas                 |
| **Lanzamiento de software comercial**         | Skills base + M06 Software + M07 Marketing + M10 Ofertas |
| **Tarea simple de código o análisis**         | Skills base solamente                                    |

---

## PROTOCOLO DE CAMBIO DE ESTADO

Cuando la tarea evoluciona, la IA debe reevaluar:

- ¿La tarea sigue siendo estratégica o ya pasó a ejecución?
- ¿Ahora necesito un módulo de dominio que no estaba cargado?
- ¿Ahora necesito la Guía de Publicación?
- ¿Entró un nuevo dominio que no estaba cargado?

Si la respuesta es sí, actualizar la carga antes de seguir.

---

## FORMATOS DE DECLARACIÓN INTERNA RECOMENDADOS

### Declaración mínima de carga

- Tipo de tarea detectado:
- Base obligatoria cargada:
- Módulos adicionales cargados:
- Módulos NO cargados por irrelevancia:
- Riesgo de sobrecarga:
- Riesgo por falta de contexto:

### Declaración mínima de recarga

- La tarea cambió de:
- A:
- Nueva carga requerida:
- Razón del cambio:

---

## REGLA FINAL

Cargar más contexto del necesario reduce calidad.
Cargar menos contexto del necesario rompe profundidad.
La excelencia está en cargar lo mínimo suficiente para producir una salida profesional, verificable y útil.
