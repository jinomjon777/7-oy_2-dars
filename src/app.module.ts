import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';
import { Auth } from './modules/auth/entities/auth.entity';
import { Article } from './modules/article/entities/article.entity';
import { TagModule } from './modules/tag/tag.module';
import { Tag } from './modules/tag/entities/tag.entity';
import { ArticleImageModule } from './modules/article_image/article_image.module';
import { ArticleImage } from './modules/article_image/entities/article_image.entity';
  
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
      entities: [Auth, Article,Tag, ArticleImage],
      synchronize: true,
      logging: false,
    }),
    AuthModule,
    ArticleModule,
    TagModule,
    ArticleImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
