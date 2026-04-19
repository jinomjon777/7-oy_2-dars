import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: 5432,
      username: String(process.env.DB_USERNAME),
      database: String(process.env.DB_NAME),
      password: String(process.env.DB_PASSWORD),
      entities: [Auth],
      synchronize: true,
      logging: false
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
