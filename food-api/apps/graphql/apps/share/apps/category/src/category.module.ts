import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { join } from 'path';
import { HealthController } from './health/health.controller';
import { ShareModule } from '@share';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: join(`${process.cwd()}/apps/category/src/category.schema.gql`),
        federation: 2,
      },
    }),
    TerminusModule,
    HttpModule,
    ShareModule,
  ],
  controllers: [HealthController],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
