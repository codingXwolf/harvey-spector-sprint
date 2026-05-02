import { defineField, defineType } from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imagePath',
      title: 'Image path',
      description: 'Path under /public (e.g. /surfboard.png)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'objectPosition',
      title: 'Image object-position',
      description: 'CSS object-position value, e.g. "center" or "center 30%"',
      type: 'string',
      initialValue: 'center',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'href',
      title: 'Link URL',
      type: 'url',
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'imagePath' },
  },
})
