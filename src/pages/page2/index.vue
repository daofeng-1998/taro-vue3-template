<script
    lang="ts"
    setup
>
import AppPage from '@/components/lib/app-page/index.vue';
import { random } from '@/utils/Tools';
import { Ref, ref } from 'vue';

const colData = ref(2);

interface struct {
    id: number,
    height: number
}

const fallsData: Ref<struct[]> = ref([]);

for (let i = random(20, 50); i >= 0; i--) {
    fallsData.value.push({
        id: i,
        height: random(150, 500)
    });
}

const filter = <T>(model: number, arr: T[]): T[] => {
    console.log(model);
    const newArr: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        i % model === 0 && newArr.push(arr[i]);
    }
    return newArr;
};

</script>

<template>
    <AppPage>
        <div class="falls-wrapper">
            <div
                v-for="(col, col_index) in colData"
                :key="col_index"
                class="falls-col"
            >
                <div
                    v-for="item in filter<struct>(col_index, fallsData)"
                    :key="item.id"
                    class="falls-item"
                >
                    <div
                        :style="{ height: item.height + 'rpx' }"
                        class="falls-block"
                    >{{ item.id }}
                    </div>
                </div>
            </div>


            <!--<div style="clear: both"></div>-->
        </div>
    </AppPage>
</template>


<style lang="scss">
.falls-wrapper {
    display: flex;

    .falls-col {
        flex: 1;
    }
}

.falls-item {
    box-sizing: border-box;
    padding: 10px;
}

.falls-block {
    background-color: skyblue;
}
</style>
