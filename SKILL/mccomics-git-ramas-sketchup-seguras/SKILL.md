---
name: mccomics-git-ramas-sketchup-seguras
description: Usa esta skill cuando ChatGPT, Codex, Claude u otra IA vaya a modificar McComicsUp Suite Pro IA mediante Git o GitHub. Actívala para trabajar en una rama y worktree aislados, analizar dependencias con ThingForce, crear backups verificables, desplegar la rama en la copia viva de SketchUp, probarla con compuertas PASS/FAIL, restaurar la versión estable si falla y fusionar mediante Pull Request sin tocar main prematuramente.
---

# Skill McComics® — Git, ramas, pruebas y rollback seguro en SketchUp

**Versión:** 1.0.0  
**Autor:** McComics Servicios Generales  
**Marca:** McComics®  
**Creada:** 2026-07-31

## Propósito

Establecer un proceso único, profesional, repetible y reversible para modificar el plugin **McComicsUp Suite Pro IA®** con ayuda de una IA sin convertir la rama estable, la copia viva de SketchUp ni los datos del usuario en un laboratorio improvisado.

Esta skill gobierna todo el ciclo:

1. revisar las reglas McComics®;
2. identificar el código y sus dependencias;
3. aislar el trabajo en una rama y un worktree;
4. crear backups antes de modificar;
5. implementar cambios mínimos;
6. validar sintaxis, contratos y grafo;
7. desplegar controladamente en la copia viva;
8. probar dentro de SketchUp;
9. restaurar la versión anterior si algo falla;
10. integrar mediante Pull Request solo después de evidencia PASS.

## Resultado obligatorio

Al terminar una modificación deben existir, como mínimo:

- rama de trabajo independiente;
- SHA base exacto desde el cual nació;
- lista de archivos afectados;
- backups verificables de cada archivo vivo modificado;
- análisis de impacto y bridges afectados;
- pruebas estáticas ejecutadas;
- manifiesto del despliegue de prueba;
- evidencia PASS/FAIL en SketchUp real cuando corresponda;
- procedimiento de rollback probado o verificable;
- Pull Request en borrador o cambio descartado;
- `main` intacto hasta autorización expresa del dueño.

## Principio de honestidad técnica

Ninguna IA puede prometer que un cambio es imposible de romper.

La obligación profesional es reducir el riesgo mediante aislamiento, pruebas, trazabilidad y recuperación. Un cambio se considera seguro únicamente cuando puede fallar sin destruir el estado estable y cuando existe una ruta clara para volver atrás.

---

# 1. Alcance y repositorios relacionados

## Repositorio privado del plugin

```text
McComics-Servics/McComicsUp_Suite_Pro_IA
```

Contiene el código fuente real del plugin, módulos Ruby, interfaces HTML/CSS/JavaScript, bridges, pruebas, agentes y componentes nativos.

## Dashboard y grafo de dependencias

```text
McComics-Servics/Dashboard-Grafo-McComics
```

Se utiliza para comprender ownership, dependencias, bridges y alcance del cambio. El dashboard local no sustituye Git ni las pruebas dentro de SketchUp.

## Sistema público de reglas y skills

```text
McComics-Servics/Sistema-ThingForce-Macomics-Publico
```

En esta exportación pública las skills viven bajo `SKILL/`. En el sistema canónico completo corresponden a `McComics-Agent-System/skills/`.

---

# 2. Reglas supremas y prohibiciones

## Paso obligatorio supremo

Antes de crear código, lógica, cálculo, manual, parche, rama, despliegue o Pull Request:

1. revisar todas las reglas McComics® aplicables;
2. cargar `AGENTS.md`;
3. consultar `SELECTOR_DE_MEMORIA.md`;
4. cargar las tres skills ThinkForce obligatorias;
5. consultar `SKILL/INDICE_SKILLS.md`;
6. cargar la skill del módulo exacto;
7. cargar `mccomics-patch-safety-loop`;
8. consultar el grafo incremental o el análisis equivalente;
9. revisar el plan vivo y errores históricos del módulo, si existen.

## Prohibiciones absolutas

