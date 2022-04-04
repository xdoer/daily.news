import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Website } from '../entities'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website) private websiteRepository: Repository<Website>,
  ) {}

  find(opt?: FindManyOptions<Website>): Promise<Website[]> {
    return this.websiteRepository.find(opt)
  }

  findOne(id: string): Promise<Website> {
    return this.websiteRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.websiteRepository.delete(id)
  }
}
