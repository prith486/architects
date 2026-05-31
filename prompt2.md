# Part 2: HTML Structure & Integration (`2_html_structure.md`)

This file contains the complete HTML markup for your 12-item project gallery. It uses a semantic `<section>` and `<article>` structure. 

Notice how the `style="--project-color: #HEXCODE;"` attribute is applied to the `.pattern-overlay` div on each card. This is how you dynamically pass the specific brand color for each project without writing separate CSS classes for every single item. 

I have populated the grid with relevant project titles and categories to give you a realistic, ready-to-use boilerplate.

```html
<!-- portfolio.html -->

<section class="portfolio-grid">

  <!-- Project 1 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_1_siem.jpg" alt="Conversational SIEM Assistant Interface" class="project-img">
      <!-- Deep Blue Overlay -->
      <div class="pattern-overlay" style="--project-color: #1a365d;"></div>
    </div>
    <div class="project-info">
      <span class="category">Cybersecurity</span>
      <h3 class="title">Conversational SIEM</h3>
    </div>
  </article>

  <!-- Project 2 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_2_decentrahack.jpg" alt="DecentraHACK Event Design" class="project-img">
      <!-- Dark Iron/Charcoal Overlay -->
      <div class="pattern-overlay" style="--project-color: #2d3748;"></div>
    </div>
    <div class="project-info">
      <span class="category">Event Branding</span>
      <h3 class="title">DecentraHACK - GOT Edition</h3>
    </div>
  </article>

  <!-- Project 3 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_3_opencred.jpg" alt="OpenCred Developer Passport" class="project-img">
      <!-- Sage Green Overlay -->
      <div class="pattern-overlay" style="--project-color: #7b9a8b;"></div>
    </div>
    <div class="project-info">
      <span class="category">Blockchain</span>
      <h3 class="title">OpenCred (DevProof)</h3>
    </div>
  </article>

  <!-- Project 4 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_4_placement.jpg" alt="Placement360 System Architecture" class="project-img">
      <!-- Warm Terracotta Overlay -->
      <div class="pattern-overlay" style="--project-color: #c05621;"></div>
    </div>
    <div class="project-info">
      <span class="category">System Architecture</span>
      <h3 class="title">Placement360</h3>
    </div>
  </article>

  <!-- Project 5 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_5_multiagent.jpg" alt="Multi-Agent System Map" class="project-img">
      <!-- Deep Purple Overlay -->
      <div class="pattern-overlay" style="--project-color: #44337a;"></div>
    </div>
    <div class="project-info">
      <span class="category">AI / LLM</span>
      <h3 class="title">Multi-Agent RAG Systems</h3>
    </div>
  </article>

  <!-- Project 6 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_6_traffic.jpg" alt="Smart Traffic Management UI" class="project-img">
      <!-- Slate Grey Overlay -->
      <div class="pattern-overlay" style="--project-color: #718096;"></div>
    </div>
    <div class="project-info">
      <span class="category">AI / IoT</span>
      <h3 class="title">Smart Traffic Management</h3>
    </div>
  </article>

  <!-- Project 7 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_7_lab.jpg" alt="Computer Lab Redesign" class="project-img">
      <!-- Muted Gold Overlay -->
      <div class="pattern-overlay" style="--project-color: #b7791f;"></div>
    </div>
    <div class="project-info">
      <span class="category">Interior Design</span>
      <h3 class="title">PCCOE Lab Redesign</h3>
    </div>
  </article>

  <!-- Project 8 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_8_fraud.jpg" alt="Blockchain Fraud Monitoring" class="project-img">
      <!-- Crimson Red Overlay -->
      <div class="pattern-overlay" style="--project-color: #9b2c2c;"></div>
    </div>
    <div class="project-info">
      <span class="category">Smart Contracts</span>
      <h3 class="title">Fraud Monitoring</h3>
    </div>
  </article>

  <!-- Project 9 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_9_logo.jpg" alt="3D Glassmorphism Logo" class="project-img">
      <!-- Ice Blue Overlay -->
      <div class="pattern-overlay" style="--project-color: #63b3ed;"></div>
    </div>
    <div class="project-info">
      <span class="category">UI/UX Design</span>
      <h3 class="title">Glassmorphism Branding</h3>
    </div>
  </article>

  <!-- Project 10 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_10_elastic.jpg" alt="Elastic SIEM Implementation" class="project-img">
      <!-- Teal Overlay -->
      <div class="pattern-overlay" style="--project-color: #2c7a7b;"></div>
    </div>
    <div class="project-info">
      <span class="category">Infrastructure</span>
      <h3 class="title">Elastic & Wazuh Integration</h3>
    </div>
  </article>

  <!-- Project 11 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_11_solana.jpg" alt="Solana Smart Contract Architecture" class="project-img">
      <!-- Neon Mint Overlay -->
      <div class="pattern-overlay" style="--project-color: #4fd1c5;"></div>
    </div>
    <div class="project-info">
      <span class="category">Web3</span>
      <h3 class="title">Solana Governance</h3>
    </div>
  </article>

  <!-- Project 12 -->
  <article class="project-card">
    <div class="image-container">
      <img src="assets/img_12_photo.jpg" alt="Cinematic Photography Retouch" class="project-img">
      <!-- Warm Sand Overlay -->
      <div class="pattern-overlay" style="--project-color: #d6bcfa;"></div>
    </div>
    <div class="project-info">
      <span class="category">Digital Art</span>
      <h3 class="title">Cinematic Retouching</h3>
    </div>
  </article>

</section>