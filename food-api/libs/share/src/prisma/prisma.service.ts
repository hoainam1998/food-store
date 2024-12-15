import { PrismaClient } from '@prisma/client';
// configService.get<string>('database.DATABASE_URL')
export class PrismaService extends PrismaClient {
  private static prismaService: PrismaService;

  private constructor(databaseUrl: string) {
    super({
      datasourceUrl: databaseUrl,
    });
  }

  static init(databaseUrl: string): PrismaService {
    if (!this.prismaService) {
      this.prismaService = new PrismaService(databaseUrl);
      return this.prismaService;
    }
    return this.prismaService;
  }
}
