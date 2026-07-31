# REGLAS MAESTRAS — Sistema ThingForce™ McComics

> **EL ÚNICO reglamento del sistema.** Toda regla vigente vive aquí con su ID.
> Regla nueva = viñeta nueva con ID nuevo AQUÍ — **prohibido** crear archivos de
> reglas sueltos. Los documentos originales fusionados están en
> `_archivo_historico/` con su nota de fusión. Fusión: 2026-07-22.
> IDs legados (R1–R15 del prompt heredado) anotados donde aplican.

---

## A. Conducta y método (toda IA, todo proyecto)

- **R-001** El orden es: evidencia → diagnóstico explicado → alcance → riesgo →
  permiso → cambio. Diagnóstico no es solución. *(10-RESUMEN_GOBIERNO)*
- **R-002** No tocar código sin evidencia suficiente; si el cambio es riesgoso,
  detenerse y pasar a diagnóstico puro. *(10-RESUMEN_GOBIERNO)*
- **R-003** No documentar como aprendizaje nada no validado en entorno real.
  *(10-RESUMEN_GOBIERNO)*
- **R-004** Hablar y razonar en español; no improvisar por entusiasmo técnico;
  no ocultar complejidad relevante; no asumir que el usuario completa pasos
  críticos mentalmente. *(10-RESUMEN_GOBIERNO)*
- **R-005 (INMUTABLE)** Antes de modificar SketchUp/HtmlDialog/bridges/runtime
  sin 100% de certeza: backup comparativo + evidencia previa con Remote
  Console (o el chequeo ejecutable más cercano) + parche pequeño + repetir la
  MISMA validación + comparar contra el backup. *(AGENTS legado)*
- **R-006** Nada se declara terminado sin compuerta binaria PASS/FAIL corrida
  en vivo (SketchUp real vía Remote Console, o la suite del stack tocado).
- **R-007** Un fix no está completo hasta cubrir TODAS las capas que validan lo
  mismo (JS + callbacks Ruby + config). Buscar antes de declarar terminado.
- **R-008** Aprendizaje validado → una viñeta en `ThinkForce/MEMORIA_MAESTRA.md`.
  Prohibido crear archivos de memoria nuevos. Skills nuevas solo si el dueño
  acepta la propuesta al cierre.

## B. Producto y diseño

- **R-010 (SAGRADA)** Prohibición ABSOLUTA de hardcodear parámetros, medidas y
  configuraciones — todo paramétrico desde config/UI. Igual de prohibido:
  secretos, tokens, claves o licencias en código, HTML, JS, Ruby, presets,
  backups o scripts. *(AGENTS legado + REGLA SAGRADA)*
- **R-011** Prohibido en código y UI del producto cualquier texto con tono de
  nota al usuario/desarrollador ("próximamente", "esto es para que...",
  tutorial informal). Producto profesional, copy serio.
  *(REGLA_GOBERNANZA_PROHIBICION_MENSAJES_USUARIO)*
- **R-012** Un cambio funcional NO toca diseño (colores, layout, tamaños); un
  cambio de diseño no altera funcionalidad. *(legado R2)*
- **R-013** Toda funcionalidad aditiva entra tras flag: con la flag apagada el
  resultado es byte-idéntico al anterior. *(legado R12)*

## C. Plugin SketchUp (McComicsUp Suite Pro IA)

- **R-020** Desarrollar SIEMPRE en la copia VIVA del plugin (la que SketchUp
  carga, en `AppData\Roaming\...\Plugins\McComicsUp_Suite_Pro_IA`); la copia
  padre se sincroniza SOLO con `git pull`; nunca copiar archivos a mano entre
  copias. *(REGLA_METODO_TRABAJO_PLUGIN)*
- **R-021** Módulo Despiece = intocable sin orden explícita del dueño; si se
  autoriza, backup previo y verificación completa. *(legado R3)*
- **R-022** `index.html` de Estructura Pro NO se edita directo: se regeneran
  los 12 parciales vía `manifest.json` (concat_exact_order), verificando el
  balance de `<div>` de cada parcial ANTES de concatenar. *(legado R4)*
- **R-023** `JSON.parse` devuelve claves String y el código interno usa Symbol:
  normalizar SIEMPRE en la frontera. *(legado R9)*
- **R-024** Antes de declarar algo roto: verificar el cableado real (callback
  registrado, archivo cargado, versión en memoria, dialog recargado).
  "No está referenciado" ≠ "no está cargado". *(legado R14)*
