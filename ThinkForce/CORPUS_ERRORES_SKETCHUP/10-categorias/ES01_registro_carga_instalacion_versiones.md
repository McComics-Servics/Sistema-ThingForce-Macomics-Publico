# ES01 - Registro, carga, instalacion y versiones

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 110-148

Uso: Cargar cuando el cambio toque loader, menu, toolbar, empaquetado, RBZ o compatibilidad entre versiones.

---

## ERRORES DE REGISTRO Y CARGA

8. Extensión no aparece en menú ni barra de herramientas
   Solución: registro correcto con SketchupExtension.new y inicialización de UI.

9. NoMethodError (private method 'inputbox' called)
   Solución: renombrar módulos/clases internos que colisionan con API SketchUp (UI, Model, etc).

10. Syntax error, unexpected end-of-input, expecting 'end'
    Solución: revisión completa de sintaxis, balanceo de begin/end y def/end.

11. Invalid return in class/module body
    Solución: eliminar return de inicializaciones de clase; mantenerlos solo dentro de métodos.

12. Undefined method 'description=' for Deleted Entity
    Solución: verificar validez antes de modificar con if definition && definition.valid? && !definition.deleted?.

13. Base64 de íconos demasiado largos (1000+ caracteres)
    Solución: reducir a ~20 caracteres con comentarios claros y documentar ubicación.

## ERRORES DE EMPAQUETADO E INSTALACIÓN

14. Extensión no aparece en Extension Manager / no instala desde .rbz
    Solución: empaquetar correctamente (rbz = zip), incluir archivo principal, probar instalación manual.

15. Error al instalar .rbz: "Could not find extension manifest"
    Solución: incluir metadata.yml o fichero requerido según versión.

16. Archivo .rb cargado dos veces / extensión duplicada
    Solución: comprobar rutas Plugins/Extensions, usar guardas como return if defined?(MY_EXTENSION_LOADED).

## ERRORES DE VERSIONES Y COMPATIBILIDAD

17. NoMethodError / ArgumentError después de actualizar SketchUp
    Solución: usar Sketchup.version.to_i o Sketchup.version_number para condicionales.

18. Funciones HtmlDialog/WebDialog fallan en versiones antiguas
    Solución: usar fallback a WebDialog si HtmlDialog no existe.

