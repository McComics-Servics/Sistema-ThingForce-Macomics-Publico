# ES05 - Caso especifico de visualizacion y plugins McComics

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 401-491

Uso: Cargar cuando el fallo sea muy especifico de overlays, seleccion visual o plugins McComics existentes.

---

## ERROR: Haiku 4.5 — No aplica visualización selectiva de dimensiones en pieza

Descripción breve:
Al pedir que la dimensión mostrada en la ventana (ej. "501 x 315 x 18 mm") se pinte directamente sobre la pieza con formato "lado A: 501 mm — centro: 18 mm (más pequeño) — lado B: 315 mm" (cada medida con color del eje), Haiku 4.5 no aplicó correctamente el cambio. En la práctica no se mostró el texto sobre la pieza o se mostró en posiciones erróneas o no con el formato solicitado.

Síntomas reproducibles:

- Seleccionar una o dos piezas en el modelo.
- Esperar que aparezcan textos sobre la geometría con las tres medidas (lado izquierdo, centro grosor más pequeño, lado derecho).
- Resultado observado: no aparece texto, aparece en coordenadas erróneas, aparece duplicado, o aparece con tamaño/estilo incorrecto.

Causas probables identificadas:

1. Observer no activado o no actualizado: el módulo responsable de dibujar (`DimensionOverlay`) no fue registrado o `update_selection` no recibió la entidad correcta.
2. Datos devueltos por `GeometryAnalyzer` incompletos o en otro formato (faltan `:largo`, `:ancho`, `:espesor` o los ejes asociados), por lo que el renderer no sabe qué mostrar.
3. Cálculo de posiciones 3D vs pantalla: elegir puntos "izquierda/centro/derecha" requiere convertir correctamente bounding box y transformaciones; piezas rotadas o cámaras oblicuas causan ubicaciones fuera de vista.
4. Texto renderizado detrás de geometría o fuera del frustum de cámara (por offsets insuficientes).
5. Errores silenciados por `rescue nil` que ocultan excepciones reales durante el dibujo.
6. El flujo de selección múltiple no manejado: cuando hay 2 seleccionados el código puede ignorar el caso o mezclar datos.
7. El RBZ no reempaquetó correctamente los archivos modificados (falta actualizar `Despiece_McComics.rb` en raíz o no se incorporaron scripts al RBZ), por lo que la versión ejecutada por SketchUp no contiene los cambios.

Pasos para reproducir (rápido):

1. Abrir SketchUp con la extensión instalada.
2. Seleccionar una pieza alineada a ejes con dimensiones conocidas (ej. 501x315x18).
3. Observar consola/viewport y verificar si aparecen los textos esperados.

Solución aplicada / recomendada:

- Asegurar que `DimensionOverlay.activate` se llame al iniciar el diálogo y que `update_selection(entity)` reciba la entidad seleccionada.
- Validar que `GeometryAnalyzer.analyze` devuelva `:largo`, `:ancho`, `:espesor`, `:eje_largo`, `:eje_ancho`, `:eje_espesor`.
- Calcular posiciones usando `bb_min`, `bb_max` y `bb_center`, aplicar offsets suficientemente grandes y basados en tamaño de la pieza para evitar quedar dentro de la geometría.
- Dibujar 3 textos: izquierda (largo), centro (grosor, fuente más pequeña), derecha (ancho); asignar color según eje.
- Evitar `rescue nil` durante la fase de debugging para detectar excepciones reales; usar logging temporal (`UI.messagebox` o `puts`) para verificar flujo.
- Reempaquetar RBZ asegurando que `Despiece_McComics.rb` esté en la raíz del .rbz y que la carpeta `Despiece_McComics/` contenga los módulos actualizados.

Precauciones y notas:

- Ten en cuenta rotaciones: para piezas rotadas es mejor calcular los puntos a partir de los edges principales o proyectar al plano de la pieza.
- El tamaño de fuente es dependiente del zoom/DPI; usar tamaños relativos o probar en varias escalas.
- No ocultar errores con `rescue nil` en código nuevo; solo dejarlo en producción tras verificar estabilidad.

Registro de cambios relacionado:

- Se añadió una versión inicial en `Despiece_McComics/core/dimension_overlay.rb` con lógica para dibujar texto en tres posiciones (izq/centro/der) y colores por eje. Si el comportamiento no coincide con lo esperado, seguir los pasos de validación anteriores.

---

Solución: verificar que animation esté habilitada.

88. Page layer visibility no persiste
    Solución: actualizar page después de cambiar layers.

## ERRORES DE PLUGINS MCCOMICS ESPECÍFICOS

89. Crear_piezas_de_Melamina mal posiciona cajones
    Solución: revisar lógica de posicionamiento, usar anclas correctas.

90. ESCALADOR_ULTRA no respeta grosores
    Solución: validar grosores antes de escalar, no escalar ejes de espesor.

91. DESPLAZADOR_PROPORCIONAL mueve piezas fuera de bounds
    Solución: calcular bounds antes de desplazar, validar límites.

92. Plugin toolbar invisible
    Solución: registrar toolbar con UI::Toolbar.new y add_item.

93. Icono toolbar no carga
    Solución: verificar ruta base64 o archivo PNG.

94. Material McComics no aplica
    Solución: verificar que archivo .skm esté en carpeta materials.

95. Ventana paramétrica se duplica
    Solución: verificar instancia única antes de crear dialog.

96. Botones 3D no tienen efecto hover
    Solución: añadir CSS hover con transform y box-shadow.

97. Logo McComics no aparece
    Solución: verificar base64 válido o ruta de imagen.

98. Branding azul #2563EB no aplica
    Solución: verificar CSS con color correcto.

99. Licencia no valida
    Solución: verificar conexión a servidor y hash correcto.

100.  Actualización automática falla
      Solución: verificar URL de actualización en grupomccomics.com.

