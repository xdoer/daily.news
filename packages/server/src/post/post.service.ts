import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Post } from './post.entity'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  find(opt?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postsRepository.find({
      ...opt,
      relations: ['author', 'tags'],
    })
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id)
  }
}
