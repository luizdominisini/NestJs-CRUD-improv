import { DataSource } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ProductEntity } from "../Product/entity/product.entity";
import { UserEntity } from "../User/entity/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "api_products",
  migrations: [__dirname + "/migrations/*.ts"],
  entities: [ProductEntity, UserEntity],
  synchronize: true,
};

export const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "api_products",
  migrations: [__dirname + "/migrations/*.ts"],
  entities: [ProductEntity, UserEntity],
  synchronize: true,
});
