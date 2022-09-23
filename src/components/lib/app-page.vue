<script
    setup
    lang="ts"
>
import AppSafeTop from '@/components/lib/app-safe-top.vue';
import AppSafeBottom from '@/components/lib/app-safe-bottom.vue';
import AppLoading from '@/components/lib/interact/app-loading.vue';
import { useReactive } from '@/hooks/commonHooks';

const notifyState = useReactive<INotifyState>('notifyState', {
    activated: false,
    show: false,
    msg: ''
});

const loadingState = useReactive<ILoadingState>('loadingState', {
    activated: false,
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
        v-if="loadingState.activated"
        :show="loadingState.show"
    />

    <nut-navbar
        v-if="notifyState.activated"
        :safe-area-inset-top="true"
        title="你好"
    ></nut-navbar>
    <slot/>
    <AppSafeBottom/>
</template>

<style></style>
