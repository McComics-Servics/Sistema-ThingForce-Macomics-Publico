# PLAYBOOK DEPLOY · Parte 2 — App web y motor (VPS Hetzner)

> `app.grupomccomics.com` · VPS `167.233.26.174` (`mccomics-staging-1`)
> Reglas: **R-043 (SSH: un solo intento)**, R-040 (nunca borrar `.git`),
> R-042 (editar la fuente, nunca `dist`), R-047 (overlay mínimo), R-006 (PASS/FAIL).
> Procedimiento detallado y probado:
> `MIS APIS y TOKENS\PROYECTO_McComicsUp_AppWeb_…\_CONTINUIDAD_NEGOCIO_2026-07-03\01_DEPLOY_APP_WEB_Y_CORE_PLAYBOOK.md`

---

## 1. Infraestructura

| Contenedor | Rol | Puerto interno |
|---|---|---|
| `msls-nginx` | Reverse proxy + TLS de todo | 80/443 público |
| `mccomics-web` | App web (React + server tsx) | 8787 |
| `mccomics-core` | Motor Go | 8080 |
| `msls-app` | Servidor de licencias MSLS | 3000 |
| `msls-postgres` | DB de licencias | 5432 |
| `msls-redis` | Caché de licencias | 6379 |

Dominios (Cloudflare → nginx): `app.` → `mccomics-web:8787` ·
`motor.` → `mccomics-core:8080` · `licencias.` → `msls-app:3000`.

Layout: `/opt/mccomics-web/` con `current -> releases/<tag>` y `.env` (600, owner `deploy`).

## 2. ⚠️ SSH: patrón anti-baneo (R-043)

**fail2ban banea 10 minutos tras varios fallos de AUTH.** Un *timeout* de red NO cuenta
como fallo; una clave equivocada SÍ. **Regla de oro: si la primera auth falla, un intento
más como máximo y DETENERSE.**

```bash
ssh -i ~/.ssh/msls_deploy_ed25519 \
    -o IdentitiesOnly=yes \
    -o BatchMode=yes \
    -o ConnectTimeout=15 \
    deploy@167.233.26.174 'whoami; hostname'
# Esperado: deploy / mccomics-staging-1
```

- `IdentitiesOnly=yes` → ofrece **una sola** clave = **un solo** intento de auth.
  Sin esta opción, el agente ofrece todas las claves y **cada una cuenta como fallo**:
  es la forma más rápida de que fail2ban te banee.
- `BatchMode=yes` → falla rápido en vez de colgarse pidiendo contraseña.
- El puerto 22 está **restringido por IP**. Si tu IP no está permitida da *timeout*
  (no es baneo, no es fallo de auth). Un timeout no se reintenta en ráfaga: se resuelve
  añadiendo la IP.
- Claves de respaldo: `…\_CONTINUIDAD_NEGOCIO_2026-07-03\claves_ssh\`.

## 3. Procedimiento de deploy

```bash
# 1. Compilar en local (R-046: cero regresión antes de subir)
npm run build
node --check server/mccomics-web-server.ts 2>/dev/null || npx tsc --noEmit

