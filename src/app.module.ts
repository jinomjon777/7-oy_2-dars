import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { Auth } from './auth/model/auth.entity';
import { Article } from './article/model/article.entity';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: 5432,
      username: String(process.env.DB_USERNAME),
      database: String(process.env.DB_NAME),
      password: String(process.env.DB_PASSWORD),
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    AuthModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
