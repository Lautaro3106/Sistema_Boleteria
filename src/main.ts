import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS correctamente
  app.enableCors({
    origin: 'http://localhost:5173', // tu front
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
  console.log('✅ Servidor NestJS corriendo en http://localhost:3000');
}
bootstrap();