# 2. Subir SOLO el overlay (R-047). Los assets pesados se heredan con cp -al.
TAG=$(date +%Y%m%d-%H%M)
ssh … deploy@167.233.26.174 "mkdir -p /opt/mccomics-web/releases/$TAG"
scp -r dist/*        deploy@167.233.26.174:/opt/mccomics-web/releases/$TAG/
scp -r server/*      deploy@167.233.26.174:/opt/mccomics-web/releases/$TAG/server/
scp package*.json tsconfig.json deploy@167.233.26.174:/opt/mccomics-web/releases/$TAG/

# 3. Reconstruir imagen, mover el symlink y reiniciar
ssh … deploy@167.233.26.174 "cd /opt/mccomics-web/releases/$TAG && \
  sudo docker build -t mccomics-web:$TAG . && \
  ln -sfn /opt/mccomics-web/releases/$TAG /opt/mccomics-web/current && \
  sudo docker rm -f mccomics-web && \
  sudo docker run -d --name mccomics-web --network docker_msls-network \
     --env-file /opt/mccomics-web/.env mccomics-web:$TAG"
```

`deploy` tiene `sudo` sin contraseña. **Nunca** hagas `git reset --hard` ni borres `.git`
en el VPS (R-040).

## 4. Trampas

- **`.env` vive en el VPS, no en el repo** (R-044). Si añades una variable, hay que
  añadirla allí *y* al `--env-file`, o el contenedor arranca sin ella y falla en runtime.
- **El symlink `current` es el que manda.** Si construyes la imagen pero no mueves el
  symlink, sigues sirviendo el release anterior — sin ningún error visible.
- **Editar `dist` no sirve de nada** (R-042): el siguiente build lo pisa. Se edita `src/`.
- **`/api/licenses/status` devuelve `reason`, no `status`.** Confundirlos ya rompió el
  plugin: `res['status']` daba siempre `nil` y bloqueaba a usuarios con licencia válida.
- **El firewall sólo deja 80/443 desde IPs de Cloudflare.** Probar el origin directo por IP
  da timeout: no es que el servicio esté caído.

## 4.b ⚠️ Incidente real 2026-07-25 — overlay que tumbó la app

**Qué pasó:** deploy por overlay sustituyendo sólo `server/mccomics-web-server.ts`.
El contenedor entró en bucle de reinicio con:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'cors' imported from /app/server/…
```

**Causa:** el archivo local importaba `cors`, pero el `package.json` **del release
desplegado** no lo declaraba. El código local llevaba meses por delante de producción
y nada lo avisaba. Caída ~1 minuto hasta el rollback.

**Reglas que salen de aquí:**

1. **Antes de un overlay, comparar con lo que hay desplegado:**
   ```bash
   ssh … 'cat /opt/mccomics-web/current/server/mccomics-web-server.ts' > /tmp/desplegado.ts
   diff /tmp/desplegado.ts server/mccomics-web-server.ts | head -40
   ```
2. **Si el cambio añade dependencias, sube también `package.json` y `package-lock.json`.**
   Comprobar antes: `npm ci --dry-run` (el lock debe estar sincronizado).
3. **Probar la imagen en un contenedor desechable ANTES de mover el symlink:**
   ```bash
   sudo docker run -d --name mccomics-web-prueba --network docker_msls-network \
        --env-file /opt/mccomics-web/.env mccomics-web:$TAG
   sudo docker logs mccomics-web-prueba | tail
   sudo docker exec mccomics-web-prueba wget -qO- http://127.0.0.1:8787/plugin/activar | head -c 100
   sudo docker rm -f mccomics-web-prueba
   ```
   Sólo entonces promover. Esto habría evitado la caída por completo.
4. **Rollback (memorízalo):**
   ```bash
   ANT=<release-anterior>
   ln -sfn /opt/mccomics-web/releases/$ANT /opt/mccomics-web/current
   sudo docker rm -f mccomics-web
   sudo docker run -d --name mccomics-web --restart unless-stopped \
        --network docker_msls-network --env-file /opt/mccomics-web/.env mccomics-web:$ANT
   ```
   Las imágenes antiguas siguen en el host: el rollback es inmediato.

## 5. Compuerta PASS/FAIL (R-006)

```bash
curl -sI https://app.grupomccomics.com/ | grep -iE "strict-transport|content-security"
curl -s -o /dev/null -w "%{http_code}\n" https://app.grupomccomics.com/api/licenses/status
# esperado: 401 sin token (si da 200, la API quedó abierta)
ssh … deploy@167.233.26.174 "sudo docker ps --format '{{.Names}}\t{{.Status}}'"
```

<!-- sistema: ThingForce™ McComics | Playbook Deploy 2/4 | creado: 2026-07-25 -->
