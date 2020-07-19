export class NestResponse {
    status: number;
    headers: Object;
    body: Object;
    xmlRootTagName: string;
    xmlElementTagName: string;

    constructor(response: NestResponse) {
        Object.assign(this, response);
    }
}