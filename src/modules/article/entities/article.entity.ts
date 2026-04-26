import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Auth } from "../../auth/entities/auth.entity";
import { BaseEntity } from "../../../database/entities/base.entity";
import { Tag } from "../../tag/entities/tag.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";


@Entity({ name: 'article' })
export class Article extends BaseEntity {
  @ApiProperty({ example: 'NestJS haqida', description: 'Maqola sarlavhasi' })
  @Column()
  title!: string;

  @ApiProperty({ example: 'NestJS bu...', description: 'Maqola matni' })
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty({ example: 1, description: 'Muallif foydalanuvchi ID si' })
  @Column({ nullable: true })
  userId?: number;
 
  @Column()
  backroundImege!: string;

  @DeleteDateColumn({nullable:true})
  deletedAt?: Date;


  //relations
  @ManyToOne(() => Auth, (user) => user.articles)
  @JoinColumn({name: 'user_id'})
  author!: Auth;

  @ManyToMany(() => Tag, (tag) => tag.articles, {nullable: false, cascade: false})
  @JoinTable({name: 'tag_id'})
  tags!: Tag[]
  images: any;
}
