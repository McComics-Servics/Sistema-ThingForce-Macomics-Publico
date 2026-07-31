# Auditor de refresco de UI (genérico)

Detecta controles que escriben en el objeto de estado (`config`) sin disparar
ningún refresco: el patrón exacto detrás de "el botón no se actualiza solo".

## Uso

```powershell
node audit_refresh.js "<carpeta con los .js modulares>"
```

Ejemplo real (Estructura Pro):

```powershell
node audit_refresh.js "…\McComicsUp_Suite_Pro_IA\modules\estructura_pro\ui\html\App.jss Modularizado\mccomics_modular_validated\js"
```

## Cómo leerlo — IMPORTANTE

La salida es una lista de **candidatos**, no de bugs. Antes de declarar roto
algo, verificar el cableado real (regla R14 / skill `verify-wiring-before-broken`):

1. Si el bloque es un **helper**, buscar sus llamadores: casi siempre el
   llamador es quien refresca, y entonces es un falso positivo.
2. Ajustar la constante `REFRESH` a los nombres de refresco del proyecto.
   En McComics fueron necesarios `requestRealtimeModelUpdate`, `sketchup.<algo>()`
   y `update<Algo>UI()`; sin ellos el auditor daba 21 candidatos y 0 eran reales.
3. Sospechosos de verdad = listeners directos del usuario (`addEventListener`,
   `onclick=`, `onchange=`) que escriben estado y no llaman a nada más.

## Resultado de la corrida de referencia (2026-07-19, Estructura Pro + Cajonera)

34 archivos JS + el diálogo de Cajonera: **0 controles con escritura muda**
tras verificar cableado. Los 14 candidatos restantes eran helpers cuyos
llamadores sí refrescan, o UI pura por diseño.