- No modificar directamente `main`.
- No fusionar una rama sin autorización expresa del dueño.
- No usar `git reset --hard`.
- No usar `git clean -fdx`.
- No borrar ni reemplazar `.git`.
- No hacer force-push sobre `main`.
- No tocar Despiece sin una orden explícita.
- No tocar `ESCALADOR_ULTRA` ni `DESPLAZADOR*.desactivado` sin orden explícita.
- No hardcodear rutas locales, medidas, configuraciones, tokens, claves o secretos.
- No copiar `.env`, datos de usuario, conversaciones, logs ni estados de runtime a una rama o despliegue.
- No editar un archivo generado si existe una fuente canónica que lo produce.
- No reemplazar un archivo completo solo para forzar que un parche coincida.
- No declarar terminado sin una compuerta PASS/FAIL verificable.
- No mantener dos copias activas del plugin con el mismo loader y namespace.
- No probar una rama sobre el único estado estable sin backup y manifiesto.
- No confundir una prueba de sintaxis con una prueba del runtime de SketchUp.

## Identidad obligatoria

Cuando se cree o modifique software McComics®:

- conservar el nombre original del plugin y de los archivos;
- usar el sufijo McComics® cuando corresponda;
- autor oficial: **McComics Servicios Generales**;
- preservar namespaces públicos, callbacks y contratos existentes;
- mantener compatibilidad con Windows, macOS y Linux cuando aplique;
- respetar las exigencias de SketchUp Extension Warehouse.

---

# 3. Qué puede y qué no puede hacer una IA remota

## Puede hacer desde GitHub

- inspeccionar repositorios y commits;
- crear una rama desde un SHA conocido;
- crear o modificar archivos en esa rama;
- comparar ramas y commits;
- preparar commits pequeños;
- abrir un Draft Pull Request;
- revisar el diff;
- corregir la misma rama;
- revertir mediante un commit nuevo cuando corresponda.

## No debe afirmar que hizo sin evidencia

Una IA remota no puede asumir que:

- ejecutó SketchUp en la computadora del dueño;
- consultó el dashboard `localhost` de ThingForce;
- comprobó visualmente una toolbar;
- validó geometría real dentro de un modelo;
- verificó Undo/Redo;
- abrió un archivo `.skp` local;
- restauró archivos de la carpeta viva;
- confirmó que un proceso local no quedó huérfano.

Cuando estas acciones dependan del equipo local, la IA debe entregar comandos, checklist y evidencia requerida, y esperar los resultados reales antes de declarar PASS.

---

# 4. Modelo de ramas McComics®

## Rama estable

```text
main
```

`main` representa exclusivamente el último estado aprobado. No se utiliza para experimentar, investigar o probar cambios incompletos.

## Convención de ramas

```text
chatgpt/feature/<descripcion-corta>
chatgpt/fix/<descripcion-corta>
chatgpt/chore/<descripcion-corta>
chatgpt/hotfix/<descripcion-corta>
```

Otros agentes deben utilizar su propio prefijo. Ejemplos:

```text
codex/feature/nuevo-exportador
claude/fix-tabs-estructura-pro
```

## Reglas de nombres

- usar minúsculas;
- usar guiones simples;
- no usar espacios;
- no usar tildes ni símbolos Unicode;
- expresar una sola intención;
- no reutilizar una rama antigua para una tarea distinta.

## Una tarea, una rama, un worktree

Cada IA trabaja en su propia rama y worktree. Nadie edita la zona de otra IA. Las integraciones se hacen mediante Pull Request.

---

# 5. Fase 0 — Diagnóstico y autorización

Antes de crear la rama, registrar:

```text
Repositorio:
Rama base:
SHA base:
Objetivo exacto:
Módulo owner:
Archivos fuente probables:
Archivos generados probables:
Bridges Ruby↔JS afectados:
Datos persistentes afectados:
Nivel de riesgo:
Prueba mínima necesaria:
Rollback previsto:
```

## Clasificación de riesgo

### Riesgo bajo

- documentación;
- textos sin efecto de runtime;
- tests aislados;
- estilos sin callbacks ni layout crítico.

### Riesgo medio

- HTML/CSS/JavaScript de una ventana;
- callbacks internos;
- servicios no geométricos;
- exportadores;
- configuración sin secretos.

### Riesgo alto

- geometría;
- escalado;
- observers;
- timers;
- bridges Ruby↔JavaScript;
- persistencia de atributos;
- carga del plugin;
- licencias;
- actualización;
- archivos monolíticos;
- cambios que atraviesan varios módulos.

### Riesgo crítico

- Despiece;
- migraciones de datos;
- loader principal;
- sistemas de licencia;
- eliminación o movimiento masivo de archivos;
- reemplazo de lógica Ruby por Go/C++;
- cambios que puedan impedir que SketchUp abra.

