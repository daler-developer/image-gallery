import { Module, ConsoleLogger, Logger } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsModule } from './comments/comments.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'


@Module({
  imports: [
    UsersModule,
    PostsModule,
    // CommentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
