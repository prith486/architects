interface SanityPhaseSlide {
  title?: string | null
  description?: string | null
}

interface SanityVisionBuilderOption {
  id?: string | null
  label?: string | null
}

interface SanityVisionBuilderStep {
  title?: string | null
  options?: SanityVisionBuilderOption[] | null
}

export interface SanityHomepageDocument {
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroSupportingText?: string | null
  phaseSlides?: SanityPhaseSlide[] | null
  heroShowreelButtonText?: string | null
  heroBrandName?: string | null
  heroBrandTagline?: string | null
  heroExploreText?: string | null
  heroFinalStatement?: string | null
  heroPrimaryCtaText?: string | null
  heroSecondaryCtaText?: string | null
  heroInstagramUrl?: string | null
  heroLinkedinUrl?: string | null
  heroEmailUrl?: string | null
  heroTwitterUrl?: string | null
  portfolioSectionTitle?: string | null
  portfolioSupportingText?: string | null
  pedigreeEyebrow?: string | null
  pedigreeItems?: string[] | null
  visionBuilderEyebrow?: string | null
  visionBuilderHeading?: string | null
  visionBuilderSteps?: SanityVisionBuilderStep[] | null
  visionBuilderCaptureHeading?: string | null
  visionBuilderCaptureDescription?: string | null
  visionBuilderEmailPlaceholder?: string | null
  visionBuilderValidationMessage?: string | null
  visionBuilderSubmitText?: string | null
  visionBuilderSubmittingText?: string | null
  visionBuilderSuccessHeading?: string | null
  visionBuilderSuccessDescription?: string | null
  seo?: {
    title?: string | null
    description?: string | null
  } | null
}

export interface HomepagePhaseSlideData {
  title: string
  description: string
}

export interface PedigreeMarqueeData {
  eyebrow: string
  items: string[]
}

export interface VisionBuilderOptionData {
  id: string
  label: string
}

export interface VisionBuilderStepData {
  title: string
  options: VisionBuilderOptionData[]
}

export interface VisionBuilderData {
  eyebrow: string
  heading: string
  steps: VisionBuilderStepData[]
  captureHeading: string
  captureDescription: string
  emailPlaceholder: string
  validationMessage: string
  submitText: string
  submittingText: string
  successHeading: string
  successDescription: string
}

export interface HeroUiData {
  showreelButtonText: string
  brandName: string
  brandTagline: string
  exploreText: string
  finalStatement: string
  primaryCtaText: string
  secondaryCtaText: string
  instagramUrl: string
  linkedinUrl: string
  emailUrl: string
  twitterUrl: string
}

