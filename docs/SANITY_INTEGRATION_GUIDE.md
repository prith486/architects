# Sanity CMS Integration Guide

## 1. Overview

Sanity was introduced so the portfolio website content can be edited from a CMS instead of living only in React components and local data files.

The integration goals were:

- Allow non-developers to manage website copy and project data in Sanity Studio.
- Preserve the current visual design and animation behavior.
- Keep hardcoded/local fallbacks so the site still works if Sanity content is missing or unavailable.
- Protect high-risk animated sections from raw CMS data shape changes.

CMS-managed sections now include:

- Homepage text content
- About / Philosophy
- Projects
- Project Detail Pages
- Process Section
- Contact / Footer
- Navigation
- Site Settings

Safety-critical sections:

- `PortfolioShowcase`: depends on GSAP measurements, placeholder refs, card refs, card ordering, card aspect values, image load timing, and ScrollTrigger refresh behavior.
- `HeroScroll`: depends on a 252-frame image sequence, canvas rendering, and a GSAP timeline.
- Project Detail Pages: include client-side animation and image expansion behavior, so Sanity data is normalized before entering the UI.

## 2. Project Architecture Before Integration

This is a Next.js App Router project. The homepage route is `src/app/page.tsx`, and project detail pages use the dynamic App Router route `src/app/projects/[slug]/page.tsx`.

Before Sanity integration:

- Homepage content was hardcoded inside components.
- Project card and project detail source data lived in `src/data/projects.ts`.
- `PortfolioShowcase` imported `PROJECTS` directly from `src/data/projects.ts`.
- Project Detail Pages used local project data by slug.
- Global metadata lived in `src/app/layout.tsx`.

Important pre-integration files:

- `src/app/page.tsx`: homepage composition and Lenis smooth scrolling setup.
- `src/components/canvas/HeroScroll.tsx`: animated canvas hero with a 252-frame sequence.
- `src/components/portfolio/PortfolioShowcase.tsx`: GSAP carousel-to-masonry project section.
- `src/components/portfolio/ProjectDetailClient.tsx`: Project Detail Page client UI.
- `src/data/projects.ts`: original project data source and emergency fallback.

`PortfolioShowcase` was especially sensitive because the original animation relies on a pair of elements for every project:

- A placeholder element used for masonry layout measurement.
- An absolutely animated card element that morphs from carousel state into the measured placeholder position.

## 3. Sanity Installation

Actual Sanity-related packages present in `package.json`:

```json
{
  "@sanity/image-url": "^2.1.1",
  "@sanity/vision": "^5.30.0",
  "next-sanity": "^12.4.5",
  "sanity": "^5.30.0"
}
```

Recoverable setup commands from the current repository state and integration work:

```bash
npm install sanity next-sanity @sanity/image-url @sanity/vision
npm run build
node scripts/seed-sanity-projects.cjs
node scripts/seed-sanity-singletons.cjs
```

The repository contains a standard embedded Studio setup rather than a separate `sanity/` app directory. The exact initial `npx sanity init` command is not recorded in the repo, but the resulting files are present and documented below.

## 4. Sanity Studio Setup

Studio route:

- `/studio`
- Implemented at `src/app/studio/[[...tool]]/page.tsx`

Studio config:

- `sanity.config.ts`

CLI config:

- `sanity.cli.ts`

Environment file:

- `.env.local`

Current required environment variables:

```env
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="orhh10oe"
```

`src/sanity/env.ts` provides:

- `projectId`
- `dataset`
- `apiVersion`

The API version defaults to:

```ts
'2026-06-04'
```

`sanity.config.ts`:

- Sets `basePath: '/studio'`
- Registers the schema from `src/sanity/schemaTypes`
- Registers the custom Studio structure from `src/sanity/structure.ts`
- Enables the Vision plugin with the configured API version

`sanity.cli.ts`:

- Reads the project ID and dataset from environment variables
- Lets local Sanity CLI commands target the correct project/dataset

`src/app/studio/[[...tool]]/page.tsx`:

- Renders `<NextStudio config={config} />`
- Exports Sanity Studio metadata and viewport
- Uses `dynamic = 'force-static'`

## 5. Schema Architecture

Schemas are registered in:

- `src/sanity/schemaTypes/index.ts`

Document schemas:

