<script
    lang="ts"
    setup
>
import Taro from '@tarojs/taro';
import { ref } from 'vue';
import AppPage from '@/components/lib/app-page/index.vue';
import { er } from '@/utils/AsyncTool';
import { useLoading } from '@/components/lib/interact/app-loading/use-loading';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';
import { go, goAny } from '@/utils/Router';
import { useFormData } from '@/hooks/use-lib';
import AppGoodsCard from '@/components/lib/app-goods-card/index.vue';
import { useCommonStore } from '@/stores/common';
import AppButtonGroup from '@/components/lib/app-button-group/index.vue';

definePageConfig({
    navigationBarTitleText: '首页',
});

const Loading = useLoading();
const dialog = useDialog();

const showLoading = er(() => {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 3000);
});

const showDialog = () => {
    dialog.show({
        title: '哈哈',
        titleColor: 'red',
        content: '一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。',
        contentColor: 'skyblue',
        showCancel: true,
        cancelText: '不需要',
        cancelColor: 'red',
        confirmText: '谢谢',
        confirmColor: 'blue',
    }).then(() => {
        Taro.showToast({
            title: '点击了确认',
            icon: 'none',
        });
    }).catch(() => {
        Taro.showToast({
            title: '点击了取消',
            icon: 'none',
        });
    });
};

const onRichDialog = () => {
    dialog.show({
        title: '富文本展示',
        contentType: 'HTML',
        content: '<img mode="widthFix" style="width: 100%" src="https://www.baidu.com/img/pc_d421b05ca87d7884081659a6e6bdfaaa.png"/>'
            + '<video autoplay controls style="width: 100%"  src="https://vd2.bdstatic.com/mda-nj225vh0nfbdrr8g/sc/cae_h264/1664761364992520146/mda-nj225vh0nfbdrr8g.mp4"></video>',
        showCancel: true,
        cancelText: '谢谢',
        confirmText: '就不穿',
    });
};

const route = {
    onRouteJump() {
        goAny('/pages/development/route/index?code=123465789798', {
            name: 'feng',
            age: 18,
            address: '的hi发客户看技术按时艰苦的贺卡上撒娇电话卡',
        });
    },
};

const [formData, reset] = useFormData(() => ({
    username: '',
    password: '',
}));

const smsDisabled = ref(false);
const smsText = ref('发送验证码');

const onSms = () => {
    let i = 59;
    smsDisabled.value = true;
    smsText.value = `${i--}s`;
    const interval = setInterval(() => {
        Taro.nextTick(() => {
            smsText.value = `${i}s`;
            if (i-- < 1) {
                smsDisabled.value = false;
                clearInterval(interval);
                smsText.value = '发送验证码';
            }
        });
    }, 1000);
};

const goodsCount = ref(0);
console.log(useCommonStore().lunchTime);
</script>

<script lang="ts">
export default { name: 'Home' };
</script>

<template>
    <AppPage>
        <nut-input
            v-model="formData.password"
            :border="false"
            label="用户名"
            placeholder="请输入密码"
        />
        <nut-cell-group title="函数式组件">
            <nut-cell
                is-link
                title="对话框dialog"
                @click="showDialog"
            />
            <nut-cell
                is-link
                title="富文本loading"
                @click="onRichDialog"
            />
            <nut-cell
                is-link
                title="加载中loading"
                @click="showLoading"
            />
        </nut-cell-group>

        <nut-cell-group title="路由">
            <nut-cell
                is-link
                title="带参数跳转"
                @click="route.onRouteJump"
            />
        </nut-cell-group>
        <nut-cell-group title="数据组件">
            <nut-cell
                is-link
                title="表单预览"
                @click="go('/pages/data/preview/index')"
            />
        </nut-cell-group>

        <!--
            :image-height="Taro.pxTransform(130)"
        -->
        <AppGoodsCard
            :image-src="require('@/assets/images/god.jpg')"
            :name-line="2"
            :price="8.12"
            direction="horizontal"
            goods-name="大闸蟹大闸蟹大闸蟹大闸蟹大闸蟹"
            image-mode="aspectFill"
            image-width="25%"
            @click-image="dialog.showContent('点击了图片')"
        >
            <template #bottom>
                sadasdas
            </template>
            <template #count>
                <nut-inputnumber
                    v-model="goodsCount"
                    button-size="30"
                    input-width="50rpx"
                />
            </template>
            <template #footer>
                订单号：165464646
            </template>
        </AppGoodsCard>

        <div
            class="test-app-goods-card-vertical"
        >
            <view
                v-for="i in 4"
                :key="i"
                class="wrapper"
            >
                <AppGoodsCard
                    :image-src="require('@/assets/images/god.jpg')"
                    :name-line="2"
                    direction="vertical"
                    goods-name="无限狗头"
                    image-mode="aspectFill"
                    image-width="100%"

                    @click-image="dialog.showContent('点击了图片')"
                />
                <view class="goods-card-footer">
                    <nut-price
                        price="300"
                        size="normal"
                    />
                    <view>立即试用</view>
                </view>
            </view>
        </div>

        <nut-cell-group title="工具测试">
            <nut-cell title="倒计时">
                <nut-button
                    :disabled="smsDisabled"
                    size="small"
                    @click="onSms"
                >
                    {{ smsText }}
                </nut-button>
            </nut-cell>
        </nut-cell-group>
        <AppButtonGroup
            :style="{
                'padding': Taro.pxTransform(10),
                '--button-group-radius': '0',
                '--button-group-border-color': '#fff',
                '--button-group-outborder': 0,
            }"
        >
            <nut-button type="danger">
                按钮
            </nut-button>
            <nut-button type="primary">
                按钮
            </nut-button>
            <nut-button type="warning">
                按钮
            </nut-button>
        </AppButtonGroup>
        <AppButtonGroup
            :style="{
                'padding': Taro.pxTransform(10),
                '--button-group-border-color': '#fff',
                '--button-group-outborder': 0,
            }"
        >
            <nut-button type="primary">
                按钮
            </nut-button>
            <nut-button type="primary">
                按钮
            </nut-button>
            <nut-button type="primary">
                按钮
            </nut-button>
        </AppButtonGroup>
        <AppButtonGroup
            :style="{
                'padding': Taro.pxTransform(10),
                '--button-group-border-color': '#000',
                '--button-group-outborder': Taro.pxTransform(1),
            }"
        >
            <nut-button>
                按钮
            </nut-button>
            <nut-button>
                按钮
            </nut-button>
            <nut-button>
                按钮
            </nut-button>
        </AppButtonGroup>
        <div
            style="padding: 100px"
        />
    </AppPage>
</template>

<style lang="scss">
.test-app-goods-card-vertical {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    padding: 20px;

    .wrapper {
        border-radius: var(--space-small);
        overflow: hidden;
    }

    .goods-card-footer {
        color: #fff;
        background-color: #ff5d58;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 26px;
        padding: var(--padding-1) var(--padding-2);

        .nut-price {
            color: #fff;
            display: flex;
        }
    }
}
</style>
