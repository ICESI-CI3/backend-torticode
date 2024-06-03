import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,  {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Aquí defines los niveles de registro que deseas habilitar
  });

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Automatically transform incoming data to DTO objects
    })
    );
    
  await app.listen(3000);
}
bootstrap();
