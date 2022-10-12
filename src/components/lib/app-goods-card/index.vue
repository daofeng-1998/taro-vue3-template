<script
    lang="ts"
    setup
>
interface ImageMode {
    scaleToFill
    aspectFit
    aspectFill
    widthFix
    heightFix
    top
    bottom
    center
    left
    right
    'top left'
    'top right'
    'bottom left'
    'bottom right'
}

const props = withDefaults(defineProps<{
    imageMode?: keyof ImageMode
    imageWidth?: string
    imageHeight?: string
    goodsName?: string
    nameLine?: number
    direction?: 'vertical' | 'horizontal'
    count?: number | string
    price?: number
}>(), {
    imageMode: 'widthFix',
    imageWidth: '30%',
    imageHeight: '100%',
    direction: 'horizontal',
    nameLine: 2,
});

const emit = defineEmits(['click-image']);
</script>

<script lang="ts">
export default { name: 'AppGoodsCard' };
</script>

<template>
    <view
        :class="direction"
        class="app-goods-card"
    >
        <view
            :class="direction"
            class="app-goods-card-wrapper"
        >
            <!-- 图片区域 -->
            <view class="app-goods-card__img-area">
                <view
                    class="app-goods-card__img-wrapper"
                    @click.stop="emit('click-image')"
                >
                    <image
                        :mode="imageMode"
                        :src="require('@/assets/images/god.jpg')"
                        class="app-goods-card__img"
                    />
                </view>
            </view>

            <!-- 产品信息区 -->
            <view class="app-goods-card__body">
                <!-- 产品信息区域分为上下两个区域 -->
                <view class="app-goods-card__body-top">
                    <view class="app-goods-card__body-goods-name">
                        {{ goodsName }}
                    </view>
                </view>
                <view class="app-goods-card__body-bottom">
                    <slot name="bottom" />
                    <view class="app-goods-card__body-count">
                        <view class="app-goods-card__body-price">
                            <nut-price
                                v-if="typeof price === 'number' && !Number.isNaN(price)"
                                :price="price"
                                size="normal"
                            />
                            <slot
                                v-else
                                name="price"
                            />
                        </view>
                        <view class="app-goods-card__body-count">
                            <template v-if="count">
                                x{{ count }}
                            </template>
                            <slot
                                v-else
                                name="count"
                            />
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <slot name="footer" />
    </view>
</template>

<style lang="scss">
@import '@/components/lib/styles/variable.scss';
@import '@/assets/styles/mixins.scss';

.app-goods-card {
    border: 1px solid red;
    padding: $padding-2;

    &.vertical {
        width: calc(v-bind(imageWidth));
    }

    &-wrapper {

        box-sizing: border-box;
        display: flex;
        //align-items: flex-start;
        //width: max-content;

        &.vertical {
            flex-direction: column;

            .app-goods-card__body {
                padding-left: 0;
                padding-top: $padding-2;
                width: v-bind(imageWidth);
            }
        }
    }

    &__img {
        width: 100%;
        height: 100% !important; /* 必须加上important 否则会被taro覆盖 */
        position: absolute;
        top: 0;
        left: 0;
        vertical-align: middle;

        &-area {
            align-self: flex-start;
            width: v-bind(imageWidth);
            //background-color: skyblue;
            overflow: hidden;
            border-radius: $border-radius-2;
        }

        &-wrapper {
            height: 0;
            padding-bottom: v-bind(imageHeight);
            //background-color: skyblue;
            position: relative;
        }
    }

    &__body {
        flex: 1;
        //height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: $padding-2;

        &-goods-name {
            @include multi-ellipsis(v-bind(nameLine));
        }

        &-count {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
