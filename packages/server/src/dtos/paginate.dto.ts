import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PaginateReqDTO {
  @ApiProperty({ description: '分页页码' })
  @IsNotEmpty({ message: '请传入页码' })
  readonly skip: number

  @ApiProperty({ description: '分页页数' })
  @IsNotEmpty({ message: '请传入页数' })
  readonly take: number
}

export interface PaginateResDTO<T> {
  data: T[]
  totalItems: number
  haveNext: boolean
}
