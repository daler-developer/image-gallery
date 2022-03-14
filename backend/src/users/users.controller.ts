import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'


@Controller('/api/users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('')
  async getUsers() {
    return await this.usersService.getAll()
  }

  @Get('/:_id')
  async getUserById(@Param('_id') _id: string) {
    const user = await this.usersService.getUserById(_id)

    if (!user) {
      throw new HttpException('users/user-not-found', HttpStatus.NOT_FOUND)
    }

    return user
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const user = await this.usersService.getUserByUsername(body.username)
    
    if (user) {
      if (user.password === body.password) {
        return { user, token: this.usersService.generateToken(user._id) }
      } else {
        throw new HttpException('auth/incorrect-password', HttpStatus.BAD_REQUEST)
      }
    }

    throw new HttpException('auth/user-does-not-exist', HttpStatus.NOT_FOUND)
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.usersService.create({ username: body.username, password: body.password })

    return { user, token: this.usersService.generateToken(user._id)}
  }

}
