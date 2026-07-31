SKILL MCCOMICS® — PUBLICACIÓN SEGURA DE PLUGIN EN GITHUB
Versión: 1.0
Autor: McComics Servicios Generales
Marca: McComics®

OBJETIVO GENERAL

Crear una arquitectura profesional para publicar plugins McComics® en GitHub usando dos repositorios:

1. Un repositorio público tipo vitrina, preparado para ganar estrellas, mostrar autoridad, atraer usuarios, presentar el producto y publicar documentación.
2. Un repositorio privado donde vive el código fuente real, el core del plugin, la lógica sensible, el sistema de licencia, los scripts internos y la estructura comercial protegida.

La finalidad es que el proyecto McComics® pueda verse profesional, confiable y atractivo públicamente, sin exponer el código fuente completo ni regalar la lógica comercial del plugin.

REGLA MCCOMICS® — PASO OBLIGATORIO SUPREMO

Antes de crear cualquier despiece, plugin, lógica, cálculo, manual, documentación técnica, flujo de publicación, repositorio, sistema de licencia, estructura de carpetas, script, build, instalador, release o código, se debe ejecutar primero una revisión estricta, completa y detallada de todas las reglas McComics® almacenadas en memoria.

Este paso es obligatorio, preponderante, no opcional, no saltable y debe anteceder a cualquier ejecución.

Si alguna instrucción está ambigua, incompleta o puede afectar seguridad, arquitectura, compatibilidad, propiedad intelectual o distribución comercial, se debe advertir antes de avanzar y proponer la solución más profesional, práctica y segura.

REGLA PRINCIPAL DE SEGURIDAD

Nunca publicar en el repositorio público:

- Código fuente completo del plugin.
- Algoritmos sensibles.
- Sistema de licencias.
- Claves API.
- Tokens.
- Archivos .env.
- Endpoints privados.
- Scripts internos de compilación.
- Lógica comercial crítica.
- Validadores de licencia.
- Archivos de configuración privada.
- Notas internas.
- Automatizaciones privadas.
- Código Ruby sin protección que revele el funcionamiento completo del plugin.
- Cualquier archivo que permita copiar, clonar o reconstruir el producto completo.

El repositorio público debe vender la idea, no entregar el motor.

ARQUITECTURA OBLIGATORIA

1. REPOSITORIO PÚBLICO — VITRINA COMERCIAL

Nombre recomendado:

McComicsUp-Suite-Pro-IA

Este repositorio debe ser público y estar diseñado para ganar estrellas en GitHub.

Contenido permitido:

- README.md profesional.
- Capturas del plugin.
- GIFs o videos demo.
- Roadmap público.
- Changelog público.
- Documentación de instalación.
- Documentación de funciones.
- Preguntas frecuentes.
- Explicación comercial del producto.
- Casos de uso.
- Imágenes de interfaz.
- Enlaces a WhatsApp, web o canal oficial.
- Landing page con GitHub Pages.
- Releases demo o instaladores controlados.
- Aviso de software propietario McComics®.
- Licencia restrictiva.
- Información de soporte.
- Información del autor.

Estructura recomendada:

McComicsUp-Suite-Pro-IA/
│
├── README.md
├── CHANGELOG.md
├── ROADMAP.md
├── LICENSE.md
├── SECURITY.md
├── SUPPORT.md
│
├── docs/
│   ├── instalacion.md
│   ├── funciones.md
│   ├── capturas.md
│   ├── preguntas-frecuentes.md
│   └── casos-de-uso.md
│
├── media/
│   ├── screenshots/
│   ├── gifs/
│   └── videos/
│
├── releases/
│   └── demo/
│
└── landing/
    └── index.html

Función del repo público:

- Presentar el plugin como producto profesional.
- Ganar estrellas.
- Mostrar credibilidad.
- Explicar qué problema resuelve.
- Atraer usuarios, clientes o colaboradores.
- Servir como página pública del proyecto.
- Documentar la existencia del producto sin revelar el core.
- Conectar hacia venta privada, descarga demo, web oficial o canal de WhatsApp.

