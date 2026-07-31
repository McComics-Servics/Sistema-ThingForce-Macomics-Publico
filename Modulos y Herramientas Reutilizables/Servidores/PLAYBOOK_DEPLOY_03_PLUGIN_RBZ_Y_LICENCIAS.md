# PLAYBOOK DEPLOY · Parte 3 — Plugin `.rbz`, licencias y descarga protegida

> Compilador: `McComics\Generador de Licencia Automatico\builder_final.rb`
> Reglas: R-010 (SAGRADA, cero secretos en código), R-044 (vault), R-006 (PASS/FAIL).

---

## 1. Compilar el plugin

```bash
cd "C:\Users\McComics\McComics\Generador de Licencia Automatico"
ruby builder_final.rb "_fuente_build" \
  --manifest-private-key="C:/Users/McComics/.mccomics-secrets/<vault>/manifest-private.pem" \
  --license-public-key="manifest-public.pem" \
  --server-url="https://app.grupomccomics.com"
```

**Compilar SIEMPRE desde la carpeta `_fuente_build/`, nunca desde el `.rb` suelto.**
Si se pasa el `.rb` solo, el builder genera un manifiesto automático con `recursos: []`
y el `.rbz` sale **sin los iconos** (73 KB en vez de ~300 KB). El `manifest.yml` debe
declararlos explícitamente: la auto-detección sólo mira `assets/**` y `ui/**`.

Las claves privadas viven **fuera de todo proyecto y fuera de OneDrive**, en
`C:\Users\McComics\.mccomics-secrets\` (R-044).

## 2. ⚠️ `ruby -c` NO valida el runtime del plugin

La plantilla del runtime vive dentro de un **heredoc**, así que
`ruby -c builder_final.rb` responde `Syntax OK` aunque el plugin generado no compile.
En julio de 2026 el compilador entregó durante días un `.loader.rb` con `SyntaxError`
sin un solo aviso.

Corrupciones reales encontradas (todas *sintácticamente válidas* en Ruby):

```ruby
def load_modulesdef load_modules        # define load_modulesdef(load_modules)
def active_tls_pinsdef active_tls_pins  # el método real NUNCA queda definido
end          end                        # 'end' de más → cierran los módulos antes de tiempo
```

`def Xdef X` no da error: Ruby lee un método `Xdef` con parámetro `X`. El método real
no existe, `tick` lo llama, lanza `NoMethodError`, el `rescue` se lo traga y el plugin
se entrega roto en silencio.

**Por eso existe `validate_generated_runtime!`**, que aborta el build ante: sintaxis rota,
`def Xdef X`, métodos críticos ausentes o HTTP bloqueante.
Cubierto por `test_validador_runtime.rb` (7 casos). **Confía en el validador, no en `Syntax OK`.**

## 3. ⚠️ El runtime no puede usar `Net::HTTP`

Bloquea el hilo de UI y **congela SketchUp**. Toda la red del plugin va por
`Sketchup::Http::Request` (asíncrono). El validador falla el build si detecta lo contrario.

Tampoco se valida nada durante la carga del plugin: se difiere con
`UI.start_timer(0.5, false)`.

Histórico: el compilador consultaba la clave pública en tiempo de build contra
`license.grupomccomics.com` — **un dominio que nunca existió**. Colgaba el build ~12 s y
caía a un fallback con avisos: eso era "compilar con errores". Además era un vector de
inyección de confianza: quien controlara el DNS podía inyectar su clave pública.

## 4. Verificación obligatoria antes de publicar un `.rbz`

```bash
unzip -o -q plugin.rbz -d /tmp/rbz && ruby -c /tmp/rbz/*/.loader.rb   # → Syntax OK
grep -c "Net::HTTP" /tmp/rbz/*/.loader.rb                             # → 0
grep -c "license\.grupomccomics" /tmp/rbz/*/.loader.rb                # → 0
find /tmp/rbz -path "*Iconos*" -type f | wc -l                        # → 11
```

## 5. Publicar el binario (NO como archivo estático)

El `.rbz` **no** se sirve desde `assets/`: era público y la validación de licencia se
hacía en el navegador (se salta con F12). Vive en **Cloudflare KV**:

```bash
# namespace: mccomics_plugin_binaries · id 8b6b5a1599a1449fb45e136bdf6f3331
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACC/storage/kv/namespaces/$NS/values/plugin:disenador-basico" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "@Crear_piezas_de_Melamina_McComics.rbz"
```

Lo entrega `functions/api/download/[slug].js` sólo si: **hay sesión válida** (token
verificado contra Supabase) **y** (licencia Pro activa **o** cuenta con menos de 7 días).
Sin sesión → `401`. Prueba agotada → `403`.

## 6. Modelo de licencias

- Identidad: **Supabase** (`bfidjukpvolyvtdfpzya`), compartida por web, app y plugin.
- Cuenta **Pro** = fila activa en `license_grants`. Se concede en
  `https://app.grupomccomics.com/#admin` → `POST /api/admin/licenses` (por correo).
- **Prueba**: 7 días desde la creación de la cuenta.
- **Una sola máquina a la vez**: tabla `account_devices` + señal `deviceReplaced`.
  El plugin envía `x-mcc-device-id` y `x-mcc-device-kind: sketchup`.
- El trial **nunca** se calcula con el reloj local: se guarda `serverTimestamp` y se
  rechaza si el reloj retrocede.

## 7. ¿Compilar un `.rbz` por usuario? — **NO**

Un único `.rbz` precompilado para todos. Compilar por descarga no escala, rompe la firma
reproducible y **no aporta seguridad**: el vínculo con la cuenta lo da el token del
servidor, no el archivo.

## 8. Pendiente conocido — login del plugin

Sigue con formulario correo+contraseña. Debe migrar a **Device Flow (RFC 8628)**: el
plugin muestra un código y la aprobación ocurre en el navegador real.
**Google bloquea OAuth en webviews embebidos** (`disallowed_useragent`), así que el login
de Google **no puede** ir dentro de un `HtmlDialog`. No es una preferencia: es una
restricción de Google.

<!-- sistema: ThingForce™ McComics | Playbook Deploy 3/4 | creado: 2026-07-25 -->
