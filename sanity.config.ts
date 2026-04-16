import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'retro-shop',
  title: 'Dre4m',
  projectId: 'wo04x4kq',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});