El README público debe responder rápido:

- Qué es McComicsUp Suite Pro IA®.
- Qué problema resuelve.
- Para quién es.
- Qué funciones tiene.
- Qué lo diferencia.
- Cómo se ve.
- Cómo probar una demo.
- Cómo contactar a McComics Servicios Generales.
- Qué partes del proyecto son privadas.

Gancho recomendado para el README:

“McComicsUp Suite Pro IA® convierte diseños de muebles en SketchUp en despiece, presupuesto, optimización, presentación comercial y flujo técnico de producción en minutos.”

2. REPOSITORIO PRIVADO — CORE REAL DEL PLUGIN

Nombre recomendado:

McComicsUp-Suite-Pro-IA-Core

Este repositorio debe ser privado.

Contenido obligatorio:

- Código fuente real.
- Loader principal del plugin.
- Carpeta modular interna.
- Lógica de herramientas.
- UI real.
- Exportadores.
- Sistema de licencias.
- Scripts de build.
- Scripts de empaquetado RBZ.
- Tests.
- Documentación interna.
- Integraciones privadas.
- Configuración de servidor.
- Control de versiones real.
- Notas técnicas internas.

Estructura recomendada:

McComicsUp-Suite-Pro-IA-Core/
│
├── src/
│   ├── mccomics_suite_pro_ia.rb
│   └── mccomics_suite_pro_ia/
│       ├── main.rb
│       ├── version.rb
│       ├── core/
│       ├── ui/
│       ├── tools/
│       ├── exporters/
│       ├── licensing/
│       ├── assets/
│       ├── config/
│       └── helpers/
│
├── build/
│   ├── build_rbz.rb
│   ├── clean_dist.rb
│   └── prepare_release.rb
│
├── dist/
│
├── tests/
│
├── docs-internal/
│
├── private-notes/
│
├── licenses/
│
└── README_INTERNAL.md

Función del repo privado:

- Proteger el producto real.
- Mantener el código organizado.
- Generar releases.
- Crear RBZ.
- Validar licencias.
- Desarrollar nuevas versiones.
- Preparar la extensión para distribución profesional.
- Mantener control técnico sin exponer secretos.

REGLAS TÉCNICAS MCCOMICS®

Todo plugin, extensión o sistema McComics® debe cumplir:

- Usar siempre el sufijo McComics® cuando corresponda.
- Autor oficial: McComics Servicios Generales.
- Mantener compatibilidad con Windows, Linux y Mac cuando aplique.
- Mantener compatibilidad con SketchUp moderno.
- Usar APIs oficiales de SketchUp.
- Evitar contaminar el namespace global.
- Usar namespace propio, por ejemplo:

  McComics::SuiteProIA

- Evitar métodos globales innecesarios.
- Evitar variables globales innecesarias.
- Mantener código modular.
- Mantener código liviano.
- Mantener código documentado.
- Mantener código extensible.
- Manejar errores de forma robusta.
- Evitar dependencias innecesarias.
- Preparar estructura compatible con SketchUp Extension Warehouse.
- Usar loader principal más carpeta interna.
- No usar eval.
- No ejecutar código remoto descargado.
- No guardar claves maestras dentro del plugin.
- No incluir tokens dentro del RBZ.
- No exponer lógica sensible en archivos públicos.
- Preparar sistema de firma, empaquetado y distribución segura.

ESTRUCTURA TÉCNICA RECOMENDADA PARA SKETCHUP

Archivo raíz:

mccomics_suite_pro_ia.rb

Carpeta interna:

mccomics_suite_pro_ia/

Ejemplo:

mccomics_suite_pro_ia.rb
mccomics_suite_pro_ia/
    main.rb
    version.rb
    core/
    ui/
    tools/
    exporters/
    licensing/
    assets/
    helpers/

El archivo raíz solo debe cargar la extensión.

