import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [defineArrayMember({type: 'navigationItem'})],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'string',
      description: 'Use absolute paths or section links, for example /#contact.',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Navigation',
    }),
  },
})
