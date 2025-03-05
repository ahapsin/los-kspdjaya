<template>
    <n-card title="Jaminan" size="small" :segmented="{
        content: true,
        footer: 'soft',
    }">
    <template #title>adsa</template>
        <template #header-extra>
            <n-button @click="router.push({ name:'jaminan'})" size="small" quaternary>detail</n-button>
        </template>
        <n-spin :show="loadData">
            <div class="grid grid-cols-2 justify-stretch">
                <n-statistic label="Tersedia di POS">
                    {{ createdSuccess.length }}
                </n-statistic>
                <n-statistic label="Dalam Proses">
                    {{ sumPaidPayment.toLocaleString() }}
                </n-statistic>
                <n-statistic label="Diluar POS">
                    {{ pendingPayment.length }}
                </n-statistic>
                <n-statistic label="Total Jaminan">
                    {{ sumPendingPayment.toLocaleString() }}
                </n-statistic>
            </div>
        </n-spin>
    </n-card>
</template>

<script setup>
import _ from "lodash";
import { ref, computed, onMounted } from "vue";
import { useMessage } from 'naive-ui';
import { useApi } from "../../../helpers/axios.js";
import router from "../../../router/index.js";

const loadData = ref(false);
const data = ref([]);
const message = useMessage();
const getData = async () => {
    loadData.value = true;
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: 'GET',
        api: 'jaminan',
        token: userToken
    });
    if (!response.ok) {
        loadData.value = false;
        message.error(response.error.data.message);
    } else {
        loadData.value = false;
        data.value = response.data;
    }
}
const createdSuccess = computed(() => _.filter(data.value, {}));
const pendingPayment = computed(() => _.filter(data.value, { 'STATUS': 'PENDING' }));
const sumPaidPayment = computed(() => createdSuccess.value.reduce((sum, i) => sum + i.jumlah_uang, 0));
const sumPendingPayment = computed(() => pendingPayment.value.reduce((sum, i) => sum + i.jumlah_uang, 0));
onMounted(() => getData())
</script>
