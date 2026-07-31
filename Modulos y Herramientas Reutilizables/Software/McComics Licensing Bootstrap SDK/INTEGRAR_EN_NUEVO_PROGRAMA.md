# Integrar licencias y actualizaciones McComics

Una IA que integre un programa nuevo debe abrir primero `canonical-kit/README.md` y el ejemplo de producto.

## Fuente única

- Carpeta local canónica: `canonical-kit/`
- Repositorio: `https://github.com/McComics-Servics/MSLS.git`
- Servidor de licencias: `https://licencias.grupomccomics.com`
- Servidor de actualizaciones: `https://actualice.grupomccomics.com`

No inventar otro endpoint, otro formato de huella o un `version.json` compartido. Cada programa necesita un `product_id` y un `<programa>_version.json` exclusivos.

## Criterio de aceptación

- Una sola petición de sesión por proceso al abrir.
- UUID de instalación persistente.
- Huella SHA-256 de 64 caracteres.
- Freemium sin clave; pago/híbrido con clave en el mismo endpoint.
- La app no abre su funcionalidad si `valid` no es `true`.
- Descarga HTTPS, manifiesto firmado y SHA-256 real del instalador.
- Ningún secreto del servidor se incluye en el cliente.

Ejecutar en el repositorio MSLS:

```powershell
npm run verify:integration-kit
```
