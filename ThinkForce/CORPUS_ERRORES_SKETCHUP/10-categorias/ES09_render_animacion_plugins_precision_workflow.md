# ES09 - Render, animacion, plugins externos, precision y workflow

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 1256-1767

Uso: Cargar cuando el cambio toque render, animacion, precision geometrica, workflow, datos persistentes o interoperabilidad externa.

---

## ERRORES DE RENDER Y VISUALIZACIÓN

341. Render negro por luces ausentes
     Solución: añadir luces a escena.

342. Materiales no reflejan en render
     Solución: asignar materiales antes de renderizar.

343. Transparencia no funciona
     Solución: ajustar alpha en material.

344. Sombras incorrectas
     Solución: verificar configuración shadow_info.

345. Antialiasing deshabilitado
     Solución: activar en opciones de render.

346. Resolución baja
     Solución: aumentar resolución de exportación.

347. Aspecto ratio incorrecto
     Solución: ajustar dimensiones proporcionalmente.

348. Color washed out
     Solución: ajustar gamma y exposición.

349. Z-fighting visible
     Solución: separar caras coplanares mínimamente.

350. Textura pixelada
     Solución: usar texturas de mayor resolución.

## ERRORES DE ANIMACIÓN

351. Animación no smooth
     Solución: aumentar frame rate o usar interpolación.

352. Keyframes no guardan
     Solución: crear scenes para cada keyframe.

353. Transición abrupta
     Solución: ajustar timing de transición.

354. Objeto desaparece en animación
     Solución: verificar visibilidad en todas las scenes.

355. Cámara salta
     Solución: ajustar posiciones de cámara gradualmente.

356. Loop no funciona
     Solución: configurar animación para loop.

357. Export video falla
     Solución: verificar codec y configuración.

358. Audio no sincroniza
     Solución: ajustar timing de audio.

359. Transparencia parpadea
     Solución: evitar objetos transparentes solapados.

360. Performance baja en animación
     Solución: reducir polígonos o simplificar escena.

## ERRORES DE PLUGINS EXTERNOS

361. Conflicto con plugin V-Ray
     Solución: verificar compatibilidad y orden de carga.

362. Conflicto con plugin Enscape
     Solución: separar namespaces.

363. Conflicto con plugin 1001bit
     Solución: evitar sobrescribir métodos comunes.

364. Plugin no detecta extensión McComics
     Solución: registrar API pública.

365. Extension Warehouse rechaza plugin
     Solución: seguir guidelines de Trimble.

366. Plugin no firma correctamente
     Solución: usar firma digital válida.

367. Dependencia de plugin no disponible
     Solución: hacer plugin standalone o documentar.

368. API de plugin externo cambia
     Solución: versionar integración y validar.

369. Plugin externo causa memory leak
     Solución: aislar y reportar a desarrollador.

370. Performance degradada por plugin externo
     Solución: deshabilitar si no es necesario.

## ERRORES DE COLABORACIÓN

371. Archivo no guarda correctamente
     Solución: verificar permisos y espacio en disco.

372. Merge de modelos genera duplicados
     Solución: limpiar antes de merge.

373. Referencias externas rotas
     Solución: usar rutas relativas.

374. Versión incompatible
     Solución: guardar en versión compatible.

375. Componentes no actualizan
     Solución: refrescar referencias.

376. Cambios no sincronizan
     Solución: usar sistema de versionado.

377. Conflicto de edición simultánea
     Solución: implementar locking.

378. Backup no automatizado
     Solución: configurar auto-save.

379. Historial no disponible
     Solución: usar versionado de archivos.

380. Comentarios no persisten
     Solución: usar atributos para notas.

## ERRORES DE OPTIMIZACIÓN

381. Modelo muy pesado (>100MB)
     Solución: purgar no usados y simplificar geometría.

382. Demasiados polígonos
     Solución: reducir detalle en áreas no visibles.

383. Texturas muy grandes
     Solución: redimensionar texturas a resolución necesaria.

384. Components no instanciados
     Solución: convertir duplicados en instancias.

385. Geometría suelta sin agrupar
     Solución: agrupar geometría relacionada.

386. Layers no utilizados
     Solución: eliminar layers vacíos.

387. Estilos acumulados
     Solución: purgar estilos no usados.

