<script setup lang="ts">

import AppSafeTop from "@/components/lib/app-safe-top.vue";
import AppSafeBottom from "@/components/lib/app-safe-bottom.vue";
</script>

<!--页面包裹容器-->
<template>
    <AppSafeTop/>
    <nut-navbar title="你好"></nut-navbar>
    <slot/>
    <AppSafeBottom/>
</template>

<style></style>
