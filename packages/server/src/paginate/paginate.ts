import { Repository } from 'typeorm'
import { PaginateResDTO, PaginateReqDTO } from '../dtos/paginate.dto'

interface Params<T> {
  repository: Repository<T>
  data: T[]
  query: PaginateReqDTO
}

function formatQuery(query: PaginateReqDTO): PaginateReqDTO {
  const { skip = 0, take = 10, ...rest } = query || {}
  return { skip: Number(skip), take: Number(take), ...rest }
}

export async function paginate<T>(
  params: Params<T>,
): Promise<PaginateResDTO<T>> {
  const { repository, data, query } = params
  const totalItems = await repository.count()
  const { skip, take } = formatQuery(query)

  return {
    totalItems,
    data,
    haveNext: skip + take < totalItems,
  }
}
