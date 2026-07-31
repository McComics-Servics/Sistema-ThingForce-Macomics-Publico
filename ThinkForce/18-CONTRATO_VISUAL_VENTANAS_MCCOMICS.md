# CONTRATO VISUAL — Ventanas McComics

## Propósito

Evitar que una IA deteriore el diseño visual de las ventanas HtmlDialog/WebDialog de McComics cuando recibe instrucciones ambiguas del tipo "sube esto", "quita aquello" o "hazla más alta".

## Regla central

Sin confirmación explícita del usuario, una IA puede:

- mover elementos ya existentes dentro del mismo header o panel;
- reducir padding, aire muerto y texto redundante;
- compactar bloques de resumen, métricas o sesión antes de agrandar la ventana cuando el corte venga de spacing o breakpoints prematuros;
- ajustar ancho o alto solo por el delta medido de overflow real;
- corregir flicker, saltos de layout o scroll errático sin rediseñar la identidad visual.

Sin confirmación explícita del usuario, una IA NO puede:

- cambiar paleta, tipografía o estilo base de la suite;
- reemplazar la estructura general del header;
- borrar navegación, iconos o CTAs no mencionados;
- convertir una herramienta McComics en una landing page;
- aumentar tamaño de ventana por intuición o por "se siente pequeño".

## Invariantes visuales mínimos

- Header azul compacto tipo herramienta.
- Logo McComics a la izquierda cuando el patrón de la suite lo use.
- Brand copy y navegación claramente separadas.
- Grid de iconos de suite con geometría estable.
- Bloques de resumen o sesión compactos; no colapsarlos a una sola columna si el ancho real todavía soporta dos columnas o un QR lateral sin corte.
- CTA principal cerca del flujo que controla.
- Scroll interno en el panel correcto; no en toda la página salvo que el diseño lo pida.

## Método exacto de medición

### 1. Congelar el escenario representativo

Antes de medir, la IA debe fijar:

- ancho y alto actuales del HtmlDialog;
- cantidad real de items que deben quedar visibles;
- estado activo del tab o panel relevante;
- payload representativo del caso real.

### 2. Medir el overflow real, no "a ojo"

Usar este principio:

- extraWidth = max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth)
- extraHeight = max(0, document.documentElement.scrollHeight - document.documentElement.clientHeight)
- panelExtraHeight = max(0, panel.scrollHeight - panel.clientHeight)
- listExtraHeight = max(0, list.scrollHeight - list.clientHeight)

### 3. Calcular el tamaño sugerido por delta

- suggestedWidth = currentWidth + extraWidth
- suggestedHeight = currentHeight + extraHeight + panelExtraHeight + listExtraHeight

Regla:

- antes de sumar altura por un panel QR, revisar si un breakpoint responsivo está forzando una columna única cuando el ancho real aún soporta dos columnas o QR lateral;
- si el corte viene de un bloque de resumen o sesión, compactar primero padding, tipografía y breakpoint del bloque antes de crecer toda la ventana;
- si solo debe crecer un panel interno, sumar solo el overflow interno necesario;
- si el diseño exige que no haya scroll en una lista concreta, el overflow de esa lista también se suma;
- si el overflow es cero, el tamaño no se toca.

### 4. Repetir hasta llegar a cero

Después de cada ajuste:

- volver a medir;
- confirmar que el overflow horizontal y vertical objetivo sea 0;
- si persiste, sumar solo el nuevo delta restante, no un aumento arbitrario.

## Snippet canónico de medición

```js
function mcMeasureDialogFit({
  panelSelector = null,
  listSelector = null,
} = {}) {
  const root = document.documentElement;
  const panel = panelSelector ? document.querySelector(panelSelector) : null;
  const list = listSelector ? document.querySelector(listSelector) : null;
  const pageOverflowX = Math.max(0, root.scrollWidth - root.clientWidth);
  const pageOverflowY = Math.max(0, root.scrollHeight - root.clientHeight);
  const panelOverflowY = panel
    ? Math.max(0, panel.scrollHeight - panel.clientHeight)
    : 0;
  const listOverflowY = list
    ? Math.max(0, list.scrollHeight - list.clientHeight)
    : 0;

  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    pageOverflowX,
    pageOverflowY,
    panelOverflowY,
    listOverflowY,
    suggestedWidth: window.innerWidth + pageOverflowX,
    suggestedHeight:
      window.innerHeight + pageOverflowY + panelOverflowY + listOverflowY,
  };
}
```

## Validación obligatoria

Para toda ventana tocada:

1. medir localmente con payload representativo;
2. revalidar el mismo slice en SketchUp con probe o smoke reutilizable cuando exista;
3. no cerrar la tarea si el runtime real no fue re-ejecutado en los cambios que dependan de HtmlDialog o layout dentro de SketchUp.

## Reglas de ambigüedad

Cuando el usuario no pide un rediseño completo, frases como:

- "súbelo un poco"
- "hazla más alta"
- "quita esto"
- "mueve aquello"

NO autorizan cambiar el lenguaje visual del módulo. Solo autorizan:

- ajustar el slice nombrado;
- medir el delta real;
- compactar primero el bloque que roba espacio si el problema es un resumen, sesión o QR colapsado por CSS responsivo;
- conservar el contrato visual de la suite.
