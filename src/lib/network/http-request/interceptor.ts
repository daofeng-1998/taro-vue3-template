interface InterceptorHandle {
    fulfilled: Function
    rejected?: Function
}

class Interceptor {
    private handles: InterceptorHandle[] = [];

    public use(fulfilled: Function, rejected?: Function): void {
        const handle: InterceptorHandle = {
            fulfilled,
            rejected,
        };
        this.handles.push(handle);
    }

    public each(fn: (handle: InterceptorHandle) => void) {
        this.handles.forEach(fn);
    }
}

export default Interceptor;
