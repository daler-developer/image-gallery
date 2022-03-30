import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose'

import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { User, UserSchema } from './user.schema'
import { PopulateUserMiddleware } from "src/middlewares/populate-user.middleware"
import { Post, PostSchema } from "src/posts/post.schema"
import { PostsModule } from "src/posts/posts.module"


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PopulateUserMiddleware).forRoutes(
      { method: RequestMethod.PATCH, path: '/api/users/:_id' },
      { method: RequestMethod.GET, path: '/api/users' },
    )
  }
}
