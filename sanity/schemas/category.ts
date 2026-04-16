import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Selecciones, Premier League, La Liga, Retro Clásicos',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
  ],
});
