import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose'

import { PopulateUserMiddleware } from "src/middlewares/populate-user.middleware"
import { Comment, CommentSchema } from "./comment.schema"
import { CommentsController } from "./comments.controller"
import { CommentsService } from "./comments.service"


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: []
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PopulateUserMiddleware).forRoutes(CommentsController)
  }
}
