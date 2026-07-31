# ES10 - Errores finales numerados 501-705

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 1768-2384

Uso: Cargar como compendio tematico avanzado cuando el cambio no encaja claro en una sola categoria o requiere cobertura amplia.

---

## ERRORES FINALES NUMERADOS (501-705)

501. Ruby version mismatch causa LoadError
     Solución: especificar Ruby version compatible en metadata.

502. Sketchup.version_number retorna entero no comparable
     Solución: usar Sketchup.version.to_i para comparar.

503. UI::WebDialog deprecated warnings
     Solución: migrar a UI::HtmlDialog para versiones modernas.

504. Extension.register sin bloque causa error
     Solución: pasar bloque correctamente a register_extension.

505. Transformation.scaling con 0 rompe geometría
     Solución: validar factores != 0 antes de escalar.

506. Face.followme falla si path no es coplanar
     Solución: asegurar path en mismo plano.

507. Model.raytest retorna nil en miss
     Solución: verificar resultado nil antes de usar.

508. Entities.intersect_with requiere transformación
     Solución: pasar identidad si no hay transformación.

509. ComponentDefinition.behavior flags incorrectos
     Solución: verificar flags válidos antes de asignar.

510. Group.to_component pierde atributos
     Solución: copiar atributos después de conversión.

511. Edge.find_faces no crea caras esperadas
     Solución: verificar que edges formen loop cerrado.

512. AttributeDictionary.count retorna size incorrecto
     Solución: iterar para contar realmente.

513. ShadowInfo.time= con formato incorrecto
     Solución: usar objeto Time válido.

514. RenderingOptions no persisten
     Solución: aplicar después de model load.

515. Pages.add sin camera guarda vista incorrecta
     Solución: setear camera antes de crear page.

516. Layer.color= no afecta entidades
     Solución: refrescar vista después de cambio.

517. Material.texture.filename retorna path absoluto
     Solución: usar basename si necesitas nombre solo.

518. Style.description= muy largo causa truncate
     Solución: limitar a 255 caracteres.

519. DefinitionList.load duplica si ya existe
     Solución: verificar existencia antes de load.

520. Sketchup.undo causa crash si operation mal cerrada
     Solución: siempre commit o abort operations.

521. UI.messagebox en loop bloquea SketchUp
     Solución: acumular mensajes y mostrar una vez.

522. View.draw2d coordenadas incorrectas en Retina
     Solución: multiplicar por pixel scale factor.

523. Sketchup.active_model nil durante startup
     Solución: usar start_timer para ejecutar después.

524. InputPoint.pick no detecta en modelo vacío
     Solución: verificar que haya geometría.

525. ConstructionLine no persiste al guardar
     Solución: convertir a edge si debe persistir.

526. Drawingelement.material= nil no limpia material
     Solución: asignar Color.new(0,0,0,0) para limpiar.

527. Geom::PolygonMesh.add_polygon con puntos colineares falla
     Solución: validar puntos no colineares.

528. Sketchup.set_status_text no actualiza inmediatamente
     Solución: forzar refresh con UI.refresh.

529. Tool.getExtents no calculado correctamente
     Solución: retornar BoundingBox válido.

530. Animation.nextFrame retorna false para stop
     Solución: verificar retorno y limpiar si false.

531. Model.georeferencing nil si no georeferenciado
     Solución: verificar nil antes de usar.

532. ViewObserver.onViewChanged llamado excesivamente
     Solución: throttle callbacks con timer.

533. UI.scale_factor incorrecto en multi-monitor
     Solución: calcular por ventana específica.

534. Sketchup.platform retorna :platform_win inconsistente
     Solución: usar case statement con symbols.

535. Model.guid cambia al guardar como
     Solución: no usar guid como identificador permanente.

536. Face.area retorna 0 para caras degeneradas
     Solución: validar área > epsilon antes de usar.

537. Edge.length retorna Infinity si vertices coinciden
     Solución: validar length finito.

