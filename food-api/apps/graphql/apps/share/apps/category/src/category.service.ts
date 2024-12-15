import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IResponse } from '@share';
import { LoggerService } from '@share/logger/logger.service';
import { PRISMA } from '@share/share.di-token';
import { messageCreator } from '@share/utils';

@Injectable()
export class CategoryService {
  private readonly logger = new LoggerService(CategoryService.name);

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
}
