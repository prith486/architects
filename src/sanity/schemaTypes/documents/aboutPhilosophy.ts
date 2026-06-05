import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPhilosophy = defineType({
  name: 'aboutPhilosophy',
  title: 'About / Philosophy',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'showreel', title: 'Cinematic Showreel'},
  ],
  fields: [
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      group: 'content',
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
    defineField({
      name: 'showreelEyebrow',
      title: 'Showreel Eyebrow',
      type: 'string',
      group: 'showreel',
    }),
    defineField({
      name: 'showreelTitle',
      title: 'Showreel Title',
      type: 'string',
      group: 'showreel',
    }),
    defineField({
      name: 'showreelVideoUrl',
      title: 'Showreel Video URL',
      type: 'url',
      group: 'showreel',
    }),
    defineField({
      name: 'showreelCaptionEyebrow',
      title: 'Showreel Caption Eyebrow',
      type: 'string',
      group: 'showreel',
    }),
    defineField({
      name: 'showreelCaptionTitle',
      title: 'Showreel Caption Title',
      type: 'string',
      group: 'showreel',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'About / Philosophy',
    }),
  },
})
