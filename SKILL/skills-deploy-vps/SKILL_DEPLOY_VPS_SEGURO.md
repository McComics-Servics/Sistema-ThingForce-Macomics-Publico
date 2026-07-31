# 🚀 SKILL: DEPLOY SEGURO A VPS (SSH + DOCKER + FIREWALL + CERTBOT)

## Marco de Ejecución Resistente y Diagnóstico Forense de Primeros Deploys en Servidores Linux

### Versión 1.0 — Derivada del primer deploy real de MSLS (McComics Secure Licensing Server) en Hetzner Ubuntu 26.04, junio 2026

---

## 1. PROPÓSITO

Codifica los aprendizajes de un primer deploy real que se cortó 3 veces y escondía **4 bugs distintos**. Aplica a cualquier `deploy_vps.sh` / `first-deploy.sh` que: entra por SSH, instala paquetes, toca el firewall (UFW), clona un repo privado, genera `.env`, emite TLS con certbot, construye imágenes Docker y corre migraciones + seed interactivo.

Regla madre: **EVIDENCIA antes que diagnóstico.** Un diagnóstico previo (propio o de otro agente) puede ser correcto pero incompleto. En este caso un agente culpó solo a UFW; era 1 de 4 fallas encadenadas.

---

## 2. LAS 4 FALLAS CANÓNICAS (matriz de referencia)

| # | Síntoma observable | Causa raíz | Fix |
|---|---|---|---|
| 1 | `Connection closed` justo después de un comando de firewall; el script queda a medias y `/opt/app` no se crea | El deploy corre **en primer plano de la sesión SSH**; `ufw default deny incoming` / `ufw --force enable` recarga el firewall y tira la conexión → SIGHUP mata el proceso | **Desacoplar de la sesión SSH**: tmux / `nohup setsid` / `systemd-run`, con log |
| 2 | `fatal: remote error:` + línea en blanco + `is not a valid repository name`; exit **128** | `\r` (CRLF de Windows) al final del valor `--repo` del script. El `\r` se manda como parte del nombre del repo; al imprimir el error, el `\r` borra el nombre | `sed -i 's/\r$//' script.sh`. Detectar con `cat -A` (muestra `^M$`) |
| 3 | El script muere sin mensaje claro tras un pipeline; exit **141** (=128+13 = SIGPIPE); **no determinista** | Bajo `set -Eeuo pipefail`, un pipeline con cierre temprano (`\| awk '...exit'`, `\| grep -q`, `\| head -1`) manda SIGPIPE al productor. En una asignación `VAR="$(...)"`, `set -e` aborta el script | `VAR="$(pipeline \|\| true)"` (el productor ya imprimió lo necesario), o awk que lea hasta EOF: `awk '/re/{v=$2} END{print v}'` |
| 4 | `WARN "X" variable is not set` + `invalid spec: :/ruta:ro: empty section between colons`; exit 1 | `docker compose` se invoca **sin `--env-file .env`**, así que la interpolación `${VAR}` del compose queda vacía. `env_file:` del YAML solo inyecta al contenedor, **no** al parse del compose | `docker compose --env-file .env -f docker/docker-compose.yml ...` en **todas** las invocaciones |

---

## 3. PATRÓN DE EJECUCIÓN RESISTENTE (OBLIGATORIO PARA PRIMEROS DEPLOYS)

Nunca correr un deploy largo (firewall + certbot + build Docker + migraciones) en el primer plano de un `ssh "sudo bash script.sh"`. Cualquier reload de firewall, blip de red o timeout lo mata a la mitad.

### 3.1 Lanzar en tmux con captura a log

```bash
tmux kill-session -t dep 2>/dev/null || true
: > /var/log/app-deploy.log
tmux new-session -d -s dep
tmux pipe-pane -o -t dep 'cat >> /var/log/app-deploy.log'   # captura SALIDA del pane (no las teclas)
tmux send-keys -t dep 'bash /root/deploy.sh; echo EXIT=$?' Enter
```

- Si la sesión SSH se cae, el deploy **sigue vivo** en tmux. Se reconecta con `ssh -tt ... "sudo tmux attach -t dep"`.
- `pipe-pane` registra la salida para monitoreo remoto sin tty: `sudo tail -n 40 /var/log/app-deploy.log`.
- Para ver el estado vivo (prompts incluidos): `tmux capture-pane -t dep -p`.

### 3.2 Contraseñas interactivas (seed admin)

El paso seed suele usar `read -s -p`. En modo desacoplado:
- Con tmux: el usuario **se reconecta y la escribe en vivo en el pane**. `read -s` no hace eco y `pipe-pane` solo captura salida → la contraseña **nunca** queda en el log ni en el chat.
- Nunca pasar la contraseña por argumento, por env loggeable, ni pedirla en el chat.

