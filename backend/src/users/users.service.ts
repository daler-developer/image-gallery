import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Types } from 'mongoose'
import { Model } from 'mongoose'
import * as jwt from 'jsonwebtoken'

import { User, UserDocument } from './user.schema'
import { CreateUserDto } from './dto/create-user.dto'
import { Post, PostDocument } from "src/posts/post.schema"

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
  ) {}

  async getAll({ postLiked, exclude }: { exclude?: string[], postLiked?: string }) {
    const users = this.UserModel.find({}).select('-password')

    if (postLiked) {
      let post = await this.PostModel.findOne({ _id: postLiked })
      users.where('_id').in(post.likes)
    }
    
    if (exclude) {
      users.where('_id').nin(exclude)
    }

    return users
  }

  async create(user: CreateUserDto) {
    const createdUser = new this.UserModel(user)

    await createdUser.save()

    return createdUser
  }

  async getUserById(_id: string) {
    const user = await this.UserModel.findOne({ _id })

    return user
  }
  
  async getUserByUsername(username: string) {
    const candidate = await this.UserModel.findOne({ username })

    return candidate
  }

  async updateProfile(userId: string, props: { username?: string, password?: string, fileName?: string }) {
    const { username, password, fileName } = props

    const avatarUrl = fileName ?  this.generateAvatarUrl(fileName) : undefined

    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: userId }, 
      { username, password, avatarUrl },
      { new: true }
    )

    return updatedUser
  }

  parseToken(token: string) {
    let decoded: any

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
      throw new HttpException('auth/incorrect-token', HttpStatus.BAD_REQUEST)
    }

    return decoded
  }

  generateToken(userId: string) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2 days' })

    return token
  }

  generateAvatarUrl(fileName: string) {
    return `/api/uploads/avatars/${fileName}`
  }

}
