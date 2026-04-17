import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './model/auth.entity';
import * as bcrypt from "bcrypt";
import { Article } from 'src/article/model/article.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  async register(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { username, email, password } = createAuthDto;

    const foundedUser = await this.authModel.findOne({
      where: { email },
    });

    if (foundedUser) {
      throw new BadRequestException("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const otp = +Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9)
    ).join("");

    return await this.authModel.create({
      username,
      email,
      password: hashPassword,
      otp,
    });
  }

  async findAll(): Promise<Auth[]> {
    return await this.authModel.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Article }],
    });
  }

  async findOne(id: number): Promise<Auth> {
    const user = await this.authModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Article }],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(
    id: number,
    updateAuthDto: UpdateAuthDto
  ): Promise<{ message: string }> {
    const user = await this.authModel.findByPk(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }
    if (updateAuthDto.password) {
      updateAuthDto.password = await bcrypt.hash(
        updateAuthDto.password,
        12
      );
    }

    await this.authModel.update(updateAuthDto, {
      where: { id },
    });

    return { message: "Updated" };
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.authModel.findByPk(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.authModel.destroy({
      where: { id },
    });

    return { message: "Deleted" };
  }
}