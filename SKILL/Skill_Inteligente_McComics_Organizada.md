# Skill Inteligente McComics® — Núcleo Técnico Organizado para Cualquier IA

## Índice

1. Propósito de la skill  
2. Qué conocimiento contiene  
3. Modo correcto de uso  
4. Motor de decisión inicial  
5. Categorías operativas  
   5.1. Núcleo de operación y evidencia  
   5.2. Selector de memoria y carga contextual  
   5.3. SketchUp + Ruby  
   5.4. Geometría, topología y booleanas  
   5.5. Desktop Python  
   5.6. Web y frontend  
   5.7. Melamina y manufactura  
   5.8. Integraciones, servidor y microservicios  
   5.9. UI, UX y branding técnico  
   5.10. Debugging y prevención de fallos  
   5.11. Entrega, empaquetado y despliegue  
6. Reglas transversales de decisión  
7. Checklist de ejecución por tipo de tarea  
8. Plantilla universal de activación para cualquier IA  
9. Formato de respuesta esperado  
10. Qué no debe hacer la IA

---

## 1. Propósito de la skill

Esta skill convierte un conjunto grande de aprendizajes técnicos, errores resueltos, arquitectura comprobada y reglas McComics® en un sistema operativo reutilizable por cualquier IA.

No está pensada como una simple memoria pasiva, sino como un **motor de decisión técnica**.  
Su función es ayudar a una IA a:

- detectar el tipo de problema,
- cargar solo el conocimiento relevante,
- evitar errores ya conocidos,
- elegir la arquitectura superior,
- responder de forma técnica, sistemática y accionable,
- reducir retrabajo, bugs silenciosos y soluciones superficiales.

---

## 2. Qué conocimiento contiene

Esta skill organiza el conocimiento en once bloques:

- protocolos generales de trabajo con evidencia y diagnóstico,
- reglas de carga contextual por tipo de proyecto,
- restricciones reales de SketchUp Ruby API,
- topología, booleanas, tolerancias y transformaciones,
- estándares para apps desktop en Python,
- reglas de frontend/web y errores modernos de framework,
- ingeniería de melamina y manufactura,
- arquitectura de integración con servidores y bases de datos,
- branding y UI McComics®,
- debugging estructural y prevención de fallos,
- normas de empaquetado y entrega final.

---

## 3. Modo correcto de uso

Toda IA que active esta skill debe tratarla como una capa ejecutiva.

### Regla base
Antes de responder o construir cualquier solución, la IA debe hacer estas 5 operaciones mentales:

1. Identificar el tipo de tarea.
2. Cargar solo las categorías aplicables.
3. Revisar los riesgos estructurales conocidos para ese tipo de tarea.
4. Elegir la opción técnicamente superior.
5. Responder con pasos, arquitectura, riesgos y ejecución.

### Prioridad
Cuando haya conflicto entre rapidez y robustez:
- gana la robustez,
- gana la trazabilidad,
- gana la arquitectura estable.

---

## 4. Motor de decisión inicial

La IA debe clasificar la solicitud del usuario en uno o más de estos grupos:

### A. SketchUp / Ruby
Palabras disparadoras:
`SketchUp`, `.rb`, `.rbz`, plugin, extensión, HtmlDialog, UI::Toolbar, Geom::Transformation, pushpull, boolean, despiece.

### B. Geometría / Topología / CAM
Palabras disparadoras:
cara, sólido, manifold, cutter, bisel, ranura, perforación, B-Rep, JSON geométrico, followme, z-fighting, tolerancia, offsets.

### C. Desktop Python
Palabras disparadoras:
Python, `.py`, app desktop, ejecutable, instalador, PyInstaller, Inno Setup, pywebview.

### D. Web / Frontend
Palabras disparadoras:
Next.js, Vite, CSS, Server Actions, Promise, anchor-name, HTML/CSS/JS.

### E. Melamina / Manufactura
Palabras disparadoras:
melamina, tableros, grosor, Pelícano, veta, despiece, canto, repisa, mueble, ranura.

### F. Integraciones / Backend / Reportes / SQL
Palabras disparadoras:
API, PostgreSQL, MySQL, reportes, PDF, servidor, JSON, microservicios, middleware.

### G. UI / Branding / UX
Palabras disparadoras:
interfaz, dark theme, popup, branding, footer, colores, estilo visual, McComics.

Si un problema cae en varias áreas, la IA debe fusionar módulos, no elegir uno solo.

---

## 5. Categorías operativas

## 5.1. Núcleo de operación y evidencia

