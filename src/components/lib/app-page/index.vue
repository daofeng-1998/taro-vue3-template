<script
    setup
    lang="ts"
>
import AppSafeTop from '@/components/lib/app-safe-top.vue';
import AppSafeBottom from '@/components/lib/app-safe-bottom.vue';
import AppLoading from '@/components/lib/interact/app-loading/index.vue';
import AppDialog from '@/components/lib/interact/app-dialog/index.vue';
import { useComponentState } from '@/components/lib/script/component-states';
import { SYMBOL_DIALOG, SYMBOL_LOADING } from '@/components/lib/script/Symbols';

const loadingState = useComponentState<ILoadingState>(SYMBOL_LOADING);
const dialogState = useComponentState<IDialogSync>(SYMBOL_DIALOG);
</script>

<script lang="ts">
export default { name: 'AppPage' };
</script>

<!-- 页面包裹容器 -->
<template>
    <AppSafeTop />

    <AppLoading
        v-if="loadingState.activated"
        :show="loadingState.show"
        :msg="loadingState.msg"
    />
    <AppDialog
        v-if="dialogState.activated"
        v-bind="dialogState"
    />

    <!-- <nut-navbar -->
    <!--    :safe-area-inset-top="true" -->
    <!--    title="你好" -->
    <!-- &gt;</nut-navbar> -->
    <slot />
    <AppSafeBottom />
</template>

<style></style>
