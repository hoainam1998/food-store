import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { map, Observable } from 'rxjs';
import { messageCreator } from '@share/utils';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { AxiosResponse } from 'axios';
import { IResponse } from '@share';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  createCategory(@Body() category: CategoryInDTO): Observable<IResponse> {
    return this.categoryService.createCategory(category).pipe(
      map((response: AxiosResponse) => {
        if (response.status === HttpStatus.OK) {
          return messageCreator(response.data.data.create.message);
        }
        return messageCreator('Category create fail!');
      }),
    );
  }
}
