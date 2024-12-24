import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IPagination, IResponse } from '@share';
import { CategoryOutDTO } from '@share/dto/category/category-out.dto';
import { PRISMA } from '@share/share.di-token';
import { messageCreator } from '@share/utils';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(@Inject(PRISMA) private prisma: PrismaClient) {}

  async create(category: Prisma.CategoryCreateInput): Promise<IResponse> {
    this.logger.log('Save category information into database!');

    try {
      const categoryAdded = await this.prisma.category.create({
        data: category,
      });

      if (categoryAdded) {
        this.logger.debug('Save category success!');
        return messageCreator(
          `Create category with name ${category.name} successfully!`,
        );
      } else {
        this.logger.debug('Save category fail!');
        return messageCreator(
          `Create category with name ${category.name} failed!`,
        );
      }
    } catch (error) {
      this.logger.error(error.message);
      return messageCreator(
        `Save category information failed: ${error.message}`,
      );
    }
  }

  async pagination(
    pageSize: number,
    pageNumber: number,
  ): Promise<IPagination<CategoryOutDTO>> {
    this.logger.log('Pagination category!');

    try {
      return {
        list: await this.prisma.category.findMany({
          take: pageSize,
          skip: (pageNumber - 1) * pageSize,
        }),
        total: await this.prisma.category.count(),
      };
    } catch (error) {
      this.logger.error(error.message);
      return {
        list: [],
        total: 0,
      };
    }
  }
}
