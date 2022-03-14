import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { User } from "src/decorators/user.decorator";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Controller('/api/posts/:postId/comments')
export class CommentsController {

  constructor(private commentsService: CommentsService) {}
  
  @Post('')
  async create(
    @Body() dto: CreateCommentDto, 
    @User('_id') userId: string,
    @Param('postId') postId: string
  ) {
    const comment = await this.commentsService.create(postId, userId, dto)

    return { comment }
  }

  @Get('')
  async all(
    @Param('postId') postId: string
  ) {
    const comments = await this.commentsService.getAll(postId)

    return { comments }
  }

}
