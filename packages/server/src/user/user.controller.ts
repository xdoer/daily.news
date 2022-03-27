import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get()
  getHello(@Query() query) {
    return this.userService.findOne(query.id)
  }
}
