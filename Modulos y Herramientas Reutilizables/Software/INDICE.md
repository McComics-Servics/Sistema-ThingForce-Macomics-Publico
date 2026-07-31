# INDICE - Software Reutilizable

## mccomics_repo_graph_incremental

- Tipo: indexador incremental especializado para repos McComics con SketchUp Ruby, HtmlDialog y App Plano 2D.
- Ruta actual: ./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mccomics_repo_graph_incremental/mccomics_repo_graph_incremental.rb
- Salidas: ./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mc_graph_out/cache.json, ./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mc_graph_out/graph.json, ./Utilidades/Claude Code/Sistema_Ahorro_Tokens/03_GRAFO_INCREMENTAL/mc_graph_out/GRAPH_REPORT.md
- Uso: abrir la carpeta `mccomics_repo_graph_incremental`, ejecutar `ruby .\mccomics_repo_graph_incremental.rb` y consultar resultados con `04_ADAPTADORES/graph_query.py`

## prepare_native_capture_dependency

- Tipo: utilidad PowerShell reutilizable para dependencias legacy fuera del runtime Go.
- Ruta actual: ./Sistema ThingForce™ McComics/Utilidades/Modulos y Herramientas Reutilizables/Software/prepare_native_capture_dependency.ps1
- Destino por defecto: ./modules/estructura_pro/native-capture
- Uso: powershell -ExecutionPolicy Bypass -File ./Sistema ThingForce™ McComics/Utilidades/Modulos y Herramientas Reutilizables/Software/prepare_native_capture_dependency.ps1 -DependencySource "C:\Ruta\Descarga\native"
- Nota: prepara la dependencia con nombre `native-capture` para no colisionar con `./native` reservado al backend Go compartido.
