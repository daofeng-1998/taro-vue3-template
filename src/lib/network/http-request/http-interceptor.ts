import type { Interceptor } from '@/lib/network/http-request/http-request';

class HttpInterceptor {

    private handles: Interceptor.IHandle[] = [];

    public use(fulfilled: Function, rejected?: Function): void {
        const handle: Interceptor.IHandle = {
            fulfilled,
            rejected
        };
        this.handles.push(handle);
    }

    public each(fn: (handle: Interceptor.IHandle) => void) {
        this.handles.forEach(fn);
    }
}

export default HttpInterceptor;
