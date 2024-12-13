import { Module } from '@nestjs/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { EnvironmentConfigModule } from '@share/config/environment-config.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    EnvironmentConfigModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'category',
                url: configService.get<string>('CATEGORY_GRAPHQL_URL'),
              },
            ],
          }),
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          baseURL: config.get<string>('CATEGORY_GRAPHQL_URL'),
          timeout: 5000,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class GatewayModule {}
