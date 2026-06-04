interface SanityPhaseSlide {
  title?: string | null
  description?: string | null
}

export interface SanityHomepageDocument {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroSupportingText?: string | null
  phaseSlides?: SanityPhaseSlide[] | null
  portfolioSectionTitle?: string | null
  portfolioSupportingText?: string | null
  seo?: {
    title?: string | null
    description?: string | null
  } | null
}

export interface HomepagePhaseSlideData {
  title: string
  description: string
}

export interface HomepageData {
  heroTitle: string
  heroSubtitle: string
  heroSupportingText: string
  phaseSlides: HomepagePhaseSlideData[]
  portfolioIntroTitle: string
  portfolioHelperText: string
}

export const HOMEPAGE_FALLBACK: HomepageData = {
  heroTitle: 'Spaces that elevate.\nExperiences that endure.',
  heroSubtitle:
    'We design with intention, craft with precision\nand build places that inspire for generations.',
  heroSupportingText:
    'Forging the intersection of raw materiality and natural harmony. We sculpt light, shadow, and geometry to create uncompromising architectural statements.',
  phaseSlides: [
    {
      title: 'Absolute Precision.',
      description: 'Every millimeter calculated. Every angle deliberate.',
    },
    {
      title: 'Living Reality.',
      description: 'Bridging the gap between the drafted line and the built environment.',
    },
    {
      title: 'Curated Spaces.',
      description: 'Interiors designed for the human experience.',
    },
  ],
  portfolioIntroTitle: 'Curated Spaces',
  portfolioHelperText: 'Scroll to break alignment',
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'Homepage' ? trimmed : undefined
}

function cleanPortfolioTitle(value: string | null | undefined) {
  const title = cleanString(value)
  return title && title !== 'Curated Space' ? title : undefined
}

export function mapHomepageData(document: SanityHomepageDocument | null | undefined): HomepageData {
  return {
    heroTitle: cleanString(document?.heroTitle) ?? HOMEPAGE_FALLBACK.heroTitle,
    heroSubtitle: cleanString(document?.heroSubtitle) ?? HOMEPAGE_FALLBACK.heroSubtitle,
    heroSupportingText:
      cleanString(document?.heroSupportingText) ?? HOMEPAGE_FALLBACK.heroSupportingText,
    phaseSlides: HOMEPAGE_FALLBACK.phaseSlides.map((fallbackSlide, index) => {
      const sanitySlide = document?.phaseSlides?.[index]

      return {
        title: cleanString(sanitySlide?.title) ?? fallbackSlide.title,
        description: cleanString(sanitySlide?.description) ?? fallbackSlide.description,
      }
    }),
    portfolioIntroTitle:
      cleanPortfolioTitle(document?.portfolioSectionTitle) ?? HOMEPAGE_FALLBACK.portfolioIntroTitle,
    portfolioHelperText:
      cleanString(document?.portfolioSupportingText) ?? HOMEPAGE_FALLBACK.portfolioHelperText,
  }
}
