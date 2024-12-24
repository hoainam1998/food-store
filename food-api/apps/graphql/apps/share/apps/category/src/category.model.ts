import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('CategoryInput')
@ObjectType('CategoryQuery')
export class Category {
  @Field(() => ID)
  category_id: string;

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

@ObjectType('PaginationQuery')
export class Pagination {
  @Field(() => [Category], { nullable: false })
  list: Category[];

  @Field({ nullable: false })
  total: number = 0;
}
