interface SanityProcessImage {
  alt?: string | null
  assetUrl?: string | null
}

interface SanityProcessStep {
  number?: string | null
  phaseLabel?: string | null
  title?: string | null
  description?: string | null
  image?: SanityProcessImage | null
}

export interface SanityProcessSectionDocument {
  sectionTitle?: string | null
  sectionSubtitle?: string | null
  steps?: SanityProcessStep[] | null
}

export interface ProcessStepData {
  key: string
  side: 'left' | 'right'
  number: string
  phaseLabel: string
  title: string
  description: string
  image: string
  alt: string
}

export interface ProcessSectionData {
  sectionTitle: string
  sectionSubtitle: string
  steps: ProcessStepData[]
}

export const PROCESS_SECTION_FALLBACK: ProcessSectionData = {
  sectionTitle: 'The Blueprint.',
  sectionSubtitle: 'A rigorous approach from conceptual sketch to built reality.',
  steps: [
    {
      key: 'discovery',
      side: 'left',
      number: '01',
      phaseLabel: 'Discovery',
      title: 'Site & Feasibility',
      description:
        'Before a single line is drawn, we analyze the topography, climate, and zoning. We listen to your vision to establish a robust architectural brief that harmonizes with the environment.',
      image: 'https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250744/1_uksekv.png',
      alt: 'Site & Feasibility Image',
    },
    {
      key: 'conception',
      side: 'right',
      number: '02',
      phaseLabel: 'Conception',
      title: 'Architectural Drafting',
      description:
        'Translating vision into geometry. We develop initial sketches, massing studies, and spatial flows, ensuring every square meter is optimized for light, movement, and purpose.',
      image: 'https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250742/2_ad2lxb.png',
      alt: 'Architectural Drafting Image',
    },
    {
      key: 'engineering',
      side: 'left',
      number: '03',
      phaseLabel: 'Engineering',
      title: 'Precision Rendering',
      description:
        'The concept becomes tangible. Through hyper-realistic 3D rendering and rigorous structural engineering, we bridge the gap between imagination and physical reality.',
      image: 'https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250743/4_wejqgt.png',
      alt: 'Precision Rendering Image',
    },
    {
      key: 'execution',
      side: 'right',
      number: '04',
      phaseLabel: 'Execution',
      title: 'Construction & Handover',
      description:
        'Absolute control over the build. We act as the guardian of the design during construction, ensuring the final structure is a flawless execution of the initial intent.',
      image: 'https://res.cloudinary.com/dcryxjtb3/image/upload/q_auto/f_auto/v1780250743/3_c4nihg.png',
      alt: 'Construction & Handover Image',
    },
  ],
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'Process Section' ? trimmed : undefined
}

export function mapProcessSectionData(
  document: SanityProcessSectionDocument | null | undefined,
): ProcessSectionData {
  return {
    sectionTitle: cleanString(document?.sectionTitle) ?? PROCESS_SECTION_FALLBACK.sectionTitle,
    sectionSubtitle: cleanString(document?.sectionSubtitle) ?? PROCESS_SECTION_FALLBACK.sectionSubtitle,
    steps: PROCESS_SECTION_FALLBACK.steps.map((fallbackStep, index) => {
      const sanityStep = document?.steps?.[index]

      return {
        key: fallbackStep.key,
        side: fallbackStep.side,
        number: cleanString(sanityStep?.number) ?? fallbackStep.number,
        phaseLabel: cleanString(sanityStep?.phaseLabel) ?? fallbackStep.phaseLabel,
        title: cleanString(sanityStep?.title) ?? fallbackStep.title,
        description: cleanString(sanityStep?.description) ?? fallbackStep.description,
        image: cleanString(sanityStep?.image?.assetUrl) ?? fallbackStep.image,
        alt: cleanString(sanityStep?.image?.alt) ?? fallbackStep.alt,
      }
    }),
  }
}
