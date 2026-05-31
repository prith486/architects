import React from 'react';

export default function ContactFooter() {
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
            <h2 className="contact-title">Let's build <br/><span className="gold-text">together.</span></h2>
            
            <div className="contact-details">
              <div className="detail-block">
                <span className="detail-label">Studio</span>
                <p className="detail-text">Pune, Maharashtra<br/>India</p>
              </div>
              <div className="detail-block">
                <span className="detail-label">Inquiries</span>
                <p className="detail-text">hello@architecture-studio.com<br/>+91 98765 43210</p>
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
