import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('School Compass 365 Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
