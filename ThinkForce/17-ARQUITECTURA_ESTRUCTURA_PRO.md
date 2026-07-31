# ARQUITECTURA DE ESTRUCTURA PRO (v3.0)

Estructura Pro ha sido refactorizado (Fases 1 a 9) para eliminar el acoplamiento duro y los parámetros fijos (hardcoding). Todo agente debe seguir esta arquitectura antes de proponer cambios de lógica geométrica.

## 1. Módulos y Roles

1. **`ModeConfig` (core/mode_config.rb)**: 
   - Es la **ÚNICA** fuente de verdad de valores por defecto (alto, ancho, prof, modos) basados en roles lógicos (`base`, `above_1`, `above_n`).
   - Define las reglas paramétricas transversal (ej. Rule D2, D3, 90° corner rules).
   - **PROHIBIDO:** Hardcodear anchos o altos en `app.js`, `main_dialog.rb` o `chat_actions.rb`. Si se necesita un valor, se pide a `ModeConfig`.

2. **Engines de Geometría (`core/engines/`)**:
   - `PositionEngine`: Maneja las coordenadas de inserción cross-modulo para muebles concatenados (pegados a la izquierda/derecha o arriba/abajo) detectando bounding boxes y huecos usando `ModuleGraph`.
   - `BaseboardEngine`: Aisla y gestiona la creación de zócalos compartidos e individuales.
   - `DoorEngine / DoorEngineRules`: Contiene TODA la matemática para desplazar u ocultar puertas, generar gaps, interacciones D52, y calcular la posición de puertas internas o externas. NUNCA mezclar matemática de puertas en `EstructuraLogic`.
   - `FormationEngine`: Responsable de agrupar jerárquicamente `ModuleGraph::Node` y aplicar comandos masivos (herencia en selección múltiple).

3. **Techos por módulo**:
   - `Estructura Pro` y `Cajonera` deben conservar su propia lógica de techo, amarres y tablero superior.
   - No usar un builder compartido para esta geometría: cada módulo tiene entradas, alturas y reglas distintas.

## 2. Inserciones Consecutivas (Apilamiento Vertical y Pegado Horizontal)

Cuando se presiona "Insertar Arriba" en la UI, el sistema identifica cuántos muebles hay por debajo del futuro mueble basándose en la selección actual.
Esa profundidad en el eje Z (1, 2, 3...) detona el rol de la inserción:
- `above_1`: Primer apilamiento.
- `above_2`: Segundo apilamiento (ej. Cocina sistema cajones o puerta horizontal superior).
- `above_n`: Siguientes apilamientos (resetea normalmente a la configuración base manual).

Los parámetros son inyectados directamente por `ModeConfig.defaults_for(modo, rol)`. Estos valores anulan lo que la UI envíe (las piezas heredan inteligentemente de abajo o del Modo).

### Nomenclatura operativa de filas

Cuando el usuario hable informalmente de filas en Estructura Pro, cualquier IA debe interpretar:

- **Fila 0**: muebles creados con el botón "Insertar Abajo".
- **Fila 1**: muebles inferiores/base creados con el botón "Crear".
- **Fila 2**: muebles creados con el botón "Insertar Arriba 1".
- **Fila 3**: muebles creados con el botón "Insertar Arriba 2".
- Un mueble girado 90° pertenece a la misma fila lógica del mueble desde el cual fue creado.

Regla de reflow lateral por fila: al redimensionar un mueble, solo se desplazan los muebles pegados de su misma fila lógica. No se debe arrastrar otra fila vertical aunque comparta stack, contacto visual, `chain_prev_uid` parcial o una formación C/L/O.

El conjunto de desplazamiento de esa fila se calcula desde el ancla y la dirección real de crecimiento, no por "todos los muebles de ambos lados". En el redimensionamiento individual estándar, el mueble conserva anclado su lado izquierdo y crece hacia la derecha:

- Solo se desplaza la cadena pegada en la dirección donde crece el mueble editado.
- Los muebles pegados del lado del ancla no se desplazan, aunque estén girados 90 grados y pertenezcan a la misma fila.
- Si el crecimiento es hacia la derecha, se desplaza la cadena derecha de esa fila, incluidos los 90 grados que estén en esa cadena derecha.
- Si una operación futura define crecimiento hacia la izquierda, se desplaza solo la cadena izquierda de esa fila, incluidos los 90 grados de esa cadena izquierda.
- Un mueble girado 90 grados no se excluye por tener otro eje local; se incluye solo si está en la misma fila lógica y en el lado de crecimiento.
- Los zócalos de los muebles desplazados deben desplazarse con sus muebles; los zócalos del lado anclado permanecen quietos.
- La invariante esperada es que los contactos que estaban pegados en el lado de crecimiento sigan pegados después del redimensionamiento; las otras filas y el lado anclado no deben moverse.

Metadatos canónicos desde 2026-06-14:

- `logical_row_level`: entero `0`, `1`, `2` o `3`.
- `fila_logica`: alias entero equivalente para lectura humana.
- `logical_row_source`: origen semántico (`insert_below`, `create_base`, `insert_above_1`, `insert_above_2`, `right_90`, `left_90`, etc.).

Compatibilidad legacy: si esos metadatos faltan, inferir en este orden: `above_ordinal`, banda vertical medida desde el modelo, herencia por `chain_prev_uid`, y finalmente fila 1 como fallback.

## 3. Comandos Puros y API
Para futuras fases, los callbacks de `app.js` recibidos en `main_dialog.rb` (como `create_structure_vertical`, `create_between_structures`) deben instanciar objetos Commmand/Action sin ensuciar el ActionCallback de la ventana, asegurando que `chat_actions.rb` (IA) también pueda invocar exactamente el mismo Command sin duplicar código.
