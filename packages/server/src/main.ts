import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './user/user.module'
import { PostModule } from './post/post.module'
import { HttpExceptionFilter } from './core/httpException.filter'
import { TransformInterceptor } from './core/transform.interceptor'

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
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3001)
}
bootstrap()
