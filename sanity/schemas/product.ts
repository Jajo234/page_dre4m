import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Camiseta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: Argentina 1986 Maradona',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'team',
      title: 'Equipo',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'season',
      title: 'Temporada / Año',
      type: 'string',
      description: 'Ej: 1986, 2023/24',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Retro', value: 'retro' },
          { title: 'Versión Jugador', value: 'jugador' },
          { title: 'Versión Fan', value: 'fan' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'sizes',
      title: 'Tallas disponibles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'S', value: 'S' },
          { title: 'M', value: 'M' },
          { title: 'L', value: 'L' },
          { title: 'XL', value: 'XL' },
          { title: 'XXL', value: 'XXL' },
        ],
      },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'stock',
      title: 'En stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en home',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'season', media: 'images.0' },
  },
});
