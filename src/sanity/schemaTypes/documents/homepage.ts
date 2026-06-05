import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'pedigree', title: 'Pedigree Marquee'},
    {name: 'portfolio', title: 'Portfolio Intro'},
    {name: 'visionBuilder', title: 'Vision Builder'},
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
      name: 'heroShowreelButtonText',
      title: 'Hero Showreel Button Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroBrandName',
      title: 'Hero Brand Name',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroBrandTagline',
      title: 'Hero Brand Tagline',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroExploreText',
      title: 'Hero Explore Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroFinalStatement',
      title: 'Hero Final Statement',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaText',
      title: 'Hero Primary CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaText',
      title: 'Hero Secondary CTA Text',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroInstagramUrl',
      title: 'Hero Instagram URL',
      type: 'url',
      group: 'hero',
    }),
    defineField({
      name: 'heroLinkedinUrl',
      title: 'Hero LinkedIn URL',
      type: 'url',
      group: 'hero',
    }),
    defineField({
      name: 'heroEmailUrl',
      title: 'Hero Email URL',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTwitterUrl',
      title: 'Hero Twitter URL',
      type: 'url',
      group: 'hero',
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
      name: 'pedigreeEyebrow',
      title: 'Pedigree Eyebrow',
      type: 'string',
      group: 'pedigree',
    }),
    defineField({
      name: 'pedigreeItems',
      title: 'Pedigree Items',
      type: 'array',
      group: 'pedigree',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'visionBuilderEyebrow',
      title: 'Vision Builder Eyebrow',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderHeading',
      title: 'Vision Builder Heading',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderSteps',
      title: 'Vision Builder Steps',
      type: 'array',
      group: 'visionBuilder',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'visionBuilderStep',
          title: 'Vision Builder Step',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'visionBuilderOption',
                  title: 'Option',
                  fields: [
                    defineField({
                      name: 'id',
                      title: 'ID',
                      type: 'string',
                      description: 'Keep stable for matching icons and submissions.',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'id',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'visionBuilderCaptureHeading',
      title: 'Vision Builder Capture Heading',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderCaptureDescription',
      title: 'Vision Builder Capture Description',
      type: 'text',
      rows: 3,
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderEmailPlaceholder',
      title: 'Vision Builder Email Placeholder',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderValidationMessage',
      title: 'Vision Builder Validation Message',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderSubmitText',
      title: 'Vision Builder Submit Text',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderSubmittingText',
      title: 'Vision Builder Submitting Text',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderSuccessHeading',
      title: 'Vision Builder Success Heading',
      type: 'string',
      group: 'visionBuilder',
    }),
    defineField({
      name: 'visionBuilderSuccessDescription',
      title: 'Vision Builder Success Description',
      type: 'text',
      rows: 2,
      group: 'visionBuilder',
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
