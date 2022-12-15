import { createPinia } from 'pinia';
import { useCountStore } from '@/store/modules/count';

const countStore = useCountStore(createPinia());

test('pinia', () => {
    const init = countStore.count;

    countStore.increment();
    expect(countStore.count - init).toBe(1);
    countStore.increment(5);
    expect(countStore.count - init).toBe(6);

    countStore.decrement();
    expect(countStore.count - init).toBe(5);
    countStore.decrement(5);
    expect(countStore.count).toBe(0);
});
