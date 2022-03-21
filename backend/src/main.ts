import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'debug'] })

  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT || 3000)
}

bootstrap()
