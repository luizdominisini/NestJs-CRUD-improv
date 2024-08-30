import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../User/user.service";
import { decode } from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    if (!authorization) {
      throw new BadRequestException("Token necessário");
    }
    const token = authorization.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token inválido");
    }

    try {
      await this.JwtService.verify(token, {
        audience: "users",
        issuer: "login",
      });
      const { id } = this.JwtService.decode(token);
      req.user = await this.userService.userShow(id);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
