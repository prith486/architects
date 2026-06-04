import { type SchemaTypeDefinition } from 'sanity'
import {aboutPhilosophy} from './documents/aboutPhilosophy'
import {contactFooter} from './documents/contactFooter'
import {homepage} from './documents/homepage'
import {navigation} from './documents/navigation'
import {processSection} from './documents/processSection'
import {project} from './documents/project'
import {siteSettings} from './documents/siteSettings'
import {imageWithAlt} from './objects/imageWithAlt'
import {navigationItem} from './objects/navigationItem'
import {projectMetadata} from './objects/projectMetadata'
import {richText} from './objects/richText'
import {seoFields} from './objects/seoFields'
import {socialLink} from './objects/socialLink'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    imageWithAlt,
    seoFields,
    richText,
    socialLink,
    navigationItem,
    projectMetadata,
    siteSettings,
    navigation,
    homepage,
    aboutPhilosophy,
    project,
    processSection,
    contactFooter,
  ],
}
