# Process Section Part 1: HTML Architecture (`8_process_html.md`)

**AGENT INSTRUCTION - CRITICAL PLACEMENT NOTE:** The current website ends after the Project Showcase. You must expand the main document flow by injecting this `<section>` at the very bottom of the page, strictly **AFTER** the Project Showcase (`.portfolio-grid`) section. 

This HTML establishes a vertical timeline structure. It includes a central line and alternating left/right nodes that will house our premium glassmorphic content cards.

```html
<section id="process-timeline" class="process-section">
  
  <div class="process-header-container">
    <h2 class="process-main-title">The Blueprint.</h2>
    <p class="process-subtitle">A rigorous approach from conceptual sketch to built reality.</p>
  </div>

  <div class="timeline-container">
    
    <div class="timeline-progress-line" id="timeline-line"></div>

    <article class="timeline-item left">
      <div class="timeline-node"></div>
      <div class="timeline-content glass-panel-alt">
        <span class="timeline-phase">01. Discovery</span>
        <h3 class="timeline-title">Site & Feasibility</h3>
        <p class="timeline-body">
          Before a single line is drawn, we analyze the topography, climate, and zoning. We listen to your vision to establish a robust architectural brief that harmonizes with the environment.
        </p>
      </div>
    </article>

    <article class="timeline-item right">
      <div class="timeline-node"></div>
      <div class="timeline-content glass-panel-alt">
        <span class="timeline-phase">02. Conception</span>
        <h3 class="timeline-title">Architectural Drafting</h3>
        <p class="timeline-body">
          Translating vision into geometry. We develop initial sketches, massing studies, and spatial flows, ensuring every square meter is optimized for light, movement, and purpose.
        </p>
      </div>
    </article>

    <article class="timeline-item left">
      <div class="timeline-node"></div>
      <div class="timeline-content glass-panel-alt">
        <span class="timeline-phase">03. Engineering</span>
        <h3 class="timeline-title">Precision Rendering</h3>
        <p class="timeline-body">
          The concept becomes tangible. Through hyper-realistic 3D rendering and rigorous structural engineering, we bridge the gap between imagination and physical reality.
        </p>
      </div>
    </article>

    <article class="timeline-item right">
      <div class="timeline-node"></div>
      <div class="timeline-content glass-panel-alt">
        <span class="timeline-phase">04. Execution</span>
        <h3 class="timeline-title">Construction & Handover</h3>
        <p class="timeline-body">
          Absolute control over the build. We act as the guardian of the design during construction, ensuring the final structure is a flawless execution of the initial intent.
        </p>
      </div>
    </article>

  </div>
</section>