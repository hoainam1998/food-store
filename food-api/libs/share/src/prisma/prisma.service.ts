import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasourceUrl: configService.get<string>('database.DATABASE_URL'),
    });
  }
}