Un cambio crítico requiere orden explícita, plan escrito, rollback probado y validación real ampliada.

---

# 6. Fase 1 — Línea base estable

## Sincronizar sin destruir trabajo

```powershell
Set-Location -LiteralPath $RepoPlugin

git fetch origin --prune
git switch main
git pull --ff-only origin main
git status --short
```

## Compuerta

- `git status --short` debe estar vacío o los cambios deben clasificarse antes de continuar.
- No ocultar archivos modificados.
- No descartar cambios desconocidos.
- No usar reset destructivo.

## Registrar SHA base

```powershell
$BaseSha = (git rev-parse HEAD).Trim()
$BaseSha
```

El SHA base debe aparecer en el plan, manifiesto de despliegue y Pull Request.

## Validación de línea base

Ejecutar las pruebas disponibles antes de cambiar nada. Si la línea base ya falla, registrar el fallo como preexistente. No atribuirlo a la rama nueva.

## Punto estable

Cuando el dueño lo autorice, crear un tag anotado:

```powershell
git tag -a "stable/AAAA-MM-DD-NN" -m "Estado estable aprobado de McComicsUp Suite Pro IA"
git push origin "stable/AAAA-MM-DD-NN"
```

El tag ayuda a identificar el estado, pero no sustituye el backup de la copia viva.

---

# 7. Fase 2 — Crear rama y worktree aislados

## Crear el worktree

```powershell
$Branch = "chatgpt/fix/descripcion-corta"
$Worktree = Join-Path $WorktreesRoot "chatgpt-fix-descripcion-corta"

git worktree add -b $Branch $Worktree origin/main
```

## Verificación obligatoria

```powershell
Set-Location -LiteralPath $Worktree
git branch --show-current
git rev-parse HEAD
git status --short
```

Debe cumplirse:

- rama correcta;
- SHA igual al base esperado;
- worktree limpio;
- ubicación distinta de otro agente;
- ninguna edición en `main`.

## Regla de copia viva

El worktree es la fuente aislada de la rama. Para validar runtime, esa rama debe desplegarse controladamente en una **copia viva de prueba** que SketchUp realmente cargue.

No se considera validado un cambio probado en una carpeta que SketchUp nunca abrió.

---

# 8. Fase 3 — Análisis ThingForce y mapa de impacto

## Secuencia obligatoria

1. seleccionar el proyecto exacto del plugin;
2. confirmar que la raíz analizada corresponde al repositorio correcto;
3. buscar el símbolo, callback, clase o archivo owner;
4. trazar dependencias upstream;
5. trazar dependencias downstream;
6. revisar bridges Ruby↔JavaScript;
7. revisar loaders y orden de carga;
8. detectar archivos fuente y archivos generados;
9. revisar atributos, observers, timers y operaciones Undo;
10. calcular el radio de impacto;
11. definir la prueba que discrimina éxito de regresión.

## Si el grafo está obsoleto

Regenerarlo antes de confiar en sus resultados cuando la rama:

- añade archivos;
- elimina archivos;
- mueve módulos;
- renombra símbolos;
- cambia imports, requires o bridges;
- modifica el orden de carga.

## Si el dashboard local no está disponible

Aplicar fallback explícito:

- búsqueda por símbolos;
- búsqueda de `require` y `Sketchup.require`;
- búsqueda de callbacks `add_action_callback`;
- búsqueda de llamadas JavaScript hacia Ruby;
- búsqueda de atributos y namespaces;
- revisión de archivos hermanos;
- revisión de commits anteriores relacionados.

Registrar la limitación. No inventar relaciones que no fueron verificadas.

## Entregable de impacto

```text
Owner principal:
Dependencias directas:
Dependencias indirectas:
Bridges afectados:
Archivos generados:
Datos persistentes:
Módulos que no deben tocarse:
Pruebas requeridas:
Riesgo residual:
```

---

# 9. Fase 4 — Backup obligatorio antes de modificar

## Regla

Antes de modificar cualquier archivo existente, crear un backup timestamped en la misma carpeta del archivo original.

Formato recomendado:

```text
archivo.ext.BACKUP_YYYYMMDD_HHMMSS
```

## PowerShell de referencia

