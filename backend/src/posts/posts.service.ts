import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose'
import { Post, PostDocument } from "src/posts/post.schema"
import { CreatePostDto } from "./dto/create-post.dto"
import mongoose from 'mongoose'

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post.name) private PostModel: Model<PostDocument>) {}

  async getAll(currentUserId: string, creator?: string) {
    const query = this.PostModel.aggregate([
      {
        $match: creator ? {
          creator: new mongoose.Types.ObjectId(creator)
        } : {}
      },
      {
        $addFields: {
          numLikes: { $size: '$likes' },
          numComments: { $size: '$comments' },
          likedByCurrentUser: { $in: [new mongoose.Types.ObjectId(currentUserId), '$likes'] }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creators'
        }
      },
      {
        $addFields: {
          creator: { $first: '$creators' }
        }
      },
      {
        $unset: ['likes', 'comments', 'creators', 'creator.password']
      }
    ])

    const results = await query.exec()

    return results
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
      throw new HttpException('posts/user-already-liked', HttpStatus.BAD_REQUEST)
    }

    post.likes.push(userId)

    post.save()
  }

  async dislike(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ _id: postId })

    if (!post.likes.includes(userId)) {
      throw new HttpException('posts/user-already-disliked', HttpStatus.BAD_REQUEST)
    }

    post.likes = post.likes.filter((_id) => _id === userId)

    post.save()
  }

  async delete(postId: string) {
    const post = await this.PostModel.findOneAndDelete({ _id: postId })

    return post._id
  }

  generateUrl(filename: string) {
    return `/api/uploads/post-images/${filename}`
  }

}
