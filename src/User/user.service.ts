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
import { hash } from "bcryptjs";
import { PatchUserDto } from "./dto/patch-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async userCreate(data: CreateUserDto) {
    await this.emailExist(data.email);

    const { name, email, password, role } = data;
    const hashPass = await hash(password, 10);

    const user = this.userRepository.create({
      name,
      email,
      password: hashPass,
      role,
    });
    await this.userRepository.save(user);
    return user;
  }

  async userList() {
    return this.userRepository.find();
  }

  async userShow(id: number) {
    return this.userExist(id);
  }

  async userUpdate(id: number, data: UpdateUserDto) {
    const user = await this.userExist(id);

    const { name, email, password } = data;
    const hashPass = await hash(password, 10);
    await this.userRepository.update(id, {
      name,
      email,
      password: hashPass,
    });

    return user;
  }

  async userPatch(id: number, { name, email, password }: PatchUserDto) {
    await this.userExist(id);

    const data: any = {};
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = await hash(password, 10);
    }

    return this.userRepository.update(id, { name, email, password });
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
