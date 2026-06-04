export interface SanityNavigationDocument {
  items?: Array<{
    label?: string | null
    url?: string | null
    sortOrder?: number | null
  }> | null
  ctaButtonText?: string | null
  ctaButtonUrl?: string | null
}

export interface NavigationData {
  items: Array<{
    label: string
    href: string
  }>
  ctaLabel: string
  ctaHref: string
}

export const NAVIGATION_FALLBACK: NavigationData = {
  items: [
    {label: 'Philosophy', href: '/#philosophy'},
    {label: 'Projects', href: '/#projects'},
    {label: 'Process', href: '/#process'},
    {label: 'Contact', href: '/#contact'},
  ],
  ctaLabel: 'INQUIRE',
  ctaHref: '#contact',
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'Navigation' ? trimmed : undefined
}

export function mapNavigationData(
  document: SanityNavigationDocument | null | undefined,
): NavigationData {
  const items = document?.items
    ?.map((item) => {
      const label = cleanString(item.label)
      const href = cleanString(item.url)
      return label && href ? {label, href} : null
    })
    .filter((item): item is {label: string; href: string} => Boolean(item))

  return {
    items: items && items.length > 0 ? items : NAVIGATION_FALLBACK.items,
    ctaLabel: cleanString(document?.ctaButtonText) ?? NAVIGATION_FALLBACK.ctaLabel,
    ctaHref: cleanString(document?.ctaButtonUrl) ?? NAVIGATION_FALLBACK.ctaHref,
  }
}
