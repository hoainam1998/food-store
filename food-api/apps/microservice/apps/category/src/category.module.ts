import { Module, Logger } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ShareModule } from '@share';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    CategoryService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('ports.REDIS_HOST'),
            port: configService.get<number>('ports.REDIS_SERVER_PORT'),
          },
        }),
      }),

      inject: [ConfigService],
    }),
    ShareModule,
  ],
  controllers: [CategoryController],
})
export class CategoryModule {
  constructor(private logger: Logger) {}

  onApplicationBootstrap(): void {
    this.logger.log('Category module start!', CategoryModule.name);
  }
}
