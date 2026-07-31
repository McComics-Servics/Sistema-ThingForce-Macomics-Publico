# PLAYBOOK DEPLOY McComics — índice

> **Entrada única para cualquier despliegue.** Si vas a publicar algo de McComics,
> empieza aquí y carga SOLO la parte que aplique.
> Creado 2026-07-25 tras un incidente real de varios días. Cada trampa documentada **ocurrió**.

## Partes

| Parte | Cubre | Cuándo la cargas |
|---|---|---|
| [01 — Web pública (Cloudflare Pages)](PLAYBOOK_DEPLOY_01_WEB_PUBLICA_CLOUDFLARE_PAGES.md) | `grupomccomics.com`, `_headers`, Functions, KV | Publicar la web, tocar páginas, cabeceras o rutas |
| [02 — App web y motor (VPS)](PLAYBOOK_DEPLOY_02_APP_WEB_VPS.md) | `app.grupomccomics.com`, Docker, nginx, **SSH anti-baneo** | Tocar la app, la API de licencias o el motor Go |
| [03 — Plugin `.rbz` y licencias](PLAYBOOK_DEPLOY_03_PLUGIN_RBZ_Y_LICENCIAS.md) | Compilador, validador, KV, modelo de licencias | Compilar o publicar un plugin |

## Las 6 leyes que resumen todo

1. **Un `200` no significa que exista.** Cloudflare Pages sirve el `index.html` para
   rutas inexistentes. Verifica por **md5 y content-type**, nunca por código de estado.
2. **`curl` sin `-L` miente.** Pages redirige `.html` con `308`.
3. **Despliega con `--branch=main`.** Sin el flag creas un *preview* con mensaje de éxito idéntico.
4. **`ruby -c` no valida el runtime del plugin** (vive en un heredoc). Confía en
   `validate_generated_runtime!`.
5. **SSH: `IdentitiesOnly=yes` y un solo intento** (R-043). Sin esa opción el agente
   ofrece todas tus claves y cada una cuenta como fallo ante fail2ban.
6. **Cero secretos en el código** (R-010). Configuración pública a un archivo de config;
   secretos al vault y a variables de entorno.

## Compuerta PASS/FAIL mínima antes de decir "listo" (R-006)

```bash
curl -sI https://grupomccomics.com/ | grep -iE "strict-transport|content-security|x-frame"
curl -s -o /dev/null -w "%{http_code}\n" https://grupomccomics.com/api/download/disenador-basico   # 401
curl -s -o /dev/null -w "%{http_code}\n" https://app.grupomccomics.com/api/licenses/status         # 401
for p in producto precios legal soporte casos; do curl -sL "https://grupomccomics.com/mccomicsup/$p/" | md5sum; done  # 5 md5 distintos
```

## Proyecto relacionado

Plan y estado vivo: `Planes Nuevos/Pagina Web McComicsUp/`.
Código y documentación operativa: `McComics\Paginas Webs\Pagina Web McComicsUp®\`
(repos privados `mccomics-web-plataforma` y `mccomics-compilador-licencias`).

<!-- sistema: ThingForce™ McComics | Playbook Deploy 0/4 índice | creado: 2026-07-25 -->
