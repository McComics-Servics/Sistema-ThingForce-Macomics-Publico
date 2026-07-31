# AP01 - Resumen reciente de teardown, render nativo, V-Ray y debugging

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 9259-9284

Uso: Cargar cuando el trabajo toque salida segura, write_image, teardown, V-Ray o handover tecnico.

---

# Errores que la IA debe EVITAR COMETER (Resumido) - SketchUp & McComics

Este documento recopila errores críticos y lecciones aprendidas para asegurar la estabilidad y calidad de los desarrollos en SketchUp.

## 1. Gestión de Recursos y Teardown

- **ERROR:** Dejar observadores (`AppObserver`, `SelectionObserver`) activos al cerrar SketchUp o recargar el plugin provoca BugSplats (Crash).
- **SOLUCIÓN:** Implementar un `TeardownManager` robusto que desconecte TODOS los observadores y detenga timers en `AppObserver#onQuit`.
- **CRÍTICO:** `WGLUtils` crash indica que el contexto OpenGL se destruye mientras una ventana (HTMLDialog) o proceso sigue intentando dibujar. Cerrar todos los `HTMLDialog` antes de salir.

## 2. Renderizado Nativo (view.write_image)

- **ERROR:** Asumir que `view.write_image` soporta luces artificiales (Spot, Omni, Panel).
- **REALIDAD:** El render nativo SOLO usa la luz del sol (`ShadowInfo`). Las "luces" creadas como geometría deben ocultarse durante el render para evitar que aparezcan como objetos sólidos (cajas blancas/negras).
- **Artifacts Visuales:**
  - **Piezas Negras:** Caras invertidas (Backfaces) o texturas corruptas. Forzar `UseSunForAllShading` puede mitigar.
  - **Bordes Brillantes:** Si se desactiva "Edges" pero el estilo no se actualiza antes del `write_image`, pueden aparecer artefactos. Usar `view.invalidate` y esperar un frame.

## 3. Interacción con V-Ray

- Si V-Ray está instalado, `view.write_image` NO usa V-Ray. Para usar V-Ray, se debe invocar su API específica, no el método nativo de SketchUp. **NO CONFUNDIR.**

## 4. Debugging y Logs

- **REQUISITO:** Todo proyecto grande debe tener un sistema de logs exportable y un botón en la UI para abrir la carpeta de logs.
- **ENTREGABLE:** Al finalizar, crear un documento `DEBUG_HANDOVER.md` con instrucciones técnicas para la siguiente IA.
