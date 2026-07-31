# 🔒 SKILL: SEGURIDAD DE SERVIDORES, IDE Y SISTEMAS DE LICENCIAS

## Marco de Gobierno de Seguridad para Servidores HTTP, Aplicaciones Desktop, IDEs y Sistemas de Licencias

### Versión 1.0 — Derivado de auditoría real del ecosistema McComics (abril 2026)

---

## 1. PROPÓSITO

Esta skill codifica los aprendizajes de seguridad obtenidos al auditar:

- El servidor HTTP de El Oráculo (Python stdlib)
- La arquitectura de VS Code OSS (Electron + Extension Host)
- El sistema de licencias McComics (AES-256-GCM + RSA + HKDF)
- El Open McComics desktop app (customtkinter + backend)
- La McComics Audio Suite Pro (Python + pywebview)

Aplica a CUALQUIER proyecto que involucre: servidores HTTP, aplicaciones desktop, extensiones de IDE, o sistemas de licencias.

---

## 2. MATRIZ DE SEGURIDAD COMPARATIVA (REFERENCIA CANÓNICA)

### 2.1 Servidores HTTP

| Control de Seguridad    | Oráculo Server (actual)               | VS Code Server (referencia)     | Estándar mínimo                      |
| ----------------------- | ------------------------------------- | ------------------------------- | ------------------------------------ |
| Framework HTTP          | `http.server` stdlib                  | Express + custom middleware     | FastAPI o Flask mínimo               |
| CORS                    | `Access-Control-Allow-Origin: *` ❌   | Origin whitelist por extensión  | Whitelist de orígenes conocidos      |
| Preflight (OPTIONS)     | NO manejado ❌                        | Completo                        | DEBE manejar OPTIONS                 |
| Rate Limiting           | Sí ✅ (3 perfiles)                    | Por extensión                   | DEBE existir con perfiles            |
| Auth Token              | Bearer SHA256 ✅                      | Session-based + workspace trust | Bearer token con rotación            |
| HTTPS                   | NO ❌ (HTTP plano en localhost)       | Tunnel con TLS                  | HTTPS obligatorio si no es localhost |
| Body Size Limit         | NO ❌ (lee Content-Length sin límite) | Configurado por endpoint        | Max 10MB por defecto, configurable   |
| Error Exposure          | Sí ❌ (`str(e)` al cliente)           | Mensajes genéricos              | NUNCA exponer stack traces           |
| CSRF                    | NO ❌                                 | Nonce por webview               | Token CSRF si hay cookies            |
| Content-Type Validation | Parcial                               | Estricto                        | Validar Content-Type en CADA request |

### 2.2 Aplicaciones Desktop

| Control             | Open McComics (actual) | VS Code (referencia)               | Estándar mínimo                    |
| ------------------- | ---------------------- | ---------------------------------- | ---------------------------------- |
| Sandbox             | NO (Python directo)    | Electron sandbox + proceso aislado | Proceso principal separado de UI   |
| Extension Isolation | NO aplica              | Extension Host separado            | Si hay plugins: proceso aislado    |
| Secret Storage      | NO persiste ❌         | Credential store del OS            | Usar OS keyring (keyring Python)   |
| Update Channel      | NO existe              | Signed auto-update                 | Verificar firma de actualizaciones |
| CSP en Webviews     | NO aplica              | `default-src 'none'` estricto      | CSP estricto en toda ventana web   |
| File Access         | Sin restricciones      | Workspace Trust                    | Solicitar permisos explícitos      |

### 2.3 Sistemas de Licencias

| Control                       | McComics Licensing (actual)    | Estándar industria        | Acción                      |
| ----------------------------- | ------------------------------ | ------------------------- | --------------------------- |
| Cifrado simétrico             | AES-256-GCM ✅                 | AES-256-GCM               | ✅ Correcto                 |
| Derivación de claves          | HKDF-SHA256 con salt random ✅ | HKDF o PBKDF2             | ✅ Correcto                 |
| Firma de manifiesto           | RSA-SHA256 3072-bit ✅         | RSA ≥2048 o Ed25519       | ✅ Correcto                 |
| Integridad                    | SHA-256 hashes ✅              | SHA-256                   | ✅ Correcto                 |
| Master Key                    | Embebida en loader Base64 ⚠️   | HSM o key server          | ⚠️ Riesgo inherente offline |
| Validación online             | Sí, contra license server      | Sí                        | ✅ Correcto                 |
| Verificación periódica        | Cada 120s configurable ✅      | Configurable              | ✅ Correcto                 |
| Protección anti-decompilación | Zlib + AES                     | Obfuscation + native code | ⚠️ Ruby es interpretado     |

