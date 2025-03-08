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
          {{collData.collateral.ondemand?.toLocaleString()}}
        </n-statistic>
        <n-statistic label="Dalam Proses">
          {{collData.collateral.onProcess?.toLocaleString()}}
        </n-statistic>
        <n-statistic label="Diluar POS">
          {{collData.collateral.onGoing?.toLocaleString()}}
        </n-statistic>
        <n-statistic label="Total Jaminan">
          {{collData.collateral.all?.toLocaleString()}}
        </n-statistic>
      </div>
    </n-spin>
  </n-card>
</template>

<script setup>
import {ref, onMounted} from "vue";

import {useApi} from "../../../helpers/axios.js";
import router from "../../../router/index.js";
import {useCollateralStore} from "../../../stores/collateral.js";
import {useMeStore} from "../../../stores/me.js";

const loadData = ref(false);
const collData = useCollateralStore();
const me = useMeStore();
const getData = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: "GET",
    api: "collateral_count",
    token: userToken,
  });
  if (!response.ok) {
    console.log(response);
  } else {
    collData.storeCollateral(response.data);
  }
};

onMounted(() => {
  getData()
});
</script>