```powershell
function New-McComicsFileBackup {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "No existe el archivo a respaldar: $Path"
    }

    $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backup = "$Path.BACKUP_$stamp"
    $counter = 1

    while (Test-Path -LiteralPath $backup) {
        $backup = "$Path.BACKUP_${stamp}_$counter"
        $counter++
    }

    Copy-Item -LiteralPath $Path -Destination $backup -ErrorAction Stop

    $originalHash = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
    $backupHash = (Get-FileHash -LiteralPath $backup -Algorithm SHA256).Hash

    if ($originalHash -ne $backupHash) {
        throw "El backup no coincide con el original: $backup"
    }

    return $backup
}
```

## Reglas del backup

- verificar que puede leerse;
- verificar hash o contenido;
- registrar su ruta;
- no sobrescribir un backup anterior;
- no confiar únicamente en el historial Git;
- no incluir backups del plugin privado en commits normales;
- mantener patrones de backup en `.gitignore`;
- cuando una operación remota modifica documentación administrativa por orden expresa, conservar el backup donde el dueño haya exigido.

## Trampa importante

Agregar un patrón a `.gitignore` no deja de rastrear un archivo que Git ya conoce. Los archivos de runtime ya versionados deben retirarse del índice mediante un cambio específico y revisado, sin borrarlos de la computadora del usuario.

---

# 10. Fase 5 — Implementación controlada

## Principios

- cambiar el mínimo código necesario;
- una hipótesis por vez;
- un owner principal por rama;
- no mezclar refactor, rediseño y corrección funcional sin necesidad;
- preservar interfaces públicas;
- mantener compatibilidad hacia atrás;
- documentar decisiones no obvias;
- usar manejo de errores explícito;
- evitar bloquear el hilo principal de SketchUp;
- usar operaciones Undo correctas cuando se modifica el modelo;
- limitar ciclos, reintentos y trabajo geométrico;
- no introducir secretos ni rutas absolutas.

## Fuente versus generado

Si existe:

```text
partials -> index.html
src -> dist
plantilla -> archivo compilado
generador -> salida
```

se debe:

1. modificar la fuente;
2. ejecutar el generador oficial;
3. validar el resultado;
4. comparar fuente y generado;
5. incluir el generado solo si el repositorio lo versiona deliberadamente.

Nunca corregir únicamente la salida generada porque la siguiente regeneración borrará el cambio.

## Bridges Ruby↔JavaScript

Validar en ambos lados:

- nombre exacto del callback;
- cantidad y forma de argumentos;
- JSON plano cuando el contrato lo exige;
- manejo de errores;
- compatibilidad con valores nulos;
- llamadas duplicadas;
- orden de registro;
- disponibilidad después de recargar.

## Archivos monolíticos

Para archivos grandes:

- releer la región mínima exacta antes de editar;
- buscar métodos duplicados;
- revisar constantes y variables colgantes;
- aplicar parches pequeños;
- validar después de cada parche;
- no reemplazar todo el archivo para evitar conflictos de contexto.

## Commits pequeños

```powershell
git diff --check
git status --short
git add -p
git diff --cached --stat
git diff --cached
git commit -m "fix(modulo): descripcion concreta del cambio"
```

No usar mensajes vagos como `cambios`, `update`, `final` o `arreglo`.

---

# 11. Fase 6 — Validaciones automáticas

Ejecutar únicamente herramientas disponibles y apropiadas. Nunca inventar que una prueba pasó.

## Comprobaciones generales

```powershell
git diff --check
git status --short
```

Buscar:

- marcadores de conflicto;
- secretos;
- rutas absolutas locales;
- archivos temporales;
- backups staged;
- logs y estados runtime;
- archivos binarios inesperados;
- cambios de final de línea masivos;
- renombres accidentales.

## Ruby

```powershell
ruby -c ruta/al/archivo.rb
```

`ruby -c` valida sintaxis, no el runtime de SketchUp ni la API Ruby de SketchUp.

## JavaScript

```powershell
node --check ruta/al/archivo.js
```

## Python

```powershell
python -m py_compile ruta/al/archivo.py
```

## Go

```powershell
go test ./...
```

Ejecutar desde el módulo Go correcto.

## HTML y partials

- validar balance de etiquetas;
- validar que los partials se concatenan en el orden esperado;
- comprobar IDs duplicados;
- comprobar scripts faltantes;
- comprobar que el HTML generado coincide con sus fuentes;
- abrir la ventana real en SketchUp cuando el layout depende de HtmlDialog.

## Pruebas del repositorio

Ejecutar scripts definidos por el proyecto, por ejemplo:

```text
npm test
npm run lint
npm run build
scripts/validar_orden.ps1
```

Solo ejecutar comandos que realmente existan en el repositorio.

