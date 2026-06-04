import React from 'react';
import ContactSection from '@/components/ContactSection';

export default function ContactFooter() {
  return (
    <>
      <ContactSection />

      {/* =========================================
           PREMIUM MINIMAL FOOTER
      ========================================= */}
      <footer className="site-footer relative z-10 w-full">
        <div className="footer-content">
          <div className="footer-logo">VAASTU.</div>
          <div className="footer-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">ArchDaily</a>
          </div>
          <div className="footer-legal">
            &copy; 2026 Vaastu Architecture. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
