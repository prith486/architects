# VAΛSTU Hero Section — Social Presence & Inquiry Refinement Specification

## Objective

Add subtle premium interaction points to the Hero Section without altering:

* Existing layout
* Existing GSAP timeline
* Existing frame-sequence animation
* Existing typography hierarchy
* Existing spacing
* Existing content positioning
* Existing fade/disappearance behavior

The additions must feel native to the hero.

The user should feel they were always part of the design.

---

# Critical Constraint

## DO NOT CREATE NEW ANIMATION TIMELINES

The additions must inherit the same GSAP fade and disappearance behavior as the nearest hero content group.

When:

* Headline fades
* Supporting copy fades
* Philosophy CTA fades
* Progress indicator fades

The newly added elements must fade simultaneously.

No independent animations.

No floating persistent widgets.

No delayed exits.

No sticky behavior.

No fixed behavior after hero completion.

The additions must disappear naturally with the rest of the hero content.

---

# Addition 01 — Social Presence Rail

## Purpose

Provide subtle access to social platforms without introducing visual noise.

The rail should feel like architectural metadata.

Not social media marketing.

---

## Placement

Right side of viewport.

Aligned directly on the existing architectural guide line.

Use the existing vertical structure.

Do not create a new visual axis.

---

## Vertical Position

Centered relative to the headline block.

Not centered relative to viewport.

This creates visual balance.

---

## Structure

Vertical Stack

INSTAGRAM

LINKEDIN

EMAIL

Represent using icons or typographic abbreviations.

Do not use:

* Filled circles
* Large logos
* Brand colors
* Floating buttons

---

## Icon Style

Monochrome.

Champagne Gold.

No backgrounds.

No containers.

No badges.

---

## Color

#C4A47C

Opacity:

55%

Default.

---

Hover:

Opacity:

100%

Color remains:

#C4A47C

---

## Size

18px–22px

Maximum.

Subtle.

---

## Spacing

36px–40px

Between items.

---

## Animation

MUST inherit the hero content fade.

When headline begins disappearing:

Social rail begins disappearing.

When supporting copy reaches 0 opacity:

Social rail reaches 0 opacity.

No separate trigger.

---

# Addition 02 — Inquiry Whisper

## Purpose

Provide a direct project inquiry entry point.

Should feel editorial.

Not like a button.

Not like navigation.

---

## Placement

Top-right corner.

Within existing safe margin.

Mirror spacing of logo.

---

## Text

INQUIRE →

Alternative:

START PROJECT →

Preferred:

INQUIRE →

More restrained.

---

## Typography

Font:

Lato

Weight:

300

Size:

13px

Letter Spacing:

0.24em

Uppercase.

---

## Color

#C4A47C

Opacity:

75%

---

## Underline

Default:

Hidden.

Hover:

Center-out reveal.

Width:

0 → 100%

Duration:

0.35s

---

## Interaction

Links directly to CTA/contact section.

Smooth Lenis scroll.

No modal.

No popup.

No overlay.

---

## Animation

Must inherit same hero fade.

When headline fades:

Inquiry link fades.

When hero exits:

Inquiry link exits.

No independent persistence.

---

# Visual Hierarchy Rules

The hierarchy must remain:

Logo

↓

Headline

↓

Supporting Copy

↓

Philosophy CTA

↓

Progress Indicator

Only then:

Social Rail

Inquiry Link

The new additions must never become dominant.

---

# Opacity Rule

All new additions must be visually quieter than:

* Headline
* Supporting Copy
* Philosophy CTA

Target visibility:

55%–75%

Maximum.

---

# What Must NOT Be Added

Do NOT add:

* Reach Out button
* Floating Action Button
* Bottom-right widget
* Glassmorphic card
* Large social buttons
* Social counters
* Contact card
* Chat bubble
* Sticky inquiry panel
* Persistent CTA

These elements compete with the architecture.

---

# Desired Emotional Outcome

The visitor should discover the additions.

Not notice them immediately.

The architecture remains the hero.

The social presence feels like architectural annotation.

The inquiry link feels like a quiet invitation.

Nothing should interrupt the cinematic nature of the hero sequence.

The additions should feel like part of the original composition rather than new features layered on top.
