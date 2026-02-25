import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  //Configuracion de swagger

  const config = new DocumentBuilder()
    .setTitle('API CON VULNERABILIDADES DE SEGURIDAD')
    .setDescription('ADocumentacion de API para pruebas')
    .setVersion('1.0')
    .addTag('tasks')
    .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
