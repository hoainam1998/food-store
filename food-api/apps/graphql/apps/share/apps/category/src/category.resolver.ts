import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Response } from './category.model';
import { CategoryService } from './category.service';
import { IResponse } from '@share';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Response)
  async create(
    @Args('category', { type: () => Category }) category: Category,
  ): Promise<IResponse> {
    return this.categoryService.create(category);
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
