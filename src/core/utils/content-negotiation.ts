import { NotAcceptableException, HttpStatus } from '@nestjs/common';
import { parse } from 'js2xmlparser';
import { MediaType } from '../http/media-type';

const ACCEPTABLE_TYPES = Object.values(MediaType)

const isAcceptableRequest = (request) => {
    return ACCEPTABLE_TYPES.includes(request.headers.accept)
};

export const mediaTypeVerify = (request) => {
    if (!isAcceptableRequest(request)) {
        throw new NotAcceptableException({
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Media type not acceptable',
        });
    }
}

export const negotiateContent = (request, handlerResponse) => {
    const { body, xmlRootTagName, xmlElementTagName } = handlerResponse;
    if (request.headers.accept == MediaType.APPLICATION_XML) {
        const objectToParse = body instanceof Array
                                ? { [xmlElementTagName]: body }
                                : body;
        handlerResponse.body = xmlRootTagName 
                                ? parse(xmlRootTagName, objectToParse)
                                : parse('root', objectToParse);
    }

    return handlerResponse;
};