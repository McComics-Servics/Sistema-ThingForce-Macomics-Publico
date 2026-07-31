# MEMORIA MAESTRA — Sistema ThingForce™ McComics

> **LA ÚNICA memoria del sistema.** Todo aprendizaje validado se registra AQUÍ,
> en la sección que corresponda. **PROHIBIDO** crear nuevos archivos de memoria,
> notas diarias, "memorias operativas" sueltas o carpetas con nombre de IA.
> Si un aprendizaje no cabe en una sección existente, se agrega la sección aquí.
> El detalle histórico vive en los archivos citados en la sección 7 — se consulta
> bajo demanda, nunca se carga completo.

---

## 1. Identidad y contexto

- Producto: **McComicsUp Suite Pro IA** — plugin SketchUp de diseño de muebles
  en melamina (Estructura Pro, Cajonera, Centro TV, Despiece, CNC, GENOMA,
  agente local con lenguaje natural). Es un **producto comercial serio**: la UI
  jamás lleva notas con tono de aviso al usuario/desarrollador.
- Dueño: Alfredo (McComics). Idioma de trabajo: español. Commits en español,
  detallados, terminados en `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Plugins hermanos INTOCABLES en la carpeta Plugins de SketchUp (fuera de la
  suite): `ESCALADOR_ULTRA_MCCOMICS.rb` y los dos `DESPLAZADOR*.desactivado`.
- REGLA SAGRADA transversal: **cero medidas hardcodeadas** — todo paramétrico.

## 2. Trampas verificadas — API SketchUp (Ruby)

- `entities.add_group(array_de_entidades)` **NO anida** bajo un grupo destino:
  crea el grupo en el modelo y COPIA. Para anidar: crear grupo destino y usar
  `grupo.entities.add_instance(definition, transformation)`.
- `sleep` congela el hilo principal de SketchUp (UI muerta). Usar
  `UI.start_timer(segundos, false) { ... }` para diferir.
- `entity.bounds` de una entidad anidada está en **coordenadas del PADRE**.
  Para mundo: transformar por `parent.transformation` (encadenado si hay varios
  niveles).
- Un objeto puede morir entre operaciones: verificar `valid?` antes de tocar y
  usar retornos defensivos (`next unless origen.valid?`).
- Toda modificación del modelo dentro de `start_operation` / `commit_operation`
  con `abort_operation` en rescue; nunca anidar operaciones sin control.
- Espejos izquierda/derecha: la versión espejada debe ser **copia exacta de la
  lógica del otro lado cambiando solo la dirección**; inventar un mecanismo
  distinto para el lado espejo es causa raíz de bugs (validado en fixes 90°).
- Flags compartidas entre hijos (ej. `lateral_90_host`) no identifican el lado:
  verificar el vínculo específico del hijo, no la flag.
- Convención min-corner vs rotación: piezas rotadas rompen los supuestos de
  "esquina mínima" — causa raíz nº 1 de fragilidad en formaciones C/L/O; los
  módulos formados (centro_tv, cajonera) se **regeneran**, no se deforman.
- Al modularizar/extraer métodos, las variables locales quedan colgando (bug
  bx/by/bz): correr modo sombra (comparar salida vieja vs nueva) tras extraer.

## 3. Trampas verificadas — HtmlDialog / CEF / UI

- Un HtmlDialog **abierto no recarga** el HTML editado en disco: cerrar y
  reabrir la ventana para ver cambios (caché CEF).
- `@media (max-width: 980px)` **siempre aplica** en ventanas del plugin
  (~400 px de ancho): esas reglas pisan a las base. Revisar el bloque media
  antes de culpar a las reglas normales.
- `index.html` de Estructura Pro se **regenera** desde 12 parciales vía
  `manifest.json` (concat_exact_order). Antes de regenerar: verificar el
  balance de `<div>` abrir/cerrar de cada parcial — un desbalance vació 4
  pestañas completas.
- Los estilos viajan CON el motor compartido: `toolbar_tools.css` junto a
  `toolbar_tools.js`. Cajonera lo **embebe** (`#{toolbar_tools_css}`) porque
  `set_html` rompe rutas relativas; Centro TV lo enlaza.
- Motor compartido se carga UNA vez: `let` en nivel superior lanza SyntaxError
  en la segunda carga; un solo mount, un solo contexto host, y los botones
  abridores **delegan** en el hub (`McToolbarHub`).
- Escapar strings antes de ejecutar JS desde Ruby; normalizar rutas de
  recursos (dialogs vacíos = ruta rota, no bug de lógica).
