<script
    lang="ts"
    setup
>
import { useRouteParams } from '@/hooks/use-lib';
import AppPage from '@/components/lib/app-page/index.vue';

definePageConfig({
    navigationBarTitleText: '$END$'
});
const params = useRouteParams();
console.log(params);
</script>

<template>
    <AppPage>
        <div>{{ JSON.stringify(params) }}</div>
    </AppPage>
</template>

<style lang="scss"></style>
