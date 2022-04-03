import { Controller, Get, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiOperation } from '@nestjs/swagger'
import { QueryPostsDTO } from './dto/query-posts.dto'

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
    return this.postService.find(query)
  }
}
