import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PRISMA } from './share.di-token';
import { memoryStorage } from 'multer';
import { databaseConfig, portConfig } from './config/database.config';

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

const config = ConfigModule.forRoot({
  load: [databaseConfig, portConfig],
  isGlobal: true,
});

@Module({
  imports: [config],
  providers: [prismaModule, MulterModule],
  exports: [prismaModule, upload],
})
export class ShareModule {}
