# PROTOCOLO DE MEJORAMIENTO CONTINUO AUTÓNOMO — AGENTE IDE ↔ IA DE SKETCHUP

> **Clasificación:** Documento de LEY
> **Versión:** 3.0
> **Fecha:** 2026-03-21
> **Propietario:** McComics Servicios Generales — Lima, Perú

---

## VISIÓN Y OBJETIVO FINAL

**El objetivo de este sistema es crear un ciclo de mejoramiento continuo 100% autónomo** donde el Agente IDE (Claude, Gemini, GPT Codex, etc.) pueda:

1. **Modificar código** del plugin directamente en el workspace
2. **Recargar el plugin** via Remote Console sin intervención humana
3. **Ejecutar pruebas automatizadas** via Remote Console + bridge con la IA de SketchUp
4. **Analizar resultados** y diagnosticar problemas
5. **Corregir bugs** y volver al paso 1
6. **Todo sin que el usuario esté presente**

El usuario NO debería necesitar copiar/pegar código, reiniciar SketchUp, ni verificar resultados manualmente. El sistema debe ser capaz de operar de forma autónoma una vez que SketchUp está abierto.

**Meta final:** Superar a TopSolid Wood y Cabinet Vision mediante mejoramiento iterativo automático del plugin McComicsUp Suite Pro IA.

### Principios del Sistema Autónomo

| Principio                        | Descripción                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| **Cero dependencia del usuario** | Una vez SketchUp abierto, el Agente IDE trabaja solo                                         |
| **Auto-diagnóstico**             | Si algo falla, el agente diagnostica con evidencia real, no adivina                          |
| **Auto-reparación**              | Si la Remote Console se detiene, el agente la reactiva via `McComics::RemoteConsole.restart` |
| **Eficiencia de tokens**         | Mínimos mensajes al bridge, máximo diagnóstico via Remote Console                            |
| **Mejora acumulativa**           | Cada sesión deja el sistema más robusto que la anterior                                      |
| **Exposición proactiva**         | Si falta una acción en el bridge, el agente la expone antes de pedirla                       |

---

## ¿A QUIÉN VA DIRIGIDO ESTE DOCUMENTO?

Este protocolo es para **CUALQUIER IA que opere desde un IDE** (Antigravity, VS Code, Cursor, Windsurf, Kiro, o cualquier otro) y necesite:

- Ejecutar código Ruby en la consola de SketchUp remotamente
- Comunicarse con la IA que opera dentro del chat de SketchUp (actualmente GPT 5.2)
- Recargar plugins tras modificar código
- Verificar cambios de forma automatizada

**Aplica a:** Gemini, Claude, GPT Codex, DeepSeek, Qwen, o cualquier modelo presente o futuro que opere desde un IDE con acceso al sistema de archivos.

**IA del Chat SketchUp:** La IA que opera dentro del plugin de chat de SketchUp. Actualmente GPT 5.2, pero puede cambiar.

---

## INSTRUCCIÓN OBLIGATORIA

**ANTES de comunicarse con la IA de SketchUp por el bridge, el Agente IDE DEBE:**

1. Leer `./McComics-Agent-System/skills/mccomics-remote-console-preflight/SKILL.md`
2. Leer este documento completo
3. Verificar que la Remote Console está activa (`C:\McComics_remote\status.txt`)
4. Verificar que el Worker está activo (existencia de bridge files)

**Este paso es preponderante, no opcional y no saltable.**

## REGLA INMUTABLE — BACKUP + EVIDENCIA + COMPARACION

Antes de modificar archivos existentes del plugin cuando el cambio no sea 100% obvio para el agente:

1. crear backup comparativo de cada archivo vivo a tocar
2. capturar evidencia previa con Remote Console o el chequeo ejecutable mas cercano
3. editar un solo slice pequeno por ciclo
4. repetir la misma validacion usada como evidencia previa
5. comparar el resultado con el backup para detectar dano colateral
6. si el repo cambio de estructura u ownership, regenerar `mc_graph_out` desde el directorio del generador

