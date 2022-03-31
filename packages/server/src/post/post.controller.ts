import { Controller, Get, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { PostsReqDTO } from 'src/dto/post/posts-req.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('post')
  post(@Query() query) {
    return this.postService.findOne(query.id)
  }

  @Get('posts')
  @ApiOperation({ summary: '查询文章列表' })
  posts(@Query() query: PostsReqDTO) {
    return { a: 1 }
  }
}