---

## 3. VULNERABILIDADES CRÍTICAS DETECTADAS Y CORRECCIONES

### 3.1 CORS Wildcard (Severidad: ALTA)

**Problema:** `Access-Control-Allow-Origin: *` permite requests desde cualquier origen web.
**Impacto:** Un sitio malicioso puede hacer requests al servidor local del Oráculo.
**Fix obligatorio:**

```python
ALLOWED_ORIGINS = {"http://localhost:9741", "http://127.0.0.1:9741"}

def _set_cors_headers(self, handler):
    origin = handler.headers.get("Origin", "")
    if origin in ALLOWED_ORIGINS:
        handler.send_header("Access-Control-Allow-Origin", origin)
    # Si el origen no está en la whitelist, NO enviar header CORS
```

### 3.2 Sin Manejo de OPTIONS / Preflight (Severidad: MEDIA)

**Problema:** Las preflight requests CORS fallan porque el servidor no responde a OPTIONS.
**Fix obligatorio:**

```python
def do_OPTIONS(self):
    self.send_response(204)
    self._set_cors_headers(self)
    self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
    self.send_header("Access-Control-Max-Age", "86400")
    self.end_headers()
```

### 3.3 Errores Exponen Información Interna (Severidad: ALTA)

**Problema:** `str(e)` se retorna al cliente en respuestas 500, exponiendo rutas, clases y estado interno.
**Fix obligatorio:**

```python
except Exception as e:
    logger.error(f"Internal error: {e}", exc_info=True)  # Log completo interno
    self._send_json(500, {"error": "Internal server error"})  # Mensaje genérico al cliente
```

### 3.4 Sin Límite de Body Size (Severidad: MEDIA)

**Problema:** `_read_body()` lee Content-Length sin límite máximo → DoS por body gigante.
**Fix obligatorio:**

```python
MAX_BODY_SIZE = 10 * 1024 * 1024  # 10 MB

def _read_body(self):
    content_length = int(self.headers.get("Content-Length", 0))
    if content_length > MAX_BODY_SIZE:
        self._send_json(413, {"error": "Request entity too large"})
        return None
    return self.rfile.read(content_length)
```

### 3.5 Master Key Embebida en Loader (Severidad: MEDIA-ALTA)

**Problema:** La master key del sistema de licencias viaja en Base64 dentro del loader Ruby. Alguien que decomp el .rbz puede extraerla.
**Mitigación (no eliminación — inherente a software offline):**

- Derivar la key de múltiples fuentes: hardware ID + timestamp de build + salt
- Ofuscar el loader (no seguridad real, pero aumenta el costo de ataque)
- Agregar verificación de integridad del propio loader al arrancar
- Para la versión IDE: migrar a key server con tokens de sesión de corta vida

---

## 4. REGLAS DE SEGURIDAD PARA DESARROLLO (MANDATORIAS)

### 4.1 Servidores HTTP

1. **NUNCA** usar `http.server` de stdlib para producción. Usar FastAPI, Flask o aiohttp como mínimo.
2. **NUNCA** usar CORS wildcard (`*`). Usar whitelist explícita de orígenes.
3. **SIEMPRE** manejar OPTIONS para preflight CORS.
4. **NUNCA** exponer `str(e)` o stack traces al cliente. Log interno + mensaje genérico.
5. **SIEMPRE** limitar Content-Length a un máximo configurable.
6. **SIEMPRE** validar Content-Type antes de parsear el body.
7. **SIEMPRE** usar HTTPS si el servidor es accesible fuera de localhost.
8. **SIEMPRE** implementar rate limiting con al menos 2 perfiles (normal, restrictivo).
9. **SIEMPRE** rotar tokens de autenticación periódicamente.
10. **NUNCA** log-ear tokens, passwords o API keys en texto plano.

