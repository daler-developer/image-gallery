import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from 'mongoose'
import * as jwt from 'jsonwebtoken'

import { User, UserDocument } from '../schemas/user.schema'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getAll() {
    const users = await this.UserModel.find({}) 

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

}
