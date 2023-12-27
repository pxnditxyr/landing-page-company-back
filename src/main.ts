import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const logger = new Logger( 'Main' )
  const app = await NestFactory.create<NestExpressApplication>( AppModule )
  app.setGlobalPrefix( 'api' )
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.enableCors()
  await app.listen( process.env.PORT || 3000 )
  logger.verbose( `Application is running on: ${ await app.getUrl() }` )
}
bootstrap()
