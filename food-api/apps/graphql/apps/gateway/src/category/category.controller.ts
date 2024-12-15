import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { catchError, map, Observable } from 'rxjs';
import { messageCreator } from '@share/utils';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { AxiosResponse } from 'axios';
import { IResponse } from '@share';
import { LoggerService } from '@share/logger/logger.service';

@Controller('category')
export class CategoryController {
  private readonly logger = new LoggerService(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  createCategory(@Body() category: CategoryInDTO): Observable<IResponse> {
    this.logger.log('Calling to category graphql!');

    return this.categoryService.createCategory(category).pipe(
      map((response: AxiosResponse) => {
        if (response.status === HttpStatus.OK) {
          this.logger.debug(response.data.data.create.message);
          return messageCreator(response.data.data.create.message);
        }
        this.logger.debug(
          `Request to category graphql error with: ${JSON.stringify(response.data)}`,
        );
        return messageCreator('Category create fail!');
      }),
      catchError(async (error) => {
        this.logger.error(
          `Request to category graphql failed with: ${error.message}`,
        );
        return messageCreator(
          `Request to category graphql failed with: ${error.message}`,
        );
      }),
    );
  }
}