Esta regla tiene prioridad sobre atajos, intuicion o parches amplios.

---

## ARQUITECTURA DEL SISTEMA

```
┌──────────────────┐    escribe input.rb     ┌──────────────┐
│  AGENTE IDE      │ ───── + signal ────────► │  SketchUp    │
│  (cualquier IA)  │                          │  Remote      │
│  desde VS Code,  │ ◄──── lee output.txt ─── │  Console     │
│  Antigravity,    │                          └──────────────┘
│  Cursor, etc.    │
└──────┬───────────┘
       │ escribe chat_requests.jsonl
       ▼
┌──────────────────┐    HTTP API    ┌──────────────┐
│  Worker Python   │ ──────────────►│  Proveedor   │
│  (bridge)        │                │  (OpenAI,    │
│                  │ ◄──────────────│  Anthropic,  │
└──────────────────┘                │  etc.)       │
       │ escribe chat_responses.jsonl└──────────────┘
       ▼
┌──────────────────┐
│  AGENTE IDE      │ ◄── lee respuesta
│  (la misma IA)   │
└──────────────────┘
```

### Terminología

| Término            | Significado                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **Agente IDE**     | La IA que opera desde el IDE (tú, el que lee este documento)       |
| **IA SketchUp**    | La IA que opera dentro del chat del plugin de SketchUp             |
| **Remote Console** | Plugin que ejecuta código Ruby en SketchUp desde archivos          |
| **Bridge**         | Sistema de archivos JSONL para comunicar con la IA SketchUp        |
| **Worker**         | Proceso Python que lee requests y los envía a la API del proveedor |

---

## RUTAS CRÍTICAS

| Recurso               | Ruta                                                                |
| --------------------- | ------------------------------------------------------------------- |
| Remote Console input  | `C:\McComics_remote\input.rb`                                       |
| Remote Console output | `C:\McComics_remote\output.txt`                                     |
| Remote Console signal | `C:\McComics_remote\execute.signal`                                 |
| Bridge requests       | `...estructura_pro\.mcc_bridge_estructura_pro\chat_requests.jsonl`  |
| Bridge responses      | `...estructura_pro\.mcc_bridge_estructura_pro\chat_responses.jsonl` |
| Reload Manager        | `McComics::ReloadManager::Reloader.reload(plugin, options)`         |
| Plugin Detector       | `McComics::ReloadManager::PluginDetector.detect_all`                |

---

## PROTOCOLO DE COMUNICACIÓN CON LA IA DE SKETCHUP

### Formato de mensaje (append a chat_requests.jsonl)

```json
{
  "request_id": "chat_TIMESTAMP_99999",
  "message": "TEXTO DEL MENSAJE",
  "mode": "openai",
  "provider": "openai",
  "model": "gpt-5.2",
  "context": {
    "plugin": "Estructura Pro",
    "current_tab": "chat_estructura_pro",
    "conversation_id": "default",
    "selection_count": 0,
    "provider": "openai",
    "model": "gpt-5.2",
    "source": "IDE_AGENT_BRIDGE"
  },
  "source": "ESTRUCTURA_PRO",
  "ts": "YYYY-MM-DDTHH:MM:SS"
}
```

> **NOTA:** Ajustar `provider` y `model` según el proveedor configurado en el Worker.

### Prefijos de coordinación

| Prefijo        | Uso                                 | Quién lo usa |
| -------------- | ----------------------------------- | ------------ |
| `IDE_ACK:`     | Confirmación de recepción           | Agente IDE   |
| `IDE_TODO:`    | Tarea que el Agente IDE va a hacer  | Agente IDE   |
| `IDE_DONE:`    | Tarea completada + resultado        | Agente IDE   |
| `IDE_ASK:`     | Pregunta puntual                    | Agente IDE   |
| `MCC_AI_TODO:` | Tarea asignada a la IA SketchUp     | Agente IDE   |
| `MCC_AI_DONE:` | Tarea completada por la IA SketchUp | IA SketchUp  |
| `MCC_AI_ACK:`  | Confirmación de la IA SketchUp      | IA SketchUp  |

