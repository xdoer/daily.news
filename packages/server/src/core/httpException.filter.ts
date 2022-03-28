import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'
import { HttpException } from './http.exception'
import { ErrorCode } from './errorCode'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse: any = exception.getResponse()
    const { errorCode = ErrorCode.COMMON, errorMessage = 'System Error' } =
      exceptionResponse

    response.status(status).json({
      data: null,
      errorCode,
      errorMessage,
      success: false,
    })
  }
}
