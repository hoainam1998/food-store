import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IResponse } from '@share';
import { PRISMA } from '@share/share.di-token';
import { messageCreator } from '@share/utils';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);

  constructor(@Inject(PRISMA) private prisma: PrismaClient) {}

  async create(category: Prisma.CategoryCreateInput): Promise<IResponse> {
    this.logger.log('Handle income data with database');

    const categoryAdded = await this.prisma.category.create({
      data: category,
    });

    if (categoryAdded) {
      return messageCreator(
        `Create category with name ${category.name} successfully!`,
      );
    } else {
      return messageCreator(
        `Create category with name ${category.name} failed!`,
      );
    }
  }
}