### 4.2 Aplicaciones Desktop con Webviews

1. **SIEMPRE** usar Content Security Policy estricto en webviews.
2. **NUNCA** habilitar `nodeIntegration` o `contextIsolation: false` en Electron.
3. **SIEMPRE** sanitizar inputs que viajan de webview a proceso principal.
4. **SIEMPRE** usar el keyring del OS para almacenar credenciales (no archivos planos).
5. **NUNCA** cargar URLs externas en webviews sin validación.
6. **SIEMPRE** verificar firmas de actualizaciones antes de aplicarlas.

### 4.3 Sistemas de Licencias

1. **SIEMPRE** usar AES-256-GCM (no AES-CBC, no AES-ECB).
2. **SIEMPRE** derivar claves con HKDF o PBKDF2 (no usar master key directamente).
3. **SIEMPRE** firmar manifiestos con RSA ≥2048 bits o Ed25519.
4. **SIEMPRE** verificar integridad antes de descifrar.
5. **NUNCA** almacenar la private key en el cliente. Solo la public key.
6. **SIEMPRE** implementar verificación periódica contra license server.
7. **SIEMPRE** implementar grace period para desconexión temporal.
8. **NUNCA** confiar solo en validación local para licencias de alto valor.

### 4.4 Extensiones de IDE

1. **SIEMPRE** ejecutar extensiones en proceso aislado (Extension Host pattern de VS Code).
2. **SIEMPRE** verificar firma de extensiones antes de instalar.
3. **SIEMPRE** solicitar permisos explícitos para acceso a archivos, red y terminal.
4. **NUNCA** permitir que una extensión modifique archivos fuera del workspace sin confirmación.
5. **SIEMPRE** implementar Content Security Policy en webviews de extensiones.
6. **SIEMPRE** sandboxear la ejecución de código generado por IA antes de aplicarlo.

---

## 5. CHECKLIST DE SEGURIDAD PRE-RELEASE

Antes de publicar CUALQUIER servidor, app desktop, extensión de IDE o sistema de licencias:

- ☐ ¿CORS está configurado con whitelist (no wildcard)?
- ☐ ¿OPTIONS/preflight está manejado?
- ☐ ¿Los errores retornan mensajes genéricos (no stack traces)?
- ☐ ¿El body tiene límite de tamaño?
- ☐ ¿Las credenciales se almacenan en el keyring del OS?
- ☐ ¿Los tokens se rotan periódicamente?
- ☐ ¿Hay rate limiting activo?
- ☐ ¿Los logs NO contienen tokens ni passwords?
- ☐ ¿Las webviews tienen CSP estricto?
- ☐ ¿Las actualizaciones se verifican con firma digital?
- ☐ ¿Las extensiones ejecutan en proceso aislado?
- ☐ ¿Las licencias se verifican contra servidor remoto?

**Si algún check falla → NO publicar hasta que se corrija.**

---

## 6. ANTI-PATRONES DE SEGURIDAD

| #   | Anti-Patrón                 | Consecuencia                          | Ejemplo real                      |
| --- | --------------------------- | ------------------------------------- | --------------------------------- |
| 1   | CORS wildcard               | Requests desde cualquier origen       | `Access-Control-Allow-Origin: *`  |
| 2   | Error exposure              | Fuga de información interna           | `return str(e)` al cliente        |
| 3   | Credenciales en texto plano | Robo de API keys                      | `config.json` con keys sin cifrar |
| 4   | Sin rate limiting           | DoS trivial                           | Servidor sin throttle             |
| 5   | Body sin límite             | DoS por payload gigante               | Leer Content-Length sin validar   |
| 6   | Master key en cliente       | Descifrado total por decompilación    | Key Base64 en loader Ruby         |
| 7   | HTTP plano para auth        | Tokens viajan en claro                | Bearer token sin TLS              |
| 8   | Webview sin CSP             | XSS en aplicación desktop             | `<script>` inyectable             |
| 9   | Extensiones sin sandbox     | Código malicioso con permisos del IDE | Extension con acceso total a FS   |
| 10  | Log de tokens               | Credenciales en archivos de log       | `logger.info(f"Token: {token}")`  |