El core debe estar dentro de la carpeta interna.

El código debe organizarse por responsabilidades:

core/
- lógica principal.
- servicios internos.
- manejo de datos.
- validaciones.

ui/
- HtmlDialog.
- toolbar.
- menús.
- ventanas.
- assets visuales.

tools/
- herramientas SketchUp.
- comandos.
- operaciones sobre selección.
- funciones paramétricas.

exporters/
- CSV.
- Excel.
- JSON.
- reportes.
- despieces.
- presupuestos.

licensing/
- validación de licencia.
- comunicación con servidor.
- estado de activación.
- modo demo.
- control de funciones premium.

assets/
- iconos.
- logos.
- CSS.
- JS.
- imágenes.

helpers/
- utilidades.
- manejo de rutas.
- logs.
- conversión de unidades.
- validaciones.

REGLA DE REPOSITORIO PÚBLICO PARA GANAR ESTRELLAS

El repositorio público debe estar optimizado como producto, no como simple carpeta de código.

Debe incluir:

- Título fuerte.
- Descripción clara.
- Imagen principal.
- Capturas reales.
- GIF corto de funcionamiento.
- Beneficios concretos.
- Lista de funciones.
- Roadmap.
- Estado del proyecto.
- Botón o enlace a demo.
- Enlace a canal oficial.
- Información del autor.
- Aviso de core privado.
- Instrucciones para usuarios.
- Instrucciones para colaboradores, si aplica.
- Licencia clara.
- Soporte.
- Seguridad.

Texto recomendado para aclarar el core privado:

“El núcleo comercial de McComicsUp Suite Pro IA® es propietario y se mantiene en un repositorio privado. Este repositorio público funciona como vitrina oficial, documentación, roadmap, demos autorizadas y punto de distribución controlada.”

REGLA DE README PÚBLICO

El README.md debe tener esta estructura:

# McComicsUp Suite Pro IA®

Descripción corta:

Herramienta profesional para diseño, despiece, optimización, presupuesto y automatización de muebles en SketchUp.

## Qué es

Explicar que es una suite técnica para diseño interior, muebles de melamina, producción, despiece, presupuesto y automatización.

## Problema que resuelve

Explicar que reduce errores, acelera presupuestos, mejora presentación comercial y ayuda a producir muebles con más precisión.

## Funciones principales

- Diseño paramétrico de muebles.
- Despiece automático.
- Optimización de corte.
- Presupuesto de materiales.
- Exportación técnica.
- Presentación comercial.
- Integración con IA.
- Flujo para talleres.
- Flujo para diseñadores.
- Flujo para instaladores.

## Capturas

Agregar imágenes reales.

## Demo visual

Agregar GIF o video.

## Estado del proyecto

Indicar:

- Core privado.
- Documentación pública.
- Demo controlada.
- Desarrollo activo.
- Roadmap abierto.

## Instalación

Explicar solo instalación de versión demo o release autorizado.

## Licencia

Software propietario McComics®.

## Autor

McComics Servicios Generales.

## Contacto

Web, WhatsApp, correo o canal oficial.

REGLA DE RELEASES

Los releases públicos solo pueden incluir:

- Versión demo limitada.
- Instalador controlado.
- RBZ autorizado.
- Documentación pública.
- Archivos no sensibles.
- Ejemplos sin core privado.
- Videos o capturas.

Los releases públicos nunca deben incluir:

- Código fuente completo.
- Archivos internos.
- Scripts de build privados.
- Sistema real de licencia.
- Secretos.
- Endpoints internos sin protección.
- Archivos .env.
- Tokens.
- Lógica comercial crítica.

Nombre recomendado para releases:

McComicsUp_Suite_Pro_IA_Demo_v1.0.0.rbz
McComicsUp_Suite_Pro_IA_Installer_Demo_v1.0.0.rbz
McComicsUp_Suite_Pro_IA_Public_Docs_v1.0.0.zip

FLUJO PROFESIONAL DE BUILD