## Grafo posterior

Si cambió la arquitectura, regenerar ThingForce y repetir el análisis de impacto para comprobar que:

- no quedaron aristas huérfanas;
- no desaparecieron bridges esperados;
- el owner sigue siendo correcto;
- no se amplió accidentalmente el alcance.

---

# 12. Fase 7 — Preparar el despliegue de prueba

## Variables, no rutas hardcodeadas

```powershell
$RepoPlugin = $env:MCCOMICS_REPO_PLUGIN
$WorktreesRoot = $env:MCCOMICS_WORKTREES_ROOT
$PluginVivo = $env:MCCOMICS_SKETCHUP_PLUGIN_LIVE
```

Si una variable no existe, detenerse y solicitar configuración explícita. No adivinar rutas.

## SketchUp debe estar cerrado

Antes de copiar archivos:

- cerrar todas las instancias de SketchUp;
- comprobar que no queden procesos auxiliares que bloqueen archivos;
- guardar modelos abiertos;
- confirmar versión de SketchUp y carpeta viva exacta.

## Manifiesto de despliegue

Crear un archivo local, fuera de los archivos operativos del plugin o en una ubicación administrativa controlada:

```json
{
  "schema_version": 1,
  "plugin": "McComicsUp Suite Pro IA",
  "branch": "chatgpt/fix/descripcion-corta",
  "commit": "SHA_COMPLETO",
  "base_commit": "SHA_BASE",
  "deployed_at": "ISO-8601",
  "source_worktree": "RUTA_CONFIGURADA",
  "live_path": "RUTA_CONFIGURADA",
  "files": [],
  "backups": [],
  "excluded": [],
  "status": "deployed-for-test"
}
```

## Copia por allowlist

Copiar únicamente:

- archivos cambiados necesarios para el runtime;
- archivos generados requeridos;
- assets nuevos requeridos;
- loaders modificados cuando el cambio lo exige.

Excluir siempre:

- `.git/`;
- `.github/`;
- worktrees internos;
- tests no usados en runtime;
- documentación interna;
- `.env*`;
- tokens y claves;
- `node_modules/`;
- caches;
- logs;
- conversaciones;
- archivos `.jsonl` de runtime;
- `.mcc_bridge/` y estados equivalentes;
- backups;
- archivos temporales;
- modelos personales;
- artefactos de otro sistema operativo.

## No usar espejo destructivo

No utilizar `robocopy /MIR`, `rsync --delete` ni comandos equivalentes sobre la copia viva salvo que exista una lista de eliminación aprobada y un rollback probado.

## Un solo loader activo

No mantener simultáneamente versión estable y versión experimental con el mismo:

- archivo loader;
- extension ID;
- namespace;
- toolbar;
- observers;
- timers.

Esto puede duplicar menús, toolbars, callbacks y eventos.

## Estrategias permitidas

### Estrategia A — Copia controlada, recomendada

Respaldar y sustituir únicamente los archivos de la rama en la copia viva.

### Estrategia B — Loader de desarrollo configurable, avanzada

Un loader de desarrollo puede apuntar a un worktree mediante configuración local no versionada. Debe garantizar que solo una versión se cargue y que producción no dependa de rutas locales.

---

# 13. Fase 8 — Matriz de pruebas dentro de SketchUp

## Arranque

- SketchUp abre sin errores de extensión.
- La consola Ruby no muestra excepciones nuevas.
- El plugin aparece una sola vez.
- Las toolbars no se duplican.
- Los menús no se duplican.
- No quedan ventanas invisibles o procesos colgados.

## Modelo nuevo

- crear modelo vacío;
- ejecutar la función sin selección;
- ejecutar con selección válida;
- cancelar diálogos;
- probar valores mínimos, normales y máximos permitidos;
- comprobar mensajes de error claros.

## Modelo existente

- abrir un modelo real representativo;
- probar dentro y fuera de grupos y componentes;
- verificar atributos existentes;
- verificar materiales y capas/tags;
- verificar que no se alteren entidades no seleccionadas;
- guardar, cerrar y volver a abrir.

## Operaciones

- Undo funciona;
- Redo funciona;
- no quedan operaciones abiertas;
- no aparecen entidades huérfanas;
- no se corrompe la selección;
- no se duplican observers o timers después de recargar.

## UI y bridges

- cada tab abre;
- no hay paneles aparentemente vacíos;
- inputs conservan y transmiten valores;
- callbacks Ruby↔JS responden una sola vez;
- errores se muestran sin congelar SketchUp;
- resize, scroll y layout siguen funcionando;
- no se pierden partials ni scripts.

