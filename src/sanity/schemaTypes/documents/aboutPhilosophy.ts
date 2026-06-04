import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPhilosophy = defineType({
  name: 'aboutPhilosophy',
  title: 'About / Philosophy',
  type: 'document',
  fields: [
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'philosophyPanel',
          title: 'Panel',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
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
              rows: 4,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
              media: 'image.image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'About / Philosophy',
    }),
  },
})
