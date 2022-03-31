import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class PostsReqDTO {
  @ApiProperty({ description: '分页页码' })
  @IsNotEmpty({ message: '请传入页码' })
  readonly pageNo: number

  @ApiProperty({ description: '分页页数' })
  @IsNotEmpty({ message: '请传入页数' })
  readonly pageSize: number
}
