import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'article' })
export class Article extends BaseEntity {
  @ApiProperty({ example: 'NestJS haqida', description: 'Maqola sarlavhasi' })
  @Column()
  title!: string;

  @ApiProperty({ example: 'NestJS bu...', description: 'Maqola matni' })
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty({ example: 1, description: 'Muallif foydalanuvchi ID si' })
  @Column()
  userId!: number;
}
