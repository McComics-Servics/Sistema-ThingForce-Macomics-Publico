# INDICE — ERRORES SKETCHUP MCCOMICS

Este sistema nace de un corpus legacy de errores SketchUp McComics hoy no presente como archivo fuente vivo en la raiz del repo. La base operativa que queda en esta carpeta es util y debe conservarse, pero no debe fingir que la fuente completa sigue disponible aqui.

Aqui se reorganizo el corpus derivado para que la IA cargue partes utiles sin abrir todo a la vez. Si en el futuro reaparece la fuente completa, este indice debe volver a enlazarla.

## Regla obligatoria

Antes de escribir o modificar codigo de:

- plugins SketchUp en Ruby
- HtmlDialog/WebDialog dentro de SketchUp
- herramientas McComics de melamina, despiece o manufactura
- loaders, toolbars, observers, tools, transformaciones, exportadores y operaciones del plugin

la IA debe leer:

1. `./McComics-Agent-System/ERRORES_SKETCHUP_MCCOMICS/01-USO_OBLIGATORIO_Y_PROPOSITO.md`
2. `./McComics-Agent-System/ERRORES_SKETCHUP_MCCOMICS/02-PATRONES_REPETIDOS_Y_ANTI_ERRORES.md`
3. este indice
4. solo los modulos que correspondan al cambio real

## Modulos tematicos

- `10-categorias/ES01_registro_carga_instalacion_versiones.md`
  - loader, menu, toolbar, RBZ, instalacion, compatibilidad
- `10-categorias/ES02_ui_dialogos_observers_concurrencia.md`
  - UI, dialogs, callbacks, observers, timers, threads
- `10-categorias/ES03_geometria_materiales_capas_seleccion.md`
  - geometria, bounding box, materiales, layers, seleccion, metadata
- `10-categorias/ES04_import_export_rendimiento_tools_render.md`
  - import/export, rendimiento, dialogs, tools, texto, dimensiones, render, pages
- `10-categorias/ES05_casos_especificos_y_plugins_mccomics.md`
  - casos especiales, overlays y plugins McComics existentes
- `10-categorias/ES06_ruby_logica_edgecases_validacion.md`
  - sintaxis Ruby, tipos, logica, edge cases, memoria, timing, validacion
- `10-categorias/ES07_web_integracion_seguridad_ops.md`
  - frontend web, integracion, seguridad, config, logging, testing, deployment
- `10-categorias/ES08_melamina_manufactura_patches_licencias.md`
  - melamina, despiece, manufactura, patches, UI McComics, licencias
- `10-categorias/ES09_render_animacion_plugins_precision_workflow.md`
  - render, animacion, precision, workflow, datos persistentes, accesibilidad, internacionalizacion, multimedia, red
- `10-categorias/ES10_errores_finales_501_705.md`
  - compendio avanzado adicional cuando el fallo no encaja en una categoria unica

## Compendio lineal denso

Si necesitas cobertura amplia o buscar errores por numero, usa `20-compendio/`.

- `CP_0001_0100.md`
- `CP_0101_0103.md`
- `CP_0452_0500.md`
- `CP_0552_0600.md`
- `CP_0601_0700.md`
- `CP_0701_0800.md`
- `CP_0801_0900.md`
- `CP_0901_0950.md`
- `CP_1001_1100.md`
- `CP_1101_1200.md`
- `CP_1201_1300.md`
- `CP_1301_1400.md`
- `CP_1401_1500.md`
- `CP_1501_1600.md`
- `CP_1601_1700.md`
- `CP_1701_1800.md`
- `CP_1801_1900.md`
- `CP_1901_2000.md`
- `CP_2001_2100.md`
- `CP_2101_2149.md`

## Apendice reciente

- `30-apendices/AP01_resumen_reciente_teardown_render_debug.md`

## Selector rapido por tipo de codigo

- loader, registro, toolbar, versionado: `ES01`
- dialogs, observers, callbacks, timers: `ES02`
- geometria, groups, definitions, materiales, layers, seleccion: `ES03`
- import/export, tools, render, dimensiones, pages: `ES04`
- bug especifico de plugin McComics actual: `ES05`
- sintaxis Ruby, nil, tipos, logica, validation: `ES06`
- HtmlDialog con JS/CSS o integraciones externas: `ES02` + `ES07`
- melamina, despiece, manufactura, patching, licencias: `ES08`
- precision, workflow, persistencia, accesibilidad, red, multimedia: `ES09`

## Regla de carga minima

- no abrir todos los modulos
- cargar 1 o 2 modulos como base
- añadir un compendio `CP_*` solo si hace falta cobertura amplia
- volver a la fuente original completa solo si el modulo y el compendio no bastan
