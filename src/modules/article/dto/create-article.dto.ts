import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';

export class CreateArticleDto {
  @ApiProperty({ example: 'NestJS haqida', description: 'Maqola sarlavhasi' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'NestJS bu backend framework...', description: 'Maqola matni' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @Transform(({value}) => 
    typeof value === "string" ? value.split(",").map((item)=> Number(item)): value
)
  @IsArray()
  @IsInt({ each: true})
  @ApiProperty({default: [1,2,3]})
  tags!: number[];
}
