import { Module } from '@nestjs/common';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { ConfigModule } from '@nestjs/config';
import { portConfig } from '@share/config/database.config';
import { join } from 'path';

console.log(process.cwd());

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        path: join(`${process.cwd()}/category.schema.gql`),
        federation: 2,
      },
    }),
    ConfigModule.forRoot({
      load: [portConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
