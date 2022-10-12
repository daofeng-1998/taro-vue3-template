<script setup lang="ts">
import { go } from '@/utils/Router';

defineProps({
    url: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div class="app-link" @click="go(url)">
        <slot />
    </div>
</template>

<style></style>
