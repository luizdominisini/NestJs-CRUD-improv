import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthForgetDto } from "./dto/auth-forget.dto";
import { AuthResetDto } from "./dto/auth-reset.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async Login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post("/forget")
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authService.forgetPass(email);
  }

  @Post("/reset")
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authService.resetPass(password, token);
  }
}
