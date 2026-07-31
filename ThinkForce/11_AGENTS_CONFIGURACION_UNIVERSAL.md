# AGENTS.md — CONFIGURACIÓN UNIVERSAL DE AGENTE IA
## Versión Genérica para Cualquier Proyecto de Software

---

## Regla Madre

- La fuente canónica del proyecto es la raíz del repositorio
- Las Skills activas están en `./ThinkForce/`
- Si un resumen contradice un archivo fuente, manda el archivo fuente
- Si un documento legacy contradice la operación actual, mandan: este `AGENTS.md` y las Skills activas

---

## Orden de Carga (Obligatorio)

Al iniciar cualquier tarea, la IA debe:

1. Leer `./ThinkForce/02_SKILL_PLANIFICACION_EXTREMA.md`
2. Leer `./ThinkForce/03_SKILL_ESTANDAR_INDUSTRIAL.md`
3. Leer `./ThinkForce/04_SKILL_AGENTE_OPERATIVO.md`
4. Identificar el tipo de tarea
5. Cargar solo los Módulos de dominio que la tarea requiera
6. No cargar documentos completos si basta con un resumen

---

## Reglas Operativas

### Edición de Código en IDEs
- Los agentes en IDE (VS Code, Cursor, Windsurf, Kiro, Antigravity) editan DIRECTAMENTE en el workspace
- Cuando la edición directa falle 2+ veces por caracteres de escape complejos, OBLIGATORIO cambiar a script de terminal
- El script debe: (1) hacer backup automático, (2) verificar el patrón existe antes de modificar, (3) verificar resultado después de escribir
- Prohibido reintentar más de 2 veces una edición que falla; al tercer intento, usar script obligatoriamente
- Al editar archivos con caracteres UTF-8 especiales, usar siempre codificación UTF-8 verificada

### Seguridad (Absoluta)
- PROHIBIDO hardcodear secretos, tokens, claves, licencias o credenciales
- PROHIBIDO hardcodear medidas, dimensiones, cantidades o cualquier configuración
- Si ya existe un input o config que controle un valor, SIEMPRE leerlo desde allí
- Si una nueva configuración no tiene input, primero crear el input y enlazarlo dinámicamente
- Cuando se pida algo "por defecto", configurar los inputs/presets, NO hardcodear

### Calidad de Código
- Máximo 300 líneas por archivo; si crece, extraer módulo
- UTF-8 en todos los archivos
- Frozen string literals cuando el lenguaje lo soporte
- Todo valor debe ser configurable, nunca literal
- Buscar soluciones profundas y profesionales, NO tomar el camino fácil

### Control de Impulsos Técnicos
- PROHIBIDO actuar por entusiasmo, intuición fuerte o "causa probable"
- Diagnóstico NO es solución
- Sin evidencia suficiente y sin validación real, NO se está autorizado a corregir
- Orden obligatorio: EVIDENCIA → DIAGNÓSTICO → ALCANCE → RIESGO → CONFIRMACIÓN → CAMBIO
- Si el cambio puede dañar datos, romper funcionalidad o corromper el sistema → DETENERSE

### Documentación
- No documentar como "aprendizaje" algo no validado
- Todo error o tropiezo resuelto y verificado al 100% se registra automaticamente, sin consulta adicional, como regla general en la skill operativa y regla especifica en el manual operativo del proyecto; mejorar reglas equivalentes en vez de duplicarlas
- No crear archivos innecesarios (README extensos, guías no solicitadas)

---

## Protocolo de Planificación (Proyectos Nuevos)

ANTES de escribir código:
1. Crear documento con plan del proyecto
2. Dividir en fases según complejidad
3. En Fase 1: crear todas las carpetas y estructura base
4. No pedir confirmación entre fases; avanzar hasta culminar
5. Si el riesgo es alto → detenerse y consultar

---

## Checklist Pre-Tarea

1. ☐ Identificar tipo de tarea
2. ☐ Cargar Skills relevantes
3. ☐ Revisar reglas aplicables
4. ☐ Verificar dependencias
5. ☐ Recién ejecutar

---

## Cómo Activar este Agente

### VS Code / Cursor / Windsurf / Kiro
```
tu-proyecto/
├── AGENTS.md           ← Este archivo
├── skills/
│   ├── 02_SKILL_PLANIFICACION_EXTREMA.md
│   ├── 03_SKILL_ESTANDAR_INDUSTRIAL.md
│   └── 04_SKILL_AGENTE_OPERATIVO.md
└── src/
    └── ... tu código
```
Abrir la carpeta en el IDE → la IA lo carga automáticamente.

### Claude Code (terminal)
Copiar como `CLAUDE.md` en la raíz → ejecutar `claude`.

### OpenCode
Copiar como `AGENTS.md` → ejecutar `opencode .`.

### Gemini Gems
Concatenar las 3 Skills + este archivo → pegar como instrucciones del Gem.

### ChatGPT / Claude Web
Subir los 10 archivos como archivos del proyecto o pegar como primer mensaje.
