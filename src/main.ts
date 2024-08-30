import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { dataSource } from "./database/dataSourcer";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  dataSource
    .initialize()
    .then(() => {
      console.log("BANCO DE DADOS CONECTADO");
    })
    .catch((error) => {
      console.log(error);
    });

  const logger = new Logger("NestApplication");
  await app.listen(port, async () => {
    logger.log(`Running at ${await app.getUrl()}`);
  });
}
bootstrap();
