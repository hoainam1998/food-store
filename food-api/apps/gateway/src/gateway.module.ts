import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CategoryModule } from './modules/category/category.module';
import { HealthController } from './health/health.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentConfigModule } from '@share/config/environment-config.module';

@Module({
  imports: [
    CategoryModule,
    EnvironmentConfigModule,
    TerminusModule,
    HttpModule,
  ],
  controllers: [HealthController],
})
export class GateWayModule {}
