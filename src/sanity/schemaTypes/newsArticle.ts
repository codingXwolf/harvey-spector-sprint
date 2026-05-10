import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
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
      name: 'date',
      title: 'Publish date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      description: 'e.g. Press, Award, Studio note',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image path',
      description: 'Path under /public (e.g. /maker.png)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'objectPosition',
      type: 'string',
      initialValue: 'center',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      description: 'Short paragraph shown on cards and the article hero.',
    }),
    defineField({
      name: 'body',
      title: 'Body paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External link (optional)',
      description:
        'If set, cards link out to this URL instead of the internal article page.',
      type: 'url',
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ['http', 'https'] }),
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
      title: 'Newest first',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'coverImage' },
  },
})