- SketchUp **no carga texturas .webp**: usar `.skm` nativos (cero dependencias).
- Los botones de una ventana NO cierran la ventana al ejecutarse (petición
  explícita del dueño); ventanas nuevas: compactas, modernas, consultar la
  skill obligatoria de ventanas antes de crear una.

## 4. Trampas verificadas — proceso, git, encoding, consola

- `ruby.exe` por CLI falla con `™` en la ruta (mojibake): usar la **ruta corta
  8.3** (`C:\Users\McComics\MCCOMI~1\...`).
- `grep -r` en la raíz de la suite se cuelga (carpetas gitignoradas enormes,
  ej. `native/`): usar `git grep` / `git ls-files`.
- La migración Go **está viva** (shadow 100%): `native/` está gitignored y no
  aparece en búsquedas del repo — su ausencia en git NO es ausencia real.
- `.gitignore`: una regla de carpeta **sin anclar** captura código por
  basename en cualquier nivel — anclar con `/` inicial. Y al revés: los
  backups del proyecto llevan sufijo (`.bak2`, `.bak_2026-07-25_algo`), así
  que `*.bak` NO los atrapa — el patrón debe ser `*.bak*`. Por eso se
  colaron los 29 que hubo que limpiar.
- JSON en Ruby: `JSON.parse` devuelve claves **String**; los hashes internos
  usan Symbol. Normalizar en la frontera (trampa R9).
- BOM UTF-8 en JSON lo rompe silenciosamente: escribir sin BOM (regla propia).
- Antes de declarar algo roto, verificar el **cableado** (callback registrado,
  archivo cargado, versión en memoria): "no está referenciado" ≠ "no está
  cargado" (R14). Y una aserción que falla no siempre acusa al código probado.
- Un fix no está completo hasta cubrir **TODAS las capas** que validan lo
  mismo (JS + callbacks Ruby): buscar en ambas antes de declarar terminado.
- En `create_estructura` los params se guardan temprano (~línea 123): computar
  flags ANTES de ese punto o no viajan.
- Parches atómicos: aplicar con script (Python/CLI) sobre el archivo con
  respeto de CRLF, verificar sintaxis después, y NUNCA pegar archivos enormes
  a mano en la consola (salida truncada = archivo corrupto).
- Consola Remota (protocolo completo en
  `McComics-Agent-System/PROTOCOLO_REMOTE_CONSOLE.md` hasta su archivo):
  escribir `C:\McComics_remote\input.rb` → crear `execute.signal` → esperar
  cambio de mtime de `output.txt` → `agent.lock` con identidad y borrarlo al
  leer. Los probes viven en su propio namespace y se recargan por owner.
- Nada se declara terminado sin **compuerta binaria PASS/FAIL corrida en vivo**
  dentro de SketchUp.

## 5. Dominio — melamina, despiece y manufactura

- Módulo Despiece = **crítico e intocable** sin orden explícita (R3); fue
  modificado con Gemini — revisado: 36 .rb con sintaxis OK.
- Ranuras: formato real `"dist-prof-esp"`; ranura en la dimensión MÁS LARGA →
  `L2`, en la más corta → `A2` (la comparación de dimensiones ya sorteadas
  siempre da true: usar la geometría real por tipo de pieza).
- Collision-free siempre; frente adelante, fondo atrás; respetar grosores
  estándar, vetas, cantos y tolerancias; piezas ensamblables o no existen.
- CNC modular y escalable: cero código por mueble. Tubería neutral:
  `MachiningModel` → `NestingEngine` (overrides `largo_plancha_mm`,
  `ancho_plancha_mm`, `kerf_mm`, `margen_refilado_mm`) → `Postprocessor`
  (mcpost.json + DXF R12 + simulación). Rotada = 90° CCW: `(lx,ly)→(ly, L−lx)`.
- Grupos paramétricos de herramientas: diccionario `McComics_PatternGroup`
  guarda `{pattern, params, incluye_semilla, version}` — Actualizar regenera
  el MISMO grupo, jamás crea otro.
- **Optimizador de corte** (`modules/optimizador_corte_mccomics`): entra por
  TSV/CSV que el Despiece le envía solo (`send_file_to_optimizer` →
  `open_with_file`), no por objetos del modelo. Su motor usa caja envolvente
  (veta, filas de puertas, cantos, presupuesto); el de `mccomics_core` usa
  contorno real para mecanizado. Son complementarios: `cnc_bridge.rb` traduce
  el layout ya aprobado al plan neutro y reutiliza el Postprocessor — ahí
  jamás se vuelve a acomodar nada.
