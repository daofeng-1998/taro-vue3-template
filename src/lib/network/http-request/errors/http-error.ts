import type { HttpRequest } from '@/lib/network/http-request/http-request';

declare type IRequestOptions = HttpRequest.IRequestOptions;

export class HttpError extends Error {

    options: IRequestOptions | undefined;
    name: string = 'HttpError';

    constructor(message, options?: IRequestOptions) {
        super(message);
        this.options = options;
    }
}
