import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose'
import { Post, PostDocument } from "src/schemas/post.schema"
import { CreatePostDto } from "./dto/create-post.dto"

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  async getAll() {
    const posts = await this.PostModel.find({})

    return posts 
  }

  async create(createPostDto: CreatePostDto, filename: string, creator: string) {
    const post = await this.PostModel.create({ ...createPostDto, fileUrl: this.generateUrl(filename), creator })

    return post
  }

  generateUrl(filename: string) {
    return `/api/uploads/post-images/${filename}`
  }

}