### Identificación del Agente IDE

En el primer mensaje al bridge, el Agente IDE debe identificarse:

```
IDE_ACK: {"agent": "NOMBRE_DEL_MODELO", "ide": "NOMBRE_DEL_IDE", "capabilities": ["remote_console", "file_edit", "reload"]}
```

Ejemplo:

```
IDE_ACK: {"agent": "Gemini", "ide": "Antigravity", "capabilities": ["remote_console", "file_edit", "reload"]}
IDE_ACK: {"agent": "Claude", "ide": "VS Code", "capabilities": ["remote_console", "file_edit", "reload"]}
IDE_ACK: {"agent": "GPT Codex 5.4", "ide": "Cursor", "capabilities": ["remote_console", "file_edit", "reload"]}
```

---

## ACCIONES DISPONIBLES EN LA IA DE SKETCHUP

### Estructura Pro

| Acción                   | Descripción                            |
| ------------------------ | -------------------------------------- |
| `create_structure`       | Crear mueble con parámetros            |
| `auto_design_from_text`  | Crear mueble desde descripción textual |
| `create_module_group`    | Crear grupo de módulos                 |
| `create_l_turn`          | Crear giro en L                        |
| `clone_and_modify`       | Clonar y modificar mueble existente    |
| `clone_entity_exact`     | Copia idéntica                         |
| `read_entity_params`     | Leer parámetros de mueble seleccionado |
| `capture_scene_image`    | Captura visual de la escena            |
| `recognize_scene_pieces` | Escanear piezas en escena (datos JSON) |
| `apply_skm`              | Aplicar material .skm                  |
| `apply_color`            | Aplicar color                          |
| `list_materials`         | Listar materiales disponibles          |
| `execute_sequence`       | Ejecutar secuencia de acciones         |
| `ai_orchestrate`         | Orquestación avanzada                  |

### Acciones EXPUESTAS para testing (agregadas 2026-03-21)

| Acción                            | Descripción                                                                 |
| --------------------------------- | --------------------------------------------------------------------------- |
| `select_by_uid`                   | Seleccionar estructura por UID (params: `uid`)                              |
| `insert_right` / `pegar_derecha`  | Insertar copia idéntica a la derecha del seleccionado                       |
| `insert_left` / `pegar_izquierda` | Insertar copia idéntica a la izquierda del seleccionado                     |
| `insert_above` / `inserta_arriba` | Insertar arriba del seleccionado (sin zócalo, techo amarres)                |
| `insert_below` / `inserta_abajo`  | Insertar abajo del seleccionado (con zócalo, techo completo)                |
| `create_structure_left_90`        | Crear estructura 90° a la izquierda                                         |
| `diagnose_all_structures`         | Diagnóstico completo: lista todos los muebles con params, UIDs y relaciones |

> **REGLA ABSOLUTA — AUTO-EXPOSICIÓN DE CONTROLES:**
> Si la IA SketchUp no puede ejecutar una acción porque no está expuesta, el Agente IDE DEBE:
>
> 1. **ANTICIPARSE:** Antes de pedir pruebas, revisar qué acciones necesitará GPT 5.2 y exponerlas TODAS de una vez
> 2. **Modificar la API del bridge** (`chat_actions.rb`) para registrar el nuevo callback
> 3. **Recargar el plugin** vía Remote Console
> 4. **Verificar** que la nueva acción está disponible
> 5. **Pedirle a la IA SketchUp** que ejecute la acción
>
> **PRINCIPIO:** El Agente IDE NUNCA debe pedirle al usuario que haga clicks manuales si puede exponer el control programáticamente. El sistema debe ser 100% automatizable.
>
> **OPTIMIZACIÓN DE TOKENS:**
>
> - Agrupar múltiples pruebas en un solo mensaje al bridge
> - Usar `execute_sequence` cuando sea posible para ejecutar N acciones en 1 request
> - Pedir resultados en formato compacto (JSON, no texto largo)
> - Máximo 5 mensajes por ciclo de verificación
> - Cada ciclo debe mejorar el protocolo: si una prueba revela un patrón, automatizarlo para futuras sesiones

