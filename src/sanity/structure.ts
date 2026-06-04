import type {StructureResolver} from 'sanity/structure'

const singletonTypes = new Set([
  'siteSettings',
  'navigation',
  'homepage',
  'aboutPhilosophy',
  'processSection',
  'contactFooter',
])

const customStructureTypes = new Set([...singletonTypes, 'project'])

const singletonListItem = (
  S: Parameters<StructureResolver>[0],
  type: string,
  title: string,
) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website CMS')
    .items([
      singletonListItem(S, 'siteSettings', 'Site Settings'),
      singletonListItem(S, 'navigation', 'Navigation'),
      S.divider(),
      singletonListItem(S, 'homepage', 'Homepage'),
      singletonListItem(S, 'aboutPhilosophy', 'About / Philosophy'),
      S.documentTypeListItem('project').title('Projects'),
      singletonListItem(S, 'processSection', 'Process Section'),
      singletonListItem(S, 'contactFooter', 'Contact / Footer'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !customStructureTypes.has(listItem.getId() ?? ''),
      ),
    ])
