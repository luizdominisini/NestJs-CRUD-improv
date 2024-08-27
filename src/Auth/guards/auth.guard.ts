import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const { authorization } = context.switchToHttp().getRequest().headers;
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

      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