export interface HomepageData {
  heroTitle: string
  heroSubtitle: string
  heroSupportingText: string
  phaseSlides: HomepagePhaseSlideData[]
  heroUi: HeroUiData
  portfolioIntroTitle: string
  portfolioHelperText: string
  pedigreeMarquee: PedigreeMarqueeData
  visionBuilder: VisionBuilderData
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
  heroUi: {
    showreelButtonText: 'Watch Showreel',
    brandName: 'VAASTU',
    brandTagline: 'ARCHITECTURE . INTERIORS . HARMONY',
    exploreText: 'EXPLORE OUR PHILOSOPHY',
    finalStatement: 'Silent Strength. Enduring Design.',
    primaryCtaText: 'EXPLORE PROJECTS',
    secondaryCtaText: 'START A PROJECT',
    instagramUrl: '#',
    linkedinUrl: '#',
    emailUrl: 'mailto:contact@vaastu.com',
    twitterUrl: '#',
  },
  portfolioIntroTitle: 'Curated Spaces',
  portfolioHelperText: 'Scroll to break alignment',
  pedigreeMarquee: {
    eyebrow: 'Recognized & Featured In',
    items: [
      'ARCHITECTURAL DIGEST',
      'DEZEEN',
      'ARCHDAILY',
      'DWELL',
      'THE TIMES OF INDIA',
      'VOGUE LIVING',
      'WALLPAPER*',
    ],
  },
  visionBuilder: {
    eyebrow: 'Interactive Profile',
    heading: 'Build your vision.',
    steps: [
      {
        title: 'Select your terrain.',
        options: [
          {id: 'urban', label: 'Urban Plot'},
          {id: 'hillside', label: 'Hillside'},
          {id: 'waterfront', label: 'Waterfront'},
        ],
      },
      {
        title: 'Determine the scale.',
        options: [
          {id: 'minimalist', label: 'Minimalist Retreat'},
          {id: 'estate', label: 'Grand Estate'},
          {id: 'commercial', label: 'Commercial Space'},
        ],
      },
      {
        title: 'Define the aesthetic.',
        options: [
          {id: 'brutalist', label: 'Raw Brutalism'},
          {id: 'warm_modern', label: 'Warm Modernism'},
          {id: 'classic', label: 'Timeless Classic'},
        ],
      },
    ],
    captureHeading: 'Your profile is ready.',
    captureDescription:
      'Enter your email to generate a custom lookbook featuring floorplans and concepts matching your exact parameters.',
    emailPlaceholder: 'Email Address',
    validationMessage: 'Please enter a valid email address',
    submitText: 'View My Portfolio',
    submittingText: 'Generating...',
    successHeading: 'Check your inbox.',
    successDescription: 'Your custom architectural lookbook is on its way.',
  },
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
  const pedigreeItems = document?.pedigreeItems
    ?.map((item) => cleanString(item))
    .filter((item): item is string => Boolean(item))

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
    heroUi: {
      showreelButtonText:
        cleanString(document?.heroShowreelButtonText) ??
        HOMEPAGE_FALLBACK.heroUi.showreelButtonText,
      brandName: cleanString(document?.heroBrandName) ?? HOMEPAGE_FALLBACK.heroUi.brandName,
      brandTagline:
        cleanString(document?.heroBrandTagline) ?? HOMEPAGE_FALLBACK.heroUi.brandTagline,
      exploreText: cleanString(document?.heroExploreText) ?? HOMEPAGE_FALLBACK.heroUi.exploreText,
      finalStatement:
        cleanString(document?.heroFinalStatement) ?? HOMEPAGE_FALLBACK.heroUi.finalStatement,
      primaryCtaText:
        cleanString(document?.heroPrimaryCtaText) ?? HOMEPAGE_FALLBACK.heroUi.primaryCtaText,
      secondaryCtaText:
        cleanString(document?.heroSecondaryCtaText) ?? HOMEPAGE_FALLBACK.heroUi.secondaryCtaText,
      instagramUrl: cleanString(document?.heroInstagramUrl) ?? HOMEPAGE_FALLBACK.heroUi.instagramUrl,
      linkedinUrl: cleanString(document?.heroLinkedinUrl) ?? HOMEPAGE_FALLBACK.heroUi.linkedinUrl,
      emailUrl: cleanString(document?.heroEmailUrl) ?? HOMEPAGE_FALLBACK.heroUi.emailUrl,
      twitterUrl: cleanString(document?.heroTwitterUrl) ?? HOMEPAGE_FALLBACK.heroUi.twitterUrl,
    },
    portfolioIntroTitle:
      cleanPortfolioTitle(document?.portfolioSectionTitle) ?? HOMEPAGE_FALLBACK.portfolioIntroTitle,
    portfolioHelperText:
      cleanString(document?.portfolioSupportingText) ?? HOMEPAGE_FALLBACK.portfolioHelperText,
    pedigreeMarquee: {
      eyebrow: cleanString(document?.pedigreeEyebrow) ?? HOMEPAGE_FALLBACK.pedigreeMarquee.eyebrow,
      items:
        pedigreeItems && pedigreeItems.length > 0
          ? pedigreeItems
          : HOMEPAGE_FALLBACK.pedigreeMarquee.items,
    },
    visionBuilder: {
      eyebrow:
        cleanString(document?.visionBuilderEyebrow) ?? HOMEPAGE_FALLBACK.visionBuilder.eyebrow,
      heading:
        cleanString(document?.visionBuilderHeading) ?? HOMEPAGE_FALLBACK.visionBuilder.heading,
      steps: HOMEPAGE_FALLBACK.visionBuilder.steps.map((fallbackStep, index) => {
        const sanityStep = document?.visionBuilderSteps?.[index]
        const options = fallbackStep.options.map((fallbackOption, optionIndex) => {
          const sanityOption = sanityStep?.options?.[optionIndex]

          return {
            id: cleanString(sanityOption?.id) ?? fallbackOption.id,
            label: cleanString(sanityOption?.label) ?? fallbackOption.label,
          }
        })

        return {
          title: cleanString(sanityStep?.title) ?? fallbackStep.title,
          options,
        }
      }),
      captureHeading:
        cleanString(document?.visionBuilderCaptureHeading) ??
        HOMEPAGE_FALLBACK.visionBuilder.captureHeading,
      captureDescription:
        cleanString(document?.visionBuilderCaptureDescription) ??
        HOMEPAGE_FALLBACK.visionBuilder.captureDescription,
      emailPlaceholder:
        cleanString(document?.visionBuilderEmailPlaceholder) ??
        HOMEPAGE_FALLBACK.visionBuilder.emailPlaceholder,
      validationMessage:
        cleanString(document?.visionBuilderValidationMessage) ??
        HOMEPAGE_FALLBACK.visionBuilder.validationMessage,
      submitText:
        cleanString(document?.visionBuilderSubmitText) ?? HOMEPAGE_FALLBACK.visionBuilder.submitText,
      submittingText:
        cleanString(document?.visionBuilderSubmittingText) ??
        HOMEPAGE_FALLBACK.visionBuilder.submittingText,
      successHeading:
        cleanString(document?.visionBuilderSuccessHeading) ??
        HOMEPAGE_FALLBACK.visionBuilder.successHeading,
      successDescription:
        cleanString(document?.visionBuilderSuccessDescription) ??
        HOMEPAGE_FALLBACK.visionBuilder.successDescription,
    },
  }
}