- `src/sanity/schemaTypes/documents/siteSettings.ts`
- `src/sanity/schemaTypes/documents/navigation.ts`
- `src/sanity/schemaTypes/documents/homepage.ts`
- `src/sanity/schemaTypes/documents/aboutPhilosophy.ts`
- `src/sanity/schemaTypes/documents/project.ts`
- `src/sanity/schemaTypes/documents/processSection.ts`
- `src/sanity/schemaTypes/documents/contactFooter.ts`

Reusable object schemas:

- `src/sanity/schemaTypes/objects/imageWithAlt.ts`
- `src/sanity/schemaTypes/objects/seoFields.ts`
- `src/sanity/schemaTypes/objects/richText.ts`
- `src/sanity/schemaTypes/objects/socialLink.ts`
- `src/sanity/schemaTypes/objects/navigationItem.ts`
- `src/sanity/schemaTypes/objects/projectMetadata.ts`

### Site Settings

File: `src/sanity/schemaTypes/documents/siteSettings.ts`

Purpose:

- Stores global site identity, default SEO, global contact details, and social links.

Fields:

- `studioName`
- `logo`
- `signatureLogo`
- `defaultSeoTitle`
- `defaultSeoDescription`
- `openGraphImage`
- `globalEmail`
- `globalPhone`
- `studioAddress`
- `socialLinks`

Relationships:

- Uses `imageWithAlt` for images.
- Uses `socialLink` for social links.

### Navigation

File: `src/sanity/schemaTypes/documents/navigation.ts`

Purpose:

- Stores header navigation items and CTA button content.

Fields:

- `items`
- `ctaButtonText`
- `ctaButtonUrl`

Relationships:

- Uses `navigationItem`.

### Homepage

File: `src/sanity/schemaTypes/documents/homepage.ts`

Purpose:

- Stores safe homepage text fields for `HeroScroll` and the Portfolio intro overlay.

Fields:

- `heroTitle`
- `heroSubtitle`
- `heroSupportingText`
- `phaseSlides`
- `portfolioSectionTitle`
- `portfolioSupportingText`
- `seo`

Relationships:

- Uses `seoFields`.

### About / Philosophy

File: `src/sanity/schemaTypes/documents/aboutPhilosophy.ts`

Purpose:

- Stores the About / Philosophy heading, subtitle, and panel copy.

Fields:

- `mainHeading`
- `subtitle`
- `panels`

Panel fields:

- `number`
- `title`
- `description`
- `image`

Relationships:

- Uses `imageWithAlt`.

### Projects

File: `src/sanity/schemaTypes/documents/project.ts`

Purpose:

- Stores project card data, PDP content, images, SEO, and related projects.

Relationships:

- Uses `projectMetadata`
- Uses `seoFields`
- Uses `imageWithAlt`
- Can reference other `project` documents via related projects

### Process Section

File: `src/sanity/schemaTypes/documents/processSection.ts`

Purpose:

- Stores the process/blueprint section title, subtitle, and steps.

Fields:

- `sectionTitle`
- `sectionSubtitle`
- `steps`

Step fields:

- `number`
- `phaseLabel`
- `title`
- `description`
- `image`

Relationships:

- Uses `imageWithAlt`.

### Contact / Footer

File: `src/sanity/schemaTypes/documents/contactFooter.ts`

Purpose:

- Stores contact section content and footer links/copyright.

Fields:

- `heading`
- `description`
- `email`
- `phone`
- `address`
- `footerLinks`
- `copyrightText`

Relationships:

- Uses `socialLink`.

### Reusable Objects

`imageWithAlt`:

- `image`
- `alt`

`seoFields`:

- `title`
- `description`
- `image`

`richText`:

- Portable Text block content.

`socialLink`:

- `label`
- `url`

`navigationItem`:

- `label`
- `url`
- `sortOrder`

`projectMetadata`:

- `year`
- `location`
- `area`
- `client`

## 6. Studio Structure

Studio structure file:

- `src/sanity/structure.ts`

Final sidebar hierarchy:

- Site Settings
- Navigation
- Divider
- Homepage
- About / Philosophy
- Projects
- Process Section
- Contact / Footer
- Divider
- Any future non-custom document types

Singleton documents are used for sections that should have exactly one editable document.

Singleton IDs:

