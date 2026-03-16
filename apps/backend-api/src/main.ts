import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita CORS para permitir que o frontend Angular (normalmente na 4200) acesse a API (na 3000)
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3030);
}
bootstrap();