- Piezas ancladas (edición manual): con anclas los rectángulos de espacio
  libre **pueden solaparse entre sí**, así que al colocar hay que restar la
  pieza de TODOS los espacios; partir solo el elegido deja dos piezas
  compartiendo sitio (bug real cazado por la compuerta).
- La `metadata_exportacion` de una pieza movida hay que **regenerarla**: es lo
  que viaja al XML y al presupuesto, y si no se toca exporta la posición vieja.
- Un retal reutilizado no es una plancha comprada: no cuenta en
  `total_planchas`, ni en el área de la eficiencia, ni en el presupuesto.
- `ExcelParser` solo recorta el sufijo del marcador de material cuando lleva
  em-dash (`—`); con guion normal el nombre del grupo conserva
  `"- TOTAL: N PIEZAS"`. Importa al cruzar material con el stock de retales.
- Corte guillotina (sierra escuadradora) = bandas horizontales con cortes
  pasantes; el layout libre tipo tetris solo es fabricable en router CNC.
- Edición manual del layout: mover una pieza **no debe reoptimizar** el
  material (se ve como si todo saltara al azar). Solo se mueve lo movido,
  se aparta lo pisado, y compactar es una acción aparte y determinista.
  Excepción: las puertas de una misma `fila_id` viajan en bloque o no se
  mueven — media fila corrida rompe la continuidad de veta.
- Si una edición falla a medias hay que **restaurar el snapshot**: mutar el
  resultado en sitio y devolver error dejaba el layout con piezas encimadas.
- Búsquedas geométricas: probar milímetro a milímetro o por anillos
  crecientes **cuelga SketchUp** con una plancha llena. Calcular el empuje
  analíticamente y probar solo las esquinas que dejan las piezas ya
  colocadas: la misma prueba pasó de colgarse a 0,11 s.
- Al transponer ejes para acomodar "a lo ancho", las coordenadas se
  intercambian pero la **orientación de la pieza se conserva**: negar
  `rotada` cruza las medidas y saca piezas de la plancha.
- El Despiece marca las ranuras de LED como ranura ESPECIAL con patrón
  propio (`68-18-7`, `68-10-6`, `50-18-7`, `50-10-6`); la ranura corriente
  es la del fondo. Cobrar LED por cualquier ranura inflaba todos los
  presupuestos.
- Estructura Pro guarda banderas de sistema (`sistema_d52`, `sistema_al1535`)
  en los atributos del modelo: otros módulos pueden preguntarle al diseño
  abierto qué trae puesto, sin acoplarse a su código.

## 6. Trucos y protocolos que funcionan

- **SketchUp 2024 no ofrece CDP utilizable sólo porque 9229 acepte TCP**:
  en el host actual `/json/list` y WebSocket no responden. Playwright sobre
  `index.html` produce únicamente candidatos estáticos; nunca debe rotularse
  como CEF vivo ni promoverse automáticamente.
- **`UI::HtmlDialog#execute_script` es asíncrono y no devuelve el DOM**:
  para extraer una UI dinámica se necesita `add_action_callback` JS→Ruby con
  nonce y ACK. Hasta entonces el flujo debe fallar cerrado sin archivos parciales.
- **Un callback `HtmlDialog` persistente se registra antes de `show`**:
  SketchUp limpia callbacks cuando el diálogo se cierra, por lo que cada
  recreación debe registrarlo de nuevo antes de mostrar la ventana. El patrón
  verificado arma primero un nonce ASCII exacto, consume un solo ACK, rechaza
  replay, limita stores/reintentos y cancela al fallar. Agregar dinámicamente el
  callback sobre una ventana ya visible no es fiable. Este bridge de estado no
  demuestra por sí solo extracción ni equivalencia CEF de otra ventana.
- **Catálogo operativo y evidencia son contratos incompatibles**:
  `manifest.json/components` no puede ser sustituido por
  `capture_manifest.json/targets`. Un ControlManifest separado bloquea SHA-256,
  bytes y dimensiones, pero “integridad” no significa “equivalencia CEF viva”.
- **ThingForce Graph Studio es multiproyecto y el grafo es derivado**:
  consultar primero `graph_projects` y pasar `projectId` en search/trace/
  impact/read. Después de editar se regenera el índice; el archivo real sigue
  siendo la autoridad.

