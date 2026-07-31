# ES02 - UI, dialogos, observers, callbacks y concurrencia

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 149-212

Uso: Cargar cuando el cambio toque UI, HtmlDialog, observers, callbacks, timers, threads o interaccion basica del plugin.

---

## ERRORES DE UI, MENÚS Y TOOLBARS

19. Menú o toolbar no aparece
    Solución: envolver creación de UI en bloque seguro y loggear errores.

20. Toolbar aparece pero botones repetidos
    Solución: bandera global / guardas de inicialización.

21. UI freeze / SketchUp bloqueado al abrir diálogo
    Solución: dividir trabajo con UI.start_timer, evitar loops bloqueantes.

22. HtmlDialog vacío / errores CORS / recursos no cargan
    Solución: usar HtmlDialog#set_file con File.join(**dir**, ...), revisar consola del dialog.

## ERRORES DE OBSERVADORES Y CALLBACKS

23. SketchUp se cierra con error al salir (observer)
    Solución: remover observers en cleanup, evitar referencias persistentes.

24. Observers disparados múltiples veces
    Solución: bandera para evitar duplicado.

## ERRORES DE HILOS Y CONCURRENCIA

25. Deadlocks / race conditions / excepciones al acceder Model desde threads
    Solución: no llamar API de SketchUp fuera del hilo principal.

## ERRORES DE DEPENDENCIAS EXTERNAS

26. LoadError: cannot load such file — nokogiri
    Solución: evitar gems nativas; usar gems puro Ruby cuando sea posible.

## ERRORES DE COMPONENTES E INSTANCIAS

27. Entities::add_group / add_instance falla
    Solución: validar geometría, envolver operaciones en model.start_operation/commit_operation.

28. Definiciones inválidas o referencias rotas
    Solución: usar ComponentInstance#definition correctamente, regenerar recursos si faltan.

## ERRORES DE TEXTURAS E IMÁGENES

29. Textura no encontrada / ImageLoadError
    Solución: usar File.join(**dir**, 'img', ...), respetar mayúsculas/minúsculas en Mac.

30. Escalado incorrecto en HtmlDialog
    Solución: manejar DPI / Retina adecuadamente.

## ERRORES DE PERMISOS

31. Permission denied al escribir archivos
    Solución: usar carpetas de usuario (%AppData%, Documents), no carpetas protegidas.

## ERRORES DE ENCODING E INTERNACIONALIZACIÓN

32. Acentos con símbolos extraños
    Solución: usar encoding UTF-8 explícito en archivos Ruby.

33. Archivo .rb no carga por BOM (Byte Order Mark)
    Solución: guardar archivos sin BOM en UTF-8.

34. Strings con caracteres especiales causan SyntaxError
    Solución: usar comillas simples o escapar correctamente.

