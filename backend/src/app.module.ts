import { Module, ConsoleLogger, Logger } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module'


@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'uploads'),
      serveRoot: '/api/uploads'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
