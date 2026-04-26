import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Article } from "../../article/entities/article.entity";
import { BaseEntity } from "../../../database/entities/base.entity";
import { RolesUser } from "src/shared/enums/roles.enum";
import { Tag } from "../../tag/entities/tag.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity({ name: 'auth' })
export class Auth extends BaseEntity {
  @ApiProperty({ example: 'john_doe', description: 'Foydalanuvchi nomi' })
  @Column()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email manzil' })
  @Column()
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({ enum: RolesUser, example: RolesUser.USER, description: 'Foydalanuvchi roli' })
  @Column({ type: "enum", enum: RolesUser, default: RolesUser.USER })
  role!: RolesUser;

  @ApiHideProperty()
  @Column({ nullable: true })
  otp?: string;

  @ApiHideProperty()
  @Column({ type: "bigint", nullable: true })
  otpTime?: number;


  //relations
  @OneToMany(() => Article, (article)=> article.author, {nullable: false})
  articles!: Article[]

  @OneToMany(() => Tag, (tag) => tag.createdBy, {nullable: false})
  tags!: Tag[]
}
