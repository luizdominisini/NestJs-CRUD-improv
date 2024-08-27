import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { UserEntity } from "../User/entity/user.entity";
import { UserService } from "../User/user.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService
  ) {}

  async createToken(data: UserEntity) {
    const accessToken = this.jwt.sign(
      {
        id: data.id,
        name: data.name,
      },
      {
        expiresIn: "1d",
        subject: String(data.id),
        issuer: "login",
        audience: "users",
      }
    );

    return { accessToken };
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.userService.findByEmail(email);

    if (password !== user.password) {
      throw new UnauthorizedException("Senha Incorreta");
    }

    return this.createToken(user);
  }

  async forgetPass(email: string) {
    const user = await this.userService.findByEmail(email);

    const token = this.jwt.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "5 minutes",
        subject: String(user.id),
        issuer: "forget",
        audience: "users",
      }
    );

    return { token };
  }

  async resetPass(password: string, token: string) {
    try {
      await this.jwt.verify(token, {
        audience: "users",
        issuer: "forget",
      });

      const { id } = await this.jwt.decode(token);

      return this.userRepository.update(id, { password });
    } catch (err) {
      throw new BadRequestException("Token inválido", err);
    }
  }

  async isValidToken(token: string) {
    try {
      const dados = this.jwt.verify(token, {
        issuer: "login",
        audience: "users",
      });
      return dados;
    } catch (err) {
      console.log("Token inválido");
    }
  }
}
