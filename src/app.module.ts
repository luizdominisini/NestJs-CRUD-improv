import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./database/dataSourcer";
import { ProductModule } from "./Product/product.module";
import { UserModule } from "./User/user.module";
import { AuthModule } from "./Auth/auth.module";
import { SmsModule } from "./Twilio/sms.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductModule,
    UserModule,
    AuthModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
