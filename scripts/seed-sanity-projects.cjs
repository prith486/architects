const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const vm = require('node:vm')
const {execSync} = require('node:child_process')
const ts = require('typescript')

const projectDataPath = path.join(__dirname, '..', 'src', 'data', 'projects.ts')
const allowedCardAspects = new Set(['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[1/1]'])
const galleryLabels = [
  'Featured View',
  'Detail Study',
  'Material Detail',
  'Architectural Context',
  'Interior Sequence',
]

function portableTextParagraph(text) {
  return {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text,
        marks: [],
      },
    ],
    markDefs: [],
  }
}

function loadProjects() {
  const source = fs.readFileSync(projectDataPath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText

  const sandbox = {
    exports: {},
    module: {exports: {}},
  }

  vm.runInNewContext(transpiled, sandbox, {
    filename: projectDataPath,
  })

  return sandbox.exports.PROJECTS || sandbox.module.exports.PROJECTS
}

function projectToSanityDocument(project, index) {
  if (!allowedCardAspects.has(project.aspect)) {
    throw new Error(`Unsafe card aspect for ${project.slug}: ${project.aspect}`)
  }

  return {
    _id: `project-${project.slug}`,
    _type: 'project',
    title: project.title,
    slug: {
      _type: 'slug',
      current: project.slug,
    },
    category: project.category,
    featuredProject: true,
    sortOrder: index + 1,
    cardImageUrl: project.image,
    cardAspect: project.aspect,
    cardColor: project.color,
    logoText: project.logoText,
    heroImageUrl: project.image,
    heroCaption: `${project.title}, ${project.details.year}`,
    metadata: {
      _type: 'projectMetadata',
      year: project.details.year,
      location: project.details.location,
      area: project.details.area,
      client: project.details.client,
    },
    narrativeHeading: 'Where restraint meets resolution.',
    narrativeParagraphs: [
      project.description,
      'The architectural narrative unfolds through deliberate spatial sequencing, where each volume responds to both context and function. Materials were chosen not for novelty but for their inherent qualities-texture, weight, and the way light transforms their surfaces throughout the day.',
      'This project embodies a philosophy of measured intervention, where design serves as a framework for living rather than an imposition upon it. The result is a space that feels both timeless and entirely of its moment.',
    ],
    galleryTitle: 'Visual Narrative',
    galleryItems: galleryLabels.map((label, galleryIndex) => ({
      _type: 'galleryItem',
      _key: `${project.slug}-${galleryIndex + 1}`,
      label,
      imageUrl: project.image,
    })),
    designIntentHeading: 'A study in spatial restraint',
    designIntentBody: [
      portableTextParagraph('The design strategy centered on establishing clear sightlines and volumetric hierarchy. By compressing certain passages and expanding others, we crafted a choreography of movement that reveals the project gradually rather than all at once.'),
      portableTextParagraph('Natural light became a primary material, shaped and directed through carefully positioned apertures. Each opening serves a specific purpose-framing views, marking time, or simply animating a wall surface.'),
    ],
    materialityHeading: 'Materiality',
    materialityImageUrl: project.image,
    materialityBody: [
      portableTextParagraph('The material palette privileges tactility over spectacle. Raw concrete, honed limestone, and oiled oak establish a baseline of authenticity, while bronze detailing provides moments of warmth and refinement. These choices reflect an architecture of substance rather than surface.'),
    ],
    cinematicQuote: 'Architecture is the thoughtful making of space.',
    cinematicQuoteAttribution: 'Vaastu Architecture',
    cinematicQuoteBackgroundImageUrl: project.image,
    seo: {
      _type: 'seoFields',
      title: `${project.title} | VAASTU Architecture`,
      description: project.description,
    },
    seoImageUrl: project.image,
  }
}

function main() {
  const projects = loadProjects()

  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error(`No PROJECTS array found in ${projectDataPath}`)
  }

  const docs = projects.map(projectToSanityDocument)
  const tempPath = path.join(os.tmpdir(), 'vaastu-sanity-project-seed.json')
  fs.writeFileSync(tempPath, JSON.stringify(docs, null, 2))

  execSync(`npx sanity documents create "${tempPath}" --replace`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  })

  const imageFallbacks = projects.map((project) => ({
    title: project.title,
    slug: project.slug,
    sourceImageUrl: project.image,
    fields: [
      'cardImageUrl',
      'heroImageUrl',
      'seoImageUrl',
      'galleryItems[].imageUrl',
      'materialityImageUrl',
      'cinematicQuoteBackgroundImageUrl',
    ],
  }))

  console.log(JSON.stringify({
    seededProjectCount: docs.length,
    documentIds: docs.map((doc) => doc._id),
    imageFallbacks,
  }, null, 2))
}

main()
