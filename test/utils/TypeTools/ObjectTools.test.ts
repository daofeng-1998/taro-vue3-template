import { deepClone, isSame } from '@/utils/TypeTools/ObjectTools';

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

    expect(source === clone).toBe(false);
    expect(isSame(source, clone)).toBe(true);

    // @ts-ignore
    clone.company = '聚创科技';
    expect(isSame(source, clone)).toBe(false);
});

test('NaN is equal', () => {
    expect(isSame(NaN, NaN)).toBe(true);
});

test('isSame', () => {
    expect(isSame(
        ['1', '2', '3'],
        {
            0: '1',
            1: '2',
            2: '3',
        },
    )).toBe(false);
});
