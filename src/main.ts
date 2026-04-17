import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT= process.env.PORT ?? 3000;
  await app.listen(PORT, ()=>{
    console.log(PORT)
  });
}
void bootstrap();