538. Layer.page_behavior mal documentado
     Solución: experimentar o consultar foros.

539. ComponentInstance.locked? no previene transformación
     Solución: verificar locked antes de transformar.

540. Sketchup.temp_dir con espacios causa errores
     Solución: usar quotes en paths.

541. UI::Command.set_validation_proc no ejecuta
     Solución: verificar que proc retorne símbolos válidos.

542. Sketchup.send_action con ID incorrecto no hace nada
     Solución: usar IDs documentados.

543. Model.classifications nil en versiones antiguas
     Solución: verificar existencia antes de usar.

544. InstancePath mal construido causa crashes
     Solución: validar path con instancias válidas.

545. Model.active_path nil cuando no editando
     Solución: verificar nil antes de iterar.

546. UI.play_sound falla con paths no ASCII
     Solución: usar paths ASCII solamente.

547. Sketchup.is_64bit? no existe en versiones viejas
     Solución: usar rescue para compatibilidad.

548. View.camera.aspect_ratio incorrecto en resize
     Solución: recalcular después de cambio de tamaño.

549. Material.color= no actualiza textura
     Solución: actualizar texture separadamente.

550. Entities.add_cpoint deprecated
     Solución: usar add_cline en su lugar.

551. UI::Toolbar.get_last_state retorna valores inconsistentes
     Solución: implementar propio sistema de estado.

552. Sketchup.file_new cierra sin preguntar
     Solución: verificar modificaciones antes.

553. Model.export falla con paths largos
     Solución: usar paths cortos o UNC.

554. ImageRep.load_file con formato no soportado crash
     Solución: validar formato antes de load.

555. TextureWriter.load sin face falla
     Solución: pasar face válido.

556. OptionsManager.count incluye opciones internas
     Solución: filtrar opciones de usuario.

557. SectionPlane.activate no afecta vistas
     Solución: asignar a entities visible.

558. Sketchup.debug_mode= no funciona en Release
     Solución: usar solo en desarrollo.

559. Model.mipmapping= deprecated
     Solución: usar rendering_options en su lugar.

560. UI.refresh causa parpadeo
     Solución: minimizar llamadas a refresh.

561. Sketchup.read_default retorna string no tipo esperado
     Solución: convertir tipo explícitamente.

562. AttributeDictionary.delete_key retorna nil siempre
     Solución: verificar existencia con [] antes.

563. Model.list_datums no incluye todos datums
     Solución: consultar documentación actualizada.

564. ComponentDefinition.refresh_thumbnail falla silent
     Solución: verificar que tenga geometría.

565. View.invalidate no fuerza redraw inmediato
     Solución: usar en combinación con refresh.

566. Sketchup.format_length con units incorrectas trunca
     Solución: especificar units explícitamente.

567. UI::Command.tooltip= muy largo se corta
     Solución: limitar a ~100 caracteres.

568. Geom::Vector3d.normalize! con vector zero falla
     Solución: verificar length > 0 antes.

569. Geom::Transformation.rotation retorna array vacío si identity
     Solución: verificar antes de desempaquetar.

570. Point3d + Vector3d retorna Point3d no Vector
     Solución: entender tipo de retorno.

571. Model.start_operation con disable_ui no bloquea todo
     Solución: usar con precaución.

572. Entities.add_face con loops anidados falla
     Solución: crear outer loop primero.

573. UI::HtmlDialog.set_on_closed sin bloque causa warning
     Solución: pasar bloque o no llamar.

574. Sketchup.find_support_file retorna nil si no existe
     Solución: verificar nil antes de usar.

575. Tool.suspend/resume mal balanceados causan crash
     Solución: asegurar mismo número de suspend/resume.

576. View.zoom con factor negativo invierte
     Solución: usar solo factores positivos.

577. Model.definitions.load_from_url falla con SSL antiguo
     Solución: actualizar SSL o usar http.

578. Sketchup.open_file con path relativo busca en lugares inesperados
     Solución: usar path absoluto.