## Regresión

Probar también:

- el módulo modificado;
- un módulo vecino;
- loader principal;
- guardado del modelo;
- funciones críticas no relacionadas;
- actualización/licencia si el cambio las toca.

## Rendimiento

- medir tiempo aproximado antes y después;
- comprobar que la UI no se congela;
- comprobar que no crece indefinidamente el uso de memoria;
- verificar que procesos nativos o workers terminan correctamente.

## Evidencia

Registrar:

```text
Versión de SketchUp:
Sistema operativo:
Branch:
Commit:
Modelo usado:
Prueba:
Resultado PASS/FAIL:
Error exacto:
Captura o log:
Rollback requerido:
```

---

# 14. Fase 9 — Rollback si la rama falla

## Regla principal

Cambiar de rama en Git no restaura automáticamente los archivos ya copiados en la carpeta viva de SketchUp.

## Procedimiento

1. cerrar SketchUp;
2. abrir el manifiesto del despliegue;
3. restaurar cada backup en su ruta original;
4. verificar hashes o contenido;
5. eliminar únicamente archivos nuevos listados en el manifiesto;
6. no borrar archivos desconocidos;
7. abrir SketchUp;
8. ejecutar smoke test de la versión estable;
9. marcar el manifiesto como `rolled-back`;
10. conservar la rama para diagnóstico.

## Alternativa

Desplegar nuevamente el SHA estable exacto mediante el mismo sistema de copia controlada.

## Si el worktree quedó dañado

- no usar reset destructivo;
- crear un worktree limpio desde el SHA base;
- comparar ambos worktrees;
- rescatar únicamente los commits o parches válidos;
- eliminar el worktree defectuoso solo después de confirmar que no contiene trabajo útil.

## Si el fallo ya llegó a main

Crear un commit de reversión:

```powershell
git switch main
git pull --ff-only origin main
git revert <SHA_DEL_COMMIT_O_MERGE>
git push origin main
```

No reescribir la historia compartida.

---

# 15. Fase 10 — Draft Pull Request

## Abrir como borrador

El PR debe apuntar de la rama aislada hacia `main` y permanecer Draft mientras falten pruebas locales.

## Contenido obligatorio del PR

```markdown
## Objetivo

## SHA base

## Archivos modificados

## Owner y dependencias

## Bridges afectados

## Archivos fuente y generados

## Backups creados

## Pruebas automáticas

## Pruebas en SketchUp

## Evidencia PASS/FAIL

## Riesgos residuales

## Procedimiento de rollback

## Confirmación del dueño
```

## Revisión

Antes de marcarlo listo:

- comparar `main...rama`;
- revisar cada archivo;
- confirmar que no entraron backups, logs o secretos;
- confirmar que no se tocó Despiece sin autorización;
- confirmar que no hubo cambios masivos de EOL;
- confirmar que los archivos generados provienen de sus fuentes;
- comprobar CI;
- adjuntar evidencia runtime.

## Fusión

Método recomendado:

```text
Squash and merge
```

No fusionar automáticamente un cambio de riesgo alto o crítico.

---

# 16. Fase 11 — Después de fusionar

1. actualizar `main` mediante `pull --ff-only`;
2. comprobar el SHA fusionado;
3. regenerar el grafo;
4. ejecutar las pruebas finales;
5. construir el `.rbz` desde ese SHA exacto;
6. generar checksums;
7. firmar manifiestos cuando corresponda;
8. desplegar exactamente el commit aprobado;
9. crear tag/release si aplica;
10. actualizar memoria, plan vivo y changelog;
11. retirar el worktree únicamente cuando todo esté estable.

## Limpieza segura del worktree

```powershell
git worktree list
git worktree remove $Worktree
git branch -d $Branch
```

Usar `-D` solo cuando el dueño ordene descartar definitivamente una rama no fusionada y se haya confirmado que no contiene trabajo necesario.

---

# 17. Trampas verificadas y cómo evitarlas

## Trampa 1 — La rama existe pero no contiene cambios

Comprobar con:

```powershell
git log --oneline main..$Branch
git diff --stat main...$Branch
```

## Trampa 2 — Nombre de rama incorrecto

Los nombres son exactos y sensibles a mayúsculas en varios contextos. Confirmar con `git branch -a` o la API antes de escribir.

## Trampa 3 — Probar otra carpeta

