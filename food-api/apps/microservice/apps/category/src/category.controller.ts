import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern } from '@nestjs/microservices';
import { CREATE_CATEGORY } from '@share/patterns/category.pattern';
import { CategoryInDTO } from '@share/dto/category/category-in.dto';
import { IResponse } from '@share';
import { Observable } from 'rxjs';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @MessagePattern({ cmd: CREATE_CATEGORY })
  create(category: CategoryInDTO): Observable<IResponse> {
    return this.categoryService.create(category);
  }
}