579. UI::Toolbar.restore no restaura en Mac
     Solución: aceptar diferencia de plataforma.

580. Model.raytest con infinitos causa hang
     Solución: validar que ray sea finito.

581. Face.pushpull con 0 distance no hace nada
     Solución: validar distance != 0.

582. Sketchup.quit cierra sin guardar
     Solución: promover save antes.

583. UI.create_cursor con imagen muy grande falla
     Solución: limitar a 32x32 píxeles.

584. Tool.draw con GL inválido causa crash
     Solución: validar GL calls.

585. Model.import con options hash mal formado ignora
     Solución: verificar keys válidas.

586. AttributeDictionary.each_pair no garantiza orden
     Solución: ordenar después si necesario.

587. Sketchup.register_importer no funciona en Mac
     Solución: plataforma específica.

588. View.draw_text con font inválido usa default
     Solución: verificar font existe.

589. Entities.transform_entities con empty selection no hace nada
     Solución: verificar selection no vacía.

590. Model.active_layer= con layer eliminado falla
     Solución: verificar layer válido.

591. UI::Command.status_bar_text= no visible en algunas versiones
     Solución: usar tooltip en su lugar.

592. Sketchup.is_online no refleja estado real
     Solución: hacer request de prueba.

593. Model.place_component con point nil falla
     Solución: pasar Point3d válido.

594. ComponentInstance.glued_to= con face inválida falla
     Solución: validar face antes.

595. Sketchup.undo_stack_size no configurable
     Solución: aceptar límite del sistema.

596. UI.inspector_names retorna array vacío si no hay inspectors
     Solución: verificar empty antes de iterar.

597. Model.export con type no soportado no da error
     Solución: verificar type soportado.

598. Face.vertices retorna en orden inconsistente
     Solución: usar face.outer_loop.vertices.

599. Sketchup.extensions.count incluye no registradas
     Solución: filtrar por registered?.

600. UI::WebDialog.write_image deprecated
     Solución: usar HtmlDialog con canvas.

601. Model.latest_pid incrementa sin control
     Solución: no usar como contador confiable.

602. View.draw_polyline con puntos duplicados dibuja línea
     Solución: eliminar duplicados antes.

603. Sketchup.create_texture_writer sin model falla
     Solución: verificar active_model existe.

604. AttributeDictionary.keys retorna array modificable
     Solución: dup si necesitas modificar.

605. Tool.onKeyDown no captura todos los keys
     Solución: usar system hooks si necesario.

606. Model.number_faces incluye borradas si no purged
     Solución: purgar antes de contar.

607. UI::Toolbar.count incluye separadores
     Solución: contar solo comandos.

608. Sketchup.template_dir con accents falla
     Solución: usar ASCII paths.

609. View.corner con índice inválido retorna nil
     Solución: usar 0-3 solamente.

610. Model.save con path muy largo falla silent
     Solución: validar longitud de path.

611. ComponentDefinition.instances.each modifica durante iteración
     Solución: usar to_a antes de modificar.

612. Face.classify_point con punto en edge retorna PointOnEdge inconsistente
     Solución: manejar todos los casos de retorno.

613. Sketchup.get_locale retorna código inconsistente
     Solución: normalizar locale.

614. UI.beep no funciona en todas las plataformas
     Solución: proveer feedback visual también.

615. Model.layers.purge_unused elimina Layer0
     Solución: validar después de purge.

616. View.pick_helper.init con hitlimit bajo pierde elementos
     Solución: usar hitlimit mayor.

617. Sketchup.preferences con key inválida retorna nil
     Solución: verificar key válida.

618. Material.display_name trunca si muy largo
     Solución: limitar nombre.

619. ConstructionPoint.position= mal documentado
     Solución: consultar foros.

620. Model.selection.shift con empty falla
     Solución: verificar empty? antes.

621. UI::Command.large_icon= no visible en toolbars pequeños
     Solución: proveer ambos tamaños.

622. Sketchup.break no para ejecución inmediatamente
     Solución: usar return después.

