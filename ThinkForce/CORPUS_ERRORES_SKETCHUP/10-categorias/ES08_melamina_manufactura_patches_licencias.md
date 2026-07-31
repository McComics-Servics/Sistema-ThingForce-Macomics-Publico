# ES08 - Melamina, manufactura, arquitectura, parches, UI McComics y licencias

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 972-1255

Uso: Cargar cuando el cambio toque melamina, despiece, patches, branding UI McComics, licencias o exportacion tecnica.

---

## ERRORES MCCOMICS ESPECÍFICOS - MELAMINA

251. Grosor de pieza incorrecto (no 3,6,12,15,18,25,36mm)
     Solución: validar grosor contra valores permitidos.

252. Cajón creado como caja sólida
     Solución: crear cajón con 5-6 piezas individuales.

253. Refuerzo de cajón mal posicionado (>500mm ancho)
     Solución: centrar listón 80mm entre frontal y posterior.

254. Pieza penetra volumen de otra pieza
     Solución: validar colisión antes de crear.

255. Frontalidad de mueble invertida
     Solución: verificar orientación antes de crear puertas.

256. Puertas generadas detrás del mueble
     Solución: calcular frente correcto antes de posicionar.

257. Fondo trasero posicionado al frente
     Solución: validar cara posterior antes de colocar.

258. Repisa entra dentro de lateral
     Solución: calcular ancho interior real.

259. División penetra techo o base
     Solución: validar límites antes de crear.

260. Zócalo con offsets incorrectos
     Solución: usar -25mm atrás, -18mm delante y lados.

261. Piezas duplicadas invisibles
     Solución: validar que no existan antes de crear.

262. Material .skm no aplica automáticamente
     Solución: verificar carpeta materials y nombre correcto.

263. Veta (S/L) no respetada
     Solución: rotar pieza según orientación veta.

264. Cantos visibles no aplicados
     Solución: identificar cantos expuestos y marcar.

265. Bounding box incorrecto después de operar
     Solución: recalcular bounds después de modificar.

266. Transform local roto al escalar
     Solución: preservar orientación durante scaling.

267. Metadata perdida al copiar
     Solución: copiar atributos manualmente después de clonar.

268. Mueble no ensamblable físicamente
     Solución: validar que todas las piezas sean colocables.

269. Tolerancias de corte no consideradas
     Solución: añadir tolerancia 1-2mm en cálculos.

270. Herrajes no considerados en diseño
     Solución: reservar espacio para bisagras/correderas.

271. Estructura sin fondo ranura lateral innecesaria
     Solución: no crear ranura si fondo es melamina o sin fondo.

272. Repisas no llegan al fondo en mueble sin fondo
     Solución: extender repisas hasta canto posterior.

273. Botón WhatsApp aparece en UI
     Solución: eliminar botón WhatsApp de todas las UIs.

274. Archivo completo + parche .py enviados juntos
     Solución: enviar solo modalidad solicitada.

275. Nombre de archivo cambiado sin permiso
     Solución: mantener nombre original salvo indicación.

276. Parche Python no se autoelimina
     Solución: añadir código para mover .py a papelera.

277. Backup sin fecha y hora
     Solución: añadir timestamp al nombre backup.

278. Loader dentro de carpeta en .rbz
     Solución: poner loader en raíz de .rbz.

279. Estructura .rbz con carpetas intermedias
     Solución: poner loader y carpeta plugin en raíz.

280. Manifest incluido sin necesidad
     Solución: no incluir manifest si no va a Warehouse.

## ERRORES DE ARQUITECTURA CÓDIGO

281. Lógica en loader.rb
     Solución: mover lógica a módulos separados.

282. Módulo intentado instanciar como clase
     Solución: usar métodos de clase o crear clase real.

283. Include contamina namespace
     Solución: usar composición o extend en lugar de include.

284. Circular dependency en requires
     Solución: extraer dependencias comunes o lazy loading.

285. Código duplicado en múltiples archivos
     Solución: extraer a módulo compartido.

286. Clase con demasiadas responsabilidades
     Solución: dividir en clases más pequeñas.

287. Método demasiado largo (>50 líneas)
     Solución: extraer submétodos.

288. Acoplamiento excesivo entre clases
     Solución: usar inyección de dependencias.

289. Global variables
     Solución: usar constantes de módulo o singleton.

290. Hardcoded values
     Solución: extraer a constantes o configuración.

## ERRORES DE PARCHES Y ACTUALIZACIONES

291. Parche busca regex genérico no delimitadores únicos
     Solución: usar marcadores comentados únicos.