### Regla suprema
La IA no debe actuar con hipótesis sobre código o comportamiento técnico cuando exista posibilidad de verificar.

### Orden obligatorio de trabajo
**Evidencia → Diagnóstico → Confirmación contextual → Modificación**

### Reglas clave
- Nunca corregir un síntoma aislado sin buscar el mismo patrón en el resto del código.
- Nunca asumir que un bug es único si puede estar replicado en funciones hermanas.
- Si el error no está claro, crear primero un mecanismo de depuración.
- Toda herramienta interactiva debe contemplar Undo/Redo infinito por defecto cuando el contexto lo permita.
- La IA debe preferir explicación causal sobre parche rápido.

### Objetivo real
Evitar parches superficiales, falsas soluciones y deuda técnica acumulada.

---

## 5.2. Selector de memoria y carga contextual

La IA no debe cargar “todo el conocimiento” a la vez.  
Debe operar con **carga selectiva**.

### Núcleo permanente
- `CORE`: siempre activo.

### Carga por dominio
- SketchUp / Ruby: `CORE + SKETCHUP + ERRORES_SU`
- Muebles / Melamina: `CORE + MELAMINA + SKETCHUP` si hay plugin
- Software Desktop: `CORE + SOFTWARE + ERRORES_PY`
- Web: `CORE + WEB + SOFTWARE` cuando aplique empaquetado
- Integraciones: `CORE + ARQUITECTURA + BACKEND + SEGURIDAD`
- Branding/UI: `CORE + UI_BRANDING`

### Regla operacional
La IA debe responder con precisión contextual, no con conocimiento indiscriminado.

---

## 5.3. SketchUp + Ruby

Este es uno de los núcleos más críticos de la skill.

### Reglas duras
- Todo valor físico en milímetros debe llevar `.mm`.
- Nunca confiar en el comportamiento intuitivo del motor; SketchUp opera internamente en pulgadas.
- No usar `UI.start_timer` cíclico como falso asincronismo visual para barras de progreso.
- Toda operación topológica debe ir dentro de `start_operation / commit_operation`.
- Si algo falla en topología o booleanas, ejecutar `abort_operation`.
- Al cerrar SketchUp, debe existir teardown de observadores y diálogos para evitar BugSplats.
- Un plugin modificado debe distribuirse como `.rbz`, no como archivos sueltos.

### Reglas de estabilidad
- El motor es single-threaded.
- No se deben ejecutar tareas pesadas en el hilo principal si pueden congelar la UI.
- La inyección de assets externos debe validarse con `File.exist?`.
- Las rutas de loaders deben ser explícitas; en SketchUp 2024 no conviene omitir `.rb` en el registro principal.

### Reglas de consola
- No pegar explicaciones o Markdown en la consola Ruby.
- Para bloques grandes, preferir carga desde archivo en disco antes que copiar/pegar masivo.

---

## 5.4. Geometría, topología y booleanas

### Restricciones físicas del motor
- SketchUp fusiona vértices a distancias menores a 0.001".
- `add_face` exige coplanaridad estricta.
- Dibujar líneas sobre una cara no garantiza que se divida sola.
- Un `pushpull` destruye la cara original y crea nueva geometría.
- Un sólido mal cerrado destruye o invalida las booleanas.

### Reglas geométricas
- Si se crea un vaciado en una cara, forzar cálculo de subcaras con `find_faces` cuando aplique.
- No reutilizar una referencia vieja de `Face` después de `pushpull`.
- Para geometrías delicadas o pequeñas, escalar el sistema temporalmente y volver a escala real al final.
- Las transformaciones deben componerse en orden correcto; no son conmutativas.
- Si se importa un `.skp` externo, neutralizar antes el desfase del `BoundingBox`.
- Evitar anclajes coplanares para impedir z-fighting; usar offsets mínimos.

### Reglas de modelado robusto
- Para relieves y vaciados complejos, priorizar estrategia de perfil 2D + extrusión diferencial.
- Para cortes físicos de manufactura, pensar en lógica de sustracción tipo CNC, no en “dibujar bonito”.
- Toda pieza que cambie individualmente debe aislarse en grupo o componente antes del ensamblaje global.

---

## 5.5. Desktop Python

### Arquitectura preferida
Toda app desktop moderna del ecosistema debe usar:

- Python para lógica,
- pywebview para UI,
- HTML/CSS/JS para presentación.

### Estructura mínima de proyecto serio
- `app.py`
- `BUILD_EXE.bat`
- `SETUP.iss`
- `BUILD_ALL.bat` o equivalente maestro

