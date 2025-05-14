import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: true  // Habilita CORS por defecto
  });

  // Configuración global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');

  // Configuración detallada de CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',    // Frontend local
      'http://auth-frontend:3000' // Frontend en Docker
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true,
    maxAge: 3600
  });

  // Escuchar en todas las interfaces de red
  await app.listen(3000, '0.0.0.0');
  
  // Log de información importante
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('CORS configurado para los siguientes orígenes:');
  console.log('- http://localhost:3000');
  console.log('- http://auth-frontend:3000');
}

bootstrap();
