import { Module, Logger } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ShareModule } from '@share';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [
    CategoryService,
    Logger,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
  imports: [
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async (configService: ConfigService) => ({
    //     store: await redisStore({
    //       socket: {
    //         host: configService.get<string>('ports.REDIS_HOST'),
    //         port: configService.get<number>('ports.REDIS_SERVER_PORT'),
    //       },
    //     }),
    //   }),
    //   inject: [ConfigService],
    // }),
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        timeout: 5000,
        baseURL: `${config.get<string>('GRAPHQL_GATEWAY_URL')}/category`,
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
