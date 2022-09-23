<script
    setup
    lang="ts"
>

import AppPage from '@/components/lib/app-page/index.vue';
import Taro from '@tarojs/taro';

definePageConfig({
    navigationBarTitleText: ''
});

const onClick = () => {
    Taro.chooseVideo({
        success: function (res) {

            window?.alert?.(JSON.stringify(res));
            console.log(res);
        }
    });
};

</script>
<template>
    <AppPage>
        <nut-button @click="onClick">选择文件</nut-button>
    </AppPage>
</template>
