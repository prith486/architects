'use client';

import React, {useEffect, useState} from 'react';
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
      {/* =========================================
           CONTACT / CTA SECTION
           CRITICAL PLACEMENT: AFTER Process Timeline
      ========================================= */}
      <section id="contact" className="contact-section relative z-10 w-full">
        <div className="contact-grid">
          
          {/* Left Side: Massive Typography & Info */}
          <div className="contact-info">
            <h2 className="contact-title">
              <span className="obsidian-text">{contactFooter.headingLineOne}</span> <br/>
              <span className="gold-text">{contactFooter.headingLineTwo}</span>
            </h2>
            
            <div className="contact-details">
              <div className="detail-block">
                <span className="detail-label">Studio</span>
                <p className="detail-text">
                  {contactFooter.addressLines.map((line, index) => (
                    <React.Fragment key={`${line}-${index}`}>
                      {line}
                      {index < contactFooter.addressLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
              <div className="detail-block">
                <span className="detail-label">Inquiries</span>
                <p className="detail-text">{contactFooter.email}<br/>{contactFooter.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Side: Minimalist Architectural Form */}
          <div className="contact-form-container glass-panel">
            <form className="architect-form">
              <div className="input-group">
                <input type="text" id="name" required placeholder=" " />
                <label htmlFor="name">Your Name</label>
              </div>
              
              <div className="input-group">
                <input type="email" id="email" required placeholder=" " />
                <label htmlFor="email">Email Address</label>
              </div>
              
              <div className="input-group">
                <input type="text" id="project" required placeholder=" " />
                <label htmlFor="project">Project Type (e.g., Residential, Commercial)</label>
              </div>
              
              <button type="submit" className="premium-submit-btn">
                Initiate Project <span className="arrow">→</span>
              </button>
            </form>
          </div>

        </div>
      </section>

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
