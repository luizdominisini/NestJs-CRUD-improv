import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { UserEntity } from "../User/entity/user.entity";
import { UserService } from "../User/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService
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
}