---

## FLUJO DE TRABAJO DE TESTING AUTOMATIZADO

### Flujo completo (sin intervención del usuario)

```
PASO 1: Agente IDE modifica código en workspace
         ↓
PASO 2: Agente IDE recarga plugin via Remote Console
         Código: plugins = McComics::ReloadManager::PluginDetector.detect_all
                 plugin = plugins.find{|p| p[:name].include?('Suite')}
                 McComics::ReloadManager::Reloader.reload(plugin, {safe_mode: true})
         ↓
PASO 3: Agente IDE lee output.txt → confirma recarga exitosa
         ↓
PASO 4: Agente IDE envía mensaje a IA SketchUp via bridge:
         "Crea una estructura de 600x2100x600, con zócalo, amarres superiores, 2 puertas"
         ↓
PASO 5: Agente IDE espera respuesta en chat_responses.jsonl (polling cada 5s, max 30s)
         ↓
PASO 6: Agente IDE ejecuta diagnóstico via Remote Console:
         Código Ruby que lee atributos del mueble creado
         ↓
PASO 7: Agente IDE lee output.txt → analiza resultados
         ↓
PASO 8: Agente IDE pide a IA SketchUp: "Toma captura de la escena"
         ↓
PASO 9: Agente IDE verifica resultados:
         - ¿Parámetros correctos? (del diagnóstico Ruby)
         - ¿Visual correcto? (de la captura de la IA SketchUp)
         ↓
PASO 10: Si OK → avanzar al siguiente cambio
          Si ERROR → diagnosticar, corregir, volver a PASO 1
```

### Flujo simplificado (solo Remote Console)

```
PASO 1: Agente IDE modifica código
PASO 2: Agente IDE recarga via Remote Console
PASO 3: Agente IDE ejecuta diagnóstico Ruby
PASO 4: Agente IDE reporta resultado al usuario
```

---

## COMANDOS RUBY FRECUENTES (Remote Console)

### Recargar plugin

```ruby
plugins = McComics::ReloadManager::PluginDetector.detect_all
plugin = plugins.find{|p| p[:name].include?('Suite')}
result = McComics::ReloadManager::Reloader.reload(plugin, {safe_mode: true})
puts "Recarga: #{result[:success] ? 'OK' : 'ERROR'} - #{result[:files_loaded]&.size} archivos en #{result[:time_ms]}ms"
```

### Diagnosticar mueble seleccionado

```ruby
d='McComics_Estructura_Pro'
s=Sketchup.active_model.selection.first
require 'json'
p=JSON.parse(s.get_attribute(d,'params'),symbolize_names:true) rescue {}
puts "UID:#{s.get_attribute(d,'estructura_uid')} ancho:#{p[:ancho]} puertas:#{p[:cantidad_puertas]} zocalo:#{p[:zocalo_activar]} techo:#{p[:tipo_techo]} 90r:#{s.get_attribute(d,'right_90_child_structure').inspect} 90l:#{s.get_attribute(d,'left_90_child_structure').inspect} chain:#{s.get_attribute(d,'chain_prev_uid')}"
```

### Listar todos los muebles en escena

```ruby
d='McComics_Estructura_Pro'
require 'json'
Sketchup.active_model.entities.grep(Sketchup::Group).each do |g|
  uid = g.get_attribute(d,'estructura_uid')
  next unless uid
  p = JSON.parse(g.get_attribute(d,'params') || '{}', symbolize_names:true) rescue {}
  puts "#{uid} | ancho:#{p[:ancho]} | zocalo:#{p[:zocalo_activar]} | techo:#{p[:tipo_techo]} | 90r:#{g.get_attribute(d,'right_90_child_structure').inspect}"
end
```