623. AttributeDictionary.set_attribute con symbol key falla
     Solución: convertir a string.

624. View.center retorna Point3d en coordenadas screen inconsistente
     Solución: documentar coordenadas usadas.

625. Model.georeferencing.set_point con índice inválido falla
     Solución: usar 0-3.

626. Face.back_material= con mismo material que front no funciona
     Solución: asignar nil primero.

627. Sketchup.version_name retorna string largo
     Solución: parsear si necesitas short version.

628. UI::Command.menu_text= muy largo se trunca en menú
     Solución: usar texto conciso.

629. Model.entities.grep con clase no entity falla
     Solución: usar solo clases Sketchup.

630. ComponentInstance.name= no afecta definition.name
     Solución: entender diferencia instancia/definición.

631. Sketchup.plugins_disabled? no refleja todos los plugins
     Solución: verificar individualmente.

632. View.vpheight/vpwidth en unidades pixel inconsistente
     Solución: convertir según DPI.

633. Model.import con preserve_origin false mueve a origin
     Solución: calcular offset si necesitas preservar.

634. Face.loops retorna solo outer en caras sin holes
     Solución: verificar inner loops separadamente.

635. Sketchup.redo no disponible siempre
     Solución: verificar stack antes.

636. UI::Toolbar.name= después de create no actualiza
     Solución: setear en create.

637. Model.export con selection vacía exporta todo
     Solución: verificar selection antes.

638. Geom::Point3d.distance con mismo punto retorna 0.0 exacto
     Solución: safe para comparación.

639. Sketchup.set_current_cursor con ID inválido no da error
     Solución: validar ID antes.

640. Material.name= con nombre existente falla
     Solución: verificar unicidad.

641. View.camera.set con eye=target falla
     Solución: separar eye y target.

642. Model.definitions.purge_unused elimina usadas en otros modelos
     Solución: solo purgar si seguro.

643. Face.normal retorna vector no normalizado a veces
     Solución: normalizar antes de usar.

644. Sketchup.register_extension con metadata incorrecto no carga
     Solución: validar metadata.

645. UI::Command.validation_proc sin símbolo retorna causa warning
     Solución: retornar símbolos válidos.

646. Model.tags (layers) API cambia en versiones nuevas
     Solución: detectar versión y usar API apropiada.

647. ComponentInstance.locked= true no previene deletion
     Solución: verificar locked antes de delete.

648. Sketchup.is_pro? no detecta trial
     Solución: considerar trial como pro temporalmente.

649. View.zoom_extents no centra en selección si hay
     Solución: usar camera.set manual.

650. Model.active_entities.parent retorna Model inconsistentemente
     Solución: verificar tipo de retorno.

651. Face.material= nil removes texture
     Solución: usar color si quieres mantener.

652. Sketchup.os_language retorna código no estándar
     Solución: mapear a códigos ISO.

653. UI::Toolbar.show no fuerza visible inmediatamente
     Solución: verificar visible? después.

654. Model.selection.add con deleted entity causa error
     Solución: validar valid? antes.

655. Geom::Transformation.origin retorna Point3d pero es immutable
     Solución: crear nuevo Point3d si necesitas modificar.

656. Face.classify_point con punto muy lejano retorna PointOutside siempre
     Solución: validar distancia razonable.

657. Sketchup.app_name retorna "SketchUp" inconsistente con versión
     Solución: no usar para version check.

658. Material.texture.size= con 0 falla
     Solución: usar valores positivos.

659. View.draw con GL_TRIANGLES mal formados no da error
     Solución: validar triángulos antes.

660. Model.start_operation con nextTransparent mal hace transparent siguiente
     Solución: solo usar cuando sea necesario.

661. ComponentInstance.definition= con definition incorrecta falla
     Solución: verificar compatibilidad.

662. Sketchup.platform_display_name retorna string localizado
     Solución: no usar para lógica.

663. UI::Command.small_icon= no visible en menús
     Solución: menús usan large_icon.

