import { defineField, defineType } from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      type: 'string',
      description: 'Display number, e.g. "01"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'duration',
      type: 'string',
      description: 'e.g. "1–2 weeks"',
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      type: 'number',
      initialValue: 0,
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
    select: { title: 'title', subtitle: 'duration' },
  },
})
