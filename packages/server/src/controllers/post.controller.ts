import { Controller, Get, Query } from '@nestjs/common'
import { PostService } from '../service/post.service'
import { ApiOperation } from '@nestjs/swagger'
import { QueryPostsDTO } from '../dtos'

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post')
  post(@Query() query) {
    return this.postService.findOne(query.id)
  }

  @Get('posts')
  @ApiOperation({ summary: '查询文章列表' })
  posts(@Query() query: QueryPostsDTO) {
    return this.postService.paginate(query)
  }
}
