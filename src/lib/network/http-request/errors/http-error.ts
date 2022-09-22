import { HttpRequest } from '@/lib/network/http-request/@types-http';

declare type IRequestOptions = HttpRequest.IRequestOptions;

export class HttpError extends Error {

    options: IRequestOptions | undefined;
    name: string = 'HttpError';

    constructor(message, options?: IRequestOptions) {
        super(message);
        this.options = options;
    }
}
