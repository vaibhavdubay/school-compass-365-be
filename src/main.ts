import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GlobalExceptionFilter } from '@sc-helpers/global-exception.filter';
import { writeFileSync } from 'fs';
import { cwd } from 'process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
    abortOnError: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const staticFolders = configService.get<string>('STATIC_FOLDERS').split(',');

  app.setGlobalPrefix('api', { exclude: ['image/:category/:name'] });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  staticFolders.forEach((folder) => {
    app.useStaticAssets(join(cwd(), folder));
  });

  const config = new DocumentBuilder()
    .setTitle('School Compass 365')
    .setVersion('1.0')
    .setLicense(
      'Mozilla Public License Version 2.0',
      'https://github.com/vaibhavdubay/School-Compass-365-be/blob/main/LICENSE',
    )
    .setDescription('swagger json: <a href="/swagger.json">swagger.json</a>')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.use(compression());

  await app.listen(port);
  try {
    writeFileSync('public/swagger.json', JSON.stringify(document, null, 2));
  } catch (error) {
    console.error(error);
  }
  const hostUrl = app.getUrl();
  configService.set('HOST_URL', hostUrl);
}
bootstrap();
