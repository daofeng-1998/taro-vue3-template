declare type Data = Record<string, unknown>;

declare type PropMethod<T, TConstructor = any> = [T] extends [
        ((...args: any) => any) | undefined
] ? {
    new(): TConstructor;
    (): T;
    readonly prototype: TConstructor;
} : never;


declare type PropConstructor<T = any> = {
    new(...args: any[]): T & {};
} | {
    (): T;
} | PropMethod<T>;

export declare type PropType<T> = PropConstructor<T> | PropConstructor<T>[];

/**
 * 默认值工厂
 */
declare type DefaultFactory<T> = (props: Data) => T | null | undefined;


export interface FormDataOptions<T = any, D = T, DT = PropType<T> | null> {
    default?: D | DefaultFactory<D> | undefined;
}


export declare type FormData<P = Record<string, any>> = {
    [K in keyof P]: FormDataOptions<P[K]> | null
};

