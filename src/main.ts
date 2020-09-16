import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const fs = require('fs');

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/241.ip-92-222-68.eu/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/241.ip-92-222-68.eu/fullchain.pem')
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const options = new DocumentBuilder()
    .setTitle('Fishing journal API')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  app.enableCors();
  await app.listen(3000);
}
bootstrap();
