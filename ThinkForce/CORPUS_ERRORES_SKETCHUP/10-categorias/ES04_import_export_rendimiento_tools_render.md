# ES04 - Importacion, exportacion, rendimiento, dialogs y tools

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 294-400

Uso: Cargar cuando el cambio toque import/export, rendimiento, HtmlDialog/WebDialog, tools, texto, dimensiones, render o paginas.

---

## ERRORES DE IMPORTACIÓN/EXPORTACIÓN

58. Import DWG falla
    Solución: verificar versión DWG compatible, usar opciones correctas.

59. Export 3DS pierde materiales
    Solución: asignar materiales antes de exportar, verificar formato soportado.

60. Export STL invierte normales
    Solución: usar opciones de exportación con correct_normals = true.

61. Import Collada duplica geometría
    Solución: limpiar modelo antes de importar.

## ERRORES DE RENDIMIENTO

62. Plugin lento al iterar entities
    Solución: usar grep en lugar de select, evitar loops anidados.

63. Operación bloquea UI
    Solución: dividir en chunks con UI.start_timer.

64. Memoria no se libera
    Solución: limpiar referencias, usar GC.start si es necesario.

65. Demasiadas operaciones undo acumuladas
    Solución: usar transparent operations o purge_unused.

## ERRORES DE HTMLDIALOG/WEBDIALOG

66. JavaScript no ejecuta en dialog
    Solución: verificar consola con dialog.show_console = true.

67. Callback Ruby no responde desde JS
    Solución: verificar nombre de callback y argumentos.

68. Dialog no cierra correctamente
    Solución: usar dialog.close, no hide si quieres liberar recursos.

69. CSS no aplica en dialog
    Solución: incluir CSS inline o con file:// correcto.

70. Dialog aparece en posición incorrecta
    Solución: usar set_position y set_size antes de show.

## ERRORES DE HERRAMIENTAS (TOOLS)

71. Tool.onMouseMove no funciona
    Solución: verificar que tool esté activo con model.select_tool.

72. Tool.onLButtonDown no detecta click
    Solución: retornar true o false según corresponda.

73. Tool cursor no cambia
    Solución: usar UI.set_cursor con ID válido.

74. Tool no se desactiva
    Solución: llamar model.select_tool(nil).

75. Tool pierde estado al cambiar vista
    Solución: guardar estado en variables de instancia.

## ERRORES DE TEXTO Y DIMENSIONES

76. Text entity no aparece
    Solución: verificar posición y que esté en entities activos.

77. Dimension mal orientada
    Solución: ajustar puntos de inicio y fin correctamente.

78. Text con encoding incorrecto
    Solución: usar UTF-8 para todos los strings.

## ERRORES DE SOMBRAS Y RENDERIZADO

79. Sombras no se muestran
    Solución: activar shadow_info.display_shadows = true.

80. Render estilo no aplica
    Solución: verificar que estilo esté activo con model.styles.selected_style.

81. Hidden geometry visible en render
    Solución: ocultar con entity.hidden = true.

## ERRORES DE GRUPOS Y COMPONENTES

82. Group.explode deja geometría suelta
    Solución: agrupar antes de explotar si quieres controlar resultado.

83. Component definition pierde metadata
    Solución: copiar atributos manualmente después de duplicar.

84. Instance no refleja cambios en definition
    Solución: refrescar instancia o recrear.

85. Definition entities vacío
    Solución: verificar que definition tenga geometría válida.

## ERRORES DE ESCENAS Y PÁGINAS

86. Page no guarda cámara
    Solución: usar page.update con flags correctos.

87. Scene transition no anima

---