El flujo correcto debe ser:

Repo privado
↓
Desarrollo interno
↓
Pruebas
↓
Build RBZ
↓
Limpieza de archivos sensibles
↓
Validación de seguridad
↓
Generación de dist/
↓
Prueba en SketchUp limpio
↓
Release demo o comercial
↓
Publicación controlada en repo público, web o canal privado

El script de build debe:

- Limpiar temporales.
- Copiar solo archivos permitidos.
- Excluir .env.
- Excluir private-notes.
- Excluir docs-internal.
- Excluir scripts sensibles.
- Excluir tests internos si no son necesarios.
- Insertar número de versión.
- Generar RBZ.
- Guardar en dist/.
- Crear checksum si es necesario.
- Registrar fecha de build.
- Registrar versión.
- Evitar empaquetar secretos.

REGLA DE LICENCIA COMERCIAL

El plugin debe funcionar con un sistema de licencia seguro.

Flujo recomendado:

Usuario instala RBZ
↓
Plugin abre panel McComics®
↓
Usuario inicia sesión o pega licencia
↓
Plugin consulta servidor McComics®
↓
Servidor responde estado:
- activo
- demo
- vencido
- bloqueado
- sin conexión
↓
Plugin habilita o limita funciones

Reglas:

- Nunca guardar claves maestras en el plugin.
- Nunca dejar validación completamente local.
- Nunca depender de un simple booleano editable.
- Usar servidor para validar licencia.
- Guardar solo tokens temporales o estados limitados.
- Permitir modo demo controlado.
- Permitir expiración.
- Permitir bloqueo por licencia inválida.
- Manejar errores de conexión sin romper SketchUp.
- Mostrar mensajes claros al usuario.

REGLA DE ACTUALIZACIONES

Permitido:

- Verificar si existe nueva versión.
- Mostrar aviso al usuario.
- Abrir página oficial de descarga.
- Descargar instalador autorizado.
- Validar versión.
- Validar origen.
- Validar integridad.

Evitar:

- Descargar código Ruby remoto y ejecutarlo.
- Usar eval.
- Reemplazar archivos internos sin control.
- Ejecutar scripts remotos.
- Saltarse procesos de revisión.
- Crear auto-update inseguro.

Mensaje recomendado:

“Hay una nueva versión disponible de McComicsUp Suite Pro IA®. Descárgala desde la fuente oficial.”

REGLA DE GITHUB PAGES

El repo público puede incluir una landing page en GitHub Pages.

Uso recomendado:

- Presentar el plugin.
- Mostrar capturas.
- Mostrar beneficios.
- Mostrar demos.
- Enlazar descarga demo.
- Enlazar WhatsApp.
- Enlazar canal oficial.
- Mostrar roadmap.
- Mostrar botón para dar estrella en GitHub.

Estructura:

landing/
    index.html
    assets/
        css/
        js/
        img/

La landing no debe contener código sensible ni claves.

REGLA DE DOCUMENTACIÓN PÚBLICA

La documentación pública debe explicar uso y beneficios, pero no debe revelar arquitectura interna crítica.

Permitido:

- Manual de instalación.
- Manual de uso.
- Descripción de funciones.
- Capturas.
- Flujo de trabajo.
- Casos de uso.
- Preguntas frecuentes.
- Comparativas comerciales.
- Roadmap.
- Changelog público.

No permitido:

- Algoritmos internos completos.
- Código fuente.
- Lógica de licenciamiento.
- Estructura interna sensible.
- Diagramas de seguridad.
- Endpoints privados.
- Secretos.
- Procedimientos para saltarse restricciones.

REGLA DE MARCA

Todo el proyecto debe mantener identidad McComics®.

Nombre comercial:

McComicsUp Suite Pro IA®

Autor:

McComics Servicios Generales

Aviso sugerido:

© 2026 McComicsUp. Todos los derechos reservados.

Frase corporativa sugerida:

Servicios Generales McComics - Herramientas Técnicas para la Producción™

