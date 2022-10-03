<script lang="ts">
export default { name: 'app-page' };
</script>
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

<!--页面包裹容器-->
<template>

    <AppSafeTop/>

    <AppLoading
        v-if="loadingState.activated"
        :show="loadingState.show"
        :msg="loadingState.msg"
    />
    <AppDialog
        v-if="dialogState.activated"
        v-model:show="dialogState.show"

        :content="dialogState.content"
        :cancel-color="dialogState.cancelColor"
        :cancel-text="dialogState.cancelText"
        :content-type="dialogState.contentType"

        :confirm-color="dialogState.confirmColor"
        :confirm-text="dialogState.confirmText"

        :content-color="dialogState.contentColor"
        :show-cancel="dialogState.showCancel"

        :title="dialogState.title"
        :title-color="dialogState.titleColor"

        :disable-cancel="dialogState.disableCancel"
        :disable-confirm="dialogState.disableConfirm"

        @cancel="dialogState.onCancel"
        @confirm="dialogState.onConfirm"
    />

    <!--<nut-navbar-->
    <!--    :safe-area-inset-top="true"-->
    <!--    title="你好"-->
    <!--&gt;</nut-navbar>-->
    <slot/>
    <AppSafeBottom/>
</template>

<style></style>
