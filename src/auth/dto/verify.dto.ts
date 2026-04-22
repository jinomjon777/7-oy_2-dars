import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class verifyDto {
  @ApiProperty({ example: 'john@example.com', description: 'Ro\'yxatdan o\'tilgan email manzil' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '123456', description: 'Emailga yuborilgan 6 xonali OTP kod' })
  @IsString()
  @IsNotEmpty()
  otp!: string;
}