Estilo visual recomendado:

- Profesional.
- Técnico.
- Moderno.
- Premium.
- Enfocado en producción real.
- Orientado a diseño interior, melamina, despiece, optimización y presupuesto.

REGLA DE LICENCIA DEL REPO PÚBLICO

El repo público debe tener una licencia restrictiva si el producto es propietario.

Texto recomendado:

Este repositorio contiene documentación, material visual, demos autorizadas y archivos públicos del proyecto McComicsUp Suite Pro IA®. El núcleo comercial del software es propietario y no se distribuye como código abierto. Ningún contenido de este repositorio autoriza la copia, redistribución, ingeniería inversa o reproducción comercial del producto sin autorización escrita de McComics Servicios Generales.

REGLA PARA COLABORADORES

Si se aceptan colaboradores:

- No dar acceso al repo privado completo si no es necesario.
- Usar issues públicos para sugerencias.
- Usar discusiones públicas para ideas.
- Usar ramas privadas para desarrollo real.
- Dar acceso limitado solo cuando sea indispensable.
- Evitar compartir código sensible por chat.
- Evitar pegar claves o tokens.
- Separar tareas por módulos.

REGLA DE PRIVACIDAD Y SEGURIDAD

Antes de publicar cualquier archivo, verificar:

- Que no tenga claves API.
- Que no tenga tokens.
- Que no tenga correos privados innecesarios.
- Que no tenga rutas locales sensibles.
- Que no tenga datos de clientes.
- Que no tenga capturas con información privada.
- Que no tenga licencias reales.
- Que no tenga endpoints internos inseguros.
- Que no tenga archivos temporales.
- Que no tenga backups.
- Que no tenga .env.
- Que no tenga archivos .bak.
- Que no tenga zips internos.
- Que no tenga código antiguo sensible.

CHECKLIST ANTES DE PUBLICAR EN REPO PÚBLICO

Antes de subir cualquier archivo al repo público, revisar:

[ ] ¿Este archivo puede revelar el core?
[ ] ¿Este archivo contiene claves?
[ ] ¿Este archivo contiene tokens?
[ ] ¿Este archivo contiene lógica de licencia?
[ ] ¿Este archivo contiene código Ruby sensible?
[ ] ¿Este archivo contiene información de clientes?
[ ] ¿Este archivo contiene rutas locales privadas?
[ ] ¿Este archivo contiene configuraciones internas?
[ ] ¿Este archivo contiene datos comerciales privados?
[ ] ¿Este archivo contiene endpoints sin protección?
[ ] ¿Este archivo puede ayudar a copiar el producto?
[ ] ¿Este archivo realmente sirve para marketing, documentación o demo?

Si alguna respuesta representa riesgo, no publicar.

CHECKLIST DEL REPO PÚBLICO PROFESIONAL

[ ] README.md claro y atractivo.
[ ] Descripción corta fuerte.
[ ] Capturas profesionales.
[ ] GIF o video demo.
[ ] Roadmap público.
[ ] Changelog público.
[ ] Licencia restrictiva.
[ ] Soporte.
[ ] Seguridad.
[ ] Enlaces oficiales.
[ ] Aviso de core privado.
[ ] Landing GitHub Pages.
[ ] Demo controlada si aplica.
[ ] Botón o llamada para dar estrella.
[ ] Información de autor.
[ ] Marca McComics® correcta.

CHECKLIST DEL REPO PRIVADO

[ ] Código fuente completo.
[ ] Namespace correcto.
[ ] Estructura modular.
[ ] Loader principal.
[ ] Carpeta interna.
[ ] Sistema de licencia separado.
[ ] Build RBZ.
[ ] Dist separado.
[ ] Tests.
[ ] Documentación interna.
[ ] Exclusión de secretos.
[ ] .gitignore bien configurado.
[ ] Versionado.
[ ] Logs controlados.
[ ] Manejo de errores.
[ ] Compatibilidad SketchUp.
[ ] Preparación para firma/cifrado.
[ ] No exponer claves.