292. Parche no valida sintaxis antes de escribir
     Solución: ejecutar ruby -c o validar estructuralmente.

293. Parche toca múltiples zonas sensibles
     Solución: validar extra cuando se modifica lógica + HTML.

294. Parche genera end huérfano
     Solución: contar aperturas/cierres antes de aplicar.

295. Parche reemplaza código incorrecto
     Solución: buscar bloques delimitados, no patterns.

296. Script .py requiere instalación manual
     Solución: hacer autoejecutable con doble click.

297. Actualización automática sin verificación
     Solución: validar checksum antes de aplicar.

298. Versión incompatible aplicada
     Solución: verificar compatibilidad antes de actualizar.

299. Rollback no disponible
     Solución: mantener versión anterior como backup.

300. Actualización rompe configuración
     Solución: migrar config automáticamente.

## ERRORES DE UI ESPECÍFICOS MCCOMICS

301. Ventana no compacta (muy grande)
     Solución: reducir tamaño 50% y usar scroll si necesario.

302. Logo McComics no en esquina superior izquierda
     Solución: posicionar logo con CSS absolute top-left.

303. Nombre plugin no en esquina superior derecha
     Solución: posicionar título top-right con letras grandes.

304. Botón web no enlaza a grupomccomics.com
     Solución: añadir botón con href correcto.

305. Botón email no abre mccomicsservics@gmail.com
     Solución: usar mailto: en botón.

306. Botones no estilo 3D
     Solución: añadir box-shadow y transform en hover.

307. Color azul no #2563EB
     Solución: verificar valores CSS.

308. Ventana se duplica al click toolbar
     Solución: refrescar ventana existente, no crear nueva.

309. Contenido cortado sin scroll
     Solución: añadir overflow-y: auto.

310. Branding inconsistente
     Solución: aplicar guía de estilo McComics uniformemente.

## ERRORES DE LICENCIAMIENTO

311. Licencia validada sin conexión
     Solución: requerir verificación online periódica.

312. Hash de licencia fácil de encontrar
     Solución: ofuscar y fragmentar hash en código.

313. Módulo licencia fácil de eliminar
     Solución: integrar verificación en múltiples puntos.

314. Código base no ofuscado
     Solución: aplicar ofuscación a código sensible.

315. Copia redistribuida funcional
     Solución: identificador único por instalación.

316. Crackeado por modificación simple
     Solución: verificación multinivel y anti-tampering.

317. Servidor licencias no responde
     Solución: implementar cache local temporal.

318. Expiración de licencia no verificada
     Solución: validar fecha periódicamente.

319. Licencia compartida entre usuarios
     Solución: vincular a hardware específico.

320. Key generada sin seguridad
     Solución: usar algoritmo robusto con salt.

## ERRORES DE EXPORTACIÓN E IMPORTACIÓN

321. STL mesh invertida si pieza rotada
     Solución: reorientar transform local antes de exportar.

322. DWG convierte polilíneas 3D en líneas sueltas
     Solución: reconstruir polilínea por proximidad.

323. Booleanas subtract rompen si puntos coinciden
     Solución: aplicar micro-offset previo.

324. JPG comprime demasiado sin parámetro calidad
     Solución: añadir calidad >85%.

325. SKP de versión beta trae atributos experimentales
     Solución: filtrar diccionarios no estándar.

326. Booleanas producen áreas negativas con triángulos degenerados
     Solución: eliminar triángulos degenerados.

327. HtmlDialog oculta cursor si CSS usa cursor:none heredado
     Solución: forzar cursor: pointer en botones.

328. Select múltiple no conserva selecciones sin multiple=true
     Solución: habilitar modo múltiple explícitamente.

329. Export pierde escala
     Solución: aplicar transformaciones antes de exportar.

330. Import duplica materiales
     Solución: verificar existencia antes de crear.

## ERRORES DE DESPIECE Y MANUFACTURA

331. Despiece no considera cantos
     Solución: marcar cantos visibles en metadata.

332. Lista de corte sin veta
     Solución: incluir orientación S/L en despiece.

333. Código de barras no generado
     Solución: generar código único por pieza.

334. Plano de armado confuso
     Solución: incluir secuencia numerada.

335. Perforaciones no marcadas
     Solución: añadir coordenadas de perforaciones.

336. Ranuras no dimensionadas
     Solución: incluir profundidad y posición.

337. Herrajes no listados
     Solución: generar lista de herrajes necesarios.

338. Tolerancias no especificadas
     Solución: incluir tolerancias en plano.

339. Material no especificado
     Solución: indicar tipo y color de melamina.

340. Cantidad incorrecta
     Solución: validar conteo antes de generar lista.

