<script
    setup
    lang="ts"
>
import AppSafeTop from '@/components/lib/app-safe-top.vue';
import AppSafeBottom from '@/components/lib/app-safe-bottom.vue';
import AppLoading from '@/components/lib/interact/app-loading/index.vue';
import { useLoadingState } from '@/components/lib/interact/app-loading/use-loading';
import { reactive } from 'vue';

console.log('app-page');

const loadingState = useLoadingState();

const notifyState = reactive({
    show: false,
    msg: ''
});
</script>

<!--页面包裹容器-->
<template>
    <AppSafeTop/>

    <nut-notify
        v-model:visible="notifyState.show"
        :msg="notifyState.msg"
    />

    <AppLoading
        :show="loadingState.show"
        :msg="loadingState.msg"
    />

    <nut-navbar
        :safe-area-inset-top="true"
        title="你好"
    ></nut-navbar>
    <slot/>
    <AppSafeBottom/>
</template>

<style></style>
