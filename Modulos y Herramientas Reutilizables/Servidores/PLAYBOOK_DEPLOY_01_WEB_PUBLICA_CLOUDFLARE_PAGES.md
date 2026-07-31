# PLAYBOOK DEPLOY · Parte 1 — Web pública (Cloudflare Pages)

> `grupomccomics.com` · proyecto Pages `grupomccomics`
> Escrito el 2026-07-25 tras un incidente real. Cada trampa de aquí **ocurrió**.
> Reglas que aplican: R-042 (editar la fuente), R-044 (secretos), R-046 (0 regresión),
> R-006 (compuerta PASS/FAIL en vivo).

---

## 1. Qué se despliega y desde dónde

| | |
|---|---|
| Fuente (se edita) | `McComics\Paginas Webs\Pagina Web McComicsUp®\GrupoMcComics_Main\` |
| Paquete (generado) | `_deploy\` — **producto, nunca se edita a mano** (R-042) |
| Functions | `functions\` en la **raíz del proyecto**, NO dentro de `_deploy\` |
| Proyecto Pages | `grupomccomics` |
| Rama de producción | **`main`** |
| Credenciales | `MIS APIS y TOKENS\CloudFlare\` (R-044: no imprimir, no commitear) |

## 2. Procedimiento

```bash
cd "C:\Users\McComics\McComics\Paginas Webs\Pagina Web McComicsUp®"

export CLOUDFLARE_API_TOKEN=$(tr -d ' \r\n' < "…/MIS APIS y TOKENS/CloudFlare/Your API Token.txt")
export CLOUDFLARE_ACCOUNT_ID=$(tr -d ' \r\n' < "…/MIS APIS y TOKENS/CloudFlare/Account ID.txt")

rm -rf _deploy && cp -r GrupoMcComics_Main _deploy
rm -rf _deploy/.wrangler _deploy/mccomicsup/.wrangler
find _deploy -name "*.rbz" -delete        # los binarios NUNCA son públicos

npx wrangler pages deploy _deploy --project-name=grupomccomics --branch=main
```

Señales de que fue bien en la salida: `Uploading _headers` y **`Uploading Functions bundle`**.
Si no aparece la segunda, las Functions no se compilaron (ver trampa 3.4).

## 3. Trampas verificadas — todas ocurrieron de verdad

### 3.1 Pages devuelve **200** para rutas que no existen
No devuelve 404: sirve el `index.html` del sitio con **200 OK**.

Consecuencias reales:
- Las 7 subpáginas del menú estaban rotas y parecían funcionar.
- El `.rbz` "se descargaba" y era un HTML de 26 KB (`unzip`: *not a zipfile*).

**Verificar siempre por md5 y content-type, JAMÁS por el código de estado:**
```bash
curl -s URL | md5sum          # si coincide con la portada, la ruta NO existe
curl -sLI URL | grep -i content-type   # un .css que devuelve text/html es un 404 disfrazado
```

### 3.2 `curl` sin `-L` miente
Pages redirige `/pagina.html` → `/pagina` con **308**. Sin `-L`, `%{size_download}` da `0`
y parece una página vacía. Durante la auditoría se dio por rota una página que estaba bien.
**Usa siempre `-L`.**

### 3.3 La rama de producción es `main`
Sin `--branch=main`, wrangler usa el nombre de la rama git local (`master`) y crea un
**deployment de *preview*** — con un mensaje de éxito idéntico. El dominio sigue sirviendo
lo viejo. Consultar la rama real:
```bash
curl -s ".../pages/projects/grupomccomics" -H "Authorization: Bearer $TOKEN" \
  | grep -o '"production_branch":"[^"]*"'
