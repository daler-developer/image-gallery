import { Body, Controller, Get, Patch, Post, Req, Res, UploadedFile, UseInterceptors, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { User } from 'src/decorators/user.decorator'
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service'
import { postImagesStorage } from './posts.storage'


@Controller('/api/posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get('')
  async getAll(@Query('creator') creator, @User('_id') userId: string) {
    const posts = await this.postsService.getAll(userId, creator)

    return { posts }
  }
  
  @Post('')
  @UseInterceptors(FileInterceptor('image', { storage: postImagesStorage }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreatePostDto, @Req() req) {
    const post = await this.postsService.create(dto, file.filename, req.user._id)

    return { post }
  }

  @Patch('/:_id/like')
  async like(@Req() req: any, @Param('_id') _id){
    const post = await this.postsService.like(_id, req.user._id)

    return
  }

  @Patch('/:_id/dislike')
  async dislike(@Req() req: any, @Param('_id') _id){
    await this.postsService.dislike(_id, req.user._id)

    return
  }

  @Delete('/:_id')
  async delete(@Param('_id') _id: string, @User('_id') userId: string) {
    const post = await this.postsService.getById(_id)

    // if (post.creator !== userId) {
    //   throw new HttpException('posts/delete-rejected', HttpStatus.BAD_REQUEST)
    // }

    const postId = await this.postsService.delete(post._id)

    return { postId }
  }
}
