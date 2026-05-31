# Hero Section Redesign Part 1: HTML Architecture (`16_hero_html_update.md`)

**AGENT INSTRUCTION:** Completely replace the existing inner HTML of the `#hero-landing` section with this new structure. This precisely matches the target high-end layout (VAASTU branding, top corner meta-text, bottom-left typography, and bottom-right scroll indicator). 

**CRITICAL:** The `fade-layer` and `data-speed` classes have been strictly preserved. Do not remove them, as they are required to keep the existing scroll-disappearance JavaScript working perfectly without touching the JS file.

## HTML Structure Update

```html
<!-- =========================================
     HERO SECTION (VAASTU LAYOUT)
     CRITICAL PLACEMENT: Top of the page
========================================= -->
<section id="hero-landing" class="hero-section">
  
  <!-- Layer 1: The Cinematic Background Image -->
  <div class="hero-background">
    <!-- Image path remains the same -->
    <img src="assets/hero-concrete-house.webp" alt="Modern Concrete Architecture by the Water" class="hero-img">
  </div>

  <!-- Layer 2: The Vignette Overlay -->
  <div class="hero-overlay"></div>

  <!-- Layer 3: Top Meta Data & Branding -->
  <div class="hero-top-bar fade-layer" data-speed="1.5">
    
    <!-- Top Left -->
    <div class="meta-left">
      <span class="meta-text">EST.</span>
      <span class="meta-text">2020</span>
      <div class="meta-line"></div>
    </div>

    <!-- Top Center (Logo) -->
    <div class="brand-center">
      <div class="brand-logo">VA<span class="gold-a">A</span>STU</div>
      <div class="brand-tagline">ARCHITECTURE . INTERIORS . HARMONY</div>
    </div>

    <!-- Top Right -->
    <div class="meta-right">
      <span class="meta-text">PUNE</span>
      <span class="meta-text">INDIA</span>
    </div>
  </div>

  <!-- Layer 4: Bottom Left Main Typography -->
  <div class="hero-main-content fade-layer" data-speed="1">
    
    <h1 class="hero-title">
      Spaces that elevate.<br>
      Experiences that endure.
    </h1>
    
    <p class="hero-subtitle">
      We design with intention, craft with precision<br>
      and build places that inspire for generations.
    </p>

    <!-- Explore link -->
    <div class="hero-explore">
      <span class="explore-text">EXPLORE OUR PHILOSOPHY</span>
      <div class="explore-line"></div>
    </div>

    <!-- Slider Indicator -->
    <div class="hero-slider-indicator">
      <span class="slider-num">01</span>
      <div class="slider-track"><div class="slider-fill"></div></div>
      <span class="slider-num">04</span>
    </div>

  </div>

  <!-- Layer 5: Bottom Right Scroll Indicator -->
  <div class="hero-scroll-indicator fade-layer" data-speed="1.2">
    <span class="scroll-text">SCROLL TO BEGIN</span>
    <div class="scroll-arrow-container">
      <div class="scroll-line-vertical"></div>
      <!-- SVG Down Arrow -->
      <svg class="arrow-down" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </div>
  </div>

</section>