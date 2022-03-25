import { Injectable, Post } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose'
import { PostsService } from "src/posts/posts.service";
import { Comment, CommentDocument } from "./comment.schema";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class CommentsService {

  constructor(
    private postsService: PostsService,
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>
  ) {}
  
  async create(postId: string, creator: string, dto: CreateCommentDto) {
    const comment = await this.CommentModel.create({ creator, text: dto.text })
    const post = await this.postsService.getById(postId)

    post.comments.push(comment._id)

    await post.save()

    return await this.CommentModel.findOne({ _id: comment._id }).populate('creator')
  }

  async getAll(postId: string) {
    const post = await this.postsService.getById(postId)
    const comments = await this.CommentModel.find({}).populate('creator').where('_id').in(post.comments)

    return comments
  }

}
