import { BaseSchema } from '../utils'

export interface LibAuthSchematicSchema extends BaseSchema {
  // The name property is here because eslint does not like empty interfaces.
  // Feel free to get rid of it when extending the schema.
  name: string
}
