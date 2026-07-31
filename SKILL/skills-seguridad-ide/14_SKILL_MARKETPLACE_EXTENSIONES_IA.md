# 🧩 SKILL: MARKETPLACE DE EXTENSIONES Y ECOSISTEMA DE IA EN IDE

## Marco Técnico-Legal para Extensiones de IA, Marketplaces y Compatibilidad con Proveedores

### Versión 1.0 — Derivado de análisis de VS Code OSS, Open VSX y extensiones de IA (abril 2026)

---

## 1. PROPÓSITO

Esta skill documenta el conocimiento técnico y legal necesario para:

- Integrar extensiones de terceros en un fork de VS Code OSS
- Configurar marketplace de extensiones (Open VSX vs propietario)
- Instalar y operar extensiones de IA (Copilot, Claude, Gemini, etc.) en forks
- Entender las restricciones legales de cada proveedor de IA
- Diseñar la estrategia de extensiones para Open McComics IDE

---

## 2. ARQUITECTURA DE EXTENSIONES EN VS CODE OSS

### 2.1 Componentes del Sistema de Extensiones (MIT, incluidos en el fork)

| Componente                       | Función                                          | Estado en fork OSS                                          |
| -------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| Extension Host                   | Proceso aislado que ejecuta extensiones          | ✅ Incluido (MIT)                                           |
| Extension API (`vscode.*`)       | API que las extensiones usan                     | ✅ Incluido (MIT)                                           |
| Extension Management Service     | Instalar/desinstalar/actualizar extensiones      | ✅ Incluido (MIT)                                           |
| Extension Gallery Service        | Conectar con marketplace para buscar extensiones | ✅ Código incluido, pero SIN URL de marketplace configurada |
| VSIX Installer                   | Instalar extensiones desde archivo .vsix         | ✅ Incluido (MIT)                                           |
| Extension Signature Verification | Verificar firma digital de extensiones           | ✅ Incluido (MIT)                                           |

### 2.2 Lo que NO está incluido en el fork OSS

| Componente                     | Por qué no está                           | Alternativa                                 |
| ------------------------------ | ----------------------------------------- | ------------------------------------------- |
| URL del Microsoft Marketplace  | No está en `product.json` de la build OSS | Configurar Open VSX o marketplace propio    |
| Logo y branding de VS Code     | Propietario de Microsoft                  | Usar branding propio                        |
| Telemetría de Microsoft        | Configuración propietaria                 | Implementar propia o desactivar             |
| GitHub Copilot (pre-instalado) | Extensión propietaria, no viene con OSS   | Instalar vía VSIX o marketplace alternativo |

### 2.3 Configuración del Marketplace en product.json

Para habilitar un marketplace en el fork, agregar a `product.json`:

```json
{
  "extensionsGallery": {
    "serviceUrl": "https://open-vsx.org/vscode/gallery",
    "itemUrl": "https://open-vsx.org/vscode/item",
    "resourceUrlTemplate": "https://open-vsx.org/vscode/unpkg/{publisher}/{name}/{version}/{path}",
    "controlUrl": "",
    "nlsBaseUrl": "",
    "publisherUrl": ""
  }
}
```

**Open VSX** es la alternativa legal al marketplace de Microsoft. Es operado por la Eclipse Foundation bajo licencia abierta.

---

## 3. EXTENSIONES DE IA — COMPATIBILIDAD CON FORK

### 3.1 Matriz de Compatibilidad

| Extensión de IA              | Disponible en Open VSX               | Instalable vía VSIX | Requiere convenio                                              | Funciona en fork                             | Notas                                                           |
| ---------------------------- | ------------------------------------ | ------------------- | -------------------------------------------------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| **GitHub Copilot**           | ❌ NO                                | ⚠️ Técnicamente sí  | ⚠️ ToS de GitHub pueden restringir uso en forks no autorizados | ⚠️ Zona gris                                 | Requiere suscripción GitHub + autenticación GitHub              |
| **Claude Code**              | ❌ NO (es CLI, no extensión VS Code) | N/A                 | NO necesario                                                   | ✅ Funciona como herramienta externa         | Es un CLI standalone que se conecta a la API de Anthropic       |
| **Continue.dev**             | ✅ SÍ                                | ✅ SÍ               | NO necesario (MIT/Apache 2.0)                                  | ✅ Funciona en cualquier fork                | Soporta TODOS los LLMs: OpenAI, Anthropic, Google, Ollama, etc. |
| **Cody (Sourcegraph)**       | ✅ SÍ                                | ✅ SÍ               | NO necesario                                                   | ✅ Funciona                                  | Requiere cuenta Sourcegraph (gratuita disponible)               |
| **Gemini Code Assist**       | ❌ NO (solo en VS Code oficial)      | ⚠️ Técnicamente sí  | ⚠️ Requiere Google Cloud                                       | ⚠️ Puede funcionar con sideload              | Necesita autenticación Google Cloud                             |
| **Amazon CodeWhisperer / Q** | ❌ NO (solo VS Code oficial)         | ⚠️ Sideload posible | ⚠️ AWS ToS                                                     | ⚠️ Zona gris                                 | Requiere cuenta AWS                                             |
| **Tabnine**                  | ✅ SÍ                                | ✅ SÍ               | NO necesario                                                   | ✅ Funciona                                  | Modelos locales disponibles                                     |
| **Codeium / Windsurf**       | ❌ NO                                | ⚠️ Sideload posible | ⚠️ ToS propietarios                                            | ⚠️ Zona gris                                 | Codeium tiene ToS específicos                                   |
| **GPT Codex (OpenAI)**       | ❌ NO (integrado en Copilot)         | N/A                 | SÍ (API key)                                                   | ✅ Via Continue.dev u otra extensión abierta | Acceso via API, no extensión directa                            |
| **Ollama (local)**           | Via Continue.dev ✅                  | ✅                  | NO necesario                                                   | ✅ Funciona offline                          | Ideal para modo air-gapped banking                              |
| **Antigravity**              | ❌ Es un IDE completo, no extensión  | N/A                 | N/A                                                            | N/A                                          | Competidor, no extensión                                        |

