---
name: mccomics-servidores
description: Usa esta skill cuando la tarea toque servidores locales, backends auxiliares, dashboards, bridges, workers, control de procesos, endpoints, logs o automatizacion interna de McComics. Activa esta skill para mantener modularidad, estado real, procesos verificables y degradacion segura entre plugin, dashboard y herramientas opcionales.
---

# Skill McComics Servidores

## Activar cuando

- la tarea toca servidor local del dashboard
- la tarea toca bridge JSONL o worker del plugin
- la tarea toca start, stop, restart o status de procesos
- la tarea toca endpoints HTTP, polling, logs o caches
- la tarea toca integraciones opcionales como motores externos

## Leer primero

1. `./McComics-Agent-System/14-RESUMEN_OPERACION_Y_TESTING.md`
2. `./McComics-Agent-System/16-RESUMEN_HTML_Y_SERVIDORES.md`
3. `./McComics-Agent-System/13-RESUMEN_ERRORES_Y_VALIDACION.md`

## Leer ademas si hay UI

1. `./McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md`

## Objetivo

- backend local predecible
- procesos verificables
- rutas con espacios seguras
- endpoints ligeros separados de endpoints pesados
- dashboard interno desacoplado del plugin publico
- modulos opcionales que fallan sin arrastrar al resto

## Reglas

- no declarar `running` sin verificar puerto o proceso real
- no mezclar auth o API keys de sistemas distintos
- no acoplar dashboard y plugin como dependencia dura
- no crear un endpoint monstruo para todo
- no ocultar errores de worker o bridge
- no asumir que todos los modulos opcionales existen

## Flujo

1. identificar capa:
   - servidor HTTP
   - worker
   - bridge
   - control script
   - proceso externo opcional
2. validar modularidad e independencia
3. asegurar start/stop/status reales
4. separar estado ligero de paneles pesados
5. dejar logs controlados y trazables
6. probar degradacion si falta un modulo

## Checklist corto

- [ ] el proceso realmente vive
- [ ] el puerto realmente responde
- [ ] la UI no se congela
- [ ] el plugin no depende del dashboard
- [ ] el dashboard no rompe si falta una pieza
- [ ] rutas y logs estan controlados
