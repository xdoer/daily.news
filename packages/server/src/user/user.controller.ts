import { Controller, Get, Query } from '@nestjs/common'
import { UsersService } from './user.service'

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('user')
  user(@Query() query) {
    return this.userService.findOne(query.id)
  }
}