```

### 3.4 `functions/` va en la raíz del proyecto, no dentro del directorio de assets
Si está dentro de `_deploy/`, wrangler la sube como **archivo estático** y la ruta `/api/...`
cae al fallback. La estructura correcta:
```
Pagina Web McComicsUp®/
├── functions/api/download/[slug].js   ← aquí
└── _deploy/                            ← sólo assets
```

### 3.5 Sin `_headers` no hay NINGUNA cabecera de seguridad
Pages no aplica HSTS, CSP ni X-Frame-Options por defecto, y sirve
`Access-Control-Allow-Origin: *`. El archivo va en la **raíz del paquete**; en una
subcarpeta se ignora en silencio. Para quitar una cabecera que Pages añade sola:
```
/*
  ! Access-Control-Allow-Origin
```
Si añades un CDN al HTML, **añádelo también al CSP** o el navegador lo bloquea sin avisar.

### 3.6 Un nivel de carpeta de más rompe el sitio entero, en silencio
Los archivos estaban en `mccomicsup/mccomicsup/producto/` y el menú apuntaba a
`mccomicsup/producto/`. Con la trampa 3.1, todo devolvía 200. **Comprueba que la
profundidad de la carpeta coincide con la de los `href`.**

### 3.7 Si mueves carpetas, arregla los `../` de dentro
Al subir las subpáginas un nivel, sus `../../shared/enterprise.css` pasaron a apuntar
fuera del sitio: todas las páginas quedaron sin estilos y el login muerto.
**Las rutas relativas no se mueven solas.** Prefiere rutas absolutas (`/mccomicsup/...`).

### 3.8 Antes de borrar un "duplicado", compara el CONTENIDO
`mccomicsup/shared/` contenía `auth.js`, que la otra copia no tenía. Se borró como
duplicado y se perdió el login. Se recuperó de Git.

### 3.9 Nunca `perl -e "..."` con comillas dobles sobre HTML
Perl interpola `@supabase` y `@2` como **arrays vacíos**:
```
https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2   →   https://cdn.jsdelivr.net/npm//supabase-js
```
Sin SDK no hay login, ni Google, ni captcha. Usa comillas simples o `sed`.

### 3.10 Lo que hay en disco NO es lo que está publicado
La portada en producción no existía en ningún archivo local. **Antes de sustituir
contenido, rescata lo que está vivo:**
```bash
mkdir -p _produccion_rescatada_$(date +%F)
curl -s https://grupomccomics.com/ -o _produccion_rescatada_$(date +%F)/index.html
```

### 3.11 `.wrangler/cache/pages.json` recuerda el proyecto
Había dos proyectos y dos cachés en el mismo árbol: según la carpeta desde la que
lanzaras el deploy, publicabas en uno u otro. **Usa siempre `--project-name` explícito**
y excluye `.wrangler/` del paquete.

### 3.12 Un API token de **cuenta** falla en `/user/tokens/verify`
Devuelve `"Invalid API Token"` aunque sea válido: ese endpoint sólo acepta tokens de
usuario. No concluyas que caducó; pruébalo contra un recurso real. Además, el token del
panel y la sesión OAuth de `wrangler login` son cosas distintas: que expire la segunda
no invalida el primero.

## 4. Compuerta PASS/FAIL obligatoria (R-006)

```bash
# 1. Cabeceras de seguridad presentes
curl -sI https://grupomccomics.com/ | grep -iE "strict-transport|content-security|x-frame"

# 2. Las subpáginas son DISTINTAS entre sí (si se repiten, es el fallback)
for p in producto precios legal soporte casos activacion mccomicsup3d; do
  echo -n "$p: "; curl -sL "https://grupomccomics.com/mccomicsup/$p/" | md5sum
done

# 3. La descarga sigue cerrada
curl -s -o /dev/null -w "%{http_code}\n" https://grupomccomics.com/api/download/disenador-basico
# esperado: 401

# 4. Ningún .rbz público
curl -sLI "https://grupomccomics.com/mccomicsup/assets/downloads/…/*.rbz" | grep -i content-type
# esperado: text/html (es decir, no existe)
```

Nada se declara terminado sin estos cuatro en verde.

<!-- sistema: ThingForce™ McComics | Playbook Deploy 1/4 | creado: 2026-07-25 -->
