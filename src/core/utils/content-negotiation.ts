import { parse } from 'js2xmlparser';
import { MediaType } from '../http/media-type';

const ACCEPTABLE_TYPES = Object.values(MediaType)

export const isAcceptableRequest = (request) => {
    return ACCEPTABLE_TYPES.includes(request.headers.accept)
};

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