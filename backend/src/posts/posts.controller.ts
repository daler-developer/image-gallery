import { Body, Controller, Get, Patch, Post, Req, Res, UploadedFile, UseInterceptors, Param } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { CreatePostDto } from './dto/create-post.dto'
import { PostsService } from './posts.service'
import { postImagesStorage } from './posts.storage'


@Controller('/api/posts')
export class PostsController {

  constructor(private postsService: PostsService) {}

  @Get('')
  async getAll() {
    return await this.postsService.getAll() 
  }

  
  @Post('')
  @UseInterceptors(FileInterceptor('image', { storage: postImagesStorage }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreatePostDto, @Req() req) {
    const post = await this.postsService.create(dto, file.filename, req.user._id)

    return { post }
  }

  @Patch('/:_id/like')
  async like(@Req() req: any, @Param('_id') _id){
    return await this.postsService.like(_id, req.user._id)
  }

  @Patch('/:_id/dislike')
  async dislike(@Req() req: any, @Param('_id') _id){
    return await this.postsService.dislike(_id, req.user._id)
  }

}
