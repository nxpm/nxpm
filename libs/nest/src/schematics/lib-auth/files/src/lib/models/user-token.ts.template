import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user'

@ObjectType()
export class UserToken {
  @Field({ nullable: true })
  token?: string

  @Field({ nullable: true })
  user?: User
}