- **R-025** RuboCop obligatorio sobre los .rb tocados:
  `GEM_HOME=C:\Users\McComics\.gem\ruby\3.4.0` +
  `C:\tools\ruby34\bin\ruby.exe -S rubocop`. Cero ofensas nuevas. *(legado R15)*
- **R-026** Plugins hermanos INTOCABLES en la carpeta Plugins de SketchUp:
  `ESCALADOR_ULTRA_MCCOMICS.rb` y los dos `DESPLAZADOR*.desactivado`.
- **R-027** Verificación en vivo por Remote Console (`C:\McComics_remote\`):
  protocolo y trampas en `ThinkForce/MEMORIA_MAESTRA.md` §4. Prohibido dejar
  scripts sueltos de recarga/debug en el plugin: toda sonda va por la consola
  y en su namespace. *(PROTOCOLO_PROHIBICION_SCRIPTS_SUELTOS_RELOAD)*
- **R-028** Commits del plugin: en español, detallados, uno por feature
  verificada, terminados en
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

## D. Arquitectura (Go-first y fronteras)

- **R-030 (LEY GO-FIRST)** Toda lógica valiosa nueva o migrada se implementa
  en el motor Go (`native/mccomics_core`) para que plugin, web y móvil
  consuman el MISMO motor. El cliente queda como capa fina: detecta el evento,
  arma el snapshot, llama a Go y aplica el resultado. Detección de interacción
  y mutación del modelo NUNCA van a Go (viven donde vive el modelo).
  *(LEY_ARQUITECTURA_GO_FIRST_2026-07-03)*
- **R-031** App web y plugin son productos INDEPENDIENTES: cero referencias
  cruzadas en runtime (`web_app/` ↛ `modules/` y viceversa); las ventanas se
  duplican y adaptan, jamás se comparten archivos. *(REGLA_INDEPENDENCIA_WEBAPP)*
- **R-032** Migración de ventanas plugin → web: copia ÍNTEGRA (HTML, CSS, JS,
  iconos) sin rediseñar ni "mejorar"; solo se sustituyen headers del plugin,
  `window.sketchup.*` → bridge, y rutas de recursos a `web_app/static/`.
  *(REGLA_COPIA_VENTANAS_PLUGIN)*
- **R-033** CNC modular y escalable: cero código por mueble; todo pasa por la
  tubería neutral MachiningModel → NestingEngine → Postprocessor.

## E. App web y servidores

- **R-040** NUNCA borrar `.git` de ningún repo; prohibidos `git reset --hard` y
  `git clean -fdx`. *(MANUAL_OPERATIVO_UNIFICADO — regla de oro 1)*
- **R-041** Cada IA en SU rama/worktree; nadie edita la zona de otra IA; solo
  Codex integra y despliega al final. *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-042** Editar la FUENTE, nunca `dist`; la copia OneDrive es histórica.
  *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-043** SSH: UN solo intento; si falla, esperar ventana estable (fail2ban
  banea ráfagas). *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-044 (REFORZADA 2026-07-25 — ver R-060)** Secretos SOLO en vault + `.env`
  locales; jamás en git, chat o subcarpetas. La carpeta `MIS APIS y TOKENS` no
  se lee sin autorización explícita y su contenido jamás se imprime ni commitea.
- **R-045** Sin hardcode en la web: colores/tamaños/umbrales a
  `web_app/static/js/core/mc_config.js`. *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-046** 0 regresión web: `npm run build` + `node --check` + Playwright en
  verde antes de entregar. *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-047** Deploy web SIEMPRE por overlay mínimo; texturas/materiales pesados
  no se redeployan: se heredan del release live con `cp -al`.
  *(MANUAL_OPERATIVO_UNIFICADO)*
- **R-048** JSON siempre UTF-8 SIN BOM: prohibidos `Out-File -Encoding UTF8` /
  `Set-Content -Encoding UTF8` de PS5 y `WriteAllText` de .NET Framework;
  usar PS7+ o escritura explícita sin BOM. *(REGLA_PREVENCION_BOM_UTF8_JSON)*

## F. Orden del sistema ThingForce

- **R-050** UNA memoria: `ThinkForce/MEMORIA_MAESTRA.md`. Cero archivos de
  memoria/notas diarias fuera de ella; el corpus profundo se consulta por su
  índice bajo demanda.
- **R-051** UN reglamento: este archivo. Regla nueva = ID nuevo aquí; los
  documentos fusionados quedan en `_archivo_historico/` y no se citan como
  fuente viva.
- **R-052** Planes: los vivos en `Planes Nuevos/` registrados en
  `INDICE_PLANES.md`; los terminados a `Planes y Check List Archivados/`.
  Prohibido crear planes fuera de ese circuito.
- **R-053** Prohibido crear carpetas con nombre de IA (claude/, codex/, etc.)
  o estructuras paralelas de gobernanza: el sistema es UNO para todas las IA.
- **R-054** Cierre de sesión con `scripts/validar_orden.ps1` en verde
  (memoria/reglas/planes en su sitio, cero `.bak` commiteados en el plugin).
- **R-056** Al terminar de explorar o trabajar un módulo, **antes de cerrar** se
  escribe su mini plan en `Planes Pendientes/<Proyecto>/<Módulo>.md`: mejoras
  detectadas, capacidades del plugin que ese módulo desaprovecha, y riesgos.
  Si el archivo ya existe se actualiza, no se duplica. Lo que pase a
  ejecutarse se mueve a `Planes Nuevos/` con su fila en `INDICE_PLANES.md`.
- **R-055** Registro automático de errores resueltos y verificados al 100%:
  directo a MEMORIA_MAESTRA sin consulta adicional; si existe viñeta similar,
  mejorarla sin duplicar. *(AGENTS legado)*

## G. Custodia de secretos y orden del workspace

- **R-060 (SAGRADA, refuerza R-044)** **NINGÚN secreto vive dentro de un
  proyecto.** Bóveda única: `C:\Users\McComics\McComics\MIS APIS y TOKENS\`.
  Se aplica a claves privadas (`.pem`, `.key`, `id_rsa*`, `*_ed25519`), tokens
  de API, `service_role`, contraseñas de base de datos y credenciales SSH.
  - Excepción **única**: los `.env` locales que la aplicación necesita para
    arrancar. Deben estar **en `.gitignore`** y su contenido **respaldado** en la
    bóveda. Un `.env` versionado es una violación, no una excepción.
  - Excepción **acotada**: claves que la propia app *genera y lee* en una ruta
    fija (p. ej. `data/vaif/*_private_key.pem`). Se quedan en disco, pero
    **ignoradas por git** y respaldadas en la bóveda.
  - **Prohibido** imprimir el contenido de un secreto en el chat, en logs o en
    la salida de un comando. Al inspeccionar credenciales se enmascara **siempre**
    (`sed -E 's/=.+$/= ***/'`) y se listan **nombres**, nunca valores.
    *(Incidente 2026-07-25: una máscara mal construida expuso la contraseña de la
    base de datos en el transcript; obligó a rotarla.)*
  - Al encontrar un secreto fuera de la bóveda: respaldarlo allí, añadirlo a
    `.gitignore`, sacarlo del rastreo con `git rm --cached` (nunca borrar el
    archivo ni reescribir el historial sin permiso) y avisar al dueño.

- **R-061** **Prohibido dejar archivos sueltos en la raíz del workspace**
  (`C:\Users\McComics\McComics\`). Todo pertenece a un proyecto o al Sistema
  ThingForce. Los restos de sesiones de IA (scripts de depuración, volcados de
  transcript, claves efímeras) se archivan en
  `Sistema ThingForce™ McComics\Backups\<origen>_<fecha>\`, nunca se abandonan.
  *(Incidente 2026-07-24: `decrypt_core.rb` —una herramienta que descifra el core
  protegido del plugin— quedó suelta en la raíz junto a una clave privada.)*

- **R-063 (OBLIGATORIA)** **Toda ruta que se muestre al dueño va COMPLETA y
  absoluta**, desde la unidad: `C:\Users\McComics\McComics\...`. Prohibidas las
  rutas relativas (`Backups/x/`), los recortes con `…` y los "dentro de la carpeta
  tal". El dueño debe poder copiar la ruta y pegarla en el Explorador sin pensar.
  Aplica a mensajes de chat, informes, documentos y mensajes de commit.
  *(Incidente 2026-07-25: se indicó `Backups/copia_accidental_del_sistema_.../` y
  el dueño no pudo encontrarla.)*
  - Al citar una ruta también se dice **si existe y qué contiene**, no sólo dónde
    debería estar.

- **R-062** El **Sistema ThingForce es la puerta de entrada obligatoria** a
  cualquier proyecto de este workspace. Todo proyecto debe:
  1. estar listado en `INDICE_DEL_WORKSPACE.md` (raíz del workspace);
  2. si tiene planes vivos, tenerlos en
     `Planes Nuevos\<Nombre del Proyecto>\` —nunca sueltos— y registrados en
     `INDICE_PLANES.md`;
  3. incluir un `REFERENCIAS_THINGFORCE.md` que apunte de vuelta al sistema.
  Ninguna IA empieza a trabajar sin pasar por `AGENTS.md`.
