import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { PopulateUserMiddleware } from "src/middlewares/populate-user.middleware"
import { Post, PostSchema } from "src/posts/post.schema"
import { UsersModule } from "src/users/users.module"

import { PostsController } from "./posts.controller"
import { PostsService } from "./posts.service"

@Module({
  imports: [
    UsersModule, 
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PopulateUserMiddleware).forRoutes(PostsController)
  }
}
