import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';
import { negotiateContent, isAcceptableRequest } from 'src/core/utils/content-negotiation';

@Injectable()
export class ContentNegotiationInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        if (!isAcceptableRequest(request)) {
            throw new HttpException({
                status: HttpStatus.NOT_ACCEPTABLE,
                message: 'Media type not acceptable',
            }, HttpStatus.NOT_ACCEPTABLE);
        }
        
        return next
                .handle()
                .pipe(
                    map((handlerResponse: NestResponse) => {
                        return negotiateContent(request, handlerResponse);
                    })
                );
    }
}