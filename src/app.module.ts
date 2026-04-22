import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { Auth } from './auth/entities/auth.entity';
import { Article } from './article/entities/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: 5432,
      username: String(process.env.DB_USERNAME),
      database: String(process.env.DB_NAME),
      password: String(process.env.DB_PASSWORD),
      entities: [Auth, Article],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
