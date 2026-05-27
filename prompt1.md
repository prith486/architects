# Implementation Guide: Scroll-Triggered Cursive "Writing" Animations

## Project Context
We are working on a Next.js 14 scrollytelling component (`HeroScroll.tsx`). A 226-frame image sequence plays on an HTML `<canvas>` mapped to the user's scroll depth (0 to 1). 
Current state: Frame 0 displays a static hero UI (Header, "Architecture is an Experience", etc.).

## Objective
As the user scrolls and the video progresses through the frames, the initial hero text must fade out. Then, at specific frame thresholds, new text elements using a cursive font and a gold color (`#D4AF37`) must appear. These cursive elements must animate in as if they are being "written" in real-time, tied directly to the scroll progress.

## 1. Typography & Styling Requirements
- **Font:** Import a cursive font from `next/font/google`. Use `Great Vibes`, `Alex Brush`, or `Cedarville Cursive`.
- **Color:** Gold (`#D4AF37`).
- **Styling:** Use a subtle `text-shadow` to ensure legibility against the changing video background.

## 2. Animation Logic (Framer Motion)
- Use `useScroll` and `useTransform` from `framer-motion`.
- **The "Writing" Effect:** Do NOT use time-based animations (like `duration: 2`). The animation must be driven entirely by scroll depth. 
- **Implementation Strategy:** Wrap the cursive text in a `motion.div` with `overflow-hidden` and `white-space: nowrap`. Map the scroll progress of the specific frame window to the `width` property (from `0%` to `100%`). This will reveal the text from left to right as the user scrolls, perfectly simulating a writing effect. Map the `opacity` to fade out after the scene ends.

## 3. Scene-by-Scene Breakdown & Frame Mapping
*Note: Total frames = 226. `progress` refers to the 0.0 - 1.0 output of `useScroll`.*

### Scene 1: The Departure (Frames 0 - 30)
- **Action:** Fade out the initial hero UI elements ("Architecture is an Experience", the play button, the scroll indicator).
- **Transform Mapping:** - `opacity`: map Frames 0 to 30 (approx progress `0.0` to `0.13`) -> `[1, 0]`

### Scene 2: The Approach (Frames 50 - 90)
- **Visual Context:** The drone is moving up the glowing steps toward the front door.
- **Text:** *"Designed for the senses."*
- **Position:** Centered on the screen, slightly below the middle (where the steps are).
- **Transform Mapping:**
  - `width` (Writing Effect): map Frames 50 to 75 (progress `0.22` to `0.33`) -> `["0%", "100%"]`
  - `opacity` (Fade Out): map Frames 80 to 90 (progress `0.35` to `0.39`) -> `[1, 0]`

### Scene 3: The Interior (Frames 110 - 160)
- **Visual Context:** The drone passes through the door into the spacious living room.
- **Text:** *"Where light flows..."*
- **Position:** Left-aligned, positioned over the empty floor space in the lower-left quadrant.
- **Transform Mapping:**
  - `width` (Writing Effect): map Frames 110 to 140 (progress `0.48` to `0.61`) -> `["0%", "100%"]`
  - `opacity` (Fade Out): map Frames 150 to 160 (progress `0.66` to `0.70`) -> `[1, 0]`

### Scene 4: The Reveal (Frames 190 - 226)
- **Visual Context:** The drone pushes out toward the backyard, revealing the glowing pool and the sunset sky.
- **Text:** *"Your Sanctuary."*
- **Position:** Centered, large, sitting right above the pool line against the sunset.
- **Transform Mapping:**
  - `width` (Writing Effect): map Frames 190 to 215 (progress `0.84` to `0.95`) -> `["0%", "100%"]`
  - `opacity`: Remains at `1` until the end of the sequence.

## 4. Execution Steps for the Agent
1. Setup the cursive font in the layout or component level.
2. Create an array of `useTransform` hooks mapping the `scrollYProgress` to the specific frame/progress values listed above.
3. Build a reusable `<ScrollWritingText />` component that accepts the text, position classes, the `widthTransform`, and `opacityTransform` as props.
4. Mount these absolute-positioned elements on top of the `<canvas>` layer within the main scroll container.