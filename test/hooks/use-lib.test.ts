import { formatDate } from '@/utils/CommonTools';
import { useForm } from '@/hooks/use-lib';

test('useForm', () => {
    const [form, resetForm] = useForm({
        name: 'feng',
        age: {
            default: 18,
            rules: [
                { required: true, msg: '请填写年龄' },
                { min: 0, max: 100, msg: '年龄范围应大于0小于100' },
            ],
        },
        info: {
            default: () => ({ height: 190 }),
            rules: [{
                asyncValidator: (v) => {
                    console.log(v.height);
                    return false;
                },
            }],
        },
        detail: () => ({
            address: '',
            time: Date.now(),
        }),
        birthday: () => formatDate(new Date()),
    });

    console.log('表单数据');
    console.log(JSON.stringify(form));

    form.detail.address.includes('aaaa');
    form.name = '888';
    form.info.height = 888;
    form.age = 66;
    form.detail.address = '甘肃';
    form.detail.time = 1;
    form.birthday = '今天是你的生日';

    console.log(JSON.stringify(form));
    resetForm(); // 重置表单数据
    console.log(JSON.stringify(form));
});
