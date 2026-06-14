import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const paths = ['node_modules', '.next', 'out', 'dist'];

await Promise.all(
  paths.map((path) =>
    rm(join(process.cwd(), path), { recursive: true, force: true })
  )
);

console.log('Removed build artifacts and dependencies.');
