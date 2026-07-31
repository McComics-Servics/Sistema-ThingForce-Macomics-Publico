# 🔐 SKILL: CIBERSEGURIDAD Y RENDIMIENTO DE SERVIDORES

## Marco operativo para VPS, Docker, reverse proxy, bases de datos, relay QR y publicación pública segura

### Versión 1.0 — Capa técnica para infraestructura pública McComics

---

## 1. PROPÓSITO

Esta skill define cómo decidir, endurecer y desplegar infraestructura pública para McComics sin confundir proveedor, software, seguridad y rendimiento.

Aplica cuando la tarea involucra:

- VPS o proveedor cloud
- Docker Compose, nginx o reverse proxy
- PostgreSQL, Redis, backups o restauración
- Cloudflare como edge, DNS, WAF, TLS o relay QR
- servidor público de licencias
- publicación comercial real de web, pagos y activaciones

---

## 2. REGLA MADRE

En McComics, la salida pública segura NO se decide por el nombre del proveedor sino por encaje real de arquitectura.

- Cloudflare sirve muy bien para edge, DNS, WAF, TLS, cache y relay QR.
- Un servidor Node/Fastify con PostgreSQL y Redis sigue necesitando un origen persistente tipo VPS o equivalente.
- Docker Compose es la ruta por defecto cuando el stack ya existe en contenedores.
- La instalación manual solo se acepta para diagnóstico puntual o emergencia controlada.

---

## 3. SEPARACIÓN DE CAPAS

### 3.1 Edge

- DNS y proxy en Cloudflare
- TLS y WAF en el borde
- Workers y Durable Objects para flujos ligeros, webhook edge y relay QR

### 3.2 Origin

- Ubuntu LTS mínimo y actualizado
- nginx o reverse proxy equivalente
- app Node/Fastify aislada en contenedor
- puertos públicos mínimos y controlados

### 3.3 Data

- PostgreSQL y Redis separados
- sin exposición pública directa
- volúmenes persistentes
- backup automático y prueba real de restore

### 3.4 Trust

- llaves privadas de release fuera del VPS de aplicación
- llaves de licencias separadas de llaves de release
- firmante externo o entorno de firma separado del build machine

---

## 4. DECISIONES POR DEFECTO

1. Preferir Docker Compose sobre instalación manual.
2. Preferir Cloudflare + VPS antes que reescribir todo a serverless por moda.
3. Preferir un solo VPS bien endurecido en fase 1 antes que microservicios prematuros.
4. Preferir separar relay QR y licensing server aunque compartan dominio.
5. Preferir staging real antes de producción pública.

---

## 5. HARDENING MÍNIMO NO NEGOCIABLE

- SSH por llave; sin login por contraseña
- usuario operador no root
- firewall deny-by-default
- fail2ban o control equivalente
- secretos fuera del repo y fuera de las imágenes Docker
- logs sin tokens ni passwords y con rotación
- healthchecks por servicio
- backups automáticos y restore drill
- PostgreSQL y Redis no expuestos a Internet
- TLS válido cuando el origen quede expuesto

---

## 6. RENDIMIENTO MÍNIMO NO NEGOCIABLE

- límites razonables de CPU y RAM por contenedor
- nginx con compresión, timeouts y cabeceras coherentes
- Redis para cache, colas ligeras o rate limiting; no como base principal
- índices y queries de PostgreSQL revisados antes de culpar al proveedor
- rutas interactivas separadas de tareas batch pesadas
- monitoreo de CPU, RAM, disco, latencia, errores 5xx, colas y tiempo de respuesta DB

---

## 7. MATRIZ DE DECISIÓN DE PROVEEDOR

### Cloudflare

- usar para DNS, WAF, proxy, certificados y relay QR
- no tratarlo como sustituto automático de un VPS general si el stack necesita estado persistente

### Clouding

- usar cuando conviene equilibrio entre costo, IP fija, backups, snapshots y operación simple

### Hetzner

- usar cuando prima precio/rendimiento bruto y aceptas una operación más genérica

### DigitalOcean

- usar cuando priorizas más servicios gestionados y aceptas mayor costo mensual

---

## 8. ANTI-PATRONES

- publicar PostgreSQL o Redis en IP pública
- instalar todo manualmente y luego no poder reconstruirlo
- mezclar la private key de firma con el mismo VPS de aplicación
- empujar el licensing server actual a Workers solo por moda
- subir web, app, DB y colas sin backup ni restore test
- declarar producción lista sin prueba end-to-end de compra, licencia, activación y QR

---

## 9. CHECKLIST CORTO

- [ ] edge y origin están separados conceptualmente
- [ ] el origen puede recrearse con pasos repetibles
- [ ] PostgreSQL y Redis no están públicos
- [ ] existe backup automático y restore probado
- [ ] Cloudflare protege el borde y no sustituye capas que faltan
- [ ] el relay QR no se confunde con el licensing server
- [ ] la firma externa sigue fuera del servidor
- [ ] hay staging antes de producción