REGLA DE .GITIGNORE PARA REPO PRIVADO

El repo privado debe ignorar:

.env
*.log
*.tmp
*.bak
*.zip
private-notes/
docs-internal/secrets/
dist/private/
tokens/
credentials/
config/local_settings.rb
config/secrets.rb
*.key
*.pem
.DS_Store
Thumbs.db

REGLA DE NOMBRES

Repo público:

McComicsUp-Suite-Pro-IA

Repo privado:

McComicsUp-Suite-Pro-IA-Core

Archivo RBZ demo:

McComicsUp_Suite_Pro_IA_Demo_v1.0.0.rbz

Archivo RBZ comercial:

McComicsUp_Suite_Pro_IA_Pro_v1.0.0.rbz

Archivo principal:

mccomics_suite_pro_ia.rb

Carpeta interna:

mccomics_suite_pro_ia/

Namespace:

McComics::SuiteProIA

REGLA DE PRESENTACIÓN COMERCIAL

El repo público debe explicar el valor del plugin en términos de negocio:

- Ahorra tiempo.
- Reduce errores.
- Profesionaliza el despiece.
- Mejora presupuestos.
- Ayuda a vender proyectos.
- Mejora presentación comercial.
- Ayuda a talleres de melamina.
- Ayuda a diseñadores.
- Ayuda a instaladores.
- Centraliza flujo técnico.
- Prepara producción.

REGLA DE NO INVENTAR

Si falta información sobre:

- Nombre exacto del plugin.
- Dominio oficial.
- Tipo de licencia.
- Precio.
- Nivel de protección.
- Servidor disponible.
- Tipo de demo.
- Estado real del código.
- Compatibilidad final.
- Requisitos de Extension Warehouse.

No inventar.

Se debe indicar la duda y proponer opciones profesionales.

Sin embargo, si el usuario pide avanzar y la información no bloquea la arquitectura, se debe hacer una propuesta razonable y claramente marcada como recomendación.

PLAN DE IMPLEMENTACIÓN

FASE 1 — Crear repo público

Crear:

McComicsUp-Suite-Pro-IA

Agregar:

README.md
CHANGELOG.md
ROADMAP.md
LICENSE.md
SECURITY.md
SUPPORT.md
docs/
media/
landing/

Objetivo:

Crear vitrina pública profesional para ganar estrellas.

FASE 2 — Crear repo privado

Crear:

McComicsUp-Suite-Pro-IA-Core

Agregar:

src/
build/
dist/
tests/
docs-internal/
private-notes/
licenses/

Objetivo:

Mantener el código real protegido.

FASE 3 — Preparar README público

El README debe ser comercial, técnico y visual.

Debe incluir:

- Nombre del producto.
- Problema que resuelve.
- Funciones.
- Capturas.
- Demo.
- Estado del proyecto.
- Aviso de core privado.
- Instalación demo.
- Licencia.
- Autor.
- Contacto.

FASE 4 — Preparar build interno

Crear script:

build/build_rbz.rb

Debe generar RBZ desde el repo privado, excluyendo archivos sensibles.

FASE 5 — Preparar demo

Crear versión demo limitada.

Opciones de demo:

- Demo con funciones bloqueadas.
- Demo con límite de piezas.
- Demo con marca de agua.
- Demo sin exportación.
- Demo con uso limitado.
- Demo visual sin core completo.
- Demo por video solamente si aún no conviene entregar RBZ.

FASE 6 — Publicar release controlado

En el repo público publicar solo:

- RBZ demo.
- Documentación.
- Capturas.
- Video.
- Changelog.

Nunca publicar core completo.

FASE 7 — Crear landing

Crear GitHub Pages o web propia.

Debe incluir:

- Hero principal.
- Capturas.
- Beneficios.
- Funciones.
- Botón “Ver en GitHub”.
- Botón “Dar estrella”.
- Botón “Solicitar demo”.
- Botón “Contactar por WhatsApp”.

