import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Food, Prisma } from '@prisma/client';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  addFood(data: Prisma.FoodCreateInput): Promise<Food> {
    return this.prisma.food.create({
      data,
    });
  }
}