### 3.2 Clasificación Legal de Extensiones

**TIER 1 — Sin restricciones (instalar libremente):**

- Continue.dev (MIT/Apache)
- Cody (Apache 2.0)
- Tabnine (disponible en Open VSX)
- Ollama (via Continue.dev, 100% local)

**TIER 2 — Zona gris (funciona pero revisar ToS):**

- GitHub Copilot: requiere suscripción GitHub, ToS pueden prohibir uso en forks no-Microsoft
- Gemini Code Assist: requiere Google Cloud, ToS pueden restringir
- Amazon Q: requiere AWS, ToS específicos

**TIER 3 — Requiere acuerdo comercial:**

- Ninguno necesariamente, pero si quieres Copilot PRE-INSTALADO y oficialmente soportado en tu IDE, necesitarías acuerdo con GitHub/Microsoft
- Si quieres anunciar "Compatible con Copilot", GitHub podría requerir partnership

### 3.3 Estrategia Recomendada para Open McComics IDE

```
CAPA 1 — IA Nativa (McComics propia):
├── El Oráculo v4.0 (indexación, búsqueda semántica, assembler)
├── Project Genome (extracción de ADN de código)
├── Solution Evolution (evolución genética)
├── Quality Gates (5 compuertas de validación)
├── Multi-Brain Router (ruteo a múltiples LLMs)
└── ThinkForce™ Skills (marco cognitivo de gobierno)

CAPA 2 — Extensiones de IA Open Source (pre-configuradas):
├── Continue.dev → configurado para usar el Multi-Brain Router McComics
├── Ollama → para modo air-gapped / banking
└── Cody → para búsqueda semántica en codebase

CAPA 3 — Extensiones de IA propietarias (el usuario las instala si quiere):
├── GitHub Copilot → via VSIX sideload (bajo responsabilidad del usuario)
├── Gemini Code Assist → via VSIX sideload
└── Cualquier otra → via Open VSX marketplace
```

---

## 4. OPEN VSX vs MICROSOFT MARKETPLACE

### 4.1 Diferencias Clave

| Aspecto                                        | Microsoft Marketplace               | Open VSX                              |
| ---------------------------------------------- | ----------------------------------- | ------------------------------------- |
| Operador                                       | Microsoft                           | Eclipse Foundation                    |
| Licencia de uso                                | Restringido a VS Code oficial (ToS) | Abierto para cualquier IDE compatible |
| Extensiones disponibles                        | ~50,000+                            | ~5,000+ (y creciendo)                 |
| Extensiones de Microsoft                       | Todas                               | Solo las que Microsoft publica allí   |
| Extensiones populares (Prettier, ESLint, etc.) | ✅                                  | ✅ (la mayoría están)                 |
| Extensiones IA propietarias (Copilot, etc.)    | ✅                                  | ❌ (salvo las open source)            |
| Costo                                          | Gratis                              | Gratis                                |
| Self-hosting                                   | NO posible                          | ✅ Posible (docker/k8s)               |

### 4.2 Regla Legal Fundamental

**Los ToS del Microsoft Marketplace PROHÍBEN explícitamente su uso en productos que no sean "Visual Studio Code":**

> "You may only use the marketplace with Visual Studio Code."

**Consecuencia:** Un fork de VS Code (como Open McComics IDE) NO puede apuntar legalmente al marketplace de Microsoft. DEBE usar Open VSX o un marketplace propio.

**Precedentes:** Cursor, Windsurf, VSCodium — todos usan Open VSX o registro propio.

### 4.3 Opción de Marketplace Propio

