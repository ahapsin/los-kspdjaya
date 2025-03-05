<template>
  <n-card>
    <n-spin :show="loadData">
      <n-space>
        <n-statistic label="Order dibuat">
          {{ createdSuccess.length }}
        </n-statistic>
        <n-statistic label="Total Pencairan">
          {{ totalPencairan.toLocaleString() }}
        </n-statistic>
      </n-space>
    </n-spin>
  </n-card>
</template>

<script setup>
import _ from "lodash";
import {ref} from "vue";
import {useMessage} from 'naive-ui';
import {useApi} from "../../../helpers/axios.js";

const loadData = ref(false);
const data = ref([]);
const message = useMessage();
const getMenu = async () => {
  loadData.value = true;
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: 'GET',
    api: 'kunjungan_admin',
    token: userToken
  });
  if (!response.ok) {
    loadData.value = false;
    message.error(response.error.data.message);
  } else {
    loadData.value = false;
    data.value = response.data.response;
  }
}
const createdSuccess = computed(() => _.filter(data.value, {'status_code': 'APHO'}));
const totalPencairan = computed(() => createdSuccess.value.reduce((sum, i) => sum + i.plafond, 0));
onMounted(() => getMenu())
</script>
