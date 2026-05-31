# Hero Section Part 1: HTML Architecture (`12_hero_html.md`)

**AGENT INSTRUCTION:** This is the absolute top of the website (the Hero section). It must be placed at the very beginning of the `<body>`, before the `#about-us` section. Do not include a navigation bar. 

This structure uses layered absolute positioning to place ultra-premium typography and a scroll indicator over the main cinematic photograph. Notice the `fade-layer` classes; these are critical for the scroll-based disappearance effect we will implement next.

## HTML Structure

```html
<section id="hero-landing" class="hero-section">
  
  <div class="hero-background">
    <img src="assets/hero-concrete-house.webp" alt="Modern Concrete Architecture by the Water" class="hero-img">
  </div>

  <div class="hero-overlay"></div>

  <div class="hero-content-wrapper">
    
    <div class="hero-badge fade-layer" data-speed="1.5">
      <span class="badge-line"></span>
      <span class="badge-text">EST. 2020</span>
    </div>

    <h1 class="hero-title fade-layer" data-speed="1">
      <span class="title-word">Form.</span><br>
      <span class="title-word gold-text">Function.</span><br>
      <span class="title-word">Forever.</span>
    </h1>

    <p class="hero-subtitle fade-layer" data-speed="0.8">
      Redefining the brutalist aesthetic for the modern landscape.
    </p>

  </div>

  <div class="scroll-indicator fade-layer" data-speed="2">
    <span class="scroll-text">Scroll to explore</span>
    <div class="scroll-line-container">
      <div class="scroll-line"></div>
    </div>
  </div>

</section>