---

## REGLAS DE SEGURIDAD

1. **Límite de mensajes a IA SketchUp:** Máximo 5 mensajes por sesión de testing (costo API)
2. **Siempre verificar recarga:** Leer output.txt antes de diagnosticar
3. **No modificar código sin evidencia:** Aplica el MODO CONTROL ESTRICTO DE IMPULSOS
4. **Datos del usuario primero:** Si hay ambigüedad, preguntar antes de actuar
5. **Backup antes de cambios:** El Reloader hace backup automático, pero verificar

---

## SISTEMA DE ALERTAS COMPARTIDAS — LOCK DE REMOTE CONSOLE

### Problema

Múltiples agentes IA (Claude Code, Codex, Gemini, etc.) pueden usar `C:\McComics_remote\input.rb` simultáneamente, sobreescribiendo el código del otro y perdiendo resultados.

### Mecanismo de Lock

**Archivo de control:** `C:\McComics_remote\agent.lock`

**Formato:**

```
NOMBRE_AGENTE
TIMESTAMP_EPOCH
```

Ejemplo:

```
claude-code
1774184000
```

### Reglas (OBLIGATORIAS para todo agente)

| #   | Regla                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Antes de escribir `input.rb`:** Verificar si existe `agent.lock`. Si existe y tiene menos de 120 segundos → **ESPERAR** (reintentar cada 5s). Si tiene más de 120s → lock expirado, se puede tomar. Si no existe → proceder. |
| 2   | **Al escribir `input.rb`:** Crear `agent.lock` con nombre del agente + timestamp epoch.                                                                                                                                        |
| 3   | **Al leer `output.txt` (resultado final):** Eliminar `agent.lock`.                                                                                                                                                             |
| 4   | **Si otro agente tiene el lock:** NO sobreescribir `input.rb`. Esperar o hacer otra tarea.                                                                                                                                     |
| 5   | **Timeout:** Lock expira automáticamente a los 120 segundos (protección contra agente desconectado).                                                                                                                           |

### Comandos de referencia

**Tomar lock (bash):**

```bash
echo -e "mi-agente\n$(date +%s)" > /c/McComics_remote/agent.lock
```

**Verificar lock (bash):**

```bash
if [ -f /c/McComics_remote/agent.lock ]; then
  AGENT=$(head -1 /c/McComics_remote/agent.lock)
  TS=$(tail -1 /c/McComics_remote/agent.lock)
  NOW=$(date +%s)
  AGE=$((NOW - TS))
  echo "Lock: $AGENT (${AGE}s ago)"
  [ $AGE -gt 120 ] && echo "EXPIRADO" || echo "ACTIVO"
else
  echo "LIBRE"
fi
```

**Liberar lock (bash):**

```bash
rm -f /c/McComics_remote/agent.lock
```

**Tomar lock (Ruby — para scripts dentro de input.rb):**

```ruby
File.write('C:/McComics_remote/agent.lock', "mi-agente\n#{Time.now.to_i}")
```

### Flujo correcto con lock

```
1. Verificar agent.lock → ¿libre?
2. Crear agent.lock con mi nombre
3. Escribir input.rb
4. Crear execute.signal
5. Esperar output.txt
6. Leer resultado
7. Eliminar agent.lock
```

---

## MANEJO DE ERRORES EN REMOTE CONSOLE (v1.2+)

### Problema resuelto

En versiones anteriores, si un agente enviaba código con errores de sintaxis a `input.rb`, la Remote Console devolvía `nil` silenciosamente porque `rescue => e` solo captura `StandardError` y sus subclases. `SyntaxError` hereda de `ScriptError`, no de `StandardError`, y pasaba desapercibido.

### Solución implementada (2026-03-22)

La Remote Console v1.2 ahora incluye:

1. **Pre-validación de sintaxis** con `RubyVM::InstructionSequence.compile` ANTES de ejecutar el código
2. **Rescues separados** para cada jerarquía de errores:
   - `SyntaxError` → hereda de `ScriptError`
   - `ScriptError` → padre de SyntaxError, LoadError, NotImplementedError
   - `StandardError` → errores de ejecución normales (`rescue => e`)
   - `Exception` → errores fatales (SignalException, SystemExit, etc.)

### Formato de salida según tipo de error

| Header en output.txt    | Clase de error                  | Status en status.txt |
| ----------------------- | ------------------------------- | -------------------- |
| `=== RESULTADO ===`     | Sin error                       | `done`               |
| `=== SYNTAX_ERROR ===`  | SyntaxError (pre-validación)    | `syntax_error`       |
| `=== SCRIPT_ERROR ===`  | ScriptError (carga/compilación) | `error`              |
| `=== RUNTIME_ERROR ===` | StandardError (ejecución)       | `error`              |
| `=== FATAL_ERROR ===`   | Exception (fatal)               | `fatal_error`        |

### Cómo leer errores (OBLIGATORIO para todo agente)

Al leer `output.txt` después de ejecutar código, el agente DEBE:

1. **Verificar `status.txt`** — si dice `syntax_error`, `error` o `fatal_error`, el código NO se ejecutó correctamente
2. **Buscar el header** `=== SYNTAX_ERROR ===`, `=== RUNTIME_ERROR ===`, etc. en `output.txt`
3. **Si es SYNTAX_ERROR:** El código NUNCA se ejecutó. La salida incluye las primeras 20 líneas del código enviado para facilitar diagnóstico. Corregir la sintaxis y reintentar.
4. **Si es RUNTIME_ERROR:** El código se ejecutó parcialmente. La salida incluye cualquier output previo al error + backtrace (8 líneas).
5. **Si es FATAL_ERROR:** Error crítico del sistema. NO reintentar sin analizar.

### Errores comunes de sintaxis al enviar código via input.rb

| Error                              | Causa                                   | Solución                                       |
| ---------------------------------- | --------------------------------------- | ---------------------------------------------- |
| `Can't escape from eval with next` | `next` dentro de `begin...end` sin loop | Usar `raise` o reestructurar el flujo          |
| `unterminated string`              | String con comillas sin cerrar          | Verificar todas las comillas                   |
| `unexpected end-of-input`          | Faltan `end` para cerrar bloques        | Contar `def/do/if/begin/class/module` vs `end` |
| `unexpected keyword_end`           | `end` sobrante                          | Revisar indentación y estructura de bloques    |

### Ejemplo de salida con error de sintaxis

```
=== SYNTAX_ERROR — 2026-03-22 11:56:23 ===
El código tiene un error de sintaxis y NO fue ejecutado.

SyntaxError: C:/McComics_remote/input.rb:4: Invalid next

--- Código recibido (primeras 20 líneas) ---
  1| begin
  2|   x = 1
  3|   unless x > 0
  4|     next
  5|   end
  6|   puts "nunca llega"
  7| rescue => e
  8|   puts e.message
  9| end

=== FIN ===
```

### Auto-reparación de la Remote Console

Si la Remote Console se detiene (deja de responder a `execute.signal`), el agente puede reactivarla ejecutando manualmente en la consola Ruby de SketchUp:

```ruby
McComics::RemoteConsole.restart
```

O usar el menú: Extensions → McComics Remote Console → Reiniciar

---

## OPTIMIZACIONES

1. **Batch testing:** Agrupar múltiples diagnósticos en un solo script Ruby
2. **Reusar resultados:** Si la IA SketchUp ya creó los muebles, no recrear
3. **Diagnóstico primero:** Siempre ejecutar diagnóstico Ruby antes de pedir captura visual
4. **Mensajes compactos:** Minimizar tokens en mensajes al bridge

---

_McComics® — Tecnología funcional que mejora vidas._
