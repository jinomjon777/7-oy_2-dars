import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateAuthDto {
  @ApiProperty({ example: 'john_doe', description: 'Foydalanuvchi nomi' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email manzil' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Password1', description: 'Kamida 8 belgi, katta/kichik harf va raqam' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message: 'Parol kamida 8 belgi, 1 katta harf, 1 kichik harf va 1 raqam bo\'lishi kerak',
  })
  password!: string;
}