Una prueba en un worktree que SketchUp no carga no valida el plugin vivo.

## Trampa 4 — `git switch main` como falso rollback

Git cambia el worktree, no necesariamente la carpeta instalada. Restaurar mediante manifiesto o despliegue estable.

## Trampa 5 — Dos loaders activos

Produce toolbars, observers, timers y callbacks duplicados. Mantener una sola instalación activa.

## Trampa 6 — SketchUp abierto durante la copia

Puede mantener archivos cargados, ocultar errores y producir estado híbrido. Cerrar antes de desplegar o restaurar.

## Trampa 7 — Grafo obsoleto

Un grafo anterior a renombres, movimientos o nuevos archivos puede recomendar el owner incorrecto. Regenerar cuando cambie estructura.

## Trampa 8 — Editar generado en vez de fuente

La siguiente compilación elimina la corrección. Identificar siempre el productor canónico.

## Trampa 9 — `.gitignore` no desversiona archivos

Un archivo ya rastreado continuará en Git. Retirarlo del índice requiere una operación deliberada y revisada.

## Trampa 10 — Archivos de runtime en commits

Estados, conversaciones, `.jsonl`, rutas de modelos y bridge state generan conflictos y pueden sobrescribir datos locales. Excluirlos del repositorio y del despliegue.

## Trampa 11 — Backup incluido en el commit

Revisar `git status` y `.gitignore`. El backup local no debe convertirse en código de producción.

## Trampa 12 — Ruby verde, SketchUp roto

`ruby -c` no carga la API de SketchUp, HtmlDialog, observers ni entidades reales. Requiere prueba runtime.

## Trampa 13 — CI verde, runtime roto

CI no reproduce necesariamente SketchUp, GPU, HtmlDialog ni un modelo real. Mantener compuerta manual en vivo.

## Trampa 14 — Cambios de final de línea

Windows y herramientas distintas pueden convertir todo el archivo. Respetar `.gitattributes` y rechazar diffs masivos no intencionales.

## Trampa 15 — OneDrive, rutas largas y Unicode

Rutas con espacios, `™`, nombres extensos o sincronización pueden romper PowerShell, Git o herramientas. Usar `-LiteralPath`, UTF-8 y worktrees cortos fuera de carpetas sincronizadas cuando sea posible.

## Trampa 16 — Secrets en configuración

Nunca versionar `.env`, service role, API keys, tokens o credenciales. Usar variables de entorno y ejemplos sin secretos.

## Trampa 17 — Commit demasiado amplio

Un commit con varias funciones impide identificar la regresión. Separar por objetivo y usar `git add -p`.

## Trampa 18 — PR desde una base vieja

Actualizar o rebasar de forma controlada antes de fusionar. Resolver conflictos comprendiendo ambos lados; no aceptar automáticamente “ours” o “theirs”.

## Trampa 19 — Eliminar rama demasiado pronto

Conservarla hasta que el commit fusionado haya sido probado en la copia viva estable.

## Trampa 20 — Archivos binarios inflando el repositorio

No versionar repetidamente videos, modelos, ZIP o artefactos grandes sin política. Evaluar Git LFS y releases, sin reescribir historial sin plan explícito.

## Trampa 21 — Reutilizar una rama antigua

Mezcla contextos, commits y objetivos. Crear una rama nueva por tarea.

## Trampa 22 — Recarga parcial engañosa

Ruby puede conservar constantes, observers y estado de una versión anterior. Para cambios de carga, realizar también una prueba desde arranque limpio.

## Trampa 23 — Eliminaciones no declaradas

Una copia espejo puede borrar archivos del usuario. Toda eliminación debe aparecer en el manifiesto y tener backup.

## Trampa 24 — Modificar Despiece por dependencia indirecta

Aunque el grafo lo muestre como relacionado, no tocarlo sin orden explícita. Diseñar adaptación fuera del módulo o solicitar autorización.

## Trampa 25 — Confundir repositorios parecidos

Verificar `owner/name`, visibilidad, rama y SHA. No asumir que un repositorio público contiene el core privado.

## Trampa 26 — Modificar archivos con nombres parecidos

Confirmar ruta exacta, namespace, loader y referencias. No escoger por nombre solamente.

## Trampa 27 — Error preexistente atribuido a la rama

Ejecutar baseline antes de modificar y repetir exactamente la misma prueba después.

## Trampa 28 — Rollback no probado

