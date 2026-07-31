# ANEXO 13 — UX↔BACKEND END-TO-END PROOF
## Regla estricta no negociable para toda IA operando en el IDE McComics CODE

### Versión 1.0 — Base del Cognitive Contract Protocol (TCC-P)

---

## 1. REGLA SUPREMA

Ninguna IA que opere dentro de McComics CODE puede declarar una tarea
terminada, una feature implementada, una promesa cumplida o un bug
resuelto hasta que haya ejecutado, en este orden, las cuatro
verificaciones obligatorias siguientes:

1. **Prueba de ruta UI** — abrir el IDE (o simularlo), navegar hasta el
   punto desde donde un usuario real invocaría la feature, y confirmar
   que el camino existe, es visible y no requiere conocimiento de rutas
   internas, flags ocultos o variables de entorno.

2. **Prueba de disparo** — disparar la acción desde la UI (click, entry,
   atajo) y observar que alcanza el backend correcto. Evidencia mínima:
   breakpoint, log, traza o UCM hit del contrato declarado.

3. **Prueba de retorno** — confirmar que el resultado del backend vuelve
   a la UI y se renderiza de forma observable por el usuario (no
   únicamente en logs, no solo en memoria, no solo en disco).

4. **Prueba de usuario ciego** — redactar en una línea qué vería y qué
   sentiría un usuario nuevo al usar la feature, y validar que la línea
   es verdad sin asterísticos ni precondiciones ocultas.

Si alguna de las cuatro pruebas falla, la tarea no está hecha. La IA
debe reportar honestidad quirúrgica: "existe en backend, no accesible
desde UI", "accesible desde UI pero el retorno no se renderiza",
"funciona pero el usuario ciego no lo encontraría", etc.

---

## 2. PROHIBICIONES

- Prohibido declarar hecho si solo hay tests pasando. Los tests no ven
  la UI.
- Prohibido declarar hecho si solo hay el backend listo. El IDE es para
  el usuario, no para la IA.
- Prohibido usar "debería funcionar", "está listo en el código",
  "funciona bajo el capó". Las cuatro pruebas o nada.
- Prohibido ocultar un fallo de ruta UI bajo promesa de "fase siguiente".
  Se reporta y se marca en el documento de gaps.
- Prohibido cerrar una fase si quedan contratos UCM declarados sin
  backend ejecutable o backends expuestos sin contrato UCM.
- **Prohibido bloquear en silencio.** Si un contrato falla, si una regla
  se dispara, si una validación no pasa, la IA **NO** corta el flujo
  sin decir nada: debe explicar qué regla se activó, qué falta, qué
  hallazgo encontró, y guiar al usuario con preguntas concretas para
  cerrar el punto. "Silencio = traición al usuario"; toda regla se
  narra y se acompaña.

---

## 3. OBLIGACIONES DE SALIDA

Al declarar una feature terminada, la IA debe entregar:

- archivo(s) backend tocado(s) con path:línea
- archivo(s) UI tocado(s) con path:línea
- contrato UCM (JSON) actualizado en `thinkforce/registry/ui_contracts.json`
- 1 descripción textual breve del camino de usuario ciego
- checklist 4/4 con evidencia específica en cada punto

---

## 4. MOTIVO DE LA REGLA

El IDE ha sufrido históricamente de "backend rico, UI pobre": módulos
sofisticados que el usuario nunca descubre. Esta regla cierra ese hueco
y es la base del Cognitive Contract Protocol (TCC-P) que vuelve a
McComics CODE verificable de extremo a extremo.

---

## 5. APLICACIÓN TÉCNICA

### 5.1 Contratos UCM (UI Contract Manifest)

Cada widget cognitivo declara su contrato con el decorador
`@cognitive_contract` de `brain/ucm/decorator.py`. Los contratos se
recogen al importar los módulos y se persisten en
`thinkforce/registry/ui_contracts.json`.

Ejemplo mínimo:

```python
from brain.ucm import cognitive_contract

@cognitive_contract(
    ui_element="tab_chat.send_button",
    backend_target="brain.multi_brain_router.MultiBrainRouter.route_and_generate",
    input_shape={"prompt": "str"},
    output_shape={"text": "str", "provider": "str"},
    must_render=["text"],
    must_measure=["provider"],
)
def on_send_prompt(self, event=None):
    ...
```

### 5.2 Verificador automático

`scripts/verify_ucm.py` comprueba al menos:

- todo widget cognitivo registrado tiene backend importable
- todo contrato UCM declara `ui_element`, `backend_target`, `must_render`
- el registry no contiene contratos huérfanos (referencias a módulos
  inexistentes)
- el arranque no deja contratos con `backend_target` que levanten
  `ImportError`

El verificador **nunca falla en silencio**: todo error y todo warning
se acompaña de (a) el contrato concreto afectado, (b) la causa legible
("el módulo X no se puede importar", "el atributo Y no existe en
Z"), y (c) una sugerencia accionable ("crea el handler", "corrige la
ruta del contrato", "añade `must_render` al decorador"). Si el usuario
quiere endurecer CI, `--strict` corta el build sí o sí, pero emitiendo
primero ese reporte completo.

### 5.3 Integración en arranque

`main.py` invoca `brain.ucm.validator.verify_ucm_registry()` antes de
`app.mainloop()`. Por defecto corre en modo permisivo: lista qué
contratos están rotos, explica cada uno y sigue arrancando para no
dejar al usuario atrapado. El modo estricto solo se activa
explícitamente (env var o perfil "Banking" / "Modo Plan Estricto") y
entonces sí aborta, pero siempre con reporte narrado antes del exit.
Ninguna regla del IDE se aplica de forma silenciosa; toda acción que
bloquee flujo debe explicarse y, cuando aplique, guiar al usuario con
preguntas para cerrar lo que falte.

---

## 6. REFERENCIAS OBLIGATORIAS

Esta regla debe referenciarse como obligatoria en:

1. [AGENTS.md](../AGENTS.md) — sección Rules.
2. [thinkforce/04_SKILL_AGENTE_OPERATIVO.md](04_SKILL_AGENTE_OPERATIVO.md) — sección 3.6.
3. [thinkforce/01_SELECTOR_DE_MEMORIA.md](01_SELECTOR_DE_MEMORIA.md) — Capa 1 base obligatoria.
4. `./CLAUDE.md` en la raíz del proyecto.

---

## 7. CHECKLIST 4/4 (plantilla para cada feature tocada)

```
FEATURE: [nombre]
RESPONSABLE: [agente o sesión]
FECHA: [YYYY-MM-DD]

[ ] 1. Ruta UI: [desde dónde llega el usuario, en ≤3 clicks]
[ ] 2. Disparo:  [archivo:línea del handler UI → archivo:línea backend]
[ ] 3. Retorno:  [cómo se renderiza la respuesta en la UI]
[ ] 4. Ciego:    [una frase sin jerga técnica]

CONTRATO UCM: [path en ui_contracts.json]
NOTAS:        [excepciones, riesgos o gaps reportados con honestidad]
```

Si 4/4 ✅ → feature declarable. Si ≤3/4 → feature pendiente + gap
documentado.
