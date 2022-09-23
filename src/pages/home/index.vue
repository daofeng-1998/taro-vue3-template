<script
    setup
    lang="ts"
>
import AppPage from '@/components/lib/app-page.vue';
import AppLink from '@/components/lib/app-link.vue';
import http from '@/api/lib/http';
import { er } from '@/utils/AsyncTool';
import { hideLoading, showLoading, showNotify } from '@/components/lib/script/hint';

definePageConfig({
    navigationBarTitleText: '首页',
});

const onClick = er(async () => {
    const res = await http.get('/12341654566.html');
    console.log(res.data);
});

const loading = er(() => {
    showLoading();
    setTimeout(() => {
        hideLoading();
    }, 5000);
});
</script>

<template>
    <AppPage>
        这里是首页
        <AppLink
            :class="$style.link"
            url="/pages/page1/index"
        >
            <div :class="$style['link-title']">哈哈</div>
        </AppLink>

        <nut-button
            type="primary"
            @click="showNotify('哈哈哈哈哈')"
        >主要按钮
        </nut-button>
        <nut-button
            type="info"
            @click="loading"
        >信息按钮
        </nut-button>
        <nut-button type="default">默认按钮</nut-button>
        <nut-button type="danger">危险按钮</nut-button>
        <nut-button type="warning">警告按钮</nut-button>
        <nut-button
            type="success"
            @click="onClick"
        >成功按钮
        </nut-button>
    </AppPage>
</template>

<style
    lang="scss"
    module
>
.link {
    color: red;

    .link-title {
        color: #00ff00;
    }
}
</style>
