import { deepClone, isEqual } from '@/utils/TypeTools/ObjectTools';

test('deepClone', () => {
    const source = {
        name: '锋',
        info: {
            height: 180,
            address: 'aaa',
        },
        children: ['1', '2', {
            name: 'b',
            children: ['5,6', {
                name: 'feng',
            }],
        }],
        date: new Date(),
    };
    const clone = deepClone(source);
    // @ts-ignore
    // clone.company = '聚创科技';
    console.log('引用是否相等', source === clone);
    console.log('isEqual', isEqual(source, clone));
});

test('NaN is equal', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
});
