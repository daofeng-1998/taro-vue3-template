import { isEqual } from '@/utils/TypeTools/ObjectTools';

export const isEqualArray = (array: Array<any>, target: Array<any>): boolean => {
    if (!Array.isArray(array) || !Array.isArray(target))
        return false;

    if (array.length !== target.length)
        return false;

    return array.every((item, index) => {
        return isEqual(item, target[index]);
    });
};
