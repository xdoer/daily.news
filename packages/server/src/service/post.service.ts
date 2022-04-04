import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate } from '../paginate/paginate'
import { Repository } from 'typeorm'
import { Post } from '../entities'
import { PaginateReqDTO, PaginateResDTO } from '../dtos/paginate.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async paginate(query?: PaginateReqDTO): Promise<PaginateResDTO<Post>> {
    return paginate({
      repository: this.postsRepository,
      data: await this.postsRepository.find({
        ...query,
        relations: ['author', 'tags', 'website'],
        order: { createdAt: 'DESC' },
      }),
      query,
    })
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id)
  }
}
