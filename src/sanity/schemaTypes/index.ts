import { type SchemaTypeDefinition } from 'sanity'

import { portfolio } from './portfolio'
import { service } from './service'
import { processStep } from './processStep'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolio, service, processStep],
}
