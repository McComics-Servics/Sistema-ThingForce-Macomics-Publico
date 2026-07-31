---
name: mccomics-dialogos-tabs-compactos
description: Usa esta skill cuando la tarea pida una ventana HTML pequena o mediana con mucho contenido, scroll interno y organizacion por pestanas. Activa esta skill para replicar el patron validado en Exportar despiece: header azul compacto, titulo alto, tabs dinamicas, CTA visible arriba y abajo y cero aire muerto sobre la accion principal.
---

# Skill McComics Dialogos Tabs Compactos

## Activar cuando

- la tarea pide una ventana pequena o mediana con bastante contenido
- el contenido necesita scroll pero la ventana no debe crecer demasiado
- la UI necesita pestanas para separar bloques sin perder orden
- el usuario pide una ventana compacta, ordenada, premium o "como Exportar despiece"
- hay que evitar aire muerto arriba o botones importantes demasiado abajo

## Leer primero

1. `./McComics-Agent-System/11-RESUMEN_PLATAFORMAS_Y_UI.md`
2. `./McComics-Agent-System/16-RESUMEN_HTML_Y_SERVIDORES.md`
3. `./McComics-Agent-System/skills/mccomics-ventanas-html/SKILL.md`
4. `./McComics-Agent-System/skills/INDICE_SKILLS.md`

## Resultado esperado

- header premium azul, corto y utilitario
- titulo principal visible y fuerte sin convertir la ventana en landing
- accion principal visible en el primer pantallazo
- tabs dinamicas para cortar el contenido en bloques claros
- scroll interno dentro del panel de tabs, no en toda la ventana si se puede evitar
- layout compacto con jerarquia clara y sin espacios vacios arriba
- boton espejo inferior solo cuando el panel tiene scroll largo o varias opciones

## Patron base

1. header superior con franja azul, nombre de herramienta y apoyo corto
2. fila de acciones pegada al header util, con el CTA principal arriba
3. barra de tabs compacta para dividir "fuentes" vs "opciones" o "contenido" vs "ajustes"
4. panel activo con scroll interno, cards compactas y padding corto
5. accion secundaria o espejo al final del panel si ayuda al flujo

## Reglas de maquetacion

- mantener el CTA principal a la altura de la primera accion importante del flujo
- preferir padding vertical corto antes que una cabecera muy alta
- si hay rutas largas o metadata tecnica que no cambian la decision, ocultarlas o moverlas a detalle secundario
- si hay listas largas, usar cards compactas y scroll interno
- si la ventana es pequena, dividir por tabs antes de apilar demasiados bloques
- el tab activo debe ser evidente con contraste y bordes claros
- si una accion es frecuente, repetirla abajo solo cuando el scroll lo justifique
- si el contenido carga o se actualiza, mantener el header y las acciones fijas visualmente

## Antipatrones

- dejar una banda vacia grande encima del boton principal
- empujar el boton exportar, aplicar u optimizar por debajo del primer scroll
- meter rutas completas de plantillas o paths tecnicos como texto dominante
- usar tabs decorativas sin cambio real de contenido
- forzar scroll en toda la pagina cuando solo una seccion es larga

## Triggers utiles

- "ventana pequena pero con bastante contenido"
- "que tenga scroll pero se vea ordenada"
- "con pestanas"
- "compacta"
- "sin espacio innecesario arriba"
- "como Exportar despiece"

## Validacion minima

- [ ] la accion principal se ve sin bajar
- [ ] las tabs separan contenido real
- [ ] el scroll vive en el panel correcto
- [ ] no hay aire muerto encima del CTA
- [ ] la ventana se sigue sintiendo McComics
