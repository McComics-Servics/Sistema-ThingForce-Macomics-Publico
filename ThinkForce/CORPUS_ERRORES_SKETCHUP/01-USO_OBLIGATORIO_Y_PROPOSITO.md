# Uso obligatorio y proposito del corpus de errores SketchUp McComics

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 1-109

Uso: Leer primero para entender el alcance, el nivel de criticidad y la obligacion de revisar errores antes de tocar codigo.

---

RESUMEN DEFINITIVO DE ERRORES DOCUMENTADOS - McComics®
Errores Críticos en Desarrollo de Extensiones SketchUp (2019-2025)

⚠️ INSTRUCCIÓN OBLIGATORIA — LECTURA COMPLETA REQUERIDA
Este documento errores críticos documentados durante años de desarrollo profesional de extensiones SketchUp bajo el ecosistema McComics®. Cada error ha sido identificado, analizado y documentado porque ha causado problemas reales en producción.
📋 PROPÓSITO DE ESTE DOCUMENTO
NO es opcional. NO es referencia. Este es un manual de supervivencia para desarrollo de plugins SketchUp de nivel comercial.
🎯 OBJETIVO PRINCIPAL
Prevenir que repitas errores ya cometidos y documentados.
Cada error en este listado representa:

✅ Horas/días de debugging perdidos
✅ Código roto en producción
✅ Plugins que no cargan correctamente
✅ Crashes inesperados de SketchUp
✅ Pérdida de datos del usuario
✅ Incompatibilidades entre versiones
✅ Memory leaks y problemas de performance
✅ Operaciones de geometría fallidas

🚨 REGLA OBLIGATORIA MCCOMICS®
Antes de escribir CUALQUIER código nuevo para extensiones SketchUp:

LEER este documento completo — línea por línea
IDENTIFICAR qué errores aplican a tu caso
VALIDAR que tu código NO comete ninguno de estos errores
CONSULTAR este documento ante cualquier problema

NO ASUMIR que ya sabes evitar estos errores.
NO SALTARSE ningún error por considerarlo "obvio".
NO IGNORAR errores que "probablemente no te afecten".

💡 CÓMO USAR ESTE DOCUMENTO
Durante el desarrollo:

Consulta antes de implementar features complejas
Verifica tu código contra errores relacionados
Usa las soluciones como guía de implementación

Durante debugging:

Busca errores por síntomas similares
Aplica las soluciones documentadas
Evita reinventar soluciones ya probadas

Durante code review:

Valida que el código no comete errores conocidos
Verifica implementación de soluciones correctas
Detecta patrones anti-error

🔒 COMPROMISO DE CALIDAD MCCOMICS®
Todo código que salga bajo la marca McComics® debe:

✅ Estar validado contra este documento
✅ Implementar las soluciones documentadas
✅ Prevenir errores conocidos
✅ Mantener estándares profesionales

⚡ ADVERTENCIA FINAL
Ignorar estos errores NO es una opción.
Cada error documentado aquí ha causado:

Extensiones rotas
Pérdida de tiempo
Frustración del usuario
Código de baja calidad

Leer este documento ES OBLIGATORIO.
Aplicar estas lecciones ES MANDATORIO.
Evitar estos errores ES TU RESPONSABILIDAD.

Los 10 Mandamientos
NUNCA confíes en la entrada del usuario
NUNCA ignores un error catch
NUNCA hardcodees secrets
NUNCA asumas que funciona en prod porque en local sí
NUNCA despliegues sin health checks
NUNCA omitas validaciones de límites (arrays, números)
NUNCA uses eval() o exec() con datos de usuario
NUNCA ignores deprecations (son deuda técnica)
NUNCA copies código sin entenderlo (cargo cult)
NUNCA olvides escribir tests para el camino feliz

# 📋 ERRORES SKETCHUP McComics®

## ERRORES SOLUCIONADOS - CASOS ESPECÍFICOS

1. Botón/toolbar no aparece en ventana de materiales
   Solución: reestructurar registro con UI.start_timer(0), añadir .restore y agregar entradas en menús Extensions y Tools.

2. Crash al iniciar por eval de preferencias (DESPIECE_MCCOMICS v4.14.0)
   Solución: reemplazar eval por JSON.parse con begin/rescue, defaults y validación; en caso extremo, rollback a versión estable.

3. Banner de privacidad bloqueado por extensiones de navegador
   Solución: ajustar implementación para compatibilidad con bloqueadores como "I don't care about cookies".

4. Comentario duplicado al refrescar página
   Solución: implementar idempotencia en POST, usar tokens anti-duplicado.

5. Parámetros de entrada tipo fecha o entero obligatorios causaban errores
   Solución: corregir validación permitiendo campos opcionales.

6. Lista de trabajos falla al manejar usuarios eliminados
   Solución: manejo adecuado con null/fallback para usuarios eliminados.

7. Parámetros de entrada establecidos como obligatorios involuntariamente
   Solución: respetar configuración de campos opcionales/obligatorios.

