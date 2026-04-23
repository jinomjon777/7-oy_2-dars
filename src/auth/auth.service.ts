import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import nodemailer from "nodemailer"
import { verifyDto } from './dto/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Transporter
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private jwtService: JwtService,
  ) {
    this.nodemailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ijumanazarov631@gmail.com",
        pass: process.env.APP_KEY,
      },
    });
  }

  async register(createAuthDto: CreateAuthDto): Promise<{ message: string }> {
    const { username, email, password } = createAuthDto;

    const foundedUser = await this.authRepo.findOne({ where: { email } });

    if (foundedUser) {
      throw new BadRequestException("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("");

    const time = Date.now() + 120000

    await this.nodemailer.sendMail({ from: "ijumanazarov631@gmail.com", to: email, subject: "lesson", text: "test content", html: `<b>${otp}</b>` })

    const user = this.authRepo.create({ username, email, password: hashPassword, otp, otpTime: time })
    await this.authRepo.save(user)

    return { message: "Registered" }
  }

  async verify(dto: verifyDto) {
    const { email, otp } = dto
    const foundeduser = await this.authRepo.findOne({ where: { email } })

    const otpValidation = /^\d{6}$/.test(otp)

    if (!otpValidation) throw new BadRequestException("Invalid otp")

    if (!foundeduser) throw new UnauthorizedException("Email not found")

    if (foundeduser.otp !== otp) throw new BadRequestException("Wrong otp")

    const now = Date.now()
    if (foundeduser.otpTime && foundeduser.otpTime < now) throw new BadRequestException("Otp expired")

    await this.authRepo.update(foundeduser.id, { otp: "", otpTime: 0 })

    const payload = {
      id: foundeduser.id,
      username: foundeduser.username,
      role: foundeduser.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const foundedUser = await this.authRepo.findOne({ where: { email } });

    if (!foundedUser) {
      throw new BadRequestException("User not found");
    }

    const checkPassword = await bcrypt.compare(password, foundedUser.password)

    if (checkPassword) {
      const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join("");

      const time = Date.now() + 120000

      await this.nodemailer.sendMail({ from: "ijumanazarov631@gmail.com", to: email, subject: "lesson", text: "test content", html: `<b>${otp}</b>` })

      await this.authRepo.update(foundedUser.id, { otp, otpTime: time })

      return { message: "Please check your email" }
    } else {
      throw new BadRequestException("Wrong password")
    }

    return { message: "Registered" }
  }
}