- Lenguaje natural del agente: FRASES decisivas > palabras ponderadas por
  especificidad; las **negativas siempre ganan** a las positivas; tolerancia a
  typos con Levenshtein (≤2 palabras, distancia ≤1–2). Vocabulario amplio
  (214 términos) — ampliar vocabulario, no ramas if.
- Registro declarativo (PatternEngine): cada fórmula = lambda registrada que
  devuelve colocaciones; agregar herramienta = registrar receta, el panel,
  la preview y la miniatura salen solos. Extender así, nunca con casos.
- RuboCop: `GEM_HOME=C:\Users\McComics\.gem\ruby\3.4.0` +
  `C:\tools\ruby34\bin\ruby.exe -S rubocop` (R15).
- Flags aditivas: byte-idéntico con la flag apagada (R12); cambios funcionales
  jamás tocan diseño (R2).
- Carpeta `MIS APIS y TOKENS`: **prohibido** leer sin autorización explícita;
  jamás imprimir ni commitear su contenido.

## 7. Trampas verificadas — web pública, deploy y licencias

*(Incidente 2026-07-24/25. Procedimiento completo: `Modulos y Herramientas Reutilizables/Servidores/PLAYBOOK_DEPLOY_00_INDICE.md`.)*

- **Cloudflare Pages devuelve `200` para rutas que NO existen**: sirve el `index.html`
  del sitio. Un `.rbz` "descargado" resultó ser un HTML de 26 KB, y las 7 subpáginas del
  menú estaban rotas pareciendo correctas. Verificar por **md5 y content-type**, jamás por
  código de estado. Un `.css` que devuelve `text/html` es un 404 disfrazado.
- **`curl` sin `-L` miente**: Pages redirige `/pagina.html` → `/pagina` con `308`; sin `-L`
  el tamaño sale `0` y parece página vacía. Se dio por rota una página que estaba bien.
- **`wrangler pages deploy` sin `--branch=main` crea un *preview***, no producción, con un
  mensaje de éxito idéntico. La rama de producción del proyecto es `main`.
- **`functions/` va en la raíz del proyecto**, no dentro del directorio de assets; si no,
  se sube como archivo estático y la ruta `/api/...` cae al fallback. Señal de que compiló:
  `Uploading Functions bundle`.
- **Sin `_headers` no hay ninguna cabecera de seguridad** en Pages (ni HSTS, ni CSP, ni
  X-Frame-Options) y se sirve `Access-Control-Allow-Origin: *`. Para quitar una cabecera
  que Pages añade sola: `! Nombre-Cabecera`.
- **`ruby -c` NO valida el runtime del plugin**: vive dentro de un heredoc del builder.
  `def load_modulesdef load_modules` es Ruby *válido* (define `load_modulesdef(load_modules)`)
  y deja el método real sin definir; el `rescue` se traga el `NoMethodError` y el plugin se
  entrega roto en silencio. Confiar en `validate_generated_runtime!`, nunca en `Syntax OK`.
- **`Net::HTTP` en el runtime del plugin congela SketchUp** (bloquea el hilo de UI). Toda
  la red va por `Sketchup::Http::Request` y nunca durante la carga del plugin.
- **`/api/licenses/status` devuelve el campo `reason`, no `status`.** Leer `res['status']`
  daba siempre `nil` y bloqueaba a usuarios con licencia Pro válida.
- **SSH con `IdentitiesOnly=yes` (R-043)**: sin esa opción el agente ofrece todas las claves
  y **cada una cuenta como fallo de auth** ante fail2ban. Un *timeout* de red no es fallo.
- **Nunca `perl -e "..."` con comillas dobles sobre HTML**: `@supabase` y `@2` se interpolan
  como arrays vacíos y corrompen la URL del CDN. Sin SDK no hay login, ni Google, ni captcha.
- **Antes de borrar un "duplicado", comparar el CONTENIDO**: `mccomicsup/shared/` tenía
  `auth.js` que la otra copia no tenía; se borró y se perdió el login.
- **Si mueves carpetas, arregla los `../` de dentro**: subir las subpáginas un nivel dejó
  todos los `../../shared/...` apuntando fuera del sitio. Preferir rutas absolutas.
- **Lo que hay en disco no es lo que está publicado**: la portada en producción no existía
  en ningún archivo local. Rescatar lo vivo antes de sustituir.
- **Un API token de *cuenta* falla en `/user/tokens/verify`** aunque sea válido (ese endpoint
  sólo acepta tokens de usuario). El token del panel y la sesión de `wrangler login` son
  cosas distintas.