### Reglas de despliegue
- Automatizar compilación.
- No depender de pasos manuales opacos.
- Diseñar pensando en ejecutable e instalador desde el inicio.

### Reglas visuales
- Tema oscuro técnico.
- Fondo entre `#020617` y `#1e293b`.
- Azul McComics `#2563EB`.
- Cyan de acento `#38BDF8`.
- Púrpura solo para detalles mínimos, no para jerarquía principal.

---

## 5.6. Web y frontend

### Reglas clave
- En Next.js 15, Server Actions deben devolver JSON plano.
- No retornar instancias de clases a componentes cliente.
- En Vite, no mezclar importaciones del mismo CSS con `?inline` y sin él.
- `Promise.allSettled()` no debe usarse sin inspeccionar `reason`.
- `anchor-name` no debe apoyarse en elementos con `visibility: hidden`; usar `opacity: 0` si hace falta invisibilidad funcional.

### Filosofía operacional
- Evitar errores silenciosos.
- Preferir encapsulación de frontend para herramientas internas.
- Mantener coherencia entre capa visual y capa operativa.

---

## 5.7. Melamina y manufactura

### Estándares base
- Material de referencia: melamina Pelícano.
- Grosor por defecto: 18 mm.
- Grosores admitidos: 3, 6, 12, 15, 18, 25, 36 mm.

### Restricciones físicas
- Ninguna pieza de 12 mm o más puede penetrar otra.
- Excepciones controladas: traseras ranuradas de 3 mm y 6 mm.

### Metadatos obligatorios de una pieza
- ejes normalizados,
- bounding box limpia,
- propiedad de veta,
- identificador interno útil para despiece.

### Regla de manufactura
Las decisiones geométricas deben obedecer al comportamiento real del material y del mecanizado, no solo al viewport.

---

## 5.8. Integraciones, servidor y microservicios

### Regla superior
No conectar SketchUp directamente a SQL si existe una alternativa de arquitectura más segura y escalable.

### Arquitectura recomendada
- Cliente ligero en SketchUp
- Extracción a JSON
- Envío asíncrono por HTTP
- Procesamiento externo en servicio dedicado
- Conexión nativa del servicio a PostgreSQL/MySQL
- Render o ensamblaje de reportes fuera de SketchUp
- Retorno de URL o resultado final

### Por qué
Porque SketchUp:
- es single-threaded,
- se congela con cargas pesadas,
- no es un entorno ideal para gemas con extensiones nativas,
- no debe asumir responsabilidades de servidor.

### Principio
El plugin debe ser cliente inteligente, no backend improvisado.

---

## 5.9. UI, UX y branding técnico

### Reglas de experiencia
- La UI debe comunicar robustez técnica.
- Las ventanas nativas limitadas deben reemplazarse por flujos mejores cuando sea necesario.
- Si `UI.inputbox` no soporta dinámica real, diseñar flujo secuencial de 2 pasos o HTMLDialog.

### Reglas visuales
- Azul principal: `#2563EB`
- Cyan: `#38BDF8`
- Púrpura: solo detalle
- Footer con identidad McComics® y accesos directos definidos por el sistema

### Regla de consistencia
No sacrificar operatividad por estética.  
La UI bonita pero frágil se considera inferior a la UI clara, estable y mantenible.

---

## 5.10. Debugging y prevención de fallos

### Reglas de depuración
- No probar fragmentos aislados sin mockear dependencias.
- No interpretar un NameError como fallo del algoritmo si puede ser fallo de scope.
- No reescribir bloques enteros cuando una línea puntual resuelve el problema.
- No usar `rescue` vacío.
- Toda excepción importante debe exponerse con mensaje útil.

### Riesgos recurrentes detectados
- referencias a elementos ya destruidos (`reference to deleted DrawingElement`),
- refactorizaciones parciales que rompen `end`,
- rutas relativas frágiles en loaders,
- colisiones coplanares y z-fighting,
- crecimiento de materiales duplicados,
- congelamiento por tareas largas en hilo principal,
- errores por asumir pivotes o coordenadas incorrectas.

### Regla práctica
Primero aislar causa, luego tocar código.

---

## 5.11. Entrega, empaquetado y despliegue

### SketchUp
- Entregar `.rbz` cuando la tarea sea un plugin instalable.
- Validar sintaxis Ruby antes de empaquetar.
- Evitar dejar archivos sueltos viejos en `Plugins`.

### Python
- Entregar proyecto con scripts de build e instalador, no solo fuente.
- No dejar el despliegue a criterio manual del usuario.

