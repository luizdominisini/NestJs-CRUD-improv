import { Module } from "@nestjs/common";
import { UserModule } from "../User/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "ACHAVEEHSECRETAN4OC0NT4PR4N1NGU3M",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
