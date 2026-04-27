import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'node_modules/gentelella-legacy-vendors/vendors');
const target = resolve(root, 'public/components');
const easyAutocompleteSource = resolve(root, 'node_modules/easy-autocomplete');
const easyAutocompleteTarget = resolve(target, 'EasyAutocomplete');

await mkdir(resolve(root, 'public'), { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
await cp(easyAutocompleteSource, easyAutocompleteTarget, { recursive: true });
