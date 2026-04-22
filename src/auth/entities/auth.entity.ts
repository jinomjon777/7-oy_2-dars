import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entities/base.entity";
import { RolesUser } from "src/shared/enums/roles.enum";
import { Column, Entity } from "typeorm";

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
}
