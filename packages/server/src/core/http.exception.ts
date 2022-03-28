import { HttpStatus, HttpException as BaseHttpException } from '@nestjs/common'
import { ErrorCode } from './errorCode'

export class HttpException extends BaseHttpException {
  constructor(errorCode: ErrorCode, errorMessage: string, status: HttpStatus) {
    super({ errorCode, errorMessage }, status)
  }
}
