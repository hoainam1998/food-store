import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern } from '@nestjs/microservices';
import { CREATE_CATEGORY } from '@share/patterns/category.pattern';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { IResponse } from '@share';
import { catchError, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { LoggerService } from '@share/logger/logger.service';

@Controller('category')
export class CategoryController {
  private readonly logger = new LoggerService(CategoryController.name);

  constructor(private categoryService: CategoryService) {}

  @MessagePattern({ cmd: CREATE_CATEGORY })
  create(category: CategoryInDTO): Observable<IResponse> {
    this.logger.log('Calling category microservice service!');
    return this.categoryService.create(category).pipe(
      map((response: AxiosResponse<IResponse>) => response.data),
      catchError(async (err) => {
        this.logger.error(
          `Send request to graphql gateway failed width: ${err.message}`,
        );
        throw new Error(
          `Send request to graphql gateway failed width: ${err.message}`,
        );
      }),
    );
  }
}
