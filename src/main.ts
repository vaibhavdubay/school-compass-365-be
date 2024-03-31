import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GlobalExceptionFilter } from '@sc-helpers/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
    abortOnError: false,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const staticFolders = configService.get<string>('STATIC_FOLDERS').split(',');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  staticFolders.forEach((folder) => {
    app.useStaticAssets(join(__dirname, '..', folder));
  });

  const config = new DocumentBuilder()
    .setTitle('School Compass 365 BE')
    .setVersion('1.0')
    .setLicense(
      'Mozilla Public License Version 2.0',
      'https://github.com/vaibhavdubay/School-Compass-365-be/blob/main/LICENSE',
    )
    .setDescription('')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  await app.listen(port);
  const hostUrl = app.getUrl();
  configService.set('HOST_URL', hostUrl);
}
bootstrap();