- `siteSettings`
- `navigation`
- `homepage`
- `aboutPhilosophy`
- `processSection`
- `contactFooter`

The Projects item is a repeatable document type list:

```ts
S.documentTypeListItem('project').title('Projects')
```

A Studio crash was fixed by excluding `project` from the generated fallback list:

```ts
const customStructureTypes = new Set([...singletonTypes, 'project'])
```

This prevents duplicate top-level structure IDs for `project`.

## 7. Project Schema Design

The `project` schema supports both homepage portfolio cards and Project Detail Pages.

Basic information:

- `title`
- `slug`
- `category`
- `featuredProject`
- `sortOrder`

Portfolio card settings:

- `cardImage`
- `cardImageUrl`
- `cardAspect`
- `cardColor`
- `logoText`

Project Detail Page fields:

- `heroImage`
- `heroImageUrl`
- `heroCaption`
- `metadata`
- `narrativeHeading`
- `narrativeParagraphs`
- `galleryTitle`
- `galleryItems`
- `designIntentHeading`
- `designIntentBody`
- `materialityHeading`
- `materialityBody`
- `materialityImage`
- `materialityImageUrl`
- `cinematicQuote`
- `cinematicQuoteAttribution`
- `cinematicQuoteBackgroundImage`
- `cinematicQuoteBackgroundImageUrl`
- `relatedProjects`

SEO fields:

- `seo.title`
- `seo.description`
- `seo.image`
- `seoImageUrl`

Controlled fields:

- `slug`: used for `/projects/[slug]` routing.
- `sortOrder`: controls project order.
- `cardAspect`: controls PortfolioShowcase card dimensions.
- `cardColor`: controls the hover lower-third color.
- `logoText`: rendered in the project card hover panel.

`cardAspect` must stay controlled because PortfolioShowcase measurements depend on predictable dimensions. Allowed values:

- `aspect-[3/4]`
- `aspect-[4/3]`
- `aspect-[1/1]`

## 8. Image Strategy

There are two image strategies:

1. Sanity image assets through `imageWithAlt`
2. External URL fallback fields for project images

Project image priority:

1. Uploaded Sanity image asset
2. URL fallback
3. Hardcoded fallback from `src/data/projects.ts`

Project image fields with URL fallback:

- `cardImage` + `cardImageUrl`
- `heroImage` + `heroImageUrl`
- `seo.image` + `seoImageUrl`
- `galleryItems[].image` + `galleryItems[].imageUrl`
- `materialityImage` + `materialityImageUrl`
- `cinematicQuoteBackgroundImage` + `cinematicQuoteBackgroundImageUrl`

Singleton image fields currently require uploaded Sanity assets and do not have URL fallback fields:

- `siteSettings.logo`
- `siteSettings.signatureLogo`
- `siteSettings.openGraphImage`
- `homepage.seo.image`
- `aboutPhilosophy.panels[].image.image`
- `processSection.steps[].image.image`

The singleton seed script intentionally left these image asset fields empty and seeded alt text where the schema could store it safely.

## 9. Data Migration Process

Project seed script:

- `scripts/seed-sanity-projects.cjs`

Purpose:

- Copies the existing 9 local projects from `src/data/projects.ts` into Sanity project documents.

Behavior:

- Reads `src/data/projects.ts`.
- Uses deterministic document IDs: `project.${slug}`.
- Uses `npx sanity documents create "<tempPath>" --replace`.
- Preserves slugs.
- Preserves sort order.
- Preserves card aspect values.
- Preserves card colors.
- Preserves logo text.
- Preserves title, category, description, and metadata.

Seeded project IDs:

- `project.maison-travertine`
- `project.le-pavilion-retail`
- `project.l-oasis-lounge`
- `project.villa-concrete`
- `project.the-sanctuary`
- `project.galerie-moderne`
- `project.aero-penthouse`
- `project.brutalist-oasis`
- `project.ethereal-showroom`

Images were not uploaded to Sanity during this seed. Instead, URL fallback fields were populated from the local project image URLs.

## 10. Singleton Seeding Process

Singleton seed script:

- `scripts/seed-sanity-singletons.cjs`

Purpose:

- Replaces shell placeholder singleton documents with current visible/fallback website text.

Behavior:

