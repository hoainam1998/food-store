import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PRISMA } from './share.di-token';
import { memoryStorage } from 'multer';
import { EnvironmentConfigModule } from './config/environment-config.module';

const prismaModule: Provider = {
  provide: PRISMA,
  useFactory: (config: ConfigService) => {
    return new PrismaService(config);
  },
  inject: [ConfigService],
};

const upload: DynamicModule = MulterModule.register({
  storage: memoryStorage(),
});

@Module({
  imports: [EnvironmentConfigModule],
  providers: [prismaModule, MulterModule],
  exports: [prismaModule, upload],
})
export class ShareModule {}
