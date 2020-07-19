import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { negotiateContent } from 'src/core/utils/content-negotiation';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';

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

        let { status, body } = exception instanceof HttpException
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

        if (status != HttpStatus.NOT_ACCEPTABLE) {
            let nestResponse = new NestResponseBuilder()
                                    .withBody(body)
                                    .withStatus(status)
                                    .withXmlRootTagName('exception')
                                    .build();
            nestResponse = negotiateContent(request, nestResponse);

            body = nestResponse.body;
        }
        this.httpAdapter.reply(response, body, status);
    }
}