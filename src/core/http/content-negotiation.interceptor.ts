import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';
import { negotiateContent, mediaTypeVerify } from 'src/core/utils/content-negotiation';

@Injectable()
export class ContentNegotiationInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        mediaTypeVerify(request);
        
        return next
                .handle()
                .pipe(
                    map((handlerResponse: NestResponse) => {
                        return negotiateContent(request, handlerResponse);
                    })
                );
    }
}