- Uses deterministic singleton IDs.
- Uses `npx sanity documents create "<tempPath>" --replace`.
- Does not modify project documents.
- Seeds text only.
- Skips incompatible image asset fields.

Seeded singletons:

- `siteSettings`
- `navigation`
- `homepage`
- `aboutPhilosophy`
- `processSection`
- `contactFooter`

Homepage seeded:

- Hero title
- Hero subtitle
- Hero supporting text
- Phase slide titles/descriptions
- Portfolio intro title/helper text
- SEO title/description

About seeded:

- Main heading
- Subtitle
- 3 panel numbers
- 3 panel titles
- 3 panel descriptions
- Image alt text only

Process seeded:

- Section title
- Section subtitle
- 4 step numbers
- 4 phase labels
- 4 step titles
- 4 step descriptions
- Image alt text only

Contact seeded:

- Heading
- Description
- Email
- Phone
- Address
- Footer links
- Copyright

Navigation seeded:

- Philosophy -> `/#philosophy`
- Projects -> `/#projects`
- Process -> `/#process`
- Contact -> `/#contact`
- CTA text: `INQUIRE`
- CTA URL: `/#contact`

Site Settings seeded:

- Studio name
- Default SEO title
- Default SEO description
- Global email
- Global phone
- Studio address
- Social links

Skipped image fields:

- `siteSettings.logo`
- `siteSettings.signatureLogo`
- `siteSettings.openGraphImage`
- `homepage.seo.image`
- `aboutPhilosophy.panels[].image.image`
- `processSection.steps[].image.image`

Footer link handling:

- The original footer fallback used `#` placeholder URLs.
- `socialLink.url` is a URL field and requires valid URLs.
- The seed script used schema-valid placeholder URLs:
  - `https://instagram.com`
  - `https://linkedin.com`
  - `https://archdaily.com`

## 11. Frontend Integration Strategy

Integration order used:

1. Project Detail Pages
2. Contact / Footer
3. About / Philosophy
4. Process Section
5. Header / Navigation / Site Settings
6. Homepage safe text
7. PortfolioShowcase project card data

PortfolioShowcase was integrated last because it is the highest-risk section. Its layout and animation depend on stable card data, stable card order, controlled aspect values, and exact DOM/ref relationships.

The integration pattern is:

```text
Sanity document
-> GROQ query
-> mapper
-> existing UI component props/state
-> hardcoded fallback if anything is missing
```

## 12. PortfolioShowcase Protection Rules

File:

- `src/components/portfolio/PortfolioShowcase.tsx`

PortfolioShowcase is sensitive because it depends on:

- GSAP measurements
- `placeholderRefs`
- `cardRefs`
- Stable card ordering
- Stable card count
- Controlled `aspect` values
- Image load timing
- `ScrollTrigger.refresh()`
- `ResizeObserver`
- Carousel-to-masonry transform calculations

Future developer rules:

- Do not pass raw Sanity project documents into PortfolioShowcase.
- Always use `portfolioShowcaseMapper`.
- Keep `aspect` limited to:
  - `aspect-[3/4]`
  - `aspect-[4/3]`
  - `aspect-[1/1]`
- Keep the placeholder element and actual animated card element relationship intact.
- Do not add wrappers between placeholders and animated cards.
- Do not change `placeholderRefs.current[index]`.
- Do not change `cardRefs.current[index]`.
- Do not change ScrollTrigger values unless intentionally redesigning the animation.
- Do not equalize the masonry layout.
- Do not reorder projects casually.
- Do not remove delayed refresh logic.
- Do not remove image load refresh handling.
- Do not remove resize observer behavior without a performance review.

The mapped PortfolioShowcase card shape is:

```ts
{
  id: string
  slug: string
  title: string
  category: string
  image: string
  aspect: 'aspect-[3/4]' | 'aspect-[4/3]' | 'aspect-[1/1]'
  color: string
  logoText: string
  sortOrder: number
}
```

## 13. PDP Integration

PDP route:

- `src/app/projects/[slug]/page.tsx`

PDP client:

- `src/components/portfolio/ProjectDetailClient.tsx`

Queries:

- `projectBySlugQuery`
- `allProjectSlugsQuery`
- `selectedProjectsQuery`
- `relatedProjectsBySlugQuery`

Mapper:

- `src/sanity/lib/projectMapper.ts`

