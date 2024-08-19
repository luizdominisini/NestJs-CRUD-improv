import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from 'src/Product/entity/product.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'api_products',
  migrations: [__dirname + '/migrations/**'],
  entities: [ProductEntity],
  synchronize: true,
};

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'api_products',
  migrations: [__dirname + '/migrations/**'],
  entities: [ProductEntity],
  synchronize: true,
});
