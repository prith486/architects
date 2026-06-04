import {PROJECTS} from '@/data/projects'

type SafeCardAspect = 'aspect-[3/4]' | 'aspect-[4/3]' | 'aspect-[1/1]'

interface SanityCardImage {
  assetUrl?: string | null
}

export interface SanityPortfolioProjectDocument {
  _id?: string
  title?: string | null
  slug?: string | null
  category?: string | null
  sortOrder?: number | null
  cardAspect?: string | null
  cardColor?: string | null
  logoText?: string | null
  cardImage?: SanityCardImage | null
  cardImageUrl?: string | null
}

export interface PortfolioProjectCardData {
  id: string
  slug: string
  title: string
  category: string
  image: string
  aspect: SafeCardAspect
  color: string
  logoText: string
  sortOrder: number
}

const SAFE_CARD_ASPECTS = new Set<string>(['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[1/1]'])

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : undefined
}

function isSafeCardAspect(value: string | null | undefined): value is SafeCardAspect {
  return typeof value === 'string' && SAFE_CARD_ASPECTS.has(value)
}

export const PORTFOLIO_PROJECT_CARD_FALLBACK: PortfolioProjectCardData[] = PROJECTS.map(
  (project, index) => ({
    id: String(project.id),
    slug: project.slug,
    title: project.title,
    category: project.category,
    image: project.image,
    aspect: isSafeCardAspect(project.aspect) ? project.aspect : 'aspect-[3/4]',
    color: project.color,
    logoText: project.logoText,
    sortOrder: index + 1,
  }),
)

export function mapPortfolioShowcaseProjects(
  documents: SanityPortfolioProjectDocument[] | null | undefined,
): PortfolioProjectCardData[] {
  if (!documents || documents.length < PORTFOLIO_PROJECT_CARD_FALLBACK.length) {
    return PORTFOLIO_PROJECT_CARD_FALLBACK
  }

  const fallbackBySlug = new Map(PORTFOLIO_PROJECT_CARD_FALLBACK.map((project) => [project.slug, project]))
  const sanityBySlug = new Map(documents.map((document) => [cleanString(document.slug), document]))

  const hasExpectedOrder = PORTFOLIO_PROJECT_CARD_FALLBACK.every((fallbackProject, index) => {
    const sanityProject = documents[index]
    return cleanString(sanityProject?.slug) === fallbackProject.slug
  })

  if (!hasExpectedOrder) {
    return PORTFOLIO_PROJECT_CARD_FALLBACK
  }

  const mappedProjects = PORTFOLIO_PROJECT_CARD_FALLBACK.map((fallbackProject) => {
    const sanityProject = sanityBySlug.get(fallbackProject.slug)
    if (!sanityProject) return null

    const title = cleanString(sanityProject.title)
    const slug = cleanString(sanityProject.slug)
    const category = cleanString(sanityProject.category)
    const color = cleanString(sanityProject.cardColor)
    const logoText = cleanString(sanityProject.logoText)
    const sortOrder = sanityProject.sortOrder

    if (!title || !slug || !category || !color || !logoText || typeof sortOrder !== 'number') {
      return null
    }

    return {
      id: sanityProject._id ?? fallbackProject.id,
      slug,
      title,
      category,
      image:
        cleanString(sanityProject.cardImage?.assetUrl) ??
        cleanString(sanityProject.cardImageUrl) ??
        fallbackBySlug.get(slug)?.image ??
        fallbackProject.image,
      aspect: isSafeCardAspect(sanityProject.cardAspect) ? sanityProject.cardAspect : fallbackProject.aspect,
      color,
      logoText,
      sortOrder,
    }
  })

  if (mappedProjects.some((project) => !project)) {
    return PORTFOLIO_PROJECT_CARD_FALLBACK
  }

  return mappedProjects as PortfolioProjectCardData[]
}
