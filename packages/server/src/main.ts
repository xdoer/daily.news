import { NestFactory } from '@nestjs/core'
import { Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { HttpExceptionFilter } from './core/httpException.filter'
import { TransformInterceptor } from './core/transform.interceptor'
import { CrawlModule, WebsiteModule, PostModule, UsersModule } from './modules'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', 'test0.12345'),
        database: configService.get('DB_NAME', 'test'),
        timezone: '+08:00',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    PostModule,
    WebsiteModule,
    CrawlModule,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalPipes(new ValidationPipe())
    .useGlobalFilters(new HttpExceptionFilter())
    .listen(3001)
}
bootstrap()
