<script
    lang="ts"
    setup
>
</script>

<script lang="ts">
export default { name: 'AppButtonGroup' };
</script>

<template>
    <view class="app-button-group">
        <slot />
    </view>
</template>

<style lang="scss">
.app-button-group {
    display: flex;
    //border: 1px solid var(--color-gray1);
    overflow: hidden;

    .nut-button {
        flex: 1;
        border-radius: 0;
        //border-top: 0;
        //border-left: 0;
        //border-bottom: 0;
        border: 1px solid var(--button-group-border);
        border-right: 0;

        &:first-child {
            border-top-left-radius: var(--button-group-radius);
            border-bottom-left-radius: var(--button-group-radius);
        }

        &:last-child {
            border-right: 1px solid var(--button-group-border);
            border-top-right-radius: var(--button-group-radius);
            border-bottom-right-radius: var(--button-group-radius);
        }
    }
}
</style>
