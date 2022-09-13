class Cache {
    private cachePool: Map<String, any> = new Map<String, any>();

    /**
     * 存一个缓存数据，返回该数据在缓存池中对应的key
     * @param data
     */
    setData(data: any): string {
        const key = "cache_" + Math.random().toString().substring(2);
        this.cachePool.set(key, data);
        return key;
    }

    /**
     * 从缓存中取出数据，成功取出后，缓存数据将被销毁
     * @param key
     */
    getData(key: string): any {
        if (!this.cachePool.has(key)) return null; // 如果缓存池中没有指定key的数据，则直接返回null

        const data: any = this.cachePool.get(key); // 如果有则取出
        this.cachePool.delete(key); // 然后删除该数据
        return data;
    }

    clear(): void {
        this.cachePool.clear();
    }
}

export default new Cache();
