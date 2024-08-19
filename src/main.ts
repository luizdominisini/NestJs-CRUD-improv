import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './database/dataSourcer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dataSource
    .initialize()
    .then(() => {
      console.log('BANCO DE DADOS CONECTADO');
    })
    .catch((error) => {
      console.log(error);
    });
  await app.listen(3000, () => console.log('API RODANDO NA PORTA 3000'));
}
bootstrap();
