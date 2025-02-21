<template>
  <n-card>Hi,<b>{{me.me.nama}} 👋</b>
  </n-card>
</template>
<script setup>
import _ from "lodash";
import {useMessage} from "naive-ui";
import {useApi} from "../../helpers/axios.js";
import {useMeStore} from "../../stores/me.js";
const appbackdrop = import.meta.env.VITE_APP_BACKDROP;
const me=useMeStore();
const message = useMessage();
const dataMenu = ref();
const getMenu = async () => {
  let userToken = localStorage.getItem("token");
  const response = await useApi({
    method: 'GET',
    api: 'menu-sub-list',
    token: userToken
  });
  if (!response.ok) {
    message.error(response.error.data.message);
  } else {
    dataMenu.value = response.data.response;
  }
}
onMounted(() => {
  getMenu();
})

</script>