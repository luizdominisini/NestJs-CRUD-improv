import { Module } from "@nestjs/common";
import { UserModule } from "../User/user.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../User/entity/user.entity";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "ACHAVEEHSECRETAN4OC0NT4PR4N1NGU3M",
      signOptions: { expiresIn: "1d" },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
