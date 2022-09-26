<script
    setup
    lang="ts"
>

import AppPage from '@/components/lib/app-page/index.vue';
import { useLoading } from '@/components/lib/interact/app-loading/use-loading';

definePageConfig({
    navigationBarTitleText: ''
});

const loading = useLoading();

const onClick = () => {
    loading.show();

    setTimeout(() => {
        loading.hide();
    }, 5000);
};

</script>
<template>
    <AppPage>
        <nut-button @click="onClick">选择文件</nut-button>
    </AppPage>
</template>