388. Scenes duplicadas
     Solución: eliminar scenes redundantes.

389. Materials duplicados
     Solución: consolidar materiales similares.

390. Hidden geometry acumulada
     Solución: purgar geometría oculta innecesaria.

## ERRORES DE PRECISIÓN

391. Vertices no coinciden por tolerancia
     Solución: usar threshold de 0.001mm.

392. Faces no cierran por gaps mínimos
     Solución: cerrar gaps con heal.

393. Curvas no smooth
     Solución: aumentar segmentos.

394. Arcos irregulares
     Solución: usar número adecuado de lados.

395. Scaling pierde precisión
     Solución: escalar con factor exacto.

396. Rotation pierde alineación
     Solución: usar ángulos exactos.

397. Mirror invierte chirality
     Solución: verificar orientación después de mirror.

398. Units mal interpretadas
     Solución: especificar units explícitamente.

399. Decimal places insuficientes
     Solución: aumentar precisión en settings.

400. Rounding errors acumulados
     Solución: recalcular desde origen periódicamente.

## ERRORES DE WORKFLOW

401. Operación no tiene undo
     Solución: envolver en operation.

402. Undo deshace demasiado
     Solución: usar transparent operations apropiadamente.

403. Comando no accesible desde menú
     Solución: añadir a menú Extensions.

404. Shortcut no funciona
     Solución: registrar en Preferences > Shortcuts.

405. Tool no se activa
     Solución: verificar model.select_tool.

406. Plugin lento en modelos grandes
     Solución: optimizar algoritmos o dividir operación.

407. UI no responsive
     Solución: usar timers para operaciones largas.

408. Feedback visual ausente
     Solución: añadir progress bar o status.

409. Error no reportado a usuario
     Solución: mostrar mensaje de error claro.

410. Success no confirmado
     Solución: mostrar mensaje de éxito.

## ERRORES DE DATOS PERSISTENTES

411. Preferencias no persisten entre sesiones
     Solución: guardar en Sketchup.write_default.

412. Atributos desaparecen al cerrar
     Solución: usar set_attribute correctamente.

413. Cache no se invalida
     Solución: limpiar cache cuando datos cambian.

414. Estado no se restaura
     Solución: guardar estado en cierre y restaurar en inicio.

415. Settings corruptos
     Solución: validar y usar defaults si fallan.

416. User data perdido al actualizar
     Solución: migrar datos en actualización.

417. Registry entries no limpias
     Solución: limpiar en desinstalación.

418. Temp files acumulados
     Solución: limpiar archivos temporales.

419. Log files sin rotation
     Solución: implementar tamaño máximo y rotation.

420. Database no migra
     Solución: ejecutar migrations automáticamente.

## ERRORES DE ACCESIBILIDAD

421. UI no accesible con teclado
     Solución: añadir tab order y shortcuts.

422. Contraste insuficiente
     Solución: verificar WCAG guidelines.

423. Textos muy pequeños
     Solución: usar tamaño mínimo legible.

424. No feedback para usuarios con discapacidad visual
     Solución: añadir aria labels.

425. Animaciones causan problemas
     Solución: permitir desactivar animaciones.

426. Tooltips ausentes
     Solución: añadir tooltips descriptivos.

427. Error messages no claros
     Solución: usar lenguaje simple y específico.

428. Help no disponible
     Solución: añadir sistema de ayuda.

429. No alternativas para funciones visuales
     Solución: proveer alternativas textuales.

430. UI no escalable
     Solución: soportar diferentes DPI.

## ERRORES DE INTERNACIONALIZACIÓN

431. Strings hardcoded en inglés
     Solución: externalizar strings a archivos de idioma.

432. Encoding incorrecto para caracteres especiales
     Solución: usar UTF-8 consistentemente.

433. Formato de fecha incorrecto
     Solución: usar formato local.

434. Número con formato incorrecto
     Solución: respetar separadores locales.

435. Currency no localizada
     Solución: usar símbolo correcto.

436. Timezone no considerado
     Solución: convertir a timezone local.

437. Right-to-left languages no soportadas
     Solución: añadir soporte RTL.

438. Plurales incorrectos
     Solución: usar reglas de pluralización correctas.

439. Sorting alfabético incorrecto
     Solución: usar collation apropiada.

440. Translation missing
     Solución: verificar todas las keys tienen traducción.

