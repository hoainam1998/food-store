import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { MessagePattern } from '@nestjs/microservices';
//import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { CREATE_CATEGORY } from '@share/patterns/category.pattern';
import { CategoryDto } from '@share/dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // @CacheKey('category')
  @MessagePattern({ cmd: CREATE_CATEGORY })
  async create(itemDto: CategoryDto) {
    return '';
  }
}
