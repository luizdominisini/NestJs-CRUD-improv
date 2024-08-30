import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entity/product.entity";
import { ProductController } from "./product.controller";
import { AuthModule } from "../Auth/auth.module";
import { UserModule } from "../User/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
