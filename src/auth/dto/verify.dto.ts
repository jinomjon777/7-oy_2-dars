import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class verifyDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  otp!: string;
}