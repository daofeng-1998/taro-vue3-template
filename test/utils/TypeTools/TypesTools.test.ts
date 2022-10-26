import { isBaseType, isFamily } from '@/utils/TypeTools/TypesTools';

test('isFamily', () => {
    expect(isFamily(1, 2, 3)).toBe(true);
    expect(isFamily(NaN)).toBe(true);
    expect(isFamily('1', 1)).toBe(false);
    expect(isFamily({}, {})).toBe(true);
    expect(isFamily({}, {}, null)).toBe(false);
});

test('isBaseType', () => {
    expect(isBaseType(1)).toBe(true);
    expect(isBaseType('1')).toBe(true);
    expect(isBaseType(true)).toBe(true);
    expect(isBaseType(false)).toBe(true);
    expect(isBaseType(Symbol('123'))).toBe(true);
    expect(isBaseType(null)).toBe(true);
    expect(isBaseType(undefined)).toBe(true);

    expect(isBaseType({})).toBe(false);
    expect(isBaseType(new Date())).toBe(false);
    expect(isBaseType(['1'])).toBe(false);
});
