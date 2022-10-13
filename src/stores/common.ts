import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
    /** 程序启动时间 */
    const lunchTime = ref(0);

    return {
        lunchTime,
    };
});
