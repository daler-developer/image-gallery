import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import * as path from 'path'
import { FileInterceptor } from '@nestjs/platform-express'
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
  async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreatePostDto, @Req() req, @Res() res) {
    const post = await this.postsService.create(dto, file.filename, req.user._id)

    return res.status(202).json({ post })
  }

}
