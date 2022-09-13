<script setup lang="ts">
import AppPage from "@/components/lib/app-page.vue";
import AppLink from "@/components/lib/app-link.vue";
import cache from "@/utils/cache";
import http from "@/api/lib/http";
import { to } from "@/utils/AsyncTool";
import { HttpRequest } from "@/lib/network/@types-http";


definePageConfig({
    navigationBarTitleText: '首页',
});

let key = cache.setData("你好");

console.log(key);
console.log(cache.getData(key));
console.log(cache.getData(key));

const onClick = async () => {
    const [err, res] = await to<HttpRequest.ISuccessResult>(http.get('https://www.baidu.com'));
    console.log(err);


    console.log('正式方法', res?.data);
};
</script>

<template>
    <AppPage>
        这里是首页
        <AppLink :class="$style.link" url="/pages/page1/index">
            <div :class="$style['link-title']">哈哈</div>
        </AppLink>

        <nut-button type="primary">主要按钮</nut-button>
        <nut-button type="info">信息按钮</nut-button>
        <nut-button type="default">默认按钮</nut-button>
        <nut-button type="danger">危险按钮</nut-button>
        <nut-button type="warning">警告按钮</nut-button>
        <nut-button type="success" @click="onClick">成功按钮</nut-button>
    </AppPage>
</template>

<style lang="scss" module>
.link {
    color: red;

    .link-title {
        color: #00ff00;
    }
}


</style>
