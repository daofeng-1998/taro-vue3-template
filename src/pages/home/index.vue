<script
    setup
    lang="ts"
>
import AppPage from '@/components/lib/app-page/index.vue';
import AppLink from '@/components/lib/app-link.vue';
import http from '@/api/lib/http';
import { er } from '@/utils/AsyncTool';
import { useLoading } from '@/components/lib/interact/app-loading/use-loading';
import { useDialog } from '@/components/lib/interact/app-dialog/use-dialog';

definePageConfig({
    navigationBarTitleText: '首页',
});

console.log('home-page');

const onClick = er(async () => {
    const res = await http.get('/12341654566.html');
    console.log(res.data);
});

console.log('取值');

const Loading = useLoading();

const loading = er(() => {
    Loading.show();
    setTimeout(() => {
        Loading.hide();
    }, 5000);
});

const dialog = useDialog();

const showDialog = () => {
    dialog.show({
        title: '哈哈',
        titleColor: 'red',
        content: '一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。我们语文组就搜集印发一些新颖素材发下去，让学生利用早读时间背诵记忆，或者通过阅读课来丰富他们的素材积累。坚持下来的效果是令人欣喜的，记得有次我让他们观看了关于“瓷娃娃”刘大铭的事迹，大家都颇有感触，在笔记中八班的姜亚楠同学这样写道：“我们是奔跑者，奔跑在青春的路上，而这一切的前提是拥有一个好的身体。如今的一些年轻人不珍惜自己的身体，随便一点小困难就轻易放弃了自己的生命。如果此时的你正因一些不顺心的事打算放弃生的权利，那么瓷娃娃刘大铭或许会一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。我们语文组就搜集印发一些新颖素材发下去，让学生利用早读时间背诵记忆，或者通过阅读课来丰富他们的素材积累。坚持下来的效果是令人欣喜的，记得有次我让他们观看了关于“瓷娃娃”刘大铭的事迹，大家都颇有感触，在笔记中八班的姜亚楠同学这样写道：“我们是奔跑者，奔跑在青春的路上，而这一切的前提是拥有一个好的身体。如今的一些年轻人不珍惜自己的身体，随便一点小困难就轻易放弃了自己的生命。如果此时的你正因一些不顺心的事打算放弃生的权利，那么瓷娃娃刘大铭或许会一是素材的积累。许多学生在写作的时候苦于没有素材，或者说来说去只是千篇一律的素材，毫无新意。我们语文组就搜集印发一些新颖素材发下去，让学生利用早读时间背诵记忆，或者通过阅读课来丰富他们的素材积累。坚持下来的效果是令人欣喜的，记得有次我让他们观看了关于“瓷娃娃”刘大铭的事迹，大家都颇有感触，在笔记中八班的姜亚楠同学这样写道：“我们是奔跑者，奔跑在青春的路上，而这一切的前提是拥有一个好的身体。如今的一些年轻人不珍惜自己的身体，随便一点小困难就轻易放弃了自己的生命。如果此时的你正因一些不顺心的事打算放弃生的权利，那么瓷娃娃刘大铭或许会',
        contentColor: 'skyblue',
        showCancel: true,
        cancelText: '不需要',
        cancelColor: 'red',
        confirmText: '谢谢',
        confirmColor: 'blue'
    }).then(() => {
        console.log('确认');
    }).catch(() => {
        console.log('取消');
    });

    // dialog.showContent('你好').then(() => {
    //     console.log(dialogState.value.show);
    // });

    // dialog.showCancel('谢谢');


};
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

        <nut-button type="primary">主要按钮
        </nut-button>
        <nut-button
            type="info"
            @click="loading"
        >loading
        </nut-button>
        <nut-button
            type="default"
            @click="showDialog"
        >dialog
        </nut-button>
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
