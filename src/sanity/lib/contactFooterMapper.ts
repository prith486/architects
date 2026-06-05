export interface SanityContactFooterDocument {
  heading?: string | null
  description?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  contactSectionHeading?: string | null
  contactStudioLabel?: string | null
  contactInquiriesLabel?: string | null
  contactRequestInfoLabel?: string | null
  contactBookConsultLabel?: string | null
  contactNameLabel?: string | null
  contactEmailLabel?: string | null
  contactNameValidationMessage?: string | null
  contactEmailValidationMessage?: string | null
  contactSubmitText?: string | null
  contactSubmittingText?: string | null
  contactSuccessHeading?: string | null
  contactSuccessDescription?: string | null
  contactCalendlyHeading?: string | null
  contactCalendlyDescription?: string | null
  leadMagnetEyebrow?: string | null
  leadMagnetHeading?: string | null
  leadMagnetDescription?: string | null
  leadMagnetEmailPlaceholder?: string | null
  leadMagnetValidationMessage?: string | null
  leadMagnetSubmitText?: string | null
  leadMagnetSubmittingText?: string | null
  leadMagnetSuccessHeading?: string | null
  leadMagnetSuccessDescription?: string | null
  leadMagnetWhatsappUrl?: string | null
  exitIntentEyebrow?: string | null
  exitIntentHeading?: string | null
  exitIntentDescription?: string | null
  exitIntentEmailPlaceholder?: string | null
  exitIntentValidationMessage?: string | null
  exitIntentSubmitText?: string | null
  exitIntentSubmittingText?: string | null
  exitIntentCloseText?: string | null
  exitIntentSuccessHeading?: string | null
  exitIntentSuccessDescription?: string | null
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
  contactSection: {
    headingLineOne: string
    headingLineTwo: string
    studioLabel: string
    inquiriesLabel: string
    requestInfoLabel: string
    bookConsultLabel: string
    nameLabel: string
    emailLabel: string
    nameValidationMessage: string
    emailValidationMessage: string
    submitText: string
    submittingText: string
    successHeading: string
    successDescription: string
    calendlyHeading: string
    calendlyDescription: string
  }
  leadMagnet: {
    eyebrow: string
    heading: string
    description: string
    emailPlaceholder: string
    validationMessage: string
    submitText: string
    submittingText: string
    successHeading: string
    successDescription: string
    whatsappUrl: string
  }
  exitIntent: {
    eyebrow: string
    heading: string
    description: string
    emailPlaceholder: string
    validationMessage: string
    submitText: string
    submittingText: string
    closeText: string
    successHeading: string
    successDescription: string
  }
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
  copyrightText: 'Â© 2026 Vaastu Architecture. All Rights Reserved.',
  contactSection: {
    headingLineOne: "Let's discuss",
    headingLineTwo: 'your vision.',
    studioLabel: 'Studio',
    inquiriesLabel: 'Inquiries',
    requestInfoLabel: 'Request Info',
    bookConsultLabel: 'Book Consult',
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    nameValidationMessage: 'Name is required',
    emailValidationMessage: 'Invalid email address',
    submitText: 'Initiate Contact',
    submittingText: 'Processing...',
    successHeading: 'Request Received',
    successDescription: 'Our lead architect will contact you shortly.',
    calendlyHeading: 'Select a Time',
    calendlyDescription: 'Calendly embed renders here',
  },
  leadMagnet: {
    eyebrow: 'Exclusive Asset',
    heading: 'The 2026 Guide to Sustainable Brutalism.',
    description: 'Enter your email to unlock our private lookbook and pre-build feasibility checklist.',
    emailPlaceholder: 'Email Address',
    validationMessage: 'Please enter a valid email address.',
    submitText: 'Unlock Guide',
    submittingText: 'Unlocking...',
    successHeading: 'Check your inbox.',
    successDescription: 'The exclusive guide has been sent to your email.',
    whatsappUrl: 'https://wa.me/',
  },
  exitIntent: {
    eyebrow: 'Before you depart',
    heading: 'Access the\nPrivate Client Vault.',
    description:
      'Take the inspiration with you. Enter your email to unlock a curated digital folio of unreleased concepts, floorplans, and private estates.',
    emailPlaceholder: 'Email Address',
    validationMessage: 'Please enter a valid email address',
    submitText: 'Grant Access',
    submittingText: 'Unlocking...',
    closeText: "No thanks, I'll keep exploring.",
    successHeading: 'Access Granted.',
    successDescription:
      'Your private folio has been dispatched to your inbox. We look forward to building with you.',
  },
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
  const contactSectionHeading = normalizeHeading(document?.contactSectionHeading)
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
    contactSection: {
      headingLineOne:
        contactSectionHeading?.headingLineOne ?? CONTACT_FOOTER_FALLBACK.contactSection.headingLineOne,
      headingLineTwo:
        contactSectionHeading?.headingLineTwo ?? CONTACT_FOOTER_FALLBACK.contactSection.headingLineTwo,
      studioLabel:
        cleanString(document?.contactStudioLabel) ?? CONTACT_FOOTER_FALLBACK.contactSection.studioLabel,
      inquiriesLabel:
        cleanString(document?.contactInquiriesLabel) ??
        CONTACT_FOOTER_FALLBACK.contactSection.inquiriesLabel,
      requestInfoLabel:
        cleanString(document?.contactRequestInfoLabel) ??
        CONTACT_FOOTER_FALLBACK.contactSection.requestInfoLabel,
      bookConsultLabel:
        cleanString(document?.contactBookConsultLabel) ??
        CONTACT_FOOTER_FALLBACK.contactSection.bookConsultLabel,
      nameLabel:
        cleanString(document?.contactNameLabel) ?? CONTACT_FOOTER_FALLBACK.contactSection.nameLabel,
      emailLabel:
        cleanString(document?.contactEmailLabel) ?? CONTACT_FOOTER_FALLBACK.contactSection.emailLabel,
      nameValidationMessage:
        cleanString(document?.contactNameValidationMessage) ??
        CONTACT_FOOTER_FALLBACK.contactSection.nameValidationMessage,
      emailValidationMessage:
        cleanString(document?.contactEmailValidationMessage) ??
        CONTACT_FOOTER_FALLBACK.contactSection.emailValidationMessage,
      submitText:
        cleanString(document?.contactSubmitText) ?? CONTACT_FOOTER_FALLBACK.contactSection.submitText,
      submittingText:
        cleanString(document?.contactSubmittingText) ??
        CONTACT_FOOTER_FALLBACK.contactSection.submittingText,
      successHeading:
        cleanString(document?.contactSuccessHeading) ??
        CONTACT_FOOTER_FALLBACK.contactSection.successHeading,
      successDescription:
        cleanString(document?.contactSuccessDescription) ??
        CONTACT_FOOTER_FALLBACK.contactSection.successDescription,
      calendlyHeading:
        cleanString(document?.contactCalendlyHeading) ??
        CONTACT_FOOTER_FALLBACK.contactSection.calendlyHeading,
      calendlyDescription:
        cleanString(document?.contactCalendlyDescription) ??
        CONTACT_FOOTER_FALLBACK.contactSection.calendlyDescription,
    },
    leadMagnet: {
      eyebrow:
        cleanString(document?.leadMagnetEyebrow) ?? CONTACT_FOOTER_FALLBACK.leadMagnet.eyebrow,
      heading:
        cleanString(document?.leadMagnetHeading) ?? CONTACT_FOOTER_FALLBACK.leadMagnet.heading,
      description:
        cleanString(document?.leadMagnetDescription) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.description,
      emailPlaceholder:
        cleanString(document?.leadMagnetEmailPlaceholder) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.emailPlaceholder,
      validationMessage:
        cleanString(document?.leadMagnetValidationMessage) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.validationMessage,
      submitText:
        cleanString(document?.leadMagnetSubmitText) ?? CONTACT_FOOTER_FALLBACK.leadMagnet.submitText,
      submittingText:
        cleanString(document?.leadMagnetSubmittingText) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.submittingText,
      successHeading:
        cleanString(document?.leadMagnetSuccessHeading) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.successHeading,
      successDescription:
        cleanString(document?.leadMagnetSuccessDescription) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.successDescription,
      whatsappUrl:
        cleanString(document?.leadMagnetWhatsappUrl) ??
        CONTACT_FOOTER_FALLBACK.leadMagnet.whatsappUrl,
    },
    exitIntent: {
      eyebrow:
        cleanString(document?.exitIntentEyebrow) ?? CONTACT_FOOTER_FALLBACK.exitIntent.eyebrow,
      heading:
        cleanString(document?.exitIntentHeading) ?? CONTACT_FOOTER_FALLBACK.exitIntent.heading,
      description:
        cleanString(document?.exitIntentDescription) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.description,
      emailPlaceholder:
        cleanString(document?.exitIntentEmailPlaceholder) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.emailPlaceholder,
      validationMessage:
        cleanString(document?.exitIntentValidationMessage) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.validationMessage,
      submitText:
        cleanString(document?.exitIntentSubmitText) ?? CONTACT_FOOTER_FALLBACK.exitIntent.submitText,
      submittingText:
        cleanString(document?.exitIntentSubmittingText) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.submittingText,
      closeText:
        cleanString(document?.exitIntentCloseText) ?? CONTACT_FOOTER_FALLBACK.exitIntent.closeText,
      successHeading:
        cleanString(document?.exitIntentSuccessHeading) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.successHeading,
      successDescription:
        cleanString(document?.exitIntentSuccessDescription) ??
        CONTACT_FOOTER_FALLBACK.exitIntent.successDescription,
    },
  }
}
