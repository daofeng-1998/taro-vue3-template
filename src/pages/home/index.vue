<script lang="ts">
export default { name: 'home' };
</script>
<script
    setup
    lang="ts"
>
import AppPage from '@/components/lib/app-page/index.vue';
import { er } from '@/utils/AsyncTool';
import { useLoading } from '@/components/lib/interact/app-loading/use-loading';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';
import Taro from '@tarojs/taro';
import { go } from '@/utils/Router';

definePageConfig({
    navigationBarTitleText: '首页',
});

const Loading = useLoading();
const dialog = useDialog();

const showLoading = er(() => {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 3000);
});

const showDialog = () => {
    dialog.show({
        title: '哈哈',
        titleColor: 'red',
        content: '一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。',
        contentColor: 'skyblue',
        showCancel: true,
        cancelText: '不需要',
        cancelColor: 'red',
        confirmText: '谢谢',
        confirmColor: 'blue'
    }).then(() => {
        Taro.showToast({
            title: '点击了确认',
            icon: 'none'
        });
    }).catch(() => {
        Taro.showToast({
            title: '点击了取消',
            icon: 'none'
        });
    });

    // dialog.showContent('你好').then(() => {
    //     console.log(dialogState.value.show);
    // });

    // dialog.showCancel('谢谢');
};

const onRichDialog = () => {
    dialog.show({
        title: '富文本展示',
        contentType: 'HTML',
        content: '' +
            '<img mode="widthFix" style="width: 100%" src="https://www.baidu.com/img/pc_d421b05ca87d7884081659a6e6bdfaaa.png"/>' +
            '<video style="width: 100%"  src="https://vd2.bdstatic.com/mda-nj225vh0nfbdrr8g/sc/cae_h264/1664761364992520146/mda-nj225vh0nfbdrr8g.mp4?v_from_s=hkapp-haokan-nanjing&auth_key=1664771349-0-0-51d100bf4a2fa4c88acb08288767528d&bcevod_channel=searchbox_feed&pd=1&cd=0&pt=3&logid=3549006384&vid=5556211304135979830&abtest=&klogid=3549006384"></video>',
        showCancel: true,
        cancelText: '谢谢',
        confirmText: '马上加衣服'
    });
};

</script>

<template>
    <AppPage>
        <nut-cell-group title="函数式组件">
            <nut-cell
                is-link
                title="对话框dialog"
                @click="showDialog"
            />
            <nut-cell
                is-link
                title="富文本loading"
                @click="onRichDialog"
            />
            <nut-cell
                is-link
                title="加载中loading"
                @click="showLoading"
            />
        </nut-cell-group>
        <nut-cell-group title="数据组件">
            <nut-cell
                is-link
                title="表单预览"
                @click="go('/pages/data/preview/index')"
            />
        </nut-cell-group>
    </AppPage>
</template>


<style>

</style>
