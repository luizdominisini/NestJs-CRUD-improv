import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import e from "express";
import { PassThrough } from "stream";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async userCreate(data: CreateUserDto) {
    await this.emailExist(data.email);

    const { name, email, password } = data;
    const user = this.userRepository.create({ name, email, password });
    await this.userRepository.save(user);
    return user;
  }

  async userList() {
    return this.userRepository.find();
  }

  async userShou(id: number) {
    return this.userExist(id);
  }

  async userUpdate(id: number, data: UpdateUserDto) {
    const user = await this.userExist(id);

    const { name, email, password } = data;
    await this.userRepository.update(id, {
      name,
      email,
      password,
    });

    return user;
  }

  async userDelete(id: number) {
    const user = await this.userExist(id);
    return this.userRepository.remove(user);
  }

  async emailExist(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException("Email já existe");
    }

    return true;
  }

  async userExist(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Usuario não existe");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException("Email não encontrado");
    }

    return user;
  }
}
