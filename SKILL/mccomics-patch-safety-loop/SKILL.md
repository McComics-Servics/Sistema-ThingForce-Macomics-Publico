---
name: mccomics-patch-safety-loop
description: Usa esta skill cuando vayas a modificar codigo vivo de McComicsUp Suite Pro IA sin 100% de certeza, especialmente en SketchUp Ruby, HtmlDialog, bridges o runtime. Activa esta skill para forzar backup comparativo, evidencia previa, validacion remota del mismo slice, comparacion posterior y refresco del grafo si el repo cambio.
---

# Skill McComics Patch Safety Loop

## Activar cuando

- vas a tocar codigo vivo del plugin y el riesgo de regresion no es trivial
- el cambio afecta SketchUp Ruby, HtmlDialog, bridge, runtime visual o geometria
- el repo acaba de cambiar y el grafo incremental puede estar obsoleto
- necesitas comparar antes y despues para detectar dano colateral
- vas a ejecutar Remote Console para confirmar comportamiento real

## Leer primero

1. `./AGENTS.md`
2. `./SELECTOR_DE_MEMORIA.md`
3. `./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mc_graph_out/GRAPH_REPORT.md`
4. `./McComics-Agent-System/skills/mccomics-remote-console-preflight/SKILL.md`
5. `./McComics-Agent-System/PROTOCOLO_REMOTE_CONSOLE.md`
6. `./McComics-Agent-System/skills/INDICE_SKILLS.md`

## Leer ademas si aplica

1. `./McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md` si hay HtmlDialog, CSS o JS
2. `./McComics-Agent-System/17-ARQUITECTURA_ESTRUCTURA_PRO.md` si el cambio toca Estructura Pro
3. `./McComics-Agent-System/ERRORES_SKETCHUP_MCCOMICS/00-INDICE_ERRORES_SKETCHUP_MCCOMICS.md` si hay codigo SketchUp o melamina

## Objetivo

- evitar parches ciegos en codigo vivo
- garantizar backup comparativo antes del primer cambio
- obtener evidencia real antes y despues sobre el mismo camino funcional
- reducir ambiguedad: una hipotesis, un slice, una validacion
- dejar el grafo sincronizado si la estructura del repo cambio

## Reglas

- antes de editar archivos existentes, crear backup comparativo de cada archivo vivo a modificar
- si no hay 100% de certeza sobre el owner o el comportamiento, obtener evidencia previa con Remote Console o el chequeo ejecutable mas cercano antes del primer parche
- no abrir varios frentes a la vez: elegir un owner, un cambio pequeno y una validacion discriminante
- si un parche contextual es rechazado, verificar primero con diff/grep que no dejo cambios parciales; releer la region minima exacta del archivo vivo y dividir el cambio en parches atomicos
- aplicar cada parche atomico por separado y validarlo antes del siguiente; no ampliar contexto a ciegas ni reemplazar el archivo completo para forzar coincidencia
- despues del cambio, reejecutar exactamente la misma validacion usada para reproducir o confirmar el caso
- comparar el archivo editado contra su backup cuando el cambio tenga riesgo de dano colateral o alcance visual amplio
- si el repo gano, perdio o movio piezas relevantes, borrar `mc_graph_out` y regenerar el grafo desde el directorio del generador
- no declarar la tarea cerrada si el flujo real no fue validado en runtime cuando el cambio depende de SketchUp o HtmlDialog

## Flujo

1. cargar protocolo y mapa del repo
2. identificar owner real y validacion previa mas barata
3. crear backup comparativo de los archivos vivos
4. capturar evidencia previa
5. releer el contexto vivo minimo y aplicar un parche pequeno y acotado
6. si el contexto no coincide, confirmar cero cambios parciales y subdividir el parche
7. rerun de la misma validacion
8. comparar con backup si hubo riesgo de colateral
9. regenerar grafo si la estructura del repo cambio

## Checklist corto

- [ ] ya lei AGENTS, selector y grafo
- [ ] ya tengo backup comparativo de cada archivo vivo
- [ ] ya capture evidencia previa del mismo slice
- [ ] el parche fue pequeno y localizado
- [ ] si hubo rechazo de contexto, confirme cero cambios parciales y subdividi el cambio
- [ ] repeti la misma validacion despues del cambio
- [ ] compare con backup cuando el riesgo lo exigia
- [ ] regenere el grafo si el repo cambio
