import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { IResponse } from '@share';
import { messageCreator } from '@share/utils';
import { PRISMA } from '@share/share.di-token';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService {
  private readonly logger: Logger = new Logger(CategoryService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(PRISMA) private prisma: PrismaClient,
  ) {}

  async create(category: Prisma.CategoryCreateInput): Promise<IResponse> {
    this.logger.log('Handle income data with database');
    await this.prisma.category.create({
      data: category,
    });

    return messageCreator(
      `Create category with name ${category.name} successfully`,
    );
  }
}
