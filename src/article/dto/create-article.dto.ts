import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'NestJS haqida', description: 'Maqola sarlavhasi' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'NestJS bu backend framework...', description: 'Maqola matni' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ example: 1, description: 'Muallif foydalanuvchi ID si' })
  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
