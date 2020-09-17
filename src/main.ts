import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({limit: '50mb'}))
  app.use(urlencoded({extended: true, limit: '50mb'}));

  const options = new DocumentBuilder()
    .setTitle('Fishing journal API')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  app.enableCors({
    origin: /netlify\.app$/
  });
  await app.listen(3000);
}
bootstrap();
