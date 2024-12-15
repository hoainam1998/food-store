import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Response } from './category.model';
import { CategoryService } from './category.service';
import { IResponse } from '@share';
import { LoggerService } from '@share/logger/logger.service';

@Resolver()
export class CategoryResolver {
  private readonly logger = new LoggerService(CategoryResolver.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Response)
  async create(
    @Args('category', { type: () => Category }) category: Category,
  ): Promise<IResponse> {
    this.logger.log('Calling category graphql service!');
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
