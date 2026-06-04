import type {Project} from '@/data/projects'

interface SanityImageValue {
  alt?: string | null
  assetUrl?: string | null
}

export interface SanityProjectDocument {
  _id?: string
  title?: string | null
  slug?: string | null
  category?: string | null
  sortOrder?: number | null
  cardAspect?: string | null
  cardColor?: string | null
  logoText?: string | null
  cardImage?: SanityImageValue | null
  cardImageUrl?: string | null
  heroImage?: SanityImageValue | null
  heroImageUrl?: string | null
  heroCaption?: string | null
  metadata?: {
    year?: string | null
    location?: string | null
    area?: string | null
    client?: string | null
  } | null
  narrativeHeading?: string | null
  narrativeParagraphs?: string[] | null
  galleryTitle?: string | null
  galleryItems?: Array<{
    label?: string | null
    image?: SanityImageValue | null
    imageUrl?: string | null
  }> | null
  designIntentHeading?: string | null
  designIntentBody?: unknown
  materialityHeading?: string | null
  materialityBody?: unknown
  materialityImage?: SanityImageValue | null
  materialityImageUrl?: string | null
  cinematicQuote?: string | null
  cinematicQuoteAttribution?: string | null
  cinematicQuoteBackgroundImage?: SanityImageValue | null
  cinematicQuoteBackgroundImageUrl?: string | null
  relatedProjects?: SanityProjectDocument[] | null
  seo?: {
    title?: string | null
    description?: string | null
    image?: SanityImageValue | null
  } | null
  seoImageUrl?: string | null
}

export interface MappedProject extends Project {
  sanity?: {
    heroCaption?: string
    cardImage?: string
    gallery?: Array<{
      src: string
      alt: string
      label: string
    }>
    narrativeHeading?: string
    narrativeParagraphs?: string[]
    designIntentHeading?: string
    designIntentBody?: unknown
    materialityHeading?: string
    materialityBody?: unknown
    materialityImage?: string
    cinematicQuote?: string
    cinematicQuoteAttribution?: string
    cinematicQuoteBackgroundImage?: string
    relatedProjects?: MappedProject[]
    seo?: {
      title?: string
      description?: string
      image?: string
    }
  }
}

function firstString(...values: Array<string | null | undefined>) {
  return values.find((value): value is string => typeof value === 'string' && value.trim().length > 0)
}

function resolveImage(
  uploadedImage: SanityImageValue | null | undefined,
  externalUrl: string | null | undefined,
  hardcodedFallback: string | undefined,
) {
  return firstString(uploadedImage?.assetUrl, externalUrl, hardcodedFallback)
}

export function mapSanityProjectToProject(
  sanityProject: SanityProjectDocument | null | undefined,
  hardcodedFallback?: Project,
): MappedProject | null {
  if (!sanityProject && !hardcodedFallback) return null

  const slug = firstString(sanityProject?.slug, hardcodedFallback?.slug)
  const title = firstString(sanityProject?.title, hardcodedFallback?.title)
  const category = firstString(sanityProject?.category, hardcodedFallback?.category)
  const year = firstString(sanityProject?.metadata?.year, hardcodedFallback?.details.year)
  const location = firstString(sanityProject?.metadata?.location, hardcodedFallback?.details.location)
  const area = firstString(sanityProject?.metadata?.area, hardcodedFallback?.details.area)
  const client = firstString(sanityProject?.metadata?.client, hardcodedFallback?.details.client)
  const image = resolveImage(sanityProject?.heroImage, sanityProject?.heroImageUrl, hardcodedFallback?.image)

  if (!slug || !title || !category || !year || !location || !area || !client || !image) {
    return hardcodedFallback ?? null
  }

  const description =
    firstString(sanityProject?.narrativeParagraphs?.[0], hardcodedFallback?.description) ?? ''

  const mappedProject: MappedProject = {
    id: hardcodedFallback?.id ?? sanityProject?.sortOrder ?? 0,
    slug,
    title,
    category: category as Project['category'],
    image,
    aspect: firstString(sanityProject?.cardAspect, hardcodedFallback?.aspect) ?? 'aspect-[3/4]',
    description,
    details: {
      year,
      location,
      area,
      client,
    },
    color: firstString(sanityProject?.cardColor, hardcodedFallback?.color) ?? '#3F4E3F',
    logoText: firstString(sanityProject?.logoText, hardcodedFallback?.logoText) ?? 'ms',
    sanity: {
      heroCaption: firstString(sanityProject?.heroCaption),
      cardImage: resolveImage(sanityProject?.cardImage, sanityProject?.cardImageUrl, hardcodedFallback?.image),
      gallery: sanityProject?.galleryItems
        ?.map((item) => {
          const src = resolveImage(item.image, item.imageUrl, image)
          if (!src) return null

          return {
            src,
            alt: firstString(item.image?.alt, `${title} ${item.label ?? 'gallery image'}`) ?? title,
            label: firstString(item.label) ?? 'Project Image',
          }
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
      narrativeHeading: firstString(sanityProject?.narrativeHeading),
      narrativeParagraphs: sanityProject?.narrativeParagraphs?.filter(
        (paragraph): paragraph is string => typeof paragraph === 'string' && paragraph.trim().length > 0,
      ),
      designIntentHeading: firstString(sanityProject?.designIntentHeading),
      designIntentBody: sanityProject?.designIntentBody,
      materialityHeading: firstString(sanityProject?.materialityHeading),
      materialityBody: sanityProject?.materialityBody,
      materialityImage: resolveImage(
        sanityProject?.materialityImage,
        sanityProject?.materialityImageUrl,
        image,
      ),
      cinematicQuote: firstString(sanityProject?.cinematicQuote),
      cinematicQuoteAttribution: firstString(sanityProject?.cinematicQuoteAttribution),
      cinematicQuoteBackgroundImage: resolveImage(
        sanityProject?.cinematicQuoteBackgroundImage,
        sanityProject?.cinematicQuoteBackgroundImageUrl,
        image,
      ),
      relatedProjects: sanityProject?.relatedProjects
        ?.map((relatedProject) => mapSanityProjectToProject(relatedProject))
        .filter((project): project is MappedProject => Boolean(project)),
      seo: {
        title: firstString(sanityProject?.seo?.title, `${title} | VAASTU Architecture`),
        description: firstString(sanityProject?.seo?.description, description),
        image: resolveImage(sanityProject?.seo?.image, sanityProject?.seoImageUrl, image),
      },
    },
  }

  return mappedProject
}
