import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { UsersService } from 'src/users/users.service'


@Injectable()
export class PopulateUserMiddleware implements NestMiddleware {

  constructor(private usersService: UsersService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new HttpException('auth/incorrect-token', HttpStatus.UNAUTHORIZED)
    }

    const decoded = this.usersService.parseToken(token)

    req.user = await this.usersService.getUserById(decoded.userId)

    next()
  }
}
