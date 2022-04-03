import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class QueryWebsiteDTO {
  @ApiProperty({ description: '网站查询' })
  @IsNotEmpty({ message: '请传入名称' })
  readonly name: string
}
