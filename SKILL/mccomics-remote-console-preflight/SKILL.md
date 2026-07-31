---
name: mccomics-remote-console-preflight
description: Usa esta skill antes de cualquier corrida con Remote Console, probes Ruby o scripts PowerShell asociados. Activala para blindar rutas con espacios o Unicode, evitar mojibake, preferir flujos incrementales y registrar fallos operativos remotos ya verificados.
---

# Skill McComics Remote Console Preflight

## Activar cuando

- antes de ejecutar cualquier corrida con `DEBUG_REMOTE_CONSOLE_EXECUTE.ps1`
- antes de lanzar probes Ruby, wrappers `.ps1` o validaciones remotas desde el IDE
- la ruta del repo, del usuario o del archivo tenga espacios, tildes, `ñ`, parentesis o simbolos como `™`
- aparezcan sintomas como `Invalid argument`, `LoadError`, `mojibake`, quoting roto o rutas truncadas
- la validacion vaya a hacerse de forma incremental y haya que aislar si el fallo es del producto o del runner

## Leer despues

1. `./McComics-Agent-System/PROTOCOLO_REMOTE_CONSOLE.md`
2. `./McComics-Agent-System/skills/mccomics-remote-console-suite/SKILL.md`
3. `./McComics-Agent-System/skills/mccomics-servidores/SKILL.md` si hay bridge, worker o scripts auxiliares

## Objetivo

- que la primera corrida remota falle por el producto y no por el runner
- fijar UTF-8 correcto en probes, scripts y salidas
- evitar que rutas Unicode o con espacios contaminen el diagnostico
- trabajar en incrementos pequenos: una hipotesis, una corrida, una evidencia
- convertir cada patron validado nuevo en una mejora del protocolo, no en conocimiento oral

## Reglas

- preferir probes `.rb` guardados en archivo antes que bloques Ruby inline dentro del comando PowerShell
- si ya existe un runner del repo, reutilizarlo; para Remote Console usar `DEBUG_REMOTE_CONSOLE_EXECUTE.ps1` antes que invocar `ruby.exe` directo
- para validaciones Ruby fuera de SketchUp, preferir el wrapper del repo o una ruta controlada antes que una invocacion directa con path Unicode largo
- al editar o crear `.ps1`, leer y escribir siempre con UTF-8 explicito; no confiar en la codificacion por defecto de PowerShell
- resolver rutas con `Join-Path`, variables o paths relativos desde la raiz del repo; no reescribir rutas largas a mano si puede evitarse
- verificar primero que el archivo objetivo existe y que el runner correcto es el que se piensa ejecutar
- cambiar una sola variable por corrida: probe, archivo recargado, timeout o wrapper; no mezclar multiples experimentos
- si el error menciona argumento, path o encoding, primero descartar runner y quoting antes de culpar a Ruby o al modulo de negocio
- cuando aparezca un patron nuevo validado, actualizar esta skill o el protocolo remoto en el mismo frente de trabajo

## Preflight minimo

1. decidir si la prueba va inline o en archivo; por defecto, archivo
2. confirmar el runner exacto y evitar atajos manuales fuera del repo
3. resolver ruta segura y quoting seguro antes de ejecutar
4. confirmar UTF-8 del probe o script tocado
5. correr una prueba minima y revisar salida estructurada
6. solo despues ampliar el alcance de la validacion

## Patrones ya confirmados

- una invocacion directa de `ruby.exe` puede fallar con `Invalid argument` cuando la ruta contiene `™`, aunque el archivo este bien
- un falso negativo de Remote Console puede venir del wrapper o del path antes que del modulo que se esta auditando
- mezclar cambio de probe, cambio de runner y cambio de quoting en la misma corrida vuelve ambiguo el diagnostico
- scripts Ruby inline en Windows pueden crear carpetas mojibake al escribir backups hacia rutas con `™`; verificar `git status` y preferir `Copy-Item -LiteralPath` para esos destinos

## Checklist corto

- [ ] probe o script guardado en UTF-8
- [ ] runner del repo confirmado
- [ ] ruta y quoting confirmados
- [ ] cambio incremental unico
- [ ] salida revisada antes del siguiente paso
- [ ] patron nuevo documentado si aparecio