### 3.3 Lectura de exit codes

| Exit | Significado | Dónde mirar |
|---|---|---|
| 128 | `git fatal` | URL del repo (CRLF), llave/known_hosts, rama |
| 141 | SIGPIPE | pipeline con cierre temprano bajo `pipefail` |
| 1 | error genérico de la app/compose | última línea útil del log |
| 0 | éxito | el script imprime su mensaje final de éxito |

---

## 4. REGLAS DE ORO PARA ESCRIBIR / CORREGIR SCRIPTS DE DEPLOY

1. **Nunca CRLF** en scripts que corren en Linux. Si se generan desde Windows (PowerShell here-strings, editores), validar con `cat -A` y normalizar con `sed -i 's/\r$//'`. Esto incluye los here-strings enviados por `ssh "bash -s"`: no terminar líneas con un token ejecutable (`|| true`) porque `\r` lo convierte en `true\r: command not found`.
2. **Bajo `set -Eeuo pipefail`**, todo `$(pipeline)` con cierre temprano necesita `|| true` o un consumidor que lea hasta EOF. Auditar `| head`, `| grep -q`, `| grep -m`, `| awk '...exit'`.
3. **`docker compose` siempre con `--env-file .env`** cuando el compose usa `${VAR}`. Mismo criterio en CI y en el instalador; no arreglar uno y olvidar el otro.
4. **Orden firewall**: aplicar `allow <ssh-port>/tcp` **antes** de `default deny incoming`, y nunca `ufw --force enable` mientras dependés de esa sesión SSH; o desacoplar (regla 3).
5. **Idempotencia**: el deploy debe poder reintentarse. Guardas: `.env` solo si no existe, cert solo si falta, `.seeded` marker, clone vs `fetch + merge --ff-only`.
6. **El fix durable va en el repo** (commit + push a la rama que el deploy clona), no como parche en `/tmp`. Validar `bash -n` antes de pushear.

---

## 5. PROTOCOLO DE DIAGNÓSTICO FORENSE (lectura primero)

1. Leer el **script real** que se ejecuta (a veces un wrapper llama a otro: `cat /root/deploy.sh`). No asumir que es el del repo.
2. `cat -A` del wrapper → detectar `^M$` (CRLF).
3. Estado real del servidor (read-only) antes de tocar: `ls -ld /opt/app`, `ufw status verbose`, `systemctl is-active`, `docker ps -a`, `getent ahostsv4 <dominio>`, `df -h /`.
4. Relanzar **instrumentado y desacoplado** (tmux + log); leer el `EXIT=` y la última línea útil.
5. Confirmar la causa con una prueba mínima aislada (ej. correr el mismo `git ls-remote` a mano) antes de declarar la causa.
6. Una falla a la vez: corregir, revalidar, avanzar.

---

## 6. VERIFICACIÓN END-TO-END (no declarar "hecho" sin esto)

- Health **externo** (desde otra máquina, no solo localhost): `curl -s -o NUL -w "%{http_code}" https://dominio/api/health` → 200 + TLS válido + cuerpo correcto.
- Marker de seed creado; migraciones aplicadas; contenedores `healthy`.
- Timer/servicio de auto-recuperación `active` + `enabled`.
- Commit del checkout instalado == rama corregida.
- Distinguir 404 **por diseño** (vhost que `return 404` en raíz y solo sirve rutas concretas) de un 404 por fallo.

---

## 7. ANTI-PATRONES

| # | Anti-patrón | Consecuencia |
|---|---|---|
| 1 | Correr deploy largo en primer plano de SSH | Un reload de firewall lo mata a la mitad |
| 2 | Crear scripts de servidor con CRLF | Errores fantasma de git/bash difíciles de leer |
| 3 | `$(cmd \| grep -q ...)` bajo `set -e pipefail` | Aborto no determinista por SIGPIPE |
| 4 | `docker compose` sin `--env-file` con `${VAR}` | Volúmenes/redes vacíos, `invalid spec` |
| 5 | Creer el diagnóstico previo sin verificar | Se arregla 1 de N fallas y el deploy sigue cortando |
| 6 | Parchar solo en `/tmp` y no en el repo | El próximo deploy / GitHub Actions re-rompe |
| 7 | Pedir/loggear la contraseña admin | Fuga de secreto |

---

<!-- sistema: ThinkForce™ McComics | archivo: SKILL_DEPLOY_VPS_SEGURO.md | creado: 2026-06-27 | origen: deploy real MSLS Hetzner -->
