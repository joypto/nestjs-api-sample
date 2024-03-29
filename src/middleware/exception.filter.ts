import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

type ExceptionResponse = {
    statusCode: number;
    error: string;
    message: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const exceptionResponse = exception.getResponse() as ExceptionResponse;
        const response = host.switchToHttp().getResponse<Response>();

        response.status(exceptionResponse.statusCode).json({
            code: exceptionResponse.statusCode,
            data: [{ errMsg: exceptionResponse.message }]
        });
    }
}