Flow:

```text
Sanity project document
-> projectMapper
-> Project-shaped mapped object
-> ProjectDetailClient
```

The PDP never receives raw Sanity documents directly.

Fallback behavior:

- If Sanity fetch fails, fallback to `src/data/projects.ts`.
- If a Sanity project is incomplete, fallback to local project fields where possible.
- If image asset is missing, use URL fallback.
- If URL fallback is missing, use hardcoded project image.
- Invalid slugs still call `notFound()`.

## 14. Mapper Layer

Mapper files:

- `src/sanity/lib/homepageMapper.ts`
- `src/sanity/lib/aboutPhilosophyMapper.ts`
- `src/sanity/lib/processSectionMapper.ts`
- `src/sanity/lib/contactFooterMapper.ts`
- `src/sanity/lib/navigationMapper.ts`
- `src/sanity/lib/siteSettingsMapper.ts`
- `src/sanity/lib/projectMapper.ts`
- `src/sanity/lib/portfolioShowcaseMapper.ts`

Purpose:

- Normalize Sanity data into the shape expected by existing UI.
- Keep UI components insulated from raw CMS document structure.
- Provide field-level fallbacks.
- Treat shell placeholder content as empty.
- Protect animation-sensitive components from unsafe data.

Raw Sanity documents should not be passed directly into UI components because:

- Sanity fields may be missing.
- Draft/editor content may be incomplete.
- Image asset fields may be empty.
- Rich text/object fields need normalization.
- Animation components need strict, stable data shapes.

## 15. Query Layer

Query file:

- `src/sanity/lib/queries.ts`

Queries:

- `allProjectSlugsQuery`: fetches all project slugs ordered by `sortOrder`.
- `projectBySlugQuery`: fetches a full project document by slug, including related projects.
- `selectedProjectsQuery`: fetches the first three projects by `sortOrder`.
- `portfolioShowcaseProjectsQuery`: fetches published project card fields only, ordered by `sortOrder`.
- `relatedProjectsBySlugQuery`: fetches related project references for a project.
- `contactFooterQuery`: fetches the contact/footer singleton.
- `aboutPhilosophyQuery`: fetches the about/philosophy singleton.
- `processSectionQuery`: fetches the process section singleton.
- `navigationQuery`: fetches the navigation singleton.
- `siteSettingsQuery`: fetches the site settings singleton.
- `homepageQuery`: fetches safe homepage text and SEO fields.

Project query image fields return `assetUrl` from uploaded Sanity image assets and also include URL fallback fields.

## 16. Fallback Strategy

General fallback rule:

```text
Sanity value
-> mapper validation
-> local hardcoded fallback
```

If Sanity is unavailable:

- Components catch fetch errors.
- Console warning is emitted.
- Existing fallback content remains visible.

If fields are missing:

- Mapper fills missing fields from fallback constants.

If project data is missing:

- PDP falls back to `src/data/projects.ts`.
- PortfolioShowcase falls back to `PORTFOLIO_PROJECT_CARD_FALLBACK`.

If project images are missing:

1. Sanity image asset
2. URL fallback field
3. Hardcoded local project image

If singleton images are missing:

- About and Process fall back to existing hardcoded/public or Cloudinary image URLs through mapper fallback constants.
- Site Settings image fields remain optional.

If PortfolioShowcase Sanity data is incomplete:

- `portfolioShowcaseMapper` falls back to the full hardcoded card array.
- If a single project has an invalid `cardAspect`, that project uses the hardcoded aspect.
- If a single image is missing, that project uses the hardcoded image.

## 17. Testing & Verification

Verification commands used:

```bash
npm run build
node scripts/seed-sanity-projects.cjs
node scripts/seed-sanity-singletons.cjs
```

Sanity verification commands used:

```bash
npx sanity documents query "*[_type == \"project\"]|order(sortOrder asc){_id, title, \"slug\": slug.current, sortOrder}"
npx sanity documents query "{ \"singletonCount\": count(*[_id in [\"siteSettings\", \"navigation\", \"homepage\", \"aboutPhilosophy\", \"processSection\", \"contactFooter\"]]), \"projectCount\": count(*[_type == \"project\"]) }"
```

Build verification:

- `npm run build` passes.
- `/studio/[[...tool]]` is included in the production route output.
- `/projects/[slug]` routes are generated.

