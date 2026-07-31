# PATRONES REPETIDOS Y ANTI-ERRORES

Este archivo resume las familias de errores que mas se repiten en el corpus SketchUp McComics para ahorrar contexto sin perder criterio.

## 1. Carga, registro y versionado

- registrar bien la extension y la UI
- evitar doble carga de `.rb` o toolbars duplicadas
- validar compatibilidad por version de SketchUp antes de usar APIs modernas
- fallback a `WebDialog` si `HtmlDialog` no existe en la version objetivo

## 2. Dialogos, observers, callbacks y timers

- no duplicar dialogs; refrescar si ya existen
- no dejar observers activos al salir o recargar
- no disparar observers multiples veces por falta de guardas
- no usar threads reales sobre la API de SketchUp; preferir timers y diferidos controlados
- evitar loops, deadlocks o callbacks cruzados entre Ruby y JS

## 3. Geometria y transformaciones

- validar puntos, area minima, colinealidad y bounding boxes antes de crear o modificar
- evitar escalas 0, transformaciones singulares o acumulativas por error de logica
- limpiar microcaras, microaristas y geometrias degeneradas despues de booleanas
- verificar normales, frontalidad y manifold antes de exportar o fabricar

## 4. Materiales, capas, seleccion y metadata

- validar que materiales y texturas existan antes de aplicar
- no confiar en layers/tags ocultos como si fuesen geometria ausente
- validar seleccion real, incluyendo anidamientos cuando haga falta
- proteger `attributes`, `dictionaries` y metadata al copiar, convertir o deshacer

## 5. Operaciones, undo y rendimiento

- toda modificacion de modelo debe vivir dentro de una operacion bien cerrada
- no anidar operaciones sin control
- usar `disable_ui` y granularidad correcta para evitar UI lenta o undos corruptos
- liberar dialogs, observers, timers, caches y archivos temporales

## 6. Ruby, tipos y validacion

- validar `nil`, tipos, rangos, paths y encoding antes de llamar la API
- no asumir que un objeto sigue vivo: usar `valid?`, `deleted?` y retornos defensivos
- no mezclar strings, numeros, hashes y arrays sin chequeo previo
- no dejar errores de sintaxis, `end` desbalanceados ni `return` donde no va

## 7. HtmlDialog y frontend dentro de SketchUp

- escapar strings antes de ejecutar JS desde Ruby
- normalizar paths y recursos para evitar CORS, rutas rotas o dialogs vacios
- controlar CSS y layout para no romper foco, scroll, botones o escalado
- separar problemas web generales de problemas especificos del host SketchUp

## 8. Melamina, despiece y manufactura

- collision-free siempre
- frente adelante y fondo atras
- no generar piezas duplicadas, imposibles o no ensamblables
- respetar grosores estandar, vetas, cantos, ranuras y tolerancias
- no romper metadata que luego alimenta despiece, exportacion o presupuesto

## Regla de uso

Antes de abrir un modulo tematico, leer este archivo si la tarea es SketchUp o manufactura. Despues abrir solo el modulo tematico y, si hace falta mas cobertura, el compendio correspondiente.
