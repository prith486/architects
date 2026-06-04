# VAΛSTU — CTA & Social Module Refinement Pass

## Objective

Refine the newly added CTA and Social Presence modules.

DO NOT redesign the section.

DO NOT move:

* Logo
* Navigation
* Headline
* Supporting copy
* Side metadata
* Vertical guide lines

Only fix hierarchy, spacing, and visual rhythm.

---

# Problem Analysis

Current implementation has introduced excessive vertical compression.

The CTA module, social links, and scroll indicator are visually colliding.

The page has lost the editorial breathing room that previously made it feel premium.

The goal is to restore negative space.

---

# CTA Width Adjustment

Current CTA buttons are visually too dominant.

Reduce width.

Current:

~380px

Target:

300px–320px

Maximum.

---

Height:

60px

Maintain existing styling.

Do not increase button prominence.

---

# CTA Position Adjustment

Move entire CTA module upward.

Current position is too close to the lower portion of the viewport.

Target:

Supporting Copy
↓ 70px
Divider
↓ 40px
CTA Module

The CTA block should sit closer to the content than to the footer area.

---

# Divider Refinement

Current divider feels disconnected.

Center divider must:

Width:

1px

Height:

36px

Color:

#C4A47C

Opacity:

25%

Position:

Exactly between supporting copy and CTA block.

Do not place additional dividers below buttons.

---

# Social Presence Module

Current implementation is the biggest issue.

The social links have collapsed into the scroll area.

---

## Placement

Position:

48px below CTA buttons.

Not below the fold.

Not touching scroll indicator.

---

## Layout

Horizontal.

Centered.

Gap:

72px

between items.

---

## Text

Use:

INSTAGRAM

LINKEDIN

TWITTER

Avoid:

IG

LN

X

Full names feel more premium and editorial.

---

## Typography

Font:

Lato

Size:

13px

Weight:

300

Letter Spacing:

0.22em

Uppercase.

Color:

#C4A47C

Opacity:

75%

---

## Hover

Underline grows from center.

Color transitions to:

#2A2826

Duration:

0.35s

---

# Scroll Indicator Separation

Current issue:

Scroll indicator is fighting for space with social links.

---

Add:

Minimum 60px spacing

between

Social Module

and

Scroll Indicator.

---

Structure should become:

CTA Buttons
↓ 48px

Social Links
↓ 60px

Scroll Indicator

---

# Scroll Indicator Styling

Maintain existing location.

Refine typography.

Text:

SCROLL TO EXPLORE

Size:

12px

Letter Spacing:

0.35em

Weight:

300

Color:

#C4A47C

Opacity:

75%

---

Arrow:

TranslateY(0 → 8px)

Duration:

2.5s

Infinite.

---

# Button Visual Weight

Current black button is slightly overpowering.

Reduce contrast slightly.

Background:

#232220

instead of pure black.

---

Secondary button border:

Increase visibility slightly.

Current border is getting lost against textured background.

Use:

#C4A47C

Opacity:

60%

---

# Final Vertical Rhythm

Headline
↓ 40px

Supporting Copy
↓ 70px

Divider
↓ 40px

CTA Buttons
↓ 48px

Social Links
↓ 60px

Scroll Indicator

This rhythm must be preserved.

---

# Final Goal

The section should feel like:

A luxury architecture publication.

Not a landing page.

Not a startup homepage.

Not a marketing funnel.

The CTAs should feel secondary to the architecture philosophy.

The social links should feel like editorial metadata.

The scroll indicator should retain its own visual space and never compete with other elements.
