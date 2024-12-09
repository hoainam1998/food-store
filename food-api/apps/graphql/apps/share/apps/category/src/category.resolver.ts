import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Response } from './category.model';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Response)
  async create(
    @Args('categoryName', { type: () => String }) categoryName: string,
  ): Promise<string> {
    console.log('zoooooo');
    // const newCategory = {
    //   ...category,
    //   category_id: category.categoryId.toString(),
    // };
    // delete newCategory.category_id;
    // const result = this.categoryService.create(newCategory);
    // console.log(result, 'result');
    return this.categoryService.create();
  }

  @Query(() => Category)
  getCategory() {
    return {
      categoryId: '123',
      name: 'name',
      avatar: 'avatar',
    };
  }
}
