import { NestResponse } from './nest-response';

export class NestResponseBuilder {
    private response: NestResponse = {
        status: 200,
        headers: {},
        body: {},
        xmlRootTagName: '',
        xmlElementTagName: ''
    };

    public withStatus(status: number): NestResponseBuilder {
        
        this.response.status = status;
        return this;
    }

    public withHeaders(headers): NestResponseBuilder {

        this.response.headers = headers;
        return this;
    }

    public withBody(body): NestResponseBuilder {

        this.response.body = body;
        return this;
    }

    public withXmlRootTagName(xmlRootTagName: string): NestResponseBuilder {

        this.response.xmlRootTagName = xmlRootTagName;
        return this;
    }

    public withXmlElementTagName(xmlElementTagName: string): NestResponseBuilder {
        
        this.response.xmlElementTagName = xmlElementTagName;
        return this;
    }

    public build(): NestResponse {

        return new NestResponse(this.response);
    }
}