664. Model.definitions.load con path Unicode falla en Windows
     Solución: convertir a short path.

665. Face.reverse! invierte front/back materials
     Solución: intercambiar materials manualmente si necesario.

666. Sketchup.extensions.each modifica durante iteración
     Solución: usar to_a primero.

667. View.draw_points con size 0 no dibuja
     Solución: usar size >= 1.

668. Model.selection.invert no incluye nested
     Solución: iterar recursivamente si necesario.

669. Geom::Vector3d.cross con parallel vectors retorna zero
     Solución: validar no paralelos antes.

670. AttributeDictionary.length deprecated
     Solución: usar count.

671. Sketchup.file_loaded? case sensitive
     Solución: normalizar case en comparación.

672. Material.alpha= fuera de rango clampea silent
     Solución: validar 0-1.

673. View.camera.description= muy largo se trunca
     Solución: limitar caracteres.

674. Model.export con overwrite false no pregunta
     Solución: verificar existencia antes.

675. Face.area con units incorrectas retorna valor escalado
     Solución: especificar units.

676. Sketchup.load sin extension agrega .rb automático
     Solución: incluir .rb explícitamente.

677. UI::Toolbar.each sin bloque retorna enumerator
     Solución: pasar bloque o usar enumerator.

678. Model.active_view nil durante startup
     Solución: esperar con timer.

679. ComponentInstance.transformation= con singular matrix falla
     Solución: validar determinante != 0.

680. Geom::Point3d.on_line? con línea degenerada falla
     Solución: validar línea válida.

681. Face.followme con path auto-intersectante crea geometría rota
     Solución: limpiar path antes.

682. Sketchup.write_default con valor nil borra key
     Solución: usar string "nil" si quieres guardar.

683. Material.texture.filename= con path no existente falla
     Solución: verificar File.exist?.

684. View.draw_line con puntos idénticos no dibuja
     Solución: validar puntos diferentes.

685. Model.selection.contains? con nested retorna false
     Solución: expandir selección si necesario.

686. Geom::Transformation.inverse con singular falla
     Solución: verificar invertible antes.

687. AttributeDictionary.to_a retorna array de arrays
     Solución: procesar según estructura.

688. Sketchup.create_thumbnail con size > 1024 falla
     Solución: limitar tamaño.

689. Material.name con caracteres especiales causa problemas
     Solución: sanitizar nombre.

690. View.camera.aspect_ratio= no funciona
     Solución: es read-only, cambiar dimensiones vista.

691. Model.georeferencing.point con índice out of bounds retorna nil
     Solución: usar índice válido.

692. Face.material.texture.write con path sin permisos falla
     Solución: verificar permisos antes.

693. Sketchup.active_model.modified? no detecta todos los cambios
     Solución: forzar modified = true si necesario.

694. UI::Command.proc sin bloque no funciona
     Solución: asignar proc válido.

695. Model.selection.toggle con deleted falla
     Solución: validar valid? antes.

696. Geom::Vector3d.parallel? con zero vector retorna true
     Solución: validar non-zero.

697. Face.get_glued_instances retorna vacío si no hay
     Solución: verificar empty?.

698. Sketchup.format_area con precision muy alta redondea
     Solución: limitaciones de float.

699. Material.texture.average_color retorna aproximación
     Solución: calcular manualmente si necesitas exacto.

700. View.draw con blend mode incorrecto da resultados inesperados
     Solución: usar blend modes documentados.

701. Model.find_entity_by_persistent_id con ID inválido retorna nil
     Solución: verificar nil antes de usar.

702. ComponentInstance.equals? compara referencia no contenido
     Solución: usar == no equals?.

703. Sketchup.temp_dir contiene archivos de otras sesiones
     Solución: limpiar antes de usar.

704. Módulo intentado instanciar como clase
     Solución: usar métodos de clase o crear clase real.

705. Namespace pollution por include
     Solución: usar composición sobre herencia.

