import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Food, Prisma } from '@prisma/client';
import { FoodService } from './food.service';
import { FoodDto } from './food.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUpload } from '@decorators/param/image-upload/image-upload.decorator';
import { ValidationControllerInterceptor } from '@interceptors/validation-controller/validation-controller.interceptor';

@UseInterceptors(ValidationControllerInterceptor)
@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('avatar'))
  createFood(
    @Body() data: FoodDto,
    @ImageUpload() file: Express.Multer.File,
  ): Promise<Food> {
    const dataFoodCreate: Prisma.FoodCreateInput = {
      ...plainToClass(FoodDto, { ...data, avatar: file }),
      category: {
        connect: {
          category_id: data.category_id,
        },
      },
    };
    return this.foodService.addFood(dataFoodCreate);
  }
}