### Entrega general
Toda solución debe:
- ser ejecutable,
- ser mantenible,
- ser coherente con el ecosistema,
- evitar pasos ambiguos.

---

## 6. Reglas transversales de decisión

### Regla 1 — Evidencia antes que intuición
Si se puede inspeccionar, no se debe adivinar.

### Regla 2 — Arquitectura superior antes que atajo
Si hay una opción claramente mejor, elegirla y justificarla.

### Regla 3 — La geometría obedece a física y kernel
No diseñar lógica ignorando tolerancias, normales, pivotes o manifolds.

### Regla 4 — El empaquetado forma parte del producto
Una solución sin despliegue claro no está terminada.

### Regla 5 — El conocimiento debe ser reutilizable
No solo resolver un caso; crear patrón aplicable a futuros casos.

### Regla 6 — El daño colateral importa
Modificar poco, pero con precisión.  
Refactorizar solo si evita un daño mayor y mejora la arquitectura real.

---

## 7. Checklist de ejecución por tipo de tarea

### Si la tarea es SketchUp / Ruby
- identificar si hay UI, topología, loader o render,
- revisar `.mm`, normales, manifolds, `BoundingBox`, operaciones,
- asegurar rollback,
- revisar si hay asincronismo falso,
- decidir si la solución debe entregarse como `.rbz`.

### Si la tarea es geometría compleja
- validar tolerancias,
- revisar coplanaridad,
- evitar referencias muertas post-pushpull,
- decidir si conviene escala temporal,
- asegurar aislamiento por grupos/componentes.

### Si la tarea es Python desktop
- confirmar pywebview,
- definir estructura de build,
- separar lógica y UI,
- preparar instalador.

### Si la tarea es web
- revisar tipo de retorno,
- inspeccionar CSS duplicado,
- revisar promesas con fallos silenciosos,
- validar restricciones de visibilidad y anclas.

### Si la tarea es melamina
- verificar grosor,
- revisar penetraciones,
- asegurar metadatos,
- alinear la lógica con manufactura real.

### Si la tarea es integración
- no incrustar carga pesada en SketchUp,
- delegar al servidor,
- comunicar por JSON/HTTP,
- proteger la experiencia del usuario.

---

## 8. Plantilla universal de activación para cualquier IA

Usar esta plantilla antes de actuar:

> Activa la Skill Inteligente McComics®.
> 1. Clasifica la tarea por dominio.
> 2. Carga únicamente las categorías necesarias.
> 3. Identifica límites físicos, riesgos de arquitectura y errores ya conocidos.
> 4. Propón la solución superior, no la más rápida.
> 5. Responde con:
>    - diagnóstico,
>    - arquitectura recomendada,
>    - riesgos críticos,
>    - pasos de ejecución,
>    - formato de entrega.
> 6. Evita suposiciones no verificadas.
> 7. Si el problema es de código, busca primero patrones hermanos antes de corregir solo un punto.
> 8. Si existe riesgo de congelamiento, corrupción topológica o daño colateral, dilo explícitamente y adapta la estrategia.

---

## 9. Formato de respuesta esperado

La IA que use esta skill debe responder así:

### A. Diagnóstico
Qué está pasando realmente.

### B. Causa raíz
Por qué ocurre.

### C. Riesgos
Qué puede fallar si se actúa mal.

### D. Opción superior
Cuál es la solución técnicamente correcta y por qué.

### E. Ejecución
Pasos o implementación.

### F. Entrega
Qué archivo, estructura o formato final conviene.

---

## 10. Qué no debe hacer la IA

- No inventar causas sin evidencia.
- No corregir un bug aislado sin revisar patrones equivalentes.
- No tratar SketchUp como si fuera un entorno multihilo robusto.
- No ignorar `.mm`.
- No confiar en booleanas sobre sólidos defectuosos.
- No devolver objetos complejos donde el framework exige JSON plano.
- No mezclar build serio con entrega improvisada.
- No elegir soluciones inferiores si ya existe una mejor.
- No dejar la arquitectura de integración pegada al hilo principal de SketchUp.
- No actuar como si este conocimiento fuera una lista estática; debe usarlo como sistema de decisión.

---

## Cierre operativo

Esta skill no es un resumen decorativo.  
Es un **marco de ejecución técnica**.

Su uso correcto convierte un documento disperso de aprendizajes en una metodología práctica que cualquier IA puede aplicar para trabajar con criterio McComics®, detectar riesgos antes del fallo y producir soluciones más estables, más profesionales y más reutilizables.

---
© 2026 McComics®