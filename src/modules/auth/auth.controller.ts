import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { verifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: 'Yangi foydalanuvchi ro\'yxatdan o\'tkazish' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 201, description: 'Muvaffaqiyatli ro\'yxatdan o\'tildi, OTP emailga yuborildi', schema: { example: { message: 'Registered' } } })
  @ApiResponse({ status: 400, description: 'Foydalanuvchi allaqachon mavjud yoki ma\'lumotlar noto\'g\'ri' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post("verify")
  @ApiOperation({ summary: 'Email va OTP orqali tasdiqlash va access token olish' })
  @ApiBody({ type: verifyDto })
  @ApiResponse({ status: 201, description: 'Muvaffaqiyatli tasdiqlandi', schema: { example: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  @ApiResponse({ status: 400, description: 'Noto\'g\'ri yoki muddati o\'tgan OTP' })
  @ApiResponse({ status: 401, description: 'Email topilmadi' })
  verify(@Body() dto: verifyDto) {
    return this.authService.verify(dto);
  }

  @ApiBadRequestResponse({description: "User not found"})
  @ApiBadRequestResponse({description: "Wrong password"})
  @ApiOkResponse({description: "Please check your email"})
  @Post("login")
  @HttpCode(200)
  login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }
}
