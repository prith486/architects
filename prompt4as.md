File 1: Contact & Footer Architecture (11_contact_and_footer.md)
Markdown
# Final Section: Contact & Footer (`11_contact_and_footer.md`)

**AGENT INSTRUCTION - CRITICAL PLACEMENT NOTE:** Inject this HTML structure at the very bottom of the page, strictly **AFTER** the `#process-timeline` section. Add the accompanying CSS to the main stylesheet. This serves as the bottom-most boundary of the website.

## 1. HTML Structure

```html
<!-- =========================================
     CONTACT / CTA SECTION
     CRITICAL PLACEMENT: AFTER Process Timeline
========================================= -->
<section id="contact" class="contact-section">
  <div class="contact-grid">
    
    <!-- Left Side: Massive Typography & Info -->
    <div class="contact-info">
      <h2 class="contact-title">Let's build <br><span class="gold-text">together.</span></h2>
      
      <div class="contact-details">
        <div class="detail-block">
          <span class="detail-label">Studio</span>
          <p class="detail-text">Pune, Maharashtra<br>India</p>
        </div>
        <div class="detail-block">
          <span class="detail-label">Inquiries</span>
          <p class="detail-text">hello@architecture-studio.com<br>+91 98765 43210</p>
        </div>
      </div>
    </div>

    <!-- Right Side: Minimalist Architectural Form -->
    <div class="contact-form-container glass-panel">
      <form class="architect-form">
        <div class="input-group">
          <input type="text" id="name" required placeholder=" ">
          <label for="name">Your Name</label>
        </div>
        
        <div class="input-group">
          <input type="email" id="email" required placeholder=" ">
          <label for="email">Email Address</label>
        </div>
        
        <div class="input-group">
          <input type="text" id="project" required placeholder=" ">
          <label for="project">Project Type (e.g., Residential, Commercial)</label>
        </div>
        
        <button type="submit" class="premium-submit-btn">
          Initiate Project <span class="arrow">→</span>
        </button>
      </form>
    </div>

  </div>
</section>

<!-- =========================================
     PREMIUM MINIMAL FOOTER
========================================= -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-logo">VASTU.</div>
    <div class="footer-links">
      <a href="#">Instagram</a>
      <a href="#">LinkedIn</a>
      <a href="#">ArchDaily</a>
    </div>
    <div class="footer-legal">
      &copy; 2026 Vastu Architecture. All Rights Reserved.
    </div>
  </div>
</footer>
2. CSS Styling
CSS
/* =========================================
   CONTACT & FOOTER STYLES
========================================= */

.contact-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 4vw;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* --- Left Side Typography --- */
.contact-title {
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 7vw, 6rem);
  line-height: 1;
  color: var(--color-text-main);
  margin-bottom: 60px;
}

.gold-text {
  color: var(--color-accent-gold);
  font-style: italic;
}

.contact-details {
  display: flex;
  gap: 60px;
}

.detail-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent-gold);
  display: block;
  margin-bottom: 8px;
}

.detail-text {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

/* --- Right Side Minimal Form --- */
.contact-form-container {
  padding: 60px;
}

.architect-form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.input-group {
  position: relative;
}

/* The invisible input box */
.input-group input {
  width: 100%;
  padding: 10px 0;
  font-family: var(--font-sans);
  font-size: 1.2rem;
  color: var(--color-text-main);
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  transition: border-color 0.3s ease;
}

/* The floating label */
.input-group label {
  position: absolute;
  top: 10px;
  left: 0;
  font-family: var(--font-sans);
  font-size: 1.1rem;
  color: var(--color-text-muted);
  pointer-events: none;
  transition: 0.3s ease all;
}

/* Focus and Float mechanics */
.input-group input:focus,
.input-group input:not(:placeholder-shown) {
  border-bottom-color: var(--color-accent-gold);
}

.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
  top: -20px;
  font-size: 0.85rem;
  color: var(--color-accent-gold);
  letter-spacing: 0.05em;
}

/* --- Premium Submit Button --- */
.premium-submit-btn {
  align-self: flex-start;
  margin-top: 20px;
  padding: 16px 32px;
  background-color: var(--color-text-main);
  color: var(--color-bg-base);
  font-family: var(--font-sans);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.premium-submit-btn:hover {
  background-color: var(--color-accent-gold);
  transform: translateY(-2px);
}

.premium-submit-btn .arrow {
  transition: transform 0.3s ease;
}

.premium-submit-btn:hover .arrow {
  transform: translateX(4px);
}

/* --- Footer --- */
.site-footer {
  width: 100%;
  padding: 40px 4vw;
  background-color: #111; /* Sharp dark contrast for the very bottom */
  color: #fff;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-sans);
}

.footer-logo {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  letter-spacing: 0.1em;
}

.footer-links {
  display: flex;
  gap: 32px;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-accent-gold);
}

.footer-legal {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.4);
}

/* --- Mobile Responsiveness --- */
@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }
  
  .contact-details {
    flex-direction: column;
    gap: 30px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }
}