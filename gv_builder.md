# VAΛSTU — CTA & Social Presence Refinement Specification

## Objective

Refine the section located immediately after the Hero Sequence and before the About Us section.

The current layout, spacing hierarchy, logo placement, headline position, architectural side metadata, scroll indicator, and overall composition are already strong and should remain unchanged.

This refinement pass focuses on:

* Adding premium CTA actions
* Adding social presence links
* Improving interaction opportunities
* Maintaining the luxury architectural aesthetic
* Preserving the Swiss editorial layout

---

# Critical Constraints

## DO NOT MODIFY

* Logo position
* Logo size
* Navigation placement
* Headline position
* Headline scale
* Supporting copy position
* Side metadata positioning
* Vertical guide lines
* Scroll indicator placement
* Existing section spacing
* Existing animation timeline
* Existing GSAP interactions

This is a refinement pass, not a redesign.

---

# CTA Module

## Placement

Insert CTA actions directly below the supporting paragraph.

Current structure:

Headline
↓
Supporting Copy
↓
Scroll Indicator

New structure:

Headline
↓
Supporting Copy
↓
CTA Module
↓
Social Presence Module
↓
Scroll Indicator

---

## Divider

Add a centered architectural divider above the CTA buttons.

Properties:

* Width: 1px
* Height: 40px
* Color: #C4A47C
* Opacity: 30%
* Alignment: Center

Purpose:

Creates visual separation between content and actions.

---

## CTA Container

Layout:

Horizontal

Alignment:

Center

Gap:

36px – 40px

Margin Top:

40px

---

## Primary CTA

Text:

EXPLORE PROJECTS →

Style:

Filled Button

Background:

#1E1D1C

Text Color:

#F8F6F2

Width:

380px

Height:

64px

Font:

Lato

Weight:

400

Letter Spacing:

0.12em

Text Transform:

Uppercase

Border Radius:

0px

No rounded corners.

---

### Primary CTA Hover

Background:

#2A2826

Transition:

0.35s

Easing:

cubic-bezier(0.16,1,0.3,1)

Arrow:

Translate X by 6px

---

## Secondary CTA

Text:

START A PROJECT →

Style:

Ghost Button

Background:

Transparent

Border:

1px solid #C4A47C

Text:

#C4A47C

Width:

380px

Height:

64px

Border Radius:

0px

---

### Secondary CTA Hover

Background:

rgba(196,164,124,0.06)

Border:

Remain Gold

Arrow:

Translate X by 6px

Transition:

0.35s

---

# Social Presence Module

## Objective

Represent social presence using editorial typography rather than icons.

Avoid generic social-media styling.

The links should feel like part of an architectural publication.

---

## Placement

Position below CTA buttons.

Spacing:

50px

from CTA module.

---

## Layout

Horizontal

Centered

Gap:

56px

---

## Social Items

INSTAGRAM

LINKEDIN

X

Use text only.

Do NOT use:

* Instagram icon
* LinkedIn icon
* Twitter icon
* Circular buttons
* Social badges

---

## Typography

Font:

Lato

Size:

14px

Weight:

300

Letter Spacing:

0.18em

Text Transform:

Uppercase

Color:

#C4A47C

Opacity:

70%

---

## Hover State

Color:

#2A2826

Underline:

Center-out animation

Width:

0 → 100%

Height:

1px

Color:

#C4A47C

Duration:

0.35s

Easing:

cubic-bezier(0.16,1,0.3,1)

---

# Scroll Indicator Refinement

Keep existing scroll indicator.

Do not move.

Do not redesign.

---

## Typography

Text:

SCROLL TO EXPLORE

Font Size:

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

## Arrow Animation

Translate Y:

0px → 8px

Duration:

2.5s

Infinite

Ease:

ease-in-out

Very subtle.

---

# Final Vertical Rhythm

Headline
↓ 40px

Supporting Copy
↓ 50px

Architectural Divider
↓ 40px

CTA Module
↓ 50px

Social Presence Module
↓ 40px

Scroll Indicator

---

# Visual Goal

The final result should feel like:

* Architectural Digest Editorial
* Aman Resorts Brand Site
* Norm Architects
* Vincent Van Duysen Studio
* Swiss Editorial Design

The CTA actions should feel intentional and restrained.

The social presence should feel like publication metadata rather than social media marketing.

The section should remain calm, premium, architectural, and timeless.
