export const allProjectSlugsQuery = `
  *[_type == "project" && defined(slug.current)]|order(sortOrder asc) {
    "slug": slug.current
  }
`

const projectImageFields = `
  cardImage {
    alt,
    "assetUrl": image.asset->url
  },
  heroImage {
    alt,
    "assetUrl": image.asset->url
  },
  materialityImage {
    alt,
    "assetUrl": image.asset->url
  },
  cinematicQuoteBackgroundImage {
    alt,
    "assetUrl": image.asset->url
  },
  seo {
    title,
    description,
    image {
      alt,
      "assetUrl": image.asset->url
    }
  }
`

const projectBaseFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  featuredProject,
  sortOrder,
  cardAspect,
  cardColor,
  logoText,
  cardImageUrl,
  heroImageUrl,
  heroCaption,
  metadata {
    year,
    location,
    area,
    client
  },
  narrativeHeading,
  narrativeParagraphs,
  galleryTitle,
  galleryItems[] {
    label,
    imageUrl,
    image {
      alt,
      "assetUrl": image.asset->url
    }
  },
  designIntentHeading,
  designIntentBody,
  materialityHeading,
  materialityBody,
  materialityImageUrl,
  cinematicQuote,
  cinematicQuoteAttribution,
  cinematicQuoteBackgroundImageUrl,
  seoImageUrl,
  ${projectImageFields}
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    ${projectBaseFields},
    relatedProjects[]-> {
      ${projectBaseFields}
    }
  }
`

export const selectedProjectsQuery = `
  *[_type == "project" && defined(slug.current)]|order(sortOrder asc)[0...3] {
    ${projectBaseFields}
  }
`

export const portfolioShowcaseProjectsQuery = `
  *[_type == "project" && !(_id in path("drafts.**")) && defined(slug.current)]|order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    sortOrder,
    cardAspect,
    cardColor,
    logoText,
    cardImageUrl,
    cardImage {
      "assetUrl": image.asset->url
    }
  }
`

export const relatedProjectsBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0].relatedProjects[]-> {
    ${projectBaseFields}
  }
`

export const contactFooterQuery = `
  *[_type == "contactFooter"][0] {
    heading,
    description,
    email,
    phone,
    address,
    footerLinks[] {
      label,
      url
    },
    copyrightText
  }
`

export const aboutPhilosophyQuery = `
  *[_type == "aboutPhilosophy"][0] {
    mainHeading,
    subtitle,
    panels[] {
      number,
      title,
      description,
      image {
        alt,
        "assetUrl": image.asset->url
      }
    }
  }
`

export const processSectionQuery = `
  *[_type == "processSection"][0] {
    sectionTitle,
    sectionSubtitle,
    steps[] {
      number,
      phaseLabel,
      title,
      description,
      image {
        alt,
        "assetUrl": image.asset->url
      }
    }
  }
`

export const navigationQuery = `
  *[_type == "navigation"][0] {
    items[]|order(sortOrder asc) {
      label,
      url,
      sortOrder
    },
    ctaButtonText,
    ctaButtonUrl
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    studioName,
    defaultSeoTitle,
    defaultSeoDescription,
    logo {
      alt,
      "assetUrl": image.asset->url
    },
    signatureLogo {
      alt,
      "assetUrl": image.asset->url
    },
    openGraphImage {
      alt,
      "assetUrl": image.asset->url
    },
    globalEmail,
    globalPhone,
    studioAddress,
    socialLinks[] {
      label,
      url
    }
  }
`

export const homepageQuery = `
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    heroSupportingText,
    phaseSlides[] {
      title,
      description
    },
    portfolioSectionTitle,
    portfolioSupportingText,
    seo {
      title,
      description,
      image {
        alt,
        "assetUrl": image.asset->url
      }
    }
  }
`
