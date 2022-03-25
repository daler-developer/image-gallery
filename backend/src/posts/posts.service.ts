import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose'
import { Post, PostDocument } from "src/posts/post.schema"
import { CreatePostDto } from "./dto/create-post.dto"
import mongoose from 'mongoose'

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  async getAll(currentUserId: string, creator?: string) {
    const query = this.PostModel.find({})

    if (creator) {
      query.where('creator').equals(creator)
    }

    query.populate('creator')

    const posts = await query.exec()

    return posts
  }

  async getById(_id: string){
    const post = await this.PostModel.findOne({ _id })

    return post
  }

  async create(createPostDto: CreatePostDto, filename: string, creator: string) {
    const post = await this.PostModel.create({ ...createPostDto, fileUrl: this.generateUrl(filename), creator })

    return post
  }

  async like(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ _id: postId })

    if (post.likes.includes(userId)) {
      return post
    }

    post.likes.push(userId)

    post.save()

    return post
  }

  async dislike(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ _id: postId })

    if (!post.likes.includes(userId)) {
      return post
    }

    post.likes = post.likes.filter((_id) => _id === userId)

    post.save()

    return post
  }

  async delete(postId: string) {
    const post = await this.PostModel.findOneAndDelete({ _id: postId })

    return post._id
  }

  generateUrl(filename: string) {
    return `/api/uploads/post-images/${filename}`
  }

}