Studio verification:

- Studio duplicate list item error for `project` was fixed.
- Runtime smoke check confirmed no `List items with same ID found (project)` error.
- Singleton documents now contain editable content instead of shell placeholders.

Project verification:

- 9 project documents exist.
- Project IDs are deterministic.
- Slugs match local data.
- Sort order is 1 through 9.
- Card aspect values are safe.
- URL fallback image fields are populated.

PDP verification:

- `/projects/maison-travertine` loads.
- PDP uses Sanity text where available.
- PDP images display using URL fallbacks if Sanity image assets are empty.
- Invalid slugs still return not found.

PortfolioShowcase verification:

- Homepage loads.
- Curated Spaces intro appears.
- 9 placeholders render.
- 9 animated cards render.
- Cards start in carousel/aligned state.
- Cards morph to masonry layout on scroll.
- Large left card is not cut.
- Reverse scroll remains stable.
- Refresh remains stable.
- No horizontal scrollbar appears.
- Next section does not overlap.
- Cards remain clickable.
- Clicking cards navigates to matching `/projects/[slug]`.

Responsive verification:

- Desktop checked.
- Tablet checked.
- Mobile checked.
- No horizontal overflow detected in the PortfolioShowcase checks.

## 18. Known Limitations

Image uploads:

- Project images currently use URL fallback fields unless manually uploaded to Sanity.
- Singleton image fields currently require uploaded Sanity image assets and do not have URL fallback fields.

Manual upload still needed for:

- Site Settings logo
- Site Settings signature logo
- Site Settings Open Graph image
- Homepage SEO image
- About / Philosophy panel images
- Process step images

URL fallbacks:

- Project documents support URL fallback fields.
- About/Process/Site Settings singleton image schemas do not currently support URL fallback fields.

Homepage schema limitations:

- Some hardcoded `HeroScroll` metadata text is not represented in the Homepage schema:
  - `EST.`
  - `2020`
  - `PUNE`
  - `INDIA`
  - `ARCHITECTURE . INTERIORS . HARMONY`
  - `EXPLORE OUR PHILOSOPHY`
  - `Silent Strength. Enduring Design.`
  - `SCROLL TO EXPLORE`

Footer link limitation:

- `socialLink.url` requires valid URLs.
- Original `#` placeholder footer links were seeded as full placeholder URLs.

Metadata limitation:

- Root `src/app/layout.tsx` metadata remains static.
- Dynamic Site Settings metadata has not been wired globally.

## 19. Future Recommendations

Recommended next steps:

- Upload all final images to Sanity assets.
- Add URL fallback fields to singleton image schemas if immediate uploads are not practical.
- Add schema fields for remaining `HeroScroll` text if editors need control over those labels.
- Add preview or Presentation Tool workflow.
- Add draft/live preview strategy.
- Add stronger SEO integration for root metadata and Open Graph.
- Add validation rules for singleton completeness.
- Consider TypeGen for Sanity query result types.
- Add GROQ query tests or mapper unit tests for high-risk mappers.
- Add CMS content QA checklist for PortfolioShowcase after any project ordering/aspect edits.

## 20. Final Status

Completed:

- Sanity installed and configured.
- Embedded Studio route available at `/studio`.
- Schemas created and registered.
- Studio structure configured with singletons and Projects list.
- Duplicate `project` Studio item issue fixed.
- Project documents seeded.
- Project URL fallback image fields added.
- Singleton documents seeded with current text content.
- PDP connected to Sanity with fallback.
- Contact/Footer connected to Sanity with fallback.
- About / Philosophy connected to Sanity with fallback.
- Process Section connected to Sanity with fallback.
- Header/navigation/site settings connected to Sanity with fallback.
- Homepage safe text connected to Sanity with fallback.
- PortfolioShowcase project card data connected to Sanity with strict mapper/fallback.
- `npm run build` passes.

In progress / partially complete:

- Sanity asset image uploads.
- Singleton image URL fallback support.
- Full Homepage/HeroScroll text coverage.
- Dynamic global metadata from Site Settings.

Not yet implemented:

- Sanity preview mode.
- Draft preview workflow.
- Visual Editing / Presentation Tool setup.
- Automated mapper tests.
- Full editor documentation for content entry workflow.
