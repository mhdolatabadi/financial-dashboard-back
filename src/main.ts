import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ServerConfig } from './app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const { host, port } = configService.get<ServerConfig>('server')
 
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())

  await app.listen(port, host)
  console.log(` ✔️ Server successfully started on ${await app.getUrl()}!`)
}
bootstrap()