- **El código local puede estar POR DELANTE de producción sin que nada lo avise.**
  Un deploy por overlay (`cp -al` + sustituir sólo el archivo tocado) tumbó la app:
  el `server/` local importaba `cors`, pero el `package.json` del release desplegado
  no lo declaraba (`ERR_MODULE_NOT_FOUND`). **Al desplegar un archivo que añade
  dependencias hay que subir también `package.json` y `package-lock.json`.**
  Antes de un overlay: `diff` del archivo desplegado contra el local para ver cuánto
  han divergido.
- **Probar la imagen en un contenedor desechable ANTES de mover el symlink.**
  `docker run --name <algo>-prueba` con el mismo `--env-file`, revisar `docker logs`
  y los endpoints por `docker exec`, y sólo entonces promover. Evita la caída que sí
  ocurrió (~1 min) por promover directamente.
- **Rollback de la app web**: apuntar `current` al release anterior y
  `docker run` con la imagen anterior (las imágenes viejas siguen en el host).
- **Supabase Management API sí ejecuta SQL** con el token `sbp_` correcto:
  `POST /v1/projects/<ref>/database/query`. Sirve para aplicar migraciones sin
  psql ni CLI. **Dos trampas**: (a) hay varios tokens en la bóveda y sólo uno
  tiene privilegios — el de
  `PROYECTO_McComicsUp_AppWeb_…/McComicsUp Supabase…/Token Base de datos de Supabase de McComicsUp.txt`;
  (b) el WAF devuelve **403 error 1010** si no se manda `User-Agent`, y conviene
  enviar las sentencias **una a una**.
- **El pooler de Supabase no es alcanzable** para este proyecto: el host directo
  `db.<ref>.supabase.co` es **sólo IPv6** (el VPS no tiene ruta) y `aws-0-<region>`
  devuelve *tenant not found* en todas las regiones. Usar la Management API.
- **`redirectTo` de Supabase se IGNORA si la URL no está en `uri_allow_list`**:
  se cae al `site_url` del proyecto. Era la causa de que el login con Google desde
  `grupomccomics.com` expulsara a `app.grupomccomics.com`. Arreglo: ampliar
  `uri_allow_list` por API; **no hace falta tocar `site_url`**.
- **Al enmascarar secretos, un `sed` que sólo cubre `clave=valor` NO basta**:
  un archivo con la contraseña en una línea suelta se imprime en claro.
  Incidente 2026-07-25: se expuso la contraseña de la base de datos en el
  transcript y hubo que rotarla. Listar **nombres de archivo**, nunca volcar
  contenido de la bóveda.
- **Google bloquea OAuth en webviews embebidos** (`disallowed_useragent`): el login de
  Google no puede ir dentro de un `HtmlDialog`. Para escritorio, Device Flow (RFC 8628).

## 8. Corpus profundo (consultar bajo demanda, no cargar completo)

- **Errores SketchUp (2149+ casos)**: `ThinkForce/CORPUS_ERRORES_SKETCHUP/`
  — entrar SIEMPRE por `00-INDICE_...md` y cargar solo el módulo ES01–ES10
  que toque. Los "patrones repetidos" del corpus ya están destilados en las
  secciones 2–5 de este archivo.
- **Bitácora histórica de fixes del Despiece**: archivo histórico
  (`_ARCHIVO_HISTORICO_McComics-Agent-System/MEMORIA_MODULAR_DESPIECES.md`).
- **Memorias operativas 2026-07-14…20 (HtmlDialog, GENOMA, presets, probes)**:
  destiladas en las secciones 2–4; originales en
  `Planes y Check List Archivados/`.
- **Memorias de la App Web** (rutas canónicas, Supabase, render cloud):
  archivo histórico; la app web es independiente del plugin
  (REGLA_INDEPENDENCIA_WEBAPP, hoy fusionada en REGLAS_MAESTRAS).

## 9. Mantenimiento de esta memoria

1. Nuevo aprendizaje validado → **una viñeta** en la sección correcta, con el
   porqué. Nada de archivos nuevos.
2. Si una viñeta resulta falsa → se corrige o borra aquí mismo.
3. Al cerrar sesión con aprendizajes: preguntar al dueño si algo merece
   convertirse en skill (regla global del dueño: no crear skills solas).
4. `scripts/validar_orden.ps1` vigila que no nazcan memorias fuera de este
   archivo.
