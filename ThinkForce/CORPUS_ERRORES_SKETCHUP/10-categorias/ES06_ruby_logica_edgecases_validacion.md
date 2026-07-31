# ES06 - Ruby, tipos, logica, edge cases, memoria, timing y validacion

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 492-715

Uso: Cargar cuando el cambio toque sintaxis Ruby, tipos, logica, validacion, memoria, timers o errores de flujo.

---

## ERRORES DE SINTAXIS RUBY

101. Unexpected keyword_end
     Solución: verificar balance de def/end, if/end, class/end.

102. Unexpected end-of-input
     Solución: añadir end faltante al final.

103. Invalid return
     Solución: usar return solo dentro de métodos.

104. Syntax error in string interpolation
     Solución: usar #{variable} correctamente dentro de "".

105. Invalid multibyte char
     Solución: declarar # encoding: UTF-8 al inicio.

106. Unexpected tIDENTIFIER
     Solución: verificar palabras reservadas no usadas como variables.

107. Unexpected '='
     Solución: verificar sintaxis de asignación.

108. Parse error on value "end"
     Solución: verificar estructura de bloques.

109. Unexpected keyword_ensure
     Solución: ensure solo válido después de begin o def.

110. Unexpected keyword_rescue
     Solución: rescue requiere begin o def previo.

## ERRORES DE TIPOS Y CLASES

111. NoMethodError: undefined method for NilClass
     Solución: validar que objeto no sea nil antes de llamar método.

112. TypeError: no implicit conversion
     Solución: convertir tipos explícitamente con to_s, to_i, to_f.

113. ArgumentError: wrong number of arguments
     Solución: verificar cantidad de argumentos del método.

114. NameError: uninitialized constant
     Solución: verificar que clase/módulo esté cargado.

115. NoMethodError on private method
     Solución: no llamar métodos privados fuera de la clase.

116. LoadError: cannot load such file
     Solución: verificar ruta de require o require_relative.

117. RuntimeError genérico
     Solución: añadir rescue específico y mensaje descriptivo.

118. StandardError no capturado
     Solución: usar begin/rescue/end alrededor de código riesgoso.

119. IndexError: index out of range
     Solución: validar tamaño de array antes de acceder.

120. KeyError: key not found
     Solución: usar fetch con default o validar existencia.

## ERRORES DE LÓGICA Y ALGORITMOS

121. Loop infinito bloquea SketchUp
     Solución: añadir condición de salida o límite de iteraciones.

122. Recursión excesiva causa stack overflow
     Solución: limitar profundidad o usar iteración.

123. División por cero
     Solución: validar denominador != 0.

124. Comparación de tipos incompatibles
     Solución: convertir a mismo tipo antes de comparar.

125. Orden de operaciones incorrecto
     Solución: usar paréntesis para clarificar precedencia.

126. Condición siempre true o false
     Solución: revisar lógica booleana.

127. Variable no inicializada
     Solución: asignar valor inicial.

128. Scope incorrecto de variable
     Solución: usar @variable para instancia, @@variable para clase.

129. Mutación inesperada de array/hash
     Solución: usar dup o clone antes de modificar.

130. Comparación con nil falla
     Solución: usar nil? o verificar con ||.

## ERRORES DE EDGE CASES

131. Array vacío causa error en operación
     Solución: verificar array.empty? antes de operar.

132. String vacío causa error en split
     Solución: validar string.empty? o usar split con límite.

133. Hash vacío causa error en iteración
     Solución: verificar hash.empty? antes de each.

134. Cero en operación matemática
     Solución: validar != 0 antes de dividir o usar como divisor.

135. Valor negativo en operación que requiere positivo
     Solución: usar abs o validar >= 0.

136. Float precision causa comparación incorrecta
     Solución: usar (a - b).abs < epsilon.

137. Entidad eliminada aún referenciada
     Solución: verificar entity.valid? antes de usar.

138. Transformation identity no hace nada
     Solución: verificar que transformation no sea IDENTITY antes de aplicar.

139. BoundingBox vacío causa error
     Solución: validar bbox.valid? antes de usar.

140. ComponentDefinition sin instancias
     Solución: verificar definition.instances.empty? antes de asumir uso.

## ERRORES DE MEMORIA Y RECURSOS

141. Leak de memoria por referencias circulares
     Solución: romper referencias al limpiar.

142. Objetos no garbage collected
     Solución: asignar nil a variables grandes después de usar.

143. Demasiadas operaciones undo en memoria
     Solución: usar transparent operations o commit frecuentemente.

144. Cache no se limpia
     Solución: limpiar cache manualmente en cleanup.

145. File handles no cerrados
     Solución: usar File.open con bloque o cerrar explícitamente.

146. Observers acumulados
     Solución: remover observers antes de recrear.

147. Timers acumulados
     Solución: cancelar timers previos antes de crear nuevos.

148. Dialogs no destruidos
     Solución: cerrar dialogs al limpiar plugin.

149. Temporary files no eliminados
     Solución: usar File.delete después de usar temporales.

150. Arrays grandes no liberados
     Solución: limpiar arrays al terminar operación.

## ERRORES DE CONCURRENCIA Y TIMING

151. Race condition entre threads
     Solución: sincronizar acceso a recursos compartidos.

152. Deadlock en operaciones
     Solución: no bloquear múltiples recursos simultáneamente.

153. Timer ejecuta antes de que modelo esté listo
     Solución: usar UI.start_timer(0) con validación.

154. Observer ejecuta en momento incorrecto
     Solución: validar estado del modelo antes de ejecutar.

155. Callback ejecuta múltiples veces
     Solución: usar flag para ejecutar solo una vez.

156. Async operation interfiere con UI
     Solución: ejecutar operaciones pesadas en timer.

157. Operation commit antes de completar
     Solución: esperar a que operación termine antes de commit.

158. Observer desregistrado durante iteración
     Solución: clonar lista de observers antes de iterar.

## ERRORES DE VALIDACIÓN

159. Input no validado causa error
     Solución: validar tipo y rango de inputs.

160. String esperado recibe número
     Solución: usar to_s para convertir.

161. Número esperado recibe string
     Solución: usar to_f o to_i para convertir.

162. Boolean esperado recibe nil
     Solución: usar !! para convertir a boolean.

163. Array esperado recibe nil
     Solución: usar || [] como default.

164. Hash esperado recibe nil
     Solución: usar || {} como default.

165. Objeto esperado está deleted
     Solución: verificar valid? antes de usar.

166. Path inválido
     Solución: validar File.exist? antes de usar.

167. Encoding inválido
     Solución: forzar UTF-8 con encode('UTF-8').

168. JSON inválido
     Solución: validar con JSON.parse en rescue.

169. XML malformado
     Solución: validar con parser antes de procesar.

170. Regex inválido
     Solución: validar pattern antes de usar.

