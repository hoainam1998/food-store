import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  addCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
    });
  }
}
