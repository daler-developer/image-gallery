import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT || 3000)
}

bootstrap()