FASE 8 — Preparar sistema de licencia

Diseñar servidor de validación.

Estados:

- demo
- activo
- vencido
- suspendido
- bloqueado
- error de conexión

FASE 9 — Preparar distribución comercial

Opciones:

- GitHub Releases para demo.
- Web propia para versión comercial.
- Canal privado para clientes.
- Extension Warehouse cuando esté listo.
- Sistema de licencia con usuario y clave.

FASE 10 — Preparar estrategia de crecimiento

Para ganar estrellas:

- README visual.
- Video demo.
- GIF de uso.
- Casos reales.
- Roadmap activo.
- Publicaciones en TikTok.
- Publicaciones en grupos de SketchUp.
- Publicaciones en comunidades maker/carpintería.
- Enlace desde WhatsApp.
- Enlace desde web.
- Enlace desde videos de render/despiece.
- Mostrar antes/después.
- Mostrar ahorro de tiempo.

PROMPT PARA IA DE PROGRAMACIÓN

Usa este prompt cuando una IA vaya a ayudarte a crear esta arquitectura:

“Necesito crear una arquitectura profesional para publicar mi plugin McComicsUp Suite Pro IA® en GitHub usando un repositorio público tipo vitrina y un repositorio privado para el core real. Antes de programar, revisa todas las reglas McComics® aplicables y propón una arquitectura segura, modular y escalable.

El repositorio público debe servir para ganar estrellas, mostrar capturas, documentación, roadmap, changelog, landing page y releases demo controlados. No debe contener el código fuente real ni lógica sensible.

El repositorio privado debe contener el código Ruby real del plugin SketchUp, estructura modular, sistema de licencia, scripts de build RBZ, tests, documentación interna y preparación para distribución comercial.

El plugin debe usar marca McComics®, autor McComics Servicios Generales, namespace propio, estructura compatible con SketchUp, código robusto, liviano, documentado, modular, extensible y con buen manejo de errores.

No se debe usar eval, no se debe ejecutar código remoto descargado, no se deben publicar claves, no se deben exponer tokens, no se deben incluir secretos en el RBZ y no se debe publicar el core en el repositorio público.

Antes de entregar código, quiero que me propongas:
1. Estructura de repositorios.
2. Estructura de carpetas.
3. Flujo de build RBZ.
4. Flujo de releases.
5. Sistema básico de licencias.
6. Riesgos de seguridad.
7. Mejoras profesionales.
8. Checklist antes de publicar.

No inventes información que no tengas. Si algo es ambiguo, adviértelo y propone la opción más profesional.”

DECISIÓN RECOMENDADA PARA MCCOMICS®

Usar esta estructura:

Público:
McComicsUp-Suite-Pro-IA

Privado:
McComicsUp-Suite-Pro-IA-Core

Landing:
Dentro del repo público en /landing o mediante GitHub Pages.

Releases públicos:
Solo demo, documentación, instaladores controlados o material visual.

Venta real:
Desde web oficial, WhatsApp, servidor propio o canal privado.

Licencia:
Servidor McComics® con validación de usuario/licencia.

Distribución:
RBZ demo público.
RBZ comercial privado.
Futuro Extension Warehouse.

CONCLUSIÓN

La estrategia correcta para McComics® no es intentar hacer público solo el README de un repositorio privado, porque GitHub no trabaja así.

La estrategia profesional es crear un repositorio público poderoso, visual, técnico y comercial para ganar estrellas, mientras el core real permanece protegido en un repositorio privado.

El repositorio público construye reputación.
El repositorio privado protege el negocio.
El RBZ controlado distribuye el producto.
El sistema de licencia monetiza el plugin.
La landing convierte visitantes en clientes.

Esta arquitectura permite que McComicsUp Suite Pro IA® se vea como un producto serio, escalable y comercial, sin regalar el código fuente ni comprometer la propiedad intelectual de McComics Servicios Generales.