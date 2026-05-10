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
      title: 'External link (optional)',
      description:
        'Optional external case study URL. If empty, the card links to the internal detail page at /projects/[slug].',
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

    // --- Detail page fields ---
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'detail',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'detail',
    }),
    defineField({
      name: 'role',
      title: 'Role / disciplines',
      description: 'What we did on this project (e.g. Branding, Web).',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'detail',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short paragraph shown on the detail hero.',
      type: 'text',
      rows: 3,
      group: 'detail',
    }),
    defineField({
      name: 'body',
      title: 'Body paragraphs',
      description: 'Long-form story, one paragraph per entry.',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'detail',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'detail',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'imagePath',
              title: 'Image path',
              description: 'Path under /public (e.g. /surfboard.png).',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
            }),
            defineField({
              name: 'objectPosition',
              type: 'string',
              initialValue: 'center',
            }),
            defineField({
              name: 'wide',
              title: 'Full-width',
              description: 'Render edge-to-edge instead of in the column grid.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'caption', subtitle: 'imagePath' },
          },
        },
      ],
    }),
    defineField({
      name: 'nextProject',
      title: 'Next project',
      type: 'reference',
      to: [{ type: 'portfolio' }],
      group: 'detail',
    }),
  ],
  groups: [
    { name: 'detail', title: 'Detail page' },
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
