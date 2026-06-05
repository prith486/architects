interface SanityPanelImage {
  alt?: string | null
  assetUrl?: string | null
}

interface SanityAboutPanel {
  number?: string | null
  title?: string | null
  description?: string | null
  image?: SanityPanelImage | null
}

export interface SanityAboutPhilosophyDocument {
  mainHeading?: string | null
  subtitle?: string | null
  panels?: SanityAboutPanel[] | null
  showreelEyebrow?: string | null
  showreelTitle?: string | null
  showreelVideoUrl?: string | null
  showreelCaptionEyebrow?: string | null
  showreelCaptionTitle?: string | null
}

export interface AboutPanelData {
  key: string
  number: string
  title: string
  description: string
  image: string
  alt: string
}

export interface AboutPhilosophyData {
  headingLines: Array<{
    prefix: string
    accent: string
  }>
  subtitle: string
  panels: AboutPanelData[]
  showreel: {
    eyebrow: string
    title: string
    videoUrl: string
    captionEyebrow: string
    captionTitle: string
  }
}

export const ABOUT_PHILOSOPHY_FALLBACK: AboutPhilosophyData = {
  headingLines: [
    {prefix: 'Calculated', accent: 'Vision.'},
    {prefix: 'Tactile', accent: 'Reality.'},
  ],
  subtitle:
    'True architecture begins long before the foundation is laid. It starts with a profound dialogue between human intuition, rigorous engineering, and the physical environment.',
  panels: [
    {
      key: 'vision',
      number: '01',
      title: 'Cadrage & Intention',
      description:
        'Every millimeter is calculated. Every angle is deliberate. Our philosophy begins with deep listening and conceptual drafting. We believe that true harmony in design starts at the intersection of raw imagination and meticulous planning on the drafting table.',
      image: '/assets/about-vision.webp',
      alt: 'Architectural Drafting Process',
    },
    {
      key: 'precision',
      number: '02',
      title: 'Absolute Precision',
      description:
        'We bridge the gap between the drafted line and the built environment. Through advanced 3D rendering and rigorous engineering, we ensure that the structural integrity of our spaces matches their aesthetic ambition. Precision is not an option; it is our foundation.',
      image: '/assets/about-precision.webp',
      alt: 'Structural Precision in Architecture',
    },
    {
      key: 'reality',
      number: '03',
      title: 'Living Reality',
      description:
        'We do not just build structures; we curate spaces designed for the human experience. By blending sustainable materials with intuitive layouts, we craft enduring environments that inspire for generations. This is architecture shaped by true stories.',
      image: '/assets/about-reality.webp',
      alt: 'Modern Living Space Harmony',
    },
  ],
  showreel: {
    eyebrow: 'Immersion',
    title: 'Watch the Showreel',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    captionEyebrow: 'Featured Project',
    captionTitle: 'The Khandala Retreat',
  },
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'About / Philosophy' ? trimmed : undefined
}

function normalizeHeading(mainHeading: string | null | undefined) {
  const heading = cleanString(mainHeading)
  if (!heading) return ABOUT_PHILOSOPHY_FALLBACK.headingLines

  const lines = heading
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const sourceLines = lines.length > 0 ? lines : [heading]

  return sourceLines.map((line) => {
    const words = line.split(/\s+/)

    if (words.length === 1) {
      return {
        prefix: '',
        accent: words[0],
      }
    }

    return {
      prefix: words.slice(0, -1).join(' '),
      accent: words[words.length - 1],
    }
  })
}

export function mapAboutPhilosophyData(
  document: SanityAboutPhilosophyDocument | null | undefined,
): AboutPhilosophyData {
  const panels = ABOUT_PHILOSOPHY_FALLBACK.panels.map((fallbackPanel, index) => {
    const sanityPanel = document?.panels?.[index]

    return {
      key: fallbackPanel.key,
      number: cleanString(sanityPanel?.number) ?? fallbackPanel.number,
      title: cleanString(sanityPanel?.title) ?? fallbackPanel.title,
      description: cleanString(sanityPanel?.description) ?? fallbackPanel.description,
      image: cleanString(sanityPanel?.image?.assetUrl) ?? fallbackPanel.image,
      alt: cleanString(sanityPanel?.image?.alt) ?? fallbackPanel.alt,
    }
  })

  return {
    headingLines: normalizeHeading(document?.mainHeading),
    subtitle: cleanString(document?.subtitle) ?? ABOUT_PHILOSOPHY_FALLBACK.subtitle,
    panels,
    showreel: {
      eyebrow:
        cleanString(document?.showreelEyebrow) ?? ABOUT_PHILOSOPHY_FALLBACK.showreel.eyebrow,
      title: cleanString(document?.showreelTitle) ?? ABOUT_PHILOSOPHY_FALLBACK.showreel.title,
      videoUrl:
        cleanString(document?.showreelVideoUrl) ?? ABOUT_PHILOSOPHY_FALLBACK.showreel.videoUrl,
      captionEyebrow:
        cleanString(document?.showreelCaptionEyebrow) ??
        ABOUT_PHILOSOPHY_FALLBACK.showreel.captionEyebrow,
      captionTitle:
        cleanString(document?.showreelCaptionTitle) ??
        ABOUT_PHILOSOPHY_FALLBACK.showreel.captionTitle,
    },
  }
}
