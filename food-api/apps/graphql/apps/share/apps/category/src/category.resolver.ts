import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category, Pagination, Response } from './category.model';
import { CategoryService } from './category.service';
import { IPagination, IResponse } from '@share';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { ResolverWrapper } from './decorators/resolver-wrapper.decorator';
import { WrapperWithLogger } from '@share/decorators/class-wrapper-logger/class-wrapper-logger.decorator';

@Resolver()
@WrapperWithLogger
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Response)
  @ResolverWrapper
  create(
    @Args('category', { type: () => Category }) category: Category,
  ): Promise<IResponse> {
    return this.categoryService.create(category);
  }

  @Query(() => Pagination)
  @ResolverWrapper
  pagination(
    @Args('pageSize', { type: () => Number }) pageSize: number,
    @Args('pageNumber', { type: () => Number }) pageNumber: number,
  ): Promise<IPagination<CategoryOutDTO>> {
    return this.categoryService.pagination(pageSize, pageNumber);
  }
}
