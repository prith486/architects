import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'portfolio', title: 'Portfolio Intro'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroSupportingText',
      title: 'Hero Supporting Text',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'phaseSlides',
      title: 'Phase Slides',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'phaseSlide',
          title: 'Phase Slide',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'portfolioSectionTitle',
      title: 'Portfolio Section Title',
      type: 'string',
      group: 'portfolio',
    }),
    defineField({
      name: 'portfolioSupportingText',
      title: 'Portfolio Supporting Text',
      type: 'text',
      rows: 3,
      group: 'portfolio',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Homepage',
    }),
  },
})