Un backup que nunca se verificó puede estar incompleto. Comprobar hash y ejecutar smoke test después de restaurar.

---

# 18. Árbol de decisión

```text
¿La tarea toca el plugin?
  no -> usar skill correspondiente
  sí
    -> revisar reglas McComics®
    -> identificar owner y riesgo
    -> ¿Despiece o zona restringida?
         sí -> exigir orden explícita
    -> registrar SHA base
    -> crear rama + worktree
    -> analizar ThingForce
    -> crear backups
    -> aplicar cambio mínimo
    -> ejecutar validaciones automáticas
    -> ¿requiere runtime SketchUp?
         sí -> desplegar con manifiesto y probar
    -> ¿PASS?
         no -> rollback + corregir misma rama
         sí -> Draft PR + revisión
    -> ¿dueño aprueba?
         no -> mantener o cerrar rama sin merge
         sí -> squash merge + prueba final + release
```

---

# 19. Checklist antes de editar

- [ ] revisé todas las reglas McComics® aplicables
- [ ] cargué AGENTS, selector y skills obligatorias
- [ ] confirmé repositorio, rama base y SHA
- [ ] confirmé que no estoy en `main`
- [ ] identifiqué owner real y archivos generados
- [ ] revisé dependencias y bridges
- [ ] confirmé que Despiece no será tocado sin permiso
- [ ] ejecuté baseline
- [ ] creé rama y worktree propios
- [ ] creé y verifiqué backups

# 20. Checklist antes de desplegar

- [ ] pruebas estáticas PASS
- [ ] diff revisado
- [ ] no hay secretos
- [ ] no hay backups staged
- [ ] no hay runtime state staged
- [ ] grafo actualizado si cambió estructura
- [ ] SketchUp cerrado
- [ ] ruta viva confirmada
- [ ] manifiesto creado
- [ ] archivos por allowlist
- [ ] un solo loader activo
- [ ] rollback preparado

# 21. Checklist de runtime

- [ ] arranque limpio
- [ ] una toolbar y un menú
- [ ] consola Ruby sin errores nuevos
- [ ] modelo nuevo
- [ ] modelo existente
- [ ] selección válida e inválida
- [ ] Undo/Redo
- [ ] guardar y reabrir
- [ ] bridges Ruby↔JS
- [ ] observers y timers sin duplicar
- [ ] módulos vecinos sin regresión
- [ ] rendimiento aceptable
- [ ] evidencia PASS/FAIL registrada

# 22. Checklist antes de merge

- [ ] Draft PR completo
- [ ] diff final revisado
- [ ] CI PASS
- [ ] runtime PASS cuando aplica
- [ ] rollback verificable
- [ ] dueño aprobó expresamente
- [ ] merge apunta a `main`
- [ ] método de merge definido
- [ ] SHA final registrado

# 23. Checklist de rollback

- [ ] SketchUp cerrado
- [ ] manifiesto correcto
- [ ] backups localizados
- [ ] hashes verificados
- [ ] archivos nuevos eliminados solo por lista
- [ ] versión estable desplegada
- [ ] smoke test PASS
- [ ] fallo documentado
- [ ] rama conservada para diagnóstico

---

# 24. Formato obligatorio del reporte final

```text
RESULTADO: PASS | FAIL | BLOQUEADO

Repositorio:
Rama:
SHA base:
SHA final:
Objetivo:
Archivos modificados:
Backups:
Dependencias revisadas:
Bridges afectados:
Pruebas automáticas:
Prueba SketchUp:
Evidencia:
Rollback:
Riesgos residuales:
PR:
Acción siguiente autorizada:
```

No usar “listo” si falta evidencia en vivo para un cambio que depende de SketchUp.

---

# 25. Definición de terminado

Una tarea queda terminada únicamente cuando:

- el cambio está aislado;
- el código fuente correcto fue modificado;
- los backups existen y son verificables;
- las pruebas automáticas pasaron;
- la copia viva fue probada cuando corresponde;
- no hay regresiones conocidas;
- el rollback existe;
- el dueño aprobó la integración;
- `main` contiene únicamente el cambio aprobado;
- el grafo, documentación y memoria quedaron sincronizados.

Si cualquiera de estas condiciones falta, el estado correcto es **PENDIENTE**, **FAIL** o **BLOQUEADO**, nunca “terminado”.

---

<!-- sistema: ThingForce™ McComics | skill: mccomics-git-ramas-sketchup-seguras | autor: McComics Servicios Generales | creado: 2026-07-31 -->