Para tener extensiones exclusivas McComics + las de Open VSX:

1. Desplegar instancia propia de Open VSX (es open source)
2. Configurar como proxy de Open VSX público + extensiones propias
3. Las extensiones McComics (Oráculo, Genome, Evolution, etc.) se publican solo en el marketplace McComics
4. Las extensiones del ecosistema se proxean desde Open VSX

---

## 5. ¿SE NECESITAN CONVENIOS CON EMPRESAS DE IA?

### 5.1 Respuesta Corta

**NO para la mayoría de casos.** El sistema de extensiones de VS Code es un estándar abierto. Cualquiera puede:

- Crear extensiones que usen APIs de OpenAI, Anthropic, Google, etc.
- Publicar esas extensiones en Open VSX
- Instalarlas en cualquier fork de VS Code

### 5.2 Cuándo SÍ se necesitaría convenio

| Escenario                                                 | ¿Convenio necesario?                         | Con quién                      |
| --------------------------------------------------------- | -------------------------------------------- | ------------------------------ |
| Permitir que los usuarios instalen Copilot por su cuenta  | NO                                           | —                              |
| Pre-instalar Copilot de fábrica y anunciarlo como feature | SÍ                                           | GitHub/Microsoft               |
| Usar la API de OpenAI via Continue.dev                    | NO (el usuario paga su API key)              | —                              |
| Ofrecer modelos de IA incluidos en el precio del IDE      | SÍ                                           | Proveedor del modelo           |
| Usar Ollama localmente                                    | NO (es open source)                          | —                              |
| Anunciar "Compatible con Claude Code" en marketing        | ⚠️ Revisar trademark guidelines de Anthropic | —                              |
| Crear extensión propia que llame APIs de terceros         | NO (el usuario provee su key)                | —                              |
| Ofrecer un tier "Enterprise con IA ilimitada"             | SÍ                                           | Proveedor del modelo (volumen) |

### 5.3 Modelo de Negocio Recomendado para IA

```
OPCIÓN RECOMENDADA: "BYOK — Bring Your Own Key"

El IDE McComics incluye:
├── Multi-Brain Router → El usuario configura sus propias API keys
├── Continue.dev pre-instalado → Ya soporta 20+ proveedores
├── Ollama pre-configurado → Para uso offline sin API key
└── McComics Oráculo → IA propia para indexación y genoma

El usuario trae:
├── Su API key de OpenAI → para GPT-4, Codex, etc.
├── Su API key de Anthropic → para Claude
├── Su API key de Google → para Gemini
└── O usa Ollama gratis → modelos locales

Ventaja: No necesitas convenio con nadie.
         El usuario paga directamente al proveedor.
         Tú cobras por el IDE + features cognitivos.
```

---

## 6. CHECKLIST DE MARKETPLACE Y EXTENSIONES

Antes de lanzar un IDE basado en fork de VS Code:

- ☐ ¿`product.json` apunta a Open VSX (no al marketplace de Microsoft)?
- ☐ ¿Las extensiones propias están empaquetadas y publicadas?
- ☐ ¿Continue.dev está pre-configurado con el Multi-Brain Router?
- ☐ ¿Ollama está documentado para modo offline?
- ☐ ¿El branding NO usa "Visual Studio Code" ni logos de Microsoft?
- ☐ ¿Las extensiones TIER 2 se instalan por decisión del usuario (no pre-instaladas)?
- ☐ ¿El marketing NO promete compatibilidad con extensiones propietarias que no controlas?
- ☐ ¿El sistema de API keys es BYOK (el usuario trae las suyas)?
- ☐ ¿El marketplace tiene política de verificación de extensiones?
- ☐ ¿Las extensiones ejecutan en sandbox (Extension Host aislado)?

---

## 7. ANTI-PATRONES DE EXTENSIONES

| #   | Anti-Patrón                                          | Riesgo                                            | Ejemplo                                         |
| --- | ---------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| 1   | Apuntar al marketplace de Microsoft en fork          | Violación de ToS, posible acción legal            | `serviceUrl: marketplace.visualstudio.com`      |
| 2   | Pre-instalar Copilot sin acuerdo                     | Violación de ToS de GitHub                        | Bundle Copilot en el installer                  |
| 3   | Prometer "compatible con Copilot" sin verificar      | Marketing engañoso si deja de funcionar           | Landing page con logo de Copilot                |
| 4   | Incluir API keys de modelos en el precio sin acuerdo | Costos impredecibles sin contrato de volumen      | "$20/mes con GPT-4 ilimitado"                   |
| 5   | No sandboxear extensiones de terceros                | Extensión maliciosa con acceso total              | Extension Host sin aislamiento                  |
| 6   | Ignorar licencias de extensiones                     | Redistribuir extensiones con licencia restrictiva | Bundlear extensión con licencia no-redistribute |
