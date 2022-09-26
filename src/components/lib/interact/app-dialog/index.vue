<script lang="ts">
export default { name: 'app-dialog' };
</script>

<script
    lang="ts"
    setup
>
import { useVModel } from '@/hooks/common-hooks';
import v from '@/assets/styles/common-variable.scss';


const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    titleColor: {
        type: String,
        default: '#333'
    },
    content: {
        type: String,
        default: ''
    },
    contentColor: {
        type: String,
        default: '#666'
    },
    showCancel: {
        type: Boolean,
        default: false
    },
    cancelText: {
        type: String,
        default: '取消'
    },
    cancelColor: {
        type: String,
        default: '#333'
    },
    confirmText: {
        type: String,
        default: '确定'
    },
    confirmColor: {
        type: String,
        default: v.mainColor
    }
});

const emit = defineEmits(['cancel', 'confirm', 'update:show']);

const vShow = useVModel<Boolean>(props, 'show', emit);

const onCancel = () => emit('cancel');
const onConfirm = () => emit('confirm');

</script>

<template>
    <nut-overlay
        v-model:visible="vShow"
        :class="s['app-dialog__overlay']"
        :close-on-click-overlay="false"
        :duration="0.1"
    >
        <div :class="s['app-dialog']">
            <div
                :class="s['app-dialog__title']"
                :style="{ color: titleColor }"
            >{{ title }}
            </div>
            <div
                :class="s['app-dialog__content']"
                :style="{ color: contentColor }"
            >
                <template v-if="content">{{ content }}</template>
                <slot v-else/>
            </div>
            <div :class="[s['app-dialog__buttons'], 'hairline--top']">
                <div :class="[s['button-wrapper'], 'hairline--right']">
                    <nut-button
                        v-if="showCancel"
                        :class="[s['button'], s['button_cancel']]"
                        :style="{ color: cancelColor }"
                        @click.stop="onCancel"
                    >{{ cancelText }}
                    </nut-button>
                </div>

                <div :class="s['button-wrapper']">
                    <nut-button
                        :class="[s['button'], s['button_confirm']]"
                        :style="{ color: confirmColor }"
                        @click.stop="onConfirm"
                    >{{ confirmText }}
                    </nut-button>
                </div>
            </div>
        </div>
    </nut-overlay>
</template>

<style
    lang="scss"
    module="s"
>
@import '@/assets/styles/common-variable.scss';
@import '@/assets/styles/common.scss';

.app {
    &-dialog {
        background-color: #fff;
        width: 80vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: $space-small;
        overflow: hidden;


        &__overlay {
        }

        &__title {
            font-weight: 700;
            text-align: center;
            padding: $space-normal 0;
        }

        &__content {
            text-align: center;
            padding: 0 $space-normal $space-large;
            max-height: 60vh;
            overflow: scroll;
        }

        & &__buttons {
            display: flex;

            .button-wrapper {
                flex: 1;

                .button {
                    $height: $space-small * 5;
                    border: 0;

                    text-align: center;
                    line-height: $height;
                    height: $height;
                    background-color: #fff;
                    border-radius: 0;
                    display: block;
                    padding: 0;
                    position: relative;


                    &.button_confirm {
                        color: $main-color;
                    }

                }
            }

        }
    }
}
</style>
