import {defineArrayMember, defineField, defineType} from 'sanity'

export const contactFooter = defineType({
  name: 'contactFooter',
  title: 'Contact / Footer',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact Section'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Contact / Footer',
    }),
  },
})
