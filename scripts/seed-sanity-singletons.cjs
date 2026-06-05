const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {execSync} = require('node:child_process')

function imageAltOnly(alt) {
  return {
    _type: 'imageWithAlt',
    alt,
  }
}

const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    studioName: 'VAASTU Architecture',
    defaultSeoTitle: 'Defining Modern Elegance',
    defaultSeoDescription: 'Spaces Crafted for Living. Where structural integrity meets curated warmth.',
    globalEmail: 'hello@architecture-studio.com',
    globalPhone: '+91 98765 43210',
    studioAddress: 'Pune, Maharashtra\nIndia',
    socialLinks: [
      {
        _type: 'socialLink',
        _key: 'instagram',
        label: 'Instagram',
        url: 'https://instagram.com',
      },
      {
        _type: 'socialLink',
        _key: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com',
      },
      {
        _type: 'socialLink',
        _key: 'archdaily',
        label: 'ArchDaily',
        url: 'https://archdaily.com',
      },
    ],
  },
  {
    _id: 'navigation',
    _type: 'navigation',
    items: [
      {
        _type: 'navigationItem',
        _key: 'philosophy',
        label: 'Philosophy',
        url: '/#philosophy',
        sortOrder: 1,
      },
      {
        _type: 'navigationItem',
        _key: 'projects',
        label: 'Projects',
        url: '/#projects',
        sortOrder: 2,
      },
      {
        _type: 'navigationItem',
        _key: 'process',
        label: 'Process',
        url: '/#process',
        sortOrder: 3,
      },
      {
        _type: 'navigationItem',
        _key: 'contact',
        label: 'Contact',
        url: '/#contact',
        sortOrder: 4,
      },
    ],
    ctaButtonText: 'INQUIRE',
    ctaButtonUrl: '/#contact',
  },
  {
    _id: 'homepage',
    _type: 'homepage',
    heroTitle: 'Spaces that elevate.\nExperiences that endure.',
    heroSubtitle:
      'We design with intention, craft with precision\nand build places that inspire for generations.',
    heroSupportingText:
      'Forging the intersection of raw materiality and natural harmony. We sculpt light, shadow, and geometry to create uncompromising architectural statements.',
    heroShowreelButtonText: 'Watch Showreel',
    heroBrandName: 'VAASTU',
    heroBrandTagline: 'ARCHITECTURE . INTERIORS . HARMONY',
    heroExploreText: 'EXPLORE OUR PHILOSOPHY',
    heroFinalStatement: 'Silent Strength. Enduring Design.',
    heroPrimaryCtaText: 'EXPLORE PROJECTS',
    heroSecondaryCtaText: 'START A PROJECT',
    heroInstagramUrl: 'https://instagram.com',
    heroLinkedinUrl: 'https://linkedin.com',
    heroEmailUrl: 'mailto:contact@vaastu.com',
    heroTwitterUrl: 'https://x.com',
    phaseSlides: [
      {
        _type: 'phaseSlide',
        _key: 'absolute-precision',
        title: 'Absolute Precision.',
        description: 'Every millimeter calculated. Every angle deliberate.',
      },
      {
        _type: 'phaseSlide',
        _key: 'living-reality',
        title: 'Living Reality.',
        description: 'Bridging the gap between the drafted line and the built environment.',
      },
      {
        _type: 'phaseSlide',
        _key: 'curated-spaces',
        title: 'Curated Spaces.',
        description: 'Interiors designed for the human experience.',
      },
    ],
    portfolioSectionTitle: 'Curated Spaces',
    portfolioSupportingText: 'Scroll to break alignment',
    pedigreeEyebrow: 'Recognized & Featured In',
    pedigreeItems: [
      'ARCHITECTURAL DIGEST',
      'DEZEEN',
      'ARCHDAILY',
      'DWELL',
      'THE TIMES OF INDIA',
      'VOGUE LIVING',
      'WALLPAPER*',
    ],
    visionBuilderEyebrow: 'Interactive Profile',
    visionBuilderHeading: 'Build your vision.',
    visionBuilderSteps: [
      {
        _type: 'visionBuilderStep',
        _key: 'terrain',
        title: 'Select your terrain.',
        options: [
          {_type: 'visionBuilderOption', _key: 'urban', id: 'urban', label: 'Urban Plot'},
          {_type: 'visionBuilderOption', _key: 'hillside', id: 'hillside', label: 'Hillside'},
          {_type: 'visionBuilderOption', _key: 'waterfront', id: 'waterfront', label: 'Waterfront'},
        ],
      },
      {
        _type: 'visionBuilderStep',
        _key: 'scale',
        title: 'Determine the scale.',
        options: [
          {
            _type: 'visionBuilderOption',
            _key: 'minimalist',
            id: 'minimalist',
            label: 'Minimalist Retreat',
          },
          {_type: 'visionBuilderOption', _key: 'estate', id: 'estate', label: 'Grand Estate'},
          {
            _type: 'visionBuilderOption',
            _key: 'commercial',
            id: 'commercial',
            label: 'Commercial Space',
          },
        ],
      },
      {
        _type: 'visionBuilderStep',
        _key: 'aesthetic',
        title: 'Define the aesthetic.',
        options: [
          {_type: 'visionBuilderOption', _key: 'brutalist', id: 'brutalist', label: 'Raw Brutalism'},
          {
            _type: 'visionBuilderOption',
            _key: 'warm-modern',
            id: 'warm_modern',
            label: 'Warm Modernism',
          },
          {_type: 'visionBuilderOption', _key: 'classic', id: 'classic', label: 'Timeless Classic'},
        ],
      },
    ],
    visionBuilderCaptureHeading: 'Your profile is ready.',
    visionBuilderCaptureDescription:
      'Enter your email to generate a custom lookbook featuring floorplans and concepts matching your exact parameters.',
    visionBuilderEmailPlaceholder: 'Email Address',
    visionBuilderValidationMessage: 'Please enter a valid email address',
    visionBuilderSubmitText: 'View My Portfolio',
    visionBuilderSubmittingText: 'Generating...',
    visionBuilderSuccessHeading: 'Check your inbox.',
    visionBuilderSuccessDescription: 'Your custom architectural lookbook is on its way.',
    seo: {
      _type: 'seoFields',
      title: 'Defining Modern Elegance',
      description: 'Spaces Crafted for Living. Where structural integrity meets curated warmth.',
    },
  },
  {
    _id: 'aboutPhilosophy',
    _type: 'aboutPhilosophy',
    mainHeading: 'Calculated Vision.\nTactile Reality.',
    subtitle:
      'True architecture begins long before the foundation is laid. It starts with a profound dialogue between human intuition, rigorous engineering, and the physical environment.',
    panels: [
      {
        _type: 'philosophyPanel',
        _key: 'vision',
        number: '01',
        title: 'Cadrage & Intention',
        description:
          'Every millimeter is calculated. Every angle is deliberate. Our philosophy begins with deep listening and conceptual drafting. We believe that true harmony in design starts at the intersection of raw imagination and meticulous planning on the drafting table.',
        image: imageAltOnly('Architectural Drafting Process'),
      },
      {
        _type: 'philosophyPanel',
        _key: 'precision',
        number: '02',
        title: 'Absolute Precision',
        description:
          'We bridge the gap between the drafted line and the built environment. Through advanced 3D rendering and rigorous engineering, we ensure that the structural integrity of our spaces matches their aesthetic ambition. Precision is not an option; it is our foundation.',
        image: imageAltOnly('Structural Precision in Architecture'),
      },
      {
        _type: 'philosophyPanel',
        _key: 'reality',
        number: '03',
        title: 'Living Reality',
        description:
          'We do not just build structures; we curate spaces designed for the human experience. By blending sustainable materials with intuitive layouts, we craft enduring environments that inspire for generations. This is architecture shaped by true stories.',
        image: imageAltOnly('Modern Living Space Harmony'),
      },
    ],
    showreelEyebrow: 'Immersion',
    showreelTitle: 'Watch the Showreel',
    showreelVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    showreelCaptionEyebrow: 'Featured Project',
    showreelCaptionTitle: 'The Khandala Retreat',
  },
  {
    _id: 'processSection',
    _type: 'processSection',
    sectionTitle: 'The Blueprint.',
    sectionSubtitle: 'A rigorous approach from conceptual sketch to built reality.',
    steps: [
      {
        _type: 'processStep',
        _key: 'discovery',
        number: '01',
        phaseLabel: 'Discovery',
        title: 'Site & Feasibility',
        description:
          'Before a single line is drawn, we analyze the topography, climate, and zoning. We listen to your vision to establish a robust architectural brief that harmonizes with the environment.',
        image: imageAltOnly('Site & Feasibility Image'),
      },
      {
        _type: 'processStep',
        _key: 'conception',
        number: '02',
        phaseLabel: 'Conception',
        title: 'Architectural Drafting',
        description:
          'Translating vision into geometry. We develop initial sketches, massing studies, and spatial flows, ensuring every square meter is optimized for light, movement, and purpose.',
        image: imageAltOnly('Architectural Drafting Image'),
      },
      {
        _type: 'processStep',
        _key: 'engineering',
        number: '03',
        phaseLabel: 'Engineering',
        title: 'Precision Rendering',
        description:
          'The concept becomes tangible. Through hyper-realistic 3D rendering and rigorous structural engineering, we bridge the gap between imagination and physical reality.',
        image: imageAltOnly('Precision Rendering Image'),
      },
      {
        _type: 'processStep',
        _key: 'execution',
        number: '04',
        phaseLabel: 'Execution',
        title: 'Construction & Handover',
        description:
          'Absolute control over the build. We act as the guardian of the design during construction, ensuring the final structure is a flawless execution of the initial intent.',
        image: imageAltOnly('Construction & Handover Image'),
      },
    ],
  },
  {
    _id: 'contactFooter',
    _type: 'contactFooter',
    heading: "Let's build\ntogether.",
    description: 'Interested in working together on your next project?',
    email: 'hello@architecture-studio.com',
    phone: '+91 98765 43210',
    address: 'Pune, Maharashtra\nIndia',
    contactSectionHeading: "Let's discuss\nyour vision.",
    contactStudioLabel: 'Studio',
    contactInquiriesLabel: 'Inquiries',
    contactRequestInfoLabel: 'Request Info',
    contactBookConsultLabel: 'Book Consult',
    contactNameLabel: 'Your Name',
    contactEmailLabel: 'Email Address',
    contactNameValidationMessage: 'Name is required',
    contactEmailValidationMessage: 'Invalid email address',
    contactSubmitText: 'Initiate Contact',
    contactSubmittingText: 'Processing...',
    contactSuccessHeading: 'Request Received',
    contactSuccessDescription: 'Our lead architect will contact you shortly.',
    contactCalendlyHeading: 'Select a Time',
    contactCalendlyDescription: 'Calendly embed renders here',
    leadMagnetEyebrow: 'Exclusive Asset',
    leadMagnetHeading: 'The 2026 Guide to Sustainable Brutalism.',
    leadMagnetDescription:
      'Enter your email to unlock our private lookbook and pre-build feasibility checklist.',
    leadMagnetEmailPlaceholder: 'Email Address',
    leadMagnetValidationMessage: 'Please enter a valid email address.',
    leadMagnetSubmitText: 'Unlock Guide',
    leadMagnetSubmittingText: 'Unlocking...',
    leadMagnetSuccessHeading: 'Check your inbox.',
    leadMagnetSuccessDescription: 'The exclusive guide has been sent to your email.',
    leadMagnetWhatsappUrl: 'https://wa.me/',
    exitIntentEyebrow: 'Before you depart',
    exitIntentHeading: 'Access the\nPrivate Client Vault.',
    exitIntentDescription:
      'Take the inspiration with you. Enter your email to unlock a curated digital folio of unreleased concepts, floorplans, and private estates.',
    exitIntentEmailPlaceholder: 'Email Address',
    exitIntentValidationMessage: 'Please enter a valid email address',
    exitIntentSubmitText: 'Grant Access',
    exitIntentSubmittingText: 'Unlocking...',
    exitIntentCloseText: "No thanks, I'll keep exploring.",
    exitIntentSuccessHeading: 'Access Granted.',
    exitIntentSuccessDescription:
      'Your private folio has been dispatched to your inbox. We look forward to building with you.',
    footerLinks: [
      {
        _type: 'socialLink',
        _key: 'instagram',
        label: 'Instagram',
        url: 'https://instagram.com',
      },
      {
        _type: 'socialLink',
        _key: 'linkedin',
        label: 'LinkedIn',
        url: 'https://linkedin.com',
      },
      {
        _type: 'socialLink',
        _key: 'archdaily',
        label: 'ArchDaily',
        url: 'https://archdaily.com',
      },
    ],
    copyrightText: 'Â© 2026 Vaastu Architecture. All Rights Reserved.',
  },
]

const skippedImageFields = [
  'siteSettings.logo',
  'siteSettings.signatureLogo',
  'siteSettings.openGraphImage',
  'homepage.seo.image',
  'aboutPhilosophy.panels[].image.image',
  'processSection.steps[].image.image',
]

function main() {
  const tempPath = path.join(os.tmpdir(), 'vaastu-sanity-singleton-seed.json')
  fs.writeFileSync(tempPath, JSON.stringify(docs, null, 2))

  execSync(`npx sanity documents create "${tempPath}" --replace`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  })

  console.log(JSON.stringify({
    seededSingletonCount: docs.length,
    documentIds: docs.map((doc) => doc._id),
    skippedImageFields,
    footerLinkHandling: 'Converted current # placeholder footer links to schema-valid full URLs.',
    navigationCtaUrl: '/#contact',
  }, null, 2))
}

main()
