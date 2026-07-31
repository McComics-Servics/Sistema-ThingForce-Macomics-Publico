# AGENTS.md — Sistema ThingForce™ McComics

> Entrada ÚNICA del sistema. Reorganizado 2026-07-22. Si algo contradice este
> archivo, manda este archivo.

## Pensamiento comprimido (protocolo caveman)

Razonar internamente en inglés telegráfico (sin artículos ni verbos auxiliares,
símbolos `-> = && ||`, rutas y variables intactas) para ahorrar tokens.
**La salida visible al usuario SIEMPRE en español profesional impecable.**

## Las 4 fuentes (todo lo demás se consulta bajo demanda)

1. **Reglamento** → `REGLAS OPERATIVAS Y DE ARQUITECTURA/REGLAS_MAESTRAS.md`
2. **Memoria** → `ThinkForce/MEMORIA_MAESTRA.md`
3. **Ruta mínima por tarea** → `SELECTOR_DE_MEMORIA.md`
4. **Planes vivos** → `Planes Nuevos/INDICE_PLANES.md`

Antes de trabajar: cargar las 3 skills obligatorias
(`ThinkForce/02_SKILL_PLANIFICACION_EXTREMA.md`, `03_SKILL_ESTANDAR_INDUSTRIAL.md`,
`04_SKILL_AGENTE_OPERATIVO.md`) y el protocolo de ahorro de tokens
(`Sistema_Ahorro_Tokens/00_PROTOCOLO/PROTOCOLO_USO_CLAUDE_SKILLS_MCCOMICS.md`).

## Prohibiciones absolutas (detalle y más reglas: REGLAS_MAESTRAS)

- **PROHIBIDO hardcodear** medidas, parámetros, configuraciones o secretos
  (R-010, REGLA SAGRADA).
- **PROHIBIDO crear** archivos de memoria, de reglas o planes fuera de las 4
  fuentes (R-050/R-051/R-052); **prohibidas** carpetas con nombre de IA (R-053).
- **PROHIBIDO tocar** el módulo Despiece sin orden explícita (R-021), los
  plugins hermanos `ESCALADOR_ULTRA` y `DESPLAZADOR*.desactivado` (R-026),
  y `.git` / `reset --hard` / `clean -fdx` (R-040).
- **PROHIBIDO declarar terminado** sin compuerta PASS/FAIL en vivo (R-006) ni
  editar el plugin fuera de su copia viva (R-020).
- **PROHIBIDO** copy con tono de nota al usuario en el producto (R-011).

## Cierre de sesión

`scripts/validar_orden.ps1` en verde + aprendizajes a MEMORIA_MAESTRA (R-008) +
preguntar al dueño si algo merece volverse skill.

<!-- sistema: ThingForce™ McComics | AGENTS.md | actualizado: 2026-07-22 -->
