# McComics Licensing Bootstrap Kit

Esta carpeta es el contrato canónico para integrar un programa McComics nuevo.

## Regla de arranque

1. Crear un `product_id` único en formato slug.
2. Persistir un UUID de instalación; no generar uno nuevo en cada arranque.
3. Calcular una huella SHA-256 de 64 caracteres.
4. Enviar una sola petición a `POST https://licencias.grupomccomics.com/v1/licenses/session` al abrir el proceso.
5. No habilitar la interfaz principal si `valid` no es `true`.
6. Para freemium, omitir `licenseKey`. Para pago o premium, enviar la clave en el mismo contrato.
7. Consultar actualizaciones con el manifiesto exclusivo del producto en `https://actualice.grupomccomics.com/<nombre>_version.json`.
8. Verificar `signature`, `signed_payload` y el SHA-256 del instalador antes de ejecutar una actualización.
9. Incluir la clave pública o su fingerprint aprobado en la aplicación. `/api/licenses/public-key` sirve para distribución y rotación controlada, no para confiar ciegamente en una clave recibida durante la misma actualización.

La sesión se conserva en memoria durante el proceso para evitar consultas repetidas. Un nuevo arranque abre una sesión nueva.

## Fuentes canónicas

- SDKs: `sdks/`
- Plantillas de aplicación: `templates/`
- Contratos JSON: `integration-kit/contracts/`
- Ejemplo por producto: `integration-kit/product.config.example.json`
- Producto Notas McComics: `integration-kit/products/notas_mccomics.product.json`

Ejecuta `npm run verify:integration-kit` antes de integrar o publicar un producto.

## Alta de release

La release se registra por el panel/API solo después de publicar el instalador y calcular su SHA-256 real. No se permite un hash ficticio ni una descarga HTTP.

```http
POST /api/updates/releases
Authorization: Bearer <JWT_ADMIN>
Content-Type: application/json

{
  "productId": "<UUID_INTERNO_DEL_PRODUCTO>",
  "channel": "stable",
  "version": "1.1.0",
  "downloadUrl": "https://github.com/organizacion/repositorio/releases/download/v1.1.0/instalador.exe",
  "sha256": "<64_HEX_REALES>",
  "size": 12345678,
  "mandatory": false
}
```
