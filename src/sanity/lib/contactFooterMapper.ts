export interface SanityContactFooterDocument {
  heading?: string | null
  description?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  footerLinks?: Array<{
    label?: string | null
    url?: string | null
  }> | null
  copyrightText?: string | null
}

export interface ContactFooterData {
  headingLineOne: string
  headingLineTwo: string
  description: string
  email: string
  phone: string
  addressLines: string[]
  footerLinks: Array<{
    label: string
    url: string
  }>
  copyrightText: string
}

export const CONTACT_FOOTER_FALLBACK: ContactFooterData = {
  headingLineOne: "Let's build",
  headingLineTwo: 'together.',
  description: 'Interested in working together on your next project?',
  email: 'hello@architecture-studio.com',
  phone: '+91 98765 43210',
  addressLines: ['Pune, Maharashtra', 'India'],
  footerLinks: [
    {label: 'Instagram', url: '#'},
    {label: 'LinkedIn', url: '#'},
    {label: 'ArchDaily', url: '#'},
  ],
  copyrightText: '© 2026 Vaastu Architecture. All Rights Reserved.',
}

function cleanString(value: string | null | undefined) {
  const trimmed = value?.trim()
  return trimmed && trimmed !== 'Contact / Footer' ? trimmed : undefined
}

function normalizeHeading(heading: string | null | undefined) {
  const value = cleanString(heading)
  if (!value) return undefined

  const explicitLines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (explicitLines.length >= 2) {
    return {
      headingLineOne: explicitLines[0],
      headingLineTwo: explicitLines.slice(1).join(' '),
    }
  }

  const words = value.split(/\s+/)
  if (words.length <= 1) {
    return {
      headingLineOne: value,
      headingLineTwo: CONTACT_FOOTER_FALLBACK.headingLineTwo,
    }
  }

  return {
    headingLineOne: words.slice(0, -1).join(' '),
    headingLineTwo: words[words.length - 1],
  }
}

export function mapContactFooterData(
  document: SanityContactFooterDocument | null | undefined,
): ContactFooterData {
  const heading = normalizeHeading(document?.heading)
  const footerLinks = document?.footerLinks
    ?.map((link) => {
      const label = cleanString(link.label)
      const url = cleanString(link.url)
      return label && url ? {label, url} : null
    })
    .filter((link): link is {label: string; url: string} => Boolean(link))

  return {
    headingLineOne: heading?.headingLineOne ?? CONTACT_FOOTER_FALLBACK.headingLineOne,
    headingLineTwo: heading?.headingLineTwo ?? CONTACT_FOOTER_FALLBACK.headingLineTwo,
    description: cleanString(document?.description) ?? CONTACT_FOOTER_FALLBACK.description,
    email: cleanString(document?.email) ?? CONTACT_FOOTER_FALLBACK.email,
    phone: cleanString(document?.phone) ?? CONTACT_FOOTER_FALLBACK.phone,
    addressLines:
      cleanString(document?.address)
        ?.split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean) ?? CONTACT_FOOTER_FALLBACK.addressLines,
    footerLinks: footerLinks && footerLinks.length > 0 ? footerLinks : CONTACT_FOOTER_FALLBACK.footerLinks,
    copyrightText: cleanString(document?.copyrightText) ?? CONTACT_FOOTER_FALLBACK.copyrightText,
  }
}
