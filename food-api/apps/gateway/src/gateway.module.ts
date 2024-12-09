import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { portConfig } from '@share/config/environment.config';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CategoryModule,
    ConfigModule.forRoot({
      load: [portConfig],
      isGlobal: true,
    }),
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController],
})
export class GateWayModule {}
