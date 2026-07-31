import fs from 'node:fs';
import path from 'node:path';

const files = process.argv.slice(2);
if (files.length === 0) {
    console.error('Indica al menos un archivo product config.');
    process.exit(2);
}

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const manifest = /^[a-z0-9_]+_version\.json$/;
const semver = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const modes = new Set(['freemium', 'paid', 'hybrid']);

for (const filename of files) {
    const config = JSON.parse(fs.readFileSync(filename, 'utf8'));
    const errors = [];
    if (config.schema_version !== 1) errors.push('schema_version debe ser 1');
    if (!slug.test(config.product_id ?? '')) errors.push('product_id no es un slug válido');
    if (!semver.test(config.app_version ?? '')) errors.push('app_version no es SemVer');
    if (!modes.has(config.license_mode)) errors.push('license_mode no es válido');
    if (!manifest.test(config.update_manifest_name ?? '')) errors.push('update_manifest_name no es válido');
    for (const field of ['license_server_url', 'update_manifest_url']) {
        if (!String(config[field] ?? '').startsWith('https://')) errors.push(`${field} debe usar HTTPS`);
    }
    if (!String(config.update_manifest_url ?? '').endsWith(`/${config.update_manifest_name}`)) {
        errors.push('update_manifest_url no coincide con update_manifest_name');
    }
    if (errors.length > 0) {
        console.error(`${path.basename(filename)}: ${errors.join('; ')}`);
        process.exitCode = 1;
    } else {
        console.log(`${path.basename(filename)}: OK`);
    }
}
