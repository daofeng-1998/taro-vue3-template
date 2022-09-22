<script lang="ts">

import AppSafeTop from '@/components/lib/app-safe-top.vue';
import AppSafeBottom from '@/components/lib/app-safe-bottom.vue';
import { reactive } from 'vue';
import { mountInstance } from '@/components/lib/script/common';

export default {
    components: { AppSafeTop, AppSafeBottom },
    setup() {
        const notifyState = reactive<INotifyState>({
            show: false,
            msg: ''
        });

        mountInstance('notifyState', notifyState);

        return { notifyState };
    }
};


</script>

<!--页面包裹容器-->
<template>
    <AppSafeTop/>
    <nut-notify
        v-model:visible="notifyState.show"
        :msg="notifyState.msg"
    />
    <nut-navbar
        :safe-area-inset-top="true"
        title="你好"
    ></nut-navbar>
    <slot/>
    <AppSafeBottom/>
</template>

<style></style>
