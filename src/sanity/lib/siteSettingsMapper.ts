interface SanitySettingsImage {
  alt?: string | null
  assetUrl?: string | null
}

export interface SanitySiteSettingsDocument {
  studioName?: string | null
  defaultSeoTitle?: string | null
  defaultSeoDescription?: string | null
  logo?: SanitySettingsImage | null
  signatureLogo?: SanitySettingsImage | null
  openGraphImage?: SanitySettingsImage | null
  globalEmail?: string | null
  globalPhone?: string | null
  studioAddress?: string | null
  socialLinks?: Array<{
    label?: string | null
    url?: string | null
  }> | null
}

export interface SiteSettingsData {
  studioName: string
  defaultSeoTitle: string
  defaultSeoDescription: string
  logo?: string
  signatureLogo?: string
  openGraphImage?: string
  globalEmail?: string
  globalPhone?: string
  studioAddress?: string
  socialLinks: Array<{
    label: string
    url: string
  }>
}

export const SITE_SETTINGS_FALLBACK: SiteSettingsData = {
  studioName: 'VAASTU Architecture',
  defaultSeoTitle: 'Defining Modern Elegance',
  defaultSeoDescription: 'Spaces Crafted for Living. Where structural integrity meets curated warmth.',
  socialLinks: [],
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'Site Settings' ? trimmed : undefined
}

export function mapSiteSettingsData(
  document: SanitySiteSettingsDocument | null | undefined,
): SiteSettingsData {
  const socialLinks = document?.socialLinks
    ?.map((link) => {
      const label = cleanString(link.label)
      const url = cleanString(link.url)
      return label && url ? {label, url} : null
    })
    .filter((link): link is {label: string; url: string} => Boolean(link))

  return {
    studioName: cleanString(document?.studioName) ?? SITE_SETTINGS_FALLBACK.studioName,
    defaultSeoTitle: cleanString(document?.defaultSeoTitle) ?? SITE_SETTINGS_FALLBACK.defaultSeoTitle,
    defaultSeoDescription:
      cleanString(document?.defaultSeoDescription) ?? SITE_SETTINGS_FALLBACK.defaultSeoDescription,
    logo: cleanString(document?.logo?.assetUrl),
    signatureLogo: cleanString(document?.signatureLogo?.assetUrl),
    openGraphImage: cleanString(document?.openGraphImage?.assetUrl),
    globalEmail: cleanString(document?.globalEmail),
    globalPhone: cleanString(document?.globalPhone),
    studioAddress: cleanString(document?.studioAddress),
    socialLinks: socialLinks ?? SITE_SETTINGS_FALLBACK.socialLinks,
  }
}
