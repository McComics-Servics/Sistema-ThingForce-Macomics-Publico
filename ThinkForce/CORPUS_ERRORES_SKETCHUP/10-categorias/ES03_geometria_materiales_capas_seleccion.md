# ES03 - Geometria, materiales, capas, seleccion y metadata

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 213-293

Uso: Cargar cuando el cambio toque transformaciones, caras, bounding boxes, materiales, layers, seleccion o attributes.

---

## ERRORES DE TRANSFORMACIONES Y GEOMETRÍA

35. Transformation mal aplicada invierte geometría
    Solución: aplicar transformaciones en orden correcto, verificar determinante.

36. BoundingBox incorrecto después de escalar
    Solución: recalcular bounds después de transformaciones.

37. Face.normal invertida después de operación
    Solución: verificar orientación con face.reverse! si es necesario.

38. Intersecciones booleanas fallan
    Solución: validar sólidos antes de operación, usar model.active_entities.intersect_with.

39. Grupos anidados pierden transformación
    Solución: acumular transformaciones con transformation \* instance.transformation.

40. EdgeUse mal orientado causa loops rotos
    Solución: reconstruir loops con edges correctamente orientados.

## ERRORES DE MATERIALES

41. Material no se aplica a cara
    Solución: asignar a face.material, no a face.back_material si está al frente.

42. Material duplicado con mismo nombre
    Solución: verificar existencia antes de crear con model.materials[nombre].

43. Textura no escala correctamente
    Solución: usar material.texture.size= con dimensiones correctas.

44. Material .skm no carga
    Solución: verificar ruta completa y formato .skm válido.

## ERRORES DE CAPAS Y VISIBILIDAD

45. Layer no oculta geometría
    Solución: asignar layer a entidades, no solo crear layer.

46. Entidad en layer oculto sigue visible
    Solución: verificar que layer.visible = false y entity.layer = layer.

47. Layer eliminado deja entidades huérfanas
    Solución: reasignar entidades a Layer0 antes de eliminar.

## ERRORES DE SELECCIÓN

48. Selection.clear no limpia selección
    Solución: usar model.selection.clear dentro de operación.

49. Selección no incluye entidades anidadas
    Solución: usar selection.grep(Sketchup::ComponentInstance) y explorar recursivamente.

50. Selection observer no detecta cambios
    Solución: verificar que observer esté registrado correctamente.

## ERRORES DE ATRIBUTOS Y METADATA

51. set_attribute no persiste datos
    Solución: usar strings como keys, no símbolos; commit operation.

52. get_attribute retorna nil aunque existe
    Solución: verificar diccionario correcto y tipo de dato.

53. delete_attribute no elimina
    Solución: usar delete_key en lugar de delete_attribute.

54. Attribute dictionary desaparece al copiar
    Solución: copiar manualmente atributos después de clonar.

## ERRORES DE DESHACER/REHACER

55. Undo no revierte operación
    Solución: envolver en start_operation con transparent = false.

56. Redo falla después de undo
    Solución: no modificar modelo fuera de operations.

57. Operation stack corrupto
    Solución: siempre hacer commit o abort, nunca dejar abierto.

