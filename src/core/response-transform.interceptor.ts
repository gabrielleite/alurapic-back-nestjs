import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { HttpAdapterHost, AbstractHttpAdapter } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NestResponse } from './http/nest-response';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {

    private httpAdapter: AbstractHttpAdapter;

    constructor(adapterHost: HttpAdapterHost) {
        this.httpAdapter = adapterHost.httpAdapter;
    }
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<import("rxjs").Observable<any>> {
        return next
                .handle()
                .pipe(
                    map((handlerResponse: NestResponse) => {
                        if (handlerResponse instanceof NestResponse) {
                            const httpContext = context.switchToHttp();
                            const response = httpContext.getResponse();
                            const { body, headers, status } = handlerResponse;
                            const headersProps = Object.getOwnPropertyNames(headers);

                            headersProps.forEach(headerName => {
                                const value = headers[headerName];
                                this.httpAdapter.setHeader(response, headerName, value);
                            });
                            this.httpAdapter.status(response, status);
                            
                            return body;
                        }

                        return handlerResponse;
                    })
                );
    }
}