## ERRORES DE AUDIO

441. Audio no reproduce
     Solución: verificar formato y codec.

442. Volume demasiado bajo/alto
     Solución: normalizar audio.

443. Audio desincronizado
     Solución: ajustar offset.

444. Click/pop en audio
     Solución: limpiar audio.

445. Audio distorsionado
     Solución: reducir gain.

446. Latencia en audio
     Solución: reducir buffer size.

447. Audio loop no seamless
     Solución: crear loop perfecto.

448. Multiple audio streams conflictan
     Solución: gestionar streams separadamente.

449. Audio no stop al cerrar
     Solución: detener audio en cleanup.

450. Audio format no soportado
     Solución: convertir a formato compatible.

## ERRORES DE VIDEO

451. Video no carga
     Solución: verificar codec y contenedor.

452. Frame drops en playback
     Solución: reducir resolución o bitrate.

453. Video aspect ratio incorrecto
     Solución: mantener aspect ratio original.

454. Video quality baja
     Solución: aumentar bitrate.

455. Video muy pesado
     Solución: comprimir con settings optimizados.

456. Subtitles no sincronizan
     Solución: ajustar timing.

457. Video no exporta
     Solución: verificar configuración de export.

458. Transparencia en video perdida
     Solución: usar codec que soporte alpha.

459. Color grading incorrecto
     Solución: ajustar color space.

460. Video streaming falla
     Solución: verificar bandwidth y buffering.

## ERRORES DE NETWORK

461. Request timeout
     Solución: aumentar timeout.

462. Connection refused
     Solución: verificar servidor activo.

463. DNS not resolved
     Solución: verificar DNS settings.

464. SSL handshake failed
     Solución: verificar certificado.

465. HTTP 404
     Solución: verificar URL correcta.

466. HTTP 500
     Solución: revisar logs de servidor.

467. HTTP 403
     Solución: verificar permisos.

468. HTTP 401
     Solución: verificar autenticación.

469. Proxy error
     Solución: configurar proxy correctamente.

470. CORS error
     Solución: añadir headers CORS.

## ERRORES DE DATABASE

471. Connection pool exhausted
     Solución: liberar conexiones o aumentar pool.

472. Query timeout
     Solución: optimizar query o aumentar timeout.

473. Deadlock
     Solución: reordenar locks o usar retry.

474. Unique constraint violation
     Solución: verificar unicidad antes de insert.

475. Foreign key constraint violation
     Solución: verificar existencia de referencia.

476. Data truncation
     Solución: aumentar tamaño de columna.

477. SQL injection vulnerable
     Solución: usar prepared statements.

478. N+1 query problem
     Solución: usar eager loading.

479. Missing index
     Solución: añadir índice en columnas consultadas.

480. Transaction not committed
     Solución: commit explícitamente.

## ERRORES DE CACHE

481. Cache never invalidates
     Solución: implementar TTL o invalidación.

482. Stale cache served
     Solución: verificar versión antes de servir.

483. Cache miss too frequent
     Solución: aumentar TTL o warming.

484. Cache stampede
     Solución: usar locking o stale-while-revalidate.

485. Cache key collision
     Solución: usar keys únicas.

486. Cache size unlimited
     Solución: implementar LRU o límite.

487. Cache not distributed
     Solución: usar cache distribuida si necesario.

488. Cache serialization error
     Solución: verificar formato serializado.

489. Cache warming falla
     Solución: hacer warming asíncrono con retry.

490. Cache metrics no monitoreados
     Solución: añadir monitoring de hit rate.

## ERRORES DE EMAIL

491. Email no envía
     Solución: verificar SMTP settings.

492. Email va a spam
     Solución: configurar SPF/DKIM/DMARC.

493. Email con attachment muy grande
     Solución: limitar tamaño o usar links.

494. Email HTML no renderiza
     Solución: usar HTML compatible con email clients.

495. Email no personalizado
     Solución: usar templates con variables.

496. Email sin unsubscribe
     Solución: añadir link de unsubscribe.

497. Email bounce rate alto
     Solución: validar emails antes de enviar.

498. Email tracking no funciona
     Solución: verificar pixel de tracking.

499. Email delivery lento
     Solución: usar queue asíncrono.

500. Email plaintext faltante
     Solución: incluir versión plaintext.

