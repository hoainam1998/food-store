import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('CategoryInput')
@ObjectType('CategoryQuery')
export abstract class Category {
  @Field(() => ID)
  categoryId: number;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  avatar: string;
}

@ObjectType()
export class Response {
  @Field({ nullable: false })
  message: string;
}
