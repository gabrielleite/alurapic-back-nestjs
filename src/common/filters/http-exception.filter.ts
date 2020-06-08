import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const { status, body } = exception instanceof HttpException
                                    ? {
                                        status: exception.getStatus(),
                                        body: exception.getResponse()
                                    }
                                    : {
                                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                                        body: {
                                            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                                            timestamp: new Date().toISOString(),
                                            path: request.url
                                        }
                                    };

        this.httpAdapter.reply(response, body, status);
    }
}