<script
    setup
    lang="ts"
>
import { useVModel } from '@/hooks/use-lib';

const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    msg: {
        type: String,
        default: null,
    },
});

const emit = defineEmits(['update:show']);

console.log('app-loading');

const vShow = useVModel<Boolean>(props, 'show', emit);
const vMsg = useVModel<string | undefined>(props, 'msg', emit);
</script>

<script lang="ts">
export default { name: 'AppLoading' };
</script>

<template>
    <nut-overlay
        v-model:visible="vShow"
        :class="s['app-loading_overlay']"
    >
        <div :class="s['app-loading']">
            <div
                v-for="i in 4"
                :key="i"
                :class="s['app-loading_item']"
            />
        </div>
    </nut-overlay>
</template>

<style
    lang="scss"
    module="s"
>
.app-loading,
.app-loading > div {
    position: relative;
    box-sizing: border-box;
}

.app-loading {
    display: block;
    font-size: 0;
    color: #fff;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.app-loading.la-dark {
    color: #333;
}

.app-loading > .app-loading_item {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
}

.app-loading {
    width: 80px;
    height: 60px;
}

.app-loading > .app-loading_item:nth-child(1) {
    position: absolute;
    bottom: 32%;
    left: 18%;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    transform-origin: center bottom;
    animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
}

.app-loading > .app-loading_item:not(:nth-child(1)) {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 6px;
    border-radius: 0;
    transform: translate(60%, 0);
    animation: ball-climbing-dot-steps 1.8s linear infinite;
}

.app-loading > .app-loading_item:not(:nth-child(1)):nth-child(2) {
    animation-delay: 0ms;
}

.app-loading > .app-loading_item:not(:nth-child(1)):nth-child(3) {
    animation-delay: -600ms;
}

.app-loading > .app-loading_item:not(:nth-child(1)):nth-child(4) {
    animation-delay: -1200ms;
}

@keyframes ball-climbing-dot-jump {
    0% {
        transform: scale(1, 0.7);
    }

    20% {
        transform: scale(0.7, 1.2);
    }

    40% {
        transform: scale(1, 1);
    }

    50% {
        bottom: 125%;
    }

    46% {
        transform: scale(1, 1);
    }

    80% {
        transform: scale(0.7, 1.2);
    }

    90% {
        transform: scale(0.7, 1.2);
    }

    100% {
        transform: scale(1, 0.7);
    }
}

@keyframes ball-climbing-dot-steps {
    0% {
        top: 0;
        right: 0;
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        top: 100%;
        right: 100%;
        opacity: 0;
    }
}
</style>
