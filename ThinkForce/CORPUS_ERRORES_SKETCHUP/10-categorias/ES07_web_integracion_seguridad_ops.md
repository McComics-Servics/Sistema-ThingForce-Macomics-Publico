# ES07 - Web, integracion, seguridad, configuracion, logging, testing y deployment

Fuente: ./ARCHIVOS ORIGINALES/ERRORES_QUE_LA IA_DEBE EVITAR_COMETER_RESUMIDO_SketchUp-McComics.md
Lineas origen: 716-971

Uso: Cargar cuando el cambio toque frontend web, integracion externa, seguridad, configuracion, logging, testing o despliegue.

---

## ERRORES DE INTERFAZ WEB

171. CORS bloquea recursos
     Solución: configurar headers correctos en servidor.

172. XSS en HTML dialog
     Solución: escapar HTML con CGI.escapeHTML.

173. JavaScript no carga
     Solución: verificar ruta y sintaxis JS.

174. CSS no aplica por especificidad
     Solución: aumentar especificidad o usar !important.

175. Event listener no funciona
     Solución: verificar que elemento exista antes de addEventListener.

176. Form submit recarga página
     Solución: usar preventDefault en submit.

177. AJAX request falla
     Solución: verificar URL y método HTTP.

178. JSON parse error en respuesta
     Solución: validar que respuesta sea JSON válido.

179. Cookie no persiste
     Solución: verificar dominio y path de cookie.

180. LocalStorage no disponible
     Solución: verificar soporte y permisos.

## ERRORES DE INTEGRACIÓN

181. Plugin conflicta con otro plugin
     Solución: usar namespace único para evitar colisiones.

182. API key inválida
     Solución: verificar key y renovar si expira.

183. Request timeout
     Solución: aumentar timeout o dividir requests.

184. SSL certificate error
     Solución: actualizar certificados o usar https correcto.

185. Database connection falla
     Solución: verificar credenciales y conexión.

186. File lock por otro proceso
     Solución: esperar o usar file lock con timeout.

187. Permission denied en red
     Solución: verificar firewall y permisos.

188. DNS resolution falla
     Solución: verificar conectividad y DNS.

189. Port bloqueado
     Solución: usar puerto alternativo o configurar firewall.

190. Service unavailable
     Solución: implementar retry con backoff.

## ERRORES DE SEGURIDAD

191. Password en texto plano
     Solución: hashear con bcrypt o similar.

192. SQL injection posible
     Solución: usar prepared statements.

193. Path traversal posible
     Solución: validar y sanitizar paths.

194. Code injection posible
     Solución: no usar eval con input de usuario.

195. XXE en XML parser
     Solución: deshabilitar external entities.

196. Insecure random
     Solución: usar SecureRandom en lugar de rand.

197. Session hijacking posible
     Solución: regenerar session ID después de login.

198. CSRF vulnerable
     Solución: usar tokens CSRF.

199. Clickjacking posible
     Solución: usar X-Frame-Options header.

200. Information disclosure en errores
     Solución: mostrar mensajes genéricos en producción.

## ERRORES DE CONFIGURACIÓN

201. Environment variable no definida
     Solución: verificar existencia con ENV['VAR'] || default.

202. Config file no encontrado
     Solución: crear config por defecto si no existe.

203. Invalid config format
     Solución: validar formato antes de parsear.

204. Missing required config
     Solución: validar todas las configs requeridas al inicio.

205. Config no persiste
     Solución: verificar permisos de escritura.

206. Config corrupto
     Solución: restaurar desde backup o defaults.

207. Incompatible config version
     Solución: migrar config a nueva versión.

208. Config override no funciona
     Solución: verificar orden de carga de configs.

209. Default config incorrecto
     Solución: revisar valores por defecto.

210. Config path hardcoded
     Solución: usar path relativo o configurable.

## ERRORES DE LOGGING

211. Log file crece sin límite
     Solución: implementar log rotation.

212. Log level incorrecto
     Solución: usar DEBUG solo en desarrollo.

213. Sensitive data en logs
     Solución: sanitizar datos antes de loggear.

214. Log sin timestamp
     Solución: incluir timestamp en cada entrada.

215. Log sin contexto
     Solución: incluir información de contexto relevante.

216. Múltiples logs del mismo evento
     Solución: loggear solo una vez por evento.

217. Log no flush
     Solución: flush después de escribir.

218. Log file permission denied
     Solución: verificar permisos de directorio.

219. Log encoding incorrecto
     Solución: usar UTF-8 para logs.

220. Stack trace no completo
     Solución: incluir full backtrace en logs.

## ERRORES DE TESTING

221. Test falla por estado compartido
     Solución: limpiar estado entre tests.

222. Test depende de orden de ejecución
     Solución: hacer tests independientes.

223. Mock no resetea
     Solución: limpiar mocks después de cada test.

224. Assertion incorrecta
     Solución: usar assertion apropiada para tipo.

225. Test timeout
     Solución: aumentar timeout o optimizar test.

226. Test flaky
     Solución: eliminar dependencia de timing o aleatorios.

227. Test coverage incompleto
     Solución: añadir tests para edge cases.

228. Test no falla cuando debería
     Solución: verificar lógica de assertion.

229. Test data hardcoded
     Solución: usar factories o fixtures.

230. Test deja archivos temporales
     Solución: limpiar archivos en cleanup.

## ERRORES DE DEPLOYMENT

231. Missing dependency en producción
     Solución: documentar todas las dependencias.

232. Wrong Ruby version
     Solución: especificar versión requerida.

233. File path incorrecto en producción
     Solución: usar paths relativos o ENV vars.

234. Database migration no ejecutada
     Solución: ejecutar migrations en deploy.

235. Assets no compilados
     Solución: compilar assets antes de deploy.

236. Service no reinicia
     Solución: reiniciar servicio después de deploy.

237. Rollback incompleto
     Solución: documentar proceso de rollback.

238. Deploy sin backup
     Solución: hacer backup antes de deploy.

239. Downtime no planeado
     Solución: usar blue-green deployment.

240. Cache no invalidado
     Solución: invalidar cache después de deploy.

## ERRORES DE DOCUMENTACIÓN

241. README desactualizado
     Solución: actualizar README con cada cambio.

242. API docs faltantes
     Solución: documentar todos los métodos públicos.

243. Ejemplos no funcionan
     Solución: verificar que ejemplos sean válidos.

244. Changelog incompleto
     Solución: mantener changelog actualizado.

245. Installation steps incorrectos
     Solución: validar steps con instalación limpia.

246. Dependencies no listadas
     Solución: listar todas las dependencias.

247. Version compatibility no especificada
     Solución: especificar versiones compatibles.

248. Breaking changes no destacados
     Solución: marcar breaking changes claramente.

249. Migration guide faltante
     Solución: proveer guía de migración.

250. License no especificada
     Solución: incluir LICENSE file.

