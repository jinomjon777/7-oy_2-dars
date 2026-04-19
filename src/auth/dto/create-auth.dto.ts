import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateAuthDto {
  @IsString()
   @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  password!: string;
}
