# Part 3: Complete CSS Styling & Responsive Grid (`3_css_styling.md`)

This final file contains the comprehensive CSS required to bring the HTML structure to life. It includes a responsive CSS Grid layout to handle the 12 items perfectly across all devices, alongside the precise animation mechanics for the 3D tactile hover effect.

### CSS Implementation

Create a file named `style.css` and link it to your HTML. Ensure you replace `'assets/transparent-3d-pattern.png'` with the actual path to the transparent pattern you create from the prompts in File 1.

```css
/* =========================================
   1. Base Setup & Typography
========================================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f9f9f9;
  color: #111;
  padding: 40px 20px;
}

/* =========================================
   2. Responsive Portfolio Grid
========================================= */
.portfolio-grid {
  display: grid;
  /* Auto-fit creates columns automatically. Min 300px, max 1 fraction of space */
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px 24px; /* 40px vertical gap, 24px horizontal gap */
  max-width: 1400px;
  margin: 0 auto; /* Center the grid */
}

/* =========================================
   3. The Project Card Container
========================================= */
.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Space between the image box and the text below */
  cursor: pointer;
  /* Optional: subtle lift effect on the whole card */
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
}

/* =========================================
   4. Image & Animation Container
========================================= */
.image-container {
  position: relative; /* Crucial for containing the absolute overlay */
  width: 100%;
  aspect-ratio: 4 / 3; /* Maintains consistent image sizes */
  overflow: hidden;
  border-radius: 2px; /* Very subtle rounding for an architectural feel */
  background-color: #e2e2e2; /* Loading placeholder color */
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* Optional: Slight zoom out on the image when overlay appears */
  transition: transform 0.4s ease;
}

/* =========================================
   5. The 3D Hover Overlay (The Magic)
========================================= */
.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  
  /* 
    The dynamic color is pulled from the inline CSS variable in the HTML.
    Fallback to a dark grey if the variable is missing. 
  */
  background-color: var(--project-color, #333333);
  
  /* The transparent tile containing only shadows and highlights */
  background-image: url('assets/transparent-3d-pattern.png');
  background-repeat: repeat;
  background-size: 180px; /* Adjust this to scale your 3D monogram */
  background-position: center;
  
  /* Animation mechanics */
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
}

/* Trigger the overlay opacity on hover */
.project-card:hover .pattern-overlay {
  opacity: 1;
}

/* Optional: Subtle image scale down while overlay fades in */
.project-card:hover .project-img {
  transform: scale(1.03);
}

/* =========================================
   6. Static Metadata (Text Below Image)
========================================= */
.project-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px; /* Slight inset */
}

.category {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.title {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
  color: #000;
}

/* =========================================
   7. Media Queries for Mobile Fine-tuning
========================================= */
@media (max-width: 768px) {
  .portfolio-grid {
    gap: 32px 16px;
  }
  
  .project-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .title {
    font-size: 1rem;
  }
}