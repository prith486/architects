'use client';

import React, {useEffect, useState} from 'react';
import ContactSection from '@/components/ContactSection';
import {
  CONTACT_FOOTER_FALLBACK,
  mapContactFooterData,
  type ContactFooterData,
  type SanityContactFooterDocument,
} from '@/sanity/lib/contactFooterMapper';
import {client} from '@/sanity/lib/client';
import {contactFooterQuery} from '@/sanity/lib/queries';

export default function ContactFooter() {
  const [contactFooter, setContactFooter] = useState<ContactFooterData>(CONTACT_FOOTER_FALLBACK);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityContactFooterDocument | null>(contactFooterQuery)
      .then((document) => {
        if (isMounted) {
          setContactFooter(mapContactFooterData(document));
        }
      })
      .catch((error) => {
        console.warn('Sanity contact/footer fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <ContactSection contactContent={contactFooter} />

      {/* =========================================
           PREMIUM MINIMAL FOOTER
      ========================================= */}
      <footer className="site-footer relative z-10 w-full">
        <div className="footer-content">
          <div className="footer-logo">VAASTU.</div>
          <div className="footer-links">
            {contactFooter.footerLinks.map((link) => (
              <a key={`${link.label}-${link.url}`} href={link.url}>{link.label}</a>
            ))}
          </div>
          <div className="footer-legal">
            {contactFooter.copyrightText}
          </div>
        </div>
      </footer>
    </>
  );
}
