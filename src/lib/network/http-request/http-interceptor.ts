import type { Interceptor } from "@/lib/network/http-request/@types-http";

class HttpInterceptor {

    private handles: Interceptor.IHandle[] = [];

    public use(fulfilled: Function, rejected?: Function) {
        const handle: Interceptor.IHandle = {
            fulfilled,
            rejected
        };
        this.handles.push(handle);
        return handle;
    }

    public clear() {
        this.handles = [];
    }

    public forEach(fn: (handle: Interceptor.IHandle) => void) {
        this.handles.forEach(fn);
    }
}

export default HttpInterceptor;
